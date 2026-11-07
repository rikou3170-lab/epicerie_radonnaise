/* ═══════════════════════════════════════════════════════════════════════
 *  RÉSERVATIONS ANTI-GASPI — liste des réservations et champs « réservable » des articles du jour.
 * ═══════════════════════════════════════════════════════════════════════ */

// v2.42 : vente au kilo (unité « kg ») et libellé des réservations au poids (« Mandarines · 1,1 kg »).
const auKilo = (t) => /^\s*(le\s+)?(kg|kilo|kilos|kilogrammes?)\s*$/i.test(String(t?.unite || "")),
  libelleResa = (r) => (/ · \d+(,\d+)? k?g$/.test(String(r.titre || "")) ? r.titre : r.qte + " × " + r.titre);

// Réservations anti-gaspi (promos, dates courtes, paniers)
function Reservations({ d: t }) {
  let [e, n] = (0, React.useState)(!1),
    [r, i] = (0, React.useState)(null),
    s = [...t.resas].sort((h, p) => (p.cree || 0) - (h.cree || 0)),
    o = s.filter((h) => h.statut === "reservee"),
    a = s.filter((h) => h.statut !== "reservee").slice(0, e ? 50 : 5),
    u = async (h, p) => {
      try {
        let m = writeBatch(db);
        m.update(doc2(db, "resas", h.id), { statut: p });
        let w = t.jour.items.find((E) => String(E.id) === String(h.item));
        p !== "retiree" &&
          w &&
          m.update(doc2(db, "jour", String(h.item)), {
            reserves: (parseInt(w.reserves) || 0) >= (h.qte || 0) ? increment(-(h.qte || 0)) : 0,
          }),
          await m.commit();
      } catch {
        ft("Modification impossible. Vérifiez la connexion.");
      }
    };
  if (!s.length) return null;
  let d = ({ r: h }) =>
    React.default.createElement(
      "div",
      { className: "card resa-adm " + h.statut, key: h.id },
      React.default.createElement(
        "div",
        { className: "row", style: { alignItems: "flex-start" } },
        React.default.createElement(
          "div",
          { style: { minWidth: 0, flex: 1 } },
          React.default.createElement(
            "div",
            { className: "nm" },
            libelleResa(h),
            h.total > 0 &&
              React.default.createElement(
                "span",
                { style: { color: "var(--apple)", marginLeft: 6 } },
                An(h.total),
              ),
          ),
          React.default.createElement(
            "div",
            { className: "de" },
            React.default.createElement("b", { style: { color: "var(--ink)" } }, h.nom),
            h.tel &&
              React.default.createElement(
                React.default.Fragment,
                null,
                " · ",
                React.default.createElement("a", { href: "tel:" + h.tel.replace(/\s/g, "") }, h.tel),
              ),
            " · ",
            h.retrait || "retrait à l'épicerie",
          ),
          React.default.createElement(
            "div",
            { className: "de" },
            "N° ",
            h.numero,
            " · réservé à ",
            new Date(h.cree || 0).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
            h.statut !== "reservee" &&
              " · " + ({ retiree: "✓ Retiré", absent: "Pas venu", annulee: "Annulé" }[h.statut] || h.statut),
          ),
        ),
      ),
      h.statut === "reservee" &&
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 6, marginTop: 8 } },
          React.default.createElement(
            "button",
            { className: "btn sm", style: { flex: 2 }, onClick: () => u(h, "retiree") },
            "✓ Retiré",
          ),
          React.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { flex: 1 },
              onClick: async () =>
                (await De("Le client n'est pas venu ? L'article sera remis en vente.")) && u(h, "absent"),
            },
            "Pas venu",
          ),
          React.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { flex: 1, color: "var(--red)" },
              onClick: async () =>
                (await De("Annuler cette réservation ? L'article sera remis en vente.")) && u(h, "annulee"),
            },
            "Annuler",
          ),
        ),
      React.default.createElement(
        "button",
        { className: "btn gh sm", style: { marginTop: 8, width: "auto" }, onClick: () => i(h) },
        "💬 Écrire au client",
        h.conv ? " (conversation en cours)" : "",
      ),
    );
  return React.default.createElement(
    "div",
    { style: { marginBottom: 16 } },
    React.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 6 } },
      "🧺 Réservations ",
      o.length ? "— " + o.length + " à retirer" : "",
    ),
    !o.length &&
      React.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 8 } },
        "Aucune réservation en attente.",
      ),
    React.default.createElement(
      "div",
      { className: "grille" },
      o.map((h) => React.default.createElement(d, { r: h, key: h.id })),
    ),
    !!a.length &&
      React.default.createElement(
        "details",
        { style: { marginTop: 6 } },
        React.default.createElement(
          "summary",
          { className: "de", style: { cursor: "pointer" } },
          "Historique récent",
        ),
        React.default.createElement(
          "div",
          { className: "grille", style: { marginTop: 6 } },
          a.map((h) => React.default.createElement(d, { r: h, key: h.id })),
        ),
        !e &&
          React.default.createElement(
            "button",
            { className: "btn gh sm", onClick: () => n(!0) },
            "Voir plus",
          ),
      ),
    r && React.default.createElement(EcrireAuClient, { d: t, cible: "resas", x: r, onClose: () => i(null) }),
  );
}

