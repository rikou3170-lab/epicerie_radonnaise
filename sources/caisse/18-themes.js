/* ═══════════════════════════════════════════════════════════════════════
 *  THÈMES DE SAISON — calendrier des thèmes (dates, couleurs, messages), thèmes personnalisés de Marion,
 *  particules, illustrations et « magie de Noël » (neige, guirlande, bonnet, traîneau, village).
 * ═══════════════════════════════════════════════════════════════════════ */

// ── Catalogue (ordre du calendrier) ──
var Z_ = (t) => {
    let e = J_(t, 5, 0);
    return e === Ao(GC(t), 49) ? Ao(e, 7) : e;
  },
  FRISE = (t, e, n = 10) => `repeating-linear-gradient(90deg,${t} 0 ${n}px,${e} ${n}px ${2 * n}px)`,
  THEMES = [
    {
      id: "galette",
      nom: "Galette des rois",
      titre: "Bonne Épiphanie !",
      message: "Galettes frangipane et brioches des rois : pensez à réserver la vôtre.",
      top: "#7A5A12",
      accent: "#C69A3C",
      soft: "#FBF3DC",
      frise: FRISE("#C69A3C", "#F4E2A8"),
      parts: [["etoile", ["#D4AF37", "#E8C766"]]],
      illu: "galette",
      dates: (t) => [ze(t, 1, 2), ze(t, 1, 15)],
    },
    {
      id: "chandeleur",
      nom: "Chandeleur",
      titre: "C'est la Chandeleur !",
      message: "Farine, œufs, lait, pâte à tartiner et confitures maison : tout pour vos crêpes.",
      top: "#9A5A22",
      accent: "#E0A040",
      soft: "#FCF0DE",
      frise: FRISE("#E0A040", "#F7DDB0"),
      parts: [["crepe", ["#E9B35A", "#D9973A"]]],
      illu: "crepes",
      dates: (t) => [ze(t, 1, 28), ze(t, 2, 2)],
    },
    {
      id: "valentin",
      nom: "Saint-Valentin",
      titre: "Joyeuse Saint-Valentin",
      message: "Un plateau à partager en amoureux ? Commandez-le dans l'application 💕",
      top: "#A3243E",
      accent: "#E05A73",
      soft: "#FCE7EC",
      frise: FRISE("#E05A73", "#F7C6D0"),
      parts: [["coeur", ["#E05A73", "#C2185B", "#F48FB1"]]],
      sens: "haut",
      illu: "coeurs",
      dates: (t) => [ze(t, 2, 7), ze(t, 2, 14)],
    },
    {
      id: "paques",
      nom: "Pâques",
      titre: "Joyeuses Pâques !",
      message: "Chocolats, œufs et lapins : la chasse aux œufs commence à l'épicerie.",
      top: "#4E7F3E",
      accent: "#E9A23B",
      soft: "#F3F7E6",
      frise: FRISE("#F6C6D9", "#CDE7B0", 12),
      parts: [["oeuf", ["#F6C6D9", "#BFE3F2", "#F9E79F", "#C8E6C9"]]],
      illu: "oeufs",
      dates: (t) => {
        let e = GC(t);
        return [Ao(e, -7), Ao(e, 1)];
      },
    },
    {
      id: "muguet",
      nom: "1er mai — Muguet",
      titre: "Un brin de bonheur",
      message: "Le 1er mai, offrez du muguet porte-bonheur 🌿",
      top: "#3F6B3A",
      accent: "#8BBF6A",
      soft: "#EEF6E8",
      frise: FRISE("#8BBF6A", "#FFFFFF", 8),
      parts: [["clochette", ["#FFFFFF"]]],
      illu: "muguet",
      dates: (t) => [ze(t, 4, 28), ze(t, 5, 1)],
    },
    {
      id: "meres",
      nom: "Fête des mères",
      titre: "Bonne fête maman !",
      message: "Dimanche, c'est la fête des mamans : un plateau gourmand ou un panier garni pour la gâter.",
      top: "#B04A73",
      accent: "#E88AAE",
      soft: "#FCEAF2",
      frise: FRISE("#E88AAE", "#FBD3E2"),
      parts: [["fleur", ["#F48FB1", "#CE93D8", "#FFD54F"]]],
      illu: "bouquet",
      prio: 1,
      dates: (t) => {
        let e = Z_(t);
        return [Ao(e, -6), e];
      },
    },
    {
      id: "musique",
      nom: "Fête de la musique",
      titre: "Fête de la musique",
      message: "Ce soir, apéro en musique ? Les plateaux sont prêts 🎶",
      top: "#4F3A8C",
      accent: "#F2B134",
      soft: "#EFEAF8",
      frise: FRISE("#F2B134", "#4F3A8C", 8),
      parts: [["note", ["#4F3A8C", "#F2B134", "#E05A73"]]],
      sens: "haut",
      illu: "notes",
      prio: 2,
      dates: (t) => [ze(t, 6, 21), ze(t, 6, 21)],
    },
    {
      id: "peres",
      nom: "Fête des pères",
      titre: "Bonne fête papa !",
      message: "Saucissons, fromages, bières locales : de quoi faire plaisir à papa.",
      top: "#24507E",
      accent: "#5B8FC7",
      soft: "#E6EFF8",
      frise: FRISE("#24507E", "#9CC0E6"),
      parts: [
        ["cravate", ["#24507E", "#5B8FC7", "#C27B42"]],
        ["moustache", ["#4E342E"]],
      ],
      illu: "papa",
      prio: 1,
      dates: (t) => {
        let e = qC(t, 6, 0, 3);
        return [Ao(e, -6), e];
      },
    },
    {
      id: "juillet",
      nom: "14 juillet",
      titre: "Bon 14 juillet !",
      message: "Pique-nique, barbecue ou apéro au feu d'artifice : tout est à l'épicerie.",
      top: "#1F3A93",
      accent: "#D7263D",
      soft: "#EAF0FB",
      frise: "linear-gradient(90deg,#1F3A93 0 33.3%,#FFFFFF 33.3% 66.6%,#D7263D 66.6%)",
      parts: [
        ["confetti", ["#1F3A93", "#D7263D", "#FFFFFF"]],
        ["etincelle", ["#F2B134"]],
      ],
      illu: "feux",
      dates: (t) => [ze(t, 7, 10), ze(t, 7, 14)],
    },
    {
      id: "octobrerose",
      nom: "Octobre rose",
      titre: "Octobre rose",
      message: "Tout le mois, l'épicerie se pare de rose pour soutenir la lutte contre le cancer du sein 🎀",
      top: "#B0235F",
      accent: "#F06292",
      soft: "#FCE4EC",
      frise: FRISE("#F48FB1", "#FFFFFF", 9),
      parts: [
        ["ruban", ["#F06292", "#F8BBD0", "#EC407A"]],
        ["coeur", ["#F48FB1", "#FFFFFF"]],
      ],
      sens: "haut",
      illu: "ruban",
      dates: (t) => [ze(t, 10, 1), ze(t, 10, 23)],
    },
    {
      id: "halloween",
      nom: "Halloween",
      titre: "Joyeux Halloween !",
      message: "Des bonbons pour les petits monstres… et des citrouilles pour la soupe 🎃",
      top: "#2B1B3D",
      accent: "#E8731C",
      soft: "#FBEADB",
      frise: FRISE("#E8731C", "#2B1B3D", 14),
      parts: [
        ["citrouille", ["#E8731C"]],
        ["chauvesouris", ["#5E3F82"]],
      ],
      illu: "citrouille",
      dates: (t) => [ze(t, 10, 24), ze(t, 10, 31)],
    },
    {
      id: "beaujolais",
      nom: "Beaujolais nouveau",
      titre: "Le Beaujolais nouveau est arrivé !",
      message: "Avec un plateau charcuterie, c'est encore meilleur. À consommer avec modération.",
      top: "#6B1F3A",
      accent: "#9C3D6A",
      soft: "#F6E8EE",
      frise: FRISE("#9C3D6A", "#E7C7D6"),
      parts: [["raisin", ["#7B1E4A", "#9C3D6A"]]],
      illu: "vin",
      dates: (t) => {
        let e = qC(t, 11, 4, 3);
        return [e, Ao(e, 3)];
      },
    },
    {
      id: "stnicolas",
      nom: "Saint-Nicolas",
      titre: "Bonne Saint-Nicolas !",
      message: "Pains d'épices, mandarines et chocolats pour les enfants sages.",
      top: "#8E2430",
      accent: "#D4AF37",
      soft: "#FBEFE4",
      frise: FRISE("#D4AF37", "#8E2430"),
      parts: [
        ["etoile", ["#D4AF37", "#F4D774"]],
        ["flocon", ["#FFFFFF"]],
      ],
      illu: "painepice",
      dates: (t) => [ze(t, 12, 1), ze(t, 12, 6)],
    },
    {
      id: "noel",
      nom: "Noël",
      titre: "Joyeuses fêtes !",
      message: "Commandez vos plateaux de fêtes dès maintenant dans l'application 🎄",
      top: "#A4161A",
      accent: "#2E7D32",
      soft: "#FCEDEC",
      frise: "repeating-linear-gradient(45deg,#C62828 0 9px,#FFFFFF 9px 18px)",
      parts: [["flocon", ["#FFFFFF"]]],
      illu: "bonhomme",
      dates: (t) => [ze(t, 12, 7), ze(t, 12, 25)],
    },
    {
      id: "nouvelan",
      nom: "Nouvel An",
      titre: "Bonne année !",
      message: "Tout pour le réveillon : bulles, foie gras, plateaux… Meilleurs vœux de toute l'équipe ✨",
      top: "#1B1B2F",
      accent: "#D4AF37",
      soft: "#F7F1DE",
      frise: FRISE("#D4AF37", "#1B1B2F", 6),
      parts: [
        ["confetti", ["#D4AF37", "#F4D774", "#FFFFFF"]],
        ["etincelle", ["#D4AF37"]],
      ],
      illu: "champagne",
      dates: (t) => [ze(t, 12, 26), ze(t + 1, 1, 1)],
    },
  ];

