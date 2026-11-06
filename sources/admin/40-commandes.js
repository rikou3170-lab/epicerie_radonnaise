/* ═══════════════════════════════════════════════════════════════════════
 *  COMMANDES DE PLATEAUX — statuts, décision (accepter / refuser), liste, plateaux et réglages.
 * ═══════════════════════════════════════════════════════════════════════ */

// Statuts des commandes (couleurs), étape suivante, commandes en cours, motifs de refus.
var STATUTS_COMMANDE = [
    { id: "nouvelle", label: "À valider", c: "#C27B42", bg: "#FBEFE4" },
    { id: "acceptee", label: "Acceptée", c: "#4C6B27", bg: "#EEF3E2" },
    { id: "prep", label: "En préparation", c: "#B08A2E", bg: "#FAF2DC" },
    { id: "prete", label: "Prête", c: "#6E9B3A", bg: "#EEF3E2" },
    { id: "remise", label: "Remise au client", c: "#1C433B", bg: "#E4EDE9" },
    { id: "refusee", label: "Refusée", c: "#B2563F", bg: "#F7E4DF" },
    { id: "annulee", label: "Annulée", c: "#93A099", bg: "#F0EEE8" },
  ],
  ETAPE_SUIVANTE = {
    acceptee: ["prep", "Commencer la préparation"],
    prep: ["prete", "Marquer prête (le client est prévenu)"],
    prete: ["remise", "Marquer remise au client"],
  },
  enCoursCmd = (t) => !["remise", "annulee", "refusee"].includes(t.statut),
  MOTIFS_REFUS = [
    "Complet ce jour-là",
    "Délai trop court",
    "Produits indisponibles",
    "Épicerie fermée ce jour-là",
  ];

// Accepter (avec l'heure de retrait) ou refuser (avec un motif) : le client est prévenu dans son application
function Decision({ c, type, d: n, onClose, onValider }) {
  let s = Er(n.cmd),
    [date, setDate] = (0, React.useState)(er(c)),
    [heure, setHeure] = (0, React.useState)(c.heure || s.heureDefaut || "17:00"),
    [msg, setMsg] = (0, React.useState)(c.message || ""),
    m = c.mode === "livraison";
  return type === "refus"
    ? React.default.createElement(
        ut,
        { titre: "Refuser la commande", onClose },
        React.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 10 } },
          c.nom,
          " sera prévenu dans l'application. Indiquez-lui pourquoi :",
        ),
        React.default.createElement(
          "div",
          { className: "motifs" },
          MOTIFS_REFUS.map((w) =>
            React.default.createElement(
              "button",
              { key: w, className: msg === w ? "on" : "", onClick: () => setMsg(w) },
              w,
            ),
          ),
        ),
        React.default.createElement(
          "label",
          { className: "lab", style: { marginTop: 10 } },
          "Message au client",
        ),
        React.default.createElement("textarea", {
          className: "inp",
          value: msg,
          onChange: (w) => setMsg(w.target.value),
          maxLength: 300,
          placeholder: "Ex : Désolée, nous sommes complets samedi. Appelez-nous pour une autre date !",
        }),
        React.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 12, background: "var(--red)" },
            onClick: () => onValider({ statut: "refusee", message: msg.trim(), decision: Date.now() }),
          },
          "Refuser et prévenir le client",
        ),
      )
    : React.default.createElement(
        ut,
        {
          titre: c.statut === "nouvelle" ? "Accepter la commande" : "Modifier le rendez-vous",
          onClose,
        },
        React.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 10 } },
          "Choisissez ",
          m
            ? "l'heure de livraison"
            : "l'heure à laquelle " + c.nom.split(" ")[0] + " peut venir la chercher",
          ". Il sera prévenu dans l'application et pourra mettre un rappel.",
        ),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, m ? "Livraison le" : "Retrait le"),
            React.default.createElement("input", {
              className: "inp",
              type: "date",
              value: date,
              onChange: (w) => setDate(w.target.value || er(c)),
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "À"),
            React.default.createElement("input", {
              className: "inp",
              type: "time",
              step: "900",
              value: heure,
              onChange: (w) => setHeure(w.target.value),
            }),
          ),
        ),
        date !== c.date &&
          React.default.createElement(
            "div",
            { className: "cmd-alerte" },
            "Le client avait demandé le ",
            dateCourte(c.date),
            ". Pensez à le lui préciser dans le message.",
          ),
        React.default.createElement(
          "div",
          { className: "motifs", style: { marginTop: 10 } },
          ["08:00", "10:00", "12:00", "16:00", "17:00", "18:00"].map((w) =>
            React.default.createElement(
              "button",
              { key: w, className: heure === w ? "on" : "", onClick: () => setHeure(w) },
              lc(w),
            ),
          ),
        ),
        React.default.createElement(
          "label",
          { className: "lab", style: { marginTop: 10 } },
          "Petit mot au client (facultatif)",
        ),
        React.default.createElement("textarea", {
          className: "inp",
          value: msg,
          onChange: (w) => setMsg(w.target.value),
          maxLength: 300,
          placeholder: "Ex : Merci ! Votre plateau sera prêt, à samedi.",
        }),
        React.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 12 },
            disabled: !heure || !date,
            onClick: () =>
              onValider({
                statut: c.statut === "nouvelle" ? "acceptee" : c.statut,
                dateRetrait: date,
                heure,
                message: msg.trim(),
                decision: c.decision || Date.now(),
              }),
          },
          c.statut === "nouvelle" ? "Accepter — " + dateCourte(date) + " à " + lc(heure) : "Enregistrer",
        ),
      );
}

