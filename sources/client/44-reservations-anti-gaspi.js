/* ═══════════════════════════════════════════════════════════════════════
 *  RÉSERVATIONS ANTI-GASPI (promos, dates courtes, paniers).
 * ═══════════════════════════════════════════════════════════════════════ */

// Réservations gardées sur le téléphone (identifiants secrets).
var RESA_KEY = "epicerie-raddonnaise-resas",
  ts = () => {
    try {
      return JSON.parse(localStorage.getItem(RESA_KEY) || "[]");
    } catch {
      return [];
    }
  },
  rx = (t) => {
    try {
      localStorage.setItem(RESA_KEY, JSON.stringify(t.slice(0, 15)));
    } catch {}
  },
  fT = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
  z9 = () => {
    let t = new Uint32Array(5);
    return crypto.getRandomValues(t), "R-" + [...t].map((e) => fT[e % fT.length]).join("");
  },
  Ro = (t) => Math.max(0, (parseInt(t.stock) || 0) - (parseInt(t.reserves) || 0)),
  j9 = (t) => (parseInt(t.stock) || 0) > 0;

// v2.42 : articles vendus au kilo (unité « kg ») — le client choisit un poids par tranches de 100 g ;
// libellé d'une réservation : « 2 × Endive » ou « Mandarines · 1,1 kg ».
const auKilo = (t) => /^\s*(le\s+)?(kg|kilo|kilos|kilogrammes?)\s*$/i.test(String(t?.unite || "")),
  poidsTexte = (g) => (g < 1000 ? g + " g" : String(g / 1000).replace(".", ",") + " kg"),
  // libellé d'une réservation : « 2 × Endive » ou « Mandarine · 1,1 kg » (réservation au poids)
  // v2.43 : au kilo, le stock et les réservations se comptent en tranches de 100 g (10 = 1 kg)
  dispoTexte = (t) => (auKilo(t) ? poidsTexte(Ro(t) * 100) : String(Ro(t))),
  libelleResa = (r) => (/ · \d+(,\d+)? k?g$/.test(String(r.titre || "")) ? r.titre : r.qte + " × " + r.titre);

// Réservations du client, suivies en direct.
function useMesResas(t) {
  let [liste, setListe] = (0, React.useState)(ts),
    [live, setLive] = (0, React.useState)({});
  (0, React.useEffect)(() => {
    setListe(ts());
  }, [t]);
  // v2.44 : un plat du menu peut se réserver pour la fin de la semaine → suivi 8 jours au lieu de 4
  let o = liste.filter((s) => s.ref && Date.now() - (s.cree || 0) < (s.menu ? 8 : 4) * 864e5).map((s) => s.ref);
  return (
    (0, React.useEffect)(() => {
      let s = o.map((l) =>
        onSnapshot(
          doc2(db, "resas", l),
          (u) =>
            setLive((d) => ({
              ...d,
              [l]: u.exists() ? u.data() : u.metadata?.fromCache ? d[l] : { statut: "annulee" },
            })),
          () => {},
        ),
      );
      return () => s.forEach((l) => l());
    }, [o.join()]),
    liste
      .filter((s) => o.includes(s.ref))
      .map((s) => (live[s.ref] ? { ...s, statut: live[s.ref].statut, conv: live[s.ref].conv || "", confirme: !!live[s.ref].confirme } : s))
  );
}

