/* ═══════════════════════════════════════════════════════════════════════
 *  INSTALLATION SUR L'ÉCRAN D'ACCUEIL — détection du téléphone, assistant d'installation, avis différés.
 * ═══════════════════════════════════════════════════════════════════════ */

// Chaque navigateur a sa méthode : on détecte le téléphone et on n'affiche
// que les étapes qui le concernent.
// Mémoire : proposition d'installation masquée.
var INSTALL_KEY = "epicerie-raddonnaise-install-masque";

// Détecte le téléphone et le navigateur (iPhone, Android, Facebook, Instagram…).
function plateforme() {
  let t = navigator.userAgent || "",
    e = /iPhone|iPad|iPod/i.test(t) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    n = /Android/i.test(t),
    r =
      /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Messenger|Snapchat|TikTok|musical_ly|LinkedInApp|Line\/|; wv\)/i.test(
        t,
      ),
    i = /Instagram/i.test(t)
      ? "Instagram"
      : /Messenger|Orca/i.test(t)
        ? "Messenger"
        : /FBAN|FBAV|FB_IAB|FBIOS/i.test(t)
          ? "Facebook"
          : "cette application",
    o = /SamsungBrowser/i.test(t),
    s = /Firefox|FxiOS/i.test(t),
    l = /CriOS/i.test(t),
    u = e && /FxiOS|EdgiOS|OPiOS|GSA\//i.test(t),
    d = e || n;
  return {
    ipad: /iPad/i.test(t) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    ios: e,
    android: n,
    inApp: r,
    appli: i,
    samsung: o,
    firefox: s,
    chromeIOS: l,
    autreIOS: u,
    mobile: d,
  };
}

// État de l'installation (installée ou non, bouton d'installation disponible).
function useInstall() {
  let t = (0, React.useMemo)(plateforme, []),
    [evt, setEvt] = (0, React.useState)(null),
    [ouvert, setOuvert] = (0, React.useState)(!1),
    [masque, setMasque] = (0, React.useState)(() => {
      try {
        return localStorage.getItem(INSTALL_KEY) === "1";
      } catch {
        return !1;
      }
    }),
    [installee, setInstallee] = (0, React.useState)(
      () => window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === !0,
    );
  (0, React.useEffect)(() => {
    let h = (m) => {
        m.preventDefault(), setEvt(m);
      },
      f = () => {
        setEvt(null), setInstallee(!0), setOuvert(!1);
      };
    return (
      window.addEventListener("beforeinstallprompt", h),
      window.addEventListener("appinstalled", f),
      () => {
        window.removeEventListener("beforeinstallprompt", h), window.removeEventListener("appinstalled", f);
      }
    );
  }, []);
  let d = async () => {
    if (evt) {
      evt.prompt();
      try {
        await evt.userChoice;
      } catch {}
      setEvt(null);
    }
  };
  return {
    p: t,
    evt,
    installee,
    ouvert,
    possible: !installee,
    bandeau: !installee && !masque,
    lancer: () => {
      evt && !t.inApp ? d() : setOuvert(!0);
    },
    direct: d,
    fermerAssistant: () => setOuvert(!1),
    fermer: () => {
      setMasque(!0);
      try {
        localStorage.setItem(INSTALL_KEY, "1");
      } catch {}
    },
  };
}

