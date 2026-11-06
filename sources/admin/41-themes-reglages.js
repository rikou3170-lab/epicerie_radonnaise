/* ═══════════════════════════════════════════════════════════════════════
 *  THÈMES DE SAISON — réglages : calendrier, magie de Noël, thèmes personnalisés, aperçus.
 * ═══════════════════════════════════════════════════════════════════════ */

// Date en toutes lettres (« samedi 12 décembre »).
var sN = { mode: "auto", force: "", animations: !0, items: {}, perso: [] },
  dateLongue = (t) =>
    t
      ? new Date(t + "T12:00")
          .toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
          .replace(/^1 /, "1er ")
      : "",
  g7 = [
    ["normal", "Logo habituel", "logo-intro.png"],
    ["rose", "Ruban rose", "logo-rose.png"],
  ],
  v7 = (t) => {
    let e = Zn(t);
    return t.logo === "rose" || e === "octobrerose"
      ? "logo-rose.png"
      : wr[e]
        ? wr[e].logo
        : t.magie && t.id === "noel"
          ? "logo-noel.png"
          : e === "halloween"
            ? "logo-halloween.png"
            : "logo-intro.png";
  };

// Aperçu de l'animation d'ouverture avec le thème choisi.
function ApercuIntro({ theme }) {
  let [e, n] = (0, React.useState)(0),
    r = Zn(theme);
  return React.default.createElement(
    "div",
    {
      className: "intro-tel",
      key: e,
      onClick: () => n(e + 1),
      title: "Toucher pour rejouer",
      style: { background: O2(theme) },
    },
    theme.magie && React.default.createElement(CielEtoile, { apercu: !0 }),
    r === "halloween" && React.default.createElement(rC, { apercu: !0 }),
    r === "octobrerose" && React.default.createElement(aC, null),
    pf.includes(r) && React.default.createElement(yC, { id: r }),
    theme.anim !== !1 && React.default.createElement(Particules, { theme, nb: 14, dans: !0 }),
    React.default.createElement("img", {
      className: "it-logo",
      src: v7(theme),
      alt: "",
      onError: (i) => {
        i.target.src.endsWith("logo-intro.png") || (i.target.src = "logo-intro.png");
      },
    }),
    React.default.createElement(
      "div",
      { className: "it-txt" },
      React.default.createElement("div", { className: "it-bonjour" }, "Bonjour Marion !"),
      React.default.createElement(
        "div",
        { className: "it-bienv" },
        "Bienvenue sur l'application de l'épicerie",
      ),
      (theme.phrase || theme.titre) &&
        React.default.createElement("div", { className: "it-titre" }, theme.phrase || theme.titre),
    ),
    React.default.createElement(
      "div",
      {
        className: "it-lieu",
        style: theme.magie ? { color: "#3B4F6B", zIndex: 2 } : r ? { color: "#FFB547", zIndex: 2 } : void 0,
      },
      "Raddon-et-Chapendu",
    ),
  );
}

