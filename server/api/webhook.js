import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET);
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default defineEventHandler(async (event) => {
  const sig = event.req.headers['stripe-signature'];
  let body = await getRawBody(event);

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

    // Pobierz użytkownika po jego ID
    const { data: userData, error: getUserError } = await supabase.auth.admin.getUserById(userId);
    if (getUserError) {
      console.error('Error fetching user:', getUserError);
      return;
    }

    // Zaktualizuj użytkownika dodając nowe tokeny
    const newTokens = parseInt(userData.user_metadata.tokens || 0, 10) + parseInt(tokens, 10);
    const { error: updateUserError } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { tokens: newTokens },
    });

    if (updateUserError) {
      console.error('Error updating user tokens:', updateUserError);
      return;
    }

    console.log('User tokens updated successfully.');
  } else {
    console.log('Missing userId or tokens.');
  }
}

async function getRawBody(event) {
  return new Promise((resolve, reject) => {
    let data = '';
    event.req.on('data', (chunk) => {
      data += chunk;
    });
    event.req.on('end', () => {
      resolve(Buffer.from(data));
    });
    event.req.on('error', (err) => {
      reject(err);
    });
  });
}