// Couleurs : conversion, éclaircissement, et découpe des émojis d'un thème personnalisé.
var tk = (t) => {
    let e = /^#?([0-9a-f]{6})$/i.exec(t || ""),
      n = e ? parseInt(e[1], 16) : 1852219;
    return [n >> 16, (n >> 8) & 255, n & 255];
  },
  Xx = (t, e) =>
    "#" +
    tk(t)
      .map((n) =>
        Math.round(n + (255 - n) * e)
          .toString(16)
          .padStart(2, "0"),
      )
      .join(""),
  $C = (t) => {
    let e = String(t || "");
    return (
      typeof Intl < "u" && Intl.Segmenter
        ? [...new Intl.Segmenter("fr", { granularity: "grapheme" }).segment(e)].map((r) => r.segment)
        : Array.from(e)
    )
      .filter((r) => r.trim() && !/^[\w\s.,;:!?'"()\-]$/.test(r))
      .slice(0, 6);
  };

// Transforme un thème créé par Marion en thème utilisable par l'appli.
function persoVersTheme(t) {
  let e = /^#[0-9a-f]{6}$/i.test(t.couleur || "") ? t.couleur : "#1C433B",
    n = Array.isArray(t.motifs) && t.motifs.length ? t.motifs.filter((r) => !Jx[r]) : $C(t.emojis);
  return ParticulesMontantes(
    {
      id: t.id,
      perso: !0,
      nom: t.nom || "Mon thème",
      titre: t.titre || t.nom || "",
      message: t.message || "",
      top: e,
      accent: Xx(e, 0.35),
      soft: Xx(e, 0.9),
      frise: FRISE(Xx(e, 0.35), Xx(e, 0.82)),
      parts: n.length ? [["emoji", n]] : [],
      illuEmoji: $C(t.illu)[0] || n[0] || "⭐",
      prio: 2,
      dates: (r) => {
        if (!t.du || !t.au) return ["9999-12-30", "9999-12-31"];
        if (!t.chaqueAnnee)
          return Number(t.du.slice(0, 4)) === r ? [t.du, t.au] : ["9999-12-30", "9999-12-31"];
        let i = t.du.slice(5),
          o = t.au.slice(5);
        return [r + "-" + i, (o < i ? r + 1 : r) + "-" + o];
      },
    },
    t,
  );
}

// Interrupteur interne : motifs personnalisés des thèmes (désactivé).
var rk = !1;

// Prépare les particules (émojis ou motifs) qui montent pendant un thème.
function ParticulesMontantes(t, e) {
  if (!t) return t;
  (e = e || {}), !rk && !t.perso && (e = {});
  let n = t.parts,
    r = Array.isArray(e.motifs) ? e.motifs.filter(Boolean).slice(0, 6) : null;
  if (r && r.length) {
    let i = r.filter((s) => Jx[s]).map((s) => [s, Jx[s]]),
      o = r.filter((s) => !Jx[s]);
    n = [...i, ...(o.length ? [["emoji", o]] : [])];
  }
  return {
    ...t,
    parts: n,
    sens: e.sens ? (e.sens === "monte" ? "haut" : "") : t.sens,
    nb: { peu: 8, beaucoup: 28 }[e.densite] || t.nb,
    logo: e.logo === "rose" ? "rose" : "normal",
    phrase: String(e.phrase || "").trim() || t.titre,
    fond: ik.some((i) => i.id === e.fond) ? e.fond : "degrade",
    magie: e.magie == null ? t.id === "noel" : !!e.magie,
    ambiance: e.magie == null ? !0 : !!e.magie,
  };
}

// Styles de fond proposés pour un thème personnalisé (dégradé, uni, pois, vichy…).
var ik = [
  { id: "degrade", nom: "Dégradé" },
  { id: "uni", nom: "Uni" },
  { id: "lumiere", nom: "Lumière" },
  { id: "pois", nom: "Pois" },
  { id: "rayures", nom: "Rayures" },
  { id: "vichy", nom: "Vichy" },
  { id: "etoiles", nom: "Étoiles" },
  { id: "confettis", nom: "Confettis" },
];

// Interrupteur interne : thèmes personnalisés (selon réglage).
var ok = !1,
  sk = (t) => (ok ? ((t || {}).perso || []).filter((e) => e && e.id).map(persoVersTheme) : []);

// Dates d'un thème cette année (ou dates choisies par Marion).
function ak(t, e, n) {
  let [r, i] = t.dates(n),
    o = e || {};
  return o.du && o.au && o.du.slice(0, 4) === r.slice(0, 4) ? [o.du, o.au, !0] : [r, i, !1];
}

// Thème du jour : selon le calendrier, en mode automatique (ou désactivé).
function KC(t, e) {
  let n = t || {};
  if (n.mode === "off") return null;
  let r = e || new Date().toLocaleDateString("sv-SE"),
    i = (d) =>
      d &&
      ParticulesMontantes(
        { ...d, message: (n.items?.[d.id]?.message || "").trim() || d.message, anim: n.animations !== !1 },
        d.perso ? null : n.items?.[d.id],
      ),
    o = Number(r.slice(0, 4)),
    s = null,
    a = 1e9,
    u = -1,
    c = (n.perso || []).filter((d) => d && d.active !== !1).map((d) => d.id);
  for (let d of [...THEMES, ...sk(n).filter((f) => c.includes(f.id))])
    if (!(!d.perso && n.items?.[d.id]?.active === !1))
      for (let f of [o - 1, o]) {
        let [h, B] = ak(d, n.items?.[d.id], f);
        if (h <= r && r <= B) {
          let _ = (new Date(B) - new Date(h)) / 864e5,
            b = d.prio || 0;
          (b > u || (b === u && _ < a)) && ((u = b), (a = _), (s = d));
        }
      }
  return i(s);
}

// Formes des particules (flocon, étoile, cœur…).
var lk = {
    flocon: (t) =>
      S.default.createElement(
        "g",
        { fill: "none", stroke: t, strokeWidth: "1.8", strokeLinecap: "round" },
        S.default.createElement("path", {
          d: "M12 2v20M3.3 7l17.4 10M3.3 17l17.4-10M12 5.5l-2.2-2M12 5.5l2.2-2M12 18.5l-2.2 2M12 18.5l2.2 2M5.6 8.3l-.4 3M18.4 15.7l.4-3M5.6 15.7l-.4-3M18.4 8.3l.4 3",
        }),
      ),
    coeur: (t) =>
      S.default.createElement("path", {
        fill: t,
        d: "M12 21C5 16 2 12 4.5 8.3 6.7 5.3 10.5 6 12 8.8 13.5 6 17.3 5.3 19.5 8.3 22 12 19 16 12 21Z",
      }),
    etoile: (t) =>
      S.default.createElement("path", {
        fill: t,
        d: "M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z",
      }),
    etincelle: (t) =>
      S.default.createElement("path", {
        fill: t,
        d: "M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z",
      }),
    confetti: (t) =>
      S.default.createElement("rect", { x: "7", y: "9", width: "10", height: "6", rx: "1.2", fill: t }),
    citrouille: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("ellipse", { cx: "12", cy: "14", rx: "9", ry: "7.5", fill: t }),
        S.default.createElement("ellipse", { cx: "12", cy: "14", rx: "3.6", ry: "7.5", fill: "#F49A3E" }),
        S.default.createElement("path", {
          d: "M11.5 6.8c.3-2.4 1.4-3.6 3-4l.6 1.2c-1.2.5-1.8 1.4-2 3z",
          fill: "#5D7A2A",
        }),
      ),
    chauvesouris: (t) =>
      S.default.createElement("path", {
        fill: t,
        d: "M12 10c1.2-2 3.2-2.2 4.4-1 .8-2 2.8-2.4 4.4-1.2-1.3.2-1.9 1.9-1.2 3.4-1.9-1.2-3.8-.6-4.4 1-.8-1-1.9-1.4-3.2-.4-1.3-1-2.4-.6-3.2.4-.6-1.6-2.5-2.2-4.4-1 .7-1.5.1-3.2-1.2-3.4 1.6-1.2 3.6-.8 4.4 1.2 1.2-1.2 3.2-1 4.4 1z",
      }),
    oeuf: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("ellipse", { cx: "12", cy: "13", rx: "7", ry: "9", fill: t }),
        S.default.createElement("path", {
          d: "M5.3 12l2.2-1.6 2.2 1.6 2.3-1.6 2.2 1.6 2.3-1.6 2.2 1.6",
          fill: "none",
          stroke: "#fff",
          strokeWidth: "1.6",
        }),
      ),
    fleur: (t) =>
      S.default.createElement(
        "g",
        null,
        [0, 72, 144, 216, 288].map((e) =>
          S.default.createElement("circle", {
            key: e,
            cx: 12 + 5 * Math.sin((e * Math.PI) / 180),
            cy: 12 - 5 * Math.cos((e * Math.PI) / 180),
            r: "4",
            fill: t,
          }),
        ),
        S.default.createElement("circle", { cx: "12", cy: "12", r: "3", fill: "#FFD54F" }),
      ),
    note: (t) =>
      S.default.createElement("path", {
        fill: t,
        d: "M9 18.5a3 3 0 1 1-2-2.8V5.2l11-2.2v12a3 3 0 1 1-2-2.8V6.8L9 8.2z",
      }),
    raisin: (t) =>
      S.default.createElement(
        "g",
        { fill: t },
        [
          [9, 8],
          [15, 8],
          [12, 12],
          [6, 12],
          [18, 12],
          [9, 16],
          [15, 16],
          [12, 20],
        ].map(([e, n], r) => S.default.createElement("circle", { key: r, cx: e, cy: n, r: "3" })),
        S.default.createElement("path", {
          d: "M12 5c0-2 1-3 3-3",
          stroke: "#5D7A2A",
          strokeWidth: "1.5",
          fill: "none",
        }),
      ),
    crepe: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("circle", { cx: "12", cy: "12", r: "9", fill: t }),
        S.default.createElement("circle", { cx: "9", cy: "9", r: "1.4", fill: "#B9722A" }),
        S.default.createElement("circle", { cx: "15", cy: "13", r: "1.8", fill: "#B9722A" }),
        S.default.createElement("circle", { cx: "10", cy: "15", r: "1", fill: "#B9722A" }),
      ),
    clochette: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("path", {
          d: "M12 4c3.5 0 5 3 5 6.5 0 1.5.6 2.5 1.8 3.5H5.2c1.2-1 1.8-2 1.8-3.5C7 7 8.5 4 12 4z",
          fill: t,
          stroke: "#8BBF6A",
          strokeWidth: "1.2",
        }),
        S.default.createElement("path", {
          d: "M10 14.5c.3 1 1 1.5 2 1.5s1.7-.5 2-1.5",
          fill: "none",
          stroke: "#8BBF6A",
          strokeWidth: "1.2",
        }),
      ),
    cravate: (t) => S.default.createElement("path", { fill: t, d: "M9.5 2h5l-1 3 2.5 11-4 5-4-5 2.5-11z" }),
    feuille: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("path", {
          fill: t,
          d: "M12 2c4.5 3 7 6.5 7 10.5a7 7 0 0 1-14 0C5 8.5 7.5 5 12 2z",
        }),
        S.default.createElement("path", { d: "M12 6v16", stroke: "rgba(0,0,0,.25)", strokeWidth: "1.2" }),
      ),
    sapin: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("path", { fill: t, d: "M12 2l5 7h-2.5l4 6h-3l3.5 5h-14l3.5-5h-3l4-6H7z" }),
        S.default.createElement("rect", { x: "10.8", y: "20", width: "2.4", height: "3", fill: "#6D4C41" }),
      ),
    cadeau: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("rect", { x: "4", y: "10", width: "16", height: "11", rx: "1.5", fill: t }),
        S.default.createElement("rect", { x: "3", y: "7.5", width: "18", height: "4", rx: "1", fill: t }),
        S.default.createElement("path", { d: "M12 7.5V21", stroke: "#FFD54F", strokeWidth: "2.4" }),
        S.default.createElement("path", {
          d: "M12 7.5c-2-4-6-4-6-1.5S10 7.5 12 7.5zm0 0c2-4 6-4 6-1.5s-4 1.5-6 1.5z",
          fill: "#FFD54F",
        }),
      ),
    boule: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("circle", { cx: "12", cy: "14", r: "7.5", fill: t }),
        S.default.createElement("rect", {
          x: "10",
          y: "4.5",
          width: "4",
          height: "3",
          rx: ".8",
          fill: "#C69A3C",
        }),
        S.default.createElement("path", {
          d: "M7 13q5 3 10 0",
          stroke: "rgba(255,255,255,.65)",
          strokeWidth: "1.4",
          fill: "none",
        }),
      ),
    bougie: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("rect", { x: "9", y: "10", width: "6", height: "12", rx: "1", fill: t }),
        S.default.createElement("path", { d: "M12 2c2 3 2.5 5 0 7-2.5-2-2-4 0-7z", fill: "#F2B134" }),
      ),
    ballon: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("ellipse", { cx: "12", cy: "9.5", rx: "6", ry: "7.5", fill: t }),
        S.default.createElement("path", { d: "M11 17h2l-1 1.5z", fill: t }),
        S.default.createElement("path", {
          d: "M12 18.5c-1.5 1.5 1.5 2.5 0 4.5",
          stroke: "#9E9E9E",
          strokeWidth: "1",
          fill: "none",
        }),
      ),
    soleil: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("circle", { cx: "12", cy: "12", r: "5", fill: t }),
        S.default.createElement("path", {
          d: "M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1",
          stroke: t,
          strokeWidth: "2",
          strokeLinecap: "round",
        }),
      ),
    papillon: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement(
          "g",
          { fill: t },
          S.default.createElement("path", { d: "M12 12C9 6 3 4 3 8.5S7 14 12 12z" }),
          S.default.createElement("path", { d: "M12 12c3-6 9-8 9-3.5S17 14 12 12z" }),
          S.default.createElement("path", { d: "M12 12c-3 2-7 4-6 6.5s4 0 6-6.5z", opacity: ".8" }),
          S.default.createElement("path", { d: "M12 12c3 2 7 4 6 6.5s-4 0-6-6.5z", opacity: ".8" }),
        ),
        S.default.createElement("rect", {
          x: "11.3",
          y: "7",
          width: "1.4",
          height: "11",
          rx: ".7",
          fill: "#4E342E",
        }),
      ),
    pomme: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("path", {
          fill: t,
          d: "M12 7.5c-2-1.6-6.5-1.4-7.5 2.6-1 4 1.6 10.4 4.6 10.9 1.4.2 1.9-.6 2.9-.6s1.5.8 2.9.6c3-.5 5.6-6.9 4.6-10.9-1-4-5.5-4.2-7.5-2.6z",
        }),
        S.default.createElement("path", {
          d: "M12 7.5c0-2 .6-3.6 2-4.6",
          stroke: "#5D4037",
          strokeWidth: "1.5",
          fill: "none",
          strokeLinecap: "round",
        }),
        S.default.createElement("path", {
          d: "M13 5c1.5-2 4-2.4 5.5-1.6-1 2-3.4 2.6-5.5 1.6z",
          fill: "#6E9B3A",
        }),
      ),
    cerise: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("path", {
          d: "M8 15c1-6 4-10 9-12M16 15c0-5 0-8 1-12",
          stroke: "#5D7A2A",
          strokeWidth: "1.5",
          fill: "none",
        }),
        S.default.createElement("circle", { cx: "7.5", cy: "17", r: "4", fill: t }),
        S.default.createElement("circle", { cx: "16", cy: "17.5", r: "4", fill: t }),
      ),
    fraise: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("path", { fill: t, d: "M12 21c-5-3-8-8-7-12 2-2 12-2 14 0 1 4-2 9-7 12z" }),
        S.default.createElement("path", { d: "M6 8.5l2-3 2 1.5 2-2.5 2 2.5 2-1.5 2 3z", fill: "#5D7A2A" }),
        S.default.createElement(
          "g",
          { fill: "#FFE08A" },
          S.default.createElement("circle", { cx: "9", cy: "11", r: ".8" }),
          S.default.createElement("circle", { cx: "13", cy: "10.5", r: ".8" }),
          S.default.createElement("circle", { cx: "15.5", cy: "13", r: ".8" }),
          S.default.createElement("circle", { cx: "11", cy: "14", r: ".8" }),
          S.default.createElement("circle", { cx: "12.5", cy: "17", r: ".8" }),
        ),
      ),
    champignon: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("path", { fill: t, d: "M3 12a9 7.5 0 0 1 18 0z" }),
        S.default.createElement("rect", {
          x: "9",
          y: "12",
          width: "6",
          height: "8",
          rx: "2",
          fill: "#F5E6CC",
        }),
        S.default.createElement(
          "g",
          { fill: "#fff" },
          S.default.createElement("circle", { cx: "8", cy: "9", r: "1.4" }),
          S.default.createElement("circle", { cx: "14", cy: "7.5", r: "1.6" }),
          S.default.createElement("circle", { cx: "17", cy: "10.5", r: "1.1" }),
        ),
      ),
    ruban: (t) =>
      S.default.createElement(
        "g",
        { fill: t },
        S.default.createElement("path", {
          d: "M12 2.5c-2.6 0-4.2 1.9-4.2 4.2 0 2.6 1.7 5.2 4.2 8.8 2.5-3.6 4.2-6.2 4.2-8.8 0-2.3-1.6-4.2-4.2-4.2zm0 2.3c1.2 0 2 .8 2 2 0 1.2-.8 2.7-2 4.6-1.2-1.9-2-3.4-2-4.6 0-1.2.8-2 2-2z",
        }),
        S.default.createElement("path", {
          d: "M10.5 13.6 5.3 21.5l2.9-.3 1.3 2.6 4.1-7.1zM13.5 13.6l5.2 7.9-2.9-.3-1.3 2.6-4.1-7.1z",
        }),
      ),
    trefle: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement(
          "g",
          { fill: t },
          [0, 90, 180, 270].map((e) =>
            S.default.createElement("circle", {
              key: e,
              cx: 12 + 4 * Math.cos((e * Math.PI) / 180),
              cy: 10.5 + 4 * Math.sin((e * Math.PI) / 180),
              r: "3.8",
            }),
          ),
        ),
        S.default.createElement("path", {
          d: "M12 12c1 4 2 7 4 10",
          stroke: t,
          strokeWidth: "1.6",
          fill: "none",
        }),
      ),
    lune: (t) => S.default.createElement("path", { fill: t, d: "M15 3a9 9 0 1 0 6 15A7.5 7.5 0 0 1 15 3z" }),
    nuage: (t) =>
      S.default.createElement("path", {
        fill: t,
        d: "M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9.6 4.2 4.2 0 0 1 17.5 18z",
      }),
    goutte: (t) =>
      S.default.createElement("path", {
        fill: t,
        d: "M12 3c3 4.5 6 8 6 11.5a6 6 0 0 1-12 0C6 11 9 7.5 12 3z",
      }),
    bonbon: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("ellipse", { cx: "12", cy: "12", rx: "5", ry: "4", fill: t }),
        S.default.createElement("path", {
          d: "M7.3 12 2.5 8.5v7zM16.7 12l4.8-3.5v7z",
          fill: t,
          opacity: ".75",
        }),
        S.default.createElement("path", {
          d: "M10 9l3 6",
          stroke: "rgba(255,255,255,.7)",
          strokeWidth: "1.3",
        }),
      ),
    fantome: (t) =>
      S.default.createElement(
        "g",
        null,
        S.default.createElement("path", {
          fill: t,
          d: "M12 3a7 7 0 0 0-7 7v11l2.3-1.8L9.7 21l2.3-1.8 2.3 1.8 2.4-1.8L19 21V10a7 7 0 0 0-7-7z",
        }),
        S.default.createElement("circle", { cx: "9.5", cy: "10", r: "1.3", fill: "#22302A" }),
        S.default.createElement("circle", { cx: "14.5", cy: "10", r: "1.3", fill: "#22302A" }),
      ),
    sucreorge: (t) =>
      S.default.createElement(
        "g",
        { fill: "none", strokeWidth: "3.4", strokeLinecap: "round" },
        S.default.createElement("path", { d: "M9 22V8a4 4 0 0 1 8 0v1", stroke: t }),
        S.default.createElement("path", {
          d: "M9 22V8a4 4 0 0 1 8 0v1",
          stroke: "#fff",
          strokeDasharray: "2 2.4",
        }),
      ),
    moustache: (t) =>
      S.default.createElement("path", {
        fill: t,
        d: "M12 11c-1.5-2.5-5-3-7.5-1-1.2 1-2.5 1-3.5.3.5 2.5 3 4 6 3.2 2-.6 3.5-1.5 5-2.5 1.5 1 3 1.9 5 2.5 3 .8 5.5-.7 6-3.2-1 .7-2.3.7-3.5-.3-2.5-2-6-1.5-7.5 1z",
      }),
  },
  FORMES_NEIGE = [
    ["flocon", "Flocon", ["#FFFFFF"]],
    ["etoile", "Étoile", ["#D4AF37", "#F4D774"]],
    ["etincelle", "Étincelle", ["#F2B134", "#FFFFFF"]],
    ["confetti", "Confettis", ["#E05A73", "#F2B134", "#6E9B3A", "#24507E"]],
    ["coeur", "Cœur", ["#E05A73", "#F48FB1"]],
    ["ruban", "Ruban rose", ["#F06292", "#F8BBD0"]],
    ["fleur", "Fleur", ["#F48FB1", "#CE93D8", "#FFD54F"]],
    ["papillon", "Papillon", ["#F2B134", "#64B5F6", "#F48FB1"]],
    ["trefle", "Trèfle", ["#4CAF50"]],
    ["soleil", "Soleil", ["#FFC107"]],
    ["nuage", "Nuage", ["#FFFFFF", "#E3F2FD"]],
    ["goutte", "Goutte", ["#64B5F6"]],
    ["lune", "Lune", ["#F4D774"]],
    ["feuille", "Feuille", ["#E8731C", "#C69A3C", "#A4161A"]],
    ["champignon", "Champignon", ["#C62828"]],
    ["pomme", "Pomme", ["#A9C75A", "#E05A47"]],
    ["cerise", "Cerise", ["#C62828"]],
    ["fraise", "Fraise", ["#E53935"]],
    ["raisin", "Raisin", ["#7B1E4A", "#9C3D6A"]],
    ["crepe", "Crêpe", ["#E9B35A"]],
    ["oeuf", "Œuf", ["#F6C6D9", "#BFE3F2", "#F9E79F"]],
    ["clochette", "Muguet", ["#FFFFFF"]],
    ["note", "Note", ["#FFFFFF", "#F2B134"]],
    ["ballon", "Ballon", ["#E05A73", "#64B5F6", "#F2B134"]],
    ["bougie", "Bougie", ["#FFFFFF", "#F48FB1"]],
    ["cadeau", "Cadeau", ["#C62828", "#2E7D32"]],
    ["boule", "Boule de Noël", ["#C62828", "#D4AF37", "#2E7D32"]],
    ["sapin", "Sapin", ["#2E7D32"]],
    ["sucreorge", "Sucre d'orge", ["#C62828"]],
    ["bonbon", "Bonbon", ["#E05A73", "#F2B134", "#64B5F6"]],
    ["citrouille", "Citrouille", ["#E8731C"]],
    ["fantome", "Fantôme", ["#FFFFFF"]],
    ["chauvesouris", "Chauve-souris", ["#5E3F82"]],
    ["cravate", "Cravate", ["#24507E", "#5B8FC7"]],
    ["moustache", "Moustache", ["#4E342E"]],
  ].map(([t, e, n]) => ({ id: t, nom: e, c: n })),
  Jx = Object.fromEntries(FORMES_NEIGE.map((t) => [t.id, t.c]));

