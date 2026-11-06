// ═══════════════════════════════════════════════════════════
//  Thèmes de saison — habillage de l'application client
//  (Noël, Halloween, Saint-Valentin…). Marion les active, les désactive
//  et ajuste leurs dates dans l'administration (onglet Thèmes).
// ═══════════════════════════════════════════════════════════
import React from "react";

const iso = (y, m, d) => new Date(y, m - 1, d, 12).toLocaleDateString("sv-SE");
const plus = (s, n) => { const d = new Date(s + "T12:00"); d.setDate(d.getDate() + n); return d.toLocaleDateString("sv-SE"); };
// n-ième jour de la semaine (0 = dimanche) d'un mois
const nieme = (y, m, jour, n) => { const d = new Date(y, m - 1, 1, 12); while (d.getDay() !== jour) d.setDate(d.getDate() + 1); d.setDate(d.getDate() + 7 * (n - 1)); return d.toLocaleDateString("sv-SE"); };
const dernier = (y, m, jour) => { const d = new Date(y, m, 0, 12); while (d.getDay() !== jour) d.setDate(d.getDate() - 1); return d.toLocaleDateString("sv-SE"); };
// Dimanche de Pâques (algorithme de Meeus)
export function paques(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25),
    g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4,
    l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
    mois = Math.floor((h + l - 7 * m + 114) / 31), jour = ((h + l - 7 * m + 114) % 31) + 1;
  return iso(y, mois, jour);
}
// Fête des mères : dernier dimanche de mai, décalée au 1er dimanche de juin si c'est la Pentecôte
const fdm = (y) => { const d = dernier(y, 5, 0); return d === plus(paques(y), 49) ? plus(d, 7) : d; };

const FRISE = (a, b, w = 10) => `repeating-linear-gradient(90deg,${a} 0 ${w}px,${b} ${w}px ${2 * w}px)`;

