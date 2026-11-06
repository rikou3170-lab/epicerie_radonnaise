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
