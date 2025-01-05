import Stripe from 'stripe';
import { serverSupabaseServiceRole } from '#supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event);
  const sig = event.req.headers['stripe-signature'];

  try {
    // Walidacja webhooka
    const webhookEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.NUXT_STRIPE_WEBHOOK_SECRET
    );

    const supabase = serverSupabaseServiceRole(event);

    switch (webhookEvent.type) {
      case 'checkout.session.completed': {
        const session = webhookEvent.data.object;
        console.log('Zdarzenie: checkout.session.completed', session);

        const userId = session.client_reference_id;
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: {
            subscriptionId: session.subscription,
            isSubscriptionActive: true,
            subscriptionEnd: session.period_end,
            tokens: session.subscription_details.metadata.tokens,
          },
        });

        if (error) {
          console.error('Błąd aktualizacji subskrypcji użytkownika:', error.message);
          return { success: false, message: 'Nie udało się zaktualizować subskrypcji.' };
        }
        console.log('Subskrypcja zaktualizowana dla użytkownika:', userId);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = webhookEvent.data.object;
        console.log('Zdarzenie: invoice.payment_succeeded', invoice);

        const userId = await findUserBySubscription(invoice.subscription, supabase);
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: {
            isSubscriptionActive: true,
            subscriptionEnd: invoice.lines?.data?.[0]?.period?.end || null,
            tokens: invoice.subscription_details.metadata.tokens
          },
        });

        if (error) {
          console.error('Błąd aktualizacji subskrypcji użytkownika:', error.message);
          return { success: false, message: 'Nie udało się zaktualizować subskrypcji.' };
        }
        console.log('Subskrypcja odnowiona dla użytkownika:', userId);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = webhookEvent.data.object;
        console.log('Zdarzenie: invoice.payment_failed', invoice);

        const userId = await findUserBySubscription(invoice.subscription, supabase);
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: { isSubscriptionActive: false },
        });

        if (error) {
          console.error('Błąd aktualizacji statusu subskrypcji:', error.message);
          return { success: false, message: 'Nie udało się zaktualizować statusu subskrypcji.' };
        }
        console.log('Subskrypcja wyłączona dla użytkownika:', userId);
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = webhookEvent.data.object;
      
        console.log('Zdarzenie: customer.subscription.updated', subscription);
      
        const userId = await findUserBySubscription(subscription.id, supabase);
        if (!userId) {
          console.error('Nie znaleziono użytkownika dla subskrypcji:', subscription.id);
          return { success: false, message: 'Nie znaleziono użytkownika dla subskrypcji.' };
        }
      
        const updates = {
          isSubscriptionActive: !subscription.cancel_at_period_end, // Aktywna do końca okresu
          subscriptionEnd: subscription.current_period_end, // Data końca okresu
        };
      
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: updates,
        });
      
        if (error) {
          console.error('Błąd aktualizacji subskrypcji użytkownika:', error.message);
          return { success: false, message: 'Nie udało się zaktualizować subskrypcji.' };
        }
      
        console.log('Subskrypcja zaktualizowana dla użytkownika:', userId);
        break;
      }
      

      case 'customer.subscription.deleted': {
        const subscription = webhookEvent.data.object;
        console.log('Zdarzenie: customer.subscription.deleted', subscription);

        const userId = await findUserBySubscription(subscription.id, supabase);
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: {
            subscriptionId: null,
            isSubscriptionActive: false,
            tokens: 0,
          },
        });

        if (error) {
          console.error('Błąd podczas usuwania subskrypcji użytkownika:', error.message);
          return { success: false, message: 'Nie udało się usunąć subskrypcji.' };
        }
        console.log('Subskrypcja usunięta dla użytkownika:', userId);
        break;
      }

      default:
        console.log(`Nieobsługiwany typ zdarzenia: ${webhookEvent.type}`);
    }

    // Zwracanie odpowiedzi na webhook
    return { success: true };
  } catch (err) {
    console.error('Błąd podczas przetwarzania webhooka:', err.message);
    return { success: false, message: `Webhook Error: ${err.message}` };
  }
});

// Pomocnicza funkcja do znalezienia użytkownika po ID subskrypcji
async function findUserBySubscription(subscriptionId, supabase) {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('user_metadata->>subscriptionId', subscriptionId)
    .single();

  if (error) {
    console.error(`Błąd wyszukiwania użytkownika dla subskrypcji ${subscriptionId}:`, error.message);
    throw new Error('Nie znaleziono użytkownika.');
  }

  return data.id;
}
