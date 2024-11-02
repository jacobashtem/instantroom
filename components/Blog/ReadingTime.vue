<template>
    <p class="text-white flex items-center mb-0 mt-0 pb-0">
      <UIcon class="mr-2" name="il:clock" dynamic/> {{ readingTime }} min
    </p>
  </template>

  <script setup>
  const props = defineProps({
    readingTimeInMinutes: { type: Number, required: true },
  });
  
  const readingTime = computed(() => {
    const minutes = parseFloat(props.readingTimeInMinutes);
    if (!isNaN(minutes)) {
      return Math.round(minutes);
    } else {
      return "< 1";
    }
  });
  </script>

  <style></style>