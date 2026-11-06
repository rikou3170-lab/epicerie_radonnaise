var v2 = { retrait: "Retrait \xE0 l'\xE9picerie", livraison: "Livraison" },
  ze = (t) => (Math.round((Number(t) || 0) * 100) / 100).toFixed(2).replace(".", ",") + " \u20AC",
  Wt = (t) => t.toLocaleDateString("sv-SE"),
  Ko = (t) => {
    let e = new Date();
    return (e.setHours(12, 0, 0, 0), e.setDate(e.getDate() + t), e);
  },
  ja = (t) =>
    t
      ? new Date(t + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
      : "";
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
var xc = (t) => Number(String(t?.prixPersonne ?? "").replace(",", ".")) || 0,
  x2 = (t) => {
    let e = Math.max(1, parseInt(t?.partsMin) || 1),
      n = Math.max(e, parseInt(t?.partsMax) || 50);
    return [e, n];
  },
  n5 = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
  i5 = () => {
    let t = new Uint32Array(5);
    return (
      (globalThis.crypto || window.crypto).getRandomValues(t),
      "C-" + [...t].map((e) => n5[e % n5.length]).join("")
    );
  };
async function o5(t, e) {
  let n = Nn(t).script;
  if (!bf(n) || !e) return "non-configure";
  try {
    return (
      await fetch(n + "?id=" + encodeURIComponent(e), { method: "GET", mode: "no-cors", redirect: "follow" }),
      "envoye"
    );
  } catch (r) {
    return "erreur:" + (r?.message || "r\xE9seau");
  }
}
async function s5(t, e) {
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
async function a5(t, e) {
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
var l5 = (t) => (t ? t.replace(":", "h") : ""),
  Ua = (t) => t.dateRetrait || t.date,
  b2 = {
    nouvelle: { t: "En attente de validation", c: "#B08A2E" },
    acceptee: { t: "Valid\xE9e \u2713", c: "#6E9B3A" },
    prep: { t: "Valid\xE9e \xB7 en pr\xE9paration", c: "#6E9B3A" },
    prete: { t: "Pr\xEAte !", c: "#C27B42" },
    remise: { t: "Retir\xE9e \u2014 merci !", c: "#93A099" },
    refusee: { t: "Non accept\xE9e", c: "#B2563F" },
    annulee: { t: "Annul\xE9e", c: "#93A099" },
  },
  yf = (t) => String(t).padStart(2, "0"),
  yc = (t, e, n = 0) => {
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
function u5(t, e) {
  let n = t.mode === "livraison";
  return {
    titre:
      (n ? "Livraison de ma commande \u2014 " : "Retirer ma commande \u2014 ") + (e?.name || "\xC9picerie"),
    lieu: n ? t.adresse || "" : e?.address || "",
    detail:
      "Commande " +
      t.numero +
      (t.resume ? " : " + t.resume : "") +
      (t.total ? " \u2014 " + ze(t.total) : "") +
      (e?.phone
        ? `
T\xE9l. \xE9picerie : ` + e.phone
        : ""),
  };
}
function c5(t, e) {
  let n = u5(t, e),
    r = Ua(t);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Epicerie Raddonnaise//Commandes//FR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:" + t.numero + "@epicerie-raddonnaise",
    "DTSTAMP:" + yc(Wt(new Date()), "00:00"),
    "DTSTART:" + yc(r, t.heure),
    "DTEND:" + yc(r, t.heure, 30),
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
function d5(t, e) {
  let n = u5(t, e),
    r = Ua(t);
  return (
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
    encodeURIComponent(n.titre) +
    "&dates=" +
    yc(r, t.heure) +
    "/" +
    yc(r, t.heure, 30) +
    "&details=" +
    encodeURIComponent(n.detail) +
    "&location=" +
    encodeURIComponent(n.lieu)
  );
}
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
var w2 = (t, e = []) => {
    let n = Qo(t);
    return xc(t) + (n ? n.options.filter((r) => e.includes(r.nom)).reduce((r, i) => r + i.supp, 0) : 0);
  },
  OV = {
    titre: "Vos fromages \xE0 raclette",
    min: 1,
    max: 3,
    options: [
      "Raclette nature",
      "Raclette au fenugrec",
      "Raclette \xE0 l'ail des ours",
      "Raclette aux 5 baies",
      "Raclette Estivale (poivron / tomate)",
      "Raclette \xE0 la cam\xE9line",
      "Morbier",
      "Bargkass nature",
      "Bargkass \xE0 l'ortie",
      "Bargkass au serpolet",
    ].map((t) => ({ nom: t, supp: 0 })),
  };
var E2 = (t, e) => (t || []).find((n) => n && n.du && e >= n.du && e <= (n.au || n.du)) || null,
  qM = (t, e) => Math.round((new Date(e + "T12:00") - new Date(t + "T12:00")) / 864e5);
function _2(t, e = Wt(new Date())) {
  let r = (t || [])
    .filter((s) => s && s.du && (s.au || s.du) >= e)
    .sort((s, l) => s.du.localeCompare(l.du))[0];
  if (!r) return null;
  let i = r.du <= e,
    o = qM(e, r.du);
  return !i && o > 14 ? null : { ...r, au: r.au || r.du, enCours: i, dans: o };
}
var wf = (t) =>
  new Date(t + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
function h5(t) {
  if (!t) return "";
  let e = t.du === t.au ? "le " + wf(t.du) : "du " + wf(t.du) + " au " + wf(t.au),
    n = t.motif ? " (" + t.motif + ")" : "";
  return t.enCours
    ? "L'\xE9picerie est ferm\xE9e" + n + " jusqu'au " + wf(t.au) + " inclus. \xC0 tr\xE8s vite !"
    : "Fermeture exceptionnelle" + n + " " + e + ".";
}
