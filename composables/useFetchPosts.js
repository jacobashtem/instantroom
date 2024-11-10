export function useFetchPosts() {
  const posts = ref([]);
  const totalPages = ref(0);
  const postsPerPage = 12;
  async function fetchPosts(skip = 0, limit = 0) {
      try {
          const query = await queryContent()
              .sort({ date: -1 })
              .skip(skip || 0)
              .limit(limit || 0);
              
          posts.value = await query.find();
          const totalPosts = await query.count();
          totalPages.value = Math.ceil(totalPosts / postsPerPage);
      } catch (error) {
          console.error(error);
      }
  }

  return {
      posts,
      totalPages,
      postsPerPage,
      fetchPosts
  };
}
