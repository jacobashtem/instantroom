import Stripe from 'stripe';
import { serverSupabaseServiceRole } from '#supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export default defineEventHandler(async (event) => {
  const supabase = serverSupabaseServiceRole(event);

  try {
    // Pobierz userId z ciała żądania
    const { userId } = await readBody(event);

    // Pobierz dane użytkownika z bazy
    const { data: user, error: fetchError } = await supabase.auth.admin.getUserById(userId);
    if (fetchError || !user) {
      console.error('Nie udało się pobrać danych użytkownika:', fetchError?.message || 'Nie znaleziono użytkownika.');
      return { success: false, message: 'Nie znaleziono użytkownika.' };
    }

    const subscriptionId = user.user_metadata?.subscriptionId;
    if (!subscriptionId) {
      console.error('Użytkownik nie ma aktywnej subskrypcji.');
      return { success: false, message: 'Brak aktywnej subskrypcji do anulowania.' };
    }

    // Ustawienie anulowania subskrypcji na koniec okresu rozliczeniowego
    const cancellation = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    console.log('Subskrypcja zaplanowana do anulowania w Stripe:', cancellation);

    // Aktualizuj dane użytkownika w Supabase
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: {
        isSubscriptionActive: true, // Pozostaje aktywna do końca okresu
      },
    });

    if (updateError) {
      console.error('Błąd aktualizacji danych użytkownika:', updateError.message);
      return { success: false, message: 'Nie udało się zaktualizować danych użytkownika.' };
    }

    return { success: true, message: 'Subskrypcja zaplanowana do anulowania.' };
  } catch (error) {
    console.error('Błąd anulowania subskrypcji:', error.message);
    return { success: false, message: 'Wystąpił błąd podczas anulowania subskrypcji.' };
  }
});
