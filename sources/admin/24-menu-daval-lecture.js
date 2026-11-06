/* ═══════════════════════════════════════════════════════════════════════
 *  MENU DE LA SEMAINE (charcuterie Daval) — lecture automatique de la photo du menu (OCR) et éditeur.
 * ═══════════════════════════════════════════════════════════════════════ */

// Prépare la photo du menu pour la lecture (agrandie, contrastée, en noir et blanc).
async function preparerImage(t) {
  let e = URL.createObjectURL(t);
  try {
    let n = await new Promise((h, p) => {
        let m = new Image();
        (m.onload = () => h(m)), (m.onerror = p), (m.src = e);
      }),
      r = Math.min(3, 2400 / n.naturalWidth, 5e3 / n.naturalHeight),
      i = document.createElement("canvas");
    (i.width = Math.round(n.naturalWidth * r)), (i.height = Math.round(n.naturalHeight * r));
    let s = i.getContext("2d");
    (s.imageSmoothingQuality = "high"), s.drawImage(n, 0, 0, i.width, i.height);
    let o = s.getImageData(0, 0, i.width, i.height),
      a = o.data,
      u = 0;
    for (let h = 0; h < a.length; h += 4) {
      let p = 0.299 * a[h] + 0.587 * a[h + 1] + 0.114 * a[h + 2];
      (a[h] = p), (u += p);
    }
    let d = u / (a.length / 4);
    for (let h = 0; h < a.length; h += 4) {
      let p = Math.max(0, Math.min(255, (a[h] - d) * 1.6 + d));
      a[h] = a[h + 1] = a[h + 2] = p;
    }
    return s.putImageData(o, 0, 0), i;
  } finally {
    URL.revokeObjectURL(e);
  }
}

// Lit le texte de la photo du menu (Tesseract, en français, fichiers dans le dossier ocr/).
async function lancerOCR(t, e) {
  let n = await preparerImage(t),
    r = await (0, Tesseract.createWorker)("fra", 1, {
      workerPath: "ocr/worker.min.js",
      corePath: "ocr/",
      langPath: "ocr",
      workerBlobURL: !1,
      logger: (i) => {
        i.status === "recognizing text" && e(Math.round(i.progress * 100));
      },
    });
  try {
    let { data: i } = await r.recognize(n, {}, { blocks: !0 }),
      s = [];
    for (let o of i.blocks || [])
      for (let a of o.paragraphs || [])
        for (let u of a.lines || []) s.push({ text: u.text, y: (u.bbox.y0 + u.bbox.y1) / 2 });
    return GrilleMenuSemaine(s);
  } finally {
    r.terminate();
  }
}

// Dates de la semaine du menu (lundi → samedi).
var N9 = (t) => {
    let e = new Date(t);
    return e.setDate(e.getDate() - ((e.getDay() + 6) % 7)), e;
  },
  DS = () => {
    let t = N9(new Date()),
      e = new Date(t);
    return (
      e.setDate(t.getDate() + 5),
      {
        du: On(t),
        au: On(e),
        jours: [0, 1, 2, 3, 4, 5].map((n) => ({ j: n, plat: "", prix: "" })),
        message: "",
        doutes: [],
      }
    );
  },
  nw = (t) => {
    let e = [0, 1, 2, 3, 4, 5, 6]
      .map((n) => {
        let r = (t.jours || []).find((i) => i.j === n);
        return r
          ? { ...r, prix: r.prix == null || r.prix === "" ? "" : Number(r.prix).toFixed(2) }
          : { j: n, plat: "", prix: "" };
      })
      .filter((n) => n.j < 6 || n.plat);
    return { ...DS(), ...t, jours: e };
  };

