import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET);

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
    // Zaktualizuj status płatności w bazie danych
    // session.customer - ID klienta

    // Przykład aktualizacji statusu płatności
    await updatePaymentStatus(session);
  }

  event.res.statusCode = 200;
  event.res.end('Success');
});

async function updatePaymentStatus(session) {
  // Logika aktualizacji statusu płatności w bazie danych
  // Możesz użyć np. ORM do aktualizacji danych użytkownika
  console.log('Payment received for customer:', session.customer);
}
