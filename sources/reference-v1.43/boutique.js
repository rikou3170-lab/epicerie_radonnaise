// ═══════════════════════════════════════════════════════════
//  Règles communes : fermetures exceptionnelles et réservation du pain
// ═══════════════════════════════════════════════════════════
import { isoDe, dansJours } from "./commande.js";

// ── Fermetures exceptionnelles (congés, jours fériés) ──
// fermetures : [{ du, au, motif }]
export const fermeLe = (fermetures, iso) => (fermetures || []).find(f => f && f.du && iso >= f.du && iso <= (f.au || f.du)) || null;
const ecartJ = (a, b) => Math.round((new Date(b + "T12:00") - new Date(a + "T12:00")) / 864e5);
// La fermeture à annoncer aux clients : en cours, ou qui commence dans les 14 jours
export function fermetureAAnnoncer(fermetures, auj = isoDe(new Date())) {
  const l = (fermetures || []).filter(f => f && f.du && (f.au || f.du) >= auj).sort((a, b) => a.du.localeCompare(b.du));
  const f = l[0]; if (!f) return null;
  const enCours = f.du <= auj, dans = ecartJ(auj, f.du);
  if (!enCours && dans > 14) return null;
  return { ...f, au: f.au || f.du, enCours, dans };
}
const jourFr = (iso) => new Date(iso + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
export function texteFermeture(f) {
  if (!f) return "";
  const periode = f.du === f.au ? "le " + jourFr(f.du) : "du " + jourFr(f.du) + " au " + jourFr(f.au);
  const motif = f.motif ? " (" + f.motif + ")" : "";
  if (f.enCours) return "L'épicerie est fermée" + motif + " jusqu'au " + jourFr(f.au) + " inclus. À très vite !";
  return "Fermeture exceptionnelle" + motif + " " + periode + ".";
}

// ── Réservation du pain ──
export const PAIN_DEF = { active: false, heureLimite: "18:00", jours: [0, 1, 2, 3, 4, 5, 6], produits: [], note: "", nbJours: 3 };
export const painCfg = (p) => ({ ...PAIN_DEF, ...(p || {}) });
export const prixP = (x) => Number(String(x ?? "").replace(",", ".")) || 0;
// Prochaines dates où l'on peut venir chercher son pain (à partir de demain ; après l'heure limite, à partir d'après-demain)
export function datesPain(p0, fermetures, maintenant = new Date()) {
  const p = painCfg(p0);
  const [h, m] = (p.heureLimite || "18:00").split(":").map(Number);
  const apres = maintenant.getHours() * 60 + maintenant.getMinutes() >= h * 60 + (m || 0);
  const depart = apres ? 2 : 1;
  const jours = Array.isArray(p.jours) && p.jours.length ? p.jours : PAIN_DEF.jours;
  const l = [];
  for (let i = depart; i < depart + 21 && l.length < Math.max(1, Number(p.nbJours) || 3); i++) {
    const iso = isoDe(dansJours(i));
    if (jours.includes(new Date(iso + "T12:00").getDay()) && !fermeLe(fermetures, iso)) l.push(iso);
  }
  return { dates: l, apresLimite: apres };
}
const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const numeroPain = () => { const a = new Uint32Array(5); (globalThis.crypto || window.crypto).getRandomValues(a); return "P-" + [...a].map(x => ALPHA[x % ALPHA.length]).join(""); };
