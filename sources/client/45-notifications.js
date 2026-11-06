/* ═══════════════════════════════════════════════════════════════════════
 *  NOTIFICATIONS — abonnement du téléphone aux alertes (commandes, messages, bons plans).
 * ═══════════════════════════════════════════════════════════════════════ */

// Notifications : identifiant de ce téléphone.
var gx = "epicerie-raddonnaise-appareil",
  vx = () => {
    try {
      return JSON.parse(localStorage.getItem(gx) || "null");
    } catch {
      return null;
    }
  },
  W9 = () => {
    let t = new Uint32Array(24);
    return (
      crypto.getRandomValues(t),
      [...t].map((e) => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"[e % 56]).join("")
    );
  },
  refsSuivies = () => {
    let t = [];
    Dn().forEach((n) => n.ref && t.push(n.ref));
    let e = fx();
    e?.ref && t.push(e.ref);
    try {
      JSON.parse(localStorage.getItem("epicerie-raddonnaise-resas") || "[]").forEach(
        (n) => n.ref && t.push(n.ref),
      );
    } catch {}
    try {
      let n = JSON.parse(localStorage.getItem(USER_KEY) || "null");
      n?.ref && t.unshift(n.ref);
    } catch {}
    return [...new Set(t)].slice(0, 40);
  };

// Abonne ce téléphone aux notifications (jeton + cartes / commandes suivies).
async function Q2(t, e) {
  let r = vx()?.id || W9();
  await setDoc(doc2(db, "appareils", r), { token: t, refs: refsSuivies(), promo: !!e, maj: Date.now() });
  let i = { id: r, token: t, promo: !!e };
  try {
    localStorage.setItem(gx, JSON.stringify(i));
  } catch {}
  return i;
}

// Met à jour l'abonnement (nouvelles commandes ou réservations suivies).
async function _c() {
  let t = vx();
  if (!(!t?.id || !t.token))
    try {
      await setDoc(doc2(db, "appareils", t.id), {
        token: t.token,
        refs: refsSuivies(),
        promo: !!t.promo,
        maj: Date.now(),
      });
    } catch {}
}

// Vrai sur iPhone quand l'appli n'est pas installée (notifications impossibles).
var G9 = () =>
  /iPhone|iPad|iPod/.test(navigator.userAgent) &&
  !navigator.standalone &&
  !window.matchMedia("(display-mode: standalone)").matches;

// Notifications : état (autorisées, refusées…) et abonnement.
function useNotifs(t) {
  let e = t.push?.vapid || "",
    [n, r] = (0, React.useState)("…"),
    [i, o] = (0, React.useState)(vx);
  return (
    (0, React.useEffect)(() => {
      let d = !1;
      return (
        (async () => {
          if (!e) return r("indispo");
          if (G9()) return r("ios");
          if (!(await z2())) return r("indispo");
          if (Notification.permission === "denied") return r("refus");
          if (Notification.permission === "granted" && i?.id) {
            r("on");
            try {
              let h = await j2(e);
              !d && h.token && h.token !== i.token && o(await Q2(h.token, i.promo));
            } catch {}
          } else r("off");
        })(),
        () => {
          d = !0;
        }
      );
    }, [e]),
    {
      etat: n,
      app: i,
      activer: async (d) => {
        r("…");
        try {
          let h = await j2(e);
          if (h.erreur) return r(h.erreur === "refus" ? "refus" : "indispo");
          o(await Q2(h.token, d)), r("on"), tn(d ? "notif_bonsplans" : "notif_on");
        } catch {
          r("off"), h0("Activation impossible pour le moment. Réessayez plus tard.");
        }
      },
      bonsPlans: async (d) => {
        if (i?.token)
          try {
            o(await Q2(i.token, d));
          } catch {}
      },
      desactiver: async () => {
        try {
          i?.id && (await deleteDoc(doc2(db, "appareils", i.id)));
        } catch {}
        try {
          localStorage.removeItem(gx);
        } catch {}
        o(null), r("off");
      },
      dispo: !!e,
    }
  );
}

// Bloc « Notifications » (activer, bons plans).
function BlocNotifications({ n: t, compact }) {
  let [n, r] = (0, React.useState)(!1);
  return !t.dispo || t.etat === "indispo" || t.etat === "…" || (compact && t.etat !== "off")
    ? null
    : t.etat === "ios"
      ? compact
        ? null
        : React.default.createElement(
            "div",
            { className: "notif-bloc" },
            React.default.createElement("b", null, "🔔 Notifications"),
            React.default.createElement(
              "p",
              null,
              "Sur iPhone, installez d'abord l'application sur votre écran d'accueil (bouton « Installer »), puis revenez ici pour activer les notifications.",
            ),
          )
      : t.etat === "refus"
        ? compact
          ? null
          : React.default.createElement(
              "div",
              { className: "notif-bloc" },
              React.default.createElement("b", null, "🔔 Notifications bloquées"),
              React.default.createElement(
                "p",
                null,
                "Vous les avez refusées. Pour les recevoir, autorisez les notifications pour ce site dans les réglages de votre téléphone.",
              ),
            )
        : t.etat === "on"
          ? React.default.createElement(
              "div",
              { className: "notif-bloc on" },
              React.default.createElement("b", null, "🔔 Notifications activées"),
              React.default.createElement(
                "p",
                null,
                "Vous êtes prévenu quand votre commande est validée ou prête, et quand l'épicerie vous répond.",
              ),
              React.default.createElement(
                "label",
                { className: "accord", style: { marginTop: 6 } },
                React.default.createElement("input", {
                  type: "checkbox",
                  checked: !!t.app?.promo,
                  onChange: (i) => t.bonsPlans(i.target.checked),
                }),
                React.default.createElement(
                  "span",
                  null,
                  "Recevoir aussi les bons plans de l'épicerie (arrivages, promos…)",
                ),
              ),
              React.default.createElement(
                "button",
                { className: "lien", style: { marginTop: 8 }, onClick: t.desactiver },
                "Désactiver les notifications",
              ),
            )
          : React.default.createElement(
              "div",
              { className: "notif-bloc" + (compact ? " compact" : "") },
              React.default.createElement("b", null, "🔔 Être prévenu sur mon téléphone"),
              !compact &&
                React.default.createElement(
                  "p",
                  null,
                  "Commande validée, commande prête, réponse de l'épicerie… même quand l'application est fermée.",
                ),
              React.default.createElement(
                "label",
                { className: "accord", style: { marginTop: 6 } },
                React.default.createElement("input", {
                  type: "checkbox",
                  checked: n,
                  onChange: (i) => r(i.target.checked),
                }),
                React.default.createElement(
                  "span",
                  null,
                  "Et les bons plans de l'épicerie (arrivages, promos…)",
                ),
              ),
              React.default.createElement(
                "button",
                { className: "btn", style: { marginTop: 8 }, onClick: () => t.activer(n) },
                "Activer les notifications",
              ),
            );
}