// Aperçu d'un thème sur un faux téléphone.
function ApercuTheme({ theme, du: e, vue0 }) {
  let [r, i] = (0, React.useState)(vue0 || "accueil"),
    s = Zn(theme);
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "div",
      { className: "seg", style: { maxWidth: 360, margin: "0 auto 10px" } },
      [
        ["accueil", "Accueil de l'appli"],
        ["intro", "Écran d'ouverture"],
      ].map(([o, a]) =>
        React.default.createElement(
          "button",
          { key: o, className: r === o ? "on" : "", onClick: () => i(o) },
          a,
        ),
      ),
    ),
    r === "intro"
      ? React.default.createElement(ApercuIntro, { theme })
      : React.default.createElement(
          "div",
          { className: "apercu-tel" },
          React.default.createElement(
            "div",
            { className: theme.magie ? "magie" : s || "" },
            React.default.createElement(
              "div",
              { className: "at-top", style: { background: theme.top, position: "relative" } },
              React.default.createElement("img", { src: LOGO, alt: "" }),
              theme.magie &&
                React.default.createElement(SvgBonnet, { taille: 24, style: { left: 18, top: 0 } }),
              s &&
                React.default.createElement(
                  "span",
                  { className: "at-acc" },
                  s === "halloween"
                    ? React.default.createElement(SvgChapeauSorciere, {
                        taille: 30,
                        style: { left: 28, top: 0 },
                      })
                    : s === "octobrerose"
                      ? React.default.createElement(sC, { style: { left: 44, top: 28 } })
                      : React.default.createElement(gC, { id: s }),
                ),
              React.default.createElement("span", null, "Épicerie Raddonnaise"),
            ),
            theme.magie
              ? React.default.createElement(GuirlandeNoel, { n: 12, apercu: !0 })
              : s === "halloween"
                ? React.default.createElement(nC, { apercu: !0 })
                : s === "octobrerose"
                  ? React.default.createElement(oC, { apercu: !0 })
                  : pf.includes(s)
                    ? React.default.createElement(vC, { id: s, apercu: !0 })
                    : React.default.createElement("div", {
                        className: "frise-theme",
                        style: { background: theme.frise, position: "relative", top: 0 },
                      }),
            React.default.createElement(
              "div",
              { className: "at-corps" },
              pf.includes(s) &&
                theme.anim !== !1 &&
                React.default.createElement(DecorAne, { id: s, apercu: !0 }),
              theme.anim !== !1 && React.default.createElement(Particules, { theme, nb: 12, dans: !0 }),
              theme.magie && theme.anim !== !1 && React.default.createElement(Neige, { nb: 22, dans: !0 }),
              React.default.createElement(
                "div",
                { style: { position: "relative", zIndex: 2 } },
                React.default.createElement(CarteTheme, { theme }),
              ),
              React.default.createElement("div", { className: "at-faux" }),
              React.default.createElement("div", { className: "at-faux court" }),
            ),
          ),
        ),
    r === "intro" &&
      React.default.createElement(
        "div",
        { className: "de", style: { textAlign: "center", marginTop: 6 } },
        "Ce que voient les clients en ouvrant l'appli (2 à 4 secondes). Touchez l'image pour rejouer.",
      ),
  );
}