// Petites icônes qui ressemblent aux vrais boutons des navigateurs
// Icônes de l'assistant d'installation.
var IcPartage = () =>
    React.default.createElement(
      "svg",
      {
        width: "17",
        height: "17",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: { verticalAlign: "-3px" },
      },
      React.default.createElement("path", { d: "M12 3v12M8 7l4-4 4 4" }),
      React.default.createElement("path", { d: "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" }),
    ),
  IcPoints = ({ v }) =>
    React.default.createElement(
      "svg",
      {
        width: "17",
        height: "17",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        style: { verticalAlign: "-3px" },
      },
      v
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("circle", { cx: "12", cy: "5", r: "2" }),
            React.default.createElement("circle", { cx: "12", cy: "12", r: "2" }),
            React.default.createElement("circle", { cx: "12", cy: "19", r: "2" }),
          )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("circle", { cx: "5", cy: "12", r: "2" }),
            React.default.createElement("circle", { cx: "12", cy: "12", r: "2" }),
            React.default.createElement("circle", { cx: "19", cy: "12", r: "2" }),
          ),
    ),
  IcMenu = () =>
    React.default.createElement(
      "svg",
      {
        width: "17",
        height: "17",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.2",
        strokeLinecap: "round",
        style: { verticalAlign: "-3px" },
      },
      React.default.createElement("path", { d: "M4 7h16M4 12h16M4 17h16" }),
    ),
  IcPlus = () =>
    React.default.createElement(
      "svg",
      {
        width: "17",
        height: "17",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        style: { verticalAlign: "-3px" },
      },
      React.default.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "4" }),
      React.default.createElement("path", { d: "M12 8v8M8 12h8" }),
    ),
  Fn = ({ children }) => React.default.createElement("span", { className: "bt" }, children);

