<template>
    <div class="relative border-2 border-aquaBlue-500 border-dashed rounded-lg p-4 max-w-56" id="dropzone">
        <div class="text-center cursor-pointer" @click="triggerFileInput">
            <UIcon class="text-aquaBlue-500" width="50" height="50" name="mage:image-upload" dynamic></UIcon>
            <UFormGroup class="" name="room">
                <UInput class="hidden" placeholder="" type="file" ref="fileInput" @change="handleFileChange" />
            </UFormGroup>
            <p class="text-coolGray-500 text-sm">Wgraj zdjęcie <br/><span class="text-xs">(max 1mb, jpg/jpeg/png/)</span></p>
        </div>
    </div>
    <UButton v-if="isFileSelected" :disabled="!isFileSelected" type="submit" class="mt-4 rounded-lg text-center bg-sunsetOrange-500 hover:bg-sunsetOrange-700 py-3 mx-auto w-full" variant="solid" label="Save" :loading="uploading"  @click="saveImage">
        <UIcon class="w-8 h-8 mr-3" name="bytesize:upload" dynamic></UIcon>
            Wgraj zdjęcie
        </UButton>
</template>
<script setup>
    const isFileSelected = ref(false);
    const uploading = ref(false);
    const fileInput = ref();
    const pending = ref(false);
    const upladedImageSrc = ref('');
    const supabase = useSupabaseClient();
    const isChosenImgSrc = useState("chosenImgSrc");
    const userUploadedPhotos = useState("userUploadedPhotos");
    const isModal = useState("modal");

    const { toastSuccess, toastError } = useAppToast();
    const handleFileChange = () => {
        isFileSelected.value = fileInput.value.input.files.length > 0;
    };

    const triggerFileInput = () => {
    fileInput.value.input.click();
};
    
const saveProfile = async (newImage) => {

    pending.value = true;
    try {
        const { data: { user }, error: fetchError } = await supabase.auth.getUser();
        console.log('user2', user);
        if (fetchError) throw fetchError;

        const updatedImages = [...userUploadedPhotos.value];
        if (updatedImages.length >= 9) {
            updatedImages.shift();
        }
        updatedImages.push(newImage);
        const data = {
            imagesUploaded: updatedImages
        };



        const { error } = await supabase.auth.updateUser({ data: data })

        if (error) throw error;

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

            toastSuccess({ title: 'Poprawnie wgrano zdjęcie.' });
            isChosenImgSrc.value = upladedImageSrc.value;

            await saveProfile(upladedImageSrc.value);
            isModal.value = false;

        } catch (error) {
            toastError({
                title: 'Error uploading avatar',
                description: error.message
            });
        } finally {
            uploading.value = false;
        }
    };
</script>