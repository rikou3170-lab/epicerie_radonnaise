/* ═══════════════════════════════════════════════════════════════════════
 *  TABLEAU DE BORD — accueil de Marion, statistiques, message à l'ouverture, communication, messages aux clients.
 * ═══════════════════════════════════════════════════════════════════════ */

// Accueil de l'administration : « Bonjour Marion », à faire (commandes, réservations, messages), raccourcis.
function TableauDeBord({ d, set, aller }) {
  // v2.44 : les plats du menu à confirmer passent en premier (le client attend la réponse)
  let aConfirmer = d.resas.filter((a) => a.statut === "reservee" && estMenuResa(a) && !a.confirme).length,
    r = d.resas.filter((a) => a.statut === "reservee").length - aConfirmer,
    i = d.conversations.filter((a) => a.attente).length,
    s = d.commandes.filter((a) => a.statut === "nouvelle").length,
    o = !r && !i && !s && !aConfirmer;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Bonjour Marion"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Tout ce que vous modifiez ici apparaît aussitôt dans l'application de vos clients.",
    ),
    React.default.createElement("div", { className: "nm", style: { margin: "4px 0 8px" } }, "À faire"),
    !!aConfirmer &&
      React.default.createElement(
        "button",
        {
          className: "card carte-lien",
          style: { background: "#FBEFE4", borderColor: "#E7B98C", borderWidth: 2 },
          onClick: () => aller("jour"),
        },
        React.default.createElement(
          "div",
          { className: "nm" },
          "🍽️ ",
          aConfirmer,
          aConfirmer > 1 ? " réservations de plats du menu à confirmer" : " réservation de plat du menu à confirmer",
        ),
        React.default.createElement("div", { className: "de" }, "Le client attend votre réponse · Ouvrir Aujourd'hui →"),
      ),
    !!s &&
      React.default.createElement(
        "button",
        {
          className: "card carte-lien",
          style: { background: "#FBEFE4", borderColor: "#F0D7BF" },
          onClick: () => aller("commandes"),
        },
        React.default.createElement(
          "div",
          { className: "nm" },
          "📋 ",
          s,
          " commande(s) de plateaux à accepter ou refuser",
        ),
        React.default.createElement("div", { className: "de" }, "Ouvrir les commandes →"),
      ),
    !!i &&
      React.default.createElement(
        "button",
        {
          className: "card carte-lien",
          style: { background: "#FBEFE4", borderColor: "#F0D7BF" },
          onClick: () => aller("messages"),
        },
        React.default.createElement(
          "div",
          { className: "nm" },
          "💬 ",
          i,
          " message(s) de client en attente de réponse",
        ),
        React.default.createElement("div", { className: "de" }, "Ouvrir les messages →"),
      ),
    !!r &&
      React.default.createElement(
        "button",
        {
          className: "card carte-lien",
          style: { background: "#E3F1E3", borderColor: "#C5E1C5" },
          onClick: () => aller("jour"),
        },
        React.default.createElement(
          "div",
          { className: "nm" },
          "🧺 ",
          r,
          " réservation(s) à mettre de côté",
        ),
        React.default.createElement("div", { className: "de" }, "Ouvrir Aujourd'hui →"),
      ),
    React.default.createElement(
      "button",
      {
        className: "card carte-lien",
        style: {
          background: d.jour?.maj === aujourdhui() ? "#EEF3E2" : "#FDF6EE",
          borderColor: d.jour?.maj === aujourdhui() ? "#CFE0AE" : "#EFDCC6",
        },
        onClick: () => aller("jour"),
      },
      React.default.createElement(
        "div",
        { className: "nm" },
        d.jour?.maj === aujourdhui() ? "✅ Publication du jour faite" : "🥕 Pensez à publier le jour",
      ),
      React.default.createElement(
        "div",
        { className: "de" },
        d.jour?.maj ? "Dernière mise à jour : " + d.jour.maj : "Aucune publication pour l'instant",
      ),
    ),
    o &&
      React.default.createElement(
        "div",
        { className: "de", style: { margin: "0 2px 12px" } },
        "Rien d'autre en attente. Bonne journée !",
      ),
    React.default.createElement(
      "div",
      { className: "nm", style: { margin: "14px 0 8px" } },
      "En ligne en ce moment",
    ),
    React.default.createElement(
      "div",
      { className: "grid2", style: { marginBottom: 10 } },
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, (d.jour?.items || []).filter((a) => a.active !== !1).length),
        React.default.createElement("span", null, "articles du jour"),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement(
          "b",
          null,
          d.plateaux.filter((a) => a.active !== !1).length + d.offres.filter((a) => a.active !== !1).length,
        ),
        React.default.createElement("span", null, "plateaux & paniers"),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, d.actus.filter((a) => a.active !== !1).length),
        React.default.createElement("span", null, "actualités"),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, d.pubs.filter((a) => a.active !== !1).length),
        React.default.createElement("span", null, "bannières"),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "grid2" },
      React.default.createElement(
        "button",
        { className: "card carte-lien", onClick: () => aller("com") },
        React.default.createElement("div", { className: "nm" }, "📣 Communication"),
        React.default.createElement("div", { className: "de" }, "Notifications, message d'accueil →"),
      ),
      React.default.createElement(
        "button",
        { className: "card carte-lien", onClick: () => aller("stats") },
        React.default.createElement("div", { className: "nm" }, "📊 Statistiques"),
        React.default.createElement("div", { className: "de" }, "Ventes, fréquentation, connexions →"),
      ),
    ),
  );
}

