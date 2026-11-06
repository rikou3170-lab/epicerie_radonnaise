/* ═══════════════════════════════════════════════════════════════════════
 *  RECETTE DE LA SEMAINE, SONDAGE ET PARRAINAGE.
 * ═══════════════════════════════════════════════════════════════════════ */

// Recette de la semaine (et recettes précédentes).
function RecetteSemaine({ liste }) {
  let [e, n] = (0, React.useState)(null);
  if (!liste.length) return null;
  let r = liste[0],
    i = (o) =>
      String(o || "")
        .split(
          `
`,
        )
        .map((s) => s.trim())
        .filter(Boolean);
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "h3",
      { className: "h2" },
      React.default.createElement("i", null),
      "La recette de la semaine",
    ),
    React.default.createElement(
      "div",
      { className: "card recette", onClick: () => n(r), role: "button" },
      r.photo && React.default.createElement("img", { src: r.photo, alt: "", className: "recette-img" }),
      React.default.createElement(
        "div",
        { className: "b" },
        React.default.createElement("div", { className: "recette-t" }, "📖 ", r.titre),
        React.default.createElement(
          "div",
          { className: "recette-s" },
          [r.duree, r.personnes ? r.personnes + " pers." : ""].filter(Boolean).join(" · ") ||
            "Voir la recette",
          " ›",
        ),
      ),
    ),
    liste.length > 1 &&
      React.default.createElement(
        "div",
        { className: "recette-autres" },
        liste
          .slice(1, 6)
          .map((o) =>
            React.default.createElement("button", { key: o.id, onClick: () => n(o) }, "📖 ", o.titre),
          ),
      ),
    e &&
      React.default.createElement(
        "div",
        { className: "legal", style: { zIndex: 9e3 } },
        React.default.createElement(
          "div",
          { className: "legal-top" },
          React.default.createElement(
            "button",
            { onClick: () => n(null), "aria-label": "Retour" },
            "← Retour",
          ),
        ),
        React.default.createElement(
          "div",
          { className: "legal-in" },
          e.photo &&
            React.default.createElement("img", {
              src: e.photo,
              alt: "",
              style: { width: "100%", borderRadius: 18, marginBottom: 12 },
            }),
          React.default.createElement("h2", null, e.titre),
          (e.duree || e.personnes) &&
            React.default.createElement(
              "p",
              { className: "chapo" },
              [e.duree, e.personnes ? "pour " + e.personnes + " personnes" : ""].filter(Boolean).join(" · "),
            ),
          e.intro && React.default.createElement("p", null, e.intro),
          i(e.ingredients).length > 0 &&
            React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("h4", null, "Ingrédients"),
              React.default.createElement(
                "ul",
                null,
                i(e.ingredients).map((o, s) => React.default.createElement("li", { key: s }, o)),
              ),
            ),
          i(e.etapes).length > 0 &&
            React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("h4", null, "Préparation"),
              React.default.createElement(
                "ol",
                null,
                i(e.etapes).map((o, s) => React.default.createElement("li", { key: s }, o)),
              ),
            ),
          React.default.createElement(
            "div",
            { className: "recette-rayon" },
            "🛒 Les ingrédients sont en rayon à l'épicerie !",
          ),
        ),
      ),
  );
}

// Sondages : réponses gardées sur le téléphone, identifiant anonyme.
var K2 = "epicerie-raddonnaise-sondages",
  h9 = [...crypto.getRandomValues(new Uint32Array(16))]
    .map((t) => "abcdefghijkmnpqrstuvwxyz23456789"[t % 32])
    .join(""),
  p9 = () => {
    try {
      let t = localStorage.getItem("epicerie-raddonnaise-idtel");
      if (!t) {
        let e = new Uint32Array(16);
        crypto.getRandomValues(e),
          (t = [...e].map((n) => "abcdefghijkmnpqrstuvwxyz23456789"[n % 32]).join("")),
          localStorage.setItem("epicerie-raddonnaise-idtel", t);
      }
      return t;
    } catch {
      return h9;
    }
  };