// Réglage de la magie de Noël (neige, guirlande, bonnet, traîneau, village).
function ReglageMagieNoel({ v, setV, titreDef, motifsDef, top, acc, magieDef }) {
  let a = v.magie == null ? !!magieDef : !!v.magie,
    u = Array.isArray(v.motifs) ? v.motifs : motifsDef || [],
    d = (p) =>
      setV({ ...v, motifs: u.includes(p) ? u.filter((m) => m !== p) : u.length >= 6 ? u : [...u, p] }),
    h = EMOJIS_THEME;
  return React.default.createElement(
    "div",
    { className: "ri" },
    React.default.createElement(
      "div",
      { className: "tog ri-magie" },
      React.default.createElement(
        "div",
        null,
        React.default.createElement("div", { style: { fontSize: 14, fontWeight: 800 } }, "✨ Magie de Noël"),
        React.default.createElement(
          "div",
          { className: "de" },
          "Neige qui tombe et posée sur les menus, guirlande lumineuse, bonnet sur le logo, traîneau du Père Noël, village enneigé à l'ouverture, poussière d'étoiles quand on touche l'écran, compte à rebours.",
        ),
      ),
      React.default.createElement(
        "div",
        { className: "rt" },
        React.default.createElement(ze, { on: a, set: () => setV({ ...v, magie: !a }) }),
      ),
    ),
    React.default.createElement("div", { className: "ri-t" }, "Écran d'ouverture"),
    React.default.createElement("label", { className: "lab" }, "Logo"),
    React.default.createElement(
      "div",
      { className: "ri-logos" },
      g7.map(([p, m, w]) =>
        React.default.createElement(
          "button",
          {
            key: p,
            className: (v.logo || "normal") === p ? "on" : "",
            onClick: () => setV({ ...v, logo: p }),
          },
          React.default.createElement("img", { src: w, alt: "" }),
          m,
        ),
      ),
    ),
    React.default.createElement(
      "label",
      { className: "lab", style: { marginTop: 10 } },
      "Phrase sous « Bonjour … ! »",
    ),
    React.default.createElement("input", {
      className: "inp",
      value: v.phrase || "",
      maxLength: 40,
      placeholder: titreDef || "Ex : Bonne rentrée !",
      onChange: (p) => setV({ ...v, phrase: p.target.value }),
    }),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Fond"),
    React.default.createElement(
      "div",
      { className: "ri-fonds" },
      L2.map((p) =>
        React.default.createElement(
          "button",
          {
            key: p.id,
            className: (v.fond || "degrade") === p.id ? "on" : "",
            onClick: () => setV({ ...v, fond: p.id }),
          },
          React.default.createElement("span", {
            style: { background: O2({ top: top || "#1C433B", accent: acc || "#6E9B3A", fond: p.id }) },
          }),
          p.nom,
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "ri-t", style: { marginTop: 16 } },
      "Petits dessins qui tombent ",
      React.default.createElement("span", { className: "de" }, "(", u.length, "/6)"),
    ),
    React.default.createElement(
      "div",
      { className: "ri-motifs" },
      FORMES_NEIGE.map((p) =>
        React.default.createElement(
          "button",
          {
            key: p.id,
            className: u.includes(p.id) ? "on" : "",
            onClick: () => d(p.id),
            title: p.nom,
            "aria-label": p.nom,
          },
          React.default.createElement(AC, { id: p.id, taille: 26 }),
        ),
      ),
      h.map((p) =>
        React.default.createElement(
          "button",
          { key: p, className: u.includes(p) ? "on" : "", onClick: () => d(p) },
          React.default.createElement("span", { style: { fontSize: 21 } }, p),
        ),
      ),
    ),
    motifsDef &&
      Array.isArray(v.motifs) &&
      React.default.createElement(
        "button",
        { className: "lienadm", onClick: () => setV({ ...v, motifs: null }) },
        "Remettre les dessins d'origine",
      ),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Quantité"),
    React.default.createElement(
      "div",
      { className: "seg" },
      [
        ["peu", "Un peu"],
        ["normal", "Normal"],
        ["beaucoup", "Beaucoup"],
      ].map(([p, m]) =>
        React.default.createElement(
          "button",
          {
            key: p,
            className: (v.densite || "normal") === p ? "on" : "",
            onClick: () => setV({ ...v, densite: p }),
          },
          m,
        ),
      ),
    ),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Sens"),
    React.default.createElement(
      "div",
      { className: "seg" },
      [
        ["", "D'origine"],
        ["tombe", "Ils tombent"],
        ["monte", "Ils montent"],
      ].map(([p, m]) =>
        React.default.createElement(
          "button",
          {
            key: p || "o",
            className: (v.sens || "") === p ? "on" : "",
            onClick: () => setV({ ...v, sens: p }),
          },
          m,
        ),
      ),
    ),
  );
}

// Aides du calendrier des thèmes (dates, mode).
var w7 = ["logo", "phrase", "fond", "motifs", "densite", "sens", "magie"],
  oN = (t) =>
    Object.fromEntries(w7.map((e) => [e, e === "phrase" ? String(t[e] || "").trim() : (t[e] ?? null)])),
  b7 = (t) =>
    (t.parts || []).flatMap(([e, n]) => (e === "emoji" ? n : [e])).filter((e, n, r) => r.indexOf(e) === n);

// Calendrier des thèmes : automatique selon les dates, ou désactivé.
function CalendrierThemes({ c, setVoir }) {
  let n = { ...c, mode: "auto" },
    r = [],
    i = new Date(Bn() + "T12:00");
  for (let o = 0; o < 120; o++) {
    let a = new Date(i);
    a.setDate(i.getDate() + o);
    let u = a.toLocaleDateString("sv-SE"),
      d = V2(n, u),
      h = r[r.length - 1];
    h && (h.t?.id || "") === (d?.id || "") ? (h.au = u) : r.push({ t: d, du: u, au: u });
  }
  let s = (o) =>
    o.du === o.au ? "Le " + dateLongue(o.du) : "Du " + dateLongue(o.du) + " au " + dateLongue(o.au);
  return React.default.createElement(
    "div",
    { className: "card" },
    React.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 4 } },
      "📅 À venir (4 prochains mois)",
    ),
    React.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 10 } },
      c.mode === "force"
        ? "Un thème est choisi à la main en ce moment : ce planning s'appliquera dès que vous repasserez sur « Selon le calendrier »."
        : c.mode === "off"
          ? "« Aucun thème » est choisi : ce planning s'appliquera si vous repassez sur « Selon le calendrier »."
          : "Ce qui s'affichera tout seul sur l'appli. Pour changer, modifiez les dates d'une fête ou créez votre thème ci-dessous.",
    ),
    r.map((o, a) =>
      React.default.createElement(
        "div",
        {
          key: a,
          className: "plan-l",
          onClick: o.t ? () => setVoir({ ...o.t, du: o.du }) : void 0,
          style: { cursor: o.t ? "pointer" : "default" },
        },
        React.default.createElement("span", {
          className: "plan-pt",
          style: { background: o.t ? o.t.top : "#D8D2C2" },
        }),
        React.default.createElement(
          "div",
          { style: { minWidth: 0, flex: 1 } },
          React.default.createElement(
            "div",
            { style: { fontWeight: 800, fontSize: 13.5 } },
            o.t ? o.t.nom || o.t.titre : "Couleurs habituelles",
            a === 0 &&
              c.mode === "auto" &&
              React.default.createElement(
                "span",
                { className: "pill on", style: { marginLeft: 6 } },
                "En cours",
              ),
          ),
          React.default.createElement("div", { className: "de" }, s(o)),
        ),
        o.t &&
          React.default.createElement("span", { className: "de", style: { fontWeight: 700 } }, "Aperçu ›"),
      ),
    ),
  );
}

