var files = [
  "index.html",
  "manifest.json",
  "styles.css",
  "files.json",
  "main.201113f887d44acdfa77.bundle.js",
  "decoder.js",
  "images/photo-camera.svg",
  "images/template.png",
  "images/touch/android-chrome-192x192.png",
  "images/touch/android-chrome-512x512.png",
  "images/touch/apple-touch-icon.jpg",
  "images/touch/favicon-16x16.png",
  "images/touch/favicon-32x32.png",
  "images/touch/favicon.ico",
  "images/touch/mstile-150x150.png",
  "js/barcode.js"
  "js/install.js"
  "js/main.js"
  "js/pagamento.js"
  "js/vendor/jquery.min.js",
  "js/vendor/materialize-0.97.0.min.js",
  "js/vendor/quagga.min.js"
];
// dev only
if (typeof files == 'undefined') {
  var files = [];
} else {
  files.push('./');
}

var CACHE_NAME = 'leitorqr-v1';

self.addEventListener('activate', function(event) {
  console.log('[SW] Activate');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (CACHE_NAME.indexOf(cacheName) == -1) {
            console.log('[SW] Delete cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('install', function(event){
  console.log('[SW] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return Promise.all(
      	files.map(function(file){
      		return cache.add(file);
      	})
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('[SW] fetch ' + event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response){
      return response || fetch(event.request.clone());
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event);
  clients.openWindow('/');
});
