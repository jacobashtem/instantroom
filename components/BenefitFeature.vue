<template>
    <section class="mx-auto container max-w-6xl lg:scroll-pt-24 pt-14 lg:pb-14">
      <div
        class="mx-auto px-4 lg:flex lg:gap-8 items-stretch"
        :class="{
          'lg:flex-row': imagePosition === 'right',
          'lg:flex-row-reverse': imagePosition === 'left',
        }"
      >
        <div class="sm:text-center lg:text-left lg:w-1/2">
          <h2 class="text-3xl lg:text-4xl xl:text-5xl font-bold leading-none">
            {{ heading }}
            <span
              class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
            >
              {{ highlightedText }}
            </span>
            {{ restOfHeading }}
          </h2>
          <div class="text-xl lg:text-2xl mt-6 font-light text-justify">
            <slot name="description">
              <p v-for="(paragraph, index) in paragraphs" :key="index" class="mb-6" v-html="paragraph" />
            </slot>
          </div>
        </div>
        <div class="lg:w-1/2">
          <NuxtImg
            class="mx-auto mt-8 lg:mt-0 h-full object-contain"
            loading="lazy"
            :src="imageSrc"
          />
        </div>
      </div>
      <p v-html="bottomParagraph" class="mt-6 lg:mt-0 w-full text-xl lg:text-2xl font-light text-justify px-4"/>
    </section>

  </template>
  
  <script setup>
  defineProps({
    heading: String,
    highlightedText: String,
    restOfHeading: String,
    imageSrc: {
      type: String,
      required: true,
    },
    imagePosition: {
      type: String,
      default: 'right',
      validator: (val) => ['left', 'right'].includes(val),
    },
    paragraphs: {
      type: Array,
      default: () => [],
    },
    bottomParagraph: {
      type: String,
      default: '',
    },
  });
  </script>
  