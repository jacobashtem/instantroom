<template>
<div v-if="isGenerating" class="text-base mb-2 text-coolGray-500 animate-pulse">
        <p>{{ formattedTime }}</p>
        <!-- <p v-if="elapsedTime >= 60 && elapsedTime < 120">Proces trwa już ponad minutę! To może jeszcze chwilę potrwac.</p>
        <p v-if="elapsedTime >= 120 && elapsedTime < 180">Proces trwa już ponad dwie minuty! Jeszcze tylko chwilka...</p>
        <p v-if="elapsedTime >= 300">Proces trwa już zbyt długo! Nie zapłacisz za tą wizualizację. </br />
            Nasze silniki dostają zadyszki - spróbuj ponownie za chwilę!<br />
            Najprawdopodobniej, swoją darmową wizualizację zobaczysz za chwilę w zakładce 'Ostatnie wizualizacje.'
        </p> -->
    </div>
</template>

<script setup>
const props = defineProps({
    isGenerating: Boolean,
})
const isGenerating = ref(props.isGenerating)
const elapsedTime = ref(0)
let timer = null

const startGeneration = () => {
  isGenerating.value = true
  elapsedTime.value = 0

  timer = setInterval(() => {
    elapsedTime.value += 1
  }, 1000)
}

const stopGeneration = () => {
  if (timer) {
    clearInterval(timer)
  }
}

const formattedTime = computed(() => {
    const minutes = Math.floor(elapsedTime.value / 60)
    const seconds = elapsedTime.value % 60
    return minutes > 0 ? `${minutes} min ${seconds} sek` : `${seconds} sek`
})
watch(() => isGenerating, (newVal) => {
  if (newVal) {
    startGeneration()
  }
})


onUnmounted(() => {
    stopGeneration();
})

onMounted(() => {
    startGeneration();
})
</script>