/* ═══════════════════════════════════════════════════════════════════════
 *  SÉQUENCE D'INTRODUCTION — animation d'ouverture et écrans de bienvenue.
 * ═══════════════════════════════════════════════════════════════════════ */

// 1. Écran d'ouverture (à chaque lancement) : feuilles qui tombent, la pomme
//    qui atterrit, le slogan. Plus court pour un habitué, avec son prénom.
// 2. Présentation en 3 écrans (une seule fois, au tout premier lancement).
var BIENVENUE_KEY = "epicerie-raddonnaise-bienvenue-vue",
  mouvementReduit = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  FEUILLES = [
    { l: 8, t: 3.6, d: 0, s: 26, c: "#A9C75A", r: 220, x: 30 },
    { l: 22, t: 4.2, d: 0.5, s: 18, c: "#C9D6AE", r: -160, x: -20, erable: !0 },
    { l: 41, t: 3.9, d: 0.2, s: 22, c: "#8AAD3B", r: 260, x: 25 },
    { l: 63, t: 4.4, d: 0.8, s: 16, c: "#C9D6AE", r: -200, x: -30 },
    { l: 78, t: 3.7, d: 0.3, s: 28, c: "#A9C75A", r: 180, x: -25, erable: !0 },
    { l: 90, t: 4.6, d: 1.1, s: 18, c: "#8AAD3B", r: -240, x: 15 },
    { l: 52, t: 5, d: 1.4, s: 14, c: "#A9C75A", r: 300, x: 20 },
  ],
  Feuille = ({ f }) =>
    React.default.createElement(
      "svg",
      {
        className: "feuille",
        width: f.s,
        height: f.s,
        viewBox: "0 0 24 24",
        style: {
          left: f.l + "%",
          animationDuration: f.t + "s",
          animationDelay: f.d + "s",
          "--r": f.r + "deg",
          "--x": f.x + "px",
        },
      },
      f.erable
        ? React.default.createElement("path", {
            fill: f.c,
            d: "M12 2c-1 3-3 5-5 6 1 1 1 3 0 5 2-1 4 0 5 2 1-2 3-3 5-2-1-2-1-4 0-5-2-1-4-3-5-6zM12 15v7",
            stroke: f.c,
            strokeWidth: "1.2",
          })
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("path", {
              fill: f.c,
              d: "M12 2C6 6 4.5 11 6.5 16c1.3 3 3.6 4.7 5.5 6 1.9-1.3 4.2-3 5.5-6C19.5 11 18 6 12 2z",
            }),
            React.default.createElement("path", {
              d: "M12 5v16M12 10l-3-2M12 13l3-2M12 16l-3-2",
              stroke: "rgba(0,0,0,.18)",
              strokeWidth: "1",
              fill: "none",
            }),
          ),
    ),
  w9 = (t) =>
    t?.logo === "rose" || Re(t) === "octobrerose"
      ? "logo-rose.png"
      : nn[Re(t)]
        ? nn[Re(t)].logo
        : t?.magie && t.id === "noel"
          ? "logo-noel.png"
          : Re(t) === "halloween"
            ? "logo-halloween.png"
            : "logo-intro.png";

