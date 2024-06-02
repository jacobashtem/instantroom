<template>
    <main class="grid grid-cols-12 gap-4 container max-w-6xl mx-auto mt-20">
        <article class="col-span-12 xl:col-span-9 rounded bg-white mt-12">
            <h1 class="text-3xl mb-4 font-semibold">Znajdź swoją <span class="text-sunsetOrange-500">inspirację</span> w kilka sekund.</h1>
            <h2 class="text-2xl text-coolGray-500">Upload a room, specify the room type, and select your room theme to redesign.</h2>
            <div v-if="!loading" class="mt-4 flex justify-left">
                <img class="max-w-2xl" :src="upladedImageSrc">
            </div>

            <!-- <HowItWorks/> -->
            <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
            <div v-if="prediction" class="mt-5">
                <div v-if="prediction.output" class="image-wrapper relative w-full" style="aspect-ratio: 1 / 1;">
                    <img :src="imgSrc" alt="output" layout="fill" object-fit="cover" />
                </div>
                <p v-if="loading" class="py-3 text-sm opacity-50">Musisz chwilę poczekać. Obecny status: {{ prediction.status }}.</p>
            </div>
        </article>
        <aside class="col-span-12 xl:col-span-3 p-4 rounded">
            <div v-if="userUploadedPhotos">
                <UploadedGallery :items="userUploadedPhotos" @chosenImgSrc="getImage" />
                <h3 class="text-xl mb-2 font-semibold text-coolGray-900 mt-6">
                    Or... <br /> <span class="text-sunsetOrange-500">upload something</span> brand new
                </h3>
                <div class="w-full relative border-2 border-midnightBlue-300 border-dashed rounded-lg p-6" id="dropzone">
                    <div class="text-center">
                        <UIcon class="text-midnightBlue-500" width="36" height="36" name="mage:image-upload" dynamic></UIcon>
                        <UFormGroup class="w-full" name="room" help="After choosing an image, click Save to actually upload image of your room">
                            <UInput class="" type="file" ref="fileInput" @change="handleFileChange" />
                        </UFormGroup>
                        <p class="mt-1 text-xs text-midnightBlue-500">WEBP, JPG, JPEG, PNG up to 1mb</p>
                    </div>
                </div>
                <UButton v-if="isFileSelected" type="submit" class="mt-4 rounded-lg text-center bg-sunsetOrange-500 hover:bg-sunsetOrange-700 py-3 mx-auto" variant="solid" label="Save" :loading="uploading" :disabled="uploading" @click="saveImage">
                    <UIcon class="w-8 h-8 mr-3" name="bytesize:upload" dynamic></UIcon>
                    Upload image
                </UButton>

                <div v-if="upladedImageSrc" class="flex col-span-3 gap-3 flex-col mt-6">
                    <h2 class="text-xl font-semibold">Redesign Room</h2>
                    <UTextarea autoresize placeholder="Search..." v-model="customPrompt" />
                    <UButton type="submit" variant="solid" class="bg-goldenAmber-500 hover:bg-goldenAmber-700 w-full"
                        @click="handleCustomPromptSubmit">Redesign</UButton>
                    <UFormGroup class="w-full" label="Select Theme">
                        <USelect v-model="selectedTheme" :options="themes" />
                    </UFormGroup>
                    <UFormGroup class="w-full mt-4" label="Select Room Type">
                        <USelect v-model="selectedRoomType" :options="roomTypes" />
                    </UFormGroup>
                    <UButton type="submit" variant="solid" class="bg-goldenAmber-500 hover:bg-goldenAmber-700 w-full" @click="handleSubmit(1)">Redesign</UButton>
                </div>
            </div>
        </aside>
    </main>
</template>

<script setup>
const isFileSelected = ref(false);
const userUploadedPhotos = ref([]);
const upladedImageSrc = ref('');
const customPrompt = ref('');
const selectedTheme = ref('');
const selectedRoomType = ref('');
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
const { data: userData, error: fetchError } = await supabase.auth.getUser();
userUploadedPhotos.value = userData.user.user_metadata.imagesUploaded || [];
const themes = ref([]);
const roomTypes = ref([
    "Living room",
    "Dining room",
    "Bedroom",
    "Bathroom",
    "Office",
    "Kitchen",
    "Terrace",
    "Kids room"
]);

onMounted(async () => {
    const { data: themesData, error: themesError } = await supabase
      .from('prompts')
      .select('theme');

    if (themesError) {
        toastError({ title: 'Error fetching themes', description: themesError.message });
        return;
    }

    themes.value = themesData.map(theme => theme.theme);
});

const getImage = (imageSrc) => {
    toastSuccess({ title: 'Image chosen successfuly from gallery.' });
    upladedImageSrc.value = imageSrc;
}
const handleFileChange = () => {
    isFileSelected.value = fileInput.value.input.files.length > 0;
};

const saveProfile = async (newImage) => {
    pending.value = true;
    try {
        // Fetch current user data
        const { data: { user }, error: fetchError } = await supabase.auth.getUser();
        console.log('user2', user);
        if (fetchError) throw fetchError;

        // Update the array of images
        const updatedImages = [...userUploadedPhotos.value];
        if (updatedImages.length >= 9) {
            updatedImages.shift(); // Remove the oldest image if there are already 10 images
        }
        updatedImages.push(newImage);

        // Prepare data for update
        const data = {
            imagesUploaded: updatedImages
        };



        const { error } = await supabase.auth.updateUser({ data: data })

        if (error) throw error;

        // Update local state
        userUploadedPhotos.value = updatedImages;

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
        isFileSelected.value = false;

        toastSuccess({ title: 'Room image uploaded' });
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
            theme: selectedTheme.value,
            roomType: selectedRoomType.value,
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
const handleCustomPromptSubmit = async () => {
    error.value = null;
    prediction.value = null;
        const response = await fetch('/api/custom-predictions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: upladedImageSrc.value,
            prompt: customPrompt.value
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
