// Vue Portfolio - Application Entry Point
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import api from './service/api';
import analytics from './utils/analytics';

const app = createApp(App);
// Use the centralized API instance instead of creating a new axios instance
app.config.globalProperties.$http = api; 
app.use(router);

// Initialize analytics (with error handling)
try {
  analytics.init();
  
  // Track page views on route changes
  router.afterEach((to) => {
    try {
      analytics.trackPageView(to.path);
    } catch (error) {
      // Fail silently - analytics is non-critical
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Analytics] Route tracking error:', error);
      }
    }
  });
} catch (error) {
  // Fail silently - analytics is non-critical
  if (process.env.NODE_ENV === 'development') {
    console.warn('[Analytics] Initialization error:', error);
  }
}

app.mount('#app');

// Register Service Worker for offline support
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    try {
      // Use absolute path for service worker (works better on Vercel)
      const swPath = '/sw.js';
      
      navigator.serviceWorker.register(swPath)
        .then((registration) => {
          console.log('[Service Worker] Registration successful:', registration.scope);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available, prompt user to refresh
                  console.log('[Service Worker] New version available. Refresh to update.');
                }
              });
            }
          });
        })
        .catch((error) => {
          // Silently fail - service worker is optional
          console.warn('[Service Worker] Registration failed (non-critical):', error.message);
        });
    } catch (error) {
      // Silently fail - service worker is optional
      console.warn('[Service Worker] Error (non-critical):', error.message);
    }
  });

  // Listen for service worker updates
  try {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // Reload page when new service worker takes control
      window.location.reload();
    });
  } catch (error) {
    // Ignore errors
  }
}