// Positions et vitesses des particules (toujours les mêmes, pour un rendu régulier).
var ck = Array.from({ length: 30 }, (t, e) => {
  let n = (r) => {
    let i = Math.sin(e * 12.9898 + r * 78.233) * 43758.5453;
    return i - Math.floor(i);
  };
  return {
    x: n(1) * 100,
    s: 12 + n(2) * 14,
    d: 9 + n(3) * 9,
    delai: -n(4) * 18,
    dx: (n(5) - 0.5) * 80,
    rot: (n(6) - 0.5) * 720,
    o: 0.55 + n(7) * 0.4,
  };
});

// Particules qui tombent ou montent selon le thème.
function Particules({ theme, nb = 16, dans }) {
  if (!theme) return null;
  nb = theme.nb || nb;
  let r = (theme.parts || []).flatMap(([i, o]) => o.map((s) => [i, s]));
  return r.length
    ? S.default.createElement(
        "div",
        {
          className: "parts" + (dans ? " dans" : "") + (theme.sens === "haut" ? " haut" : ""),
          "aria-hidden": "true",
        },
        ck.slice(0, nb).map((i, o) => {
          let [s, a] = r[o % r.length];
          return S.default.createElement(
            "span",
            {
              key: o,
              className: "part",
              style: {
                left: i.x + "%",
                width: i.s,
                height: i.s,
                animationDuration: i.d + "s",
                animationDelay: i.delai + "s",
                opacity: i.o,
                "--dx": i.dx + "px",
                "--rot": i.rot + "deg",
              },
            },
            s === "emoji"
              ? S.default.createElement("span", { className: "part-emoji", style: { fontSize: i.s } }, a)
              : S.default.createElement(
                  "svg",
                  {
                    viewBox: "0 0 24 24",
                    width: "100%",
                    height: "100%",
                    style: {
                      filter:
                        a.toUpperCase() === "#FFFFFF" ? "drop-shadow(0 0 1.5px rgba(40,70,90,.55))" : "none",
                    },
                  },
                  lk[s](a),
                ),
          );
        }),
      )
    : null;
}

