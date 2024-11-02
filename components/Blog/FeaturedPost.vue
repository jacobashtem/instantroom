<template>
    <section
      class="mt-0 h-screen md:h-[80vh] md:container md:mx-auto flex md:items-center justify-center bulgariamoderna px-4 xs:px-8"
    >
      <NuxtLink class="no-underline mt-28" :to="firstPost._path">
        <NuxtImg
          v-if="firstPost.image"
          class="absolute left-0 top-0 bg-cover object-cover z-0 w-full h-[80vh] mt-0 brightness-50"
          :src="firstPost.image.src"
          sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw 2xl:100vw"
        />
        <p v-if="firstPost.category" class="capitalize pl-0 text-sunsetOrange-500 bold font-semibold relative text-center mt-0 mb-0">
          {{ firstPost.category }}
        </p>
        <h3 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl text-left mb-2 xs:mb-4 text-center md:my-auto md:mx-auto z-10 relative no-underline mt-0">
          {{ firstPost.title }}
        </h3>
      </NuxtLink>
    </section>
  </template>

  <script setup>
  const props = defineProps({
    firstPost: {
      type: Object,
      required: true
    }
  });
  </script>