// ── Catalogue (ordre du calendrier) ──
export const THEMES = [
  { id: "galette", nom: "Galette des rois", titre: "Bonne Épiphanie !", message: "Galettes frangipane et brioches des rois : pensez à réserver la vôtre.",
    top: "#7A5A12", accent: "#C69A3C", soft: "#FBF3DC", frise: FRISE("#C69A3C", "#F4E2A8"), parts: [["etoile", ["#D4AF37", "#E8C766"]]], illu: "galette",
    dates: (y) => [iso(y, 1, 2), iso(y, 1, 15)] },
  { id: "chandeleur", nom: "Chandeleur", titre: "C'est la Chandeleur !", message: "Farine, œufs, lait, pâte à tartiner et confitures maison : tout pour vos crêpes.",
    top: "#9A5A22", accent: "#E0A040", soft: "#FCF0DE", frise: FRISE("#E0A040", "#F7DDB0"), parts: [["crepe", ["#E9B35A", "#D9973A"]]], illu: "crepes",
    dates: (y) => [iso(y, 1, 28), iso(y, 2, 2)] },
  { id: "valentin", nom: "Saint-Valentin", titre: "Joyeuse Saint-Valentin", message: "Un plateau à partager en amoureux ? Commandez-le dans l'application 💕",
    top: "#A3243E", accent: "#E05A73", soft: "#FCE7EC", frise: FRISE("#E05A73", "#F7C6D0"), parts: [["coeur", ["#E05A73", "#C2185B", "#F48FB1"]]], sens: "haut", illu: "coeurs",
    dates: (y) => [iso(y, 2, 7), iso(y, 2, 14)] },
  { id: "paques", nom: "Pâques", titre: "Joyeuses Pâques !", message: "Chocolats, œufs et lapins : la chasse aux œufs commence à l'épicerie.",
    top: "#4E7F3E", accent: "#E9A23B", soft: "#F3F7E6", frise: FRISE("#F6C6D9", "#CDE7B0", 12), parts: [["oeuf", ["#F6C6D9", "#BFE3F2", "#F9E79F", "#C8E6C9"]]], illu: "oeufs",
    dates: (y) => { const p = paques(y); return [plus(p, -7), plus(p, 1)]; } },
  { id: "muguet", nom: "1er mai — Muguet", titre: "Un brin de bonheur", message: "Le 1er mai, offrez du muguet porte-bonheur 🌿",
    top: "#3F6B3A", accent: "#8BBF6A", soft: "#EEF6E8", frise: FRISE("#8BBF6A", "#FFFFFF", 8), parts: [["clochette", ["#FFFFFF"]]], illu: "muguet",
    dates: (y) => [iso(y, 4, 28), iso(y, 5, 1)] },
  { id: "meres", nom: "Fête des mères", titre: "Bonne fête maman !", message: "Dimanche, c'est la fête des mamans : un plateau gourmand ou un panier garni pour la gâter.",
    top: "#B04A73", accent: "#E88AAE", soft: "#FCEAF2", frise: FRISE("#E88AAE", "#FBD3E2"), parts: [["fleur", ["#F48FB1", "#CE93D8", "#FFD54F"]]], illu: "bouquet",
    prio: 1, dates: (y) => { const d = fdm(y); return [plus(d, -6), d]; } },
  { id: "musique", nom: "Fête de la musique", titre: "Fête de la musique", message: "Ce soir, apéro en musique ? Les plateaux sont prêts 🎶",
    top: "#4F3A8C", accent: "#F2B134", soft: "#EFEAF8", frise: FRISE("#F2B134", "#4F3A8C", 8), parts: [["note", ["#4F3A8C", "#F2B134", "#E05A73"]]], sens: "haut", illu: "notes",
    dates: (y) => [iso(y, 6, 21), iso(y, 6, 21)] },
  { id: "peres", nom: "Fête des pères", titre: "Bonne fête papa !", message: "Saucissons, fromages, bières locales : de quoi faire plaisir à papa.",
    top: "#24507E", accent: "#5B8FC7", soft: "#E6EFF8", frise: FRISE("#24507E", "#9CC0E6"), parts: [["cravate", ["#24507E", "#5B8FC7", "#C27B42"]], ["moustache", ["#4E342E"]]], illu: "papa",
    prio: 1, dates: (y) => { const d = nieme(y, 6, 0, 3); return [plus(d, -6), d]; } },
  { id: "juillet", nom: "14 juillet", titre: "Bon 14 juillet !", message: "Pique-nique, barbecue ou apéro au feu d'artifice : tout est à l'épicerie.",
    top: "#1F3A93", accent: "#D7263D", soft: "#EAF0FB", frise: "linear-gradient(90deg,#1F3A93 0 33.3%,#FFFFFF 33.3% 66.6%,#D7263D 66.6%)", parts: [["confetti", ["#1F3A93", "#D7263D", "#FFFFFF"]], ["etincelle", ["#F2B134"]]], illu: "feux",
    dates: (y) => [iso(y, 7, 10), iso(y, 7, 14)] },
  { id: "halloween", nom: "Halloween", titre: "Joyeux Halloween !", message: "Des bonbons pour les petits monstres… et des citrouilles pour la soupe 🎃",
    top: "#2B1B3D", accent: "#E8731C", soft: "#FBEADB", frise: FRISE("#E8731C", "#2B1B3D", 14), parts: [["citrouille", ["#E8731C"]], ["chauvesouris", ["#5E3F82"]]], illu: "citrouille",
    dates: (y) => [iso(y, 10, 24), iso(y, 10, 31)] },
  { id: "beaujolais", nom: "Beaujolais nouveau", titre: "Le Beaujolais nouveau est arrivé !", message: "Avec un plateau charcuterie, c'est encore meilleur. À consommer avec modération.",
    top: "#6B1F3A", accent: "#9C3D6A", soft: "#F6E8EE", frise: FRISE("#9C3D6A", "#E7C7D6"), parts: [["raisin", ["#7B1E4A", "#9C3D6A"]]], illu: "vin",
    dates: (y) => { const d = nieme(y, 11, 4, 3); return [d, plus(d, 3)]; } },
  { id: "stnicolas", nom: "Saint-Nicolas", titre: "Bonne Saint-Nicolas !", message: "Pains d'épices, mandarines et chocolats pour les enfants sages.",
    top: "#8E2430", accent: "#D4AF37", soft: "#FBEFE4", frise: FRISE("#D4AF37", "#8E2430"), parts: [["etoile", ["#D4AF37", "#F4D774"]], ["flocon", ["#FFFFFF"]]], illu: "painepice",
    dates: (y) => [iso(y, 12, 1), iso(y, 12, 6)] },
  { id: "noel", nom: "Noël", titre: "Joyeux Noël !", message: "Commandez vos plateaux de fêtes dès maintenant dans l'application 🎄",
    top: "#A4161A", accent: "#2E7D32", soft: "#FCEDEC", frise: "repeating-linear-gradient(45deg,#C62828 0 9px,#FFFFFF 9px 18px)", parts: [["flocon", ["#FFFFFF"]]], illu: "bonhomme",
    dates: (y) => [iso(y, 12, 7), iso(y, 12, 25)] },
  { id: "nouvelan", nom: "Nouvel An", titre: "Bonne année !", message: "Tout pour le réveillon : bulles, foie gras, plateaux… Meilleurs vœux de toute l'équipe ✨",
    top: "#1B1B2F", accent: "#D4AF37", soft: "#F7F1DE", frise: FRISE("#D4AF37", "#1B1B2F", 6), parts: [["confetti", ["#D4AF37", "#F4D774", "#FFFFFF"]], ["etincelle", ["#D4AF37"]]], illu: "champagne",
    dates: (y) => [iso(y, 12, 26), iso(y + 1, 1, 1)] },
];
export const themeParId = (id, cfg) => THEMES.find(t => t.id === id) || persos(cfg).find(t => t.id === id);

