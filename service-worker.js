const CACHE_NAME = "klg-pwa-v1";

/**
 * File statis saja
 * JANGAN cache API
 */
const STATIC_ASSETS = [
  "/serah-terima-klg/",
  "/serah-terima-klg/index.html",
  "/serah-terima-klg/manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

self.addEventListener("fetch", event => {

  // Jangan ganggu request selain GET
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
