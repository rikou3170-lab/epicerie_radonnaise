/* ═══════════════════════════════════════════════════════════════════════
 *  ROUE DE NOËL (1/2) — réglages par défaut, tirage au sort équitable, sons, dessin de la roue et règlement du jeu.
 * ═══════════════════════════════════════════════════════════════════════ */

// Roue de Noël : réglages par défaut (dates, tirages) et période en cours.
var W = On(Ln()),
  WI = {
    active: !1,
    debut: "2026-12-01",
    fin: "2026-12-24",
    periode: 0,
    annonce: null,
    tirages: [
      { id: "t1", date: "2026-12-15", titre: "Tirage de mi-décembre" },
      { id: "t2", date: "2026-12-24", titre: "Grand tirage du 24 décembre" },
    ],
  },
  l2 = (t) => ({
    ...WI,
    ...(t || {}),
    tirages: Array.isArray(t?.tirages) ? t.tirages : WI.tirages,
    periode: Number(t?.periode) || 0,
  });

// Nombre aléatoire sûr (tirage équitable).
var GI = () => {
  let t = new Uint32Array(1);
  return crypto.getRandomValues(t), t[0] / 4294967296;
};

// Nombre de tours déjà gagnés par le client pendant la période.
var KI = (t, e) => (t && Number(t.roueP) === l2(e).periode && Number(t.roueG)) || 0;

// Son : prépare le haut-parleur (iPhone compris).
var $i = null,
  MM = () => {
    try {
      navigator.audioSession && (navigator.audioSession.type = "playback");
    } catch {}
    try {
      ($i = $i || new (window.AudioContext || window.webkitAudioContext)()),
        $i.state === "suspended" && $i.resume();
    } catch {
      $i = null;
    }
    return $i;
  };

// Son : « tic » de la roue.
function OM(t = 1) {
  let e = $i;
  if (e)
    try {
      let n = e.currentTime,
        r = e.createOscillator(),
        i = e.createGain();
      (r.type = "square"),
        r.frequency.setValueAtTime(1800, n),
        r.frequency.exponentialRampToValueAtTime(900, n + 0.03),
        i.gain.setValueAtTime(0.12 * t, n),
        i.gain.exponentialRampToValueAtTime(1e-4, n + 0.045),
        r.connect(i).connect(e.destination),
        r.start(n),
        r.stop(n + 0.05);
    } catch {}
}

// Son : petite mélodie gagné / perdu.
function LM(t) {
  let e = $i;
  if (!e) return;
  (t ? [523, 659, 784, 1047] : [392, 330]).forEach((r, i) => {
    try {
      let o = e.currentTime + i * 0.13,
        s = e.createOscillator(),
        l = e.createGain();
      (s.type = "triangle"),
        (s.frequency.value = r),
        l.gain.setValueAtTime(1e-4, o),
        l.gain.exponentialRampToValueAtTime(0.25, o + 0.02),
        l.gain.exponentialRampToValueAtTime(1e-4, o + (t ? 0.5 : 0.35)),
        s.connect(l).connect(e.destination),
        s.start(o),
        s.stop(o + 0.6);
    } catch {}
  });
}

// Couleurs des ampoules autour de la roue.
var mc = ["#FF4D5E", "#FFD86B", "#5FD068", "#7FC8FF", "#FFFFFF"];

// Guirlande lumineuse autour de la roue.
function BM({ vite }) {
  let r = [];
  for (let o = 0; o < 3; o++)
    for (let s of [0.15, 0.38, 0.62, 0.85]) r.push([o * 100 + 100 * s, 6 + 80 * s * (1 - s)]);
  let i = (o) =>
    "M-5 " +
    o +
    Array.from(
      { length: 3 },
      (s, l) => " Q" + (l * 100 + 50) + " " + (o + 40) + " " + (l * 100 + 100 + (l === 2 ? 5 : 0)) + " " + o,
    ).join("");
  return W.default.createElement(
    "svg",
    {
      className: "guirl" + (vite ? " vite" : ""),
      viewBox: "0 0 300 66",
      preserveAspectRatio: "xMidYMin meet",
      "aria-hidden": "true",
    },
    W.default.createElement("path", {
      d: i(6),
      fill: "none",
      stroke: "#174A22",
      strokeWidth: "11",
      strokeLinecap: "round",
    }),
    W.default.createElement("path", {
      d: i(6),
      fill: "none",
      stroke: "#2E8B3A",
      strokeWidth: "13",
      strokeDasharray: "1.5 3.2",
      strokeLinecap: "round",
    }),
    W.default.createElement("path", {
      d: i(9),
      fill: "none",
      stroke: "#E9B949",
      strokeWidth: "1.2",
      strokeDasharray: "5 3",
      opacity: ".8",
    }),
    r.map(([o, s], l) =>
      W.default.createElement(
        "g",
        { key: l, transform: `translate(${o} ${s + 3}) rotate(${((l % 3) - 1) * 12})` },
        W.default.createElement("rect", {
          x: "-2.6",
          y: "0",
          width: "5.2",
          height: "4.5",
          rx: "1",
          fill: "#C9A13B",
        }),
        W.default.createElement("ellipse", {
          className: "amp-g c" + (l % 2),
          cx: "0",
          cy: "11",
          rx: "5",
          ry: "7.5",
          fill: mc[l % mc.length],
          style: { color: mc[l % mc.length], animationDelay: (l % 3) * 0.25 + "s" },
        }),
      ),
    ),
  );
}