// ── Illustrations des cartes de vœux (100×100) ──
var ILLU = {
  bonhomme: S.default.createElement(
    "g",
    null,
    S.default.createElement("path", {
      d: "M14 92h72",
      stroke: "#CFD8DC",
      strokeWidth: "4",
      strokeLinecap: "round",
    }),
    S.default.createElement("circle", {
      cx: "50",
      cy: "70",
      r: "21",
      fill: "#fff",
      stroke: "#B0BEC5",
      strokeWidth: "2",
    }),
    S.default.createElement("circle", {
      cx: "50",
      cy: "39",
      r: "15",
      fill: "#fff",
      stroke: "#B0BEC5",
      strokeWidth: "2",
    }),
    S.default.createElement("path", {
      d: "M31 64 14 52M69 64l17-12",
      stroke: "#6D4C41",
      strokeWidth: "3",
      strokeLinecap: "round",
    }),
    S.default.createElement("rect", {
      x: "35",
      y: "22",
      width: "30",
      height: "4",
      rx: "1.5",
      fill: "#22302A",
    }),
    S.default.createElement("rect", { x: "40", y: "7", width: "20", height: "17", rx: "2", fill: "#22302A" }),
    S.default.createElement("rect", { x: "40", y: "18", width: "20", height: "3.5", fill: "#C62828" }),
    S.default.createElement("circle", { cx: "44.5", cy: "36", r: "2", fill: "#22302A" }),
    S.default.createElement("circle", { cx: "55.5", cy: "36", r: "2", fill: "#22302A" }),
    S.default.createElement("path", { d: "M50 40l12 3-12 2.6z", fill: "#F57C00" }),
    S.default.createElement("path", { d: "M35 50q15 7 30 0v5.5q-15 7-30 0z", fill: "#C62828" }),
    S.default.createElement("rect", { x: "56", y: "53", width: "7", height: "15", rx: "2", fill: "#C62828" }),
    S.default.createElement("circle", { cx: "50", cy: "66", r: "2.3", fill: "#22302A" }),
    S.default.createElement("circle", { cx: "50", cy: "76", r: "2.3", fill: "#22302A" }),
    S.default.createElement("path", {
      d: "M84 30l2 4 4 .5-3 2.8.8 4-3.8-2-3.8 2 .8-4-3-2.8 4-.5z",
      fill: "#F4D774",
    }),
  ),
  citrouille: S.default.createElement(
    "g",
    null,
    S.default.createElement("ellipse", { cx: "50", cy: "62", rx: "36", ry: "28", fill: "#E8731C" }),
    S.default.createElement("ellipse", { cx: "36", cy: "62", rx: "17", ry: "27", fill: "#F0842A" }),
    S.default.createElement("ellipse", { cx: "64", cy: "62", rx: "17", ry: "27", fill: "#F0842A" }),
    S.default.createElement("ellipse", { cx: "50", cy: "62", rx: "12", ry: "28", fill: "#F49A3E" }),
    S.default.createElement("path", { d: "M47 35c1-9 5-13 11-15l2 4c-5 2-7 5-8 11z", fill: "#5D7A2A" }),
    S.default.createElement("path", { d: "M32 55l7-9 7 9zM54 55l7-9 7 9z", fill: "#3A1F05" }),
    S.default.createElement("path", {
      d: "M30 67q20 18 40 0l-4 1-3 4-4-3-3 4-3-4-3 4-3-4-4 3-3-4-4-1z",
      fill: "#3A1F05",
    }),
    S.default.createElement("path", {
      d: "M76 18c1.5-2.5 4-2.8 5.5-1.3 1-2.5 3.5-3 5.5-1.5-1.6.3-2.4 2.4-1.5 4.3-2.4-1.5-4.8-.8-5.5 1.3-1-1.3-2.4-1.8-4-.5-1.6-1.3-3-.8-4 .5-.8-2-3.1-2.8-5.5-1.3.9-1.9.1-4-1.5-4.3 2-1.5 4.5-1 5.5 1.5 1.5-1.5 4-1.2 5.5 1.3z",
      fill: "#2B1B3D",
      transform: "translate(-8 0) scale(1.15)",
    }),
  ),
  ruban: S.default.createElement(
    "g",
    null,
    S.default.createElement("path", {
      d: "M50 12c-11 0-18 8-18 18 0 11 7 22 18 38 11-16 18-27 18-38 0-10-7-18-18-18zm0 10c5 0 8 3 8 8 0 5-3 11-8 19-5-8-8-14-8-19 0-5 3-8 8-8z",
      fill: "#EC407A",
    }),
    S.default.createElement("path", {
      d: "M44 60 22 92l12-1 6 11 17-30zM56 60l22 32-12-1-6 11-17-30z",
      fill: "#F06292",
    }),
    S.default.createElement("path", {
      d: "M50 12c-11 0-18 8-18 18 0 3 1 7 2 10 2-9 8-16 16-16s14 7 16 16c1-3 2-7 2-10 0-10-7-18-18-18z",
      fill: "#F8BBD0",
      opacity: ".6",
    }),
  ),
  coeurs: S.default.createElement(
    "g",
    null,
    S.default.createElement("path", {
      d: "M40 84C14 66 8 50 18 39c9-9 19-4 22 3 3-7 13-12 22-3 10 11 4 27-22 45z",
      fill: "#E05A73",
    }),
    S.default.createElement("path", {
      d: "M66 62C48 50 44 39 51 31c6-6 13-3 15 2 2-5 9-8 15-2 7 8 3 19-15 31z",
      fill: "#F48FB1",
    }),
    S.default.createElement("path", {
      d: "M12 22l62 46",
      stroke: "#C69A3C",
      strokeWidth: "3",
      strokeLinecap: "round",
    }),
    S.default.createElement("path", { d: "M74 68l-9-1 6-6z", fill: "#C69A3C" }),
    S.default.createElement("path", { d: "M12 22l2 8-6-2zM12 22l8 2-2-6z", fill: "#C69A3C" }),
  ),
  oeufs: S.default.createElement(
    "g",
    null,
    S.default.createElement("path", { d: "M10 88q40-16 80 0", fill: "#CDE7B0" }),
    S.default.createElement("ellipse", { cx: "40", cy: "56", rx: "22", ry: "29", fill: "#F6C6D9" }),
    S.default.createElement("path", {
      d: "M18.5 52l5.4-4 5.4 4 5.4-4 5.3 4 5.4-4 5.4 4 5.4-4 5.4 4",
      fill: "none",
      stroke: "#fff",
      strokeWidth: "3",
    }),
    S.default.createElement("circle", { cx: "32", cy: "68", r: "2.5", fill: "#BFE3F2" }),
    S.default.createElement("circle", { cx: "44", cy: "72", r: "2.5", fill: "#F9E79F" }),
    S.default.createElement("circle", { cx: "38", cy: "38", r: "2.5", fill: "#BFE3F2" }),
    S.default.createElement("circle", { cx: "72", cy: "74", r: "14", fill: "#FFD54F" }),
    S.default.createElement("circle", { cx: "72", cy: "56", r: "10", fill: "#FFD54F" }),
    S.default.createElement("circle", { cx: "75", cy: "54", r: "1.6", fill: "#22302A" }),
    S.default.createElement("path", { d: "M81 57l6 1.5-6 2z", fill: "#F57C00" }),
    S.default.createElement("path", {
      d: "M62 72q-4-6 2-9",
      fill: "none",
      stroke: "#F2B134",
      strokeWidth: "3",
      strokeLinecap: "round",
    }),
  ),
  muguet: S.default.createElement(
    "g",
    null,
    S.default.createElement("path", {
      d: "M40 92C34 60 48 30 70 18",
      fill: "none",
      stroke: "#4E7F3E",
      strokeWidth: "3",
      strokeLinecap: "round",
    }),
    S.default.createElement("path", { d: "M60 92C30 80 26 46 44 30c4 26 12 44 16 62z", fill: "#7FB35F" }),
    [
      [46, 46],
      [52, 36],
      [59, 28],
      [66, 22],
      [42, 58],
    ].map(([t, e], n) =>
      S.default.createElement(
        "g",
        { key: n },
        S.default.createElement("path", { d: `M${t} ${e}v5`, stroke: "#4E7F3E", strokeWidth: "1.6" }),
        S.default.createElement("path", {
          d: `M${t - 6} ${e + 13}c0-6 2.5-9 6-9s6 3 6 9c-1.4-.8-2.6-.8-4 0-1.3-.8-2.7-.8-4 0-1.4-.8-2.6-.8-4 0z`,
          fill: "#fff",
          stroke: "#9CC57F",
          strokeWidth: "1.3",
        }),
      ),
    ),
  ),
  bouquet: S.default.createElement(
    "g",
    null,
    S.default.createElement("path", {
      d: "M50 88 34 44M50 88V36M50 88l16-44",
      stroke: "#5D7A2A",
      strokeWidth: "3",
    }),
    [
      [34, 40, "#F48FB1"],
      [50, 30, "#CE93D8"],
      [66, 40, "#F48FB1"],
      [42, 52, "#FFD54F"],
      [58, 52, "#FFAB91"],
    ].map(([t, e, n], r) =>
      S.default.createElement(
        "g",
        { key: r },
        [0, 72, 144, 216, 288].map((i) =>
          S.default.createElement("circle", {
            key: i,
            cx: t + 7 * Math.sin((i * Math.PI) / 180),
            cy: e - 7 * Math.cos((i * Math.PI) / 180),
            r: "6",
            fill: n,
          }),
        ),
        S.default.createElement("circle", { cx: t, cy: e, r: "4.5", fill: "#FFF3C4" }),
      ),
    ),
    S.default.createElement("path", { d: "M40 74l10 6 10-6-3 10-7-3-7 3z", fill: "#E05A73" }),
  ),
  papa: S.default.createElement(
    "g",
    null,
    S.default.createElement("path", {
      d: "M50 22c-5-7-16-8-24-3-3 2-7 2-9 0 1 7 8 11 16 9 7-1 12-3 17-6 5 3 10 5 17 6 8 2 15-2 16-9-2 2-6 2-9 0-8-5-19-4-24 3z",
      fill: "#4E342E",
    }),
    S.default.createElement("path", { d: "M43 38h14l-3 7 7 33-11 13-11-13 7-33z", fill: "#24507E" }),
    S.default.createElement("path", { d: "M43 38h14l-3 7h-8z", fill: "#1A3B5E" }),
    S.default.createElement("path", {
      d: "M47 56l9-4M45 66l12-5M46 76l9-4",
      stroke: "#5B8FC7",
      strokeWidth: "2.5",
    }),
  ),
  feux: S.default.createElement(
    "g",
    null,
    Array.from({ length: 14 }, (t, e) => {
      let n = (e * Math.PI * 2) / 14,
        r = ["#1F3A93", "#D7263D", "#F2B134"][e % 3];
      return S.default.createElement(
        "g",
        { key: e },
        S.default.createElement("path", {
          d: `M${50 + 10 * Math.cos(n)} ${42 + 10 * Math.sin(n)}L${50 + 30 * Math.cos(n)} ${42 + 30 * Math.sin(n)}`,
          stroke: r,
          strokeWidth: "3",
          strokeLinecap: "round",
        }),
        S.default.createElement("circle", {
          cx: 50 + 36 * Math.cos(n),
          cy: 42 + 36 * Math.sin(n),
          r: "2.6",
          fill: r,
        }),
      );
    }),
    S.default.createElement("circle", { cx: "50", cy: "42", r: "4", fill: "#F2B134" }),
    S.default.createElement("path", { d: "M8 92h84", stroke: "#1F3A93", strokeWidth: "3" }),
    S.default.createElement("path", { d: "M14 92l4-8 4 8M78 92l4-8 4 8", fill: "#D7263D" }),
  ),
  galette: S.default.createElement(
    "g",
    null,
    S.default.createElement("ellipse", { cx: "50", cy: "70", rx: "38", ry: "18", fill: "#D99A3A" }),
    S.default.createElement("ellipse", { cx: "50", cy: "66", rx: "38", ry: "18", fill: "#EBB65A" }),
    S.default.createElement("path", {
      d: "M26 58l14 16M38 52l20 22M52 50l18 20M64 52l10 12M30 72l12-18M44 78l20-28M60 80l14-20",
      stroke: "#C98428",
      strokeWidth: "1.6",
    }),
    S.default.createElement("path", {
      d: "M28 40l6-22 10 14 6-20 6 20 10-14 6 22z",
      fill: "#D4AF37",
      stroke: "#B8901C",
      strokeWidth: "1.5",
    }),
    S.default.createElement("circle", { cx: "50", cy: "12", r: "3", fill: "#E05A73" }),
    S.default.createElement("circle", { cx: "34", cy: "18", r: "2.5", fill: "#1F3A93" }),
    S.default.createElement("circle", { cx: "66", cy: "18", r: "2.5", fill: "#1F3A93" }),
  ),
  crepes: S.default.createElement(
    "g",
    null,
    S.default.createElement("ellipse", { cx: "50", cy: "84", rx: "38", ry: "8", fill: "#E0E0E0" }),
    [76, 69, 62, 55].map((t, e) =>
      S.default.createElement("ellipse", {
        key: e,
        cx: "50",
        cy: t,
        rx: "32",
        ry: "9",
        fill: e % 2 ? "#E9B35A" : "#F0C36E",
        stroke: "#D19A3E",
        strokeWidth: "1",
      }),
    ),
    S.default.createElement("path", {
      d: "M28 52c6 4 12 0 16 6 2 3 1 9 4 9s2-7 5-8c4-1 8 3 12-1 4-3 7-2 9-1-4-6-14-8-24-8s-18 1-22 3z",
      fill: "#5D3A1A",
    }),
    S.default.createElement("circle", { cx: "70", cy: "30", r: "4", fill: "#E05A73" }),
    S.default.createElement("circle", { cx: "78", cy: "38", r: "3.5", fill: "#E05A73" }),
    S.default.createElement("path", {
      d: "M70 26c1-4 4-6 7-6",
      stroke: "#5D7A2A",
      strokeWidth: "2",
      fill: "none",
    }),
  ),
  notes: S.default.createElement(
    "g",
    { fill: "#4F3A8C" },
    S.default.createElement("path", { d: "M30 78a9 7 0 1 1-4-6V30l38-8v44a9 7 0 1 1-4-6V36l-30 6z" }),
    S.default.createElement("path", { d: "M78 46a6 5 0 1 1-3-4V18l8 4-5 2z", fill: "#F2B134" }),
    S.default.createElement("path", {
      d: "M16 34a5 4 0 1 1-2-3.4V16",
      stroke: "#E05A73",
      strokeWidth: "2.5",
      fill: "none",
    }),
  ),
  vin: S.default.createElement(
    "g",
    null,
    S.default.createElement("path", {
      d: "M30 14h12v16c8 4 10 10 10 18v40a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V48c0-8 2-14 10-18z",
      fill: "#4A1428",
    }),
    S.default.createElement("rect", { x: "30", y: "10", width: "12", height: "6", rx: "1", fill: "#2A0A16" }),
    S.default.createElement("rect", {
      x: "22",
      y: "54",
      width: "28",
      height: "20",
      rx: "2",
      fill: "#F7F1DE",
    }),
    S.default.createElement("path", { d: "M27 62h18M27 67h12", stroke: "#9C3D6A", strokeWidth: "2" }),
    [
      [66, 48],
      [76, 48],
      [86, 48],
      [71, 57],
      [81, 57],
      [66, 66],
      [76, 66],
      [71, 75],
    ].map(([t, e], n) =>
      S.default.createElement("circle", {
        key: n,
        cx: t,
        cy: e,
        r: "6",
        fill: n % 2 ? "#7B1E4A" : "#9C3D6A",
      }),
    ),
    S.default.createElement("path", {
      d: "M76 42c0-6 4-9 9-10",
      stroke: "#5D7A2A",
      strokeWidth: "2.5",
      fill: "none",
    }),
    S.default.createElement("path", { d: "M80 36c6-6 12-4 14 0-5 2-10 2-14 0z", fill: "#7FB35F" }),
  ),
  painepice: S.default.createElement(
    "g",
    null,
    S.default.createElement("path", {
      d: "M50 10a12 12 0 0 1 9 20h15a7 7 0 0 1 0 14H62l8 34a7 7 0 0 1-13 4l-7-18-7 18a7 7 0 0 1-13-4l8-34H26a7 7 0 0 1 0-14h15a12 12 0 0 1 9-20z",
      fill: "#B9722A",
    }),
    S.default.createElement("circle", { cx: "45.5", cy: "20", r: "1.8", fill: "#fff" }),
    S.default.createElement("circle", { cx: "54.5", cy: "20", r: "1.8", fill: "#fff" }),
    S.default.createElement("path", {
      d: "M45 26q5 4 10 0",
      stroke: "#fff",
      strokeWidth: "1.8",
      fill: "none",
      strokeLinecap: "round",
    }),
    S.default.createElement("circle", { cx: "50", cy: "44", r: "2.4", fill: "#E05A73" }),
    S.default.createElement("circle", { cx: "50", cy: "54", r: "2.4", fill: "#2E7D32" }),
    S.default.createElement("path", {
      d: "M24 37h6M70 37h6M38 80l4-2M58 78l4 2",
      stroke: "#fff",
      strokeWidth: "2",
      strokeLinecap: "round",
    }),
    S.default.createElement("path", {
      d: "M80 70l2 4 4.5.6-3.3 3 .8 4.4-4-2.2-4 2.2.8-4.4-3.3-3 4.5-.6z",
      fill: "#D4AF37",
    }),
  ),
  champagne: S.default.createElement(
    "g",
    null,
    S.default.createElement("path", {
      d: "M30 24h18l-2 22c-1 6-4 9-7 9s-6-3-7-9z",
      fill: "#F4D774",
      stroke: "#B8901C",
      strokeWidth: "1.5",
      transform: "rotate(-14 39 55)",
    }),
    S.default.createElement("path", {
      d: "M39 55v26M31 82h16",
      stroke: "#B8901C",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      transform: "rotate(-14 39 55)",
    }),
    S.default.createElement("path", {
      d: "M54 24h18l-2 22c-1 6-4 9-7 9s-6-3-7-9z",
      fill: "#F4D774",
      stroke: "#B8901C",
      strokeWidth: "1.5",
      transform: "rotate(14 63 55)",
    }),
    S.default.createElement("path", {
      d: "M63 55v26M55 82h16",
      stroke: "#B8901C",
      strokeWidth: "2.5",
      strokeLinecap: "round",
      transform: "rotate(14 63 55)",
    }),
    S.default.createElement("circle", { cx: "50", cy: "14", r: "2", fill: "#D4AF37" }),
    S.default.createElement("circle", { cx: "44", cy: "8", r: "1.5", fill: "#D4AF37" }),
    S.default.createElement("circle", { cx: "57", cy: "7", r: "1.5", fill: "#D4AF37" }),
    S.default.createElement("path", {
      d: "M14 30l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6zM86 26l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z",
      fill: "#D4AF37",
    }),
  ),
};

