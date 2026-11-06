/* ═══════════════════════════════════════════════════════════════════════
 *  HORAIRES ET ALERTES — « Ouvert / Fermé » en direct, conseil d'installation avant commande, bandeau des notifications.
 * ═══════════════════════════════════════════════════════════════════════ */

// Texte « Ouvert jusqu'à 19h » / « Ouvre aujourd'hui à 8h30 »…
function texteOuverture(t, e, n = new Date()) {
  let r = n.getHours() * 60 + n.getMinutes(),
    i = W2(t, n);
  if (!!!E2(e, Wt(n))) {
    let s = i.find(([u, d]) => r >= u && r < d);
    if (s) {
      let u = s[1] - r;
      return {
        ouvert: !0,
        bientot: u <= 30,
        texte: u <= 30 ? "Ferme dans " + u + " min" : "Ouvert jusqu'à " + G2(s[1]),
      };
    }
    let l = i.find(([u]) => u > r);
    if (l) return { ouvert: !1, texte: "Ouvre aujourd'hui à " + G2(l[0]) };
  }
  for (let s = 1; s <= 14; s++) {
    let l = new Date(n);
    if ((l.setDate(l.getDate() + s), E2(e, Wt(l)))) continue;
    let u = W2(t, l);
    if (!u.length) continue;
    return {
      ouvert: !1,
      texte:
        "Ouvre " +
        (s === 1
          ? "demain"
          : l.toLocaleDateString("fr-FR", { weekday: "long" }) + (s > 6 ? " " + l.getDate() : "")) +
        " à " +
        G2(u[0][0]),
    };
  }
  return i.length || W2(t, new Date(n.getTime() + 864e5)).length ? { ouvert: !1, texte: "Fermé" } : null;
}

// Heure actuelle, rafraîchie chaque minute.
function wO() {
  let [t, e] = (0, React.useState)(() => Date.now());
  return (
    (0, React.useEffect)(() => {
      let n = setInterval(() => e(Date.now()), 6e4);
      return () => clearInterval(n);
    }, []),
    t
  );
}

// Badge « Ouvert / Ferme bientôt / Fermé ».
function BadgeOuverture({ e }) {
  return e
    ? React.default.createElement(
        "div",
        { className: "ouverture " + (e.ouvert ? (e.bientot ? "bientot" : "on") : "off"), role: "status" },
        React.default.createElement("span", { className: "pt" }),
        React.default.createElement("b", null, e.ouvert ? (e.bientot ? "Ferme bientôt" : "Ouvert") : "Fermé"),
        React.default.createElement(
          "span",
          null,
          "· ",
          e.ouvert && e.bientot ? e.texte.replace("Ferme ", "") : e.texte,
        ),
      )
    : null;
}

// Sur iPhone : conseille d'installer l'appli avant de commander (sinon la commande resterait dans Safari).
function ConseilInstallCommande({ inst, quoi = "votre commande" }) {
  let [n, r] = (0, React.useState)(!1);
  return !inst?.p?.ios || !inst.possible || n
    ? null
    : React.default.createElement(
        "div",
        { className: "ios-avant" },
        React.default.createElement("b", null, "📱 Sur iPhone : installez d'abord l'application"),
        React.default.createElement(
          "p",
          null,
          "Si vous l'installez après, ",
          quoi,
          " n'apparaîtra pas dans l'appli installée (l'iPhone sépare Safari et les applis).",
        ),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 8 } },
          React.default.createElement(
            "button",
            { className: "btn sm", onClick: inst.lancer },
            "Installer maintenant",
          ),
          React.default.createElement(
            "button",
            { className: "btn gh sm", onClick: () => r(!0) },
            "Continuer ici",
          ),
        ),
      );
}

// Mémoire : bandeau des notifications masqué.
var nT = "epicerie-raddonnaise-carte-notif";

// Bandeau qui propose d'activer les notifications.
function BandeauNotifications({ n: t, inst }) {
  let [n, r] = (0, React.useState)(() => {
      try {
        return Date.now() - Number(localStorage.getItem(nT) || 0) < 2592e6;
      } catch {
        return !1;
      }
    }),
    [i, o] = (0, React.useState)(!0);
  return !t?.dispo || n || !["off", "ios"].includes(t.etat)
    ? null
    : React.default.createElement(
        "div",
        { className: "carte-notif" },
        React.default.createElement(
          "button",
          {
            className: "ix",
            "aria-label": "Fermer",
            onClick: () => {
              r(!0);
              try {
                localStorage.setItem(nT, String(Date.now()));
              } catch {}
            },
          },
          "×",
        ),
        React.default.createElement("b", null, "🔔 Ne ratez plus nos bons plans"),
        React.default.createElement(
          "p",
          null,
          "Arrivages, promos, commande prête… on vous prévient sur votre téléphone.",
        ),
        t.etat === "ios"
          ? React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "p",
                { style: { fontWeight: 700 } },
                "Sur iPhone, installez d'abord l'application, puis activez les notifications.",
              ),
              React.default.createElement(
                "button",
                { className: "btn sm", onClick: inst.lancer },
                "Installer l'application",
              ),
            )
          : React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "label",
                { className: "accord", style: { margin: "4px 0 8px" } },
                React.default.createElement("input", {
                  type: "checkbox",
                  checked: i,
                  onChange: (l) => o(l.target.checked),
                }),
                React.default.createElement("span", null, "Recevoir aussi les bons plans"),
              ),
              React.default.createElement(
                "button",
                { className: "btn sm", onClick: () => t.activer(i) },
                "Activer les notifications",
              ),
            ),
      );
}
