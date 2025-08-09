<template>
    <div class="w-full md:w-auto">
      <UButton
        v-if="!changeImgView"
        :label="t('exampleGallery.open')"
        @click="isModalExample = true"
        class="rounded-lg text-center bg-aquaBlue-500 transition-all hover:bg-aquaBlue-700 py-3 w-auto mx-auto flex justify-center"
      >
        <UIcon class="w-5 h-5 mr-3" name="material-symbols:photo-library-rounded" dynamic />
        {{ t('exampleGallery.useOneOfOurs') }}
      </UButton>
      <div v-else>
        <UIcon
          @click="isModalExample = true"
          class="hover:scale-110 transition-all cursor-pointer absolute top-2 right-4 text-white"
          width="36"
          height="36"
          name="ic:round-change-circle"
          dynamic
        />
        <UIcon
          @click="isChosenImgSrc = false;"
          class="w-[30px] h-[30px] hover:scale-110 transition-all cursor-pointer absolute top-12 right-5 text-white"
          width="30"
          height="30"
          name="zondicons:minus-solid"
          dynamic
        />
      </div>
      <UModal v-model="isModalExample" :ui="{ container: 'items-center', width: 'min-w-[75vw] lg:min-w-[50vw]' }">
        <div class="flex flex-wrap md:flex-nowrap relative">
          <div v-if="examplePhotos.length" class="flex flex-col justify-between p-4 w-full">
            <h2 class="text-2xl font-semibold text-center md:text-left">
              {{ t('exampleGallery.heading.pre') }}
              <span class="text-sunsetOrange-500">{{ t('exampleGallery.heading.highlight') }}</span>
            </h2>
            <div class="grid grid-cols-12 pl-0 p-4 place-items-center gap-2">
              <img
                @click="chosenImgHandler"
                class="col-span-12 xs:col-span-6 lg:col-span-4 hover:opacity-75 object-cover w-full max-h-36 cursor-pointer"
                v-for="item in examplePhotos"
                :src="item"
                :key="item"
              />
            </div>
          </div>
          <UIcon
            @click="isModalExample = false"
            class="hover:scale-110 transition-all cursor-pointer absolute top-8 right-0 transform -translate-x-1/2 -translate-y-1/2"
            width="36"
            height="36"
            name="material-symbols-light:close"
            dynamic
          />
        </div>
      </UModal>
    </div>
  </template>
  
  <script setup>
  const supabase = useSupabaseClient();
  const { t } = useI18n();
  const props = defineProps({
    changeImgView: {
      type: Boolean,
      value: false,
    },
  });
  
  const isModalExample = useModalExample();
  const isChosenImgSrc = useChosenImg();
  const chosenImgSource = useState("chosenImgSource");
  const examplePhotos = useExamplePhotos();
  
  const baseUrl = "https://uhfzlywrfnqujhcbmzgw.supabase.co/storage/v1/object/public/exampleGallery/";
  

  const chosenImgHandler = (event) => {
    isChosenImgSrc.value = event.target.currentSrc;
    chosenImgSource.value = 'example';
    isModalExample.value = false;
  };
  

  const fetchImages = async () => {
    const { data, error } = await supabase.storage.from("exampleGallery").list("", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name"},
    });
  
    if (error) {
      console.error(t('exampleGallery.errorFetchingFiles'), error.message);
      return;
    }
  

    examplePhotos.value = data.map((file) => `${baseUrl}${file.name}`);
  };
  
  onMounted(() => {
    fetchImages();
  });
  </script>
  