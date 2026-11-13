/* ═══════════════════════════════════════════════════════════════════════
 *  LA CARTE (plateaux à commander + autres offres) — panier, choix, calendrier de retrait, commande et suivi.
 * ═══════════════════════════════════════════════════════════════════════ */

// Commandes gardées sur le téléphone (identifiants secrets) : lecture et enregistrement.
var CMD_KEY = "epicerie-raddonnaise-commandes",
  Dn = () => {
    try {
      return JSON.parse(localStorage.getItem(CMD_KEY) || "[]");
    } catch {
      return [];
    }
  },
  $a = (t) => {
    try {
      localStorage.setItem(CMD_KEY, JSON.stringify(t.slice(0, 10)));
    } catch {}
  };

// Suivi en temps réel des commandes passées depuis ce téléphone
// (chaque commande est lue avec son identifiant secret gardé sur le téléphone)
// Commandes du client, suivies en direct.
function useMesCommandes(t) {
  let [liste, setListe] = (0, React.useState)(Dn),
    [live, setLive] = (0, React.useState)({});
  (0, React.useEffect)(() => {
    setListe(Dn());
  }, [t]);
  let o = liste.filter((h) => h.ref && (Ua(h) || "") >= Wt(Ko(-14))).map((h) => h.ref);
  (0, React.useEffect)(() => {
    let h = o.map((f) =>
      onSnapshot(
        doc2(db, "commandes", f),
        (m) =>
          setLive((E) => ({
            ...E,
            [f]: m.exists() ? m.data() : m.metadata?.fromCache ? E[f] : { statut: "supprimee" },
          })),
        () => {},
      ),
    );
    return () => h.forEach((f) => f());
  }, [o.join()]);
  let s = liste
      .map((h) => {
        let f = h.ref && live[h.ref];
        return f
          ? {
              ...h,
              statut: f.statut,
              heure: f.heure || "",
              dateRetrait: f.dateRetrait || "",
              message: f.message || "",
              date: f.date || h.date,
              lignes: f.lignes || [],
              conv: f.conv || "",
            }
          : h;
      })
      .filter((h) => h.statut !== "supprimee"),
    l = Object.keys(live)
      .filter((h) => live[h]?.statut === "supprimee")
      .join();
  return (
    (0, React.useEffect)(() => {
      if (!l) return;
      let h = l.split(","),
        f = Dn().filter((m) => !h.includes(m.ref));
      f.length !== Dn().length && ($a(f), setListe(f));
    }, [l]),
    [
      s,
      (h, f) => {
        let m = Dn().map((E) => (E.ref === h ? { ...E, vu: f } : E));
        $a(m), setListe(m);
      },
      (h) => {
        let f = Dn().filter((m) => m.numero !== h);
        $a(f), setListe(f);
      },
    ]
  );
}

// Statuts de commande qui déclenchent une alerte au client.
var AVERTIR = ["acceptee", "prete", "refusee", "annulee"],
  cT = (t) => t.ref && t.statut && AVERTIR.includes(t.statut) && t.vu !== t.statut;

// Phrase de suivi pour le client
function phraseSuivi(t) {
  let e = t.mode === "livraison",
    n = Ua(t),
    r = Wt(new Date()),
    i =
      (n === r ? "aujourd'hui" : n === Wt(Ko(1)) ? "demain" : "le " + jourFr(n)) +
      (t.heure ? " à " + l5(t.heure) : "");
  switch (t.statut) {
    case "acceptee":
    case "prep":
      return e ? "Validée : livraison prévue " + i + "." : "Validée : à venir chercher " + i + ".";
    case "prete":
      return e
        ? "Votre commande est prête, livraison " + i + "."
        : "Votre commande est prête ! Elle vous attend " + i + ".";
    case "refusee":
      return "L'épicerie n'a pas pu accepter cette commande.";
    case "annulee":
      return "Cette commande a été annulée.";
    case "remise":
      return "Commande retirée. Merci et bonne dégustation !";
    default:
      return "Envoyée, en attente de validation par l'épicerie.";
  }
}

// Boutons « Ajouter à mon agenda ».
function BoutonsRappel({ c, store }) {
  return !c.heure || !["acceptee", "prep", "prete"].includes(c.statut)
    ? null
    : React.default.createElement(
        "div",
        { className: "rappel" },
        React.default.createElement(
          "button",
          {
            className: "btn",
            onClick: () => {
              let r = document.createElement("a");
              (r.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(fichierAgenda(c, store))),
                (r.download = "commande-" + c.numero + ".ics"),
                document.body.appendChild(r),
                r.click(),
                r.remove();
            },
          },
          "🔔 Me le rappeler (agenda du téléphone)",
        ),
        React.default.createElement(
          "a",
          { className: "lien", href: lienGoogleAgenda(c, store), target: "_blank", rel: "noopener" },
          "ou l'ajouter à Google Agenda",
        ),
      );
}

