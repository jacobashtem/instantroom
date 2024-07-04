<template>
    <div class="mt-40">
      <h1>Płatność zakończona sukcesem!</h1>
      <p>Weryfikacja płatności...</p>
    </div>
  </template>
  
  <script setup>
  const router = useRouter();
  const route = useRoute();
  
  onMounted(async () => {
    const sessionId = route.query.session_id;
  
    if (sessionId) {
      try {
        const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const data = await response.json();
        console.log('data', data);
        if (data.success) {
          // Zaktualizuj stan użytkownika, np. przyznaj punkty
          console.log('Płatność zweryfikowana i użytkownik zaktualizowany.');
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
  