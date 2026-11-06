/* ═══════════════════════════════════════════════════════════════════════
 *  FAIRE DÉCOUVRIR L'APPLI — partage du lien, et panier gardé 24 h.
 * ═══════════════════════════════════════════════════════════════════════ */

// Partager le lien de l'appli.
function PartagerAppli({ d }) {
  let e = location.origin + location.pathname,
    n =
      "Je te conseille l'appli de l'" +
      d.store.name +
      " : le frais du jour, les promos et les plateaux à commander 🍏 ",
    [qr, setQr] = (0, React.useState)(!1);
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "h3",
      { className: "h2", style: { marginTop: 18 } },
      React.default.createElement("i", null),
      "Faites découvrir l'appli",
    ),
    React.default.createElement("div", { className: "sub" }, "À vos voisins, à votre famille…"),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "b", style: { display: "flex", flexDirection: "column", gap: 8 } },
        React.default.createElement(
          "button",
          {
            className: "btn",
            onClick: async () => {
              if (navigator.share)
                try {
                  await navigator.share({ title: d.store.name, text: n, url: e });
                  return;
                } catch (s) {
                  if (s?.name === "AbortError") return;
                }
              window.open("https://wa.me/?text=" + encodeURIComponent(n + e), "_blank", "noopener");
            },
          },
          "📤 Partager l'application",
        ),
        React.default.createElement(
          "a",
          {
            className: "btn gh",
            style: { textDecoration: "none", textAlign: "center" },
            href: "https://wa.me/?text=" + encodeURIComponent(n + e),
            target: "_blank",
            rel: "noopener",
          },
          "Envoyer par WhatsApp",
        ),
        React.default.createElement(
          "button",
          { className: "btn gh", onClick: () => setQr(!qr) },
          qr ? "Masquer le QR code" : "Montrer le QR code à quelqu'un",
        ),
        qr &&
          React.default.createElement(
            "div",
            { className: "tr-qr" },
            React.default.createElement(QR, { texte: e, taille: 200 }),
          ),
      ),
    ),
  );
}

// Panier gardé 24 h sur le téléphone.
var ix = "epicerie-raddonnaise-panier",
  Q9 = () => {
    try {
      let t = JSON.parse(localStorage.getItem(ix) || "null");
      return t && Date.now() - t.t < 864e5 && Array.isArray(t.l) ? t.l : [];
    } catch {
      return [];
    }
  };
