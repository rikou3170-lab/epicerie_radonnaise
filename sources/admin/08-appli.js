var RL = [
    ["v_accueil", "Accueil"],
    ["v_carte", "La carte"],
    ["v_fidelite", "Fid\xE9lit\xE9"],
    ["v_actus", "Actus"],
    ["v_infos", "Infos"],
  ],
  eO = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  tO = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
async function Hk(t) {
  for (let e = 0; e < t.length; e += 400) {
    let n = _n(de);
    (t.slice(e, e + 400).forEach((r) => n.delete(r)), await n.commit());
  }
}
var nO = ({ v: t, max: e, c: n = "var(--apple)" }) =>
  re.default.createElement(
    "div",
    { style: { flex: 1, height: 10, background: "var(--line)", borderRadius: 5, overflow: "hidden" } },
    re.default.createElement("div", {
      style: { width: Math.max(2, (t / e) * 100) + "%", height: "100%", background: n, borderRadius: 5 },
    }),
  );
function Kk({ d: t }) {
  let [e, n] = (0, re.useState)(7),
    [r, i] = (0, re.useState)(null),
    [s, o] = (0, re.useState)([]),
    a = Hu(new Date(Date.now() - 29 * 864e5));
  if (
    ((0, re.useEffect)(() => {
      let $ = fr(
          vp(Ge(de, "stats"), yp("jour", ">=", a)),
          (Y) => i(Y.docs.map((U) => U.data())),
          () => i([]),
        ),
        Q = fr(
          Ge(de, "connexions"),
          (Y) =>
            o(Y.docs.map((U) => ({ ...U.data(), id: U.id })).sort((U, G) => (G.date || 0) - (U.date || 0))),
          () => {},
        );
      return () => {
        ($(), Q());
      };
    }, [a]),
    (0, re.useEffect)(() => {
      try {
        if (sessionStorage.getItem("menage-stats")) return;
        sessionStorage.setItem("menage-stats", "1");
      } catch {}
      (async () => {
        try {
          let $ = await Oi(vp(Ge(de, "stats"), yp("jour", "<", Hu(new Date(Date.now() - 342144e5))))),
            Q = [];
          ($.forEach((Y) => Q.push(Y.ref)), Q.length && (await Hk(Q)));
        } catch {}
      })();
    }, []),
    (0, re.useEffect)(() => {
      let $ = s.filter((Q) => (Q.date || 0) < Date.now() - 7776e6);
      $.length && Hk($.map((Q) => xe(de, "connexions", Q.id))).catch(() => {});
    }, [s.length]),
    r === null)
  )
    return re.default.createElement(
      "div",
      { className: "card" },
      re.default.createElement("div", { className: "nm" }, "\u{1F4C8} Fr\xE9quentation de l'appli"),
      re.default.createElement("div", { className: "de" }, "Chargement\u2026"),
    );
  let u = Hu(new Date(Date.now() - (e - 1) * 864e5)),
    d = r.filter(($) => $.jour >= u),
    h = ($) => d.filter((Q) => Q.cle === $).reduce((Q, Y) => Q + (Y.n || 0), 0),
    p = ($) => {
      let Q = {};
      return (
        d
          .filter((Y) => String(Y.cle).startsWith($))
          .forEach((Y) => {
            let U = Y.cle.slice($.length);
            Q[U] = (Q[U] || 0) + (Y.n || 0);
          }),
        Q
      );
    },
    m = Array.from({ length: e }, ($, Q) => {
      let Y = new Date(Date.now() - (e - 1 - Q) * 864e5);
      return { cle: Hu(Y), nom: e <= 7 ? eO[Y.getDay()] : String(Y.getDate()) };
    }),
    w = Object.fromEntries(
      m.map(($) => [
        $.cle,
        r.filter((Q) => Q.jour === $.cle && Q.cle === "visiteurs").reduce((Q, Y) => Q + (Y.n || 0), 0),
      ]),
    ),
    E = Math.max(1, ...Object.values(w)),
    A = RL.map(([$, Q]) => [Q, h($)]).sort(($, Q) => Q[1] - $[1]),
    S = Math.max(1, ...A.map(($) => $[1])),
    _ = p("h_"),
    I = Math.max(1, ...Object.values(_)),
    T = Object.entries(_).sort(($, Q) => Q[1] - $[1])[0],
    M = ($) => t.plateaux.find((Q) => String(Q.id).toLowerCase() === $)?.nom || "Plateau retir\xE9",
    V = ($) =>
      (t.jour?.items || []).find((Q) => String(Q.id).toLowerCase() === $)?.titre || "Article retir\xE9",
    O = Object.entries(p("pl_"))
      .sort(($, Q) => Q[1] - $[1])
      .slice(0, 5)
      .map(([$, Q]) => [M($), Q]),
    b = Object.entries(p("resa_"))
      .sort(($, Q) => Q[1] - $[1])
      .slice(0, 5)
      .map(([$, Q]) => [V($), Q]),
    v = h("visiteurs"),
    x = h("ouvertures"),
    C = {};
  r.filter(($) => $.cle === "visiteurs").forEach(($) => {
    let Q = new Date($.jour + "T12:00").getDay();
    C[Q] = (C[Q] || 0) + ($.n || 0);
  });
  let F = Object.entries(C).sort(($, Q) => Q[1] - $[1])[0],
    P = [];
  (T &&
    T[1] >= 3 &&
    P.push(
      "C'est vers " +
        Number(T[0]) +
        "h que l'appli est le plus ouverte : le bon moment pour publier une promo ou envoyer une notification.",
    ),
    F &&
      F[1] >= 3 &&
      P.push("Le " + tO[F[0]] + " est le jour o\xF9 vous avez le plus de visiteurs (sur 30 jours)."));
  let k = A.filter(($) => $[0] !== "Fid\xE9lit\xE9" && $[0] !== "Accueil").slice(-1)[0];
  return (
    k &&
      v >= 10 &&
      k[1] < v * 0.15 &&
      P.push(
        "La rubrique \xAB " +
          k[0] +
          " \xBB est peu consult\xE9e : mettez-la en avant (notification, message d'accueil\u2026) ou \xE9toffez-la.",
      ),
    O[0] &&
      O[0][1] >= 3 &&
      P.push(
        "\xAB " +
          O[0][0] +
          " \xBB est le plateau le plus regard\xE9 : une belle photo et une notif \xAB bons plans \xBB peuvent d\xE9clencher des commandes.",
      ),
    b[0] &&
      b[0][1] >= 3 &&
      P.push("\xAB " + b[0][0] + " \xBB attire beaucoup : ce genre de bon plan marche, refaites-en !"),
    re.default.createElement(
      "div",
      { className: "card stats" },
      re.default.createElement(
        "div",
        { className: "row", style: { marginBottom: 10, flexWrap: "wrap", gap: 8 } },
        re.default.createElement("div", { className: "nm" }, "\u{1F4C8} Fr\xE9quentation de l'appli"),
        re.default.createElement(
          "div",
          { className: "seg", style: { margin: 0, marginLeft: "auto", width: "auto" } },
          [7, 30].map(($) =>
            re.default.createElement(
              "button",
              { key: $, className: e === $ ? "on" : "", onClick: () => n($) },
              $,
              " jours",
            ),
          ),
        ),
      ),
      d.length
        ? re.default.createElement(
            re.default.Fragment,
            null,
            re.default.createElement(
              "div",
              { className: "grid2", style: { marginBottom: 12 } },
              re.default.createElement(
                "div",
                { className: "stat" },
                re.default.createElement("b", null, v),
                re.default.createElement("span", null, "visiteurs (un par jour et par t\xE9l\xE9phone)"),
              ),
              re.default.createElement(
                "div",
                { className: "stat" },
                re.default.createElement("b", null, x),
                re.default.createElement("span", null, "ouvertures de l'appli"),
              ),
              re.default.createElement(
                "div",
                { className: "stat" },
                re.default.createElement("b", null, h("reservations")),
                re.default.createElement(
                  "span",
                  null,
                  "r\xE9servations \xB7 ",
                  h("commandes"),
                  " commande(s)",
                ),
              ),
              re.default.createElement(
                "div",
                { className: "stat" },
                re.default.createElement("b", null, h("notif_on") + h("notif_bonsplans")),
                re.default.createElement(
                  "span",
                  null,
                  "notifs activ\xE9es (",
                  h("notif_bonsplans"),
                  " avec bons plans)",
                ),
              ),
            ),
            re.default.createElement(
              "div",
              { className: "de", style: { marginBottom: 4 } },
              "Visiteurs par jour",
            ),
            re.default.createElement(
              "div",
              { className: "barres" },
              m.map(($) =>
                re.default.createElement(
                  "div",
                  { className: "bcol", key: $.cle, title: w[$.cle] + " visiteur(s)" },
                  re.default.createElement("span", { className: "bv" }, e <= 7 && w[$.cle] ? w[$.cle] : ""),
                  re.default.createElement("i", {
                    style: { height: Math.max(3, (w[$.cle] / E) * 80) + "px" },
                  }),
                  re.default.createElement("span", { className: "bm" }, $.nom),
                ),
              ),
            ),
            re.default.createElement(
              "div",
              { style: { display: "flex", gap: 18, flexWrap: "wrap", marginTop: 14 } },
              re.default.createElement(
                "div",
                { style: { flex: "1 1 220px" } },
                re.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 800, marginBottom: 4 } },
                  "Rubriques les plus vues",
                ),
                A.map(([$, Q]) =>
                  re.default.createElement(
                    "div",
                    { key: $, style: { display: "flex", alignItems: "center", gap: 8, margin: "4px 0" } },
                    re.default.createElement(
                      "span",
                      { className: "de", style: { width: 70, color: "var(--ink)" } },
                      $,
                    ),
                    re.default.createElement(nO, { v: Q, max: S }),
                    re.default.createElement(
                      "b",
                      { style: { fontSize: 12, width: 30, textAlign: "right" } },
                      Q,
                    ),
                  ),
                ),
              ),
              re.default.createElement(
                "div",
                { style: { flex: "1 1 220px" } },
                re.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 800, marginBottom: 4 } },
                  "\xC0 quelle heure l'appli est ouverte",
                ),
                re.default.createElement(
                  "div",
                  { style: { display: "flex", alignItems: "flex-end", gap: 2, height: 60 } },
                  Array.from({ length: 24 }, ($, Q) => {
                    let Y = _[String(Q).padStart(2, "0")] || 0;
                    return re.default.createElement("div", {
                      key: Q,
                      title: Q + "h : " + Y,
                      style: {
                        flex: 1,
                        height: Math.max(2, (Y / I) * 56),
                        background: Y === I && Y ? "var(--terra)" : "var(--apple)",
                        borderRadius: 2,
                        opacity: Y ? 1 : 0.25,
                      },
                    });
                  }),
                ),
                re.default.createElement(
                  "div",
                  {
                    className: "de",
                    style: { display: "flex", justifyContent: "space-between", fontSize: 10 },
                  },
                  re.default.createElement("span", null, "0h"),
                  re.default.createElement("span", null, "6h"),
                  re.default.createElement("span", null, "12h"),
                  re.default.createElement("span", null, "18h"),
                  re.default.createElement("span", null, "23h"),
                ),
              ),
            ),
            re.default.createElement(
              "div",
              { style: { display: "flex", gap: 18, flexWrap: "wrap", marginTop: 12 } },
              re.default.createElement(
                "div",
                { style: { flex: "1 1 220px" } },
                re.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 800 } },
                  "Plateaux les plus regard\xE9s",
                ),
                O.length
                  ? O.map(([$, Q], Y) =>
                      re.default.createElement(
                        "div",
                        { key: Y, className: "de", style: { color: "var(--ink)" } },
                        $,
                        " \u2014 ",
                        Q,
                        " fois",
                      ),
                    )
                  : re.default.createElement("div", { className: "de" }, "Aucun pour l'instant."),
              ),
              re.default.createElement(
                "div",
                { style: { flex: "1 1 220px" } },
                re.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 800 } },
                  "Bons plans qui donnent envie (\xAB Je r\xE9serve \xBB)",
                ),
                b.length
                  ? b.map(([$, Q], Y) =>
                      re.default.createElement(
                        "div",
                        { key: Y, className: "de", style: { color: "var(--ink)" } },
                        $,
                        " \u2014 ",
                        Q,
                        " fois",
                      ),
                    )
                  : re.default.createElement("div", { className: "de" }, "Aucun pour l'instant."),
              ),
            ),
            !!P.length &&
              re.default.createElement(
                "div",
                {
                  style: {
                    background: "#FFF8EE",
                    border: "1.5px solid #F0D7BF",
                    borderRadius: 12,
                    padding: "10px 12px",
                    marginTop: 12,
                  },
                },
                re.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 900, color: "var(--terra)", marginBottom: 4 } },
                  "\u{1F4A1} Conseils",
                ),
                P.map(($) =>
                  re.default.createElement(
                    "div",
                    { key: $, className: "de", style: { color: "var(--ink)", margin: "3px 0" } },
                    "\u2022 ",
                    $,
                  ),
                ),
              ),
          )
        : re.default.createElement(
            "div",
            { className: "de" },
            "Pas encore de visite enregistr\xE9e sur cette p\xE9riode. Les chiffres apparaissent d\xE8s que des clients ouvrent l'appli.",
          ),
      re.default.createElement(
        "details",
        { style: { marginTop: 12 } },
        re.default.createElement(
          "summary",
          { className: "de", style: { cursor: "pointer", fontWeight: 800 } },
          "\u{1F510} Derni\xE8res connexions \xE0 l'administration et \xE0 la caisse",
        ),
        !s.length &&
          re.default.createElement(
            "div",
            { className: "de", style: { marginTop: 6 } },
            "Aucune connexion enregistr\xE9e pour l'instant.",
          ),
        s
          .slice(0, 10)
          .map(($) =>
            re.default.createElement(
              "div",
              {
                key: $.id,
                className: "de",
                style: { color: "var(--ink)", padding: "4px 0", borderBottom: "1px solid var(--line)" },
              },
              new Date($.date).toLocaleString("fr-FR", {
                weekday: "short",
                day: "numeric",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              }),
              " \xB7 ",
              $.app === "caisse" ? "Caisse" : "Admin",
              " \xB7 ",
              $.appareil,
            ),
          ),
        re.default.createElement(
          "div",
          { className: "de", style: { marginTop: 6 } },
          "Une connexion que vous ne reconnaissez pas ? Changez votre mot de passe et pr\xE9venez Eric.",
        ),
      ),
      re.default.createElement(
        "div",
        { className: "de", style: { marginTop: 8, fontSize: 10.5 } },
        "Compteurs anonymes : on compte des passages, jamais qui regarde quoi.",
      ),
    )
  );
}
var Rt = en(hn());
async function Qk() {
  try {
    let t = await fetch("version.json?t=" + Date.now(), { cache: "no-store" });
    return (t.ok && (await t.json()).version) || null;
  } catch {
    return null;
  }
}
var rO = (t, e) =>
  new Promise((n) => {
    if (!t || t.state === "activated") return n();
    let r = setTimeout(n, e);
    t.addEventListener("statechange", () => {
      (t.state === "activated" || t.state === "redundant") && (clearTimeout(r), n());
    });
  });
