/* ═══════════════════════════════════════════════════════════════════════
 *  FIDÉLITÉ — carte à tampons, jauge, récompenses, niveaux, animations.
 * ═══════════════════════════════════════════════════════════════════════ */

// Onglet Fidélité.
function Fidelite({ d: t, set }) {
  let [n, r] = (0, React.useState)("clients"),
    [i, s] = (0, React.useState)(""),
    [o, a] = (0, React.useState)(!1),
    [u, d] = (0, React.useState)(""),
    [h, p] = (0, React.useState)(null),
    [m, w] = (0, React.useState)(null),
    [E, A] = (0, React.useState)(null),
    [S, _] = (0, React.useState)("achat"),
    [I, T] = (0, React.useState)(""),
    [M, V] = (0, React.useState)(""),
    O = t.fidelite,
    [b, v] = (0, React.useState)(!1),
    x = (L) => t.clients.find((z) => z.id === L) || E,
    C = async () => {
      let L = parseFloat(I);
      if (!L || b) return;
      let z = Math.floor(L / (O.parEuro || 10));
      v(!0);
      try {
        await ajouterPoints(x(E.id), z, { type: "achat", montant: L }), A(null), T("");
      } catch {
        ft("Points non enregistrés. Vérifiez la connexion et réessayez.");
      }
      v(!1);
    },
    F = x2(O),
    P = async () => {
      let L = x(E.id);
      if (
        !(!F || b || (L.points || 0) < F.points) &&
        (await De(
          "Appliquer " +
            eo(F.euros) +
            " de remise à " +
            L.nom +
            ` ?

` +
            F.points +
            " points seront retirés de sa carte.",
        ))
      ) {
        v(!0);
        try {
          await ajouterPoints(L, -F.points, { type: "remise", remise: F.euros });
        } catch {
          ft("Remise non enregistrée. Vérifiez la connexion et réessayez.");
        }
        v(!1);
      }
    },
    k = async () => {
      let L = parseInt(M);
      if (!(!L || b)) {
        v(!0);
        try {
          await ajouterPoints(
            x(E.id),
            L,
            L > 0 ? { type: "achat", source: "admin" } : { type: "manuel", motif: "Correction" },
          ),
            A(null),
            V("");
        } catch {
          ft("Ajustement non enregistré. Vérifiez la connexion et réessayez.");
        }
        v(!1);
      }
    },
    $ = () => {
      let L = t.clients.find((z) => z.code.toUpperCase() === u.toUpperCase().trim());
      L ? (a(!1), d(""), A(L), _("achat")) : ft("Aucun client avec le code " + u);
    },
    Q = () => {
      let L = (h.prenom ?? (h.nom || "").split(" ")[0]).trim(),
        z = (h.nomFamille ?? (h.nom || "").split(" ").slice(1).join(" ")).trim();
      if (!L && !z) return;
      if (
        ((h.prenom = L.slice(0, 40)),
        (h.nomFamille = z.slice(0, 40)),
        (h.nom = (L + " " + z).trim().slice(0, 60)),
        (h.email = String(h.email || "")
          .trim()
          .toLowerCase()
          .slice(0, 100)),
        !h.id && !h.informe)
      )
        return ft(
          "Cochez la case : le client doit avoir été informé de l'utilisation de ses données (RGPD).",
        );
      let ne = new Date().toLocaleDateString("sv-SE"),
        { informe: ge, ...ve } = h,
        Ae = h.code;
      for (; !Ae || (!h.id && t.clients.some((Je) => Je.code === Ae)); ) Ae = U9();
      set("clients", (Je) =>
        h.id
          ? Je.map((bt) => (bt.id === h.id ? ve : bt))
          : [
              ...Je,
              {
                ...ve,
                id: Wr(),
                code: Ae,
                points: h.points || 0,
                tampons: h.tampons || 0,
                depuis: ne,
                accord: ne,
              },
            ],
      ),
        p(null);
    },
    Y = eC(O) && MENTION_EXCLUSIONS(O),
    U = Object.values(t.clients.reduce((L, z) => ((L[z.code] = L[z.code] || []).push(z), L), {})).filter(
      (L) => L.length > 1,
    ),
    [G, Z] = (0, React.useState)(null),
    fe = async (L, z, ne) => {
      if (!b) {
        v(!0);
        try {
          await ajouterRecompense(L, z, ne, Y);
        } catch {
          ft("Non enregistré. Vérifiez la connexion et réessayez.");
        }
        v(!1);
      }
    },
    ce = t.clients.filter(
      (L) =>
        !i ||
        L.nom.toLowerCase().includes(i.toLowerCase()) ||
        L.code.toLowerCase().includes(i.toLowerCase()) ||
        (L.tel || "").includes(i),
    );
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Fidélité"),
    React.default.createElement(
      "div",
      { className: "sub" },
      Y
        ? "Carte à tampons : au comptoir, ouvrez la Caisse sur votre iPhone, le client présente son QR code, bip, c'est tamponné."
        : "Scannez ou saisissez le code du client, puis ajoutez ses points. Les anciennes cartes papier se reprennent en ajout manuel.",
    ),
    U.length > 0 &&
      React.default.createElement(
        "div",
        { className: "cmd-alerte", style: { marginBottom: 12 } },
        "⚠\uFE0F Code en double : ",
        U.map((L) => L[0].code + " (" + L.map((z) => z.nom).join(", ") + ")").join(" · "),
        ". Supprimez l'une des cartes et recréez-la (un nouveau code sera donné).",
      ),
    React.default.createElement(
      "div",
      { className: "seg" },
      React.default.createElement(
        "button",
        { className: n === "clients" ? "on" : "", onClick: () => r("clients") },
        "Clients (",
        t.clients.length,
        ")",
      ),
      React.default.createElement(
        "button",
        { className: n === "reglages" ? "on" : "", onClick: () => r("reglages") },
        "Réglages",
      ),
    ),
    n === "clients" &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, marginBottom: 12 } },
          Y
            ? React.default.createElement(
                "a",
                { className: "btn dark", href: "caisse.html", style: { textDecoration: "none" } },
                I10.qr(),
                "Ouvrir la caisse",
              )
            : React.default.createElement(
                "button",
                { className: "btn dark", onClick: () => a(!0) },
                I10.qr(),
                "Encaisser",
              ),
          React.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { flex: "0 0 auto", padding: "13px 16px" },
              onClick: () => p({ nom: "", tel: "", points: 0 }),
            },
            I10.plus(16, "#5C6A62"),
          ),
        ),
        React.default.createElement("input", {
          className: "inp",
          placeholder: "Rechercher un client…",
          value: i,
          onChange: (L) => s(L.target.value),
          style: { marginBottom: 12 },
        }),
        !t.clients.length &&
          React.default.createElement(Vn, {
            t: "Aucun client inscrit",
            s: "Vos clients créent eux-mêmes leur carte depuis l'application. Vous pouvez aussi en ajouter un ici.",
          }),
        React.default.createElement(
          "div",
          { className: "grille" },
          ce.map((L) => {
            let z = (O.paliers || []).find((ge) => ge.at > (L.points || 0)),
              ne = _2(O, L.points || 0);
            return React.default.createElement(
              "div",
              { className: "card", key: L.id },
              React.default.createElement(
                "div",
                { className: "row" },
                React.default.createElement(
                  "div",
                  { style: { minWidth: 0 } },
                  React.default.createElement("div", { className: "nm" }, L.nom),
                  React.default.createElement(
                    "div",
                    { className: "de" },
                    L.code,
                    L.tel ? " · " + L.tel : "",
                    L.parrain ? " · 🤝 parrainé" + (L.parrainFait ? "" : " (bonus au 1er passage)") : "",
                    df(L).niv ? " · " + df(L).niv.ico + " " + df(L).niv.nom : "",
                    L.bonusAttente > 0
                      ? " · 🎂 " +
                          L.bonusAttente +
                          " tampon" +
                          (L.bonusAttente > 1 ? "s" : "") +
                          " offert" +
                          (L.bonusAttente > 1 ? "s" : "") +
                          " en attente"
                      : "",
                  ),
                  React.default.createElement(
                    "div",
                    { className: "de", style: { color: "var(--gold)", fontWeight: 700 } },
                    Y
                      ? (L.tampons || 0) >= Y.nb
                        ? "🎁🎁 Carte complète : " + Y.recompense
                        : Y.palier && (L.tampons || 0) === Y.palier
                          ? L.choix === "cadeau" && (L.choixLe || 0) > (L.dernierTampon || 0)
                            ? "🎁 Vient chercher " + Y.recompense1 + " (choisi dans l'appli)"
                            : L.choix === "continue" && (L.choixLe || 0) > (L.dernierTampon || 0)
                              ? "Continue vers " + Y.recompense + " (choisi dans l'appli)"
                              : "🎁 " + Y.recompense1 + " disponible (ou continue)"
                          : (() => {
                              let ge = Y.palier && (L.tampons || 0) < Y.palier ? Y.palier : Y.nb,
                                ve = ge - (L.tampons || 0);
                              return (
                                "Encore " +
                                ve +
                                " tampon" +
                                (ve > 1 ? "s" : "") +
                                " pour " +
                                (ge === Y.palier ? Y.recompense1 : Y.recompense)
                              );
                            })()
                      : ne
                        ? ne.nb > 0
                          ? `🎁 ${eo(ne.valeur)} de remise disponible`
                          : `Encore ${ne.manque} points pour ${eo(ne.euros)} de remise`
                        : z
                          ? `Encore ${z.at - (L.points || 0)} pour « ${z.label} »`
                          : "Tous les paliers atteints",
                  ),
                ),
                React.default.createElement(
                  "div",
                  { className: "rt" },
                  React.default.createElement(
                    "div",
                    { style: { textAlign: "center" } },
                    React.default.createElement(
                      "div",
                      { style: { fontSize: 22, fontWeight: 800, color: "var(--gold)", lineHeight: 1 } },
                      Y ? (L.tampons || 0) + "/" + Y.nb : L.points || 0,
                    ),
                    React.default.createElement(
                      "div",
                      { style: { fontSize: 9, color: "var(--ink3)" } },
                      Y ? "tampons" : "points",
                    ),
                  ),
                  Y
                    ? React.default.createElement(
                        "button",
                        { className: "btn sm", onClick: () => Z(L) },
                        "Tampons",
                      )
                    : React.default.createElement(
                        "button",
                        {
                          className: "btn sm",
                          onClick: () => {
                            A(L), _("achat"), T(""), V("");
                          },
                        },
                        "Points",
                      ),
                  React.default.createElement(
                    "button",
                    {
                      className: "ib",
                      onClick: async () =>
                        (await De("Supprimer " + L.nom + " ?")) &&
                        set("clients", (ge) => ge.filter((ve) => ve.id !== L.id)),
                    },
                    I10.bin(),
                  ),
                ),
              ),
            );
          }),
        ),
      ),
    n === "reglages" &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Conservation, { d: t, set }),
        Y &&
          React.default.createElement(
            "div",
            { className: "card" },
            React.default.createElement(
              "div",
              { style: { fontWeight: 800, fontSize: 14, marginBottom: 4 } },
              "Carte à tampons",
            ),
            React.default.createElement("div", { className: "de", style: { marginBottom: 6 } }, A2(O)),
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 10 } },
              React.default.createElement(
                "div",
                { style: { flex: 1 } },
                React.default.createElement("label", { className: "lab" }, "Tampons sur la carte"),
                React.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "numeric",
                  min: "3",
                  max: "30",
                  value: O.tampons?.nb ?? it.nb,
                  onChange: (L) =>
                    set("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), nb: L.target.value },
                    })),
                }),
              ),
              React.default.createElement(
                "div",
                { style: { flex: 1 } },
                React.default.createElement("label", { className: "lab" }, "1er cadeau au… (0 = aucun)"),
                React.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "numeric",
                  min: "0",
                  value: O.tampons?.palier ?? it.palier,
                  onChange: (L) =>
                    set("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), palier: L.target.value },
                    })),
                }),
              ),
            ),
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 10 } },
              React.default.createElement(
                "div",
                { style: { flex: 1 } },
                React.default.createElement("label", { className: "lab" }, "Achat minimum (€)"),
                React.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "decimal",
                  value: O.tampons?.seuil ?? it.seuil,
                  onChange: (L) =>
                    set("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), seuil: L.target.value },
                    })),
                }),
              ),
            ),
            Y.palier > 0 &&
              React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement(
                  "label",
                  { className: "lab" },
                  "1er cadeau (au ",
                  Y.palier,
                  "e tampon)",
                ),
                React.default.createElement("input", {
                  className: "inp",
                  value: O.tampons?.recompense1 ?? it.recompense1,
                  maxLength: 60,
                  onChange: (L) =>
                    set("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), recompense1: L.target.value },
                    })),
                }),
              ),
            React.default.createElement(
              "label",
              { className: "lab" },
              Y.palier
                ? "Gros cadeau (carte pleine, " + Y.nb + "e tampon)"
                : "Récompense quand la carte est pleine",
            ),
            React.default.createElement("input", {
              className: "inp",
              value: O.tampons?.recompense ?? it.recompense,
              maxLength: 60,
              onChange: (L) =>
                set("fidelite", (z) => ({
                  ...z,
                  tampons: { ...it, ...(z.tampons || {}), recompense: L.target.value },
                })),
            }),
            React.default.createElement("label", { className: "lab" }, "Produits qui ne comptent pas"),
            React.default.createElement("input", {
              className: "inp",
              value: O.tampons?.exclus ?? it.exclus,
              maxLength: 120,
              onChange: (L) =>
                set("fidelite", (z) => ({
                  ...z,
                  tampons: { ...it, ...(z.tampons || {}), exclus: L.target.value },
                })),
            }),
            React.default.createElement(
              "label",
              { className: "lab" },
              "Pas deux tampons en moins de… (minutes)",
            ),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              value: O.tampons?.delai ?? it.delai,
              onChange: (L) =>
                set("fidelite", (z) => ({
                  ...z,
                  tampons: { ...it, ...(z.tampons || {}), delai: L.target.value },
                })),
              style: { maxWidth: 160 },
            }),
            React.default.createElement(
              "div",
              { className: "de", style: { marginTop: 8 } },
              Y.palier
                ? "Au " +
                    Y.palier +
                    "e tampon, la caisse demande : le client prend son cadeau (carte à zéro) ou continue jusqu'au " +
                    Y.nb +
                    "e pour le gros cadeau. "
                : "",
              "Affiché aux clients sur leur carte : « ",
              A2(O),
              " · Hors ",
              MENTION_EXCLUSIONS(O).exclus,
              " ».",
            ),
          ),
        React.default.createElement(
          "div",
          { className: "card" },
          React.default.createElement(
            "div",
            { className: "tog" },
            React.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              "Programme actif",
              React.default.createElement(
                "span",
                { className: "de", style: { display: "block", fontWeight: 400 } },
                O.active
                  ? "Les clients voient leur carte et leurs points."
                  : "Désactivé : les clients voient « La carte de fidélité arrive bientôt ».",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: O.active,
                set: () => set("fidelite", (L) => ({ ...L, active: !L.active })),
              }),
            ),
          ),
          React.default.createElement(
            "div",
            { className: "tog" },
            React.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              "🎂 Tampon d'anniversaire",
              React.default.createElement(
                "span",
                { className: "de", style: { display: "block", fontWeight: 400 } },
                O.anniv !== !1
                  ? "Le jour de son anniversaire (si le client l'a indiqué), un tampon est ajouté à sa carte automatiquement, avec une notification."
                  : "Désactivé.",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: O.anniv !== !1,
                set: () => set("fidelite", (L) => ({ ...L, anniv: L.anniv === !1 })),
              }),
            ),
          ),
          React.default.createElement(
            "div",
            { className: "tog" },
            React.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              "🤝 Parrainage",
              React.default.createElement(
                "span",
                { className: "de", style: { display: "block", fontWeight: 400 } },
                O.parrainage !== !1
                  ? "Un client parraine un voisin : au 1er passage du voisin, la caisse donne 1 tampon à chacun."
                  : "Désactivé : le bloc « Parrainez un voisin » est masqué.",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: O.parrainage !== !1,
                set: () => set("fidelite", (L) => ({ ...L, parrainage: L.parrainage === !1 })),
              }),
            ),
          ),
          React.default.createElement("label", { className: "lab" }, "Titre affiché"),
          React.default.createElement("input", {
            className: "inp",
            value: O.titre,
            onChange: (L) => set("fidelite", (z) => ({ ...z, titre: L.target.value })),
          }),
          React.default.createElement("label", { className: "lab" }, "Phrase d'explication"),
          React.default.createElement("input", {
            className: "inp",
            value: O.sousTitre,
            onChange: (L) => set("fidelite", (z) => ({ ...z, sousTitre: L.target.value })),
          }),
          !Y &&
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 10 } },
              React.default.createElement(
                "div",
                { style: { flex: 1 } },
                React.default.createElement("label", { className: "lab" }, "1 point tous les… (€)"),
                React.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "numeric",
                  value: O.parEuro,
                  onChange: (L) => set("fidelite", (z) => ({ ...z, parEuro: +L.target.value || 1 })),
                }),
              ),
              !F &&
                React.default.createElement(
                  "div",
                  { style: { flex: 1 } },
                  React.default.createElement("label", { className: "lab" }, "Points sur la carte"),
                  React.default.createElement("input", {
                    className: "inp",
                    type: "number",
                    inputMode: "numeric",
                    value: O.total,
                    onChange: (L) => set("fidelite", (z) => ({ ...z, total: +L.target.value || 10 })),
                  }),
                ),
            ),
        ),
        !Y &&
          React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "div",
              { className: "card" },
              React.default.createElement(
                "div",
                { className: "tog", style: { borderTop: "none", paddingTop: 0 } },
                React.default.createElement(
                  "div",
                  null,
                  React.default.createElement(
                    "div",
                    { style: { fontSize: 13, fontWeight: 800 } },
                    "Remise en euros",
                  ),
                  React.default.createElement(
                    "div",
                    { className: "de" },
                    "Les points se transforment en bon de réduction",
                  ),
                ),
                React.default.createElement(
                  "div",
                  { className: "rt" },
                  React.default.createElement(ze, {
                    on: !!F,
                    set: () =>
                      set("fidelite", (L) => ({
                        ...L,
                        remise: { ...Na, ...(L.remise || {}), active: !(L.remise && L.remise.active !== !1) },
                      })),
                  }),
                ),
              ),
              F &&
                React.default.createElement(
                  "div",
                  { style: { display: "flex", gap: 10, alignItems: "flex-end" } },
                  React.default.createElement(
                    "div",
                    { style: { flex: 1 } },
                    React.default.createElement("label", { className: "lab" }, "Nombre de points"),
                    React.default.createElement("input", {
                      className: "inp",
                      type: "number",
                      inputMode: "numeric",
                      value: O.remise.points,
                      onChange: (L) =>
                        set("fidelite", (z) => ({
                          ...z,
                          remise: { ...z.remise, points: +L.target.value || 1 },
                        })),
                    }),
                  ),
                  React.default.createElement(
                    "div",
                    { style: { paddingBottom: 14, fontWeight: 800, color: "var(--ink3)" } },
                    "=",
                  ),
                  React.default.createElement(
                    "div",
                    { style: { flex: 1 } },
                    React.default.createElement("label", { className: "lab" }, "Remise (€)"),
                    React.default.createElement("input", {
                      className: "inp",
                      type: "number",
                      inputMode: "decimal",
                      step: "0.5",
                      value: O.remise.euros,
                      onChange: (L) =>
                        set("fidelite", (z) => ({ ...z, remise: { ...z.remise, euros: L.target.value } })),
                    }),
                  ),
                ),
              F &&
                React.default.createElement(
                  "div",
                  { className: "apercu-prix" },
                  "Exemple : 1 point par ",
                  O.parEuro || 1,
                  " € → un client qui dépense ",
                  F.points * (O.parEuro || 1),
                  " € gagne ",
                  eo(F.euros),
                  " de remise.",
                ),
            ),
            React.default.createElement(
              "div",
              { className: "hd", style: { marginTop: 6 } },
              React.default.createElement("div", { style: { fontWeight: 800, fontSize: 14 } }, "Récompenses"),
              React.default.createElement(
                "button",
                {
                  className: "btn gh sm",
                  onClick: () =>
                    set("fidelite", (L) => ({
                      ...L,
                      paliers: [...(L.paliers || []), { at: (L.paliers?.length + 1) * 5 || 5, label: "" }],
                    })),
                },
                "Ajouter",
              ),
            ),
            !(O.paliers || []).length &&
              React.default.createElement(Vn, {
                t: "Aucune récompense",
                s: "Exemple : 5 points = une baguette offerte.",
              }),
            (O.paliers || []).map((L, z) =>
              React.default.createElement(
                "div",
                { className: "card", key: z },
                React.default.createElement(
                  "div",
                  { className: "row" },
                  React.default.createElement("input", {
                    className: "inp",
                    type: "number",
                    inputMode: "numeric",
                    style: { width: 66, textAlign: "center", fontWeight: 800, color: "var(--gold)" },
                    value: L.at,
                    onChange: (ne) =>
                      set("fidelite", (ge) => ({
                        ...ge,
                        paliers: ge.paliers.map((ve, Ae) =>
                          Ae === z ? { ...ve, at: +ne.target.value || 0 } : ve,
                        ),
                      })),
                  }),
                  React.default.createElement("input", {
                    className: "inp",
                    style: { flex: 1 },
                    placeholder: "Récompense",
                    value: L.label,
                    onChange: (ne) =>
                      set("fidelite", (ge) => ({
                        ...ge,
                        paliers: ge.paliers.map((ve, Ae) =>
                          Ae === z ? { ...ve, label: ne.target.value } : ve,
                        ),
                      })),
                  }),
                  React.default.createElement(
                    "button",
                    {
                      className: "ib",
                      onClick: () =>
                        set("fidelite", (ne) => ({
                          ...ne,
                          paliers: ne.paliers.filter((ge, ve) => ve !== z),
                        })),
                    },
                    I10.bin(),
                  ),
                ),
              ),
            ),
          ),
      ),
    o &&
      React.default.createElement(
        ut,
        { titre: "Encaisser un client", onClose: () => a(!1) },
        React.default.createElement(
          "div",
          {
            style: {
              border: "2px dashed var(--apple)",
              borderRadius: 14,
              padding: "26px 16px",
              textAlign: "center",
              background: "#fff",
              marginBottom: 14,
            },
          },
          I10.qr(40, "#6E9B3A"),
          React.default.createElement(
            "div",
            { style: { fontSize: 12, color: "var(--ink3)", marginTop: 8 } },
            "Demandez au client d'afficher son QR code, puis saisissez son code.",
          ),
        ),
        React.default.createElement("label", { className: "lab" }, "Code client"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          placeholder: "RAD-0000",
          value: u,
          onChange: (L) => d(L.target.value),
          style: {
            textAlign: "center",
            letterSpacing: 3,
            fontWeight: 800,
            fontSize: 19,
            textTransform: "uppercase",
          },
        }),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: $ },
          "Rechercher",
        ),
      ),
    G &&
      Y &&
      (() => {
        let L = t.clients.find((ne) => ne.id === G.id) || G,
          z = L.tampons || 0;
        return React.default.createElement(
          ut,
          { titre: L.nom, onClose: () => Z(null) },
          React.default.createElement(
            "div",
            { style: { textAlign: "center", marginBottom: 14 } },
            React.default.createElement("div", { style: { fontSize: 12, color: "var(--ink3)" } }, L.code),
            React.default.createElement(
              "div",
              { style: { fontSize: 40, fontWeight: 800, color: "var(--gold)", lineHeight: 1.1 } },
              z,
              " / ",
              Y.nb,
            ),
            React.default.createElement("div", { style: { fontSize: 11, color: "var(--ink3)" } }, "tampons"),
          ),
          z >= Y.nb
            ? React.default.createElement(
                "button",
                { className: "btn terra", disabled: b, onClick: () => fe(L, -z, "recompense") },
                "🎁🎁 ",
                Y.recompense,
                " donné : remettre à zéro",
              )
            : Y.palier && z >= Y.palier
              ? React.default.createElement(
                  "button",
                  { className: "btn terra", disabled: b, onClick: () => fe(L, -z, "recompense1") },
                  "🎁 ",
                  Y.recompense1,
                  " donné : remettre à zéro",
                )
              : null,
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 10 } },
            React.default.createElement(
              "button",
              { className: "btn gh", disabled: b || z <= 0, onClick: () => fe(L, -1, "correction") },
              "− 1 tampon",
            ),
          ),
          React.default.createElement(
            "div",
            { className: "de", style: { marginTop: 10 } },
            "Les tampons s'ajoutent uniquement avec la Caisse (scan ou recherche du nom). Ici, seulement pour corriger une erreur.",
          ),
          React.default.createElement(
            "button",
            {
              className: "btn gh",
              style: { marginTop: 12 },
              onClick: () => {
                Z(null), w(L);
              },
            },
            "📱 Réinstaller la carte sur un nouveau téléphone",
          ),
        );
      })(),
    E &&
      React.default.createElement(
        ut,
        { titre: E.nom, onClose: () => A(null) },
        React.default.createElement(
          "div",
          { style: { textAlign: "center", marginBottom: 14 } },
          React.default.createElement("div", { style: { fontSize: 12, color: "var(--ink3)" } }, E.code),
          React.default.createElement(
            "div",
            { style: { fontSize: 40, fontWeight: 800, color: "var(--gold)", lineHeight: 1.1 } },
            t.clients.find((L) => L.id === E.id)?.points || 0,
          ),
          React.default.createElement("div", { style: { fontSize: 11, color: "var(--ink3)" } }, "points"),
        ),
        F &&
          (() => {
            let L = _2(O, t.clients.find((z) => z.id === E.id)?.points || 0);
            return L.nb > 0
              ? React.default.createElement(
                  "button",
                  { className: "btn terra", style: { marginBottom: 12 }, disabled: b, onClick: P },
                  "🎁 Appliquer ",
                  eo(L.euros),
                  " de remise (−",
                  L.points,
                  " points)",
                  L.nb > 1 ? " · " + L.nb + " disponibles" : "",
                )
              : React.default.createElement(
                  "div",
                  { className: "de", style: { textAlign: "center", marginBottom: 12 } },
                  "Encore ",
                  L.manque,
                  " points pour ",
                  eo(L.euros),
                  " de remise",
                );
          })(),
        React.default.createElement(
          "div",
          { className: "de", style: { textAlign: "center", marginBottom: 2 } },
          "Saisissez les points à créditer (un nombre négatif en retire, par exemple pour corriger une erreur ou reprendre une carte papier).",
        ),
        React.default.createElement("label", { className: "lab" }, "Points"),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, alignItems: "center" } },
          React.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { width: 46 },
              onClick: () => V(String((parseInt(M) || 0) - 1)),
            },
            "−",
          ),
          React.default.createElement("input", {
            className: "inp",
            type: "number",
            inputMode: "numeric",
            value: M,
            onChange: (L) => V(L.target.value),
            style: { textAlign: "center", fontSize: 22, fontWeight: 800, color: "var(--apple)" },
          }),
          React.default.createElement(
            "button",
            { className: "btn sm", style: { width: 46 }, onClick: () => V(String((parseInt(M) || 0) + 1)) },
            "+",
          ),
        ),
        !!parseInt(M) &&
          React.default.createElement(
            "div",
            { className: "card", style: { textAlign: "center", marginTop: 12 } },
            React.default.createElement(
              "div",
              { style: { fontSize: 11, color: "var(--ink3)" } },
              "Nouveau total",
            ),
            React.default.createElement(
              "div",
              { style: { fontSize: 30, fontWeight: 800, color: "var(--apple)" } },
              Math.max(0, (t.clients.find((L) => L.id === E.id)?.points || 0) + parseInt(M)),
            ),
          ),
        React.default.createElement(
          "button",
          {
            className: "btn gh",
            style: { marginTop: 12 },
            onClick: () => {
              let L = t.clients.find((z) => z.id === E.id) || E;
              A(null), w(L);
            },
          },
          "📱 Réinstaller la carte sur un nouveau téléphone",
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, disabled: !parseInt(M) || b, onClick: k },
          parseInt(M) < 0
            ? "Retirer " + -parseInt(M) + " points"
            : "Créditer " + (parseInt(M) || "") + " points",
        ),
      ),
    h &&
      React.default.createElement(
        ut,
        { titre: h.id ? "Modifier le client" : "Nouveau client", onClose: () => p(null) },
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Prénom"),
            React.default.createElement("input", {
              className: "inp",
              autoFocus: !0,
              value: h.prenom ?? (h.nom || "").split(" ")[0],
              onChange: (L) => p({ ...h, prenom: L.target.value }),
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Nom"),
            React.default.createElement("input", {
              className: "inp",
              value: h.nomFamille ?? (h.nom || "").split(" ").slice(1).join(" "),
              onChange: (L) => p({ ...h, nomFamille: L.target.value }),
            }),
          ),
        ),
        React.default.createElement("label", { className: "lab" }, "Téléphone"),
        React.default.createElement("input", {
          className: "inp",
          type: "tel",
          value: h.tel,
          onChange: (L) => p({ ...h, tel: L.target.value }),
        }),
        React.default.createElement("label", { className: "lab" }, "E-mail"),
        React.default.createElement("input", {
          className: "inp",
          type: "email",
          autoCapitalize: "off",
          value: h.email || "",
          onChange: (L) => p({ ...h, email: L.target.value }),
        }),
        !Y &&
          React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("label", { className: "lab" }, "Points de départ"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              value: h.points,
              onChange: (L) => p({ ...h, points: +L.target.value || 0 }),
            }),
          ),
        !h.id &&
          React.default.createElement(
            "label",
            {
              style: {
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                marginTop: 14,
                fontSize: 12.5,
                lineHeight: 1.45,
                cursor: "pointer",
              },
            },
            React.default.createElement("input", {
              type: "checkbox",
              checked: !!h.informe,
              onChange: (L) => p({ ...h, informe: L.target.checked }),
              style: { width: 20, height: 20, flexShrink: 0, accentColor: "#6E9B3A" },
            }),
            React.default.createElement(
              "span",
              null,
              "Le client a été informé que ses nom, téléphone et e-mail servent uniquement à sa carte de fidélité, et qu'il peut les faire supprimer à tout moment.",
            ),
          ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: Q },
          "Enregistrer",
        ),
        h.id &&
          React.default.createElement(
            "button",
            {
              className: "btn gh",
              style: { marginTop: 8 },
              onClick: () => {
                let L = t.clients.find((z) => z.id === h.id) || h;
                p(null), w(L);
              },
            },
            "📱 Réinstaller la carte sur un nouveau téléphone",
          ),
      ),
    m && React.default.createElement(QrCarteClient, { c: m, onClose: () => w(null) }),
  );
}

