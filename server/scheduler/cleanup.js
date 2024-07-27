import { useScheduler } from '#scheduler';
import emptyBucket from '~~/server/services/emptyBucket';

export default defineNitroPlugin(() => {
  startScheduler();
});

function startScheduler() {
  const scheduler = useScheduler();

  scheduler.run(() => {
    say("Running a job at 01:00 PM at America/Sao_Paulo timezone 🌍");
    console.log('Running cron job to empty bucket...');
    emptyBucket()
      .then(result => {
        if (!result.success) {
          console.error('Failed to empty bucket:', result.message);
        }
      })
      .catch(err => {
        console.error('Error during bucket cleanup:', err);
      });
  }).cron('1 0 * * *');
}
