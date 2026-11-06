/* ═══════════════════════════════════════════════════════════════════════
 *  OFFRES — paniers, plateaux et autres offres.
 * ═══════════════════════════════════════════════════════════════════════ */

// Offres : paniers, plateaux et autres offres.
function Offres({ d, set }) {
  let [m, setM] = (0, React.useState)(null),
    i = () => {
      m.titre?.trim() &&
        (set("offres", (s) => (m.id ? s.map((o) => (o.id === m.id ? m : o)) : [...s, { ...m, id: Wr() }])),
        setM(null));
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Paniers & plateaux"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Vos plateaux, paniers garnis et corbeilles de fruits, avec photo et prix. Regroupez-les par type.",
    ),
    React.default.createElement(
      "button",
      {
        className: "btn terra",
        onClick: () =>
          setM({
            titre: "",
            desc: "",
            prix: "",
            portions: "",
            type: "Plateaux",
            badge: "",
            photo: "",
            active: !0,
          }),
      },
      I10.plus(),
      "Nouvelle offre",
    ),
    React.default.createElement("div", { style: { height: 12 } }),
    !d.offres.length &&
      React.default.createElement(Vn, {
        t: "Aucune offre",
        s: "Ajoutez par exemple « Plateau apéritif 4-6 personnes » avec sa photo : c'est ce que vos clients regardent en premier.",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      d.offres.map((s) =>
        React.default.createElement(
          "div",
          { className: "card", key: s.id },
          React.default.createElement(
            "div",
            { className: "row" },
            s.photo
              ? React.default.createElement("img", { className: "thumb", src: s.photo, alt: "" })
              : React.default.createElement("div", { className: "thumb" }),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, s.titre),
              React.default.createElement(
                "div",
                { className: "de" },
                s.type,
                s.portions ? " · " + s.portions : "",
              ),
              React.default.createElement(
                "div",
                { style: { marginTop: 5 } },
                React.default.createElement(Pastille, { x: s, fem: !0 }),
                React.default.createElement(
                  "span",
                  { style: { fontSize: 13, fontWeight: 800, color: "var(--apple)", marginLeft: 6 } },
                  s.prix ? Number(s.prix).toFixed(2) + " €" : "Sur devis",
                ),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement("button", { className: "ib", onClick: () => setM(s) }, I10.pen()),
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer « " + s.titre + " » ?")) &&
                    set("offres", (o) => o.filter((a) => a.id !== s.id)),
                },
                I10.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    m &&
      React.default.createElement(
        ut,
        { titre: m.id ? "Modifier l'offre" : "Nouvelle offre", onClose: () => setM(null) },
        React.default.createElement(PhotoField, {
          value: m.photo,
          onChange: (s) => setM((o) => ({ ...o, photo: s })),
        }),
        React.default.createElement("label", { className: "lab" }, "Titre"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: m.titre,
          onChange: (s) => setM({ ...m, titre: s.target.value }),
          placeholder: "Plateau charcuterie & fromages",
        }),
        React.default.createElement("label", { className: "lab" }, "Composition"),
        React.default.createElement("textarea", {
          className: "inp",
          value: m.desc,
          onChange: (s) => setM({ ...m, desc: s.target.value }),
          placeholder: "Comté, morbier, saucisson, jambon sec, raisins…",
        }),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1 } },
            React.default.createElement("label", { className: "lab" }, "Prix (€)"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "decimal",
              step: "0.01",
              value: m.prix,
              onChange: (s) => setM({ ...m, prix: s.target.value }),
              placeholder: "Laisser vide = sur devis",
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1 } },
            React.default.createElement("label", { className: "lab" }, "Pour"),
            React.default.createElement("input", {
              className: "inp",
              value: m.portions,
              onChange: (s) => setM({ ...m, portions: s.target.value }),
              placeholder: "4-6 pers.",
            }),
          ),
        ),
        React.default.createElement("label", { className: "lab" }, "Type (sert de titre de section)"),
        React.default.createElement("input", {
          className: "inp",
          value: m.type,
          onChange: (s) => setM({ ...m, type: s.target.value }),
          placeholder: "Plateaux / Paniers garnis / Corbeilles",
        }),
        React.default.createElement("label", { className: "lab" }, "Pastille (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: m.badge,
          onChange: (s) => setM({ ...m, badge: s.target.value }),
          placeholder: "Nouveau, Fêtes…",
        }),
        React.default.createElement(Periode, { v: m, onChange: setM }),
        React.default.createElement(
          "div",
          { className: "tog", style: { marginTop: 6 } },
          React.default.createElement(
            "span",
            { style: { fontSize: 13, fontWeight: 700 } },
            "Visible par les clients",
          ),
          React.default.createElement(
            "div",
            { className: "rt" },
            React.default.createElement(ze, {
              on: m.active !== !1,
              set: () => setM({ ...m, active: m.active === !1 }),
            }),
          ),
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 12 }, onClick: i },
          "Enregistrer",
        ),
      ),
  );
}