// Positions des flocons de neige.
var Ci = (t, e) => {
    let n = Math.sin(t * 91.17 + e * 47.31) * 43758.5453;
    return n - Math.floor(n);
  },
  xk = Array.from({ length: 48 }, (t, e) => ({
    x: Ci(e, 1) * 100,
    s: 2 + Ci(e, 2) * 5,
    d: 7 + Ci(e, 3) * 10,
    delai: -Ci(e, 4) * 17,
    b: Ci(e, 5) < 0.3 ? 1.2 : 0,
    o: 0.5 + Ci(e, 6) * 0.5,
    dx: 10 + Ci(e, 7) * 30,
  }));

// Neige qui tombe (magie de Noël).
function Neige({ nb = 40, dans }) {
  return S.default.createElement(
    "div",
    { className: "neige" + (dans ? " dans" : ""), "aria-hidden": "true" },
    xk.slice(0, nb).map((n, r) =>
      S.default.createElement(
        "i",
        { key: r, style: { left: n.x + "%", animationDuration: n.d + "s", animationDelay: n.delai + "s" } },
        S.default.createElement("b", {
          style: {
            width: n.s,
            height: n.s,
            opacity: n.o,
            filter: n.b ? "blur(" + n.b + "px)" : "none",
            animationDuration: 2.5 + n.d / 4 + "s",
            "--dx": n.dx + "px",
          },
        }),
      ),
    ),
  );
}

