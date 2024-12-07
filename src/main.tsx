import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { validateEnv } from './lib/config/env';
import { initializeSupabase } from './lib/supabase/client';

async function initializeApp() {
  try {
    // Validate environment variables
    validateEnv();
    
    // Initialize Supabase connection
    await initializeSupabase();
    
    // Render the app
    createRoot(document.getElementById("root")!).render(<App />);
  } catch (error) {
    console.error('Application initialization failed:', error);
    const root = document.getElementById("root");
    if (root) {
      root.innerHTML = `
        <div style="padding: 20px; color: red; font-family: system-ui, -apple-system, sans-serif;">
          <h1>Configuration Error</h1>
          <p>${error instanceof Error ? error.message : 'Unknown error occurred'}</p>
          <p>Please check your environment configuration and network connection.</p>
        </div>
      `;
    }
  }
}

initializeApp();