<template>
    <main class="grid grid-cols-12 gap-4 container max-w-6xl mx-auto mt-20 min-h-screen">
        <article class="col-span-12 px-4 rounded bg-white mt-12">
            <template v-if="!isGenerationStarted">
                <div class="flex flex-col mb-9">
                    <h2 class="text-3xl font-semibold text-center md:text-left">
                        Znajdź <span class="hidden md:inline-block">swoją</span> <span class="text-sunsetOrange-500">inspirację.</span>
                    </h2>
                    <div class="grid grid-cols-1 items-center gap-2">
                        <div class="flex mt-6 items-center justify-center md:justify-start">
                            <div v-if="!isChosenImgSrc">
                                <div class="flex  w-full justify-center flex-wrap gap-1">
                                    <p class="mr-6 hidden md:inline-block text-2xl font-semibold">Po pierwsze: </p>
                                        <UploadedGallery /> <span class="flex items-center mx-4">lub</span> <ExampleGallery />
                                </div>
                            </div>
                            <div class="col-span-4 flex flex-col" v-else>
                                <h3 class="text-2xl font-semibold mb-2 text-center md:text-left">Wybrane <span class="text-sunsetOrange-500">zdjęcie: </span></h3>
                                <div class="relative">
                                    <img class="h-40 w-80 object-cover mb-2 brightness-75" :src="isChosenImgSrc" alt="wybrane zdjęcie">
                                    <UploadedGallery v-if="chosenImgSource === 'uploaded'" changeImgView />
                                    <ExampleGallery v-if="chosenImgSource === 'example'" changeImgView />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <UCarousel arrows  v-slot="{ item }" :items="themes" :prev-button="{ class: 'z-20' }" :next-button="{ class: 'z-20' }" :ui="{ item: 'snap-start' }">
                    <div class="relative select-none transition-all border">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <p class="z-10 relative py-2 px-6 rounded-xl text-white bg-aquaBlue-500/60 font-light text-2xl">{{ item }}</p>
                        </div>
                        <img :class="isSelected(item) ? 'brightness-50' : 'brightness-75'" :src="`/themes/${item}.webp`" width="280" class="h-60 object-cover" draggable="false">
                        <UIcon v-if="!isSelected(item)" @click="handleSelectedThemes(item)" class="hover:scale-110 transition-all cursor-pointer absolute top-4 right-4 text-white" width="36" height="36" name="subway:add" dynamic></UIcon>
                        <UIcon v-else @click="handleSelectedThemes(item)" class="hover:scale-110 transition-all cursor-pointer absolute top-4 right-4 text-sunsetOrange-500" width="36" height="36" name="zondicons:minus-solid" dynamic></UIcon>
                    </div>
                </UCarousel>
                <div class="flex items-center mt-6 justify-center md:justify-start">
                    <p class="text-2xl font-semibold mr-4"><span class="md:inline-block hidden">Po drugie: </span>
                        <span class="text-sunsetOrange-500 capitalize md:normal-case"> odmień</span> 
                        <span class="hidden md:inline-block"></span></p>
                    <UFormGroup class="ring-0">
                        <USelect option-attribute="label" size="xl" selected padded class="text-center font-semibold text-sunsetOrange-500" v-model="selectedRoomType" :options="roomTypes.map(type => ({ label: type.displayName, value: type.name }))" />
                    </UFormGroup>
                </div>
                <div class="shadow-2xl rounded-2xl mt-9 py-8 px-4 flex-col items-left grid grid-cols-1 xs:grid-cols-12 gap-4">
                    <div class="col-span-4">
                        <h3 class="text-left text-2xl font-semibold mb-2">
                            Wybrane <span class="text-sunsetOrange-500">motywy: </span>
                        </h3>
                        <div v-if="selectedThemes.length" class="col-span-6 flex flex-wrap gap-4 mt-4">
                            <div v-for="theme in selectedThemes" :key="theme">
                                <p class="bg-aquaBlue-500/60 rounded-full px-4 py-2 text-white">{{ theme }}
                                    <UIcon class="text-white transition-transform duration-300 hover:scale-150 hover:cursor-pointer" width="16" height="16" name="mingcute:close-fill" dynamic @click.stop="removeFromSelectedThemes(theme)"></UIcon>
                                </p>
                            </div>
                        </div>
                        <p v-else>Nie wybrano motywów.</p>
                    </div>
                    <div class="col-span-4">
                        <h3 class="text-left text-2xl font-semibold mb-2">Za wybrane wizualizacje, wydasz:</h3>
                        <p><span class="text-sunsetOrange-500 font-bold ">{{ tokensToSpend }}</span> tokenów </p>
                    </div>
                    <div class="col-span-4">
                        <UButton type="submit" variant="solid" :disabled="(!isChosenImgSrc?.length) && (!selectedThemes?.length)" class="bg-coolGray-500 w-full disabled:bg-coolGray-300 rounded-full px-6 py-6 hover:bg-coolGray-700 h-10 flex justify-center text-2xl font-light self-end mb-2" @click="resetForm">Resetuj</UButton>
                        <UButton type="submit" variant="solid" :disabled="!isChosenImgSrc?.length || !selectedThemes?.length" class="bg-sunsetOrange-500 disabled:bg-sunsetOrange-200 rounded-full px-6 w-full py-6 hover:bg-sunsetOrange-700 h-10 flex justify-center text-2xl font-light self-end" @click="isSpendTokensModal = true">Generuj</UButton>
                    </div>
                </div>
            </template>
            <GenerationStartedView @start-new-generation="resetForm" :currentStatus="currentStatus" :selected-themes="selectedThemes" v-else-if="isGenerationStarted && !firstGenerationFinished" />
            <GenerationFinishedView :original-image="isChosenImgSrc" :paid-tokens="tokensToSpend" @start-new-generation="resetForm" :generated-images="generatedImages" :selected-themes="selectedThemes" v-else-if="firstGenerationFinished" />
            <UModal :overlay="true" v-model="isSpendTokensModal" :transition="true" :ui="{ container: 'items-center' }">
                <div class="flex px-4 py-8">
                    <h3 v-if="!notEnoughTokensAlert" class="text-2xl font-semibold text-center md:text-left">
                        Czy na pewno chcesz zamienić 
                        <span class="text-sunsetOrange-500 text-2xl">{{ tokensToSpend }} {{ inflectToken(tokensToSpend) }}</span><br />
                        na 
                        <span class="text-sunsetOrange-500 text-2xl">{{ tokensToSpend }} {{ inflectVisualization(tokensToSpend) }}</span>?
                    </h3>
                    <h3 class="text-xl font-semibold text-center md:text-left" v-else>
                        Masz za mało tokenów. Posiadasz 
                        <span class="text-sunsetOrange-500 text-lg">{{ tokens }} {{ inflectToken(tokens) }}</span>, <br />
                        a próbujesz wygenerować 
                        <span class="text-sunsetOrange-500 text-lg">
                          {{ tokensToSpend }} {{ inflectVisualization(tokensToSpend) }}.
                        </span><br /> 1 token to 1 wizualizacja 
                    </h3>
                </div>
                <div class="mb-8 flex justify-between">
                    <UButton label="Open" @click="closeSpendTokensModal" class="rounded-lg text-center transition-all w-auto mx-auto flex justify-center bg-coolGray-500 disabled:bg-coolGray-300 px-3 sm:px-6 hover:bg-coolGray-700 py-3">
                        <UIcon class="w-8 h-8 mr-3" name="material-symbols:cancel" dynamic></UIcon>
                        Anuluj
                    </UButton>
                    <UButton v-if="!notEnoughTokensAlert" label="Open" @click="handleSubmit" class="rounded-lg text-center bg-sunsetOrange-500 transition-all hover:bg-sunsetOrange-700 py-3 w-auto mx-auto flex justify-center">
                        <UIcon class="w-8 h-8 mr-3" name="carbon:next-filled" dynamic></UIcon>
                        Tak. Generuj!
                    </UButton>
                    <UButton v-else label="Open" @click="buyTokens" class="rounded-lg text-center bg-sunsetOrange-500 transition-all hover:bg-sunsetOrange-700 py-3 w-auto mx-auto flex justify-center">
                        <UIcon class="w-8 h-8 mr-3" name="carbon:next-filled" dynamic></UIcon>
                        Kup tokeny 
                    </UButton>
                </div>
            </UModal>
        </article>
    </main>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
