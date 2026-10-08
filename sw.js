// Épicerie Raddonnaise — service worker
// Rend l'app installable et utilisable avec un réseau faible.
// Les données (Firestore) ne passent jamais par ce cache.
const VERSION = "1.41";   // recopié automatiquement à chaque mise en ligne
const CACHE = "epicerie-" + VERSION;
const COQUILLE = ["./", "index.html", "client.js?v=" + VERSION, "manifest.webmanifest", "logo.jpg",
  "icon-192.png", "icon-512.png", "icon-180.png", "logo-intro.png", "fonts.css",
  "fonts/sacramento-latin-400-normal.woff2", "fonts/nunito-latin-400-normal.woff2", "fonts/nunito-latin-600-normal.woff2",
  "fonts/nunito-latin-700-normal.woff2", "fonts/nunito-latin-800-normal.woff2"];

self.addEventListener("install", (e) => {
  // « reload » : on va chercher les fichiers sur le serveur, pas dans le cache du navigateur
  e.waitUntil(caches.open(CACHE)
    .then(c => c.addAll(COQUILLE.map(u => new Request(u, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(n => n.startsWith("epicerie-") && n !== CACHE).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});

const garder = (req, r) => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); } return r; };

self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);
  // Uniquement nos propres fichiers, en lecture. Tout le reste (Firebase, Google, QR…) passe directement.
  if (req.method !== "GET" || url.origin !== self.location.origin) return;
  // La vidéo se lit par morceaux (requêtes « Range ») : on la laisse au navigateur.
  if (req.headers.has("range")) return;
  // Le numéro de version en ligne n'est jamais mis en cache.
  if (url.pathname.endsWith("/version.json")) return;

  // Images et polices : cache d'abord (renouvelé à chaque nouvelle version)
  if (/\.(png|jpg|mp4|woff2)$/.test(url.pathname)) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(n => garder(req, n))));
    return;
  }
  // Pages et code : toujours vérifiés auprès du serveur, cache seulement si hors ligne
  e.respondWith(fetch(req, { cache: "no-cache" }).then(r => garder(req, r))
    .catch(() => caches.match(req, { ignoreSearch: true })
      .then(r => r || (req.mode === "navigate" ? caches.match("index.html") : Response.error()))));
});
