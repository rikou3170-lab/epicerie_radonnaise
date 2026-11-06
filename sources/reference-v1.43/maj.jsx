// ═══════════════════════════════════════════════════════════
//  Mise à jour de l'application
//  - compare la version en ligne (version.json) à celle affichée
//  - propose un bandeau « Mettre à jour » quand elle diffère
//  - le bouton vide le cache de l'app et recharge la dernière version
//  (les données Firestore et la carte de fidélité ne sont pas touchées)
// ═══════════════════════════════════════════════════════════
import React, { useState, useEffect } from "react";
import { VERSION } from "./version.js";

export async function versionEnLigne() {
  try {
    const r = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
    if (!r.ok) return null;
    return (await r.json()).version || null;
  } catch { return null; }
}

export async function forcerMiseAJour() {
  try {
    if ("serviceWorker" in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.update().catch(() => { })));
    }
  } catch { }
  try { const k = await caches.keys(); await Promise.all(k.map(n => caches.delete(n))); } catch { }
  location.replace(location.pathname + "?maj=" + Date.now());
}

export function useMiseAJour() {
  const [dispo, setDispo] = useState(null);
  useEffect(() => {
    // nettoie l'adresse après un rechargement forcé
    if (location.search.includes("maj=")) history.replaceState(null, "", location.pathname);
    const verifier = async () => { const v = await versionEnLigne(); if (v && v !== VERSION) setDispo(v); };
    verifier();
    const iv = setInterval(verifier, 5 * 60 * 1000);
    const vis = () => { if (document.visibilityState === "visible") verifier(); };
    document.addEventListener("visibilitychange", vis);
    return () => { clearInterval(iv); document.removeEventListener("visibilitychange", vis); };
  }, []);
  return dispo;
}

const styleBandeau = {
  position: "fixed", left: "50%", transform: "translateX(-50%)", bottom: "calc(84px + env(safe-area-inset-bottom))",
  width: "calc(100% - 24px)", maxWidth: 420, zIndex: 300, background: "#1C433B", color: "#fff",
  borderRadius: 14, padding: "11px 12px 11px 15px", display: "flex", alignItems: "center", gap: 10,
  boxShadow: "0 8px 28px rgba(0,0,0,.25)", fontFamily: "'Nunito',system-ui,sans-serif",
};

export function BandeauMaj({ dispo }) {
  const [enCours, setEnCours] = useState(false);
  if (!dispo) return null;
  return (
    <div style={styleBandeau}>
      <div style={{ flex: 1, fontSize: 12.5, lineHeight: 1.35 }}>
        <b style={{ display: "block", fontSize: 13.5 }}>Nouvelle version {dispo}</b>
        Vous avez la version {VERSION}.
      </div>
      <button disabled={enCours} onClick={() => { setEnCours(true); forcerMiseAJour(); }}
        style={{ border: "none", background: "#8AAD3B", color: "#fff", fontFamily: "inherit", fontSize: 12.5, fontWeight: 800, padding: "10px 14px", borderRadius: 10, cursor: "pointer", flexShrink: 0 }}>
        {enCours ? "Mise à jour…" : "Mettre à jour"}
      </button>
    </div>
  );
}

// Bouton manuel, toujours disponible (onglet Infos / Réglages)
export function BoutonMaj({ className = "btn gh", style }) {
  const [etat, setEtat] = useState("");
  const go = async () => {
    setEtat("Recherche…");
    const v = await versionEnLigne();
    if (v && v !== VERSION) { setEtat("Installation de la version " + v + "…"); forcerMiseAJour(); }
    else if (v) setEtat("Vous avez déjà la dernière version (" + VERSION + ")");
    else setEtat("Impossible de vérifier : pas de connexion internet");
  };
  return (
    <div style={style}>
      <button className={className} onClick={go}>Rechercher une mise à jour · v{VERSION}</button>
      {etat && <div style={{ fontSize: 11.5, color: "#5C6A62", textAlign: "center", marginTop: 7 }}>{etat}</div>}
      {etat.startsWith("Vous avez") && <button className={className} style={{ marginTop: 8 }} onClick={forcerMiseAJour}>Recharger quand même</button>}
    </div>
  );
}
