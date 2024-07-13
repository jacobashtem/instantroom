import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Konfiguracja Stripe
const stripe = new Stripe(process.env.STRIPE_TEST_SECRET);

// Konfiguracja Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const sig = event.req.headers['stripe-signature'];

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WE);
  } catch (err) {
    event.res.statusCode = 400;
    event.res.end(`Webhook Error: ${err.message}`);
    return;
  }

  if (stripeEvent.type === 'checkout.session.completed') {
    const session = stripeEvent.data.object;
    await updateUserTokens(session);
  }

  event.res.statusCode = 200;
  event.res.end('Success');
});

async function updateUserTokens(session) {
  const userId = session.client_reference_id;
  const tokens = session.metadata.tokens;

  if (userId && tokens) {
    console.log('Updating user:', userId, 'with tokens:', tokens);
    const { data, error } = await supabase
      .from('users')
      .update({ tokens: parseInt(tokens, 10) })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user tokens:', error);
      return;
    }

    console.log('User tokens updated:', data);
  } else {
    console.log('Missing userId or tokens.');
  }
}
