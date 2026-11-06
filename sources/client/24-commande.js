/* ═══════════════════════════════════════════════════════════════════════
 *  COMMANDES DE PLATEAUX — règles de dates, prix, choix, suivi, rappels d'agenda et avis envoyés à l'épicerie.
 * ═══════════════════════════════════════════════════════════════════════ */

// Commandes : modes (retrait / livraison), prix en euros, dates, jour en toutes lettres.
var MODES = { retrait: "Retrait à l'épicerie", livraison: "Livraison" },
  ze = (t) => (Math.round((Number(t) || 0) * 100) / 100).toFixed(2).replace(".", ",") + " €",
  Wt = (t) => t.toLocaleDateString("sv-SE"),
  Ko = (t) => {
    let e = new Date();
    return e.setHours(12, 0, 0, 0), e.setDate(e.getDate() + t), e;
  },
  jourFr = (t) =>
    t
      ? new Date(t + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
      : "";

// Dates de retrait possibles pour une commande (délai, horizon, jours d'ouverture, fermetures).
function y2(t, e = []) {
  let n = Nn(t),
    r = Wt(Ko(Math.max(0, Number(n.delaiMin) || 0))),
    i = Wt(Ko(Math.max(1, Number(n.horizon) || 60))),
    o = Array.isArray(n.jours) && n.jours.length ? n.jours : r5.jours,
    s = (d) => [...(n.fermes || []), ...(e || [])].some((h) => h && h.du && d >= h.du && d <= (h.au || h.du)),
    l = (d) => d >= r && d <= i && o.includes(new Date(d + "T12:00").getDay()) && !s(d),
    u = "";
  for (let d = 0; d <= 400; d++) {
    let h = Wt(Ko((Number(n.delaiMin) || 0) + d));
    if (h > i) break;
    if (l(h)) {
      u = h;
      break;
    }
  }
  return { min: r, max: i, ok: l, premiere: u };
}

// Prix par personne, nombre de parts, et numéro de commande.
var xc = (t) => Number(String(t?.prixPersonne ?? "").replace(",", ".")) || 0,
  x2 = (t) => {
    let e = Math.max(1, parseInt(t?.partsMin) || 1),
      n = Math.max(e, parseInt(t?.partsMax) || 50);
    return [e, n];
  },
  ALPHA_R = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
  i5 = () => {
    let t = new Uint32Array(5);
    return (
      (globalThis.crypto || window.crypto).getRandomValues(t),
      "C-" + [...t].map((e) => ALPHA_R[e % ALPHA_R.length]).join("")
    );
  };

// E-mail à Marion via son Google Apps Script.
// L'application n'envoie QUE l'identifiant de la commande : le script relit lui-même la commande
// dans Firebase, puis écrit à Marion (une seule fois par commande). Impossible de lui faire
// envoyer un faux e-mail ou d'écrire à quelqu'un d'autre.
async function envoyerMail(t, e) {
  let n = Nn(t).script;
  if (!bf(n) || !e) return "non-configure";
  try {
    return (
      await fetch(n + "?id=" + encodeURIComponent(e), { method: "GET", mode: "no-cors", redirect: "follow" }),
      "envoye"
    );
  } catch (r) {
    return "erreur:" + (r?.message || "réseau");
  }
}

// Prévient Marion par e-mail d'un nouveau message de client (le script relit la conversation)
async function avertirMessage(t, e) {
  let n = Nn(t).script;
  if (!(!bf(n) || !e))
    try {
      await fetch(n + "?msg=" + encodeURIComponent(e), {
        method: "GET",
        mode: "no-cors",
        redirect: "follow",
      });
    } catch {}
}

// Prévient Marion d'une nouvelle réservation anti-gaspi (le script relit la réservation)
async function avertirResa(t, e) {
  let n = Nn(t).script;
  if (!(!bf(n) || !e))
    try {
      await fetch(n + "?resa=" + encodeURIComponent(e), {
        method: "GET",
        mode: "no-cors",
        redirect: "follow",
      });
    } catch {}
}

// Suivi des commandes : heure (« 17h30 »), date de retrait, libellés et couleurs des statuts, dates d'agenda.
var l5 = (t) => (t ? t.replace(":", "h") : ""),
  Ua = (t) => t.dateRetrait || t.date,
  SUIVI = {
    nouvelle: { t: "En attente de validation", c: "#B08A2E" },
    acceptee: { t: "Validée ✓", c: "#6E9B3A" },
    prep: { t: "Validée · en préparation", c: "#6E9B3A" },
    prete: { t: "Prête !", c: "#C27B42" },
    remise: { t: "Retirée — merci !", c: "#93A099" },
    refusee: { t: "Non acceptée", c: "#B2563F" },
    annulee: { t: "Annulée", c: "#93A099" },
  },
  yf = (t) => String(t).padStart(2, "0"),
  icsDate = (t, e, n = 0) => {
    let [r, i] = (e || "17:00").split(":").map(Number),
      o = new Date(t + "T12:00");
    return (
      o.setHours(r, i + n, 0, 0),
      o.getFullYear() +
        yf(o.getMonth() + 1) +
        yf(o.getDate()) +
        "T" +
        yf(o.getHours()) +
        yf(o.getMinutes()) +
        "00"
    );
  },
  xf = (t) =>
    String(t || "")
      .replace(/[\\,;]/g, (e) => "\\" + e)
      .replace(/\n/g, "\\n");

// Texte du rappel d'agenda d'une commande (titre, lieu, détails).
function rappelTexte(t, e) {
  let n = t.mode === "livraison";
  return {
    titre: (n ? "Livraison de ma commande — " : "Retirer ma commande — ") + (e?.name || "Épicerie"),
    lieu: n ? t.adresse || "" : e?.address || "",
    detail:
      "Commande " +
      t.numero +
      (t.resume ? " : " + t.resume : "") +
      (t.total ? " — " + ze(t.total) : "") +
      (e?.phone
        ? `
Tél. épicerie : ` + e.phone
        : ""),
  };
}

// Fichier d'agenda (.ics) pour ajouter le retrait à son calendrier.
function fichierAgenda(t, e) {
  let n = rappelTexte(t, e),
    r = Ua(t);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Epicerie Raddonnaise//Commandes//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:" + t.numero + "@epicerie-raddonnaise",
    "DTSTAMP:" + icsDate(Wt(new Date()), "00:00"),
    "DTSTART:" + icsDate(r, t.heure),
    "DTEND:" + icsDate(r, t.heure, 30),
    "SUMMARY:" + xf(n.titre),
    "LOCATION:" + xf(n.lieu),
    "DESCRIPTION:" + xf(n.detail),
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:" + xf(n.titre),
    "TRIGGER:-PT1H",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join(`\r
`);
}

// Lien pour ajouter le retrait dans Google Agenda.
function lienGoogleAgenda(t, e) {
  let n = rappelTexte(t, e),
    r = Ua(t);
  return (
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
    encodeURIComponent(n.titre) +
    "&dates=" +
    icsDate(r, t.heure) +
    "/" +
    icsDate(r, t.heure, 30) +
    "&details=" +
    encodeURIComponent(n.detail) +
    "&location=" +
    encodeURIComponent(n.lieu)
  );
}

// Choix proposés sur un plateau (options et suppléments).
function Qo(t) {
  let e = t?.choix,
    n = ((e && e.options) || [])
      .filter((o) => o && String(o.nom || "").trim())
      .map((o) => ({ nom: String(o.nom).trim(), supp: Number(String(o.supp ?? 0).replace(",", ".")) || 0 }));
  if (!n.length) return null;
  let r = Math.max(0, parseInt(e.min) || 0),
    i = Math.min(n.length, Math.max(r || 1, parseInt(e.max) || n.length));
  return { titre: (e.titre || "").trim() || "Au choix", min: r, max: i, options: n };
}

// Prix d'un plateau avec ses choix, et liste des fromages à raclette.
var w2 = (t, e = []) => {
    let n = Qo(t);
    return xc(t) + (n ? n.options.filter((r) => e.includes(r.nom)).reduce((r, i) => r + i.supp, 0) : 0);
  },
  LISTE_RACLETTE = {
    titre: "Vos fromages à raclette",
    min: 1,
    max: 3,
    options: [
      "Raclette nature",
      "Raclette au fenugrec",
      "Raclette à l'ail des ours",
      "Raclette aux 5 baies",
      "Raclette Estivale (poivron / tomate)",
      "Raclette à la caméline",
      "Morbier",
      "Bargkass nature",
      "Bargkass à l'ortie",
      "Bargkass au serpolet",
    ].map((t) => ({ nom: t, supp: 0 })),
  };

// Fermeture en cours à une date donnée, et écart en jours.
var E2 = (t, e) => (t || []).find((n) => n && n.du && e >= n.du && e <= (n.au || n.du)) || null,
  qM = (t, e) => Math.round((new Date(e + "T12:00") - new Date(t + "T12:00")) / 864e5);

// Prochaine fermeture à annoncer (dans les 14 jours).
function _2(t, e = Wt(new Date())) {
  let r = (t || [])
    .filter((s) => s && s.du && (s.au || s.du) >= e)
    .sort((s, l) => s.du.localeCompare(l.du))[0];
  if (!r) return null;
  let i = r.du <= e,
    o = qM(e, r.du);
  return !i && o > 14 ? null : { ...r, au: r.au || r.du, enCours: i, dans: o };
}

// Date en toutes lettres (« samedi 12 décembre »).
var dateLongue = (t) =>
  new Date(t + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
