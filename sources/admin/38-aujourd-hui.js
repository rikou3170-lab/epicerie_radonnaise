/* ═══════════════════════════════════════════════════════════════════════
 *  AUJOURD'HUI — produits du jour (frais, plats, promos, anti-gaspi).
 * ═══════════════════════════════════════════════════════════════════════ */

// v2.42 : choix « À la pièce » / « Au kilo » d'un article (au kilo = unité « kg », prix du kilo).
function ChoixVente({ unite, onChange }) {
  const kilo = auKilo({ unite }),
    bouton = (actif, texte, val) =>
      React.default.createElement(
        "button",
        {
          type: "button",
          onClick: () => onChange(val),
          style: {
            flex: 1,
            padding: "8px 6px",
            borderRadius: 9,
            cursor: "pointer",
            fontFamily: "var(--body)",
            fontSize: 12.5,
            fontWeight: 800,
            color: actif ? "#fff" : "var(--forest)",
            background: actif ? "var(--forest)" : "#fff",
            border: "1.5px solid var(--forest)",
          },
        },
        texte,
      );
  return React.default.createElement(
    "div",
    { style: { display: "flex", gap: 6, marginTop: 8 } },
    bouton(!kilo, "À la pièce", kilo ? "" : unite),
    bouton(kilo, "Au kilo", "kg"),
  );
}