// Couleurs et émojis proposés pour un thème personnalisé.
var COULEURS_THEME = [
    "#A4161A",
    "#C2577E",
    "#E05A73",
    "#E8731C",
    "#C69A3C",
    "#6E9B3A",
    "#2E7D32",
    "#1C433B",
    "#24507E",
    "#1F3A93",
    "#4F3A8C",
    "#2B1B3D",
  ],
  EMOJIS_THEME =
    "🐣 🐰 🥚 🌷 🌸 🌼 🌻 💐 🍫 🍓 🍒 🍎 🍐 🍇 🍋 🧀 🥖 🥐 🍷 🍾 🥂 🎂 🎉 🎈 🎁 ⭐ ✨ ❤\uFE0F ☀\uFE0F 🍂 🍁 🍄 ❄\uFE0F ⛄ 🎄 🔔 🎃 👻 ⚽ 🏆 🎶 🐟".split(
      " ",
    ),
  A7 = () => {
    let t = Bn();
    return {
      id: "p" + Date.now().toString(36),
      nom: "",
      titre: "",
      message: "",
      couleur: "#E8731C",
      emojis: "🎉✨",
      illu: "",
      du: t,
      au: t,
      chaqueAnnee: !0,
      active: !0,
    };
  };

// Créer / modifier un thème personnalisé.
function EditionPerso({ p0, onClose, onSave, onDelete }) {
  let [i, s] = (0, React.useState)({ ...p0, motifs: Array.isArray(p0.motifs) ? p0.motifs : mf(p0.emojis) }),
    o = { ...persoVersTheme({ ...i, titre: i.titre || i.nom || "Mon thème" }), anim: !0 },
    a = i.nom.trim() && i.du && i.au && i.au >= i.du;
  return React.default.createElement(
    ut,
    { titre: p0.nom ? "Modifier « " + p0.nom + " »" : "Créer mon thème", onClose },
    React.default.createElement(ApercuTheme, { theme: o }),
    React.default.createElement("label", { className: "lab", style: { marginTop: 12 } }, "Nom du thème"),
    React.default.createElement("input", {
      className: "inp",
      value: i.nom,
      maxLength: 40,
      placeholder: "Ex : Fête du village, Anniversaire de l'épicerie…",
      onChange: (u) => s({ ...i, nom: u.target.value }),
    }),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Couleur"),
    React.default.createElement(
      "div",
      { className: "couleurs" },
      COULEURS_THEME.map((u) =>
        React.default.createElement("button", {
          key: u,
          className: i.couleur === u ? "on" : "",
          style: { background: u },
          onClick: () => s({ ...i, couleur: u }),
          "aria-label": "Couleur " + u,
        }),
      ),
      React.default.createElement(
        "label",
        { className: "perso-coul", title: "Autre couleur" },
        React.default.createElement("input", {
          type: "color",
          value: i.couleur,
          onChange: (u) => s({ ...i, couleur: u.target.value }),
        }),
        "+",
      ),
    ),
    React.default.createElement(
      "label",
      { className: "lab", style: { marginTop: 10 } },
      "Grand dessin de la carte (facultatif)",
    ),
    React.default.createElement("input", {
      className: "inp",
      value: i.illu,
      maxLength: 8,
      placeholder: "Par défaut : " + (o.illuEmoji || "⭐"),
      onChange: (u) => s({ ...i, illu: u.target.value }),
      style: { maxWidth: 200 },
    }),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Titre de la carte"),
    React.default.createElement("input", {
      className: "inp",
      value: i.titre,
      maxLength: 50,
      placeholder: i.nom || "Ex : Joyeux anniversaire !",
      onChange: (u) => s({ ...i, titre: u.target.value }),
    }),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Message"),
    React.default.createElement("textarea", {
      className: "inp",
      value: i.message,
      maxLength: 200,
      placeholder: "Ex : Venez fêter les 3 ans de l'épicerie samedi, café offert !",
      onChange: (u) => s({ ...i, message: u.target.value }),
    }),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 10, marginTop: 10 } },
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Du"),
        React.default.createElement("input", {
          className: "inp",
          type: "date",
          value: i.du,
          onChange: (u) => s({ ...i, du: u.target.value, au: i.au < u.target.value ? u.target.value : i.au }),
        }),
      ),
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Au"),
        React.default.createElement("input", {
          className: "inp",
          type: "date",
          min: i.du,
          value: i.au,
          onChange: (u) => s({ ...i, au: u.target.value }),
        }),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "tog", style: { marginTop: 6 } },
      React.default.createElement(
        "span",
        { style: { fontSize: 13, fontWeight: 700 } },
        "Revient tous les ans aux mêmes dates",
      ),
      React.default.createElement(
        "div",
        { className: "rt" },
        React.default.createElement(ze, {
          on: i.chaqueAnnee,
          set: () => s({ ...i, chaqueAnnee: !i.chaqueAnnee }),
        }),
      ),
    ),
    React.default.createElement(ReglageMagieNoel, {
      v: i,
      setV: s,
      titreDef: i.titre || i.nom,
      top: o.top,
      acc: o.accent,
    }),
    React.default.createElement(
      "button",
      {
        className: "btn",
        style: { marginTop: 12 },
        disabled: !a,
        onClick: () =>
          onSave({
            ...i,
            nom: i.nom.trim(),
            titre: i.titre.trim(),
            message: i.message.trim(),
            phrase: String(i.phrase || "").trim(),
            emojis: (i.motifs || []).filter((u) => !FORMES_NEIGE.some((d) => d.id === u)).join(""),
          }),
      },
      "Enregistrer",
    ),
    onDelete &&
      React.default.createElement(
        "button",
        {
          className: "btn gh",
          style: { marginTop: 8, color: "var(--red)" },
          onClick: async () => (await De("Supprimer le thème « " + p0.nom + " » ?")) && onDelete(),
        },
        "Supprimer ce thème",
      ),
  );
}

