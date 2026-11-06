var IO = (t) => {
    let e = TO(t, 5, 0);
    return e === no(_C(t), 49) ? no(e, 7) : e;
  },
  FRISE = (t, e, n = 10) => `repeating-linear-gradient(90deg,${t} 0 ${n}px,${e} ${n}px ${2 * n}px)`,
  THEMES = [
    {
      id: "galette",
      nom: "Galette des rois",
      titre: "Bonne \xC9piphanie !",
      message: "Galettes frangipane et brioches des rois : pensez \xE0 r\xE9server la v\xF4tre.",
      top: "#7A5A12",
      accent: "#C69A3C",
      soft: "#FBF3DC",
      frise: FRISE("#C69A3C", "#F4E2A8"),
      parts: [["etoile", ["#D4AF37", "#E8C766"]]],
      illu: "galette",
      dates: (t) => [Ye(t, 1, 2), Ye(t, 1, 15)],
    },
    {
      id: "chandeleur",
      nom: "Chandeleur",
      titre: "C'est la Chandeleur !",
      message:
        "Farine, \u0153ufs, lait, p\xE2te \xE0 tartiner et confitures maison : tout pour vos cr\xEApes.",
      top: "#9A5A22",
      accent: "#E0A040",
      soft: "#FCF0DE",
      frise: FRISE("#E0A040", "#F7DDB0"),
      parts: [["crepe", ["#E9B35A", "#D9973A"]]],
      illu: "crepes",
      dates: (t) => [Ye(t, 1, 28), Ye(t, 2, 2)],
    },
    {
      id: "valentin",
      nom: "Saint-Valentin",
      titre: "Joyeuse Saint-Valentin",
      message: "Un plateau \xE0 partager en amoureux ? Commandez-le dans l'application \u{1F495}",
      top: "#A3243E",
      accent: "#E05A73",
      soft: "#FCE7EC",
      frise: FRISE("#E05A73", "#F7C6D0"),
      parts: [["coeur", ["#E05A73", "#C2185B", "#F48FB1"]]],
      sens: "haut",
      illu: "coeurs",
      dates: (t) => [Ye(t, 2, 7), Ye(t, 2, 14)],
    },
    {
      id: "paques",
      nom: "P\xE2ques",
      titre: "Joyeuses P\xE2ques !",
      message: "Chocolats, \u0153ufs et lapins : la chasse aux \u0153ufs commence \xE0 l'\xE9picerie.",
      top: "#4E7F3E",
      accent: "#E9A23B",
      soft: "#F3F7E6",
      frise: FRISE("#F6C6D9", "#CDE7B0", 12),
      parts: [["oeuf", ["#F6C6D9", "#BFE3F2", "#F9E79F", "#C8E6C9"]]],
      illu: "oeufs",
      dates: (t) => {
        let e = _C(t);
        return [no(e, -7), no(e, 1)];
      },
    },
    {
      id: "muguet",
      nom: "1er mai \u2014 Muguet",
      titre: "Un brin de bonheur",
      message: "Le 1er mai, offrez du muguet porte-bonheur \u{1F33F}",
      top: "#3F6B3A",
      accent: "#8BBF6A",
      soft: "#EEF6E8",
      frise: FRISE("#8BBF6A", "#FFFFFF", 8),
      parts: [["clochette", ["#FFFFFF"]]],
      illu: "muguet",
      dates: (t) => [Ye(t, 4, 28), Ye(t, 5, 1)],
    },
    {
      id: "meres",
      nom: "F\xEAte des m\xE8res",
      titre: "Bonne f\xEAte maman !",
      message:
        "Dimanche, c'est la f\xEAte des mamans : un plateau gourmand ou un panier garni pour la g\xE2ter.",
      top: "#B04A73",
      accent: "#E88AAE",
      soft: "#FCEAF2",
      frise: FRISE("#E88AAE", "#FBD3E2"),
      parts: [["fleur", ["#F48FB1", "#CE93D8", "#FFD54F"]]],
      illu: "bouquet",
      prio: 1,
      dates: (t) => {
        let e = IO(t);
        return [no(e, -6), e];
      },
    },
    {
      id: "musique",
      nom: "F\xEAte de la musique",
      titre: "F\xEAte de la musique",
      message: "Ce soir, ap\xE9ro en musique ? Les plateaux sont pr\xEAts \u{1F3B6}",
      top: "#4F3A8C",
      accent: "#F2B134",
      soft: "#EFEAF8",
      frise: FRISE("#F2B134", "#4F3A8C", 8),
      parts: [["note", ["#4F3A8C", "#F2B134", "#E05A73"]]],
      sens: "haut",
      illu: "notes",
      prio: 2,
      dates: (t) => [Ye(t, 6, 21), Ye(t, 6, 21)],
    },
    {
      id: "peres",
      nom: "F\xEAte des p\xE8res",
      titre: "Bonne f\xEAte papa !",
      message: "Saucissons, fromages, bi\xE8res locales : de quoi faire plaisir \xE0 papa.",
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
        let e = bC(t, 6, 0, 3);
        return [no(e, -6), e];
      },
    },
    {
      id: "juillet",
      nom: "14 juillet",
      titre: "Bon 14 juillet !",
      message: "Pique-nique, barbecue ou ap\xE9ro au feu d'artifice : tout est \xE0 l'\xE9picerie.",
      top: "#1F3A93",
      accent: "#D7263D",
      soft: "#EAF0FB",
      frise: "linear-gradient(90deg,#1F3A93 0 33.3%,#FFFFFF 33.3% 66.6%,#D7263D 66.6%)",
      parts: [
        ["confetti", ["#1F3A93", "#D7263D", "#FFFFFF"]],
        ["etincelle", ["#F2B134"]],
      ],
      illu: "feux",
      dates: (t) => [Ye(t, 7, 10), Ye(t, 7, 14)],
    },
    {
      id: "octobrerose",
      nom: "Octobre rose",
      titre: "Octobre rose",
      message:
        "Tout le mois, l'\xE9picerie se pare de rose pour soutenir la lutte contre le cancer du sein \u{1F380}",
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
      dates: (t) => [Ye(t, 10, 1), Ye(t, 10, 23)],
    },
    {
      id: "halloween",
      nom: "Halloween",
      titre: "Joyeux Halloween !",
      message: "Des bonbons pour les petits monstres\u2026 et des citrouilles pour la soupe \u{1F383}",
      top: "#2B1B3D",
      accent: "#E8731C",
      soft: "#FBEADB",
      frise: FRISE("#E8731C", "#2B1B3D", 14),
      parts: [
        ["citrouille", ["#E8731C"]],
        ["chauvesouris", ["#5E3F82"]],
      ],
      illu: "citrouille",
      dates: (t) => [Ye(t, 10, 24), Ye(t, 10, 31)],
    },
    {
      id: "beaujolais",
      nom: "Beaujolais nouveau",
      titre: "Le Beaujolais nouveau est arriv\xE9 !",
      message: "Avec un plateau charcuterie, c'est encore meilleur. \xC0 consommer avec mod\xE9ration.",
      top: "#6B1F3A",
      accent: "#9C3D6A",
      soft: "#F6E8EE",
      frise: FRISE("#9C3D6A", "#E7C7D6"),
      parts: [["raisin", ["#7B1E4A", "#9C3D6A"]]],
      illu: "vin",
      dates: (t) => {
        let e = bC(t, 11, 4, 3);
        return [e, no(e, 3)];
      },
    },
    {
      id: "stnicolas",
      nom: "Saint-Nicolas",
      titre: "Bonne Saint-Nicolas !",
      message: "Pains d'\xE9pices, mandarines et chocolats pour les enfants sages.",
      top: "#8E2430",
      accent: "#D4AF37",
      soft: "#FBEFE4",
      frise: FRISE("#D4AF37", "#8E2430"),
      parts: [
        ["etoile", ["#D4AF37", "#F4D774"]],
        ["flocon", ["#FFFFFF"]],
      ],
      illu: "painepice",
      dates: (t) => [Ye(t, 12, 1), Ye(t, 12, 6)],
    },
    {
      id: "noel",
      nom: "No\xEBl",
      titre: "Joyeuses f\xEAtes !",
      message: "Commandez vos plateaux de f\xEAtes d\xE8s maintenant dans l'application \u{1F384}",
      top: "#A4161A",
      accent: "#2E7D32",
      soft: "#FCEDEC",
      frise: "repeating-linear-gradient(45deg,#C62828 0 9px,#FFFFFF 9px 18px)",
      parts: [["flocon", ["#FFFFFF"]]],
      illu: "bonhomme",
      dates: (t) => [Ye(t, 12, 7), Ye(t, 12, 25)],
    },
    {
      id: "nouvelan",
      nom: "Nouvel An",
      titre: "Bonne ann\xE9e !",
      message:
        "Tout pour le r\xE9veillon : bulles, foie gras, plateaux\u2026 Meilleurs v\u0153ux de toute l'\xE9quipe \u2728",
      top: "#1B1B2F",
      accent: "#D4AF37",
      soft: "#F7F1DE",
      frise: FRISE("#D4AF37", "#1B1B2F", 6),
      parts: [
        ["confetti", ["#D4AF37", "#F4D774", "#FFFFFF"]],
        ["etincelle", ["#D4AF37"]],
      ],
      illu: "champagne",
      dates: (t) => [Ye(t, 12, 26), Ye(t + 1, 1, 1)],
    },
  ];
