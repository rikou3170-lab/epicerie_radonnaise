VD({
  loadJS(t) {
    return new Promise((e, n) => {
      let r = document.createElement("script");
      r.setAttribute("src", t),
        (r.onload = e),
        (r.onerror = (i) => {
          let o = Qn("internal-error");
          (o.customData = i), n(o);
        }),
        (r.type = "text/javascript"),
        (r.charset = "UTF-8"),
        y_().appendChild(r);
    });
  },
  gapiScript: "https://apis.google.com/js/api.js",
  recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
  recaptchaEnterpriseScript: "https://www.google.com/recaptcha/enterprise.js?render=",
});
g_("Browser");
var firebaseConfig = {
    apiKey: "AIzaSyCRvvyP7yCOSj2u4WDFCDvBWnGix0Ck-os",
    authDomain: "application-famille-897df.firebaseapp.com",
    projectId: "application-famille-897df",
    storageBucket: "application-famille-897df.firebasestorage.app",
    messagingSenderId: "718726611261",
    appId: "1:718726611261:web:793adf52ab34c8739d8554",
  },
  app2 = initializeApp(firebaseConfig),
  cacheLocal;
try {
  cacheLocal = persistentLocalCache({ tabManager: persistentMultipleTabManager() });
} catch {
  cacheLocal = void 0;
}
var db2 = initializeFirestore(app2, cacheLocal ? { localCache: cacheLocal } : {}),
  auth2 = getAuth(app2),
  CONFIG_REF = doc2(db2, "shop", "config");
var VERSION = "2.37";
var Wt = vn(Pn()),
  AC = vn(zf()),
  go = [],
  gE = null,
  D_ = (t) =>
    new Promise((e) => {
      (go = [...go, { ...t, res: e, id: Math.random() }]), gE?.(go);
    });
