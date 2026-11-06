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

// Réservations du client, suivies en direct.
function useMesResas(t) {
  let [liste, setListe] = (0, React.useState)(ts),
    [live, setLive] = (0, React.useState)({});
  (0, React.useEffect)(() => {
    setListe(ts());
  }, [t]);
  let o = liste.filter((s) => s.ref && Date.now() - (s.cree || 0) < 4 * 864e5).map((s) => s.ref);
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
      .map((s) => (live[s.ref] ? { ...s, statut: live[s.ref].statut, conv: live[s.ref].conv || "" } : s))
  );
}

// Réservations en cours.
function MesResas({ resas }) {
  let e = resas.filter((n) => n.statut === "reservee");
  return e.length
    ? e.map((n) =>
        React.default.createElement(
          "div",
          { className: "resa-suivi", key: n.numero },
          React.default.createElement("div", { className: "rs-ic" }, "🧺"),
          React.default.createElement(
            "div",
            { style: { minWidth: 0 } },
            React.default.createElement("b", null, "Réservé : ", n.qte, " × ", n.titre),
            React.default.createElement(
              "div",
              null,
              "À retirer ",
              n.retrait || "à l'épicerie",
              " · N° ",
              n.numero,
              n.total > 0 ? " · " + ze(n.total) : "",
            ),
          ),
        ),
      )
    : null;
}

// Réserver un produit anti-gaspi.
function Reserver({ i: t, d: e, prenom, onClose, onFait, inst }) {
  let s = Math.min(10, Ro(t)),
    [qte, setQte] = (0, React.useState)(1),
    d = ts()[0] || {},
    [nom, setNom] = (0, React.useState)(prenom || d.nom || ""),
    [tel, setTel] = (0, React.useState)(d.tel || ""),
    [etat, setEtat] = (0, React.useState)(""),
    [fini, setFini] = (0, React.useState)(null),
    A = Number(t.prix) || 0;
  (0, React.useEffect)(() => {
    s > 0 && qte > s && (setQte(s), setEtat("Il n'en reste plus que " + s + " : quantité ajustée."));
  }, [s]);
  let S = async () => {
    if (!nom.trim() || qte < 1 || etat === "envoi") return;
    if (qte > s) {
      setQte(Math.max(1, s)), setEtat("Il n'en reste plus que " + s + " : quantité ajustée.");
      return;
    }
    setEtat("envoi");
    let P = {
        numero: z9(),
        cree: Date.now(),
        statut: "reservee",
        item: String(t.id),
        titre: String(t.titre).slice(0, 80),
        qte,
        prix: A,
        total: Math.round(A * qte * 100) / 100,
        nom: nom.trim().slice(0, 40),
        tel: tel.trim().slice(0, 20),
        retrait: String(t.retrait || "").slice(0, 60),
      },
      z = writeBatch(db),
      j = doc2(collection(db, "resas")),
      b = q2(j);
    z.set(j, P), z.update(doc2(db, "jour", String(t.id)), { reserves: increment(qte), derniereResa: b });
    let y = () => {
      rx(ts().filter((N) => N.ref !== b)), Cf(b);
    };
    rx([
      {
        ref: b,
        numero: P.numero,
        titre: P.titre,
        qte,
        total: P.total,
        retrait: P.retrait,
        nom: P.nom,
        tel: P.tel,
        cree: P.cree,
        statut: "reservee",
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
            React.default.createElement("h3", { className: "alerte-t" }, "C'est réservé !"),
            React.default.createElement(
              "p",
              { className: "tr-txt" },
              React.default.createElement("b", null, fini.qte, " × ", fini.titre),
              " mis de côté pour vous.",
              React.default.createElement("br", null),
              "À retirer ",
              React.default.createElement("b", null, fini.retrait || "à l'épicerie"),
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
              parseInt(t.stock) < 999 ? " · " + (s > 0 ? "plus que " + Ro(t) : "épuisé") : "",
            ),
            s > 0
              ? React.default.createElement(
                  React.default.Fragment,
                  null,
                  React.default.createElement(
                    "div",
                    { className: "lab", style: { textAlign: "center", marginTop: 12 } },
                    "Quantité",
                  ),
                  React.default.createElement(
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
                  React.default.createElement(
                    "div",
                    { style: { display: "flex", gap: 8, marginTop: 6 } },
                    React.default.createElement("input", {
                      className: "inp",
                      value: nom,
                      maxLength: 40,
                      placeholder: "Votre nom",
                      onChange: (P) => setNom(P.target.value),
                    }),
                    React.default.createElement("input", {
                      className: "inp",
                      type: "tel",
                      value: tel,
                      maxLength: 20,
                      placeholder: "Tél. (facultatif)",
                      onChange: (P) => setTel(P.target.value),
                    }),
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
                      disabled: !nom.trim() || etat === "envoi",
                      onClick: S,
                    },
                    etat === "envoi" ? "Réservation…" : "Je réserve" + (A > 0 ? " — " + ze(A * qte) : ""),
                  ),
                  React.default.createElement(
                    "p",
                    { className: "cal-info", style: { textAlign: "center" } },
                    "Paiement sur place. Pas venu à temps ? L'article est remis en vente.",
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