// Couleurs des ampoules de la guirlande.
var WC = ["#FF4D4D", "#FFD54F", "#4FC3F7", "#81C784", "#FF8A65", "#BA68C8"];

// Guirlande lumineuse en haut de l'écran.
function GuirlandeNoel({ n: t = 15, apercu }) {
  return S.default.createElement(
    "div",
    { className: "guirlande" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
    S.default.createElement(
      "svg",
      { className: "gl-fil", viewBox: "0 0 300 20", preserveAspectRatio: "none" },
      S.default.createElement("path", {
        d:
          "M0 4 " +
          Array.from(
            { length: t },
            (n, r) => "Q" + ((r + 0.5) * 300) / t + " 16 " + ((r + 1) * 300) / t + " 4",
          ).join(" "),
        fill: "none",
        stroke: "#2E3B2E",
        strokeWidth: "1.6",
      }),
    ),
    Array.from({ length: t }, (n, r) =>
      S.default.createElement("span", {
        key: r,
        style: {
          left: ((r + 0.5) * 100) / t + "%",
          "--c": WC[r % WC.length],
          animationDelay: (r % 3) * 0.5 + Ci(r, 9) * 0.4 + "s",
        },
      }),
    ),
  );
}

// Bonnet de Père Noël posé sur le logo.
var SvgBonnet = ({ taille = 30, style }) =>
  S.default.createElement(
    "svg",
    {
      className: "bonnet",
      viewBox: "0 0 40 34",
      width: taille,
      height: taille * 0.85,
      style,
      "aria-hidden": "true",
    },
    S.default.createElement("path", {
      d: "M6 26C8 12 16 4 27 4c5 0 8 5 7 12-2-3-5-4-7-3 1 4 2 8 2 13z",
      fill: "#D32F2F",
    }),
    S.default.createElement("path", { d: "M27 4c5 0 8 5 7 12-2-3-5-4-7-3z", fill: "#B71C1C" }),
    S.default.createElement("rect", { x: "3", y: "24", width: "30", height: "8", rx: "4", fill: "#FFFFFF" }),
    S.default.createElement("circle", { cx: "34", cy: "17", r: "4.5", fill: "#FFFFFF" }),
  );