// Roue : 8 parts, angle de chaque part, calcul des positions.
var QI = 8,
  gr = 360 / QI,
  a2 = (t, e) => [e * Math.sin((t * Math.PI) / 180), -e * Math.cos((t * Math.PI) / 180)];

// Dessin de la roue (parts vertes « gagné » et rouges « perdu » en alternance).
function RoueSvg({ angle = 0, taille = 300, tourne }) {
  return W.default.createElement(
    "svg",
    {
      className: "roue-svg" + (tourne ? " vite" : ""),
      viewBox: "-118 -122 236 240",
      width: taille,
      height: (taille * 240) / 236,
      style: { display: "block", overflow: "visible" },
      "aria-hidden": "true",
    },
    W.default.createElement(
      "defs",
      null,
      W.default.createElement(
        "radialGradient",
        {
          id: "rv",
          cx: "0",
          cy: "0",
          r: "1",
          gradientUnits: "userSpaceOnUse",
          gradientTransform: "scale(100)",
        },
        W.default.createElement("stop", { offset: ".25", stopColor: "#3E8E3A" }),
        W.default.createElement("stop", { offset: "1", stopColor: "#1F6B2B" }),
      ),
      W.default.createElement(
        "radialGradient",
        {
          id: "rr",
          cx: "0",
          cy: "0",
          r: "1",
          gradientUnits: "userSpaceOnUse",
          gradientTransform: "scale(100)",
        },
        W.default.createElement("stop", { offset: ".25", stopColor: "#D8394A" }),
        W.default.createElement("stop", { offset: "1", stopColor: "#A61E2F" }),
      ),
      W.default.createElement(
        "linearGradient",
        { id: "ror", x1: "0", y1: "-1", x2: "0", y2: "1" },
        W.default.createElement("stop", { offset: "0", stopColor: "#FFF3C4" }),
        W.default.createElement("stop", { offset: ".5", stopColor: "#E9B949" }),
        W.default.createElement("stop", { offset: "1", stopColor: "#B8860B" }),
      ),
    ),
    W.default.createElement("circle", { r: "114", fill: "url(#ror)" }),
    W.default.createElement("circle", { r: "106", fill: "#5B1520" }),
    Array.from({ length: 16 }, (i, o) => {
      let [s, l] = a2(o * 22.5, 110),
        u = mc[o % 4];
      return W.default.createElement("circle", {
        key: "l" + o,
        className: "amp c" + (o % 2),
        cx: s,
        cy: l,
        r: "4.4",
        fill: u,
        style: { color: u, animationDelay: (o % 4) * 0.12 + "s" },
      });
    }),
    W.default.createElement(
      "g",
      { transform: `rotate(${angle})` },
      Array.from({ length: QI }, (i, o) => {
        let s = o * gr - gr / 2,
          l = s + gr,
          [u, d] = a2(s, 100),
          [h, f] = a2(l, 100),
          m = o % 2 === 0;
        return W.default.createElement(
          "g",
          { key: o },
          W.default.createElement("path", {
            d: `M0 0 L${u} ${d} A100 100 0 0 1 ${h} ${f} Z`,
            fill: m ? "url(#rv)" : "url(#rr)",
            stroke: "#FFE9A8",
            strokeWidth: "1.6",
          }),
          W.default.createElement(
            "text",
            {
              transform: `rotate(${o * gr - 90}) translate(64 0)`,
              textAnchor: "middle",
              dominantBaseline: "central",
              style: {
                fontFamily: "'Nunito', system-ui, sans-serif",
                fontWeight: 900,
                fontSize: 15,
                letterSpacing: 1.5,
              },
              fill: "#FFFFFF",
            },
            m ? "GAGNÉ" : "PERDU",
          ),
        );
      }),
    ),
    W.default.createElement("circle", { r: "22", fill: "url(#ror)", stroke: "#FFF3C4", strokeWidth: "2" }),
    W.default.createElement(
      "text",
      { textAnchor: "middle", dominantBaseline: "central", fontSize: "24" },
      "❄\uFE0F",
    ),
    W.default.createElement("path", {
      d: "M0 -100 L-11 -124 L11 -124 Z",
      fill: "url(#ror)",
      stroke: "#7A5A0B",
      strokeWidth: "1.5",
      transform: "translate(0 0)",
    }),
  );
}

