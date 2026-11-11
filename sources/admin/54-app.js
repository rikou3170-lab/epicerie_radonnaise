/* ═══════════════════════════════════════════════════════════════════════
 *  APPLI — écran principal : navigation entre les onglets, fenêtres, démarrage.
 * ═══════════════════════════════════════════════════════════════════════ */

// Administration : connexion, menu, écrans et sauvegarde automatique.
function Admin() {
  let [t, e] = (0, React.useState)(void 0);
  (0, React.useEffect)(() => onAuthStateChanged(auth, (A) => e(A || null)), []),
    (0, React.useEffect)(() => {
      t && ck("admin");
    }, [!!t]);
  let n = useMiseAJour(),
    [r, i, s, o] = useShop(!!t),
    [a, u] = (0, React.useState)("accueil"),
    [d, h] = (0, React.useState)(!1);
  (0, React.useEffect)(() => {
    o.serveur &&
      t &&
      !r.fidelite?.migreRemise &&
      i("fidelite", (A) => ({
        ...A,
        parEuro: 1,
        remise: { ...Na },
        sousTitre: "1 € dépensé = 1 point · 200 points = 5 € de remise",
        migreRemise: !0,
      })),
      o.serveur &&
        t &&
        !r.fidelite?.migreBientot &&
        i("fidelite", (A) => ({ ...A, active: !1, migreBientot: !0 })),
      o.serveur &&
        t &&
        r.fidelite?.migreTampons20 &&
        !r.fidelite?.migreChouette &&
        i("fidelite", (A) => ({
          ...A,
          tampons: {
            ...(A.tampons || {}),
            recompense:
              !A.tampons?.recompense || A.tampons.recompense === "un gros cadeau surprise"
                ? "un chouette cadeau surprise"
                : A.tampons.recompense,
          },
          migreChouette: !0,
        })),
      o.serveur &&
        t &&
        r.fidelite?.migreTampons20 &&
        !r.fidelite?.migreExclus &&
        i("fidelite", (A) => ({
          ...A,
          tampons: {
            ...(A.tampons || {}),
            exclus:
              !A.tampons?.exclus || A.tampons.exclus === "carburant, gaz, alcools, tabac, presse, jeux"
                ? "carburant, gaz et alcool"
                : A.tampons.exclus,
          },
          migreExclus: !0,
        })),
      o.serveur && t && r.themes?.mode === "force" && i("themes", (A) => ({ ...(A || {}), mode: "auto" })),
      o.serveur &&
        t &&
        !r.themes?.migreAuto &&
        i("themes", (A) => ({ ...(A || {}), mode: "auto", force: "", migreAuto: !0 })),
      o.serveur &&
        t &&
        !r.fidelite?.migreTampons20 &&
        i("fidelite", (A) => ({
          ...A,
          mode: "tampons",
          tampons: {
            ...it,
            ...(A.tampons || {}),
            nb: 20,
            palier: 10,
            recompense1: it.recompense1,
            recompense: it.recompense,
            exclus: it.exclus,
          },
          migreTampons20: !0,
          migreChouette: !0,
          migreExclus: !0,
        }));
  }, [o.pret, !!t]);
  let p = (0, React.useRef)(new Set());
  (0, React.useEffect)(() => {
    !t ||
      !o.pret ||
      (r.clients || []).forEach((A) => {
        !/^RAD-[A-Z0-9]{5}$/.test(A.code || "") ||
          p.current.has(A.code) ||
          (p.current.add(A.code),
          setDoc(doc2(db, "codes", A.code), { c: String(A.id) }).catch(() => p.current.delete(A.code)));
      });
  }, [!!t, o.pret, (r.clients || []).length]);
  let m = (0, React.useRef)(!1);
  (0, React.useEffect)(() => {
    if (!t || !o.serveur || !o.pret || m.current) return;
    let A = (r.clients || []).filter((S) => j9(S.id));
    A.length &&
      ((m.current = !0),
      (async () => {
        for (let S of A)
          try {
            let _ = z9(),
              I = String(S.id),
              T = await getDoc(doc2(db, "clients", I));
            if (!T.exists()) continue;
            let M = await getDocs(collection(db, "clients", I, "historique")),
              V = [];
            M.forEach((O) => V.push(O)), await setDoc(doc2(db, "clients", _), T.data());
            for (let O = 0; O < V.length; O += 400) {
              let b = writeBatch(db);
              V.slice(O, O + 400).forEach((v) => b.set(doc2(db, "clients", _, "historique", v.id), v.data())),
                await b.commit();
            }
            T.data().code && (await setDoc(doc2(db, "codes", T.data().code), { c: _ })),
              await Pf([...V.map((O) => O.ref), doc2(db, "clients", I)]);
          } catch (_) {
            console.error("migration carte", S.id, _);
          }
      })());
  }, [!!t, o.serveur, o.pret, (r.clients || []).length]);
  // v2.44 : plats du menu de la semaine réservables (un article caché par jour à venir)
  (0, React.useEffect)(() => {
    !t ||
      !o.pret ||
      !o.serveur ||
      synchroPlatsMenu(r.menu, r.jourMenu || [], r.fermetures).catch((A) => console.warn("plats du menu", A));
  }, [!!t, o.pret, o.serveur, JSON.stringify(r.menu || null), JSON.stringify(r.jourMenu || []), JSON.stringify(r.fermetures || [])]);
  let w =
    t && o.pret
      ? (r.conversations || []).filter((A) => A.attente).length +
        // v2.44 : plats du menu à confirmer comptés dans la pastille de l'appli
        (r.resas || []).filter((A) => A.statut === "reservee" && estMenuResa(A) && !A.confirme).length +
        (r.commandes || []).filter((A) => A.statut === "nouvelle").length
      : 0;
  if (
    ((0, React.useEffect)(() => {
      document.title = (w ? "(" + w + ") " : "") + "Administration — Épicerie Raddonnaise";
      try {
        w && navigator.setAppBadge
          ? navigator.setAppBadge(w).catch(() => {})
          : navigator.clearAppBadge && navigator.clearAppBadge().catch(() => {});
      } catch {}
    }, [w]),
    t === void 0)
  )
    return React.default.createElement(Attente, { t: "Chargement…" });
  if (!t) return React.default.createElement(Connexion, null);
  if (o.erreur === "permission-denied")
    return React.default.createElement(Attente, {
      t: "Accès refusé : ce compte n'a pas les droits d'administration.",
    });
  if (!o.pret) return React.default.createElement(Attente, { t: "Synchronisation…" });
  let E = [
    { id: "accueil", label: "Accueil", ic: I10.home },
    {
      id: "jour",
      label: "Aujourd'hui",
      ic: I10.shop,
      n: r.resas.filter((A) => A.statut === "reservee").length,
    },
    {
      id: "commandes",
      label: "Commandes",
      ic: I10.cmd,
      n: r.commandes.filter((A) => A.statut === "nouvelle").length,
    },
    { id: "messages", label: "Messages", ic: I10.bulle, n: r.conversations.filter((A) => A.attente).length },
    { id: "offres", label: "Offres", ic: I10.basket, g: "Ma vitrine" },
    { id: "actus", label: "Actus", ic: I10.news, g: "Ma vitrine" },
    { id: "pubs", label: "Pubs", ic: I10.img, g: "Ma vitrine" },
    { id: "menu", label: "Menu semaine", ic: I10.cmd, g: "Ma vitrine" },
    { id: "themes", label: "Thèmes", ic: I10.sapin, g: "Ma vitrine" },
    { id: "producteurs", label: "Producteurs", ic: I10.ferme, g: "Ma vitrine" },
    { id: "recettes", label: "Recettes", ic: I10.news, g: "Ma vitrine" },
    { id: "com", label: "Communication", ic: I10.porteVoix, g: "Mes clients" },
    { id: "fidelite", label: "Fidélité", ic: I10.star, g: "Mes clients" },
    { id: "roue", label: "Roue de Noël", ic: I10.sapin, g: "Mes clients" },
    { id: "sondage", label: "Sondages", ic: I10.bulle, g: "Mes clients" },
    { id: "stats", label: "Statistiques", ic: I10.graph, g: "Suivi" },
    { id: "reglages", label: "Réglages", ic: I10.gear, g: "Suivi" },
  ];
  return React.default.createElement(
    "div",
    { className: "adm main" },
    React.default.createElement("style", null, CSS_ADMIN),
    React.default.createElement(
      "header",
      { className: "top" },
      React.default.createElement("img", { src: LOGO, alt: "" }),
      React.default.createElement(
        "div",
        null,
        React.default.createElement("h1", null, "Administration"),
        React.default.createElement(
          "small",
          null,
          "Épicerie Raddonnaise ",
          React.default.createElement("span", { className: "vers" }, "v", versionAffichee(VERSION)),
        ),
      ),
      React.default.createElement(
        "button",
        {
          onClick: async () => (await De("Se déconnecter ?")) && signOut(auth),
          style: {
            marginLeft: "auto",
            background: "rgba(255,255,255,.14)",
            border: "none",
            color: "#fff",
            fontFamily: "var(--body)",
            fontSize: 10.5,
            fontWeight: 800,
            padding: "6px 11px",
            borderRadius: 20,
            cursor: "pointer",
          },
        },
        "Déconnexion",
      ),
    ),
    React.default.createElement(BlocNotifsAdmin, { d: r }),
    React.default.createElement(
      SecoursEcran,
      { key: a },
      a === "accueil" &&
        React.default.createElement(TableauDeBord, {
          d: r,
          set: i,
          aller: (A) => {
            u(A), window.scrollTo(0, 0);
          },
        }),
      a === "stats" && React.default.createElement(EcranStatistiques, { d: r }),
      a === "com" && React.default.createElement(Communication, { d: r, set: i }),
      a === "jour" && React.default.createElement(Jour, { d: r, set: i }),
      a === "commandes" && React.default.createElement(Commandes, { d: r, set: i }),
      a === "messages" && React.default.createElement(Messages, { d: r, set: i }),
      a === "offres" && React.default.createElement(Offres, { d: r, set: i }),
      a === "pubs" && React.default.createElement(Pubs, { d: r, set: i }),
      a === "themes" && React.default.createElement(Themes, { d: r, set: i }),
      a === "menu" && React.default.createElement(EditeurMenuDaval, { d: r, set: i }),
      a === "actus" && React.default.createElement(Actus, { d: r, set: i }),
      a === "producteurs" && React.default.createElement(Producteurs, { d: r, set: i }),
      a === "fidelite" && React.default.createElement(Fidelite, { d: r, set: i }),
      a === "roue" && React.default.createElement(RoueAdmin, { d: r, set: i }),
      a === "recettes" && React.default.createElement(Recettes, { d: r, set: i }),
      a === "sondage" && React.default.createElement(Sondages, { d: r, set: i }),
      a === "reglages" && React.default.createElement(Reglages, { d: r, set: i, reinitialiser: s }),
    ),
    React.default.createElement(
      "div",
      {
        className: "signature",
        style: {
          textAlign: "center",
          fontSize: 11,
          color: "#9AA59E",
          margin: "28px 16px 8px",
          lineHeight: 1.5,
        },
      },
      "Conception et réalisation Eric Tisserand",
      React.default.createElement("br", null),
      "Reproduction interdite",
    ),
    React.default.createElement(BandeauMaj, { dispo: n }),
    React.default.createElement(
      "nav",
      { className: "tabs" },
      E.map((A) =>
        React.default.createElement(
          "button",
          {
            key: A.id,
            className: "tab" + (a === A.id ? " on" : "") + (RS.includes(A.id) ? "" : " sec"),
            onClick: () => {
              u(A.id), window.scrollTo(0, 0);
            },
          },
          React.default.createElement(
            "span",
            { className: "tab-ic" },
            A.ic(20, a === A.id ? "#1C433B" : "#93A099"),
            !!A.n && React.default.createElement("b", { className: "tab-n" }, A.n),
          ),
          A.label,
        ),
      ),
      (() => {
        let A = E.filter((I) => !RS.includes(I.id)),
          S = A.find((I) => I.id === a),
          _ = A.reduce((I, T) => I + (T.n || 0), 0);
        return React.default.createElement(
          "button",
          {
            className: "tab plus" + (S ? " on" : ""),
            onClick: () => h(!0),
            "aria-label": "Autres rubriques",
          },
          React.default.createElement(
            "span",
            { className: "tab-ic" },
            S ? S.ic(20, "#1C433B") : I10.plusMenu(20, "#93A099"),
            !!_ && React.default.createElement("b", { className: "tab-n" }, _),
          ),
          S ? S.label : "Plus",
        );
      })(),
    ),
    d &&
      React.default.createElement(
        "div",
        { className: "plus-fond", onClick: () => h(!1) },
        React.default.createElement(
          "div",
          {
            className: "plus-in",
            onClick: (A) => A.stopPropagation(),
            role: "dialog",
            "aria-label": "Autres rubriques",
          },
          ["Ma vitrine", "Mes clients", "Suivi"].map((A) =>
            React.default.createElement(
              "section",
              { key: A, className: "plus-g" },
              React.default.createElement("h4", null, A),
              React.default.createElement(
                "div",
                { className: "plus-l" },
                E.filter((S) => S.g === A).map((S) =>
                  React.default.createElement(
                    "button",
                    {
                      key: S.id,
                      className: a === S.id ? "on" : "",
                      onClick: () => {
                        u(S.id), h(!1), window.scrollTo(0, 0);
                      },
                    },
                    S.ic(24, a === S.id ? "#1C433B" : "#5C6A62"),
                    S.label,
                    !!S.n && React.default.createElement("b", { className: "tab-n" }, S.n),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
  );
}

// Lance l'administration dans la page.
"serviceWorker" in navigator &&
  addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
(0, ReactDOMClient.createRoot)(document.getElementById("root")).render(
  React.default.createElement(Admin, null),
);
