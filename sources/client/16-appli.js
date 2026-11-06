function jM() {
  let t = ["#F6D47A", "#C9E38A", "#E05A73", "#FFFFFF", "#F2C14E", "#3E8E3A"];
  return W.default.createElement(
    "div",
    { className: "roue-confetti", "aria-hidden": "true" },
    Array.from({ length: 60 }, (e, n) =>
      W.default.createElement("i", {
        key: n,
        style: {
          left: ((n * 37) % 100) + "%",
          background: t[n % t.length],
          animationDelay: (n % 12) * 0.08 + "s",
          animationDuration: 2 + (n % 5) * 0.3 + "s",
        },
      }),
    ),
  );
}
var UM = () =>
  W.default.createElement(
    "div",
    { className: "roue-etoiles", "aria-hidden": "true" },
    Array.from({ length: 18 }, (t, e) =>
      W.default.createElement("i", {
        key: e,
        style: {
          left: ((e * 53) % 97) + 1.5 + "%",
          top: 12 + ((e * 37) % 85) + "%",
          animationDelay: (e % 6) * 0.4 + "s",
        },
      }),
    ),
  );
function RoueNoel({
  tours: tours,
  tickets: tickets,
  onFini: onFini,
  onRefus: onRefus,
  demo: demo,
  premiere: premiere,
}) {
  let [s, l] = (0, W.useState)(0),
    [u, d] = (0, W.useState)(premiere ? "intro" : "pret"),
    [h, f] = VM(),
    m = tours[s],
    E = () => {
      MM(),
        d("tourne"),
        f(!!m?.g, () => {
          LM(!!m?.g), d("res");
        });
    },
    F = () => {
      s + 1 < tours.length ? (l(s + 1), d("pret")) : onFini?.();
    },
    D = tours.length - s - 1;
  return u === "regl"
    ? W.default.createElement(
        "div",
        { className: "roue-fond" },
        W.default.createElement(
          "div",
          { className: "roue-in" },
          W.default.createElement(ReglementRoue, {
            onClose: () => d(premiere && s === 0 ? "intro" : "pret"),
          }),
        ),
      )
    : u === "refus"
      ? W.default.createElement(
          "div",
          { className: "roue-fond" },
          W.default.createElement(
            "div",
            { className: "roue-in" },
            W.default.createElement("h2", null, "C'est not\xE9"),
            W.default.createElement(
              "p",
              null,
              "La roue de No\xEBl ne s'affichera plus. Si vous changez d'avis, vous pourrez la r\xE9activer dans l'onglet Fid\xE9lit\xE9, rubrique \xAB Mes donn\xE9es \xBB.",
            ),
            W.default.createElement(
              "button",
              { className: "roue-b", onClick: () => onRefus?.() },
              "D'accord",
            ),
          ),
        )
      : W.default.createElement(
          "div",
          { className: "roue-fond", role: "dialog", "aria-modal": "true", "aria-label": "Roue de No\xEBl" },
          W.default.createElement(BM, { vite: u === "tourne" }),
          W.default.createElement(UM, null),
          u === "res" && m?.g && W.default.createElement(jM, { key: s }),
          W.default.createElement(
            "div",
            { className: "roue-in" },
            W.default.createElement("h2", null, "La roue de No\xEBl"),
            u === "intro"
              ? W.default.createElement(
                  W.default.Fragment,
                  null,
                  W.default.createElement(
                    "p",
                    null,
                    W.default.createElement("b", null, "Chaque tampon en caisse vous offre un tour de roue."),
                    " Une part \xAB Gagn\xE9 \xBB ? Vous recevez un ticket pour le tirage au sort de No\xEBl. Plus vous gagnez, plus vous avez de chances !",
                  ),
                  W.default.createElement(RoueSvg, { angle: h, taille: 250 }),
                  W.default.createElement(
                    "button",
                    { className: "roue-b", onClick: () => d("pret") },
                    "\u{1F384} Je participe",
                  ),
                  W.default.createElement(
                    "button",
                    { className: "roue-lien", onClick: () => d("refus") },
                    "Je ne souhaite pas participer \xE0 la roue de No\xEBl",
                  ),
                  W.default.createElement(
                    "button",
                    { className: "roue-lien", onClick: () => d("regl") },
                    "R\xE8glement du jeu",
                  ),
                )
              : W.default.createElement(
                  W.default.Fragment,
                  null,
                  W.default.createElement(
                    "p",
                    null,
                    tours.length > 1
                      ? W.default.createElement(
                          W.default.Fragment,
                          null,
                          "Tour ",
                          s + 1,
                          " sur ",
                          tours.length,
                          " : merci pour votre passage !",
                        )
                      : W.default.createElement(
                          W.default.Fragment,
                          null,
                          "Merci pour votre passage : un tour de roue pour vous !",
                        ),
                  ),
                  W.default.createElement(RoueSvg, { angle: h, taille: 290, tourne: u === "tourne" }),
                  u === "pret" &&
                    W.default.createElement(
                      "button",
                      { className: "roue-b", onClick: E },
                      "\u{1F3A1} Lancer la roue",
                    ),
                  u === "tourne" &&
                    W.default.createElement("div", { className: "roue-cpt" }, "La roue tourne\u2026"),
                  u === "res" &&
                    W.default.createElement(
                      W.default.Fragment,
                      null,
                      W.default.createElement(
                        "div",
                        { className: "roue-res " + (m?.g ? "g" : "p") },
                        m?.g ? "\u{1F389} Gagn\xE9 !" : "Perdu\u2026 pas cette fois",
                      ),
                      W.default.createElement(
                        "p",
                        null,
                        m?.g
                          ? "Un ticket de plus pour le prochain tirage au sort de No\xEBl !"
                          : "Revenez vite : chaque tampon vous offre un nouveau tour.",
                      ),
                      D === 0 &&
                        tickets != null &&
                        W.default.createElement(
                          "div",
                          { className: "roue-cpt" },
                          "Vos tickets pour le prochain tirage : ",
                          W.default.createElement("b", null, tickets),
                        ),
                      W.default.createElement(
                        "button",
                        { className: "roue-b", onClick: F },
                        D > 0 ? "Tour suivant \u279C" : demo ? "Fermer la d\xE9mo" : "Fermer",
                      ),
                    ),
                  u !== "tourne" &&
                    u !== "res" &&
                    W.default.createElement(
                      W.default.Fragment,
                      null,
                      W.default.createElement(
                        "button",
                        { className: "roue-lien", onClick: () => d("regl") },
                        "R\xE8glement du jeu",
                      ),
                      !demo &&
                        W.default.createElement(
                          "button",
                          { className: "roue-lien", onClick: () => d("refus") },
                          "Je ne souhaite pas participer \xE0 la roue de No\xEBl",
                        ),
                    ),
                ),
          ),
        );
}
var ne = On(Ln());
var u2 = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
var vf = "Charcuterie Daval";
var gc = (t) => t.toLocaleDateString("sv-SE");
var c2 = (t) => (t == null || t === "" || isNaN(t) ? "" : Number(t).toFixed(2).replace(".", ",") + " \u20AC");
var XI = () => gc(new Date()),
  vc = (t) => (new Date(t + "T12:00").getDay() + 6) % 7,
  d2 = (t, e) => {
    let n = new Date(t.du + "T12:00");
    return n.setDate(n.getDate() + (e - vc(t.du))), gc(n);
  },
  h2 = (t, e = XI()) =>
    !!(t && t.actif !== !1 && t.du && t.au && Array.isArray(t.jours) && t.jours.length && e <= t.au);
