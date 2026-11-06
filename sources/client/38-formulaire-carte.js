/* ═══════════════════════════════════════════════════════════════════════
 *  FORMULAIRE « MA CARTE DE FIDÉLITÉ » — création de la carte (avec garde-fou : à faire dans l'appli installée).
 * ═══════════════════════════════════════════════════════════════════════ */

// Création de la carte. Dans Facebook / Instagram, ou dans Safari sans l'appli installée (iPhone),
// explique d'abord comment installer l'appli, pour éviter les cartes en double.
function FormulaireCarte({ onDone, onCancel, ouvrirLegal }) {
  let [__q, __sq] = (0, React.useState)(!1),
    [__c, __sc] = (0, React.useState)(!1),
    [r, i] = (0, React.useState)(""),
    [o, s] = (0, React.useState)(""),
    [l, u] = (0, React.useState)(""),
    [d, h] = (0, React.useState)(""),
    [f, m] = (0, React.useState)(!1),
    [E, F] = (0, React.useState)(""),
    [D, M] = (0, React.useState)(!1),
    [C, A] = (0, React.useState)(() => {
      try {
        return localStorage.getItem(tx) || "";
      } catch {
        return "";
      }
    }),
    S = m9(C),
    [P, z] = (0, React.useState)(""),
    [j, b] = (0, React.useState)(""),
    y = P && j ? String(j).padStart(2, "0") + "-" + String(P).padStart(2, "0") : "",
    v = telValide(l),
    w = emailValide(d),
    k = r.trim() && o.trim() && v && w;
  let __p = plateforme(),
    __ni = !(window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === !0);
  if (__p.inApp || (__p.ios && __ni && !__q)) {
    let __e = (x, y) =>
      React.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            margin: "10px 0",
            fontSize: 14,
            lineHeight: 1.45,
            color: "var(--ink)",
          },
        },
        React.default.createElement(
          "span",
          {
            style: {
              flex: "none",
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "var(--forest)",
              color: "#E9B949",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
            },
          },
          x,
        ),
        React.default.createElement("div", null, y),
      );
    return React.default.createElement(
      "div",
      { className: "wrap", style: { paddingTop: 28 } },
      React.default.createElement(
        "div",
        { style: { textAlign: "center", marginBottom: 18 } },
        React.default.createElement("img", {
          src: LOGO,
          alt: "",
          style: { width: 86, height: 86, borderRadius: "50%", border: "3px solid var(--apple-soft)" },
        }),
        React.default.createElement(
          "h2",
          { style: { fontFamily: "var(--script)", fontSize: 33, color: "var(--forest)", marginTop: 12 } },
          "Ma carte de fidélité",
        ),
        React.default.createElement(
          "p",
          { style: { fontSize: 13.5, color: "var(--ink2)", lineHeight: 1.5, marginTop: 6 } },
          __p.inApp
            ? "Vous êtes dans " +
                __p.appli +
                ". Pour ne pas perdre votre carte, créez-la dans l'appli installée sur votre téléphone :"
            : "Installez d'abord l'appli sur votre écran d'accueil, puis créez votre carte dedans. Sinon, elle resterait dans Safari et vous ne la retrouveriez pas dans l'appli.",
        ),
      ),
      React.default.createElement(
        "div",
        {
          style: {
            background: "#fff",
            border: "1px solid var(--line, #E5E0D4)",
            borderRadius: 16,
            padding: "6px 16px",
            marginBottom: 16,
          },
        },
        __p.inApp
          ? __e(
              "1",
              "Touchez les 3 petits points ⋯ puis « Ouvrir dans le navigateur » (" +
                (__p.ios ? "Safari" : "Chrome") +
                ")",
            )
          : null,
        __e(
          __p.inApp ? "2" : "1",
          __p.ios
            ? "Touchez Partager ⬆\uFE0F puis « Sur l'écran d'accueil »"
            : "Touchez ⋮ puis « Installer l'application »",
        ),
        __e(__p.inApp ? "3" : "2", "Ouvrez l'appli depuis votre écran d'accueil et créez votre carte"),
      ),
      __p.inApp
        ? React.default.createElement(
            "button",
            {
              className: "btn",
              onClick: () => {
                try {
                  navigator.clipboard.writeText(location.origin + location.pathname).then(
                    () => __sc(!0),
                    () => {},
                  );
                } catch {}
              },
            },
            __c ? "Lien copié ✓" : "Copier le lien de l'appli",
          )
        : React.default.createElement(
            "button",
            { className: "btn gh", onClick: () => __sq(!0) },
            "Créer quand même ici",
          ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { marginTop: 8 }, onClick: onCancel },
        "Plus tard",
      ),
    );
  }
  return React.default.createElement(
    "div",
    { className: "wrap", style: { paddingTop: 28 } },
    React.default.createElement(
      "div",
      { style: { textAlign: "center", marginBottom: 22 } },
      React.default.createElement("img", {
        src: LOGO,
        alt: "",
        style: { width: 86, height: 86, borderRadius: "50%", border: "3px solid var(--apple-soft)" },
      }),
      React.default.createElement(
        "h2",
        { style: { fontFamily: "var(--script)", fontSize: 33, color: "var(--forest)", marginTop: 12 } },
        "Ma carte de fidélité",
      ),
      React.default.createElement(
        "p",
        { style: { fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, marginTop: 6 } },
        "Un code personnel vous est attribué. Présentez-le en caisse à chaque passage pour gagner vos tampons.",
      ),
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 10 } },
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Prénom"),
        React.default.createElement("input", {
          className: "inp",
          value: r,
          onChange: (T) => i(T.target.value),
          placeholder: "Marie",
          autoComplete: "given-name",
          autoFocus: !0,
        }),
      ),
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Nom"),
        React.default.createElement("input", {
          className: "inp",
          value: o,
          onChange: (T) => s(T.target.value),
          placeholder: "Dupont",
          autoComplete: "family-name",
        }),
      ),
    ),
    React.default.createElement("label", { className: "lab", style: { marginTop: 12 } }, "Téléphone"),
    React.default.createElement("input", {
      className: "inp",
      type: "tel",
      inputMode: "tel",
      value: l,
      onChange: (T) => u(T.target.value),
      placeholder: "06 12 34 56 78",
      autoComplete: "tel",
    }),
    l &&
      !v &&
      React.default.createElement("div", { className: "champ-err" }, "Numéro incomplet (10 chiffres)."),
    React.default.createElement("label", { className: "lab", style: { marginTop: 12 } }, "Adresse e-mail"),
    React.default.createElement("input", {
      className: "inp",
      type: "email",
      inputMode: "email",
      value: d,
      onChange: (T) => h(T.target.value),
      placeholder: "marie.dupont@exemple.fr",
      autoComplete: "email",
      autoCapitalize: "off",
    }),
    d && !w && React.default.createElement("div", { className: "champ-err" }, "Adresse e-mail incomplète."),
    React.default.createElement(
      "label",
      { className: "lab", style: { marginTop: 12 } },
      "Votre anniversaire ",
      React.default.createElement(
        "span",
        { style: { fontWeight: 600, color: "var(--ink3)" } },
        "(facultatif : un tampon offert ce jour-là 🎂)",
      ),
    ),
    React.default.createElement(ChoixAnniversaire, { j: P, m: j, setJ: z, setM: b }),
    React.default.createElement(
      "label",
      { className: "lab", style: { marginTop: 12 } },
      "Code de parrainage ",
      React.default.createElement(
        "span",
        { style: { fontWeight: 600, color: "var(--ink3)" } },
        "(facultatif)",
      ),
    ),
    React.default.createElement("input", {
      className: "inp",
      value: C,
      onChange: (T) => A(T.target.value.toUpperCase()),
      placeholder: "RAD-XXXXX",
      autoCapitalize: "characters",
      maxLength: 9,
    }),
    C &&
      !S &&
      React.default.createElement("div", { className: "champ-err" }, "Code incomplet (exemple : RAD-AB2CD)."),
    S &&
      React.default.createElement(
        "div",
        { style: { fontSize: 12, color: "var(--apple)", fontWeight: 700, marginTop: 4 } },
        "🤝 À votre premier passage en caisse, vous et votre parrain gagnez chacun 1 tampon !",
      ),
    React.default.createElement(
      "div",
      { className: "rgpd-info" },
      "Vos nom, prénom, téléphone et e-mail servent ",
      React.default.createElement("b", null, "uniquement"),
      " à gérer votre carte de fidélité (vous retrouver en caisse, vous joindre au sujet de votre carte). Ils ne sont ni revendus, ni utilisés pour de la publicité. Vous pouvez les consulter à tout moment depuis l'onglet Fidélité, et en demander la suppression à l'épicerie.",
    ),
    React.default.createElement(
      "label",
      { className: "accord" },
      React.default.createElement("input", {
        type: "checkbox",
        checked: D,
        onChange: (T) => M(T.target.checked),
      }),
      React.default.createElement(
        "span",
        null,
        "J'ai lu la ",
        React.default.createElement(
          "button",
          { type: "button", onClick: () => ouvrirLegal("confidentialite") },
          "politique de confidentialité",
        ),
        " et j'accepte l'utilisation de mes données pour ma carte de fidélité.",
      ),
    ),
    E &&
      React.default.createElement(
        "div",
        { style: { color: "#C86B5C", fontSize: 12.5, fontWeight: 700, marginTop: 12 } },
        E,
      ),
    React.default.createElement(
      "button",
      {
        className: "btn",
        style: { marginTop: 16 },
        disabled: !k || !D || f,
        onClick: async () => {
          if (!k || !D || f) return;
          m(!0), F("");
          let T = new Date().toLocaleDateString("sv-SE"),
            X = nomPropre(r).slice(0, 40),
            le = nomPropre(o).slice(0, 40),
            se = {
              code: qy(),
              prenom: X,
              nomFamille: le,
              nom: (X + " " + le).slice(0, 60),
              tel: telFormate(l),
              email: d.trim().toLowerCase().slice(0, 100),
              points: 0,
              depuis: T,
              accord: T,
              ...(S ? { parrain: S } : {}),
              ...(y ? { anniv: y } : {}),
            };
          try {
            let R,
              fe = 0;
            for (;;) {
              R = doc2(collection(db, "clients"));
              let Q = writeBatch(db);
              Q.set(R, se), Q.set(doc2(db, "codes", se.code), { c: R.id });
              try {
                await Q.commit();
                break;
              } catch (Ae) {
                if (Ae?.code !== "permission-denied" || ++fe >= 4) throw Ae;
                se.code = qy();
              }
            }
            try {
              localStorage.removeItem(tx);
            } catch {}
            onDone({ ref: R.id, code: se.code, nom: se.nom, points: 0, tampons: 0 });
          } catch {
            F("La carte n'a pas pu être créée. Vérifiez votre connexion internet et réessayez."), m(!1);
          }
        },
      },
      f ? "Création…" : "Créer ma carte",
    ),
    !k &&
      React.default.createElement(
        "div",
        { style: { fontSize: 11.5, color: "var(--ink3)", textAlign: "center", marginTop: 6 } },
        "Tous les champs sont nécessaires pour créer la carte.",
      ),
    React.default.createElement(
      "button",
      { className: "btn gh", style: { marginTop: 8 }, onClick: onCancel },
      "Plus tard",
    ),
  );
}
