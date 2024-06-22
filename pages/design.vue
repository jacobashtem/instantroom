<template>
    <main class="grid grid-cols-12 gap-4 container max-w-6xl mx-auto mt-20 min-h-screen">
        <article class="col-span-12 px-4 rounded bg-white mt-12 ">
            <template v-if="!isGenerationStarted">
                <div class="flex flex-col mb-9">
                    <h2 class="text-3xl font-semibold">
                        Znajdź swoją <span class="text-sunsetOrange-500">inspirację.</span>
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
                        <div class="flex mt-6 items-center">
                            <p class=" text-3xl font-extralight mr-6">Po pierwsze: </p>
                            <UploadedGallery :items="userUploadedPhotos" />
                        </div>
                        <div class="flex items-center mt-6 flex-wrap">
                                <p class="mr-4 block text-3xl font-extralight">Odmień w kilka sekund</p>
                                <UFormGroup class="mt-6 mb-4 mr-4 ring-0">
                                    <USelect option-attribute="label"  size="xl" selected padded  class="text-center font-semibold" v-model="selectedRoomType" :options="roomTypes.map(type => ({ label: type.displayName, value: type.name }))" />
                                </UFormGroup>
                            </div>
                        </div>
                </div>
                <UCarousel arrows indicators v-slot="{ item }" :items="themes" :ui="{ item: 'snap-start' }">
                    <div class="relative select-none  transition-all">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <p class="z-10 relative py-2 px-6 rounded-xl text-white bg-aquaBlue-500/60 font-light text-2xl">
                                {{ item }}</p>
                        </div>
                        <img :class="isSelected(item) ? 'brightness-50' : 'brightness-75'"
                            :src="`/_nuxt/public/themes/${item}.webp`" width="400" draggable="false">
                        <UIcon v-if="!isSelected(item)" @click="handleselectedThemess(item)"
                            class="hover:scale-110 transition-all cursor-pointer absolute top-4 right-4 text-white"
                            width="36" height="36" name="subway:add" dynamic></UIcon>
                        <UIcon v-else @click="handleselectedThemess(item)"
                            class="hover:scale-110 transition-all cursor-pointer absolute top-4 right-4 text-sunsetOrange-500"
                            width="36" height="36" name="zondicons:minus-solid" dynamic></UIcon>
                    </div>
                </UCarousel>
                <div class="shadow-2xl rounded-2xl mt-12 py-8 px-4 flex flex-col items-left grid grid-cols-1  xs:grid-cols-12 gap-4">
                    <div class="col-span-4">
                        <h3 class="text-left text-2xl font-semibold mb-2">
                            Wybrane <span class="text-sunsetOrange-500">motywy: </span>
                        </h3>
                        <div v-if="selectedThemes.length" class="col-span 6 flex flex-wrap gap-4  mt-4">
                            <div v-for="theme in selectedThemes" :key="item">
                                <p class="bg-aquaBlue-500/60 rounded-full px-4 py-2 text-white">{{ theme }}
                                    <UIcon
                                        class="text-white  transition-transform duration-300 hover:scale-150 hover:cursor-pointer"
                                        width="16" height="16" name="mingcute:close-fill" dynamic
                                        @click.stop="removeFromselectedThemess(theme)"></UIcon>
                                </p>
                            </div>
                        </div>
                        <p v-else>Nie wybrano motywów.</p>
                    </div>

                    <div class="col-span-4">
                        <h3 class="text-left text-2xl font-semibold mb-2">Wybrane <span class="text-sunsetOrange-500">zdjęcie: </span></h3>
                        <img v-if="isChosenImgSrc" class="w-52  object-cover mb-2" :src="isChosenImgSrc" alt="wybrane zdjęcie zdjęcie">
                        <p v-else>Nie wybrano zdjęcia.</p>
                    </div>

                    <div class="col-span-4">
                        <UButton type="submit" variant="solid"
                        :disabled="(!isChosenImgSrc?.length) && (!selectedThemes?.length)"
                        class="bg-coolGray-500 w-full disabled:bg-coolGray-300 rounded-full px-6 py-6 hover:bg-coolGray-700 h-10 flex justify-center text-2xl font-light self-end mb-2"
                        @click="resetForm">Resetuj</UButton>

                        <UButton type="submit" variant="solid"
                        :disabled="!isChosenImgSrc?.length || !selectedThemes?.length"
                        class="bg-goldenAmber-500 disabled:bg-goldenAmber-300 rounded-full px-6 w-full py-6 hover:bg-goldenAmber-700 h-10 flex justify-center text-2xl font-light self-end"
                        @click="handleSubmit()">Generuj</UButton>
                    </div>

                </div>
            </template>
            <GenerationStartedView :selected-themes="selectedThemes"  v-else-if="isGenerationStarted && !firstGenerationFinished" />
            <GenerationFinishedView @start-new-generation="resetForm; isGenerationStarted = false;" :generated-images="generatedImages" :selected-themes="selectedThemes" v-else-if="firstGenerationFinished" />
        </article>
    </main>
</template>

