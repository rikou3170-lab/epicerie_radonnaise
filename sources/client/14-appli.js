var s2 = { active: !0, points: 200, euros: 5 },
  PM = (t) => {
    let e = t?.remise;
    if (!e || e.active === !1) return null;
    let n = Math.max(1, parseInt(e.points) || s2.points),
      r = Math.max(0, Number(String(e.euros ?? s2.euros).replace(",", ".")) || s2.euros);
    return { points: n, euros: r };
  },
  pc = (t) =>
    (Math.round((Number(t) || 0) * 100) / 100).toFixed(2).replace(".", ",").replace(",00", "") + " \u20AC";
function qI(t, e) {
  let n = PM(t);
  if (!n) return null;
  let r = Math.max(0, e || 0),
    i = Math.floor(r / n.points);
  return {
    ...n,
    nb: i,
    valeur: i * n.euros,
    manque: n.points - (r % n.points),
    progres: (r % n.points) / n.points,
  };
}
var UI = {
    nb: 20,
    palier: 10,
    seuil: 10,
    recompense1: "un cadeau surprise",
    recompense: "un chouette cadeau surprise",
    exclus: "carburant, gaz et alcool",
    delai: 30,
  },
  fc = () => !0,
  Ho = (t) => {
    let e = { ...UI, ...(t?.tampons || {}) };
    (!e.exclus || e.exclus === "carburant, gaz, alcools, tabac, presse, jeux") && (e.exclus = UI.exclus);
    let n = Math.min(30, Math.max(3, parseInt(e.nb) || 20)),
      r = parseInt(e.palier) > 0 && parseInt(e.palier) < n ? parseInt(e.palier) : 0;
    return {
      ...e,
      nb: n,
      palier: r,
      seuil: Math.max(0, Number(String(e.seuil).replace(",", ".")) || 0),
      delai: Math.max(0, parseInt(e.delai) || 0),
      recompense1: String(e.recompense1 || "un cadeau"),
      recompense: String(e.recompense || "un cadeau"),
    };
  },
  $I = (t) => {
    let e = Ho(t);
    return (
      (e.seuil ? "1 passage d\xE8s " + e.seuil + " \u20AC d'achats = 1 tampon" : "1 passage = 1 tampon") +
      " \xB7 " +
      (e.palier
        ? e.palier + " tampons = " + e.recompense1 + ", ou continuez : " + e.nb + " tampons = " + e.recompense
        : e.nb + " tampons = " + e.recompense)
    );
  };
var gf = [
    { min: 2, nom: "Membre supporter", ico: "\u{1F49A}" },
    { min: 5, nom: "Pilier de l'\xE9picerie", ico: "\u{1F333}" },
  ],
  Va = (t) => {
    let e = Math.max(0, Number(t?.cadeaux) || 0),
      n = [...gf].reverse().find((i) => e >= i.min) || null,
      r = gf.find((i) => e < i.min) || null;
    return { k: e, niv: n, suivant: r, reste: r ? r.min - e : 0 };
  };
var W = On(Ln()),
  WI = {
    active: !1,
    debut: "2026-12-01",
    fin: "2026-12-24",
    periode: 0,
    annonce: null,
    tirages: [
      { id: "t1", date: "2026-12-15", titre: "Tirage de mi-d\xE9cembre" },
      { id: "t2", date: "2026-12-24", titre: "Grand tirage du 24 d\xE9cembre" },
    ],
  },
  l2 = (t) => ({
    ...WI,
    ...(t || {}),
    tirages: Array.isArray(t?.tirages) ? t.tirages : WI.tirages,
    periode: Number(t?.periode) || 0,
  });
var GI = () => {
  let t = new Uint32Array(1);
  return (crypto.getRandomValues(t), t[0] / 4294967296);
};
var KI = (t, e) => (t && Number(t.roueP) === l2(e).periode && Number(t.roueG)) || 0;
var $i = null,
  MM = () => {
    try {
      navigator.audioSession && (navigator.audioSession.type = "playback");
    } catch {}
    try {
      (($i = $i || new (window.AudioContext || window.webkitAudioContext)()),
        $i.state === "suspended" && $i.resume());
    } catch {
      $i = null;
    }
    return $i;
  };
