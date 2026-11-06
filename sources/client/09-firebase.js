/* ═══════════════════════════════════════════════════════════════════════
 *  CONNEXION FIREBASE — projet « Application Marion » (identifiant technique : application-famille-897df).
 *  La clé apiKey n'est pas un secret : la protection des données repose sur les règles Firestore (firestore.rules).
 * ═══════════════════════════════════════════════════════════════════════ */

// Configuration du projet Firebase (pas de secret ici) et cache local des données.
var firebaseConfig = {
    apiKey: "AIzaSyCRvvyP7yCOSj2u4WDFCDvBWnGix0Ck-os",
    authDomain: "application-famille-897df.firebaseapp.com",
    projectId: "application-famille-897df",
    storageBucket: "application-famille-897df.firebasestorage.app",
    messagingSenderId: "718726611261",
    appId: "1:718726611261:web:793adf52ab34c8739d8554",
  },
  app = initializeApp(firebaseConfig),
  cacheLocal;

// Cache local (hors ligne) partagé entre onglets, s'il est disponible.
try {
  cacheLocal = persistentLocalCache({ tabManager: persistentMultipleTabManager() });
} catch {
  cacheLocal = void 0;
}

// Code fidélité : RAD- + 5 caractères sans ambiguïté (pas de 0/O, 1/I/L)
var db = initializeFirestore(app, cacheLocal ? { localCache: cacheLocal } : {}),
  auth = getAuth(app),
  CONFIG_REF = doc2(db, "shop", "config"),
  ALPHA = "ABCDEFGHJKMNPQRSTUVWXYZ23456789",
  qy = () => {
    let t = "",
      e = new Uint32Array(5);
    return (
      crypto.getRandomValues(e),
      e.forEach((n) => {
        t += ALPHA[n % ALPHA.length];
      }),
      "RAD-" + t
    );
  };

// Mesure d'audience ANONYME : date du jour, et réglages « sans stats » / « déjà vu aujourd'hui » gardés sur le téléphone.
var eI = (t = new Date()) => t.toLocaleDateString("sv-SE"),
  $y = "epicerie-raddonnaise-sans-stats",
  R3 = "epicerie-raddonnaise-vu-le";

// Vrai si ce téléphone a désactivé les statistiques (lien ?stats=off, utile pour Marion).
function KP() {
  try {
    return (
      /[?&]stats=off/.test(location.search) && localStorage.setItem($y, "1"),
      /[?&]stats=on/.test(location.search) && localStorage.removeItem($y),
      localStorage.getItem($y) === "1"
    );
  } catch {
    return !1;
  }
}

// Nettoie un nom de compteur (lettres, chiffres, _ et -).
var QP = (t) =>
  String(t)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 50);

// Ajoute 1 au compteur du jour (stats/AAAA-MM-JJ_cle). Rien n'identifie le client.
function tn(t) {
  let e = QP(t);
  if (!e || KP()) return;
  let n = eI();
  try {
    setDoc(doc2(db, "stats", n + "_" + e), { jour: n, cle: e, n: increment(1) }, { merge: !0 }).catch(
      () => {},
    );
  } catch {}
}

// À l'ouverture : compte une ouverture, l'heure, et un visiteur (une fois par jour et par téléphone).
function tI() {
  tn("ouvertures"), tn("h_" + String(new Date().getHours()).padStart(2, "0"));
  try {
    let t = eI();
    localStorage.getItem(R3) !== t && (localStorage.setItem(R3, t), tn("visiteurs"));
  } catch {}
}
var $t = On(Ln());
