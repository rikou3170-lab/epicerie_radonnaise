/* ═══════════════════════════════════════════════════════════════════════
 *  NOS PRODUCTEURS.
 * ═══════════════════════════════════════════════════════════════════════ */

// Nos producteurs (photo, texte), affichés sur l'accueil.
function Producteurs({ d: t, set }) {
  let [n, r] = (0, React.useState)(null),
    i = t.producteurs || [],
    s = () => {
      if (!n.nom?.trim()) return;
      let a = {
        ...n,
        nom: n.nom.trim().slice(0, 60),
        metier: (n.metier || "").trim().slice(0, 60),
        lieu: (n.lieu || "").trim().slice(0, 60),
        texte: (n.texte || "").trim().slice(0, 600),
        produits: (n.produits || "").trim().slice(0, 200),
        lien: /^https?:\/\//.test((n.lien || "").trim()) ? n.lien.trim().slice(0, 300) : "",
      };
      set("producteurs", (u) =>
        n.id
          ? u.map((d) => (d.id === n.id ? a : d))
          : [...u, { ...a, id: Wr(), ordre: u.length, active: !0 }],
      ),
        r(null);
    },
    o = (a, u) => {
      let d = [...i];
      ([d[a], d[u]] = [d[u], d[a]]),
        set("producteurs", (h) => h.map((p) => ({ ...p, ordre: d.findIndex((m) => m.id === p.id) })));
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Nos producteurs"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Présentez les producteurs dont vous vendez les produits : une photo, quelques mots. Ils apparaissent sur l'accueil de l'appli.",
    ),
    React.default.createElement(
      "button",
      {
        className: "btn dark",
        onClick: () => r({ nom: "", metier: "", lieu: "", texte: "", produits: "", lien: "", photo: "" }),
      },
      I10.plus(),
      "Ajouter un producteur",
    ),
    React.default.createElement("div", { style: { height: 12 } }),
    !i.length &&
      React.default.createElement(Vn, {
        t: "Aucun producteur",
        s: "Exemple : la fromagerie du village, le maraîcher d'à côté, l'apiculteur…",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      i.map((a, u) =>
        React.default.createElement(
          "div",
          { className: "card", key: a.id, style: { opacity: a.active === !1 ? 0.55 : 1 } },
          React.default.createElement(
            "div",
            { className: "row" },
            a.photo
              ? React.default.createElement("img", {
                  className: "thumb",
                  src: a.photo,
                  alt: "",
                  style: { borderRadius: "50%" },
                })
              : React.default.createElement(
                  "div",
                  {
                    className: "thumb",
                    style: {
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                    },
                  },
                  "🧑\u200D🌾",
                ),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, a.nom),
              React.default.createElement(
                "div",
                { className: "de" },
                [a.metier, a.lieu].filter(Boolean).join(" · "),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              u > 0 &&
                React.default.createElement(
                  "button",
                  { className: "ib", onClick: () => o(u, u - 1), "aria-label": "Monter" },
                  "↑",
                ),
              React.default.createElement(ze, {
                on: a.active !== !1,
                set: () =>
                  set("producteurs", (d) =>
                    d.map((h) => (h.id === a.id ? { ...h, active: h.active === !1 } : h)),
                  ),
              }),
              React.default.createElement("button", { className: "ib", onClick: () => r(a) }, I10.pen()),
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer " + a.nom + " ?")) &&
                    set("producteurs", (d) => d.filter((h) => h.id !== a.id)),
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
        { titre: n.id ? "Modifier" : "Nouveau producteur", onClose: () => r(null) },
        React.default.createElement(PhotoField, {
          value: n.photo,
          onChange: (a) => r((u) => ({ ...u, photo: a })),
        }),
        React.default.createElement("label", { className: "lab" }, "Nom"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: n.nom,
          maxLength: 60,
          onChange: (a) => r({ ...n, nom: a.target.value }),
          placeholder: "Ex : Fromagerie de la Vallée",
        }),
        React.default.createElement("label", { className: "lab" }, "Ce qu'il fait"),
        React.default.createElement("input", {
          className: "inp",
          value: n.metier,
          maxLength: 60,
          onChange: (a) => r({ ...n, metier: a.target.value }),
          placeholder: "Ex : Fromager, maraîcher, apiculteur…",
        }),
        React.default.createElement("label", { className: "lab" }, "Village"),
        React.default.createElement("input", {
          className: "inp",
          value: n.lieu,
          maxLength: 60,
          onChange: (a) => r({ ...n, lieu: a.target.value }),
          placeholder: "Ex : Faucogney-et-la-Mer",
        }),
        React.default.createElement("label", { className: "lab" }, "Quelques mots"),
        React.default.createElement("textarea", {
          className: "inp",
          value: n.texte,
          maxLength: 600,
          onChange: (a) => r({ ...n, texte: a.target.value }),
          placeholder: "Son histoire, sa façon de travailler…",
        }),
        React.default.createElement("label", { className: "lab" }, "Ses produits à l'épicerie"),
        React.default.createElement("input", {
          className: "inp",
          value: n.produits,
          maxLength: 200,
          onChange: (a) => r({ ...n, produits: a.target.value }),
          placeholder: "Ex : comté, morbier, cancoillotte",
        }),
        React.default.createElement("label", { className: "lab" }, "Lien vers sa page (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: n.lien,
          placeholder: "https://…",
          autoCapitalize: "off",
          onChange: (a) => r({ ...n, lien: a.target.value }),
        }),
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 6 } },
          "Demandez-lui son accord avant de publier sa photo et son nom.",
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: s },
          "Enregistrer",
        ),
      ),
  );
}
