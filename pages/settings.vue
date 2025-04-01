<template>
    <div class="container max-w-6xl mx-auto mt-24">
      <h2 class="text-3xl font-semibold text-center md:text-left mb-10">
          Profil &  <span class="hidden md:inline-block"></span> <span class="text-sunsetOrange-500">Subskrypcja</span>
      </h2>
      <!-- <UVerticalNavigation :links="links" class="col-span-2" /> -->
      <div class="col-span-4">
        <NuxtPage />
      </div>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
  middleware: ["auth"]
})

  const links = [
    {
      label: 'Profile',
      to: '/settings/profile'
    },
    {
      label: 'Avatar',
      to: '/settings/avatar'
    },
    {
      label: 'Settings',
      to: '/settings/settings'
    }
  ]
  </script>