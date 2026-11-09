/* ═══════════════════════════════════════════════════════════════════════
 *  FEUILLE DE PRÉPARATION (impression).
 * ═══════════════════════════════════════════════════════════════════════ */

// Protège un texte avant de l'insérer dans la page d'impression.
var esc = (t) =>
  String(t ?? "").replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);

// Feuille de préparation imprimable des commandes d'un jour.
function imprimerPreparation(t, e) {
  let n = t.commandes
      .filter((p) => (er(p) || "") === e && !["refusee", "annulee", "remise"].includes(p.statut))
      .sort((p, m) => (p.heure || "99").localeCompare(m.heure || "99")),
    r = new Date(e + "T00:00");
  r.setDate(r.getDate() - 1);
  let i = new Date(e + "T23:59:59"),
    // v2.44 : un plat du menu se prépare le jour prévu (identifiant menuAAAAMMJJ), quelle que soit la date de réservation
    s = t.resas.filter((p) =>
      p.statut === "reservee" &&
      (estMenuResa(p)
        ? String(p.item).slice(4) === e.replace(/-/g, "")
        : (p.cree || 0) >= r.getTime() && (p.cree || 0) <= i.getTime()),
    ),
    o = {};
  n.forEach((p) =>
    (p.lignes || []).forEach((m) => {
      let w = String(m.nom || "Plateau").split(" — ")[0];
      o[w] = (o[w] || 0) + (m.personnes || 0);
    }),
  );
  let a = new Date(e + "T12:00").toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    u = (p) => {
      let m = (p.remarque || "")
        .split(
          `
`,
        )
        .filter(Boolean);
      return `<div class="c"><div class="h"><span class="box"></span><b>${esc(p.heure ? lc(p.heure) : "—")}</b> · ${esc(p.nom)} · ${esc(p.tel)}
      <span class="st">${p.statut === "nouvelle" ? "⚠ À VALIDER" : esc(MODES[p.mode] || p.mode)}</span></div>
      ${p.adresse ? `<div class="ad">📍 ${esc(p.adresse)}</div>` : ""}
      <ul>${(p.lignes || []).map((w) => `<li><b>${esc(w.personnes)} pers.</b> — ${esc(w.nom)}</li>`).join("")}</ul>
      ${m.map((w) => (w.startsWith("⚠\uFE0F") ? `<div class="al">${esc(w)}</div>` : `<div class="rq">« ${esc(w)} »</div>`)).join("")}
      <div class="t">N° ${esc(p.numero)} · ${An(p.total)}</div></div>`;
    },
    d = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Préparation du ${esc(a)}</title><style>
    body{font-family:Arial,sans-serif;color:#222;margin:24px;font-size:13px}h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:22px 0 8px;border-bottom:2px solid #1C433B;padding-bottom:4px}
    .sub{color:#666;margin-bottom:10px}.c{border:1px solid #bbb;border-radius:8px;padding:10px 12px;margin-bottom:10px;page-break-inside:avoid}
    .h{font-size:14px}.box{display:inline-block;width:14px;height:14px;border:2px solid #222;border-radius:3px;vertical-align:-2px;margin-right:6px}
    .st{float:right;font-weight:bold;color:#1C433B}.ad{color:#555;margin-top:4px}ul{margin:6px 0 4px 18px;padding:0}li{margin:2px 0}
    .al{font-weight:bold;color:#a00;border:1px solid #a00;border-radius:5px;padding:4px 7px;margin:5px 0}.rq{font-style:italic;color:#444}.t{color:#666;font-size:11.5px;margin-top:4px}
    table{border-collapse:collapse}td{padding:3px 12px 3px 0}.vide{color:#888;font-style:italic}@media print{button{display:none}}
  </style></head><body>
  <button onclick="print()" style="float:right;padding:8px 16px;font-size:14px">🖨\uFE0F Imprimer</button>
  <h1>Préparation — ${esc(a)}</h1><div class="sub">${esc(t.store.name)} · éditée le ${new Date().toLocaleString("fr-FR")}</div>
  <h2>Plateaux (${n.length} commande${n.length > 1 ? "s" : ""})</h2>
  ${
    Object.keys(o).length
      ? `<table>${Object.entries(o)
          .map(([p, m]) => `<tr><td><b>${esc(p)}</b></td><td>${m} personnes au total</td></tr>`)
          .join("")}</table><br>`
      : ""
  }
  ${n.length ? n.map(u).join("") : '<p class="vide">Aucun plateau à préparer ce jour-là.</p>'}
  <h2>Réservations anti-gaspi à mettre de côté (${s.length})</h2>
  ${s.length ? s.map((p) => `<div class="c"><span class="box"></span><b>${esc(libelleResa(p))}</b> — ${esc(p.nom)} ${esc(p.tel)} · à retirer ${esc(p.retrait || "à l'épicerie")} <span class="st">${esc(p.numero)}</span></div>`).join("") : '<p class="vide">Aucune réservation en attente.</p>'}
  </body></html>`,
    h = window.open("", "_blank");
  if (!h) return ft("La fenêtre a été bloquée : autorisez les fenêtres (pop-up) pour ce site.");
  h.document.open(), h.document.write(d), h.document.close();
}

// Bouton « Feuille de préparation » (aujourd'hui / demain / date).
function BoutonPreparation({ d }) {
  let [jour, setJour] = (0, React.useState)(Bn()),
    r = (() => {
      let i = new Date();
      return i.setDate(i.getDate() + 1), i.toLocaleDateString("sv-SE");
    })();
  return React.default.createElement(
    "div",
    { className: "card prepa" },
    React.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 6 } },
      "🖨\uFE0F Feuille de préparation",
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" } },
      React.default.createElement(
        "button",
        { className: "btn sm " + (jour === Bn() ? "" : "gh"), onClick: () => setJour(Bn()) },
        "Aujourd'hui",
      ),
      React.default.createElement(
        "button",
        { className: "btn sm " + (jour === r ? "" : "gh"), onClick: () => setJour(r) },
        "Demain",
      ),
      React.default.createElement("input", {
        className: "inp",
        type: "date",
        value: jour,
        onChange: (i) => setJour(i.target.value || Bn()),
        style: { width: "auto", flex: "1 1 140px", padding: "8px 10px" },
      }),
      React.default.createElement(
        "button",
        { className: "btn terra sm", onClick: () => imprimerPreparation(d, jour) },
        "Ouvrir / imprimer",
      ),
    ),
  );
}
