<template>
  <main class="grid grid-cols-12 gap-4 container max-w-6xl mx-auto mt-20 min-h-screen">
    <article class="col-span-12 px-4 rounded bg-white mt-12">
      <div v-if="loading">
        <h2 class="text-3xl font-semibold mb-6 text-coolGray-500 animate-pulse">
          Trwa weryfikowanie płatności... <span class="text-sunsetOrange-500"></span>
        </h2>
        <UProgress animation="carousel" />
      </div>
      <div v-else>
        <div class="space-y-2">
          <h1 class="text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl">
            <span class="sm:text-6xl"></span> Konto zostało <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">zweryfikowane.</span>
            <br>
          </h1>
          <p class="text-base font-light tracking-tight text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl">Dodaliśmy {{ addedTokens }} tokenów do Twojego konta.</p>
        </div>
      </div>
    </article>
  </main>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const user = useSupabaseUser();
const { tokens, getTokens, updateTokens } = useUserTokens();
const addedTokens = ref('');
const loading = ref(true);

onBeforeMount(() => {
  const sessionId = route.query.session_id;
  if (!sessionId) {
    // Redirect to home if session_id is missing
    router.replace({ path: '/' });
  } else {
    // Change URL without reloading the page
    router.replace({ path: '/payment-success' });
  }
});

onMounted(async () => {
  loading.value = true;
  const sessionId = route.query.session_id;
  if (sessionId) {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session_id: sessionId })
      });
      const data = await response.json();

      if (data) {
        if (data.session.client_reference_id === user.value.id) {
          updateTokens(data.session.metadata.tokens);
          addedTokens.value = data.session.metadata.tokens;
          getTokens();
          loading.value = false;
        }
      } else {
        console.error('Weryfikacja płatności nie powiodła się.');
      }
    } catch (error) {
      console.error('Błąd podczas weryfikacji płatności:', error);
    }
  } else {
    console.error('Brak session_id w zapytaniu.');
  }
});
</script>
