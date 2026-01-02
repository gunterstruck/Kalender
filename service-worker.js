// Service Worker für Monatskalender mit Türchen
// Version 1.6.3 - Year Display in Dropdown

const CACHE_NAME = 'kalender-cache-v1.6.3';
const RUNTIME_CACHE = 'kalender-runtime-v1.6.3';

// Dateien, die beim Install gecacht werden sollen (App Shell)
const CACHE_URLS = [
    './',
    './index.html',
    './css/styles.css',
    './js/app.js',
    './js/quotes.js',
    './js/pwa-install.js',
    './manifest.json',
    './assets/icons/icon.svg',
    './assets/icons/icon-192.png',
    './assets/icons/icon-512.png',
    './assets/icons/app_icon_192.png',
    './assets/icons/app_icon_512.png',
    // Landscape month illustrations
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
    './assets/months/december.svg',
    // Portrait month illustrations (for mobile)
    './assets/months-portrait/january.svg',
    './assets/months-portrait/february.svg',
    './assets/months-portrait/march.svg',
    './assets/months-portrait/april.svg',
    './assets/months-portrait/may.svg',
    './assets/months-portrait/june.svg',
    './assets/months-portrait/july.svg',
    './assets/months-portrait/august.svg',
    './assets/months-portrait/september.svg',
    './assets/months-portrait/october.svg',
    './assets/months-portrait/november.svg',
    './assets/months-portrait/december.svg'
];

// ========================================
// Install Event - Cache App Shell
// ========================================

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(CACHE_URLS);
            })
            .then(() => {
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
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Lösche alte Caches (außer aktuelle Version)
                        if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
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
                        console.error('[Service Worker] Network fetch failed for JS/CSS:', error);
                        // CRITICAL: Wenn Cache existiert, verwende ihn. Sonst wirf Fehler statt falsche Response
                        if (cachedResponse) {
                            return cachedResponse;
                        }
                        // Kein Cache verfügbar - erstelle minimale Error Response
                        return new Response(
                            '/* Service Worker: Resource not available offline */',
                            { status: 503, statusText: 'Service Unavailable', headers: { 'Content-Type': url.pathname.endsWith('.js') ? 'application/javascript' : 'text/css' } }
                        );
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
                        console.error('[Service Worker] Fetch failed for asset:', error);
                        // Für HTML: Zeige simple Offline-Nachricht
                        if (url.pathname.endsWith('.html') || request.mode === 'navigate') {
                            return new Response(
                                '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Offline</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>📡 Offline</h1><p>Diese Seite ist offline nicht verfügbar.</p></body></html>',
                                { status: 503, headers: { 'Content-Type': 'text/html' } }
                            );
                        }
                        // Für andere Assets: Gib 503 zurück ohne Body
                        return new Response(null, { status: 503, statusText: 'Service Unavailable' });
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
