<template>
  <div class="pt-14 pb-24 bg-aquaBlue-500 lg:mb-16 md:items-center flex">
    <div class="mx-auto pt-24  px-3 flex justify-between items-center my-3 container max-w-6xl">
        <div class="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8 max-w-6xl mx-auto">
            <div class="sm:text-center md:mx-auto md:max-w-2xl col-span-12 lg:col-span-6 lg:flex lg:items-center lg:text-left">
                <div class="space-y-8">
                    <div class="space-y-4">
                        <div class="space-y-2">
                            <span
                                class="rounded-full uppercase bg-sunsetOrange-500 px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                              {{ labelText }}
                            </span>
                            <h1 v-if="!customHeading" class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                                {{ t('hero.heading.pre') }}
                                <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">{{ t('hero.heading.highlight') }}</span>
                                <br />
                                {{ t('hero.heading.post') }}
                            </h1>
                            <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl" v-else>{{ customHeading }}</h1>
                        </div>

                        <p class="text-xl font-light tracking-tight text-white sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl">
                          <slot>{{ descriptionText }}</slot>
                        </p>
                        <NuxtLink v-if="isLoggedIn" to="/design">
                            <UButton variant="solid" class="mt-4 focus:shadow-outline focus:outline-nonetracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4">
                            <UIcon width="24" height="24" name="fluent:paint-brush-arrow-down-24-filled" dynamic /> {{ t('hero.startProject') }}
                            </UButton>
                        </NuxtLink>
                        <NuxtLink v-else to="/login">
                            <UButton variant="solid" class="mt-4 focus:shadow-outline focus:outline-nonetracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4">
                            <UIcon width="24" height="24" name="fluent:paint-brush-arrow-down-24-filled" dynamic /> {{ t('hero.startProject') }}
                            </UButton>
                        </NuxtLink>
                    </div>

                    <!-- <div class="border-t border-coolGray-700"></div> -->
                </div>
            </div>

            <div class="flex items-center col-span-12  lg:col-span-6 ">
                <div class="w-full col-span-12 flex items-center mx-auto">
                    <ComparisonSlider :is-home="true" :images="images" />
                </div>
            </div>

        </div>
    </div>
</div>
</template>
<script setup>
const { isLoggedIn, getUser } = useLoggedIn();
const { t } = useI18n();
onMounted(async () => {
    await getUser();
})
  import img1 from '@/public/examples/before-image-2.webp';
  import img2 from '@/public/examples/after-image-2.webp';

const props = defineProps({
  customHeading: {
    type: String,
    default: () => '',
  },
  label: {
    type: String,
    default: () => '',
  },
  description: {
    type: String,
    default: () => '',
  },
  images: {
    type: Array,
    default: () => [img1, img2],
  },
});

const labelText = computed(() => props.label || t('hero.label'));
const descriptionText = computed(() => props.description || t('hero.description'));

</script>