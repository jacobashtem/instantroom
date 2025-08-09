<template>
    <div class="bg-sunsetOrange-500 py-12 w-full">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {{ headingText }}
        </h2>
        <p class="mt-6 text-xl text-white max-w-3xl">
            {{ descriptionText }}
        </p>
        <div class="mt-10">
            <NuxtLink v-if="isLoggedIn" to="/design">
                <UButton variant="solid"  class="mt-4 finline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-red-500 hover:bg-gray-100 hover:text-red-600">
                <UIcon width="24" height="24" name="fluent:paint-brush-arrow-down-24-filled" dynamic /> {{ t('hero.startProject') }}
                </UButton>
            </NuxtLink>
            <NuxtLink v-else to="/login">
                <UButton variant="solid"  class="mt-4 finline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-red-500 hover:bg-gray-100 hover:text-red-600">
                <UIcon width="24" height="24" name="fluent:paint-brush-arrow-down-24-filled" dynamic /> {{ t('hero.startProject') }}
                </UButton>
            </NuxtLink>
        </div>
    </div>
</div>
</template>

<script setup>
const props = defineProps({
  heading: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});

const { t } = useI18n();
const headingText = computed(() => (props.heading && props.heading.trim().length ? props.heading : t('bgCta.heading')));
const descriptionText = computed(() => (props.description && props.description.trim().length ? props.description : t('bgCta.description')));

const { isLoggedIn, getUser } = useLoggedIn();
onMounted(async () => {
    await getUser();
})
</script>