// Libellé de date (« aujourd'hui », « demain »…).
var yN = (t) => Math.round((new Date(t + "T12:00") - new Date(Bn() + "T12:00")) / 864e5),
  quand = (t) => {
    let e = yN(t);
    return e === 0
      ? "aujourd'hui"
      : e === 1
        ? "demain"
        : e < 0
          ? "en retard de " + -e + " j"
          : "dans " + e + " jours";
  };

// Écran Commandes (onglets en cours / terminées / plateaux / réglages).
function Commandes({ d, set }) {
  let [vue, setVue] = (0, React.useState)("cmd"),
    i = d.commandes.filter((s) => s.statut === "nouvelle").length;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Commandes"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Les plateaux commandés par vos clients depuis l'application.",
    ),
    React.default.createElement(
      "div",
      { className: "seg" },
      React.default.createElement(
        "button",
        { className: vue === "cmd" ? "on" : "", onClick: () => setVue("cmd") },
        "Commandes",
        i ? " (" + i + ")" : "",
      ),
      React.default.createElement(
        "button",
        { className: vue === "plateaux" ? "on" : "", onClick: () => setVue("plateaux") },
        "Plateaux",
      ),
      React.default.createElement(
        "button",
        { className: vue === "regl" ? "on" : "", onClick: () => setVue("regl") },
        "Calendrier",
      ),
    ),
    vue === "cmd" && React.default.createElement(ListeCommandes, { d, set }),
    vue === "plateaux" && React.default.createElement(Plateaux, { d, set }),
    vue === "regl" && React.default.createElement(ReglagesCmd, { d, set }),
  );
}

