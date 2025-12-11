// Service Worker for Portfolio - Offline Support & Caching
const CACHE_NAME = 'portfolio-v1';
const RUNTIME_CACHE = 'portfolio-runtime-v1';

// Assets to cache immediately
// Note: These paths will be relative to the base URL
// Vue CLI generates hashed filenames, so we cache dynamically
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Helper function to handle cache errors gracefully
function safeCacheAdd(cache, url) {
  return cache.add(url).catch(err => {
    console.warn(`[SW] Failed to cache ${url}:`, err.message);
    return null;
  });
}

// Install event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        // Use Promise.allSettled to handle missing files gracefully
        return Promise.allSettled(
          STATIC_ASSETS.map(asset => safeCacheAdd(cache, asset))
        );
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.warn('[Service Worker] Install warning:', err.message);
        // Continue even if caching fails - service worker will still work
        return self.skipWaiting();
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Skip analytics and external API calls
  if (event.request.url.includes('googletagmanager.com') || 
      event.request.url.includes('google-analytics.com') ||
      event.request.url.includes('api.')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses or non-basic responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            // Cache the response (don't wait for it)
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache).catch(err => {
                  console.warn('[SW] Failed to cache response:', err.message);
                });
              })
              .catch(err => {
                console.warn('[SW] Cache open error:', err.message);
              });

            return response;
          })
          .catch(() => {
            // Network failed, return offline page if available
            if (event.request.destination === 'document') {
              return caches.match('/index.html').catch(() => {
                // If index.html is not cached, return a basic response
                return new Response('Offline', { status: 503 });
              });
            }
            // For other requests, return error
            return new Response('Network error', { status: 503 });
          });
      })
      .catch(() => {
        // If cache match fails, try network
        return fetch(event.request).catch(() => {
          return new Response('Offline', { status: 503 });
        });
      })
  );
});

// Background sync for offline actions (optional)
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background sync:', event.tag);
});

// Push notification handler (optional)
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push notification received');
});

