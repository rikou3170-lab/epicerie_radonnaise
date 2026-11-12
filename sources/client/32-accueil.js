/* ═══════════════════════════════════════════════════════════════════════
 *  ACCUEIL — bannières, produits du jour, actus, raccourcis, vœux, fêtes de la carte, producteurs, avis Google.
 * ═══════════════════════════════════════════════════════════════════════ */

// Bannières publicitaires de l'accueil, qui défilent toutes seules.
function Bannieres({ pubs, versCarte, tel }) {
  let r = (0, React.useRef)(null),
    [idx, setIdx] = (0, React.useState)(0),
    s = (0, React.useRef)(!1),
    l = pubs.length;
  if (
    ((0, React.useEffect)(() => {
      if (l < 2) return;
      let d = setInterval(() => {
        let h = r.current;
        if (!h || s.current) return;
        let f = (Math.round(h.scrollLeft / h.clientWidth) + 1) % l;
        h.scrollTo({ left: f * h.clientWidth, behavior: "smooth" });
      }, 5e3);
      return () => clearInterval(d);
    }, [l]),
    !l)
  )
    return null;
  let u = (d) => {
    d.action === "carte"
      ? versCarte()
      : d.action === "appeler" && tel && (location.href = "tel:" + tel.replace(/\s/g, ""));
  };
  return React.default.createElement(
    "div",
    { className: "pubs" },
    React.default.createElement(
      "div",
      {
        className: "rail",
        ref: r,
        onScroll: (d) => setIdx(Math.round(d.currentTarget.scrollLeft / d.currentTarget.clientWidth)),
        onTouchStart: () => {
          s.current = !0;
        },
        onTouchEnd: () => {
          setTimeout(() => {
            s.current = !1;
          }, 6e3);
        },
      },
      pubs.map((d) =>
        React.default.createElement(
          "div",
          { className: "pub", key: d.id, onClick: () => u(d) },
          React.default.createElement("img", { src: d.photo, alt: d.titre || "" }),
          (d.titre || d.texte || (d.action && d.action !== "aucune")) &&
            React.default.createElement(
              "div",
              { className: "txt" },
              d.titre && React.default.createElement("div", { className: "t" }, d.titre),
              d.texte && React.default.createElement("div", { className: "s" }, d.texte),
              // v2.46 : loi Évin
              besoinEvin(d.titre, d.texte) && React.default.createElement("div", { className: "evin" }, MENTION_ALCOOL),
              d.action === "carte" &&
                React.default.createElement("span", { className: "go" }, "Voir la carte →"),
              d.action === "appeler" &&
                React.default.createElement("span", { className: "go" }, "Appeler pour commander"),
            ),
        ),
      ),
    ),
    l > 1 &&
      React.default.createElement(
        "div",
        { className: "dots" },
        pubs.map((d, h) => React.default.createElement("i", { key: d.id, className: h === idx ? "on" : "" })),
      ),
  );
}

// Liste des produits du jour (frais, plats, promos, anti-gaspi) avec bouton « Réserver ».
function ListeJour({ items, maj, onReserver }) {
  return React.default.createElement(
    "div",
    { className: "jour" },
    items.map((r) => {
      let i = TYPES[r.type] || TYPES.frais;
      return React.default.createElement(
        "div",
        { className: "ji", key: r.id },
        r.photo && React.default.createElement("img", { src: r.photo, alt: "" }),
        React.default.createElement(
          "div",
          { style: { minWidth: 0 } },
          React.default.createElement(
            "span",
            { className: "lb", style: { background: i.bg, color: i.c } },
            i.label.toUpperCase(),
          ),
          React.default.createElement("div", { className: "nm" }, r.titre),
          r.note && React.default.createElement("div", { className: "no" }, r.note),
          // v2.46 : loi Évin
          besoinEvin(r.titre, r.note) && React.default.createElement("div", { className: "evin" }, MENTION_ALCOOL),
          r.fin &&
            React.default.createElement(
              "div",
              { className: "no", style: { color: i.c, fontWeight: 700 } },
              "Jusqu'au ",
              dO(r.fin),
            ),
          j9(r) &&
            onReserver &&
            React.default.createElement(
              "div",
              { className: "resa-l" },
              Ro(r) > 0
                ? React.default.createElement(
                    React.default.Fragment,
                    null,
                    React.default.createElement(
                      "button",
                      { className: "resa-btn", onClick: () => onReserver(r) },
                      "Je réserve",
                    ),
                    parseInt(r.stock) < 999 &&
                      React.default.createElement(
                        "span",
                        { className: Ro(r) <= (auKilo(r) ? 5 : 2) ? "chaud" : "" },
                        Ro(r) <= (auKilo(r) ? 5 : 2) ? "Plus que " + dispoTexte(r) + " !" : dispoTexte(r) + " dispo.",
                      ),
                  )
                : React.default.createElement("span", { className: "epuise" }, "Épuisé"),
            ),
        ),
        r.prix !== "" &&
          r.prix != null &&
          React.default.createElement(
            "div",
            { className: "px" },
            !!r.ancienPrix &&
              Number(r.ancienPrix) > Number(r.prix) &&
              React.default.createElement(
                "span",
                { className: "old" },
                Number(r.ancienPrix).toFixed(2),
                " €",
              ),
            Number(r.prix).toFixed(2),
            " €",
            r.unite && React.default.createElement("span", { className: "un" }, "/ ", r.unite),
          ),
      );
    }),
    maj && React.default.createElement("div", { className: "maj" }, "Mis à jour ", maj),
  );
}

