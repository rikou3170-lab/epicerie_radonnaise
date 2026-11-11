/* ═══════════════════════════════════════════════════════════════════════
 *  APPLI — écran principal : navigation entre les onglets, fenêtres, démarrage.
 * ═══════════════════════════════════════════════════════════════════════ */

// v2.44f : la caisse rend aussi les plats du menu de la semaine réservables (comme l'admin), pour qu'ils
// le soient chaque jour même si personne n'ouvre l'admin. Même fonction que dans l'admin (33-reservations.js).
// Crée / met à jour / retire les articles « menu » d'après le menu de la semaine (jours à venir seulement).
// N'écrit que ce qui a changé ; le compteur de réservations n'est jamais touché.
// v2.45e : pas de plat réservable un jour de fermeture exceptionnelle.
async function synchroPlatsMenu(menu, existants, fermetures) {
  let auj = new Date().toLocaleDateString("sv-SE"),
    voulus = new Map();
  if (menu && menu.actif !== !1 && menu.du && menu.au && Array.isArray(menu.jours)) {
    let base = new Date(menu.du + "T12:00"),
      jd = (base.getDay() + 6) % 7;
    menu.jours.forEach((j) => {
      let plat = String(j?.plat || "")
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean)[0];
      if (!plat) return;
      let d = new Date(base);
      d.setDate(d.getDate() + (j.j - jd));
      let date = d.toLocaleDateString("sv-SE");
      if (date < auj || date > menu.au) return;
      if ((Array.isArray(fermetures) ? fermetures : []).some((f) => f?.du && date >= f.du && date <= (f.au || f.du))) return;
      voulus.set("menu" + date.replace(/-/g, ""), {
        type: "menu",
        active: !1, // caché pour les anciennes versions de l'appli client
        titre: plat.slice(0, 60) + " (plat du jour)",
        prix: Number(j.prix) || 0,
        stock: 999,
        retrait: d
          .toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
          .replace(/ 1 /, " 1er ")
          .slice(0, 60),
        date,
      });
    });
  }
  let b = writeBatch(db),
    n = 0;
  voulus.forEach((v, id) => {
    let e = existants.find((x) => x.id === id);
    (!e || Object.keys(v).some((k) => e[k] !== v[k])) &&
      (b.set(doc2(db, "jour", id), e ? v : { ...v, reserves: 0, cree: Date.now() }, { merge: !0 }), n++);
  });
  existants.forEach((e) => {
    voulus.has(e.id) || (b.delete(doc2(db, "jour", e.id)), n++);
  });
  n && (await b.commit());
}

// Suit le menu de la semaine et les plats réservables ; met à jour dès que l'un des deux change.
function usePlatsMenu(actif) {
  let [menu, setMenu] = (0, React.useState)(void 0),
    [plats, setPlats] = (0, React.useState)(null);
  (0, React.useEffect)(() => {
    if (!actif) return;
    // réglages lus sur le serveur seulement (jamais une copie locale incomplète, qui ferait tout retirer)
    let a = onSnapshot(
        CONFIG_REF,
        { includeMetadataChanges: !0 },
        (x) => x.metadata.fromCache || setMenu(x.exists() ? { m: x.data().menu || null, f: x.data().fermetures || [] } : { m: null, f: [] }),
        () => {},
      ),
      b = onSnapshot(
        collection(db, "jour"),
        (x) => setPlats(x.docs.map((y) => ({ ...y.data(), id: y.id })).filter((y) => y.type === "menu")),
        () => {},
      );
    return () => {
      a(), b();
    };
  }, [actif]);
  (0, React.useEffect)(() => {
    menu === void 0 || plats === null || synchroPlatsMenu(menu.m, plats, menu.f).catch((x) => console.warn("plats du menu", x));
  }, [JSON.stringify(menu || null), JSON.stringify(plats)]);
}

