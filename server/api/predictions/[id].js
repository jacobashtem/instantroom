import replicate from '~/server/services/replicate';

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(fetchFn, retries = 20, waitTime = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetchFn();
      if (typeof response === 'string' && response.startsWith('<!DOCTYPE')) {
        console.warn('Otrzymano stronę błędu HTML, ponawiamy zapytanie.');
        await delay(waitTime);
        continue;
      }

      return response;

    } catch (error) {
      if (attempt < retries && (error.message.includes('503'))) {
        const backoffTime = waitTime * Math.pow(2, attempt - 1);
        console.warn(`Serwer niedostępny (503), ponawiamy zapytanie (próba ${attempt}/${retries}), czekanie ${backoffTime / 1000} sekund.`);
        await delay(backoffTime);
      } else {
        throw error;
      }
    }
  }
}

export default defineEventHandler(async (event) => {
  const id = event.context.params.id;
  try {
    const prediction = await fetchWithRetry(() => replicate.predictions.get(id), 20, 2000);

    if (prediction?.error) {
      event.res.statusCode = 500;
      return { detail: prediction.error };
    }

    event.res.statusCode = 200;
    return prediction;
  } catch (error) {
    console.error('Błąd serwera lub parsowania JSON:', error.message);
    event.res.statusCode = 500;
    return { detail: error.message };
  }
});