// Une actu (photo, titre, texte).
function CarteActu({ a }) {
  return React.default.createElement(
    "div",
    { className: "card" },
    a.photo && React.default.createElement("img", { className: "ph", src: a.photo, alt: "" }),
    React.default.createElement(
      "div",
      { className: "b" },
      React.default.createElement("h3", null, a.titre),
      a.date &&
        React.default.createElement(
          "div",
          { style: { fontSize: 10.5, color: "var(--ink3)", marginBottom: 5 } },
          a.date,
        ),
      React.default.createElement("p", null, a.texte),
      // v2.46a : loi Évin
      besoinEvin(a.titre, a.texte) && React.default.createElement("div", { className: "evin" }, MENTION_ALCOOL),
    ),
  );
}

// Icônes des raccourcis
// Icônes des raccourcis de l'accueil.
var IcR = {
  promo: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("path", {
      d: "M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z",
    }),
    React.default.createElement("circle", { cx: "7.5", cy: "7.5", r: "1.5", fill: "currentColor" }),
  ),
  jour: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
    },
    React.default.createElement("path", {
      d: "M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 1 8-1 3.5-3.5 5-6.5 6",
    }),
    React.default.createElement("path", { d: "M2 21c0-3 1.9-5.4 5.1-6" }),
  ),
  plateau: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("path", { d: "M3 16h18" }),
    React.default.createElement("path", { d: "M4 16a8 8 0 0 1 16 0" }),
    React.default.createElement("path", { d: "M12 6V4M10 4h4M2 20h20" }),
  ),
  actus: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinejoin: "round",
    },
    React.default.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    React.default.createElement("path", { d: "M7 9h6M7 13h10M7 17h7" }),
  ),
  carte: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinejoin: "round",
    },
    React.default.createElement("rect", { x: "2.5", y: "5", width: "19", height: "14", rx: "3" }),
    React.default.createElement("circle", { cx: "7.5", cy: "14", r: "1.3", fill: "currentColor" }),
    React.default.createElement("circle", { cx: "11.5", cy: "14", r: "1.3", fill: "currentColor" }),
    React.default.createElement("path", { d: "M6 9h7" }),
  ),
  // v2.45f : boîte à idées (ampoule)
  idees: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("path", { d: "M9 18h6M10 21h4" }),
    React.default.createElement("path", { d: "M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V16h5v-.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z" }),
  ),
  // v2.45e : producteurs (petite ferme)
  prod: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("path", { d: "M3 21V10l9-6 9 6v11z" }),
    React.default.createElement("path", { d: "M9 21v-6h6v6M9 15l6 6M15 15l-6 6" }),
  ),
};

// Raccourcis vers les parties de l'accueil.
function Raccourcis({ liens }) {
  return liens.length < 2
    ? null
    : React.default.createElement(
        "nav",
        { className: "racc", "aria-label": "Raccourcis" },
        liens.map((e) =>
          React.default.createElement(
            "button",
            { key: e.id, className: "rc " + (e.chaud ? "chaud" : ""), onClick: e.go },
            React.default.createElement(
              "span",
              { className: "ic" },
              IcR[e.id],
              !!e.n && React.default.createElement("b", null, e.n),
            ),
            React.default.createElement("span", { className: "lb2" }, e.label),
          ),
        ),
      );
}

// v2.45g : mémoire des nouveautés déjà vues, par raccourci.
var VUS_RACC = "epicerie-raddonnaise-raccourcis-vus";

// Fait défiler jusqu'à une partie de la page.
var aller = (t) =>
  document
    .getElementById(t)
    ?.scrollIntoView({ behavior: mouvementReduit() ? "auto" : "smooth", block: "start" });

