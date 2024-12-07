import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'supabase-auth',
    storage: window.localStorage
  },
  db: {
    schema: 'public'
  }
});

// Test the connection and properly handle the Promise
(async () => {
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (error) {
      throw error;
    }
    console.log('Successfully connected to Supabase');
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
  }
})();