const isGenerationStarted = ref(false);
const firstGenerationFinished = ref(false);
const upladedImageSrc = ref('');
const selectedThemes = ref([]);
const selectedRoomType = ref('');
const generatedImages = ref([]);
const isChosenImgSrc = useState("chosenImgSrc");
const chosenImgSource = useState('chosenImgSource');
const userUploadedPhotos = useState("userUploadedPhotos");
const isSpendTokensModal = useState("spendTokensModal");
const notEnoughTokensAlert = ref(false);
const loading = ref(false);
const prediction = ref(null);
const error = ref(null);
const imgSrc = ref('');
const currentStatus = ref('');
const tokensToSpend = computed(() => selectedThemes.value.length);

const supabase = useSupabaseClient();
const user = useSupabaseUser()
const { decrementToken, tokens } = useUserTokens();
const { inflectToken, inflectVisualization } = useInflection();
const { toastSuccess, toastError } = useAppToast();
const { data: userData, error: fetchError } = await supabase.auth.getUser();
const images =  [];
images.value = userData?.user?.user_metadata?.imagesUploaded || [];
userUploadedPhotos.value = (userData?.user?.user_metadata?.imagesUploaded?.slice() || []).reverse();

const themes = ref([]);
const roomTypes = ref([
    { name: "Living room", displayName: 'Salon' },
    { name: "Dining room", displayName: 'Jadalnię' },
    { name: "Bedroom", displayName: 'Sypialnię' },
    { name: "Bathroom", displayName: 'Łazienkę' },
    { name: "Office", displayName: 'Biuro' },
    { name: "Kitchen", displayName: 'Kuchnię' },
    { name: "Terrace", displayName: 'Taras' },
    { name: "Kids room", displayName: 'Pokój dziecięcy' },
]);