// Sondage / boîte à idées.
function Sondage({ d: t, moi }) {
  let n = t.sondage,
    [r, i] = (0, React.useState)(() => {
      try {
        return JSON.parse(localStorage.getItem(K2) || "[]");
      } catch {
        return [];
      }
    }),
    [o, s] = (0, React.useState)(""),
    [l, u] = (0, React.useState)(!1),
    [d, h] = (0, React.useState)("");
  if (!n?.active || !n.id || !n.question) return null;
  let f = r.includes(n.id),
    m = async (E, F) => {
      u(!0), h("");
      try {
        await setDoc(doc2(db, "reponses", n.id + "_" + p9()), {
          s: n.id,
          o: E,
          r: String(F || "")
            .trim()
            .slice(0, 500),
          cree: Date.now(),
        });
        let D = [...r, n.id].slice(-30);
        i(D);
        try {
          localStorage.setItem(K2, JSON.stringify(D));
        } catch {}
      } catch (D) {
        if (D?.code === "permission-denied") {
          let M = [...r, n.id];
          i(M);
          try {
            localStorage.setItem(K2, JSON.stringify(M));
          } catch {}
        } else h("Pas de connexion : réessayez dans un instant.");
      }
      u(!1);
    };
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "h3",
      { className: "h2" },
      React.default.createElement("i", null),
      n.mode === "libre" ? "La boîte à idées" : "Votre avis compte",
    ),
    React.default.createElement(
      "div",
      { className: "card sondage" },
      React.default.createElement(
        "div",
        { className: "b" },
        React.default.createElement("div", { className: "sondage-q" }, "💡 ", n.question),
        f
          ? React.default.createElement(
              "div",
              { className: "sondage-merci" },
              "Merci pour votre réponse ! 🍏",
            )
          : n.mode === "libre"
            ? React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("textarea", {
                  className: "inp",
                  value: o,
                  maxLength: 500,
                  onChange: (E) => s(E.target.value),
                  placeholder: "Votre idée…",
                  style: { minHeight: 80 },
                }),
                React.default.createElement(
                  "button",
                  { className: "btn", disabled: !o.trim() || l, onClick: () => m(-1, o) },
                  "Envoyer mon idée",
                ),
              )
            : React.default.createElement(
                "div",
                { className: "sondage-o" },
                (n.options || [])
                  .filter(Boolean)
                  .map((E, F) =>
                    React.default.createElement("button", { key: F, disabled: l, onClick: () => m(F, E) }, E),
                  ),
              ),
        d && React.default.createElement("div", { className: "champ-err" }, d),
        !f &&
          React.default.createElement(
            "div",
            { style: { fontSize: 11, color: "var(--ink3)", marginTop: 8 } },
            "Réponse anonyme.",
          ),
      ),
    ),
  );
}

// Parrainage : code du parrain reçu par lien.
var tx = "epicerie-raddonnaise-parrain",
  m9 = (t) => {
    let e = String(t || "")
      .toUpperCase()
      .replace(/\s/g, "")
      .match(/^(?:RAD-?)?([A-Z0-9]{5})$/);
    return e ? "RAD-" + e[1] : "";
  };

// Lien « #parrain=RAD-XXXXX » : mémorise le code du parrain.
try {
  let t = location.hash.match(/parrain=(RAD-[A-Z0-9]{5})/i);
  t &&
    (localStorage.setItem(tx, t[1].toUpperCase()),
    history.replaceState(null, "", location.pathname + location.search));
} catch {}

// Partage du code de parrainage.
function Parrainage({ moi }) {
  let [e, n] = (0, React.useState)(""),
    r = location.origin + location.pathname + "#parrain=" + moi.code,
    i =
      "Je te conseille l'appli de l'Épicerie Raddonnaise (promos, plateaux, carte à tampons…). Crée ta carte avec mon code " +
      moi.code +
      " : à ton premier passage, on gagne chacun un tampon 🍏",
    o = async () => {
      n("");
      try {
        if (navigator.share) {
          await navigator.share({ title: "Épicerie Raddonnaise", text: i, url: r });
          return;
        }
      } catch (s) {
        if (s?.name === "AbortError") return;
      }
      try {
        await navigator.clipboard.writeText(i + " " + r),
          n("✓ Message copié : collez-le dans un SMS ou sur WhatsApp.");
      } catch {
        n("Donnez simplement votre code à votre voisin : " + moi.code);
      }
    };
  return React.default.createElement(
    "div",
    { className: "card parr", style: { marginTop: 14 } },
    React.default.createElement(
      "div",
      { className: "b" },
      React.default.createElement(
        "div",
        { style: { fontWeight: 800, fontSize: 15, color: "var(--forest)" } },
        "🤝 Parrainez un voisin",
      ),
      React.default.createElement(
        "p",
        { style: { margin: "6px 0 10px", fontSize: 13, lineHeight: 1.45 } },
        "Il crée sa carte avec votre code ",
        React.default.createElement("b", null, moi.code),
        ". À son premier passage en caisse, ",
        React.default.createElement("b", null, "vous gagnez chacun 1 tampon"),
        " !",
      ),
      React.default.createElement("button", { className: "btn", onClick: o }, "Partager mon code"),
      e &&
        React.default.createElement(
          "div",
          { style: { fontSize: 12.5, marginTop: 8, color: "var(--ink2)" } },
          e,
        ),
    ),
  );
}