// La caisse : connexion, écran de caisse, journal.
function Caisse({ user }) {
  let [e, n] = (0, React.useState)([]),
    [r, i] = (0, React.useState)(!1),
    [o, s] = (0, React.useState)(null),
    [a, u] = (0, React.useState)({
      parEuro: 1,
      paliers: [],
      active: !0,
      remise: { active: !0, points: 200, euros: 5 },
    }),
    [c, d] = (0, React.useState)("scan"),
    [f, h] = (0, React.useState)(null),
    [B, _] = (0, React.useState)(""),
    [b, O] = (0, React.useState)(""),
    [C, m] = (0, React.useState)(""),
    [g, k] = (0, React.useState)(!1),
    [T, N] = (0, React.useState)(null),
    [v, A] = (0, React.useState)(0),
    [D, w] = (0, React.useState)(""),
    P = useMiseAJour();
  usePlatsMenu(!!user);
  (0, React.useEffect)(() => {
    let W = onSnapshot(
        collection(db, "clients"),
        (he) => {
          n(he.docs.map((rt) => ({ ...rt.data(), id: rt.id }))), i(!0);
        },
        (he) => O("Lecture des clients impossible (" + (he?.code || "erreur") + ")."),
      ),
      ce = onSnapshot(
        CONFIG_REF,
        (he) => {
          he.exists() &&
            (u((rt) => ({ ...rt, ...(he.data().fidelite || {}) })),
            s(he.data().roue || null),
            w(IC(he.data().cmd).script));
        },
        () => {},
      );
    return () => {
      W(), ce();
    };
  }, []);
  let M = Math.max(1, Number(a.parEuro) || 1),
    I = async () => {
      let W = js(a);
      if (!(!W || g || (K.points || 0) < W.points)) {
        k(!0);
        try {
          let ce = writeBatch(db);
          ce.update(doc2(db, "clients", String(K.id)), {
            points: increment(-W.points),
            derniere: new Date().toLocaleDateString("sv-SE"),
          }),
            ce.set(doc2(collection(db, "clients", String(K.id), "historique")), {
              date: Date.now(),
              points: -W.points,
              type: "remise",
              remise: W.euros,
              source: "caisse",
            }),
            await ce.commit(),
            N({
              remise: !0,
              nom: K.nom,
              euros: W.euros,
              retires: W.points,
              apres: (K.points || 0) - W.points,
              debloque: [],
            }),
            d("ok");
        } catch (ce) {
          O(
            ce?.code === "permission-denied"
              ? "Refusé : reconnectez-vous."
              : "Remise non enregistrée : vérifiez la connexion et réessayez.",
          );
        }
        k(!1);
      }
    },
    K = f && (e.find((W) => W.id === f.id) || f),
    Q = K && vE(a, K.points || 0),
    le = parseInt(C || "0") || 0,
    R = le,
    te = [...(a.paliers || [])].filter((W) => W.at > 0).sort((W, ce) => W.at - ce.at),
    q = (W) => {
      if (!r) {
        O("Les cartes sont en cours de chargement, réessayez dans un instant."), A((he) => he + 1);
        return;
      }
      let ce = e.find((he) => (he.code || "").toUpperCase() === W.toUpperCase().trim());
      if (!ce) {
        O("Aucune carte avec le code " + W.toUpperCase() + "."), A((he) => he + 1);
        return;
      }
      O(""), h(ce), m(""), _(""), d("fiche");
    },
    X = (W) => {
      m((ce) =>
        W === "⌫" ? ce.slice(0, -1) : W === "C" ? "" : ce.length >= 4 ? ce : ce === "0" ? W : ce + W,
      );
    },
    ge = async () => {
      if (!(!R || g)) {
        k(!0);
        try {
          let W = K.points || 0;
          await crediter(K, le);
          let ce = W + le,
            he = te.filter((rt) => rt.at > W && rt.at <= ce);
          N({
            nom: K.nom,
            gagnes: le,
            apres: ce,
            montant: R,
            debloque: he,
            dispo: te.filter((rt) => rt.at <= ce),
          }),
            d("ok");
        } catch (W) {
          O(
            W?.code === "permission-denied"
              ? "Refusé : reconnectez-vous."
              : "Points non enregistrés : vérifiez la connexion et réessayez.",
          );
        }
        k(!1);
      }
    },
    J = () => {
      h(null), N(null), m(""), O(""), d("scan"), A((W) => W + 1);
    };
  (0, React.useEffect)(() => {
    if (c !== "ok") return;
    let W = setTimeout(J, 8e3);
    return () => clearTimeout(W);
  }, [c]);
  let ue = K && te.find((W) => W.at > (K.points || 0)),
    Pe = (K?.nom || "?").trim()[0]?.toUpperCase();
  return DC(a)
    ? React.default.createElement(EcranCaisse, {
        user,
        clients: e,
        charge: r,
        fid: a,
        maj: P,
        script: D,
        roue: o,
      })
    : React.default.createElement(
        React.default.Fragment,
        null,
        c === "scan" &&
          React.default.createElement(
            "div",
            { className: "cs-main" },
            React.default.createElement("div", { className: "titre" }, "Scanner la carte"),
            React.default.createElement(
              "div",
              { className: "sous" },
              "Le client affiche son QR code (onglet Fidélité de son appli).",
            ),
            React.default.createElement(Scanner, { key: v, onCode: q }),
            React.default.createElement(
              "div",
              { className: "saisie" },
              React.default.createElement("input", {
                className: "inp",
                placeholder: "RAD-XXXXX",
                value: B,
                maxLength: 9,
                onChange: (W) => _(W.target.value.toUpperCase()),
                onKeyDown: (W) => W.key === "Enter" && B && q(B),
                "aria-label": "Code de la carte",
              }),
              React.default.createElement(
                "button",
                {
                  className: "btn",
                  disabled: B.length < 5,
                  onClick: () => q(B.startsWith("RAD-") ? B : "RAD-" + B.replace(/^RAD/, "")),
                },
                "OK",
              ),
            ),
            b && React.default.createElement("div", { className: "err" }, b),
            !a.active &&
              React.default.createElement(
                "div",
                { className: "err" },
                "Le programme de fidélité est désactivé dans l'administration.",
              ),
            React.default.createElement(
              "div",
              { className: "compte" },
              "Connecté : ",
              user.email,
              " · ",
              e.length,
              " carte",
              e.length > 1 ? "s" : "",
            ),
          ),
        c === "fiche" &&
          K &&
          React.default.createElement(
            "div",
            { className: "cs-main large" },
            React.default.createElement(
              "div",
              { className: "col", style: { width: "100%" } },
              React.default.createElement(
                "div",
                { className: "fiche" },
                React.default.createElement("div", { className: "av" }, Pe),
                React.default.createElement(
                  "div",
                  { style: { minWidth: 0 } },
                  React.default.createElement("div", { className: "nm" }, K.nom),
                  React.default.createElement("div", { className: "cd" }, K.code),
                ),
                React.default.createElement(
                  "div",
                  { className: "pt" },
                  React.default.createElement("b", null, K.points || 0),
                  React.default.createElement("span", null, "points"),
                ),
              ),
              Q
                ? Q.nb > 0
                  ? React.default.createElement(
                      "button",
                      { className: "btn terra", style: { marginTop: 10 }, disabled: g, onClick: I },
                      "🎁 Appliquer ",
                      qs(Q.euros),
                      " de remise (−",
                      Q.points,
                      " points)",
                      Q.nb > 1 ? " · " + Q.nb + " dispo." : "",
                    )
                  : React.default.createElement(
                      "div",
                      { className: "palier" },
                      "Encore ",
                      Q.manque,
                      " point",
                      Q.manque > 1 ? "s" : "",
                      " pour ",
                      qs(Q.euros),
                      " de remise",
                      React.default.createElement(
                        "div",
                        { className: "barre" },
                        React.default.createElement("i", { style: { width: Q.progres * 100 + "%" } }),
                      ),
                    )
                : ue
                  ? React.default.createElement(
                      "div",
                      { className: "palier" },
                      "Encore ",
                      ue.at - (K.points || 0),
                      " point",
                      ue.at - (K.points || 0) > 1 ? "s" : "",
                      " pour « ",
                      ue.label || "la récompense",
                      " »",
                      React.default.createElement(
                        "div",
                        { className: "barre" },
                        React.default.createElement("i", {
                          style: { width: Math.min(100, ((K.points || 0) / ue.at) * 100) + "%" },
                        }),
                      ),
                    )
                  : te.length
                    ? React.default.createElement(
                        "div",
                        { className: "palier" },
                        "🎁 Toutes les récompenses sont atteintes",
                      )
                    : null,
              React.default.createElement(
                "div",
                { className: "ecran" },
                React.default.createElement(
                  "div",
                  { className: "m" },
                  C ? "+" + le : React.default.createElement("span", { style: { color: "#C9C3B6" } }, "0"),
                ),
                React.default.createElement(
                  "div",
                  { className: "p" },
                  R
                    ? "point" + (le > 1 ? "s" : "") + " · nouveau total " + ((K.points || 0) + le)
                    : "Points à créditer",
                ),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "col", style: { width: "100%" } },
              React.default.createElement(
                "div",
                { className: "pave" },
                ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map((W) =>
                  React.default.createElement(
                    "button",
                    {
                      key: W,
                      onClick: () => X(W),
                      "aria-label": W === "⌫" ? "Effacer" : W === "C" ? "Tout effacer" : W,
                    },
                    W,
                  ),
                ),
              ),
              b && React.default.createElement("div", { className: "err" }, b),
              React.default.createElement(
                "div",
                { className: "actions" },
                React.default.createElement("button", { className: "btn gh", onClick: J }, "Annuler"),
                React.default.createElement(
                  "button",
                  { className: "btn", disabled: !R || g, onClick: ge },
                  g ? "Envoi…" : R ? "Créditer " + le + " point" + (le > 1 ? "s" : "") : "Créditer",
                ),
              ),
              React.default.createElement(
                "div",
                { className: "compte", style: { textAlign: "center" } },
                M === 1 ? "1 € = 1 point" : "1 point par tranche de " + M + " €",
                js(a) ? " · " + js(a).points + " points = " + qs(js(a).euros) + " de remise" : "",
              ),
            ),
          ),
        c === "ok" &&
          T?.remise &&
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
                { className: "plus", style: { color: "var(--terra)" } },
                "−",
                qs(T.euros),
              ),
              React.default.createElement(
                "div",
                { className: "tot" },
                "Remise à déduire du ticket de ",
                T.nom,
                React.default.createElement("br", null),
                T.retires,
                " points utilisés · il reste ",
                React.default.createElement("b", null, T.apres, " points"),
              ),
              React.default.createElement(
                "button",
                { className: "btn", style: { marginTop: 22 }, onClick: J },
                "Client suivant",
              ),
              React.default.createElement(
                "div",
                { className: "compte" },
                "Retour automatique dans quelques secondes",
              ),
            ),
          ),
        c === "ok" &&
          T &&
          !T.remise &&
          React.default.createElement(
            "div",
            { className: "cs-main" },
            React.default.createElement(
              "div",
              { className: "ok" },
              React.default.createElement("div", { className: "rond" }, "✓"),
              React.default.createElement(
                "div",
                { className: "plus" },
                "+",
                T.gagnes,
                " point",
                T.gagnes > 1 ? "s" : "",
              ),
              React.default.createElement(
                "div",
                { className: "tot" },
                T.nom,
                React.default.createElement("br", null),
                "Nouveau total : ",
                React.default.createElement("b", null, T.apres, " points"),
              ),
              T.debloque.map((W) =>
                React.default.createElement(
                  "div",
                  { className: "cadeau", key: W.at },
                  "🎁 Récompense débloquée : ",
                  W.label || W.at + " points",
                ),
              ),
              (() => {
                let W = vE(a, T.apres);
                return (
                  W &&
                  W.nb > 0 &&
                  React.default.createElement(
                    "div",
                    { className: "cadeau" },
                    "🎁 ",
                    qs(W.valeur),
                    " de remise disponible : utilisable dès maintenant ou au prochain passage",
                  )
                );
              })(),
              React.default.createElement(
                "button",
                { className: "btn", style: { marginTop: 22 }, onClick: J },
                "Client suivant",
              ),
              React.default.createElement(
                "div",
                { className: "compte" },
                "Retour automatique dans quelques secondes",
              ),
            ),
          ),
        React.default.createElement(BandeauMaj, { dispo: P }),
      );
}
