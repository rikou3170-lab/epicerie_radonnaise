/* ═══════════════════════════════════════════════════════════════════════
 *  BASE DE L'APPLI CLIENT — logo, contenu par défaut, QR code, lecture des données de l'épicerie et de la carte du client.
 * ═══════════════════════════════════════════════════════════════════════ */

// Base de l'appli client : date du jour, clé de la carte sur le téléphone, logo et contenu par défaut.
var cO = () => new Date().toLocaleDateString("sv-SE"),
  USER_KEY = "epicerie-raddonnaise-carte",
  LOGO =
    "data:image/jpeg;base64,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",
  EMPTY2 = {
    store: {
      name: "Épicerie Raddonnaise",
      slogan: "Votre épicerie, tout près de chez vous",
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
  TYPES = {
    frais: { label: "Frais du jour", c: "#6E9B3A", bg: "#EEF3E2" },
    plat: { label: "Fait maison", c: "#1C433B", bg: "#E4EDE9" },
    promo: { label: "Promo", c: "#C27B42", bg: "#FBEFE4" },
    gaspi: { label: "Date courte", c: "#B08A2E", bg: "#FAF2DC" },
    panier: { label: "Panier anti-gaspi", c: "#2E7D32", bg: "#E3F1E3" },
  },
  Z5 = () => new Date().toLocaleDateString("sv-SE"),
  vn = (t) => !!t && t.active !== !1 && (!t.debut || t.debut <= Z5()) && (!t.fin || t.fin >= Z5()),
  dO = (t) =>
    t ? new Date(t + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "";

// QR code dessiné par l'application (aucun service extérieur, fonctionne hors ligne)
// Dessine un QR code (carte de fidélité).
function QR({ texte, taille = 148, couleur = "#1C433B", style }) {
  let i = (0, React.useMemo)(() => {
    let o = G_(0, "M");
    o.addData(texte), o.make();
    let s = o.getModuleCount(),
      l = "";
    for (let u = 0; u < s; u++)
      for (let d = 0; d < s; d++) o.isDark(u, d) && (l += "M" + d + " " + u + "h1v1h-1z");
    return { d: l, n: s };
  }, [texte]);
  return React.default.createElement(
    "svg",
    {
      role: "img",
      "aria-label": "QR code " + texte,
      viewBox: "0 0 " + i.n + " " + i.n,
      width: typeof taille == "number" ? taille : void 0,
      height: typeof taille == "number" ? taille : void 0,
      shapeRendering: "crispEdges",
      style: { display: "block", background: "#fff", ...style },
    },
    React.default.createElement("path", { d: i.d, fill: couleur }),
  );
}

// Trie une liste par date de création.
var $2 = (t, e) => [...t].sort((n, r) => (e ? (r.cree || 0) - (n.cree || 0) : (n.cree || 0) - (r.cree || 0)));

// Contenu publié par Marion (lecture seule, temps réel)
// Lit en direct les données de l'épicerie (réglages, offres, actus, produits du jour…).
function useShop() {
  let [t, e] = (0, React.useState)({}),
    [n, r] = (0, React.useState)(!1),
    [i, o] = (0, React.useState)({
      offres: [],
      actus: [],
      jour: [],
      pubs: [],
      plateaux: [],
      producteurs: [],
      recettes: [],
    });
  return (
    (0, React.useEffect)(() => {
      let s = [
        onSnapshot(
          CONFIG_REF,
          (l) => {
            e(l.exists() ? l.data() : {}), r(!0);
          },
          () => r(!0),
        ),
      ];
      return (
        ["offres", "actus", "jour", "pubs", "plateaux", "producteurs", "recettes"].forEach((l) =>
          s.push(
            onSnapshot(
              collection(db, l),
              (u) => o((d) => ({ ...d, [l]: u.docs.map((h) => ({ ...h.data(), id: h.id })) })),
              () => {},
            ),
          ),
        ),
        () => s.forEach((l) => l())
      );
    }, []),
    (0, React.useMemo)(() => {
      let s = { ...EMPTY2, ...t };
      return {
        ...s,
        pret: n,
        fermetures: Array.isArray(s.fermetures) ? s.fermetures : [],
        carteActive: s.onglets?.carte !== !1,
        fidActive: s.onglets?.fidelite !== !1 && !!s.fidelite?.active,
        offres: $2(i.offres),
        plateaux: [...i.plateaux].sort((l, u) => (l.ordre ?? l.cree ?? 0) - (u.ordre ?? u.cree ?? 0)),
        actus: $2(i.actus, !0),
        jour: { items: $2(i.jour.filter((l) => l.type !== "menu"), !0), maj: s.jourMaj || "" },
        // v2.44 : plats du menu de la semaine réservables (articles « menu » créés par l'admin, cachés de la liste du jour)
        jourMenu: i.jour.filter((l) => l.type === "menu"),
        pubs: [...i.pubs].filter(vn).sort((l, u) => (l.ordre ?? l.cree ?? 0) - (u.ordre ?? u.cree ?? 0)),
        producteurs: [...i.producteurs]
          .filter((l) => l.active !== !1 && l.nom)
          .sort((l, u) => (l.ordre ?? 0) - (u.ordre ?? 0) || (l.nom || "").localeCompare(u.nom || "", "fr")),
        recettes: [...i.recettes]
          .filter((l) => l.active !== !1 && l.titre)
          .sort((l, u) => (u.cree || 0) - (l.cree || 0)),
      };
    }, [t, i, n])
  );
}

// Ma carte : on garde sur le téléphone l'identifiant secret de la fiche,
// et on suit les points en temps réel.
// Carte de fidélité du téléphone, lue en direct.
function useMoi() {
  let t = () => {
      try {
        let i = localStorage.getItem(USER_KEY),
          o = i ? JSON.parse(i) : null;
        return o && o.ref ? o : null;
      } catch {
        return null;
      }
    },
    [moi, setMoi] = (0, React.useState)(t),
    r = (i) => {
      setMoi(i);
      try {
        i ? localStorage.setItem(USER_KEY, JSON.stringify(i)) : localStorage.removeItem(USER_KEY);
      } catch {}
    };
  return (
    (0, React.useEffect)(() => {
      if (moi?.ref)
        return onSnapshot(
          doc2(db, "clients", moi.ref),
          (i) => {
            if (i.exists()) {
              let o = i.data();
              r({
                ref: i.id,
                code: o.code,
                nom: o.nom,
                points: o.points || 0,
                tampons: o.tampons || 0,
                dernierTampon: o.dernierTampon || 0,
                choix: o.choix || "",
                choixLe: o.choixLe || 0,
                roueAJouer: Array.isArray(o.roueAJouer) ? o.roueAJouer : [],
                roueNon: !!o.roueNon,
                roueG: o.roueG || 0,
                roueP: o.roueP ?? -1,
                anniv: o.anniv || "",
                annivAn: o.annivAn || 0,
                prenom: o.prenom || "",
                tel: o.tel || "",
                bonusAttente: Number(o.bonusAttente) || 0,
                cadeaux: Number(o.cadeaux) || 0,
                // v2.45 : euros gardés pour le prochain tampon (1 tampon par tranche de 10 €)
                reste: Number(o.reste) || 0,
              });
            } else i.metadata.fromCache || r(null);
          },
          () => {},
        );
    }, [moi?.ref]),
    [moi, r]
  );
}
