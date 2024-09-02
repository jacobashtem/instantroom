<template>
  <div class="w-full pb-8">
     <div class="flex flex-wrap md:flex-nowrap">
       <div class="mb-4">
         <h2 class="w-full text-3xl font-semibold mb-6 grid-cols-7">
           Trwa generowanie <span class="text-sunsetOrange-500">
               {{ props.selectedThemes.length <= 1 ? 'Twojej' : 'Twoich' }} 
               {{ props.selectedThemes.length }} 
           </span> 
           wizualizacji...<br/>
         </h2>
         <p class="text-2xl mb-2 animate-pulse">
           Obecny status to:  
           <span v-if="hasProcessingStarted" class="text-green-600">
             <UIcon class="w-14 h-14 text-green-600" name="pepicons-print:paint-pallet-off" dynamic/>       
               Wizualizowanie...
           </span>
           <span v-else class="text-goldenAmber-500">
             <UIcon class="w-20 h-20 text-goldenAmber-500" name="hugeicons:workout-stretching" dynamic/>       
               Rozgrzewka...
           </span>
         </p>
         <div class="flex flex-wrap text-base mb-2 text-coolGray-500"><span class="inline-block mr-2">I trwa już:</span> <Counter :is-generating="true" /></div>
         <p class="text-base mb-2 text-coolGray-500" >
           <span class="text-goldenAmber-500"> 
           Rozgrzewka   <UIcon class="w-10 h-10 text-goldenAmber-500" name="hugeicons:workout-stretching" dynamic/>      -
           </span> według niektórych, to najważniejszy element treningu. Dla naszego modelu AI również, bo <b>zajmuje aż około 95% całego czasu!</b> 😁
           Zwykle potrwa od kilku sekund, do nawet 5-10 minut. Wystarczy cierpliwie poczekać!<br/><br/>
 
           <span class="text-green-600">
             Wizualizowanie <UIcon class="w-10 h-10" name="pepicons-print:paint-pallet-off" dynamic></UIcon>
           </span> - rozpoczyna się zaraz po rozgrzewce i potrwa już tylko kilkanaście sekund.</p> 
       </div>
       <NuxtImg class="w-full sm:w-1/2 object-contain" src="/generation.webp" />
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
     default: ''
   }
 });
 
 const hasProcessingStarted = ref(false);
 
 watch(() => props.currentStatus, (newStatus) => {
   if (newStatus === 'processing') {
     hasProcessingStarted.value = true;
   }
 });
 </script>