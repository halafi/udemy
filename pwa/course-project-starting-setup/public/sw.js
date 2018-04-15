self.addEventListener("install", function(event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open("static").then(function(cache) { // use static-v2 if code is changed but service worker isnt
      console.log("[Service Worker] Precaching App Shell");
      // pre-caching (static)
      cache.addAll([
        "/",
        "/index.html",
        "/src/js/app.js",
        "/src/js/feed.js",
        "/src/js/material.min.js",
        "/src/css/app.css",
        "/src/css/feed.css",
        "/src/images/main-image.jpg",
        "https://fonts.googleapis.com/css?family=Roboto:400,700", // loads external resource
        "https://fonts.googleapis.com/icon?family=Material+Icons", // loads external resource
        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css"
      ]);
      // dynamic caching
    })
  );
});

self.addEventListener("activate", function(event) {
  console.log("[Service Worker] Activating Service Worker ...", event);
  return self.clients.claim();
});

self.addEventListener("fetch", function(event) {
  console.log("[Service Worker] Fetching something ...", event);
  // event.respondWith(fetch(event.request));
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // null response if not found
      if (response) {
        return response;
      }
      return fetch(event.request)
        .then(function(res) {
          return caches.open("dynamic").then(function(cache) {
            cache.put(event.request.url, res.clone());
            return res;
          });
        })
        .catch(function(err) {

        });
    })
  );
});