// Écran Statistiques.
function EcranStatistiques({ d }) {
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Statistiques"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Vos ventes dans l'appli et ce que regardent vos clients, pour choisir quoi mettre en avant.",
    ),
    React.default.createElement(Statistiques, { d }),
    React.default.createElement(SuiviComptes, { d }),
    React.default.createElement(Frequentation, { d }),
  );
}

// Message affiché aux clients à l'ouverture de l'appli (une fois, ou à chaque ouverture).
function MessageOuverture({ d, set }) {
  let n = { emoji: "📢", titre: "", texte: "", photo: "", frequence: "une", ...(d.popup || {}) },
    r = (o) => set("popup", (a) => ({ emoji: "📢", frequence: "une", ...(a || {}), ...o })),
    [i, s] = (0, React.useState)(!1);
  return React.default.createElement(
    "div",
    { className: "card" },
    React.default.createElement(
      "div",
      { className: "row", style: { marginBottom: 10 } },
      React.default.createElement(
        "div",
        null,
        React.default.createElement("div", { className: "nm" }, "💬 Message à l'ouverture"),
        React.default.createElement(
          "div",
          { className: "de" },
          "Une fenêtre qui s'affiche quand le client ouvre l'appli",
        ),
      ),
      React.default.createElement(
        "div",
        { className: "rt" },
        React.default.createElement(ze, { on: !!n.active, set: () => r({ active: !n.active }) }),
      ),
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 8 } },
      React.default.createElement("input", {
        className: "inp",
        value: n.emoji,
        maxLength: 4,
        onChange: (o) => r({ emoji: o.target.value }),
        style: { width: 64, textAlign: "center", fontSize: 22 },
        "aria-label": "Émoji",
      }),
      React.default.createElement("input", {
        className: "inp",
        style: { flex: 1 },
        value: n.titre,
        maxLength: 60,
        placeholder: "Ex : Fermé lundi 2 novembre",
        onChange: (o) => r({ titre: o.target.value }),
      }),
    ),
    React.default.createElement("textarea", {
      className: "inp",
      style: { marginTop: 8 },
      value: n.texte,
      maxLength: 400,
      placeholder:
        "Ex : L'épicerie sera exceptionnellement fermée lundi. Pensez à commander vos plateaux avant samedi !",
      onChange: (o) => r({ texte: o.target.value }),
    }),
    React.default.createElement(PhotoField, { value: n.photo, onChange: (o) => r({ photo: o }) }),
    React.default.createElement("label", { className: "lab" }, "Combien de fois ?"),
    React.default.createElement(
      "div",
      { className: "seg" },
      [
        ["une", "Une seule fois par client"],
        ["chaque", "À chaque ouverture"],
      ].map(([o, a]) =>
        React.default.createElement(
          "button",
          { key: o, className: n.frequence === o ? "on" : "", onClick: () => r({ frequence: o }) },
          a,
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { style: { marginTop: 8 } },
      React.default.createElement(Periode, { v: n, onChange: (o) => r(o) }),
    ),
    n.active && React.default.createElement(Pastille, { x: n, style: { marginTop: 8 } }),
    React.default.createElement(
      "button",
      {
        className: "btn gh sm",
        style: { marginTop: 10 },
        disabled: !n.titre && !n.texte,
        onClick: () => s(!0),
      },
      "Aperçu",
    ),
    React.default.createElement(
      "div",
      { className: "de", style: { marginTop: 6 } },
      "Si vous modifiez le titre ou le texte, la fenêtre s'affiche à nouveau à tous les clients.",
    ),
    i &&
      React.default.createElement(
        "div",
        { className: "pop-fond", onClick: () => s(!1) },
        React.default.createElement(
          "div",
          { className: "pop", onClick: (o) => o.stopPropagation() },
          n.photo && React.default.createElement("img", { src: n.photo, alt: "", className: "pop-ph" }),
          n.emoji && React.default.createElement("div", { className: "pop-em" }, n.emoji),
          n.titre && React.default.createElement("div", { className: "pop-t" }, n.titre),
          n.texte && React.default.createElement("div", { className: "pop-x" }, n.texte),
          React.default.createElement(
            "button",
            { className: "btn", style: { marginTop: 14 }, onClick: () => s(!1) },
            "J'en prends note",
          ),
        ),
      ),
  );
}

