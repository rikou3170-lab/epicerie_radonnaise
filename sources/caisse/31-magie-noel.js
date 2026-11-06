/* ═══════════════════════════════════════════════════════════════════════
 *  MAGIE DE NOËL sur la caisse (décor).
 * ═══════════════════════════════════════════════════════════════════════ */

// Enveloppe de la caisse : décor du thème (magie de Noël) autour de l'écran.
function MagieCaisse() {
  let [t, e] = (0, React.useState)(void 0);
  (0, React.useEffect)(() => onAuthStateChanged(auth, (o) => e(o || null)), []),
    (0, React.useEffect)(() => {
      t && vC("caisse");
    }, [!!t]);
  let [n, r] = (0, React.useState)(null);
  (0, React.useEffect)(
    () =>
      onSnapshot(
        CONFIG_REF,
        (o) => r((o.exists() && o.data().themes) || null),
        () => {},
      ),
    [],
  );
  let i = (0, React.useMemo)(() => KC(n), [n]);
  return React.default.createElement(
    "div",
    {
      className: "cs" + (i?.magie ? " magie" : "") + (gn(i) ? " " + gn(i) : ""),
      style: i ? { "--top": i.top } : void 0,
    },
    React.default.createElement("style", null, ZC + CSS_CAISSE),
    i?.anim && React.default.createElement(Particules, { theme: { ...i, nb: Math.min(i.nb || 16, 10) } }),
    i?.magie && i.anim && React.default.createElement(Neige, { nb: 20 }),
    React.default.createElement(
      "div",
      { className: "tourner", role: "alert" },
      React.default.createElement("div", { className: "ic" }, "📱"),
      React.default.createElement("b", null, "Tournez l'iPad en paysage"),
      React.default.createElement("span", null, "La caisse s'utilise à l'horizontale."),
    ),
    React.default.createElement(
      "header",
      { className: "cs-top" },
      React.default.createElement("img", { src: LOGO, alt: "" }),
      i?.magie &&
        React.default.createElement(SvgBonnet, {
          taille: 28,
          style: { left: 26, top: "calc(env(safe-area-inset-top) + 0px)" },
        }),
      IE.includes(gn(i)) &&
        React.default.createElement(UC, {
          id: gn(i),
          decal: { marginTop: "env(safe-area-inset-top)", marginLeft: -4 },
        }),
      gn(i) === "octobrerose" &&
        React.default.createElement(PC, {
          style: { left: 38, top: "calc(env(safe-area-inset-top) + 26px)" },
        }),
      gn(i) === "halloween" &&
        React.default.createElement(SvgChapeauSorciere, {
          taille: 30,
          style: { left: 22, top: "calc(env(safe-area-inset-top) - 3px)" },
        }),
      React.default.createElement(
        "div",
        null,
        React.default.createElement("h1", null, "Caisse"),
        React.default.createElement(
          "small",
          null,
          "Épicerie Raddonnaise ",
          React.default.createElement("span", { className: "vers" }, "v", VERSION),
        ),
      ),
      t &&
        React.default.createElement(
          "button",
          { onClick: async () => (await CC("Se déconnecter de la caisse ?")) && signOut(auth) },
          "Déconnexion",
        ),
    ),
    i &&
      (i.magie
        ? React.default.createElement(GuirlandeNoel, { n: 24 })
        : gn(i) === "halloween"
          ? React.default.createElement(bC, { n: 16 })
          : gn(i) === "octobrerose"
            ? React.default.createElement(NC, { n: 16 })
            : IE.includes(gn(i))
              ? React.default.createElement(RC, { id: gn(i), n: 16 })
              : React.default.createElement("div", {
                  className: "frise-theme",
                  style: { background: i.frise },
                })),
    t === void 0
      ? React.default.createElement(
          "div",
          { className: "cs-main" },
          React.default.createElement(
            "div",
            { className: "sous", style: { marginTop: "30vh" } },
            "Chargement…",
          ),
        )
      : t
        ? React.default.createElement(Caisse, { user: t })
        : React.default.createElement(Connexion, null),
  );
}
"serviceWorker" in navigator && navigator.serviceWorker.register("sw.js").catch(() => {});

// Lance la caisse dans la page.
(0, ReactDOMClient.createRoot)(document.getElementById("root")).render(
  React.default.createElement(MagieCaisse, null),
);