// Liste des commandes avec actions (accepter, préparer, prête, remise, écrire au client).
function ListeCommandes({ d: t, set }) {
  let [n, r] = (0, React.useState)("encours"),
    [i, s] = (0, React.useState)(null),
    [o, a] = (0, React.useState)(null),
    u = (E) => (E.statut === "nouvelle" ? "0" : "1") + (er(E) || "") + (E.heure || ""),
    d = t.commandes
      .filter((E) => (n === "encours" ? enCoursCmd(E) : !enCoursCmd(E)))
      .sort((E, A) =>
        n === "encours"
          ? u(E).localeCompare(u(A)) || (E.cree || 0) - (A.cree || 0)
          : (er(A) || "").localeCompare(er(E) || ""),
      ),
    h = async (E, A) => {
      (await set("commandes", (S) => S.map((_) => (_.id === E.id ? { ..._, ...A } : _)))) &&
        avertirMessage(t.cmd, "cmd", E.id);
    },
    p = async (E, A) => {
      (await set("commandes", (S) => S.map((_) => (_.id === E.id ? { ..._, statut: A } : _)))) &&
        ["acceptee", "refusee", "prete"].includes(A) &&
        avertirMessage(t.cmd, "cmd", E.id);
    },
    m = (() => {
      let E = new Date();
      return E.setFullYear(E.getFullYear() - 1), E.toLocaleDateString("sv-SE");
    })(),
    w = t.commandes.filter((E) => !enCoursCmd(E) && (er(E) || "") < m);
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(BoutonPreparation, { d: t }),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 8, marginBottom: 12 } },
      [
        ["encours", "À préparer (" + t.commandes.filter(enCoursCmd).length + ")"],
        ["terminees", "Terminées"],
      ].map(([E, A]) =>
        React.default.createElement(
          "button",
          { key: E, className: "btn sm " + (n === E ? "" : "gh"), style: { flex: 1 }, onClick: () => r(E) },
          A,
        ),
      ),
    ),
    !d.length &&
      React.default.createElement(Vn, {
        t: n === "encours" ? "Aucune commande à préparer" : "Aucune commande terminée",
        s:
          n === "encours"
            ? "Les commandes passées par vos clients apparaîtront ici, triées par date de retrait."
            : "",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      d.map((E) => {
        let A = STATUTS_COMMANDE.find((_) => _.id === E.statut) || STATUTS_COMMANDE[0],
          S = (E.lignes || []).reduce((_, I) => {
            let T = t.plateaux.find((M) => String(M.id) === String(I.id));
            return _ + (T ? I.personnes * XS(T, I.choix || []) : I.montant);
          }, 0);
        return React.default.createElement(
          "div",
          { className: "card cmd", key: E.id, style: { borderLeft: "4px solid " + A.c } },
          React.default.createElement(
            "div",
            { className: "row", style: { alignItems: "flex-start" } },
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement(
                "div",
                { className: "nm", style: { fontSize: 15 } },
                dateCourte(er(E)),
                E.heure && " à " + lc(E.heure),
              ),
              React.default.createElement(
                "div",
                {
                  className: "de",
                  style: {
                    fontWeight: 800,
                    color: yN(er(E)) < 0 && enCoursCmd(E) ? "var(--red)" : "var(--ink2)",
                  },
                },
                MODES[E.mode] || E.mode,
                " · ",
                quand(er(E)),
                E.statut === "nouvelle" && " · demandée par le client",
              ),
            ),
            React.default.createElement(
              "span",
              {
                className: "pill",
                style: { marginLeft: "auto", background: A.bg, color: A.c, whiteSpace: "nowrap" },
              },
              A.label,
            ),
          ),
          React.default.createElement(
            "div",
            { className: "cmd-cli" },
            React.default.createElement("b", null, E.nom),
            E.carte && React.default.createElement("span", { className: "de" }, " · carte ", E.carte),
            React.default.createElement("br", null),
            React.default.createElement("a", { href: "tel:" + (E.tel || "").replace(/\s/g, "") }, E.tel),
            E.adresse &&
              React.default.createElement(
                "div",
                { className: "de", style: { marginTop: 3 } },
                "📍 ",
                E.adresse,
              ),
          ),
          React.default.createElement(
            "div",
            { className: "cmd-lignes" },
            (E.lignes || []).map((_, I) =>
              React.default.createElement(
                "div",
                { key: I },
                React.default.createElement(
                  "span",
                  null,
                  _.nom,
                  " — ",
                  React.default.createElement("b", null, _.personnes, " pers."),
                  " × ",
                  An(_.prixPersonne),
                ),
                React.default.createElement("b", { style: { whiteSpace: "nowrap" } }, An(_.montant)),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "tot" },
              React.default.createElement("span", null, "Total"),
              React.default.createElement("b", null, An(E.total)),
            ),
          ),
          Math.abs(S - E.total) > 0.01 &&
            React.default.createElement(
              "div",
              { className: "cmd-alerte" },
              "Attention : avec vos prix actuels, cette commande ferait ",
              An(S),
              ". Vérifiez avant de l'encaisser.",
            ),
          (E.remarque || "")
            .split(
              `
`,
            )
            .filter(Boolean)
            .map((_, I) =>
              _.startsWith("⚠\uFE0F")
                ? React.default.createElement("div", { key: I, className: "cmd-allerg" }, _)
                : React.default.createElement("div", { key: I, className: "cmd-rq" }, "« ", _, " »"),
            ),
          E.message &&
            E.statut !== "nouvelle" &&
            React.default.createElement(
              "div",
              { className: "cmd-rq", style: { fontStyle: "normal" } },
              "Votre message : « ",
              E.message,
              " »",
            ),
          React.default.createElement(
            "div",
            { className: "de", style: { marginTop: 6 } },
            "N° ",
            E.numero,
            " · reçue le ",
            E.cree
              ? new Date(E.cree).toLocaleString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—",
          ),
          E.statut === "nouvelle" &&
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 8, marginTop: 10 } },
              React.default.createElement(
                "button",
                { className: "btn", style: { flex: 2 }, onClick: () => s({ c: E, type: "ok" }) },
                "✓ Accepter",
              ),
              React.default.createElement(
                "button",
                {
                  className: "btn gh",
                  style: { flex: 1, color: "var(--red)", borderColor: "#EBC9C2" },
                  onClick: () => s({ c: E, type: "refus" }),
                },
                "Refuser",
              ),
            ),
          E.statut !== "nouvelle" &&
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" } },
              ETAPE_SUIVANTE[E.statut] &&
                React.default.createElement(
                  "button",
                  {
                    className: "btn sm",
                    style: { flex: 2 },
                    onClick: () => p(E, ETAPE_SUIVANTE[E.statut][0]),
                  },
                  ETAPE_SUIVANTE[E.statut][1],
                ),
              ["acceptee", "prep", "prete"].includes(E.statut) &&
                React.default.createElement(
                  "button",
                  { className: "btn gh sm", onClick: () => s({ c: E, type: "ok" }) },
                  "Changer l'heure",
                ),
              React.default.createElement(
                "select",
                {
                  className: "inp sel",
                  value: E.statut,
                  onChange: (_) => p(E, _.target.value),
                  "aria-label": "Changer le statut",
                },
                STATUTS_COMMANDE.map((_) =>
                  React.default.createElement("option", { key: _.id, value: _.id }, _.label),
                ),
              ),
            ),
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" } },
            React.default.createElement(
              "button",
              { className: "btn gh sm", style: { width: "auto" }, onClick: () => a(E) },
              "💬 Écrire au client",
              E.conv ? " (conversation en cours)" : "",
            ),
            React.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: {
                  width: "auto",
                  marginLeft: "auto",
                  color: "var(--red)",
                  borderColor: "#EBC9C2",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                },
                onClick: async () =>
                  (await De(
                    "Supprimer définitivement la commande " +
                      (E.numero || "") +
                      " de " +
                      E.nom +
                      ` ?

Elle disparaîtra aussi de l'appli du client.`,
                  )) && set("commandes", (_) => _.filter((I) => I.id !== E.id)),
              },
              I10.bin(),
              "Supprimer",
            ),
          ),
        );
      }),
    ),
    o &&
      React.default.createElement(EcrireAuClient, { d: t, cible: "commandes", x: o, onClose: () => a(null) }),
    i &&
      React.default.createElement(Decision, {
        c: i.c,
        type: i.type,
        d: t,
        onClose: () => s(null),
        onValider: (E) => {
          h(i.c, E), s(null);
        },
      }),
    n === "terminees" &&
      !!w.length &&
      React.default.createElement(
        "button",
        {
          className: "btn gh",
          style: { marginTop: 10, color: "var(--red)" },
          onClick: async () =>
            (await De("Supprimer les " + w.length + " commande(s) terminée(s) depuis plus d'un an ?")) &&
            set("commandes", (E) => E.filter((A) => !w.some((S) => S.id === A.id))),
        },
        "Supprimer les commandes de plus d'un an (",
        w.length,
        ")",
      ),
    n === "terminees" &&
      React.default.createElement(
        "div",
        { className: "de", style: { marginTop: 8 } },
        "Données personnelles (RGPD) : les commandes sont gardées 1 an après leur date, puis à supprimer avec ce bouton.",
      ),
  );
}

