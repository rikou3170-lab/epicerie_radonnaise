/* ═══════════════════════════════════════════════════════════════════════
 *  FERMETURES EXCEPTIONNELLES.
 * ═══════════════════════════════════════════════════════════════════════ */

// Fermetures exceptionnelles (congés, jours fériés) annoncées dans l'appli.
function Fermetures({ d: t, set }) {
  let n = Array.isArray(t.fermetures) ? t.fermetures : [],
    [f, setF] = (0, React.useState)({ du: "", au: "", motif: "" }),
    s = Bn(),
    o = () => {
      f.du &&
        (set("fermetures", (a) =>
          [
            ...(Array.isArray(a) ? a : []),
            { du: f.du, au: f.au && f.au >= f.du ? f.au : f.du, motif: f.motif.trim().slice(0, 40) },
          ].sort((u, d) => u.du.localeCompare(d.du)),
        ),
        setF({ du: "", au: "", motif: "" }));
    };
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 4px" } },
      "Fermetures exceptionnelles",
    ),
    React.default.createElement(
      "div",
      { className: "sub", style: { margin: "0 0 8px" } },
      "Congés, jours fériés… Saisissez-les une fois : l'application affiche un bandeau 14 jours avant, indique « Fermé » et bloque les commandes ces jours-là.",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      n
        .filter((a) => (a.au || a.du) >= s)
        .map((a, u) =>
          React.default.createElement(
            "div",
            { className: "tog", key: a.du + u },
            React.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              a.du === a.au ? "Le " + dateCourte(a.du) : "Du " + dateCourte(a.du) + " au " + dateCourte(a.au),
              a.motif ? " · " + a.motif : "",
              a.du <= s &&
                React.default.createElement(
                  "span",
                  { className: "pill promo", style: { marginLeft: 6 } },
                  "En cours",
                ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: () =>
                    set("fermetures", (d) =>
                      (d || []).filter((h) => !(h.du === a.du && h.au === a.au && h.motif === a.motif)),
                    ),
                },
                I10.bin(),
              ),
            ),
          ),
        ),
      !n.some((a) => (a.au || a.du) >= s) &&
        React.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 8 } },
          "Aucune fermeture prévue.",
        ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 } },
        React.default.createElement(
          "div",
          { style: { flex: "1 1 130px" } },
          React.default.createElement("label", { className: "lab" }, "Du"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            min: s,
            value: f.du,
            onChange: (a) => setF({ ...f, du: a.target.value }),
          }),
        ),
        React.default.createElement(
          "div",
          { style: { flex: "1 1 130px" } },
          React.default.createElement("label", { className: "lab" }, "Au (facultatif)"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            min: f.du || s,
            value: f.au,
            onChange: (a) => setF({ ...f, au: a.target.value }),
          }),
        ),
        React.default.createElement(
          "div",
          { style: { flex: "2 1 180px" } },
          React.default.createElement("label", { className: "lab" }, "Motif (facultatif)"),
          React.default.createElement("input", {
            className: "inp",
            value: f.motif,
            maxLength: 40,
            placeholder: "Congés d'été, 11 novembre…",
            onChange: (a) => setF({ ...f, motif: a.target.value }),
          }),
        ),
      ),
      React.default.createElement(
        "button",
        { className: "btn sm", style: { marginTop: 8 }, disabled: !f.du, onClick: o },
        "Ajouter la fermeture",
      ),
    ),
  );
}
