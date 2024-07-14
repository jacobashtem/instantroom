<template>
  <main class="grid grid-cols-12 gap-4 container max-w-6xl mx-auto mt-20">
    <article class="col-span-12 px-4 rounded bg-white mt-12">
      <div v-if="loading">
        <h2 class="text-3xl font-semibold mb-6 text-coolGray-500 animate-pulse">
          Trwa weryfikowanie płatności... <span class="text-sunsetOrange-500"></span>
        </h2>
        <UProgress animation="carousel" />
      </div>
      <div v-else>
        <div class="grid grid-cols-1 lg:grid-cols-12">
          <div class="space-y-2 col-span- text-center lg:text-left col-span-4">
            <h1 class="text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-6xl">
              <span class="sm:text-6xl"></span> Konto zostało <span class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sunsetOrange-500 to-sunsetOrange-800">zweryfikowane.</span>
              <br>
            </h1>
            <p class="text-base font-light tracking-tight text-black sm:mt-5 sm:text-xl lg:text-lg xl:text-2xl">Dodaliśmy {{ addedTokens }} tokenów do Twojego konta.</p>
            <NuxtLink to="/design">
              <UButton variant="solid" class="mt-4 focus:shadow-outline focus:outline-nonetracking-wide font-semibold bg-sunsetOrange-500 hover:bg-sunsetOrange-700 text-gray-100 py-4 rounded-lg transition-all duration-300 ease-in-out text-lg px-4">
              <UIcon width="24" height="24" name="fluent:paint-brush-arrow-down-24-filled" dynamic /> Rozpocznij projekt
              </UButton>
          </NuxtLink>
          </div>
            <img class="w-full col-span-8" src="/payment-success.webp" />
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
const gtm = useGtm()
onBeforeMount(() => {
  const sessionId = route.query.session_id;
  if (!sessionId) {
    router.replace({ path: '/' });
  } else {
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
          gtm.trackEvent({
          event: 'purchase',
          category: 'purchase',
          action: 'purchase',
          transaction_id: data.session.id,
          value: `${data.session.amount_total / 100}`,
          user: data.session.client_reference_id,
          email: user.value.email,
          currency: data.session.currency, 
          items: [
            {
              item_id: `tokens${data.session.metadata.tokens}`,
              item_name: `${data.session.metadata.tokens}`,
              price: `${data.session.amount_total / 100}`,
              quantify: 1
            }
          ]
        })
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