var kO = (t) => {
    let e = /^#?([0-9a-f]{6})$/i.exec(t || ""),
      n = e ? parseInt(e[1], 16) : 1852219;
    return [n >> 16, (n >> 8) & 255, n & 255];
  },
  ff = (t, e) =>
    "#" +
    kO(t)
      .map((n) =>
        Math.round(n + (255 - n) * e)
          .toString(16)
          .padStart(2, "0"),
      )
      .join(""),
  mf = (t) => {
    let e = String(t || "");
    return (
      typeof Intl < "u" && Intl.Segmenter
        ? [...new Intl.Segmenter("fr", { granularity: "grapheme" }).segment(e)].map((r) => r.segment)
        : Array.from(e)
    )
      .filter((r) => r.trim() && !/^[\w\s.,;:!?'"()\-]$/.test(r))
      .slice(0, 6);
  };
function persoVersTheme(t) {
  let e = /^#[0-9a-f]{6}$/i.test(t.couleur || "") ? t.couleur : "#1C433B",
    n = Array.isArray(t.motifs) && t.motifs.length ? t.motifs.filter((r) => !Fa[r]) : mf(t.emojis);
  return ParticulesMontantes(
    {
      id: t.id,
      perso: !0,
      nom: t.nom || "Mon th\xE8me",
      titre: t.titre || t.nom || "",
      message: t.message || "",
      top: e,
      accent: ff(e, 0.35),
      soft: ff(e, 0.9),
      frise: FRISE(ff(e, 0.35), ff(e, 0.82)),
      parts: n.length ? [["emoji", n]] : [],
      illuEmoji: mf(t.illu)[0] || n[0] || "\u2B50",
      prio: 2,
      dates: (r) => {
        if (!t.du || !t.au) return ["9999-12-30", "9999-12-31"];
        if (!t.chaqueAnnee)
          return Number(t.du.slice(0, 4)) === r ? [t.du, t.au] : ["9999-12-30", "9999-12-31"];
        let i = t.du.slice(5),
          s = t.au.slice(5);
        return [r + "-" + i, (s < i ? r + 1 : r) + "-" + s];
      },
    },
    t,
  );
}
var M2 = !1;
function ParticulesMontantes(t, e) {
  if (!t) return t;
  (e = e || {}), !M2 && !t.perso && (e = {});
  let n = t.parts,
    r = Array.isArray(e.motifs) ? e.motifs.filter(Boolean).slice(0, 6) : null;
  if (r && r.length) {
    let i = r.filter((o) => Fa[o]).map((o) => [o, Fa[o]]),
      s = r.filter((o) => !Fa[o]);
    n = [...i, ...(s.length ? [["emoji", s]] : [])];
  }
  return {
    ...t,
    parts: n,
    sens: e.sens ? (e.sens === "monte" ? "haut" : "") : t.sens,
    nb: { peu: 8, beaucoup: 28 }[e.densite] || t.nb,
    logo: e.logo === "rose" ? "rose" : "normal",
    phrase: String(e.phrase || "").trim() || t.titre,
    fond: L2.some((i) => i.id === e.fond) ? e.fond : "degrade",
    magie: e.magie == null ? t.id === "noel" : !!e.magie,
    ambiance: e.magie == null ? !0 : !!e.magie,
  };
}
var L2 = [
  { id: "degrade", nom: "D\xE9grad\xE9" },
  { id: "uni", nom: "Uni" },
  { id: "lumiere", nom: "Lumi\xE8re" },
  { id: "pois", nom: "Pois" },
  { id: "rayures", nom: "Rayures" },
  { id: "vichy", nom: "Vichy" },
  { id: "etoiles", nom: "\xC9toiles" },
  { id: "confettis", nom: "Confettis" },
];
function O2(t) {
  let e = t?.top || "#1C433B",
    n = t?.accent || "#6E9B3A",
    r = "radial-gradient(120% 75% at 50% 45%," + e + "EE 0%," + e + " 60%,#111 140%)";
  if (t?.magie) return "radial-gradient(90% 60% at 50% 18%,#2B4C7E 0%,#16294A 55%,#0A1428 100%)";
  if (Zn(t) === "halloween") return "radial-gradient(90% 60% at 70% 12%,#4A2F66 0%,#2B1B3D 50%,#140B22 100%)";
  if (N2(Zn(t))) return N2(Zn(t));
  if (Zn(t) === "octobrerose") return "linear-gradient(#7A1846 0%,#B0235F 40%,#E26A98 75%,#F8BBD0 100%)";
  switch (t?.fond) {
    case "uni":
      return e;
    case "lumiere":
      return "radial-gradient(55% 38% at 50% 42%," + n + "88 0%,transparent 72%)," + r;
    case "pois":
      return "radial-gradient(rgba(255,255,255,.13) 17%,transparent 19%) 0 0/26px 26px," + r;
    case "rayures":
      return "repeating-linear-gradient(135deg,rgba(255,255,255,.08) 0 14px,transparent 14px 28px)," + r;
    case "vichy":
      return (
        "repeating-linear-gradient(0deg,rgba(255,255,255,.09) 0 12px,transparent 12px 24px),repeating-linear-gradient(90deg,rgba(255,255,255,.09) 0 12px,transparent 12px 24px)," +
        e
      );
    case "etoiles":
      return (
        "radial-gradient(circle,rgba(255,255,255,.7) 1px,transparent 1.7px) 0 0/34px 34px,radial-gradient(circle,rgba(255,255,255,.35) 1px,transparent 1.7px) 17px 17px/34px 34px," +
        r
      );
    case "confettis":
      return (
        "radial-gradient(circle," +
        n +
        " 2px,transparent 2.6px) 0 0/40px 40px,radial-gradient(circle,rgba(255,255,255,.55) 1.6px,transparent 2.2px) 20px 12px/40px 40px,radial-gradient(circle,#F2B134 1.8px,transparent 2.4px) 8px 26px/40px 40px," +
        r
      );
    default:
      return r;
  }
}
var B2 = !1,
  CO = (t) => (B2 ? ((t || {}).perso || []).filter((e) => e && e.id).map(persoVersTheme) : []);
function vf(t, e, n) {
  let [r, i] = t.dates(n),
    s = e || {};
  return s.du && s.au && s.du.slice(0, 4) === r.slice(0, 4) ? [s.du, s.au, !0] : [r, i, !1];
}
function V2(t, e) {
  let n = t || {};
  if (n.mode === "off") return null;
  let r = e || new Date().toLocaleDateString("sv-SE"),
    i = (h) =>
      h &&
      ParticulesMontantes(
        { ...h, message: (n.items?.[h.id]?.message || "").trim() || h.message, anim: n.animations !== !1 },
        h.perso ? null : n.items?.[h.id],
      ),
    s = Number(r.slice(0, 4)),
    o = null,
    a = 1e9,
    u = -1,
    d = (n.perso || []).filter((h) => h && h.active !== !1).map((h) => h.id);
  for (let h of [...THEMES, ...CO(n).filter((p) => d.includes(p.id))])
    if (!(!h.perso && n.items?.[h.id]?.active === !1))
      for (let p of [s - 1, s]) {
        let [m, w] = vf(h, n.items?.[h.id], p);
        if (m <= r && r <= w) {
          let E = (new Date(w) - new Date(m)) / 864e5,
            A = h.prio || 0;
          (A > u || (A === u && E < a)) && ((u = A), (a = E), (o = h));
        }
      }
  return i(o);
}
var D2 = {
    flocon: (t) =>
      D.default.createElement(
        "g",
        { fill: "none", stroke: t, strokeWidth: "1.8", strokeLinecap: "round" },
        D.default.createElement("path", {
          d: "M12 2v20M3.3 7l17.4 10M3.3 17l17.4-10M12 5.5l-2.2-2M12 5.5l2.2-2M12 18.5l-2.2 2M12 18.5l2.2 2M5.6 8.3l-.4 3M18.4 15.7l.4-3M5.6 15.7l-.4-3M18.4 8.3l.4 3",
        }),
      ),
    coeur: (t) =>
      D.default.createElement("path", {
        fill: t,
        d: "M12 21C5 16 2 12 4.5 8.3 6.7 5.3 10.5 6 12 8.8 13.5 6 17.3 5.3 19.5 8.3 22 12 19 16 12 21Z",
      }),
    etoile: (t) =>
      D.default.createElement("path", {
        fill: t,
        d: "M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z",
      }),
    etincelle: (t) =>
      D.default.createElement("path", {
        fill: t,
        d: "M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z",
      }),
    confetti: (t) =>
      D.default.createElement("rect", { x: "7", y: "9", width: "10", height: "6", rx: "1.2", fill: t }),
    citrouille: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("ellipse", { cx: "12", cy: "14", rx: "9", ry: "7.5", fill: t }),
        D.default.createElement("ellipse", { cx: "12", cy: "14", rx: "3.6", ry: "7.5", fill: "#F49A3E" }),
        D.default.createElement("path", {
          d: "M11.5 6.8c.3-2.4 1.4-3.6 3-4l.6 1.2c-1.2.5-1.8 1.4-2 3z",
          fill: "#5D7A2A",
        }),
      ),
    chauvesouris: (t) =>
      D.default.createElement("path", {
        fill: t,
        d: "M12 10c1.2-2 3.2-2.2 4.4-1 .8-2 2.8-2.4 4.4-1.2-1.3.2-1.9 1.9-1.2 3.4-1.9-1.2-3.8-.6-4.4 1-.8-1-1.9-1.4-3.2-.4-1.3-1-2.4-.6-3.2.4-.6-1.6-2.5-2.2-4.4-1 .7-1.5.1-3.2-1.2-3.4 1.6-1.2 3.6-.8 4.4 1.2 1.2-1.2 3.2-1 4.4 1z",
      }),
    oeuf: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("ellipse", { cx: "12", cy: "13", rx: "7", ry: "9", fill: t }),
        D.default.createElement("path", {
          d: "M5.3 12l2.2-1.6 2.2 1.6 2.3-1.6 2.2 1.6 2.3-1.6 2.2 1.6",
          fill: "none",
          stroke: "#fff",
          strokeWidth: "1.6",
        }),
      ),
    fleur: (t) =>
      D.default.createElement(
        "g",
        null,
        [0, 72, 144, 216, 288].map((e) =>
          D.default.createElement("circle", {
            key: e,
            cx: 12 + 5 * Math.sin((e * Math.PI) / 180),
            cy: 12 - 5 * Math.cos((e * Math.PI) / 180),
            r: "4",
            fill: t,
          }),
        ),
        D.default.createElement("circle", { cx: "12", cy: "12", r: "3", fill: "#FFD54F" }),
      ),
    note: (t) =>
      D.default.createElement("path", {
        fill: t,
        d: "M9 18.5a3 3 0 1 1-2-2.8V5.2l11-2.2v12a3 3 0 1 1-2-2.8V6.8L9 8.2z",
      }),
    raisin: (t) =>
      D.default.createElement(
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
        ].map(([e, n], r) => D.default.createElement("circle", { key: r, cx: e, cy: n, r: "3" })),
        D.default.createElement("path", {
          d: "M12 5c0-2 1-3 3-3",
          stroke: "#5D7A2A",
          strokeWidth: "1.5",
          fill: "none",
        }),
      ),
    crepe: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("circle", { cx: "12", cy: "12", r: "9", fill: t }),
        D.default.createElement("circle", { cx: "9", cy: "9", r: "1.4", fill: "#B9722A" }),
        D.default.createElement("circle", { cx: "15", cy: "13", r: "1.8", fill: "#B9722A" }),
        D.default.createElement("circle", { cx: "10", cy: "15", r: "1", fill: "#B9722A" }),
      ),
    clochette: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("path", {
          d: "M12 4c3.5 0 5 3 5 6.5 0 1.5.6 2.5 1.8 3.5H5.2c1.2-1 1.8-2 1.8-3.5C7 7 8.5 4 12 4z",
          fill: t,
          stroke: "#8BBF6A",
          strokeWidth: "1.2",
        }),
        D.default.createElement("path", {
          d: "M10 14.5c.3 1 1 1.5 2 1.5s1.7-.5 2-1.5",
          fill: "none",
          stroke: "#8BBF6A",
          strokeWidth: "1.2",
        }),
      ),
    cravate: (t) => D.default.createElement("path", { fill: t, d: "M9.5 2h5l-1 3 2.5 11-4 5-4-5 2.5-11z" }),
    feuille: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("path", {
          fill: t,
          d: "M12 2c4.5 3 7 6.5 7 10.5a7 7 0 0 1-14 0C5 8.5 7.5 5 12 2z",
        }),
        D.default.createElement("path", { d: "M12 6v16", stroke: "rgba(0,0,0,.25)", strokeWidth: "1.2" }),
      ),
    sapin: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("path", { fill: t, d: "M12 2l5 7h-2.5l4 6h-3l3.5 5h-14l3.5-5h-3l4-6H7z" }),
        D.default.createElement("rect", { x: "10.8", y: "20", width: "2.4", height: "3", fill: "#6D4C41" }),
      ),
    cadeau: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("rect", { x: "4", y: "10", width: "16", height: "11", rx: "1.5", fill: t }),
        D.default.createElement("rect", { x: "3", y: "7.5", width: "18", height: "4", rx: "1", fill: t }),
        D.default.createElement("path", { d: "M12 7.5V21", stroke: "#FFD54F", strokeWidth: "2.4" }),
        D.default.createElement("path", {
          d: "M12 7.5c-2-4-6-4-6-1.5S10 7.5 12 7.5zm0 0c2-4 6-4 6-1.5s-4 1.5-6 1.5z",
          fill: "#FFD54F",
        }),
      ),
    boule: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("circle", { cx: "12", cy: "14", r: "7.5", fill: t }),
        D.default.createElement("rect", {
          x: "10",
          y: "4.5",
          width: "4",
          height: "3",
          rx: ".8",
          fill: "#C69A3C",
        }),
        D.default.createElement("path", {
          d: "M7 13q5 3 10 0",
          stroke: "rgba(255,255,255,.65)",
          strokeWidth: "1.4",
          fill: "none",
        }),
      ),
    bougie: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("rect", { x: "9", y: "10", width: "6", height: "12", rx: "1", fill: t }),
        D.default.createElement("path", { d: "M12 2c2 3 2.5 5 0 7-2.5-2-2-4 0-7z", fill: "#F2B134" }),
      ),
    ballon: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("ellipse", { cx: "12", cy: "9.5", rx: "6", ry: "7.5", fill: t }),
        D.default.createElement("path", { d: "M11 17h2l-1 1.5z", fill: t }),
        D.default.createElement("path", {
          d: "M12 18.5c-1.5 1.5 1.5 2.5 0 4.5",
          stroke: "#9E9E9E",
          strokeWidth: "1",
          fill: "none",
        }),
      ),
    soleil: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("circle", { cx: "12", cy: "12", r: "5", fill: t }),
        D.default.createElement("path", {
          d: "M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1",
          stroke: t,
          strokeWidth: "2",
          strokeLinecap: "round",
        }),
      ),
    papillon: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement(
          "g",
          { fill: t },
          D.default.createElement("path", { d: "M12 12C9 6 3 4 3 8.5S7 14 12 12z" }),
          D.default.createElement("path", { d: "M12 12c3-6 9-8 9-3.5S17 14 12 12z" }),
          D.default.createElement("path", { d: "M12 12c-3 2-7 4-6 6.5s4 0 6-6.5z", opacity: ".8" }),
          D.default.createElement("path", { d: "M12 12c3 2 7 4 6 6.5s-4 0-6-6.5z", opacity: ".8" }),
        ),
        D.default.createElement("rect", {
          x: "11.3",
          y: "7",
          width: "1.4",
          height: "11",
          rx: ".7",
          fill: "#4E342E",
        }),
      ),
    pomme: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("path", {
          fill: t,
          d: "M12 7.5c-2-1.6-6.5-1.4-7.5 2.6-1 4 1.6 10.4 4.6 10.9 1.4.2 1.9-.6 2.9-.6s1.5.8 2.9.6c3-.5 5.6-6.9 4.6-10.9-1-4-5.5-4.2-7.5-2.6z",
        }),
        D.default.createElement("path", {
          d: "M12 7.5c0-2 .6-3.6 2-4.6",
          stroke: "#5D4037",
          strokeWidth: "1.5",
          fill: "none",
          strokeLinecap: "round",
        }),
        D.default.createElement("path", {
          d: "M13 5c1.5-2 4-2.4 5.5-1.6-1 2-3.4 2.6-5.5 1.6z",
          fill: "#6E9B3A",
        }),
      ),
    cerise: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("path", {
          d: "M8 15c1-6 4-10 9-12M16 15c0-5 0-8 1-12",
          stroke: "#5D7A2A",
          strokeWidth: "1.5",
          fill: "none",
        }),
        D.default.createElement("circle", { cx: "7.5", cy: "17", r: "4", fill: t }),
        D.default.createElement("circle", { cx: "16", cy: "17.5", r: "4", fill: t }),
      ),
    fraise: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("path", { fill: t, d: "M12 21c-5-3-8-8-7-12 2-2 12-2 14 0 1 4-2 9-7 12z" }),
        D.default.createElement("path", { d: "M6 8.5l2-3 2 1.5 2-2.5 2 2.5 2-1.5 2 3z", fill: "#5D7A2A" }),
        D.default.createElement(
          "g",
          { fill: "#FFE08A" },
          D.default.createElement("circle", { cx: "9", cy: "11", r: ".8" }),
          D.default.createElement("circle", { cx: "13", cy: "10.5", r: ".8" }),
          D.default.createElement("circle", { cx: "15.5", cy: "13", r: ".8" }),
          D.default.createElement("circle", { cx: "11", cy: "14", r: ".8" }),
          D.default.createElement("circle", { cx: "12.5", cy: "17", r: ".8" }),
        ),
      ),
    champignon: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("path", { fill: t, d: "M3 12a9 7.5 0 0 1 18 0z" }),
        D.default.createElement("rect", {
          x: "9",
          y: "12",
          width: "6",
          height: "8",
          rx: "2",
          fill: "#F5E6CC",
        }),
        D.default.createElement(
          "g",
          { fill: "#fff" },
          D.default.createElement("circle", { cx: "8", cy: "9", r: "1.4" }),
          D.default.createElement("circle", { cx: "14", cy: "7.5", r: "1.6" }),
          D.default.createElement("circle", { cx: "17", cy: "10.5", r: "1.1" }),
        ),
      ),
    ruban: (t) =>
      D.default.createElement(
        "g",
        { fill: t },
        D.default.createElement("path", {
          d: "M12 2.5c-2.6 0-4.2 1.9-4.2 4.2 0 2.6 1.7 5.2 4.2 8.8 2.5-3.6 4.2-6.2 4.2-8.8 0-2.3-1.6-4.2-4.2-4.2zm0 2.3c1.2 0 2 .8 2 2 0 1.2-.8 2.7-2 4.6-1.2-1.9-2-3.4-2-4.6 0-1.2.8-2 2-2z",
        }),
        D.default.createElement("path", {
          d: "M10.5 13.6 5.3 21.5l2.9-.3 1.3 2.6 4.1-7.1zM13.5 13.6l5.2 7.9-2.9-.3-1.3 2.6-4.1-7.1z",
        }),
      ),
    trefle: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement(
          "g",
          { fill: t },
          [0, 90, 180, 270].map((e) =>
            D.default.createElement("circle", {
              key: e,
              cx: 12 + 4 * Math.cos((e * Math.PI) / 180),
              cy: 10.5 + 4 * Math.sin((e * Math.PI) / 180),
              r: "3.8",
            }),
          ),
        ),
        D.default.createElement("path", {
          d: "M12 12c1 4 2 7 4 10",
          stroke: t,
          strokeWidth: "1.6",
          fill: "none",
        }),
      ),
    lune: (t) => D.default.createElement("path", { fill: t, d: "M15 3a9 9 0 1 0 6 15A7.5 7.5 0 0 1 15 3z" }),
    nuage: (t) =>
      D.default.createElement("path", {
        fill: t,
        d: "M7 18a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9.6 4.2 4.2 0 0 1 17.5 18z",
      }),
    goutte: (t) =>
      D.default.createElement("path", {
        fill: t,
        d: "M12 3c3 4.5 6 8 6 11.5a6 6 0 0 1-12 0C6 11 9 7.5 12 3z",
      }),
    bonbon: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("ellipse", { cx: "12", cy: "12", rx: "5", ry: "4", fill: t }),
        D.default.createElement("path", {
          d: "M7.3 12 2.5 8.5v7zM16.7 12l4.8-3.5v7z",
          fill: t,
          opacity: ".75",
        }),
        D.default.createElement("path", {
          d: "M10 9l3 6",
          stroke: "rgba(255,255,255,.7)",
          strokeWidth: "1.3",
        }),
      ),
    fantome: (t) =>
      D.default.createElement(
        "g",
        null,
        D.default.createElement("path", {
          fill: t,
          d: "M12 3a7 7 0 0 0-7 7v11l2.3-1.8L9.7 21l2.3-1.8 2.3 1.8 2.4-1.8L19 21V10a7 7 0 0 0-7-7z",
        }),
        D.default.createElement("circle", { cx: "9.5", cy: "10", r: "1.3", fill: "#22302A" }),
        D.default.createElement("circle", { cx: "14.5", cy: "10", r: "1.3", fill: "#22302A" }),
      ),
    sucreorge: (t) =>
      D.default.createElement(
        "g",
        { fill: "none", strokeWidth: "3.4", strokeLinecap: "round" },
        D.default.createElement("path", { d: "M9 22V8a4 4 0 0 1 8 0v1", stroke: t }),
        D.default.createElement("path", {
          d: "M9 22V8a4 4 0 0 1 8 0v1",
          stroke: "#fff",
          strokeDasharray: "2 2.4",
        }),
      ),
    moustache: (t) =>
      D.default.createElement("path", {
        fill: t,
        d: "M12 11c-1.5-2.5-5-3-7.5-1-1.2 1-2.5 1-3.5.3.5 2.5 3 4 6 3.2 2-.6 3.5-1.5 5-2.5 1.5 1 3 1.9 5 2.5 3 .8 5.5-.7 6-3.2-1 .7-2.3.7-3.5-.3-2.5-2-6-1.5-7.5 1z",
      }),
  },
  FORMES_NEIGE = [
    ["flocon", "Flocon", ["#FFFFFF"]],
    ["etoile", "\xC9toile", ["#D4AF37", "#F4D774"]],
    ["etincelle", "\xC9tincelle", ["#F2B134", "#FFFFFF"]],
    ["confetti", "Confettis", ["#E05A73", "#F2B134", "#6E9B3A", "#24507E"]],
    ["coeur", "C\u0153ur", ["#E05A73", "#F48FB1"]],
    ["ruban", "Ruban rose", ["#F06292", "#F8BBD0"]],
    ["fleur", "Fleur", ["#F48FB1", "#CE93D8", "#FFD54F"]],
    ["papillon", "Papillon", ["#F2B134", "#64B5F6", "#F48FB1"]],
    ["trefle", "Tr\xE8fle", ["#4CAF50"]],
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
    ["crepe", "Cr\xEApe", ["#E9B35A"]],
    ["oeuf", "\u0152uf", ["#F6C6D9", "#BFE3F2", "#F9E79F"]],
    ["clochette", "Muguet", ["#FFFFFF"]],
    ["note", "Note", ["#FFFFFF", "#F2B134"]],
    ["ballon", "Ballon", ["#E05A73", "#64B5F6", "#F2B134"]],
    ["bougie", "Bougie", ["#FFFFFF", "#F48FB1"]],
    ["cadeau", "Cadeau", ["#C62828", "#2E7D32"]],
    ["boule", "Boule de No\xEBl", ["#C62828", "#D4AF37", "#2E7D32"]],
    ["sapin", "Sapin", ["#2E7D32"]],
    ["sucreorge", "Sucre d'orge", ["#C62828"]],
    ["bonbon", "Bonbon", ["#E05A73", "#F2B134", "#64B5F6"]],
    ["citrouille", "Citrouille", ["#E8731C"]],
    ["fantome", "Fant\xF4me", ["#FFFFFF"]],
    ["chauvesouris", "Chauve-souris", ["#5E3F82"]],
    ["cravate", "Cravate", ["#24507E", "#5B8FC7"]],
    ["moustache", "Moustache", ["#4E342E"]],
  ].map(([t, e, n]) => ({ id: t, nom: e, c: n })),
  Fa = Object.fromEntries(FORMES_NEIGE.map((t) => [t.id, t.c])),
  AC = ({ id: id, taille: taille = 26 }) =>
    D2[id]
      ? D.default.createElement(
          "svg",
          {
            viewBox: "0 0 24 24",
            width: taille,
            height: taille,
            "aria-hidden": "true",
            style: {
              filter: (Fa[id] || [])[0] === "#FFFFFF" ? "drop-shadow(0 0 1.5px rgba(40,70,90,.6))" : "none",
            },
          },
          D2[id]((Fa[id] || ["#999"])[0]),
        )
      : null,
  SO = Array.from({ length: 30 }, (t, e) => {
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
function Particules({ theme: theme, nb: nb = 16, dans: dans }) {
  if (!theme) return null;
  nb = theme.nb || nb;
  let r = (theme.parts || []).flatMap(([i, s]) => s.map((o) => [i, o]));
  return r.length
    ? D.default.createElement(
        "div",
        {
          className: "parts" + (dans ? " dans" : "") + (theme.sens === "haut" ? " haut" : ""),
          "aria-hidden": "true",
        },
        SO.slice(0, nb).map((i, s) => {
          let [o, a] = r[s % r.length];
          return D.default.createElement(
            "span",
            {
              key: s,
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
            o === "emoji"
              ? D.default.createElement("span", { className: "part-emoji", style: { fontSize: i.s } }, a)
              : D.default.createElement(
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
                  D2[o](a),
                ),
          );
        }),
      )
    : null;
}
var ILLU = {
    bonhomme: D.default.createElement(
      "g",
      null,
      D.default.createElement("path", {
        d: "M14 92h72",
        stroke: "#CFD8DC",
        strokeWidth: "4",
        strokeLinecap: "round",
      }),
      D.default.createElement("circle", {
        cx: "50",
        cy: "70",
        r: "21",
        fill: "#fff",
        stroke: "#B0BEC5",
        strokeWidth: "2",
      }),
      D.default.createElement("circle", {
        cx: "50",
        cy: "39",
        r: "15",
        fill: "#fff",
        stroke: "#B0BEC5",
        strokeWidth: "2",
      }),
      D.default.createElement("path", {
        d: "M31 64 14 52M69 64l17-12",
        stroke: "#6D4C41",
        strokeWidth: "3",
        strokeLinecap: "round",
      }),
      D.default.createElement("rect", {
        x: "35",
        y: "22",
        width: "30",
        height: "4",
        rx: "1.5",
        fill: "#22302A",
      }),
      D.default.createElement("rect", {
        x: "40",
        y: "7",
        width: "20",
        height: "17",
        rx: "2",
        fill: "#22302A",
      }),
      D.default.createElement("rect", { x: "40", y: "18", width: "20", height: "3.5", fill: "#C62828" }),
      D.default.createElement("circle", { cx: "44.5", cy: "36", r: "2", fill: "#22302A" }),
      D.default.createElement("circle", { cx: "55.5", cy: "36", r: "2", fill: "#22302A" }),
      D.default.createElement("path", { d: "M50 40l12 3-12 2.6z", fill: "#F57C00" }),
      D.default.createElement("path", { d: "M35 50q15 7 30 0v5.5q-15 7-30 0z", fill: "#C62828" }),
      D.default.createElement("rect", {
        x: "56",
        y: "53",
        width: "7",
        height: "15",
        rx: "2",
        fill: "#C62828",
      }),
      D.default.createElement("circle", { cx: "50", cy: "66", r: "2.3", fill: "#22302A" }),
      D.default.createElement("circle", { cx: "50", cy: "76", r: "2.3", fill: "#22302A" }),
      D.default.createElement("path", {
        d: "M84 30l2 4 4 .5-3 2.8.8 4-3.8-2-3.8 2 .8-4-3-2.8 4-.5z",
        fill: "#F4D774",
      }),
    ),
    citrouille: D.default.createElement(
      "g",
      null,
      D.default.createElement("ellipse", { cx: "50", cy: "62", rx: "36", ry: "28", fill: "#E8731C" }),
      D.default.createElement("ellipse", { cx: "36", cy: "62", rx: "17", ry: "27", fill: "#F0842A" }),
      D.default.createElement("ellipse", { cx: "64", cy: "62", rx: "17", ry: "27", fill: "#F0842A" }),
      D.default.createElement("ellipse", { cx: "50", cy: "62", rx: "12", ry: "28", fill: "#F49A3E" }),
      D.default.createElement("path", { d: "M47 35c1-9 5-13 11-15l2 4c-5 2-7 5-8 11z", fill: "#5D7A2A" }),
      D.default.createElement("path", { d: "M32 55l7-9 7 9zM54 55l7-9 7 9z", fill: "#3A1F05" }),
      D.default.createElement("path", {
        d: "M30 67q20 18 40 0l-4 1-3 4-4-3-3 4-3-4-3 4-3-4-4 3-3-4-4-1z",
        fill: "#3A1F05",
      }),
      D.default.createElement("path", {
        d: "M76 18c1.5-2.5 4-2.8 5.5-1.3 1-2.5 3.5-3 5.5-1.5-1.6.3-2.4 2.4-1.5 4.3-2.4-1.5-4.8-.8-5.5 1.3-1-1.3-2.4-1.8-4-.5-1.6-1.3-3-.8-4 .5-.8-2-3.1-2.8-5.5-1.3.9-1.9.1-4-1.5-4.3 2-1.5 4.5-1 5.5 1.5 1.5-1.5 4-1.2 5.5 1.3z",
        fill: "#2B1B3D",
        transform: "translate(-8 0) scale(1.15)",
      }),
    ),
    ruban: D.default.createElement(
      "g",
      null,
      D.default.createElement("path", {
        d: "M50 12c-11 0-18 8-18 18 0 11 7 22 18 38 11-16 18-27 18-38 0-10-7-18-18-18zm0 10c5 0 8 3 8 8 0 5-3 11-8 19-5-8-8-14-8-19 0-5 3-8 8-8z",
        fill: "#EC407A",
      }),
      D.default.createElement("path", {
        d: "M44 60 22 92l12-1 6 11 17-30zM56 60l22 32-12-1-6 11-17-30z",
        fill: "#F06292",
      }),
      D.default.createElement("path", {
        d: "M50 12c-11 0-18 8-18 18 0 3 1 7 2 10 2-9 8-16 16-16s14 7 16 16c1-3 2-7 2-10 0-10-7-18-18-18z",
        fill: "#F8BBD0",
        opacity: ".6",
      }),
    ),
    coeurs: D.default.createElement(
      "g",
      null,
      D.default.createElement("path", {
        d: "M40 84C14 66 8 50 18 39c9-9 19-4 22 3 3-7 13-12 22-3 10 11 4 27-22 45z",
        fill: "#E05A73",
      }),
      D.default.createElement("path", {
        d: "M66 62C48 50 44 39 51 31c6-6 13-3 15 2 2-5 9-8 15-2 7 8 3 19-15 31z",
        fill: "#F48FB1",
      }),
      D.default.createElement("path", {
        d: "M12 22l62 46",
        stroke: "#C69A3C",
        strokeWidth: "3",
        strokeLinecap: "round",
      }),
      D.default.createElement("path", { d: "M74 68l-9-1 6-6z", fill: "#C69A3C" }),
      D.default.createElement("path", { d: "M12 22l2 8-6-2zM12 22l8 2-2-6z", fill: "#C69A3C" }),
    ),
    oeufs: D.default.createElement(
      "g",
      null,
      D.default.createElement("path", { d: "M10 88q40-16 80 0", fill: "#CDE7B0" }),
      D.default.createElement("ellipse", { cx: "40", cy: "56", rx: "22", ry: "29", fill: "#F6C6D9" }),
      D.default.createElement("path", {
        d: "M18.5 52l5.4-4 5.4 4 5.4-4 5.3 4 5.4-4 5.4 4 5.4-4 5.4 4",
        fill: "none",
        stroke: "#fff",
        strokeWidth: "3",
      }),
      D.default.createElement("circle", { cx: "32", cy: "68", r: "2.5", fill: "#BFE3F2" }),
      D.default.createElement("circle", { cx: "44", cy: "72", r: "2.5", fill: "#F9E79F" }),
      D.default.createElement("circle", { cx: "38", cy: "38", r: "2.5", fill: "#BFE3F2" }),
      D.default.createElement("circle", { cx: "72", cy: "74", r: "14", fill: "#FFD54F" }),
      D.default.createElement("circle", { cx: "72", cy: "56", r: "10", fill: "#FFD54F" }),
      D.default.createElement("circle", { cx: "75", cy: "54", r: "1.6", fill: "#22302A" }),
      D.default.createElement("path", { d: "M81 57l6 1.5-6 2z", fill: "#F57C00" }),
      D.default.createElement("path", {
        d: "M62 72q-4-6 2-9",
        fill: "none",
        stroke: "#F2B134",
        strokeWidth: "3",
        strokeLinecap: "round",
      }),
    ),
    muguet: D.default.createElement(
      "g",
      null,
      D.default.createElement("path", {
        d: "M40 92C34 60 48 30 70 18",
        fill: "none",
        stroke: "#4E7F3E",
        strokeWidth: "3",
        strokeLinecap: "round",
      }),
      D.default.createElement("path", { d: "M60 92C30 80 26 46 44 30c4 26 12 44 16 62z", fill: "#7FB35F" }),
      [
        [46, 46],
        [52, 36],
        [59, 28],
        [66, 22],
        [42, 58],
      ].map(([t, e], n) =>
        D.default.createElement(
          "g",
          { key: n },
          D.default.createElement("path", { d: `M${t} ${e}v5`, stroke: "#4E7F3E", strokeWidth: "1.6" }),
          D.default.createElement("path", {
            d: `M${t - 6} ${e + 13}c0-6 2.5-9 6-9s6 3 6 9c-1.4-.8-2.6-.8-4 0-1.3-.8-2.7-.8-4 0-1.4-.8-2.6-.8-4 0z`,
            fill: "#fff",
            stroke: "#9CC57F",
            strokeWidth: "1.3",
          }),
        ),
      ),
    ),
    bouquet: D.default.createElement(
      "g",
      null,
      D.default.createElement("path", {
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
        D.default.createElement(
          "g",
          { key: r },
          [0, 72, 144, 216, 288].map((i) =>
            D.default.createElement("circle", {
              key: i,
              cx: t + 7 * Math.sin((i * Math.PI) / 180),
              cy: e - 7 * Math.cos((i * Math.PI) / 180),
              r: "6",
              fill: n,
            }),
          ),
          D.default.createElement("circle", { cx: t, cy: e, r: "4.5", fill: "#FFF3C4" }),
        ),
      ),
      D.default.createElement("path", { d: "M40 74l10 6 10-6-3 10-7-3-7 3z", fill: "#E05A73" }),
    ),
    papa: D.default.createElement(
      "g",
      null,
      D.default.createElement("path", {
        d: "M50 22c-5-7-16-8-24-3-3 2-7 2-9 0 1 7 8 11 16 9 7-1 12-3 17-6 5 3 10 5 17 6 8 2 15-2 16-9-2 2-6 2-9 0-8-5-19-4-24 3z",
        fill: "#4E342E",
      }),
      D.default.createElement("path", { d: "M43 38h14l-3 7 7 33-11 13-11-13 7-33z", fill: "#24507E" }),
      D.default.createElement("path", { d: "M43 38h14l-3 7h-8z", fill: "#1A3B5E" }),
      D.default.createElement("path", {
        d: "M47 56l9-4M45 66l12-5M46 76l9-4",
        stroke: "#5B8FC7",
        strokeWidth: "2.5",
      }),
    ),
    feux: D.default.createElement(
      "g",
      null,
      Array.from({ length: 14 }, (t, e) => {
        let n = (e * Math.PI * 2) / 14,
          r = ["#1F3A93", "#D7263D", "#F2B134"][e % 3];
        return D.default.createElement(
          "g",
          { key: e },
          D.default.createElement("path", {
            d: `M${50 + 10 * Math.cos(n)} ${42 + 10 * Math.sin(n)}L${50 + 30 * Math.cos(n)} ${42 + 30 * Math.sin(n)}`,
            stroke: r,
            strokeWidth: "3",
            strokeLinecap: "round",
          }),
          D.default.createElement("circle", {
            cx: 50 + 36 * Math.cos(n),
            cy: 42 + 36 * Math.sin(n),
            r: "2.6",
            fill: r,
          }),
        );
      }),
      D.default.createElement("circle", { cx: "50", cy: "42", r: "4", fill: "#F2B134" }),
      D.default.createElement("path", { d: "M8 92h84", stroke: "#1F3A93", strokeWidth: "3" }),
      D.default.createElement("path", { d: "M14 92l4-8 4 8M78 92l4-8 4 8", fill: "#D7263D" }),
    ),
    galette: D.default.createElement(
      "g",
      null,
      D.default.createElement("ellipse", { cx: "50", cy: "70", rx: "38", ry: "18", fill: "#D99A3A" }),
      D.default.createElement("ellipse", { cx: "50", cy: "66", rx: "38", ry: "18", fill: "#EBB65A" }),
      D.default.createElement("path", {
        d: "M26 58l14 16M38 52l20 22M52 50l18 20M64 52l10 12M30 72l12-18M44 78l20-28M60 80l14-20",
        stroke: "#C98428",
        strokeWidth: "1.6",
      }),
      D.default.createElement("path", {
        d: "M28 40l6-22 10 14 6-20 6 20 10-14 6 22z",
        fill: "#D4AF37",
        stroke: "#B8901C",
        strokeWidth: "1.5",
      }),
      D.default.createElement("circle", { cx: "50", cy: "12", r: "3", fill: "#E05A73" }),
      D.default.createElement("circle", { cx: "34", cy: "18", r: "2.5", fill: "#1F3A93" }),
      D.default.createElement("circle", { cx: "66", cy: "18", r: "2.5", fill: "#1F3A93" }),
    ),
    crepes: D.default.createElement(
      "g",
      null,
      D.default.createElement("ellipse", { cx: "50", cy: "84", rx: "38", ry: "8", fill: "#E0E0E0" }),
      [76, 69, 62, 55].map((t, e) =>
        D.default.createElement("ellipse", {
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
      D.default.createElement("path", {
        d: "M28 52c6 4 12 0 16 6 2 3 1 9 4 9s2-7 5-8c4-1 8 3 12-1 4-3 7-2 9-1-4-6-14-8-24-8s-18 1-22 3z",
        fill: "#5D3A1A",
      }),
      D.default.createElement("circle", { cx: "70", cy: "30", r: "4", fill: "#E05A73" }),
      D.default.createElement("circle", { cx: "78", cy: "38", r: "3.5", fill: "#E05A73" }),
      D.default.createElement("path", {
        d: "M70 26c1-4 4-6 7-6",
        stroke: "#5D7A2A",
        strokeWidth: "2",
        fill: "none",
      }),
    ),
    notes: D.default.createElement(
      "g",
      { fill: "#4F3A8C" },
      D.default.createElement("path", { d: "M30 78a9 7 0 1 1-4-6V30l38-8v44a9 7 0 1 1-4-6V36l-30 6z" }),
      D.default.createElement("path", { d: "M78 46a6 5 0 1 1-3-4V18l8 4-5 2z", fill: "#F2B134" }),
      D.default.createElement("path", {
        d: "M16 34a5 4 0 1 1-2-3.4V16",
        stroke: "#E05A73",
        strokeWidth: "2.5",
        fill: "none",
      }),
    ),
    vin: D.default.createElement(
      "g",
      null,
      D.default.createElement("path", {
        d: "M30 14h12v16c8 4 10 10 10 18v40a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V48c0-8 2-14 10-18z",
        fill: "#4A1428",
      }),
      D.default.createElement("rect", {
        x: "30",
        y: "10",
        width: "12",
        height: "6",
        rx: "1",
        fill: "#2A0A16",
      }),
      D.default.createElement("rect", {
        x: "22",
        y: "54",
        width: "28",
        height: "20",
        rx: "2",
        fill: "#F7F1DE",
      }),
      D.default.createElement("path", { d: "M27 62h18M27 67h12", stroke: "#9C3D6A", strokeWidth: "2" }),
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
        D.default.createElement("circle", {
          key: n,
          cx: t,
          cy: e,
          r: "6",
          fill: n % 2 ? "#7B1E4A" : "#9C3D6A",
        }),
      ),
      D.default.createElement("path", {
        d: "M76 42c0-6 4-9 9-10",
        stroke: "#5D7A2A",
        strokeWidth: "2.5",
        fill: "none",
      }),
      D.default.createElement("path", { d: "M80 36c6-6 12-4 14 0-5 2-10 2-14 0z", fill: "#7FB35F" }),
    ),
    painepice: D.default.createElement(
      "g",
      null,
      D.default.createElement("path", {
        d: "M50 10a12 12 0 0 1 9 20h15a7 7 0 0 1 0 14H62l8 34a7 7 0 0 1-13 4l-7-18-7 18a7 7 0 0 1-13-4l8-34H26a7 7 0 0 1 0-14h15a12 12 0 0 1 9-20z",
        fill: "#B9722A",
      }),
      D.default.createElement("circle", { cx: "45.5", cy: "20", r: "1.8", fill: "#fff" }),
      D.default.createElement("circle", { cx: "54.5", cy: "20", r: "1.8", fill: "#fff" }),
      D.default.createElement("path", {
        d: "M45 26q5 4 10 0",
        stroke: "#fff",
        strokeWidth: "1.8",
        fill: "none",
        strokeLinecap: "round",
      }),
      D.default.createElement("circle", { cx: "50", cy: "44", r: "2.4", fill: "#E05A73" }),
      D.default.createElement("circle", { cx: "50", cy: "54", r: "2.4", fill: "#2E7D32" }),
      D.default.createElement("path", {
        d: "M24 37h6M70 37h6M38 80l4-2M58 78l4 2",
        stroke: "#fff",
        strokeWidth: "2",
        strokeLinecap: "round",
      }),
      D.default.createElement("path", {
        d: "M80 70l2 4 4.5.6-3.3 3 .8 4.4-4-2.2-4 2.2.8-4.4-3.3-3 4.5-.6z",
        fill: "#D4AF37",
      }),
    ),
    champagne: D.default.createElement(
      "g",
      null,
      D.default.createElement("path", {
        d: "M30 24h18l-2 22c-1 6-4 9-7 9s-6-3-7-9z",
        fill: "#F4D774",
        stroke: "#B8901C",
        strokeWidth: "1.5",
        transform: "rotate(-14 39 55)",
      }),
      D.default.createElement("path", {
        d: "M39 55v26M31 82h16",
        stroke: "#B8901C",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        transform: "rotate(-14 39 55)",
      }),
      D.default.createElement("path", {
        d: "M54 24h18l-2 22c-1 6-4 9-7 9s-6-3-7-9z",
        fill: "#F4D774",
        stroke: "#B8901C",
        strokeWidth: "1.5",
        transform: "rotate(14 63 55)",
      }),
      D.default.createElement("path", {
        d: "M63 55v26M55 82h16",
        stroke: "#B8901C",
        strokeWidth: "2.5",
        strokeLinecap: "round",
        transform: "rotate(14 63 55)",
      }),
      D.default.createElement("circle", { cx: "50", cy: "14", r: "2", fill: "#D4AF37" }),
      D.default.createElement("circle", { cx: "44", cy: "8", r: "1.5", fill: "#D4AF37" }),
      D.default.createElement("circle", { cx: "57", cy: "7", r: "1.5", fill: "#D4AF37" }),
      D.default.createElement("path", {
        d: "M14 30l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6zM86 26l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z",
        fill: "#D4AF37",
      }),
    ),
  },
  IllustrationTheme = ({ theme: theme, taille: taille = 96 }) =>
    theme.illuEmoji
      ? D.default.createElement(
          "span",
          {
            "aria-hidden": "true",
            style: {
              display: "inline-block",
              width: taille,
              height: taille,
              fontSize: taille * 0.72,
              lineHeight: taille + "px",
              textAlign: "center",
            },
          },
          theme.illuEmoji,
        )
      : D.default.createElement(
          "svg",
          { viewBox: "0 0 100 100", width: taille, height: taille, "aria-hidden": "true" },
          ILLU[theme.illu],
        );
function CarteTheme({ theme: theme }) {
  return theme
    ? D.default.createElement(
        "div",
        {
          className: "carte-theme" + (theme.magie ? " magie" : "") + (Zn(theme) ? " " + Zn(theme) : ""),
          style: { background: theme.soft, borderColor: theme.accent + "55" },
        },
        D.default.createElement(
          "div",
          { className: "ct-txt" },
          D.default.createElement("div", { className: "ct-titre", style: { color: theme.top } }, theme.titre),
          D.default.createElement("div", { className: "ct-msg" }, theme.message),
          theme.magie &&
            theme.id === "noel" &&
            xC() &&
            D.default.createElement("div", { className: "ct-compte" }, xC()),
        ),
        D.default.createElement(
          "div",
          { className: "ct-illu" },
          D.default.createElement(IllustrationTheme, { theme: theme, taille: 92 }),
        ),
      )
    : null;
}
var Wi = (t, e) => {
    let n = Math.sin(t * 91.17 + e * 47.31) * 43758.5453;
    return n - Math.floor(n);
  },
  FO = Array.from({ length: 48 }, (t, e) => ({
    x: Wi(e, 1) * 100,
    s: 2 + Wi(e, 2) * 5,
    d: 7 + Wi(e, 3) * 10,
    delai: -Wi(e, 4) * 17,
    b: Wi(e, 5) < 0.3 ? 1.2 : 0,
    o: 0.5 + Wi(e, 6) * 0.5,
    dx: 10 + Wi(e, 7) * 30,
  }));
function Neige({ nb: nb = 40, dans: dans }) {
  return D.default.createElement(
    "div",
    { className: "neige" + (dans ? " dans" : ""), "aria-hidden": "true" },
    FO.slice(0, nb).map((n, r) =>
      D.default.createElement(
        "i",
        { key: r, style: { left: n.x + "%", animationDuration: n.d + "s", animationDelay: n.delai + "s" } },
        D.default.createElement("b", {
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
var EC = ["#FF4D4D", "#FFD54F", "#4FC3F7", "#81C784", "#FF8A65", "#BA68C8"];
function GuirlandeNoel({ n: t = 15, apercu: apercu }) {
  return D.default.createElement(
    "div",
    { className: "guirlande" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
    D.default.createElement(
      "svg",
      { className: "gl-fil", viewBox: "0 0 300 20", preserveAspectRatio: "none" },
      D.default.createElement("path", {
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
      D.default.createElement("span", {
        key: r,
        style: {
          left: ((r + 0.5) * 100) / t + "%",
          "--c": EC[r % EC.length],
          animationDelay: (r % 3) * 0.5 + Wi(r, 9) * 0.4 + "s",
        },
      }),
    ),
  );
}
var SvgBonnet = ({ taille: taille = 30, style: style }) =>
  D.default.createElement(
    "svg",
    {
      className: "bonnet",
      viewBox: "0 0 40 34",
      width: taille,
      height: taille * 0.85,
      style: style,
      "aria-hidden": "true",
    },
    D.default.createElement("path", {
      d: "M6 26C8 12 16 4 27 4c5 0 8 5 7 12-2-3-5-4-7-3 1 4 2 8 2 13z",
      fill: "#D32F2F",
    }),
    D.default.createElement("path", { d: "M27 4c5 0 8 5 7 12-2-3-5-4-7-3z", fill: "#B71C1C" }),
    D.default.createElement("rect", { x: "3", y: "24", width: "30", height: "8", rx: "4", fill: "#FFFFFF" }),
    D.default.createElement("circle", { cx: "34", cy: "17", r: "4.5", fill: "#FFFFFF" }),
  );
function Traineau({ boucle: boucle, apercu: apercu }) {
  return D.default.createElement(
    "div",
    { className: "traineau" + (boucle ? " boucle" : "") + (apercu ? " apercu" : ""), "aria-hidden": "true" },
    D.default.createElement(
      "svg",
      { viewBox: "0 0 150 46", width: "150", height: "46" },
      D.default.createElement(
        "g",
        { fill: "#F4D774" },
        [
          [64, 0],
          [98, 0],
        ].map(([n], r) =>
          D.default.createElement(
            "g",
            { key: r, transform: `translate(${n} 6)` },
            D.default.createElement("path", {
              d: "M4 18c4-4 14-5 20-3l4-5 3 1-2 6c1 2 0 4-2 5l2 8-2 .6-3-7-10 1-2 7-2-.4 1-7c-4 0-7-2-7-6z",
            }),
            D.default.createElement("path", {
              d: "M27 10l-2-6M27 10l4-5M25 5l-3-2M30 6l3-3",
              stroke: "#F4D774",
              strokeWidth: "1.3",
              fill: "none",
              strokeLinecap: "round",
            }),
          ),
        ),
        D.default.createElement("path", { d: "M46 22h20M90 22h10", stroke: "#F4D774", strokeWidth: "1" }),
        D.default.createElement(
          "g",
          { transform: "translate(-80 0)" },
          D.default.createElement("path", { d: "M88 14h30c6 0 8 4 8 9 0 4-3 7-7 7H92c-3 0-5-2-5-5z" }),
          D.default.createElement("path", {
            d: "M84 34h40c4 0 6-2 7-5",
            stroke: "#F4D774",
            strokeWidth: "2",
            fill: "none",
            strokeLinecap: "round",
          }),
          D.default.createElement("circle", { cx: "108", cy: "8", r: "4.5" }),
          D.default.createElement("path", { d: "M102 14c0-5 3-7 6-7s6 2 6 7z" }),
          D.default.createElement("path", { d: "M104 4l4-4 5 3z", fill: "#FF6B6B" }),
          D.default.createElement("circle", { cx: "113.5", cy: "3", r: "1.6", fill: "#fff" }),
          D.default.createElement("rect", {
            x: "90",
            y: "6",
            width: "9",
            height: "9",
            rx: "2",
            fill: "#81C784",
          }),
          D.default.createElement("rect", { x: "93.6", y: "6", width: "1.8", height: "9", fill: "#FF6B6B" }),
        ),
        D.default.createElement("circle", {
          cx: "0",
          cy: "17",
          r: "2.2",
          fill: "#FF5252",
          transform: "translate(130 6)",
        }),
      ),
    ),
    D.default.createElement("span", { className: "poussiere" }),
  );
}
var VillageNoel = () =>
  D.default.createElement(
    "svg",
    {
      className: "village",
      viewBox: "0 0 400 150",
      preserveAspectRatio: "xMidYMax slice",
      "aria-hidden": "true",
    },
    D.default.createElement("path", {
      d: "M0 96Q60 72 120 88t120-6 160 8V150H0z",
      fill: "#8FA6C6",
      opacity: ".45",
    }),
    [
      [14, 92, 14],
      [40, 86, 18],
      [330, 88, 16],
      [360, 84, 20],
      [388, 90, 14],
    ].map(([t, e, n], r) =>
      D.default.createElement(
        "g",
        { key: "s" + r },
        D.default.createElement("path", {
          d: `M${t} ${e - n}l${n * 0.45} ${n}h-${n * 0.9}z`,
          fill: "#23415A",
        }),
        D.default.createElement("path", {
          d: `M${t} ${e - n}l${n * 0.2} ${n * 0.42}-${n * 0.2} -${n * 0.1}-${n * 0.2} ${n * 0.1}z`,
          fill: "#F4F8FC",
        }),
      ),
    ),
    D.default.createElement(
      "g",
      null,
      D.default.createElement("rect", { x: "226", y: "72", width: "44", height: "36", fill: "#2A3552" }),
      D.default.createElement("path", { d: "M222 74l26-16 26 16z", fill: "#F4F8FC" }),
      D.default.createElement("rect", { x: "264", y: "44", width: "22", height: "64", fill: "#2E3A5A" }),
      D.default.createElement("path", { d: "M262 46c-1-10 7-12 13-22 6 10 14 12 13 22z", fill: "#45507A" }),
      D.default.createElement("path", {
        d: "M266 40c2-6 6-9 9-16 3 7 7 10 9 16-4-3-14-3-18 0z",
        fill: "#F4F8FC",
      }),
      D.default.createElement("rect", { x: "272", y: "14", width: "6", height: "10", fill: "#45507A" }),
      D.default.createElement("path", { d: "M275 6v8", stroke: "#F4D774", strokeWidth: "1.4" }),
      D.default.createElement("circle", { cx: "275", cy: "5", r: "2.2", fill: "#F4D774" }),
      D.default.createElement("circle", { cx: "275", cy: "58", r: "4.5", fill: "#F4E2A8" }),
      D.default.createElement("path", {
        d: "M275 55.5v2.5l1.8 1",
        stroke: "#2E3A5A",
        strokeWidth: ".9",
        fill: "none",
      }),
      D.default.createElement("path", {
        d: "M240 108v-14a6 6 0 0 1 12 0v14z",
        fill: "#FFD86B",
        className: "fenetre",
      }),
    ),
    [
      [70, 22, 20],
      [100, 26, 24],
      [140, 20, 18],
      [170, 24, 22],
      [300, 22, 20],
      [190, 18, 16],
    ].map(([t, e, n], r) =>
      D.default.createElement(
        "g",
        { key: "m" + r },
        D.default.createElement("rect", {
          x: t,
          y: 108 - n,
          width: e,
          height: n,
          fill: r % 2 ? "#2A3552" : "#33406A",
        }),
        D.default.createElement("path", {
          d: `M${t - 3} ${110 - n}l${e / 2 + 3} -${e * 0.55} ${e / 2 + 3} ${e * 0.55}z`,
          fill: "#F4F8FC",
        }),
        D.default.createElement("rect", {
          x: t + e * 0.22,
          y: 112 - n + 4,
          width: e * 0.22,
          height: e * 0.22,
          fill: "#FFD86B",
          className: "fenetre",
          style: { animationDelay: r * 0.7 + "s" },
        }),
        e > 20 &&
          D.default.createElement("rect", {
            x: t + e * 0.58,
            y: 112 - n + 4,
            width: e * 0.22,
            height: e * 0.22,
            fill: "#FFD86B",
            className: "fenetre",
            style: { animationDelay: r * 0.4 + 1 + "s" },
          }),
        r === 1 &&
          D.default.createElement("rect", {
            x: t + e * 0.7,
            y: 108 - n - e * 0.5,
            width: "4",
            height: "9",
            fill: "#2A3552",
          }),
      ),
    ),
    D.default.createElement("path", { d: "M0 112Q100 98 200 108t200-4V150H0z", fill: "#EEF4FA" }),
    D.default.createElement("path", { d: "M0 122Q120 112 220 120t180-6V150H0z", fill: "#FFFFFF" }),
    [
      [24, 132, 30],
      [372, 128, 34],
      [56, 140, 18],
    ].map(([t, e, n], r) =>
      D.default.createElement(
        "g",
        { key: "f" + r },
        D.default.createElement("path", {
          d: `M${t} ${e - n}l${n * 0.38} ${n * 0.55}h-${n * 0.14}l${n * 0.3} ${n * 0.45}h-${n * 1.08}l${n * 0.3} -${n * 0.45}h-${n * 0.14}z`,
          fill: "#1E3A4A",
        }),
        D.default.createElement("path", {
          d: `M${t} ${e - n}l${n * 0.16} ${n * 0.24}-${n * 0.16} -${n * 0.06}-${n * 0.16} ${n * 0.06}z`,
          fill: "#fff",
        }),
      ),
    ),
  );
function CielEtoile({ apercu: apercu }) {
  return D.default.createElement(
    "div",
    { className: "decor-magie", "aria-hidden": "true" },
    D.default.createElement("div", { className: "etoiles-ciel" }),
    D.default.createElement("div", { className: "lune" }),
    D.default.createElement(Traineau, { apercu: apercu }),
    D.default.createElement(VillageNoel, null),
    D.default.createElement(Neige, { nb: apercu ? 26 : 44, dans: apercu }),
  );
}
function xC(t = new Date()) {
  let e = t.getFullYear(),
    n = Math.round((new Date(e, 11, 25, 12) - new Date(e, t.getMonth(), t.getDate(), 12)) / 864e5);
  return n < 0 || n > 40
    ? ""
    : n === 0
      ? "\u{1F384} Joyeuses f\xEAtes !"
      : n === 1
        ? "\u{1F384} C'est le r\xE9veillon ce soir !"
        : "\u{1F384} Plus que " + n + " jours avant les f\xEAtes";
}
