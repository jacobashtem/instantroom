import Stripe from 'stripe';
import { serverSupabaseServiceRole } from '#supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event);
  const sig = event.req.headers['stripe-signature'];

  try {
    const webhookEvent = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.NUXT_STRIPE_WEBHOOK_SECRET
    );

    const supabase = serverSupabaseServiceRole(event);

    switch (webhookEvent.type) {
      case 'checkout.session.completed': {
        const session = webhookEvent.data.object;
      
        const userId = session.client_reference_id;
        const tokens = session.metadata.tokens;      
        const subscriptionId = session.subscription;
        if (subscriptionId) {
          await stripe.subscriptions.update(subscriptionId, {
            metadata: {
              userId: userId,
              tokens: tokens,
            },
          });
        }
      
        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: {
            subscriptionId: session.subscription,
            isSubscriptionActive: true,
            subscriptionEnd: session.current_period_end,
            tokens: tokens
          },
        });
      
        if (error) {
          console.error('Błąd podczas aktualizacji subskrypcji użytkownika:', error.message);
          return { success: false, message: 'Nie udało się zaktualizować subskrypcji użytkownika.' };
        }
      
        console.log('Dane subskrypcji zapisane w bazie dla użytkownika:', userId);
        break;
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = webhookEvent.data.object;
        console.log('Zdarzenie: invoice.payment_succeeded', invoice);

        const userId = invoice.lines?.data?.[0]?.metadata?.userId;
        const tokens = invoice.lines?.data?.[0]?.metadata?.tokens;
        if (!userId) {
          console.error('Nie znaleziono userId w metadanych faktury:', invoice.id);
          return { success: false, message: 'Nie znaleziono userId.' };
        }

        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: {
            isSubscriptionActive: true,
            subscriptionEnd: invoice.lines?.data?.[0]?.period?.end || null,
            tokens: tokens,
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

        const userId = invoice.metadata?.userId;
        if (!userId) {
          console.error('Nie znaleziono userId w metadanych faktury:', invoice.id);
          return { success: false, message: 'Nie znaleziono userId.' };
        }

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

        const userId = subscription.metadata?.userId;
        if (!userId) {
          console.error('Nie znaleziono userId w metadanych subskrypcji:', subscription.id);
          return { success: false, message: 'Nie znaleziono userId.' };
        }

        const updates = {
          cancelled: subscription.cancel_at ?? null,
          subscriptionEnd: subscription.current_period_end ?? null,
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

        const userId = subscription.metadata?.userId;
        if (!userId) {
          console.error('Nie znaleziono userId w metadanych subskrypcji:', subscription.id);
          return { success: false, message: 'Nie znaleziono userId.' };
        }

        const { error } = await supabase.auth.admin.updateUserById(userId, {
          user_metadata: {
            subscriptionId: null,
            isSubscriptionActive: false,
            subscriptionEnd: null,
            cancelled: false,
            tokens: 0
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

    return { success: true };
  } catch (err) {
    console.error('Błąd podczas przetwarzania webhooka:', err.message);
    return { success: false, message: `Webhook Error: ${err.message}` };
  }
});
