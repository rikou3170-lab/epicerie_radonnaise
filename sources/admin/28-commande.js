/* ═══════════════════════════════════════════════════════════════════════
 *  COMMANDES DE PLATEAUX — règles de dates, prix, choix, suivi, rappels d'agenda et avis envoyés à l'épicerie.
 * ═══════════════════════════════════════════════════════════════════════ */

// Réglages par défaut (modifiables par Marion : Commandes → Calendrier & e-mail)
var CMD_DEF = {
    active: !0,
    delaiMin: 2,
    horizon: 60,
    jours: [0, 1, 2, 3, 4, 5, 6],
    fermes: [],
    mode: "retrait",
    note: "",
    heureDefaut: "17:00",
    script: "",
  },
  Er = (t) => ({ ...CMD_DEF, ...(t || {}) }),
  lw = (t) => /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(t || ""),
  ac = lw,
  QS = [
    [1, "Lun"],
    [2, "Mar"],
    [3, "Mer"],
    [4, "Jeu"],
    [5, "Ven"],
    [6, "Sam"],
    [0, "Dim"],
  ],
  MODES = { retrait: "Retrait à l'épicerie", livraison: "Livraison" },
  An = (t) => (Math.round((Number(t) || 0) * 100) / 100).toFixed(2).replace(".", ",") + " €",
  ow = (t) => t.toLocaleDateString("sv-SE"),
  aw = (t) => {
    let e = new Date();
    return e.setHours(12, 0, 0, 0), e.setDate(e.getDate() + t), e;
  },
  dateCourte = (t) =>
    t
      ? new Date(t + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
      : "";

// Dates de retrait possibles pour une commande (délai, horizon, jours d'ouverture, fermetures).
function YS(t, e = []) {
  let n = Er(t),
    r = ow(aw(Math.max(0, Number(n.delaiMin) || 0))),
    i = ow(aw(Math.max(1, Number(n.horizon) || 60))),
    s = Array.isArray(n.jours) && n.jours.length ? n.jours : CMD_DEF.jours,
    o = (d) => [...(n.fermes || []), ...(e || [])].some((h) => h && h.du && d >= h.du && d <= (h.au || h.du)),
    a = (d) => d >= r && d <= i && s.includes(new Date(d + "T12:00").getDay()) && !o(d),
    u = "";
  for (let d = 0; d <= 400; d++) {
    let h = ow(aw((Number(n.delaiMin) || 0) + d));
    if (h > i) break;
    if (a(h)) {
      u = h;
      break;
    }
  }
  return { min: r, max: i, ok: a, premiere: u };
}

// Prix par personne et nombre de parts d'un plateau.
var Ji = (t) => Number(String(t?.prixPersonne ?? "").replace(",", ".")) || 0,
  If = (t) => {
    let e = Math.max(1, parseInt(t?.partsMin) || 1),
      n = Math.max(e, parseInt(t?.partsMax) || 50);
    return [e, n];
  };

// Prévient Marion par e-mail d'un nouveau message de client (le script relit la conversation)
async function avertirMessage(t, e, n) {
  let r = Er(t).script;
  if (!(!lw(r) || !n || !["cmd", "msg", "diff"].includes(e)))
    try {
      await fetch(r + "?push=" + e + "&id=" + encodeURIComponent(n), {
        method: "GET",
        mode: "no-cors",
        redirect: "follow",
      });
    } catch {}
}

// Lien de test du script d'envoi, heure (« 17h30 ») et date de retrait.
var JS = (t) => {
    let e = Er(t).script;
    return lw(e) ? e + "?test=1" : "";
  },
  lc = (t) => (t ? t.replace(":", "h") : ""),
  er = (t) => t.dateRetrait || t.date;

// Choix proposés sur un plateau (options et suppléments).
function kf(t) {
  let e = t?.choix,
    n = ((e && e.options) || [])
      .filter((s) => s && String(s.nom || "").trim())
      .map((s) => ({ nom: String(s.nom).trim(), supp: Number(String(s.supp ?? 0).replace(",", ".")) || 0 }));
  if (!n.length) return null;
  let r = Math.max(0, parseInt(e.min) || 0),
    i = Math.min(n.length, Math.max(r || 1, parseInt(e.max) || n.length));
  return { titre: (e.titre || "").trim() || "Au choix", min: r, max: i, options: n };
}

// Prix d'un plateau avec ses choix, et liste des fromages à raclette.
var XS = (t, e = []) => {
    let n = kf(t);
    return Ji(t) + (n ? n.options.filter((r) => e.includes(r.nom)).reduce((r, i) => r + i.supp, 0) : 0);
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
