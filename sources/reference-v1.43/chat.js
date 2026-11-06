// ═══════════════════════════════════════════════════════════
//  Messagerie clients ↔ épicerie — règles communes
//  conversations/{id secret}            : nom, tel, cree, maj, dernier, attente
//  conversations/{id}/messages/{auto}   : de ("client" | "epicerie"), texte, date
// ═══════════════════════════════════════════════════════════
export const CHAT_KEY = "epicerie-raddonnaise-chat";
export const MAX_TEXTE = 1000;
export const apercu = (t) => String(t || "").replace(/\s+/g, " ").trim().slice(0, 110);
export const heureMsg = (ms) => {
  const d = new Date(ms), auj = new Date();
  const hier = new Date(); hier.setDate(hier.getDate() - 1);
  const h = d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  if (d.toDateString() === auj.toDateString()) return h;
  if (d.toDateString() === hier.toDateString()) return "hier " + h;
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) + " " + h;
};
export const jourMsg = (ms) => {
  const d = new Date(ms), auj = new Date(); const hier = new Date(); hier.setDate(hier.getDate() - 1);
  if (d.toDateString() === auj.toDateString()) return "Aujourd'hui";
  if (d.toDateString() === hier.toDateString()) return "Hier";
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
};
export const refId = (r) => r?.id || String(r?.path || "").split("/").pop();
