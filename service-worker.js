var files = [
  "index.html",
  "manifest.json",
  "pagar-estacionamento.html",
  "styles.css",
  "images/template.png",
  "images/photo-camera.svg",
  "images/touch/android-chrome-192x192.png",
  "images/touch/android-chrome-512x512.png",
  "images/touch/apple-touch-icon.jpg",
  "images/touch/favicon-16x16.png", 
  "images/touch/favicon-32x32.png",
  "images/touch/favicon.ico",
  "images/touch/mstile-150x150.png",
  "js/main.js",
  "js/pagamento.js",
  "js/spa.js",
  "img/loja/adidas.jpg",
  "img/loja/bacio-di-latte.jpg",
  "img/loja/brooksfield.jpg",
  "img/loja/burberry.jpg",
  "img/loja/cavalera.jpg",
  "img/loja/centauro.jpg",
  "img/loja/farm.jpg",
  "img/loja/forum.jpg",
  "img/loja/galetos.jpg",
  "img/loja/le-lis-blanc.jpg",
  "img/loja/ofner.jpg",
  "img/loja/pizza-hut.jpg",
  "img/loja/shoulder.jpg",
  "img/loja/so-sapatos.jpg",
  "img/loja/tip-top.jpg",
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