// Assistant pas à pas pour installer l'appli (selon le téléphone et le navigateur).
function AssistantInstall({ inst }) {
  let { p: e } = inst,
    [msg, setMsg] = (0, React.useState)(""),
    i = location.origin + location.pathname,
    o = async () => {
      try {
        await navigator.clipboard.writeText(i),
          setMsg("Lien copié ✓ — collez-le dans " + (e.ios ? "Safari" : "Chrome"));
      } catch {
        setMsg("Appuyez longuement sur le lien ci-dessous pour le copier");
      }
    },
    s = "Installer l'application",
    l = [],
    u = null,
    d = null;
  return (
    e.inApp
      ? ((s = "Ouvrez d'abord dans votre navigateur"),
        (l = [
          React.default.createElement(
            React.default.Fragment,
            null,
            "Vous êtes dans ",
            React.default.createElement("b", null, e.appli),
            " : l'installation n'y est pas possible.",
          ),
          React.default.createElement(
            React.default.Fragment,
            null,
            "Touchez ",
            React.default.createElement(Fn, null, React.default.createElement(IcPoints, null)),
            " en haut à droite, puis ",
            React.default.createElement(
              "b",
              null,
              "« Ouvrir dans ",
              e.ios ? "Safari" : "le navigateur",
              " »",
            ),
            ".",
          ),
          React.default.createElement(
            React.default.Fragment,
            null,
            "Une fois la page ouverte, touchez à nouveau ",
            React.default.createElement("b", null, "Installer l'application"),
            ".",
          ),
        ]),
        (u = React.default.createElement(
          React.default.Fragment,
          null,
          e.android &&
            React.default.createElement(
              "a",
              {
                className: "btn",
                style: { display: "block", textAlign: "center", textDecoration: "none", marginBottom: 8 },
                href:
                  "intent://" +
                  location.host +
                  location.pathname +
                  "#Intent;scheme=https;package=com.android.chrome;end",
              },
              "Ouvrir dans Chrome",
            ),
          React.default.createElement("button", { className: "btn gh", onClick: o }, "Copier le lien"),
        )))
      : inst.evt
        ? ((s = "Installer en un clic"),
          (l = [
            React.default.createElement(
              React.default.Fragment,
              null,
              "Touchez le bouton ci-dessous, puis confirmez ",
              React.default.createElement("b", null, "« Installer »"),
              ".",
            ),
          ]),
          (u = React.default.createElement(
            "button",
            { className: "btn", onClick: inst.direct },
            "Installer maintenant",
          )))
        : e.ios && !e.chromeIOS && !e.autreIOS
          ? ((l = [
              React.default.createElement(
                React.default.Fragment,
                null,
                "Touchez ",
                React.default.createElement(
                  Fn,
                  null,
                  React.default.createElement(IcPartage, null),
                  " Partager",
                ),
                " ",
                e.ipad ? "en haut de l'écran" : "en bas de l'écran",
                ".",
                React.default.createElement("br", null),
                React.default.createElement(
                  "span",
                  { className: "pt2" },
                  "Sur les iPhone récents, il est dans le menu ",
                  React.default.createElement(Fn, null, React.default.createElement(IcPoints, null)),
                  " en bas à droite.",
                ),
              ),
              React.default.createElement(
                React.default.Fragment,
                null,
                "Faites défiler et touchez ",
                React.default.createElement(
                  Fn,
                  null,
                  React.default.createElement(IcPlus, null),
                  " Sur l'écran d'accueil",
                ),
                ".",
              ),
              React.default.createElement(
                React.default.Fragment,
                null,
                "Touchez ",
                React.default.createElement("b", null, "Ajouter"),
                " en haut à droite. C'est fait !",
              ),
            ]),
            (d = "bas"))
          : e.chromeIOS
            ? ((l = [
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "Touchez ",
                  React.default.createElement(Fn, null, React.default.createElement(IcPartage, null)),
                  " en haut à droite, dans la barre d'adresse.",
                ),
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "Choisissez ",
                  React.default.createElement(
                    Fn,
                    null,
                    React.default.createElement(IcPlus, null),
                    " Ajouter à l'écran d'accueil",
                  ),
                  ".",
                ),
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "Touchez ",
                  React.default.createElement("b", null, "Ajouter"),
                  ".",
                ),
              ]),
              (u = React.default.createElement(
                "div",
                { className: "pt2", style: { textAlign: "center" } },
                "L'option n'apparaît pas ? Ouvrez le lien dans ",
                React.default.createElement("b", null, "Safari"),
                " :",
                React.default.createElement(
                  "button",
                  { className: "btn gh", style: { marginTop: 8 }, onClick: o },
                  "Copier le lien",
                ),
              )))
            : e.ios
              ? ((l = [
                  React.default.createElement(
                    React.default.Fragment,
                    null,
                    "Sur iPhone, l'installation se fait depuis ",
                    React.default.createElement("b", null, "Safari"),
                    ".",
                  ),
                  React.default.createElement(
                    React.default.Fragment,
                    null,
                    "Copiez le lien, ouvrez ",
                    React.default.createElement("b", null, "Safari"),
                    " et collez-le dans la barre d'adresse.",
                  ),
                  React.default.createElement(
                    React.default.Fragment,
                    null,
                    "Touchez ensuite ",
                    React.default.createElement("b", null, "Installer l'application"),
                    ".",
                  ),
                ]),
                (u = React.default.createElement(
                  "button",
                  { className: "btn", onClick: o },
                  "Copier le lien",
                )))
              : e.samsung
                ? ((l = [
                    React.default.createElement(
                      React.default.Fragment,
                      null,
                      "Touchez ",
                      React.default.createElement(Fn, null, React.default.createElement(IcMenu, null)),
                      " en bas à droite.",
                    ),
                    React.default.createElement(
                      React.default.Fragment,
                      null,
                      "Touchez ",
                      React.default.createElement(Fn, null, "Ajouter page à"),
                      " puis ",
                      React.default.createElement("b", null, "« Écran d'accueil »"),
                      ".",
                    ),
                    React.default.createElement(
                      React.default.Fragment,
                      null,
                      "Confirmez avec ",
                      React.default.createElement("b", null, "Ajouter"),
                      ".",
                    ),
                  ]),
                  (d = "basdroite"))
                : e.firefox
                  ? (l = [
                      React.default.createElement(
                        React.default.Fragment,
                        null,
                        "Touchez ",
                        React.default.createElement(
                          Fn,
                          null,
                          React.default.createElement(IcPoints, { v: !0 }),
                        ),
                        " (menu du navigateur).",
                      ),
                      React.default.createElement(
                        React.default.Fragment,
                        null,
                        "Touchez ",
                        React.default.createElement(Fn, null, "Installer"),
                        " ou ",
                        React.default.createElement("b", null, "« Ajouter à l'écran d'accueil »"),
                        ".",
                      ),
                      React.default.createElement(React.default.Fragment, null, "Confirmez."),
                    ])
                  : e.android
                    ? ((l = [
                        React.default.createElement(
                          React.default.Fragment,
                          null,
                          "Touchez ",
                          React.default.createElement(
                            Fn,
                            null,
                            React.default.createElement(IcPoints, { v: !0 }),
                          ),
                          " en haut à droite.",
                        ),
                        React.default.createElement(
                          React.default.Fragment,
                          null,
                          "Touchez ",
                          React.default.createElement(Fn, null, "Installer l'application"),
                          " ou ",
                          React.default.createElement("b", null, "« Ajouter à l'écran d'accueil »"),
                          ".",
                        ),
                        React.default.createElement(
                          React.default.Fragment,
                          null,
                          "Confirmez avec ",
                          React.default.createElement("b", null, "Installer"),
                          ".",
                        ),
                      ]),
                      (d = "hautdroite"))
                    : ((s = "Installez-la sur votre téléphone"),
                      (l = [
                        React.default.createElement(
                          React.default.Fragment,
                          null,
                          "Scannez ce code avec l'appareil photo de votre téléphone pour ouvrir l'application, puis touchez ",
                          React.default.createElement("b", null, "Installer l'application"),
                          ".",
                        ),
                      ]),
                      (u = React.default.createElement(
                        "div",
                        { style: { textAlign: "center" } },
                        React.default.createElement(QR, {
                          texte: i,
                          taille: 170,
                          style: { display: "inline-block" },
                        }),
                      ))),
    React.default.createElement(
      "div",
      { className: "sheet-bg", onClick: inst.fermerAssistant },
      d && React.default.createElement("div", { className: "fleche " + d }, "↓"),
      React.default.createElement(
        "div",
        {
          className: "sheet" + (d && d.startsWith("bas") ? " avec-fleche" : ""),
          onClick: (h) => h.stopPropagation(),
        },
        React.default.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 } },
          React.default.createElement("img", {
            src: LOGO,
            alt: "",
            style: { width: 48, height: 48, borderRadius: 12 },
          }),
          React.default.createElement(
            "div",
            {
              style: {
                flex: 1,
                fontFamily: "var(--script)",
                fontSize: 27,
                color: "var(--forest)",
                lineHeight: 1.05,
              },
            },
            s,
          ),
          React.default.createElement(
            "button",
            { className: "ix", "aria-label": "Fermer", onClick: inst.fermerAssistant },
            "×",
          ),
        ),
        React.default.createElement(
          "ol",
          { className: "etapes" },
          l.map((h, f) =>
            React.default.createElement(
              "li",
              { key: f },
              React.default.createElement("span", { className: "num" }, f + 1),
              React.default.createElement("div", null, h),
            ),
          ),
        ),
        u && React.default.createElement("div", { style: { marginTop: 14 } }, u),
        msg &&
          React.default.createElement(
            "div",
            {
              className: "pt2",
              style: { textAlign: "center", marginTop: 10, color: "var(--apple)", fontWeight: 800 },
            },
            msg,
          ),
        (e.inApp || e.ios) &&
          msg &&
          React.default.createElement(
            "div",
            {
              style: {
                marginTop: 8,
                padding: "9px 11px",
                background: "var(--bg)",
                borderRadius: 10,
                fontSize: 12.5,
                wordBreak: "break-all",
                userSelect: "all",
                WebkitUserSelect: "all",
              },
            },
            i,
          ),
        React.default.createElement(
          "div",
          { className: "pt2", style: { textAlign: "center", marginTop: 14 } },
          "Facultatif : sans installation, votre carte reste mémorisée sur ce téléphone.",
        ),
      ),
    )
  );
}

