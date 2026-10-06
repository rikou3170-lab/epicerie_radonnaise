// Épicerie Raddonnaise — service worker
// Rend l'app installable et utilisable avec un réseau faible.
// Les données (Firestore) ne passent jamais par ce cache.
const VERSION = "1.2";   // = version des applications, à augmenter à chaque mise en ligne
const CACHE = "epicerie-" + VERSION;
const COQUILLE = ["./", "index.html", "client.js", "manifest.webmanifest", "logo.jpg",
  "icon-192.png", "icon-512.png", "icon-180.png", "splash.mp4"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(COQUILLE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(n => n.startsWith("epicerie-") && n !== CACHE).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  // Uniquement nos propres fichiers, en lecture. Tout le reste (Firebase, Google, QR…) passe directement.
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  // La vidéo se lit par morceaux (requêtes « Range ») : on la laisse au navigateur.
  if (req.headers.has("range")) return;

  // Images et vidéo : cache d'abord (elles changent rarement)
  if (/\.(png|jpg|mp4)$/.test(url.pathname)) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(n => {
      if (n.ok) { const c = n.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
      return n;
    })));
    return;
  }
  // Pages et code : réseau d'abord (toujours la dernière version), cache si hors ligne
  e.respondWith(fetch(req).then(r => {
    if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
    return r;
  }).catch(() => caches.match(req).then(r => r || (req.mode === "navigate" ? caches.match("index.html") : Response.error()))));
});
