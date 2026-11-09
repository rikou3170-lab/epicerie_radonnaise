/* ═══════════════════════════════════════════════════════════════════════
 *  BASE DE L'ADMINISTRATION — logo, contenu par défaut, périodes de parution, enregistrement des listes, photos, points.
 * ═══════════════════════════════════════════════════════════════════════ */

// Base de l'appli client : date du jour, clé de la carte sur le téléphone, logo et contenu par défaut.
var LOGO =
    "data:image/jpeg;base64,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",
  EMPTY2 = {
    store: {
      name: "Épicerie Raddonnaise",
      slogan: "Épicerie locale & familiale",
      address: "4 avenue des Vosges, 70280 Raddon-et-Chapendu",
      phone: "03 84 94 60 11",
      email: "epicerie.raddonnaise@outlook.fr",
      facebook: "",
    },
    hours: [
      { day: "Lundi", am: "8h30 - 13h00", pm: "16h00 - 19h30" },
      { day: "Mardi", am: "7h00 - 19h30", pm: "" },
      { day: "Mercredi", am: "7h00 - 19h30", pm: "" },
      { day: "Jeudi", am: "7h00 - 19h30", pm: "" },
      { day: "Vendredi", am: "7h00 - 19h30", pm: "" },
      { day: "Samedi", am: "7h00 - 19h30", pm: "" },
      { day: "Dimanche", am: "8h30 - 12h00", pm: "" },
    ],
    legal: {
      raison: "LTMP",
      forme: "SARL",
      capital: "3 000",
      siren: "979 301 132",
      rcs: "RCS Vesoul 979 301 132",
      responsable: "Marion Parnaso",
      tva: "FR00979301132",
      naf: "47.11B — Commerce d'alimentation générale",
      emailDonnees: "epicerie.raddonnaise@outlook.fr",
      hebergementDonnees: "Union européenne",
      conservation: 3,
    },
    services: [],
    annonce: { active: !1, text: "", couleur: "apple" },
    popup: {
      active: !1,
      emoji: "📢",
      titre: "",
      texte: "",
      photo: "",
      frequence: "une",
      debut: "",
      fin: "",
    },
    jour: { items: [], maj: "" },
    offres: [],
    actus: [],
    fidelite: {
      active: !0,
      parEuro: 1,
      paliers: [],
      titre: "Carte de fidélité",
      sousTitre: "1 € dépensé = 1 point · 200 points = 5 € de remise",
      total: 10,
      remise: { active: !0, points: 200, euros: 5 },
    },
    clients: [],
    onglets: { carte: !0, fidelite: !0 },
  },
  TYPES = [
    { id: "frais", label: "Frais du jour", c: "#6E9B3A" },
    { id: "plat", label: "Fait maison", c: "#1C433B" },
    { id: "promo", label: "Promo", c: "#C27B42" },
    { id: "gaspi", label: "Date courte", c: "#B08A2E" },
    { id: "panier", label: "Panier anti-gaspi", c: "#2E7D32" },
  ],
  aujourdhui = () =>
    new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }),
  Bn = () => new Date().toLocaleDateString("sv-SE");

// Statut d'une annonce selon ses dates de parution
var jourFr = (t) =>
    t ? new Date(t + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "",
  statut = (t, e) => {
    let n = e ? "e" : "";
    if (t.active === !1) return ["off", "Masqué" + n];
    let r = Bn();
    return t.debut && t.debut > r
      ? ["promo", "Programmé" + n + " — dès le " + jourFr(t.debut)]
      : t.fin && t.fin < r
        ? ["off", "Terminé" + n + " — masqué" + n]
        : ["on", t.fin ? "En ligne jusqu'au " + jourFr(t.fin) : "En ligne"];
  },
  Pastille = ({ x, fem, style }) => {
    let [r, i] = statut(x, fem);
    return React.default.createElement(
      "span",
      { className: "pill " + r, style: { display: "inline-block", ...style } },
      i,
    );
  };

// Dates de parution : vides = tout de suite / sans fin
function Periode({ v, onChange }) {
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 10 } },
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Paraît à partir du"),
        React.default.createElement("input", {
          className: "inp",
          type: "date",
          value: v.debut || "",
          onChange: (n) => onChange({ ...v, debut: n.target.value }),
        }),
      ),
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Jusqu'au"),
        React.default.createElement("input", {
          className: "inp",
          type: "date",
          min: v.debut || void 0,
          value: v.fin || "",
          onChange: (n) => onChange({ ...v, fin: n.target.value }),
        }),
      ),
    ),
    React.default.createElement(
      "div",
      { style: { fontSize: 11, color: "var(--ink3)", margin: "5px 2px 0" } },
      "Vide = publié tout de suite, sans date de fin.",
      (v.debut || v.fin) &&
        React.default.createElement(
          "button",
          {
            onClick: () => onChange({ ...v, debut: "", fin: "" }),
            style: {
              marginLeft: 6,
              border: "none",
              background: "none",
              color: "var(--red)",
              fontFamily: "var(--body)",
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
              padding: 0,
            },
          },
          "Effacer les dates",
        ),
    ),
  );
}

