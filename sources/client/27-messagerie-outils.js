/* ═══════════════════════════════════════════════════════════════════════
 *  MESSAGERIE CLIENTS ↔ ÉPICERIE — outils communs (clé du téléphone, dates et heures des messages).
 * ═══════════════════════════════════════════════════════════════════════ */

var CHAT_KEY = "epicerie-raddonnaise-chat";

// Messages : aperçu court, heure et jour d'un message, identifiant d'un document.
var U2 = (t) =>
    String(t || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 110),
  heureMsg = (t) => {
    let e = new Date(t),
      n = new Date(),
      r = new Date();
    r.setDate(r.getDate() - 1);
    let i = e.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    return e.toDateString() === n.toDateString()
      ? i
      : e.toDateString() === r.toDateString()
        ? "hier " + i
        : e.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) + " " + i;
  },
  jourMsg = (t) => {
    let e = new Date(t),
      n = new Date(),
      r = new Date();
    return (
      r.setDate(r.getDate() - 1),
      e.toDateString() === n.toDateString()
        ? "Aujourd'hui"
        : e.toDateString() === r.toDateString()
          ? "Hier"
          : e.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
    );
  },
  q2 = (t) =>
    t?.id ||
    String(t?.path || "")
      .split("/")
      .pop();
