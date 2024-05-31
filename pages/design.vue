<template>
    <main class="grid grid-cols-12 gap-4">
        <article class="col-span-9 rounded bg-white p-4 mb">
            <h1 class="text-6xl mb-4 font-bold ">Redesign <span class="text-sunsetOrange-500">your room</span> in seconds</h1>
             <h2 class="text-2xl text-coolGray-500">Upload a room, specify the room type, and select your room theme to redesign.</h2>
        </article>
        <aside class="col-span-3 bg-blue-100 p-4 rounded shadow">
            <h2>Sidebar</h2>
            <p>This is the sidebar content.</p>
        </aside>
    
    <!-- <div> -->
        <!-- Last 10 uploaded photos
        <div class="grid grid-cols-5 gap-2">
            <img class="w-[300px] h-[300px] object-cover" v-for="item in userUploadedPhotos" :src="item" :key="item">
        </div> -->
        <!-- <img v-for="item in userUploadedPhotos" :src="item" :key="item"> -->
    <!-- </div>
    <UFormGroup label="Room image" class="w-full" name="room" help="After choosing an image click Save to actually upload image of your room">
        <UInput type="file" ref="fileInput" />
        <UButton type="submit" color="black" variant="solid" label="Save" :loading="uploading" :disabled="uploading" @click="saveImage" />
    </UFormGroup>
    <img v-if="upladedImageSrc" :src="upladedImageSrc">
    <button @click="handleSubmit">Interior design</button>
    <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
    <div v-if="prediction" class="mt-5">
        <div v-if="prediction.output" class="image-wrapper relative w-full" style="aspect-ratio: 1 / 1;">
            <img :src="imgSrc" alt="output" layout="fill" object-fit="cover" />
        </div>
        <p v-if="loading" class="py-3 text-sm opacity-50">Musisz chwilę poczekać. Obecny status: {{ prediction.status }}.</p>
    </div> -->
    </main>
</template>

<script setup>
    const getImage = (event) => {
        console.log('event',event);
    }
const userUploadedPhotos = ref([]);
const upladedImageSrc = ref('');
const uploading = ref(false);
const pending = ref(false);
const loading = ref(false);
const prediction = ref(null);
const error = ref(null);
const imgSrc = ref('');
const fileInput = ref();

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { toastSuccess, toastError } = useAppToast();

// Fetch user data and initialize userUploadedPhotos
const { data: userData, error: fetchError } = await supabase.auth.getUser();
console.log('userData', userData);
if (fetchError) throw fetchError;
userUploadedPhotos.value = userData.user.user_metadata.imagesUploaded || [];

const saveProfile = async (newImage) => {
    pending.value = true;
    try {
        // Fetch current user data
        const { data: { user }, error: fetchError } = await supabase.auth.getUser();
        console.log('user2', user);
        if (fetchError) throw fetchError;

        // Update the array of images
        const updatedImages = [...userUploadedPhotos.value];
        if (updatedImages.length >= 10) {
            updatedImages.shift(); // Remove the oldest image if there are already 10 images
        }
        updatedImages.push(newImage);
        console.log('ppp', updatedImages);

        // Prepare data for update
        const data = {
            imagesUploaded: updatedImages
        };
  
      console.log(data)
        console.log('data', data)
      const { error } = await supabase.auth.updateUser({data: data})

        if (error) throw error;

        // Update local state
        userUploadedPhotos.value = updatedImages;
        console.log('userUploadedPhotos', userUploadedPhotos.value);

    } catch (error) {
        console.error('Error updating profile:', error);
    } finally {
        pending.value = false;
    }
};

const saveImage = async () => {
    const file = fileInput.value.input.files[0];

    if (!file) {
        toastError({ title: 'Select a file to upload first' });
        return;
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;

    try {
        uploading.value = true;

        const { data, error } = await supabase.storage.from('rooms').upload(fileName, file);
        if (error) throw error;

        upladedImageSrc.value = `https://uhfzlywrfnqujhcbmzgw.supabase.co/storage/v1/object/public/${data.fullPath}`;

        fileInput.value.input.value = null;

        toastSuccess({ title: 'Room image uploaded' });
        console.log('userUploadedPhotos', userUploadedPhotos)
        await saveProfile(upladedImageSrc.value);

    } catch (error) {
        toastError({
            title: 'Error uploading avatar',
            description: error.message
        });
    } finally {
        uploading.value = false;
    }
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchPredictionStatus = async (id) => {
    while (true) {
        loading.value = true;
        await sleep(1000);
        const statusResponse = await fetch(`/api/predictions/${id}`);
        const statusData = await statusResponse.json();

        if (statusResponse.status !== 200) {
            error.value = statusData.detail;
            break;
        }

        prediction.value = statusData;

        if (statusData.status === 'succeeded' || statusData.status === 'failed') {
            imgSrc.value = prediction.value.output;
            loading.value = false;
            break;
        }
    }
};

const handleSubmit = async () => {
    error.value = null;
    prediction.value = null;

    const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: upladedImageSrc.value,
            prompt: 'A serene bedroom designed in the Japandi style, blending Japanese minimalism with Scandinavian functionality. A low wooden platform bed, soft linens, and simple, natural decor elements create a peaceful retreat. The use of neutral colors and clean lines promotes relaxation and tranquility.'
        }),
    });

    const predictionData = await response.json();

    if (response.status !== 201) {
        error.value = predictionData.detail;
        return;
    }

    prediction.value = predictionData;
    fetchPredictionStatus(predictionData.id);
};
</script>
