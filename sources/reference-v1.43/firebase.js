// ═══════════════════════════════════════════════════════════
//  Connexion Firebase — projet « Application Marion »
//  (identifiant technique : application-famille-897df)
//  La clé apiKey n'est pas un secret : la protection des données
//  repose sur les règles Firestore (fichier firestore.rules).
// ═══════════════════════════════════════════════════════════
import { initializeApp } from "firebase/app";
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  doc, collection, onSnapshot, setDoc, addDoc, writeBatch, increment, getDocs, getDoc, deleteDoc,
} from "firebase/firestore";
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRvvyP7yCOSj2u4WDFCDvBWnGix0Ck-os",
  authDomain: "application-famille-897df.firebaseapp.com",
  projectId: "application-famille-897df",
  storageBucket: "application-famille-897df.firebasestorage.app",
  messagingSenderId: "718726611261",
  appId: "1:718726611261:web:793adf52ab34c8739d8554",
  // Analytics volontairement non activé (pas de cookies, pas de bandeau RGPD)
};

const app = initializeApp(firebaseConfig);

let cache;
try { cache = persistentLocalCache({ tabManager: persistentMultipleTabManager() }); } catch { cache = undefined; }
export const db = initializeFirestore(app, cache ? { localCache: cache } : {});
export const auth = getAuth(app);

export const CONFIG_REF = doc(db, "shop", "config");

// Code fidélité : RAD- + 5 caractères sans ambiguïté (pas de 0/O, 1/I/L)
const ALPHA = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const nouveauCode = () => {
  let s = "";
  const r = new Uint32Array(5);
  crypto.getRandomValues(r);
  r.forEach(n => { s += ALPHA[n % ALPHA.length]; });
  return "RAD-" + s;
};

export {
  doc, collection, onSnapshot, setDoc, addDoc, writeBatch, increment, getDocs, getDoc, deleteDoc,
  onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,
};