// v2.44 : rubrique « Mes réservations » sur l'accueil — les réservations en cours avec leur statut
// (plats du menu : en attente de validation / validée / refusée ; autres articles : réservé).
function MesResas({ resas }) {
  let e = resas.filter((n) => n.statut === "reservee" || (n.menu && n.statut === "refusee")),
    statut = (n) =>
      n.statut === "refusee"
        ? ["refusee", "❌ Refusée"]
        : n.menu
          ? n.confirme
            ? ["validee", "✅ Validée"]
            : ["attente", "⏳ En attente de validation"]
          : ["validee", "✅ Réservé"];
  return e.length
    ? React.default.createElement(
        "section",
        { className: "mes-resas" },
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", { style: { background: "var(--terra)" } }),
          "Mes réservations",
        ),
        e.map((n) =>
          React.default.createElement(
            "div",
            { className: "resa-suivi " + statut(n)[0], key: n.numero },
            React.default.createElement("div", { className: "rs-ic" }, n.menu ? "🍽️" : "🧺"),
            React.default.createElement(
              "div",
              { style: { minWidth: 0, flex: 1 } },
              React.default.createElement("span", { className: "rs-statut" }, statut(n)[1]),
              React.default.createElement("b", null, libelleResa(n)),
              React.default.createElement(
                "div",
                null,
                n.statut === "refusee" ? "Prévu " : "À retirer ",
                n.retrait || "à l'épicerie",
                " · N° ",
                n.numero,
                n.total > 0 ? " · " + ze(n.total) : "",
              ),
              n.statut === "refusee" &&
                React.default.createElement("div", null, "L'épicerie vous a expliqué pourquoi dans vos messages."),
            ),
          ),
        ),
      )
    : null;
}

