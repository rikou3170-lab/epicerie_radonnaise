/* ═══════════════════════════════════════════════════════════════════════
 *  RGPD — durée de conservation, informations légales, QR de réinstallation de carte.
 * ═══════════════════════════════════════════════════════════════════════ */

// Durée de conservation des données et nettoyage.
function Conservation({ d, set }) {
  let n = d.legal?.conservation || 3,
    r = new Date();
  r.setFullYear(r.getFullYear() - n);
  let i = r.toLocaleDateString("sv-SE"),
    s = d.clients.filter((o) => lN(o) && lN(o) < i);
  return React.default.createElement(
    "div",
    { className: "card", style: { background: "#F6F9EF", borderColor: "#D9E6C2" } },
    React.default.createElement("div", { className: "nm" }, "Durée de conservation (RGPD)"),
    React.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 10 } },
      "Les cartes sans aucun passage en caisse depuis ",
      n,
      " ans doivent être supprimées.",
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 10, alignItems: "center" } },
      React.default.createElement("label", { className: "lab", style: { margin: 0 } }, "Conserver"),
      React.default.createElement(
        "select",
        {
          className: "inp",
          style: { width: "auto" },
          value: n,
          onChange: (o) => set("legal", (a) => ({ ...a, conservation: +o.target.value })),
        },
        [1, 2, 3].map((o) =>
          React.default.createElement("option", { key: o, value: o }, o, " an", o > 1 ? "s" : ""),
        ),
      ),
      React.default.createElement(
        "span",
        { style: { fontSize: 12, color: "var(--ink3)" } },
        "après le dernier passage",
      ),
    ),
    React.default.createElement(
      "div",
      { style: { marginTop: 12, fontSize: 13, fontWeight: 700 } },
      s.length
        ? s.length +
            " carte" +
            (s.length > 1 ? "s" : "") +
            " inactive" +
            (s.length > 1 ? "s" : "") +
            " à supprimer"
        : "Aucune carte à supprimer ✓",
    ),
    !!s.length &&
      React.default.createElement(
        "button",
        {
          className: "btn sm",
          style: { marginTop: 8, background: "var(--red)" },
          onClick: async () =>
            (await De(
              "Supprimer " +
                s.length +
                ` carte(s) inactive(s) et leur historique ?

` +
                s.slice(0, 8).map((o) => "• " + o.nom).join(`
`) +
                (s.length > 8
                  ? `
…`
                  : ""),
            )) && set("clients", (o) => o.filter((a) => !s.some((u) => u.id === a.id))),
        },
        "Supprimer les cartes inactives",
      ),
  );
}

// Informations légales (mentions, confidentialité).
function InfosLegales({ d, set }) {
  let n = Object.fromEntries(
      Object.entries({ ...EMPTY2.legal, ...(d.legal || {}) }).map(([s, o]) => [
        s,
        o === "" || o == null ? EMPTY2.legal[s] : o,
      ]),
    ),
    r = (s, o) => set("legal", (a) => ({ ...EMPTY2.legal, ...(a || {}), [s]: o })),
    i = (s, o, a) =>
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement("label", { className: "lab" }, o),
        React.default.createElement("input", {
          className: "inp",
          value: n[s] || "",
          placeholder: a,
          onChange: (u) => r(s, u.target.value),
        }),
      );
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 4px" } },
      "Informations légales",
    ),
    React.default.createElement(
      "div",
      { className: "sub", style: { margin: "0 0 8px" } },
      "Affichées dans « Mentions légales » et « Confidentialité » de l'application (onglet Infos).",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      i("raison", "Raison sociale", "LTMP"),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: "0 10px", flexWrap: "wrap" } },
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("forme", "Forme juridique", "SARL"),
        ),
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("capital", "Capital social (€)", "3 000"),
        ),
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: "0 10px", flexWrap: "wrap" } },
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("siren", "SIREN", "979 301 132"),
        ),
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("rcs", "RCS", "RCS Vesoul"),
        ),
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: "0 10px", flexWrap: "wrap" } },
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("tva", "N° TVA intracommunautaire", "FR00979301132"),
        ),
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("naf", "Activité (code NAF)", "47.11B"),
        ),
      ),
      i("responsable", "Responsable / directrice de publication", "Marion Parnaso"),
      i("emailDonnees", "E-mail pour les demandes RGPD", d.store.email),
      i("hebergementDonnees", "Lieu d'hébergement des données", "Union européenne"),
      // v2.46 : médiateur de la consommation (obligatoire pour tout commerce qui vend aux particuliers)
      i("mediateur", "Médiateur de la consommation", "ex. CM2C, Medicys…"),
      i("mediateurSite", "Site ou adresse du médiateur", "ex. www.cm2c.net"),
      !String(d.legal?.mediateur || "").trim() &&
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 6, color: "#B4532A", fontWeight: 700 } },
          "⚠️ Obligatoire : tout commerce qui vend à des particuliers doit adhérer à un médiateur de la consommation et l'indiquer à ses clients. Une fois l'adhésion faite, notez ici son nom et son site : ils s'afficheront dans les mentions légales et les conditions de commande.",
        ),
      React.default.createElement(
        "div",
        { className: "de", style: { marginTop: 6 } },
        "Pré-rempli avec les données officielles de la société (registre du commerce). Vérifiez et corrigez si besoin.",
      ),
    ),
  );
}