// ── Thèmes créés par Marion ──
const hexRgb = (h) => { const m = /^#?([0-9a-f]{6})$/i.exec(h || ""); const n = m ? parseInt(m[1], 16) : 0x1C433B; return [n >> 16, (n >> 8) & 255, n & 255]; };
export const eclaircir = (h, t) => "#" + hexRgb(h).map(v => Math.round(v + (255 - v) * t).toString(16).padStart(2, "0")).join("");
export const emojisDe = (txt) => {
  const t = String(txt || "");
  const l = typeof Intl !== "undefined" && Intl.Segmenter ? [...new Intl.Segmenter("fr", { granularity: "grapheme" }).segment(t)].map(x => x.segment) : Array.from(t);
  return l.filter(x => x.trim() && !/^[\w\s.,;:!?'"()\-]$/.test(x)).slice(0, 6);
};
export function persoVersTheme(p) {
  const couleur = /^#[0-9a-f]{6}$/i.test(p.couleur || "") ? p.couleur : "#1C433B";
  const em = emojisDe(p.emojis);
  return {
    id: p.id, perso: true, nom: p.nom || "Mon thème", titre: p.titre || p.nom || "", message: p.message || "",
    top: couleur, accent: eclaircir(couleur, .35), soft: eclaircir(couleur, .9), frise: FRISE(eclaircir(couleur, .35), eclaircir(couleur, .82)),
    parts: em.length ? [["emoji", em]] : [], illuEmoji: emojisDe(p.illu)[0] || em[0] || "⭐", prio: 2,
    dates: (y) => {
      if (!p.du || !p.au) return ["9999-12-30", "9999-12-31"];
      if (!p.chaqueAnnee) return Number(p.du.slice(0, 4)) === y ? [p.du, p.au] : ["9999-12-30", "9999-12-31"];
      const md1 = p.du.slice(5), md2 = p.au.slice(5);
      return [y + "-" + md1, (md2 < md1 ? y + 1 : y) + "-" + md2];
    },
  };
}
const persos = (cfg) => ((cfg || {}).perso || []).filter(p => p && p.id).map(persoVersTheme);

// Dates d'un thème pour l'année Y (réglage de Marion si fait pour cette année, sinon dates habituelles)
export function periodeTheme(t, cfgItem, y) {
  const [du, au] = t.dates(y);
  const o = cfgItem || {};
  if (o.du && o.au && o.du.slice(0, 4) === du.slice(0, 4)) return [o.du, o.au, true];
  return [du, au, false];
}

// Thème à afficher aujourd'hui
export function themeDuJour(cfg, aujourdhui) {
  const c = cfg || {};
  if (c.mode === "off") return null;
  const j = aujourdhui || new Date().toLocaleDateString("sv-SE");
  const habiller = (t) => t && { ...t, message: (c.items?.[t.id]?.message || "").trim() || t.message, anim: c.animations !== false };
  if (c.mode === "force") return habiller(themeParId(c.force, c));
  const y = Number(j.slice(0, 4));
  let choix = null, duree = 1e9, prio = -1;
  const actifsPerso = (c.perso || []).filter(p => p && p.active !== false).map(p => p.id);
  for (const t of [...THEMES, ...persos(c).filter(t => actifsPerso.includes(t.id))]) {
    if (!t.perso && c.items?.[t.id]?.active === false) continue;
    for (const yy of [y - 1, y]) {
      const [du, au] = periodeTheme(t, c.items?.[t.id], yy);
      if (du <= j && j <= au) {
        const n = (new Date(au) - new Date(du)) / 864e5;
        const p = t.prio || 0;   // fête des mères / des pères prioritaires, puis le plus court (le plus précis)
        if (p > prio || (p === prio && n < duree)) { prio = p; duree = n; choix = t; }
      }
    }
  }
  return habiller(choix);
}

// ── Petits éléments animés (24×24) ──
const P = {
  flocon: (c) => <g fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17l17.4-10M12 5.5l-2.2-2M12 5.5l2.2-2M12 18.5l-2.2 2M12 18.5l2.2 2M5.6 8.3l-.4 3M18.4 15.7l.4-3M5.6 15.7l-.4-3M18.4 8.3l.4 3" /></g>,
  coeur: (c) => <path fill={c} d="M12 21C5 16 2 12 4.5 8.3 6.7 5.3 10.5 6 12 8.8 13.5 6 17.3 5.3 19.5 8.3 22 12 19 16 12 21Z" />,
  etoile: (c) => <path fill={c} d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />,
  etincelle: (c) => <path fill={c} d="M12 1l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" />,
  confetti: (c) => <rect x="7" y="9" width="10" height="6" rx="1.2" fill={c} />,
  citrouille: (c) => <g><ellipse cx="12" cy="14" rx="9" ry="7.5" fill={c} /><ellipse cx="12" cy="14" rx="3.6" ry="7.5" fill="#F49A3E" /><path d="M11.5 6.8c.3-2.4 1.4-3.6 3-4l.6 1.2c-1.2.5-1.8 1.4-2 3z" fill="#5D7A2A" /></g>,
  chauvesouris: (c) => <path fill={c} d="M12 10c1.2-2 3.2-2.2 4.4-1 .8-2 2.8-2.4 4.4-1.2-1.3.2-1.9 1.9-1.2 3.4-1.9-1.2-3.8-.6-4.4 1-.8-1-1.9-1.4-3.2-.4-1.3-1-2.4-.6-3.2.4-.6-1.6-2.5-2.2-4.4-1 .7-1.5.1-3.2-1.2-3.4 1.6-1.2 3.6-.8 4.4 1.2 1.2-1.2 3.2-1 4.4 1z" />,
  oeuf: (c) => <g><ellipse cx="12" cy="13" rx="7" ry="9" fill={c} /><path d="M5.3 12l2.2-1.6 2.2 1.6 2.3-1.6 2.2 1.6 2.3-1.6 2.2 1.6" fill="none" stroke="#fff" strokeWidth="1.6" /></g>,
  fleur: (c) => <g>{[0, 72, 144, 216, 288].map(a => <circle key={a} cx={12 + 5 * Math.sin(a * Math.PI / 180)} cy={12 - 5 * Math.cos(a * Math.PI / 180)} r="4" fill={c} />)}<circle cx="12" cy="12" r="3" fill="#FFD54F" /></g>,
  note: (c) => <path fill={c} d="M9 18.5a3 3 0 1 1-2-2.8V5.2l11-2.2v12a3 3 0 1 1-2-2.8V6.8L9 8.2z" />,
  raisin: (c) => <g fill={c}>{[[9, 8], [15, 8], [12, 12], [6, 12], [18, 12], [9, 16], [15, 16], [12, 20]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3" />)}<path d="M12 5c0-2 1-3 3-3" stroke="#5D7A2A" strokeWidth="1.5" fill="none" /></g>,
  crepe: (c) => <g><circle cx="12" cy="12" r="9" fill={c} /><circle cx="9" cy="9" r="1.4" fill="#B9722A" /><circle cx="15" cy="13" r="1.8" fill="#B9722A" /><circle cx="10" cy="15" r="1" fill="#B9722A" /></g>,
  clochette: (c) => <g><path d="M12 4c3.5 0 5 3 5 6.5 0 1.5.6 2.5 1.8 3.5H5.2c1.2-1 1.8-2 1.8-3.5C7 7 8.5 4 12 4z" fill={c} stroke="#8BBF6A" strokeWidth="1.2" /><path d="M10 14.5c.3 1 1 1.5 2 1.5s1.7-.5 2-1.5" fill="none" stroke="#8BBF6A" strokeWidth="1.2" /></g>,
  cravate: (c) => <path fill={c} d="M9.5 2h5l-1 3 2.5 11-4 5-4-5 2.5-11z" />,
  moustache: (c) => <path fill={c} d="M12 11c-1.5-2.5-5-3-7.5-1-1.2 1-2.5 1-3.5.3.5 2.5 3 4 6 3.2 2-.6 3.5-1.5 5-2.5 1.5 1 3 1.9 5 2.5 3 .8 5.5-.7 6-3.2-1 .7-2.3.7-3.5-.3-2.5-2-6-1.5-7.5 1z" />,
};

// Pluie d'éléments (positions fixes, calculées une fois)
const GRAINES = Array.from({ length: 18 }, (_, i) => {
  const r = (n) => { const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453; return x - Math.floor(x); };
  return { x: r(1) * 100, s: 12 + r(2) * 14, d: 9 + r(3) * 9, delai: -r(4) * 18, dx: (r(5) - .5) * 80, rot: (r(6) - .5) * 720, o: .55 + r(7) * .4 };
});
export function Particules({ theme, nb = 16, dans }) {
  if (!theme) return null;
  const kinds = (theme.parts || []).flatMap(([f, cs]) => cs.map(c => [f, c]));
  if (!kinds.length) return null;
  return (
    <div className={"parts" + (dans ? " dans" : "") + (theme.sens === "haut" ? " haut" : "")} aria-hidden="true">
      {GRAINES.slice(0, nb).map((g, i) => {
        const [f, c] = kinds[i % kinds.length];
        return (
          <span key={i} className="part" style={{ left: g.x + "%", width: g.s, height: g.s, animationDuration: g.d + "s", animationDelay: g.delai + "s", opacity: g.o, "--dx": g.dx + "px", "--rot": g.rot + "deg" }}>
            {f === "emoji" ? <span className="part-emoji" style={{ fontSize: g.s }}>{c}</span>
              : <svg viewBox="0 0 24 24" width="100%" height="100%" style={{ filter: c.toUpperCase() === "#FFFFFF" ? "drop-shadow(0 0 1.5px rgba(40,70,90,.55))" : "none" }}>{P[f](c)}</svg>}
          </span>
        );
      })}
    </div>
  );
}

// ── Illustrations des cartes de vœux (100×100) ──
const ILLU = {
  bonhomme: <g>
    <path d="M14 92h72" stroke="#CFD8DC" strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="70" r="21" fill="#fff" stroke="#B0BEC5" strokeWidth="2" />
    <circle cx="50" cy="39" r="15" fill="#fff" stroke="#B0BEC5" strokeWidth="2" />
    <path d="M31 64 14 52M69 64l17-12" stroke="#6D4C41" strokeWidth="3" strokeLinecap="round" />
    <rect x="35" y="22" width="30" height="4" rx="1.5" fill="#22302A" /><rect x="40" y="7" width="20" height="17" rx="2" fill="#22302A" /><rect x="40" y="18" width="20" height="3.5" fill="#C62828" />
    <circle cx="44.5" cy="36" r="2" fill="#22302A" /><circle cx="55.5" cy="36" r="2" fill="#22302A" />
    <path d="M50 40l12 3-12 2.6z" fill="#F57C00" />
    <path d="M35 50q15 7 30 0v5.5q-15 7-30 0z" fill="#C62828" /><rect x="56" y="53" width="7" height="15" rx="2" fill="#C62828" />
    <circle cx="50" cy="66" r="2.3" fill="#22302A" /><circle cx="50" cy="76" r="2.3" fill="#22302A" />
    <path d="M84 30l2 4 4 .5-3 2.8.8 4-3.8-2-3.8 2 .8-4-3-2.8 4-.5z" fill="#F4D774" />
  </g>,
  citrouille: <g>
    <ellipse cx="50" cy="62" rx="36" ry="28" fill="#E8731C" /><ellipse cx="36" cy="62" rx="17" ry="27" fill="#F0842A" /><ellipse cx="64" cy="62" rx="17" ry="27" fill="#F0842A" /><ellipse cx="50" cy="62" rx="12" ry="28" fill="#F49A3E" />
    <path d="M47 35c1-9 5-13 11-15l2 4c-5 2-7 5-8 11z" fill="#5D7A2A" />
    <path d="M32 55l7-9 7 9zM54 55l7-9 7 9z" fill="#3A1F05" /><path d="M30 67q20 18 40 0l-4 1-3 4-4-3-3 4-3-4-3 4-3-4-4 3-3-4-4-1z" fill="#3A1F05" />
    <path d="M76 18c1.5-2.5 4-2.8 5.5-1.3 1-2.5 3.5-3 5.5-1.5-1.6.3-2.4 2.4-1.5 4.3-2.4-1.5-4.8-.8-5.5 1.3-1-1.3-2.4-1.8-4-.5-1.6-1.3-3-.8-4 .5-.8-2-3.1-2.8-5.5-1.3.9-1.9.1-4-1.5-4.3 2-1.5 4.5-1 5.5 1.5 1.5-1.5 4-1.2 5.5 1.3z" fill="#2B1B3D" transform="translate(-8 0) scale(1.15)" />
  </g>,
  coeurs: <g>
    <path d="M40 84C14 66 8 50 18 39c9-9 19-4 22 3 3-7 13-12 22-3 10 11 4 27-22 45z" fill="#E05A73" />
    <path d="M66 62C48 50 44 39 51 31c6-6 13-3 15 2 2-5 9-8 15-2 7 8 3 19-15 31z" fill="#F48FB1" />
    <path d="M12 22l62 46" stroke="#C69A3C" strokeWidth="3" strokeLinecap="round" /><path d="M74 68l-9-1 6-6z" fill="#C69A3C" /><path d="M12 22l2 8-6-2zM12 22l8 2-2-6z" fill="#C69A3C" />
  </g>,
  oeufs: <g>
    <path d="M10 88q40-16 80 0" fill="#CDE7B0" />
    <ellipse cx="40" cy="56" rx="22" ry="29" fill="#F6C6D9" /><path d="M18.5 52l5.4-4 5.4 4 5.4-4 5.3 4 5.4-4 5.4 4 5.4-4 5.4 4" fill="none" stroke="#fff" strokeWidth="3" />
    <circle cx="32" cy="68" r="2.5" fill="#BFE3F2" /><circle cx="44" cy="72" r="2.5" fill="#F9E79F" /><circle cx="38" cy="38" r="2.5" fill="#BFE3F2" />
    <circle cx="72" cy="74" r="14" fill="#FFD54F" /><circle cx="72" cy="56" r="10" fill="#FFD54F" /><circle cx="75" cy="54" r="1.6" fill="#22302A" /><path d="M81 57l6 1.5-6 2z" fill="#F57C00" /><path d="M62 72q-4-6 2-9" fill="none" stroke="#F2B134" strokeWidth="3" strokeLinecap="round" />
  </g>,
  muguet: <g>
    <path d="M40 92C34 60 48 30 70 18" fill="none" stroke="#4E7F3E" strokeWidth="3" strokeLinecap="round" />
    <path d="M60 92C30 80 26 46 44 30c4 26 12 44 16 62z" fill="#7FB35F" />
    {[[46, 46], [52, 36], [59, 28], [66, 22], [42, 58]].map(([x, y], i) => <g key={i}><path d={`M${x} ${y}v5`} stroke="#4E7F3E" strokeWidth="1.6" /><path d={`M${x - 6} ${y + 13}c0-6 2.5-9 6-9s6 3 6 9c-1.4-.8-2.6-.8-4 0-1.3-.8-2.7-.8-4 0-1.4-.8-2.6-.8-4 0z`} fill="#fff" stroke="#9CC57F" strokeWidth="1.3" /></g>)}
  </g>,
  bouquet: <g>
    <path d="M50 88 34 44M50 88V36M50 88l16-44" stroke="#5D7A2A" strokeWidth="3" />
    {[[34, 40, "#F48FB1"], [50, 30, "#CE93D8"], [66, 40, "#F48FB1"], [42, 52, "#FFD54F"], [58, 52, "#FFAB91"]].map(([x, y, c], i) => <g key={i}>{[0, 72, 144, 216, 288].map(a => <circle key={a} cx={x + 7 * Math.sin(a * Math.PI / 180)} cy={y - 7 * Math.cos(a * Math.PI / 180)} r="6" fill={c} />)}<circle cx={x} cy={y} r="4.5" fill="#FFF3C4" /></g>)}
    <path d="M40 74l10 6 10-6-3 10-7-3-7 3z" fill="#E05A73" />
  </g>,
  papa: <g>
    <path d="M50 22c-5-7-16-8-24-3-3 2-7 2-9 0 1 7 8 11 16 9 7-1 12-3 17-6 5 3 10 5 17 6 8 2 15-2 16-9-2 2-6 2-9 0-8-5-19-4-24 3z" fill="#4E342E" />
    <path d="M43 38h14l-3 7 7 33-11 13-11-13 7-33z" fill="#24507E" /><path d="M43 38h14l-3 7h-8z" fill="#1A3B5E" />
    <path d="M47 56l9-4M45 66l12-5M46 76l9-4" stroke="#5B8FC7" strokeWidth="2.5" />
  </g>,
  feux: <g>
    {Array.from({ length: 14 }, (_, i) => { const a = i * Math.PI * 2 / 14; const c = ["#1F3A93", "#D7263D", "#F2B134"][i % 3]; return <g key={i}><path d={`M${50 + 10 * Math.cos(a)} ${42 + 10 * Math.sin(a)}L${50 + 30 * Math.cos(a)} ${42 + 30 * Math.sin(a)}`} stroke={c} strokeWidth="3" strokeLinecap="round" /><circle cx={50 + 36 * Math.cos(a)} cy={42 + 36 * Math.sin(a)} r="2.6" fill={c} /></g>; })}
    <circle cx="50" cy="42" r="4" fill="#F2B134" />
    <path d="M8 92h84" stroke="#1F3A93" strokeWidth="3" /><path d="M14 92l4-8 4 8M78 92l4-8 4 8" fill="#D7263D" />
  </g>,
  galette: <g>
    <ellipse cx="50" cy="70" rx="38" ry="18" fill="#D99A3A" /><ellipse cx="50" cy="66" rx="38" ry="18" fill="#EBB65A" />
    <path d="M26 58l14 16M38 52l20 22M52 50l18 20M64 52l10 12M30 72l12-18M44 78l20-28M60 80l14-20" stroke="#C98428" strokeWidth="1.6" />
    <path d="M28 40l6-22 10 14 6-20 6 20 10-14 6 22z" fill="#D4AF37" stroke="#B8901C" strokeWidth="1.5" /><circle cx="50" cy="12" r="3" fill="#E05A73" /><circle cx="34" cy="18" r="2.5" fill="#1F3A93" /><circle cx="66" cy="18" r="2.5" fill="#1F3A93" />
  </g>,
  crepes: <g>
    <ellipse cx="50" cy="84" rx="38" ry="8" fill="#E0E0E0" />
    {[76, 69, 62, 55].map((y, i) => <ellipse key={i} cx="50" cy={y} rx="32" ry="9" fill={i % 2 ? "#E9B35A" : "#F0C36E"} stroke="#D19A3E" strokeWidth="1" />)}
    <path d="M28 52c6 4 12 0 16 6 2 3 1 9 4 9s2-7 5-8c4-1 8 3 12-1 4-3 7-2 9-1-4-6-14-8-24-8s-18 1-22 3z" fill="#5D3A1A" />
    <circle cx="70" cy="30" r="4" fill="#E05A73" /><circle cx="78" cy="38" r="3.5" fill="#E05A73" /><path d="M70 26c1-4 4-6 7-6" stroke="#5D7A2A" strokeWidth="2" fill="none" />
  </g>,
  notes: <g fill="#4F3A8C">
    <path d="M30 78a9 7 0 1 1-4-6V30l38-8v44a9 7 0 1 1-4-6V36l-30 6z" />
    <path d="M78 46a6 5 0 1 1-3-4V18l8 4-5 2z" fill="#F2B134" /><path d="M16 34a5 4 0 1 1-2-3.4V16" stroke="#E05A73" strokeWidth="2.5" fill="none" />
  </g>,
  vin: <g>
    <path d="M30 14h12v16c8 4 10 10 10 18v40a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V48c0-8 2-14 10-18z" fill="#4A1428" /><rect x="30" y="10" width="12" height="6" rx="1" fill="#2A0A16" />
    <rect x="22" y="54" width="28" height="20" rx="2" fill="#F7F1DE" /><path d="M27 62h18M27 67h12" stroke="#9C3D6A" strokeWidth="2" />
    {[[66, 48], [76, 48], [86, 48], [71, 57], [81, 57], [66, 66], [76, 66], [71, 75]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="6" fill={i % 2 ? "#7B1E4A" : "#9C3D6A"} />)}
    <path d="M76 42c0-6 4-9 9-10" stroke="#5D7A2A" strokeWidth="2.5" fill="none" /><path d="M80 36c6-6 12-4 14 0-5 2-10 2-14 0z" fill="#7FB35F" />
  </g>,
  painepice: <g>
    <path d="M50 10a12 12 0 0 1 9 20h15a7 7 0 0 1 0 14H62l8 34a7 7 0 0 1-13 4l-7-18-7 18a7 7 0 0 1-13-4l8-34H26a7 7 0 0 1 0-14h15a12 12 0 0 1 9-20z" fill="#B9722A" />
    <circle cx="45.5" cy="20" r="1.8" fill="#fff" /><circle cx="54.5" cy="20" r="1.8" fill="#fff" /><path d="M45 26q5 4 10 0" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <circle cx="50" cy="44" r="2.4" fill="#E05A73" /><circle cx="50" cy="54" r="2.4" fill="#2E7D32" /><path d="M24 37h6M70 37h6M38 80l4-2M58 78l4 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M80 70l2 4 4.5.6-3.3 3 .8 4.4-4-2.2-4 2.2.8-4.4-3.3-3 4.5-.6z" fill="#D4AF37" />
  </g>,
  champagne: <g>
    <path d="M30 24h18l-2 22c-1 6-4 9-7 9s-6-3-7-9z" fill="#F4D774" stroke="#B8901C" strokeWidth="1.5" transform="rotate(-14 39 55)" /><path d="M39 55v26M31 82h16" stroke="#B8901C" strokeWidth="2.5" strokeLinecap="round" transform="rotate(-14 39 55)" />
    <path d="M54 24h18l-2 22c-1 6-4 9-7 9s-6-3-7-9z" fill="#F4D774" stroke="#B8901C" strokeWidth="1.5" transform="rotate(14 63 55)" /><path d="M63 55v26M55 82h16" stroke="#B8901C" strokeWidth="2.5" strokeLinecap="round" transform="rotate(14 63 55)" />
    <circle cx="50" cy="14" r="2" fill="#D4AF37" /><circle cx="44" cy="8" r="1.5" fill="#D4AF37" /><circle cx="57" cy="7" r="1.5" fill="#D4AF37" />
    <path d="M14 30l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6zM86 26l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="#D4AF37" />
  </g>,
};
export const IllustrationTheme = ({ theme, taille = 96 }) => theme.illuEmoji
  ? <span aria-hidden="true" style={{ display: "inline-block", width: taille, height: taille, fontSize: taille * .72, lineHeight: taille + "px", textAlign: "center" }}>{theme.illuEmoji}</span>
  : <svg viewBox="0 0 100 100" width={taille} height={taille} aria-hidden="true">{ILLU[theme.illu]}</svg>;

// Carte de vœux affichée en haut de l'accueil
export function CarteTheme({ theme }) {
  if (!theme) return null;
  return (
    <div className="carte-theme" style={{ background: theme.soft, borderColor: theme.accent + "55" }}>
      <div className="ct-txt">
        <div className="ct-titre" style={{ color: theme.top }}>{theme.titre}</div>
        <div className="ct-msg">{theme.message}</div>
      </div>
      <div className="ct-illu"><IllustrationTheme theme={theme} taille={92} /></div>
    </div>
  );
}

// Styles communs (client + aperçu admin)
export const CSS_THEMES = `
.parts{position:fixed;inset:0;pointer-events:none;z-index:58;overflow:hidden}
.parts.dans{position:absolute;z-index:1}
.part-emoji{display:block;line-height:1}
.part{position:absolute;top:-30px;display:block;animation-name:tombe;animation-timing-function:linear;animation-iteration-count:infinite;will-change:transform}
.parts.haut .part{top:auto;bottom:-30px;animation-name:monte}
@keyframes tombe{0%{transform:translate3d(0,0,0) rotate(0)}100%{transform:translate3d(var(--dx),calc(100vh + 60px),0) rotate(var(--rot))}}
@keyframes monte{0%{transform:translate3d(0,0,0) rotate(0) scale(.8)}100%{transform:translate3d(var(--dx),calc(-100vh - 60px),0) rotate(calc(var(--rot) / 8)) scale(1.1)}}
.parts.dans .part{animation-name:tombeBoite}
.parts.dans.haut .part{animation-name:monteBoite}
@keyframes tombeBoite{0%{transform:translate3d(0,0,0) rotate(0)}100%{transform:translate3d(var(--dx),340px,0) rotate(var(--rot))}}
@keyframes monteBoite{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(var(--dx),-340px,0)}}
@media (prefers-reduced-motion: reduce){.parts{display:none}}
.frise-theme{height:7px;position:sticky;top:62px;z-index:59}
.carte-theme{position:relative;display:flex;align-items:center;gap:10px;border:1.5px solid;border-radius:18px;padding:14px 12px 14px 16px;margin-bottom:14px;overflow:hidden}
.ct-txt{flex:1;min-width:0}
.ct-titre{font-family:'Sacramento',cursive;font-size:32px;line-height:1.05;margin-bottom:4px}
.ct-msg{font-size:12.5px;font-weight:700;color:#5C6A62;line-height:1.45}
.ct-illu{flex-shrink:0;animation:balance 3.2s ease-in-out infinite;transform-origin:50% 90%}
@keyframes balance{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
`;
