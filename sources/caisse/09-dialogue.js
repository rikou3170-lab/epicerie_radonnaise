/* ═══════════════════════════════════════════════════════════════════════
 *  BOÎTES DE DIALOGUE — remplacent les alert()/confirm() du navigateur par des fenêtres aux couleurs de l'épicerie.
 * ═══════════════════════════════════════════════════════════════════════ */

// Fenêtres de dialogue : file d'attente des questions et raccourci.
var Wt = vn(Pn()),
  AC = vn(zf()),
  go = [],
  gE = null,
  D_ = (t) =>
    new Promise((e) => {
      (go = [...go, { ...t, res: e, id: Math.random() }]), gE?.(go);
    });

// Fenêtres de dialogue : file d'attente des questions, raccourcis attendre()/demander() et feuille de style.
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
      { annuler: "Oui, annuler", afficher: "Afficher", "se déconnecter": "Se déconnecter" }[n] ||
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

// Affiche la question en cours (Entrée = oui, Échap = non).
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

// Monte le composant Dialogue une fois pour toute la page.
if (typeof document < "u") {
  let t = document.createElement("div");
  (t.id = "dialogues"),
    (document.body || document.documentElement).appendChild(t),
    (0, AC.createRoot)(t).render(Wt.default.createElement(Dialogue, null));
}
