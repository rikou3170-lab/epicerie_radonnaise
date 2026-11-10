/* ═══════════════════════════════════════════════════════════════════════
 *  ÉCRAN DE CAISSE — recherche du client, scan, tampons, cadeaux, roue de Noël.
 * ═══════════════════════════════════════════════════════════════════════ */

// v2.45 : derniers passages du client (historique de sa carte), affichés à la caisse dès le scan.
function HistoriqueCaisse({ id }) {
  let [l, setL] = (0, React.useState)(null);
  (0, React.useEffect)(
    () =>
      onSnapshot(
        collection(db, "clients", String(id), "historique"),
        (x) => setL(x.docs.map((y) => ({ ...y.data(), id: y.id })).sort((y, z) => (z.date || 0) - (y.date || 0))),
        () => setL([]),
      ),
    [id],
  );
  let pl = (n) => (n > 1 || n < -1 ? "s" : ""),
    texte = (h) => {
      let p = Number(h.points) || 0,
        tk = h.montant != null ? " · ticket " + eurosCaisse(h.montant) : "";
      return (
        {
          tampon: ["🍏", "+" + p + " tampon" + pl(p) + tk + (h.attente ? " (+" + h.attente + " en attente)" : "")],
          achat: ["🧾", "Pas de tampon" + tk],
          reprise: ["📇", "Reprise carte papier : +" + p + " tampon" + pl(p) + (h.attente ? " (+" + h.attente + " en attente)" : "")],
          recompense1: ["🎁", "Petit cadeau pris"],
          recompense: ["🎁🎁", "Grand cadeau pris"],
          parrainage: ["🤝", "Parrainage +" + p],
          bonus: ["🎁", "+" + p + " tampon" + pl(p) + " offert" + pl(p)],
          anniversaire: ["🎂", h.attente ? "Tampon d'anniversaire (en attente)" : "Tampon d'anniversaire"],
          annulation: ["↩\uFE0F", "Annulation (" + p + ")"],
          correction: ["✏\uFE0F", h.motif === "reste" ? "Cagnotte corrigée : " + eurosCaisse(h.reste) : "Correction (" + p + ")"],
        }[h.type] || ["•", h.type + (p ? " (" + p + ")" : "")]
      );
    };
  return React.default.createElement(
    "div",
    { className: "mt-histo" },
    React.default.createElement("div", { className: "mt-ht" }, "Derniers passages"),
    l === null
      ? React.default.createElement("div", { className: "mt-pied" }, "Chargement…")
      : l.length
        ? l.slice(0, 6).map((h) => {
            let [ic, tx] = texte(h),
              d = new Date(h.date || 0);
            return React.default.createElement(
              "div",
              { className: "mt-hl", key: h.id },
              React.default.createElement("span", null, ic),
              React.default.createElement("b", null, tx),
              React.default.createElement(
                "i",
                null,
                d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }) +
                  " · " +
                  d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }).replace(":", "h"),
              ),
            );
          })
        : React.default.createElement("div", { className: "mt-pied" }, "Aucun passage pour l'instant"),
  );
}