// Animation de la rotation de la roue jusqu'à la part tirée.
function VM() {
  let [t, e] = (0, W.useState)(0),
    n = (0, W.useRef)(0),
    r = (0, W.useRef)(0);
  return (
    (0, W.useEffect)(() => () => cancelAnimationFrame(r.current), []),
    [
      t,
      (o, s) => {
        let u = [0, 2, 4, 6].map((A) => (o ? A : A + 1))[Math.floor(GI() * 4)],
          d = (GI() - 0.5) * (gr * 0.7),
          h = (((360 - (u * gr + d)) % 360) + 360) % 360,
          f = n.current,
          m = ((f % 360) + 360) % 360,
          E = f + 360 * 5 + ((h - m + 360) % 360),
          F = 6e3,
          D = performance.now(),
          M = Math.floor((f + gr / 2) / gr),
          C = (A) => {
            let S = Math.min(1, (A - D) / F),
              P = 1 - Math.pow(1 - S, 3),
              z = f + (E - f) * P,
              j = Math.floor((z + gr / 2) / gr);
            j !== M && ((M = j), OM(0.6 + 0.4 * (1 - S))),
              (n.current = z),
              e(z),
              S < 1 ? (r.current = requestAnimationFrame(C)) : s();
          };
        r.current = requestAnimationFrame(C);
      },
    ]
  );
}

// Règlement de la roue de Noël (jeu gratuit, réservé aux 18 ans et plus).
function ReglementRoue({ onClose }) {
  return W.default.createElement(
    "div",
    { className: "roue-regl" },
    W.default.createElement("h3", null, "Règlement de la roue de Noël"),
    W.default.createElement(
      "ol",
      null,
      W.default.createElement(
        "li",
        null,
        "Jeu gratuit organisé par l'Épicerie Raddonnaise (Raddon-et-Chapendu), réservé aux personnes de 18 ans et plus titulaires de la carte de fidélité, pendant la période fixée par l'épicerie.",
      ),
      W.default.createElement(
        "li",
        null,
        "Chaque tampon reçu en caisse donne droit à un tour de roue. Le résultat est tiré au hasard au moment du tampon, avec une chance sur deux de gagner : 4 parts « Gagné » et 4 parts « Perdu ».",
      ),
      W.default.createElement(
        "li",
        null,
        "Les tours pas encore joués sont gardés : vous pouvez les jouer plus tard dans l'application. Sans téléphone, vous participez aussi : le résultat s'affiche à la caisse.",
      ),
      W.default.createElement(
        "li",
        null,
        "Chaque « Gagné » donne un ticket pour le prochain tirage au sort. Plus vous avez de tickets, plus vous avez de chances. Après chaque tirage, les tickets repartent à zéro.",
      ),
      W.default.createElement(
        "li",
        null,
        "Si un passage en caisse est annulé, le tour de roue et le ticket éventuel de ce passage sont annulés aussi.",
      ),
      W.default.createElement(
        "li",
        null,
        "Les tirages ont lieu à l'épicerie, aux dates choisies par l'épicerie, par un tirage au hasard effectué par l'application. Un même participant peut gagner plusieurs tirages.",
      ),
      W.default.createElement(
        "li",
        null,
        "Le gagnant est prévenu par e-mail et par notification. Son prénom est affiché dans l'application. Les lots sont une surprise et sont à retirer à l'épicerie, sans limite de date.",
      ),
      W.default.createElement(
        "li",
        null,
        "Vous pouvez refuser de participer à tout moment, et changer d'avis dans « Mes données ».",
      ),
    ),
    W.default.createElement("button", { className: "roue-b2", onClick: onClose }, "Fermer"),
  );
}
