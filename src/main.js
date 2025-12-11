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

// Initialize analytics
analytics.init();

// Track page views on route changes
router.afterEach((to) => {
  analytics.trackPageView(to.path);
});

app.mount('#app');

// Register Service Worker for offline support
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    // Use relative path for service worker
    const swPath = `${process.env.BASE_URL || '/'}sw.js`;
    
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
        // Silently fail in production, log in development
        if (process.env.NODE_ENV === 'development') {
          console.log('[Service Worker] Registration failed:', error);
        }
      });
  });

  // Listen for service worker updates
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // Only reload if we're not already reloading
    if (!window.location.reload) {
      window.location.reload();
    }
  });
}