// Éditeur du menu de la semaine : photo → lecture automatique → correction → publication.
function EditeurMenuDaval({ d: t, set }) {
  let n = t.menu,
    [r, i] = (0, ReactC.useState)(null),
    [s, o] = (0, ReactC.useState)(null),
    [a, u] = (0, ReactC.useState)(null),
    d = (0, ReactC.useRef)(null),
    h = (S) => r?.doutes?.includes(S),
    p = async (S) => {
      let _ = S.target.files?.[0];
      if (((S.target.value = ""), !!_)) {
        u(URL.createObjectURL(_)), o({ p: 0 }), i(null);
        try {
          let I = await lancerOCR(_, (T) => o({ p: T }));
          i(nw(I)), o(null);
        } catch (I) {
          console.error(I), o({ erreur: !0 });
        }
      }
    },
    m = (S, _) =>
      i((I) => ({
        ...I,
        jours: I.jours.map((T) => (T.j === S ? { ...T, ..._ } : T)),
        doutes: (I.doutes || []).filter(
          (T) => T !== "jour-" + S && !Object.keys(_).some((M) => T === M + "-" + S),
        ),
      })),
    w = () => {
      let S = r.jours
        .map((_) => ({
          j: _.j,
          plat: String(_.plat || "")
            .split(
              `
`,
            )
            .map((I) => I.trim())
            .filter(Boolean)
            .slice(0, 3)
            .join(
              `
`,
            )
            .slice(0, 160),
          prix:
            _.prix === "" || _.prix == null || isNaN(Number(String(_.prix).replace(",", ".")))
              ? null
              : Math.round(Number(String(_.prix).replace(",", ".")) * 100) / 100,
        }))
        .filter((_) => _.plat);
      return {
        du: r.du,
        au: r.au,
        jours: S,
        message: String(r.message || "")
          .trim()
          .slice(0, 240),
        actif: !0,
        maj: Date.now(),
      };
    },
    E = r
      ? !r.du || !r.au
        ? "Indiquez les dates de la semaine."
        : r.au < r.du
          ? "La date de fin est avant la date de début."
          : r.jours.some((S) => String(S.plat).trim())
            ? ""
            : "Aucun plat n'est rempli."
      : "",
    A = () => {
      E || (set("menu", w()), i(null), u(null));
    };
  return ReactC.default.createElement(
    "div",
    { className: "wrap" },
    ReactC.default.createElement("div", { className: "t1" }, "Menu de la semaine"),
    ReactC.default.createElement(
      "div",
      { className: "sub" },
      "Les plats cuisinés de la charcuterie ",
      Af.replace("Charcuterie ", ""),
      " : déposez la photo du menu (celle que vous postez sur les réseaux), l'application lit le texte et prépare un joli menu. Le plat du jour s'affiche tout seul sur l'accueil des clients.",
    ),
    !r &&
      ReactC.default.createElement(
        "div",
        { className: "card" },
        ReactC.default.createElement(
          "div",
          { className: "nm", style: { marginBottom: 6 } },
          "En ligne en ce moment",
        ),
        ew(n)
          ? ReactC.default.createElement(
              ReactC.default.Fragment,
              null,
              ReactC.default.createElement(
                "div",
                { className: "de", style: { marginBottom: 10 } },
                "Du ",
                dateFr(n.du),
                " au ",
                dateFr(n.au),
                " · ",
                n.jours.length,
                " plat",
                n.jours.length > 1 ? "s" : "",
                ". Il disparaît tout seul après le ",
                dateFr(n.au),
                ".",
              ),
              ReactC.default.createElement(FeuilleMenu, { menu: n, apercu: !0 }),
              ReactC.default.createElement(
                "div",
                { style: { display: "flex", gap: 8, marginTop: 10 } },
                ReactC.default.createElement(
                  "button",
                  { className: "btn gh sm", style: { flex: 1 }, onClick: () => i(nw({ ...n, doutes: [] })) },
                  "Modifier",
                ),
                ReactC.default.createElement(
                  "button",
                  {
                    className: "btn gh sm",
                    style: { flex: 1 },
                    onClick: () => set("menu", { ...n, actif: !1 }),
                  },
                  "Retirer",
                ),
              ),
            )
          : ReactC.default.createElement("div", { className: "de" }, "Aucun menu en cours."),
      ),
    !r &&
      ReactC.default.createElement(
        "div",
        { className: "card" },
        ReactC.default.createElement("div", { className: "nm" }, "Nouveau menu"),
        ReactC.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 10 } },
          "Une photo ou une capture d'écran bien droite et nette donne le meilleur résultat. La photo reste sur votre téléphone : seul le texte est publié.",
        ),
        ReactC.default.createElement("input", {
          ref: d,
          type: "file",
          accept: "image/*",
          style: { display: "none" },
          onChange: p,
        }),
        !s &&
          ReactC.default.createElement(
            "button",
            { className: "btn", onClick: () => d.current.click() },
            "📷 Déposer la photo du menu",
          ),
        s &&
          !s.erreur &&
          ReactC.default.createElement(
            "div",
            { className: "mna-lect" },
            a && ReactC.default.createElement("img", { src: a, alt: "" }),
            ReactC.default.createElement(
              "div",
              null,
              ReactC.default.createElement(
                "div",
                { className: "nm" },
                "Lecture du menu… ",
                s.p ? s.p + " %" : "",
              ),
              ReactC.default.createElement(
                "div",
                { className: "mna-barre" },
                ReactC.default.createElement("i", { style: { width: (s.p || 3) + "%" } }),
              ),
              ReactC.default.createElement(
                "div",
                { className: "de" },
                "La première fois, le téléphone télécharge l'outil de lecture (quelques secondes).",
              ),
            ),
          ),
        s?.erreur &&
          ReactC.default.createElement(
            ReactC.default.Fragment,
            null,
            ReactC.default.createElement(
              "div",
              { className: "de", style: { color: "#B3261E", margin: "0 0 10px" } },
              "La photo n'a pas pu être lue. Réessayez, ou remplissez le menu à la main.",
            ),
            ReactC.default.createElement(
              "button",
              { className: "btn", onClick: () => d.current.click() },
              "Réessayer avec une photo",
            ),
          ),
        ReactC.default.createElement(
          "button",
          {
            className: "btn gh",
            style: { marginTop: 8 },
            onClick: () => {
              o(null), i(nw(DS()));
            },
          },
          "Remplir à la main",
        ),
      ),
    r &&
      ReactC.default.createElement(
        "div",
        { className: "card" },
        ReactC.default.createElement("div", { className: "nm" }, "Vérifiez le menu avant de le publier"),
        ReactC.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 4 } },
          r.doutes?.length
            ? "Les cases en orange sont à vérifier en priorité."
            : "Relisez chaque ligne : la lecture automatique peut se tromper sur un mot.",
        ),
        a && ReactC.default.createElement("img", { className: "mna-photo", src: a, alt: "Photo du menu" }),
        ReactC.default.createElement(
          "div",
          { style: { display: "flex", gap: 8 } },
          ReactC.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            ReactC.default.createElement("label", { className: "lab" }, "Du"),
            ReactC.default.createElement("input", {
              className: "inp" + (h("dates") ? " mna-doute" : ""),
              type: "date",
              value: r.du,
              onChange: (S) => i({ ...r, du: S.target.value, doutes: r.doutes.filter((_) => _ !== "dates") }),
            }),
          ),
          ReactC.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            ReactC.default.createElement("label", { className: "lab" }, "Au"),
            ReactC.default.createElement("input", {
              className: "inp" + (h("dates") ? " mna-doute" : ""),
              type: "date",
              value: r.au,
              onChange: (S) => i({ ...r, au: S.target.value, doutes: r.doutes.filter((_) => _ !== "dates") }),
            }),
          ),
        ),
        r.jours.map((S) =>
          ReactC.default.createElement(
            "div",
            { key: S.j, className: "mna-jour" },
            ReactC.default.createElement(
              "div",
              { className: "mna-jt" },
              Tf(S.j),
              h("jour-" + S.j) &&
                ReactC.default.createElement("span", { className: "mna-av" }, "jour à vérifier"),
            ),
            ReactC.default.createElement("textarea", {
              className: "inp" + (h("plat-" + S.j) || h("jour-" + S.j) ? " mna-doute" : ""),
              rows: 2,
              value: S.plat,
              placeholder: "Plat (et accompagnement à la ligne)",
              onChange: (_) => m(S.j, { plat: _.target.value }),
            }),
            ReactC.default.createElement(
              "div",
              { className: "mna-px" },
              ReactC.default.createElement("input", {
                className: "inp" + (h("prix-" + S.j) ? " mna-doute" : ""),
                inputMode: "decimal",
                value: String(S.prix ?? "").replace(".", ","),
                placeholder: "Prix",
                onChange: (_) => m(S.j, { prix: _.target.value.replace(",", ".") }),
              }),
              ReactC.default.createElement("span", null, "€"),
            ),
          ),
        ),
        !r.jours.some((S) => S.j === 6) &&
          ReactC.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { marginTop: 8 },
              onClick: () => i({ ...r, jours: [...r.jours, { j: 6, plat: "", prix: "" }] }),
            },
            "+ Ajouter le dimanche",
          ),
        ReactC.default.createElement("label", { className: "lab" }, "Petit mot en bas du menu (facultatif)"),
        ReactC.default.createElement("textarea", {
          className: "inp",
          rows: 2,
          value: r.message,
          onChange: (S) => i({ ...r, message: S.target.value }),
        }),
        ReactC.default.createElement(
          "div",
          { className: "nm", style: { margin: "16px 0 8px" } },
          "Ce que verront les clients",
        ),
        ReactC.default.createElement(FeuilleMenu, {
          menu: { ...w(), jours: w().jours },
          apercu: !0,
          aujourdhui: On(new Date()) >= r.du && On(new Date()) <= r.au ? On(new Date()) : r.du,
        }),
        E &&
          ReactC.default.createElement(
            "div",
            { className: "de", style: { color: "#B3261E", marginTop: 10 } },
            E,
          ),
        ReactC.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 12 }, disabled: !!E, onClick: A },
          "Publier le menu",
        ),
        ReactC.default.createElement(
          "button",
          {
            className: "btn gh",
            style: { marginTop: 8 },
            onClick: () => {
              i(null), u(null);
            },
          },
          "Annuler",
        ),
      ),
  );
}

