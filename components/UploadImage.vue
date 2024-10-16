<template>
    <div v-show="!uploading && !converting" class="relative border-2 border-aquaBlue-500 border-dashed rounded-lg p-4 md:max-w-56" id="dropzone">
        <div class="text-center cursor-pointer" @click="triggerFileInput">
            <UIcon class="text-aquaBlue-500" width="50" height="50" name="mage:image-upload" dynamic></UIcon>
            <UFormGroup class="" name="room" >
                <UInput class="hidden" placeholder="" type="file" ref="fileInput" @change="handleFileChange" />
            </UFormGroup>
            <p class="text-coolGray-500 text-sm">Wgraj zdjęcie <br/><span class="text-xs">(jpg/jpeg/png/webp/heic)</span></p>
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
const chosenImgSource = useState('chosenImgSource');
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
        const originalExtension = file.name.split('.').pop().toLowerCase();
        const extensionToMimeType = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            webp: 'image/webp',
            heic: 'image/heic',
        };

        const originalMimeType = file.type;
        const expectedMimeType = extensionToMimeType[originalExtension];

        if (!expectedMimeType) {
            toastError({ title: 'Nieobsługiwany format pliku.' });
            converting.value = false;
            return;
        }

        if (originalMimeType !== expectedMimeType) {
            console.warn('Typ MIME nie zgadza się z rozszerzeniem. Używamy oczekiwanego typu MIME.');
        }

        // Ustawienie docelowego formatu i rozszerzenia
        let targetFormat = originalMimeType;
        let targetExtension = originalExtension;

        if (originalExtension === 'png' || originalExtension === 'heic') {
            targetFormat = 'image/jpeg';
            targetExtension = 'jpg';
        }

        if (originalExtension === 'heic') {
            try {
                const heic2any = await import('heic2any');
                const convertedBlob = await heic2any.default({
                    blob: file,
                    toType: targetFormat,
                });
                processedFile = new File([convertedBlob], `${Math.random()}.${targetExtension}`, { type: targetFormat });
            } catch (error) {
                console.error('Błąd konwersji pliku HEIC, pozostawiamy oryginalny plik.');
                processedFile = file; // Pozostawiamy oryginalny plik
            }
        }
        try {
            const MAX_WIDTH = 1900; 
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            await new Promise((resolve, reject) => {
                img.onload = () => {
                    let width = img.width;
                    let height = img.height;

                    if (width > MAX_WIDTH) {
                        const ratio = MAX_WIDTH / width;
                        width = MAX_WIDTH;
                        height = height * ratio;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error('Błąd podczas generowania bloba z canvasa.'));
                                return;
                            }
                            processedFile = new File([blob], `${Math.random()}.${targetExtension}`, { type: targetFormat });
                            resolve();
                        },
                        targetFormat,
                        0.7
                    );
                };
                img.onerror = reject;
                img.src = URL.createObjectURL(processedFile);
            });

            // Zwolnij URL obiektu
            URL.revokeObjectURL(img.src);
        } catch (error) {
            console.error('Błąd przy przetwarzaniu pliku, pozostawiamy oryginalny plik.');
            processedFile = file;
        }

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1900,
            useWebWorker: true,
            fileType: targetFormat,
            initialQuality: 0.7,
        };

        let compressedFile;
        try {
            compressedFile = await imageCompression(processedFile, options);
        } catch (error) {
            console.error('Błąd podczas kompresji, używamy przetworzonego pliku.');
            compressedFile = processedFile;
        }

        const fileName = `${Math.random()}.${compressedFile.name.split('.').pop()}`;

        converting.value = false;
        uploading.value = true;

        const { data, error } = await supabase.storage.from('rooms').upload(fileName, compressedFile);
        if (error) throw error;

        upladedImageSrc.value = `https://uhfzlywrfnqujhcbmzgw.supabase.co/storage/v1/object/public/${data.fullPath}`;

        fileInput.value.input.value = null;
        isFileSelected.value = false;

        toastSuccess({ title: 'Poprawnie wgrano zdjęcie.' });
        isChosenImgSrc.value = upladedImageSrc.value;
        chosenImgSource.value = 'uploaded';
        isModal.value = false;
        await saveProfile(upladedImageSrc.value);
    } catch (error) {
        console.error('Błąd:', error);
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
