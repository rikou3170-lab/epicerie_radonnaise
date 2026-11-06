/* ═══════════════════════════════════════════════════════════════════════
 *  PRÉVENIR LES CLIENTS — notifications sur les téléphones (diffusions).
 * ═══════════════════════════════════════════════════════════════════════ */

// Mois d'une date ; notifications possibles (clé et script configurés).
var pw = (t) => {
    let e = new Date(t);
    return e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0");
  },
  bw = (t) => !!t.push?.vapid && ac(Er(t.cmd).script);

// Liste des téléphones abonnés aux notifications (total, bons plans).
function gN(t) {
  let [e, n] = (0, React.useState)(null);
  return (
    (0, React.useEffect)(
      () =>
        t
          ? onSnapshot(
              collection(db, "appareils"),
              (r) => n(r.docs.map((i) => i.data())),
              () => n([]),
            )
          : void 0,
      [t],
    ),
    { total: e ? e.length : null, promo: (e || []).filter((r) => r.promo).length }
  );
}

// Rédiger et envoyer une notification à tous les téléphones abonnés.
function EnvoiNotification({ d: t, abonnes, titre0 = "", texte0 = "", onFini, onAnnuler }) {
  let [o, a] = (0, React.useState)(titre0.slice(0, 50)),
    [u, d] = (0, React.useState)(texte0.slice(0, 160)),
    [h, p] = (0, React.useState)(!1),
    m = async () => {
      let w = o.trim(),
        E = u.trim();
      if (
        !(!w || !E || h) &&
        (await De(
          "Envoyer cette notification à " +
            abonnes +
            ` téléphone(s) ?

« ` +
            w +
            ` »
` +
            E,
        ))
      ) {
        p(!0);
        try {
          let A = doc2(collection(db, "diffusions"));
          await setDoc(A, { titre: w.slice(0, 50), texte: E.slice(0, 160), cree: Date.now() }),
            await avertirMessage(t.cmd, "diff", A.id),
            onFini?.();
        } catch {
          ft("Envoi impossible. Vérifiez la connexion internet et réessayez.");
        }
        p(!1);
      }
    };
  return React.default.createElement(
    "div",
    { style: { marginTop: 10 } },
    React.default.createElement("label", { className: "lab" }, "Titre"),
    React.default.createElement("input", {
      className: "inp",
      value: o,
      maxLength: 50,
      placeholder: "Ex : Arrivage de potimarrons 🎃",
      onChange: (w) => a(w.target.value),
    }),
    React.default.createElement("label", { className: "lab" }, "Message"),
    React.default.createElement("textarea", {
      className: "inp",
      value: u,
      maxLength: 160,
      placeholder: "Ex : Tout frais du producteur, réservez-les dans l'appli !",
      onChange: (w) => d(w.target.value),
    }),
    React.default.createElement(
      "div",
      { className: "de", style: { margin: "4px 2px 8px" } },
      160 - u.length,
      " caractères restants. Envoyé seulement aux ",
      abonnes,
      " client(s) qui ont accepté les bons plans.",
      " ",
      "Évitez d'en envoyer trop souvent, sinon les clients les désactivent.",
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 8 } },
      React.default.createElement(
        "button",
        { className: "btn gh", style: { flex: 1 }, onClick: onAnnuler },
        "Annuler",
      ),
      React.default.createElement(
        "button",
        {
          className: "btn",
          style: { flex: 2 },
          disabled: !o.trim() || !u.trim() || h || !abonnes,
          onClick: m,
        },
        h ? "Envoi…" : "Envoyer la notification",
      ),
    ),
  );
}

// Texte de notification pour un produit anti-gaspi / panier / promo.
function texteGaspi(t, e) {
  let n = (o) => Number(String(o).replace(",", ".")).toFixed(2).replace(".", ",") + " €",
    r =
      (t.type === "gaspi"
        ? "⏳ Date courte : "
        : t.type === "panier"
          ? "🧺 Panier anti-gaspi : "
          : "🏷\uFE0F Promo : ") + t.titre,
    i =
      t.prix !== "" && t.prix != null
        ? n(t.prix) +
          (t.unite ? " / " + t.unite : "") +
          (t.ancienPrix ? " au lieu de " + n(t.ancienPrix) : "")
        : "",
    s = (parseInt(t.stock) || 0) > 0 ? "Réservation possible dans l'appli !" : "À découvrir à l'épicerie.";
  return { titre: r, texte: [i, t.note, s].filter(Boolean).join(" — ") };
}

// Carte « Prévenir mes clients » : envoi et historique des notifications.
function PrevenirClients({ d: t }) {
  let e = bw(t),
    n = gN(e),
    [r, i] = (0, React.useState)([]),
    [s, o] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(
      () =>
        e
          ? onSnapshot(
              collection(db, "diffusions"),
              (a) =>
                i(
                  a.docs
                    .map((u) => ({ ...u.data(), id: u.id }))
                    .sort((u, d) => (d.cree || 0) - (u.cree || 0))
                    .slice(0, 5),
                ),
              () => {},
            )
          : void 0,
      [e],
    ),
    e
      ? React.default.createElement(
          "div",
          { className: "card" },
          React.default.createElement(
            "div",
            { className: "row" },
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, "📣 Prévenir mes clients"),
              React.default.createElement(
                "div",
                { className: "de" },
                n.total === null
                  ? "…"
                  : n.total +
                      " téléphone(s) reçoivent les notifications · " +
                      n.promo +
                      " pour les bons plans",
              ),
            ),
            !s &&
              React.default.createElement(
                "button",
                { className: "btn sm", style: { width: "auto" }, disabled: !n.promo, onClick: () => o(!0) },
                "Écrire",
              ),
          ),
          s &&
            React.default.createElement(EnvoiNotification, {
              d: t,
              abonnes: n.promo,
              onFini: () => o(!1),
              onAnnuler: () => o(!1),
            }),
          !!r.length &&
            React.default.createElement(
              "div",
              { style: { marginTop: 10 } },
              r.slice(0, 3).map((a) =>
                React.default.createElement(
                  "div",
                  {
                    key: a.id,
                    className: "de",
                    style: { padding: "4px 0", borderTop: "1px solid var(--line)" },
                  },
                  React.default.createElement("b", null, a.titre),
                  " · ",
                  new Date(a.cree).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
                  " — ",
                  a.envoye == null ? "en cours d'envoi…" : "reçue par " + a.envoye + " téléphone(s)",
                ),
              ),
            ),
        )
      : null
  );
}
