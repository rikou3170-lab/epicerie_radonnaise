/* ═══════════════════════════════════════════════════════════════════════
 *  RGPD : MENTIONS LÉGALES, CONFIDENTIALITÉ, MES DONNÉES — pages légales, participation à la roue, « Mes données ».
 * ═══════════════════════════════════════════════════════════════════════ */

// v2.46 : obligations légales communes (loi Évin, allergènes, mineurs).
var MENTION_ALCOOL = "L'abus d'alcool est dangereux pour la santé, à consommer avec modération.",
  MENTION_MINEURS = "La vente d'alcool aux mineurs est interdite : une pièce d'identité peut être demandée au retrait.",
  // Reconnaît un produit alcoolisé d'après son nom ou sa description (« sans alcool » exclu).
  estAlcool = (...txt) => {
    let t = txt.filter(Boolean).join(" ").toLowerCase();
    if (/sans alcool|0[,.]0 ?%/.test(t)) return !1;
    // ingrédient de cuisine (« baba au rhum », « coq au vin », « vinaigre de cidre ») : ce n'est pas une boisson
    t = t.replace(/vinaigres? (de |d')?[a-zà-ÿ]+/g, "").replace(/(au|aux|à la|a la) (vins?|rhum|kirsch|cidre|bi[eè]re|porto|cognac|calvados|champagne|whisky|liqueur)/g, "");
    return /(^|[^a-zà-ÿ])(vins?|bi[eè]res?|cidres?|poir[ée]|kirsch|eaux?[- ]de[- ]vie|liqueurs?|cr[ée]mant|champagnes?|whiskys?|whiskies|rhums?|vodka|gin|pastis|spiritueux|beaujolais|ratafia|calvados|cognac|armagnac|porto|alcools?|absinthe|digestifs?)([^a-zà-ÿ]|$)/.test(t);
  },
  // Loi Évin : faut-il ajouter le message sanitaire ? (pas si Marion l'a déjà écrit)
  besoinEvin = (...txt) => estAlcool(...txt) && !/dangereux pour la sant/i.test(txt.filter(Boolean).join(" ")),
  // Texte court sur les allergènes, avec le téléphone de l'épicerie.
  // annul : réservation (plats du jour, produits du jour) — annulation sans frais au retrait en cas d'allergie.
  mentionAllergenes = (d, annul) =>
    "Allergènes : indiqués sur l'étiquette de chaque barquette ou produit. Vous pouvez les demander à l'épicerie" +
    (d?.store?.phone ? " au " + d.store.phone : "") +
    " avant de " +
    (annul ? "réserver. En cas d'allergie, vous pouvez annuler sans frais au moment du retrait." : "commander.");

// Pages légales : mentions légales, politique de confidentialité, conditions de commande.
function PageLegale({ type, d, onClose }) {
  let r = Object.fromEntries(
      Object.entries({ ...EMPTY2.legal, ...(d.legal || {}) }).map(([l, u]) => [
        l,
        u === "" || u == null ? EMPTY2.legal[l] : u,
      ]),
    ),
    i = d.store,
    o = r.emailDonnees || i.email,
    s = ({ children }) => React.default.createElement("h4", null, children);
  return React.default.createElement(
    "div",
    { className: "legal" },
    React.default.createElement(
      "div",
      { className: "legal-top" },
      React.default.createElement("button", { onClick: onClose, "aria-label": "Retour" }, "← Retour"),
    ),
    React.default.createElement(
      "div",
      { className: "legal-in" },
      type === "mentions"
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("h2", null, "Mentions légales"),
            React.default.createElement(s, null, "Éditeur de l'application"),
            React.default.createElement(
              "p",
              null,
              React.default.createElement("b", null, i.name),
              React.default.createElement("br", null),
              r.raison,
              r.forme ? ", " + r.forme : "",
              r.capital ? " au capital de " + r.capital + " €" : "",
              React.default.createElement("br", null),
              "Siège : ",
              i.address,
              React.default.createElement("br", null),
              r.siren &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "SIREN : ",
                  r.siren,
                  React.default.createElement("br", null),
                ),
              r.rcs &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  r.rcs,
                  React.default.createElement("br", null),
                ),
              r.tva &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "N° TVA intracommunautaire : ",
                  r.tva,
                  React.default.createElement("br", null),
                ),
              r.naf &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "Activité : ",
                  r.naf,
                  React.default.createElement("br", null),
                ),
              i.phone &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "Téléphone : ",
                  i.phone,
                  React.default.createElement("br", null),
                ),
              i.email && React.default.createElement(React.default.Fragment, null, "E-mail : ", i.email),
            ),
            React.default.createElement(s, null, "Directrice de la publication"),
            React.default.createElement("p", null, r.responsable, ", gérante"),
            React.default.createElement(s, null, "Hébergement"),
            React.default.createElement(
              "p",
              null,
              "Application : GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.",
              React.default.createElement("br", null),
              "Données : Firebase — Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande.",
            ),
            React.default.createElement(s, null, "Réclamations et médiation"),
            React.default.createElement(
              "p",
              null,
              "Pour toute réclamation, contactez d'abord l'épicerie",
              i.phone ? " au " + i.phone : "",
              i.email ? " ou par e-mail (" + i.email + ")" : "",
              ".",
              r.mediateur &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  " En cas de désaccord persistant, vous pouvez recourir gratuitement au médiateur de la consommation : ",
                  React.default.createElement("b", null, r.mediateur),
                  r.mediateurSite ? " (" + r.mediateurSite + ")" : "",
                  ".",
                ),
            ),
            React.default.createElement(s, null, "Propriété"),
            React.default.createElement(
              "p",
              null,
              "Le nom, le logo et les contenus de l'application appartiennent à ",
              i.name,
              ". Toute reproduction sans autorisation est interdite.",
            ),
          )
        : type === "conditions"
          ? React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("h2", null, "Conditions de commande et de réservation"),
              React.default.createElement(
                "p",
                { className: "chapo" },
                "Ces conditions s'appliquent aux commandes et réservations passées dans l'application ",
                i.name,
                ".",
              ),
              React.default.createElement(s, null, "Le vendeur"),
              React.default.createElement(
                "p",
                null,
                r.raison,
                r.forme ? ", " + r.forme : "",
                " — ",
                i.address,
                r.siren ? " — SIREN " + r.siren : "",
                i.phone ? " — Tél. " + i.phone : "",
                ".",
              ),
              React.default.createElement(s, null, "Prix"),
              React.default.createElement(
                "p",
                null,
                "Les prix sont indiqués en euros, toutes taxes comprises. Pour les produits vendus au poids, le prix affiché est une estimation : le montant exact est calculé à la pesée, au retrait. Le prix d'un produit en promotion est garanti dans la limite des quantités disponibles.",
              ),
              React.default.createElement(s, null, "Commande et réservation"),
              React.default.createElement(
                "p",
                null,
                "Une commande ou une réservation vous engage à venir chercher les produits au jour et à l'heure prévus. Les plats du jour sont confirmés par l'épicerie par message dans l'application. Un produit réservé qui n'est pas retiré à temps peut être remis en vente.",
              ),
              React.default.createElement(s, null, "Paiement"),
              React.default.createElement(
                "p",
                null,
                "Aucun paiement en ligne : vous payez au retrait à l'épicerie (ou à la livraison, quand elle est proposée).",
              ),
              React.default.createElement(s, null, "Annulation et rétractation"),
              React.default.createElement(
                "p",
                null,
                "Pour annuler ou modifier une commande, prévenez l'épicerie",
                i.phone ? " au " + i.phone : "",
                " au moins 48 h avant le retrait (le plus tôt possible pour une réservation). Les produits alimentaires frais ou préparés sur commande ne bénéficient pas du droit de rétractation (article L221-28 du code de la consommation).",
              ),
              React.default.createElement(s, null, "Allergènes"),
              React.default.createElement(
                "p",
                null,
                "Les allergènes sont indiqués sur l'étiquette de chaque barquette ou produit, et sur le menu quand l'épicerie les a renseignés. Vous pouvez les demander à l'épicerie",
                i.phone ? " au " + i.phone : "",
                " avant de commander ou de réserver. En cas d'allergie, une réservation peut être annulée sans frais au moment du retrait. Pour les plateaux, signalez vos allergies lors de la commande.",
              ),
              React.default.createElement(s, null, "Alcool"),
              React.default.createElement("p", null, MENTION_MINEURS, " ", MENTION_ALCOOL),
              React.default.createElement(s, null, "Réclamations et médiation"),
              React.default.createElement(
                "p",
                null,
                "Pour toute réclamation, contactez l'épicerie",
                i.phone ? " au " + i.phone : "",
                i.email ? " ou par e-mail (" + i.email + ")" : "",
                ".",
                r.mediateur &&
                  React.default.createElement(
                    React.default.Fragment,
                    null,
                    " Si le désaccord persiste, vous pouvez recourir gratuitement au médiateur de la consommation : ",
                    React.default.createElement("b", null, r.mediateur),
                    r.mediateurSite ? " (" + r.mediateurSite + ")" : "",
                    ".",
                  ),
              ),
            )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("h2", null, "Vos données personnelles"),
            React.default.createElement(
              "p",
              { className: "chapo" },
              "L'application est conçue pour collecter le moins de données possible. Voici exactement ce que nous faisons.",
            ),
            React.default.createElement(s, null, "Qui est responsable ?"),
            React.default.createElement(
              "p",
              null,
              r.raison,
              r.forme ? " (" + r.forme + ")" : "",
              " — ",
              i.name,
              ", ",
              i.address,
              r.siren ? ", SIREN " + r.siren : "",
              ", représentée par ",
              r.responsable,
              ".",
            ),
            React.default.createElement(s, null, "Quelles données ?"),
            React.default.createElement(
              "p",
              null,
              "Uniquement si vous créez une carte de fidélité : vos ",
              React.default.createElement("b", null, "nom et prénom"),
              ", votre ",
              React.default.createElement("b", null, "téléphone"),
              ", votre ",
              React.default.createElement("b", null, "adresse e-mail"),
              ", votre code de carte, vos tampons et le montant de vos achats en caisse (pour calculer les tampons : 1 par tranche de 10 €, le reste étant gardé pour la fois suivante), la date d'inscription, le code de votre parrain si vous en indiquez un (pour vous offrir à tous les deux le tampon de parrainage), et, si vous l'indiquez, le jour et le mois de votre anniversaire (sans l'année), pour vous offrir un tampon ce jour-là. Les réponses aux sondages de l'appli sont anonymes et l'historique de vos passages en caisse (date, tampons ou points gagnés), dont le nombre de cadeaux reçus qui donne votre niveau (Membre supporter, Pilier de l'épicerie).",
            ),
            React.default.createElement(
              "p",
              null,
              "Si vous passez une commande de plateaux : votre ",
              React.default.createElement("b", null, "nom"),
              ", votre ",
              React.default.createElement("b", null, "téléphone"),
              ", l'",
              React.default.createElement("b", null, "adresse de livraison"),
              " le cas échéant, la date choisie, le détail de la commande, votre remarque éventuelle et, si vous les indiquez, vos allergies ou votre régime alimentaire. Ces dernières informations servent uniquement à préparer votre commande et sont supprimées avec elle.",
            ),
            React.default.createElement(
              "p",
              null,
              "Si vous écrivez à l'épicerie depuis l'application : votre ",
              React.default.createElement("b", null, "prénom"),
              ", votre ",
              React.default.createElement("b", null, "téléphone"),
              " si vous le donnez, et vos ",
              React.default.createElement("b", null, "messages"),
              ". Ils servent uniquement à vous répondre et sont supprimés au plus tard 1 an après le dernier échange.",
            ),
            React.default.createElement(
              "p",
              null,
              "Si vous activez les notifications : un identifiant technique de votre téléphone (fourni par Google Firebase Cloud Messaging), utilisé uniquement pour vous prévenir de vos commandes, réservations et messages et, seulement si vous le cochez, des bons plans de l'épicerie. Vous pouvez les désactiver à tout moment (onglet Infos).",
            ),
            React.default.createElement(
              "p",
              null,
              "Aucune donnée bancaire, aucune géolocalisation, aucune publicité. Consulter l'application sans carte ne collecte aucune donnée personnelle.",
            ),
            React.default.createElement(s, null, "Pourquoi ?"),
            React.default.createElement(
              "p",
              null,
              "Uniquement pour gérer votre carte de fidélité et vos récompenses. Base légale : l'exécution du programme de fidélité auquel vous adhérez en créant votre carte (article 6.1.b du RGPD). Votre téléphone et votre e-mail servent seulement à vous retrouver ou à vous contacter au sujet de votre carte : jamais de prospection, jamais de revente.",
            ),
            React.default.createElement(
              "p",
              null,
              "Les coordonnées données lors d'une commande servent uniquement à la préparer, vous la remettre et vous joindre à son sujet (exécution de la commande, article 6.1.b du RGPD).",
            ),
            React.default.createElement(s, null, "Qui y a accès ?"),
            React.default.createElement(
              "p",
              null,
              "Uniquement l'épicerie. Les données sont hébergées par notre prestataire technique Firebase (Google)",
              r.hebergementDonnees ? " (" + r.hebergementDonnees + ")" : "",
              ", qui agit pour notre compte et n'a pas le droit de les utiliser. Google adhère au cadre de protection des données UE–États-Unis (Data Privacy Framework).",
              Nn(d.cmd).script &&
                " L'avis de nouvelle commande est envoyé à l'épicerie sur sa messagerie Gmail (Google).",
            ),
            React.default.createElement(s, null, "Combien de temps ?"),
            React.default.createElement(
              "p",
              null,
              "Tant que votre carte est utilisée. Une carte sans aucun passage en caisse depuis ",
              React.default.createElement("b", null, r.conservation || 3, " ans"),
              " est supprimée avec son historique. Vous pouvez aussi demander sa suppression à tout moment. Les commandes sont conservées ",
              React.default.createElement("b", null, "1 an"),
              " après la date de retrait ou de livraison, puis supprimées.",
            ),
            React.default.createElement(s, null, "Sur votre téléphone"),
            React.default.createElement(
              "p",
              null,
              "L'application n'enregistre que ce qui est indispensable à son fonctionnement : l'identifiant de votre carte, de vos commandes et de vos messages, vos préférences d'affichage et, si vous le donnez, votre prénom (qui ne quitte pas votre téléphone). Aucun cookie publicitaire ni traceur : c'est pourquoi aucun bandeau de consentement ne vous est demandé.",
            ),
            React.default.createElement(s, null, "Mesure d'audience anonyme"),
            React.default.createElement(
              "p",
              null,
              "Pour savoir ce qui vous intéresse, l'épicerie compte de façon ",
              React.default.createElement("b", null, "anonyme"),
              " les ouvertures de l'application et les rubriques consultées (par exemple : « La carte vue 40 fois aujourd'hui »). Ces compteurs ne contiennent ni nom, ni téléphone, ni identifiant : ils ne permettent pas de savoir qui a consulté quoi, et ne sont partagés avec personne. Seule la date du jour est gardée sur votre téléphone, pour ne compter qu'un visiteur par jour. Ils sont supprimés après 13 mois.",
            ),
            React.default.createElement(s, null, "Vos droits"),
            React.default.createElement(
              "p",
              null,
              "Vous pouvez consulter, corriger, télécharger ou supprimer vos données, et vous opposer à leur traitement.",
            ),
            React.default.createElement(
              "ul",
              null,
              React.default.createElement(
                "li",
                null,
                React.default.createElement("b", null, "Consultation et téléchargement dans l'application"),
                " : onglet Fidélité → « Mes données ».",
              ),
              React.default.createElement(
                "li",
                null,
                React.default.createElement("b", null, "Ou en nous contactant"),
                " : ",
                o,
                i.phone ? ", " + i.phone : "",
                ", ou en boutique.",
              ),
            ),
            React.default.createElement(
              "p",
              null,
              "En cas de désaccord, vous pouvez saisir la CNIL (cnil.fr).",
            ),
            React.default.createElement(s, null, "Sécurité"),
            React.default.createElement(
              "p",
              null,
              "L'administration est protégée par mot de passe. Votre fiche n'est consultable qu'avec l'identifiant secret enregistré sur votre téléphone : personne ne peut parcourir la liste des clients depuis l'application.",
            ),
          ),
      React.default.createElement("p", { className: "maj-legal" }, "Dernière mise à jour : octobre 2026"),
    ),
  );
}