// Base de l'administration : identifiants, réglages enregistrés, listes et colonnes de la base, nettoyage des données.
var Wr = () => Date.now() + Math.floor(Math.random() * 999),
  z9 = () => {
    let t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      e = new Uint8Array(20);
    return crypto.getRandomValues(e), Array.from(e, (n) => t[n % 62]).join("");
  },
  j9 = (t) => /^\d+$/.test(String(t)),
  U9 = ak,
  RS = ["accueil", "jour", "commandes", "messages"],
  CONFIG_KEYS = [
    "store",
    "hours",
    "services",
    "annonce",
    "fidelite",
    "onglets",
    "legal",
    "cmd",
    "themes",
    "chat",
    "fermetures",
    "push",
    "popup",
    "roue",
    "sondage",
    "menu",
  ],
  COLS = [
    "offres",
    "actus",
    "jour",
    "clients",
    "pubs",
    "plateaux",
    "commandes",
    "conversations",
    "resas",
    "producteurs",
    "recettes",
    "reponses",
  ],
  cw = (t, e) => [...t].sort((n, r) => (e ? (r.cree || 0) - (n.cree || 0) : (n.cree || 0) - (r.cree || 0))),
  tN = () => Object.fromEntries(CONFIG_KEYS.filter((t) => EMPTY2[t] !== void 0).map((t) => [t, EMPTY2[t]]));

// Supprime une liste de documents par paquets de 400 (limite de Firebase).
async function Pf(t) {
  for (let e = 0; e < t.length; e += 400) {
    let n = writeBatch(db);
    t.slice(e, e + 400).forEach((r) => n.delete(r)), await n.commit();
  }
}

// Supprime une conversation et tous ses messages.
async function nN(t) {
  let e = await getDocs(collection(db, "conversations", t, "messages")),
    n = [];
  e.forEach((r) => n.push(r.ref)), await Pf(n), await Pf([doc2(db, "conversations", t)]);
}

// Écrit les différences entre l'ancienne et la nouvelle liste (ajouts, modifs, suppressions)
async function syncCol(t, e = [], n = []) {
  let r = writeBatch(db),
    i = new Map(e.map((u) => [String(u.id), u])),
    s = new Set(),
    o = 0;
  n.forEach((u) => {
    let d = u.id != null ? String(u.id) : "",
      h = i.get(d),
      { id: p, ...m } = u;
    if (!h) r.set(doc2(collection(db, t)), { cree: Date.now(), ...m }), o++;
    else {
      s.add(d);
      let { id: w, ...E } = h;
      if (t === "jour") {
        let { reserves: A, ...S } = m,
          { reserves: _, ...I } = E;
        JSON.stringify(I) !== JSON.stringify(S) && (r.set(doc2(db, t, d), S, { merge: !0 }), o++);
      } else JSON.stringify(E) !== JSON.stringify(m) && (r.set(doc2(db, t, d), m), o++);
    }
  });
  let a = e.filter((u) => !s.has(String(u.id)) && n.every((d) => String(d.id) !== String(u.id)));
  if (
    (a.forEach((u) => {
      r.delete(doc2(db, t, String(u.id))), o++;
    }),
    o && (await r.commit()),
    t === "clients")
  )
    for (let u of a) {
      let d = await getDocs(collection(db, "clients", String(u.id), "historique"));
      if (!d.empty) {
        let h = [];
        d.forEach((p) => h.push(p.ref)), await Pf(h);
      }
    }
}