// Réserver un produit anti-gaspi.
function Reserver({ i: t, d: e, prenom, moi, onClose, onFait, inst }) {
  let s = auKilo(t) ? Math.min(50, Ro(t)) : Math.min(10, Ro(t)),
    [qte, setQte] = (0, React.useState)(1),
    d = ts()[0] || {},
    // v2.38 : on propose le nom complet et le téléphone de la carte de fidélité (sinon ceux de la dernière réservation)
    [nom, setNom] = (0, React.useState)(moi?.nom || d.nom || prenom || ""),
    [tel, setTel] = (0, React.useState)(moi?.tel || d.tel || ""),
    [etat, setEtat] = (0, React.useState)(""),
    [fini, setFini] = (0, React.useState)(null),
    A = Number(t.prix) || 0,
    // v2.44 : plat du menu de la semaine → l'épicerie confirme ensuite la réservation par message
    menu = t.type === "menu",
    // v2.42 : au kilo → poids en grammes (100 g → 5 kg), prix = prix du kilo × poids
    kilo = auKilo(t),
    [grammes, setGrammes] = (0, React.useState)(Math.max(100, Math.min(500, s * 100))),
    totalEstime = kilo ? Math.round(A * grammes / 10) / 100 : Math.round(A * qte * 100) / 100;
  (0, React.useEffect)(() => {
    kilo
      ? s > 0 && grammes > s * 100 && (setGrammes(s * 100), setEtat("Il n'en reste plus que " + poidsTexte(s * 100) + " : poids ajusté."))
      : s > 0 && qte > s && (setQte(s), setEtat("Il n'en reste plus que " + s + " : quantité ajustée."));
  }, [s]);
  let S = async () => {
    if (!nom.trim() || !telValide(tel) || qte < 1 || etat === "envoi") return;
    if (kilo && grammes / 100 > s) {
      setGrammes(Math.max(100, s * 100)), setEtat("Il n'en reste plus que " + poidsTexte(s * 100) + " : poids ajusté.");
      return;
    }
    if (!kilo && qte > s) {
      setQte(Math.max(1, s)), setEtat("Il n'en reste plus que " + s + " : quantité ajustée.");
      return;
    }
    setEtat("envoi");
    let P = {
        numero: z9(),
        cree: Date.now(),
        statut: "reservee",
        item: String(t.id),
        // au kilo : qte = nombre de tranches de 100 g (pour le stock) ; le poids est aussi écrit dans le titre
        titre: kilo ? (String(t.titre).slice(0, 66) + " · " + poidsTexte(grammes)) : String(t.titre).slice(0, 80),
        qte: kilo ? Math.round(grammes / 100) : qte,
        prix: A,
        total: totalEstime,
        nom: nomPropre(nom).slice(0, 40),
        tel: telFormate(tel),
        retrait: String(t.retrait || "").slice(0, 60),
      },
      z = writeBatch(db),
      j = doc2(collection(db, "resas")),
      b = q2(j);
    z.set(j, P), z.update(doc2(db, "jour", String(t.id)), { reserves: increment(P.qte), derniereResa: b });
    let y = () => {
      rx(ts().filter((N) => N.ref !== b)), Cf(b);
    };
    rx([
      {
        ref: b,
        numero: P.numero,
        titre: P.titre,
        qte: P.qte,
        total: P.total,
        retrait: P.retrait,
        nom: P.nom,
        tel: P.tel,
        cree: P.cree,
        statut: "reservee",
        ...(menu ? { menu: !0 } : {}),
      },
      ...ts(),
    ]),
      ux("resa", b);
    let v = null,
      w = z.commit().catch((N) => {
        throw ((v = N), N);
      }),
      k = await sx(w);
    if (k === "erreur") {
      y(),
        setEtat(
          v?.code === "permission-denied"
            ? "Désolé, il n'en reste plus assez : quelqu'un a été plus rapide !"
            : "Réservation impossible. Vérifiez votre connexion et réessayez.",
        );
      return;
    }
    k === "ok" ? setTimeout(() => ns(e.cmd, "resa", b), 1200) : w.then(() => ns(e.cmd, "resa", b), y),
      setFini({ ...P, attente: k === "lent" }),
      onFait?.(),
      setTimeout(_c, 300),
      tn("reservations"),
      setEtat("");
  };
  return React.default.createElement(
    "div",
    { className: "sheet-fond", onClick: onClose },
    React.default.createElement(
      "div",
      {
        className: "sheet",
        onClick: (P) => P.stopPropagation(),
        role: "dialog",
        "aria-label": "Réserver " + t.titre,
      },
      fini
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("div", { className: "ok-rond" }, "✓"),
            React.default.createElement("h3", { className: "alerte-t" }, menu ? "Demande envoyée !" : "C'est réservé !"),
            React.default.createElement(
              "p",
              { className: "tr-txt" },
              React.default.createElement("b", null, libelleResa(fini)),
              menu ? " pour " : " mis de côté pour vous.",
              menu
                ? React.default.createElement("b", null, fini.retrait)
                : React.default.createElement(
                    React.default.Fragment,
                    null,
                    React.default.createElement("br", null),
                    "À retirer ",
                    React.default.createElement("b", null, fini.retrait || "à l'épicerie"),
                  ),
              menu &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  React.default.createElement("br", null),
                  "L'épicerie vous confirme très vite par message dans l'appli 💬",
                ),
              fini.total > 0 &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  React.default.createElement("br", null),
                  "À régler sur place : ",
                  ze(fini.total),
                ),
              React.default.createElement("br", null),
              React.default.createElement("small", null, "N° ", fini.numero),
            ),
            fini.attente &&
              React.default.createElement(
                "div",
                { className: "envoi-lent" },
                "📶 Connexion faible : la réservation partira dès que le réseau revient. Si l'article est parti entre-temps, elle disparaîtra de votre accueil.",
              ),
            React.default.createElement("button", { className: "btn", onClick: onClose }, "Merci !"),
          )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "div",
              { className: "sheet-hd" },
              t.photo && React.default.createElement("img", { src: t.photo, alt: "" }),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("h3", null, t.titre),
                React.default.createElement(
                  "span",
                  null,
                  A > 0 ? ze(A) + (t.unite ? " / " + t.unite : "") : "",
                  t.ancienPrix && Number(t.ancienPrix) > A ? " au lieu de " + ze(t.ancienPrix) : "",
                ),
              ),
            ),
            t.note &&
              React.default.createElement(
                "p",
                { className: "tr-txt", style: { marginTop: 10, textAlign: "left" } },
                t.note,
              ),
            React.default.createElement(
              "div",
              { className: "resa-info" },
              "🕒 À retirer ",
              React.default.createElement("b", null, t.retrait || "à l'épicerie"),
              parseInt(t.stock) < 999 ? " · " + (s > 0 ? "plus que " + dispoTexte(t) : "épuisé") : "",
            ),
            s > 0
              ? React.default.createElement(
                  React.default.Fragment,
                  null,
                  React.default.createElement(
                    "div",
                    { className: "lab", style: { textAlign: "center", marginTop: 12 } },
                    kilo ? "Poids souhaité" : "Quantité",
                  ),
                  kilo
                    ? React.default.createElement(
                        "div",
                        { className: "pas" },
                        React.default.createElement(
                          "button",
                          {
                            onClick: () => setGrammes(Math.max(100, grammes - 100)),
                            disabled: grammes <= 100,
                            "aria-label": "100 g de moins",
                          },
                          "−",
                        ),
                        React.default.createElement("input", {
                          type: "text",
                          value: poidsTexte(grammes),
                          readOnly: !0,
                          style: { width: 150, fontSize: 30 },
                          "aria-label": "Poids",
                        }),
                        React.default.createElement(
                          "button",
                          {
                            onClick: () => setGrammes(Math.min(5000, s * 100, grammes + 100)),
                            disabled: grammes >= Math.min(5000, s * 100),
                            "aria-label": "100 g de plus",
                          },
                          "+",
                        ),
                      )
                    : React.default.createElement(
                    "div",
                    { className: "pas" },
                    React.default.createElement(
                      "button",
                      {
                        onClick: () => setQte(Math.max(1, qte - 1)),
                        disabled: qte <= 1,
                        "aria-label": "Un de moins",
                      },
                      "−",
                    ),
                    React.default.createElement("input", {
                      type: "number",
                      value: qte,
                      readOnly: !0,
                      "aria-label": "Quantité",
                    }),
                    React.default.createElement(
                      "button",
                      {
                        onClick: () => setQte(Math.min(s, qte + 1)),
                        disabled: qte >= s,
                        "aria-label": "Un de plus",
                      },
                      "+",
                    ),
                  ),
                  kilo &&
                    React.default.createElement(
                      "div",
                      { style: { fontSize: 11.5, color: "var(--ink3)", textAlign: "center", marginTop: 4 } },
                      "Prix approximatif : le prix exact dépend de la pesée en boutique.",
                    ),
                  React.default.createElement(
                    "div",
                    { style: { display: "flex", gap: 8, marginTop: 6 } },
                    React.default.createElement("input", {
                      className: "inp",
                      value: nom,
                      maxLength: 40,
                      placeholder: "Prénom et nom",
                      onChange: (P) => setNom(P.target.value),
                    }),
                    React.default.createElement("input", {
                      className: "inp",
                      type: "tel",
                      value: tel,
                      maxLength: 20,
                      placeholder: "Téléphone",
                      onChange: (P) => setTel(P.target.value),
                    }),
                  ),
                  // v2.38 : nom et téléphone nécessaires pour que l'épicerie reconnaisse le client
                  (!nom.trim() || !telValide(tel)) &&
                    React.default.createElement(
                      "div",
                      { style: { fontSize: 11.5, color: "var(--ink3)", marginTop: 6 } },
                      "Votre nom et votre téléphone permettent à l'épicerie de savoir qui a réservé.",
                    ),
                  React.default.createElement(
                    "div",
                    { style: { marginTop: 10 } },
                    React.default.createElement(ConseilInstallCommande, {
                      inst,
                      quoi: "votre réservation",
                    }),
                  ),
                  etat && etat !== "envoi" && React.default.createElement("p", { className: "manque" }, etat),
                  React.default.createElement(
                    "button",
                    {
                      className: "btn",
                      style: { marginTop: 12, background: "var(--terra)" },
                      disabled: !nom.trim() || !telValide(tel) || etat === "envoi",
                      onClick: S,
                    },
                    etat === "envoi" ? "Réservation…" : "Je réserve" + (A > 0 ? " — " + (kilo ? "≈ " : "") + ze(totalEstime) : ""),
                  ),
                  React.default.createElement(
                    "p",
                    { className: "cal-info", style: { textAlign: "center" } },
                    menu
                      ? "Paiement sur place. L'épicerie vous confirme la réservation par message dans l'appli."
                      : "Paiement sur place. Pas venu à temps ? L'article est remis en vente.",
                  ),
                )
              : React.default.createElement(
                  "p",
                  { className: "manque", style: { textAlign: "center" } },
                  "Tout est parti, désolé ! Revenez demain 😉",
                ),
            React.default.createElement(
              "button",
              { className: "btn gh", style: { marginTop: 8 }, onClick: onClose },
              "Fermer",
            ),
          ),
    ),
  );
}
