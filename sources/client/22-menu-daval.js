/* ═══════════════════════════════════════════════════════════════════════
 *  MENU DE LA SEMAINE (charcuterie Daval) — tuile sur l'accueil et feuille détaillée du menu.
 * ═══════════════════════════════════════════════════════════════════════ */

// Présentation d'un plat (nom + accompagnement) avec son petit dessin.
var m2 = ({ plat }) => {
    let [e, ...n] = String(plat || "")
      .split(
        `
`,
      )
      .map((r) => r.trim())
      .filter(Boolean);
    return ne.default.createElement(
      ne.default.Fragment,
      null,
      ne.default.createElement("div", { className: "mn-plat" }, e),
      !!n.length && ne.default.createElement("div", { className: "mn-acc" }, n.join(" · ")),
    );
  },
  f2 = ({ t = 46 }) =>
    ne.default.createElement(
      "svg",
      { viewBox: "0 0 64 64", width: t, height: t, "aria-hidden": "true" },
      ne.default.createElement(
        "g",
        {
          className: "mn-fumee",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2.2",
          strokeLinecap: "round",
          opacity: ".55",
        },
        ne.default.createElement("path", { d: "M24 20c-3-4 3-6 0-10" }),
        ne.default.createElement("path", { d: "M32 18c-3-4 3-6 0-10" }),
        ne.default.createElement("path", { d: "M40 20c-3-4 3-6 0-10" }),
      ),
      ne.default.createElement("ellipse", {
        cx: "32",
        cy: "42",
        rx: "26",
        ry: "10",
        fill: "#FFFFFF",
        stroke: "currentColor",
        strokeWidth: "2",
      }),
      ne.default.createElement("ellipse", {
        cx: "32",
        cy: "40",
        rx: "16",
        ry: "5.5",
        fill: "var(--apple-soft,#EEF4E2)",
        stroke: "currentColor",
        strokeWidth: "1.4",
        opacity: ".9",
      }),
      ne.default.createElement("path", {
        d: "M6 40q-2-8 4-10M58 40q2-8-4-10",
        stroke: "currentColor",
        strokeWidth: "2",
        fill: "none",
        strokeLinecap: "round",
        opacity: ".5",
      }),
    );

// Tuile « Menu de la semaine » sur l'accueil (plat du jour ou prochain menu).
function TuileMenu({ menu, onOuvrir, aujourdhui = gc(new Date()) }) {
  if (!h2(menu, aujourdhui)) return null;
  let r = ZI(menu, aujourdhui),
    i = aujourdhui < menu.du;
  if (!r && !i) {
    let o = vc(aujourdhui),
      s = menu.jours.find((l) => l.j > o && l.plat);
    return s
      ? ne.default.createElement(
          "button",
          { className: "mn-carte petite", onClick: onOuvrir },
          ne.default.createElement("span", { className: "mn-ic" }, ne.default.createElement(f2, { t: 38 })),
          ne.default.createElement(
            "span",
            { className: "mn-txt" },
            ne.default.createElement(
              "span",
              { className: "mn-lab" },
              p2(s.j),
              " chez ",
              vf.replace("Charcuterie ", ""),
            ),
            ne.default.createElement(m2, { plat: s.plat }),
          ),
          ne.default.createElement("span", { className: "mn-voir" }, "Menu ›"),
        )
      : null;
  }
  return i
    ? ne.default.createElement(
        "button",
        { className: "mn-carte petite", onClick: onOuvrir },
        ne.default.createElement("span", { className: "mn-ic" }, ne.default.createElement(f2, { t: 38 })),
        ne.default.createElement(
          "span",
          { className: "mn-txt" },
          ne.default.createElement("span", { className: "mn-lab" }, "Le menu de la semaine est arrivé"),
          ne.default.createElement(
            "div",
            { className: "mn-plat" },
            "Du ",
            dateFr(menu.du),
            " au ",
            dateFr(menu.au),
          ),
        ),
        ne.default.createElement("span", { className: "mn-voir" }, "Voir ›"),
      )
    : ne.default.createElement(
        "button",
        { className: "mn-carte", onClick: onOuvrir },
        ne.default.createElement("span", { className: "mn-ruban" }, "Plat du jour"),
        ne.default.createElement("span", { className: "mn-ic" }, ne.default.createElement(f2, null)),
        ne.default.createElement(
          "span",
          { className: "mn-txt" },
          ne.default.createElement(
            "span",
            { className: "mn-lab" },
            "Aujourd'hui chez ",
            vf.replace("Charcuterie ", ""),
          ),
          ne.default.createElement(m2, { plat: r.plat }),
          ne.default.createElement(
            "span",
            { className: "mn-bas" },
            r.prix != null && ne.default.createElement("b", { className: "mn-prix" }, c2(r.prix)),
            ne.default.createElement("span", { className: "mn-voir" }, "Menu de la semaine ›"),
          ),
        ),
      );
}

