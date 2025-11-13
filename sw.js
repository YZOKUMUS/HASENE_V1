const cacheName = 'hasene-cache-v2';
const filesToCache = [
  '/',
  '/index.html',
  '/icon-192-v4-RED-MUSHAF.png',
  '/icon-512-v4-RED-MUSHAF.png'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener('activate', function(e) {
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  const url = event.request.url;

  // JSON dosyalarını özel cache ile
  if (
    url.includes('ayetoku.json') ||
    url.includes('duaet.json') ||
    url.includes('hadisoku.json') ||
    url.includes('kelimeler.json')
  ) {
    event.respondWith(
      caches.open('hasene-json-cache-v1').then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    // Diğer dosyaları genel cache’den ya da ağdan al
    event.respondWith(
      caches.match(event.request).then(response => response || fetch(event.request))
    );
  }
});