var CC = (t, e = {}) => D_({ texte: t, ...e }),
  w_ = /^(supprimer|effacer|annuler|retirer|vider)/i,
  __ = (t) => {
    let e =
      /^(Supprimer|Effacer|Annuler|Retirer|Vider|Remettre|Appliquer|Envoyer|Se déconnecter|Afficher)/i.exec(
        t.trim(),
      );
    if (!e) return "Confirmer";
    let n = e[1].toLowerCase();
    return (
      { annuler: "Oui, annuler", afficher: "Afficher", "se d\xE9connecter": "Se d\xE9connecter" }[n] ||
      e[1][0].toUpperCase() + e[1].slice(1)
    );
  },
  CSS_DIALOGUE = `
.dlg-fond{position:fixed;inset:0;z-index:1000;background:rgba(20,32,26,.55);display:flex;align-items:center;justify-content:center;padding:20px;animation:dlgIn .15s ease}
.dlg{background:#FFFFFF;border-radius:20px;max-width:400px;width:100%;padding:22px 20px 18px;box-shadow:0 18px 50px rgba(0,0,0,.25);font-family:'Nunito',system-ui,sans-serif;color:#22302A}
.dlg-t{font-size:15.5px;font-weight:700;line-height:1.5;white-space:pre-line;word-break:break-word;user-select:text;-webkit-user-select:text;margin:0 0 18px}
.dlg-b{display:flex;gap:10px}
.dlg-b button{flex:1;min-height:46px;border-radius:12px;font-family:inherit;font-size:15px;font-weight:800;cursor:pointer;border:1.5px solid #E6E0D2;background:#FFFFFF;color:#22302A}
.dlg-b button.ok{background:#1C433B;border-color:#1C433B;color:#FFFFFF}
.dlg-b button.ok.danger{background:#B2563F;border-color:#B2563F}
@keyframes dlgIn{from{opacity:0}to{opacity:1}}
`;
function Dialogue() {
  let [t, e] = (0, Wt.useState)(go);
  (0, Wt.useEffect)(
    () => (
      (gE = e),
      () => {
        gE = null;
      }
    ),
    [],
  );
  let n = t[0];
  if (
    ((0, Wt.useEffect)(() => {
      if (!n) return;
      let o = (s) => {
        s.key === "Escape" && r(!1), s.key === "Enter" && r(!0);
      };
      return window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o);
    }, [n?.id]),
    !n)
  )
    return null;
  function r(o) {
    n.res(n.seul ? void 0 : o), (go = go.filter((s) => s.id !== n.id)), e(go);
  }
  let i = n.danger ?? w_.test(n.texte.trim());
  return Wt.default.createElement(
    "div",
    { className: "dlg-fond", onClick: () => r(!1) },
    Wt.default.createElement("style", null, CSS_DIALOGUE),
    Wt.default.createElement(
      "div",
      { className: "dlg", role: "alertdialog", "aria-modal": "true", onClick: (o) => o.stopPropagation() },
      Wt.default.createElement("p", { className: "dlg-t" }, n.texte),
      Wt.default.createElement(
        "div",
        { className: "dlg-b" },
        !n.seul && Wt.default.createElement("button", { onClick: () => r(!1) }, n.non || "Non, retour"),
        Wt.default.createElement(
          "button",
          { className: "ok" + (i && !n.seul ? " danger" : ""), autoFocus: !0, onClick: () => r(!0) },
          n.seul ? "OK" : n.oui || __(n.texte),
        ),
      ),
    ),
  );
}
if (typeof document < "u") {
  let t = document.createElement("div");
  (t.id = "dialogues"),
    (document.body || document.documentElement).appendChild(t),
    (0, AC.createRoot)(t).render(Wt.default.createElement(Dialogue, null));
}
function typeAppareil() {
  let t = navigator.userAgent || "",
    e = /iPhone/.test(t)
      ? "iPhone"
      : /iPad|Macintosh.*Mobile/.test(t) ||
          (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
        ? "iPad"
        : /Android/.test(t)
          ? /Mobile/.test(t)
            ? "T\xE9l\xE9phone Android"
            : "Tablette Android"
          : /Windows/.test(t)
            ? "PC Windows"
            : /Mac/.test(t)
              ? "Mac"
              : "Autre",
    n = /Edg\//.test(t)
      ? "Edge"
      : /SamsungBrowser/.test(t)
        ? "Samsung"
        : /CriOS|Chrome\//.test(t)
          ? "Chrome"
          : /FxiOS|Firefox/.test(t)
            ? "Firefox"
            : /Safari/.test(t)
              ? "Safari"
              : "";
  return e + (n ? " \xB7 " + n : "");
}
function vC(t) {
  try {
    let e = "epicerie-raddonnaise-cnx-" + t;
    if (sessionStorage.getItem(e)) return;
    sessionStorage.setItem(e, "1");
  } catch {}
  addDoc(collection(db2, "connexions"), { date: Date.now(), app: t, appareil: typeAppareil() }).catch(
    () => {},
  );
}
var Xn = vn(Pn());
async function versionEnLigne() {
  try {
    let t = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
    return (t.ok && (await t.json()).version) || null;
  } catch {
    return null;
  }
}
var S_ = (t, e) =>
  new Promise((n) => {
    if (!t || t.state === "activated") return n();
    let r = setTimeout(n, e);
    t.addEventListener("statechange", () => {
      (t.state === "activated" || t.state === "redundant") && (clearTimeout(r), n());
    });
  });
async function P_() {
  try {
    if ("serviceWorker" in navigator) {
      let t = await navigator.serviceWorker.getRegistration();
      t && (await t.update().catch(() => {}), await S_(t.installing || t.waiting, 6e3));
    }
  } catch {}
  location.reload();
}
function useMiseAJour() {
  let [dispo, setDispo] = (0, Xn.useState)(null);
  return (
    (0, Xn.useEffect)(() => {
      location.search.includes("maj=") && history.replaceState(null, "", location.pathname);
      let n = async () => {
        let o = await versionEnLigne();
        o && o !== VERSION && setDispo(o);
      };
      n();
      let r = setInterval(n, 300 * 1e3),
        i = () => {
          document.visibilityState === "visible" && n();
        };
      return (
        document.addEventListener("visibilitychange", i),
        () => {
          clearInterval(r), document.removeEventListener("visibilitychange", i);
        }
      );
    }, []),
    dispo
  );
}
var styleBandeau = {
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "calc(84px + env(safe-area-inset-bottom))",
  width: "calc(100% - 24px)",
  maxWidth: 420,
  zIndex: 300,
  background: "#1C433B",
  color: "#fff",
  borderRadius: 14,
  padding: "11px 12px 11px 15px",
  display: "flex",
  alignItems: "center",
  gap: 10,
  boxShadow: "0 8px 28px rgba(0,0,0,.25)",
  fontFamily: "'Nunito',system-ui,sans-serif",
};
function BandeauMaj({ dispo: dispo }) {
  let [enCours, setEnCours] = (0, Xn.useState)(!1);
  return dispo
    ? Xn.default.createElement(
        "div",
        { style: styleBandeau },
        Xn.default.createElement(
          "div",
          { style: { flex: 1, fontSize: 12.5, lineHeight: 1.35 } },
          Xn.default.createElement(
            "b",
            { style: { display: "block", fontSize: 13.5 } },
            "Nouvelle version ",
            dispo,
          ),
          "Vous avez la version ",
          VERSION,
          ".",
        ),
        Xn.default.createElement(
          "button",
          {
            disabled: enCours,
            onClick: () => {
              setEnCours(!0), P_();
            },
            style: {
              border: "none",
              background: "#8AAD3B",
              color: "#fff",
              fontFamily: "inherit",
              fontSize: 12.5,
              fontWeight: 800,
              padding: "10px 14px",
              borderRadius: 10,
              cursor: "pointer",
              flexShrink: 0,
            },
          },
          enCours ? "Mise \xE0 jour\u2026" : "Mettre \xE0 jour",
        ),
      )
    : null;
}
var CE = { active: !0, points: 200, euros: 5 },
  js = (t) => {
    let e = t?.remise;
    if (!e || e.active === !1) return null;
    let n = Math.max(1, parseInt(e.points) || CE.points),
      r = Math.max(0, Number(String(e.euros ?? CE.euros).replace(",", ".")) || CE.euros);
    return { points: n, euros: r };
  },
  qs = (t) =>
    (Math.round((Number(t) || 0) * 100) / 100).toFixed(2).replace(".", ",").replace(",00", "") + " \u20AC";
function vE(t, e) {
  let n = js(t);
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
var FC = {
    nb: 20,
    palier: 10,
    seuil: 10,
    recompense1: "un cadeau surprise",
    recompense: "un chouette cadeau surprise",
    exclus: "carburant, gaz et alcool",
    delai: 30,
  },
  DC = () => !0,
  MENTION_EXCLUSIONS = (t) => {
    let e = { ...FC, ...(t?.tampons || {}) };
    (!e.exclus || e.exclus === "carburant, gaz, alcools, tabac, presse, jeux") && (e.exclus = FC.exclus);
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
  wC = (t) => {
    let e = MENTION_EXCLUSIONS(t);
    return (
      (e.seuil ? "1 passage d\xE8s " + e.seuil + " \u20AC d'achats = 1 tampon" : "1 passage = 1 tampon") +
      " \xB7 " +
      (e.palier
        ? e.palier + " tampons = " + e.recompense1 + ", ou continuez : " + e.nb + " tampons = " + e.recompense
        : e.nb + " tampons = " + e.recompense)
    );
  },
  _C = (t, e) => {
    let n = Number(t?.tampons) || 0;
    return n >= e.nb
      ? !0
      : !e.palier || n !== e.palier
        ? !1
        : !(t.choix === "continue" && (Number(t.choixLe) || 0) > (Number(t.dernierTampon) || 0));
  },
  kC = (t, e, n) => {
    let r = (Number(t) || 0) + 1,
      i = Math.max(0, Number(e) || 0);
    return n.palier && r <= n.palier && (i = Math.min(i, n.palier - r)), Math.max(0, Math.min(i, n.nb - r));
  },
  BC = [
    { min: 2, nom: "Membre supporter", ico: "\u{1F49A}" },
    { min: 5, nom: "Pilier de l'\xE9picerie", ico: "\u{1F333}" },
  ],
  Kx = (t) => {
    let e = Math.max(0, Number(t?.cadeaux) || 0),
      n = [...BC].reverse().find((i) => e >= i.min) || null,
      r = BC.find((i) => e < i.min) || null;
    return { k: e, niv: n, suivant: r, reste: r ? r.min - e : 0 };
  };
var CMD_DEF = {
    active: !0,
    delaiMin: 2,
    horizon: 60,
    jours: [0, 1, 2, 3, 4, 5, 6],
    fermes: [],
    mode: "retrait",
    note: "",
    heureDefaut: "17:00",
    script: "",
  },
  IC = (t) => ({ ...CMD_DEF, ...(t || {}) }),
  O_ = (t) => /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(t || ""),
  FE = O_;
var LISTE_RACLETTE = {
  titre: "Vos fromages \xE0 raclette",
  min: 1,
  max: 3,
  options: [
    "Raclette nature",
    "Raclette au fenugrec",
    "Raclette \xE0 l'ail des ours",
    "Raclette aux 5 baies",
    "Raclette Estivale (poivron / tomate)",
    "Raclette \xE0 la cam\xE9line",
    "Morbier",
    "Bargkass nature",
    "Bargkass \xE0 l'ortie",
    "Bargkass au serpolet",
  ].map((t) => ({ nom: t, supp: 0 })),
};
var S = vn(Pn());
var Ee = vn(Pn()),
  L_ = [
    "halloween",
    "octobrerose",
    "beaujolais",
    "stnicolas",
    "nouvelan",
    "galette",
    "chandeleur",
    "valentin",
    "paques",
    "muguet",
    "meres",
    "musique",
    "peres",
    "juillet",
  ],
  gn = (t) => (t && !t.magie && L_.includes(t.id) && t.ambiance !== !1 ? t.id : null);
var BE = {
    violet: "#2B1B3D",
    nuit: "#140B22",
    orange: "#E8731C",
    flamme: "#FFB547",
    vert: "#7FBF3F",
    os: "#F3E9D2",
  },
  SvgChapeauSorciere = ({ taille: taille = 30, style: style }) =>
    Ee.default.createElement(
      "svg",
      {
        className: "amb-chapeau",
        viewBox: "0 0 44 40",
        width: taille,
        height: taille * 0.9,
        style: style,
        "aria-hidden": "true",
      },
      Ee.default.createElement("path", {
        d: "M22 2c3 6 4 10 9 14 2 2 2 6 0 9H11c3-6 6-12 7-17 1-3 2-5 4-6z",
        fill: "#6E45A8",
      }),
      Ee.default.createElement("path", {
        d: "M22 2c3 6 4 10 9 14-3-2-6-3-9-3 0-4 0-8 0-11z",
        fill: "#8A62C4",
      }),
      Ee.default.createElement("path", { d: "M12 21h20l-1 5H13z", fill: BE.orange }),
      Ee.default.createElement("rect", {
        x: "19.5",
        y: "20.5",
        width: "6",
        height: "6",
        rx: "1",
        fill: "none",
        stroke: BE.flamme,
        strokeWidth: "1.6",
      }),
      Ee.default.createElement("ellipse", { cx: "22", cy: "28", rx: "20", ry: "5", fill: "#5A3690" }),
      Ee.default.createElement("ellipse", { cx: "22", cy: "27", rx: "18", ry: "3.4", fill: "#7650B2" }),
    ),
  SvgCitrouille = ({ taille: taille = 22, cls: cls = "" }) =>
    Ee.default.createElement(
      "svg",
      {
        className: "amb-citrouille " + cls,
        viewBox: "0 0 40 36",
        width: taille,
        height: taille * 0.9,
        "aria-hidden": "true",
      },
      Ee.default.createElement("path", { d: "M20 7c-2-4-1-6 1-7l2 1c-2 1-2 3-1 6z", fill: "#4E6B2A" }),
      Ee.default.createElement("ellipse", { cx: "12", cy: "21", rx: "10", ry: "12", fill: "#D9621A" }),
      Ee.default.createElement("ellipse", { cx: "28", cy: "21", rx: "10", ry: "12", fill: "#D9621A" }),
      Ee.default.createElement("ellipse", { cx: "20", cy: "21", rx: "10", ry: "13", fill: BE.orange }),
      Ee.default.createElement(
        "g",
        { className: "amb-lueur", fill: "#FFD36B" },
        Ee.default.createElement("path", { d: "M11 17l5 0-2.5-4.5zM24 17l5 0-2.5-4.5z" }),
        Ee.default.createElement("path", { d: "M10 24c4 4 16 4 20 0l-3 1-2-2-2 2-3-2-3 2-2-2-2 2z" }),
      ),
    );
function bC({ n: t = 9, apercu: apercu }) {
  return Ee.default.createElement(
    "div",
    { className: "amb-guirl" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
    Ee.default.createElement(
      "svg",
      { className: "amb-fil", viewBox: "0 0 300 24", preserveAspectRatio: "none" },
      Ee.default.createElement("path", {
        d:
          "M0 3 " +
          Array.from(
            { length: t },
            (n, r) => "Q" + ((r + 0.5) * 300) / t + " 15 " + ((r + 1) * 300) / t + " 3",
          ).join(" "),
        fill: "none",
        stroke: "#1A0F28",
        strokeWidth: "1.4",
      }),
    ),
    Array.from({ length: t * 2 }, (n, r) => {
      let i = ((r + 0.5) * 100) / (t * 2);
      return r % 2 === 0
        ? Ee.default.createElement(
            "span",
            {
              key: r,
              className: "amb-lanterne",
              style: { left: i + "%", animationDelay: (r % 5) * 0.37 + "s" },
            },
            Ee.default.createElement(SvgCitrouille, { taille: 17 }),
          )
        : Ee.default.createElement("span", {
            key: r,
            className: "amb-fanion " + (r % 4 === 1 ? "o" : "v"),
            style: { left: i + "%" },
          });
    }),
  );
}
var z_ = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%235E3F82' stroke-width='.9' opacity='.75'%3E%3Cpath d='M40 0L8 32M40 0L22 40M40 0L0 18M40 0v40M40 0H0'/%3E%3Cpath d='M28 0q2 6 12 12M16 0q4 12 24 24M6 0q6 20 34 34'/%3E%3C/g%3E%3C/svg%3E")`;
var SC = ({ taille: taille = 18, c1: e = "#EC407A", c2: c2 = "#F06292", cls: cls = "" }) =>
    Ee.default.createElement(
      "svg",
      { className: cls, viewBox: "0 0 24 30", width: taille, height: taille * 1.25, "aria-hidden": "true" },
      Ee.default.createElement("path", {
        d: "M12 2c-3.4 0-5.5 2.4-5.5 5.4 0 3.4 2.2 6.8 5.5 11.6 3.3-4.8 5.5-8.2 5.5-11.6C17.5 4.4 15.4 2 12 2zm0 3c1.5 0 2.5 1 2.5 2.5 0 1.6-1 3.5-2.5 6-1.5-2.5-2.5-4.4-2.5-6C9.5 6 10.5 5 12 5z",
        fill: e,
      }),
      Ee.default.createElement("path", {
        d: "M10 17 3.5 27.5l3.7-.4 1.7 3.4 5.3-9.4zM14 17l6.5 10.5-3.7-.4-1.7 3.4-5.3-9.4z",
        fill: c2,
      }),
    ),
  PC = ({ style: style }) =>
    Ee.default.createElement(
      "span",
      { className: "amb-ruban-logo", style: style },
      Ee.default.createElement(SC, { taille: 15 }),
    );
function NC({ n: t = 9, apercu: apercu }) {
  return Ee.default.createElement(
    "div",
    { className: "amb-guirl" + (apercu ? " apercu" : ""), "aria-hidden": "true" },
    Ee.default.createElement(
      "svg",
      { className: "amb-fil", viewBox: "0 0 300 24", preserveAspectRatio: "none" },
      Ee.default.createElement("path", {
        d:
          "M0 3 " +
          Array.from(
            { length: t },
            (n, r) => "Q" + ((r + 0.5) * 300) / t + " 15 " + ((r + 1) * 300) / t + " 3",
          ).join(" "),
        fill: "none",
        stroke: "#C2185B",
        strokeWidth: "1.2",
      }),
    ),
    Array.from({ length: t * 2 }, (n, r) => {
      let i = ((r + 0.5) * 100) / (t * 2);
      return r % 2 === 0
        ? Ee.default.createElement(
            "span",
            {
              key: r,
              className: "amb-lanterne",
              style: { left: i + "%", animationDelay: (r % 5) * 0.37 + "s" },
            },
            Ee.default.createElement(SC, { taille: 13 }),
          )
        : Ee.default.createElement("span", { key: r, className: "amb-coeur", style: { left: i + "%" } });
    }),
  );
}
