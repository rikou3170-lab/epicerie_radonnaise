/* ═══════════════════════════════════════════════════════════════════════
 *  MESSAGES AVEC L'ÉPICERIE — conversation du client (identifiant secret gardé sur le téléphone).
 * ═══════════════════════════════════════════════════════════════════════ */

// Messagerie : conversations reprises, lecture de la conversation du téléphone.
var pT = "epicerie-raddonnaise-conv-adoptees",
  fx = () => {
    try {
      return JSON.parse(localStorage.getItem(CHAT_KEY) || "null");
    } catch {
      return null;
    }
  },
  Tf = (t) => {
    try {
      t ? localStorage.setItem(CHAT_KEY, JSON.stringify(t)) : localStorage.removeItem(CHAT_KEY);
    } catch {}
  };

// Suit la conversation du client (identifiant secret gardé sur le téléphone)
function useChat() {
  let [moiChat, setMoiChat] = (0, React.useState)(fx),
    [msgs, setMsgs] = (0, React.useState)([]);
  (0, React.useEffect)(() => {
    if (!moiChat?.ref) {
      setMsgs([]);
      return;
    }
    let l = onSnapshot(
        collection(db, "conversations", moiChat.ref, "messages"),
        (d) =>
          setMsgs(
            d.docs.map((h) => ({ ...h.data(), id: h.id })).sort((h, f) => (h.date || 0) - (f.date || 0)),
          ),
        () => {},
      ),
      u = onSnapshot(
        doc2(db, "conversations", moiChat.ref),
        (d) => {
          !d.exists() && !d.metadata?.fromCache && (Tf(null), setMoiChat(null));
        },
        () => {},
      );
    return () => {
      l(), u();
    };
  }, [moiChat?.ref]);
  let i = msgs.filter((l) => l.de === "epicerie" && (l.date || 0) > (moiChat?.vu || 0)).length;
  return {
    moiChat,
    msgs,
    nonLus: i,
    marquerVu: () => {
      if (!moiChat) return;
      let l = { ...moiChat, vu: Date.now() };
      Tf(l), setMoiChat(l);
    },
    enregistrer: (l) => {
      Tf(l), setMoiChat(l);
    },
  };
}

// « Bonjour Marie ! » à l'ouverture.
function Salutation({ prenom, onFin, amb }) {
  let [r, i] = (0, React.useState)(!1),
    o = (0, React.useRef)(!1),
    s = () => {
      o.current || ((o.current = !0), i(!0), setTimeout(onFin, 420));
    };
  (0, React.useEffect)(() => {
    let h = setTimeout(s, mouvementReduit() ? 2200 : 4800);
    return () => clearTimeout(h);
  }, []);
  let l = new Date().getHours(),
    u = l >= 18 || l < 5 ? "Bonsoir" : "Bonjour",
    d =
      amb === "halloween"
        ? React.default.createElement(
            React.default.Fragment,
            null,
            "Joyeux",
            React.default.createElement("br", null),
            "Halloween",
          )
        : amb === "octobrerose"
          ? React.default.createElement(
              React.default.Fragment,
              null,
              "Octobre",
              React.default.createElement("br", null),
              "rose 🎀",
            )
          : nn[amb]
            ? nn[amb].pastille
            : amb === "noel"
              ? React.default.createElement(
                  React.default.Fragment,
                  null,
                  "Joyeux",
                  React.default.createElement("br", null),
                  "Noël",
                )
              : u === "Bonsoir"
                ? React.default.createElement(
                    React.default.Fragment,
                    null,
                    "Belle",
                    React.default.createElement("br", null),
                    "soirée !",
                  )
                : React.default.createElement(
                    React.default.Fragment,
                    null,
                    "Belle",
                    React.default.createElement("br", null),
                    "journée !",
                  );
  return React.default.createElement(
    "div",
    {
      className: "etq-fond" + (r ? " out" : "") + (amb ? " etq-" + amb : ""),
      onClick: s,
      role: "dialog",
      "aria-label": u + " " + prenom,
    },
    React.default.createElement(
      "div",
      { className: "etq-pend" },
      React.default.createElement("div", { className: "etq-fil" }),
      amb === "halloween" && React.default.createElement(SvgAraignee, null),
      React.default.createElement(
        "div",
        { className: "etq" },
        React.default.createElement("div", { className: "etq-trou" }),
        React.default.createElement("div", { className: "etq-bande" }, "Épicerie Raddonnaise"),
        React.default.createElement("div", { className: "etq-salut" }, u),
        React.default.createElement("div", { className: "etq-nom" }, prenom, " !"),
        React.default.createElement("div", { className: "etq-sep" }),
        React.default.createElement(
          "div",
          { className: "etq-bas" },
          React.default.createElement("div", { className: "etq-code", "aria-hidden": "true" }),
          React.default.createElement("div", { className: "etq-local" }, "Content de vous revoir"),
        ),
      ),
      React.default.createElement("div", { className: "etq-pastille" }, d),
    ),
  );
}