// Vœux du jour (Noël, Nouvel An…).
function VoeuxDuJour({ aCommander, onClick }) {
  let [n, r] = new Date()
    .toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" })
    .slice(5)
    .split("-")
    .map(Number);
  if (n !== 12 || r > 25) return null;
  let i = 25 - r,
    o =
      i === 0
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("b", null, "Joyeux Noël !"),
            " Toute l'épicerie vous souhaite de belles fêtes",
          )
        : i === 1
          ? React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("b", null, "Noël, c'est demain !"),
              " Joyeux réveillon à tous",
            )
          : React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("b", null, "Noël dans ", i, " jours"),
              aCommander && i >= 3 ? " : pensez à vos plateaux !" : "",
            ),
    s = aCommander && i >= 2;
  return React.default.createElement(
    "div",
    { className: "noel-b" + (s ? " clic" : ""), onClick: s ? onClick : void 0, role: s ? "button" : void 0 },
    React.default.createElement("span", { className: "noel-i" }, "🎄"),
    React.default.createElement("span", null, o),
    s && React.default.createElement("span", { className: "noel-f" }, "›"),
  );
}

// Onglet Accueil : bonjour, horaires, menu, produits du jour, carte, recette, producteurs…
function Accueil({
  d: t,
  theme,
  prenom,
  onReserver,
  mesResas = [],
  moi,
  onFid,
  versCarte,
  versActus,
  versFid,
  inst,
  mesCmds = [],
  ouverture,
  notifs,
}) {
  let [F, D] = (0, React.useState)(!1),
    // v2.45f : boîte à idées — raccourci tant que le client n'a pas répondu à la question en cours
    [, majIdees] = (0, React.useState)(0),
    // v2.45g : pastilles des raccourcis — seulement les nouveautés pas encore vues (vues = raccourci touché)
    [vus, setVus] = (0, React.useState)(() => {
      try {
        return JSON.parse(localStorage.getItem(VUS_RACC) || "{}") || {};
      } catch {
        return {};
      }
    }),
    nouveaux = (cle, l) => l.filter((x) => !(vus[cle] || []).includes(String(x.id))).length,
    voir = (cle, l, go) => () => {
      let v = { ...vus, [cle]: l.map((x) => String(x.id)).slice(-60) };
      setVus(v);
      try {
        localStorage.setItem(VUS_RACC, JSON.stringify(v));
      } catch {}
      go?.();
    },
    sd = t.sondage,
    ideeOuverte =
      !!(sd?.active && sd.id && sd.question) &&
      (() => {
        try {
          return !JSON.parse(localStorage.getItem(K2) || "[]").includes(sd.id);
        } catch {
          return !0;
        }
      })(),
    M = mesCmds.filter(
      (v) =>
        v.ref &&
        ["nouvelle", "acceptee", "prep", "prete"].includes(v.statut) &&
        (Ua(v) || "") >= Wt(new Date()),
    ),
    C = (t.jour?.items || []).filter(vn),
    A = C.filter((v) => ["promo", "gaspi", "panier"].includes(v.type)),
    S = C.filter((v) => !["promo", "gaspi", "panier"].includes(v.type)),
    P = t.carteActive ? t.offres.filter(vn) : [],
    z = t.carteActive ? t.plateaux.filter(vn) : [],
    j = t.actus.filter(vn),
    b =
      !!z.length &&
      Nn(t.cmd).active &&
      (() => {
        let v = y2(t.cmd, t.fermetures).premiere;
        return !!v && v.slice(5) <= "12-24" && v.slice(0, 4) === String(new Date().getFullYear());
      })(),
    y = [
      A.length && { id: "promo", label: "Promos", n: nouveaux("promo", A), chaud: !0, go: voir("promo", A, () => aller("sec-promos")) },
      S.length && { id: "jour", label: "Du jour", n: nouveaux("jour", S), go: voir("jour", S, () => aller("sec-jour")) },
      ideeOuverte && {
        id: "idees",
        label: sd.mode === "libre" ? "Idées" : "Sondage",
        n: nouveaux("idees", [sd]),
        go: voir("idees", [sd], () => aller("sec-idees")),
      },
      (P.length || z.length) && { id: "plateau", label: "Plateaux", n: nouveaux("plateau", [...P, ...z]), go: voir("plateau", [...P, ...z], versCarte) },
      j.length && { id: "actus", label: "Actus", n: nouveaux("actus", j), go: voir("actus", j, versActus) },
      t.fidActive && { id: "carte", label: "Ma carte", go: versFid },
      // v2.45e : raccourci vers « Nos producteurs », tout en bas de l'accueil
      (t.producteurs || []).length && { id: "prod", label: "Producteurs", go: () => aller("sec-prod") },
    ].filter(Boolean);
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement(CarteTheme, { theme }),
    c9(moi?.anniv) &&
      t.fidelite?.anniv !== !1 &&
      React.default.createElement(
        "div",
        { className: "anniv-b" },
        "🎂 ",
        React.default.createElement(
          "b",
          null,
          "Joyeux anniversaire",
          moi.prenom ? " " + moi.prenom : "",
          " !",
        ),
        moi.annivAn === new Date().getFullYear()
          ? " Un tampon vous a été offert sur votre carte 🍏"
          : " Un tampon vous est offert aujourd'hui 🍏",
      ),
    (() => {
      let v = t.roue?.annonce;
      return v?.prenom && Date.now() - (v.date || 0) < 10 * 864e5
        ? React.default.createElement(
            "div",
            { className: "roue-annonce" },
            "🎉 ",
            React.default.createElement("b", null, "Bravo à ", v.prenom),
            ", qui remporte ",
            s9(v.titre),
            " !",
          )
        : null;
    })(),
    !(theme?.magie && theme.id === "noel") &&
      React.default.createElement(VoeuxDuJour, { aCommander: b, onClick: versCarte }),
    moi && t.fidActive && React.default.createElement(BravoNiveau, { moi }),
    React.default.createElement(DemandeAvis, { d: t, mesCmds }),
    React.default.createElement(Bannieres, { pubs: t.pubs, versCarte, tel: t.store.phone }),
    React.default.createElement(
      "div",
      { className: "hero" },
      React.default.createElement("img", { src: LOGO, alt: "" }),
      React.default.createElement(
        "div",
        { className: "hero-t" },
        React.default.createElement(
          "p",
          null,
          prenom ? "Bonjour " + prenom + " !" : t.store.slogan || "Bienvenue !",
        ),
        React.default.createElement(BadgeOuverture, { e: ouverture }),
      ),
    ),
    // v2.44d : fermeture exceptionnelle et message d'accueil de Marion remontés en haut, juste sous le « Bonjour »
    _2(t.fermetures) &&
      React.default.createElement(
        "div",
        { className: "annonce terra" },
        "🔔 ",
        texteFermeture(_2(t.fermetures)),
      ),
    vn(t.annonce) &&
      t.annonce.active &&
      t.annonce.text &&
      React.default.createElement(
        "div",
        { className: "annonce " + (t.annonce.couleur || "apple") },
        t.annonce.text,
        // v2.46a : loi Évin
        besoinEvin(t.annonce.text) && React.default.createElement("span", { className: "evin" }, MENTION_ALCOOL),
      ),
    React.default.createElement(BandeauNotifications, { n: notifs, inst }),
    React.default.createElement(TuileMenu, { menu: t.menu, onOuvrir: () => D(!0) }),
    F &&
      React.default.createElement(FeuilleMenu, {
        menu: t.menu,
        onClose: () => D(!1),
        plats: t.jourMenu,
        fermetures: t.fermetures,
        tel: t.store.phone,
        onReserver: onReserver && ((v) => (D(!1), onReserver(v))),
      }),
    React.default.createElement(Raccourcis, { liens: y }),
    React.default.createElement(MesResas, { resas: mesResas }),
    M.slice(0, 2).map((v) =>
      React.default.createElement(SuiviCommande, { key: v.numero, c: v, store: t.store, compact: !0 }),
    ),
    inst.bandeau &&
      moi &&
      React.default.createElement(Installer, {
        inst,
        texte: "Retrouvez votre carte de fidélité d'un geste.",
      }),
    !!A.length &&
      React.default.createElement(
        "section",
        { id: "sec-promos", className: "ancre" },
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", { style: { background: "var(--terra)" } }),
          "Promos & bonnes affaires",
        ),
        React.default.createElement(
          "div",
          { className: "sub" },
          "Prix réduits et dates courtes, tant qu'il y en a",
        ),
        React.default.createElement(ListeJour, { items: A, onReserver }),
      ),
    React.default.createElement(
      "section",
      { id: "sec-jour", className: "ancre" },
      React.default.createElement(
        "h3",
        { className: "h2" },
        React.default.createElement("i", null),
        "Aujourd'hui",
      ),
      React.default.createElement("div", { className: "sub" }, "Le frais et les plats maison du moment"),
      S.length
        ? React.default.createElement(ListeJour, { items: S, maj: t.jour?.maj, onReserver })
        : !A.length &&
            React.default.createElement(dx, {
              t: "Rien de publié pour aujourd'hui",
              s: "Passez à l'épicerie : le frais et les plats du jour vous y attendent.",
            }),
      !S.length &&
        !!A.length &&
        t.jour?.maj &&
        React.default.createElement(
          "div",
          { className: "sub", style: { marginLeft: 0 } },
          "Mis à jour ",
          t.jour.maj,
        ),
    ),
    !!j.length &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, null),
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", null),
          "Actualités",
        ),
        React.default.createElement("div", { className: "sub" }),
        j.slice(0, 2).map((v) => React.default.createElement(CarteActu, { key: v.id, a: v })),
        j.length > 2 &&
          React.default.createElement(
            "button",
            { className: "voirtout", onClick: versActus },
            "Toutes les actualités (",
            j.length,
            ") →",
          ),
      ),
    !!(P.length || z.length) &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, null),
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", { style: { background: "var(--terra)" } }),
          "Plateaux & paniers",
        ),
        React.default.createElement(
          "div",
          { className: "sub" },
          z.length && Nn(t.cmd).active
            ? "À commander directement dans l'application"
            : "Sur commande, à retirer en boutique",
        ),
        React.default.createElement(
          "div",
          { className: "scroll" },
          z
            .slice(0, 6)
            .map((v) =>
              React.default.createElement(
                "div",
                { className: "mini", key: "p" + v.id, onClick: versCarte },
                v.photo && React.default.createElement("img", { src: v.photo, alt: "" }),
                React.default.createElement(
                  "div",
                  { className: "b" },
                  React.default.createElement("div", { className: "nm" }, v.nom),
                  React.default.createElement(
                    "div",
                    { className: "px", style: { fontSize: 16 } },
                    ze(xc(v)),
                    React.default.createElement("span", { className: "pp" }, " /pers."),
                  ),
                ),
              ),
            ),
          P.slice(0, 6).map((v) =>
            React.default.createElement(
              "div",
              { className: "mini", key: v.id, onClick: versCarte },
              v.photo && React.default.createElement("img", { src: v.photo, alt: "" }),
              React.default.createElement(
                "div",
                { className: "b" },
                React.default.createElement("div", { className: "nm" }, v.titre),
                React.default.createElement(
                  "div",
                  { className: "px", style: { fontSize: 16 } },
                  v.prix ? Number(v.prix).toFixed(2) + " €" : "Sur devis",
                ),
              ),
            ),
          ),
        ),
        React.default.createElement(
          "button",
          { className: "voirtout", onClick: versCarte },
          "Voir toute la carte →",
        ),
      ),
    !t.fidActive &&
      t.onglets?.fidelite !== !1 &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, { a: "left" }),
        React.default.createElement(Bientot, { compact: !0 }),
      ),
    t.fidActive &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, { a: "left" }),
        React.default.createElement(FidCarte, { d: t, moi, onFid, compact: !0 }),
      ),
    React.default.createElement(SectionProducteurs, { liste: t.producteurs || [] }),
    React.default.createElement(RecetteSemaine, { liste: t.recettes || [] }),
    React.default.createElement(Sondage, { d: t, moi, onRepondu: () => majIdees((x) => x + 1) }),
  );
}

