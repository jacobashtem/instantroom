<template>
 <div>
    <h2 class="text-3xl font-semibold mb-6">
        Trwa generowanie <span class="text-sunsetOrange-500">
            {{props.selectedThemes.length <= 1 ? 'Twojej' : 'Twoich' }} 
            {{props.selectedThemes.length}} 
        </span> 
        wizualizacji...
    </h2>
    <p class="text-base mb-2 text-coolGray-500 animate-pulse" >Nie powinno to potrwać dłużej niż 60 sekund.</p>
    <UProgress animation="carousel" />
</div>  
</template>
<script setup>
const props = defineProps({
    selectedThemes: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>