async function b2() {
  try {
    if ("serviceWorker" in navigator) {
      let t = await navigator.serviceWorker.getRegistration();
      t && (await t.update().catch(() => {}), await rO(t.installing || t.waiting, 6e3));
    }
  } catch {}
  location.reload();
}
function Yk() {
  let [t, e] = (0, Rt.useState)(null);
  return (
    (0, Rt.useEffect)(() => {
      location.search.includes("maj=") && history.replaceState(null, "", location.pathname);
      let n = async () => {
        let s = await Qk();
        s && s !== yr && e(s);
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
var iO = {
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
function Jk({ dispo: t }) {
  let [e, n] = (0, Rt.useState)(!1);
  return t
    ? Rt.default.createElement(
        "div",
        { style: iO },
        Rt.default.createElement(
          "div",
          { style: { flex: 1, fontSize: 12.5, lineHeight: 1.35 } },
          Rt.default.createElement(
            "b",
            { style: { display: "block", fontSize: 13.5 } },
            "Nouvelle version ",
            t,
          ),
          "Vous avez la version ",
          yr,
          ".",
        ),
        Rt.default.createElement(
          "button",
          {
            disabled: e,
            onClick: () => {
              (n(!0), b2());
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
function Xk({ className: t = "btn gh", style: e }) {
  let [n, r] = (0, Rt.useState)("");
  return Rt.default.createElement(
    "div",
    { style: e },
    Rt.default.createElement(
      "button",
      {
        className: t,
        onClick: async () => {
          r("Recherche\u2026");
          let s = await Qk();
          s && s !== yr
            ? (r("Installation de la version " + s + "\u2026"), b2())
            : r(
                s
                  ? "Vous avez d\xE9j\xE0 la derni\xE8re version (" + yr + ")"
                  : "Impossible de v\xE9rifier : pas de connexion internet",
              );
        },
      },
      "Rechercher une mise \xE0 jour \xB7 v",
      yr,
    ),
    n &&
      Rt.default.createElement(
        "div",
        { style: { fontSize: 11.5, color: "#5C6A62", textAlign: "center", marginTop: 7 } },
        n,
      ),
    n.startsWith("Vous avez") &&
      Rt.default.createElement(
        "button",
        { className: t, style: { marginTop: 8 }, onClick: b2 },
        "Recharger quand m\xEAme",
      ),
  );
}
var uf = (t) =>
    String(t || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 110),
  E2 = (t) => {
    let e = new Date(t),
      n = new Date(),
      r = new Date();
    r.setDate(r.getDate() - 1);
    let i = e.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    return e.toDateString() === n.toDateString()
      ? i
      : e.toDateString() === r.toDateString()
        ? "hier " + i
        : e.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) + " " + i;
  },
  Zk = (t) => {
    let e = new Date(t),
      n = new Date(),
      r = new Date();
    return (
      r.setDate(r.getDate() - 1),
      e.toDateString() === n.toDateString()
        ? "Aujourd'hui"
        : e.toDateString() === r.toDateString()
          ? "Hier"
          : e.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
    );
  };
var Na = { active: !0, points: 200, euros: 5 },
  x2 = (t) => {
    let e = t?.remise;
    if (!e || e.active === !1) return null;
    let n = Math.max(1, parseInt(e.points) || Na.points),
      r = Math.max(0, Number(String(e.euros ?? Na.euros).replace(",", ".")) || Na.euros);
    return { points: n, euros: r };
  },
  eo = (t) =>
    (Math.round((Number(t) || 0) * 100) / 100).toFixed(2).replace(".", ",").replace(",00", "") + " \u20AC";
function _2(t, e) {
  let n = x2(t);
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
var it = {
    nb: 20,
    palier: 10,
    seuil: 10,
    recompense1: "un cadeau surprise",
    recompense: "un chouette cadeau surprise",
    exclus: "carburant, gaz et alcool",
    delai: 30,
  },
  eC = () => !0,
  cf = (t) => {
    let e = { ...it, ...(t?.tampons || {}) };
    (!e.exclus || e.exclus === "carburant, gaz, alcools, tabac, presse, jeux") && (e.exclus = it.exclus);
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
  A2 = (t) => {
    let e = cf(t);
    return (
      (e.seuil ? "1 passage d\xE8s " + e.seuil + " \u20AC d'achats = 1 tampon" : "1 passage = 1 tampon") +
      " \xB7 " +
      (e.palier
        ? e.palier + " tampons = " + e.recompense1 + ", ou continuez : " + e.nb + " tampons = " + e.recompense
        : e.nb + " tampons = " + e.recompense)
    );
  };
var Rk = [
    { min: 2, nom: "Membre supporter", ico: "\u{1F49A}" },
    { min: 5, nom: "Pilier de l'\xE9picerie", ico: "\u{1F333}" },
  ],
  df = (t) => {
    let e = Math.max(0, Number(t?.cadeaux) || 0),
      n = [...Rk].reverse().find((i) => e >= i.min) || null,
      r = Rk.find((i) => e < i.min) || null;
    return { k: e, niv: n, suivant: r, reste: r ? r.min - e : 0 };
  };
var D = en(hn());
var J = en(hn()),
  sO = [
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
  Zn = (t) => (t && !t.magie && sO.includes(t.id) && t.ambiance !== !1 ? t.id : null);
var to = {
    violet: "#2B1B3D",
    nuit: "#140B22",
    orange: "#E8731C",
    flamme: "#FFB547",
    vert: "#7FBF3F",
    os: "#F3E9D2",
  },
  tC = ({ taille: t = 30, style: e }) =>
    J.default.createElement(
      "svg",
      {
        className: "amb-chapeau",
        viewBox: "0 0 44 40",
        width: t,
        height: t * 0.9,
        style: e,
        "aria-hidden": "true",
      },
      J.default.createElement("path", {
        d: "M22 2c3 6 4 10 9 14 2 2 2 6 0 9H11c3-6 6-12 7-17 1-3 2-5 4-6z",
        fill: "#6E45A8",
      }),
      J.default.createElement("path", {
        d: "M22 2c3 6 4 10 9 14-3-2-6-3-9-3 0-4 0-8 0-11z",
        fill: "#8A62C4",
      }),
      J.default.createElement("path", { d: "M12 21h20l-1 5H13z", fill: to.orange }),
      J.default.createElement("rect", {
        x: "19.5",
        y: "20.5",
        width: "6",
        height: "6",
        rx: "1",
        fill: "none",
        stroke: to.flamme,
        strokeWidth: "1.6",
      }),
      J.default.createElement("ellipse", { cx: "22", cy: "28", rx: "20", ry: "5", fill: "#5A3690" }),
      J.default.createElement("ellipse", { cx: "22", cy: "27", rx: "18", ry: "3.4", fill: "#7650B2" }),
    ),
  oO = ({ taille: t = 22, cls: e = "" }) =>
    J.default.createElement(
      "svg",
      {
        className: "amb-citrouille " + e,
        viewBox: "0 0 40 36",
        width: t,
        height: t * 0.9,
        "aria-hidden": "true",
      },
      J.default.createElement("path", { d: "M20 7c-2-4-1-6 1-7l2 1c-2 1-2 3-1 6z", fill: "#4E6B2A" }),
      J.default.createElement("ellipse", { cx: "12", cy: "21", rx: "10", ry: "12", fill: "#D9621A" }),
      J.default.createElement("ellipse", { cx: "28", cy: "21", rx: "10", ry: "12", fill: "#D9621A" }),
      J.default.createElement("ellipse", { cx: "20", cy: "21", rx: "10", ry: "13", fill: to.orange }),
      J.default.createElement(
        "g",
        { className: "amb-lueur", fill: "#FFD36B" },
        J.default.createElement("path", { d: "M11 17l5 0-2.5-4.5zM24 17l5 0-2.5-4.5z" }),
        J.default.createElement("path", { d: "M10 24c4 4 16 4 20 0l-3 1-2-2-2 2-3-2-3 2-2-2-2 2z" }),
      ),
    ),
  aO = ({ w: t = 34 }) =>
    J.default.createElement(
      "svg",
      { viewBox: "0 0 60 26", width: t, height: t * 0.43, "aria-hidden": "true" },
      J.default.createElement(
        "g",
        { fill: "#1A0F28" },
        J.default.createElement(
          "g",
          { className: "amb-aile g" },
          J.default.createElement("path", {
            d: "M30 12C24 2 14 0 2 6c6 1 8 4 8 7 4-2 8-1 10 2 3-2 6-2 10-3z",
          }),
        ),
        J.default.createElement(
          "g",
          { className: "amb-aile d" },
          J.default.createElement("path", {
            d: "M30 12C36 2 46 0 58 6c-6 1-8 4-8 7-4-2-8-1-10 2-3-2-6-2-10-3z",
          }),
        ),
        J.default.createElement("ellipse", { cx: "30", cy: "14", rx: "4", ry: "5.5" }),
        J.default.createElement("path", { d: "M27 9l1-4 2 3 2-3 1 4z" }),
      ),
      J.default.createElement("circle", { cx: "28.5", cy: "12.5", r: ".9", fill: to.flamme }),
      J.default.createElement("circle", { cx: "31.5", cy: "12.5", r: ".9", fill: to.flamme }),
    );
function nC({ n: t = 9, apercu: e }) {
  return J.default.createElement(
    "div",
    { className: "amb-guirl" + (e ? " apercu" : ""), "aria-hidden": "true" },
    J.default.createElement(
      "svg",
      { className: "amb-fil", viewBox: "0 0 300 24", preserveAspectRatio: "none" },
      J.default.createElement("path", {
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
        ? J.default.createElement(
            "span",
            {
              key: r,
              className: "amb-lanterne",
              style: { left: i + "%", animationDelay: (r % 5) * 0.37 + "s" },
            },
            J.default.createElement(oO, { taille: 17 }),
          )
        : J.default.createElement("span", {
            key: r,
            className: "amb-fanion " + (r % 4 === 1 ? "o" : "v"),
            style: { left: i + "%" },
          });
    }),
  );
}
function lO({ boucle: t = !0, apercu: e }) {
  return J.default.createElement(
    "div",
    { className: "amb-vol" + (t ? " boucle" : "") + (e ? " apercu" : ""), "aria-hidden": "true" },
    [
      [0, 0, 34],
      [38, -18, 26],
      [70, 10, 22],
    ].map(([n, r, i], s) =>
      J.default.createElement(
        "span",
        { key: s, style: { left: n + "px", top: r + "px", animationDelay: s * 0.13 + "s" } },
        J.default.createElement(aO, { w: i }),
      ),
    ),
  );
}
var uO = () =>
  J.default.createElement(
    "svg",
    { className: "amb-sorciere", viewBox: "0 0 120 60", width: "120", height: "60", "aria-hidden": "true" },
    J.default.createElement(
      "g",
      { fill: "#120A1E" },
      J.default.createElement("path", {
        d: "M4 40 L86 30",
        stroke: "#120A1E",
        strokeWidth: "3",
        strokeLinecap: "round",
      }),
      J.default.createElement("path", { d: "M86 30c6-2 14-8 22-6-6 2-6 5-2 8-7 0-14 2-20-2z" }),
      J.default.createElement("path", { d: "M42 34c2-10 8-16 14-16 6 0 9 6 8 12z" }),
      J.default.createElement("circle", { cx: "58", cy: "15", r: "5.5" }),
      J.default.createElement("path", { d: "M52 12c4-2 9-2 13 0-4-6-6-12-4-16-4 4-7 10-9 16z" }),
      J.default.createElement("path", {
        d: "M48 12h20",
        stroke: "#120A1E",
        strokeWidth: "2.4",
        strokeLinecap: "round",
      }),
      J.default.createElement("path", {
        d: "M60 30c4 4 10 6 16 5",
        stroke: "#120A1E",
        strokeWidth: "2.6",
        fill: "none",
        strokeLinecap: "round",
      }),
      J.default.createElement("path", { d: "M44 34c-6 4-10 8-16 8 4-4 6-8 10-10z" }),
    ),
    J.default.createElement("circle", {
      cx: "98",
      cy: "27",
      r: "1.6",
      fill: to.flamme,
      className: "amb-lueur",
    }),
  );
var cO = () =>
  J.default.createElement(
    "svg",
    {
      className: "amb-village",
      viewBox: "0 0 400 150",
      preserveAspectRatio: "xMidYMax slice",
      "aria-hidden": "true",
    },
    J.default.createElement("path", {
      d: "M0 98Q60 76 120 90t120-6 160 8V150H0z",
      fill: "#4A2F66",
      opacity: ".55",
    }),
    J.default.createElement(
      "g",
      { fill: "none", stroke: "#0A0512", strokeLinecap: "round", transform: "translate(-50 0)" },
      J.default.createElement("path", { d: "M318 112c2-20-4-34 2-52", strokeWidth: "7" }),
      J.default.createElement("path", {
        d: "M320 74c-10-6-16-16-30-16M290 58c-4-4-10-4-14 0M321 66c10-8 18-10 26-22M347 44c2-5 6-7 10-6M319 86c12-2 22 2 32-6",
        strokeWidth: "3",
      }),
    ),
    J.default.createElement("path", { d: "M0 112Q100 100 200 108t200-4V150H0z", fill: "#1C1029" }),
    J.default.createElement(
      "g",
      { stroke: "#2E1D47", strokeWidth: "2.4" },
      [112, 130, 148, 166, 184].map((t) => J.default.createElement("path", { key: t, d: `M${t} 112v-14` })),
      J.default.createElement("path", { d: "M108 102h80M108 108h80", strokeWidth: "1.6" }),
    ),
    J.default.createElement("path", { d: "M0 124Q120 114 220 121t180-6V150H0z", fill: "#120A1E" }),
    [
      [60, 116, 1],
      [126, 118, 1.1],
      [200, 116, 0.9],
      [238, 118, 1.3],
      [290, 116, 1],
      [340, 118, 1.2],
      [168, 120, 0.8],
    ].map(([t, e, n], r) =>
      J.default.createElement(
        "g",
        { key: "c" + r, transform: `translate(${t - 11 * n} ${e - 18 * n}) scale(${n})` },
        J.default.createElement("ellipse", { cx: "11", cy: "12", rx: "11", ry: "8.5", fill: to.orange }),
        J.default.createElement("path", {
          d: "M11 4v16M6 5q-3 7 0 15M16 5q3 7 0 15",
          stroke: "#C2410C",
          strokeWidth: ".7",
          fill: "none",
          opacity: ".6",
        }),
        J.default.createElement("path", {
          d: "M10 4c0-3 1-4 2-4",
          stroke: "#4E6B2A",
          strokeWidth: "2",
          fill: "none",
        }),
        r % 2 === 0 &&
          J.default.createElement(
            "g",
            { className: "amb-lueur", fill: "#FFD36B", style: { animationDelay: r * 0.5 + "s" } },
            J.default.createElement("path", {
              d: "M5 10h3.5l-1.75-3zM13.5 10H17l-1.75-3zM5 14c3 3 9 3 12 0l-2 .7-1.4-1.3-1.6 1.3-1.6-1.3-1.6 1.3-1.4-1.3z",
            }),
          ),
      ),
    ),
  );
function rC({ apercu: t }) {
  return J.default.createElement(
    "div",
    { className: "decor-magie amb-intro-h", "aria-hidden": "true" },
    J.default.createElement("div", { className: "amb-etoiles" }),
    J.default.createElement(
      "div",
      { className: "amb-lune" },
      J.default.createElement("span", { className: "amb-passe" }, J.default.createElement(uO, null)),
    ),
    J.default.createElement(lO, { boucle: !1, apercu: !0 }),
    J.default.createElement(cO, null),
    J.default.createElement("div", { className: "amb-brume" }),
    J.default.createElement("div", { className: "amb-brume b2" }),
  );
}
var dO = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%235E3F82' stroke-width='.9' opacity='.75'%3E%3Cpath d='M40 0L8 32M40 0L22 40M40 0L0 18M40 0v40M40 0H0'/%3E%3Cpath d='M28 0q2 6 12 12M16 0q4 12 24 24M6 0q6 20 34 34'/%3E%3C/g%3E%3C/svg%3E")`;
var iC = ({ taille: t = 18, c1: e = "#EC407A", c2: n = "#F06292", cls: r = "" }) =>
    J.default.createElement(
      "svg",
      { className: r, viewBox: "0 0 24 30", width: t, height: t * 1.25, "aria-hidden": "true" },
      J.default.createElement("path", {
        d: "M12 2c-3.4 0-5.5 2.4-5.5 5.4 0 3.4 2.2 6.8 5.5 11.6 3.3-4.8 5.5-8.2 5.5-11.6C17.5 4.4 15.4 2 12 2zm0 3c1.5 0 2.5 1 2.5 2.5 0 1.6-1 3.5-2.5 6-1.5-2.5-2.5-4.4-2.5-6C9.5 6 10.5 5 12 5z",
        fill: e,
      }),
      J.default.createElement("path", {
        d: "M10 17 3.5 27.5l3.7-.4 1.7 3.4 5.3-9.4zM14 17l6.5 10.5-3.7-.4-1.7 3.4-5.3-9.4z",
        fill: n,
      }),
    ),
  sC = ({ style: t }) =>
    J.default.createElement(
      "span",
      { className: "amb-ruban-logo", style: t },
      J.default.createElement(iC, { taille: 15 }),
    );
function oC({ n: t = 9, apercu: e }) {
  return J.default.createElement(
    "div",
    { className: "amb-guirl" + (e ? " apercu" : ""), "aria-hidden": "true" },
    J.default.createElement(
      "svg",
      { className: "amb-fil", viewBox: "0 0 300 24", preserveAspectRatio: "none" },
      J.default.createElement("path", {
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
        ? J.default.createElement(
            "span",
            {
              key: r,
              className: "amb-lanterne",
              style: { left: i + "%", animationDelay: (r % 5) * 0.37 + "s" },
            },
            J.default.createElement(iC, { taille: 13 }),
          )
        : J.default.createElement("span", { key: r, className: "amb-coeur", style: { left: i + "%" } });
    }),
  );
}
function hO({ apercu: t }) {
  return J.default.createElement(
    "div",
    { className: "amb-ballons" + (t ? " apercu" : ""), "aria-hidden": "true" },
    [
      [12, 0, 34, "#EC407A"],
      [58, 1.2, 26, "#F48FB1"],
      [82, 0.5, 30, "#FFFFFF"],
      [34, 2, 22, "#F06292"],
    ].map(([e, n, r, i], s) =>
      J.default.createElement(
        "span",
        { key: s, style: { left: e + "%", animationDelay: n + "s" } },
        J.default.createElement(
          "svg",
          { viewBox: "0 0 30 50", width: r, height: r * 1.66 },
          J.default.createElement("path", {
            d: "M15 27C6 21 1 16 3.5 10 5.7 5.5 11 5.5 15 9.8 19 5.5 24.3 5.5 26.5 10 29 16 24 21 15 27z",
            fill: i,
            stroke: i === "#FFFFFF" ? "#F48FB1" : "none",
            strokeWidth: "1",
          }),
          J.default.createElement("path", {
            d: "M15 27c-1 6 2 10 0 16s2 6 0 7",
            stroke: "#C2185B",
            strokeWidth: ".9",
            fill: "none",
            opacity: ".6",
          }),
          J.default.createElement("ellipse", {
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
var pO = () =>
  J.default.createElement(
    "svg",
    {
      className: "amb-village",
      viewBox: "0 0 400 150",
      preserveAspectRatio: "xMidYMax slice",
      "aria-hidden": "true",
    },
    J.default.createElement("path", {
      d: "M0 98Q60 76 120 90t120-6 160 8V150H0z",
      fill: "#F3B3CB",
      opacity: ".6",
    }),
    J.default.createElement("path", { d: "M0 110Q100 98 200 106t200-4V150H0z", fill: "#C2507F" }),
    J.default.createElement(
      "g",
      { transform: "translate(184 52)" },
      J.default.createElement("path", {
        d: "M16 0C9 0 5 5 5 11c0 7 5 14 11 24 6-10 11-17 11-24C27 5 23 0 16 0zm0 6c3 0 5 2 5 5 0 3-2 7-5 12-3-5-5-9-5-12 0-3 2-5 5-5z",
        fill: "#EC407A",
      }),
      J.default.createElement("path", {
        d: "M12 33 2 54l7-1 3 7 10-19zM20 33l10 21-7-1-3 7-10-19z",
        fill: "#F06292",
      }),
    ),
    J.default.createElement("path", { d: "M0 124Q120 114 220 121t180-6V150H0z", fill: "#8E1E50" }),
    Array.from({ length: 22 }, (t, e) => {
      let n = 8 + e * 18 + (e % 3) * 4,
        r = 104 + (e % 4) * 4,
        i = ["#FFE3EE", "#F48FB1", "#FFFFFF", "#F8BBD0"][e % 4];
      return J.default.createElement(
        "g",
        { key: e },
        J.default.createElement("path", { d: `M${n} ${r + 8}v-8`, stroke: "#5E7A2E", strokeWidth: "1" }),
        [0, 72, 144, 216, 288].map((s) =>
          J.default.createElement("circle", {
            key: s,
            cx: n + 2.6 * Math.cos((s * Math.PI) / 180),
            cy: r + 2.6 * Math.sin((s * Math.PI) / 180),
            r: "2",
            fill: i,
          }),
        ),
        J.default.createElement("circle", { cx: n, cy: r, r: "1.3", fill: "#F2C14E" }),
      );
    }),
  );
function aC() {
  return J.default.createElement(
    "div",
    { className: "decor-magie amb-intro-r", "aria-hidden": "true" },
    J.default.createElement("div", { className: "amb-aurore" }),
    J.default.createElement("div", { className: "amb-bokeh-r" }),
    J.default.createElement(hO, { apercu: !0 }),
    J.default.createElement(pO, null),
  );
}
