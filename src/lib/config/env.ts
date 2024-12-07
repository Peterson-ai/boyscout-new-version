export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL as string,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  }
} as const;

export function validateEnv() {
  const { supabase } = env;

  if (!supabase.url) {
    throw new Error('VITE_SUPABASE_URL is not defined');
  }

  if (!supabase.anonKey) {
    throw new Error('VITE_SUPABASE_ANON_KEY is not defined');
  }

  // Validate URL format
  try {
    new URL(supabase.url);
  } catch {
    throw new Error('VITE_SUPABASE_URL is not a valid URL');
  }

  // Basic JWT structure validation (header.payload.signature)
  const jwtParts = supabase.anonKey.split('.');
  if (jwtParts.length !== 3) {
    throw new Error('VITE_SUPABASE_ANON_KEY is not in valid JWT format');
  }

  // Validate each part is base64 encoded
  try {
    jwtParts.forEach(part => {
      if (!/^[A-Za-z0-9_-]+$/i.test(part)) {
        throw new Error('Invalid JWT part encoding');
      }
    });
  } catch {
    throw new Error('VITE_SUPABASE_ANON_KEY contains invalid characters');
  }
}