// v2.44 : à l'ouverture, « Bonsoir Eric » discret sur l'accueil flouté (fil doré retiré en v2.44c),
// puis l'accueil apparaît en fondu (environ 3 secondes). Remplace l'étiquette « Salutation ».
function FonduOuverture({ prenom, onFin }) {
  (0, React.useEffect)(() => {
    let h = setTimeout(onFin, mouvementReduit() ? 2200 : 2900);
    return () => clearTimeout(h);
  }, []);
  let l = new Date().getHours();
  return React.default.createElement(
    "div",
    { className: "fo-fond" + (mouvementReduit() ? " calme" : ""), "aria-hidden": "true" },
    React.default.createElement(
      "div",
      { className: "fo-mot" },
      l >= 18 || l < 5 ? "Bonsoir" : "Bonjour",
      prenom ? " " + prenom : "",
    ),
  );
}

// v2.44 : icône « Messages » de la barre du bas (la bulle flottante a été retirée).
var icoChat = (t = 21, e = "currentColor") =>
  React.default.createElement(
    "svg",
    { width: t, height: t, viewBox: "0 0 24 24", fill: "none", stroke: e, strokeWidth: "2", strokeLinejoin: "round" },
    React.default.createElement("path", { d: "M4 5h16v11H9l-5 4z" }),
    React.default.createElement("path", { d: "M8 9.5h8M8 12.5h5", strokeLinecap: "round" }),
  );

// v2.44 : petit message qui apparaît au-dessus de la barre du bas quand l'épicerie a écrit (non lu).
// Toucher → ouvre la conversation ; × ou 8 secondes → disparaît (revient au prochain message).
function PopupChat({ chat, haut, onOuvrir }) {
  let dernier = [...(chat.msgs || [])]
      .reverse()
      .find((m) => m.de === "epicerie" && (m.date || 0) > (chat.moiChat?.vu || 0)),
    cle = dernier ? String(dernier.id || dernier.date) : "",
    [ferme, setFerme] = (0, React.useState)("");
  (0, React.useEffect)(() => {
    if (!cle || ferme === cle) return;
    let h = setTimeout(() => setFerme(cle), 8e3);
    return () => clearTimeout(h);
  }, [cle, ferme]);
  if (!dernier || ferme === cle) return null;
  let texte = String(dernier.texte || "").replace(/\s+/g, " ").trim();
  return React.default.createElement(
    "div",
    {
      key: cle,
      className: "popup-chat" + (haut ? " haut" : ""),
      role: "button",
      tabIndex: 0,
      onClick: () => (setFerme(cle), onOuvrir()),
    },
    React.default.createElement("span", { className: "pc-ic" }, icoChat(20, "#fff")),
    React.default.createElement(
      "span",
      { className: "pc-txt" },
      React.default.createElement("b", null, "Message de l'épicerie", chat.nonLus > 1 ? " (" + chat.nonLus + ")" : ""),
      React.default.createElement("span", null, texte.length > 90 ? texte.slice(0, 88) + "…" : texte),
    ),
    React.default.createElement(
      "button",
      {
        className: "pc-x",
        "aria-label": "Fermer",
        onClick: (e) => {
          e.stopPropagation(), setFerme(cle);
        },
      },
      "×",
    ),
  );
}

