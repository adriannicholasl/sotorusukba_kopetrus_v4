const CACHE_NAME = "ko-petrus-v1";
const urlsToCache = [
  // HTML
  "index.html",
  "game.html",
  "offline.html",
  "dashboard.html",
  "camera.html",
  "login.html",

  // CSS
  "css/style.css",
  "css/admin-style.css",
  "css/theme.css",
  "css/font-face.css",

  // JS
  "js/game.js",
  "js/firebase.js",
  "js/main.js",
  "js/admin.js",
  "js/camera.js",
  "js/data.js",
  "js/bootstrap-datetimepicker.js",
  "js/howler.core.min.js",
  "js/moment.js",

  // Images
  "assets/images/winner.png",
  "assets/images/frame.png",
  "assets/images/logo.png",
  "assets/images/target-area1.png",
  "assets/images/target-area3.png",

  // Sounds
  "assets/sounds/bgm.mp3",
  "assets/sounds/win.mp3",
  "assets/sounds/lose.mp3",
  "assets/sounds/countdown.mp3",
  "assets/sounds/tap.mp3",
];

// Install: cache semua file, cek file satu-satu
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log("Caching files for offline use...");
      for (const url of urlsToCache) {
        try {
          const response = await fetch(url);
          if (response.ok) {
            await cache.put(url, response.clone());
          } else {
            console.warn("❌ Failed to fetch:", url);
          }
        } catch (err) {
          console.warn("❌ Error caching:", url, err);
        }
      }
    })
  );
});

// Activate: hapus cache lama
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: ambil dari cache dulu, fallback ke network, jika gagal tampilkan offline.html
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          return response;
        })
        .catch(() => caches.match("offline.html"));
    })
  );
});
