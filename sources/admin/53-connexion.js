/* ═══════════════════════════════════════════════════════════════════════
 *  CONNEXION — accès réservé au compte de l'épicerie.
 * ═══════════════════════════════════════════════════════════════════════ */

// Messages d'erreur de connexion en français.
var msgErreur = (t) =>
  ({
    "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
    "auth/wrong-password": "E-mail ou mot de passe incorrect.",
    "auth/user-not-found": "E-mail ou mot de passe incorrect.",
    "auth/invalid-email": "Adresse e-mail invalide.",
    "auth/too-many-requests": "Trop de tentatives. Patientez quelques minutes.",
    "auth/network-request-failed": "Pas de connexion internet.",
  })[t?.code] || "Connexion impossible. Réessayez.";

// ── Connexion (même compte que l'administration) ──
function Connexion() {
  let [email, setEmail] = (0, React.useState)(""),
    [mdp, setMdp] = (0, React.useState)(""),
    [err, setErr] = (0, React.useState)(""),
    [info, setInfo] = (0, React.useState)(""),
    [load, setLoad] = (0, React.useState)(!1),
    h = async () => {
      if (!(!email.trim() || !mdp || load)) {
        setErr(""), setInfo(""), setLoad(!0);
        try {
          await signInWithEmailAndPassword(auth, email.trim(), mdp);
        } catch (m) {
          setErr(msgErreur(m)), setLoad(!1);
        }
      }
    },
    p = async () => {
      if ((setErr(""), setInfo(""), !email.trim())) return setErr("Saisissez d'abord votre adresse e-mail.");
      try {
        await sendPasswordResetEmail(auth, email.trim()),
          setInfo("Si ce compte existe, un e-mail de réinitialisation vient d'être envoyé.");
      } catch (m) {
        setErr(msgErreur(m));
      }
    };
  return React.default.createElement(
    "div",
    { className: "adm" },
    React.default.createElement("style", null, CSS_ADMIN),
    React.default.createElement(
      "div",
      { className: "wrap", style: { paddingTop: 48 } },
      React.default.createElement(
        "div",
        { style: { textAlign: "center", marginBottom: 26 } },
        React.default.createElement("img", {
          src: LOGO,
          alt: "",
          style: { width: 92, height: 92, borderRadius: "50%", border: "3px solid #EEF3E2" },
        }),
        React.default.createElement("div", { className: "t1", style: { marginTop: 12 } }, "Administration"),
        React.default.createElement(
          "div",
          { style: { fontSize: 12.5, color: "var(--ink3)", marginTop: 6 } },
          "Épicerie Raddonnaise — accès réservé · v",
          VERSION,
        ),
      ),
      React.default.createElement("label", { className: "lab" }, "E-mail"),
      React.default.createElement("input", {
        className: "inp",
        type: "email",
        autoComplete: "username",
        value: email,
        onChange: (m) => setEmail(m.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "Mot de passe"),
      React.default.createElement("input", {
        className: "inp",
        type: "password",
        autoComplete: "current-password",
        value: mdp,
        onChange: (m) => setMdp(m.target.value),
        onKeyDown: (m) => m.key === "Enter" && h(),
      }),
      err &&
        React.default.createElement(
          "div",
          { style: { color: "var(--red)", fontSize: 12.5, fontWeight: 700, marginTop: 10 } },
          err,
        ),
      info &&
        React.default.createElement(
          "div",
          { style: { color: "var(--apple)", fontSize: 12.5, fontWeight: 700, marginTop: 10 } },
          info,
        ),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 16 }, disabled: load || !email.trim() || !mdp, onClick: h },
        load ? "Connexion…" : "Se connecter",
      ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { marginTop: 8 }, onClick: p },
        "Mot de passe oublié",
      ),
    ),
  );
}

// Écran d'attente (chargement / accès refusé).
var Attente = ({ t }) =>
  React.default.createElement(
    "div",
    { className: "adm" },
    React.default.createElement("style", null, CSS_ADMIN),
    React.default.createElement(
      "div",
      {
        style: {
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ink3)",
          fontSize: 13,
          fontWeight: 700,
        },
      },
      t,
    ),
  );
