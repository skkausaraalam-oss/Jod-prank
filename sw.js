const CACHE_NAME = 'jod-x-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './target.html',
  './manifest.json'
];

// Install Service Worker aur files ko cache mein save karna
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('JOD X System Cached Successfully!');
        return cache.addAll(urlsToCache);
      })
  );
});

// Jab app khulegi toh cache se fast data uthana
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Agar file pehle se cache mein hai toh wahi se de do (Fast Loading)
        if (response) {
          return response;
        }
        // Agar nahi hai toh internet se download kar lo
        return fetch(event.request);
      })
  );
});
          