// Nom du tirage (« le tirage du 24 décembre »).
var s9 = (t) => {
  let e = String(t || "").trim();
  return e
    ? "le " + (/^[A-ZÀ-Ý][a-zà-ÿ]/.test(e) ? e[0].toLowerCase() + e.slice(1) : e).replace(/^le /i, "")
    : "le tirage au sort de Noël";
};

// Choix de participer ou non à la roue de Noël.
function ParticipationRoue({ moi, d }) {
  let [n, r] = (0, React.useState)(""),
    i = d.roue ? l2(d.roue) : null;
  if (!i || !i.active || (i.fin && cO() > i.fin)) return null;
  let o = async (s) => {
    r("…");
    try {
      await setDoc(doc2(db, "clients", moi.ref), s ? { roueNon: !0, roueAJouer: [] } : { roueNon: !1 }, {
        merge: !0,
      }),
        r(
          s
            ? "C'est noté, la roue ne s'affichera plus."
            : "🎄 C'est noté, vous participez à la roue de Noël !",
        );
    } catch {
      r("Pas de connexion : réessayez dans un instant.");
    }
  };
  return React.default.createElement(
    "div",
    { className: "roue-choix" },
    React.default.createElement(
      "div",
      null,
      React.default.createElement("b", null, "🎄 Roue de Noël"),
      React.default.createElement(
        "span",
        null,
        moi.roueNon ? "Vous ne participez pas." : "Vous participez : un tour de roue à chaque tampon.",
      ),
    ),
    React.default.createElement(
      "button",
      { className: "btn gh sm", style: { width: "auto" }, onClick: () => o(!moi.roueNon) },
      moi.roueNon ? "Participer" : "Ne plus participer",
    ),
    n && n !== "…" && React.default.createElement("div", { className: "roue-choix-ok" }, n),
  );
}

