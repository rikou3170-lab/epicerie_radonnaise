/* ═══════════════════════════════════════════════════════════════════════
 *  FICHE CLIENT — consultation et modification des coordonnées.
 * ═══════════════════════════════════════════════════════════════════════ */

// Prévient Marion par e-mail d'un nouveau message de client (le script relit la conversation)
var sv = ({ n: t, nb, palier }) =>
    React.default.createElement(
      "div",
      { className: "mini-t" },
      Array.from({ length: nb }, (r, i) =>
        React.default.createElement(
          "i",
          { key: i, className: i < t ? "on" : "" },
          i < t ? "🍏" : i === nb - 1 || (palier && i === palier - 1) ? "🎁" : "",
        ),
      ),
    ),
  avertirMessage = (t, e, n) => {
    if (FE(t))
      try {
        fetch(t + "?fid=" + encodeURIComponent(e) + "&e=" + n, {
          method: "GET",
          mode: "no-cors",
          redirect: "follow",
        }).catch(() => {});
      } catch {}
  },
  PE = (t) =>
    String(t || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase(),
  Tk = (t) => {
    if (t.prenom || t.nomFamille) return [t.prenom || "", t.nomFamille || ""];
    let e = String(t.nom || "")
      .trim()
      .split(/\s+/);
    return [e[0] || "", e.slice(1).join(" ")];
  };

// Fiche client : coordonnées, anniversaire, enregistrement.
function FicheClient({ c: t, t: e, onClose, onTamponner }) {
  let [i, o] = Tk(t),
    [s, a] = (0, React.useState)({ prenom: i, nomFamille: o, tel: t.tel || "", email: t.email || "" }),
    [u, c] = (0, React.useState)(""),
    d = s.prenom !== i || s.nomFamille !== o || s.tel !== (t.tel || "") || s.email !== (t.email || ""),
    f = !s.email.trim() || /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(s.email.trim()),
    h = async () => {
      if (!s.prenom.trim() || !s.nomFamille.trim() || !f)
        return c("Prénom, nom et un e-mail valide sont nécessaires.");
      c("Enregistrement…");
      try {
        let _ = s.prenom.trim().slice(0, 40),
          b = s.nomFamille.trim().slice(0, 40),
          O = writeBatch(db);
        O.update(doc2(db, "clients", String(t.id)), {
          prenom: _,
          nomFamille: b,
          nom: (_ + " " + b).slice(0, 60),
          tel: s.tel.trim().slice(0, 20),
          email: s.email.trim().toLowerCase().slice(0, 100),
        }),
          await O.commit(),
          c("✓ Fiche enregistrée");
      } catch (_) {
        c(
          _?.code === "permission-denied"
            ? "Refusé : reconnectez-vous."
            : "Non enregistré : vérifiez la connexion.",
        );
      }
    },
    B = (_, b, O, C) =>
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement("label", { className: "lab" }, b),
        React.default.createElement("input", {
          className: "inp nom",
          type: O || "text",
          value: s[_],
          placeholder: C,
          autoCapitalize: O === "email" ? "off" : "words",
          onChange: (m) => {
            a({ ...s, [_]: m.target.value }), c("");
          },
        }),
      );
  return React.default.createElement(
    "div",
    { className: "fiche-fond", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "fiche-in", onClick: (_) => _.stopPropagation() },
      React.default.createElement(
        "div",
        { className: "fiche-hd" },
        React.default.createElement(
          "div",
          null,
          React.default.createElement(
            "div",
            { className: "titre", style: { fontSize: 34, textAlign: "left" } },
            t.nom,
          ),
          React.default.createElement(
            "div",
            { className: "sous", style: { textAlign: "left", margin: 0 } },
            "Carte ",
            t.code,
            " · ",
            t.tampons || 0,
            "/",
            e.nb,
            " tampons",
            Number(t.reste) > 0 ? " · " + eurosCaisse(t.reste) + " de côté" : "",
            t.depuis ? " · depuis le " + new Date(t.depuis + "T12:00").toLocaleDateString("fr-FR") : "",
            t.derniere
              ? " · dernier passage le " + new Date(t.derniere + "T12:00").toLocaleDateString("fr-FR")
              : "",
          ),
        ),
        React.default.createElement(
          "button",
          { className: "fiche-x", onClick: onClose, "aria-label": "Fermer" },
          "✕",
        ),
      ),
      React.default.createElement(
        "div",
        { className: "fiche-g" },
        React.default.createElement("div", null, B("prenom", "Prénom", "text", "Marie")),
        React.default.createElement("div", null, B("nomFamille", "Nom", "text", "Dupont")),
        React.default.createElement("div", null, B("tel", "Téléphone", "tel", "06 12 34 56 78")),
        React.default.createElement("div", null, B("email", "E-mail", "email", "marie@exemple.fr")),
      ),
      !f && React.default.createElement("div", { className: "err" }, "Adresse e-mail incomplète."),
      u &&
        React.default.createElement(
          "div",
          {
            className: "compte",
            style: { fontWeight: 800, color: u.startsWith("✓") ? "var(--apple)" : "var(--ink2)" },
          },
          u,
        ),
      React.default.createElement(
        "div",
        { className: "actions", style: { marginTop: 16 } },
        React.default.createElement(
          "button",
          { className: "btn gh", onClick: () => onTamponner(t) },
          "🍏 Tamponner",
        ),
        React.default.createElement("button", { className: "btn", disabled: !d, onClick: h }, "Enregistrer"),
      ),
      React.default.createElement(
        "div",
        { className: "regle" },
        "Corrigez une faute ou un changement de numéro. Les tampons ne se modifient pas ici.",
      ),
    ),
  );
}
