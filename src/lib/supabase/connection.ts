import { supabase } from './client';
import { NetworkError } from './errors';
import { withRetry } from './retry';

interface ConnectionState {
  isConnected: boolean;
  lastChecked: Date | null;
  error: Error | null;
  retryCount: number;
}

let state: ConnectionState = {
  isConnected: false,
  lastChecked: null,
  error: null,
  retryCount: 0
};

const MAX_RETRIES = 5;
const INITIAL_DELAY = 1000;
const MAX_DELAY = 10000;

export async function checkConnection(): Promise<boolean> {
  try {
    const result = await withRetry(
      async () => {
        const { data, error } = await supabase
          .from('events')
          .select('count')
          .limit(1)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            // No rows found is still a successful connection
            return true;
          }
          if (error.code === 'JWT_ERROR') {
            throw new Error('Authentication error');
          }
          throw error;
        }

        return true;
      },
      {
        maxAttempts: MAX_RETRIES,
        delayMs: calculateDelay(),
        backoffFactor: 1.5,
        shouldRetry: (error) => {
          const shouldRetry = isRetryableError(error) && state.retryCount < MAX_RETRIES;
          if (shouldRetry) {
            state.retryCount++;
          }
          return shouldRetry;
        }
      }
    );

    state = {
      isConnected: result,
      lastChecked: new Date(),
      error: null,
      retryCount: 0 // Reset retry count on success
    };

    return result;
  } catch (error) {
    console.error('Connection check failed:', error);
    
    state = {
      isConnected: false,
      lastChecked: new Date(),
      error: error instanceof Error ? error : new Error('Unknown error'),
      retryCount: state.retryCount
    };
    
    return false;
  }
}

function calculateDelay(): number {
  return Math.min(INITIAL_DELAY * Math.pow(1.5, state.retryCount), MAX_DELAY);
}

function isRetryableError(error: unknown): boolean {
  if (error instanceof NetworkError) return true;
  
  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('Failed to fetch') || 
        error.message.includes('Network request failed')) {
      return true;
    }
    
    // Rate limiting
    if (error.message.includes('429') || 
        error.message.includes('Too Many Requests')) {
      return true;
    }
    
    // Server errors (except auth errors)
    if (error.message.includes('500') || 
        error.message.includes('503')) {
      return true;
    }
  }
  
  return false;
}

export function getConnectionState(): ConnectionState {
  return { ...state };
}

export function resetConnectionState(): void {
  state = {
    isConnected: false,
    lastChecked: null,
    error: null,
    retryCount: 0
  };
}