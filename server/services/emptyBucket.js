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

    const bucketExists = listData.some(bucket => bucket.id === 'rooms');
    if (!bucketExists) {
      console.error('Bucket "rooms" not found among:', listData.map(bucket => bucket.id));
      return { success: false, message: 'Bucket "rooms" not found' };
    }

    console.log('Emptying bucket "rooms"...');
    const { data, error } =  await supabase.storage.emptyBucket('rooms');
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