// Encart « Installer » (accueil, fidélité, infos)
// Bouton « Installer l'appli ».
function Installer({ inst, compact, texte }) {
  return inst.possible
    ? React.default.createElement(
        "div",
        { className: "inst" },
        React.default.createElement("img", { src: LOGO, alt: "" }),
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("div", { className: "it" }, "Installer l'application"),
          React.default.createElement(
            "div",
            { className: "id" },
            texte || "Retrouvez l'épicerie et votre carte d'un geste.",
          ),
        ),
        React.default.createElement("button", { className: "ib2", onClick: inst.lancer }, "Installer"),
        !compact &&
          React.default.createElement(
            "button",
            { className: "ix", "aria-label": "Fermer", onClick: inst.fermer },
            "×",
          ),
      )
    : null;
}

// Proposée une seule fois, juste après la création de la carte
function ProposeInstall({ inst, onClose }) {
  return React.default.createElement(
    "div",
    { className: "sheet-bg", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "sheet", onClick: (n) => n.stopPropagation(), style: { textAlign: "center" } },
      React.default.createElement("img", {
        src: LOGO,
        alt: "",
        style: { width: 70, height: 70, borderRadius: 18, marginBottom: 10 },
      }),
      React.default.createElement(
        "div",
        { style: { fontFamily: "var(--script)", fontSize: 31, color: "var(--forest)", lineHeight: 1 } },
        "Votre carte est prête !",
      ),
      React.default.createElement(
        "p",
        { style: { fontSize: 13.5, color: "var(--ink2)", lineHeight: 1.5, margin: "10px 0 16px" } },
        "Gardez-la à portée de main : installez l'application sur votre écran d'accueil et retrouvez votre carte d'un simple geste.",
      ),
      React.default.createElement(
        "button",
        {
          className: "btn",
          onClick: () => {
            onClose(), inst.lancer();
          },
        },
        "Installer l'application",
      ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { marginTop: 8 }, onClick: onClose },
        "Plus tard",
      ),
    ),
  );
}

