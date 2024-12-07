interface RetryOptions {
  maxAttempts?: number;
  delayMs?: number;
  backoffFactor?: number;
  shouldRetry?: (error: unknown) => boolean;
}

const DEFAULT_OPTIONS: Required<Omit<RetryOptions, 'shouldRetry'>> = {
  maxAttempts: 3,
  delayMs: 1000,
  backoffFactor: 2,
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxAttempts, delayMs, backoffFactor } = { ...DEFAULT_OPTIONS, ...options };
  const shouldRetry = options.shouldRetry || isRetryableError;
  let lastError: unknown;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${attempt} failed:`, error);
      
      if (attempt === maxAttempts) {
        break;
      }
      
      if (shouldRetry(error)) {
        const delay = delayMs * Math.pow(backoffFactor, attempt - 1);
        console.info(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      throw error;
    }
  }
  
  throw lastError;
}

function isRetryableError(error: unknown): boolean {
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
    
    // Server errors
    if (error.message.includes('500') || 
        error.message.includes('503')) {
      return true;
    }
  }
  
  return false;
}