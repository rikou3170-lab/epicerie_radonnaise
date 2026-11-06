/* ═══════════════════════════════════════════════════════════════════════
 *  CONNEXION — accès réservé au compte de l'épicerie.
 * ═══════════════════════════════════════════════════════════════════════ */

// ── Connexion (même compte que l'administration) ──
function Connexion() {
  let [email, setEmail] = (0, React.useState)(""),
    [mdp, setMdp] = (0, React.useState)(""),
    [err, setErr] = (0, React.useState)(""),
    s = async () => {
      setErr("");
      try {
        await signInWithEmailAndPassword(auth, email.trim(), mdp);
      } catch (a) {
        setErr(
          a?.code === "auth/too-many-requests"
            ? "Trop d'essais : réessayez dans quelques minutes."
            : "E-mail ou mot de passe incorrect.",
        );
      }
    };
  return React.default.createElement(
    "div",
    { className: "cs-main" },
    React.default.createElement(
      "div",
      { className: "login" },
      React.default.createElement("div", { className: "titre" }, "Caisse"),
      React.default.createElement(
        "div",
        { className: "sous" },
        "Connectez-vous avec le compte de l'administration.",
      ),
      React.default.createElement("label", null, "E-mail"),
      React.default.createElement("input", {
        type: "email",
        autoComplete: "username",
        value: email,
        onChange: (a) => setEmail(a.target.value),
      }),
      React.default.createElement("label", null, "Mot de passe"),
      React.default.createElement("input", {
        type: "password",
        autoComplete: "current-password",
        value: mdp,
        onChange: (a) => setMdp(a.target.value),
        onKeyDown: (a) => a.key === "Enter" && s(),
      }),
      err && React.default.createElement("div", { className: "err" }, err),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 18 }, onClick: s },
        "Se connecter",
      ),
      React.default.createElement(
        "button",
        {
          className: "lien",
          onClick: async () => {
            if (!email.trim()) return setErr("Saisissez d'abord votre e-mail.");
            try {
              await sendPasswordResetEmail(auth, email.trim()), setErr("E-mail de réinitialisation envoyé.");
            } catch {
              setErr("Envoi impossible.");
            }
          },
        },
        "Mot de passe oublié ?",
      ),
    ),
  );
}