// Liste des thèmes personnalisés de Marion.
function MesThemes({ c, maj, setVoir }) {
  let [ed, setEd] = (0, React.useState)(null),
    s = c.perso || [],
    o = (a) => {
      maj({ perso: s.some((u) => u.id === a.id) ? s.map((u) => (u.id === a.id ? a : u)) : [...s, a] }),
        setEd(null);
    };
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement("div", { className: "nm", style: { margin: "16px 0 4px" } }, "Mes thèmes"),
    React.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 8 } },
      "Créez vos propres thèmes : fête du village, anniversaire de l'épicerie, foire, marché de Noël… Ils passent avant les fêtes prévues.",
    ),
    React.default.createElement(
      "button",
      { className: "btn terra", onClick: () => setEd(A7()) },
      I10.plus(),
      "Créer mon thème",
    ),
    React.default.createElement("div", { style: { height: 10 } }),
    React.default.createElement(
      "div",
      { className: "grille" },
      s.map((a) => {
        let u = persoVersTheme(a),
          d = a.active !== !1;
        return React.default.createElement(
          "div",
          {
            className: "card theme-ligne",
            key: a.id,
            style: { opacity: d ? 1 : 0.55, borderLeft: "4px solid " + u.top },
          },
          React.default.createElement(
            "div",
            { className: "row" },
            React.default.createElement(
              "div",
              { className: "th-illu", style: { background: u.soft } },
              React.default.createElement(IllustrationTheme, { theme: u, taille: 46 }),
            ),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, a.nom),
              React.default.createElement(
                "div",
                { className: "de" },
                a.du === a.au
                  ? "Le " + dateLongue(a.du)
                  : "Du " + dateLongue(a.du) + " au " + dateLongue(a.au),
                a.chaqueAnnee ? " · tous les ans" : " " + a.du.slice(0, 4),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: d,
                set: () => maj({ perso: s.map((h) => (h.id === a.id ? { ...h, active: !d } : h)) }),
              }),
            ),
          ),
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 10 } },
            React.default.createElement(
              "button",
              { className: "btn gh sm", style: { flex: 1 }, onClick: () => setEd(a) },
              "Modifier",
            ),
            React.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { flex: 1 },
                onClick: () => setVoir({ ...u, anim: c.animations !== !1, du: a.du }),
              },
              "Aperçu",
            ),
          ),
        );
      }),
    ),
    ed &&
      React.default.createElement(EditionPerso, {
        p0: ed,
        onClose: () => setEd(null),
        onSave: o,
        onDelete: s.some((a) => a.id === ed.id)
          ? () => {
              maj({ perso: s.filter((a) => a.id !== ed.id), ...(c.force === ed.id ? { mode: "auto" } : {}) }),
                setEd(null);
            }
          : null,
      }),
  );
}

