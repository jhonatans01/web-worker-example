addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    })
  );
})

const precacheName = 'precache-example-website';
const precacheFiles = [
  '/bundle.js',
  '/index.html'
];

addEventListener('install', event => {
  event.waitUntil(
    caches.open(precacheName)
      .then(cache => cache.addAll(precacheFiles))
  );
});