import replicate from '~/server/services/replicate';

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  try {
    const prediction = await replicate.predictions.get(id);

    if (prediction?.error) {
      event.res.statusCode = 500;
      return { detail: prediction.error };
    }

    event.res.statusCode = 200;
    return prediction;
  } catch (error) {
    event.res.statusCode = 500;
    return { detail: error.message };
  }
});
