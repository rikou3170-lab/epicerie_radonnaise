/* ═══════════════════════════════════════════════════════════════════════
 *  RÈGLES DE LA CARTE DE FIDÉLITÉ — tampons, paliers, récompenses, niveaux « supporter », remise en points.
 * ═══════════════════════════════════════════════════════════════════════ */

// Remise en points : réglages par défaut et calcul de la remise disponible.
var CE = { active: !0, points: 200, euros: 5 },
  js = (t) => {
    let e = t?.remise;
    if (!e || e.active === !1) return null;
    let n = Math.max(1, parseInt(e.points) || CE.points),
      r = Math.max(0, Number(String(e.euros ?? CE.euros).replace(",", ".")) || CE.euros);
    return { points: n, euros: r };
  },
  qs = (t) =>
    (Math.round((Number(t) || 0) * 100) / 100).toFixed(2).replace(".", ",").replace(",00", "") + " €";

// Remise disponible pour un nombre de points donné.
function vE(t, e) {
  let n = js(t);
  if (!n) return null;
  let r = Math.max(0, e || 0),
    i = Math.floor(r / n.points);
  return {
    ...n,
    nb: i,
    valeur: i * n.euros,
    manque: n.points - (r % n.points),
    progres: (r % n.points) / n.points,
  };
}

// Carte à tampons : réglages par défaut, mention des exclusions, niveaux et récompenses.
var FC = {
    nb: 20,
    palier: 10,
    seuil: 10,
    recompense1: "un cadeau surprise",
    recompense: "un chouette cadeau surprise",
    exclus: "carburant, gaz et alcool",
    delai: 30,
  },
  DC = () => !0,
  MENTION_EXCLUSIONS = (t) => {
    let e = { ...FC, ...(t?.tampons || {}) };
    (!e.exclus || e.exclus === "carburant, gaz, alcools, tabac, presse, jeux") && (e.exclus = FC.exclus);
    let n = Math.min(30, Math.max(3, parseInt(e.nb) || 20)),
      r = parseInt(e.palier) > 0 && parseInt(e.palier) < n ? parseInt(e.palier) : 0;
    return {
      ...e,
      nb: n,
      palier: r,
      seuil: Math.max(0, Number(String(e.seuil).replace(",", ".")) || 0),
      delai: Math.max(0, parseInt(e.delai) || 0),
      recompense1: String(e.recompense1 || "un cadeau"),
      recompense: String(e.recompense || "un cadeau"),
    };
  },
  wC = (t) => {
    let e = MENTION_EXCLUSIONS(t);
    return (
      "1 tampon par tranche de " + (e.seuil > 0 ? e.seuil : 10) + " € d'achats" +
      " · " +
      (e.palier
        ? e.palier + " tampons = " + e.recompense1 + ", ou continuez : " + e.nb + " tampons = " + e.recompense
        : e.nb + " tampons = " + e.recompense)
    );
  },
  // v2.45 : 1 tampon par tranche de « seuil » € (10 € par défaut) ; le reste en euros est gardé sur la carte
  trancheTampon = (t) => (t.seuil > 0 ? t.seuil : 10),
  calculTampons = (t, e, n) => {
    let r = Math.round(((Number(t) || 0) + (Number(e) || 0)) * 100),
      i = Math.round(n * 100),
      o = Math.floor(r / i);
    return { n: o, reste: (r - o * i) / 100 };
  },
  eurosCaisse = (t) => (Math.round((Number(t) || 0) * 100) / 100).toFixed(2).replace(".", ",") + " €",
  _C = (t, e) => {
    let n = Number(t?.tampons) || 0;
    return n >= e.nb
      ? !0
      : !e.palier || n !== e.palier
        ? !1
        : !(t.choix === "continue" && (Number(t.choixLe) || 0) > (Number(t.dernierTampon) || 0));
  },
  kC = (t, e, n) => {
    let r = (Number(t) || 0) + 1,
      i = Math.max(0, Number(e) || 0);
    return n.palier && r <= n.palier && (i = Math.min(i, n.palier - r)), Math.max(0, Math.min(i, n.nb - r));
  },
  BC = [
    { min: 2, nom: "Membre supporter", ico: "💚" },
    { min: 5, nom: "Pilier de l'épicerie", ico: "🌳" },
  ],
  Kx = (t) => {
    let e = Math.max(0, Number(t?.cadeaux) || 0),
      n = [...BC].reverse().find((i) => e >= i.min) || null,
      r = BC.find((i) => e < i.min) || null;
    return { k: e, niv: n, suivant: r, reste: r ? r.min - e : 0 };
  };