// Nettoyage des champs saisis (textes, nombres, commandes) et écran de secours en cas d'erreur d'affichage.
var Xi = (t) => (typeof t == "string" ? t : t == null ? "" : String(t)).slice(0, 500),
  Sf = (t) => {
    let e = Number(t);
    return isFinite(e) ? e : 0;
  },
  q9 = (t) => ({
    ...t,
    nom: Xi(t.nom),
    tel: Xi(t.tel),
    adresse: Xi(t.adresse),
    remarque: Xi(t.remarque),
    numero: Xi(t.numero),
    date: Xi(t.date),
    total: Sf(t.total),
    lignes: (Array.isArray(t.lignes) ? t.lignes : [])
      .filter((e) => e && typeof e == "object")
      .map((e) => ({
        ...e,
        nom: Xi(e.nom) || "Plateau",
        personnes: Sf(e.personnes),
        prixPersonne: Sf(e.prixPersonne),
        montant: Sf(e.montant),
        choix: Array.isArray(e.choix) ? e.choix.map(Xi) : [],
      })),
  }),
  SecoursEcran = class extends React.default.Component {
    constructor(e) {
      super(e), (this.state = { err: null });
    }
    static getDerivedStateFromError(e) {
      return { err: e };
    }
    componentDidCatch(e) {
      console.error(e);
    }
    render() {
      return this.state.err
        ? React.default.createElement(
            "div",
            { className: "wrap" },
            React.default.createElement(
              "div",
              { className: "card" },
              React.default.createElement("div", { className: "nm" }, "Cet écran n'a pas pu s'afficher"),
              React.default.createElement(
                "div",
                { className: "de", style: { margin: "6px 0 10px" } },
                "Les autres onglets fonctionnent. Si le problème revient, prévenez Eric.",
              ),
              React.default.createElement(
                "button",
                { className: "btn", onClick: () => this.setState({ err: null }) },
                "Réessayer",
              ),
            ),
          )
        : this.props.children;
    }
  };

// Contenu publié par Marion (lecture seule, temps réel)
// Lit en direct les données de l'épicerie (réglages, offres, actus, produits du jour…).
function useShop(t) {
  let [e, n] = (0, React.useState)(null),
    [r, i] = (0, React.useState)({
      offres: [],
      actus: [],
      jour: [],
      clients: [],
      pubs: [],
      plateaux: [],
      commandes: [],
      conversations: [],
      resas: [],
      producteurs: [],
      recettes: [],
      reponses: [],
    }),
    [s, o] = (0, React.useState)(""),
    [a, u] = (0, React.useState)(!1),
    [d, h] = (0, React.useState)({}),
    p = (0, React.useRef)({});
  (0, React.useEffect)(() => {
    if (!t) return;
    let _ = (T) => o(T?.code || "erreur"),
      I = [
        onSnapshot(
          CONFIG_REF,
          { includeMetadataChanges: !0 },
          (T) => {
            T.metadata.fromCache || u(!0),
              T.exists()
                ? n(T.data())
                : (n({}), T.metadata.fromCache || setDoc(CONFIG_REF, tN(), { merge: !0 }).catch(_));
          },
          _,
        ),
      ];
    return (
      COLS.forEach((T) =>
        I.push(
          onSnapshot(
            collection(db, T),
            (M) => {
              i((V) => ({ ...V, [T]: M.docs.map((O) => ({ ...O.data(), id: O.id })) }));
            },
            [
              "pubs",
              "plateaux",
              "commandes",
              "conversations",
              "resas",
              "producteurs",
              "recettes",
              "reponses",
            ].includes(T)
              ? (M) => console.warn(T + " non lisible (règles Firestore à mettre à jour ?)", M?.code)
              : _,
          ),
        ),
      ),
      () => I.forEach((T) => T())
    );
  }, [t]);
  let m = (0, React.useMemo)(() => {
      let _ = { ...EMPTY2, ...(e || {}), ...d };
      return {
        ..._,
        offres: cw(r.offres),
        actus: cw(r.actus, !0),
        // v2.44 : les plats du menu réservables (type « menu ») restent à part : jamais dans la liste
        // « Aujourd'hui », donc jamais effacés quand Marion enregistre sa liste
        jour: { items: cw(r.jour.filter((I) => I.type !== "menu"), !0), maj: _.jourMaj || "" },
        jourMenu: r.jour.filter((I) => I.type === "menu"),
        pubs: [...r.pubs].sort((I, T) => (I.ordre ?? I.cree ?? 0) - (T.ordre ?? T.cree ?? 0)),
        plateaux: [...r.plateaux].sort((I, T) => (I.ordre ?? I.cree ?? 0) - (T.ordre ?? T.cree ?? 0)),
        commandes: r.commandes.map(q9),
        conversations: r.conversations,
        resas: r.resas,
        producteurs: [...r.producteurs].sort(
          (I, T) => (I.ordre ?? 0) - (T.ordre ?? 0) || (I.nom || "").localeCompare(T.nom || "", "fr"),
        ),
        recettes: [...r.recettes].sort((I, T) => (T.cree || 0) - (I.cree || 0)),
        reponses: [...r.reponses].sort((I, T) => (T.cree || 0) - (I.cree || 0)),
        fermetures: Array.isArray(_.fermetures) ? _.fermetures : [],
        clients: [...r.clients].sort((I, T) => (I.nom || "").localeCompare(T.nom || "", "fr")),
      };
    }, [e, r, d]),
    w = (0, React.useRef)(m);
  w.current = m;
  let E = (_) => {
    console.error(_),
      ft(
        _?.code === "permission-denied"
          ? "Enregistrement refusé : votre session a peut-être expiré. Reconnectez-vous."
          : "Enregistrement impossible. Vérifiez la connexion internet et réessayez.",
      );
  };
  return [
    m,
    async (_, I) => {
      let T = w.current[_],
        M = typeof I == "function" ? I(T) : I;
      try {
        return (
          CONFIG_KEYS.includes(_)
            ? ((w.current = { ...w.current, [_]: M }),
              h((V) => ({ ...V, [_]: M })),
              clearTimeout(p.current[_]),
              (p.current[_] = setTimeout(async () => {
                try {
                  await setDoc(CONFIG_REF, { [_]: M }, { merge: !0 });
                } catch (V) {
                  E(V);
                }
                h((V) => {
                  if (V[_] !== M) return V;
                  let { [_]: O, ...b } = V;
                  return b;
                });
              }, 500)))
            : _ === "jour"
              ? (await syncCol("jour", T.items, M.items),
                M.maj !== T.maj && (await setDoc(CONFIG_REF, { jourMaj: M.maj }, { merge: !0 })))
              : COLS.includes(_) && (await syncCol(_, T, M)),
          !0
        );
      } catch (V) {
        return E(V), !1;
      }
    },
    async () => {
      try {
        for (let I of ["offres", "actus", "jour", "pubs", "plateaux"])
          await syncCol(I, w.current[I === "jour" ? "jour" : I].items || w.current[I], []);
        Object.values(p.current).forEach(clearTimeout), (p.current = {}), h({});
        let _ = tN();
        await setDoc(
          CONFIG_REF,
          {
            store: _.store,
            hours: _.hours,
            services: _.services,
            annonce: _.annonce,
            onglets: _.onglets,
            jourMaj: "",
          },
          { merge: !0 },
        );
      } catch (_) {
        E(_);
      }
    },
    { pret: e !== null, erreur: s, serveur: a },
  ];
}