// Fête de la carte : mémoire des tampons déjà vus, couleurs et confettis.
var oT = "epicerie-raddonnaise-tampons-vu",
  sT = ["#E05A73", "#F2B134", "#6E9B3A", "#4FC3F7", "#BA68C8", "#FF8A65", "#FFFFFF", "#A9C75A"],
  SO = Array.from({ length: 70 }, (t, e) => {
    let n = (r) => {
      let i = Math.sin(e * 77.7 + r * 13.1) * 43758.5453;
      return i - Math.floor(i);
    };
    return {
      x: n(1) * 100,
      d: 1.8 + n(2) * 1.8,
      delai: n(3) * 0.7,
      w: 6 + n(4) * 7,
      h: 8 + n(5) * 10,
      c: sT[e % sT.length],
      rot: (n(6) - 0.5) * 1440,
      dx: (n(7) - 0.5) * 160,
      rond: n(8) < 0.3,
    };
  });

// Repère un nouveau tampon ou un cadeau gagné depuis la dernière visite.
function NO(t, e) {
  let [n, r] = (0, React.useState)(null),
    i = t?.tampons;
  return (
    (0, React.useEffect)(() => {
      if (!t?.ref || i == null || !fc(e)) return;
      let o = {};
      try {
        o = JSON.parse(localStorage.getItem(oT) || "{}");
      } catch {}
      let s = o[t.ref];
      o[t.ref] = i;
      try {
        localStorage.setItem(oT, JSON.stringify(o));
      } catch {}
      s != null &&
        (i > s
          ? r({ avant: s, apres: i, cle: Date.now() })
          : i < s && s > 0 && r({ avant: s, apres: i, cadeau: !0, cle: Date.now() }));
    }, [t?.ref, i]),
    [n, () => r(null)]
  );
}

