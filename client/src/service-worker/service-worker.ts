// Set this to true for production
const doCache = false;

// Name our cache
const CACHE_NAME = 'my-pwa-cache-v1';

// Delete old caches that are not our current one!
self.addEventListener('activate', (event: any) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
      caches.keys()
          .then((keyList) => Promise.all(keyList.map((key) => {
            if (!cacheWhitelist.includes(key)) {
              console.log('Deleting cache: ' + key);
              return caches.delete(key);
            }
          })),
          ),
  );
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', function(event: any) {
  if (doCache) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
              // Get the assets manifest so we can see what our js file is named
              // This is because webpack hashes it
              fetch('asset-manifest.json')
                  .then((response) => {
                    return response.json();
                  })
                  .then((assets) => {
                    const urlsToCache = [
                      '/',
                      assets['main.js'],
                    ];
                    cache.addAll(urlsToCache);
                    console.log('cached');
                  });
            }),
    );
  }
});

self.addEventListener('fetch', function(event: any) {
  if (doCache) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        }),
    );
  }
});
