o8({
  loadJS(t) {
    return new Promise((e, n) => {
      let r = document.createElement("script");
      (r.setAttribute("src", t),
        (r.onload = e),
        (r.onerror = (i) => {
          let o = fr("internal-error");
          ((o.customData = i), n(o));
        }),
        (r.type = "text/javascript"),
        (r.charset = "UTF-8"),
        jP().appendChild(r));
    });
  },
  gapiScript: "https://apis.google.com/js/api.js",
  recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
  recaptchaEnterpriseScript: "https://www.google.com/recaptcha/enterprise.js?render=",
});
LP("Browser");
var HP = {
    apiKey: "AIzaSyCRvvyP7yCOSj2u4WDFCDvBWnGix0Ck-os",
    authDomain: "application-famille-897df.firebaseapp.com",
    projectId: "application-famille-897df",
    storageBucket: "application-famille-897df.firebasestorage.app",
    messagingSenderId: "718726611261",
    appId: "1:718726611261:web:793adf52ab34c8739d8554",
  },
  hf = L0(HP),
  df;
try {
  df = Rk({ tabManager: e3() });
} catch {
  df = void 0;
}
var ce = Uk(hf, df ? { localCache: df } : {}),
  vV = Uy(hf),
  Z3 = we(ce, "shop", "config"),
  X3 = "ABCDEFGHJKMNPQRSTUVWXYZ23456789",
  qy = () => {
    let t = "",
      e = new Uint32Array(5);
    return (
      crypto.getRandomValues(e),
      e.forEach((n) => {
        t += X3[n % X3.length];
      }),
      "RAD-" + t
    );
  };
var eI = (t = new Date()) => t.toLocaleDateString("sv-SE"),
  $y = "epicerie-raddonnaise-sans-stats",
  R3 = "epicerie-raddonnaise-vu-le";
function KP() {
  try {
    return (
      /[?&]stats=off/.test(location.search) && localStorage.setItem($y, "1"),
      /[?&]stats=on/.test(location.search) && localStorage.removeItem($y),
      localStorage.getItem($y) === "1"
    );
  } catch {
    return !1;
  }
}
var QP = (t) =>
  String(t)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "")
    .slice(0, 50);
function tn(t) {
  let e = QP(t);
  if (!e || KP()) return;
  let n = eI();
  try {
    Sn(we(ce, "stats", n + "_" + e), { jour: n, cle: e, n: Gu(1) }, { merge: !0 }).catch(() => {});
  } catch {}
}
function tI() {
  (tn("ouvertures"), tn("h_" + String(new Date().getHours()).padStart(2, "0")));
  try {
    let t = eI();
    localStorage.getItem(R3) !== t && (localStorage.setItem(R3, t), tn("visiteurs"));
  } catch {}
}
var $t = On(Ln());
async function nI() {
  try {
    let t = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
    return (t.ok && (await t.json()).version) || null;
  } catch {
    return null;
  }
}
var JP = (t, e) =>
  new Promise((n) => {
    if (!t || t.state === "activated") return n();
    let r = setTimeout(n, e);
    t.addEventListener("statechange", () => {
      (t.state === "activated" || t.state === "redundant") && (clearTimeout(r), n());
    });
  });
