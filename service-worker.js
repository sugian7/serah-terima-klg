const CACHE_NAME = "terima-klg-v2";

const STATIC_ASSETS = [
  "/serah-terima-klg/",
  "/serah-terima-klg/index.html",
  "/serah-terima-klg/manifest.json",
  "/serah-terima-klg/icons/icon-192.png",
  "/serah-terima-klg/icons/icon-512.png"
];

self.addEventListener("install", event => {
  self.skipWaiting(); // 🔥 paksa versi baru aktif
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim(); // 🔥 ambil alih semua tab
});

self.addEventListener("fetch", event => {
  
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
