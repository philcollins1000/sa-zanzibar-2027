const CACHE_NAME = 'sa2027-v15';
const urlsToCache = ['./index.html', './manifest.json',
  './img/robben-qr-phil.png', './img/robben-qr-dawn.png', './img/robben-qr-chris.png',
  './img/robben-qr-jacquie.png', './img/robben-qr-john.png', './img/robben-qr-linda.png',
  './tickets/robben-island-RT2526k3tgrcza.pdf'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
