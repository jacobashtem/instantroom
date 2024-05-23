<template>
    <div class="max-w-3xl mx-auto p-5">
      <h1 class="py-6 text-center font-bold text-2xl">
        Wygeneruj swój obrazek korzystając z modelu SDXL
      </h1>
  
      <form class="w-full flex flex-wrap gap-2" @submit.prevent="handleSubmit">
        <input
          v-model="prompt"
          type="text"
          class="flex-grow border border-gray-300 p-2 rounded mr-2"
          placeholder="Opisz swój obrazek"
        />
        <button :disabled="loading" :class="loading ? 'bg-blue-300' : 'bg-blue-500'" class="text-white py-2 px-4 rounded" type="submit">
          Generuj.
        </button>
      </form>
  
      <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
      <div v-if="prediction" class="mt-5">
        <div v-if="prediction.output" class="image-wrapper relative w-full" style="aspect-ratio: 1 / 1;">
          <img
            :src="imgSrc"
            alt="output"
            layout="fill"
            object-fit="cover"
          />
        </div>
  
        <p v-if="loading" class="py-3 text-sm opacity-50">Musisz chwilę poczekać. Obecny status: {{ prediction.status }}.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const prompt = ref('');
  const loading = ref(false);
  const prediction = ref(null);
  const error = ref(null);
  const imgSrc = ref('');
  
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  const fetchPredictionStatus = async (id) => {
    while (true) {
      loading.value = true;
      await sleep(1000);
      const statusResponse = await fetch(`/api/predictions/${id}`);
      const statusData = await statusResponse.json();
  
      if (statusResponse.status !== 200) {
        error.value = statusData.detail;
        break;
      }
  
      prediction.value = statusData;
      console.log('statusData', statusData)
  
      if (statusData.status === 'succeeded' || statusData.status === 'failed') {
        imgSrc.value = prediction.value.output[prediction.value.output.length - 1];
      console.log('imgSrc', imgSrc.value)
        loading.value = false;
        break;
      }
    }
  };
  
  const handleSubmit = async () => {
    console.log('test');
    error.value = null;
    prediction.value = null;
  
    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt.value }),
    });
  
    const predictionData = await response.json();
  
    if (response.status !== 201) {
      error.value = predictionData.detail;
      return;
    }
  
    prediction.value = predictionData;
    fetchPredictionStatus(predictionData.id);
  };
  </script>
  