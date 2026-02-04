// Simple service worker for performance optimization
const CACHE_NAME = "portfolio-v1";
const STATIC_ASSETS = ["/", "/manifest.json", "/a&a-logo.png"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }),
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName)),
      );
    }),
  );
  self.clients.claim();
});

// Fetch event - serve from cache when possible
self.addEventListener("fetch", (event) => {
  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            // Cache successful responses for static assets
            if (
              fetchResponse.status === 200 &&
              (event.request.url.includes(".js") ||
                event.request.url.includes(".css") ||
                event.request.url.includes(".png") ||
                event.request.url.includes(".jpg") ||
                event.request.url.includes(".svg"))
            ) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return fetchResponse;
          })
        );
      })
      .catch(() => {
        // Fallback for offline scenarios
        if (event.request.destination === "document") {
          return caches.match("/");
        }
      }),
  );
});
