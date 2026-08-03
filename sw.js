const CACHE_NAME = 'jod-prank-online-v1';

// 1. Install hote hi purane worker ko dhakka maar ke khud active ho jayega
self.addEventListener('install', (event) => {
    self.skipWaiting(); 
});

// 2. Active hote hi purana saara kachra (cache) delete kar dega
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    console.log('Purana Cache Uda Diya: ', cacheName);
                    return caches.delete(cacheName);
                })
            );
        })
    );
    self.clients.claim();
});

// 3. MASTER STROKE: Hamesha internet se fresh data uthayega, cache se nahi
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // Agar internet band hua tabhi error dega, nahi toh hamesha fresh page laayega
            console.log("No internet connection.");
        })
    );
});
