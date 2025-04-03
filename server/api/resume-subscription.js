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
      message: 'Brak subskrypcji do wznowienia.',
    }
  }

  try {
    const resumption = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    })

    console.log('✅ Subskrypcja przywrócona:', resumption.id)

    return {
      success: true,
      message: 'Subskrypcja została wznowiona.',
    }
  } catch (error) {
    console.error('❌ Błąd przywracania subskrypcji:', error.message)
    return {
      success: false,
      message: 'Wystąpił błąd przy przywracaniu subskrypcji.',
    }
  }
})
