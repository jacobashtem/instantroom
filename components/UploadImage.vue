<template>
    <div v-show="!uploading && !converting" class="relative border-2 border-aquaBlue-500 border-dashed rounded-lg p-4 md:max-w-56" id="dropzone">
        <div class="text-center cursor-pointer" @click="triggerFileInput">
            <UIcon class="text-aquaBlue-500" width="50" height="50" name="mage:image-upload" dynamic></UIcon>
            <UFormGroup class="" name="room" >
                <UInput class="hidden" placeholder="" type="file" ref="fileInput" @change="handleFileChange" />
            </UFormGroup>
            <p class="text-coolGray-500 text-sm">Wgraj zdjęcie <br/><span class="text-xs">(max 1mb, jpg/jpeg/png/webp/heic/)</span></p>
        </div>
    </div>
    <div v-show="converting" class="text-base mb-2 text-coolGray-500 animate-pulse">
        Przetwarzanie zdjęcia, proszę czekać...
    </div>
    <div class="text-base mb-2 text-coolGray-500 animate-pulse" v-show="uploading">
        Trwa upload zdjęcia. Proszę czekać.
        <UProgress animation="carousel" />
    </div>
</template>

<script setup>
import imageCompression from 'browser-image-compression'; // Import do kompresji zdjęć

const isFileSelected = ref(false);
const uploading = ref(false);
const converting = ref(false);
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
    saveImage();
};

const triggerFileInput = () => {
    fileInput.value.input.click();
};

const saveProfile = async (newImage) => {
    pending.value = true;
    try {
        const { data: { user }, error: fetchError } = await supabase.auth.getUser();
        if (fetchError) throw fetchError;

        const updatedImages = [newImage, ...userUploadedPhotos.value];
        if (updatedImages.length > 9) {
            updatedImages.pop();
        }

        const data = { imagesUploaded: updatedImages };
        const { error } = await supabase.auth.updateUser({ data });

        if (error) throw error;

        userUploadedPhotos.value = updatedImages;

    } catch (error) {
        console.error('Błąd podczas aktualizacji profilu:', error);
    } finally {
        pending.value = false;
    }
};
const saveImage = async () => {
    const file = fileInput.value.input.files[0];

    if (!file) {
        toastError({ title: 'Nie wybrano zdjęcia.' });
        return;
    }
    try {
        converting.value = true;
        let processedFile = file;
        if (file.name.toLowerCase().endsWith('.heic')) {
            console.log('Plik w formacie HEIC, rozpoczynamy konwersję do WebP');
            
            try {
                const heic2any = await import('heic2any');
                const convertedBlob = await heic2any.default({
                    blob: file,
                    toType: 'image/webp',
                });
                console.log('Plik po konwersji z HEIC:', convertedBlob);
                processedFile = new File([convertedBlob], `${Math.random()}.webp`, { type: 'image/webp' });
                console.log('Plik po ustawieniu typu MIME:', processedFile);
            } catch (error) {
                console.error('Błąd konwersji pliku HEIC:', error);
                toastError({ title: 'Błąd konwersji pliku HEIC' });
                converting.value = false;
                return;
            }
        } else if (file.type !== 'image/webp') {
            console.log('Plik w formacie innym niż WebP, rozpoczynamy konwersję do WebP');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(
                        (blob) => {
                            processedFile = new File([blob], `${Math.random()}.webp`, { type: 'image/webp' });
                            resolve();
                        },
                        'image/webp',
                        0.8
                    );
                };
                img.onerror = reject;
                img.src = URL.createObjectURL(file);
            });
            console.log('Plik po konwersji z JPG/PNG do WebP:', processedFile);
        }
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1900,
            useWebWorker: true,
            fileType: 'image/webp',
        };

        const compressedFile = await imageCompression(processedFile, options);
        console.log('Skompresowany plik:', compressedFile);

        const fileName = `${Math.random()}.webp`;
        converting.value = false; 
        uploading.value = true;

        const { data, error } = await supabase.storage.from('rooms').upload(fileName, compressedFile);
        if (error) throw error;

        upladedImageSrc.value = `https://uhfzlywrfnqujhcbmzgw.supabase.co/storage/v1/object/public/${data.fullPath}`;

        fileInput.value.input.value = null;
        isFileSelected.value = false;

        toastSuccess({ title: 'Poprawnie wgrano zdjęcie.' });
        isChosenImgSrc.value = upladedImageSrc.value;

        await saveProfile(upladedImageSrc.value);
        isModal.value = false;

    } catch (error) {
        console.log('Błąd:', error);
        toastError({
            title: 'Wystąpił błąd podczas wgrywania zdjęcia',
            description: error.message,
        });
    } finally {
        converting.value = false;
        uploading.value = false;
    }
};
</script>