// Fête quand le client reçoit un tampon ou un cadeau.
function PopupFete({ fete, f: e, onFin }) {
  let r = MENTION_EXCLUSIONS(e),
    { avant: i, apres: o } = fete,
    s = !fete.cadeau && r.palier && i < r.palier && o === r.palier,
    l = !fete.cadeau && o >= r.nb,
    u = s || l;
  (0, React.useEffect)(() => {
    try {
      navigator.vibrate?.(u ? [60, 60, 60, 60, 200] : [40, 40, 90]);
    } catch {}
    let h = setTimeout(onFin, u ? 7e3 : 4200);
    return () => clearTimeout(h);
  }, [fete.cle]);
  let d = Array.from({ length: r.nb }, (h, f) => f);
  return React.default.createElement(
    "div",
    { className: "fete" + (u ? " gros" : ""), onClick: onFin, role: "dialog", "aria-live": "polite" },
    u &&
      !mouvementReduit() &&
      React.default.createElement(
        "div",
        { className: "confettis", "aria-hidden": "true" },
        SO.map((h, f) =>
          React.default.createElement("i", {
            key: f,
            style: {
              left: h.x + "%",
              width: h.w,
              height: h.rond ? h.w : h.h,
              background: h.c,
              borderRadius: h.rond ? "50%" : 2,
              animationDuration: h.d + "s",
              animationDelay: h.delai + "s",
              "--rot": h.rot + "deg",
              "--dx": h.dx + "px",
            },
          }),
        ),
      ),
    React.default.createElement(
      "div",
      { className: "fete-in" },
      fete.cadeau
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "div",
              { className: "fete-boite ouverte" },
              React.default.createElement(aT, null),
            ),
            React.default.createElement("div", { className: "fete-t" }, "Profitez bien de votre cadeau !"),
            React.default.createElement(
              "div",
              { className: "fete-s" },
              "Votre carte repart à zéro : c'est parti pour une nouvelle collection 🍏",
            ),
          )
        : u
          ? React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "div",
                { className: "fete-boite" },
                React.default.createElement(aT, null),
                React.default.createElement("span", { className: "fete-rayons" }),
              ),
              React.default.createElement(
                "div",
                { className: "fete-t" },
                l ? "BRAVO ! Carte complète !" : "Cadeau débloqué !",
              ),
              React.default.createElement(
                "div",
                { className: "fete-s" },
                l
                  ? React.default.createElement(
                      React.default.Fragment,
                      null,
                      React.default.createElement("b", null, "Votre cadeau"),
                      " vous attend en caisse 🎉",
                    )
                  : React.default.createElement(
                      React.default.Fragment,
                      null,
                      "À vous de choisir, dites-le en caisse :",
                    ),
              ),
              s &&
                React.default.createElement(
                  "div",
                  { className: "fete-choix" },
                  React.default.createElement(
                    "div",
                    null,
                    React.default.createElement("span", null, "🎁"),
                    React.default.createElement("b", null, "Je prends mon cadeau"),
                    React.default.createElement(
                      "small",
                      null,
                      "Votre cadeau maintenant, et votre carte repart à zéro",
                    ),
                  ),
                  React.default.createElement(
                    "div",
                    null,
                    React.default.createElement("span", null, "🚀"),
                    React.default.createElement("b", null, "Je continue"),
                    React.default.createElement(
                      "small",
                      null,
                      "Jusqu'à ",
                      r.nb,
                      " tampons pour votre chouette cadeau",
                    ),
                  ),
                ),
            )
          : React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("div", { className: "fete-plus" }, "+", o - i),
              React.default.createElement(
                "div",
                { className: "fete-t" },
                o - i > 1 ? "Tampons gagnés !" : "Tampon gagné !",
              ),
            ),
      !fete.cadeau &&
        React.default.createElement(
          "div",
          { className: "fete-rang" },
          d.map((h) => {
            let f = h >= i && h < o,
              m = h === r.nb - 1 || (r.palier && h === r.palier - 1);
            return React.default.createElement(
              "span",
              {
                key: h,
                className: "fr-c" + (h < o ? " on" : "") + (f ? " neuf" : "") + (m ? " cad" : ""),
                style: f ? { animationDelay: 0.35 + (h - i) * 0.25 + "s" } : void 0,
              },
              h < o
                ? React.default.createElement(
                    "b",
                    { style: f ? { animationDelay: 0.35 + (h - i) * 0.25 + "s" } : void 0 },
                    "🍏",
                  )
                : m
                  ? "🎁"
                  : "",
              f &&
                React.default.createElement("em", { style: { animationDelay: 0.55 + (h - i) * 0.25 + "s" } }),
            );
          }),
        ),
      !fete.cadeau &&
        React.default.createElement(
          "div",
          { className: "fete-cpt" },
          React.default.createElement("b", null, Math.min(o, r.nb)),
          " / ",
          r.nb,
          !u && r.palier && o < r.palier
            ? " · encore " + (r.palier - o) + " tampon" + (r.palier - o > 1 ? "s" : "") + " pour votre cadeau"
            : !u && o < r.nb
              ? " · encore " +
                (r.nb - o) +
                " tampon" +
                (r.nb - o > 1 ? "s" : "") +
                " pour votre " +
                (r.palier ? "gros " : "") +
                "cadeau"
              : "",
        ),
    ),
  );
}

