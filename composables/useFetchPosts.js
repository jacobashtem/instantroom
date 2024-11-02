export function useFetchPosts() {
    const posts = ref([]);
    const totalPages = ref(0);
    const postsPerPage = 12; // Możesz dostosować liczbę postów na stronę
  
    // Funkcja do pobierania postów z obsługą paginacji
    async function fetchPosts(page = 1) {
      try {
        const skip = (page - 1) * postsPerPage;
  
        // Zapytanie o posty z odpowiednią paginacją
        const query = queryContent()
          .sort({ date: -1 }) // Sortowanie po dacie malejąco
          .skip(skip)
          .limit(postsPerPage);
  
        // Pobieranie postów
        posts.value = await query.find();
        console.log("Posty pobrane:", posts.value);
  
        // Pobieranie całkowitej liczby postów dla paginacji
        const totalPosts = await queryContent().count();
        totalPages.value = Math.ceil(totalPosts / postsPerPage);
      } catch (error) {
        console.error('Błąd podczas pobierania postów:', error);
      }
    }
  
    // Zwracamy funkcję do wywołania z `useAsyncData`
    return {
      posts,
      totalPages,
      postsPerPage,
      fetchPosts,
    };
  }
  