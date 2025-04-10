<template>
    <div class="relative">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="(img, index) in beforeImages"
          :key="index"
          class="relative group cursor-pointer rounded-lg overflow-hidden"
          @click="openModal(index)"
        >
          <img
            :src="img"
            :alt="`Przed (${index + 1})`"
            class="w-full h-full object-cover transition duration-300 group-hover:brightness-75"
          />
          <UIcon
            name="mdi:eye"
            dynamic
            class="absolute inset-0 m-auto text-white w-12 h-12 transition duration-300"
          />
        </div>
      </div>
  
      <!-- Modal -->
      <UModal v-model="isModalOpen" :transition="false" :ui="{ container: 'items-center justify-center z-[99]' }">
        <div class="flex items-center justify-center w-full h-full relative">
          <ComparisonSlider
            :images="[afterImages[activeIndex], beforeImages[activeIndex]]"
            :is-home="false"
            class="w-full h-full"
          />
  
          <!-- Desktop strzałki - styl jak z przesłanego przykładu -->
          <div
            class="hidden md:flex absolute top-1/2 left-2 z-[101] -translate-y-1/2 cursor-pointer"
            @click="prevImage"
          >
            <div class="bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition">
              <UIcon name="mdi:chevron-left" dynamic class="w-6 h-6" />
            </div>
          </div>
  
          <div
            class="hidden md:flex absolute top-1/2 right-2 z-[101] -translate-y-1/2 cursor-pointer"
            @click="nextImage"
          >
            <div class="bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center hover:scale-110 transition">
              <UIcon name="mdi:chevron-right" dynamic class="w-6 h-6" />
            </div>
          </div>
  
          <!-- Mobile strzałki POD komponentem -->
          <div class="flex md:hidden flex-col items-center absolute top-full mt-6 left-1/2 -translate-x-1/2 z-[101] gap-4">
            <div class="flex gap-6">
              <div @click="prevImage" class="cursor-pointer hover:scale-110 transition">
                <div class="bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center">
                  <UIcon name="mdi:chevron-left" dynamic class="w-6 h-6" />
                </div>
              </div>
              <div @click="nextImage" class="cursor-pointer hover:scale-110 transition">
                <div class="bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center">
                  <UIcon name="mdi:chevron-right" dynamic class="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
  
          <UIcon
            @click="isModalOpen = false"
            width="48"
            height="48"
            class="w-12 h-12 absolute top-4 right-4 text-white hover:scale-110 transition cursor-pointer z-[101]"
            name="zondicons:close-solid"
            dynamic
          />
        </div>
      </UModal>
    </div>
  </template>
  
  <script setup>
  import { useEventListener } from '@vueuse/core';
  
  const beforeImages = [
    '/gallery-before-1.webp',
    '/gallery-before-2.webp',
    '/gallery-before-3.webp',
    '/gallery-before-4.webp',
    '/gallery-before-5.webp',
    '/gallery-before-6.webp',
    '/gallery-before-7.webp',
    '/gallery-before-8.webp'
  ];
  
  const afterImages = [
    '/gallery-after-1.webp',
    '/gallery-after-2.webp',
    '/gallery-after-3.webp',
    '/gallery-after-4.webp',
    '/gallery-after-5.webp',
    '/gallery-after-6.webp',
    '/gallery-after-7.webp',
    '/gallery-after-8.webp'
  ];
  
  const activeIndex = ref(0);
  const isModalOpen = ref(false);
  
  function openModal(index) {
    activeIndex.value = index;
    isModalOpen.value = true;
  }
  
  function nextImage() {
    if (activeIndex.value < beforeImages.length - 1) {
      activeIndex.value++;
    }
  }
  
  function prevImage() {
    if (activeIndex.value > 0) {
      activeIndex.value--;
    }
  }
  
  function handleKey(e) {
    if (!isModalOpen.value) return;
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') isModalOpen.value = false;
  }
  
  useEventListener(window, 'keydown', handleKey);
  </script>
  
  <style scoped>
  /* nie trzeba stylów columns — zmienione na grid */
  </style>
  