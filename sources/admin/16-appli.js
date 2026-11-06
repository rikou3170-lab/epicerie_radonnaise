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
function EditeurMenuDaval({ d: t, set: set }) {
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
          ? "La date de fin est avant la date de d\xE9but."
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
      "Les plats cuisin\xE9s de la charcuterie ",
      Af.replace("Charcuterie ", ""),
      " : d\xE9posez la photo du menu (celle que vous postez sur les r\xE9seaux), l'application lit le texte et pr\xE9pare un joli menu. Le plat du jour s'affiche tout seul sur l'accueil des clients.",
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
                " \xB7 ",
                n.jours.length,
                " plat",
                n.jours.length > 1 ? "s" : "",
                ". Il dispara\xEEt tout seul apr\xE8s le ",
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
          "Une photo ou une capture d'\xE9cran bien droite et nette donne le meilleur r\xE9sultat. La photo reste sur votre t\xE9l\xE9phone : seul le texte est publi\xE9.",
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
            "\u{1F4F7} D\xE9poser la photo du menu",
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
                "Lecture du menu\u2026 ",
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
                "La premi\xE8re fois, le t\xE9l\xE9phone t\xE9l\xE9charge l'outil de lecture (quelques secondes).",
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
              "La photo n'a pas pu \xEAtre lue. R\xE9essayez, ou remplissez le menu \xE0 la main.",
            ),
            ReactC.default.createElement(
              "button",
              { className: "btn", onClick: () => d.current.click() },
              "R\xE9essayer avec une photo",
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
          "Remplir \xE0 la main",
        ),
      ),
    r &&
      ReactC.default.createElement(
        "div",
        { className: "card" },
        ReactC.default.createElement("div", { className: "nm" }, "V\xE9rifiez le menu avant de le publier"),
        ReactC.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 4 } },
          r.doutes?.length
            ? "Les cases en orange sont \xE0 v\xE9rifier en priorit\xE9."
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
                ReactC.default.createElement("span", { className: "mna-av" }, "jour \xE0 v\xE9rifier"),
            ),
            ReactC.default.createElement("textarea", {
              className: "inp" + (h("plat-" + S.j) || h("jour-" + S.j) ? " mna-doute" : ""),
              rows: 2,
              value: S.plat,
              placeholder: "Plat (et accompagnement \xE0 la ligne)",
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
              ReactC.default.createElement("span", null, "\u20AC"),
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
var K = en(hn()),
  LS = {
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
var D9 = (t, e) => (t && Number(t.roueP) === oc(e).periode && Number(t.roueG)) || 0,
  P9 = (t) =>
    String(
      t?.prenom ||
        String(t?.nom || "")
          .trim()
          .split(/\s+/)[0] ||
        "Client",
    ).trim();
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
var sc = ["#FF4D5E", "#FFD86B", "#5FD068", "#7FC8FF", "#FFFFFF"];
function M9({ vite: vite }) {
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
var qS = 8,
  br = 360 / qS,
  rw = (t, e) => [e * Math.sin((t * Math.PI) / 180), -e * Math.cos((t * Math.PI) / 180)];
function RoueSvg({ angle: angle = 0, taille: taille = 300, tourne: tourne }) {
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
            m ? "GAGN\xC9" : "PERDU",
          ),
        );
      }),
    ),
    K.default.createElement("circle", { r: "22", fill: "url(#ror)", stroke: "#FFF3C4", strokeWidth: "2" }),
    K.default.createElement(
      "text",
      { textAnchor: "middle", dominantBaseline: "central", fontSize: "24" },
      "\u2744\uFE0F",
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
function ReglementRoue({ onClose: onClose }) {
  return K.default.createElement(
    "div",
    { className: "roue-regl" },
    K.default.createElement("h3", null, "R\xE8glement de la roue de No\xEBl"),
    K.default.createElement(
      "ol",
      null,
      K.default.createElement(
        "li",
        null,
        "Jeu gratuit organis\xE9 par l'\xC9picerie Raddonnaise (Raddon-et-Chapendu), r\xE9serv\xE9 aux personnes de 18 ans et plus titulaires de la carte de fid\xE9lit\xE9, pendant la p\xE9riode fix\xE9e par l'\xE9picerie.",
      ),
      K.default.createElement(
        "li",
        null,
        "Chaque tampon re\xE7u en caisse donne droit \xE0 un tour de roue. Le r\xE9sultat est tir\xE9 au hasard au moment du tampon, avec une chance sur deux de gagner : 4 parts \xAB Gagn\xE9 \xBB et 4 parts \xAB Perdu \xBB.",
      ),
      K.default.createElement(
        "li",
        null,
        "Les tours pas encore jou\xE9s sont gard\xE9s : vous pouvez les jouer plus tard dans l'application. Sans t\xE9l\xE9phone, vous participez aussi : le r\xE9sultat s'affiche \xE0 la caisse.",
      ),
      K.default.createElement(
        "li",
        null,
        "Chaque \xAB Gagn\xE9 \xBB donne un ticket pour le prochain tirage au sort. Plus vous avez de tickets, plus vous avez de chances. Apr\xE8s chaque tirage, les tickets repartent \xE0 z\xE9ro.",
      ),
      K.default.createElement(
        "li",
        null,
        "Si un passage en caisse est annul\xE9, le tour de roue et le ticket \xE9ventuel de ce passage sont annul\xE9s aussi.",
      ),
      K.default.createElement(
        "li",
        null,
        "Les tirages ont lieu \xE0 l'\xE9picerie, aux dates choisies par l'\xE9picerie, par un tirage au hasard effectu\xE9 par l'application. Un m\xEAme participant peut gagner plusieurs tirages.",
      ),
      K.default.createElement(
        "li",
        null,
        "Le gagnant est pr\xE9venu par e-mail et par notification. Son pr\xE9nom est affich\xE9 dans l'application. Les lots sont une surprise et sont \xE0 retirer \xE0 l'\xE9picerie, sans limite de date.",
      ),
      K.default.createElement(
        "li",
        null,
        "Vous pouvez refuser de participer \xE0 tout moment, et changer d'avis dans \xAB Mes donn\xE9es \xBB.",
      ),
    ),
    K.default.createElement("button", { className: "roue-b2", onClick: onClose }, "Fermer"),
  );
}
