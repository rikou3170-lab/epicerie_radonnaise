/* ═══════════════════════════════════════════════════════════════════════
 *  DÉCORS ANIMÉS DES THÈMES DE SAISON (1/2) — Halloween, Octobre rose, Beaujolais… : dessins (SVG) et animations
 *  qui se posent sur l'appli pendant la période du thème.
 * ═══════════════════════════════════════════════════════════════════════ */

var S = vn(Pn());

// Ambiances animées : liste des thèmes qui en ont une, et mémoire du thème en cours (pour l'écran de démarrage).
var Ee = vn(Pn()),
  L_ = [
    "halloween",
    "octobrerose",
    "beaujolais",
    "stnicolas",
    "nouvelan",
    "galette",
    "chandeleur",
    "valentin",
    "paques",
    "muguet",
    "meres",
    "musique",
    "peres",
    "juillet",
  ],
  gn = (t) => (t && !t.magie && L_.includes(t.id) && t.ambiance !== !1 ? t.id : null);

// Halloween : couleurs, chapeau de sorcière et citrouille.
var BE = {
    violet: "#2B1B3D",
    nuit: "#140B22",
    orange: "#E8731C",
    flamme: "#FFB547",
    vert: "#7FBF3F",
    os: "#F3E9D2",
  },
  SvgChapeauSorciere = ({ taille = 30, style }) =>
    Ee.default.createElement(
      "svg",
      {
        className: "amb-chapeau",
        viewBox: "0 0 44 40",
        width: taille,
        height: taille * 0.9,
        style,
        "aria-hidden": "true",
      },
      Ee.default.createElement("path", {
        d: "M22 2c3 6 4 10 9 14 2 2 2 6 0 9H11c3-6 6-12 7-17 1-3 2-5 4-6z",
        fill: "#6E45A8",
      }),
      Ee.default.createElement("path", {
        d: "M22 2c3 6 4 10 9 14-3-2-6-3-9-3 0-4 0-8 0-11z",
        fill: "#8A62C4",
      }),
      Ee.default.createElement("path", { d: "M12 21h20l-1 5H13z", fill: BE.orange }),
      Ee.default.createElement("rect", {
        x: "19.5",
        y: "20.5",
        width: "6",
        height: "6",
        rx: "1",
        fill: "none",
        stroke: BE.flamme,
        strokeWidth: "1.6",
      }),
      Ee.default.createElement("ellipse", { cx: "22", cy: "28", rx: "20", ry: "5", fill: "#5A3690" }),
      Ee.default.createElement("ellipse", { cx: "22", cy: "27", rx: "18", ry: "3.4", fill: "#7650B2" }),
    ),
  SvgCitrouille = ({ taille = 22, cls = "" }) =>
    Ee.default.createElement(
      "svg",
      {
        className: "amb-citrouille " + cls,
        viewBox: "0 0 40 36",
        width: taille,
        height: taille * 0.9,
        "aria-hidden": "true",
      },
      Ee.default.createElement("path", { d: "M20 7c-2-4-1-6 1-7l2 1c-2 1-2 3-1 6z", fill: "#4E6B2A" }),
      Ee.default.createElement("ellipse", { cx: "12", cy: "21", rx: "10", ry: "12", fill: "#D9621A" }),
      Ee.default.createElement("ellipse", { cx: "28", cy: "21", rx: "10", ry: "12", fill: "#D9621A" }),
      Ee.default.createElement("ellipse", { cx: "20", cy: "21", rx: "10", ry: "13", fill: BE.orange }),
      Ee.default.createElement(
        "g",
        { className: "amb-lueur", fill: "#FFD36B" },
        Ee.default.createElement("path", { d: "M11 17l5 0-2.5-4.5zM24 17l5 0-2.5-4.5z" }),
        Ee.default.createElement("path", { d: "M10 24c4 4 16 4 20 0l-3 1-2-2-2 2-3-2-3 2-2-2-2 2z" }),
      ),
    );