// Écran Communication : notifications, message à l'ouverture, bandeau d'annonce.
function Communication({ d, set }) {
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Communication"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Prévenez vos clients : une notification sur leur téléphone, ou un bandeau en haut de l'appli.",
    ),
    bw(d)
      ? React.default.createElement(PrevenirClients, { d })
      : React.default.createElement(
          "div",
          { className: "card" },
          React.default.createElement("div", { className: "nm" }, "📣 Notifications"),
          React.default.createElement(
            "div",
            { className: "de" },
            "Pas encore activées (réglage technique d'Eric).",
          ),
        ),
    React.default.createElement(MessageOuverture, { d, set }),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "row", style: { marginBottom: 10 } },
        React.default.createElement(
          "div",
          null,
          React.default.createElement("div", { className: "nm" }, "Message d'accueil"),
          React.default.createElement("div", { className: "de" }, "Bandeau en haut de l'application"),
        ),
        React.default.createElement(
          "div",
          { className: "rt" },
          React.default.createElement(ze, {
            on: d.annonce.active,
            set: () => set("annonce", (n) => ({ ...n, active: !n.active })),
          }),
        ),
      ),
      React.default.createElement("textarea", {
        className: "inp",
        placeholder: "Ex : Fermeture exceptionnelle jeudi 14 — commandes de plateaux jusqu'à mercredi soir",
        value: d.annonce.text,
        onChange: (n) => set("annonce", (r) => ({ ...r, text: n.target.value })),
      }),
      d.annonce.active && React.default.createElement(Pastille, { x: d.annonce, style: { marginTop: 8 } }),
      React.default.createElement(
        "div",
        { style: { marginTop: 8 } },
        React.default.createElement(Periode, { v: d.annonce, onChange: (n) => set("annonce", n) }),
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 7, marginTop: 9 } },
        [
          ["apple", "#6E9B3A", "Vert"],
          ["terra", "#C27B42", "Orange"],
          ["forest", "#1C433B", "Foncé"],
        ].map(([n, r, i]) =>
          React.default.createElement(
            "button",
            {
              key: n,
              onClick: () => set("annonce", (s) => ({ ...s, couleur: n })),
              style: {
                flex: 1,
                padding: "8px 0",
                borderRadius: 9,
                cursor: "pointer",
                fontFamily: "var(--body)",
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
                background: r,
                border: d.annonce.couleur === n ? "2px solid #22302A" : "2px solid transparent",
              },
            },
            i,
          ),
        ),
      ),
    ),
  );
}