const isSelected = (item) => selectedThemes.value.includes(item);

onMounted(async () => {
    const { data: themesData, error: themesError } = await supabase.from('sorted_prompts').select('theme');
    if (themesError) {
        toastError({ title: 'Error fetching themes', description: themesError.message });
        return;
    }
    themes.value = themesData.map(theme => theme.theme);
    selectedRoomType.value = roomTypes.value[0].name
    removeExpiredCookies();
});

const setImageCookie = (value) => {
    if (!value.startsWith('https')) return;
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
    imagesCookie.value = images.length > 0 ? images : null;
};

const getImage = (imageSrc) => {
    toastSuccess({ title: 'Obrazek został prawidłowo wybrany z galerii' });
    upladedImageSrc.value = imageSrc;
};

const handleSelectedThemes = (item) => {
    selectedThemes.value = selectedThemes.value.includes(item) ? selectedThemes.value.filter(theme => theme !== item) : [...selectedThemes.value, item];
};

const removeFromSelectedThemes = (item) => {
    selectedThemes.value = selectedThemes.value.filter(theme => theme !== item);
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchPredictionStatus = async (id, theme) => {
    isGenerationStarted.value = true;
    const placeholder = { src: '', theme, status: 'progressing', progress: '0%' };
    generatedImages.value.push(placeholder);
    const placeholderIndex = generatedImages.value.length - 1;

    let retries = 20;
    const waitTime = 2000;

    while (retries > 0) {
        try {
            loading.value = true;
            await sleep(1000);    
            const statusResponse = await fetch(`/api/predictions/${id}`);
            const contentType = statusResponse.headers.get('content-type');
            if (contentType && contentType.includes('text/html')) {
                throw new Error('Server returned an HTML response instead of JSON');
            }

            const statusData = await statusResponse.json();
            currentStatus.value = statusData.status;
            if (statusResponse.status !== 200) {
                error.value = statusData.detail;
                generatedImages.value[placeholderIndex] = { ...placeholder, status: 'failed' };
                setImageCookie('generatedImages', prediction.value.output);
                loading.value = false;
                break;
            }

            prediction.value = statusData;
            const progress = extractLastPercentage(statusData.logs);
            generatedImages.value[placeholderIndex].progress = progress;

            if (['succeeded', 'failed'].includes(statusData.status)) {
                imgSrc.value = prediction.value.output;
                loading.value = false;
                if (statusData.status === 'succeeded') {
                    generatedImages.value[placeholderIndex] = { src: prediction.value.output, theme, status: 'succeeded', progress: '100%' };
                    setImageCookie(prediction.value.output);
                    decrementToken();
                    firstGenerationFinished.value = true;
                } else {
                    generatedImages.value[placeholderIndex] = { ...placeholder, status: 'failed', progress: progress };
                }
                break;
            }
        } catch (error) {
            console.warn(`Błąd w fetchPredictionStatus: ${error.message}. Pozostało prób: ${retries - 1}`);
            retries--;

            if (retries > 0) {
                await sleep(waitTime);
            } else {
                generatedImages.value[placeholderIndex] = { ...placeholder, status: 'failed' };
                loading.value = false;
                console.error('Próby ponowienia się nie powiodły, przerywamy.');
            }
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
    selectedRoomType.value = roomTypes.value[0].name;
    isGenerationStarted.value = false;
    firstGenerationFinished.value = false;
    upladedImageSrc.value = '';
    currentStatus.value = '';
    loading.value = false;
    prediction.value = null;
    error.value = null;
}
const handleSubmit = async () => {
    isSpendTokensModal.value = false;
    if(tokensToSpend.value <= tokens.value){
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
                    body: JSON.stringify({ image: isChosenImgSrc.value, theme, roomType: selectedRoomType.value }),
                });
                if (!response.ok) throw new Error('Network response was not ok');
                const predictionData = await response.json();
                prediction.value = predictionData;
                fetchPredictionStatus(predictionData.id, theme);
            } catch (err) {
                console.log(err);
            }
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        isSpendTokensModal.value = true;
        notEnoughTokensAlert.value = true;
    }
};

const closeSpendTokensModal = () => {
    isSpendTokensModal.value = false;
    notEnoughTokensAlert.value = false;
};

const buyTokens = () => {
    notEnoughTokensAlert.value = false;
    isSpendTokensModal.value = false;
    navigateTo('/cennik');
};
</script>
