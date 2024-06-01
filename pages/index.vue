<template>
    <section class="flex items-center flex-col lg:flex-row justify-between mb-10">
      <h1 class="text-4xl font-extrabold mb-6 lg:mb-0">
        Redesign your room in seconds
      </h1>

      <ComparisonSlider :images="images" />
      <div>
      </div>
    </section>
  </template>
  <script setup>
  import img1 from '@/public/examples/before-image-2.webp';
  import img2 from '@/public/examples/after-image-2.webp';
  const images = [img1, img2]
  </script>