// Envoie un message au client dans sa conversation (la crée si besoin) et prévient son téléphone.
// v2.44 : « plus » = champs à modifier en même temps sur la commande / réservation (ex. { confirme: true }).
async function envoyerMessageClient(t, e, n, r, plus) {
  let i = n.conv;
  if (!i) {
    let a = String(n.tel || "").replace(/\D/g, "");
    i = a.length >= 10 ? t.conversations.find((u) => String(u.tel || "").replace(/\D/g, "") === a)?.id : null;
  }
  let s = Date.now(),
    o = writeBatch(db);
  if (i) o.update(doc2(db, "conversations", i), { maj: s, dernier: "Vous : " + uf(r), attente: !1 });
  else {
    let a = doc2(collection(db, "conversations"));
    (i = a.id),
      o.set(a, {
        nom: String(n.nom || "Client").slice(0, 40),
        tel: String(n.tel || "").slice(0, 20),
        cree: s,
        maj: s,
        dernier: "Vous : " + uf(r),
        attente: !1,
        via: n.id,
      });
  }
  o.set(doc2(collection(db, "conversations", i, "messages")), { de: "epicerie", texte: r, date: s }),
    (n.conv !== i || plus) && o.update(doc2(db, e, n.id), { ...(n.conv !== i ? { conv: i } : {}), ...(plus || {}) }),
    await o.commit(),
    avertirMessage(t.cmd, "msg", i);
}

// Messages tout prêts proposés quand Marion écrit à un client (commandes, réservations).
var MESSAGES_PRETS = {
  commandes: [
    "Nous vous confirmons la bonne prise en compte de votre commande 😁",
    "Votre commande est prête, à tout à l'heure !",
    "Petit changement : il me manque un produit, je vous propose de le remplacer par… D'accord pour vous ?",
    "Pouvez-vous me rappeler à l'épicerie s'il vous plaît ?",
  ],
  resas: [
    "Nous vous confirmons la bonne prise en compte de votre réservation 😁",
    "C'est mis de côté pour vous, à tout à l'heure !",
    "Petit souci : il n'en reste plus, désolée ! Je vous préviens au prochain arrivage.",
    "N'oubliez pas de passer les chercher avant la fermeture 😊",
  ],
};

// Fenêtre « Écrire à ce client » (messages tout prêts + texte libre).
function EcrireAuClient({ d: t, cible, x, onClose }) {
  let [i, s] = (0, React.useState)(""),
    [o, a] = (0, React.useState)(!1),
    u = async () => {
      let d = i.trim().slice(0, 1e3);
      if (!(!d || o)) {
        a(!0);
        try {
          await envoyerMessageClient(t, cible, x, d), onClose(!0);
        } catch {
          ft("Message non envoyé. Vérifiez la connexion et réessayez."), a(!1);
        }
      }
    };
  return React.default.createElement(
    ut,
    { titre: "💬 Écrire à " + (x.nom || "ce client"), onClose: () => onClose(!1) },
    React.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 8 } },
      "Le message arrive dans l'application du client",
      x.tel ? " (" + x.tel + ")" : "",
      ". Vous verrez sa réponse dans l'onglet Messages.",
    ),
    React.default.createElement(
      "div",
      { className: "motifs", style: { margin: "0 0 8px" } },
      (MESSAGES_PRETS[cible] || []).map((d) =>
        React.default.createElement(
          "button",
          { key: d, onClick: () => s(d) },
          d.length > 40 ? d.slice(0, 38) + "…" : d,
        ),
      ),
    ),
    React.default.createElement("textarea", {
      className: "inp",
      rows: 4,
      autoFocus: !0,
      value: i,
      maxLength: 1e3,
      placeholder: "Votre message…",
      onChange: (d) => s(d.target.value),
    }),
    React.default.createElement(
      "button",
      { className: "btn", style: { marginTop: 10 }, disabled: !i.trim() || o, onClick: u },
      o ? "Envoi…" : "Envoyer le message",
    ),
  );
}
