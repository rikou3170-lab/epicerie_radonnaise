/* ═══════════════════════════════════════════════════════════════════════
 *  INFOS — horaires, contact, services, installation, notifications, prénom, pages légales.
 * ═══════════════════════════════════════════════════════════════════════ */

// Onglet Infos.
function Infos({ d, inst, ouvrirLegal, pr: r = {}, setPrenom, notifs }) {
  let s = (new Date().getDay() + 6) % 7;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement(Installer, { inst, compact: !0 }),
    React.default.createElement(
      "h3",
      { className: "h2" },
      React.default.createElement("i", null),
      "L'épicerie",
    ),
    React.default.createElement("div", { className: "sub" }),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "b" },
        React.default.createElement("h3", null, d.store.name),
        React.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              marginTop: 10,
              fontSize: 13,
              color: "var(--ink2)",
            },
          },
          Ic2.pin(16, "#6E9B3A"),
          React.default.createElement("span", null, d.store.address),
        ),
        d.store.phone &&
          React.default.createElement(
            "a",
            {
              href: "tel:" + d.store.phone.replace(/\s/g, ""),
              style: {
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginTop: 9,
                fontSize: 13,
                color: "var(--apple)",
                fontWeight: 700,
                textDecoration: "none",
              },
            },
            Ic2.phone(16, "#6E9B3A"),
            d.store.phone,
          ),
        d.store.email &&
          React.default.createElement(
            "div",
            { style: { fontSize: 12.5, color: "var(--ink3)", marginTop: 8, wordBreak: "break-all" } },
            d.store.email,
          ),
        Y2(d) &&
          React.default.createElement(
            "a",
            {
              className: "btn gh",
              style: { marginTop: 12, display: "block", textAlign: "center", textDecoration: "none" },
              href: Y2(d),
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: () => tn("avis"),
            },
            "⭐ Laisser un avis Google",
          ),
      ),
    ),
    React.default.createElement(Deco, null),
    React.default.createElement(
      "h3",
      { className: "h2" },
      React.default.createElement("i", null),
      "Horaires",
    ),
    React.default.createElement("div", { className: "sub" }),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "b", style: { paddingTop: 4, paddingBottom: 4 } },
        React.default.createElement(
          "table",
          { className: "tbl" },
          React.default.createElement(
            "tbody",
            null,
            d.hours.map((l, u) =>
              React.default.createElement(
                "tr",
                { key: u, className: u === s ? "now" : "" },
                React.default.createElement("td", null, l.day),
                React.default.createElement("td", null, l.am || "Fermé"),
                React.default.createElement("td", { style: { textAlign: "right" } }, l.pm),
              ),
            ),
          ),
        ),
      ),
    ),
    !!d.services.filter((l) => l.active !== !1).length &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, { a: "left" }),
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", null),
          "Nos services",
        ),
        React.default.createElement("div", { className: "sub" }),
        d.services
          .filter((l) => l.active !== !1)
          .map((l) =>
            React.default.createElement(
              "div",
              {
                className: "ji",
                key: l.id,
                style: {
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  marginBottom: 8,
                },
              },
              React.default.createElement(
                "div",
                {
                  style: {
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: "var(--apple-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  },
                },
                Ic2.leaf(20, "#8AAD3B"),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("div", { className: "nm", style: { fontSize: 13.5 } }, l.label),
                l.desc && React.default.createElement("div", { className: "no" }, l.desc),
              ),
            ),
          ),
      ),
    React.default.createElement(BlocNotifications, { n: notifs }),
    React.default.createElement(PartagerAppli, { d }),
    React.default.createElement(MonPrenom, { prenom: r.prenom || "", onChange: setPrenom }),
    React.default.createElement(ChangerTelephone, null),
    React.default.createElement(
      "div",
      { className: "liens-leg" },
      React.default.createElement(
        "button",
        { onClick: () => ouvrirLegal("confidentialite") },
        "Confidentialité & données personnelles",
      ),
      React.default.createElement("button", { onClick: () => ouvrirLegal("mentions") }, "Mentions légales"),
    ),
    React.default.createElement(BoutonMaj, { style: { marginTop: 18 } }),
    d.store.facebook &&
      React.default.createElement(
        "a",
        { href: d.store.facebook, target: "_blank", rel: "noreferrer", style: { textDecoration: "none" } },
        React.default.createElement(
          "button",
          { className: "btn gh", style: { marginTop: 10 } },
          "Voir la page Facebook",
        ),
      ),
  );
}
