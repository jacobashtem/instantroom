import replicate from '~/server/services/replicate';

const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_HOST;

export default defineEventHandler(async (event) => {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }

  const body = await readBody(event);
  const { image, prompt } = body;
  const options = {
    // Interior design
    version: '76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38',
    // Image Generator
    // 8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f
    input: {
      image: image,
      prompt: prompt,
      guidance_scale: 15,
      negative_prompt: "curtains,round floor cushion, lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional, realistic",
      prompt_strength: 0.8,
      num_inference_steps: 50
    }
  };

  if (WEBHOOK_HOST) {
    options.webhook = `${WEBHOOK_HOST}/api/webhooks`;
    options.webhook_events_filter = ["start", "completed"];
  }

  const prediction = await replicate.predictions.create(options);
  if (prediction?.error) {
    event.res.statusCode = 500;
    return { detail: prediction.error };
  }

  event.res.statusCode = 201;
  return prediction;
});
