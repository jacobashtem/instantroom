<template>
    <div class="w-full md:w-auto">
      <UButton
        v-if="!changeImgView"
        label="Open"
        @click="isModal = true"
        class="rounded-lg text-center bg-sunsetOrange-500 transition-all hover:bg-sunsetOrange-700 py-3 w-auto mx-auto flex justify-center"
      >
        <UIcon class="w-8 h-8 mr-3" name="solar:gallery-wide-broken" dynamic />
        Wgraj zdjęcie!
      </UButton>
      <div v-else>
        <UIcon
          @click="isModal = true"
          class="hover:scale-110 transition-all cursor-pointer absolute top-2 right-4 text-white"
          width="36"
          height="36"
          name="ic:round-change-circle"
          dynamic
        />
      </div>
      <UModal v-model="isModal" :ui="{ container: 'items-center', width: 'min-w-[75vw] lg:min-w-[50vw]' }">
        <div class="flex flex-wrap md:flex-nowrap relative">
          <div class="p-4 w-full md:w-auto flex flex-col items-center">
            <h2 class="text-2xl font-semibold mb-4 text-center md:text-left">
              <span class="text-sunsetOrange-500">Dodaj nowe </span> zdjęcie
            </h2>
            <UploadImage />
          </div>
          <div v-if="userUploadedPhotos.length" class="flex flex-col justify-between p-4 w-full">
            <h2 class="text-2xl font-semibold text-center md:text-left">
              Lub użyj jednego z <span class="text-sunsetOrange-500">wgranych wcześniej </span> zdjęć.
            </h2>
            <div class="grid grid-cols-12 pl-0 p-4 place-items-center gap-2">
              <img
                @click="chosenImgHandler"
                class="col-span-12 xs:col-span-6 lg:col-span-4 hover:opacity-75 object-cover w-full max-h-36 cursor-pointer"
                v-for="item in userUploadedPhotos"
                :src="item"
                :key="item"
              />
            </div>
          </div>
          <UIcon
            @click="isModal = false"
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
  const props = defineProps({
    changeImgView: {
      type: Boolean,
      value: false
    }
  })
  const isModal = useState("modal");
  const isChosenImgSrc = useState("chosenImgSrc");
  const userUploadedPhotos = useState("userUploadedPhotos");
  
  const chosenImgHandler = (event) => {
    isChosenImgSrc.value = event.target.currentSrc;
    isModal.value = !isModal.value;
  }

  </script>
  