// Écran Thèmes de saison.
function Themes({ d: t, set }) {
  let n = { ...sN, ...(t.themes || {}), items: { ...((t.themes || {}).items || {}) } },
    r = (S) => ({ ...sN, ...(S || {}), items: { ...((S || {}).items || {}) } }),
    i = (S) => set("themes", (_) => ({ ...r(_), ...S })),
    s = (S, _) =>
      set("themes", (I) => {
        let T = r(I);
        return { ...T, items: { ...T.items, [S]: { ...(T.items[S] || {}), ..._ } } };
      }),
    [edit, setEdit] = (0, React.useState)(null),
    [voir, setVoir] = (0, React.useState)(null),
    h = Bn(),
    p = Number(h.slice(0, 4)),
    m = V2(n),
    w = (S) => {
      for (let _ of [p - 1, p, p + 1]) {
        let I = vf(S, n.items[S.id], _);
        if (I[1] >= h) return I;
      }
      return vf(S, n.items[S.id], p + 1);
    },
    E = [...THEMES].map((S) => ({ t: S, p: w(S) })).sort((S, _) => S.p[0].localeCompare(_.p[0])),
    A = (S) => {
      let [_, I] = w(S);
      return _ <= h && h <= I;
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Thèmes"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "L'application s'habille pour les fêtes : couleurs, petite animation et carte de vœux sur l'accueil. Activez les fêtes que vous voulez et ajustez les dates.",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 8 } },
        "Affiché en ce moment",
      ),
      m
        ? React.default.createElement(ApercuTheme, { theme: m, du: Bn() })
        : React.default.createElement(
            "div",
            { className: "de", style: { marginBottom: 6 } },
            "Aucun thème : l'application garde ses couleurs habituelles.",
          ),
      React.default.createElement(
        "div",
        { className: "seg", style: { margin: "12px 0 8px" } },
        [
          ["auto", "Selon le calendrier"],
          ["off", "Aucun thème"],
        ].map(([S, _]) =>
          React.default.createElement(
            "button",
            {
              key: S,
              className: n.mode === S ? "on" : "",
              onClick: () =>
                i({
                  mode: S,
                  force: S === "force" ? n.force || m?.id || "noel" : n.force,
                  ...(S === "force" ? { forceLe: Bn() } : {}),
                }),
            },
            _,
          ),
        ),
      ),
      React.default.createElement(
        "div",
        { className: "tog", style: { marginTop: 6 } },
        React.default.createElement(
          "div",
          null,
          React.default.createElement(
            "div",
            { style: { fontSize: 13, fontWeight: 700 } },
            "Petite animation",
          ),
          React.default.createElement(
            "div",
            { className: "de" },
            "Flocons, cœurs, citrouilles… qui tombent doucement",
          ),
        ),
        React.default.createElement(
          "div",
          { className: "rt" },
          React.default.createElement(ze, {
            on: n.animations !== !1,
            set: () => i({ animations: n.animations === !1 }),
          }),
        ),
      ),
    ),
    React.default.createElement(CalendrierThemes, { c: n, setVoir }),
    B2 && React.default.createElement(MesThemes, { c: n, maj: i, setVoir }),
    React.default.createElement(
      "div",
      { className: "nm", style: { margin: "16px 0 8px" } },
      "Les fêtes de l'année",
    ),
    React.default.createElement(
      "div",
      { className: "grille" },
      E.map(({ t: S, p: [_, I, T] }) => {
        let M = n.items[S.id]?.active !== !1;
        return React.default.createElement(
          "div",
          {
            className: "card theme-ligne",
            key: S.id,
            style: { opacity: M ? 1 : 0.55, borderLeft: "4px solid " + S.top },
          },
          React.default.createElement(
            "div",
            { className: "row" },
            React.default.createElement(
              "div",
              { className: "th-illu", style: { background: S.soft } },
              React.default.createElement(IllustrationTheme, { theme: S, taille: 46 }),
            ),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement(
                "div",
                { className: "nm" },
                S.nom,
                A(S) &&
                  M &&
                  React.default.createElement(
                    "span",
                    { className: "pill on", style: { marginLeft: 6 } },
                    "En cours",
                  ),
              ),
              React.default.createElement(
                "div",
                { className: "de" },
                _ === I ? "Le " + dateLongue(_) : "Du " + dateLongue(_) + " au " + dateLongue(I),
                T ? " · dates modifiées" : "",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, { on: M, set: () => s(S.id, { active: !M }) }),
            ),
          ),
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 10 } },
            React.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { flex: 1 },
                onClick: () =>
                  setEdit({
                    t: S,
                    du: _,
                    au: I,
                    message: n.items[S.id]?.message || "",
                    ...oN(n.items[S.id] || {}),
                  }),
              },
              "Dates & message",
            ),
            React.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { flex: 1 },
                onClick: () =>
                  setVoir({
                    ...ParticulesMontantes(S, n.items[S.id]),
                    message: n.items[S.id]?.message || S.message,
                    anim: n.animations !== !1,
                    du: _,
                  }),
              },
              "Aperçu",
            ),
          ),
        );
      }),
    ),
    voir &&
      React.default.createElement(
        ut,
        { titre: "Aperçu — " + voir.nom, onClose: () => setVoir(null) },
        React.default.createElement(ApercuTheme, { theme: voir, du: voir.du }),
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 10, textAlign: "center" } },
          "Ce thème s'affichera tout seul dans l'application à ses dates, selon le calendrier.",
        ),
      ),
    edit &&
      React.default.createElement(
        ut,
        { titre: edit.t.nom, onClose: () => setEdit(null) },
        React.default.createElement(ApercuTheme, {
          theme: {
            ...ParticulesMontantes(edit.t, edit),
            message: edit.message.trim() || edit.t.message,
            anim: !0,
          },
          vue0: "intro",
        }),
        React.default.createElement("div", { style: { height: 12 } }),
        React.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 10 } },
          "Période d'affichage ",
          edit.du.slice(0, 4) !== edit.au.slice(0, 4)
            ? edit.du.slice(0, 4) + "-" + edit.au.slice(0, 4)
            : edit.du.slice(0, 4),
          ". L'année suivante, les dates habituelles reviennent toutes seules.",
        ),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Du"),
            React.default.createElement("input", {
              className: "inp",
              type: "date",
              value: edit.du,
              onChange: (S) => setEdit({ ...edit, du: S.target.value }),
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Au"),
            React.default.createElement("input", {
              className: "inp",
              type: "date",
              min: edit.du,
              value: edit.au,
              onChange: (S) => setEdit({ ...edit, au: S.target.value }),
            }),
          ),
        ),
        React.default.createElement(
          "label",
          { className: "lab", style: { marginTop: 10 } },
          "Message de la carte de vœux",
        ),
        React.default.createElement("textarea", {
          className: "inp",
          value: edit.message,
          maxLength: 200,
          placeholder: edit.t.message,
          onChange: (S) => setEdit({ ...edit, message: S.target.value }),
        }),
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 4 } },
          "Vide = message proposé : « ",
          edit.t.message,
          " »",
        ),
        M2 &&
          React.default.createElement(ReglageMagieNoel, {
            v: edit,
            setV: (S) => setEdit({ ...edit, ...S }),
            titreDef: edit.t.titre,
            motifsDef: b7(edit.t),
            top: edit.t.top,
            acc: edit.t.accent,
            magieDef: edit.t.id === "noel",
          }),
        React.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 12 },
            disabled: !edit.du || !edit.au || edit.au < edit.du,
            onClick: () => {
              let [S, _] = edit.t.dates(Number(edit.du.slice(0, 4))),
                I = S === edit.du && _ === edit.au;
              s(edit.t.id, {
                du: I ? "" : edit.du,
                au: I ? "" : edit.au,
                message: edit.message.trim(),
                ...oN(edit),
              }),
                setEdit(null);
            },
          },
          "Enregistrer",
        ),
        React.default.createElement(
          "button",
          {
            className: "btn gh",
            style: { marginTop: 8 },
            onClick: () => {
              s(edit.t.id, { du: "", au: "" }), setEdit(null);
            },
          },
          "Remettre les dates habituelles",
        ),
      ),
  );
}
