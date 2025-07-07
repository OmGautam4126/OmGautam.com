const CACHE_NAME = 'om-portfolio-cache-v1';
const urlsToCache = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'My Website.html',
  'OneSignalSDKWorker.js',
  'icon-192.png',
  'icon-512.png'
];
// 1️⃣ Install Event: Cache files
self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching essential files');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2️⃣ Activate Event: Cleanup old cache
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// 3️⃣ Fetch Event: Serve cached files
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse =>
      cachedResponse || fetch(event.request)
    )
  );
});