// Feuille détaillée du menu de la semaine (tous les jours, prix).
function FeuilleMenu({ menu, onClose, aujourdhui = gc(new Date()), apercu }) {
  if (
    ((0, ne.useEffect)(() => {
      if (apercu) return;
      let s = (l) => l.key === "Escape" && onClose?.();
      return addEventListener("keydown", s), () => removeEventListener("keydown", s);
    }, []),
    !menu?.jours?.length)
  )
    return null;
  let i = aujourdhui >= menu.du && aujourdhui <= menu.au ? vc(aujourdhui) : -1,
    o = ne.default.createElement(
      "div",
      { className: "mn-feuille", onClick: (s) => s.stopPropagation() },
      ne.default.createElement(
        "div",
        { className: "mn-tete" },
        ne.default.createElement(
          "div",
          { className: "mn-four" },
          "Plats cuisinés par la charcuterie ",
          vf.replace("Charcuterie ", ""),
        ),
        ne.default.createElement("div", { className: "mn-titre" }, "Menu de la semaine"),
        ne.default.createElement(
          "div",
          { className: "mn-dates" },
          ne.default.createElement("i", null),
          "du ",
          dateFr(menu.du),
          " au ",
          dateFr(menu.au),
          ne.default.createElement("i", null),
        ),
      ),
      ne.default.createElement(
        "div",
        { className: "mn-liste" },
        menu.jours
          .filter((s) => s.plat)
          .map((s) => {
            let l = i >= 0 ? s.j < i : aujourdhui > d2(menu, s.j);
            return ne.default.createElement(
              "div",
              { key: s.j, className: "mn-ligne" + (s.j === i ? " auj" : "") + (l ? " passe" : "") },
              ne.default.createElement(
                "div",
                { className: "mn-jour" },
                ne.default.createElement("span", null, p2(s.j)),
                ne.default.createElement("small", null, dateFr(d2(menu, s.j))),
              ),
              ne.default.createElement(
                "div",
                { className: "mn-desc" },
                ne.default.createElement(m2, { plat: s.plat }),
                s.j === i && ne.default.createElement("span", { className: "mn-auj" }, "Aujourd'hui"),
              ),
              s.prix != null && ne.default.createElement("div", { className: "mn-px" }, c2(s.prix)),
            );
          }),
      ),
      !!menu.message && ne.default.createElement("div", { className: "mn-msg" }, "« ", menu.message, " »"),
      ne.default.createElement(
        "div",
        { className: "mn-pied" },
        "Plats à retrouver à l'épicerie, dans la limite des quantités disponibles",
      ),
      !apercu && ne.default.createElement("button", { className: "mn-fermer", onClick: onClose }, "Fermer"),
    );
  return apercu
    ? ne.default.createElement("div", { className: "mn-apercu" }, o)
    : ne.default.createElement(
        "div",
        { className: "mn-fond", onClick: onClose, role: "dialog", "aria-label": "Menu de la semaine" },
        o,
      );
}