function ZI(t, e = XI()) {
  if (!h2(t, e) || e < t.du) return null;
  let n = vc(e);
  return t.jours.find((r) => r.j === n && r.plat) || null;
}
var p2 = (t) => (u2[t] ? u2[t][0].toUpperCase() + u2[t].slice(1) : ""),
  dateFr = (t) =>
    new Date(t + "T12:00")
      .toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
      .replace(/^1 /, "1er ");
var m2 = ({ plat: plat }) => {
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
      !!n.length && ne.default.createElement("div", { className: "mn-acc" }, n.join(" \xB7 ")),
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
function TuileMenu({ menu: menu, onOuvrir: onOuvrir, aujourdhui: aujourdhui = gc(new Date()) }) {
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
          ne.default.createElement("span", { className: "mn-voir" }, "Menu \u203A"),
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
          ne.default.createElement("span", { className: "mn-lab" }, "Le menu de la semaine est arriv\xE9"),
          ne.default.createElement(
            "div",
            { className: "mn-plat" },
            "Du ",
            dateFr(menu.du),
            " au ",
            dateFr(menu.au),
          ),
        ),
        ne.default.createElement("span", { className: "mn-voir" }, "Voir \u203A"),
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
            ne.default.createElement("span", { className: "mn-voir" }, "Menu de la semaine \u203A"),
          ),
        ),
      );
}
function FeuilleMenu({
  menu: menu,
  onClose: onClose,
  aujourdhui: aujourdhui = gc(new Date()),
  apercu: apercu,
}) {
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
          "Plats cuisin\xE9s par la charcuterie ",
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
      !!menu.message &&
        ne.default.createElement("div", { className: "mn-msg" }, "\xAB ", menu.message, " \xBB"),
      ne.default.createElement(
        "div",
        { className: "mn-pied" },
        "Plats \xE0 retrouver \xE0 l'\xE9picerie, dans la limite des quantit\xE9s disponibles",
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