// Styles de l'éditeur de menu.
var CSS_MENU = `
.mna-lect{display:flex;gap:12px;align-items:center;margin-bottom:6px}
.mna-lect img{width:64px;height:84px;object-fit:cover;border-radius:8px;border:1px solid var(--line)}
.mna-lect>div{flex:1}
.mna-barre{height:6px;border-radius:4px;background:var(--line);overflow:hidden;margin:8px 0 6px}
.mna-barre i{display:block;height:100%;background:var(--apple);transition:width .3s}
.mna-photo{display:block;width:100%;max-height:220px;object-fit:contain;border-radius:10px;border:1px solid var(--line);margin:10px 0 4px;background:#fff}
.mna-jour{display:grid;grid-template-columns:1fr 84px;gap:6px 8px;margin-top:12px}
.mna-jt{grid-column:1/-1;font-weight:800;font-size:12.5px;color:var(--forest);text-transform:uppercase;letter-spacing:.05em}
.mna-av{margin-left:8px;font-size:10px;color:#B86A00;background:#FFF1D6;padding:2px 7px;border-radius:8px;text-transform:none;letter-spacing:0}
.mna-px{display:flex;align-items:center;gap:4px}
.mna-px span{font-weight:800;color:var(--ink3)}
input[type=date].inp{min-width:0;-webkit-appearance:none;appearance:none}
.inp.mna-doute{border-color:#E8A23B!important;background:#FFF8EA!important}
`;
