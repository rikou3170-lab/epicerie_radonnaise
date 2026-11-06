/* ═══════════════════════════════════════════════════════════════════════
 *  FRÉQUENTATION — mesure d'audience anonyme de l'appli client et journal des connexions (tableau de bord).
 * ═══════════════════════════════════════════════════════════════════════ */

// Fréquentation : rubriques suivies, jours de la semaine, petites aides d'affichage.
var RL = [
    ["v_accueil", "Accueil"],
    ["v_carte", "La carte"],
    ["v_fidelite", "Fidélité"],
    ["v_actus", "Actus"],
    ["v_infos", "Infos"],
  ],
  eO = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  tO = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

// Supprime une liste de documents par paquets de 400 (limite de Firebase).
async function Hk(t) {
  for (let e = 0; e < t.length; e += 400) {
    let n = writeBatch(db);
    t.slice(e, e + 400).forEach((r) => n.delete(r)), await n.commit();
  }
}

// Barre horizontale proportionnelle (graphiques de fréquentation).
var nO = ({ v, max, c = "var(--apple)" }) =>
  ReactB.default.createElement(
    "div",
    { style: { flex: 1, height: 10, background: "var(--line)", borderRadius: 5, overflow: "hidden" } },
    ReactB.default.createElement("div", {
      style: { width: Math.max(2, (v / max) * 100) + "%", height: "100%", background: c, borderRadius: 5 },
    }),
  );

