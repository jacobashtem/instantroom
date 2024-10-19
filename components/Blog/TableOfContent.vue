<template>
    <div>
      <p
        class="not-prose mb-8 text-3xl sm:text-5xl text-left lg:text-6xl bulgariamoderna"
      >
        Spis treści
      </p>
      <BlogTocLinks
        class="border-l-2 border-customPrimary-200 pl-12"
        :links="links"
      />
    </div>
  </template>
  
  <script setup>
  defineProps({
    links: { type: Array,default: () => [], required: true },
  });
  </script>
  