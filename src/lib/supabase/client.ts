import { createClient } from '@supabase/supabase-js';
import { NetworkError, AuthenticationError } from './errors';
import { env } from '../config/env';
import { checkConnection } from './connection';

export const supabase = createClient(env.supabase.url, env.supabase.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'supabase.auth.token',
    storage: window.localStorage,
  },
});

let initialized = false;

export async function initializeSupabase(): Promise<void> {
  if (initialized) return;

  try {
    const isConnected = await checkConnection();
    
    if (!isConnected) {
      throw new NetworkError('Failed to establish initial connection');
    }

    initialized = true;
    console.info('Successfully initialized Supabase connection');
  } catch (error) {
    console.error('Failed to initialize Supabase:', error);
    
    if (error instanceof AuthenticationError) {
      throw error;
    }
    
    throw new NetworkError('Failed to initialize Supabase connection');
  }
}