// Plateaux et paniers proposés à la commande.
function Plateaux({ d: t, set }) {
  let [m, setM] = (0, React.useState)(null),
    i = () => {
      if (!m.nom?.trim() || !(Ji(m) > 0)) return ft("Indiquez au moins le nom et le prix par personne.");
      let [a] = If(m),
        u = {
          ...m,
          nom: m.nom.trim(),
          prixPersonne: String(m.prixPersonne).replace(",", "."),
          partsMin: String(a),
          partsMax: m.partsMax ? String(Math.max(a, parseInt(m.partsMax) || a)) : "",
        };
      set("plateaux", (d) => (m.id ? d.map((h) => (h.id === m.id ? u : h)) : [...d, { ...u, id: Wr() }])),
        setM(null);
    },
    [s, o] = m ? If(m) : [0, 0];
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "button",
      {
        className: "btn terra",
        onClick: () =>
          setM({
            nom: "",
            composition: "",
            prixPersonne: "",
            partsMin: "4",
            partsMax: "",
            photo: "",
            active: !0,
          }),
      },
      I10.plus(),
      "Nouveau plateau",
    ),
    React.default.createElement("div", { style: { height: 12 } }),
    !t.plateaux.length &&
      React.default.createElement(Vn, {
        t: "Aucun plateau",
        s: "Créez par exemple « Plateau charcuterie » à 8,50 € par personne, à partir de 4 personnes. Vos clients pourront le commander directement.",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      t.plateaux.map((a) => {
        let [u, d] = If(a);
        return React.default.createElement(
          "div",
          { className: "card", key: a.id },
          React.default.createElement(
            "div",
            { className: "row" },
            a.photo
              ? React.default.createElement("img", { className: "thumb", src: a.photo, alt: "" })
              : React.default.createElement("div", { className: "thumb" }),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, a.nom),
              React.default.createElement(
                "div",
                { className: "de" },
                a.partsMax ? u + " à " + d + " parts" : "À partir de " + u + " parts",
                kf(a) ? " · " + kf(a).options.length + " choix" : "",
              ),
              React.default.createElement(
                "div",
                { style: { marginTop: 5 } },
                React.default.createElement(Pastille, { x: a }),
                React.default.createElement(
                  "span",
                  { style: { fontSize: 13, fontWeight: 800, color: "var(--apple)", marginLeft: 6 } },
                  An(Ji(a)),
                  " / pers.",
                ),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement("button", { className: "ib", onClick: () => setM(a) }, I10.pen()),
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer « " + a.nom + " » ?")) &&
                    set("plateaux", (h) => h.filter((p) => p.id !== a.id)),
                },
                I10.bin(),
              ),
            ),
          ),
        );
      }),
    ),
    m &&
      React.default.createElement(
        ut,
        { titre: m.id ? "Modifier le plateau" : "Nouveau plateau", onClose: () => setM(null) },
        React.default.createElement(PhotoField, {
          value: m.photo,
          onChange: (a) => setM((u) => ({ ...u, photo: a })),
        }),
        React.default.createElement("label", { className: "lab" }, "Nom du plateau"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: m.nom,
          onChange: (a) => setM({ ...m, nom: a.target.value }),
          placeholder: "Plateau charcuterie",
          maxLength: 80,
        }),
        React.default.createElement("label", { className: "lab" }, "Ce qu'il y a dedans"),
        React.default.createElement("textarea", {
          className: "inp",
          rows: 4,
          value: m.composition,
          onChange: (a) => setM({ ...m, composition: a.target.value }),
          placeholder: `Jambon cru, rosette, terrine maison,
saucisson de Franche-Comté, cornichons, pain`,
        }),
        React.default.createElement("label", { className: "lab" }, "Prix par personne (€)"),
        React.default.createElement("input", {
          className: "inp",
          type: "number",
          inputMode: "decimal",
          step: "0.10",
          min: "0",
          value: m.prixPersonne,
          onChange: (a) => setM({ ...m, prixPersonne: a.target.value }),
          placeholder: "8.50",
        }),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Nombre de parts minimum"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "1",
              value: m.partsMin,
              onChange: (a) => setM({ ...m, partsMin: a.target.value }),
              placeholder: "4",
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Maximum (facultatif)"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "1",
              value: m.partsMax,
              onChange: (a) => setM({ ...m, partsMax: a.target.value }),
              placeholder: "Sans limite",
            }),
          ),
        ),
        Ji(m) > 0 &&
          React.default.createElement(
            "div",
            { className: "apercu-prix" },
            "Exemple : ",
            s,
            " pers. × ",
            An(Ji(m)),
            " = ",
            React.default.createElement("b", null, An(s * Ji(m))),
            m.partsMax &&
              o > s &&
              React.default.createElement(
                React.default.Fragment,
                null,
                " · ",
                o,
                " pers. = ",
                React.default.createElement("b", null, An(o * Ji(m))),
              ),
          ),
        React.default.createElement(EditionChoix, { m, setM }),
        React.default.createElement(Periode, { v: m, onChange: setM }),
        React.default.createElement(
          "div",
          { className: "tog", style: { marginTop: 6 } },
          React.default.createElement(
            "span",
            { style: { fontSize: 13, fontWeight: 700 } },
            "Visible par les clients",
          ),
          React.default.createElement(
            "div",
            { className: "rt" },
            React.default.createElement(ze, {
              on: m.active !== !1,
              set: () => setM({ ...m, active: m.active === !1 }),
            }),
          ),
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 12 }, onClick: i },
          "Enregistrer",
        ),
      ),
  );
}

