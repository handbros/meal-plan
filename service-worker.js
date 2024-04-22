'use strict';
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v6';
const DATA_CACHE_NAME = 'data-cache-v5';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
    '.',
    './plan_daily.html',
    './plan_weekly.html',
    './storage.html',
    './settings.html',
    './about.html',
    './assets/favicon.ico',
    './scripts/app.js',
    './scripts/install.js',
    './scripts/metadata.js',
    './scripts/settings.js',
    './scripts/ui.js',
    './styles/style.css'
];

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // CODELAB: Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // CODELAB: Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);

    evt.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(evt.request)
                .then((response) => {
                    return response || fetch(evt.request);
                });
        })
    );

    if (evt.request.mode !== 'navigate') {
        // Not a page navigation, bail.
        return;
    }

    evt.respondWith(
        fetch(evt.request)
        .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                    // If the network is offline...
                    return cache.match('plan_daily.html');
                });
        })
    );
});