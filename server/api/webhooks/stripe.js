import Stripe from 'stripe';
import { serverSupabaseServiceRole } from '#supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event); // Pobierz surowe ciało żądania
  const sig = event.req.headers['stripe-signature'];

  try {
    // Walidacja webhooka
    const webhookEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.NUXT_STRIPE_WEBHOOK_SECRET
    );

    // Obsługa zdarzenia checkout.session.completed
    if (webhookEvent.type === 'checkout.session.completed') {
      const session = webhookEvent.data.object;

      console.log('Webhook odebrał zdarzenie checkout.session.completed:', session);

      // Zapisanie danych w bazie

      const supabase = serverSupabaseServiceRole(event);
      const userId = session.client_reference_id; 
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: {
          subscriptionId: session.subscription,
          active: true,
          subscriptionEnd: session.current_period_end,
        },
      });

      if (error) {
        console.error('Błąd podczas aktualizacji subskrypcji użytkownika:', error.message);
        return {
          success: false, message: 'Nie udało się zaktualizować subskrypcji użytkownika.' };
      }

      console.log('Dane subskrypcji zapisane w bazie dla użytkownika:', userId);
    }

    // Zwracanie odpowiedzi na webhook
    return {
      success: true,
    };
  } catch (err) {
    console.error('Błąd podczas przetwarzania webhooka:', err.message);
    return {
      success: false, message: `Webhook Error: ${err.message}` };
  }
});
