<template>
    <main class="grid grid-cols-12 gap-4 container max-w-6xl mx-auto mt-20 min-h-screen">
        <article class="col-span-12 px-4 rounded bg-white mt-12 ">
                <div class="flex flex-col mb-9">
                    <h2 v-if="validImages?.length > 0 " class="text-3xl font-semibold mb-4">
                        Twoje ostatnio wygenerowane <span class="text-sunsetOrange-500">wizualizacje.</span> Przechowujemy je tylko przez 1h.
                    </h2>
                    <h2 class="text-3xl font-semibold mb-4" v-else>
                        Nie masz żadnych wizualizacji <span class="text-sunsetOrange-500">wygenerowanych</span> w przeciągu ostatniej godziny.
                    </h2>

                    <UButton v-if="validImages?.length > 0 " @click="downloadAllImages" variant="solid" class="max-w-96 focus:shadow-outline focus:outline-nonetracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4">
                        <UIcon width="24" height="24" name="fluent:paint-brush-arrow-down-24-filled" dynamic /> Pobierz wszystkie wizualizacje
                    </UButton>
                </div>
                <div class="mt-5">
            <div class="grid grid-cols-2 xs:grid-cols-3 gap-4"> 
                <div v-for="(src, index) in validImages" :key="index" class="relative w-full flex items-center">
                    <div class="relative">
                        <div class="group relative">
                            <img :src="src" alt="output" class="w-[360px] transition-all cursor-pointer object-cover h-64 object-cover group-hover:brightness-50" />
                            <UIcon @click="lightBoxHandler(src, index)" width="64" height="64" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-all cursor-pointer text-white" name="mdi:eye" dynamic/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </article>
        <UModal v-model="isLightbox" :transition="false" :ui="{container: 'items-center'}">
        <div class="flex">
            <img class="cursor-pointer" :src="modalImg" alt="">
            <UIcon @click="downloadImage(modalImg)" width="56" height="56"  class="icon hover:scale-110 transition-all cursor-pointer absolute top-20 right-3 text-white" dynamic name="ic:round-download-for-offline"/>
            <UIcon @click="isLightbox = false;" width="48" height="48"  class="icon hover:scale-110 transition-all cursor-pointer absolute top-4 right-4 text-white" name="zondicons:close-solid" dynamic/>
        </div>
    </UModal>
    </main>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"]
})
const generatedImages = ref([]);
const validImages = ref([]);
const isLightbox = useState("lightbox");
const modalImg = ref();
const currentVisualizationIndex = ref(0);

const imagesCookie = useCookie('generatedImages');
const loadImagesFromCookies = () => {
  const images = imagesCookie.value || [];
  generatedImages.value = images.map(image => image.src);
  validImages.value = generatedImages.value.filter(src => src.startsWith('https'));
  console.log('Valid images:', validImages.value);
};

const lightBoxHandler = (src, index) => {
  currentVisualizationIndex.value = index + 1;
  modalImg.value = src;
  isLightbox.value = true;
};

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

const downloadAllImages = () => {
  validImages.value.forEach(src => {
    downloadImage(src);
  });
};

onMounted(() => {
  loadImagesFromCookies();
});

</script>