// Produits du jour : frais, plats, promos, anti-gaspi (réservables ou non).
function Jour({ d: t, set }) {
  let [n, r] = (0, React.useState)(""),
    [i, s] = (0, React.useState)(""),
    [o, a] = (0, React.useState)(""),
    [u, d] = (0, React.useState)("frais"),
    [h, p] = (0, React.useState)(""),
    [m, w] = (0, React.useState)({ debut: "", fin: "" }),
    [E, A] = (0, React.useState)(!1),
    [S, _] = (0, React.useState)(null),
    [I, T] = (0, React.useState)({ stock: 0, retrait: "" }),
    [M, V] = (0, React.useState)(null),
    O = bw(t),
    b = gN(O),
    v = t.jour?.items || [],
    x = (k) => k === "promo" || k === "gaspi" || k === "panier",
    C = (k) => set("jour", ($) => ({ items: k($?.items || []), maj: aujourdhui() })),
    F = () => {
      n.trim() &&
        (C((k) => [
          iN({
            id: Wr(),
            titre: n.trim(),
            prix: i,
            unite: o,
            type: u,
            note: "",
            photo: "",
            active: !0,
            ancienPrix: x(u) ? h : "",
            debut: m.debut,
            fin: m.fin,
            ...I,
            reserves: 0,
          }),
          ...k,
        ]),
        r(""),
        s(""),
        a(""),
        p(""),
        w({ debut: "", fin: "" }),
        A(!1),
        T({ stock: 0, retrait: "" }));
    },
    P = () => {
      S.titre?.trim() && (C((k) => k.map(($) => ($.id === S.id ? iN(S) : $))), _(null));
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Aujourd'hui"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Le cœur de l'application : ce qui change chaque jour. Un titre, un prix, c'est publié. Comptez 20 secondes.",
    ),
    React.default.createElement(Reservations, { d: t }),
    React.default.createElement(
      "div",
      { className: "card", style: { background: "#FBF8F1" } },
      React.default.createElement("label", { className: "lab" }, "Quoi de neuf ?"),
      React.default.createElement("input", {
        className: "inp",
        value: n,
        onChange: (k) => r(k.target.value),
        onKeyDown: (k) => k.key === "Enter" && F(),
        placeholder: "Fraises de Bergerac, lasagnes maison…",
      }),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, marginTop: 8 } },
        React.default.createElement("input", {
          className: "inp",
          style: { flex: 1 },
          type: "number",
          inputMode: "decimal",
          step: "0.01",
          value: i,
          onChange: (k) => s(k.target.value),
          placeholder: auKilo({ unite: o }) ? "Prix du kilo (€)" : "Prix (facultatif)",
        }),
        !auKilo({ unite: o }) &&
          React.default.createElement("input", {
            className: "inp",
            style: { width: 108 },
            value: o,
            onChange: (k) => a(k.target.value),
            placeholder: "pièce, part…",
          }),
      ),
      React.default.createElement(ChoixVente, { unite: o, onChange: a }),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 6, marginTop: 9, flexWrap: "wrap" } },
        TYPES.map((k) =>
          React.default.createElement(
            "button",
            {
              key: k.id,
              onClick: () => d(k.id),
              style: {
                flex: "1 1 40%",
                padding: "9px 6px",
                borderRadius: 9,
                cursor: "pointer",
                fontFamily: "var(--body)",
                fontSize: 11.5,
                fontWeight: 800,
                color: u === k.id ? "#fff" : k.c,
                background: u === k.id ? k.c : "#fff",
                border: "1.5px solid " + k.c,
              },
            },
            k.label,
          ),
        ),
      ),
      x(u) &&
        React.default.createElement(
          "div",
          { style: { marginTop: 9 } },
          React.default.createElement("label", { className: "lab" }, "Prix avant (barré)"),
          React.default.createElement("input", {
            className: "inp",
            type: "number",
            inputMode: "decimal",
            step: "0.01",
            value: h,
            onChange: (k) => p(k.target.value),
            placeholder: "Facultatif",
          }),
        ),
      x(u) && React.default.createElement(ChampsResa, { v: { ...I, unite: o }, onChange: ({ unite: _u, ...k }) => T(k) }),
      u === "panier" &&
        !n &&
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 4 } },
          "Ex : « Panier surprise fruits & légumes », prix 5 €, prix avant 15 € (valeur).",
        ),
      E || x(u)
        ? React.default.createElement(
            "div",
            { style: { marginTop: 9 } },
            React.default.createElement(Periode, { v: m, onChange: w }),
          )
        : React.default.createElement(
            "button",
            {
              onClick: () => A(!0),
              style: {
                marginTop: 9,
                border: "none",
                background: "none",
                color: "var(--apple)",
                fontFamily: "var(--body)",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
                padding: 0,
              },
            },
            "+ Programmer des dates de parution",
          ),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 10 }, disabled: !n.trim(), onClick: F },
        I10.plus(),
        "Publier",
      ),
    ),
    !v.length &&
      React.default.createElement(Vn, {
        t: "Rien pour aujourd'hui",
        s: "Ajoutez au moins un article : c'est ce que vos clients regardent en ouvrant l'application.",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      v.map((k) => {
        let $ = TYPES.find((Q) => Q.id === k.type) || TYPES[0];
        return React.default.createElement(
          "div",
          { className: "card", key: k.id },
          React.default.createElement(
            "div",
            { className: "row" },
            k.photo
              ? React.default.createElement("img", { className: "thumb", src: k.photo, alt: "" })
              : React.default.createElement("div", {
                  style: { width: 6, alignSelf: "stretch", borderRadius: 4, background: $.c, flexShrink: 0 },
                }),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, k.titre),
              React.default.createElement(
                "div",
                { className: "de", style: { color: $.c, fontWeight: 700 } },
                $.label,
                k.prix !== "" && k.prix != null
                  ? " · " + Number(k.prix).toFixed(2) + " €" + (k.unite ? " / " + k.unite : "")
                  : "",
                !!k.ancienPrix &&
                  React.default.createElement(
                    "span",
                    {
                      style: {
                        textDecoration: "line-through",
                        color: "var(--ink3)",
                        fontWeight: 600,
                        marginLeft: 6,
                      },
                    },
                    Number(k.ancienPrix).toFixed(2),
                    " €",
                  ),
              ),
              k.note && React.default.createElement("div", { className: "de" }, k.note),
              (parseInt(k.stock) || 0) > 0 &&
                React.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 800, color: "#2E7D32" } },
                  "🧺 Réservable · ",
                  // v2.43 : au kilo, compté en tranches de 100 g → affiché en kg
                  auKilo(k) ? String((parseInt(k.reserves) || 0) / 10).replace(".", ",") + " kg" : parseInt(k.reserves) || 0,
                  parseInt(k.stock) >= 999 ? "" : " / " + (auKilo(k) ? String(parseInt(k.stock) / 10).replace(".", ",") + " kg" : k.stock),
                  " réservé",
                  (parseInt(k.reserves) || 0) > 1 ? "s" : "",
                  parseInt(k.stock) < 999 && (parseInt(k.reserves) || 0) >= parseInt(k.stock)
                    ? " · ÉPUISÉ"
                    : "",
                ),
              React.default.createElement(Pastille, { x: k, style: { marginTop: 5 } }),
              O &&
                x(k.type) &&
                k.active !== !1 &&
                React.default.createElement(
                  "button",
                  {
                    className: "btn gh sm",
                    style: { width: "auto", marginTop: 8, padding: "6px 12px" },
                    disabled: !b.promo,
                    title: b.promo ? "" : "Aucun client abonné aux bons plans pour l'instant",
                    onClick: () => V(k),
                  },
                  "📣 Prévenir",
                  b.promo ? " (" + b.promo + ")" : "",
                ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: k.active !== !1,
                set: () => C((Q) => Q.map((Y) => (Y.id === k.id ? { ...Y, active: Y.active === !1 } : Y))),
              }),
              React.default.createElement("button", { className: "ib", onClick: () => _(k) }, I10.pen()),
              React.default.createElement(
                "button",
                { className: "ib", onClick: () => C((Q) => Q.filter((Y) => Y.id !== k.id)) },
                I10.bin(),
              ),
            ),
          ),
        );
      }),
    ),
    !!v.length &&
      React.default.createElement(
        "button",
        {
          className: "btn gh",
          style: { marginTop: 6, color: "var(--red)" },
          onClick: async () => (await De("Vider la liste du jour ?")) && C(() => []),
        },
        "Vider la liste du jour",
      ),
    M &&
      React.default.createElement(
        ut,
        { titre: "📣 Prévenir mes clients", onClose: () => V(null) },
        React.default.createElement(
          "div",
          { className: "de" },
          "Le message est prêt, vous pouvez le modifier avant d'envoyer.",
        ),
        React.default.createElement(EnvoiNotification, {
          d: t,
          abonnes: b.promo,
          ...(({ titre, texte }) => ({ titre0: titre, texte0: texte }))(texteGaspi(M, t)),
          onFini: () => V(null),
          onAnnuler: () => V(null),
        }),
      ),
    S &&
      React.default.createElement(
        ut,
        { titre: "Modifier l'article", onClose: () => _(null) },
        React.default.createElement(PhotoField, {
          value: S.photo,
          onChange: (k) => _(($) => ({ ...$, photo: k })),
        }),
        React.default.createElement("label", { className: "lab" }, "Titre"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: S.titre,
          onChange: (k) => _({ ...S, titre: k.target.value }),
        }),
        React.default.createElement("label", { className: "lab" }, "Précision (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: S.note,
          onChange: (k) => _({ ...S, note: k.target.value }),
          placeholder:
            S.type === "panier"
              ? "Contenu : fruits, légumes, laitages du jour…"
              : "Dernier jour, quantité limitée…",
        }),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1 } },
            React.default.createElement("label", { className: "lab" }, auKilo(S) ? "Prix du kilo (€)" : "Prix (€)"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "decimal",
              step: "0.01",
              value: S.prix,
              onChange: (k) => _({ ...S, prix: k.target.value }),
            }),
          ),
          !auKilo(S) &&
            React.default.createElement(
              "div",
              { style: { flex: 1 } },
              React.default.createElement("label", { className: "lab" }, "Unité"),
              React.default.createElement("input", {
                className: "inp",
                value: S.unite,
                placeholder: "pièce, part…",
                onChange: (k) => _({ ...S, unite: k.target.value }),
              }),
            ),
        ),
        React.default.createElement(ChoixVente, { unite: S.unite, onChange: (u) => _({ ...S, unite: u }) }),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1 } },
            React.default.createElement("label", { className: "lab" }, "Prix avant (barré)"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "decimal",
              step: "0.01",
              value: S.ancienPrix || "",
              onChange: (k) => _({ ...S, ancienPrix: k.target.value }),
              placeholder: "Facultatif",
            }),
          ),
        ),
        // v2.46 : règle du prix de référence (code de la consommation, art. L112-1-1)
        !!S.ancienPrix &&
          React.default.createElement(
            "div",
            { className: "de", style: { margin: "2px 2px 8px" } },
            "Rappel légal : le prix barré doit être le prix le plus bas pratiqué pendant les 30 derniers jours (sauf produits frais qui vont vite se périmer : dates courtes, anti-gaspi).",
          ),
        React.default.createElement(Periode, { v: S, onChange: _ }),
        x(S.type) && React.default.createElement(ChampsResa, { v: S, onChange: _ }),
        React.default.createElement("label", { className: "lab" }, "Catégorie"),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
          TYPES.map((k) =>
            React.default.createElement(
              "button",
              {
                key: k.id,
                onClick: () => _({ ...S, type: k.id }),
                style: {
                  flex: "1 1 40%",
                  padding: "9px 6px",
                  borderRadius: 9,
                  cursor: "pointer",
                  fontFamily: "var(--body)",
                  fontSize: 11.5,
                  fontWeight: 800,
                  color: S.type === k.id ? "#fff" : k.c,
                  background: S.type === k.id ? k.c : "#fff",
                  border: "1.5px solid " + k.c,
                },
              },
              k.label,
            ),
          ),
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: P },
          "Enregistrer",
        ),
      ),
  );
}
