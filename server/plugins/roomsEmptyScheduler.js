import { useScheduler } from '#scheduler';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase environment variables are not set.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const emptyBucket = async () => {
  try {
    console.log('Checking bucket existence...');
    const { data: listData, error: listError } = await supabase.storage.listBuckets();
    if (listError) {
      console.error('Error listing buckets:', listError);
      return { success: false, message: 'Error listing buckets', error: listError };
    }

    console.log('Available buckets:', listData);

    const bucketExists = listData.some(bucket => bucket.id === 'rooms');
    if (!bucketExists) {
      console.error('Bucket "rooms" not found among:', listData.map(bucket => bucket.id));
      return { success: false, message: 'Bucket "rooms" not found' };
    }

    console.log('Emptying bucket "rooms"...');
    const { data, error } = await supabase.storage.emptyBucket('rooms');
    if (error) {
      console.error('Error emptying bucket:', error);
      return { success: false, message: 'Error emptying bucket', error };
    }
    console.log('Successfully emptied bucket:', data.message);
    return { success: true, message: data.message };
  } catch (err) {
    console.error('Unexpected error during bucket cleanup:', err);
    return { success: false, message: 'Unexpected error', error: err };
  }
};

const resetUserImagesUploaded = async () => {
  try {
    console.log('Resetting imagesUploaded for all users...');
    const { data: users, error: fetchError } = await supabase
      .rpc('reset_images_uploaded');

    if (fetchError) {
      console.error('Error fetching users:', fetchError);
      return { success: false, message: 'Error fetching users', error: fetchError };
    }

    console.log('Successfully reset imagesUploaded for all users');
    return { success: true, message: 'Successfully reset imagesUploaded for all users' };
  } catch (err) {
    console.error('Unexpected error during user metadata reset:', err);
    return { success: false, message: 'Unexpected error', error: err };
  }
};

export default defineNitroPlugin(() => {
  startScheduler();
});

function startScheduler() {
  const scheduler = useScheduler();

  scheduler.run(async () => {
    console.log('Running cron job to empty bucket and reset user images...');
    const bucketResult = await emptyBucket();
    if (!bucketResult.success) {
      console.error('Failed to empty bucket:', bucketResult.message);
    }

    const resetResult = await resetUserImagesUploaded();
    if (!resetResult.success) {
      console.error('Failed to reset user images:', resetResult.message);
    }
  }).cron('01 04 * * *');
}
