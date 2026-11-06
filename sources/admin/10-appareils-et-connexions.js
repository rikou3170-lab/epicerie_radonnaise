/* ═══════════════════════════════════════════════════════════════════════
 *  APPAREILS ET CONNEXIONS — type d'appareil et journal des connexions à l'administration / la caisse.
 * ═══════════════════════════════════════════════════════════════════════ */

// Date AAAA-MM-JJ (heure locale).
var Hu = (t = new Date()) => t.toLocaleDateString("sv-SE");

// Décrit l'appareil utilisé (« iPhone · Safari », « iPad · Chrome »…) pour le journal des connexions.
function typeAppareil() {
  let t = navigator.userAgent || "",
    e = /iPhone/.test(t)
      ? "iPhone"
      : /iPad|Macintosh.*Mobile/.test(t) ||
          (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
        ? "iPad"
        : /Android/.test(t)
          ? /Mobile/.test(t)
            ? "Téléphone Android"
            : "Tablette Android"
          : /Windows/.test(t)
            ? "PC Windows"
            : /Mac/.test(t)
              ? "Mac"
              : "Autre",
    n = /Edg\//.test(t)
      ? "Edge"
      : /SamsungBrowser/.test(t)
        ? "Samsung"
        : /CriOS|Chrome\//.test(t)
          ? "Chrome"
          : /FxiOS|Firefox/.test(t)
            ? "Firefox"
            : /Safari/.test(t)
              ? "Safari"
              : "";
  return e + (n ? " · " + n : "");
}

// Note une connexion à l'administration (une fois par session) dans le journal « connexions ».
function ck(t) {
  try {
    let e = "epicerie-raddonnaise-cnx-" + t;
    if (sessionStorage.getItem(e)) return;
    sessionStorage.setItem(e, "1");
  } catch {}
  addDoc(collection(db, "connexions"), { date: Date.now(), app: t, appareil: typeAppareil() }).catch(
    () => {},
  );
}