// Suivi d'une commande (statut, date et heure, rappels, recommander).
function SuiviCommande({ c, store, compact, recommander, oublier }) {
  let o = SUIVI[c.statut] || SUIVI.nouvelle;
  return React.default.createElement(
    "div",
    { className: "suivi" + (compact ? " compact" : ""), style: { borderLeftColor: o.c } },
    React.default.createElement(
      "div",
      { className: "suivi-hd" },
      React.default.createElement("b", null, c.numero),
      React.default.createElement("span", { style: { background: o.c } }, o.t),
    ),
    React.default.createElement("div", { className: "suivi-tx" }, phraseSuivi(c)),
    c.message &&
      React.default.createElement(
        "div",
        { className: "suivi-msg" },
        "« ",
        c.message,
        " »",
        React.default.createElement("small", null, "— l'épicerie"),
      ),
    !compact &&
      c.resume &&
      React.default.createElement(
        "div",
        { className: "suivi-res" },
        c.resume,
        c.total ? " · " + ze(c.total) : "",
      ),
    React.default.createElement(BoutonsRappel, { c, store }),
    recommander &&
      !compact &&
      ["remise", "refusee", "annulee", "prete", "prep", "acceptee"].includes(c.statut) &&
      c.lignes?.length > 0 &&
      React.default.createElement(
        "button",
        { className: "lien", style: { marginTop: 8 }, onClick: () => recommander(c.lignes) },
        "🔁 Recommander la même chose",
      ),
    oublier &&
      !compact &&
      React.default.createElement(
        "button",
        {
          className: "lien",
          style: { marginTop: 8, marginLeft: 12, color: "var(--ink3)" },
          onClick: async () =>
            (await p0(
              "Retirer la commande " +
                c.numero +
                ` de ce téléphone ?

Si l'épicerie l'a bien reçue, elle reste enregistrée chez elle.`,
              { oui: "Retirer" },
            )) && oublier(c.numero),
        },
        "Retirer de ma liste",
      ),
  );
}

// Fenêtre qui s'ouvre quand l'épicerie a répondu
// Alerte quand une commande change de statut (acceptée, prête…).
function AlerteCommande({ c, store, onClose }) {
  let r = c.statut === "acceptee" || c.statut === "prete";
  return React.default.createElement(
    "div",
    { className: "sheet-fond", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "sheet", onClick: (i) => i.stopPropagation(), role: "dialog" },
      React.default.createElement("div", { className: "ok-rond" + (r ? "" : " non") }, r ? "✓" : "!"),
      React.default.createElement(
        "h3",
        { className: "alerte-t" },
        c.statut === "prete"
          ? "Votre commande est prête !"
          : r
            ? "Commande validée !"
            : "Commande non acceptée",
      ),
      React.default.createElement(SuiviCommande, { c, store }),
      !r &&
        store.phone &&
        React.default.createElement(
          "a",
          { href: "tel:" + store.phone.replace(/\s/g, ""), style: { textDecoration: "none" } },
          React.default.createElement(
            "button",
            { className: "btn gh", style: { marginTop: 8 } },
            "Appeler l'épicerie",
          ),
        ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { marginTop: 8 }, onClick: onClose },
        r ? "Merci !" : "J'ai compris",
      ),
    ),
  );
}

