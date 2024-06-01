<template>
    <div class="mx-auto">
      <AppHeader />
      <main>
        <slot />
      </main>
    </div>
  </template>
  
  <script setup>
  // Link to Google Fonts
  useHead({
    title: 'Instant Room | Projekty wnętrz | Aplikacja do projektowania mieszkania on-line | Unikalne projekty wykończenia domu',
    description: 'Zaprojektuj wnętrze mieszkania z AI. Skorzystaj z programu Instant Room i jednym kliknięciem stwórz wyjątkowy projekt domu w swoim wymarzonym stylu.',
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