// Champs « réservable » d'un article du jour
function ChampsResa({ v, onChange }) {
  let n = (parseInt(v.stock) || 0) > 0 || v.resaOn,
    r = parseInt(v.stock) >= 999;
  return React.default.createElement(
    "div",
    { className: "choix-bloc", style: { background: "#F3F8EC", borderColor: "#D6E6C2" } },
    React.default.createElement(
      "div",
      { className: "tog", style: { borderTop: "none", paddingTop: 0 } },
      React.default.createElement(
        "div",
        null,
        React.default.createElement(
          "div",
          { style: { fontSize: 13, fontWeight: 800 } },
          "🧺 Réservable dans l'application",
        ),
        React.default.createElement(
          "div",
          { className: "de" },
          "Les clients réservent, vous mettez de côté (façon Too Good To Go)",
        ),
      ),
      React.default.createElement(
        "div",
        { className: "rt" },
        React.default.createElement(ze, {
          on: !!n,
          set: () =>
            onChange(
              n
                ? { ...v, stock: 0, resaOn: !1 }
                : { ...v, stock: "", resaOn: !0, retrait: v.retrait || "aujourd'hui avant la fermeture" },
            ),
        }),
      ),
    ),
    n &&
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, marginTop: 6 } },
        React.default.createElement(
          "div",
          { style: { width: 110, flexShrink: 0 } },
          React.default.createElement("label", { className: "lab" }, auKilo(v) ? "Dispo. (kg)" : "Quantité dispo."),
          React.default.createElement("input", {
            className: "inp",
            type: "number",
            inputMode: "numeric",
            min: "1",
            max: "998",
            // v2.43 : au kilo, Marion saisit des kilos (1,5) ; on enregistre des tranches de 100 g (15)
            ...(auKilo(v) ? { step: "0.1", inputMode: "decimal", max: "99.8" } : {}),
            value: r ? "" : auKilo(v) ? (v.stock ? (v.kgSaisie ?? String(v.stock / 10)) : "") : v.stock || "",
            placeholder: "Sans limite",
            onChange: (i) => {
              let val = i.target.value;
              if (auKilo(v)) {
                const kg = parseFloat(String(val).replace(",", "."));
                return onChange({ ...v, kgSaisie: val, stock: val.trim() === "" ? "" : String(Math.round((kg || 0) * 10)), resaOn: val.trim() !== "0" });
              }
              onChange({ ...v, stock: val, resaOn: val.trim() !== "0" });
            },
          }),
        ),
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("label", { className: "lab" }, "À retirer…"),
          React.default.createElement("input", {
            className: "inp",
            value: v.retrait || "",
            maxLength: 60,
            placeholder: "aujourd'hui entre 17h et 19h",
            onChange: (i) => onChange({ ...v, retrait: i.target.value }),
          }),
        ),
      ),
    n &&
      React.default.createElement(
        "div",
        { className: "de", style: { marginTop: 4 } },
        "Laissez la quantité vide si vous en avez beaucoup (sans limite). Tapez 0 pour arrêter les réservations.",
      ),
    n &&
      (parseInt(v.reserves) || 0) > 0 &&
      React.default.createElement(
        "div",
        { className: "de", style: { marginTop: 6 } },
        "Déjà réservés : ",
        React.default.createElement("b", null, v.reserves),
        r ? "" : " / " + v.stock,
        React.default.createElement(
          "button",
          {
            className: "lienadm",
            style: { display: "inline", marginLeft: 8 },
            onClick: async () => {
              (await De("Remettre le compteur de réservations à 0 ?")) &&
                (await R9(v.id)) &&
                onChange({ ...v, reserves: 0 });
            },
          },
          "remettre à 0",
        ),
      ),
  );
}

// Prépare un article du jour pour l'enregistrement (stock, réservations).
var iN = (t) => {
  let e = String(t.stock ?? "").trim() === "",
    n = t.resaOn && e ? 999 : Math.max(0, Math.min(999, parseInt(t.stock) || 0)),
    { resaOn: r, kgSaisie: _k, ...i } = t;
  return {
    ...i,
    stock: n,
    reserves: parseInt(t.reserves) || 0,
    retrait: n ? (t.retrait || "").trim().slice(0, 60) : "",
  };
};

// Remet à zéro le compteur de réservations d'un article.
async function R9(t) {
  if (!t) return !0;
  try {
    let e = writeBatch(db);
    return e.update(doc2(db, "jour", String(t)), { reserves: 0 }), await e.commit(), !0;
  } catch {
    return ft("Impossible de remettre le compteur à 0. Vérifiez la connexion."), !1;
  }
}
