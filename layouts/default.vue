<template>
    <div class="container mx-auto max-w-full xl:max-w-8xl px-4">
      <AppHeader />
      <main class="my-10">
        <slot />
      </main>
    </div>
  </template>
  
  <script setup>
  // Link to Google Fonts
  useHead({
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
        crossorigin: ''
      }
    ]
  })
  </script>
  
  <style>
  body {
    @apply dark:bg-gray-900 bg-white
  }
  </style>