<script setup>
const isGenerationStarted = ref(false);
const firstGenerationFinished = ref(false);
const upladedImageSrc = ref('');
const selectedThemes = ref([]);
const selectedRoomType = ref('');
const generatedImages = ref([]);
const isChosenImgSrc = useState("chosenImgSrc");
const userUploadedPhotos = useState("userUploadedPhotos");
const loading = ref(false);
const prediction = ref(null);
const error = ref(null);
const imgSrc = ref('');

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const { toastSuccess, toastError } = useAppToast();
const { data: userData, error: fetchError } = await supabase.auth.getUser();
userUploadedPhotos.value = userData.user.user_metadata.imagesUploaded || [];
const themes = ref([]);
const isSelected = computed(() => {
    return (item) => selectedThemes.value.includes(item);
});
const roomTypes = ref([
    {name:"Living room", displayName: 'Salon'},
    {name:"Dining room", displayName: 'Jadalnię'},
    {name:"Bedroom", displayName: 'Sypialnię'},
    {name:"Bathroom", displayName: 'Łazienkę'},
    {name:"Office", displayName: 'Biuro'},
    {name:"Kitchen", displayName: 'Kuchnię'},
    {name:"Terrace", displayName: 'Taras'},
    {name:"Kids room", displayName: 'Pokój dziecięcy'},
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
    selectedRoomType.value = roomTypes.value[0].name
    removeExpiredCookies();
});

const setImageCookie = (value) => {
    if (!value.startsWith('https')) {return};
    const imagesCookie = useCookie('generatedImages', { expires: new Date(Date.now() + 60 * 60 * 1000) });
    let images = imagesCookie.value || [];
    images.push({ src: value, timestamp: new Date().getTime() });
    imagesCookie.value = images;
};

const removeExpiredCookies = () => {
    const imagesCookie = useCookie('generatedImages', { expires: new Date(Date.now() + 60 * 60 * 1000) });
    let images = imagesCookie.value || [];
    const oneHour = 3600000;
    const now = new Date().getTime();
    images = images.filter(image => now - image.timestamp < oneHour);
    if (images.length > 0) {
        imagesCookie.value = images;
    } else {
        imagesCookie.value = null;
    }
};

const getImage = (imageSrc) => {
    toastSuccess({ title: 'Image chosen successfuly from gallery.' });
    upladedImageSrc.value = imageSrc;
}

const handleselectedThemess = (item) => {
    if (!selectedThemes.value.includes(item)) {
        selectedThemes.value.push(item);
    } else {
        selectedThemes.value = selectedThemes.value.filter(theme => theme !== item);
    }
};
const removeFromselectedThemess = (item) => {
    selectedThemes.value = selectedThemes.value.filter(theme => theme !== item);
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchPredictionStatus = async (id, theme) => {
    isGenerationStarted.value = true;
    const placeholder = { src: '', theme, status: 'progressing', progress: '0%' };
    generatedImages.value.push(placeholder);
    const placeholderIndex = generatedImages.value.length - 1;

    while (true) {
        loading.value = true;
        await sleep(1000);
        const statusResponse = await fetch(`/api/predictions/${id}`);
        const statusData = await statusResponse.json();

        if (statusResponse.status !== 200) {
            error.value = statusData.detail;
            generatedImages.value[placeholderIndex] = { ...placeholder, status: 'failed' };
            setImageCookie('generatedImages', prediction.value.output);
            loading.value = false;
            break;
        }

        prediction.value = statusData;
        const log = statusData.logs;
        const progress = extractLastPercentage(log);
        generatedImages.value[placeholderIndex].progress = progress;

        if (statusData.status === 'succeeded' || statusData.status === 'failed') {
            imgSrc.value = prediction.value.output;
            loading.value = false;
            if (statusData.status === 'succeeded') {
                generatedImages.value[placeholderIndex] = { src: prediction.value.output, theme, status: 'succeeded', progress: '100%' };
                setImageCookie(prediction.value.output);
                firstGenerationFinished.value = true;
            } else {
                generatedImages.value[placeholderIndex] = { ...placeholder, status: 'failed', progress: progress };
            }
            break;
        }
    }
};

const extractLastPercentage = (log) => {
    const regex = /(\d+)%\|/g;
    let match;
    let lastPercentage = '0%';

    while ((match = regex.exec(log)) !== null) {
        lastPercentage = `${match[1]}%`;
    }

    return lastPercentage;
};

const resetForm = async () => {
    selectedThemes.value = [];
    isChosenImgSrc.value = '';
    generatedImages.value = [];
}

const handleSubmit = async () => {
    error.value = null;
    prediction.value = null;
    const themes = Array.isArray(selectedThemes.value) ? selectedThemes.value : [selectedThemes.value];
    for (const theme of themes) {
        try {
            const response = await fetch('/api/predictions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: isChosenImgSrc.value,
                    theme: theme,
                    roomType: selectedRoomType.value,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const predictionData = await response.json();
            prediction.value = predictionData;
            fetchPredictionStatus(predictionData.id);
        } catch (err) {
            console.log(err);
        }
    };
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
};
</script>
