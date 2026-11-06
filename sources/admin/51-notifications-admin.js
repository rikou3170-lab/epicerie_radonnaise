/* ═══════════════════════════════════════════════════════════════════════
 *  NOTIFICATIONS DE MARION — alertes sur son téléphone (nouvelle commande, réservation, message).
 * ═══════════════════════════════════════════════════════════════════════ */

// Notifications de Marion : identifiant de l'appareil, état.
var Mf = "epicerie-raddonnaise-admin-appareil",
  Ew = () => {
    try {
      return JSON.parse(localStorage.getItem(Mf) || "null");
    } catch {
      return null;
    }
  },
  bN = () =>
    /iPhone|iPad|iPod/.test(navigator.userAgent) &&
    !navigator.standalone &&
    !window.matchMedia("(display-mode: standalone)").matches;

// Identifiant aléatoire (secret) pour l'appareil de Marion.
async function idAleatoire(t) {
  let n =
    Ew()?.id ||
    [...crypto.getRandomValues(new Uint32Array(24))]
      .map((i) => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"[i % 56])
      .join("");
  await setDoc(doc2(db, "appareilsAdmin", n), { token: t, appareil: typeAppareil(), maj: Date.now() });
  let r = { id: n, token: t };
  try {
    localStorage.setItem(Mf, JSON.stringify(r));
  } catch {}
  return r;
}
var cN = "epicerie-raddonnaise-admin-notif-plus-tard";

// Bloc d'activation des notifications sur le téléphone de Marion.
function BlocNotifsAdmin({ d: t }) {
  let e = t.push?.vapid || "",
    n = Er(t.cmd).script,
    [r, i] = (0, React.useState)(!1),
    [s, o] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(() => {
      let u = !1;
      return (
        (async () => {
          if (!(!e || !ac(n) || bN() || !(await lf()))) {
            if (Notification.permission === "granted")
              try {
                let d = await Yu(e),
                  h = Ew();
                !u && d.token && (!h?.id || d.token !== h.token) && (await idAleatoire(d.token));
              } catch {}
            else if (Notification.permission === "default") {
              let d = !1;
              try {
                d = Date.now() - Number(localStorage.getItem(cN) || 0) < 3 * 864e5;
              } catch {}
              !u && !d && i(!0);
            }
          }
        })(),
        () => {
          u = !0;
        }
      );
    }, [e, n]),
    r
      ? React.default.createElement(
          "div",
          {
            className: "card",
            style: {
              margin: "12px 14px 0",
              border: "2px solid var(--apple)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            },
          },
          React.default.createElement("div", { style: { fontSize: 28 } }, "🔔"),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("div", { className: "nm" }, "Être prévenue sur ce téléphone"),
            React.default.createElement(
              "div",
              { className: "de" },
              "Commandes, réservations et messages des clients.",
            ),
          ),
          React.default.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 6 } },
            React.default.createElement(
              "button",
              {
                className: "btn sm",
                style: { width: "auto" },
                disabled: s,
                onClick: async () => {
                  o(!0);
                  try {
                    let u = await Yu(e);
                    u.token && (await idAleatoire(u.token));
                  } catch {}
                  o(!1), i(!1);
                },
              },
              "Activer",
            ),
            React.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { width: "auto" },
                onClick: () => {
                  try {
                    localStorage.setItem(cN, String(Date.now()));
                  } catch {}
                  i(!1);
                },
              },
              "Plus tard",
            ),
          ),
        )
      : null
  );
}

