import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const sessionId = body.session_id;

  if (!session_id) {
    return { success: false, message: 'Brak session_id.' };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log('session', session);
    if (session.payment_status === 'paid') {
      // Zaktualizuj stan użytkownika, np. przyznaj punkty
      await updateUser(session.customer);
      return { success: true };
    } else {
      return { success: false, message: 'Płatność nie została zakończona.' };
    }
  } catch (error) {
    return { success: false, message: `Błąd: ${error.message}` };
  }
});

async function updateUser(customerId) {
  // Logika aktualizacji użytkownika w bazie danych
  console.log('Aktualizacja użytkownika:', customerId);
}
