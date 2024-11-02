<template>
    <section class="md:container md:mx-auto relative px-4 xs:px-8">
      <h2 class="text-black">{{$t("blog.other")}}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
        <PostCard v-for="post in otherPosts" :key="post._id" :post="post"/>
      </div>
    </section>
  </template>
  
  <script setup>  
  const props = defineProps({
    otherPosts: {
      type: Array,
      required: true
    }
  });
  </script>
  