// Dessin du cadeau.
var aT = () =>
    React.default.createElement(
      "svg",
      {
        viewBox: "0 0 120 120",
        width: "130",
        height: "130",
        "aria-hidden": "true",
        style: { overflow: "visible" },
      },
      React.default.createElement(
        "g",
        { className: "b-couv" },
        React.default.createElement("rect", {
          x: "18",
          y: "38",
          width: "84",
          height: "20",
          rx: "4",
          fill: "#E05A73",
        }),
        React.default.createElement("rect", { x: "53", y: "38", width: "14", height: "20", fill: "#F2B134" }),
        React.default.createElement("path", {
          d: "M60 38c-8-16-30-18-30-6 0 8 16 8 30 6zm0 0c8-16 30-18 30-6 0 8-16 8-30 6z",
          fill: "#F2B134",
        }),
      ),
      React.default.createElement("rect", {
        x: "24",
        y: "58",
        width: "72",
        height: "50",
        rx: "4",
        fill: "#C2185B",
      }),
      React.default.createElement("rect", { x: "53", y: "58", width: "14", height: "50", fill: "#F2B134" }),
    ),
  lT = "epicerie-raddonnaise-popup-vu",
  DO = (t) => {
    let e = (t.titre || "") + "|" + (t.texte || ""),
      n = 0;
    for (let r = 0; r < e.length; r++) n = (n * 31 + e.charCodeAt(r)) | 0;
    return String(n);
  };

