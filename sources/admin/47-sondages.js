/* ═══════════════════════════════════════════════════════════════════════
 *  SONDAGES / BOÎTE À IDÉES.
 * ═══════════════════════════════════════════════════════════════════════ */

// Sondages / boîte à idées et réponses.
function Sondages({ d: t, set }) {
  let n = { active: !1, id: "", question: "", mode: "choix", options: ["", ""], ...(t.sondage || {}) },
    r = (a) => set("sondage", (u) => ({ ...n, ...(u || {}), ...a })),
    i = (t.reponses || []).filter((a) => a.s === n.id),
    s = async () => {
      (n.question &&
        !(await De(
          "Commencer un nouveau sondage ? Le sondage actuel s'arrête (ses réponses restent consultables ci-dessous jusqu'à ce que vous les effaciez).",
          { oui: "Nouveau sondage" },
        ))) ||
        set("sondage", { active: !1, id: "s" + Date.now(), question: "", mode: "choix", options: ["", ""] });
    },
    o = [...new Set((t.reponses || []).map((a) => a.s).filter((a) => a && a !== n.id))];
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Sondages et boîte à idées"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Posez une question à vos clients : ils répondent depuis l'accueil de l'appli, de façon anonyme (une réponse par téléphone).",
    ),
    n.id
      ? React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            "div",
            { className: "card" },
            React.default.createElement(
              "div",
              { className: "tog" },
              React.default.createElement(
                "span",
                { style: { fontSize: 13, fontWeight: 700 } },
                "Visible dans l'appli",
                React.default.createElement(
                  "span",
                  { className: "de", style: { display: "block", fontWeight: 400 } },
                  n.active
                    ? "✓ Les clients voient la question sur l'accueil."
                    : "Masqué : les clients ne le voient pas.",
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
              { className: "seg", style: { margin: "10px 0" } },
              [
                ["choix", "Choix à cocher"],
                ["libre", "Boîte à idées (texte libre)"],
              ].map(([a, u]) =>
                React.default.createElement(
                  "button",
                  {
                    key: a,
                    className: n.mode === a ? "on" : "",
                    disabled: i.length > 0,
                    onClick: () => r({ mode: a }),
                  },
                  u,
                ),
              ),
            ),
            React.default.createElement("label", { className: "lab" }, "Question"),
            React.default.createElement("input", {
              className: "inp",
              value: n.question,
              maxLength: 140,
              disabled: i.length > 0,
              onChange: (a) => r({ question: a.target.value }),
              placeholder:
                n.mode === "libre"
                  ? "Ex : Quel produit aimeriez-vous trouver à l'épicerie ?"
                  : "Ex : Plateau raclette ou fondue pour Noël ?",
            }),
            n.mode === "choix" &&
              React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("label", { className: "lab" }, "Réponses possibles"),
                (n.options || []).map((a, u) =>
                  React.default.createElement(
                    "div",
                    { key: u, style: { display: "flex", gap: 8, marginBottom: 6 } },
                    React.default.createElement("input", {
                      className: "inp",
                      style: { margin: 0 },
                      value: a,
                      maxLength: 60,
                      disabled: i.length > 0,
                      onChange: (d) =>
                        r({ options: n.options.map((h, p) => (p === u ? d.target.value : h)) }),
                      placeholder: "Réponse " + (u + 1),
                    }),
                    n.options.length > 2 &&
                      !i.length &&
                      React.default.createElement(
                        "button",
                        {
                          className: "ib",
                          onClick: () => r({ options: n.options.filter((d, h) => h !== u) }),
                        },
                        I10.bin(),
                      ),
                  ),
                ),
                n.options.length < 6 &&
                  !i.length &&
                  React.default.createElement(
                    "button",
                    {
                      className: "btn gh sm",
                      style: { width: "auto" },
                      onClick: () => r({ options: [...n.options, ""] }),
                    },
                    "+ Ajouter une réponse",
                  ),
              ),
            i.length > 0 &&
              React.default.createElement(
                "div",
                { className: "de", style: { marginTop: 8 } },
                "La question ne se modifie plus une fois les premières réponses reçues.",
              ),
          ),
          React.default.createElement(
            "div",
            { className: "card" },
            React.default.createElement(
              "div",
              { className: "nm", style: { marginBottom: 8 } },
              "📊 Résultats : ",
              i.length,
              " réponse",
              i.length > 1 ? "s" : "",
            ),
            n.mode === "choix"
              ? (n.options || []).map((a, u) => {
                  let d = i.filter((p) => p.o === u).length,
                    h = i.length ? Math.round((d * 100) / i.length) : 0;
                  return React.default.createElement(
                    "div",
                    { key: u, style: { marginBottom: 8 } },
                    React.default.createElement(
                      "div",
                      { style: { display: "flex", justifyContent: "space-between", fontSize: 13.5 } },
                      React.default.createElement("span", null, a || "Réponse " + (u + 1)),
                      React.default.createElement("b", null, d, " (", h, " %)"),
                    ),
                    React.default.createElement(
                      "div",
                      { style: { height: 8, borderRadius: 4, background: "#EEF3E2", overflow: "hidden" } },
                      React.default.createElement("div", {
                        style: { width: h + "%", height: "100%", background: "var(--apple)" },
                      }),
                    ),
                  );
                })
              : i.length
                ? i.map((a) =>
                    React.default.createElement(
                      "div",
                      {
                        key: a.id,
                        style: { padding: "8px 0", borderBottom: "1px solid var(--line)", fontSize: 13.5 },
                      },
                      "💡 ",
                      a.r,
                      React.default.createElement(
                        "div",
                        { className: "de" },
                        new Date(a.cree || 0).toLocaleDateString("fr-FR"),
                      ),
                    ),
                  )
                : React.default.createElement("div", { className: "de" }, "Pas encore de réponse."),
          ),
          React.default.createElement(
            "button",
            { className: "btn gh", onClick: s },
            I10.plus(),
            "Nouveau sondage",
          ),
        )
      : React.default.createElement(
          "button",
          { className: "btn dark", onClick: s },
          I10.plus(),
          "Créer un sondage",
        ),
    o.length > 0 &&
      React.default.createElement(
        "div",
        { className: "card", style: { marginTop: 12 } },
        React.default.createElement(
          "div",
          { className: "nm", style: { marginBottom: 6 } },
          "Anciens sondages",
        ),
        React.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 8 } },
          (t.reponses || []).filter((a) => a.s !== n.id).length,
          " réponse(s) d'anciens sondages sont encore gardées.",
        ),
        React.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { width: "auto" },
            onClick: async () =>
              (await De("Effacer les réponses des anciens sondages ?", { oui: "Effacer" })) &&
              set("reponses", (a) => a.filter((u) => u.s === n.id)),
          },
          "Effacer les anciennes réponses",
        ),
      ),
  );
}
