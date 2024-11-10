<template>
    <article class="prose dark:prose-invert max-w-none mt-0">
        <BlogFeaturedPost v-if="firstPost && firstPost._path" :first-post="firstPost" />
        <BlogSliderPosts v-if="sliderPosts.length > 0" :slider-posts="sliderPosts" />
        <BlogOtherPost v-if="otherPosts.length > 0" :other-posts="otherPosts" />
        <BlogPagination :totalPages="totalPages" :pagesToShow="pagesToShow" :currentPage="currentPage"/>
    </article>
</template>

<script setup>
useSeoMeta({
    title: 'Blog | Instantroom',
    ogTitle: 'Blog |Instantroom',
    description: 'Zanurz się w tajemniczej i fascynującej mitologii słowiańskiej...',
    ogDescription: 'Zanurz się w tajemniczej i fascynującej mitologii słowiańskiej...',
})

const { posts, totalPages, fetchPosts, postsPerPage } = useFetchPosts();
const { currentPage, pagesToShow } = usePagination(totalPages);
const firstPost = ref({});
const sliderPosts = ref([]);
const otherPosts = ref([]);

// Watcher, aby aktualizować posty na podstawie zmiany w `posts`
watch(posts, () => {
    if (posts.value.length > 0) {
        firstPost.value = posts.value[0];
        sliderPosts.value = posts.value.slice(1, 9);
        otherPosts.value = posts.value.slice(9, 15);
    }
});
const { data } = await useAsyncData('blog', () => queryContent().sort({ date: -1 }) 
          .find())
          firstPost.value =  data.value[0];
        sliderPosts.value = data.value.slice(1, 9);
        otherPosts.value = data.value.slice(9, 15);



onMounted(async () => {
    const skip = (currentPage.value - 1) * postsPerPage;
    await fetchPosts(skip, postsPerPage);
    console.log("Dane załadowane na stronie:", posts.value);
});

onBeforeRouteUpdate(async (to) => {
    const newPage = parseInt(to.query.page) || 1;
    currentPage.value = newPage;
    const skip = (currentPage.value - 1) * postsPerPage;
    await fetchPosts(skip, postsPerPage);
    console.log("Dane załadowane po zmianie trasy:", posts.value);
});

</script>

<style scoped>
.swiper-button-disabled {
    cursor: default;
}
</style>
