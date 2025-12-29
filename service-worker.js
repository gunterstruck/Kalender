// Service Worker für Monatskalender mit Türchen
// Version 1.5.0 - Code-Optimierungen und Bugfixes

const CACHE_NAME = 'kalender-cache-v1.5.18';
const RUNTIME_CACHE = 'kalender-runtime-v1.5.18';

// Dateien, die beim Install gecacht werden sollen (App Shell)
const CACHE_URLS = [
    './',
    './index.html',
    './css/styles.css',
    './js/app.js',
    './js/quotes.js',
    './manifest.json',
    './assets/icons/icon.svg',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
    './assets/months/january.svg',
    './assets/months/february.svg',
    './assets/months/march.svg',
    './assets/months/april.svg',
    './assets/months/may.svg',
    './assets/months/june.svg',
    './assets/months/july.svg',
    './assets/months/august.svg',
    './assets/months/september.svg',
    './assets/months/october.svg',
    './assets/months/november.svg',
    './assets/months/december.svg'
];

// ========================================
// Install Event - Cache App Shell
// ========================================

self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching app shell');
                return cache.addAll(CACHE_URLS);
            })
            .then(() => {
                console.log('[Service Worker] App shell cached successfully');
                return self.skipWaiting(); // Aktiviere neuen Service Worker sofort
            })
            .catch((error) => {
                console.error('[Service Worker] Cache failed:', error);
            })
    );
});

// ========================================
// Activate Event - Cleanup old caches
// ========================================

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Lösche alte Caches (außer aktuelle Version)
                        if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activated successfully');
                return self.clients.claim(); // Übernimm Kontrolle über alle Clients
            })
    );
});

// ========================================
// Fetch Event - Intelligente Cache-Strategien
// ========================================

self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Nur GET-Requests cachen
    if (request.method !== 'GET') {
        return;
    }

    // Strategie 1: Stale-While-Revalidate für JS/CSS
    // -> Serviere Cache sofort, update im Hintergrund
    if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(request).then((cachedResponse) => {
                    const fetchPromise = fetch(request).then((networkResponse) => {
                        // Update Cache im Hintergrund
                        if (networkResponse && networkResponse.status === 200) {
                            cache.put(request, networkResponse.clone());
                        }
                        return networkResponse;
                    }).catch((error) => {
                        console.error('[Service Worker] Network fetch failed:', error);
                        return cachedResponse; // Fallback zu Cache bei Netzwerkfehler
                    });

                    // Serviere Cache sofort (wenn vorhanden), sonst warte auf Netzwerk
                    return cachedResponse || fetchPromise;
                });
            })
        );
        return;
    }

    // Strategie 2: Cache First für Bilder, Icons, Assets
    // -> Maximale Performance für statische Assets
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Nicht im Cache - von Netzwerk holen
                return fetch(request)
                    .then((networkResponse) => {
                        // Prüfe, ob Response gültig ist
                        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type === 'error') {
                            return networkResponse;
                        }

                        // Clone Response (kann nur einmal gelesen werden)
                        const responseToCache = networkResponse.clone();

                        // Speichere Response in Runtime Cache
                        caches.open(RUNTIME_CACHE)
                            .then((cache) => {
                                cache.put(request, responseToCache);
                            });

                        return networkResponse;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Fetch failed:', error);
                    });
            })
    );
});

// ========================================
// Message Event - Manuelles Cache-Update
// ========================================

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        return caches.delete(cacheName);
                    })
                );
            }).then(() => {
                return self.clients.matchAll();
            }).then((clients) => {
                clients.forEach((client) => {
                    client.postMessage({
                        type: 'CACHE_CLEARED',
                        message: 'Alle Caches wurden gelöscht'
                    });
                });
            })
        );
    }
});

console.log('[Service Worker] Loaded successfully');
