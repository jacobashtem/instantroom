import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_TEST_SECRET);

// Helper function to parse raw body
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      resolve(Buffer.from(data));
    });
    req.on('error', (err) => {
      reject(err);
    });
  });
}

export default defineEventHandler(async (event) => {
  const req = event.node.req;
  const res = event.node.res;
  const sig = req.headers['stripe-signature'];

  const rawBody = await getRawBody(req);

  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WE);
  } catch (err) {
    res.statusCode = 400;
    res.end(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (stripeEvent.type) {
    case 'checkout.session.completed':
      const session = stripeEvent.data.object;
      // TODO: Przydziel tokeny użytkownikowi
      console.log(`PaymentIntent was successful: ${session.id}`);
      break;
    default:
      console.log(`Unhandled event type ${stripeEvent.type}`);
  }

  res.statusCode = 200;
  res.end();
});
