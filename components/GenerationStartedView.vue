<template>
 <div class="w-full">
    <div class="flex flex-wrap md:flex-nowrap">
      <div>
        <h2 class="w-full text-3xl font-semibold mb-6 grid-cols-7">
          Trwa generowanie <span class="text-sunsetOrange-500">
              {{props.selectedThemes.length <= 1 ? 'Twojej' : 'Twoich' }} 
              {{props.selectedThemes.length}} 
          </span> 
          wizualizacji...
        </h2>
        <p class="text-base mb-2 text-coolGray-500 animate-pulse" >Nie powinno to potrwać dłużej niż 60 sekund.</p> 
    <p class="text-base mb-2 text-coolGray-500 animate-pulse">Obecny czas realizacji to:</p><Counter :is-generating="true" />
    </div>
    <img class="w-full sm:w-1/2 object-cover" src="/generation.webp" />
    </div>
    <UProgress animation="carousel" />
</div>  
</template>
<script setup>
const props = defineProps({
    selectedThemes: {
    type: Array,
    required: true,
    default: () => []
  },
  currentStatus: {
    type: String,
    default: () => ''
  }
});
</script>