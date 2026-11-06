/* ═══════════════════════════════════════════════════════════════════════
 *  ROUE DE NOËL (1/2) — réglages par défaut, tirage au sort équitable, sons, dessin de la roue et règlement du jeu.
 * ═══════════════════════════════════════════════════════════════════════ */

// Roue de Noël : réglages par défaut, période en cours, tickets de chaque client, tirage équitable.
var K = en(hn()),
  LS = {
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
  oc = (t) => ({
    ...LS,
    ...(t || {}),
    tirages: Array.isArray(t?.tirages) ? t.tirages : LS.tirages,
    periode: Number(t?.periode) || 0,
  }),
  F9 = (t = new Date()) => t.toLocaleDateString("sv-SE"),
  BS = (t, e = new Date()) => {
    let n = oc(t),
      r = F9(e);
    return !!n.active && (!n.debut || r >= n.debut) && (!n.fin || r <= n.fin);
  },
  sw = () => {
    let t = new Uint32Array(1);
    return crypto.getRandomValues(t), t[0] / 4294967296;
  };

// Prépare le lien de transfert (carte, commandes, conversation).
var D9 = (t, e) => (t && Number(t.roueP) === oc(e).periode && Number(t.roueG)) || 0,
  P9 = (t) =>
    String(
      t?.prenom ||
        String(t?.nom || "")
          .trim()
          .split(/\s+/)[0] ||
        "Client",
    ).trim();

// Participants au tirage (clients qui n'ont pas refusé, avec leurs tickets) ; sons.
var VS = (t, e) =>
    (t || [])
      .filter((n) => !n.roueNon)
      .map((n) => ({ id: String(n.id), prenom: P9(n), nom: n.nom || "", tickets: D9(n, e) }))
      .filter((n) => n.tickets > 0),
  Qi = null,
  zS = () => {
    try {
      navigator.audioSession && (navigator.audioSession.type = "playback");
    } catch {}
    try {
      (Qi = Qi || new (window.AudioContext || window.webkitAudioContext)()),
        Qi.state === "suspended" && Qi.resume();
    } catch {
      Qi = null;
    }
    return Qi;
  };

// Son : « tic » de la roue.
function jS(t = 1) {
  let e = Qi;
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
function US(t) {
  let e = Qi;
  if (!e) return;
  (t ? [523, 659, 784, 1047] : [392, 330]).forEach((r, i) => {
    try {
      let s = e.currentTime + i * 0.13,
        o = e.createOscillator(),
        a = e.createGain();
      (o.type = "triangle"),
        (o.frequency.value = r),
        a.gain.setValueAtTime(1e-4, s),
        a.gain.exponentialRampToValueAtTime(0.25, s + 0.02),
        a.gain.exponentialRampToValueAtTime(1e-4, s + (t ? 0.5 : 0.35)),
        o.connect(a).connect(e.destination),
        o.start(s),
        o.stop(s + 0.6);
    } catch {}
  });
}

// Couleurs des ampoules autour de la roue.
var sc = ["#FF4D5E", "#FFD86B", "#5FD068", "#7FC8FF", "#FFFFFF"];

// Lit un lien de transfert reçu.
function M9({ vite }) {
  let r = [];
  for (let s = 0; s < 3; s++)
    for (let o of [0.15, 0.38, 0.62, 0.85]) r.push([s * 100 + 100 * o, 6 + 80 * o * (1 - o)]);
  let i = (s) =>
    "M-5 " +
    s +
    Array.from(
      { length: 3 },
      (o, a) => " Q" + (a * 100 + 50) + " " + (s + 40) + " " + (a * 100 + 100 + (a === 2 ? 5 : 0)) + " " + s,
    ).join("");
  return K.default.createElement(
    "svg",
    {
      className: "guirl" + (vite ? " vite" : ""),
      viewBox: "0 0 300 66",
      preserveAspectRatio: "xMidYMin meet",
      "aria-hidden": "true",
    },
    K.default.createElement("path", {
      d: i(6),
      fill: "none",
      stroke: "#174A22",
      strokeWidth: "11",
      strokeLinecap: "round",
    }),
    K.default.createElement("path", {
      d: i(6),
      fill: "none",
      stroke: "#2E8B3A",
      strokeWidth: "13",
      strokeDasharray: "1.5 3.2",
      strokeLinecap: "round",
    }),
    K.default.createElement("path", {
      d: i(9),
      fill: "none",
      stroke: "#E9B949",
      strokeWidth: "1.2",
      strokeDasharray: "5 3",
      opacity: ".8",
    }),
    r.map(([s, o], a) =>
      K.default.createElement(
        "g",
        { key: a, transform: `translate(${s} ${o + 3}) rotate(${((a % 3) - 1) * 12})` },
        K.default.createElement("rect", {
          x: "-2.6",
          y: "0",
          width: "5.2",
          height: "4.5",
          rx: "1",
          fill: "#C9A13B",
        }),
        K.default.createElement("ellipse", {
          className: "amp-g c" + (a % 2),
          cx: "0",
          cy: "11",
          rx: "5",
          ry: "7.5",
          fill: sc[a % sc.length],
          style: { color: sc[a % sc.length], animationDelay: (a % 3) * 0.25 + "s" },
        }),
      ),
    ),
  );
}

// Roue : 8 parts, angle de chaque part, calcul des positions.
var qS = 8,
  br = 360 / qS,
  rw = (t, e) => [e * Math.sin((t * Math.PI) / 180), -e * Math.cos((t * Math.PI) / 180)];

// Dessin de la roue (parts vertes « gagné » et rouges « perdu » en alternance).
function RoueSvg({ angle = 0, taille = 300, tourne }) {
  return K.default.createElement(
    "svg",
    {
      className: "roue-svg" + (tourne ? " vite" : ""),
      viewBox: "-118 -122 236 240",
      width: taille,
      height: (taille * 240) / 236,
      style: { display: "block", overflow: "visible" },
      "aria-hidden": "true",
    },
    K.default.createElement(
      "defs",
      null,
      K.default.createElement(
        "radialGradient",
        {
          id: "rv",
          cx: "0",
          cy: "0",
          r: "1",
          gradientUnits: "userSpaceOnUse",
          gradientTransform: "scale(100)",
        },
        K.default.createElement("stop", { offset: ".25", stopColor: "#3E8E3A" }),
        K.default.createElement("stop", { offset: "1", stopColor: "#1F6B2B" }),
      ),
      K.default.createElement(
        "radialGradient",
        {
          id: "rr",
          cx: "0",
          cy: "0",
          r: "1",
          gradientUnits: "userSpaceOnUse",
          gradientTransform: "scale(100)",
        },
        K.default.createElement("stop", { offset: ".25", stopColor: "#D8394A" }),
        K.default.createElement("stop", { offset: "1", stopColor: "#A61E2F" }),
      ),
      K.default.createElement(
        "linearGradient",
        { id: "ror", x1: "0", y1: "-1", x2: "0", y2: "1" },
        K.default.createElement("stop", { offset: "0", stopColor: "#FFF3C4" }),
        K.default.createElement("stop", { offset: ".5", stopColor: "#E9B949" }),
        K.default.createElement("stop", { offset: "1", stopColor: "#B8860B" }),
      ),
    ),
    K.default.createElement("circle", { r: "114", fill: "url(#ror)" }),
    K.default.createElement("circle", { r: "106", fill: "#5B1520" }),
    Array.from({ length: 16 }, (i, s) => {
      let [o, a] = rw(s * 22.5, 110),
        u = sc[s % 4];
      return K.default.createElement("circle", {
        key: "l" + s,
        className: "amp c" + (s % 2),
        cx: o,
        cy: a,
        r: "4.4",
        fill: u,
        style: { color: u, animationDelay: (s % 4) * 0.12 + "s" },
      });
    }),
    K.default.createElement(
      "g",
      { transform: `rotate(${angle})` },
      Array.from({ length: qS }, (i, s) => {
        let o = s * br - br / 2,
          a = o + br,
          [u, d] = rw(o, 100),
          [h, p] = rw(a, 100),
          m = s % 2 === 0;
        return K.default.createElement(
          "g",
          { key: s },
          K.default.createElement("path", {
            d: `M0 0 L${u} ${d} A100 100 0 0 1 ${h} ${p} Z`,
            fill: m ? "url(#rv)" : "url(#rr)",
            stroke: "#FFE9A8",
            strokeWidth: "1.6",
          }),
          K.default.createElement(
            "text",
            {
              transform: `rotate(${s * br - 90}) translate(64 0)`,
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
    K.default.createElement("circle", { r: "22", fill: "url(#ror)", stroke: "#FFF3C4", strokeWidth: "2" }),
    K.default.createElement(
      "text",
      { textAnchor: "middle", dominantBaseline: "central", fontSize: "24" },
      "❄\uFE0F",
    ),
    K.default.createElement("path", {
      d: "M0 -100 L-11 -124 L11 -124 Z",
      fill: "url(#ror)",
      stroke: "#7A5A0B",
      strokeWidth: "1.5",
      transform: "translate(0 0)",
    }),
  );
}

// Animation de la rotation de la roue jusqu'à la part tirée.
function L9() {
  let [t, e] = (0, K.useState)(0),
    n = (0, K.useRef)(0),
    r = (0, K.useRef)(0);
  return (
    (0, K.useEffect)(() => () => cancelAnimationFrame(r.current), []),
    [
      t,
      (s, o) => {
        let u = [0, 2, 4, 6].map((I) => (s ? I : I + 1))[Math.floor(sw() * 4)],
          d = (sw() - 0.5) * (br * 0.7),
          h = (((360 - (u * br + d)) % 360) + 360) % 360,
          p = n.current,
          m = ((p % 360) + 360) % 360,
          w = p + 360 * 5 + ((h - m + 360) % 360),
          E = 6e3,
          A = performance.now(),
          S = Math.floor((p + br / 2) / br),
          _ = (I) => {
            let T = Math.min(1, (I - A) / E),
              M = 1 - Math.pow(1 - T, 3),
              V = p + (w - p) * M,
              O = Math.floor((V + br / 2) / br);
            O !== S && ((S = O), jS(0.6 + 0.4 * (1 - T))),
              (n.current = V),
              e(V),
              T < 1 ? (r.current = requestAnimationFrame(_)) : o();
          };
        r.current = requestAnimationFrame(_);
      },
    ]
  );
}

// Règlement de la roue de Noël (jeu gratuit, réservé aux 18 ans et plus).
function ReglementRoue({ onClose }) {
  return K.default.createElement(
    "div",
    { className: "roue-regl" },
    K.default.createElement("h3", null, "Règlement de la roue de Noël"),
    K.default.createElement(
      "ol",
      null,
      K.default.createElement(
        "li",
        null,
        "Jeu gratuit organisé par l'Épicerie Raddonnaise (Raddon-et-Chapendu), réservé aux personnes de 18 ans et plus titulaires de la carte de fidélité, pendant la période fixée par l'épicerie.",
      ),
      K.default.createElement(
        "li",
        null,
        "Chaque tampon reçu en caisse donne droit à un tour de roue. Le résultat est tiré au hasard au moment du tampon, avec une chance sur deux de gagner : 4 parts « Gagné » et 4 parts « Perdu ».",
      ),
      K.default.createElement(
        "li",
        null,
        "Les tours pas encore joués sont gardés : vous pouvez les jouer plus tard dans l'application. Sans téléphone, vous participez aussi : le résultat s'affiche à la caisse.",
      ),
      K.default.createElement(
        "li",
        null,
        "Chaque « Gagné » donne un ticket pour le prochain tirage au sort. Plus vous avez de tickets, plus vous avez de chances. Après chaque tirage, les tickets repartent à zéro.",
      ),
      K.default.createElement(
        "li",
        null,
        "Si un passage en caisse est annulé, le tour de roue et le ticket éventuel de ce passage sont annulés aussi.",
      ),
      K.default.createElement(
        "li",
        null,
        "Les tirages ont lieu à l'épicerie, aux dates choisies par l'épicerie, par un tirage au hasard effectué par l'application. Un même participant peut gagner plusieurs tirages.",
      ),
      K.default.createElement(
        "li",
        null,
        "Le gagnant est prévenu par e-mail et par notification. Son prénom est affiché dans l'application. Les lots sont une surprise et sont à retirer à l'épicerie, sans limite de date.",
      ),
      K.default.createElement(
        "li",
        null,
        "Vous pouvez refuser de participer à tout moment, et changer d'avis dans « Mes données ».",
      ),
    ),
    K.default.createElement("button", { className: "roue-b2", onClick: onClose }, "Fermer"),
  );
}
