
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const sessionId = body.session_id;

  if (!sessionId) {
    return { success: false, message: 'Brak session_id.' };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
        console.log('session', session);
      // Zaktualizuj stan użytkownika, np. przyznaj punkty
      await updateUser(session.customer);
      return { session };
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