// Onglet La carte : plateaux et paniers à commander, autres offres, mes commandes.
function Carte({ d: t, panier, choisir, mesCmds, recommander, oublier, demanderDevis }) {
  let s = t.offres.filter(vn),
    l = t.plateaux.filter(vn),
    u = [...new Set(s.map((f) => f.type).filter(Boolean))],
    d = Nn(t.cmd),
    h = mesCmds;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    !!l.length &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", { style: { background: "var(--terra)" } }),
          "Plateaux à commander",
        ),
        React.default.createElement(
          "div",
          { className: "sub" },
          "Choisissez votre plateau et le nombre de personnes : le prix se calcule tout seul",
        ),
        d.note && React.default.createElement("div", { className: "cmd-note" }, d.note),
        l.map((f) => {
          let [m, E] = x2(f),
            F = panier.find((D) => D.id === f.id);
          return React.default.createElement(
            "div",
            { className: "card", key: f.id },
            f.photo && React.default.createElement("img", { className: "ph", src: f.photo, alt: "" }),
            React.default.createElement(
              "div",
              { className: "b" },
              React.default.createElement("h3", null, f.nom),
              f.composition &&
                React.default.createElement("p", { style: { whiteSpace: "pre-line" } }, f.composition),
              Qo(f) &&
                React.default.createElement(
                  "p",
                  { className: "ch-annonce" },
                  "🧀 ",
                  Qo(f).titre,
                  " : ",
                  Qo(f).options.length,
                  " au choix",
                ),
              React.default.createElement(
                "div",
                { className: "foot" },
                React.default.createElement(
                  "div",
                  null,
                  React.default.createElement("span", { className: "px" }, ze(xc(f))),
                  React.default.createElement("span", { className: "pp" }, " / personne"),
                  React.default.createElement(
                    "div",
                    { className: "serves" },
                    m === E ? "Pour " + m + " personnes" : "De " + m + " à " + E + " personnes",
                  ),
                ),
                d.active &&
                  React.default.createElement(
                    "button",
                    { className: "btn choisir", onClick: () => choisir(f) },
                    F ? F.personnes + " pers. ✓" : "Choisir",
                  ),
              ),
            ),
          );
        }),
        !d.active &&
          t.store.phone &&
          React.default.createElement(
            "div",
            { className: "cmd-note" },
            "Les commandes en ligne sont momentanément fermées. Appelez-nous au ",
            t.store.phone,
            ".",
          ),
      ),
    !!s.length &&
      React.default.createElement(
        React.default.Fragment,
        null,
        !!l.length && React.default.createElement(Deco, null),
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", null),
          l.length ? "Paniers & autres offres" : "Plateaux & paniers",
        ),
        React.default.createElement(
          "div",
          { className: "sub" },
          "Sur commande — prévenez-nous à l'avance, on prépare tout",
        ),
        (u.length ? u : [null]).map((f) =>
          React.default.createElement(
            "div",
            { key: f || "x" },
            f &&
              React.default.createElement(
                "div",
                {
                  style: {
                    fontFamily: "var(--script)",
                    fontSize: 24,
                    color: "var(--terra)",
                    margin: "16px 0 8px",
                  },
                },
                f,
              ),
            s
              .filter((m) => !f || m.type === f)
              .map((m) =>
                React.default.createElement(
                  "div",
                  { className: "card", key: m.id },
                  m.photo && React.default.createElement("img", { className: "ph", src: m.photo, alt: "" }),
                  m.badge && React.default.createElement("span", { className: "badge" }, m.badge),
                  React.default.createElement(
                    "div",
                    { className: "b" },
                    React.default.createElement("h3", null, m.titre),
                    m.desc && React.default.createElement("p", null, m.desc),
                    // v2.46a : loi Évin
                    besoinEvin(m.titre, m.desc) && React.default.createElement("div", { className: "evin" }, MENTION_ALCOOL),
                    React.default.createElement(
                      "div",
                      { className: "foot" },
                      React.default.createElement(
                        "span",
                        { className: "px" },
                        m.prix ? Number(m.prix).toFixed(2) + " €" : "Sur devis",
                      ),
                      m.portions && React.default.createElement("span", { className: "serves" }, m.portions),
                    ),
                    // v2.46j : offre sur devis → bouton de demande (messagerie, ou téléphone si elle est coupée)
                    !m.prix &&
                      (demanderDevis
                        ? React.default.createElement(
                            "button",
                            { className: "btn", style: { marginTop: 12 }, onClick: () => demanderDevis(m.titre) },
                            "Demander un devis",
                          )
                        : t.store.phone &&
                          React.default.createElement(
                            "a",
                            { href: "tel:" + t.store.phone.replace(/\s/g, ""), style: { textDecoration: "none" } },
                            React.default.createElement(
                              "button",
                              { className: "btn", style: { marginTop: 12 } },
                              "Demander un devis — ",
                              t.store.phone,
                            ),
                          )),
                  ),
                ),
              ),
          ),
        ),
        t.store.phone &&
          React.default.createElement(
            "a",
            { href: "tel:" + t.store.phone.replace(/\s/g, ""), style: { textDecoration: "none" } },
            React.default.createElement(
              "button",
              { className: "btn gh", style: { marginTop: 8 } },
              "Commander par téléphone — ",
              t.store.phone,
            ),
          ),
      ),
    !s.length &&
      !l.length &&
      React.default.createElement(dx, {
        t: "La carte arrive bientôt",
        s: "Plateaux apéritifs, paniers garnis et corbeilles de fruits seront présentés ici, en photo.",
      }),
    !!h.length &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, { a: "left" }),
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", null),
          "Mes commandes envoyées",
        ),
        React.default.createElement("div", { className: "sub" }, "Enregistrées sur ce téléphone"),
        h.slice(0, 5).map((f) =>
          f.ref
            ? React.default.createElement(SuiviCommande, {
                key: f.numero,
                c: f,
                store: t.store,
                recommander,
                oublier,
              })
            : React.default.createElement(
                "div",
                { className: "cmd-hist", key: f.numero },
                React.default.createElement(
                  "div",
                  null,
                  React.default.createElement("b", null, f.numero),
                  " · pour le ",
                  jourFr(f.date),
                ),
                React.default.createElement("div", null, f.resume),
                React.default.createElement("div", { className: "t" }, ze(f.total)),
                oublier &&
                  React.default.createElement(
                    "button",
                    {
                      className: "lien",
                      style: { marginTop: 6 },
                      onClick: async () =>
                        (await p0("Retirer la commande " + f.numero + " de ce téléphone ?")) &&
                        oublier(f.numero),
                    },
                    "Retirer de ma liste",
                  ),
              ),
        ),
      ),
  );
}

