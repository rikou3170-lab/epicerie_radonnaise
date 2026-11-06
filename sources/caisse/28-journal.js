/* ═══════════════════════════════════════════════════════════════════════
 *  JOURNAL DE CAISSE — passages du jour, recherche, annulation.
 * ═══════════════════════════════════════════════════════════════════════ */

// Badges : niveau du client et mention de parrainage.
var Sk = ({ c }) => {
    let e = Kx(c).niv;
    return e ? React.default.createElement("span", { className: "niv-b" }, e.ico, " ", e.nom) : null;
  },
  MENTION_PARRAINAGE = ({ r }) => {
    let e = r?.parr;
    return !e && !r?.k
      ? null
      : e
        ? React.default.createElement(
            "div",
            { className: "roue-l g" },
            "🤝 Parrainage : +1 tampon pour ",
            r.c.nom,
            r.filleul && !r.k ? " (gardé pour son prochain passage)" : "",
            " et +1 pour son parrain ",
            e.nom,
            e.att ? " (ajouté à son prochain passage)" : "",
          )
        : React.default.createElement(
            "div",
            { className: "roue-l g" },
            "🎂 +",
            r.k,
            " tampon",
            r.k > 1 ? "s" : "",
            " offert",
            r.k > 1 ? "s" : "",
            " (en attente depuis le dernier passage)",
          );
  },
  NE = ({ g }) =>
    g == null
      ? null
      : React.default.createElement(
          "div",
          { className: "roue-l " + (g ? "g" : "p") },
          "🎄 Roue de Noël : ",
          g ? React.default.createElement("b", null, "GAGNÉ, 1 ticket pour le tirage") : "perdu cette fois",
        );

