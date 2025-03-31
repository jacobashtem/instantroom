<template>
  <section class="w-full">
    <div class="max-w-xl p-6 mx-auto pt-14 pb-24 lg:pt-24 lg:pb-32 px-4 lg:max-w-6xl">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl">
          {{ heading }}
          <span
            class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800"
          >
            {{ highlighted }}
          </span>
        </h2>
        <p class="text-xl lg:text-2xl mt-6 font-light">
          {{ subtitle }}
        </p>
      </div>

      <div class="mt-12 space-y-24">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="grid lg:grid-cols-2 lg:gap-10 lg:items-center"
          :class="{ 'lg:flex-row-reverse': index % 2 === 1 }"
        >
          <!-- Tekst -->
          <div :class="index % 2 === 1 ? 'lg:order-2' : ''">
            <div class="flex">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center w-12 h-12 rounded-md">
                  <UIcon
                    class="w-20 h-20 text-aquaBlue-500"
                    :class="item.iconBg ? 'bg-white rounded-full' : ''"
                    :name="item.icon"
                    dynamic
                  />
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-2xl lg:text-2xl font-medium leading">
                  {{ item.title }}
                </h4>
                <p
                  class="mt-4 text-lg font-light tracking-tight sm:mt-2 sm:text-xl lg:text-lg xl:text-2xl"
                  v-html="item.description"
                />
              </div>
            </div>
          </div>

          <!-- ComparisonSlider -->
          <div
            class="mt-10 lg:mt-0 w-full flex items-center mx-auto"
            :class="index % 2 === 1 ? 'lg:order-1' : ''"
          >
            <ComparisonSlider
              v-if="item.images"
              :is-home="true"
              :images="item.images"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ComparisonSlider from '@/components/ComparisonSlider.vue'

const props = defineProps({
  heading: {
    type: String,
    default: 'Dlaczego',
  },
  highlighted: {
    type: String,
    default: 'warto?',
  },
  subtitle: {
    type: String,
    default: 'Co wyróżnia Instantroom i czyni wyjątkowym?',
  },
  items: {
    type: Array,
    default: () => [],
  },
});
</script>
