/* ═══════════════════════════════════════════════════════════════════════
 *  MENU DE LA SEMAINE (charcuterie Daval) — jours, dates et plat du jour.
 * ═══════════════════════════════════════════════════════════════════════ */

var ne = On(Ln());

// Jours de la semaine.
var u2 = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

// Nom du fournisseur du menu.
var vf = "Charcuterie Daval";

// Date AAAA-MM-JJ (heure locale).
var gc = (t) => t.toLocaleDateString("sv-SE");

// Prix en euros (« 12,50 € »).
var c2 = (t) => (t == null || t === "" || isNaN(t) ? "" : Number(t).toFixed(2).replace(".", ",") + " €");

// Dates du menu : aujourd'hui, jour de la semaine, date d'un jour du menu, menu en cours ou non.
var XI = () => gc(new Date()),
  vc = (t) => (new Date(t + "T12:00").getDay() + 6) % 7,
  d2 = (t, e) => {
    let n = new Date(t.du + "T12:00");
    return n.setDate(n.getDate() + (e - vc(t.du))), gc(n);
  },
  h2 = (t, e = XI()) =>
    !!(t && t.actif !== !1 && t.du && t.au && Array.isArray(t.jours) && t.jours.length && e <= t.au);

// Plat du jour dans le menu de la semaine.
function ZI(t, e = XI()) {
  if (!h2(t, e) || e < t.du) return null;
  let n = vc(e);
  return t.jours.find((r) => r.j === n && r.plat) || null;
}

// Jour en toutes lettres et date en français (« 1er novembre »).
var p2 = (t) => (u2[t] ? u2[t][0].toUpperCase() + u2[t].slice(1) : ""),
  dateFr = (t) =>
    new Date(t + "T12:00")
      .toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
      .replace(/^1 /, "1er ");
