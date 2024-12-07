import { supabase } from './client';

export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection check failed:', error.message);
      return false;
    }
    
    console.info('Supabase connection established successfully');
    return true;
  } catch (error) {
    console.error('Failed to connect to Supabase:', error);
    return false;
  }
}