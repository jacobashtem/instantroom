<template>
    <div>
        <h2 class="text-3xl font-semibold">
            Udało się! Poniżej znajdziesz
            <span class="text-sunsetOrange-500">
                {{selectedThemes.length <= 1 ? 'Twoją wizualizację:' : 'Twoje wizualizacje:' }} 
            </span> 
        </h2>
        <div class="flex flex-wrap items-center gap-6 mt-6 justify-between">
            <UButton @click="downloadAllImages" variant="solid" class="focus:shadow-outline focus:outline-nonetracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4">
                <UIcon width="24" height="24" name="fluent:paint-brush-arrow-down-24-filled" dynamic /> Pobierz wszystkie
            </UButton>
            <UButton @click="emit('start-new-generation')" variant="solid" class="bg-coolGray-500 font-semibold disabled:bg-coolGray-300 rounded-lg hover:bg-coolGray-700 text-lg  p-4">
                <UIcon width="24" height="24" name="ph:key-return-fill" dynamic /> Zacznij od nowa
            </UButton>
        </div>
        <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
        <div class="mt-5">
            <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
                <div v-for="(image, index) in props.generatedImages" :key="index" class="relative w-full flex items-center">
                    <div class="relative" v-if="image.status === 'succeeded' && image.src.length > 0">
                        <div class="group relative">
                            <img :src="image.src" alt="output" class="transition-all cursor-pointer object-cover w-full h-full group-hover:brightness-50" />
                            <UIcon @click="lightBoxHandler(image, index)" width="64" height="64" class="w-16 h-16 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-all cursor-pointer text-white" name="mdi:eye" dynamic/>
                        </div>
                        <div class="transition absolute left-1/2 -translate-x-1/2 top-0 flex items-center justify-center">
                            <p class="top-4 relative py-2 px-6 rounded-xl text-white bg-aquaBlue-500/60 font-light text-2xl">{{ selectedThemes[index] }}</p>
                        </div>
                    </div>
                    <div v-else class="w-full h-full flex flex-col items-center justify-center">
                        <UProgress class="p-9" animation="carousel" />
                        <span class="bottom-4 right-4 text-block text-xl text-aquaBlue-500">{{ image.progress }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <UModal v-model="isLightbox" :transition="false" :ui="{ container: 'items-center justify-center' }">
  <div class="flex items-center justify-center w-full h-full">
    <ComparisonSlider :images="[originalImage, modalImg.src]" :is-home="false" class="w-full h-full" />
    <UIcon @click="downloadImage(modalImg.src)" width="56" height="56" class="w-[56px] h-[56px] icon hover:scale-110 transition-all cursor-pointer absolute top-20 right-3 text-white" dynamic name="ic:round-download-for-offline" />
    <UIcon @click="isLightbox = false;" width="48" height="48" class="w-12 h-12 icon hover:scale-110 transition-all cursor-pointer absolute top-4 right-4 text-white" name="zondicons:close-solid" dynamic />
  </div>
</UModal>





</template>
<script setup>
const error = ref(null);
const isLightbox = useState("lightbox");
const modalImg = ref();
const currentVisualizationIndex = ref(0);
const props = defineProps({
    selectedThemes: {
    type: Array,
    required: true,
    default: () => []
  },
  generatedImages: {
    type: Array,
    required: true,
    default: () => []
  },
  paidTokens: {
    type: Number,
    required: true,
    default: () => 0
  },
  originalImage: {
    type: String,
    required: true,
    default: () => ''
  }
});

const emit = defineEmits(['startNewGeneration'])

const lightBoxHandler = (image, index) => {
    currentVisualizationIndex.value = index + 1;
    modalImg.value = image;
    isLightbox.value = true;
}
const downloadImage = (url) => {
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = `wizualizacja-${currentVisualizationIndex.value}.png`;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(error => console.error('Error downloading the image:', error));
    };

 const downloadAllImages = ()  => {
    props.generatedImages.forEach(element => {
        downloadImage(element.src);
    });
 } 
</script>