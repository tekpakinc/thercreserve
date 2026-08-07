const CACHE = 'rc-reserve-v1';
const APP_SHELL = [
  '/', '/index.html', '/offline.html', '/manifest.webmanifest', '/app-version.json',
  '/src/styles/main.css', '/src/main.js', '/pwa.js', '/data/vehicles.json',
  '/assets/icons/icon-192.png', '/assets/icons/icon-512.png', '/assets/icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim()));
});

async function networkFirst(request, fallback) {
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (response?.ok) caches.open(CACHE).then((cache) => cache.put(request, response.clone()));
    return response;
  } catch {
    return (await caches.match(request)) || (fallback ? caches.match(fallback) : Response.error());
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  if (request.mode === 'navigate') return event.respondWith(networkFirst(request, '/offline.html'));
  if (['script', 'style', 'worker'].includes(request.destination) || /\.(?:js|css|json|webmanifest)$/i.test(new URL(request.url).pathname)) return event.respondWith(networkFirst(request));
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => { if (response.ok) caches.open(CACHE).then((cache) => cache.put(request, response.clone())); return response; })));
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