// Carte « Fréquentation de l'appli » : visiteurs, ouvertures, rubriques, heures, et dernières connexions
// à l'administration et à la caisse. Fait aussi le ménage des anciens compteurs (plus de 13 mois) et connexions (90 jours).
function Frequentation({ d: t }) {
  let [e, n] = (0, ReactB.useState)(7),
    [r, i] = (0, ReactB.useState)(null),
    [s, o] = (0, ReactB.useState)([]),
    a = Hu(new Date(Date.now() - 29 * 864e5));
  if (
    ((0, ReactB.useEffect)(() => {
      let $ = onSnapshot(
          query(collection(db, "stats"), where("jour", ">=", a)),
          (Y) => i(Y.docs.map((U) => U.data())),
          () => i([]),
        ),
        Q = onSnapshot(
          collection(db, "connexions"),
          (Y) =>
            o(Y.docs.map((U) => ({ ...U.data(), id: U.id })).sort((U, G) => (G.date || 0) - (U.date || 0))),
          () => {},
        );
      return () => {
        $(), Q();
      };
    }, [a]),
    (0, ReactB.useEffect)(() => {
      try {
        if (sessionStorage.getItem("menage-stats")) return;
        sessionStorage.setItem("menage-stats", "1");
      } catch {}
      (async () => {
        try {
          let $ = await getDocs(
              query(collection(db, "stats"), where("jour", "<", Hu(new Date(Date.now() - 342144e5)))),
            ),
            Q = [];
          $.forEach((Y) => Q.push(Y.ref)), Q.length && (await Hk(Q));
        } catch {}
      })();
    }, []),
    (0, ReactB.useEffect)(() => {
      let $ = s.filter((Q) => (Q.date || 0) < Date.now() - 7776e6);
      $.length && Hk($.map((Q) => doc2(db, "connexions", Q.id))).catch(() => {});
    }, [s.length]),
    r === null)
  )
    return ReactB.default.createElement(
      "div",
      { className: "card" },
      ReactB.default.createElement("div", { className: "nm" }, "📈 Fréquentation de l'appli"),
      ReactB.default.createElement("div", { className: "de" }, "Chargement…"),
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
    M = ($) => t.plateaux.find((Q) => String(Q.id).toLowerCase() === $)?.nom || "Plateau retiré",
    V = ($) => (t.jour?.items || []).find((Q) => String(Q.id).toLowerCase() === $)?.titre || "Article retiré",
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
  T &&
    T[1] >= 3 &&
    P.push(
      "C'est vers " +
        Number(T[0]) +
        "h que l'appli est le plus ouverte : le bon moment pour publier une promo ou envoyer une notification.",
    ),
    F &&
      F[1] >= 3 &&
      P.push("Le " + tO[F[0]] + " est le jour où vous avez le plus de visiteurs (sur 30 jours).");
  let k = A.filter(($) => $[0] !== "Fidélité" && $[0] !== "Accueil").slice(-1)[0];
  return (
    k &&
      v >= 10 &&
      k[1] < v * 0.15 &&
      P.push(
        "La rubrique « " +
          k[0] +
          " » est peu consultée : mettez-la en avant (notification, message d'accueil…) ou étoffez-la.",
      ),
    O[0] &&
      O[0][1] >= 3 &&
      P.push(
        "« " +
          O[0][0] +
          " » est le plateau le plus regardé : une belle photo et une notif « bons plans » peuvent déclencher des commandes.",
      ),
    b[0] &&
      b[0][1] >= 3 &&
      P.push("« " + b[0][0] + " » attire beaucoup : ce genre de bon plan marche, refaites-en !"),
    ReactB.default.createElement(
      "div",
      { className: "card stats" },
      ReactB.default.createElement(
        "div",
        { className: "row", style: { marginBottom: 10, flexWrap: "wrap", gap: 8 } },
        ReactB.default.createElement("div", { className: "nm" }, "📈 Fréquentation de l'appli"),
        ReactB.default.createElement(
          "div",
          { className: "seg", style: { margin: 0, marginLeft: "auto", width: "auto" } },
          [7, 30].map(($) =>
            ReactB.default.createElement(
              "button",
              { key: $, className: e === $ ? "on" : "", onClick: () => n($) },
              $,
              " jours",
            ),
          ),
        ),
      ),
      d.length
        ? ReactB.default.createElement(
            ReactB.default.Fragment,
            null,
            ReactB.default.createElement(
              "div",
              { className: "grid2", style: { marginBottom: 12 } },
              ReactB.default.createElement(
                "div",
                { className: "stat" },
                ReactB.default.createElement("b", null, v),
                ReactB.default.createElement("span", null, "visiteurs (un par jour et par téléphone)"),
              ),
              ReactB.default.createElement(
                "div",
                { className: "stat" },
                ReactB.default.createElement("b", null, x),
                ReactB.default.createElement("span", null, "ouvertures de l'appli"),
              ),
              ReactB.default.createElement(
                "div",
                { className: "stat" },
                ReactB.default.createElement("b", null, h("reservations")),
                ReactB.default.createElement("span", null, "réservations · ", h("commandes"), " commande(s)"),
              ),
              ReactB.default.createElement(
                "div",
                { className: "stat" },
                ReactB.default.createElement("b", null, h("notif_on") + h("notif_bonsplans")),
                ReactB.default.createElement(
                  "span",
                  null,
                  "notifs activées (",
                  h("notif_bonsplans"),
                  " avec bons plans)",
                ),
              ),
            ),
            ReactB.default.createElement(
              "div",
              { className: "de", style: { marginBottom: 4 } },
              "Visiteurs par jour",
            ),
            ReactB.default.createElement(
              "div",
              { className: "barres" },
              m.map(($) =>
                ReactB.default.createElement(
                  "div",
                  { className: "bcol", key: $.cle, title: w[$.cle] + " visiteur(s)" },
                  ReactB.default.createElement(
                    "span",
                    { className: "bv" },
                    e <= 7 && w[$.cle] ? w[$.cle] : "",
                  ),
                  ReactB.default.createElement("i", {
                    style: { height: Math.max(3, (w[$.cle] / E) * 80) + "px" },
                  }),
                  ReactB.default.createElement("span", { className: "bm" }, $.nom),
                ),
              ),
            ),
            ReactB.default.createElement(
              "div",
              { style: { display: "flex", gap: 18, flexWrap: "wrap", marginTop: 14 } },
              ReactB.default.createElement(
                "div",
                { style: { flex: "1 1 220px" } },
                ReactB.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 800, marginBottom: 4 } },
                  "Rubriques les plus vues",
                ),
                A.map(([$, Q]) =>
                  ReactB.default.createElement(
                    "div",
                    { key: $, style: { display: "flex", alignItems: "center", gap: 8, margin: "4px 0" } },
                    ReactB.default.createElement(
                      "span",
                      { className: "de", style: { width: 70, color: "var(--ink)" } },
                      $,
                    ),
                    ReactB.default.createElement(nO, { v: Q, max: S }),
                    ReactB.default.createElement(
                      "b",
                      { style: { fontSize: 12, width: 30, textAlign: "right" } },
                      Q,
                    ),
                  ),
                ),
              ),
              ReactB.default.createElement(
                "div",
                { style: { flex: "1 1 220px" } },
                ReactB.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 800, marginBottom: 4 } },
                  "À quelle heure l'appli est ouverte",
                ),
                ReactB.default.createElement(
                  "div",
                  { style: { display: "flex", alignItems: "flex-end", gap: 2, height: 60 } },
                  Array.from({ length: 24 }, ($, Q) => {
                    let Y = _[String(Q).padStart(2, "0")] || 0;
                    return ReactB.default.createElement("div", {
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
                ReactB.default.createElement(
                  "div",
                  {
                    className: "de",
                    style: { display: "flex", justifyContent: "space-between", fontSize: 10 },
                  },
                  ReactB.default.createElement("span", null, "0h"),
                  ReactB.default.createElement("span", null, "6h"),
                  ReactB.default.createElement("span", null, "12h"),
                  ReactB.default.createElement("span", null, "18h"),
                  ReactB.default.createElement("span", null, "23h"),
                ),
              ),
            ),
            ReactB.default.createElement(
              "div",
              { style: { display: "flex", gap: 18, flexWrap: "wrap", marginTop: 12 } },
              ReactB.default.createElement(
                "div",
                { style: { flex: "1 1 220px" } },
                ReactB.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 800 } },
                  "Plateaux les plus regardés",
                ),
                O.length
                  ? O.map(([$, Q], Y) =>
                      ReactB.default.createElement(
                        "div",
                        { key: Y, className: "de", style: { color: "var(--ink)" } },
                        $,
                        " — ",
                        Q,
                        " fois",
                      ),
                    )
                  : ReactB.default.createElement("div", { className: "de" }, "Aucun pour l'instant."),
              ),
              ReactB.default.createElement(
                "div",
                { style: { flex: "1 1 220px" } },
                ReactB.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 800 } },
                  "Bons plans qui donnent envie (« Je réserve »)",
                ),
                b.length
                  ? b.map(([$, Q], Y) =>
                      ReactB.default.createElement(
                        "div",
                        { key: Y, className: "de", style: { color: "var(--ink)" } },
                        $,
                        " — ",
                        Q,
                        " fois",
                      ),
                    )
                  : ReactB.default.createElement("div", { className: "de" }, "Aucun pour l'instant."),
              ),
            ),
            !!P.length &&
              ReactB.default.createElement(
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
                ReactB.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 900, color: "var(--terra)", marginBottom: 4 } },
                  "💡 Conseils",
                ),
                P.map(($) =>
                  ReactB.default.createElement(
                    "div",
                    { key: $, className: "de", style: { color: "var(--ink)", margin: "3px 0" } },
                    "• ",
                    $,
                  ),
                ),
              ),
          )
        : ReactB.default.createElement(
            "div",
            { className: "de" },
            "Pas encore de visite enregistrée sur cette période. Les chiffres apparaissent dès que des clients ouvrent l'appli.",
          ),
      ReactB.default.createElement(
        "details",
        { style: { marginTop: 12 } },
        ReactB.default.createElement(
          "summary",
          { className: "de", style: { cursor: "pointer", fontWeight: 800 } },
          "🔐 Dernières connexions à l'administration et à la caisse",
        ),
        !s.length &&
          ReactB.default.createElement(
            "div",
            { className: "de", style: { marginTop: 6 } },
            "Aucune connexion enregistrée pour l'instant.",
          ),
        s.slice(0, 10).map(($) =>
          ReactB.default.createElement(
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
            " · ",
            $.app === "caisse" ? "Caisse" : "Admin",
            " · ",
            $.appareil,
          ),
        ),
        ReactB.default.createElement(
          "div",
          { className: "de", style: { marginTop: 6 } },
          "Une connexion que vous ne reconnaissez pas ? Changez votre mot de passe et prévenez Eric.",
        ),
      ),
      ReactB.default.createElement(
        "div",
        { className: "de", style: { marginTop: 8, fontSize: 10.5 } },
        "Compteurs anonymes : on compte des passages, jamais qui regarde quoi.",
      ),
    )
  );
}
