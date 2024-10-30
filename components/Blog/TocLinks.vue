<template>
    <ul class="not-prose list-[upper-roman] pl-12">
      <li v-for="link in links" :key="link.id">
        <NuxtLink
          :to="{ path: route.path, hash: `#${link.id}` }"
          class="flex items-center hover:text-customPrimary-500"
        >
          {{ link.text }}
        </NuxtLink>
        <BlogTocLinks
          class="list-[decimal]"
          :links="link.children"
        />
      </li>
    </ul>
  </template>
  
  <script setup>
  const route = useRoute();
  defineProps({
    links: { type: Array,default: () => [], required: true },
  });
  </script>
  