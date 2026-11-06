/* ═══════════════════════════════════════════════════════════════════════
 *  BOUTIQUE — textes des fermetures exceptionnelles.
 * ═══════════════════════════════════════════════════════════════════════ */

// Phrase d'annonce d'une fermeture exceptionnelle.
function texteFermeture(t) {
  if (!t) return "";
  let e = t.du === t.au ? "le " + dateLongue(t.du) : "du " + dateLongue(t.du) + " au " + dateLongue(t.au),
    n = t.motif ? " (" + t.motif + ")" : "";
  return t.enCours
    ? "L'épicerie est fermée" + n + " jusqu'au " + dateLongue(t.au) + " inclus. À très vite !"
    : "Fermeture exceptionnelle" + n + " " + e + ".";
}
