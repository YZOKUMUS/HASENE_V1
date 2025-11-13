const cacheName = 'hasene-cache-v2';
const jsonCacheName = 'hasene-json-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/icon-192-v4-RED-MUSHAF.png',
  '/icon-512-v4-RED-MUSHAF.png'
];

// Service Worker install event
self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

// Service Worker activate event
self.addEventListener('activate', function(event) {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(name) {
          if (name !== cacheName && name !== jsonCacheName) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Service Worker fetch event
self.addEventListener('fetch', function(event) {
  const url = event.request.url;

  // Handle JSON files with a separate cache
  if (
    url.includes('ayetoku.json') ||
    url.includes('duaet.json') ||
    url.includes('hadisoku.json') ||
    url.includes('kelimeler.json')
  ) {
    event.respondWith(
      caches.open(jsonCacheName).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return (
            response ||
            fetch(event.request)
              .then(function(networkResponse) {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              })
              .catch(function(error) {
                console.error('JSON fetch hatası:', error);
                return new Response('JSON verisi alınamadı', { status: 503 });
              })
          );
        });
      })
    );
  } else {
    // Handle other files with the general cache
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return (
          response ||
          fetch(event.request).catch(function(error) {
            console.error('Fetch hatası:', error);
            return new Response('Servis kullanılamıyor', { status: 503 });
          })
        );
      })
    );
  }
});