// v2.45b : messages déjà fermés depuis l'ouverture de l'appli (« à chaque ouverture » = une fois par lancement,
// même si l'accueil se recharge en revenant de la messagerie).
var popupsFermes = new Set();

// Message de Marion affiché à l'ouverture de l'appli.
function PopupMessage({ d }) {
  let e = d.popup,
    [n, r] = (0, React.useState)(!1);
  if (n || !e || !vn({ ...e, active: !!e.active }) || !(e.titre || e.texte)) return null;
  let i = DO(e);
  if (popupsFermes.has(i)) return null;
  if (e.frequence !== "chaque")
    try {
      if (localStorage.getItem(lT) === i) return null;
    } catch {}
  let o = () => {
    popupsFermes.add(i);
    try {
      localStorage.setItem(lT, i);
    } catch {}
    r(!0);
  };
  return React.default.createElement(
    "div",
    { className: "pop-fond", onClick: o },
    React.default.createElement(
      "div",
      { className: "pop", role: "dialog", "aria-modal": "true", onClick: (s) => s.stopPropagation() },
      e.photo && React.default.createElement("img", { src: e.photo, alt: "", className: "pop-ph" }),
      // v2.45c : la pomme de l'épicerie à la place du porte-voix 📢 (un autre émoji choisi par Marion reste affiché)
      !e.emoji || e.emoji === "📢"
        ? React.default.createElement("img", { src: LOGO, alt: "", className: "pop-logo" })
        : React.default.createElement("div", { className: "pop-em" }, e.emoji),
      e.titre && React.default.createElement("div", { className: "pop-t" }, e.titre),
      e.texte && React.default.createElement("div", { className: "pop-x" }, e.texte),
      // v2.46a : loi Évin
      besoinEvin(e.titre, e.texte) && React.default.createElement("div", { className: "evin" }, MENTION_ALCOOL),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 14 }, onClick: o },
        "J'en prends note",
      ),
    ),
  );
}

