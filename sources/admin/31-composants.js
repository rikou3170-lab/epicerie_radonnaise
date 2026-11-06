/* ═══════════════════════════════════════════════════════════════════════
 *  COMPOSANTS COMMUNS — bouton de fermeture, champ photo.
 * ═══════════════════════════════════════════════════════════════════════ */

// Fenêtre (modale) avec titre et bouton de fermeture.
function ut({ titre, onClose, children }) {
  return React.default.createElement(
    "div",
    { className: "mdl", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "in", onClick: (r) => r.stopPropagation() },
      React.default.createElement(
        "div",
        { className: "hd" },
        React.default.createElement("h3", null, titre),
        React.default.createElement(
          "button",
          { className: "ib", onClick: onClose, style: { fontSize: 26, color: "#93A099", lineHeight: 1 } },
          "×",
        ),
      ),
      children,
    ),
  );
}

// Champ photo : choisir, compresser, afficher, retirer.
function PhotoField({ value, onChange, max, large }) {
  let i = (0, React.useRef)();
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement("input", {
      ref: i,
      type: "file",
      accept: "image/*",
      style: { display: "none" },
      onChange: (s) => {
        let o = s.target.files?.[0];
        o && lirePhoto(o, onChange, max), (s.target.value = "");
      },
    }),
    value
      ? React.default.createElement(
          "div",
          { style: { position: "relative" } },
          React.default.createElement("img", { className: "ph", src: value, alt: "" }),
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 8 } },
            React.default.createElement(
              "button",
              { className: "btn gh sm", style: { flex: 1 }, onClick: () => i.current.click() },
              "Changer",
            ),
            React.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { flex: 1, color: "var(--red)" },
                onClick: () => onChange(""),
              },
              "Retirer",
            ),
          ),
        )
      : React.default.createElement(
          "div",
          { className: "phbox", onClick: () => i.current.click() },
          I10.cam(22),
          "Ajouter une photo",
        ),
  );
}
