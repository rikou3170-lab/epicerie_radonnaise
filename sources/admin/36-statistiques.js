/* ═══════════════════════════════════════════════════════════════════════
 *  STATISTIQUES — ventes dans l'appli et consultations.
 * ═══════════════════════════════════════════════════════════════════════ */

// Statistiques : ventes dans l'appli et ce que regardent les clients.
function Statistiques({ d: t }) {
  let e = t.commandes.filter((m) => !["refusee", "annulee"].includes(m.statut)),
    n = new Date(),
    r = Array.from({ length: 6 }, (m, w) => {
      let E = new Date(n.getFullYear(), n.getMonth() - 5 + w, 1);
      return { cle: pw(E), nom: E.toLocaleDateString("fr-FR", { month: "short" }) };
    }),
    i = Object.fromEntries(r.map((m) => [m.cle, { n: 0, ca: 0, r: 0 }]));
  e.forEach((m) => {
    let w = pw(m.cree || 0);
    i[w] && (i[w].n++, (i[w].ca += Number(m.total) || 0));
  }),
    t.resas
      .filter((m) => !["annulee", "absent"].includes(m.statut))
      .forEach((m) => {
        let w = pw(m.cree || 0);
        i[w] && i[w].r++;
      });
  let s = i[r[5].cle],
    o = i[r[4].cle],
    a = Math.max(1, ...r.map((m) => i[m.cle].ca)),
    u = {};
  e.filter((m) => (m.cree || 0) > Date.now() - 90 * 864e5).forEach((m) =>
    (m.lignes || []).forEach((w) => {
      let E = String(w.nom || "Plateau").split(" — ")[0];
      u[E] = (u[E] || 0) + 1;
    }),
  );
  let d = Object.entries(u)
      .sort((m, w) => w[1] - m[1])
      .slice(0, 3),
    h = new Set(t.commandes.map((m) => (m.tel || "").replace(/\D/g, "")).filter(Boolean)).size,
    p = (m, w) => (w ? (m >= w ? "▲ " : "▼ ") + Math.abs(Math.round(((m - w) / w) * 100)) + " %" : "");
  return React.default.createElement(
    "div",
    { className: "card stats" },
    React.default.createElement("div", { className: "nm", style: { marginBottom: 10 } }, "📊 Ce mois-ci"),
    React.default.createElement(
      "div",
      { className: "grid2", style: { marginBottom: 12 } },
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, s.n),
        React.default.createElement(
          "span",
          null,
          "commandes de plateaux ",
          React.default.createElement("i", null, p(s.n, o.n)),
        ),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, An(s.ca).replace(",00", "")),
        React.default.createElement(
          "span",
          null,
          "de plateaux ",
          React.default.createElement("i", null, p(s.ca, o.ca)),
        ),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, s.r),
        React.default.createElement("span", null, "réservations anti-gaspi"),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement(
          "b",
          null,
          t.conversations.filter((m) => (m.maj || 0) > Date.now() - 30 * 864e5).length,
        ),
        React.default.createElement("span", null, "conversations (30 j)"),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 4 } },
      "Plateaux commandés sur 6 mois (€)",
    ),
    React.default.createElement(
      "div",
      { className: "barres" },
      r.map((m) => {
        let w = i[m.cle];
        return React.default.createElement(
          "div",
          { className: "bcol", key: m.cle, title: w.n + " commande(s) · " + An(w.ca) },
          React.default.createElement("span", { className: "bv" }, w.ca ? Math.round(w.ca) : ""),
          React.default.createElement("i", { style: { height: Math.max(3, (w.ca / a) * 90) + "px" } }),
          React.default.createElement("span", { className: "bm" }, m.nom),
        );
      }),
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 } },
      React.default.createElement(
        "div",
        { style: { flex: "1 1 200px" } },
        React.default.createElement(
          "div",
          { className: "de", style: { fontWeight: 800 } },
          "Plateaux les plus demandés (3 mois)",
        ),
        d.length
          ? d.map(([m, w], E) =>
              React.default.createElement(
                "div",
                { key: m, className: "de", style: { color: "var(--ink)" } },
                ["🥇", "🥈", "🥉"][E],
                " ",
                m,
                " — ",
                w,
                " fois",
              ),
            )
          : React.default.createElement("div", { className: "de" }, "Pas encore de commande."),
      ),
      React.default.createElement(
        "div",
        { style: { flex: "1 1 200px" } },
        React.default.createElement(
          "div",
          { className: "de", style: { fontWeight: 800 } },
          "Vos clients dans l'appli",
        ),
        React.default.createElement(
          "div",
          { className: "de", style: { color: "var(--ink)" } },
          h,
          " ont déjà commandé · ",
          t.conversations.length,
          " vous ont écrit · ",
          t.clients.length,
          " carte",
          t.clients.length > 1 ? "s" : "",
          " fidélité",
        ),
      ),
    ),
  );
}

