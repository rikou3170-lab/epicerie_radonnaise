/* ═══════════════════════════════════════════════════════════════════════
 *  ACTUS.
 * ═══════════════════════════════════════════════════════════════════════ */

// Onglet Actus.
function Actus({ d, set }) {
  let [m, setM] = (0, React.useState)(null),
    i = () => {
      m.titre?.trim() &&
        (set("actus", (s) => (m.id ? s.map((o) => (o.id === m.id ? m : o)) : [{ ...m, id: Wr() }, ...s])),
        setM(null));
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Actualités"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Vos publications : créations maison, arrivages, menu du jour, fermeture exceptionnelle…",
    ),
    React.default.createElement(
      "button",
      {
        className: "btn dark",
        onClick: () =>
          setM({ titre: "", texte: "", photo: "", date: new Date().toLocaleDateString("fr-FR"), active: !0 }),
      },
      I10.plus(),
      "Nouvelle publication",
    ),
    React.default.createElement("div", { style: { height: 12 } }),
    !d.actus.length &&
      React.default.createElement(Vn, {
        t: "Aucune publication",
        s: "Une photo et deux lignes suffisent : vos clients voient la nouveauté dès l'ouverture de l'application.",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      d.actus.map((s) =>
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
              React.default.createElement("div", { className: "de" }, s.date),
              React.default.createElement(Pastille, { x: s, fem: !0, style: { marginTop: 5 } }),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: s.active !== !1,
                set: () =>
                  set("actus", (o) => o.map((a) => (a.id === s.id ? { ...a, active: a.active === !1 } : a))),
              }),
              React.default.createElement("button", { className: "ib", onClick: () => setM(s) }, I10.pen()),
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer cette publication ?")) &&
                    set("actus", (o) => o.filter((a) => a.id !== s.id)),
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
        { titre: m.id ? "Modifier" : "Nouvelle publication", onClose: () => setM(null) },
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
          placeholder: "Nos tartes maison sont arrivées",
        }),
        React.default.createElement("label", { className: "lab" }, "Texte"),
        React.default.createElement("textarea", {
          className: "inp",
          value: m.texte,
          onChange: (s) => setM({ ...m, texte: s.target.value }),
        }),
        React.default.createElement("label", { className: "lab" }, "Date affichée"),
        React.default.createElement("input", {
          className: "inp",
          value: m.date,
          onChange: (s) => setM({ ...m, date: s.target.value }),
        }),
        React.default.createElement(Periode, { v: m, onChange: setM }),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: i },
          "Publier",
        ),
      ),
  );
}