// Petites aides de la carte de fidélité (QR code).
var V7 = (t) =>
    btoa(unescape(encodeURIComponent(t)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, ""),
  z7 = (t) =>
    location.origin +
    location.pathname.replace(/[^/]*$/, "") +
    "#transfert=ERT1." +
    V7(
      JSON.stringify({
        c: String(t.id),
        p: String(t.prenom || (t.nom || "").split(" ")[0] || "").slice(0, 30),
      }),
    );

// Dessine un QR code en carrés (impression nette).
function QrPixels({ texte, taille = 240 }) {
  let n = (0, React.useMemo)(() => {
    let r = PC(0, "M");
    r.addData(texte), r.make();
    let i = r.getModuleCount(),
      s = "";
    for (let o = 0; o < i; o++)
      for (let a = 0; a < i; a++) r.isDark(o, a) && (s += "M" + a + " " + o + "h1v1h-1z");
    return { d: s, n: i };
  }, [texte]);
  return React.default.createElement(
    "svg",
    {
      viewBox: "-2 -2 " + (n.n + 4) + " " + (n.n + 4),
      width: taille,
      height: taille,
      shapeRendering: "crispEdges",
      style: { display: "block", margin: "0 auto", background: "#fff" },
    },
    React.default.createElement("path", { d: n.d, fill: "#000" }),
  );
}

// QR code de réinstallation de la carte d'un client sur un nouveau téléphone.
function QrCarteClient({ c, onClose }) {
  let n = c.prenom || (c.nom || "").split(" ")[0] || "ce client";
  return React.default.createElement(
    ut,
    { titre: "Carte de " + n, onClose },
    React.default.createElement(
      "div",
      { className: "de", style: { fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, marginBottom: 12 } },
      "Le client ouvre l'",
      React.default.createElement("b", null, "appareil photo"),
      " de son nouveau téléphone et scanne ce code : l'application s'ouvre et récupère sa carte (même code ",
      c.code,
      ", mêmes tampons, même historique). Il touche ensuite « Récupérer ».",
    ),
    React.default.createElement(QrPixels, { texte: z7(c) }),
    React.default.createElement(
      "div",
      {
        style: {
          marginTop: 12,
          padding: "10px 12px",
          borderRadius: 10,
          background: "#FFF4E5",
          color: "#8A4B00",
          fontSize: 12.5,
          lineHeight: 1.45,
        },
      },
      "🔒 Ce code ouvre la carte de ",
      n,
      " (nom, téléphone, e-mail) : montrez-le uniquement à cette personne, au comptoir. Ne le photographiez pas et ne l'envoyez à personne.",
    ),
    React.default.createElement(
      "div",
      { className: "de", style: { marginTop: 8 } },
      "Si l'ancien téléphone a été volé, l'ancien téléphone garde aussi l'accès à la carte : dans ce cas, mieux vaut créer une nouvelle carte et y reporter les tampons.",
    ),
    React.default.createElement(
      "button",
      { className: "btn", style: { marginTop: 12 }, onClick: onClose },
      "Terminé",
    ),
  );
}
var lN = (t) => t.derniere || t.depuis || "";
