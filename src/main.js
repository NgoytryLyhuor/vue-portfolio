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
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('[Service Worker] Registration successful:', registration.scope);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available, prompt user to refresh
              console.log('[Service Worker] New version available. Refresh to update.');
            }
          });
        });
      })
      .catch((error) => {
        console.log('[Service Worker] Registration failed:', error);
      });
  });

  // Listen for service worker updates
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}