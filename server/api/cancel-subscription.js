import Stripe from 'stripe'
import { serverSupabaseClient } from '#supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET)

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('❌ Nie udało się pobrać użytkownika:', userError?.message)
    return {
      success: false,
      message: 'Nie udało się uwierzytelnić użytkownika.',
    }
  }

  const subscriptionId = user.user_metadata?.subscriptionId
  if (!subscriptionId) {
    return {
      success: false,
      message: 'Brak aktywnej subskrypcji do anulowania.',
    }
  }

  try {
    const cancellation = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    })

    console.log('✅ Subskrypcja zaplanowana do anulowania:', cancellation.id)

    return {
      success: true,
      message: 'Subskrypcja zostanie anulowana po zakończeniu okresu.',
    }
  } catch (error) {
    console.error('❌ Błąd anulowania subskrypcji:', error.message)
    return {
      success: false,
      message: 'Wystąpił błąd podczas anulowania subskrypcji.',
    }
  }
})
