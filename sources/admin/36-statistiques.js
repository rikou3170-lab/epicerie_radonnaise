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
  // v2.46d : fusion de deux cartes en double. On garde la carte reliée au téléphone (📱),
  // sinon celle qui a le plus de tampons, sinon la plus récente ; l'autre lui donne ses tampons,
  // sa cagnotte, ses cadeaux et son historique, puis elle est supprimée.
  const [fusionEnCours, setFusionEnCours] = (0, React.useState)(null);
  const aGarder = (g) =>
    [...g].sort(
      (a, b) =>
        lies.has(String(b.id)) - lies.has(String(a.id)) ||
        (Number(b.tampons) || 0) - (Number(a.tampons) || 0) ||
        dateDe(b).localeCompare(dateDe(a)),
    )[0];
  const fusionner = async (g, k) => {
    const K = aGarder(g),
      autres = g.filter((c) => c.id !== K.id);
    if (
      !(await De(
        "Garder la carte " + K.code + " (" + (K.nom || "—") + ") et y regrouper " +
          autres.map((c) => c.code + " (" + (Number(c.tampons) || 0) + " tampon(s))").join(", ") +
          " ? L'autre carte sera supprimée (le téléphone qui l'utilisait passera tout seul sur la carte gardée)." +
          (!lies.has(String(K.id))
              ? " Aucune de ces cartes n'est reliée à un téléphone avec alertes : en cas de doute, demandez au client de vous montrer la carte qu'il utilise."
              : ""),
      ))
    )
      return;
    setFusionEnCours(k);
    try {
      const cfg = { ...it, ...(d.fidelite?.tampons || {}) },
        nb = Number(cfg.nb) || it.nb;
      let tamponsK = Number(K.tampons) || 0,
        reste = Number(K.reste) || 0,
        b = writeBatch(db),
        maj = { derniere: new Date().toLocaleDateString("sv-SE") },
        ajout = 0,
        attente = 0,
        cadeaux = 0,
        points = 0;
      for (const S of autres) {
        // tampons et euros gardés de l'autre carte (1 tampon par tranche, comme à la caisse)
        const tranche = cfg.seuil > 0 ? cfg.seuil : 10,
          cents = Math.round((reste + (Number(S.reste) || 0)) * 100),
          enPlus = Math.floor(cents / Math.round(tranche * 100));
        reste = (cents - enPlus * Math.round(tranche * 100)) / 100;
        const tot = (Number(S.tampons) || 0) + enPlus,
          dir = Math.min(tot, Math.max(0, nb - tamponsK - ajout));
        ajout += dir;
        attente += tot - dir + (Number(S.bonusAttente) || 0);
        cadeaux += Number(S.cadeaux) || 0;
        points += Number(S.points) || 0;
        // informations manquantes sur la carte gardée
        ["email", "tel", "anniv", "prenom", "nomFamille", "parrain"].forEach(
          (f) => !K[f] && S[f] && !(f in maj) && (maj[f] = S[f]),
        );
        // historique de l'autre carte recopié, puis supprimé avec elle
        const hist = await getDocs(collection(db, "clients", String(S.id), "historique"));
        hist.forEach((x) => {
          b.set(doc2(collection(db, "clients", String(K.id), "historique")), { ...x.data(), fusionDe: S.code });
          b.delete(x.ref);
        });
        b.set(doc2(collection(db, "clients", String(K.id), "historique")), {
          date: Date.now(),
          points: dir,
          type: "reprise",
          motif: "fusion de la carte " + S.code,
          reste,
          ...(tot - dir ? { attente: tot - dir } : {}),
          source: "admin",
        });
        // v2.46e : la carte fusionnée devient un simple renvoi (aucune donnée personnelle) :
        // le téléphone qui l'utilisait bascule tout seul sur la carte gardée.
        b.set(doc2(db, "clients", String(S.id)), { fusionneVers: String(K.id), fusionLe: Date.now(), code: S.code });
      }
      b.update(doc2(db, "clients", String(K.id)), {
        ...maj,
        reste,
        ...(ajout ? { tampons: increment(ajout) } : {}),
        ...(attente ? { bonusAttente: increment(attente) } : {}),
        ...(cadeaux ? { cadeaux: increment(cadeaux) } : {}),
        ...(points ? { points: increment(points) } : {}),
      });
      await b.commit();
      ft("Cartes regroupées sur " + K.code + " ✓");
    } catch {
      ft("Fusion impossible : vérifiez la connexion et réessayez.");
    }
    setFusionEnCours(null);
  };
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
            "Même téléphone ou même e-mail. « Fusionner » garde la carte reliée au téléphone du client (📱) et y ajoute les tampons, la cagnotte et l'historique de l'autre, puis supprime l'autre.",
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
              // v2.46d : regrouper les deux cartes en une seule
              h(
                "button",
                {
                  className: "btn gh",
                  style: { marginTop: 6, padding: "7px 12px", fontSize: 13, width: "auto" },
                  // v2.46e : attendre la liste des téléphones (📱) pour choisir la bonne carte à garder
                  disabled: fusionEnCours !== null || appareils === null,
                  onClick: () => fusionner(g, k),
                },
                fusionEnCours === k ? "Fusion…" : "Fusionner (garder " + aGarder(g).code + ")",
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

// ─────────────────────────────────────────────────────────────────────────────
// v3.1 : EXPORT COMPTABLE (fichier CSV pour l'application de gestion de Marion).
// Une ligne par opération, sans nom de client. Chaque période n'est exportée qu'une fois :
// - passages en caisse : fenêtre de dates qui reprend le lendemain du dernier export ;
// - commandes remises et réservations retirées : marquées « exportCompta » une fois exportées.
// Chaque ligne porte une référence unique et stable (l'import peut ignorer celles déjà connues).
// ─────────────────────────────────────────────────────────────────────────────
var jourIso = (t) => new Date(t).toLocaleDateString("sv-SE"),
  lendemainIso = (s) => {
    let d = new Date(s + "T12:00");
    return d.setDate(d.getDate() + 1), jourIso(d);
  },
  hierIso = () => {
    let d = new Date();
    return d.setDate(d.getDate() - 1), jourIso(d);
  },
  finMoisDernierIso = () => {
    let d = new Date();
    return jourIso(new Date(d.getFullYear(), d.getMonth(), 0, 12));
  },
  dateFr = (s) => (s ? new Date(s + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : ""),
  nombreCsv = (n) => (n === "" || n == null || isNaN(n) ? "" : (Math.round(Number(n) * 100) / 100).toFixed(2).replace(".", ",")),
  champCsv = (v) => {
    let s = String(v ?? "").replace(/\r?\n/g, " ");
    return /[;"]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };

// Rassemble les lignes de la période [du ; au] (dates au format AAAA-MM-JJ).
async function lignesExportCompta(d, du, au, tva, depuis = "") {
  let t0 = new Date(du + "T00:00:00").getTime(),
    t1 = new Date(au + "T23:59:59.999").getTime(),
    ht = (ttc) => (ttc === "" ? "" : Math.round((ttc / (1 + tva / 100)) * 100) / 100),
    lignes = [],
    ajoute = (date, type, libelle, qte, ttc, statut, ref) =>
      lignes.push({ date, type, libelle, qte, ttc, tva: ttc === "" ? "" : tva, ht: ht(ttc), statut, ref });
  // 1. Passages en caisse (historique de chaque carte, dans la fenêtre de dates)
  for (const c of d.clients || []) {
    let s = await getDocs(
      query(collection(db, "clients", String(c.id), "historique"), where("date", ">=", t0), where("date", "<=", t1)),
    );
    s.forEach((x) => {
      let h = x.data(),
        j = jourIso(h.date),
        m = h.montant != null && h.montant !== "" ? Number(h.montant) : "";
      if ((h.type === "tampon" || h.type === "achat") && m !== "" && !isNaN(m))
        ajoute(j, "passage_caisse", "Passage en caisse (client fidélité)", 1, m, "encaisse", "PASS-" + x.id);
      else if (h.type === "annulation" && h.motif !== "parrainage")
        ajoute(j, "annulation_passage", "Annulation d'un passage en caisse", 1, m === "" ? "" : m, "annule", "ANN-" + x.id);
      else if (h.type === "recompense" || h.type === "recompense1")
        ajoute(j, "cadeau_fidelite", h.type === "recompense1" ? "Cadeau fidélité (1er palier)" : "Cadeau fidélité", 1, "", "offert", "CAD-" + x.id);
    });
  }
  // 2. Commandes remises au client, pas encore exportées
  let cmds = (d.commandes || []).filter((c) => c.statut === "remise" && !c.exportCompta && (er(c) || "") >= depuis && (er(c) || "") <= au),
    resas = (d.resas || []).filter((r) => r.statut === "retiree" && !r.exportCompta && (r.jour || jourIso(r.cree || 0)) >= depuis && (r.jour || jourIso(r.cree || 0)) <= au);
  cmds.forEach((c) =>
    ajoute(
      er(c) || jourIso(c.cree || Date.now()),
      "commande",
      "Commande " + (c.numero || "") + " : " + c.lignes.map((l) => l.nom).join(", "),
      c.lignes.length || 1,
      Number(c.total) || 0,
      "remise",
      "CMD-" + c.id,
    ),
  );
  // 3. Réservations retirées, pas encore exportées
  resas.forEach((r) =>
    ajoute(
      r.jour || jourIso(r.cree || Date.now()),
      "reservation",
      "Réservation " + (r.numero || "") + " : " + String(r.titre || ""),
      Number(r.qte) || 1,
      Number(r.total) || Math.round((Number(r.prix) || 0) * (Number(r.qte) || 1) * 100) / 100,
      "retiree",
      "RES-" + r.id,
    ),
  );
  lignes.sort((a, b) => a.date.localeCompare(b.date) || a.ref.localeCompare(b.ref));
  return { lignes, cmds, resas };
}

function texteCsvCompta(lignes) {
  let tete = ["date", "type", "libelle", "quantite", "montant_ttc", "taux_tva", "montant_ht", "statut", "reference"];
  return (
    "﻿" +
    [tete.join(";")]
      .concat(
        lignes.map((l) =>
          [l.date, l.type, l.libelle, l.qte, nombreCsv(l.ttc), l.tva === "" ? "" : nombreCsv(l.tva), nombreCsv(l.ht), l.statut, l.ref]
            .map(champCsv)
            .join(";"),
        ),
      )
      .join("\r\n") +
    "\r\n"
  );
}

function ExportCompta({ d, set }) {
  let ex = d.exportCompta || {},
    dejaFait = !!ex.jusquau,
    hier = hierIso(),
    [debut, setDebut] = (0, React.useState)(ex.jusquau ? lendemainIso(ex.jusquau) : ""),
    du = ex.jusquau ? lendemainIso(ex.jusquau) : debut,
    finMois = finMoisDernierIso(),
    [au, setAu] = (0, React.useState)(finMois >= du && finMois <= hier ? finMois : hier),
    [tva, setTva] = (0, React.useState)(ex.tva ?? 5.5),
    [prep, setPrep] = (0, React.useState)(null),
    [occupe, setOccupe] = (0, React.useState)(""),
    possible = !!du && du <= hier,
    periodeOk = possible && au >= du && au <= hier,
    preparer = async () => {
      if (!periodeOk) return;
      setOccupe("prep");
      try {
        let t = Math.max(0, Math.min(30, Number(String(tva).replace(",", ".")) || 0)),
          r = await lignesExportCompta(d, du, au, t, ex.depuis || du),
          nom = "epicerie-export-" + du + "_au_" + au + ".csv";
        setPrep({ ...r, du, au, tva: t, nom, texte: texteCsvCompta(r.lignes), telecharge: !1 });
      } catch {
        ft("Préparation impossible : vérifiez la connexion et réessayez.");
      }
      setOccupe("");
    },
    telecharger = async () => {
      let f = new File([prep.texte], prep.nom, { type: "text/csv" });
      try {
        if (navigator.canShare?.({ files: [f] })) {
          await navigator.share({ files: [f], title: prep.nom });
          return setPrep((p) => ({ ...p, telecharge: !0 }));
        }
      } catch (e) {
        if (e?.name === "AbortError") return;
      }
      let a = document.createElement("a");
      (a.href = URL.createObjectURL(f)), (a.download = prep.nom), document.body.appendChild(a), a.click(), a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 4e3), setPrep((p) => ({ ...p, telecharge: !0 }));
    },
    valider = async () => {
      if (
        !(await De(
          "Confirmez-vous avoir bien reçu le fichier ? La période du " + dateFr(prep.du) + " au " + dateFr(prep.au) + " ne pourra plus être exportée.",
          { ok: "Oui, je l'ai" },
        ))
      )
        return;
      setOccupe("valid");
      try {
        // commandes et réservations marquées exportées (par paquets de 400)
        let docs = [...prep.cmds.map((c) => doc2(db, "commandes", String(c.id))), ...prep.resas.map((r) => doc2(db, "resas", String(r.id)))];
        for (let i = 0; i < docs.length; i += 400) {
          let b = writeBatch(db);
          docs.slice(i, i + 400).forEach((x) => b.update(x, { exportCompta: prep.au })), await b.commit();
        }
        await set("exportCompta", (o) => ({
          ...(o || {}),
          depuis: (o && o.depuis) || prep.du,
          jusquau: prep.au,
          tva: prep.tva,
          journal: [...((o && o.journal) || []), { du: prep.du, au: prep.au, le: Date.now(), n: prep.lignes.length }].slice(-24),
        }));
        setPrep(null), ft("Période enregistrée comme exportée ✓");
      } catch {
        ft("Enregistrement impossible : vérifiez la connexion. Rien n'a été marqué comme exporté.");
      }
      setOccupe("");
    },
    total = prep ? prep.lignes.reduce((s, l) => s + (l.ttc === "" ? 0 : Number(l.ttc)), 0) : 0,
    h = React.default.createElement;
  return h(
    "div",
    { className: "card", style: { marginTop: 14 } },
    h("div", { className: "nm" }, "📤 Export comptable"),
    h(
      "div",
      { className: "de", style: { marginBottom: 10 } },
      "Un fichier CSV (aussi lisible dans Excel) avec les passages en caisse des clients fidélité, les commandes remises et les réservations retirées, sans nom de client. Chaque période ne s'exporte qu'une fois.",
    ),
    !prep &&
      h(
        React.default.Fragment,
        null,
        dejaFait
          ? h("div", { className: "de" }, "Dernier export jusqu'au ", h("b", null, dateFr(ex.jusquau)), ". Le prochain commence le ", h("b", null, dateFr(du)), ".")
          : h(
              React.default.Fragment,
              null,
              h("label", { className: "lab" }, "Premier export : à partir du"),
              h("input", { className: "inp", type: "date", max: hier, value: debut, onChange: (e) => setDebut(e.target.value) }),
            ),
        possible
          ? h(
              React.default.Fragment,
              null,
              h("label", { className: "lab", style: { marginTop: 10 } }, "Jusqu'au (journées terminées seulement)"),
              h(
                "div",
                { style: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 6 } },
                finMois >= du &&
                  finMois <= hier &&
                  h("button", { className: "btn gh sm", style: { width: "auto" }, onClick: () => setAu(finMois) }, "Fin du mois dernier"),
                h("button", { className: "btn gh sm", style: { width: "auto" }, onClick: () => setAu(hier) }, "Hier"),
              ),
              h("input", { className: "inp", type: "date", min: du, max: hier, value: au, onChange: (e) => setAu(e.target.value) }),
              h("label", { className: "lab", style: { marginTop: 10 } }, "Taux de TVA pour le calcul du HT (%)"),
              h("input", { className: "inp", inputMode: "decimal", value: tva, onChange: (e) => setTva(e.target.value), style: { maxWidth: 120 } }),
              h(
                "button",
                { className: "btn", style: { marginTop: 12 }, disabled: !periodeOk || !!occupe, onClick: preparer },
                occupe === "prep" ? "Préparation…" : "Préparer le fichier (" + dateFr(du) + " → " + dateFr(au) + ")",
              ),
            )
          : du &&
            h("div", { className: "de", style: { marginTop: 8 } }, "Rien à exporter pour l'instant : la période suivante commence ", dateFr(du), "."),
      ),
    prep &&
      h(
        React.default.Fragment,
        null,
        h(
          "div",
          { className: "de", style: { marginBottom: 10 } },
          "Du ", h("b", null, dateFr(prep.du)), " au ", h("b", null, dateFr(prep.au)), " : ",
          h("b", null, prep.lignes.length, " ligne(s)"), " · total ", h("b", null, nombreCsv(total), " € TTC"), ".",
        ),
        h("button", { className: "btn", onClick: telecharger }, "⬇️ Enregistrer le fichier"),
        prep.telecharge &&
          h(
            "button",
            { className: "btn", style: { marginTop: 8, background: "var(--forest)" }, disabled: !!occupe, onClick: valider },
            occupe === "valid" ? "Enregistrement…" : "✓ J'ai bien reçu le fichier",
          ),
        h("button", { className: "btn gh", style: { marginTop: 8 }, disabled: !!occupe, onClick: () => setPrep(null) }, "Annuler (rien n'est marqué)"),
      ),
    !!(ex.journal || []).length &&
      h(
        "div",
        { style: { marginTop: 12 } },
        h("div", { className: "lab" }, "Exports déjà faits"),
        [...ex.journal].reverse().slice(0, 6).map((j, i) =>
          h("div", { key: i, className: "de" }, "• Du ", dateFr(j.du), " au ", dateFr(j.au), " — ", j.n, " ligne(s), fait le ", new Date(j.le).toLocaleDateString("fr-FR")),
        ),
      ),
  );
}
