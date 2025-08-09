<template>
    <div id="about" class="w-full relative bg-white overflow-hidden mt-14 mb-24 lg:mt-24 lg:mb-32">
      <div class="max-w-6xl mx-auto">
        <div class="relative z-10 bg-white lg:max-w-2xl lg:w-full">
          <svg
            class="hidden lg:block absolute right-0 inset-y-0 h-full w-24 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
  
          <div class="pt-1"></div>
  
          <div class="mt-10 mx-auto max-w-6xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h2 class="my-6 text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-6xl">
                {{ titleText }}
                <span
                  class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
                >
                  {{ highlightedText }}
                </span>
              </h2>
  
              <p class="text-xl lg:text-2xl mt-6 font-light" v-html="paragraphText" />
            </div>
          </div>
        </div>
      </div>
  
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <NuxtImg
          loading="lazy"
          class="h-72 w-full object-scale-down object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/background-comparisonwebp.webp"
          alt=""
        />
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    highlighted: {
      type: String,
      default: '',
    },
    paragraph: {
      type: String,
      default: '',
    },
  });
  const { t } = useI18n();
  const titleText = computed(() => (props.title && props.title.trim().length ? props.title : t('comparison.title.pre')));
  const highlightedText = computed(() => (props.highlighted && props.highlighted.trim().length ? props.highlighted : t('comparison.title.highlight')));
  const paragraphText = computed(() => (props.paragraph && props.paragraph.trim().length ? props.paragraph : t('comparison.paragraph')));
  </script>
  