// Section « Nos producteurs ».
function SectionProducteurs({ liste }) {
  let [e, n] = (0, React.useState)(null),
    // v2.40 : grille de 6 producteurs, puis un bouton pour voir tous les autres
    [tous, setTous] = (0, React.useState)(!1),
    visibles = tous ? liste : liste.slice(0, 6);
  return liste.length
    ? React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, { a: "left" }),
        React.default.createElement(
          "h3",
          { className: "h2 ancre", id: "sec-prod" },
          React.default.createElement("i", null),
          "Nos producteurs",
        ),
        React.default.createElement(
          "div",
          { className: "sub" },
          "Ils fabriquent, on vous les propose : du local, près de chez vous",
        ),
        React.default.createElement(
          "div",
          { className: "prods" },
          visibles.map((r) =>
            React.default.createElement(
              "button",
              {
                key: r.id,
                className: "prod",
                onClick: () => {
                  n(r), tn("prod_" + r.id);
                },
              },
              React.default.createElement(
                "span",
                { className: "prod-ph" },
                r.photo
                  ? React.default.createElement("img", { src: r.photo, alt: "" })
                  : React.default.createElement("span", null, "🧑\u200D🌾"),
              ),
              React.default.createElement("b", null, r.nom),
              r.metier && React.default.createElement("span", { className: "prod-m" }, r.metier),
              r.lieu &&
                React.default.createElement("span", { className: "prod-l" }, Ic2.pin(12, "#93A099"), r.lieu),
              // v2.46 : loi Évin
              besoinEvin(r.metier, r.produits) && React.default.createElement("span", { className: "evin" }, MENTION_ALCOOL),
            ),
          ),
        ),
        liste.length > 6 &&
          React.default.createElement(
            "button",
            { className: "btn gh", style: { marginBottom: 14 }, onClick: () => setTous(!tous) },
            tous ? "Voir moins ↑" : "Voir les " + liste.length + " producteurs ↓",
          ),
        e &&
          React.default.createElement(
            "div",
            { className: "sheet-fond", onClick: () => n(null) },
            React.default.createElement(
              "div",
              { className: "sheet", onClick: (r) => r.stopPropagation() },
              e.photo &&
                React.default.createElement("img", { src: e.photo, alt: "", className: "prod-grande" }),
              React.default.createElement(
                "h3",
                {
                  style: {
                    fontFamily: "var(--script)",
                    fontSize: 34,
                    color: "var(--forest)",
                    fontWeight: 400,
                    marginTop: 6,
                  },
                },
                e.nom,
              ),
              React.default.createElement(
                "div",
                { style: { fontWeight: 800, color: "var(--apple)", fontSize: 14 } },
                e.metier,
                e.lieu ? " · " + e.lieu : "",
              ),
              e.texte &&
                React.default.createElement(
                  "p",
                  {
                    style: {
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--ink2)",
                      marginTop: 10,
                      whiteSpace: "pre-line",
                    },
                  },
                  e.texte,
                ),
              e.produits &&
                React.default.createElement(
                  "div",
                  { className: "prod-pr" },
                  React.default.createElement("b", null, "À l'épicerie :"),
                  " ",
                  e.produits,
                ),
              // v2.46 : loi Évin
              besoinEvin(e.metier, e.produits, e.texte) &&
                React.default.createElement("div", { className: "evin", style: { marginTop: 10 } }, MENTION_ALCOOL),
              /^https?:\/\//.test(e.lien || "") &&
                React.default.createElement(
                  "a",
                  {
                    className: "btn gh",
                    style: { marginTop: 12, display: "block", textAlign: "center", textDecoration: "none" },
                    href: e.lien,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  },
                  "Voir sa page",
                ),
              React.default.createElement(
                "button",
                { className: "btn", style: { marginTop: 10 }, onClick: () => n(null) },
                "Fermer",
              ),
            ),
          ),
      )
    : null;
}

// Demande d'avis Google : mémoire, et lien d'avis de l'épicerie s'il est valide.
var uT = "epicerie-raddonnaise-avis",
  Y2 = (t) =>
    /^https:\/\/(g\.page|search\.google\.|www\.google\.|maps\.app\.goo\.gl|goo\.gl|g\.co)\//.test(
      t.store?.avis || "",
    )
      ? t.store.avis
      : "";

// Propose de laisser un avis Google après une commande remise.
function DemandeAvis({ d, mesCmds }) {
  let [n, r] = (0, React.useState)(() => {
      try {
        return JSON.parse(localStorage.getItem(uT) || "{}");
      } catch {
        return {};
      }
    }),
    i = Y2(d),
    o = mesCmds.find((l) => l.statut === "remise" && l.ref);
  if (!i || !o || n.fait || (n.plusTard && Date.now() - n.plusTard < 30 * 864e5)) return null;
  let s = (l) => {
    r(l);
    try {
      localStorage.setItem(uT, JSON.stringify(l));
    } catch {}
  };
  return React.default.createElement(
    "div",
    { className: "avis" },
    React.default.createElement("div", { className: "avis-et" }, "⭐⭐⭐⭐⭐"),
    React.default.createElement("div", { className: "avis-t" }, "Votre plateau vous a plu ?"),
    React.default.createElement(
      "div",
      { className: "avis-s" },
      "Un petit avis Google aide beaucoup une épicerie de village. Merci !",
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 8, marginTop: 10 } },
      React.default.createElement(
        "button",
        { className: "btn gh", style: { flex: 1 }, onClick: () => s({ plusTard: Date.now() }) },
        "Plus tard",
      ),
      React.default.createElement(
        "a",
        {
          className: "btn",
          style: { flex: 2, textDecoration: "none", textAlign: "center" },
          href: i,
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: () => {
            s({ fait: Date.now() }), tn("avis");
          },
        },
        "Laisser un avis",
      ),
    ),
  );
}

// Onglet Actus.
function Actus({ d }) {
  let e = d.actus.filter(vn);
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement(
      "h3",
      { className: "h2" },
      React.default.createElement("i", null),
      "Actualités",
    ),
    React.default.createElement("div", { className: "sub" }, "Les nouvelles de l'épicerie"),
    e.length
      ? e.map((n) => React.default.createElement(CarteActu, { key: n.id, a: n }))
      : React.default.createElement(dx, {
          t: "Pas d'actualité pour le moment",
          s: "Revenez bientôt !",
        }),
  );
}
