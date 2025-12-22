/// <reference types="vite/client" />
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HAI3Provider, apiRegistry, store } from '@hai3/uicore';
import { Toaster } from '@hai3/uikit';
import '@hai3/uikit/styles'; // UI Kit styles
import '@/uikit/uikitRegistry'; // Auto-registers UI Kit (components + icons)
import '@/screensets/screensetRegistry'; // Auto-registers screensets (includes API services + mocks + i18n loaders)
import '@/themes/themeRegistry'; // Auto-registers themes
import App from './App';

// Initialize API services
const initialUseMockApi = store.getState().uicore.app.useMockApi;
apiRegistry.initialize({
  useMockApi: initialUseMockApi,
  mockDelay: 500,
});

/**
 * Render application
 * Bootstrap happens automatically when Layout mounts
 *
 * Flow:
 * 1. App renders → Layout mounts → bootstrap dispatched
 * 2. Components show skeleton loaders (translationsReady = false)
 * 3. User fetched → language set → translations loaded
 * 4. Components re-render with actual text (translationsReady = true)
 * 5. In DEV mode: HAI3Provider auto-loads StudioOverlay if @hai3/studio is installed
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HAI3Provider>
      <App />
      <Toaster />
    </HAI3Provider>
  </StrictMode>
);