// Choix du nombre de personnes pour un plateau
function ChoixPlateau({ p, actuel, onValider, onRetirer, onClose }) {
  let [o, s] = x2(p),
    l = Qo(p),
    [n, setN] = (0, React.useState)(actuel?.personnes || o),
    [sel, setSel] = (0, React.useState)(() =>
      (actuel?.choix || []).filter((M) => l?.options.some((C) => C.nom === M)),
    ),
    m = (M) =>
      setSel((C) =>
        C.includes(M) ? C.filter((A) => A !== M) : l.max === 1 ? [M] : C.length >= l.max ? C : [...C, M],
      ),
    E = w2(p, sel),
    F = parseInt(n) || 0,
    D = !l || (sel.length >= Math.max(l.min, 0) && sel.length <= l.max);
  return React.default.createElement(
    "div",
    { className: "sheet-fond", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "sheet", onClick: (M) => M.stopPropagation(), role: "dialog", "aria-label": p.nom },
      React.default.createElement(
        "div",
        { className: "sheet-hd" },
        p.photo && React.default.createElement("img", { src: p.photo, alt: "" }),
        React.default.createElement(
          "div",
          null,
          React.default.createElement("h3", null, p.nom),
          React.default.createElement("span", null, ze(xc(p)), " par personne"),
        ),
      ),
      l &&
        React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            "div",
            { className: "lab", style: { marginTop: 14 } },
            l.titre,
            React.default.createElement(
              "span",
              { className: "ch-regle" },
              l.min === l.max
                ? " · choisissez-en " + l.min
                : l.min > 0
                  ? " · de " + l.min + " à " + l.max
                  : " · jusqu'à " + l.max,
            ),
          ),
          React.default.createElement(
            "div",
            { className: "ch-liste" },
            l.options.map((M) => {
              let C = sel.includes(M.nom),
                A = !C && l.max > 1 && sel.length >= l.max;
              return React.default.createElement(
                "button",
                {
                  key: M.nom,
                  className: "ch" + (C ? " on" : "") + (A ? " bloque" : ""),
                  onClick: () => m(M.nom),
                  "aria-pressed": C,
                },
                React.default.createElement("span", { className: "ch-case" }, C ? "✓" : ""),
                React.default.createElement("span", { className: "ch-nom" }, M.nom),
                M.supp > 0 &&
                  React.default.createElement("span", { className: "ch-supp" }, "+", ze(M.supp), "/pers."),
              );
            }),
          ),
          React.default.createElement(
            "div",
            { className: "ch-compte" },
            sel.length,
            " / ",
            l.max,
            " choisi",
            sel.length > 1 ? "s" : "",
            !D && l.min > sel.length ? " · encore " + (l.min - sel.length) + " à choisir" : "",
          ),
        ),
      React.default.createElement(
        "div",
        { className: "lab", style: { textAlign: "center", marginTop: 14 } },
        "Nombre de personnes",
      ),
      React.default.createElement(
        "div",
        { className: "pas" },
        React.default.createElement(
          "button",
          {
            onClick: () => setN(Math.max(o, F - 1)),
            disabled: F <= o,
            "aria-label": "Une personne de moins",
          },
          "−",
        ),
        React.default.createElement("input", {
          type: "number",
          inputMode: "numeric",
          value: n,
          min: o,
          max: s,
          onChange: (M) =>
            setN(M.target.value === "" ? "" : Math.min(s, Math.max(0, parseInt(M.target.value) || 0))),
          onBlur: () => setN(Math.min(s, Math.max(o, F || o))),
          "aria-label": "Nombre de personnes",
        }),
        React.default.createElement(
          "button",
          {
            onClick: () => setN(Math.min(s, (F || o) + 1)),
            disabled: F >= s,
            "aria-label": "Une personne de plus",
          },
          "+",
        ),
      ),
      React.default.createElement(
        "div",
        { className: "pas-info" },
        o === s ? "Plateau pour " + o + " personnes" : "De " + o + " à " + s + " personnes",
      ),
      React.default.createElement(
        "div",
        { className: "calcul" },
        F,
        " × ",
        ze(E),
        " = ",
        React.default.createElement("b", null, ze(F * E)),
      ),
      React.default.createElement(
        "button",
        { className: "btn", disabled: !(F >= o && F <= s) || !D, onClick: () => onValider(F, sel) },
        D
          ? (actuel ? "Mettre à jour" : "Ajouter à ma commande") + " — " + ze(F * E || 0)
          : "Choisissez " +
              (l.min === l.max ? l.min : "au moins " + l.min) +
              " option" +
              (l.min > 1 ? "s" : ""),
      ),
      actuel
        ? React.default.createElement(
            "button",
            { className: "btn gh", style: { marginTop: 8 }, onClick: onRetirer },
            "Retirer ce plateau",
          )
        : React.default.createElement(
            "button",
            { className: "btn gh", style: { marginTop: 8 }, onClick: onClose },
            "Annuler",
          ),
    ),
  );
}

