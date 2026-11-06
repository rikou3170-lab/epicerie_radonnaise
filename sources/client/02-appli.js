var Zt = On(Ln()),
  H_ = On(c0()),
  fo = [],
  d0 = null,
  K_ = (t) =>
    new Promise((e) => {
      ((fo = [...fo, { ...t, res: e, id: Math.random() }]), d0?.(fo));
    }),
  h0 = (t) => K_({ texte: t, seul: !0 }),
  p0 = (t, e = {}) => K_({ texte: t, ...e }),
  NS = /^(supprimer|effacer|annuler|retirer|vider)/i,
  FS = (t) => {
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
  DS = `
.dlg-fond{position:fixed;inset:0;z-index:1000;background:rgba(20,32,26,.55);display:flex;align-items:center;justify-content:center;padding:20px;animation:dlgIn .15s ease}
.dlg{background:#FFFFFF;border-radius:20px;max-width:400px;width:100%;padding:22px 20px 18px;box-shadow:0 18px 50px rgba(0,0,0,.25);font-family:'Nunito',system-ui,sans-serif;color:#22302A}
.dlg-t{font-size:15.5px;font-weight:700;line-height:1.5;white-space:pre-line;word-break:break-word;user-select:text;-webkit-user-select:text;margin:0 0 18px}
.dlg-b{display:flex;gap:10px}
.dlg-b button{flex:1;min-height:46px;border-radius:12px;font-family:inherit;font-size:15px;font-weight:800;cursor:pointer;border:1.5px solid #E6E0D2;background:#FFFFFF;color:#22302A}
.dlg-b button.ok{background:#1C433B;border-color:#1C433B;color:#FFFFFF}
.dlg-b button.ok.danger{background:#B2563F;border-color:#B2563F}
@keyframes dlgIn{from{opacity:0}to{opacity:1}}
`;
function PS() {
  let [t, e] = (0, Zt.useState)(fo);
  (0, Zt.useEffect)(
    () => (
      (d0 = e),
      () => {
        d0 = null;
      }
    ),
    [],
  );
  let n = t[0];
  if (
    ((0, Zt.useEffect)(() => {
      if (!n) return;
      let o = (s) => {
        (s.key === "Escape" && r(!1), s.key === "Enter" && r(!0));
      };
      return (window.addEventListener("keydown", o), () => window.removeEventListener("keydown", o));
    }, [n?.id]),
    !n)
  )
    return null;
  function r(o) {
    (n.res(n.seul ? void 0 : o), (fo = fo.filter((s) => s.id !== n.id)), e(fo));
  }
  let i = n.danger ?? NS.test(n.texte.trim());
  return Zt.default.createElement(
    "div",
    { className: "dlg-fond", onClick: () => r(!1) },
    Zt.default.createElement("style", null, DS),
    Zt.default.createElement(
      "div",
      { className: "dlg", role: "alertdialog", "aria-modal": "true", onClick: (o) => o.stopPropagation() },
      Zt.default.createElement("p", { className: "dlg-t" }, n.texte),
      Zt.default.createElement(
        "div",
        { className: "dlg-b" },
        !n.seul && Zt.default.createElement("button", { onClick: () => r(!1) }, n.non || "Non, retour"),
        Zt.default.createElement(
          "button",
          { className: "ok" + (i && !n.seul ? " danger" : ""), autoFocus: !0, onClick: () => r(!0) },
          n.seul ? "OK" : n.oui || FS(n.texte),
        ),
      ),
    ),
  );
}
if (typeof document < "u") {
  let t = document.createElement("div");
  ((t.id = "dialogues"),
    (document.body || document.documentElement).appendChild(t),
    (0, H_.createRoot)(t).render(Zt.default.createElement(PS, null)));
}
