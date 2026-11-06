/* ═══════════════════════════════════════════════════════════════════════
 *  RÉGLAGES BOUTIQUE.
 * ═══════════════════════════════════════════════════════════════════════ */

// Réglages boutique (coordonnées, horaires, services, onglets).
function Reglages({ d: t, set, reinitialiser }) {
  let [r, i] = (0, React.useState)(null),
    s = t.store,
    o = (h, p) => set("store", (m) => ({ ...m, [h]: p })),
    [a, u] = (0, React.useState)(null),
    d = async () => {
      u("prep");
      try {
        let h = [];
        for (let w of t.clients || []) {
          let E = await getDocs(collection(db, "clients", String(w.id), "historique")),
            A = [];
          E.forEach((S) => A.push({ id: S.id, ...S.data() })), h.push({ ...w, historique: A });
        }
        let p = { ...t, clients: h, sauvegardeLe: new Date().toISOString(), version: VERSION },
          m = URL.createObjectURL(new Blob([JSON.stringify(p, null, 2)], { type: "application/json" }));
        u({
          url: m,
          nom: "epicerie-raddonnaise-sauvegarde-" + new Date().toLocaleDateString("sv-SE") + ".json",
          n: h.length,
        });
      } catch {
        u({ erreur: !0 });
      }
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "L'épicerie"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Coordonnées, horaires et services affichés dans l'onglet Infos (les services n'apparaissent plus sur l'accueil).",
    ),
    React.default.createElement(NotificationsAdmin, { d: t }),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement("label", { className: "lab" }, "Nom"),
      React.default.createElement("input", {
        className: "inp",
        value: s.name,
        onChange: (h) => o("name", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "Slogan"),
      React.default.createElement("input", {
        className: "inp",
        value: s.slogan,
        onChange: (h) => o("slogan", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "Adresse"),
      React.default.createElement("input", {
        className: "inp",
        value: s.address,
        onChange: (h) => o("address", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "Téléphone"),
      React.default.createElement("input", {
        className: "inp",
        type: "tel",
        value: s.phone,
        onChange: (h) => o("phone", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "E-mail"),
      React.default.createElement("input", {
        className: "inp",
        type: "email",
        value: s.email,
        onChange: (h) => o("email", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "Page Facebook"),
      React.default.createElement("input", {
        className: "inp",
        value: s.facebook,
        placeholder: "https://facebook.com/…",
        onChange: (h) => o("facebook", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "Lien pour laisser un avis Google"),
      React.default.createElement("input", {
        className: "inp",
        value: s.avis || "",
        placeholder: "https://g.page/r/…/review",
        autoCapitalize: "off",
        onChange: (h) => o("avis", h.target.value.trim()),
      }),
      React.default.createElement(
        "div",
        { className: "de", style: { marginTop: 4 } },
        "Dans Google (fiche de l'épicerie) → « Demander des avis » → copier le lien. Les clients le voient dans Infos, et une fois après une commande retirée.",
      ),
    ),
    React.default.createElement(Fermetures, { d: t, set }),
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 8px" } },
      "Onglets visibles par les clients",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      [
        ["carte", "La carte (plateaux & paniers)"],
        ["fidelite", "Carte de fidélité"],
      ].map(([h, p]) =>
        React.default.createElement(
          "div",
          { className: "tog", key: h },
          React.default.createElement("span", { style: { fontSize: 13, fontWeight: 700 } }, p),
          React.default.createElement(
            "div",
            { className: "rt" },
            React.default.createElement(ze, {
              on: t.onglets?.[h] !== !1,
              set: () => set("onglets", (m) => ({ ...m, [h]: m?.[h] === !1 })),
            }),
          ),
        ),
      ),
    ),
    React.default.createElement(InfosLegales, { d: t, set }),
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "16px 0 8px" } },
      "Horaires",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      t.hours.map((h, p) =>
        React.default.createElement(
          "div",
          {
            key: p,
            className: "hor-ligne",
            style: { borderBottom: p < 6 ? "1px solid var(--line)" : "none" },
          },
          React.default.createElement("span", { style: { fontSize: 12.5, fontWeight: 700 } }, h.day),
          React.default.createElement("input", {
            className: "inp",
            style: { padding: "8px 6px", fontSize: 12.5 },
            value: h.am,
            placeholder: "Fermé",
            "aria-label": h.day + " matin",
            onChange: (m) =>
              set("hours", (w) => w.map((E, A) => (A === p ? { ...E, am: m.target.value } : E))),
          }),
          React.default.createElement("input", {
            className: "inp",
            style: { padding: "8px 6px", fontSize: 12.5 },
            value: h.pm,
            placeholder: "—",
            "aria-label": h.day + " après-midi",
            onChange: (m) =>
              set("hours", (w) => w.map((E, A) => (A === p ? { ...E, pm: m.target.value } : E))),
          }),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "hd", style: { marginTop: 18 } },
      React.default.createElement("div", { style: { fontWeight: 800, fontSize: 14 } }, "Services"),
      React.default.createElement(
        "button",
        { className: "btn gh sm", onClick: () => i({ label: "", desc: "", active: !0 }) },
        "Ajouter",
      ),
    ),
    !t.services.length &&
      React.default.createElement(Vn, {
        t: "Aucun service",
        s: "Ex : Dépôt de pain, Relais Pickup, Station-service, Plats à emporter, Droguerie.",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      t.services.map((h) =>
        React.default.createElement(
          "div",
          { className: "card", key: h.id },
          React.default.createElement(
            "div",
            { className: "row" },
            React.default.createElement(
              "div",
              null,
              React.default.createElement("div", { className: "nm" }, h.label),
              h.desc && React.default.createElement("div", { className: "de" }, h.desc),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: h.active !== !1,
                set: () =>
                  set("services", (p) =>
                    p.map((m) => (m.id === h.id ? { ...m, active: m.active === !1 } : m)),
                  ),
              }),
              React.default.createElement("button", { className: "ib", onClick: () => i(h) }, I10.pen()),
              React.default.createElement(
                "button",
                { className: "ib", onClick: () => set("services", (p) => p.filter((m) => m.id !== h.id)) },
                I10.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 8px" } },
      "Application",
    ),
    React.default.createElement(BoutonMaj, null),
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 8px" } },
      "Sauvegarde",
    ),
    React.default.createElement(
      "div",
      {
        style: {
          fontSize: 11.5,
          color: "#9A5A28",
          background: "#FDF6EE",
          border: "1px solid #EFDCC6",
          borderRadius: 10,
          padding: "9px 12px",
          lineHeight: 1.45,
          marginBottom: 8,
        },
      },
      "La sauvegarde contient les noms et téléphones des clients : conservez-la en lieu sûr, ne l'envoyez pas par e-mail.",
    ),
    !a || a.erreur
      ? React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            "button",
            { className: "btn gh", onClick: d },
            "Préparer une sauvegarde",
          ),
          a?.erreur &&
            React.default.createElement(
              "div",
              { className: "de", style: { color: "#B3261E", marginTop: 6 } },
              "La sauvegarde n'a pas pu être préparée (réseau ?). Réessayez.",
            ),
        )
      : a === "prep"
        ? React.default.createElement(
            "button",
            { className: "btn gh", disabled: !0 },
            "Préparation de la sauvegarde…",
          )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "a",
              {
                className: "btn",
                href: a.url,
                download: a.nom,
                style: { textDecoration: "none", textAlign: "center", display: "block" },
              },
              "Télécharger la sauvegarde",
            ),
            React.default.createElement(
              "div",
              { className: "de", style: { marginTop: 6 } },
              a.n,
              " carte",
              a.n > 1 ? "s" : "",
              " avec leur historique de tampons, commandes, réglages et contenus.",
            ),
          ),
    React.default.createElement(
      "button",
      {
        className: "btn gh",
        style: { marginTop: 8, color: "var(--red)" },
        onClick: async () =>
          (await De(`Effacer tout le contenu affiché aux clients (articles du jour, offres, actualités, plateaux, pubs, coordonnées et horaires) ?

Les cartes de fidélité, les commandes, les messages et les réglages techniques sont conservés.`)) &&
          reinitialiser(),
      },
      "Réinitialiser le contenu",
    ),
    r &&
      React.default.createElement(
        ut,
        { titre: r.id ? "Modifier le service" : "Nouveau service", onClose: () => i(null) },
        React.default.createElement("label", { className: "lab" }, "Nom"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: r.label,
          onChange: (h) => i({ ...r, label: h.target.value }),
          placeholder: "Relais Pickup",
        }),
        React.default.createElement("label", { className: "lab" }, "Précision (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: r.desc,
          onChange: (h) => i({ ...r, desc: h.target.value }),
          placeholder: "Retrait et dépôt de colis",
        }),
        React.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 14 },
            onClick: () => {
              r.label.trim() &&
                (set("services", (h) =>
                  r.id ? h.map((p) => (p.id === r.id ? r : p)) : [...h, { ...r, id: Wr() }],
                ),
                i(null));
            },
          },
          "Enregistrer",
        ),
      ),
  );
}
