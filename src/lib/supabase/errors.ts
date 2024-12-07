export class SupabaseError extends Error {
  constructor(message: string, public originalError?: unknown) {
    super(message);
    this.name = 'SupabaseError';
  }
}

export class NetworkError extends SupabaseError {
  constructor(originalError?: unknown) {
    super('Network connection failed. Please check your internet connection.', originalError);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends SupabaseError {
  constructor(originalError?: unknown) {
    super('Authentication failed. Please check your credentials.', originalError);
    this.name = 'AuthenticationError';
  }
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof Error && 
    (error.message.includes('Failed to fetch') || 
     error.message.includes('Network request failed'));
}