// Animation d'ouverture de l'appli (logo, thème du moment).
function Intro({ moi, prenom, onEnd, onSortie, theme, tampons, actif = !0 }) {
  let l = (prenom || (moi?.nom ? moi.nom.trim().split(/\s+/)[0] : "")).trim(),
    u = !!l,
    d = mouvementReduit() ? 900 : u ? 3e3 : 4200,
    [out, setOut] = (0, React.useState)(!1),
    m = (0, React.useRef)(!1),
    E = () => {
      m.current || ((m.current = !0), setOut(!0), onSortie?.(), setTimeout(onEnd, 550));
    };
  (0, React.useEffect)(() => {
    if (!actif) return;
    let D = setTimeout(E, d);
    return () => clearTimeout(D);
  }, [actif]);
  let F = moi?.points || 0;
  return React.default.createElement(
    "div",
    {
      className: "intro" + (out ? " out" : ""),
      onClick: E,
      role: "presentation",
      style: theme ? { background: MI(theme) } : void 0,
    },
    theme?.magie && React.default.createElement(CielEtoile, null),
    Re(theme) === "halloween" && React.default.createElement(cI, null),
    Re(theme) === "octobrerose" && React.default.createElement(mI, null),
    hc.includes(Re(theme)) && React.default.createElement(II, { id: Re(theme) }),
    React.default.createElement("div", { className: "halo" }),
    theme
      ? React.default.createElement(Particules, { theme, nb: 18 })
      : FEUILLES.map((D, M) => React.default.createElement(Feuille, { key: M, f: D })),
    React.default.createElement("img", {
      className: "logo",
      src: w9(theme),
      alt: "Épicerie Raddonnaise",
      onError: (D) => {
        D.target.src.endsWith("logo-intro.png") || (D.target.src = "logo-intro.png");
      },
    }),
    u
      ? React.default.createElement(
          "div",
          { className: "accueil-perso" },
          React.default.createElement("div", { className: "bonjour" }, "Bonjour ", l, " !"),
          React.default.createElement(
            "div",
            { className: "bienv-txt" },
            "Bienvenue sur l'application de l'épicerie",
          ),
          theme
            ? React.default.createElement(
                "div",
                { className: "slogan", style: { fontSize: 24 } },
                theme.phrase || theme.titre,
              )
            : moi &&
                (tampons
                  ? React.default.createElement(
                      "div",
                      { className: "pts-chip" },
                      "🍏 ",
                      moi.tampons || 0,
                      " tampon",
                      (moi.tampons || 0) > 1 ? "s" : "",
                      " sur votre carte",
                    )
                  : React.default.createElement(
                      "div",
                      { className: "pts-chip" },
                      F,
                      " point",
                      F > 1 ? "s" : "",
                      " sur votre carte",
                    )),
        )
      : React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            "div",
            { className: "slogan" },
            theme ? theme.phrase || theme.titre : "Votre épicerie, tout près de chez vous",
          ),
          React.default.createElement(
            "div",
            { className: "bienv-txt", style: { position: "relative" } },
            "Bienvenue sur l'application de l'épicerie",
          ),
        ),
    React.default.createElement(
      "div",
      {
        className: "lieu",
        style: theme?.magie
          ? { color: "#3B4F6B", zIndex: 2 }
          : Re(theme)
            ? { color: "#FFB547", zIndex: 2 }
            : void 0,
      },
      "Raddon-et-Chapendu",
    ),
  );
}