// v2.39 : suivi des comptes clients (cartes créées, dernières cartes, doublons probables, téléphones avec alertes).
// Mêmes informations que la page de suivi d'Eric, sans la partie technique.
function SuiviComptes({ d }) {
  const h = React.default.createElement;
  const [appareils, setAppareils] = (0, React.useState)(null);
  (0, React.useEffect)(
    () =>
      onSnapshot(
        collection(db, "appareils"),
        (r) => setAppareils(r.docs.map((x) => x.data())),
        () => setAppareils([]),
      ),
    [],
  );
  const telN = (t) => {
    let x = String(t || "").replace(/\D/g, "");
    if (x.length === 11 && x.startsWith("33")) x = "0" + x.slice(2);
    return x.length >= 9 ? x : "";
  };
  const iso = (x) => x.toLocaleDateString("sv-SE");
  const jourMoins = (n) => {
    const x = new Date();
    x.setHours(12, 0, 0, 0);
    x.setDate(x.getDate() - n);
    return iso(x);
  };
  const auj = jourMoins(0);
  const dateDe = (c) => String(c.depuis || "").slice(0, 10);
  const clients = d.clients || [];
  const depuis = (n) => clients.filter((c) => dateDe(c) >= jourMoins(n)).length;
  const jours = Array.from({ length: 14 }, (_, i) => jourMoins(13 - i));
  const parJour = jours.map((j) => clients.filter((c) => dateDe(c) === j).length);
  const max = Math.max(1, ...parJour);
  const court = (j) => (j === auj ? "Aujourd'hui" : new Date(j + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "short" }));
  // v2.41 : tous les comptes, du plus récent au plus ancien, avec recherche (nom, carte, téléphone, e-mail)
  const [recherche, setRecherche] = (0, React.useState)("");
  const q = recherche.trim().toLowerCase(), qChiffres = q.replace(/\D/g, "");
  const recents = [...clients]
    .sort((a, b) => dateDe(b).localeCompare(dateDe(a)) || String(a.nom || "").localeCompare(String(b.nom || ""), "fr"))
    .filter((c) => !q || [c.nom, c.code, c.email].some((v) => String(v || "").toLowerCase().includes(q)) || (qChiffres.length >= 3 && telN(c.tel).includes(qChiffres)));
  // téléphones reliés à une carte (alertes activées)
  const lies = new Set();
  (appareils || []).forEach((a) => (a.refs || []).forEach((r) => lies.add(String(r))));
  const actifs7 = (appareils || []).filter((a) => a.maj && Date.now() - a.maj < 7 * 864e5).length;
  // doublons probables : même téléphone ou même e-mail
  const groupes = (() => {
    const parent = clients.map((_, i) => i),
      f = (i) => (parent[i] === i ? i : (parent[i] = f(parent[i]))),
      vu = {};
    clients.forEach((c, i) =>
      [telN(c.tel) && "t" + telN(c.tel), c.email && "e" + String(c.email).trim().toLowerCase()]
        .filter(Boolean)
        .forEach((k) => (k in vu ? (parent[f(i)] = f(vu[k])) : (vu[k] = i))),
    );
    const g = {};
    clients.forEach((c, i) => (g[f(i)] = g[f(i)] || []).push(c));
    return Object.values(g).filter((x) => x.length > 1);
  })();
  const chiffre = (v, l) =>
    h(
      "div",
      { style: { flex: "1 1 70px", textAlign: "center", background: "#F7F3EA", borderRadius: 12, padding: "8px 4px" } },
      h("div", { style: { fontSize: 22, fontWeight: 800, color: "var(--forest)" } }, v),
      h("div", { className: "de", style: { fontSize: 11.5 } }, l),
    );
  return h(
    "div",
    { className: "card stats" },
    h("div", { className: "nm" }, "👥 Comptes clients"),
    h("div", { className: "de" }, "Les cartes de fidélité créées dans l'appli, jour après jour."),
    h(
      "div",
      { style: { display: "flex", gap: 8, margin: "10px 0" } },
      chiffre(depuis(0), "aujourd'hui"),
      chiffre(depuis(6), "7 jours"),
      chiffre(depuis(29), "30 jours"),
      chiffre(clients.length, "au total"),
    ),
    h(
      "div",
      { style: { display: "flex", alignItems: "flex-end", gap: 3, height: 70, margin: "6px 0 2px" } },
      jours.map((j, i) =>
        h(
          "div",
          { key: j, title: court(j) + " : " + parJour[i], style: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", height: "100%" } },
          parJour[i] ? h("div", { style: { fontSize: 10, color: "var(--forest)", fontWeight: 800 } }, parJour[i]) : null,
          h("div", { style: { width: "100%", height: (100 * parJour[i]) / max + "%", minHeight: parJour[i] ? 3 : 1, background: "var(--apple)", borderRadius: "4px 4px 1px 1px" } }),
        ),
      ),
    ),
    h("div", { className: "de", style: { display: "flex", justifyContent: "space-between", fontSize: 10.5 } }, h("span", null, court(jours[0])), h("span", null, "Aujourd'hui")),
    h("div", { className: "de", style: { fontWeight: 800, marginTop: 12 } }, "Tous les comptes (" + clients.length + ")"),
    clients.length > 5 &&
      h("input", {
        className: "inp",
        type: "search",
        value: recherche,
        placeholder: "Rechercher (nom, carte, tél.)",
        onChange: (e) => setRecherche(e.target.value),
        style: { margin: "6px 0" },
      }),
    h(
      "div",
      { style: { maxHeight: 340, overflowY: "auto", WebkitOverflowScrolling: "touch", border: "1px solid var(--line)", borderRadius: 12, padding: "2px 10px" } },
      recents.length
        ? recents.map((c, k) =>
            h(
              "div",
              { key: c.id, style: { padding: "7px 0", borderTop: k ? "1px solid var(--line)" : "none" } },
              h(
                "div",
                { className: "de", style: { color: "var(--ink)", display: "flex", justifyContent: "space-between", gap: 8 } },
                h("b", null, c.nom || "—", lies.has(String(c.id)) ? " 📱" : ""),
                h("span", { style: { color: dateDe(c) === auj ? "var(--apple)" : "var(--ink3)", whiteSpace: "nowrap", fontWeight: dateDe(c) === auj ? 800 : 400 } }, court(dateDe(c))),
              ),
              h(
                "div",
                { className: "de", style: { fontSize: 12 } },
                [c.code, c.tel, (c.tampons || 0) + " tampon" + ((c.tampons || 0) > 1 ? "s" : "")].filter(Boolean).join(" · "),
              ),
            ),
          )
        : h("div", { className: "de", style: { padding: "8px 0" } }, clients.length ? "Aucun compte ne correspond." : "Aucune carte pour l'instant."),
    ),
    h("div", { className: "de", style: { fontWeight: 800, marginTop: 12 } }, "Doublons probables"),
    groupes.length
      ? h(
          "div",
          { style: { background: "#FFF8EE", border: "1.5px solid #F0D7BF", borderRadius: 12, padding: "8px 12px", marginTop: 4 } },
          h(
            "div",
            { className: "de", style: { marginBottom: 6 } },
            "Même téléphone ou même e-mail. Gardez la carte que le client utilise (demandez-lui son QR code) et supprimez l'autre dans « Fidélité ». 📱 = carte reliée à son téléphone.",
          ),
          groupes.map((g, k) =>
            h(
              "div",
              { key: k, style: { padding: "4px 0", borderTop: k ? "1px solid #F0D7BF" : "none" } },
              g.map((c) =>
                h(
                  "div",
                  { key: c.id, className: "de", style: { color: "var(--ink)" } },
                  c.nom || "—",
                  lies.has(String(c.id)) ? " 📱" : "",
                  h("span", { style: { color: "var(--ink3)" } }, " · ", c.code, " · créée ", court(dateDe(c)).toLowerCase(), " · ", c.tampons || 0, " tampon(s)"),
                ),
              ),
            ),
          ),
        )
      : h("div", { className: "de" }, "✅ Aucun doublon détecté."),
    h("div", { className: "de", style: { fontWeight: 800, marginTop: 12 } }, "Téléphones avec les alertes"),
    h(
      "div",
      { className: "de", style: { color: "var(--ink)" } },
      appareils === null
        ? "Chargement…"
        : appareils.length +
            " téléphone(s) reçoivent les notifications · " +
            appareils.filter((a) => a.promo).length +
            " acceptent les bons plans · " +
            actifs7 +
            " actif(s) ces 7 derniers jours",
    ),
  );
}