// Choix proposés au client sur un plateau (fromages, charcuteries…)
function EditionChoix({ m, setM }) {
  let n = m.choix,
    [nouveau, setNouveau] = (0, React.useState)(""),
    s = (u) => setM({ ...m, choix: { ...n, ...u } }),
    o = n?.options || [],
    a = (u, d) => s({ options: o.map((h, p) => (p === u ? { ...h, ...d } : h)) });
  return n
    ? React.default.createElement(
        "div",
        { className: "choix-bloc" },
        React.default.createElement(
          "div",
          { className: "nm", style: { fontSize: 13, marginBottom: 6 } },
          "Choix proposés au client",
        ),
        React.default.createElement("label", { className: "lab" }, "Titre affiché"),
        React.default.createElement("input", {
          className: "inp",
          value: n.titre,
          maxLength: 60,
          placeholder: "Ex : Vos fromages à raclette",
          onChange: (u) => s({ titre: u.target.value }),
        }),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10, marginTop: 8 } },
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Minimum à cocher"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "0",
              value: n.min,
              onChange: (u) => s({ min: u.target.value }),
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Maximum"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "1",
              value: n.max,
              onChange: (u) => s({ max: u.target.value }),
            }),
          ),
        ),
        React.default.createElement(
          "label",
          { className: "lab", style: { marginTop: 8 } },
          "Options ",
          React.default.createElement(
            "span",
            { style: { fontWeight: 600 } },
            "(supplément par personne, 0 = même prix)",
          ),
        ),
        o.map((u, d) =>
          React.default.createElement(
            "div",
            { className: "opt-ligne", key: d },
            React.default.createElement("input", {
              className: "inp",
              value: u.nom,
              maxLength: 60,
              onChange: (h) => a(d, { nom: h.target.value }),
            }),
            React.default.createElement(
              "div",
              { className: "opt-supp" },
              React.default.createElement("span", null, "+"),
              React.default.createElement("input", {
                className: "inp",
                type: "number",
                inputMode: "decimal",
                step: "0.5",
                min: "0",
                value: u.supp,
                onChange: (h) => a(d, { supp: h.target.value }),
              }),
              React.default.createElement("span", null, "€"),
            ),
            React.default.createElement(
              "button",
              {
                className: "ib",
                onClick: () => s({ options: o.filter((h, p) => p !== d) }),
                "aria-label": "Retirer",
              },
              I10.bin(),
            ),
          ),
        ),
        React.default.createElement(
          "div",
          { className: "opt-ligne" },
          React.default.createElement("input", {
            className: "inp",
            value: nouveau,
            maxLength: 60,
            placeholder: "Ajouter une option…",
            onChange: (u) => setNouveau(u.target.value),
            onKeyDown: (u) => {
              u.key === "Enter" &&
                nouveau.trim() &&
                (s({ options: [...o, { nom: nouveau.trim(), supp: 0 }] }), setNouveau(""));
            },
          }),
          React.default.createElement(
            "button",
            {
              className: "btn sm",
              disabled: !nouveau.trim(),
              onClick: () => {
                s({ options: [...o, { nom: nouveau.trim(), supp: 0 }] }), setNouveau("");
              },
            },
            "Ajouter",
          ),
        ),
        React.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { marginTop: 8, color: "var(--red)" },
            onClick: async () =>
              (await De("Retirer tous les choix de ce plateau ?")) && setM({ ...m, choix: null }),
          },
          "Retirer les choix",
        ),
      )
    : React.default.createElement(
        "div",
        { className: "choix-bloc" },
        React.default.createElement(
          "div",
          { className: "nm", style: { fontSize: 13 } },
          "Choix proposés au client ",
          React.default.createElement("span", { className: "de" }, "(facultatif)"),
        ),
        React.default.createElement(
          "div",
          { className: "de", style: { margin: "2px 0 8px" } },
          "Le client coche ce qu'il préfère : fromages, charcuteries…",
        ),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
          React.default.createElement(
            "button",
            {
              className: "btn gh sm",
              onClick: () => setM({ ...m, choix: JSON.parse(JSON.stringify(LISTE_RACLETTE)) }),
            },
            "🧀 Fromages à raclette",
          ),
          React.default.createElement(
            "button",
            {
              className: "btn gh sm",
              onClick: () => setM({ ...m, choix: { titre: "", min: 1, max: 1, options: [] } }),
            },
            "+ Liste vide",
          ),
        ),
      );
}

