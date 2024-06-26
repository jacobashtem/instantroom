import replicate from '~/server/services/replicate';
import { serverSupabaseClient } from '#supabase/server'

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
  const { image, theme, roomType, prompt } = body;
  const supabase = await serverSupabaseClient(event)

  // Pobranie prompta z Supabase
  const { data, error } = await supabase
    .from('prompts')
    .select('room_types')
    .eq('theme', theme)
    .single();

  if (error) {
    event.res.statusCode = 500;
    return { detail: error.message };
  }

  if (!data || !data.room_types[roomType]) {
    event.res.statusCode = 400;
    return { detail: "Invalid theme or room type." };
  }

  let finalPrompt = theme ? data.room_types[roomType].prompt : prompt;

  const options = {
    version: '76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38',
    input: {
      image: image,
      prompt: finalPrompt,
      guidance_scale: 15,
      negative_prompt: "lowres, watermark, banner, logo, watermark, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional, realistic",
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
