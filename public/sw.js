// Service Worker for Portfolio - Clean Cache & Fast Updates v4.4
const CACHE_NAME = 'portfolio-v4.4-20261021-1640';
const RUNTIME_CACHE = 'portfolio-runtime-v4.4-20261021-1640';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-192x192.png',
  '/pwa-maskable-512x512.png',
  '/apple-touch-icon.png'
];

// Helper function to handle cache errors gracefully
function safeCacheAdd(cache, url) {
  return cache.add(url).catch((err) => {
    console.warn(`[SW] Failed to cache ${url}:`, err.message);
    return null;
  });
}

// Install event - Cache static assets & notify clients (wait for user confirmation)
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing v4.4...');
  // Do NOT call self.skipWaiting() here so the worker enters the "waiting" state.
  // This allows the app UI to detect reg.waiting and display the Update Banner to the user.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.allSettled(
          STATIC_ASSETS.map((asset) => safeCacheAdd(cache, asset))
        );
      })
      .then(() => {
        console.log('[Service Worker] v4.4 installed and waiting for user activation');
      })
      .catch((err) => {
        console.warn('[Service Worker] Install warning:', err.message);
      })
  );
});

// Activate event - Wipe ALL old caches completely & take control
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating v4.4 & purging old caches...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map((name) => {
              console.log('[Service Worker] Deleting obsolete cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
      .then(() => {
        return self.clients.matchAll({ type: 'window' }).then((clients) => {
          clients.forEach((client) => {
            client.postMessage({ type: 'CONTROLLER_ACTIVE', version: 'v4.4.0' });
          });
        });
      })
  );
});

// Message listener to trigger immediate skipWaiting or cache wipe
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((names) => {
      names.forEach((name) => caches.delete(name));
    });
  }
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip non-HTTP(S)
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // ALWAYS BYPASS cache for version.json and live API queries
  if (
    event.request.url.includes('/version.json') ||
    event.request.url.includes('googletagmanager.com') ||
    event.request.url.includes('google-analytics.com') ||
    event.request.url.includes('api.')
  ) {
    return; // Pass through to network
  }

  // 1. Navigation / HTML Requests: ALWAYS Network-First
  // Ensures user always gets the freshest deployment and newest bundle hashes
  if (event.request.mode === 'navigate' || event.request.destination === 'document') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            return cached || caches.match('/index.html') || new Response('Offline', { status: 503 });
          });
        })
    );
    return;
  }

  // 2. Static Assets (JS / CSS with hash): Cache-First with Network fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache).catch(() => {});
          });

          return response;
        })
        .catch(() => {
          return new Response('Network error', { status: 503 });
        });
    })
  );
});