function OM(t = 1) {
  let e = $i;
  if (e)
    try {
      let n = e.currentTime,
        r = e.createOscillator(),
        i = e.createGain();
      ((r.type = "square"),
        r.frequency.setValueAtTime(1800, n),
        r.frequency.exponentialRampToValueAtTime(900, n + 0.03),
        i.gain.setValueAtTime(0.12 * t, n),
        i.gain.exponentialRampToValueAtTime(1e-4, n + 0.045),
        r.connect(i).connect(e.destination),
        r.start(n),
        r.stop(n + 0.05));
    } catch {}
}
function LM(t) {
  let e = $i;
  if (!e) return;
  (t ? [523, 659, 784, 1047] : [392, 330]).forEach((r, i) => {
    try {
      let o = e.currentTime + i * 0.13,
        s = e.createOscillator(),
        l = e.createGain();
      ((s.type = "triangle"),
        (s.frequency.value = r),
        l.gain.setValueAtTime(1e-4, o),
        l.gain.exponentialRampToValueAtTime(0.25, o + 0.02),
        l.gain.exponentialRampToValueAtTime(1e-4, o + (t ? 0.5 : 0.35)),
        s.connect(l).connect(e.destination),
        s.start(o),
        s.stop(o + 0.6));
    } catch {}
  });
}
var mc = ["#FF4D5E", "#FFD86B", "#5FD068", "#7FC8FF", "#FFFFFF"];
function BM({ vite: t }) {
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
      className: "guirl" + (t ? " vite" : ""),
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
var QI = 8,
  gr = 360 / QI,
  a2 = (t, e) => [e * Math.sin((t * Math.PI) / 180), -e * Math.cos((t * Math.PI) / 180)];
function HI({ angle: t = 0, taille: e = 300, tourne: n }) {
  return W.default.createElement(
    "svg",
    {
      className: "roue-svg" + (n ? " vite" : ""),
      viewBox: "-118 -122 236 240",
      width: e,
      height: (e * 240) / 236,
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
      { transform: `rotate(${t})` },
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
            m ? "GAGN\xC9" : "PERDU",
          ),
        );
      }),
    ),
    W.default.createElement("circle", { r: "22", fill: "url(#ror)", stroke: "#FFF3C4", strokeWidth: "2" }),
    W.default.createElement(
      "text",
      { textAnchor: "middle", dominantBaseline: "central", fontSize: "24" },
      "\u2744\uFE0F",
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
            (j !== M && ((M = j), OM(0.6 + 0.4 * (1 - S))),
              (n.current = z),
              e(z),
              S < 1 ? (r.current = requestAnimationFrame(C)) : s());
          };
        r.current = requestAnimationFrame(C);
      },
    ]
  );
}
function zM({ onClose: t }) {
  return W.default.createElement(
    "div",
    { className: "roue-regl" },
    W.default.createElement("h3", null, "R\xE8glement de la roue de No\xEBl"),
    W.default.createElement(
      "ol",
      null,
      W.default.createElement(
        "li",
        null,
        "Jeu gratuit organis\xE9 par l'\xC9picerie Raddonnaise (Raddon-et-Chapendu), r\xE9serv\xE9 aux personnes de 18 ans et plus titulaires de la carte de fid\xE9lit\xE9, pendant la p\xE9riode fix\xE9e par l'\xE9picerie.",
      ),
      W.default.createElement(
        "li",
        null,
        "Chaque tampon re\xE7u en caisse donne droit \xE0 un tour de roue. Le r\xE9sultat est tir\xE9 au hasard au moment du tampon, avec une chance sur deux de gagner : 4 parts \xAB Gagn\xE9 \xBB et 4 parts \xAB Perdu \xBB.",
      ),
      W.default.createElement(
        "li",
        null,
        "Les tours pas encore jou\xE9s sont gard\xE9s : vous pouvez les jouer plus tard dans l'application. Sans t\xE9l\xE9phone, vous participez aussi : le r\xE9sultat s'affiche \xE0 la caisse.",
      ),
      W.default.createElement(
        "li",
        null,
        "Chaque \xAB Gagn\xE9 \xBB donne un ticket pour le prochain tirage au sort. Plus vous avez de tickets, plus vous avez de chances. Apr\xE8s chaque tirage, les tickets repartent \xE0 z\xE9ro.",
      ),
      W.default.createElement(
        "li",
        null,
        "Si un passage en caisse est annul\xE9, le tour de roue et le ticket \xE9ventuel de ce passage sont annul\xE9s aussi.",
      ),
      W.default.createElement(
        "li",
        null,
        "Les tirages ont lieu \xE0 l'\xE9picerie, aux dates choisies par l'\xE9picerie, par un tirage au hasard effectu\xE9 par l'application. Un m\xEAme participant peut gagner plusieurs tirages.",
      ),
      W.default.createElement(
        "li",
        null,
        "Le gagnant est pr\xE9venu par e-mail et par notification. Son pr\xE9nom est affich\xE9 dans l'application. Les lots sont une surprise et sont \xE0 retirer \xE0 l'\xE9picerie, sans limite de date.",
      ),
      W.default.createElement(
        "li",
        null,
        "Vous pouvez refuser de participer \xE0 tout moment, et changer d'avis dans \xAB Mes donn\xE9es \xBB.",
      ),
    ),
    W.default.createElement("button", { className: "roue-b2", onClick: t }, "Fermer"),
  );
}