// Journal du jour : passages, recherche, annulation d'un tampon.
function JournalCaisse({ clients, roue, script, onClose }) {
  let i = $s(roue),
    o = SE(clients, i).sort((N, v) => v.tickets - N.tickets || yi(N).localeCompare(yi(v), "fr")),
    s = o.reduce((N, v) => N + v.tickets, 0),
    a =
      i.tirages
        .filter((N) => !N.fait)
        .sort((N, v) =>
          (N.date || "9999") < (v.date || "9999") ? -1 : (N.date || "9999") > (v.date || "9999") ? 1 : 0,
        )[0] || null,
    [u, c] = (0, React.useState)("liste"),
    [d, f] = (0, React.useState)(3),
    [h, B] = (0, React.useState)(null),
    [_, b] = (0, React.useState)(""),
    O = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" }),
    C = (N) =>
      new Date(N + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }),
    m = a
      ? a.date
        ? O < a.date
          ? "Ce tirage pourra être lancé à partir du " + C(a.date) + "."
          : ""
        : "Ce tirage n'a pas encore de date : Marion doit la fixer dans l'admin (Roue de Noël)."
      : "Tous les tirages prévus sont faits. Marion peut en ajouter un dans l'admin (Roue de Noël).",
    g = () => {
      s && !m && c("annonce");
    },
    k = () => {
      f(3), c("decompte");
    };
  (0, React.useEffect)(() => {
    if (u !== "decompte") return;
    if (d === 0) {
      B(rv(o)), c("anim");
      return;
    }
    let N = setTimeout(() => f((v) => v - 1), 1e3);
    return () => clearTimeout(N);
  }, [u, d]);
  let T = async () => {
    try {
      let N = [...crypto.getRandomValues(new Uint32Array(20))]
          .map((w) => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"[w % 56])
          .join(""),
        v = a?.titre || "Tirage au sort de Noël",
        A = Date.now(),
        D = writeBatch(db);
      if (
        (D.set(doc2(db, "tirages", N), {
          cree: A,
          titre: v,
          periode: i.periode,
          gagnant: { id: h.id, prenom: h.prenom, nom: h.nom },
          total: s,
          participants: o.map((w) => ({ id: w.id, prenom: w.prenom, t: w.tickets })),
        }),
        D.set(
          CONFIG_REF,
          {
            roue: {
              ...i,
              periode: i.periode + 1,
              annonce: { prenom: h.prenom, date: A, titre: v },
              tirages: i.tirages.map((w) =>
                w.id === a?.id ? { ...w, fait: !0, gagnant: h.prenom, le: A } : w,
              ),
            },
          },
          { merge: !0 },
        ),
        await D.commit(),
        FE(script))
      )
        try {
          fetch(script + "?tirage=" + N, { method: "GET", mode: "no-cors", redirect: "follow" }).catch(
            () => {},
          );
        } catch {}
      c("fini");
    } catch {
      b(
        "Tirage non enregistré : vérifiez la connexion. Le résultat n'est pas pris en compte, relancez le tirage.",
      ),
        c("liste");
    }
  };
  return React.default.createElement(
    "div",
    { className: "cs-main" },
    React.default.createElement("style", null, iv),
    React.default.createElement("div", { className: "titre" }, "🎄 Tirage au sort de Noël"),
    u === "liste" &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(
          "div",
          { className: "sous" },
          a
            ? a.titre +
                (a.date
                  ? " · prévu le " +
                    new Date(a.date + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
                  : "")
            : "Tous les tirages prévus sont faits (Marion peut en ajouter dans l'admin).",
        ),
        React.default.createElement(
          "div",
          { className: "cadeau", style: { fontSize: 17 } },
          o.length,
          " participant",
          o.length > 1 ? "s" : "",
          " · ",
          s,
          " ticket",
          s > 1 ? "s" : "",
          " en jeu",
        ),
        React.default.createElement(
          "div",
          { className: "tir-liste" },
          o.map((N) =>
            React.default.createElement(
              "div",
              { key: N.id },
              React.default.createElement("span", null, yi(N)),
              React.default.createElement("b", null, N.tickets, " ticket", N.tickets > 1 ? "s" : ""),
            ),
          ),
        ),
        _ && React.default.createElement("div", { className: "err" }, _),
        m &&
          React.default.createElement(
            "div",
            { className: "err", style: { background: "#FFF4D6", color: "#8A5A0B", borderColor: "#E9B949" } },
            "🔒 ",
            m,
          ),
        React.default.createElement(
          "div",
          { className: "actions", style: { marginTop: 16 } },
          React.default.createElement("button", { className: "btn gh", onClick: onClose }, "Retour"),
          React.default.createElement(
            "button",
            { className: "btn terra", disabled: !s || !!m, onClick: g },
            m ? "🔒 Pas encore" : "🎡 Lancer le tirage",
          ),
        ),
        React.default.createElement(
          "div",
          { className: "regle" },
          "Le gagnant est tiré au hasard par l'appli : chaque ticket est une chance. Ici, nom et prénom s'affichent. Dans l'appli des clients, seul le prénom du gagnant est annoncé.",
        ),
      ),
    u === "annonce" &&
      React.default.createElement(
        "div",
        { className: "tir-annonce" },
        React.default.createElement("div", { className: "tir-att" }, "Attention Marion,"),
        React.default.createElement(
          "p",
          null,
          "je vais procéder au tirage au sort",
          a?.titre
            ? React.default.createElement(React.default.Fragment, null, " du « ", a.titre, " »")
            : null,
          ".",
        ),
        React.default.createElement(
          "p",
          null,
          "Celui-ci est ",
          React.default.createElement("b", null, "totalement aléatoire"),
          " : un algorithme décidera du nom du gagnant.",
        ),
        React.default.createElement(
          "div",
          { className: "cadeau", style: { fontSize: 17 } },
          o.length,
          " participant",
          o.length > 1 ? "s" : "",
          " · ",
          s,
          " ticket",
          s > 1 ? "s" : "",
          " en jeu · chaque ticket est une chance",
        ),
        React.default.createElement(
          "div",
          { className: "regle", style: { marginTop: 4 } },
          "Après le tirage, les tickets repartent à zéro.",
        ),
        React.default.createElement(
          "div",
          { className: "actions", style: { marginTop: 18 } },
          React.default.createElement(
            "button",
            { className: "btn gh", onClick: () => c("liste") },
            "Annuler",
          ),
          React.default.createElement("button", { className: "btn terra", onClick: k }, "🎲 C'est parti !"),
        ),
      ),
    u === "decompte" &&
      React.default.createElement(
        "div",
        { className: "tir-annonce" },
        React.default.createElement("div", { className: "tir-dec", key: d }, d || "🎲"),
        React.default.createElement("p", null, "Que le hasard décide…"),
      ),
    (u === "anim" || u === "fini") &&
      h &&
      React.default.createElement(TirageAuSort, { participants: o, gagnant: h, onFin: T }),
    u === "fini" &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(
          "div",
          { className: "tot", style: { marginTop: 6 } },
          yi(h),
          " est prévenu",
          "(e)",
          " par e-mail et notification.",
          React.default.createElement("br", null),
          "L'appli annonce le gagnant à tous les clients (prénom seulement).",
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: onClose },
          "Terminer",
        ),
      ),
  );
}
