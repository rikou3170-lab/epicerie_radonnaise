// ═══════════════════════════════════════════════════════════
//  Commandes de plateaux — règles partagées (client + admin)
// ═══════════════════════════════════════════════════════════

// Réglages par défaut (modifiables par Marion : Commandes → Calendrier & e-mail)
export const CMD_DEF = {
  active: true,
  delaiMin: 2,          // jours : 2 = ni aujourd'hui ni demain
  horizon: 60,          // jours : jusqu'où le calendrier est ouvert
  jours: [0, 1, 2, 3, 4, 5, 6],   // jours de la semaine acceptés (0 = dimanche)
  fermes: [],           // périodes fermées [{ du, au }]
  mode: "retrait",      // retrait | livraison | choix
  note: "",             // message affiché au client
  heureDefaut: "17:00", // heure de retrait proposée quand Marion accepte
  script: "",           // adresse de l'Apps Script Google qui envoie l'e-mail à Marion
};
export const cmdCfg = (c) => ({ ...CMD_DEF, ...(c || {}) });
const scriptOk = (u) => /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(u || "");
export const scriptValide = scriptOk;

export const JOURS_SEM = [[1, "Lun"], [2, "Mar"], [3, "Mer"], [4, "Jeu"], [5, "Ven"], [6, "Sam"], [0, "Dim"]];
export const MODES = { retrait: "Retrait à l'épicerie", livraison: "Livraison" };

export const euros = (n) => (Math.round((Number(n) || 0) * 100) / 100).toFixed(2).replace(".", ",") + " €";
export const isoDe = (dt) => dt.toLocaleDateString("sv-SE");
export const dansJours = (n) => { const x = new Date(); x.setHours(12, 0, 0, 0); x.setDate(x.getDate() + n); return x; };
export const dateLongue = (iso) => iso ? new Date(iso + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }) : "";

// Quelles dates le client peut choisir
export function regleDates(c0, fermeturesBoutique = []) {
  const c = cmdCfg(c0);
  const min = isoDe(dansJours(Math.max(0, Number(c.delaiMin) || 0)));
  const max = isoDe(dansJours(Math.max(1, Number(c.horizon) || 60)));
  const jours = Array.isArray(c.jours) && c.jours.length ? c.jours : CMD_DEF.jours;
  const ferme = (iso) => [...(c.fermes || []), ...(fermeturesBoutique || [])].some(f => f && f.du && iso >= f.du && iso <= (f.au || f.du));
  const ok = (iso) => iso >= min && iso <= max && jours.includes(new Date(iso + "T12:00").getDay()) && !ferme(iso);
  let premiere = "";
  for (let i = 0; i <= 400; i++) { const iso = isoDe(dansJours((Number(c.delaiMin) || 0) + i)); if (iso > max) break; if (ok(iso)) { premiere = iso; break; } }
  return { min, max, ok, premiere };
}

// Prix d'une ligne : prix par personne × nombre de personnes
export const prixPers = (p) => Number(String(p?.prixPersonne ?? "").replace(",", ".")) || 0;
export const bornes = (p) => {
  const min = Math.max(1, parseInt(p?.partsMin) || 1);
  const max = Math.max(min, parseInt(p?.partsMax) || 50);
  return [min, max];
};

const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export const numeroCommande = () => {
  const a = new Uint32Array(5); (globalThis.crypto || window.crypto).getRandomValues(a);
  return "C-" + [...a].map(x => ALPHA[x % ALPHA.length]).join("");
};

// E-mail à Marion via son Google Apps Script.
// L'application n'envoie QUE l'identifiant de la commande : le script relit lui-même la commande
// dans Firebase, puis écrit à Marion (une seule fois par commande). Impossible de lui faire
// envoyer un faux e-mail ou d'écrire à quelqu'un d'autre.
export async function envoyerMail(cfg0, id) {
  const u = cmdCfg(cfg0).script;
  if (!scriptOk(u) || !id) return "non-configure";
  // « no-cors » : on prévient le script sans lire sa réponse (évite les blocages de Google)
  try { await fetch(u + "?id=" + encodeURIComponent(id), { method: "GET", mode: "no-cors", redirect: "follow" }); return "envoye"; }
  catch (err) { return "erreur:" + (err?.message || "réseau"); }
}
// Prévient Marion par e-mail d'un nouveau message de client (le script relit la conversation)
export async function avertirMessage(cfg0, convId) {
  const u = cmdCfg(cfg0).script;
  if (!scriptOk(u) || !convId) return;
  try { await fetch(u + "?msg=" + encodeURIComponent(convId), { method: "GET", mode: "no-cors", redirect: "follow" }); } catch { }
}
// Prévient Marion d'une nouvelle réservation anti-gaspi (le script relit la réservation)
export async function avertirResa(cfg0, id) {
  const u = cmdCfg(cfg0).script;
  if (!scriptOk(u) || !id) return;
  try { await fetch(u + "?resa=" + encodeURIComponent(id), { method: "GET", mode: "no-cors", redirect: "follow" }); } catch { }
}
export const urlTestMail = (cfg0) => { const u = cmdCfg(cfg0).script; return scriptOk(u) ? u + "?test=1" : ""; };

