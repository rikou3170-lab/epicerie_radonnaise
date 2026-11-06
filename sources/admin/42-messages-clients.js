/* ═══════════════════════════════════════════════════════════════════════
 *  MESSAGES DES CLIENTS — conversations et réponses.
 * ═══════════════════════════════════════════════════════════════════════ */

// Réponses rapides proposées dans les messages.
var REPONSES = [
  "Bonjour ! Oui, c'est possible 😊",
  "Merci pour votre message, je regarde et je vous réponds vite.",
  "C'est noté, à bientôt à l'épicerie !",
  "Désolée, ce n'est plus disponible pour le moment.",
];

// Fil d'une conversation avec un client.
function Fil({ conv, onRetour, cmd }) {
  let [msgs, setMsgs] = (0, React.useState)([]),
    [texte, setTexte] = (0, React.useState)(""),
    [envoi, setEnvoi] = (0, React.useState)(!1),
    d = (0, React.useRef)(null);
  (0, React.useEffect)(
    () =>
      onSnapshot(
        collection(db, "conversations", conv.id, "messages"),
        (m) =>
          setMsgs(
            m.docs.map((w) => ({ ...w.data(), id: w.id })).sort((w, E) => (w.date || 0) - (E.date || 0)),
          ),
        () => {},
      ),
    [conv.id],
  ),
    (0, React.useEffect)(() => {
      conv.attente &&
        setDoc(doc2(db, "conversations", conv.id), { attente: !1 }, { merge: !0 }).catch(() => {});
    }, [conv.id, conv.attente]),
    (0, React.useEffect)(() => {
      d.current?.scrollIntoView({ block: "end" });
    }, [msgs.length]);
  let h = async () => {
      let m = texte.trim().slice(0, 1e3);
      if (!(!m || envoi)) {
        setEnvoi(!0);
        try {
          let w = Date.now(),
            E = writeBatch(db);
          E.set(doc2(collection(db, "conversations", conv.id, "messages")), {
            de: "epicerie",
            texte: m,
            date: w,
          }),
            E.update(doc2(db, "conversations", conv.id), {
              maj: w,
              dernier: "Vous : " + uf(m),
              attente: !1,
            }),
            await E.commit(),
            setTexte(""),
            avertirMessage(cmd, "msg", conv.id);
        } catch {
          ft("Message non envoyé. Vérifiez la connexion et réessayez.");
        }
        setEnvoi(!1);
      }
    },
    p = "";
  return React.default.createElement(
    "div",
    { className: "fil-adm" },
    React.default.createElement(
      "div",
      { className: "fil-hd" },
      React.default.createElement("button", { className: "btn gh sm", onClick: onRetour }, "←"),
      React.default.createElement(
        "div",
        { style: { minWidth: 0 } },
        React.default.createElement("div", { className: "nm" }, conv.nom),
        React.default.createElement(
          "div",
          { className: "de" },
          conv.tel
            ? React.default.createElement("a", { href: "tel:" + conv.tel.replace(/\s/g, "") }, conv.tel)
            : "Pas de téléphone",
          " · depuis le ",
          new Date(conv.cree || Date.now()).toLocaleDateString("fr-FR"),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "fil-corps" },
      !msgs.length &&
        React.default.createElement(
          "div",
          { className: "de", style: { textAlign: "center", padding: 20 } },
          "Chargement…",
        ),
      msgs.map((m) => {
        let w = jourMsg(m.date),
          E = w !== p;
        return (
          (p = w),
          React.default.createElement(
            React.default.Fragment,
            { key: m.id },
            E && React.default.createElement("div", { className: "fil-jour" }, w),
            React.default.createElement(
              "div",
              { className: "fmsg " + (m.de === "epicerie" ? "moi" : "lui") },
              React.default.createElement("div", null, m.texte),
              React.default.createElement("small", null, heureMsg(m.date)),
            ),
          )
        );
      }),
      React.default.createElement("div", { ref: d }),
    ),
    React.default.createElement(
      "div",
      { className: "motifs", style: { margin: "8px 0" } },
      REPONSES.map((m) =>
        React.default.createElement(
          "button",
          { key: m, onClick: () => setTexte(m) },
          m.length > 34 ? m.slice(0, 32) + "…" : m,
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "fil-saisie" },
      React.default.createElement("textarea", {
        className: "inp",
        rows: 2,
        value: texte,
        maxLength: 1e3,
        placeholder: "Répondre à " + conv.nom + "…",
        onChange: (m) => setTexte(m.target.value),
        onKeyDown: (m) => {
          m.key === "Enter" &&
            !m.shiftKey &&
            window.matchMedia("(pointer:fine)").matches &&
            (m.preventDefault(), h());
        },
      }),
      React.default.createElement(
        "button",
        {
          className: "btn",
          style: { width: "auto", padding: "0 20px" },
          disabled: !texte.trim() || envoi,
          onClick: h,
        },
        "Envoyer",
      ),
    ),
  );
}

// Écran Messages (conversations des clients).
function Messages({ d: t, set }) {
  let [ouvert, setOuvert] = (0, React.useState)(null),
    i = [...t.conversations].sort((d, h) => (h.maj || 0) - (d.maj || 0)),
    s = ouvert && i.find((d) => d.id === ouvert),
    o = Date.now() - 365 * 864e5,
    a = i.filter((d) => (d.maj || 0) < o),
    u = async (d) => {
      if (
        await De(
          "Supprimer la conversation avec " +
            d.nom +
            ` ?

Le client ne verra plus ses messages.`,
        )
      )
        try {
          await nN(d.id), setOuvert(null);
        } catch {
          ft("Suppression impossible. Vérifiez la connexion.");
        }
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Messages"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Les questions de vos clients, envoyées depuis l'application.",
    ),
    s
      ? React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(Fil, { conv: s, cmd: t.cmd, onRetour: () => setOuvert(null) }),
          React.default.createElement(
            "button",
            { className: "btn gh sm", style: { marginTop: 12, color: "var(--red)" }, onClick: () => u(s) },
            "Supprimer cette conversation",
          ),
        )
      : React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            "div",
            { className: "tog card", style: { marginBottom: 12 } },
            React.default.createElement(
              "div",
              null,
              React.default.createElement(
                "div",
                { style: { fontSize: 13, fontWeight: 800 } },
                "Bouton « Une question ? » sur l'application",
              ),
              React.default.createElement(
                "div",
                { className: "de" },
                "Désactivez-le si vous ne voulez plus recevoir de messages",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: t.chat?.active !== !1,
                set: () => set("chat", (d) => ({ ...(d || {}), active: d?.active === !1 })),
              }),
            ),
          ),
          !i.length &&
            React.default.createElement(Vn, {
              t: "Aucun message pour l'instant",
              s: "Quand un client vous écrit depuis l'application, sa conversation apparaît ici.",
            }),
          React.default.createElement(
            "div",
            { className: "grille" },
            i.map((d) =>
              React.default.createElement(
                "div",
                {
                  className: "card conv" + (d.attente ? " attente" : ""),
                  key: d.id,
                  onClick: () => setOuvert(d.id),
                },
                React.default.createElement(
                  "div",
                  { className: "row" },
                  React.default.createElement(
                    "div",
                    { className: "av-conv" },
                    (d.nom || "?").trim()[0]?.toUpperCase(),
                  ),
                  React.default.createElement(
                    "div",
                    { style: { minWidth: 0, flex: 1 } },
                    React.default.createElement(
                      "div",
                      { className: "nm" },
                      d.nom,
                      d.attente &&
                        React.default.createElement(
                          "span",
                          { className: "pill promo", style: { marginLeft: 6 } },
                          "Nouveau",
                        ),
                    ),
                    React.default.createElement("div", { className: "de conv-der" }, d.dernier),
                  ),
                  React.default.createElement(
                    "div",
                    { className: "de", style: { flexShrink: 0 } },
                    d.maj ? heureMsg(d.maj) : "",
                  ),
                ),
              ),
            ),
          ),
          !!a.length &&
            React.default.createElement(
              "button",
              {
                className: "btn gh",
                style: { marginTop: 10, color: "var(--red)" },
                onClick: async () => {
                  if (
                    await De(
                      "Supprimer les " + a.length + " conversation(s) sans message depuis plus d'un an ?",
                    )
                  )
                    try {
                      for (let d of a) await nN(d.id);
                    } catch {
                      ft("Suppression interrompue. Vérifiez la connexion et recommencez.");
                    }
                },
              },
              "Supprimer les conversations de plus d'un an (",
              a.length,
              ")",
            ),
          React.default.createElement(
            "div",
            { className: "de", style: { marginTop: 8 } },
            "Données personnelles (RGPD) : les conversations sont à supprimer au plus tard 1 an après le dernier message.",
          ),
        ),
  );
}