// Abonnement du téléphone de Marion aux alertes (commande, réservation, message).
function NotificationsAdmin({ d: t }) {
  let e = t.push?.vapid || "",
    n = Er(t.cmd).script,
    [r, i] = (0, React.useState)(Ew),
    [s, o] = (0, React.useState)("…"),
    [a, u] = (0, React.useState)(""),
    d = async (E) => {
      let A =
        r?.id ||
        [...crypto.getRandomValues(new Uint32Array(24))]
          .map((_) => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"[_ % 56])
          .join("");
      await setDoc(doc2(db, "appareilsAdmin", A), { token: E, appareil: typeAppareil(), maj: Date.now() });
      let S = { id: A, token: E };
      try {
        localStorage.setItem(Mf, JSON.stringify(S));
      } catch {}
      return i(S), S;
    };
  (0, React.useEffect)(() => {
    let E = !1;
    return (
      (async () => {
        if (!e || !ac(n)) return o("indispo");
        if (bN()) return o("ios");
        if (!(await lf())) return o("nonsup");
        if (Notification.permission === "denied") return o("refus");
        if (Notification.permission === "granted") {
          o("on");
          try {
            let A = await Yu(e);
            !E && A.token && (!r?.id || A.token !== r.token) && (await d(A.token));
          } catch {}
        } else o("off");
      })(),
      () => {
        E = !0;
      }
    );
  }, [e, n]);
  let h = async () => {
      o("…"), u("");
      try {
        let E = await Yu(e);
        if (E.erreur) return o(E.erreur === "refus" ? "refus" : "nonsup");
        await d(E.token), o("on");
      } catch {
        o("off"), ft("Activation impossible pour le moment. Réessayez plus tard.");
      }
    },
    p = async () => {
      if (await De("Ne plus recevoir les notifications sur ce téléphone ?", { oui: "Couper" })) {
        try {
          r?.id && (await deleteDoc(doc2(db, "appareilsAdmin", r.id)));
        } catch {}
        try {
          localStorage.removeItem(Mf);
        } catch {}
        i(null), o("off");
      }
    },
    m = async () => {
      try {
        await fetch(n + "?essaiMarion=1", { method: "GET", mode: "no-cors", redirect: "follow" });
      } catch {}
      u(
        "Notification d'essai envoyée : elle doit arriver dans quelques secondes (5 essais par jour au plus).",
      );
    },
    w = {
      "…": "Vérification…",
      indispo: "Les notifications ne sont pas encore réglées (réglage technique d'Eric).",
      ios: "Sur iPhone, ajoutez d'abord l'admin à l'écran d'accueil : bouton Partager ⬆\uFE0F → « Sur l'écran d'accueil ». Ouvrez-la ensuite depuis l'icône et revenez ici.",
      nonsup: "Ce navigateur ne peut pas recevoir de notifications.",
      refus:
        "Les notifications sont bloquées pour l'admin sur ce téléphone. Autorisez-les dans les réglages du téléphone (Notifications → Admin), puis revenez ici.",
      off: "Recevez une notification sur ce téléphone à chaque nouvelle commande, réservation ou message d'un client, même quand l'admin est fermée.",
      on: "✓ Activées sur ce téléphone : vous êtes prévenue des nouvelles commandes, réservations et messages.",
    }[s];
  return React.default.createElement(
    "div",
    { className: "card" },
    React.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 4 } },
      "🔔 Être prévenue sur ce téléphone",
    ),
    React.default.createElement("div", { className: "de", style: { marginBottom: 10 } }, w),
    s === "off" &&
      React.default.createElement("button", { className: "btn", onClick: h }, "Activer les notifications"),
    s === "on" &&
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
        React.default.createElement(
          "button",
          { className: "btn gh sm", style: { width: "auto" }, onClick: m },
          "Envoyer un essai",
        ),
        React.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { width: "auto", marginLeft: "auto", color: "var(--red)", borderColor: "#EBC9C2" },
            onClick: p,
          },
          "Couper",
        ),
      ),
    a && React.default.createElement("div", { className: "de", style: { marginTop: 8, fontWeight: 700 } }, a),
    React.default.createElement(
      "div",
      { className: "de", style: { marginTop: 8, fontSize: 12 } },
      "À activer sur chaque téléphone ou tablette où vous voulez être prévenue.",
    ),
  );
}
