/* ═══════════════════════════════════════════════════════════════════════
 *  CHANGER DE TÉLÉPHONE — envoi et réception de la carte, des commandes et des messages.
 * ═══════════════════════════════════════════════════════════════════════ */

// Récupère sur le nouveau téléphone la carte, les commandes et la conversation.
async function importerTransfert(t) {
  let e = { carte: !1, cmds: 0, chat: !1 };
  if (t.c) {
    let s = await getDoc(doc2(db, "clients", t.c));
    if (s.exists()) {
      let l = s.data();
      localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          ref: t.c,
          code: l.code,
          nom: l.nom,
          points: l.points || 0,
          tampons: l.tampons || 0,
        }),
      ),
        (e.carte = !0);
    }
  }
  let n = Dn(),
    r = [];
  for (let s of t.o) {
    if (n.some((d) => d.ref === s)) continue;
    let l = await getDoc(doc2(db, "commandes", s));
    if (!l.exists()) continue;
    let u = l.data();
    r.push({
      numero: u.numero,
      ref: s,
      date: u.date,
      mode: u.mode,
      total: u.total,
      resume: (u.lignes || []).map((d) => d.nom + " (" + d.personnes + " pers.)").join(", "),
      nom: u.nom,
      tel: u.tel,
      adresse: u.adresse,
      statut: u.statut,
      vu: u.statut,
    });
  }
  r.length &&
    ($a([...r, ...n].sort((s, l) => (l.date || "").localeCompare(s.date || ""))), (e.cmds = r.length));
  let i = ts(),
    o = [];
  for (let s of t.r || []) {
    if (i.some((d) => d.ref === s)) continue;
    let l = await getDoc(doc2(db, "resas", s));
    if (!l.exists()) continue;
    let u = l.data();
    o.push({
      ref: s,
      numero: u.numero,
      titre: u.titre,
      qte: u.qte,
      total: u.total,
      retrait: u.retrait,
      nom: u.nom,
      tel: u.tel,
      cree: u.cree,
      statut: u.statut,
    });
  }
  if ((o.length && (rx([...o, ...i]), (e.cmds += o.length)), t.m)) {
    let s = await getDoc(doc2(db, "conversations", t.m));
    s.exists() && (Tf({ ref: t.m, nom: s.data().nom, vu: Date.now() }), (e.chat = !0));
  }
  try {
    localStorage.setItem(BIENVENUE_KEY, "1"),
      t.p && localStorage.setItem(PRENOM_KEY, JSON.stringify({ prenom: t.p, demande: !0 }));
  } catch {}
  return e;
}

// Envoi de la carte vers un nouveau téléphone (lien / QR).
function FenetreEnvoi({ onClose }) {
  let e = (0, React.useMemo)(P9, []),
    n = location.origin + location.pathname + "#transfert=" + e,
    [copie, setCopie] = (0, React.useState)(!1);
  return React.default.createElement(
    "div",
    { className: "sheet-fond", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "sheet", onClick: (s) => s.stopPropagation() },
      React.default.createElement("h3", { className: "alerte-t" }, "Changer de téléphone"),
      e
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "p",
              { className: "tr-txt" },
              "Sur le ",
              React.default.createElement("b", null, "nouveau téléphone"),
              ", ouvrez l'appareil photo et scannez ce code : votre carte, vos commandes et vos messages seront récupérés.",
            ),
            React.default.createElement(
              "div",
              { className: "tr-qr" },
              React.default.createElement(QR, { texte: n, taille: 230 }),
            ),
            React.default.createElement(
              "button",
              {
                className: "btn gh",
                onClick: async () => {
                  try {
                    await navigator.clipboard.writeText(n), setCopie(!0);
                  } catch {
                    h0(
                      `Copiez ce lien (appui long dessus) et envoyez-le-vous par SMS ou e-mail :

` + n,
                    );
                  }
                },
              },
              copie ? "✓ Lien copié" : "Copier le lien (à s'envoyer par SMS ou e-mail)",
            ),
            React.default.createElement(
              "div",
              { className: "tr-alerte" },
              "🔒 Ce code donne accès à votre carte, vos commandes et vos messages : ne le montrez à personne d'autre.",
            ),
          )
        : React.default.createElement(
            "p",
            { className: "tr-txt" },
            "Il n'y a rien à transférer : pas encore de carte, de commande ni de message sur ce téléphone.",
          ),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 10 }, onClick: onClose },
        "Fermer",
      ),
    ),
  );
}

