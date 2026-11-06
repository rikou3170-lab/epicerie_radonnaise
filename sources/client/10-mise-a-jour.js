/* ═══════════════════════════════════════════════════════════════════════
 *  MISE À JOUR DE L'APPLI — compare la version installée avec version.json et propose de recharger.
 * ═══════════════════════════════════════════════════════════════════════ */

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
var JP = (t, e) =>
  new Promise((n) => {
    if (!t || t.state === "activated") return n();
    let r = setTimeout(n, e);
    t.addEventListener("statechange", () => {
      (t.state === "activated" || t.state === "redundant") && (clearTimeout(r), n());
    });
  });

// Installe la nouvelle version puis recharge la page.
async function Wy() {
  try {
    if ("serviceWorker" in navigator) {
      let t = await navigator.serviceWorker.getRegistration();
      t && (await t.update().catch(() => {}), await JP(t.installing || t.waiting, 6e3));
    }
  } catch {}
  location.reload();
}

// Vérifie régulièrement s'il existe une version plus récente en ligne.
function useMiseAJour() {
  let [dispo, setDispo] = (0, $t.useState)(null);
  return (
    (0, $t.useEffect)(() => {
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
  let [enCours, setEnCours] = (0, $t.useState)(!1);
  return dispo
    ? $t.default.createElement(
        "div",
        { style: styleBandeau },
        $t.default.createElement(
          "div",
          { style: { flex: 1, fontSize: 12.5, lineHeight: 1.35 } },
          $t.default.createElement(
            "b",
            { style: { display: "block", fontSize: 13.5 } },
            "Nouvelle version ",
            dispo,
          ),
          "Vous avez la version ",
          VERSION,
          ".",
        ),
        $t.default.createElement(
          "button",
          {
            disabled: enCours,
            onClick: () => {
              setEnCours(!0), Wy();
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

// Bouton manuel, toujours disponible (onglet Infos / Réglages)
function BoutonMaj({ className = "btn gh", style }) {
  let [etat, setEtat] = (0, $t.useState)("");
  return $t.default.createElement(
    "div",
    { style },
    $t.default.createElement(
      "button",
      {
        className,
        onClick: async () => {
          setEtat("Recherche…");
          let o = await versionEnLigne();
          o && o !== VERSION
            ? (setEtat("Installation de la version " + o + "…"), Wy())
            : setEtat(
                o
                  ? "Vous avez déjà la dernière version (" + VERSION + ")"
                  : "Impossible de vérifier : pas de connexion internet",
              );
        },
      },
      "Rechercher une mise à jour · v",
      VERSION,
    ),
    etat &&
      $t.default.createElement(
        "div",
        { style: { fontSize: 11.5, color: "#5C6A62", textAlign: "center", marginTop: 7 } },
        etat,
      ),
    etat.startsWith("Vous avez") &&
      $t.default.createElement(
        "button",
        { className, style: { marginTop: 8 }, onClick: Wy },
        "Recharger quand même",
      ),
  );
}
