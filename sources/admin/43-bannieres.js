/* ═══════════════════════════════════════════════════════════════════════
 *  BANNIÈRES PUBLICITAIRES.
 * ═══════════════════════════════════════════════════════════════════════ */

// Actions possibles au toucher d'une bannière.
var ACTIONS = [
  { id: "aucune", label: "Aucune" },
  { id: "carte", label: "Voir la carte" },
  { id: "appeler", label: "Appeler l'épicerie" },
];

// Bannières publicitaires de l'accueil.
function Pubs({ d: t, set }) {
  let [n, setM] = (0, React.useState)(null),
    i = t.pubs || [],
    s = () => {
      if (!n.photo) return ft("Ajoutez une image : c'est l'essentiel d'une bannière.");
      set("pubs", (u) =>
        n.id ? u.map((d) => (d.id === n.id ? n : d)) : [...u, { ...n, id: Wr(), ordre: u.length }],
      ),
        setM(null);
    },
    o = (u, d) => {
      let h = u + d;
      if (h < 0 || h >= i.length) return;
      let p = [...i];
      ([p[u], p[h]] = [p[h], p[u]]),
        set("pubs", (m) => m.map((w) => ({ ...w, ordre: p.findIndex((E) => E.id === w.id) })));
    },
    a = i.filter((u) => statut(u)[0] === "on").length;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Bannières"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Les grandes images en haut de l'application : plateaux de fêtes, nouveautés, événements. Elles défilent toutes seules. Format conseillé : photo horizontale.",
    ),
    React.default.createElement(
      "button",
      {
        className: "btn terra",
        onClick: () => setM({ photo: "", titre: "", texte: "", action: "carte", fin: "", active: !0 }),
      },
      I10.plus(),
      "Nouvelle bannière",
    ),
    React.default.createElement(
      "div",
      { style: { fontSize: 12, color: "var(--ink3)", margin: "10px 0 12px" } },
      a,
      " bannière",
      a > 1 ? "s" : "",
      " visible",
      a > 1 ? "s" : "",
      " par les clients",
    ),
    !i.length &&
      React.default.createElement(Vn, {
        t: "Aucune bannière",
        s: "Une belle photo de plateau et deux mots suffisent : « Plateaux de Noël — commandez avant le 20 ».",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      i.map((u, d) =>
        React.default.createElement(
          "div",
          { className: "card", key: u.id, style: { padding: 0, overflow: "hidden" } },
          React.default.createElement(
            "div",
            { style: { position: "relative" } },
            u.photo
              ? React.default.createElement("img", {
                  src: u.photo,
                  alt: "",
                  style: { width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" },
                })
              : React.default.createElement("div", {
                  style: { aspectRatio: "16/9", background: "var(--apple-soft)" },
                }),
            React.default.createElement(Pastille, {
              x: u,
              fem: !0,
              style: { position: "absolute", top: 9, left: 9 },
            }),
          ),
          React.default.createElement(
            "div",
            { className: "row", style: { padding: "11px 13px" } },
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, u.titre || "Sans titre"),
              React.default.createElement(
                "div",
                { className: "de" },
                "Action : ",
                ACTIONS.find((h) => h.id === u.action)?.label || "Aucune",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  title: "Monter",
                  disabled: d === 0,
                  onClick: () => o(d, -1),
                  style: { fontSize: 16, color: "#5C6A62", opacity: d === 0 ? 0.3 : 1 },
                },
                "↑",
              ),
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  title: "Descendre",
                  disabled: d === i.length - 1,
                  onClick: () => o(d, 1),
                  style: { fontSize: 16, color: "#5C6A62", opacity: d === i.length - 1 ? 0.3 : 1 },
                },
                "↓",
              ),
              React.default.createElement(ze, {
                on: u.active !== !1,
                set: () =>
                  set("pubs", (h) => h.map((p) => (p.id === u.id ? { ...p, active: p.active === !1 } : p))),
              }),
              React.default.createElement("button", { className: "ib", onClick: () => setM(u) }, I10.pen()),
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer cette bannière ?")) &&
                    set("pubs", (h) => h.filter((p) => p.id !== u.id)),
                },
                I10.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    n &&
      React.default.createElement(
        ut,
        { titre: n.id ? "Modifier la bannière" : "Nouvelle bannière", onClose: () => setM(null) },
        React.default.createElement(PhotoField, {
          value: n.photo,
          max: 1400,
          onChange: (u) => setM((d) => ({ ...d, photo: u })),
        }),
        React.default.createElement("label", { className: "lab" }, "Titre (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: n.titre,
          onChange: (u) => setM({ ...n, titre: u.target.value }),
          placeholder: "Plateaux de Noël",
        }),
        React.default.createElement("label", { className: "lab" }, "Petit texte (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: n.texte,
          onChange: (u) => setM({ ...n, texte: u.target.value }),
          placeholder: "Commandez avant le 20 décembre",
        }),
        React.default.createElement("label", { className: "lab" }, "Quand le client touche la bannière"),
        React.default.createElement(
          "div",
          { className: "seg", style: { marginBottom: 0 } },
          ACTIONS.map((u) =>
            React.default.createElement(
              "button",
              {
                key: u.id,
                className: n.action === u.id ? "on" : "",
                onClick: () => setM({ ...n, action: u.id }),
              },
              u.label,
            ),
          ),
        ),
        React.default.createElement(Periode, { v: n, onChange: setM }),
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
              on: n.active !== !1,
              set: () => setM({ ...n, active: n.active === !1 }),
            }),
          ),
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 12 }, onClick: s },
          "Enregistrer",
        ),
      ),
  );
}
