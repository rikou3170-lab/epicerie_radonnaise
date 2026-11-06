qP({
  loadJS(t) {
    return new Promise((e, n) => {
      let r = document.createElement("script");
      r.setAttribute("src", t),
        (r.onload = e),
        (r.onerror = (i) => {
          let s = gr("internal-error");
          (s.customData = i), n(s);
        }),
        (r.type = "text/javascript"),
        (r.charset = "UTF-8"),
        I8().appendChild(r);
    });
  },
  gapiScript: "https://apis.google.com/js/api.js",
  recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
  recaptchaEnterpriseScript: "https://www.google.com/recaptcha/enterprise.js?render=",
});
x8("Browser");
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
  CONFIG_REF = doc2(db2, "shop", "config"),
  ALPHA = "ABCDEFGHJKMNPQRSTUVWXYZ23456789",
  ak = () => {
    let t = "",
      e = new Uint32Array(5);
    return (
      crypto.getRandomValues(e),
      e.forEach((n) => {
        t += ALPHA[n % ALPHA.length];
      }),
      "RAD-" + t
    );
  };
var VERSION = "2.37";
var un = en(hn()),
  lk = en(A0()),
  Js = [],
  i2 = null,
  uk = (t) =>
    new Promise((e) => {
      (Js = [...Js, { ...t, res: e, id: Math.random() }]), i2?.(Js);
    }),
  ft = (t) => uk({ texte: t, seul: !0 }),
  De = (t, e = {}) => uk({ texte: t, ...e }),
  C8 = /^(supprimer|effacer|annuler|retirer|vider)/i,
  S8 = (t) => {
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
  let [t, e] = (0, un.useState)(Js);
  (0, un.useEffect)(
    () => (
      (i2 = e),
      () => {
        i2 = null;
      }
    ),
    [],
  );
  let n = t[0];
  if (
    ((0, un.useEffect)(() => {
      if (!n) return;
      let s = (o) => {
        o.key === "Escape" && r(!1), o.key === "Enter" && r(!0);
      };
      return window.addEventListener("keydown", s), () => window.removeEventListener("keydown", s);
    }, [n?.id]),
    !n)
  )
    return null;
  function r(s) {
    n.res(n.seul ? void 0 : s), (Js = Js.filter((o) => o.id !== n.id)), e(Js);
  }
  let i = n.danger ?? C8.test(n.texte.trim());
  return un.default.createElement(
    "div",
    { className: "dlg-fond", onClick: () => r(!1) },
    un.default.createElement("style", null, CSS_DIALOGUE),
    un.default.createElement(
      "div",
      { className: "dlg", role: "alertdialog", "aria-modal": "true", onClick: (s) => s.stopPropagation() },
      un.default.createElement("p", { className: "dlg-t" }, n.texte),
      un.default.createElement(
        "div",
        { className: "dlg-b" },
        !n.seul && un.default.createElement("button", { onClick: () => r(!1) }, n.non || "Non, retour"),
        un.default.createElement(
          "button",
          { className: "ok" + (i && !n.seul ? " danger" : ""), autoFocus: !0, onClick: () => r(!0) },
          n.seul ? "OK" : n.oui || S8(n.texte),
        ),
      ),
    ),
  );
}
if (typeof document < "u") {
  let t = document.createElement("div");
  (t.id = "dialogues"),
    (document.body || document.documentElement).appendChild(t),
    (0, lk.createRoot)(t).render(un.default.createElement(Dialogue, null));
}
var Hu = (t = new Date()) => t.toLocaleDateString("sv-SE");
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
function ck(t) {
  try {
    let e = "epicerie-raddonnaise-cnx-" + t;
    if (sessionStorage.getItem(e)) return;
    sessionStorage.setItem(e, "1");
  } catch {}
  addDoc(collection(db2, "connexions"), { date: Date.now(), app: t, appareil: typeAppareil() }).catch(
    () => {},
  );
}
