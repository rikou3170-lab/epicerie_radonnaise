// Règles de la carte de fidélité partagées (client, admin, caisse)
// Par défaut : 1 € = 1 point ; 200 points = 5 € de remise.
export const REMISE_DEF = { active: true, points: 200, euros: 5 };
export const remiseDe = (f) => {
  const r = f?.remise;
  if (!r || r.active === false) return null;
  const points = Math.max(1, parseInt(r.points) || REMISE_DEF.points);
  const euros = Math.max(0, Number(String(r.euros ?? REMISE_DEF.euros).replace(",", ".")) || REMISE_DEF.euros);
  return { points, euros };
};
export const eurosFr = (n) => (Math.round((Number(n) || 0) * 100) / 100).toFixed(2).replace(".", ",").replace(",00", "") + " €";
// Où en est le client
export function etatRemise(f, pts) {
  const r = remiseDe(f); if (!r) return null;
  const p = Math.max(0, pts || 0);
  const nb = Math.floor(p / r.points);
  return { ...r, nb, valeur: nb * r.euros, manque: r.points - (p % r.points), progres: (p % r.points) / r.points };
}