// Illustrations des écrans de présentation (dessin au trait, couleurs de la marque)
var Illu = {
  jour: React.default.createElement(
    "svg",
    {
      viewBox: "0 0 120 120",
      width: "120",
      height: "120",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("path", {
      d: "M22 50h76l-8 46a6 6 0 0 1-6 5H36a6 6 0 0 1-6-5z",
      fill: "#fff",
      stroke: "#1C433B",
      strokeWidth: "3.5",
    }),
    React.default.createElement("path", {
      d: "M40 50 54 24M80 50 66 24",
      stroke: "#1C433B",
      strokeWidth: "3.5",
    }),
    React.default.createElement("circle", { cx: "48", cy: "44", r: "11", fill: "#E05A47" }),
    React.default.createElement("path", { d: "M48 33c1-4 4-5 6-5", stroke: "#6E9B3A", strokeWidth: "3" }),
    React.default.createElement("circle", { cx: "70", cy: "42", r: "12", fill: "#A9C75A" }),
    React.default.createElement("path", { d: "M70 30v-4", stroke: "#5C3D2E", strokeWidth: "3" }),
    React.default.createElement("path", { d: "M86 46c2-10 8-14 14-14-1 8-6 13-14 14z", fill: "#6E9B3A" }),
    React.default.createElement("path", { d: "M44 70h32M44 82h22", stroke: "#C9D6AE", strokeWidth: "4" }),
  ),
  plateau: React.default.createElement(
    "svg",
    {
      viewBox: "0 0 120 120",
      width: "120",
      height: "120",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("ellipse", {
      cx: "60",
      cy: "78",
      rx: "46",
      ry: "16",
      fill: "#fff",
      stroke: "#1C433B",
      strokeWidth: "3.5",
    }),
    React.default.createElement("path", {
      d: "M30 74c4-10 14-12 20-6M52 70c6-12 18-12 24-2",
      stroke: "#C27B42",
      strokeWidth: "6",
    }),
    React.default.createElement("circle", { cx: "80", cy: "70", r: "6", fill: "#E05A47" }),
    React.default.createElement("circle", { cx: "90", cy: "74", r: "5", fill: "#E05A47" }),
    React.default.createElement("path", {
      d: "M38 64l10-10 8 8-10 6z",
      fill: "#F2C94C",
      stroke: "#C69A3C",
      strokeWidth: "2",
    }),
    React.default.createElement("circle", { cx: "66", cy: "60", r: "4", fill: "#8AAD3B" }),
    React.default.createElement("circle", { cx: "72", cy: "57", r: "4", fill: "#8AAD3B" }),
    React.default.createElement("circle", { cx: "69", cy: "52", r: "4", fill: "#8AAD3B" }),
    React.default.createElement("path", {
      d: "M60 30v8M48 34l3 6M72 34l-3 6",
      stroke: "#C69A3C",
      strokeWidth: "3",
    }),
  ),
  carte: React.default.createElement(
    "svg",
    {
      viewBox: "0 0 120 120",
      width: "120",
      height: "120",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("rect", {
      x: "16",
      y: "30",
      width: "88",
      height: "58",
      rx: "10",
      fill: "#1C433B",
    }),
    [0, 1, 2, 3, 4].map((t) =>
      React.default.createElement("circle", {
        key: t,
        cx: 32 + t * 14,
        cy: "66",
        r: "5.5",
        fill: t < 3 ? "#A9C75A" : "none",
        stroke: t < 3 ? "none" : "rgba(255,255,255,.4)",
        strokeWidth: "2",
      }),
    ),
    React.default.createElement("path", {
      d: "M28 46h34",
      stroke: "rgba(255,255,255,.85)",
      strokeWidth: "4",
    }),
    React.default.createElement("path", {
      d: "m92 22 3.5 7 7.5 1-5.5 5.3 1.3 7.7L92 39.4 85.2 43l1.3-7.7L81 30l7.5-1z",
      fill: "#F0C860",
      stroke: "#C69A3C",
      strokeWidth: "1.5",
    }),
    React.default.createElement("rect", {
      x: "70",
      y: "40",
      width: "24",
      height: "24",
      rx: "3",
      fill: "#fff",
    }),
    React.default.createElement("path", {
      d: "M74 44h6v6h-6zM84 44h6v6h-6zM74 54h6v6h-6zM86 56h2v2h-2z",
      fill: "#1C433B",
    }),
  ),
};

// Écrans de bienvenue lors de la première ouverture.
function Bienvenue({ d: t, onFin }) {
  let n = [
      {
        id: "jour",
        titre: "Le frais du jour",
        texte:
          "Fruits, légumes, plats maison et bonnes affaires : voyez ce qui vous attend avant même de passer.",
      },
      t.onglets?.carte !== !1 && {
        id: "plateau",
        titre: "Plateaux & paniers",
        texte:
          "Apéritifs, paniers garnis, corbeilles de fruits : choisissez en photo, on prépare tout pour vous.",
      },
      t.onglets?.fidelite !== !1 &&
        t.fidelite?.active && {
          id: "carte",
          titre: "Votre carte de fidélité",
          texte:
            "Des points à chaque passage en caisse, des récompenses à la clé. Votre carte tient dans votre téléphone.",
        },
    ].filter(Boolean),
    r = (0, React.useRef)(null),
    [i, setI] = (0, React.useState)(0),
    s = i === n.length - 1,
    l = (h) =>
      r.current?.scrollTo({
        left: h * r.current.clientWidth,
        behavior: mouvementReduit() ? "auto" : "smooth",
      }),
    u = (h) => {
      try {
        localStorage.setItem(BIENVENUE_KEY, "1");
      } catch {}
      onFin(h);
    },
    d = n[n.length - 1]?.id === "carte";
  return React.default.createElement(
    "div",
    { className: "bienv" },
    React.default.createElement("button", { className: "passer", onClick: () => u() }, "Passer"),
    React.default.createElement(
      "div",
      {
        className: "rail",
        ref: r,
        onScroll: (h) => setI(Math.round(h.currentTarget.scrollLeft / h.currentTarget.clientWidth)),
      },
      n.map((h, f) =>
        React.default.createElement(
          "section",
          { className: "ecran" + (f === i ? " vu" : ""), key: h.id },
          React.default.createElement(
            "div",
            { className: "illu" },
            React.default.createElement("span", { className: "rond" }),
            Illu[h.id],
          ),
          React.default.createElement("h2", null, h.titre),
          React.default.createElement("p", null, h.texte),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "bas" },
      React.default.createElement(
        "div",
        { className: "pastilles" },
        n.map((h, f) =>
          React.default.createElement("i", {
            key: h.id,
            className: f === i ? "on" : "",
            onClick: () => l(f),
          }),
        ),
      ),
      s
        ? d
          ? React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "button",
                { className: "btn", onClick: () => u("carte") },
                "Créer ma carte de fidélité",
              ),
              React.default.createElement(
                "button",
                { className: "btn gh", style: { marginTop: 8 }, onClick: () => u() },
                "Découvrir l'épicerie",
              ),
            )
          : React.default.createElement("button", { className: "btn", onClick: () => u() }, "C'est parti")
        : React.default.createElement("button", { className: "btn", onClick: () => l(i + 1) }, "Suivant"),
    ),
  );
}