// Réception de la carte sur le nouveau téléphone.
function FenetreReception({ code0, onClose }) {
  let [txt, setTxt] = (0, React.useState)(code0 || ""),
    [etat, setEtat] = (0, React.useState)(""),
    [copie, setCopie] = (0, React.useState)(!1),
    s = M9(txt),
    l = async () => {
      if (s) {
        setEtat("…");
        try {
          let u = await importerTransfert(s);
          if (!u.carte && !u.cmds && !u.chat)
            return setEtat(
              "Rien n'a été trouvé : le code est peut-être trop ancien (données supprimées par l'épicerie).",
            );
          location.hash && history.replaceState(null, "", location.pathname), location.reload();
        } catch {
          setEtat("Récupération impossible : vérifiez votre connexion et réessayez.");
        }
      }
    };
  // v2.46f : sur iPhone/iPad, le QR scanné s'ouvre dans Safari, qui ne partage pas ses données avec
  // l'appli installée. On ne récupère donc pas la carte ici : on copie le lien pour le coller dans l'appli.
  if (code0 && s && G9()) {
    let lien = location.href,
      copier = async () => {
        try {
          await navigator.clipboard.writeText(lien), setCopie(!0);
        } catch {
          setCopie("manuel");
        }
      };
    return React.default.createElement(
      "div",
      { className: "sheet-fond" },
      React.default.createElement(
        "div",
        { className: "sheet", onClick: (u) => u.stopPropagation() },
        React.default.createElement("h3", { className: "alerte-t" }, "Ouvrez l'appli de l'épicerie"),
        React.default.createElement(
          "p",
          { className: "tr-txt" },
          "Ce lien s'est ouvert dans Safari. Pour retrouver votre carte ",
          React.default.createElement("b", null, "dans l'appli"),
          " :",
        ),
        React.default.createElement(
          "ol",
          { className: "tr-txt", style: { paddingLeft: 22, margin: "6px 0 12px", lineHeight: 1.5, textAlign: "left" } },
          React.default.createElement("li", null, "Touchez « Copier le lien » ci-dessous."),
          React.default.createElement("li", null, "Ouvrez l'appli de l'épicerie depuis votre écran d'accueil."),
          React.default.createElement(
            "li",
            null,
            "Onglet Infos → « Changer de téléphone » → « Récupérer depuis mon ancien téléphone » → collez le lien → « Récupérer ».",
          ),
        ),
        React.default.createElement(
          "button",
          { className: "btn", onClick: copier },
          copie === !0 ? "✓ Lien copié" : "Copier le lien",
        ),
        copie === "manuel" &&
          React.default.createElement("textarea", {
            className: "inp",
            rows: 3,
            readOnly: !0,
            value: lien,
            style: { marginTop: 8 },
            onFocus: (u) => u.target.select(),
          }),
        React.default.createElement(
          "p",
          { className: "tr-txt", style: { fontSize: 12.5, marginTop: 10 } },
          "Pas encore l'appli ? Installez-la d'abord : bouton Partager de Safari → « Sur l'écran d'accueil », puis faites les étapes 2 et 3.",
        ),
      ),
    );
  }
  return React.default.createElement(
    "div",
    { className: "sheet-fond", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "sheet", onClick: (u) => u.stopPropagation() },
      React.default.createElement("h3", { className: "alerte-t" }, "Récupérer mes données"),
      code0 && s
        ? React.default.createElement(
            "p",
            { className: "tr-txt" },
            "Ce lien vient de votre ancien téléphone. On récupère :",
            s.c &&
              React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("br", null),
                "✓ votre carte de fidélité",
              ),
            !!s.o.length &&
              React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("br", null),
                "✓ ",
                s.o.length,
                " commande",
                s.o.length > 1 ? "s" : "",
              ),
            s.m &&
              React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("br", null),
                "✓ vos messages avec l'épicerie",
              ),
          )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "p",
              { className: "tr-txt" },
              "Sur l'",
              React.default.createElement("b", null, "ancien téléphone"),
              " : onglet Infos → « Changer de téléphone » → scannez le code avec l'appareil photo de celui-ci. Ou collez ici le lien que vous vous êtes envoyé :",
            ),
            React.default.createElement("textarea", {
              className: "inp",
              rows: 3,
              value: txt,
              onChange: (u) => setTxt(u.target.value),
              placeholder: "Collez le lien ou le code de transfert",
            }),
            txt &&
              !s &&
              React.default.createElement("p", { className: "manque" }, "Ce code n'est pas reconnu."),
          ),
      etat && etat !== "…" && React.default.createElement("p", { className: "manque" }, etat),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 10 }, disabled: !s || etat === "…", onClick: l },
        etat === "…" ? "Récupération…" : "Récupérer",
      ),
      React.default.createElement(
        "button",
        {
          className: "btn gh",
          style: { marginTop: 8 },
          onClick: () => {
            location.hash && history.replaceState(null, "", location.pathname), onClose();
          },
        },
        "Annuler",
      ),
    ),
  );
}

// Modifier son prénom.
function MonPrenom({ prenom, onChange }) {
  let [ed, setEd] = (0, React.useState)(!1);
  return React.default.createElement(
    "div",
    { className: "card", style: { marginTop: 14 } },
    React.default.createElement(
      "div",
      { className: "b", style: { display: "flex", alignItems: "center", gap: 10 } },
      React.default.createElement(
        "div",
        { style: { flex: 1 } },
        React.default.createElement(
          "div",
          { style: { fontSize: 12, color: "var(--ink3)", fontWeight: 700 } },
          "Votre prénom",
        ),
        React.default.createElement(
          "div",
          { style: { fontWeight: 800, fontSize: 15 } },
          prenom || "Non renseigné",
        ),
      ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { width: "auto", padding: "9px 16px" }, onClick: () => setEd(!0) },
        prenom ? "Modifier" : "Ajouter",
      ),
      ed &&
        React.default.createElement(DemandePrenom, {
          initial: prenom,
          onFin: (i) => {
            (i || prenom) && onChange(i || prenom), setEd(!1);
          },
        }),
    ),
  );
}

// Rubrique « Changer de téléphone ».
function ChangerTelephone() {
  let [vue, setVue] = (0, React.useState)(null);
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "h3",
      { className: "h2", style: { marginTop: 18 } },
      React.default.createElement("i", null),
      "Changer de téléphone",
    ),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Gardez votre carte, vos commandes et vos messages",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "b", style: { display: "flex", flexDirection: "column", gap: 8 } },
        React.default.createElement(
          "button",
          { className: "btn gh", onClick: () => setVue("envoi") },
          "📤 Transférer vers un autre téléphone",
        ),
        React.default.createElement(
          "button",
          { className: "btn gh", onClick: () => setVue("reception") },
          "📥 Récupérer depuis mon ancien téléphone",
        ),
      ),
    ),
    vue === "envoi" && React.default.createElement(FenetreEnvoi, { onClose: () => setVue(null) }),
    vue === "reception" && React.default.createElement(FenetreReception, { onClose: () => setVue(null) }),
  );
}