// Halloween : guirlande de fanions.
function bC({ n: t = 9, apercu }) {
  return Ee.default.createElement(
    "div",
    { className: "amb-guirl" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
    Ee.default.createElement(
      "svg",
      { className: "amb-fil", viewBox: "0 0 300 24", preserveAspectRatio: "none" },
      Ee.default.createElement("path", {
        d:
          "M0 3 " +
          Array.from(
            { length: t },
            (n, r) => "Q" + ((r + 0.5) * 300) / t + " 15 " + ((r + 1) * 300) / t + " 3",
          ).join(" "),
        fill: "none",
        stroke: "#1A0F28",
        strokeWidth: "1.4",
      }),
    ),
    Array.from({ length: t * 2 }, (n, r) => {
      let i = ((r + 0.5) * 100) / (t * 2);
      return r % 2 === 0
        ? Ee.default.createElement(
            "span",
            {
              key: r,
              className: "amb-lanterne",
              style: { left: i + "%", animationDelay: (r % 5) * 0.37 + "s" },
            },
            Ee.default.createElement(SvgCitrouille, { taille: 17 }),
          )
        : Ee.default.createElement("span", {
            key: r,
            className: "amb-fanion " + (r % 4 === 1 ? "o" : "v"),
            style: { left: i + "%" },
          });
    }),
  );
}

// Toile d'araignée (image de fond).
var z_ = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%235E3F82' stroke-width='.9' opacity='.75'%3E%3Cpath d='M40 0L8 32M40 0L22 40M40 0L0 18M40 0v40M40 0H0'/%3E%3Cpath d='M28 0q2 6 12 12M16 0q4 12 24 24M6 0q6 20 34 34'/%3E%3C/g%3E%3C/svg%3E")`;

// Octobre rose : ruban et cœurs.
var SC = ({ taille = 18, c1: e = "#EC407A", c2 = "#F06292", cls = "" }) =>
    Ee.default.createElement(
      "svg",
      { className: cls, viewBox: "0 0 24 30", width: taille, height: taille * 1.25, "aria-hidden": "true" },
      Ee.default.createElement("path", {
        d: "M12 2c-3.4 0-5.5 2.4-5.5 5.4 0 3.4 2.2 6.8 5.5 11.6 3.3-4.8 5.5-8.2 5.5-11.6C17.5 4.4 15.4 2 12 2zm0 3c1.5 0 2.5 1 2.5 2.5 0 1.6-1 3.5-2.5 6-1.5-2.5-2.5-4.4-2.5-6C9.5 6 10.5 5 12 5z",
        fill: e,
      }),
      Ee.default.createElement("path", {
        d: "M10 17 3.5 27.5l3.7-.4 1.7 3.4 5.3-9.4zM14 17l6.5 10.5-3.7-.4-1.7 3.4-5.3-9.4z",
        fill: c2,
      }),
    ),
  PC = ({ style }) =>
    Ee.default.createElement(
      "span",
      { className: "amb-ruban-logo", style },
      Ee.default.createElement(SC, { taille: 15 }),
    );

// Octobre rose : guirlande.
function NC({ n: t = 9, apercu }) {
  return Ee.default.createElement(
    "div",
    { className: "amb-guirl" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
    Ee.default.createElement(
      "svg",
      { className: "amb-fil", viewBox: "0 0 300 24", preserveAspectRatio: "none" },
      Ee.default.createElement("path", {
        d:
          "M0 3 " +
          Array.from(
            { length: t },
            (n, r) => "Q" + ((r + 0.5) * 300) / t + " 15 " + ((r + 1) * 300) / t + " 3",
          ).join(" "),
        fill: "none",
        stroke: "#C2185B",
        strokeWidth: "1.2",
      }),
    ),
    Array.from({ length: t * 2 }, (n, r) => {
      let i = ((r + 0.5) * 100) / (t * 2);
      return r % 2 === 0
        ? Ee.default.createElement(
            "span",
            {
              key: r,
              className: "amb-lanterne",
              style: { left: i + "%", animationDelay: (r % 5) * 0.37 + "s" },
            },
            Ee.default.createElement(SC, { taille: 13 }),
          )
        : Ee.default.createElement("span", { key: r, className: "amb-coeur", style: { left: i + "%" } });
    }),
  );
}
