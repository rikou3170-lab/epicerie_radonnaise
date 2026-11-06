/* ═══════════════════════════════════════════════════════════════════════
 *  DÉCORS ANIMÉS DES THÈMES DE SAISON (1/2) — Halloween, Octobre rose, Beaujolais… : dessins (SVG) et animations
 *  qui se posent sur l'appli pendant la période du thème.
 * ═══════════════════════════════════════════════════════════════════════ */

var I = On(Ln());

// Ambiances animées : liste des thèmes qui en ont une, et mémoire du thème en cours (pour l'écran de démarrage).
var U = On(Ln()),
  XP = [
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
  Re = (t) => (t && !t.magie && XP.includes(t.id) && t.ambiance !== !1 ? t.id : null),
  sI = "epicerie-raddonnaise-ambiance";

// Mémorise sur le téléphone l'ambiance du thème du moment.
function aI(t, e) {
  try {
    let n = t?.magie ? "noel" : Re(t);
    if (!n) {
      localStorage.removeItem(sI);
      return;
    }
    localStorage.setItem(sI, JSON.stringify({ id: n, au: e || "" }));
  } catch {}
}

// Halloween : couleurs, chapeau de sorcière et citrouille.
var Vr = {
    violet: "#2B1B3D",
    nuit: "#140B22",
    orange: "#E8731C",
    flamme: "#FFB547",
    vert: "#7FBF3F",
    os: "#F3E9D2",
  },
  SvgChapeauSorciere = ({ taille = 30, style }) =>
    U.default.createElement(
      "svg",
      {
        className: "amb-chapeau",
        viewBox: "0 0 44 40",
        width: taille,
        height: taille * 0.9,
        style,
        "aria-hidden": "true",
      },
      U.default.createElement("path", {
        d: "M22 2c3 6 4 10 9 14 2 2 2 6 0 9H11c3-6 6-12 7-17 1-3 2-5 4-6z",
        fill: "#6E45A8",
      }),
      U.default.createElement("path", {
        d: "M22 2c3 6 4 10 9 14-3-2-6-3-9-3 0-4 0-8 0-11z",
        fill: "#8A62C4",
      }),
      U.default.createElement("path", { d: "M12 21h20l-1 5H13z", fill: Vr.orange }),
      U.default.createElement("rect", {
        x: "19.5",
        y: "20.5",
        width: "6",
        height: "6",
        rx: "1",
        fill: "none",
        stroke: Vr.flamme,
        strokeWidth: "1.6",
      }),
      U.default.createElement("ellipse", { cx: "22", cy: "28", rx: "20", ry: "5", fill: "#5A3690" }),
      U.default.createElement("ellipse", { cx: "22", cy: "27", rx: "18", ry: "3.4", fill: "#7650B2" }),
    ),
  SvgCitrouille = ({ taille = 22, cls = "" }) =>
    U.default.createElement(
      "svg",
      {
        className: "amb-citrouille " + cls,
        viewBox: "0 0 40 36",
        width: taille,
        height: taille * 0.9,
        "aria-hidden": "true",
      },
      U.default.createElement("path", { d: "M20 7c-2-4-1-6 1-7l2 1c-2 1-2 3-1 6z", fill: "#4E6B2A" }),
      U.default.createElement("ellipse", { cx: "12", cy: "21", rx: "10", ry: "12", fill: "#D9621A" }),
      U.default.createElement("ellipse", { cx: "28", cy: "21", rx: "10", ry: "12", fill: "#D9621A" }),
      U.default.createElement("ellipse", { cx: "20", cy: "21", rx: "10", ry: "13", fill: Vr.orange }),
      U.default.createElement(
        "g",
        { className: "amb-lueur", fill: "#FFD36B" },
        U.default.createElement("path", { d: "M11 17l5 0-2.5-4.5zM24 17l5 0-2.5-4.5z" }),
        U.default.createElement("path", { d: "M10 24c4 4 16 4 20 0l-3 1-2-2-2 2-3-2-3 2-2-2-2 2z" }),
      ),
    ),
  RP = ({ w = 34 }) =>
    U.default.createElement(
      "svg",
      { viewBox: "0 0 60 26", width: w, height: w * 0.43, "aria-hidden": "true" },
      U.default.createElement(
        "g",
        { fill: "#1A0F28" },
        U.default.createElement(
          "g",
          { className: "amb-aile g" },
          U.default.createElement("path", {
            d: "M30 12C24 2 14 0 2 6c6 1 8 4 8 7 4-2 8-1 10 2 3-2 6-2 10-3z",
          }),
        ),
        U.default.createElement(
          "g",
          { className: "amb-aile d" },
          U.default.createElement("path", {
            d: "M30 12C36 2 46 0 58 6c-6 1-8 4-8 7-4-2-8-1-10 2-3-2-6-2-10-3z",
          }),
        ),
        U.default.createElement("ellipse", { cx: "30", cy: "14", rx: "4", ry: "5.5" }),
        U.default.createElement("path", { d: "M27 9l1-4 2 3 2-3 1 4z" }),
      ),
      U.default.createElement("circle", { cx: "28.5", cy: "12.5", r: ".9", fill: Vr.flamme }),
      U.default.createElement("circle", { cx: "31.5", cy: "12.5", r: ".9", fill: Vr.flamme }),
    );

// Halloween : guirlande de fanions.
function uI({ n: t = 9, apercu }) {
  return U.default.createElement(
    "div",
    { className: "amb-guirl" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
    U.default.createElement(
      "svg",
      { className: "amb-fil", viewBox: "0 0 300 24", preserveAspectRatio: "none" },
      U.default.createElement("path", {
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
        ? U.default.createElement(
            "span",
            {
              key: r,
              className: "amb-lanterne",
              style: { left: i + "%", animationDelay: (r % 5) * 0.37 + "s" },
            },
            U.default.createElement(SvgCitrouille, { taille: 17 }),
          )
        : U.default.createElement("span", {
            key: r,
            className: "amb-fanion " + (r % 4 === 1 ? "o" : "v"),
            style: { left: i + "%" },
          });
    }),
  );
}

// Halloween : chauves-souris qui traversent l'écran.
function DecorVol({ boucle = !0, apercu }) {
  return U.default.createElement(
    "div",
    { className: "amb-vol" + (boucle ? " boucle" : "") + (apercu ? " apercu" : ""), "aria-hidden": "true" },
    [
      [0, 0, 34],
      [38, -18, 26],
      [70, 10, 22],
    ].map(([n, r, i], o) =>
      U.default.createElement(
        "span",
        { key: o, style: { left: n + "px", top: r + "px", animationDelay: o * 0.13 + "s" } },
        U.default.createElement(RP, { w: i }),
      ),
    ),
  );
}

// Halloween : sorcière sur son balai.
var SvgSorciere = () =>
  U.default.createElement(
    "svg",
    { className: "amb-sorciere", viewBox: "0 0 120 60", width: "120", height: "60", "aria-hidden": "true" },
    U.default.createElement(
      "g",
      { fill: "#120A1E" },
      U.default.createElement("path", {
        d: "M4 40 L86 30",
        stroke: "#120A1E",
        strokeWidth: "3",
        strokeLinecap: "round",
      }),
      U.default.createElement("path", { d: "M86 30c6-2 14-8 22-6-6 2-6 5-2 8-7 0-14 2-20-2z" }),
      U.default.createElement("path", { d: "M42 34c2-10 8-16 14-16 6 0 9 6 8 12z" }),
      U.default.createElement("circle", { cx: "58", cy: "15", r: "5.5" }),
      U.default.createElement("path", { d: "M52 12c4-2 9-2 13 0-4-6-6-12-4-16-4 4-7 10-9 16z" }),
      U.default.createElement("path", {
        d: "M48 12h20",
        stroke: "#120A1E",
        strokeWidth: "2.4",
        strokeLinecap: "round",
      }),
      U.default.createElement("path", {
        d: "M60 30c4 4 10 6 16 5",
        stroke: "#120A1E",
        strokeWidth: "2.6",
        fill: "none",
        strokeLinecap: "round",
      }),
      U.default.createElement("path", { d: "M44 34c-6 4-10 8-16 8 4-4 6-8 10-10z" }),
    ),
    U.default.createElement("circle", {
      cx: "98",
      cy: "27",
      r: "1.6",
      fill: Vr.flamme,
      className: "amb-lueur",
    }),
  );

// Halloween : village au crépuscule en bas de l'écran.
var tM = () =>
  U.default.createElement(
    "svg",
    {
      className: "amb-village",
      viewBox: "0 0 400 150",
      preserveAspectRatio: "xMidYMax slice",
      "aria-hidden": "true",
    },
    U.default.createElement("path", {
      d: "M0 98Q60 76 120 90t120-6 160 8V150H0z",
      fill: "#4A2F66",
      opacity: ".55",
    }),
    U.default.createElement(
      "g",
      { fill: "none", stroke: "#0A0512", strokeLinecap: "round", transform: "translate(-50 0)" },
      U.default.createElement("path", { d: "M318 112c2-20-4-34 2-52", strokeWidth: "7" }),
      U.default.createElement("path", {
        d: "M320 74c-10-6-16-16-30-16M290 58c-4-4-10-4-14 0M321 66c10-8 18-10 26-22M347 44c2-5 6-7 10-6M319 86c12-2 22 2 32-6",
        strokeWidth: "3",
      }),
    ),
    U.default.createElement("path", { d: "M0 112Q100 100 200 108t200-4V150H0z", fill: "#1C1029" }),
    U.default.createElement(
      "g",
      { stroke: "#2E1D47", strokeWidth: "2.4" },
      [112, 130, 148, 166, 184].map((t) => U.default.createElement("path", { key: t, d: `M${t} 112v-14` })),
      U.default.createElement("path", { d: "M108 102h80M108 108h80", strokeWidth: "1.6" }),
    ),
    U.default.createElement("path", { d: "M0 124Q120 114 220 121t180-6V150H0z", fill: "#120A1E" }),
    [
      [60, 116, 1],
      [126, 118, 1.1],
      [200, 116, 0.9],
      [238, 118, 1.3],
      [290, 116, 1],
      [340, 118, 1.2],
      [168, 120, 0.8],
    ].map(([t, e, n], r) =>
      U.default.createElement(
        "g",
        { key: "c" + r, transform: `translate(${t - 11 * n} ${e - 18 * n}) scale(${n})` },
        U.default.createElement("ellipse", { cx: "11", cy: "12", rx: "11", ry: "8.5", fill: Vr.orange }),
        U.default.createElement("path", {
          d: "M11 4v16M6 5q-3 7 0 15M16 5q3 7 0 15",
          stroke: "#C2410C",
          strokeWidth: ".7",
          fill: "none",
          opacity: ".6",
        }),
        U.default.createElement("path", {
          d: "M10 4c0-3 1-4 2-4",
          stroke: "#4E6B2A",
          strokeWidth: "2",
          fill: "none",
        }),
        r % 2 === 0 &&
          U.default.createElement(
            "g",
            { className: "amb-lueur", fill: "#FFD36B", style: { animationDelay: r * 0.5 + "s" } },
            U.default.createElement("path", {
              d: "M5 10h3.5l-1.75-3zM13.5 10H17l-1.75-3zM5 14c3 3 9 3 12 0l-2 .7-1.4-1.3-1.6 1.3-1.6-1.3-1.6 1.3-1.4-1.3z",
            }),
          ),
      ),
    ),
  );

// Halloween : ciel étoilé avec lune pour l'introduction.
function cI({ apercu }) {
  return U.default.createElement(
    "div",
    { className: "decor-magie amb-intro-h", "aria-hidden": "true" },
    U.default.createElement("div", { className: "amb-etoiles" }),
    U.default.createElement(
      "div",
      { className: "amb-lune" },
      U.default.createElement("span", { className: "amb-passe" }, U.default.createElement(SvgSorciere, null)),
    ),
    U.default.createElement(DecorVol, { boucle: !1, apercu: !0 }),
    U.default.createElement(tM, null),
    U.default.createElement("div", { className: "amb-brume" }),
    U.default.createElement("div", { className: "amb-brume b2" }),
  );
}

// Halloween : araignée suspendue à son fil.
var SvgAraignee = () =>
  U.default.createElement(
    "div",
    { className: "amb-araignee", "aria-hidden": "true" },
    U.default.createElement("i", null),
    U.default.createElement(
      "svg",
      { viewBox: "0 0 30 26", width: "22", height: "19" },
      U.default.createElement(
        "g",
        { stroke: "#1A0F28", strokeWidth: "1.5", fill: "none", strokeLinecap: "round" },
        U.default.createElement("path", {
          d: "M11 12C6 9 4 6 2 7M11 14C6 13 3 14 1 16M12 16C8 18 6 21 5 24M19 12c5-3 7-6 9-5M19 14c5-1 8 0 10 2M18 16c4 2 6 5 7 8",
        }),
      ),
      U.default.createElement("ellipse", { cx: "15", cy: "14", rx: "5.5", ry: "6", fill: "#1A0F28" }),
      U.default.createElement("circle", { cx: "15", cy: "7.5", r: "3.6", fill: "#1A0F28" }),
      U.default.createElement("circle", { cx: "13.7", cy: "7", r: ".9", fill: Vr.flamme }),
      U.default.createElement("circle", { cx: "16.3", cy: "7", r: ".9", fill: Vr.flamme }),
    ),
  );

// Petits éclats de couleur au toucher, selon le thème (désactivé si l'utilisateur limite les animations).
function dI(t) {
  (0, U.useEffect)(() => {
    if (!t || typeof window > "u" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let e = {
      halloween: ["#FF9A3C", "#B07CE0", "#FFD36B", "#7FBF3F"],
      octobrerose: ["#F06292", "#FFFFFF", "#F8BBD0", "#EC407A"],
      beaujolais: ["#9C3D6A", "#E08A2E", "#F2C14E", "#6E9B3A"],
      stnicolas: ["#D4AF37", "#FFFFFF", "#E8463A", "#B5652E"],
      nouvelan: ["#F4D774", "#FFFFFF", "#F48FB1", "#81D4FA"],
      galette: ["#F4D774", "#FFF3C4", "#E9C46A", "#C62828"],
      chandeleur: ["#F2CB7C", "#FFFFFF", "#E0A040", "#C62828"],
      valentin: ["#E0284A", "#F48FB1", "#FFFFFF", "#FFD6E0"],
      paques: ["#F6C6D9", "#BFE3F2", "#F9E79F", "#C8E6C9"],
      muguet: ["#FFFFFF", "#8BBF6A", "#EEF6E8", "#5E9A3E"],
      meres: ["#F48FB1", "#CE93D8", "#FFD54F", "#FFFFFF"],
      musique: ["#F2B134", "#E05A73", "#81D4FA", "#7A5AC8"],
      peres: ["#5B8FC7", "#F2D08A", "#FFFFFF", "#C27B42"],
      juillet: ["#1F3A93", "#FFFFFF", "#D7263D", "#F2B134"],
    }[t];
    if (!e) return;
    let n = (r) => {
      let i = document.createElement("div");
      (i.className = "poudre amb-poudre"),
        (i.style.left = r.clientX + "px"),
        (i.style.top = r.clientY + "px");
      for (let o = 0; o < 9; o++) {
        let s = document.createElement("i");
        s.style.setProperty("--a", o * 40 + Math.random() * 20 + "deg"),
          s.style.setProperty("--d", 18 + Math.random() * 20 + "px"),
          (s.style.background = e[o % e.length]),
          (s.style.boxShadow = "0 0 6px " + e[o % e.length]),
          i.appendChild(s);
      }
      document.body.appendChild(i), setTimeout(() => i.remove(), 900);
    };
    return (
      window.addEventListener("pointerdown", n, { passive: !0 }),
      () => window.removeEventListener("pointerdown", n)
    );
  }, [t]);
}

// Toile d'araignée (image de fond).
var nM = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%235E3F82' stroke-width='.9' opacity='.75'%3E%3Cpath d='M40 0L8 32M40 0L22 40M40 0L0 18M40 0v40M40 0H0'/%3E%3Cpath d='M28 0q2 6 12 12M16 0q4 12 24 24M6 0q6 20 34 34'/%3E%3C/g%3E%3C/svg%3E")`;

// Octobre rose : ruban et cœurs.
var hI = ({ taille = 18, c1: e = "#EC407A", c2: n = "#F06292", cls = "" }) =>
    U.default.createElement(
      "svg",
      { className: cls, viewBox: "0 0 24 30", width: taille, height: taille * 1.25, "aria-hidden": "true" },
      U.default.createElement("path", {
        d: "M12 2c-3.4 0-5.5 2.4-5.5 5.4 0 3.4 2.2 6.8 5.5 11.6 3.3-4.8 5.5-8.2 5.5-11.6C17.5 4.4 15.4 2 12 2zm0 3c1.5 0 2.5 1 2.5 2.5 0 1.6-1 3.5-2.5 6-1.5-2.5-2.5-4.4-2.5-6C9.5 6 10.5 5 12 5z",
        fill: e,
      }),
      U.default.createElement("path", {
        d: "M10 17 3.5 27.5l3.7-.4 1.7 3.4 5.3-9.4zM14 17l6.5 10.5-3.7-.4-1.7 3.4-5.3-9.4z",
        fill: n,
      }),
    ),
  pI = ({ style }) =>
    U.default.createElement(
      "span",
      { className: "amb-ruban-logo", style },
      U.default.createElement(hI, { taille: 15 }),
    );

// Octobre rose : guirlande.
function fI({ n: t = 9, apercu }) {
  return U.default.createElement(
    "div",
    { className: "amb-guirl" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
    U.default.createElement(
      "svg",
      { className: "amb-fil", viewBox: "0 0 300 24", preserveAspectRatio: "none" },
      U.default.createElement("path", {
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
        ? U.default.createElement(
            "span",
            {
              key: r,
              className: "amb-lanterne",
              style: { left: i + "%", animationDelay: (r % 5) * 0.37 + "s" },
            },
            U.default.createElement(hI, { taille: 13 }),
          )
        : U.default.createElement("span", { key: r, className: "amb-coeur", style: { left: i + "%" } });
    }),
  );
}

// Octobre rose : ballons qui s'envolent.
function DecorBallons({ apercu }) {
  return U.default.createElement(
    "div",
    { className: "amb-ballons" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
    [
      [12, 0, 34, "#EC407A"],
      [58, 1.2, 26, "#F48FB1"],
      [82, 0.5, 30, "#FFFFFF"],
      [34, 2, 22, "#F06292"],
    ].map(([e, n, r, i], o) =>
      U.default.createElement(
        "span",
        { key: o, style: { left: e + "%", animationDelay: n + "s" } },
        U.default.createElement(
          "svg",
          { viewBox: "0 0 30 50", width: r, height: r * 1.66 },
          U.default.createElement("path", {
            d: "M15 27C6 21 1 16 3.5 10 5.7 5.5 11 5.5 15 9.8 19 5.5 24.3 5.5 26.5 10 29 16 24 21 15 27z",
            fill: i,
            stroke: i === "#FFFFFF" ? "#F48FB1" : "none",
            strokeWidth: "1",
          }),
          U.default.createElement("path", {
            d: "M15 27c-1 6 2 10 0 16s2 6 0 7",
            stroke: "#C2185B",
            strokeWidth: ".9",
            fill: "none",
            opacity: ".6",
          }),
          U.default.createElement("ellipse", {
            cx: "10",
            cy: "12",
            rx: "2.4",
            ry: "3.4",
            fill: "#fff",
            opacity: ".45",
          }),
        ),
      ),
    ),
  );
}

// Octobre rose : village rose en bas de l'écran.
var rM = () =>
  U.default.createElement(
    "svg",
    {
      className: "amb-village",
      viewBox: "0 0 400 150",
      preserveAspectRatio: "xMidYMax slice",
      "aria-hidden": "true",
    },
    U.default.createElement("path", {
      d: "M0 98Q60 76 120 90t120-6 160 8V150H0z",
      fill: "#F3B3CB",
      opacity: ".6",
    }),
    U.default.createElement("path", { d: "M0 110Q100 98 200 106t200-4V150H0z", fill: "#C2507F" }),
    U.default.createElement(
      "g",
      { transform: "translate(184 52)" },
      U.default.createElement("path", {
        d: "M16 0C9 0 5 5 5 11c0 7 5 14 11 24 6-10 11-17 11-24C27 5 23 0 16 0zm0 6c3 0 5 2 5 5 0 3-2 7-5 12-3-5-5-9-5-12 0-3 2-5 5-5z",
        fill: "#EC407A",
      }),
      U.default.createElement("path", {
        d: "M12 33 2 54l7-1 3 7 10-19zM20 33l10 21-7-1-3 7-10-19z",
        fill: "#F06292",
      }),
    ),
    U.default.createElement("path", { d: "M0 124Q120 114 220 121t180-6V150H0z", fill: "#8E1E50" }),
    Array.from({ length: 22 }, (t, e) => {
      let n = 8 + e * 18 + (e % 3) * 4,
        r = 104 + (e % 4) * 4,
        i = ["#FFE3EE", "#F48FB1", "#FFFFFF", "#F8BBD0"][e % 4];
      return U.default.createElement(
        "g",
        { key: e },
        U.default.createElement("path", { d: `M${n} ${r + 8}v-8`, stroke: "#5E7A2E", strokeWidth: "1" }),
        [0, 72, 144, 216, 288].map((o) =>
          U.default.createElement("circle", {
            key: o,
            cx: n + 2.6 * Math.cos((o * Math.PI) / 180),
            cy: r + 2.6 * Math.sin((o * Math.PI) / 180),
            r: "2",
            fill: i,
          }),
        ),
        U.default.createElement("circle", { cx: n, cy: r, r: "1.3", fill: "#F2C14E" }),
      );
    }),
  );

// Octobre rose : aurore pour l'introduction.
function mI() {
  return U.default.createElement(
    "div",
    { className: "decor-magie amb-intro-r", "aria-hidden": "true" },
    U.default.createElement("div", { className: "amb-aurore" }),
    U.default.createElement("div", { className: "amb-bokeh-r" }),
    U.default.createElement(DecorBallons, { apercu: !0 }),
    U.default.createElement(rM, null),
  );
}
