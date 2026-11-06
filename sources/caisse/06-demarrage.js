/* ═══════════════════════════════════════════════════════════════════════
 *  DÉMARRAGE DE FIREBASE — réglages internes chargés au lancement (chargement de scripts Google, type de plateforme).
 * ═══════════════════════════════════════════════════════════════════════ */

// Interne Firebase : chargement des scripts Google à la demande.
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

// Interne Firebase : type de plateforme.
g_("Browser");
