const CACHE_NAME = 'sw-example';
const PRECACHE_FILES = [
  'bundle.js',
  'index.html',
  './'
];

const MESSAGE = 'Offline disponível';

function sendMessage(mensagem) {
  self.clients.matchAll().then(all => all.map(client => client.postMessage(mensagem)))
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_FILES))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE_FILES, CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
    ).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
})

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        return cachedResponse || caches.open(CACHE_NAME).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => response);
          });
        });
      }).finally(() => sendMessage(MESSAGE))
    );
  }
});