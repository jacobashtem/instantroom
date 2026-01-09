<template>
  <div class="w-full pb-8">
    <div class="flex flex-wrap md:flex-nowrap">
      <div class="mb-4">
        <h2 class="w-full text-3xl font-semibold mb-6 grid-cols-7">
          {{ t('generationProgress.generating') }} <span class="text-sunsetOrange-500">
            {{ props.selectedThemes.length <= 1 ? t('generationProgress.your') : t('generationProgress.yourPlural') }} {{ props.selectedThemes.length }} </span>
              {{ t('generationProgress.visualizations') }}<br />
        </h2>
        <p class="text-2xl mb-2 animate-pulse">
          {{ t('generationProgress.currentStatus') }}
          <span v-if="hasProcessingStarted" class="text-green-600">
            <UIcon class="w-14 h-14 text-green-600" name="pepicons-print:paint-pallet-off" dynamic />
            {{ t('generationProgress.visualizing') }}
          </span>
          <span v-else-if="generationFailed" class="text-sunsetOrange-600">
            <UIcon class="w-20 h-20 text-sunsetOrange-600" name="fluent:paint-brush-subtract-32-filled" dynamic />
            {{ t('generationProgress.interrupted') }}
          </span>
          <span v-else class="text-goldenAmber-500">
            <UIcon class="w-20 h-20 text-goldenAmber-500" name="hugeicons:workout-stretching" dynamic />
            {{ t('generationProgress.warmup') }}
          </span>
        </p>
        <div v-if="!generationFailed" class="flex flex-wrap text-base mb-2 text-coolGray-500"><span
            class="inline-block mr-2">{{ t('generationProgress.andItTakes') }}</span>
          <Counter :is-generating="true" />
        </div>

        <p v-if="!generationFailed" class="text-base mb-2 text-coolGray-500">
          <span class="text-goldenAmber-500">
            {{ t('generationProgress.warmup').replace('...', '') }}
            <UIcon class="w-10 h-10 text-goldenAmber-500" name="hugeicons:workout-stretching" dynamic /> -
          </span> {{ t('generationProgress.warmupDescription') }} <b>{{ t('generationProgress.warmupImportant') }}</b> 😁
          {{ t('generationProgress.warmupWait') }}<br /><br />

          <span class="text-green-600">
            {{ t('generationProgress.visualizing').replace('...', '') }} <UIcon class="w-10 h-10" name="pepicons-print:paint-pallet-off" dynamic></UIcon>
          </span> - {{ t('generationProgress.visualizingDescription') }}
        </p>
        <p v-else-if="generationFailed" class="text-base text-coolGray-500" >
          <span class="text-sunsetOrange-600">
            {{ t('generationProgress.interrupted') }} <UIcon class="w-10 h-10" name="fluent:paint-brush-subtract-32-filled" dynamic></UIcon>
          </span> {{ t('generationProgress.interruptedDescription') }}
        </p>
        <UButton v-if="generationFailed" @click="emit('start-new-generation')" variant="solid"
          class="bg-coolGray-500 font-semibold mt-4 disabled:bg-coolGray-300 rounded-lg hover:bg-coolGray-700 text-lg  p-4">
          <UIcon width="24" height="24" name="ph:key-return-fill" dynamic /> {{ t('generationProgress.startOver') }}
        </UButton>
      </div>
      <NuxtImg class="w-full sm:w-1/2 object-contain" src="/generation.webp" />
    </div>
    <UProgress v-if="!generationFailed" animation="carousel" />
  </div>
</template>
<script setup>
const { t } = useI18n();
const props = defineProps({
  selectedThemes: {
    type: Array,
    required: true,
    default: () => []
  },
  currentStatus: {
    type: String,
    default: ''
  }
});

const hasProcessingStarted = ref(false);
const generationFailed = ref(false);
const emit = defineEmits(['startNewGeneration'])

watch(() => props.currentStatus, (newStatus) => {
  if (newStatus === 'processing') {
    hasProcessingStarted.value = true;
  }
  if (!newStatus) {
    hasProcessingStarted.value = false;
    generationFailed.value = true;
  }
});
</script>