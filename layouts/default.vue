<template>
    <div class="mx-auto">
      <AppHeader />
      <main>
        <slot />
      </main>
      <AppFooter/>
    </div>
  </template>
  
  <script setup>
  useHead({
    title: 'Instant Room | Projekty wnętrz | Aplikacja do projektowania mieszkania on-line | Unikalne projekty wykończenia domu',
    description: 'Zaprojektuj wnętrze mieszkania z AI. Skorzystaj z programu Instant Room i jednym kliknięciem stwórz wyjątkowy projekt domu w swoim wymarzonym stylu.',
  })
  </script>
  
  <style>
  body {
    @apply dark:bg-gray-900 bg-white
  }
  </style>