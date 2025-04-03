<template>
    <div>
        <AppHeader />
      <main>
        <div class="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
            style="background-image: url('404.webp')">
            <div class="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
                <h1 class="text-4xl font-bold text-gray-800 mb-6">Oops! Pokój nie został znaleziony!</h1>
                <p class="text-lg text-gray-600 mb-8">Wygląda na to, że zgubiłeś/aś się w labiryncie pomieszczeń. Spokojnie, pomożemy Ci trafić do wymarzonego pokoju.</p>
                <NuxtLink to="/"
                class="bg-aquaBlue-500  hover:bg-aquaBlue-700 inline-block  text-white font-semibold px-6 py-3 rounded-md hover:bg-customPrimary-700 transition-colors duration-300">
                Wróć na stronę główną
            </NuxtLink>
            </div>
            </div>
      </main>
      <AppFooter />
    </div>
  </template>
  
  
  
  <script setup>
  defineProps({ error: Object })
  </script>