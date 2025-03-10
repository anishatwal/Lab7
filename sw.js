// sw.js - Service Worker
var CACHE_NAME = 'cse110-lab7';
var urlsToCache = [
    'https://cse110lab6.herokuapp.com/entries'
];


// You will need 3 event listeners:
//   - One for installation
self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

//   - One for activation ( check out MDN's clients.claim() for this step )
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

//   - One for fetch requests
self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
});
