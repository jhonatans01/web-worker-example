self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    })
  );
})

const precacheName = 'sw-example';
const precacheFiles = [
  '/bundle.js',
  '/index.html',
  '/'
];

const precacheRegex = [
  new RegExp(/http.*\\.js*/),
  new RegExp(/http.*\\index.html/)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(precacheName)
      .then(cache => cache.addAll(precacheFiles))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(precacheName).then(cache => {
      return cache.match(event.request).then(response => {
        console.log(event.request)
        return response || fetch(event.request).then(response => {
          if (precacheRegex.some(url => url.test(event.request.url))) {
            cache.put(event.request, response.clone());
          }

          return response;
        });
      });
    })
  );
});