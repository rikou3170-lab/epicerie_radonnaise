/* ═══════════════════════════════════════════════════════════════════════
 *  ROUE DE NOËL — réglages, tirages et gagnants.
 * ═══════════════════════════════════════════════════════════════════════ */

// Réglages de la roue de Noël, participants, tirages et gagnants.
function RoueAdmin({ d: t, set }) {
  let n = oc(t.roue),
    r = (E) => set("roue", (A) => ({ ...oc(A), ...E })),
    i = (E, A) => r({ tirages: n.tirages.map((S) => (S.id === E ? { ...S, ...A } : S)) }),
    s = VS(t.clients, n).sort((E, A) => A.tickets - E.tickets),
    o = s.reduce((E, A) => E + A.tickets, 0),
    [a, u] = (0, React.useState)(null),
    [d, h] = (0, React.useState)(null),
    p = BS(n),
    m = [
      { id: "a", prenom: "Jean", tickets: 3 },
      { id: "b", prenom: "Sophie", tickets: 5 },
      { id: "c", prenom: "Michel", tickets: 2 },
      { id: "d", prenom: "Claire", tickets: 4 },
      { id: "e", prenom: "Paul", tickets: 1 },
    ],
    w = s.length >= 2 ? s : m;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("style", null, WS),
    React.default.createElement("div", { className: "t1" }, "Roue de Noël"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Chaque tampon en caisse offre un tour de roue au client (une chance sur deux). Chaque « Gagné » = 1 ticket pour le prochain tirage au sort. Le tirage se lance depuis la caisse, sur l'iPad.",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "tog" },
        React.default.createElement(
          "span",
          { style: { fontSize: 13, fontWeight: 700 } },
          "Roue active",
          React.default.createElement(
            "span",
            { className: "de", style: { display: "block", fontWeight: 400 } },
            p
              ? "✓ La roue tourne en ce moment à chaque tampon."
              : n.active
                ? "Active, mais en dehors des dates choisies."
                : "Désactivée : aucun tour de roue en caisse.",
          ),
        ),
        React.default.createElement(
          "div",
          { className: "rt" },
          React.default.createElement(ze, { on: n.active, set: () => r({ active: !n.active }) }),
        ),
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 10 } },
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("label", { className: "lab" }, "Du"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            style: { width: "100%", minWidth: 0, boxSizing: "border-box" },
            value: n.debut || "",
            onChange: (E) => r({ debut: E.target.value }),
          }),
        ),
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("label", { className: "lab" }, "Au (inclus)"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            style: { width: "100%", minWidth: 0, boxSizing: "border-box" },
            value: n.fin || "",
            onChange: (E) => r({ fin: E.target.value }),
          }),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement("div", { className: "nm", style: { marginBottom: 6 } }, "🎡 Voir la démo"),
      React.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 10 } },
        "Ce que voit le client dans son appli, et l'animation du tirage sur l'iPad. Rien n'est enregistré.",
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
        React.default.createElement(
          "button",
          { className: "btn sm", style: { width: "auto" }, onClick: () => u("g") },
          "Roue : tour gagné",
        ),
        React.default.createElement(
          "button",
          { className: "btn gh sm", style: { width: "auto" }, onClick: () => u("p") },
          "Roue : tour perdu",
        ),
        React.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { width: "auto" },
            onClick: () => {
              h(w[Math.floor(Math.random() * w.length)]), u("tirage");
            },
          },
          "Animation du tirage",
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 6 } },
        "🎁 Tirages au sort",
      ),
      React.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 8 } },
        "Les dates sont des repères : le tirage se fait quand vous appuyez sur « Lancer le tirage » dans la caisse. Après chaque tirage, les tickets repartent à zéro.",
      ),
      n.tirages.map((E) =>
        React.default.createElement(
          "div",
          { key: E.id, className: "tir-adm" },
          React.default.createElement("input", {
            className: "inp",
            value: E.titre || "",
            maxLength: 60,
            disabled: E.fait,
            onChange: (A) => i(E.id, { titre: A.target.value }),
          }),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            value: E.date || "",
            disabled: E.fait,
            onChange: (A) => i(E.id, { date: A.target.value }),
            style: { maxWidth: 160 },
          }),
          E.fait
            ? React.default.createElement(
                "span",
                { className: "de" },
                "✓ Gagnant : ",
                React.default.createElement("b", null, E.gagnant),
              )
            : React.default.createElement(
                "button",
                {
                  className: "btn gh sm",
                  style: { width: "auto" },
                  onClick: async () =>
                    (await De("Retirer ce tirage ?", { oui: "Retirer" })) &&
                    r({ tirages: n.tirages.filter((A) => A.id !== E.id) }),
                },
                "Retirer",
              ),
        ),
      ),
      React.default.createElement(
        "button",
        {
          className: "btn gh sm",
          style: { width: "auto", marginTop: 6 },
          onClick: () =>
            r({ tirages: [...n.tirages, { id: "t" + Date.now(), date: "", titre: "Tirage au sort" }] }),
        },
        "+ Ajouter un tirage",
      ),
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 6 } },
        "🎟\uFE0F Tickets en jeu pour le prochain tirage : ",
        o,
      ),
      s.length
        ? s.map((E) =>
            React.default.createElement(
              "div",
              {
                key: E.id,
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "7px 0",
                  borderBottom: "1px solid var(--line)",
                  fontSize: 14,
                },
              },
              React.default.createElement("span", null, E.nom || E.prenom),
              React.default.createElement("b", null, E.tickets, " ticket", E.tickets > 1 ? "s" : ""),
            ),
          )
        : React.default.createElement("div", { className: "de" }, "Aucun ticket pour l'instant."),
      n.annonce?.prenom &&
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 10 } },
          "Dernier gagnant annoncé dans l'appli : ",
          React.default.createElement("b", null, n.annonce.prenom),
          " (",
          new Date(n.annonce.date).toLocaleDateString("fr-FR"),
          ")",
        ),
    ),
    a === "g" || a === "p"
      ? React.default.createElement(RoueNoel, {
          key: a,
          demo: !0,
          premiere: !1,
          tours: [{ g: a === "g", t: 0 }],
          tickets: null,
          onFini: () => u(null),
        })
      : a === "tirage"
        ? React.default.createElement(
            "div",
            { className: "roue-fond", onClick: () => {} },
            React.default.createElement(
              "div",
              { className: "roue-in", style: { maxWidth: 560 } },
              React.default.createElement("h2", null, "Tirage au sort"),
              d && React.default.createElement(TirageAuSort, { participants: w, gagnant: d }),
              React.default.createElement(
                "button",
                { className: "roue-b2", style: { marginTop: 10 }, onClick: () => u(null) },
                "Fermer la démo",
              ),
            ),
          )
        : null,
  );
}