async function Wy() {
  try {
    if ("serviceWorker" in navigator) {
      let t = await navigator.serviceWorker.getRegistration();
      t && (await t.update().catch(() => {}), await JP(t.installing || t.waiting, 6e3));
    }
  } catch {}
  location.reload();
}
function rI() {
  let [t, e] = (0, $t.useState)(null);
  return (
    (0, $t.useEffect)(() => {
      location.search.includes("maj=") && history.replaceState(null, "", location.pathname);
      let n = async () => {
        let o = await nI();
        o && o !== yi && e(o);
      };
      n();
      let r = setInterval(n, 300 * 1e3),
        i = () => {
          document.visibilityState === "visible" && n();
        };
      return (
        document.addEventListener("visibilitychange", i),
        () => {
          (clearInterval(r), document.removeEventListener("visibilitychange", i));
        }
      );
    }, []),
    t
  );
}
var YP = {
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
function iI({ dispo: t }) {
  let [e, n] = (0, $t.useState)(!1);
  return t
    ? $t.default.createElement(
        "div",
        { style: YP },
        $t.default.createElement(
          "div",
          { style: { flex: 1, fontSize: 12.5, lineHeight: 1.35 } },
          $t.default.createElement(
            "b",
            { style: { display: "block", fontSize: 13.5 } },
            "Nouvelle version ",
            t,
          ),
          "Vous avez la version ",
          yi,
          ".",
        ),
        $t.default.createElement(
          "button",
          {
            disabled: e,
            onClick: () => {
              (n(!0), Wy());
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
          e ? "Mise \xE0 jour\u2026" : "Mettre \xE0 jour",
        ),
      )
    : null;
}
function oI({ className: t = "btn gh", style: e }) {
  let [n, r] = (0, $t.useState)("");
  return $t.default.createElement(
    "div",
    { style: e },
    $t.default.createElement(
      "button",
      {
        className: t,
        onClick: async () => {
          r("Recherche\u2026");
          let o = await nI();
          o && o !== yi
            ? (r("Installation de la version " + o + "\u2026"), Wy())
            : r(
                o
                  ? "Vous avez d\xE9j\xE0 la derni\xE8re version (" + yi + ")"
                  : "Impossible de v\xE9rifier : pas de connexion internet",
              );
        },
      },
      "Rechercher une mise \xE0 jour \xB7 v",
      yi,
    ),
    n &&
      $t.default.createElement(
        "div",
        { style: { fontSize: 11.5, color: "#5C6A62", textAlign: "center", marginTop: 7 } },
        n,
      ),
    n.startsWith("Vous avez") &&
      $t.default.createElement(
        "button",
        { className: t, style: { marginTop: 8 }, onClick: Wy },
        "Recharger quand m\xEAme",
      ),
  );
}
var I = On(Ln());
var U = On(Ln()),
  XP = [
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
  Re = (t) => (t && !t.magie && XP.includes(t.id) && t.ambiance !== !1 ? t.id : null),
  sI = "epicerie-raddonnaise-ambiance";
function aI(t, e) {
  try {
    let n = t?.magie ? "noel" : Re(t);
    if (!n) {
      localStorage.removeItem(sI);
      return;
    }
    localStorage.setItem(sI, JSON.stringify({ id: n, au: e || "" }));
  } catch {}
}
var Vr = {
    violet: "#2B1B3D",
    nuit: "#140B22",
    orange: "#E8731C",
    flamme: "#FFB547",
    vert: "#7FBF3F",
    os: "#F3E9D2",
  },
  lI = ({ taille: t = 30, style: e }) =>
    U.default.createElement(
      "svg",
      {
        className: "amb-chapeau",
        viewBox: "0 0 44 40",
        width: t,
        height: t * 0.9,
        style: e,
        "aria-hidden": "true",
      },
      U.default.createElement("path", {
        d: "M22 2c3 6 4 10 9 14 2 2 2 6 0 9H11c3-6 6-12 7-17 1-3 2-5 4-6z",
        fill: "#6E45A8",
      }),
      U.default.createElement("path", {
        d: "M22 2c3 6 4 10 9 14-3-2-6-3-9-3 0-4 0-8 0-11z",
        fill: "#8A62C4",
      }),
      U.default.createElement("path", { d: "M12 21h20l-1 5H13z", fill: Vr.orange }),
      U.default.createElement("rect", {
        x: "19.5",
        y: "20.5",
        width: "6",
        height: "6",
        rx: "1",
        fill: "none",
        stroke: Vr.flamme,
        strokeWidth: "1.6",
      }),
      U.default.createElement("ellipse", { cx: "22", cy: "28", rx: "20", ry: "5", fill: "#5A3690" }),
      U.default.createElement("ellipse", { cx: "22", cy: "27", rx: "18", ry: "3.4", fill: "#7650B2" }),
    ),
  ZP = ({ taille: t = 22, cls: e = "" }) =>
    U.default.createElement(
      "svg",
      {
        className: "amb-citrouille " + e,
        viewBox: "0 0 40 36",
        width: t,
        height: t * 0.9,
        "aria-hidden": "true",
      },
      U.default.createElement("path", { d: "M20 7c-2-4-1-6 1-7l2 1c-2 1-2 3-1 6z", fill: "#4E6B2A" }),
      U.default.createElement("ellipse", { cx: "12", cy: "21", rx: "10", ry: "12", fill: "#D9621A" }),
      U.default.createElement("ellipse", { cx: "28", cy: "21", rx: "10", ry: "12", fill: "#D9621A" }),
      U.default.createElement("ellipse", { cx: "20", cy: "21", rx: "10", ry: "13", fill: Vr.orange }),
      U.default.createElement(
        "g",
        { className: "amb-lueur", fill: "#FFD36B" },
        U.default.createElement("path", { d: "M11 17l5 0-2.5-4.5zM24 17l5 0-2.5-4.5z" }),
        U.default.createElement("path", { d: "M10 24c4 4 16 4 20 0l-3 1-2-2-2 2-3-2-3 2-2-2-2 2z" }),
      ),
    ),
  RP = ({ w: t = 34 }) =>
    U.default.createElement(
      "svg",
      { viewBox: "0 0 60 26", width: t, height: t * 0.43, "aria-hidden": "true" },
      U.default.createElement(
        "g",
        { fill: "#1A0F28" },
        U.default.createElement(
          "g",
          { className: "amb-aile g" },
          U.default.createElement("path", {
            d: "M30 12C24 2 14 0 2 6c6 1 8 4 8 7 4-2 8-1 10 2 3-2 6-2 10-3z",
          }),
        ),
        U.default.createElement(
          "g",
          { className: "amb-aile d" },
          U.default.createElement("path", {
            d: "M30 12C36 2 46 0 58 6c-6 1-8 4-8 7-4-2-8-1-10 2-3-2-6-2-10-3z",
          }),
        ),
        U.default.createElement("ellipse", { cx: "30", cy: "14", rx: "4", ry: "5.5" }),
        U.default.createElement("path", { d: "M27 9l1-4 2 3 2-3 1 4z" }),
      ),
      U.default.createElement("circle", { cx: "28.5", cy: "12.5", r: ".9", fill: Vr.flamme }),
      U.default.createElement("circle", { cx: "31.5", cy: "12.5", r: ".9", fill: Vr.flamme }),
    );
function uI({ n: t = 9, apercu: e }) {
  return U.default.createElement(
    "div",
    { className: "amb-guirl" + (e ? " apercu" : ""), "aria-hidden": "true" },
    U.default.createElement(
      "svg",
      { className: "amb-fil", viewBox: "0 0 300 24", preserveAspectRatio: "none" },
      U.default.createElement("path", {
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
        ? U.default.createElement(
            "span",
            {
              key: r,
              className: "amb-lanterne",
              style: { left: i + "%", animationDelay: (r % 5) * 0.37 + "s" },
            },
            U.default.createElement(ZP, { taille: 17 }),
          )
        : U.default.createElement("span", {
            key: r,
            className: "amb-fanion " + (r % 4 === 1 ? "o" : "v"),
            style: { left: i + "%" },
          });
    }),
  );
}
function Gy({ boucle: t = !0, apercu: e }) {
  return U.default.createElement(
    "div",
    { className: "amb-vol" + (t ? " boucle" : "") + (e ? " apercu" : ""), "aria-hidden": "true" },
    [
      [0, 0, 34],
      [38, -18, 26],
      [70, 10, 22],
    ].map(([n, r, i], o) =>
      U.default.createElement(
        "span",
        { key: o, style: { left: n + "px", top: r + "px", animationDelay: o * 0.13 + "s" } },
        U.default.createElement(RP, { w: i }),
      ),
    ),
  );
}
var eM = () =>
  U.default.createElement(
    "svg",
    { className: "amb-sorciere", viewBox: "0 0 120 60", width: "120", height: "60", "aria-hidden": "true" },
    U.default.createElement(
      "g",
      { fill: "#120A1E" },
      U.default.createElement("path", {
        d: "M4 40 L86 30",
        stroke: "#120A1E",
        strokeWidth: "3",
        strokeLinecap: "round",
      }),
      U.default.createElement("path", { d: "M86 30c6-2 14-8 22-6-6 2-6 5-2 8-7 0-14 2-20-2z" }),
      U.default.createElement("path", { d: "M42 34c2-10 8-16 14-16 6 0 9 6 8 12z" }),
      U.default.createElement("circle", { cx: "58", cy: "15", r: "5.5" }),
      U.default.createElement("path", { d: "M52 12c4-2 9-2 13 0-4-6-6-12-4-16-4 4-7 10-9 16z" }),
      U.default.createElement("path", {
        d: "M48 12h20",
        stroke: "#120A1E",
        strokeWidth: "2.4",
        strokeLinecap: "round",
      }),
      U.default.createElement("path", {
        d: "M60 30c4 4 10 6 16 5",
        stroke: "#120A1E",
        strokeWidth: "2.6",
        fill: "none",
        strokeLinecap: "round",
      }),
      U.default.createElement("path", { d: "M44 34c-6 4-10 8-16 8 4-4 6-8 10-10z" }),
    ),
    U.default.createElement("circle", {
      cx: "98",
      cy: "27",
      r: "1.6",
      fill: Vr.flamme,
      className: "amb-lueur",
    }),
  );
var tM = () =>
  U.default.createElement(
    "svg",
    {
      className: "amb-village",
      viewBox: "0 0 400 150",
      preserveAspectRatio: "xMidYMax slice",
      "aria-hidden": "true",
    },
    U.default.createElement("path", {
      d: "M0 98Q60 76 120 90t120-6 160 8V150H0z",
      fill: "#4A2F66",
      opacity: ".55",
    }),
    U.default.createElement(
      "g",
      { fill: "none", stroke: "#0A0512", strokeLinecap: "round", transform: "translate(-50 0)" },
      U.default.createElement("path", { d: "M318 112c2-20-4-34 2-52", strokeWidth: "7" }),
      U.default.createElement("path", {
        d: "M320 74c-10-6-16-16-30-16M290 58c-4-4-10-4-14 0M321 66c10-8 18-10 26-22M347 44c2-5 6-7 10-6M319 86c12-2 22 2 32-6",
        strokeWidth: "3",
      }),
    ),
    U.default.createElement("path", { d: "M0 112Q100 100 200 108t200-4V150H0z", fill: "#1C1029" }),
    U.default.createElement(
      "g",
      { stroke: "#2E1D47", strokeWidth: "2.4" },
      [112, 130, 148, 166, 184].map((t) => U.default.createElement("path", { key: t, d: `M${t} 112v-14` })),
      U.default.createElement("path", { d: "M108 102h80M108 108h80", strokeWidth: "1.6" }),
    ),
    U.default.createElement("path", { d: "M0 124Q120 114 220 121t180-6V150H0z", fill: "#120A1E" }),
    [
      [60, 116, 1],
      [126, 118, 1.1],
      [200, 116, 0.9],
      [238, 118, 1.3],
      [290, 116, 1],
      [340, 118, 1.2],
      [168, 120, 0.8],
    ].map(([t, e, n], r) =>
      U.default.createElement(
        "g",
        { key: "c" + r, transform: `translate(${t - 11 * n} ${e - 18 * n}) scale(${n})` },
        U.default.createElement("ellipse", { cx: "11", cy: "12", rx: "11", ry: "8.5", fill: Vr.orange }),
        U.default.createElement("path", {
          d: "M11 4v16M6 5q-3 7 0 15M16 5q3 7 0 15",
          stroke: "#C2410C",
          strokeWidth: ".7",
          fill: "none",
          opacity: ".6",
        }),
        U.default.createElement("path", {
          d: "M10 4c0-3 1-4 2-4",
          stroke: "#4E6B2A",
          strokeWidth: "2",
          fill: "none",
        }),
        r % 2 === 0 &&
          U.default.createElement(
            "g",
            { className: "amb-lueur", fill: "#FFD36B", style: { animationDelay: r * 0.5 + "s" } },
            U.default.createElement("path", {
              d: "M5 10h3.5l-1.75-3zM13.5 10H17l-1.75-3zM5 14c3 3 9 3 12 0l-2 .7-1.4-1.3-1.6 1.3-1.6-1.3-1.6 1.3-1.4-1.3z",
            }),
          ),
      ),
    ),
  );
function cI({ apercu: t }) {
  return U.default.createElement(
    "div",
    { className: "decor-magie amb-intro-h", "aria-hidden": "true" },
    U.default.createElement("div", { className: "amb-etoiles" }),
    U.default.createElement(
      "div",
      { className: "amb-lune" },
      U.default.createElement("span", { className: "amb-passe" }, U.default.createElement(eM, null)),
    ),
    U.default.createElement(Gy, { boucle: !1, apercu: !0 }),
    U.default.createElement(tM, null),
    U.default.createElement("div", { className: "amb-brume" }),
    U.default.createElement("div", { className: "amb-brume b2" }),
  );
}
var Hy = () =>
  U.default.createElement(
    "div",
    { className: "amb-araignee", "aria-hidden": "true" },
    U.default.createElement("i", null),
    U.default.createElement(
      "svg",
      { viewBox: "0 0 30 26", width: "22", height: "19" },
      U.default.createElement(
        "g",
        { stroke: "#1A0F28", strokeWidth: "1.5", fill: "none", strokeLinecap: "round" },
        U.default.createElement("path", {
          d: "M11 12C6 9 4 6 2 7M11 14C6 13 3 14 1 16M12 16C8 18 6 21 5 24M19 12c5-3 7-6 9-5M19 14c5-1 8 0 10 2M18 16c4 2 6 5 7 8",
        }),
      ),
      U.default.createElement("ellipse", { cx: "15", cy: "14", rx: "5.5", ry: "6", fill: "#1A0F28" }),
      U.default.createElement("circle", { cx: "15", cy: "7.5", r: "3.6", fill: "#1A0F28" }),
      U.default.createElement("circle", { cx: "13.7", cy: "7", r: ".9", fill: Vr.flamme }),
      U.default.createElement("circle", { cx: "16.3", cy: "7", r: ".9", fill: Vr.flamme }),
    ),
  );
function dI(t) {
  (0, U.useEffect)(() => {
    if (!t || typeof window > "u" || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let e = {
      halloween: ["#FF9A3C", "#B07CE0", "#FFD36B", "#7FBF3F"],
      octobrerose: ["#F06292", "#FFFFFF", "#F8BBD0", "#EC407A"],
      beaujolais: ["#9C3D6A", "#E08A2E", "#F2C14E", "#6E9B3A"],
      stnicolas: ["#D4AF37", "#FFFFFF", "#E8463A", "#B5652E"],
      nouvelan: ["#F4D774", "#FFFFFF", "#F48FB1", "#81D4FA"],
      galette: ["#F4D774", "#FFF3C4", "#E9C46A", "#C62828"],
      chandeleur: ["#F2CB7C", "#FFFFFF", "#E0A040", "#C62828"],
      valentin: ["#E0284A", "#F48FB1", "#FFFFFF", "#FFD6E0"],
      paques: ["#F6C6D9", "#BFE3F2", "#F9E79F", "#C8E6C9"],
      muguet: ["#FFFFFF", "#8BBF6A", "#EEF6E8", "#5E9A3E"],
      meres: ["#F48FB1", "#CE93D8", "#FFD54F", "#FFFFFF"],
      musique: ["#F2B134", "#E05A73", "#81D4FA", "#7A5AC8"],
      peres: ["#5B8FC7", "#F2D08A", "#FFFFFF", "#C27B42"],
      juillet: ["#1F3A93", "#FFFFFF", "#D7263D", "#F2B134"],
    }[t];
    if (!e) return;
    let n = (r) => {
      let i = document.createElement("div");
      ((i.className = "poudre amb-poudre"),
        (i.style.left = r.clientX + "px"),
        (i.style.top = r.clientY + "px"));
      for (let o = 0; o < 9; o++) {
        let s = document.createElement("i");
        (s.style.setProperty("--a", o * 40 + Math.random() * 20 + "deg"),
          s.style.setProperty("--d", 18 + Math.random() * 20 + "px"),
          (s.style.background = e[o % e.length]),
          (s.style.boxShadow = "0 0 6px " + e[o % e.length]),
          i.appendChild(s));
      }
      (document.body.appendChild(i), setTimeout(() => i.remove(), 900));
    };
    return (
      window.addEventListener("pointerdown", n, { passive: !0 }),
      () => window.removeEventListener("pointerdown", n)
    );
  }, [t]);
}
var nM = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%235E3F82' stroke-width='.9' opacity='.75'%3E%3Cpath d='M40 0L8 32M40 0L22 40M40 0L0 18M40 0v40M40 0H0'/%3E%3Cpath d='M28 0q2 6 12 12M16 0q4 12 24 24M6 0q6 20 34 34'/%3E%3C/g%3E%3C/svg%3E")`;
var hI = ({ taille: t = 18, c1: e = "#EC407A", c2: n = "#F06292", cls: r = "" }) =>
    U.default.createElement(
      "svg",
      { className: r, viewBox: "0 0 24 30", width: t, height: t * 1.25, "aria-hidden": "true" },
      U.default.createElement("path", {
        d: "M12 2c-3.4 0-5.5 2.4-5.5 5.4 0 3.4 2.2 6.8 5.5 11.6 3.3-4.8 5.5-8.2 5.5-11.6C17.5 4.4 15.4 2 12 2zm0 3c1.5 0 2.5 1 2.5 2.5 0 1.6-1 3.5-2.5 6-1.5-2.5-2.5-4.4-2.5-6C9.5 6 10.5 5 12 5z",
        fill: e,
      }),
      U.default.createElement("path", {
        d: "M10 17 3.5 27.5l3.7-.4 1.7 3.4 5.3-9.4zM14 17l6.5 10.5-3.7-.4-1.7 3.4-5.3-9.4z",
        fill: n,
      }),
    ),
  pI = ({ style: t }) =>
    U.default.createElement(
      "span",
      { className: "amb-ruban-logo", style: t },
      U.default.createElement(hI, { taille: 15 }),
    );
function fI({ n: t = 9, apercu: e }) {
  return U.default.createElement(
    "div",
    { className: "amb-guirl" + (e ? " apercu" : ""), "aria-hidden": "true" },
    U.default.createElement(
      "svg",
      { className: "amb-fil", viewBox: "0 0 300 24", preserveAspectRatio: "none" },
      U.default.createElement("path", {
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
        ? U.default.createElement(
            "span",
            {
              key: r,
              className: "amb-lanterne",
              style: { left: i + "%", animationDelay: (r % 5) * 0.37 + "s" },
            },
            U.default.createElement(hI, { taille: 13 }),
          )
        : U.default.createElement("span", { key: r, className: "amb-coeur", style: { left: i + "%" } });
    }),
  );
}
function Ky({ apercu: t }) {
  return U.default.createElement(
    "div",
    { className: "amb-ballons" + (t ? " apercu" : ""), "aria-hidden": "true" },
    [
      [12, 0, 34, "#EC407A"],
      [58, 1.2, 26, "#F48FB1"],
      [82, 0.5, 30, "#FFFFFF"],
      [34, 2, 22, "#F06292"],
    ].map(([e, n, r, i], o) =>
      U.default.createElement(
        "span",
        { key: o, style: { left: e + "%", animationDelay: n + "s" } },
        U.default.createElement(
          "svg",
          { viewBox: "0 0 30 50", width: r, height: r * 1.66 },
          U.default.createElement("path", {
            d: "M15 27C6 21 1 16 3.5 10 5.7 5.5 11 5.5 15 9.8 19 5.5 24.3 5.5 26.5 10 29 16 24 21 15 27z",
            fill: i,
            stroke: i === "#FFFFFF" ? "#F48FB1" : "none",
            strokeWidth: "1",
          }),
          U.default.createElement("path", {
            d: "M15 27c-1 6 2 10 0 16s2 6 0 7",
            stroke: "#C2185B",
            strokeWidth: ".9",
            fill: "none",
            opacity: ".6",
          }),
          U.default.createElement("ellipse", {
            cx: "10",
            cy: "12",
            rx: "2.4",
            ry: "3.4",
            fill: "#fff",
            opacity: ".45",
          }),
        ),
      ),
    ),
  );
}
var rM = () =>
  U.default.createElement(
    "svg",
    {
      className: "amb-village",
      viewBox: "0 0 400 150",
      preserveAspectRatio: "xMidYMax slice",
      "aria-hidden": "true",
    },
    U.default.createElement("path", {
      d: "M0 98Q60 76 120 90t120-6 160 8V150H0z",
      fill: "#F3B3CB",
      opacity: ".6",
    }),
    U.default.createElement("path", { d: "M0 110Q100 98 200 106t200-4V150H0z", fill: "#C2507F" }),
    U.default.createElement(
      "g",
      { transform: "translate(184 52)" },
      U.default.createElement("path", {
        d: "M16 0C9 0 5 5 5 11c0 7 5 14 11 24 6-10 11-17 11-24C27 5 23 0 16 0zm0 6c3 0 5 2 5 5 0 3-2 7-5 12-3-5-5-9-5-12 0-3 2-5 5-5z",
        fill: "#EC407A",
      }),
      U.default.createElement("path", {
        d: "M12 33 2 54l7-1 3 7 10-19zM20 33l10 21-7-1-3 7-10-19z",
        fill: "#F06292",
      }),
    ),
    U.default.createElement("path", { d: "M0 124Q120 114 220 121t180-6V150H0z", fill: "#8E1E50" }),
    Array.from({ length: 22 }, (t, e) => {
      let n = 8 + e * 18 + (e % 3) * 4,
        r = 104 + (e % 4) * 4,
        i = ["#FFE3EE", "#F48FB1", "#FFFFFF", "#F8BBD0"][e % 4];
      return U.default.createElement(
        "g",
        { key: e },
        U.default.createElement("path", { d: `M${n} ${r + 8}v-8`, stroke: "#5E7A2E", strokeWidth: "1" }),
        [0, 72, 144, 216, 288].map((o) =>
          U.default.createElement("circle", {
            key: o,
            cx: n + 2.6 * Math.cos((o * Math.PI) / 180),
            cy: r + 2.6 * Math.sin((o * Math.PI) / 180),
            r: "2",
            fill: i,
          }),
        ),
        U.default.createElement("circle", { cx: n, cy: r, r: "1.3", fill: "#F2C14E" }),
      );
    }),
  );
function mI() {
  return U.default.createElement(
    "div",
    { className: "decor-magie amb-intro-r", "aria-hidden": "true" },
    U.default.createElement("div", { className: "amb-aurore" }),
    U.default.createElement("div", { className: "amb-bokeh-r" }),
    U.default.createElement(Ky, { apercu: !0 }),
    U.default.createElement(rM, null),
  );
}
