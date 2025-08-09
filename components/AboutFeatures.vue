<template>
<section class="w-full">
  <div class="max-w-xl p-6 mx-auto pt-14 pb-24 lg:pt-24 lg:pb-32 px-4 lg:max-w-6xl">
    <div>
      <h2 class="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">{{ t('aboutFeatures.heading.pre') }}
        <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">
            {{ t('aboutFeatures.heading.highlight') }}
        </span>
        </h2>
      <p class="text-xl lg:text-2xl mt-6 font-light">{{ t('aboutFeatures.subtitle') }}</p>
    </div>
    <div class="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
      <div>
        <div class="mt-12 space-y-12">
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20  text-aquaBlue-500" name="game-icons:unicorn" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">{{ t('aboutFeatures.items.unique.title') }}</h4>
              <p class="mt-4 text-lg font-light tracking-tight sm:mt-2 sm:text-xl lg:text-lg xl:text-2xl" v-html="t('aboutFeatures.items.unique.desc')"></p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20 text-aquaBlue-500" name="subway:mark" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">{{ t('aboutFeatures.items.nowatermark.title') }}</h4>
              <p class="mt-4 text-lg font-light tracking-tight  sm:mt-2 sm:text-xl lg:text-lg xl:text-2xl">{{ t('aboutFeatures.items.nowatermark.desc') }}</p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20 text-aquaBlue-500" name="mdi:meditation" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">{{ t('aboutFeatures.items.saveTime.title') }}</h4>
              <p class="mt-4 text-lg font-light tracking-tight  sm:mt-2 sm:text-xl lg:text-lg xl:text-2xl">{{ t('aboutFeatures.items.saveTime.desc') }}</p>
            </div>
          </div>
          <div class="flex">
            <div class="flex-shrink-0">
              <div class="flex items-center justify-center w-12 h-12 rounded-md">
                <UIcon class="w-20 h-20 bg-white text-aquaBlue-500  rounded-full" name="tabler:coin-filled" dynamic></UIcon>
            </div>
            </div>
            <div class="ml-4">
              <h4 class="text-2xl lg:text-2xl font-medium leading">{{ t('aboutFeatures.items.free.title') }}</h4>
              <p class="mt-4 ext-lg font-light tracking-tight sm:mt-2 sm:text-xl text-lg xl:text-2xl" v-html="t('aboutFeatures.items.free.desc')"></p>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" class="mt-10 lg:mt-0">
        <NuxtImg loading="lazy" width="600" height="600" src="/about-us-promo-img.webp" class="mx-auto lg:ml-8" style="color:transparent"/>
      </div>
    </div>
  </div>
</section>

</template>

<script setup>
const { t } = useI18n();
</script>