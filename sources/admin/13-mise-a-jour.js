/* ═══════════════════════════════════════════════════════════════════════
 *  MISE À JOUR DE L'APPLI — compare la version installée avec version.json et propose de recharger.
 * ═══════════════════════════════════════════════════════════════════════ */

var Rt = en(hn());

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
var rO = (t, e) =>
  new Promise((n) => {
    if (!t || t.state === "activated") return n();
    let r = setTimeout(n, e);
    t.addEventListener("statechange", () => {
      (t.state === "activated" || t.state === "redundant") && (clearTimeout(r), n());
    });
  });

// Installe la nouvelle version puis recharge la page.
async function b2() {
  try {
    if ("serviceWorker" in navigator) {
      let t = await navigator.serviceWorker.getRegistration();
      t && (await t.update().catch(() => {}), await rO(t.installing || t.waiting, 6e3));
    }
  } catch {}
  location.reload();
}

// Vérifie régulièrement s'il existe une version plus récente en ligne.
function useMiseAJour() {
  let [dispo, setDispo] = (0, Rt.useState)(null);
  return (
    (0, Rt.useEffect)(() => {
      location.search.includes("maj=") && history.replaceState(null, "", location.pathname);
      // v2.44a : mise à jour automatique à l'ouverture de l'appli, ou au retour après 30 min en arrière-plan
      // (une seule tentative par version et par session, pour ne jamais boucler) ; sinon, le bandeau.
      let cache = 0,
        auto = (v) => {
          try {
            if (sessionStorage.getItem("maj-auto") === v) return !1;
            sessionStorage.setItem("maj-auto", v);
          } catch {
            return !1;
          }
          return b2(), !0;
        },
        n = async (ouverture) => {
          let s = await versionEnLigne();
          s && s !== VERSION && ((ouverture && auto(s)) || setDispo(s));
        };
      n(!0);
      let r = setInterval(() => n(!1), 300 * 1e3),
        i = () => {
          document.visibilityState === "hidden"
            ? (cache = Date.now())
            : (n(!!cache && Date.now() - cache > 18e5), (cache = 0));
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
  let [enCours, setEnCours] = (0, Rt.useState)(!1);
  return dispo
    ? Rt.default.createElement(
        "div",
        { style: styleBandeau },
        Rt.default.createElement(
          "div",
          { style: { flex: 1, fontSize: 12.5, lineHeight: 1.35 } },
          Rt.default.createElement(
            "b",
            { style: { display: "block", fontSize: 13.5 } },
            "Nouvelle version ",
            dispo,
          ),
          "Vous avez la version ",
          VERSION,
          ".",
        ),
        Rt.default.createElement(
          "button",
          {
            disabled: enCours,
            onClick: () => {
              setEnCours(!0), b2();
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
  let [etat, setEtat] = (0, Rt.useState)("");
  return Rt.default.createElement(
    "div",
    { style },
    Rt.default.createElement(
      "button",
      {
        className,
        onClick: async () => {
          setEtat("Recherche…");
          let s = await versionEnLigne();
          s && s !== VERSION
            ? (setEtat("Installation de la version " + s + "…"), b2())
            : setEtat(
                s
                  ? "Vous avez déjà la dernière version (" + VERSION + ")"
                  : "Impossible de vérifier : pas de connexion internet",
              );
        },
      },
      "Rechercher une mise à jour · v",
      VERSION,
    ),
    etat &&
      Rt.default.createElement(
        "div",
        { style: { fontSize: 11.5, color: "#5C6A62", textAlign: "center", marginTop: 7 } },
        etat,
      ),
    etat.startsWith("Vous avez") &&
      Rt.default.createElement(
        "button",
        { className, style: { marginTop: 8 }, onClick: b2 },
        "Recharger quand même",
      ),
  );
}