// ── Suivi côté client ──
export const heureFr = (h) => h ? h.replace(":", "h") : "";
export const dateRetrait = (c) => c.dateRetrait || c.date;
export const SUIVI = {
  nouvelle: { t: "En attente de validation", c: "#B08A2E" },
  acceptee: { t: "Validée ✓", c: "#6E9B3A" },
  prep: { t: "Validée · en préparation", c: "#6E9B3A" },
  prete: { t: "Prête !", c: "#C27B42" },
  remise: { t: "Retirée — merci !", c: "#93A099" },
  refusee: { t: "Non acceptée", c: "#B2563F" },
  annulee: { t: "Annulée", c: "#93A099" },
};

// Rappel dans l'agenda du téléphone (.ics) : alerte 1 h avant l'heure choisie par Marion
const pad = (n) => String(n).padStart(2, "0");
const icsDate = (iso, h, plus = 0) => {
  const [H, M] = (h || "17:00").split(":").map(Number);
  const d = new Date(iso + "T12:00"); d.setHours(H, M + plus, 0, 0);
  return d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + "T" + pad(d.getHours()) + pad(d.getMinutes()) + "00";
};
const echap = (t) => String(t || "").replace(/[\\,;]/g, m => "\\" + m).replace(/\n/g, "\\n");
export function rappelTexte(c, store) {
  const liv = c.mode === "livraison";
  return {
    titre: (liv ? "Livraison de ma commande — " : "Retirer ma commande — ") + (store?.name || "Épicerie"),
    lieu: liv ? (c.adresse || "") : (store?.address || ""),
    detail: "Commande " + c.numero + (c.resume ? " : " + c.resume : "") + (c.total ? " — " + euros(c.total) : "") + (store?.phone ? "\nTél. épicerie : " + store.phone : ""),
  };
}
export function fichierAgenda(c, store) {
  const r = rappelTexte(c, store), iso = dateRetrait(c);
  const l = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Epicerie Raddonnaise//Commandes//FR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "BEGIN:VEVENT",
    "UID:" + c.numero + "@epicerie-raddonnaise", "DTSTAMP:" + icsDate(isoDe(new Date()), "00:00"),
    "DTSTART:" + icsDate(iso, c.heure), "DTEND:" + icsDate(iso, c.heure, 30),
    "SUMMARY:" + echap(r.titre), "LOCATION:" + echap(r.lieu), "DESCRIPTION:" + echap(r.detail),
    "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + echap(r.titre), "TRIGGER:-PT1H", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR"];
  return l.join("\r\n");
}
export function lienGoogleAgenda(c, store) {
  const r = rappelTexte(c, store), iso = dateRetrait(c);
  return "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent(r.titre) +
    "&dates=" + icsDate(iso, c.heure) + "/" + icsDate(iso, c.heure, 30) + "&details=" + encodeURIComponent(r.detail) + "&location=" + encodeURIComponent(r.lieu);
}

// ── Choix proposés au client sur un plateau (ex. fromages à raclette) ──
export function choixDe(p) {
  const c = p?.choix;
  const options = ((c && c.options) || []).filter(o => o && String(o.nom || "").trim())
    .map(o => ({ nom: String(o.nom).trim(), supp: Number(String(o.supp ?? 0).replace(",", ".")) || 0 }));
  if (!options.length) return null;
  const min = Math.max(0, parseInt(c.min) || 0);
  const max = Math.min(options.length, Math.max(min || 1, parseInt(c.max) || options.length));
  return { titre: (c.titre || "").trim() || "Au choix", min, max, options };
}
// Prix par personne avec les suppléments des choix cochés
export const prixAvecChoix = (p, sel = []) => {
  const c = choixDe(p);
  return prixPers(p) + (c ? c.options.filter(o => sel.includes(o.nom)).reduce((t, o) => t + o.supp, 0) : 0);
};
export const LISTE_RACLETTE = {
  titre: "Vos fromages à raclette", min: 1, max: 3,
  options: ["Raclette nature", "Raclette au fenugrec", "Raclette à l'ail des ours", "Raclette aux 5 baies", "Raclette Estivale (poivron / tomate)",
    "Raclette à la caméline", "Morbier", "Bargkass nature", "Bargkass à l'ortie", "Bargkass au serpolet"].map(nom => ({ nom, supp: 0 })),
};
