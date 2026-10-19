// Service worker: keeps the app files on the device so Lemon Soda opens without internet.
// Bump CACHE_VERSION whenever a file changes, so old copies are removed.
const CACHE_VERSION = 'v8';
const CACHE = `lemonsoda-${CACHE_VERSION}`;
const FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/styles.css',
  'js/app.js',
  'js/store.js',
  'js/days.js',
  'js/milestones.js',
  'js/content.js',
  'js/i18n.js',
  'js/image.js',
  'js/pick.js',
  'js/legal.js',
  'assets/fonts/manrope-latin-wght-normal.woff2',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/icon-maskable-512.png',
  'assets/icons/apple-touch-icon.png',
  'assets/icons/favicon-32.png',
  'assets/icons/favicon-48.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('lemonsoda-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Online: always fetch the newest file (and refresh the saved copy). Offline: use the saved copy.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || (req.mode === 'navigate' ? caches.match('index.html') : Response.error())))
  );
});