// Barre « Ma commande » en bas d'écran
function BarrePanier({ lignes, onOuvrir }) {
  if (!lignes.length) return null;
  let n = lignes.reduce((r, i) => r + i.montant, 0);
  return React.default.createElement(
    "button",
    { className: "barre-panier", onClick: onOuvrir },
    React.default.createElement(
      "span",
      null,
      React.default.createElement("b", null, "Ma commande"),
      " · ",
      lignes.length,
      " plateau",
      lignes.length > 1 ? "x" : "",
    ),
    React.default.createElement("span", { className: "t" }, ze(n), " →"),
  );
}

// Calendrier : seules les dates autorisées par Marion sont cliquables
function Calendrier({ regle, value, onChange }) {
  let [mois, setMois] = (0, React.useState)(() => (value || regle.premiere || regle.min).slice(0, 7)),
    [o, s] = mois.split("-").map(Number),
    l = new Date(o, s - 1, 1, 12),
    u = (l.getDay() + 6) % 7,
    d = new Date(o, s, 0).getDate(),
    h = [...Array(u).fill(null), ...Array.from({ length: d }, (m, E) => Wt(new Date(o, s - 1, E + 1, 12)))],
    f = (m) => setMois(Wt(new Date(o, s - 1 + m, 1, 12)).slice(0, 7));
  return React.default.createElement(
    "div",
    { className: "cal" },
    React.default.createElement(
      "div",
      { className: "cal-hd" },
      React.default.createElement(
        "button",
        {
          disabled: mois <= regle.min.slice(0, 7),
          onClick: () => f(-1),
          "aria-label": "Mois précédent",
        },
        "‹",
      ),
      React.default.createElement(
        "b",
        null,
        l.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
      ),
      React.default.createElement(
        "button",
        { disabled: mois >= regle.max.slice(0, 7), onClick: () => f(1), "aria-label": "Mois suivant" },
        "›",
      ),
    ),
    React.default.createElement(
      "div",
      { className: "cal-g" },
      ["L", "M", "M", "J", "V", "S", "D"].map((m, E) =>
        React.default.createElement("span", { key: "h" + E, className: "cal-j" }, m),
      ),
      h.map((m, E) =>
        m
          ? React.default.createElement(
              "button",
              {
                key: m,
                disabled: !regle.ok(m),
                className: "cal-d" + (m === value ? " on" : ""),
                onClick: () => onChange(m),
                "aria-label": jourFr(m),
                "aria-pressed": m === value,
              },
              +m.slice(8),
            )
          : React.default.createElement("span", { key: "v" + E }),
      ),
    ),
  );
}

// Les 14 allergènes à déclaration obligatoire + régimes courants
var ALLERGENES = [
    "Gluten",
    "Lait / lactose",
    "Œufs",
    "Fruits à coque",
    "Arachides",
    "Poisson",
    "Crustacés",
    "Mollusques",
    "Soja",
    "Céleri",
    "Moutarde",
    "Sésame",
    "Sulfites",
    "Lupin",
  ],
  REGIMES = ["Sans porc", "Végétarien", "Sans alcool"],
  ALLERG_PREFIXE = "⚠\uFE0F Allergies / régime : ";