// Écran de caisse : client trouvé par scan ou recherche, tampons, cadeaux, roue de Noël.
function EcranCaisse({ user, clients, charge, fid, maj, script, roue }) {
  let a = MENTION_EXCLUSIONS(fid),
    [u, c] = (0, React.useState)("scan"),
    [d, f] = (0, React.useState)(1),
    [h, B] = (0, React.useState)(null),
    [_, b] = (0, React.useState)(""),
    [O, C] = (0, React.useState)(""),
    [m, g] = (0, React.useState)(!1),
    [k, T] = (0, React.useState)(0),
    [N, v] = (0, React.useState)(_k),
    [A, D] = (0, React.useState)(null),
    // v2.45 : montant du ticket tapé par Marion après le scan
    [mt, setMt] = (0, React.useState)(""),
    // v2.45 : reprise d'une carte papier (tampons et euros notés dessus)
    [rep, setRep] = (0, React.useState)(null),
    demanderMontant = (R) => {
      C(""), B({ c: R }), setMt(""), setRep(null), c("montant");
    },
    reprendrePapier = async (R) => {
      let n = Math.max(0, Math.min(a.nb, parseInt(rep?.t) || 0)),
        e = Math.max(0, Number(String(rep?.e || "").replace(",", ".")) || 0);
      if (!n && !e) return;
      if (
        !(await CC(
          "Ajouter " + (n ? n + " tampon" + (n > 1 ? "s" : "") : "") + (n && e ? " et " : "") + (e ? eurosCaisse(e) : "") +
            " de la carte papier sur la carte de " + R.nom + " ?",
        ))
      )
        return;
      g(!0);
      try {
        let te = R.tampons || 0,
          x = calculTampons(R.reste, e, trancheTampon(a)),
          tot = n + x.n,
          dir = Math.min(tot, Math.max(0, a.nb - te)),
          sur = tot - dir,
          X = writeBatch(db);
        X.update(doc2(db, "clients", String(R.id)), {
          tampons: increment(dir),
          reste: x.reste,
          ...(sur ? { bonusAttente: increment(sur) } : {}),
          derniere: new Date().toLocaleDateString("sv-SE"),
        }),
          X.set(doc2(collection(db, "clients", String(R.id), "historique")), {
            date: Date.now(),
            points: dir,
            type: "reprise",
            motif: "carte papier",
            papier: n,
            ...(e ? { montant: e } : {}),
            reste: x.reste,
            ...(sur ? { attente: sur } : {}),
            source: "caisse",
          }),
          await X.commit(),
          setRep(null),
          C(""),
          IconeTampon("tampon");
      } catch {
        C("Reprise non enregistrée : vérifiez la connexion.");
      }
      g(!1);
    },
    w = () => {
      let R = N === "user" ? "environment" : "user";
      v(R);
      try {
        localStorage.setItem(cv, R);
      } catch {}
      T((te) => te + 1);
    };
  (0, React.useEffect)(() => {
    let R = null,
      te = !1,
      q = async () => {
        try {
          !te &&
            document.visibilityState === "visible" &&
            navigator.wakeLock &&
            (R = await navigator.wakeLock.request("screen"));
        } catch {}
      };
    return (
      q(),
      document.addEventListener("visibilitychange", q),
      () => {
        (te = !0), document.removeEventListener("visibilitychange", q);
        try {
          R?.release();
        } catch {}
      }
    );
  }, []);
  let P = () => {
    B(null), C(""), f(1), c("scan"), T((R) => R + 1);
  };
  (0, React.useEffect)(() => {
    if (u !== "ok" && u !== "donne") return;
    let R = setTimeout(P, u === "ok" ? (h?.roue != null ? 5500 : 3500) : 4e3);
    return () => clearTimeout(R);
  }, [u, h]);
  let M = async (R, montant) => {
      let te = R.tampons || 0,
        q = Date.now(),
        // v2.45 : tampons gagnés = (reste gardé + montant) ÷ tranche ; ce qui dépasse le palier ou la carte
        // pleine passe en « tampons en attente » (ajoutés après le cadeau, comme les bonus)
        resteAvant = Number(R.reste) || 0,
        calc = calculTampons(resteAvant, montant, trancheTampon(a)),
        cap = a.palier && te < a.palier ? a.palier : a.nb,
        direct = Math.max(0, Math.min(calc.n, cap - te)),
        surplus = calc.n - direct;
      g(!0);
      if (!calc.n) {
        // pas encore de tampon : on garde seulement le reste en euros
        try {
          let X = writeBatch(db);
          X.update(doc2(db, "clients", String(R.id)), {
            reste: calc.reste,
            derniere: new Date().toLocaleDateString("sv-SE"),
          }),
            X.set(doc2(collection(db, "clients", String(R.id), "historique")), {
              date: q,
              points: 0,
              type: "achat",
              montant,
              reste: calc.reste,
              source: "caisse",
            }),
            await X.commit(),
            IconeTampon("tampon"),
            B({ c: R, avant: te, apres: te, n: 0, k: 0, montant, reste: calc.reste, resteAvant, dernierAvant: R.dernierTampon || 0 }),
            c("ok");
        } catch (X) {
          C(X?.code === "permission-denied" ? "Refusé : reconnectez-vous." : "Non enregistré : vérifiez la connexion."),
            T((ge) => ge + 1);
        }
        g(!1);
        return;
      }
      try {
        let X = writeBatch(db),
          ge = doc2(db, "clients", String(R.id)),
          J = {},
          ue = null,
          Pe = null;
        if (roue && tv(roue) && !R.roueNon) {
          let Je = $s(roue);
          (ue = nv()),
            (Pe = { g: ue, t: q }),
            (J.roueAJouer = [...(Array.isArray(R.roueAJouer) ? R.roueAJouer : []).slice(-29), Pe]),
            ue && ((J.roueG = Number(R.roueP) === Je.periode ? increment(1) : 1), (J.roueP = Je.periode));
        }
        let W = null,
          ce = 0;
        if (fid.parrainage !== !1 && R.parrain && !R.parrainFait) {
          let Je = clients.find(
            (lt) => (lt.code || "").toUpperCase() === String(R.parrain).toUpperCase() && lt.id !== R.id,
          );
          if (((J.parrainFait = !0), Je)) {
            ce = 1;
            let lt = _C(Je, a);
            X.update(
              doc2(db, "clients", String(Je.id)),
              lt ? { bonusAttente: increment(1) } : { tampons: increment(1) },
            ),
              X.set(doc2(collection(db, "clients", String(Je.id), "historique")), {
                date: q,
                points: lt ? 0 : 1,
                type: "parrainage",
                source: "caisse",
                ...(lt ? { attente: !0 } : {}),
                filleul: (R.prenom || String(R.nom || "").split(" ")[0] || "").slice(0, 40),
              }),
              (W = { id: Je.id, nom: Je.nom, att: lt });
          }
        }
        let he = Number(R.bonusAttente) || 0,
          rt = he + ce + surplus,
          Xe = surplus ? 0 : kC(te + direct - 1, rt, a);
        rt - Xe !== he && (J.bonusAttente = rt - Xe),
          X.update(ge, {
            tampons: increment(direct + Xe),
            reste: calc.reste,
            dernierTampon: q,
            derniere: new Date().toLocaleDateString("sv-SE"),
            ...J,
          }),
          X.set(doc2(collection(db, "clients", String(R.id), "historique")), {
            date: q,
            points: direct,
            type: "tampon",
            montant,
            reste: calc.reste,
            ...(surplus ? { attente: surplus } : {}),
            source: "caisse",
            ...(ue == null ? {} : { roue: ue }),
          }),
          Xe &&
            X.set(doc2(collection(db, "clients", String(R.id), "historique")), {
              date: q,
              points: Xe,
              type: ce && Xe ? "parrainage" : "bonus",
              source: "caisse",
              ...(ce ? { parrain: R.parrain } : {}),
            }),
          await X.commit();
        let Lt = te + direct + Xe;
        W && avertirMessage(script, W.id, "parrain"),
          avertirMessage(script, R.id, "tampon"),
          Lt >= a.nb
            ? avertirMessage(script, R.id, "plein")
            : a.palier && te < a.palier && Lt >= a.palier && avertirMessage(script, R.id, "palier"),
          IconeTampon(
            Lt >= a.nb ? "plein" : a.palier && te < a.palier && Lt >= a.palier ? "palier" : "tampon",
          ),
          B({
            c: R,
            avant: te,
            apres: Lt,
            n: direct + Xe,
            k: Xe,
            montant,
            reste: calc.reste,
            resteAvant,
            surplus,
            attenteAvant: he,
            attenteApres: rt - Xe,
            filleul: ce,
            roue: ue,
            tour: Pe,
            roueNouv: ue && Number(R.roueP) !== $s(roue).periode,
            parr: W,
            dernierAvant: R.dernierTampon || 0,
          }),
          c(Lt >= a.nb ? "cadeau" : a.palier && Lt === a.palier ? "palier" : "ok");
      } catch (X) {
        C(
          X?.code === "permission-denied"
            ? "Refusé : reconnectez-vous."
            : "Tampon non enregistré : vérifiez la connexion.",
        ),
          T((ge) => ge + 1);
      }
      g(!1);
    },
    I = (R) => {
      if (!charge) {
        C("Les cartes sont en cours de chargement, réessayez dans un instant."), T((X) => X + 1);
        return;
      }
      let te = clients.filter((X) => (X.code || "").toUpperCase() === R.toUpperCase().trim());
      if (!te.length) {
        IconeTampon("refus"), C("Aucune carte avec le code " + R.toUpperCase() + "."), T((X) => X + 1);
        return;
      }
      if (te.length > 1) {
        IconeTampon("refus"),
          C(
            "Ce code est en double (" +
              te.map((X) => X.nom).join(", ") +
              ") : à corriger dans l'administration.",
          ),
          T((X) => X + 1);
        return;
      }
      let q = te[0];
      if ((C(""), b(""), (q.tampons || 0) >= a.nb)) {
        B({ c: q, avant: q.tampons, apres: q.tampons, n: 0 }), c("cadeau");
        return;
      }
      if (a.delai && q.dernierTampon && Date.now() - q.dernierTampon < a.delai * 6e4) {
        IconeTampon("refus"),
          B({ c: q, min: Math.max(1, Math.round((Date.now() - q.dernierTampon) / 6e4)) }),
          c("deja");
        return;
      }
      if (a.palier && (q.tampons || 0) === a.palier) {
        IconeTampon("palier"), B({ c: q, avant: a.palier, apres: a.palier, n: 0 }), c("palier");
        return;
      }
      demanderMontant(q);
    },
    K = async () => {
      // v2.45a : on peut aussi annuler un passage sans tampon (il faut alors remettre la cagnotte d'avant)
      if ((h?.n || h?.montant != null) && !m) {
        g(!0);
        try {
          let R = writeBatch(db),
            te = Date.now(),
            q = h.c,
            X = { tampons: increment(-h.n), dernierTampon: h.dernierAvant || 0, reste: h.resteAvant || 0 };
          h.attenteApres !== h.attenteAvant && (X.bonusAttente = h.attenteAvant),
            h.tour && ((X.roueAJouer = q1(h.tour)), h.roue && (X.roueG = h.roueNouv ? 0 : increment(-1))),
            q.parrain && !q.parrainFait && (X.parrainFait = !1),
            R.update(doc2(db, "clients", String(q.id)), X),
            R.set(doc2(collection(db, "clients", String(q.id), "historique")), {
              date: te,
              points: -h.n,
              type: "annulation",
              source: "caisse",
            }),
            h.parr &&
              (R.update(
                doc2(db, "clients", String(h.parr.id)),
                h.parr.att ? { bonusAttente: increment(-1) } : { tampons: increment(-1) },
              ),
              R.set(doc2(collection(db, "clients", String(h.parr.id), "historique")), {
                date: te,
                points: h.parr.att ? 0 : -1,
                type: "annulation",
                source: "caisse",
                motif: "parrainage",
              })),
            await R.commit(),
            P();
        } catch {
          C("Annulation impossible : vérifiez la connexion.");
        }
        g(!1);
      }
    },
    Q = async (R) => {
      if (m) return;
      g(!0);
      let te = Math.max(0, h.apres || 0),
        q = clients.find((J) => J.id === h.c.id) || h.c,
        X = Number(q.bonusAttente) || 0,
        ge = Math.min(X, (a.palier || a.nb) - 1);
      try {
        let J = writeBatch(db),
          ue = Date.now(),
          Pe = doc2(db, "clients", String(h.c.id));
        J.update(Pe, {
          tampons: increment(ge - te),
          cadeaux: increment(1),
          derniere: new Date().toLocaleDateString("sv-SE"),
          ...(ge ? { bonusAttente: X - ge } : {}),
        }),
          J.set(doc2(collection(db, "clients", String(h.c.id), "historique")), {
            date: ue,
            points: -te,
            type: R ? "recompense1" : "recompense",
            source: "caisse",
          }),
          ge &&
            J.set(doc2(collection(db, "clients", String(h.c.id), "historique")), {
              date: ue - 1,
              points: ge,
              type: "bonus",
              source: "caisse",
            }),
          await J.commit(),
          avertirMessage(script, h.c.id, R ? "pris1" : "pris2");
        let W = Kx(q).niv,
          ce = Kx({ cadeaux: (Number(q.cadeaux) || 0) + 1 }).niv;
        B({ ...h, apres: ge, palier: R, k: ge, monte: ce && ce !== W ? ce : null }), c("donne");
      } catch {
        C("Non enregistré : vérifiez la connexion et réessayez.");
      }
      g(!1);
    },
    le = h?.c && (clients.find((R) => R.id === h.c.id) || h.c);
  return React.default.createElement(
    React.default.Fragment,
    null,
    u === "scan" &&
      React.default.createElement(
        "div",
        { className: "cs-main tab2" },
        React.default.createElement(
          "div",
          { className: "col-cam" },
          React.default.createElement("div", { className: "titre" }, "Tamponner la carte"),
          React.default.createElement(
            "div",
            { className: "sous" },
            "Le client présente son QR code (onglet Fidélité de son appli). Pas de téléphone ? Cherchez son nom.",
          ),
          React.default.createElement(Scanner, { key: k, onCode: I, cam: N }),
          React.default.createElement(
            "div",
            { className: "outils-cam" },
            React.default.createElement(
              "button",
              { className: "lien", onClick: w },
              "🔄 ",
              N === "user" ? "Utiliser la caméra arrière" : "Utiliser la caméra avant",
            ),
            React.default.createElement(Ik, null),
          ),
        ),
        React.default.createElement(
          "div",
          { className: "col-cmd" },
          React.default.createElement(
            "div",
            { className: "cherche-t" },
            "🔎 Pas de QR code ? Chercher le client",
          ),
          React.default.createElement(
            "div",
            { className: "saisie" },
            React.default.createElement("input", {
              className: "inp nom",
              type: "search",
              enterKeyHint: "search",
              placeholder: "Tapez son nom ou son téléphone…",
              value: _,
              maxLength: 40,
              onChange: (R) => b(R.target.value),
              onKeyDown: (R) =>
                R.key === "Enter" &&
                /^(RAD-?)?[A-Z0-9]{5}$/i.test(_.trim()) &&
                I(
                  "RAD-" +
                    _.trim()
                      .toUpperCase()
                      .replace(/^RAD-?/, ""),
                ),
              "aria-label": "Chercher une carte",
            }),
            /^(RAD-?)?[A-Z0-9]{5}$/i.test(_.trim()) &&
              React.default.createElement(
                "button",
                {
                  className: "btn",
                  onClick: () =>
                    I(
                      "RAD-" +
                        _.trim()
                          .toUpperCase()
                          .replace(/^RAD-?/, ""),
                    ),
                },
                "OK",
              ),
          ),
          _.trim().length >= 2 &&
            (() => {
              let R = PE(_.trim()),
                te = _.replace(/\D/g, ""),
                q = clients
                  .filter(
                    (X) =>
                      PE(X.nom).includes(R) ||
                      (te.length >= 3 &&
                        String(X.tel || "")
                          .replace(/\D/g, "")
                          .includes(te)) ||
                      PE(X.code).includes(R),
                  )
                  .slice(0, 8);
              return React.default.createElement(
                "div",
                { className: "resultats" },
                q.length
                  ? q.map((X) =>
                      React.default.createElement(
                        "div",
                        { key: X.id, className: "res-l" },
                        React.default.createElement(
                          "button",
                          { onClick: () => I(X.code) },
                          React.default.createElement("b", null, X.nom),
                          React.default.createElement("span", null, X.tel ? X.tel + " · " : "", X.code),
                          React.default.createElement("i", null, X.tampons || 0, "/", a.nb),
                        ),
                        React.default.createElement(
                          "button",
                          { className: "res-f", onClick: () => D(X), "aria-label": "Fiche de " + X.nom },
                          "✏\uFE0F",
                        ),
                      ),
                    )
                  : React.default.createElement("div", { className: "vide" }, "Aucune carte trouvée"),
              );
            })(),
          O && React.default.createElement("div", { className: "err" }, O),
          !fid.active &&
            React.default.createElement(
              "div",
              { className: "err" },
              "Le programme de fidélité est désactivé dans l'administration (les clients voient « bientôt »).",
            ),
          roue &&
            React.default.createElement(
              "button",
              { className: "btn gh", style: { marginTop: 12 }, onClick: () => c("tirage") },
              "🎄 Tirage au sort de Noël (",
              SE(clients, roue).reduce((R, te) => R + te.tickets, 0),
              " tickets)",
            ),
          React.default.createElement(
            "div",
            { className: "regle" },
            wC(fid),
            a.exclus
              ? React.default.createElement(
                  React.default.Fragment,
                  null,
                  React.default.createElement("br", null),
                  "Hors ",
                  a.exclus,
                  ".",
                )
              : "",
          ),
          React.default.createElement(
            "div",
            { className: "compte" },
            "Connecté : ",
            user.email,
            " · ",
            clients.length,
            " carte",
            clients.length > 1 ? "s" : "",
          ),
        ),
      ),
    A &&
      React.default.createElement(FicheClient, {
        c: clients.find((R) => R.id === A.id) || A,
        t: a,
        onClose: () => D(null),
        onTamponner: (R) => {
          D(null), I(R.code);
        },
      }),
    // v2.45 : montant du ticket → tampons calculés en direct, reste gardé
    u === "montant" &&
      h &&
      (() => {
        let R = le || h.c,
          v = Number(String(mt).replace(",", ".")),
          ok = mt !== "" && isFinite(v) && v > 0 && v <= 2e3,
          x = ok ? calculTampons(R.reste, v, trancheTampon(a)) : null,
          valider = async () => {
            if (!ok || m) return;
            if (v > 100 && !(await CC("Confirmer un ticket de " + eurosCaisse(v) + " ?", { ok: "Oui, " + eurosCaisse(v) })))
              return;
            M(R, Math.round(v * 100) / 100);
          };
        return React.default.createElement(
          "div",
          { className: "cs-main" },
          React.default.createElement(
            "div",
            { className: "ok montant-caisse" },
            // v2.45 : où en est le client, d'un coup d'œil
            (() => {
              let te = R.tampons || 0,
                tr = trancheTampon(a),
                rs = Number(R.reste) || 0,
                euros = (k) => eurosCaisse(Math.max(0, k * tr - rs)),
                lignes = [];
              a.palier && te < a.palier &&
                lignes.push(["🎁", a.recompense1 + " au " + a.palier + "e", "encore " + (a.palier - te) + " tampon" + (a.palier - te > 1 ? "s" : "") + " · " + euros(a.palier - te) + " d'achats"]);
              a.palier && te === a.palier && lignes.push(["🎁", a.recompense1, "disponible (ou il continue)"]);
              te < a.nb
                ? lignes.push(["🎁🎁", a.recompense + " au " + a.nb + "e", "encore " + (a.nb - te) + " tampons · " + euros(a.nb - te) + " d'achats"])
                : lignes.push(["🎁🎁", a.recompense, "carte complète"]);
              return React.default.createElement(
                "div",
                { className: "mt-suivi" },
                React.default.createElement("div", { className: "mt-nom" }, R.nom),
                React.default.createElement(
                  "div",
                  { className: "mt-chiffres" },
                  React.default.createElement(
                    "div",
                    null,
                    React.default.createElement("b", null, te, " / ", a.nb),
                    React.default.createElement("span", null, "tampons"),
                  ),
                  React.default.createElement(
                    "div",
                    null,
                    React.default.createElement("b", null, eurosCaisse(rs)),
                    React.default.createElement("span", null, "cagnotte · plus que ", eurosCaisse(tr - rs), " pour 1 tampon"),
                  ),
                ),
                React.default.createElement(sv, { n: te, nb: a.nb, palier: a.palier }),
                lignes.map((l) =>
                  React.default.createElement(
                    "div",
                    { className: "mt-ligne", key: l[1] },
                    React.default.createElement("span", null, l[0]),
                    React.default.createElement("b", null, l[1]),
                    React.default.createElement("i", null, l[2]),
                  ),
                ),
                Number(R.bonusAttente) > 0 &&
                  React.default.createElement(
                    "div",
                    { className: "mt-ligne" },
                    React.default.createElement("span", null, "⏳"),
                    React.default.createElement("b", null, R.bonusAttente, " tampon", R.bonusAttente > 1 ? "s" : "", " en attente"),
                    React.default.createElement("i", null, "ajoutés après le cadeau"),
                  ),
                React.default.createElement(HistoriqueCaisse, { id: R.id }),
                React.default.createElement(
                  "div",
                  { className: "mt-pied" },
                  R.code,
                  R.derniere ? " · dernier passage le " + new Date(R.derniere + "T12:00").toLocaleDateString("fr-FR") : " · premier passage",
                ),
              );
            })(),
            React.default.createElement("div", { className: "plus", style: { fontSize: 24, marginTop: 16 } }, "Montant du ticket"),
            React.default.createElement("input", {
              className: "inp mt-saisie",
              inputMode: "decimal",
              enterKeyHint: "done",
              autoFocus: !0,
              placeholder: "0,00",
              value: mt,
              maxLength: 8,
              "aria-label": "Montant du ticket en euros",
              onChange: (te) => setMt(te.target.value.replace(/[^0-9.,]/g, "").replace(/([.,].{0,2}).*$/, "$1")),
              onKeyDown: (te) => te.key === "Enter" && valider(),
            }),
            React.default.createElement(
              "div",
              { className: "mt-calc" },
              x
                ? x.n
                  ? (() => {
                      // même calcul que l'enregistrement : au-delà du 10e (ou de la carte pleine), le reste attend le cadeau
                      let te = R.tampons || 0,
                        cap = a.palier && te < a.palier ? a.palier : a.nb,
                        dir = Math.max(0, Math.min(x.n, cap - te)),
                        sur = x.n - dir;
                      return (
                        "→ +" + dir + " tampon" + (dir > 1 ? "s" : "") +
                        (sur ? " (+" + sur + " après le cadeau)" : "") +
                        (x.reste > 0 ? " · " + eurosCaisse(x.reste) + " gardés pour la prochaine fois" : "")
                      );
                    })()
                  : "→ Pas encore de tampon · " + eurosCaisse(x.reste) + " gardés"
                : "1 tampon par tranche de " + trancheTampon(a) + " €",
            ),
            O && React.default.createElement("div", { className: "err" }, O),
            React.default.createElement(
              "div",
              { className: "actions", style: { marginTop: 18 } },
              React.default.createElement("button", { className: "btn gh", disabled: m, onClick: P }, "Annuler"),
              React.default.createElement(
                "button",
                { className: "btn", disabled: !ok || m, onClick: valider },
                m ? "…" : "Valider",
              ),
            ),
            // v2.45 : un client passe de la carte papier à l'appli → Marion reporte ses tampons
            rep
              ? React.default.createElement(
                  "div",
                  { className: "mt-reprise" },
                  React.default.createElement("div", { className: "mt-rt" }, "📇 Reprendre sa carte papier"),
                  React.default.createElement(
                    "div",
                    { className: "mt-rc" },
                    React.default.createElement(
                      "label",
                      null,
                      "Tampons sur la carte papier",
                      React.default.createElement("input", {
                        className: "inp",
                        inputMode: "numeric",
                        placeholder: "0",
                        value: rep.t,
                        maxLength: 2,
                        onChange: (te) => setRep({ ...rep, t: te.target.value.replace(/[^0-9]/g, "") }),
                      }),
                    ),
                    React.default.createElement(
                      "label",
                      null,
                      "Euros notés en plus (facultatif)",
                      React.default.createElement("input", {
                        className: "inp",
                        inputMode: "decimal",
                        placeholder: "0,00",
                        value: rep.e,
                        maxLength: 6,
                        onChange: (te) => setRep({ ...rep, e: te.target.value.replace(/[^0-9.,]/g, "") }),
                      }),
                    ),
                  ),
                  React.default.createElement(
                    "div",
                    { className: "actions", style: { marginTop: 10 } },
                    React.default.createElement("button", { className: "btn gh", disabled: m, onClick: () => setRep(null) }, "Fermer"),
                    React.default.createElement(
                      "button",
                      { className: "btn terra", disabled: m || (!parseInt(rep.t) && !Number(String(rep.e).replace(",", "."))), onClick: () => reprendrePapier(R) },
                      "Ajouter à sa carte",
                    ),
                  ),
                  React.default.createElement(
                    "div",
                    { className: "mt-pied" },
                    "Les tampons s'ajoutent à ceux de l'appli. Pensez ensuite à récupérer la carte papier.",
                  ),
                )
              : React.default.createElement(
                  "button",
                  { className: "lien", style: { marginTop: 14 }, onClick: () => setRep({ t: "", e: "" }) },
                  "📇 Il a une carte papier ? Reprendre ses tampons",
                ),
          ),
        );
      })(),
    u === "ok" &&
      h &&
      React.default.createElement(
        "div",
        { className: "cs-main" },
        React.default.createElement(
          "div",
          { className: "ok" },
          React.default.createElement("div", { className: "rond" }, "✓"),
          h.n
            ? React.default.createElement("div", { className: "plus" }, "+", h.n, " tampon", h.n > 1 ? "s" : "")
            : React.default.createElement("div", { className: "plus", style: { fontSize: 30 } }, "Pas encore de tampon"),
          // v2.45 : montant du ticket et reste gardé
          h.montant != null &&
            React.default.createElement(
              "div",
              { className: "mt-calc" },
              "Ticket de " + eurosCaisse(h.montant),
              h.reste > 0 ? " · " + eurosCaisse(h.reste) + " gardés pour la prochaine fois" : "",
              h.surplus ? " · " + h.surplus + " tampon" + (h.surplus > 1 ? "s" : "") + " mis de côté pour après le cadeau" : "",
            ),
          React.default.createElement(
            "div",
            { className: "tot" },
            h.c.nom,
            React.default.createElement(Sk, { c: le }),
            React.default.createElement("br", null),
            React.default.createElement("b", null, h.apres, " / ", a.nb),
          ),
          React.default.createElement(sv, { n: h.apres, nb: a.nb, palier: a.palier }),
          React.default.createElement(MENTION_PARRAINAGE, { r: h }),
          React.default.createElement(NE, { g: h.roue }),
          React.default.createElement(
            "div",
            { className: "actions", style: { marginTop: 22 } },
            React.default.createElement(
              "button",
              { className: "btn gh", disabled: m, onClick: K },
              "Annuler",
            ),
            React.default.createElement("button", { className: "btn", onClick: P }, "Client suivant"),
          ),
          React.default.createElement(
            "button",
            { className: "lien", onClick: () => D(h.c) },
            "✏\uFE0F Voir / corriger la fiche de ",
            h.c.nom,
          ),
          React.default.createElement(
            "div",
            { className: "compte" },
            "Retour automatique dans ",
            h.roue != null ? 5 : 3,
            " secondes",
          ),
        ),
      ),
    u === "deja" &&
      h &&
      React.default.createElement(
        "div",
        { className: "cs-main" },
        React.default.createElement(
          "div",
          { className: "ok" },
          React.default.createElement(
            "div",
            { className: "rond", style: { background: "var(--gold)" } },
            "!",
          ),
          React.default.createElement(
            "div",
            { className: "plus", style: { color: "var(--gold)", fontSize: 30 } },
            "Déjà tamponnée",
          ),
          React.default.createElement(
            "div",
            { className: "tot" },
            h.c.nom,
            " a eu un tampon il y a ",
            h.min,
            " min.",
          ),
          React.default.createElement(
            "div",
            { className: "actions", style: { marginTop: 22 } },
            React.default.createElement("button", { className: "btn gh", onClick: P }, "Retour"),
            React.default.createElement(
              "button",
              { className: "btn", disabled: m, onClick: () => demanderMontant(le) },
              "Tamponner quand même",
            ),
          ),
        ),
      ),
    u === "tirage" &&
      React.default.createElement(JournalCaisse, {
        clients,
        roue,
        script,
        onClose: P,
      }),
    u === "cadeau" &&
      h &&
      React.default.createElement(
        "div",
        { className: "cs-main" },
        React.default.createElement(
          "div",
          { className: "ok" },
          React.default.createElement(
            "div",
            { className: "rond", style: { background: "var(--terra)" } },
            "🎁",
          ),
          React.default.createElement(
            "div",
            { className: "plus", style: { color: "var(--terra)", fontSize: 32 } },
            "Carte complète !",
          ),
          React.default.createElement(
            "div",
            { className: "tot" },
            h.c.nom,
            h.n ? " · +" + h.n + " tampon" + (h.n > 1 ? "s" : "") : "",
          ),
          React.default.createElement(
            "div",
            { className: "cadeau" },
            "🎁🎁 ",
            a.recompense[0].toUpperCase() + a.recompense.slice(1),
            " pour ",
            h.c.nom,
          ),
          React.default.createElement(NE, { g: h.roue }),
          O && React.default.createElement("div", { className: "err" }, O),
          React.default.createElement(
            "button",
            { className: "btn terra", style: { marginTop: 16 }, disabled: m, onClick: () => Q(!1) },
            "✓ Cadeau donné : carte remise à zéro",
          ),
          React.default.createElement(
            "button",
            { className: "btn gh", style: { marginTop: 8 }, onClick: P },
            "Plus tard (la carte reste pleine)",
          ),
        ),
      ),
    u === "palier" &&
      h &&
      React.default.createElement(
        "div",
        { className: "cs-main" },
        React.default.createElement(
          "div",
          { className: "ok" },
          React.default.createElement(
            "div",
            { className: "rond", style: { background: "var(--terra)" } },
            "🎁",
          ),
          React.default.createElement(
            "div",
            { className: "plus", style: { color: "var(--terra)", fontSize: 30 } },
            h.avant < a.palier ? "Cadeau débloqué !" : "Cadeau disponible",
          ),
          React.default.createElement(
            "div",
            { className: "tot" },
            h.c.nom,
            " · ",
            React.default.createElement("b", null, h.apres, " / ", a.nb),
            h.n ? " (+" + h.n + ")" : "",
          ),
          React.default.createElement(sv, { n: h.apres, nb: a.nb, palier: a.palier }),
          React.default.createElement(MENTION_PARRAINAGE, { r: h }),
          React.default.createElement(NE, { g: h.roue }),
          (() => {
            let R = clients.find((q) => q.id === h.c.id) || h.c,
              te = R.choix && (R.choixLe || 0) > (R.dernierTampon || 0) ? R.choix : "";
            return te === "cadeau"
              ? React.default.createElement(
                  "div",
                  { className: "cadeau", style: { fontSize: 17 } },
                  "📱 Dans l'appli, le client a choisi : ",
                  React.default.createElement("b", null, "son cadeau"),
                  " (",
                  a.recompense1,
                  ")",
                )
              : te === "continue"
                ? React.default.createElement(
                    "div",
                    { className: "cadeau", style: { fontSize: 17 } },
                    "📱 Dans l'appli, le client a choisi : ",
                    React.default.createElement("b", null, "de continuer"),
                    " jusqu'à ",
                    a.nb,
                  )
                : React.default.createElement(
                    "div",
                    { className: "cadeau" },
                    "Demandez au client : ",
                    a.recompense1,
                    " maintenant, ou on continue jusqu'à ",
                    a.nb,
                    " pour ",
                    a.recompense,
                    " ?",
                  );
          })(),
          O && React.default.createElement("div", { className: "err" }, O),
          React.default.createElement(
            "button",
            { className: "btn terra", style: { marginTop: 14 }, disabled: m, onClick: () => Q(!0) },
            "🎁 Il prend son cadeau (carte à zéro)",
          ),
          React.default.createElement(
            "button",
            { className: "btn", style: { marginTop: 8 }, disabled: m, onClick: () => (h.n ? P() : demanderMontant(h.c)) },
            "➜ Il continue vers le chouette cadeau",
          ),
          h.n > 0 &&
            React.default.createElement(
              "button",
              { className: "lien", disabled: m, onClick: K },
              "Annuler ce tampon",
            ),
        ),
      ),
    u === "donne" &&
      h &&
      React.default.createElement(
        "div",
        { className: "cs-main" },
        React.default.createElement(
          "div",
          { className: "ok" },
          React.default.createElement("div", { className: "rond" }, "✓"),
          React.default.createElement(
            "div",
            { className: "plus", style: { fontSize: 30 } },
            "Récompense donnée",
          ),
          h.monte &&
            React.default.createElement(
              "div",
              { className: "cadeau", style: { fontSize: 18 } },
              "🎉 ",
              h.c.nom,
              " devient ",
              React.default.createElement("b", null, h.monte.ico, " ", h.monte.nom),
              " !",
            ),
          React.default.createElement(
            "div",
            { className: "tot" },
            h.c.nom,
            " repart avec une carte neuve",
            h.k
              ? React.default.createElement(
                  React.default.Fragment,
                  null,
                  React.default.createElement("br", null),
                  "+ ",
                  h.k,
                  " tampon",
                  h.k > 1 ? "s" : "",
                  " offert",
                  h.k > 1 ? "s" : "",
                  " déjà dessus 🎂",
                )
              : ".",
          ),
          React.default.createElement(
            "button",
            { className: "btn", style: { marginTop: 22 }, onClick: P },
            "Client suivant",
          ),
        ),
      ),
    React.default.createElement(BandeauMaj, { dispo: maj }),
  );
}