// Bulle des messages (avec nombre de non lus).
function BulleChat({ nonLus, haut, onClick }) {
  let [petit, setPetit] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(() => {
      let o = setTimeout(() => setPetit(!0), 5e3),
        s = () => {
          window.scrollY > 30 && setPetit(!0);
        };
      return (
        window.addEventListener("scroll", s, { passive: !0 }),
        () => {
          clearTimeout(o), window.removeEventListener("scroll", s);
        }
      );
    }, []),
    React.default.createElement(
      "button",
      {
        className: "bulle-chat" + (haut ? " haut" : "") + (petit && !nonLus ? " petit" : ""),
        onClick,
        "aria-label": "Parlez avec nous",
      },
      React.default.createElement(
        "svg",
        {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinejoin: "round",
        },
        React.default.createElement("path", { d: "M4 5h16v11H9l-5 4z" }),
        React.default.createElement("path", { d: "M8 9.5h8M8 12.5h5", strokeLinecap: "round" }),
      ),
      React.default.createElement("span", { className: "bc-txt" }, "Parlez avec nous"),
      nonLus > 0 && React.default.createElement("b", null, nonLus),
    )
  );
}

// Conversation avec l'épicerie.
function Messagerie({ d: t, moi, chat, onClose, ouvrirLegal, notifs, inst }) {
  let { moiChat: l, msgs: u, marquerVu: d, enregistrer: h } = chat,
    [nom, setNom] = (0, React.useState)(Sf().prenom || moi?.nom || ""),
    [tel, setTel] = (0, React.useState)(""),
    [texte, setTexte] = (0, React.useState)(""),
    [envoi, setEnvoi] = (0, React.useState)(!1),
    [err, setErr] = (0, React.useState)(""),
    z = (0, React.useRef)(null);
  (0, React.useEffect)(() => {
    d(), z.current?.scrollIntoView({ block: "end" });
  }, [u.length]);
  let j = async () => {
      let y = texte.trim().slice(0, 1e3);
      if (!(!y || envoi)) {
        if (!l && !nom.trim()) return setErr("Indiquez votre prénom pour que l'épicerie sache qui écrit.");
        setEnvoi(!0), setErr("");
        try {
          let v = Date.now(),
            w = writeBatch(db),
            k = l?.ref,
            N = !k;
          if (k) w.update(doc2(db, "conversations", k), { maj: v, dernier: U2(y), attente: !0 });
          else {
            let le = doc2(collection(db, "conversations"));
            (k = q2(le)),
              w.set(le, {
                nom: nom.trim().slice(0, 40),
                tel: tel.trim().slice(0, 20),
                cree: v,
                maj: v,
                dernier: U2(y),
                attente: !0,
              });
          }
          w.set(doc2(collection(db, "conversations", k, "messages")), { de: "client", texte: y, date: v }),
            N && h({ ref: k, nom: nom.trim(), vu: v }),
            ux("msg", k);
          let T = w.commit(),
            X = await sx(T);
          if (X === "erreur") throw (N && h(null), Cf(k), new Error("refus"));
          N && setTimeout(_c, 300),
            setTexte(""),
            X === "ok"
              ? setTimeout(() => ns(t.cmd, "msg", k), 1500)
              : (setErr("📶 Connexion faible : votre message partira dès que le réseau revient."),
                T.then(
                  () => {
                    setErr(""), ns(t.cmd, "msg", k);
                  },
                  () => {},
                ));
        } catch {
          setErr("Message non envoyé. Vérifiez votre connexion et réessayez.");
        }
        setEnvoi(!1);
      }
    },
    b = "";
  return React.default.createElement(
    "div",
    { className: "legal chat-page" },
    React.default.createElement(
      "div",
      { className: "legal-top chat-top" },
      React.default.createElement("button", { onClick: onClose, "aria-label": "Retour" }, "←"),
      React.default.createElement("img", { src: LOGO, alt: "" }),
      React.default.createElement(
        "div",
        null,
        React.default.createElement("b", null, t.store.name),
        React.default.createElement("small", null, "Répond en général dans la journée"),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "chat-fil" },
      React.default.createElement(
        "div",
        { className: "msg epicerie premier" },
        React.default.createElement(
          "div",
          { className: "txt" },
          "Bonjour 👋 Une question sur un produit, un plateau, nos horaires ? Écrivez-nous ici, on vous répond dès que possible.",
        ),
      ),
      u.map((y) => {
        let v = jourMsg(y.date),
          w = v !== b;
        return (
          (b = v),
          React.default.createElement(
            React.default.Fragment,
            { key: y.id },
            w && React.default.createElement("div", { className: "chat-jour" }, v),
            React.default.createElement(
              "div",
              { className: "msg " + (y.de === "epicerie" ? "epicerie" : "client") },
              React.default.createElement("div", { className: "txt" }, y.texte),
              React.default.createElement("div", { className: "h" }, heureMsg(y.date)),
            ),
          )
        );
      }),
      l &&
        notifs &&
        React.default.createElement(
          "div",
          { style: { margin: "8px 0" } },
          React.default.createElement(BlocNotifications, { n: notifs, compact: !0 }),
        ),
      React.default.createElement("div", { ref: z }),
    ),
    React.default.createElement(
      "div",
      { className: "chat-saisie" },
      !l && React.default.createElement(ConseilInstallCommande, { inst, quoi: "votre conversation" }),
      !l &&
        React.default.createElement(
          "div",
          { className: "chat-ident" },
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8 } },
            React.default.createElement("input", {
              className: "inp",
              value: nom,
              maxLength: 40,
              placeholder: "Votre prénom",
              onChange: (y) => setNom(y.target.value),
              autoComplete: "given-name",
            }),
            React.default.createElement("input", {
              className: "inp",
              type: "tel",
              value: tel,
              maxLength: 20,
              placeholder: "Téléphone (facultatif)",
              onChange: (y) => setTel(y.target.value),
              autoComplete: "tel",
            }),
          ),
          React.default.createElement(
            "div",
            { className: "chat-rgpd" },
            "Vos messages servent uniquement à échanger avec l'épicerie. ",
            React.default.createElement(
              "button",
              { className: "lien", onClick: () => ouvrirLegal("confidentialite") },
              "En savoir plus",
            ),
          ),
        ),
      err && React.default.createElement("div", { className: "manque", style: { margin: "0 0 6px" } }, err),
      React.default.createElement(
        "div",
        { className: "chat-ligne" },
        React.default.createElement("textarea", {
          className: "inp",
          rows: 1,
          value: texte,
          maxLength: 1e3,
          placeholder: "Votre message…",
          onChange: (y) => setTexte(y.target.value),
          onKeyDown: (y) => {
            y.key === "Enter" &&
              !y.shiftKey &&
              window.matchMedia("(pointer:fine)").matches &&
              (y.preventDefault(), j());
          },
        }),
        React.default.createElement(
          "button",
          { className: "chat-env", disabled: !texte.trim() || envoi, onClick: j, "aria-label": "Envoyer" },
          React.default.createElement(
            "svg",
            { width: "22", height: "22", viewBox: "0 0 24 24", fill: "currentColor" },
            React.default.createElement("path", { d: "M3 20.5 21 12 3 3.5l2.5 7.2L14 12l-8.5 1.3z" }),
          ),
        ),
      ),
    ),
  );
}
