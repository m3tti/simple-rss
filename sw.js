// ***************************
// Service Worker
// ***************************
var CACHE_NAME = 'version_01'
var URLS = [               // Add URL you want to cache in this list.
  '/',                     // If you have separate JS/CSS files,
  '/index.html',            // add path to those files here
  '/assets/css/tachyons.min.css',
  '/assets/js/alpine.min.js',
]

// Respond with cached resources
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (request) {
      return request || fetch(event.request)
    })
  )
})

// Cache resources
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS)
    })
  )
})

// Delete outdated caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key, i) {
        if (key !== CACHE_NAME) {
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})