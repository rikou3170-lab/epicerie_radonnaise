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

// Base de données, connexion et réglages de l'épicerie.
var db = initializeFirestore(app, cacheLocal ? { localCache: cacheLocal } : {}),
  auth = getAuth(app),
  CONFIG_REF = doc2(db, "shop", "config");