// « Mes données » : voir, corriger, exporter ou supprimer ses informations.
function MesDonnees({ moi, d: e, setMoi, ouvrirLegal }) {
  let [i, o] = (0, React.useState)(""),
    [s, l] = (0, React.useState)(null),
    u = e.store.phone,
    d = async () => {
      o("Chargement…");
      try {
        let A = await getDoc(doc2(db, "clients", moi.ref)),
          S = [];
        try {
          S = (await getDocs(collection(db, "clients", moi.ref, "historique"))).docs
            .map((z) => z.data())
            .sort((z, j) => (j.date || 0) - (z.date || 0));
        } catch {}
        let P = A.exists() ? A.data() : {};
        l({
          fiche: {
            nom: P.nom,
            prenom: P.prenom ?? String(P.nom || "").split(" ")[0],
            nomFamille:
              P.nomFamille ??
              String(P.nom || "")
                .split(" ")
                .slice(1)
                .join(" "),
            telephone: P.tel || "",
            email: P.email || "",
            anniv: P.anniv || "",
            code: P.code,
            points: P.points || 0,
            tampons: P.tampons || 0,
            euros_gardes: Number(P.reste) || 0,
            inscription: P.depuis,
            accord: P.accord || "",
          },
          historique: S,
        }),
          o("");
      } catch {
        o("Impossible de charger vos données. Vérifiez votre connexion.");
      }
    },
    h = () => {
      let A = {
          application: e.store.name,
          exporte_le: new Date().toISOString(),
          carte: s.fiche,
          passages: s.historique.map((P) => ({
            date: P.date ? new Date(P.date).toISOString() : "",
            type: P.type,
            montant: P.montant ?? null,
            points: P.points,
          })),
        },
        S = document.createElement("a");
      (S.href = URL.createObjectURL(new Blob([JSON.stringify(A, null, 2)], { type: "application/json" }))),
        (S.download = "mes-donnees-epicerie-raddonnaise.json"),
        S.click();
    },
    [f, m] = (0, React.useState)(!1),
    [E, F] = (0, React.useState)(null),
    D = async () => {
      let A = nomPropre(E.prenom).slice(0, 40),
        S = nomPropre(E.nomFamille).slice(0, 40);
      o("Enregistrement…");
      try {
        let P = writeBatch(db);
        P.update(doc2(db, "clients", moi.ref), {
          prenom: A,
          nomFamille: S,
          nom: (A + " " + S).slice(0, 60),
          tel: telFormate(E.tel),
          email: E.email.trim().toLowerCase().slice(0, 100),
          anniv: E.aj && E.am ? String(E.am).padStart(2, "0") + "-" + String(E.aj).padStart(2, "0") : "",
        }),
          await P.commit(),
          F(null),
          await d(),
          o("✓ Vos informations sont enregistrées.");
      } catch {
        o("Enregistrement impossible. Vérifiez votre connexion et réessayez.");
      }
    },
    M = e.legal?.emailDonnees || e.store.email,
    C = encodeURIComponent(
      `Bonjour,

Je souhaite la suppression de ma carte de fidélité ` +
        (moi.code || "") +
        " (" +
        (moi.nom || "") +
        `) et de toutes mes données.

Merci.`,
    );
  return React.default.createElement(
    "div",
    { className: "card", style: { marginTop: 14 } },
    React.default.createElement(
      "div",
      { className: "b" },
      React.default.createElement(
        "div",
        { style: { fontWeight: 800, fontSize: 14, color: "var(--forest)", marginBottom: 4 } },
        "Mes données",
      ),
      React.default.createElement(
        "p",
        { style: { marginBottom: 12 } },
        "Vous gardez la main sur vos informations personnelles.",
      ),
      React.default.createElement(ParticipationRoue, { moi, d: e }),
      s
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "div",
              { className: "donnees" },
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "Nom"),
                React.default.createElement("b", null, s.fiche.nom),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "Téléphone"),
                React.default.createElement("b", null, s.fiche.telephone || "—"),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "E-mail"),
                React.default.createElement("b", { style: { wordBreak: "break-all" } }, s.fiche.email || "—"),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "Anniversaire"),
                React.default.createElement("b", null, u9(s.fiche.anniv) || "—"),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "Code carte"),
                React.default.createElement("b", null, s.fiche.code),
              ),
              fc(e.fidelite)
                ? React.default.createElement(
                    "div",
                    null,
                    React.default.createElement("span", null, "Tampons"),
                    React.default.createElement("b", null, s.fiche.tampons),
                  )
                : React.default.createElement(
                    "div",
                    null,
                    React.default.createElement("span", null, "Points"),
                    React.default.createElement("b", null, s.fiche.points),
                  ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "Inscription"),
                React.default.createElement("b", null, s.fiche.inscription),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "Passages en caisse"),
                React.default.createElement("b", null, s.historique.length),
              ),
            ),
            React.default.createElement(
              "button",
              { className: "btn gh", style: { marginTop: 10 }, onClick: h },
              "Télécharger mes données",
            ),
            E
              ? React.default.createElement(
                  "div",
                  { className: "modif" },
                  React.default.createElement(
                    "div",
                    { style: { display: "flex", gap: 10 } },
                    React.default.createElement(
                      "div",
                      { style: { flex: 1, minWidth: 0 } },
                      React.default.createElement("label", { className: "lab" }, "Prénom"),
                      React.default.createElement("input", {
                        className: "inp",
                        value: E.prenom,
                        onChange: (A) => F({ ...E, prenom: A.target.value }),
                      }),
                    ),
                    React.default.createElement(
                      "div",
                      { style: { flex: 1, minWidth: 0 } },
                      React.default.createElement("label", { className: "lab" }, "Nom"),
                      React.default.createElement("input", {
                        className: "inp",
                        value: E.nomFamille,
                        onChange: (A) => F({ ...E, nomFamille: A.target.value }),
                      }),
                    ),
                  ),
                  React.default.createElement("label", { className: "lab" }, "Téléphone"),
                  React.default.createElement("input", {
                    className: "inp",
                    type: "tel",
                    value: E.tel,
                    onChange: (A) => F({ ...E, tel: A.target.value }),
                  }),
                  E.tel &&
                    !telValide(E.tel) &&
                    React.default.createElement(
                      "div",
                      { className: "champ-err" },
                      "Numéro incomplet (10 chiffres).",
                    ),
                  React.default.createElement("label", { className: "lab" }, "Adresse e-mail"),
                  React.default.createElement("input", {
                    className: "inp",
                    type: "email",
                    autoCapitalize: "off",
                    value: E.email,
                    onChange: (A) => F({ ...E, email: A.target.value }),
                  }),
                  E.email &&
                    !emailValide(E.email) &&
                    React.default.createElement(
                      "div",
                      { className: "champ-err" },
                      "Adresse e-mail incomplète.",
                    ),
                  React.default.createElement("label", { className: "lab" }, "Anniversaire (facultatif)"),
                  React.default.createElement(ChoixAnniversaire, {
                    j: E.aj,
                    m: E.am,
                    setJ: (A) => F((S) => ({ ...S, aj: A })),
                    setM: (A) => F((S) => ({ ...S, am: A })),
                  }),
                  React.default.createElement(
                    "div",
                    { style: { display: "flex", gap: 8, marginTop: 10 } },
                    React.default.createElement(
                      "button",
                      { className: "btn gh", style: { flex: 1 }, onClick: () => F(null) },
                      "Annuler",
                    ),
                    React.default.createElement(
                      "button",
                      {
                        className: "btn",
                        style: { flex: 2 },
                        disabled:
                          !E.prenom.trim() ||
                          !E.nomFamille.trim() ||
                          !telValide(E.tel) ||
                          !emailValide(E.email),
                        onClick: D,
                      },
                      "Enregistrer",
                    ),
                  ),
                )
              : React.default.createElement(
                  "button",
                  {
                    className: "btn gh",
                    style: { marginTop: 8 },
                    onClick: () =>
                      F({
                        prenom: s.fiche.prenom || "",
                        nomFamille: s.fiche.nomFamille || "",
                        tel: s.fiche.telephone || "",
                        email: s.fiche.email || "",
                        aj: s.fiche.anniv ? String(+s.fiche.anniv.slice(3)) : "",
                        am: s.fiche.anniv ? String(+s.fiche.anniv.slice(0, 2)) : "",
                      }),
                  },
                  "✏\uFE0F Modifier mes infos",
                ),
          )
        : React.default.createElement("button", { className: "btn gh", onClick: d }, "Consulter mes données"),
      f
        ? React.default.createElement(
            "div",
            { className: "rgpd-info", style: { marginTop: 10 } },
            "Pour protéger votre carte, la suppression est faite par l'épicerie. Demandez-la en un geste, elle sera faite rapidement :",
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" } },
              u &&
                React.default.createElement(
                  "a",
                  {
                    className: "btn gh",
                    style: { flex: 1, textDecoration: "none", textAlign: "center" },
                    href: "tel:" + u.replace(/\s/g, ""),
                  },
                  "Appeler",
                ),
              M &&
                React.default.createElement(
                  "a",
                  {
                    className: "btn gh",
                    style: { flex: 1, textDecoration: "none", textAlign: "center" },
                    href:
                      "mailto:" +
                      M +
                      "?subject=" +
                      encodeURIComponent("Suppression de ma carte de fidélité") +
                      "&body=" +
                      C,
                  },
                  "Envoyer un e-mail",
                ),
            ),
            React.default.createElement(
              "div",
              { style: { marginTop: 8 } },
              "Ou simplement en boutique, en donnant votre code ",
              React.default.createElement("b", null, moi.code),
              ".",
            ),
          )
        : React.default.createElement(
            "button",
            {
              className: "btn gh",
              style: { marginTop: 8, color: "#C86B5C", borderColor: "#EBC9C2" },
              onClick: () => m(!0),
            },
            "Supprimer ma carte et mes données",
          ),
      i &&
        React.default.createElement("p", { style: { fontSize: 12, marginTop: 8, color: "var(--ink2)" } }, i),
      React.default.createElement(
        "button",
        { className: "lienleg", onClick: () => ouvrirLegal("confidentialite") },
        "Politique de confidentialité",
      ),
    ),
  );
}
