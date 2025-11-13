self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  const url = event.request.url;
  // Büyük JSON dosyalarını cache'le
  if (
    url.includes('ayetoku.json') ||
    url.includes('duaet.json') ||
    url.includes('hadisoku.json') ||
    url.includes('kelimeler.json')
  ) {
    event.respondWith(
      caches.open('hasene-json-cache-v1').then(function(cache) {
        return cache.match(event.request).then(function(response) {
          if (response) {
            // Cache'den hızlıca sun
            return response;
          }
          // İlk fetch ise ağdan alıp cache'e koy
          return fetch(event.request).then(function(networkResponse) {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        });
      })
    );
  } else {
    // Diğer dosyalar için normal fetch
    event.respondWith(fetch(event.request));
  }
});