// Récapitulatif, date, coordonnées et envoi
function Commande({ d: t, moi, lignes, modifier, vider, onClose, ouvrirLegal, onEnvoyee, notifs, inst }) {
  let h = Nn(t.cmd),
    f = (0, React.useMemo)(() => y2(h, t.fermetures), [t.cmd, t.fermetures]),
    m = Dn()[0] || {},
    [date, setDate] = (0, React.useState)(""),
    [mode, setMode] = (0, React.useState)(h.mode === "livraison" ? "livraison" : "retrait"),
    [nom, setNom] = (0, React.useState)(moi?.nom || m.nom || Sf().prenom || ""),
    [tel, setTel] = (0, React.useState)(m.tel || ""),
    [adresse, setAdresse] = (0, React.useState)(m.adresse || ""),
    [remarque, setRemarque] = (0, React.useState)(""),
    [allergies, setAllergies] = (0, React.useState)([]),
    k = (Q) => setAllergies((Ae) => (Ae.includes(Q) ? Ae.filter((ot) => ot !== Q) : [...Ae, Q])),
    [etat, setEtat] = (0, React.useState)(""),
    [fini, setFini] = (0, React.useState)(null),
    se = lignes.reduce((Q, Ae) => Q + Ae.montant, 0),
    R = lignes.length
      ? date
        ? nom.trim()
          ? tel.replace(/\D/g, "").length < 10
            ? "Indiquez un numéro de téléphone pour que l'épicerie puisse vous joindre."
            : mode === "livraison" && !adresse.trim()
              ? "Indiquez l'adresse de livraison."
              : ""
          : "Indiquez votre nom."
        : "Choisissez une date de " + (mode === "livraison" ? "livraison" : "retrait") + "."
      : "Ajoutez au moins un plateau.",
    fe = async () => {
      if (R || etat === "envoi") return;
      if (!f.ok(date)) {
        setEtat("Cette date n'est plus disponible, choisissez-en une autre."), setDate("");
        return;
      }
      setEtat("envoi");
      let Q = {
          numero: i5(),
          cree: Date.now(),
          statut: "nouvelle",
          nom: nom.trim().slice(0, 60),
          tel: tel.trim().slice(0, 20),
          mode,
          adresse: mode === "livraison" ? adresse.trim().slice(0, 200) : "",
          date,
          remarque: [allergies.length ? ALLERG_PREFIXE + allergies.join(", ") : "", remarque.trim()]
            .filter(Boolean)
            .join(
              `
`,
            )
            .slice(0, 500),
          carte: moi?.code || "",
          lignes: lignes.map((st) => ({
            id: String(st.id),
            nom: st.nom.slice(0, 300),
            choix: (st.choix || []).slice(0, 12),
            personnes: st.personnes,
            prixPersonne: Math.round(st.prixPersonne * 100) / 100,
            montant: Math.round(st.montant * 100) / 100,
          })),
          total: Math.round(se * 100) / 100,
        },
        Ae = doc2(collection(db, "commandes")),
        ot = Ae.id,
        et = () => {
          $a(Dn().filter((st) => st.ref !== ot)), Cf(ot);
        };
      try {
        let st = Q.lignes.map((is) => is.nom + " (" + is.personnes + " pers.)").join(", ");
        $a([
          {
            numero: Q.numero,
            ref: ot,
            date,
            mode,
            total: Q.total,
            resume: st,
            nom: Q.nom,
            tel: Q.tel,
            adresse: Q.adresse,
            statut: "nouvelle",
            vu: "nouvelle",
          },
          ...Dn(),
        ]);
      } catch {}
      ux("cmd", ot);
      let de = setDoc(Ae, Q),
        Ht = await sx(de);
      if (Ht === "erreur") {
        et(),
          setEtat(
            "La commande n'a pas pu être envoyée. Vérifiez votre connexion et réessayez" +
              (t.store.phone ? ", ou appelez le " + t.store.phone : "") +
              ".",
          );
        return;
      }
      Ht === "ok" ? ns(t.cmd, "cmd", ot) : de.then(() => ns(t.cmd, "cmd", ot), et),
        onEnvoyee?.(),
        _c(),
        vider(),
        setFini({ ...Q, attente: Ht === "lent" }),
        window.scrollTo(0, 0);
    };
  return fini
    ? React.default.createElement(
        "div",
        { className: "legal" },
        React.default.createElement(
          "div",
          { className: "legal-in", style: { textAlign: "center", paddingTop: 50 } },
          React.default.createElement("div", { className: "ok-rond" }, "✓"),
          React.default.createElement("h2", null, "Commande envoyée !"),
          fini.attente
            ? React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement(
                  "p",
                  { className: "chapo" },
                  "Merci ",
                  fini.nom.split(" ")[0],
                  ". Votre commande ",
                  React.default.createElement("b", null, fini.numero),
                  " est enregistrée sur votre téléphone.",
                ),
                React.default.createElement(
                  "div",
                  { className: "envoi-lent" },
                  "📶 La connexion est faible : elle partira automatiquement à l'épicerie dès que le réseau revient. Inutile de la renvoyer. Rouvrez l'appli plus tard pour voir sa validation.",
                ),
              )
            : React.default.createElement(
                "p",
                { className: "chapo" },
                "Merci ",
                fini.nom.split(" ")[0],
                ". L'épicerie a bien reçu votre commande ",
                React.default.createElement("b", null, fini.numero),
                ".",
              ),
          React.default.createElement(
            "div",
            { className: "recap", style: { textAlign: "left", margin: "18px 0" } },
            fini.lignes.map((Q) =>
              React.default.createElement(
                "div",
                { className: "rl", key: Q.id },
                React.default.createElement("span", null, Q.nom, " · ", Q.personnes, " pers."),
                React.default.createElement("b", null, ze(Q.montant)),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rl tot" },
              React.default.createElement("span", null, "Total"),
              React.default.createElement("b", null, ze(fini.total)),
            ),
            React.default.createElement(
              "div",
              { className: "rl" },
              React.default.createElement("span", null, MODES[fini.mode]),
              React.default.createElement("b", null, jourFr(fini.date)),
            ),
          ),
          React.default.createElement(
            "p",
            null,
            React.default.createElement("b", null, "L'épicerie va valider votre commande"),
            " et fixer l'heure ",
            fini.mode === "livraison" ? "de livraison" : "à laquelle venir la chercher",
            ". Vous serez prévenu ici, dans l'application (onglet La carte → Mes commandes), et pourrez ajouter un rappel à votre agenda.",
          ),
          React.default.createElement(
            "p",
            null,
            "Le règlement se fait ",
            fini.mode === "livraison" ? "à la livraison" : "au retrait, à l'épicerie",
            ". En cas de question, l'épicerie vous appellera au ",
            fini.tel,
            ".",
          ),
          notifs &&
            React.default.createElement(
              "div",
              { style: { textAlign: "left", marginTop: 14 } },
              React.default.createElement(BlocNotifications, { n: notifs, compact: !0 }),
            ),
          React.default.createElement(
            "button",
            { className: "btn", style: { marginTop: 18 }, onClick: onClose },
            "Terminé",
          ),
        ),
      )
    : React.default.createElement(
        "div",
        { className: "legal" },
        React.default.createElement(
          "div",
          { className: "legal-top" },
          React.default.createElement("button", { onClick: onClose }, "← Continuer mes achats"),
        ),
        React.default.createElement(
          "div",
          { className: "legal-in" },
          React.default.createElement("h2", null, "Ma commande"),
          React.default.createElement("h4", null, "1. Vos plateaux"),
          !lignes.length && React.default.createElement("p", null, "Votre commande est vide."),
          React.default.createElement(
            "div",
            { className: "recap" },
            lignes.map((Q) =>
              React.default.createElement(
                "div",
                { className: "rl", key: Q.id },
                React.default.createElement(
                  "span",
                  null,
                  React.default.createElement("b", null, Q.nom),
                  React.default.createElement("br", null),
                  React.default.createElement("small", null, Q.personnes, " pers. × ", ze(Q.prixPersonne)),
                ),
                React.default.createElement(
                  "span",
                  { style: { textAlign: "right" } },
                  React.default.createElement("b", null, ze(Q.montant)),
                  React.default.createElement("br", null),
                  React.default.createElement(
                    "button",
                    { className: "lien", onClick: () => modifier(Q.id) },
                    "Modifier",
                  ),
                ),
              ),
            ),
            !!lignes.length &&
              React.default.createElement(
                "div",
                { className: "rl tot" },
                React.default.createElement("span", null, "Total"),
                React.default.createElement("b", null, ze(se)),
              ),
          ),
          h.mode === "choix" &&
            React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("h4", null, "2. Retrait ou livraison ?"),
              React.default.createElement(
                "div",
                { className: "choix-mode" },
                ["retrait", "livraison"].map((Q) =>
                  React.default.createElement(
                    "button",
                    { key: Q, className: mode === Q ? "on" : "", onClick: () => setMode(Q) },
                    MODES[Q],
                  ),
                ),
              ),
            ),
          React.default.createElement(
            "h4",
            null,
            h.mode === "choix" ? "3" : "2",
            ". Date de ",
            mode === "livraison" ? "livraison" : "retrait",
          ),
          f.premiere
            ? React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement(Calendrier, { regle: f, value: date, onChange: setDate }),
                React.default.createElement(
                  "p",
                  { className: "cal-info" },
                  date
                    ? React.default.createElement(
                        React.default.Fragment,
                        null,
                        "Choisi : ",
                        React.default.createElement("b", null, jourFr(date)),
                      )
                    : "Touchez une date disponible.",
                  Number(h.delaiMin) > 0 &&
                    React.default.createElement(
                      React.default.Fragment,
                      null,
                      " Les commandes se passent au moins ",
                      h.delaiMin,
                      " jour",
                      h.delaiMin > 1 ? "s" : "",
                      " à l'avance.",
                    ),
                ),
              )
            : React.default.createElement(
                "p",
                null,
                "Aucune date n'est disponible pour le moment. ",
                t.store.phone && "Appelez-nous au " + t.store.phone + ".",
              ),
          React.default.createElement("h4", null, h.mode === "choix" ? "4" : "3", ". Vos coordonnées"),
          React.default.createElement("label", { className: "lab" }, "Nom et prénom"),
          React.default.createElement("input", {
            className: "inp",
            value: nom,
            onChange: (Q) => setNom(Q.target.value),
            maxLength: 60,
            autoComplete: "name",
          }),
          React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Téléphone"),
          React.default.createElement("input", {
            className: "inp",
            type: "tel",
            value: tel,
            onChange: (Q) => setTel(Q.target.value),
            maxLength: 20,
            autoComplete: "tel",
            placeholder: "06 12 34 56 78",
          }),
          mode === "livraison" &&
            React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "label",
                { className: "lab", style: { marginTop: 10 } },
                "Adresse de livraison",
              ),
              React.default.createElement("textarea", {
                className: "inp",
                rows: 2,
                value: adresse,
                onChange: (Q) => setAdresse(Q.target.value),
                maxLength: 200,
                autoComplete: "street-address",
              }),
            ),
          React.default.createElement(
            "label",
            { className: "lab", style: { marginTop: 12 } },
            "Allergies ou régime (facultatif)",
          ),
          React.default.createElement(
            "div",
            { className: "allerg" },
            [...ALLERGENES, ...REGIMES].map((Q) =>
              React.default.createElement(
                "button",
                {
                  key: Q,
                  type: "button",
                  className: allergies.includes(Q) ? "on" : "",
                  "aria-pressed": allergies.includes(Q),
                  onClick: () => k(Q),
                },
                allergies.includes(Q) ? "✓ " : "",
                Q,
              ),
            ),
          ),
          !!allergies.length &&
            React.default.createElement(
              "div",
              { className: "allerg-info" },
              "L'épicerie fera au mieux pour éviter : ",
              React.default.createElement("b", null, allergies.join(", ")),
              ". Les plateaux sont préparés dans un atelier qui manipule ces ingrédients : des traces restent possibles. En cas d'allergie sévère, appelez l'épicerie",
              t.store.phone ? " au " + t.store.phone : "",
              " avant de commander. Cette information sert uniquement à préparer votre commande.",
            ),
          React.default.createElement(
            "label",
            { className: "lab", style: { marginTop: 10 } },
            "Remarque (facultatif)",
          ),
          React.default.createElement("textarea", {
            className: "inp",
            rows: 2,
            value: remarque,
            onChange: (Q) => setRemarque(Q.target.value),
            maxLength: 400,
            placeholder: "Heure souhaitée, ingrédient à éviter, message…",
          }),
          React.default.createElement(
            "div",
            { className: "rgpd-info", style: { marginTop: 12 } },
            "Vos coordonnées servent uniquement à préparer et vous remettre cette commande.",
            " ",
            React.default.createElement(
              "button",
              { className: "lien", onClick: () => ouvrirLegal("confidentialite") },
              "En savoir plus",
            ),
          ),
          React.default.createElement(ConseilInstallCommande, {
            inst,
            quoi: "le suivi de votre commande",
          }),
          R && lignes.length > 0 && React.default.createElement("p", { className: "manque" }, R),
          etat && etat !== "envoi" && React.default.createElement("p", { className: "manque" }, etat),
          React.default.createElement(
            "button",
            { className: "btn envoyer", disabled: !!R || etat === "envoi", onClick: fe },
            etat === "envoi" ? "Envoi en cours…" : "Envoyer ma commande — " + ze(se),
          ),
          React.default.createElement(
            "p",
            { className: "cal-info conditions" },
            "Paiement ",
            mode === "livraison" ? "à la livraison" : "au retrait à l'épicerie",
            ", aucun paiement en ligne. Produits frais préparés sur commande : pas de droit de rétractation. Pour annuler ou modifier",
            t.store.phone ? ", appelez le " + t.store.phone : ", contactez l'épicerie",
            " au moins 48 h avant. ",
            // v2.46 : allergènes, alcool et conditions de commande
            mentionAllergenes(t),
            lignes.some((l) => estAlcool(l.nom, ...(l.choix || []))) && " " + MENTION_MINEURS + " " + MENTION_ALCOOL,
            " ",
            React.default.createElement(
              "button",
              { type: "button", className: "lien", onClick: () => ouvrirLegal("conditions") },
              "Conditions de commande",
            ),
          ),
        ),
      );
}