// Enregistre un cadeau remis (tampons remis à zéro, bonus, trace dans l'historique du client).
async function ajouterRecompense(t, e, n, r) {
  let i = writeBatch(db),
    s = Date.now(),
    o = n === "recompense" || n === "recompense1",
    a = (o && Number(t.bonusAttente)) || 0,
    u = r ? Math.min(a, (r.palier || r.nb) - 1) : 0;
  i.update(doc2(db, "clients", String(t.id)), {
    tampons: increment(e + u),
    ...(n === "tampon" ? { dernierTampon: s } : {}),
    ...(o ? { cadeaux: increment(1) } : {}),
    ...(u ? { bonusAttente: a - u } : {}),
    derniere: new Date().toLocaleDateString("sv-SE"),
  }),
    i.set(doc2(collection(db, "clients", String(t.id), "historique")), {
      date: s,
      points: e,
      type: n,
      source: "admin",
    }),
    u &&
      i.set(doc2(collection(db, "clients", String(t.id), "historique")), {
        date: s - 1,
        points: u,
        type: "bonus",
        source: "admin",
      }),
    await i.commit();
}

// Points fidélité : incrément atomique + trace dans l'historique du client
async function ajouterPoints(t, e, n) {
  let r = Math.max(-(t.points || 0), e),
    i = writeBatch(db),
    s = doc2(db, "clients", String(t.id));
  i.update(s, {
    points: increment(r),
    ...(n.montant ? { depense: increment(n.montant) } : {}),
    derniere: new Date().toLocaleDateString("sv-SE"),
  }),
    i.set(doc2(collection(db, "clients", String(t.id), "historique")), {
      date: Date.now(),
      points: r,
      ...n,
    }),
    await i.commit();
}

// photo → base64 compressé
function lirePhoto(t, e, n = 800) {
  let r = new FileReader();
  (r.onload = () => {
    let i = new Image();
    (i.onload = () => {
      let s = Math.min(1, n / Math.max(i.width, i.height)),
        o = document.createElement("canvas");
      (o.width = Math.round(i.width * s)),
        (o.height = Math.round(i.height * s)),
        o.getContext("2d").drawImage(i, 0, 0, o.width, o.height);
      let a = 0.72,
        u = o.toDataURL("image/jpeg", a);
      for (; u.length > 6e5 && a > 0.35; ) (a -= 0.1), (u = o.toDataURL("image/jpeg", a));
      e(u);
    }),
      (i.src = r.result);
  }),
    r.readAsDataURL(t);
}
