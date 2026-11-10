/* ═══════════════════════════════════════════════════════════════════════
 *  RÈGLES DE LA CARTE DE FIDÉLITÉ — tampons, paliers, récompenses, niveaux « supporter », remise en points.
 * ═══════════════════════════════════════════════════════════════════════ */

// Remise en points : réglages par défaut et calcul de la remise disponible.
var Na = { active: !0, points: 200, euros: 5 },
  x2 = (t) => {
    let e = t?.remise;
    if (!e || e.active === !1) return null;
    let n = Math.max(1, parseInt(e.points) || Na.points),
      r = Math.max(0, Number(String(e.euros ?? Na.euros).replace(",", ".")) || Na.euros);
    return { points: n, euros: r };
  },
  eo = (t) =>
    (Math.round((Number(t) || 0) * 100) / 100).toFixed(2).replace(".", ",").replace(",00", "") + " €";

// Prochaine fermeture à annoncer (dans les 14 jours).
function _2(t, e) {
  let n = x2(t);
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

// Carte à tampons : réglages par défaut (20 tampons, palier à 10…), mention des exclusions et récompenses.
var it = {
    nb: 20,
    palier: 10,
    seuil: 10,
    recompense1: "un cadeau surprise",
    recompense: "un chouette cadeau surprise",
    exclus: "carburant, gaz et alcool",
    delai: 30,
  },
  eC = () => !0,
  MENTION_EXCLUSIONS = (t) => {
    let e = { ...it, ...(t?.tampons || {}) };
    (!e.exclus || e.exclus === "carburant, gaz, alcools, tabac, presse, jeux") && (e.exclus = it.exclus);
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
  A2 = (t) => {
    let e = MENTION_EXCLUSIONS(t);
    return (
      "1 tampon par tranche de " + (e.seuil > 0 ? e.seuil : 10) + " € d'achats" +
      " · " +
      (e.palier
        ? e.palier + " tampons = " + e.recompense1 + ", ou continuez : " + e.nb + " tampons = " + e.recompense
        : e.nb + " tampons = " + e.recompense)
    );
  };

// Niveaux « Membre supporter » / « Pilier de l'épicerie » selon le nombre de cadeaux reçus.
var Rk = [
    { min: 2, nom: "Membre supporter", ico: "💚" },
    { min: 5, nom: "Pilier de l'épicerie", ico: "🌳" },
  ],
  df = (t) => {
    let e = Math.max(0, Number(t?.cadeaux) || 0),
      n = [...Rk].reverse().find((i) => e >= i.min) || null,
      r = Rk.find((i) => e < i.min) || null;
    return { k: e, niv: n, suivant: r, reste: r ? r.min - e : 0 };
  };