// Avis à l'épicerie mis en attente : envoi avec délai, liste gardée sur le téléphone.
var sx = (t, e = 12e3) =>
    new Promise((n) => {
      let r = setTimeout(() => n("lent"), e);
      t.then(
        () => {
          clearTimeout(r), n("ok");
        },
        () => {
          clearTimeout(r), n("erreur");
        },
      );
    }),
  gT = "epicerie-raddonnaise-a-prevenir",
  ax = () => {
    try {
      let t = JSON.parse(localStorage.getItem(gT) || "[]");
      return Array.isArray(t) ? t : [];
    } catch {
      return [];
    }
  },
  lx = (t) => {
    try {
      localStorage.setItem(gT, JSON.stringify(t.slice(-20)));
    } catch {}
  },
  ux = (t, e) => lx([...ax().filter((n) => n.id !== e), { type: t, id: e, cree: Date.now() }]),
  Cf = (t) => lx(ax().filter((e) => e.id !== t));

// Prévient l'épicerie (e-mail / notification) d'une commande, d'une réservation ou d'un message.
async function ns(t, e, n) {
  Cf(n),
    e === "cmd"
      ? await envoyerMail(t, n)
      : e === "resa"
        ? await avertirResa(t, n)
        : await avertirMessage(t, n);
}

// Renvoie les avis restés en attente (moins de 24 h) une fois la connexion revenue.
function xO(t) {
  let e = ax().filter((n) => Date.now() - (n.cree || 0) < 864e5);
  lx(e),
    !(!e.length || !g2(Nn(t).script)) &&
      waitForPendingWrites(db)
        .then(() => e.forEach((n) => ns(t, n.type, n.id)))
        .catch(() => {});
}

// Horaires du jour lus dans le texte des horaires (« 8h30-12h30 »).
var W2 = (t, e) => {
    let n = (t || [])[(e.getDay() + 6) % 7];
    if (!n) return [];
    let r = /(\d{1,2})\s*[h:]\s*(\d{0,2})\s*[-–]\s*(\d{1,2})\s*[h:]\s*(\d{0,2})/g,
      i = [],
      o,
      s = [n.am, n.pm].filter(Boolean).join(" ");
    for (; (o = r.exec(s)); ) i.push([+o[1] * 60 + +(o[2] || 0), +o[3] * 60 + +(o[4] || 0)]);
    if (!i.length) {
      let l = (h) => {
          let f = /^\s*(\d{1,2})\s*(?:[h:.]\s*(\d{2})?)?\s*$/i.exec(h || "");
          return f ? +f[1] * 60 + +(f[2] || 0) : null;
        },
        u = l(n.am),
        d = l(n.pm);
      u != null && d != null && d > u && i.push([u, d]);
    }
    return i.sort((l, u) => l[0] - u[0]);
  },
  G2 = (t) => Math.floor(t / 60) + "h" + String(t % 60).padStart(2, "0");
