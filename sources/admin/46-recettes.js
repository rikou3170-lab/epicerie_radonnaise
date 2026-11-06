/* ═══════════════════════════════════════════════════════════════════════
 *  RECETTE DE LA SEMAINE.
 * ═══════════════════════════════════════════════════════════════════════ */

// Recette de la semaine.
function Recettes({ d: t, set }) {
  let [n, r] = (0, React.useState)(null),
    i = t.recettes || [],
    s = () => {
      if (!n.titre?.trim()) return;
      let o = {
        ...n,
        titre: n.titre.trim().slice(0, 80),
        duree: (n.duree || "").trim().slice(0, 40),
        personnes: Math.max(0, Math.min(50, parseInt(n.personnes) || 0)),
        intro: (n.intro || "").trim().slice(0, 400),
        ingredients: (n.ingredients || "").trim().slice(0, 1500),
        etapes: (n.etapes || "").trim().slice(0, 3e3),
      };
      set("recettes", (a) =>
        n.id
          ? a.map((u) => (u.id === n.id ? o : u))
          : [{ ...o, id: Wr(), cree: Date.now(), active: !0 }, ...a],
      ),
        r(null);
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "La recette de la semaine"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "La recette la plus récente s'affiche sur l'accueil de l'appli, les précédentes juste en dessous. Écrivez un ingrédient ou une étape par ligne.",
    ),
    React.default.createElement(
      "button",
      {
        className: "btn dark",
        onClick: () =>
          r({ titre: "", duree: "", personnes: 4, intro: "", ingredients: "", etapes: "", photo: "" }),
      },
      I10.plus(),
      "Nouvelle recette",
    ),
    React.default.createElement("div", { style: { height: 12 } }),
    !i.length &&
      React.default.createElement(Vn, {
        t: "Aucune recette",
        s: "Exemple : la tarte aux myrtilles, la cancoillotte chaude, la potée…",
      }),
    i.map((o, a) =>
      React.default.createElement(
        "div",
        { className: "card", key: o.id, style: { opacity: o.active === !1 ? 0.55 : 1 } },
        React.default.createElement(
          "div",
          { className: "row" },
          o.photo
            ? React.default.createElement("img", { className: "thumb", src: o.photo, alt: "" })
            : React.default.createElement(
                "div",
                {
                  className: "thumb",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    background: "#EEF3E2",
                  },
                },
                "📖",
              ),
          React.default.createElement(
            "div",
            { style: { minWidth: 0 } },
            React.default.createElement("div", { className: "nm" }, o.titre),
            React.default.createElement(
              "div",
              { className: "de" },
              a === 0 && o.active !== !1 ? "⭐ Recette de la semaine · " : "",
              new Date(o.cree || 0).toLocaleDateString("fr-FR"),
            ),
          ),
          React.default.createElement(
            "div",
            { className: "rt" },
            React.default.createElement(ze, {
              on: o.active !== !1,
              set: () =>
                set("recettes", (u) => u.map((d) => (d.id === o.id ? { ...d, active: d.active === !1 } : d))),
            }),
            React.default.createElement("button", { className: "ib", onClick: () => r(o) }, I10.pen()),
            React.default.createElement(
              "button",
              {
                className: "ib",
                onClick: async () =>
                  (await De("Supprimer « " + o.titre + " » ?")) &&
                  set("recettes", (u) => u.filter((d) => d.id !== o.id)),
              },
              I10.bin(),
            ),
          ),
        ),
      ),
    ),
    n &&
      React.default.createElement(
        ut,
        { titre: n.id ? "Modifier la recette" : "Nouvelle recette", onClose: () => r(null) },
        React.default.createElement(PhotoField, {
          value: n.photo,
          onChange: (o) => r((a) => ({ ...a, photo: o })),
        }),
        React.default.createElement("label", { className: "lab" }, "Titre"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: n.titre,
          maxLength: 80,
          onChange: (o) => r({ ...n, titre: o.target.value }),
          placeholder: "Ex : Tarte aux myrtilles de grand-mère",
        }),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 2, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Temps"),
            React.default.createElement("input", {
              className: "inp",
              value: n.duree,
              maxLength: 40,
              onChange: (o) => r({ ...n, duree: o.target.value }),
              placeholder: "Ex : 45 min",
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Personnes"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              value: n.personnes,
              onChange: (o) => r({ ...n, personnes: o.target.value }),
            }),
          ),
        ),
        React.default.createElement("label", { className: "lab" }, "Petit mot (facultatif)"),
        React.default.createElement("textarea", {
          className: "inp",
          value: n.intro,
          maxLength: 400,
          onChange: (o) => r({ ...n, intro: o.target.value }),
          placeholder: "Ex : La recette préférée de mes clients en automne…",
        }),
        React.default.createElement("label", { className: "lab" }, "Ingrédients (un par ligne)"),
        React.default.createElement("textarea", {
          className: "inp",
          value: n.ingredients,
          maxLength: 1500,
          onChange: (o) => r({ ...n, ingredients: o.target.value }),
          placeholder: `250 g de myrtilles
1 pâte brisée
2 œufs`,
          style: { minHeight: 110 },
        }),
        React.default.createElement("label", { className: "lab" }, "Préparation (une étape par ligne)"),
        React.default.createElement("textarea", {
          className: "inp",
          value: n.etapes,
          maxLength: 3e3,
          onChange: (o) => r({ ...n, etapes: o.target.value }),
          placeholder: `Préchauffer le four à 180 °C
Étaler la pâte dans le moule
…`,
          style: { minHeight: 140 },
        }),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: s },
          "Enregistrer",
        ),
      ),
  );
}
