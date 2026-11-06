/* ═══════════════════════════════════════════════════════════════════════
 *  MISE À JOUR DE L'APPLI — compare la version installée avec version.json et propose de recharger.
 * ═══════════════════════════════════════════════════════════════════════ */

var Xn = vn(Pn());

// Lit le numéro de la version en ligne (version.json), sans passer par le cache.
async function versionEnLigne() {
  try {
    let t = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
    return (t.ok && (await t.json()).version) || null;
  } catch {
    return null;
  }
}

// Attend que le nouveau service worker soit actif (avec une limite de temps).
var S_ = (t, e) =>
  new Promise((n) => {
    if (!t || t.state === "activated") return n();
    let r = setTimeout(n, e);
    t.addEventListener("statechange", () => {
      (t.state === "activated" || t.state === "redundant") && (clearTimeout(r), n());
    });
  });

// Installe la nouvelle version puis recharge la page.
async function P_() {
  try {
    if ("serviceWorker" in navigator) {
      let t = await navigator.serviceWorker.getRegistration();
      t && (await t.update().catch(() => {}), await S_(t.installing || t.waiting, 6e3));
    }
  } catch {}
  location.reload();
}

// Vérifie régulièrement s'il existe une version plus récente en ligne.
function useMiseAJour() {
  let [dispo, setDispo] = (0, Xn.useState)(null);
  return (
    (0, Xn.useEffect)(() => {
      location.search.includes("maj=") && history.replaceState(null, "", location.pathname);
      let n = async () => {
        let o = await versionEnLigne();
        o && o !== VERSION && setDispo(o);
      };
      n();
      let r = setInterval(n, 300 * 1e3),
        i = () => {
          document.visibilityState === "visible" && n();
        };
      return (
        document.addEventListener("visibilitychange", i),
        () => {
          clearInterval(r), document.removeEventListener("visibilitychange", i);
        }
      );
    }, []),
    dispo
  );
}

// Style du bandeau « Nouvelle version ».
var styleBandeau = {
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "calc(84px + env(safe-area-inset-bottom))",
  width: "calc(100% - 24px)",
  maxWidth: 420,
  zIndex: 300,
  background: "#1C433B",
  color: "#fff",
  borderRadius: 14,
  padding: "11px 12px 11px 15px",
  display: "flex",
  alignItems: "center",
  gap: 10,
  boxShadow: "0 8px 28px rgba(0,0,0,.25)",
  fontFamily: "'Nunito',system-ui,sans-serif",
};

// Bandeau proposant d'installer la nouvelle version.
function BandeauMaj({ dispo }) {
  let [enCours, setEnCours] = (0, Xn.useState)(!1);
  return dispo
    ? Xn.default.createElement(
        "div",
        { style: styleBandeau },
        Xn.default.createElement(
          "div",
          { style: { flex: 1, fontSize: 12.5, lineHeight: 1.35 } },
          Xn.default.createElement(
            "b",
            { style: { display: "block", fontSize: 13.5 } },
            "Nouvelle version ",
            dispo,
          ),
          "Vous avez la version ",
          VERSION,
          ".",
        ),
        Xn.default.createElement(
          "button",
          {
            disabled: enCours,
            onClick: () => {
              setEnCours(!0), P_();
            },
            style: {
              border: "none",
              background: "#8AAD3B",
              color: "#fff",
              fontFamily: "inherit",
              fontSize: 12.5,
              fontWeight: 800,
              padding: "10px 14px",
              borderRadius: 10,
              cursor: "pointer",
              flexShrink: 0,
            },
          },
          enCours ? "Mise à jour…" : "Mettre à jour",
        ),
      )
    : null;
}
