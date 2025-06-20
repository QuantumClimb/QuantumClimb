const CACHE_NAME = 'quantum-climb-v1';
const urlsToCache = [
  '/',
  '/src/styles.css',
  '/src/index.tsx',
  '/images/logo.png',
  '/images/logo_icon.png',
  '/share-image.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
}); 