// Réglages des commandes (délais, jours, horaires, livraison, e-mails).
function ReglagesCmd({ d: t, set }) {
  let n = Er(t.cmd),
    r = (A, S) => set("cmd", (_) => ({ ...Er(_), [A]: S })),
    i = YS(n, t.fermetures),
    [s, setDu] = (0, React.useState)(""),
    [a, setAu] = (0, React.useState)(""),
    [test, setTest] = (0, React.useState)(""),
    p = async () => {
      let A = JS(n);
      if (!A) return setTest("Collez d'abord l'adresse du script.");
      setTest("Envoi…");
      try {
        await fetch(A, { method: "GET", mode: "no-cors", redirect: "follow" }),
          setTest(
            "Demande de test envoyée. Vérifiez que l'e-mail « [TEST] Nouvelle commande » est bien arrivé (en général en moins d'une minute, regardez aussi les indésirables). Rien reçu après quelques minutes ? Prévenez Eric.",
          );
      } catch {
        setTest("Envoi impossible : vérifiez la connexion internet et réessayez.");
      }
    },
    m = ac(n.script),
    [ouvrirScript, setOuvrirScript] = (0, React.useState)(!1);
  return React.default.createElement(
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
          React.default.createElement("div", { className: "nm" }, "Commandes en ligne"),
          React.default.createElement(
            "div",
            { className: "de" },
            "Désactivez-les pendant vos congés, par exemple",
          ),
        ),
        React.default.createElement(
          "div",
          { className: "rt" },
          React.default.createElement(ze, { on: n.active, set: () => r("active", !n.active) }),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 4 } },
        "Calendrier des clients",
      ),
      React.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 10 } },
        "Vous décidez quelles dates les clients peuvent choisir.",
      ),
      React.default.createElement("label", { className: "lab" }, "Délai minimum avant le retrait"),
      React.default.createElement(
        "select",
        { className: "inp", value: n.delaiMin, onChange: (A) => r("delaiMin", Number(A.target.value)) },
        [0, 1, 2, 3, 4, 5, 6, 7, 10, 14].map((A) =>
          React.default.createElement(
            "option",
            { key: A, value: A },
            A === 0
              ? "Aucun (le jour même possible)"
              : A === 1
                ? "1 jour (pas le jour même)"
                : A + " jours (ni aujourd'hui" + (A > 1 ? ", ni demain" : "") + (A > 2 ? "…" : "") + ")",
          ),
        ),
      ),
      React.default.createElement(
        "label",
        { className: "lab", style: { marginTop: 10 } },
        "Les clients peuvent commander jusqu'à",
      ),
      React.default.createElement(
        "select",
        { className: "inp", value: n.horizon, onChange: (A) => r("horizon", Number(A.target.value)) },
        [14, 30, 45, 60, 90, 120].map((A) =>
          React.default.createElement("option", { key: A, value: A }, A, " jours à l'avance"),
        ),
      ),
      React.default.createElement(
        "label",
        { className: "lab", style: { marginTop: 10 } },
        "Jours où vous acceptez les retraits / livraisons",
      ),
      React.default.createElement(
        "div",
        { className: "jours-sem" },
        QS.map(([A, S]) => {
          let _ = (n.jours || []).includes(A);
          return React.default.createElement(
            "button",
            {
              key: A,
              className: _ ? "on" : "",
              onClick: () => {
                let I = _ ? n.jours.filter((T) => T !== A) : [...n.jours, A];
                I.length && r("jours", I);
              },
            },
            S,
          );
        }),
      ),
      React.default.createElement(
        "label",
        { className: "lab", style: { marginTop: 12 } },
        "Fermetures (congés, jours fériés…)",
      ),
      (n.fermes || []).map((A, S) =>
        React.default.createElement(
          "div",
          { className: "tog", key: S },
          React.default.createElement(
            "span",
            { style: { fontSize: 13, fontWeight: 700 } },
            A.au && A.au !== A.du ? "Du " + jourFr(A.du) + " au " + jourFr(A.au) : "Le " + jourFr(A.du),
          ),
          React.default.createElement(
            "div",
            { className: "rt" },
            React.default.createElement(
              "button",
              {
                className: "ib",
                onClick: () =>
                  r(
                    "fermes",
                    n.fermes.filter((_, I) => I !== S),
                  ),
              },
              I10.bin(),
            ),
          ),
        ),
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, alignItems: "flex-end", marginTop: 6 } },
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("label", { className: "lab" }, "Du"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            value: s,
            onChange: (A) => setDu(A.target.value),
          }),
        ),
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("label", { className: "lab" }, "Au (facultatif)"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            min: s || void 0,
            value: a,
            onChange: (A) => setAu(A.target.value),
          }),
        ),
      ),
      React.default.createElement(
        "button",
        {
          className: "btn gh sm",
          style: { marginTop: 8 },
          disabled: !s,
          onClick: () => {
            r(
              "fermes",
              [...(n.fermes || []), { du: s, au: a && a >= s ? a : s }].sort((A, S) =>
                A.du.localeCompare(S.du),
              ),
            ),
              setDu(""),
              setAu("");
          },
        },
        "Ajouter cette fermeture",
      ),
      React.default.createElement(
        "div",
        { className: "apercu-prix", style: { marginTop: 12 } },
        i.premiere
          ? React.default.createElement(
              React.default.Fragment,
              null,
              "Aujourd'hui, la première date proposée aux clients est le ",
              React.default.createElement("b", null, dateCourte(i.premiere)),
              ".",
            )
          : React.default.createElement(
              React.default.Fragment,
              null,
              "Aucune date n'est proposée aux clients avec ces réglages.",
            ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 8 } },
        "Retrait ou livraison",
      ),
      React.default.createElement(
        "div",
        { className: "seg", style: { marginBottom: 10 } },
        [
          ["retrait", "Retrait"],
          ["livraison", "Livraison"],
          ["choix", "Au choix"],
        ].map(([A, S]) =>
          React.default.createElement(
            "button",
            { key: A, className: n.mode === A ? "on" : "", onClick: () => r("mode", A) },
            S,
          ),
        ),
      ),
      React.default.createElement("label", { className: "lab" }, "Heure de retrait proposée par défaut"),
      React.default.createElement("input", {
        className: "inp",
        type: "time",
        step: "900",
        value: n.heureDefaut,
        onChange: (A) => r("heureDefaut", A.target.value),
        style: { maxWidth: 200 },
      }),
      React.default.createElement(
        "div",
        { className: "de", style: { margin: "4px 2px 10px" } },
        "Vous la confirmez ou la changez pour chaque commande en l'acceptant.",
      ),
      React.default.createElement("label", { className: "lab" }, "Message affiché aux clients (facultatif)"),
      React.default.createElement("textarea", {
        className: "inp",
        value: n.note,
        onChange: (A) => r("note", A.target.value),
        placeholder: "Ex : Livraison uniquement sur Raddon et les communes voisines.",
        maxLength: 300,
      }),
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 4 } },
        "E-mail « commande à préparer »",
      ),
      React.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 10 } },
        m
          ? "✓ Configuré : vous recevez un e-mail à chaque nouvelle commande."
          : "Pas encore configuré. Les commandes arrivent quand même ici, dans l'onglet Commandes.",
      ),
      !m || ouvrirScript
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "label",
              { className: "lab" },
              "Adresse du script Google (réglage technique)",
            ),
            React.default.createElement("input", {
              className: "inp",
              value: n.script,
              placeholder: "https://script.google.com/macros/s/…/exec",
              autoCapitalize: "off",
              autoCorrect: "off",
              spellCheck: !1,
              onChange: (A) => r("script", A.target.value.trim()),
            }),
            n.script &&
              !m &&
              React.default.createElement(
                "div",
                { className: "cmd-alerte" },
                "Cette adresse ne ressemble pas à celle d'un script déployé (elle doit finir par /exec).",
              ),
            React.default.createElement(
              "label",
              { className: "lab" },
              "Clé des notifications (Firebase → Cloud Messaging → Certificats Web Push)",
            ),
            React.default.createElement("input", {
              className: "inp",
              value: t.push?.vapid || "",
              placeholder: "B…",
              autoCapitalize: "off",
              autoCorrect: "off",
              spellCheck: !1,
              onChange: (A) => set("push", (S) => ({ ...(S || {}), vapid: A.target.value.trim() })),
            }),
            t.push?.vapid &&
              !/^[A-Za-z0-9_-]{80,100}$/.test(t.push.vapid) &&
              React.default.createElement(
                "div",
                { className: "cmd-alerte" },
                "Cette clé ne ressemble pas à une clé « Web Push » (environ 87 caractères).",
              ),
            m &&
              React.default.createElement(
                "button",
                { className: "btn gh sm", style: { marginTop: 8 }, onClick: () => setOuvrirScript(!1) },
                "Masquer",
              ),
          )
        : React.default.createElement(
            "button",
            {
              className: "lienadm",
              onClick: async () =>
                (await De(`Réglage technique : ne modifiez cette adresse que si Eric vous le demande.

Afficher quand même ?`)) && setOuvrirScript(!0),
            },
            "Réglage technique (réservé à Eric)",
          ),
      React.default.createElement(
        "button",
        { className: "btn gh sm", style: { marginTop: 10 }, onClick: p },
        "Envoyer un e-mail de test",
      ),
      test &&
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 6, fontWeight: 700 } },
          test,
        ),
    ),
  );
}
