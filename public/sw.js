// Service Worker for Portfolio - Clean Cache & Fast Updates
const CACHE_NAME = 'portfolio-v4.1-20261020';
const RUNTIME_CACHE = 'portfolio-runtime-v4.1-20261020';

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

// Install event - Cache static assets & skip waiting immediately
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing v4.1 (cache refreshed)...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.allSettled(
          STATIC_ASSETS.map((asset) => safeCacheAdd(cache, asset))
        );
      })
      .then(() => {
        console.log('[Service Worker] Installed & activated immediately');
      })
      .catch((err) => {
        console.warn('[Service Worker] Install warning:', err.message);
      })
  );
});

// Activate event - Wipe ALL old caches completely
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating & wiping old caches...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map((name) => {
              console.log('[Service Worker] Deleting outdated cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Message listener to trigger immediate skipWaiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch event - Network-First for HTML/Navigation, Cache-First for versioned assets
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip non-HTTP(S)
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Skip analytics and external API calls
  if (
    event.request.url.includes('googletagmanager.com') ||
    event.request.url.includes('google-analytics.com') ||
    event.request.url.includes('api.')
  ) {
    return;
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
