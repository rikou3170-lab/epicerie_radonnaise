/* ═══════════════════════════════════════════════════════════════════════
 *  APPLI — écran principal : navigation entre les onglets, fenêtres, démarrage.
 * ═══════════════════════════════════════════════════════════════════════ */

// Appli client : données, carte, onglets, fenêtres et alertes.
function App() {
  let t = useShop(),
    [e, n] = useMoi(),
    [r, i] = (0, React.useState)(!1),
    [o, s] = (0, React.useState)(!1),
    l = (0, React.useRef)([]),
    [u, d] = (0, React.useState)("");
  (Z2 = Nn(t.cmd).script || ""),
    (0, React.useEffect)(() => {
      e?.ref && _c();
    }, [e?.ref]);
  let [h, f] = NO(t.fidActive ? e : null, t.fidelite),
    [m, E] = (0, React.useState)("accueil"),
    [F, D] = (0, React.useState)(null),
    [M, C] = (0, React.useState)(!0),
    [A, S] = (0, React.useState)(!1),
    [P, z] = (0, React.useState)(!1),
    [j, b] = S9(),
    y = j.prenom || (e?.nom ? e.nom.trim().split(/\s+/)[0] : ""),
    v = P && !!y,
    [w, k] = (0, React.useState)(() => !!window.__ouvFinie || !document.getElementById("ouverture"));
  (0, React.useEffect)(() => {
    if (w) return;
    let K = () => k(!0);
    return addEventListener("ouverture-fin", K), () => removeEventListener("ouverture-fin", K);
  }, []),
    (0, React.useEffect)(() => {
      if (t.pret) window.__appPret?.();
      else {
        let K = setTimeout(() => window.__appPret?.(), 2500);
        return () => clearTimeout(K);
      }
    }, [t.pret]),
    (0, React.useEffect)(() => {
      h ||
        M ||
        v ||
        o ||
        u ||
        !t.fidActive ||
        !e ||
        e.roueNon ||
        !(e.roueAJouer || []).length ||
        ((l.current = e.roueAJouer.slice()),
        d(String(e.roueAJouer.length) + "-" + (e.roueAJouer[e.roueAJouer.length - 1]?.t || 0)));
    }, [
      h,
      M,
      v,
      o,
      t.fidActive,
      e?.roueNon,
      (e?.roueAJouer || []).length,
      (e?.roueAJouer || []).slice(-1)[0]?.t,
    ]),
    (0, React.useEffect)(() => {
      let K = MENTION_EXCLUSIONS(t.fidelite);
      !h &&
        !M &&
        !v &&
        t.fidActive &&
        e &&
        !r &&
        K.palier &&
        (e.tampons || 0) === K.palier &&
        !X2(e) &&
        s(!0);
    }, [h, M, v, t.fidActive, e?.tampons, e?.choixLe, e?.dernierTampon, r]);
  let [N, T] = (0, React.useState)(() => {
      try {
        return !location.hash.includes("transfert=") && localStorage.getItem(BIENVENUE_KEY) !== "1";
      } catch {
        return !1;
      }
    }),
    [X, le] = (0, React.useState)(() => {
      try {
        return location.hash.includes("transfert=") ? location.hash : null;
      } catch {
        return null;
      }
    }),
    se = useInstall(),
    [R, fe] = (0, React.useState)(!1),
    [Q, Ae] = (0, React.useState)(null),
    [ot, et] = (0, React.useState)(Q9);
  (0, React.useEffect)(() => {
    try {
      ot.length
        ? localStorage.setItem(ix, JSON.stringify({ t: Date.now(), l: ot }))
        : localStorage.removeItem(ix);
    } catch {}
  }, [ot]),
    (0, React.useEffect)(() => {
      let K = 0,
        ge = () => {
          document.visibilityState === "hidden"
            ? (K = Date.now())
            : K && Date.now() - K > 3e4 && location.reload();
        },
        Je = (ft) => {
          ft.persisted && location.reload();
        };
      return (
        document.addEventListener("visibilitychange", ge),
        addEventListener("pageshow", Je),
        () => {
          document.removeEventListener("visibilitychange", ge), removeEventListener("pageshow", Je);
        }
      );
    }, []);
  let [de, Ht] = (0, React.useState)(null),
    [st, is] = (0, React.useState)(0),
    yn = useChat(),
    os = useNotifs(t),
    [Nf, ss] = (0, React.useState)(0),
    Wi = useMesResas(Nf),
    [Gi, as] = (0, React.useState)(null),
    [Ga, ls] = (0, React.useState)(!1),
    [kc, Ic] = (0, React.useState)(0),
    [Hi, Tc, Cc] = useMesCommandes(st),
    Zn = Hi.find(cT),
    us = (yn.nonLus || 0) + Hi.filter(cT).length;
  (0, React.useEffect)(() => {
    try {
      us && navigator.setAppBadge
        ? navigator.setAppBadge(us).catch(() => {})
        : navigator.clearAppBadge && navigator.clearAppBadge().catch(() => {});
    } catch {}
  }, [us]);
  let Ff = useMiseAJour(),
    qr = ot
      .map((K) => {
        let ge = t.plateaux.find((Pn) => Pn.id === K.id && vn(Pn));
        if (!ge) return null;
        let Je = Qo(ge),
          ft = Je ? (K.choix || []).filter((Pn) => Je.options.some((Ja) => Ja.nom === Pn)) : [],
          er = w2(ge, ft);
        return {
          id: ge.id,
          nom: ge.nom + (ft.length ? " — " + ft.join(", ") : ""),
          choix: ft,
          personnes: K.personnes,
          prixPersonne: er,
          montant: K.personnes * er,
        };
      })
      .filter(Boolean),
    Ha = (K) => {
      Ht(K), K?.id && tn("pl_" + K.id);
    };
  (0, React.useEffect)(() => {
    tI();
  }, []),
    (0, React.useEffect)(() => {
      tn("v_" + m);
    }, [m]);
  let Rn = [...Hi, ...Wi].map((K) => K.conv).find((K) => K && /^[A-Za-z0-9]{15,40}$/.test(K));
  (0, React.useEffect)(() => {
    if (!Rn || Rn === yn.moiChat?.ref) return;
    let K = [];
    try {
      K = JSON.parse(localStorage.getItem(pT) || "[]");
    } catch {}
    if (!K.includes(Rn)) {
      try {
        localStorage.setItem(pT, JSON.stringify([...K, Rn].slice(-20)));
      } catch {}
      yn.enregistrer({ ref: Rn, nom: y || yn.moiChat?.nom || "", vu: 0 }), setTimeout(_c, 300);
    }
  }, [Rn]);
  let at = wO(),
    tt = (0, React.useMemo)(() => texteOuverture(t.hours, t.fermetures), [t.hours, t.fermetures, at]),
    $r = tt ? tt.ouvert : null,
    Ka = (0, React.useRef)(!1);
  (0, React.useEffect)(() => {
    Ka.current || !t.cmd?.script || ((Ka.current = !0), xO(t.cmd));
  }, [t.cmd?.script]);
  let xe = (0, React.useMemo)(() => n2(t.themes), [t.themes]);
  PoudreMagique(!!xe?.magie && xe.anim !== !1);
  let Qe = Re(xe);
  dI(Qe && xe.anim !== !1 ? Qe : null),
    (0, React.useEffect)(() => {
      if (!t.pret) return;
      let K = "";
      try {
        if (xe?.dates) {
          let ge = new Date().toLocaleDateString("sv-SE"),
            Je = Number(ge.slice(0, 4));
          for (let ft of [Je - 1, Je]) {
            let [er, Pn] = t2(xe, t.themes?.items?.[xe.id], ft);
            er <= ge && ge <= Pn && (K = Pn);
          }
        }
      } catch {}
      t.themes?.mode === "force" && (K = ""), aI(xe, K);
    }, [t.pret, xe?.id, xe?.magie, Qe]);
  let Wr = () => D(e ? "qr" : "inscription"),
    cs = (K) => {
      E(K), window.scrollTo(0, 0);
    };
  if (
    ((0, React.useEffect)(() => {
      es.set(
        M && w
          ? {
              moi: t.fidActive ? e : null,
              tampons: fc(t.fidelite),
              prenom: y,
              theme: xe,
              onSortie: () => S(!0),
              onEnd: () => {
                // v2.44 : petit fondu d'ouverture (« Bonsoir Eric ») à la place de l'étiquette
                z(!0), C(!1);
              },
            }
          : null,
      );
    }),
    M && !A)
  )
    return null;
  if (N && !e)
    return React.default.createElement(
      React.default.Fragment,
      null,
      React.default.createElement("style", null, CSS_APPLI),
      React.default.createElement(Bienvenue, {
        d: t,
        onFin: (K) => {
          T(!1), K === "carte" && D("inscription");
        },
      }),
    );
  let Qa =
      Q &&
      React.default.createElement(
        "div",
        { style: { position: "relative", zIndex: 500 } },
        React.default.createElement(PageLegale, { type: Q, d: t, onClose: () => Ae(null) }),
      ),
    ds =
      de &&
      React.default.createElement(ChoixPlateau, {
        p: de,
        actuel: ot.find((K) => K.id === de.id),
        onClose: () => Ht(null),
        onRetirer: () => {
          et((K) => K.filter((ge) => ge.id !== de.id)), Ht(null);
        },
        onValider: (K, ge) => {
          et((Je) =>
            Je.some((ft) => ft.id === de.id)
              ? Je.map((ft) => (ft.id === de.id ? { ...ft, personnes: K, choix: ge } : ft))
              : [...Je, { id: de.id, personnes: K, choix: ge }],
          ),
            Ht(null);
        },
      });
  if (Ga)
    return React.default.createElement(
      React.default.Fragment,
      null,
      React.default.createElement("style", null, CSS_APPLI),
      React.default.createElement(Messagerie, {
        d: t,
        moi: e,
        chat: yn,
        notifs: os,
        inst: se,
        ouvrirLegal: Ae,
        onClose: () => ls(!1),
      }),
      Q &&
        React.default.createElement(
          "div",
          { style: { position: "relative", zIndex: 500 } },
          React.default.createElement(PageLegale, { type: Q, d: t, onClose: () => Ae(null) }),
        ),
    );
  if (F === "commande")
    return React.default.createElement(
      React.default.Fragment,
      null,
      React.default.createElement("style", null, CSS_APPLI),
      React.default.createElement(Commande, {
        d: t,
        moi: e,
        lignes: qr,
        ouvrirLegal: Ae,
        notifs: os,
        inst: se,
        onEnvoyee: () => {
          is((K) => K + 1), tn("commandes");
        },
        modifier: (K) => Ht(t.plateaux.find((ge) => ge.id === K)),
        vider: () => et([]),
        onClose: () => {
          D(null), E("carte"), window.scrollTo(0, 0);
        },
      }),
      ds,
      Q &&
        React.default.createElement(
          "div",
          { style: { position: "relative", zIndex: 500 } },
          React.default.createElement(PageLegale, { type: Q, d: t, onClose: () => Ae(null) }),
        ),
    );
  if (F === "qr" && e)
    return React.default.createElement(
      "div",
      { className: "full", onClick: () => D(null) },
      React.default.createElement("style", null, CSS_APPLI),
      React.default.createElement(
        "div",
        { style: { fontSize: 13, fontWeight: 700, color: "#666" } },
        "À présenter en caisse",
      ),
      React.default.createElement(QR, {
        texte: e.code,
        couleur: "#000",
        taille: "min(78vw,330px)",
        style: { width: "min(78vw,330px)", height: "min(78vw,330px)" },
      }),
      React.default.createElement(
        "div",
        { style: { fontSize: 30, fontWeight: 800, letterSpacing: 5 } },
        e.code,
      ),
      React.default.createElement(
        "div",
        { style: { fontFamily: "'Sacramento',cursive", fontSize: 26, color: "#444" } },
        e.nom,
      ),
      React.default.createElement(
        "div",
        { style: { fontSize: 11, color: "#999" } },
        "Touchez l'écran pour fermer",
      ),
    );
  if (F === "inscription")
    return React.default.createElement(
      "div",
      { className: "app" },
      React.default.createElement("style", null, CSS_APPLI),
      React.default.createElement(FormulaireCarte, {
        ouvrirLegal: Ae,
        onCancel: () => D(null),
        onDone: (K) => {
          n(K), D(null), E("fidelite"), se.possible && fe(!0);
        },
      }),
      Qa,
    );
  let Df = [
    { id: "accueil", label: "Accueil", ic: Ic2.home, on: !0 },
    { id: "carte", label: "La carte", ic: Ic2.basket, on: t.onglets?.carte !== !1 },
    { id: "fidelite", label: "Fidélité", ic: Ic2.star, on: t.onglets?.fidelite !== !1 },
    { id: "actus", label: "Actus", ic: Ic2.news, on: t.actus.some(vn) },
    // v2.44 : la messagerie passe dans la barre du bas (ouvre la conversation, pastille = messages non lus)
    { id: "chat", label: "Messages", ic: icoChat, on: t.chat?.active !== !1, nb: yn.nonLus },
    { id: "infos", label: "Infos", ic: Ic2.info, on: !0 },
  ].filter((K) => K.on);
  return React.default.createElement(
    "div",
    {
      className:
        "app" + (qr.length ? " avec-panier" : "") + (xe?.magie ? " magie" : "") + (Qe ? " " + Qe : ""),
      style: xe ? { "--top": xe.top } : void 0,
    },
    React.default.createElement("style", null, CSS_APPLI),
    xe?.anim && m === "accueil" && React.default.createElement(Particules, { theme: xe }),
    xe?.magie && xe.anim && React.default.createElement(Neige, { nb: m === "accueil" ? 40 : 22 }),
    xe?.magie && xe.anim && m === "accueil" && React.default.createElement(Traineau, { boucle: !0 }),
    Qe === "halloween" &&
      xe.anim &&
      m === "accueil" &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(DecorVol, null),
        React.default.createElement(SvgAraignee, null),
      ),
    Qe === "octobrerose" && xe.anim && m === "accueil" && React.default.createElement(DecorBallons, null),
    hc.includes(Qe) && xe.anim && m === "accueil" && React.default.createElement(DecorAne, { id: Qe }),
    React.default.createElement(
      "header",
      { className: "top" },
      React.default.createElement("img", { src: LOGO, alt: "" }),
      xe?.magie && React.default.createElement(SvgBonnet, { taille: 30, style: { left: 30, top: 1 } }),
      Qe === "halloween" &&
        React.default.createElement(SvgChapeauSorciere, { taille: 30, style: { left: 28, top: 0 } }),
      Qe === "octobrerose" && React.default.createElement(pI, { style: { left: 44, top: 28 } }),
      hc.includes(Qe) && React.default.createElement(AI, { id: Qe }),
      React.default.createElement(
        "div",
        null,
        React.default.createElement("h1", null, t.store.name),
        React.default.createElement(
          "small",
          null,
          "Raddon-et-Chapendu ",
          React.default.createElement("span", { className: "vers" }, "v", VERSION),
        ),
      ),
      $r !== null &&
        React.default.createElement(
          "span",
          { className: "state" + ($r ? "" : " off") },
          React.default.createElement("span", { className: "dot" }),
          $r ? "Ouvert" : "Fermé",
        ),
    ),
    xe &&
      (xe.magie
        ? React.default.createElement(GuirlandeNoel, null)
        : Qe === "halloween"
          ? React.default.createElement(uI, null)
          : Qe === "octobrerose"
            ? React.default.createElement(fI, null)
            : hc.includes(Qe)
              ? React.default.createElement(kI, { id: Qe })
              : React.default.createElement("div", {
                  className: "frise-theme",
                  style: { background: xe.frise },
                })),
    m === "accueil" &&
      React.default.createElement(Accueil, {
        d: t,
        theme: xe,
        prenom: y,
        onReserver: (K) => {
          as(K), K?.id && tn("resa_" + K.id);
        },
        mesResas: Wi,
        moi: e,
        mesCmds: Hi,
        onFid: Wr,
        versCarte: () => cs("carte"),
        versActus: () => cs("actus"),
        versFid: () => cs("fidelite"),
        inst: se,
        ouverture: tt,
        notifs: os,
      }),
    m === "actus" && React.default.createElement(Actus, { d: t }),
    m === "carte" &&
      React.default.createElement(Carte, {
        d: t,
        panier: ot,
        choisir: Ha,
        mesCmds: Hi,
        oublier: Cc,
        recommander: (K) => {
          et(
            K.filter((ge) => t.plateaux.some((Je) => String(Je.id) === String(ge.id) && vn(Je))).map(
              (ge) => ({
                id: t.plateaux.find((Je) => String(Je.id) === String(ge.id)).id,
                personnes: ge.personnes,
                choix: ge.choix || [],
              }),
            ),
          ),
            D("commande"),
            window.scrollTo(0, 0);
        },
      }),
    Gi &&
      React.default.createElement(Reserver, {
        i: [...(t.jour?.items || []), ...(t.jourMenu || [])].find((K) => K.id === Gi.id) || Gi,
        d: t,
        prenom: y,
        moi: e,
        inst: se,
        onClose: () => as(null),
        onFait: () => ss((K) => K + 1),
      }),
    X && React.default.createElement(FenetreReception, { code0: X, onClose: () => le(null) }),
    !X && !M && !y && !j.demande && !Zn && React.default.createElement(DemandePrenom, { onFin: b }),
    v && !X && React.default.createElement(FonduOuverture, { prenom: y, onFin: () => z(!1) }),
    Zn &&
      !de &&
      !X &&
      !M &&
      !v &&
      React.default.createElement(AlerteCommande, {
        c: Zn,
        store: t.store,
        onClose: () => Tc(Zn.ref, Zn.statut),
      }),
    !Zn && !X && (y || j.demande) && !h && !M && !v && React.default.createElement(PopupMessage, { d: t }),
    h && !M && !v && React.default.createElement(PopupFete, { key: h.cle, fete: h, f: t.fidelite, onFin: f }),
    o &&
      e &&
      React.default.createElement(FenetreChoix, {
        moi: e,
        f: t.fidelite,
        onClose: () => {
          s(!1), i(!0);
        },
      }),
    u &&
      e &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement("style", null, JI),
        React.default.createElement(RoueNoel, {
          key: u,
          tours: u === "x" ? [] : l.current,
          tickets: KI(e, t.roue),
          premiere: !XO(),
          onFini: async () => {
            d("");
            try {
              localStorage.setItem(xT, "1");
            } catch {}
            let K = u === "x" ? [] : l.current;
            try {
              K.length &&
                (await setDoc(doc2(db, "clients", e.ref), { roueAJouer: arrayUnion(...K) }, { merge: !0 }));
            } catch {}
          },
          onRefus: async () => {
            d("");
            try {
              await setDoc(doc2(db, "clients", e.ref), { roueNon: !0, roueAJouer: [] }, { merge: !0 });
            } catch {}
          },
        }),
      ),
    ds,
    React.default.createElement(BarrePanier, {
      lignes: qr,
      onOuvrir: () => {
        D("commande"), window.scrollTo(0, 0);
      },
    }),
    t.chat?.active !== !1 &&
      React.default.createElement(PopupChat, {
        chat: yn,
        haut: qr.length > 0,
        onOuvrir: () => {
          ls(!0), tn("chat");
        },
      }),
    m === "fidelite" &&
      React.default.createElement(Fidelite, {
        d: t,
        moi: e,
        setMoi: n,
        onFid: Wr,
        inst: se,
        ouvrirLegal: Ae,
      }),
    m === "infos" &&
      React.default.createElement(Infos, {
        d: t,
        inst: se,
        ouvrirLegal: Ae,
        pr: j,
        setPrenom: b,
        notifs: os,
      }),
    React.default.createElement(
      "div",
      {
        className: "signature",
        style: {
          textAlign: "center",
          fontSize: 11,
          color: "#9AA59E",
          margin: "28px 16px 80px",
          lineHeight: 1.5,
        },
      },
      "Conception et réalisation Eric Tisserand",
      React.default.createElement("br", null),
      "Reproduction interdite",
    ),
    React.default.createElement(BandeauMaj, { dispo: Ff }),
    R && React.default.createElement(ProposeInstall, { inst: se, onClose: () => fe(!1) }),
    se.ouvert && React.default.createElement(AssistantInstall, { inst: se }),
    Qa,
    React.default.createElement(
      "nav",
      { className: "tabs" },
      Df.map((K) =>
        React.default.createElement(
          "button",
          {
            key: K.id + (m === K.id ? "-" + kc : ""),
            className: "tab" + (m === K.id ? " on" : "") + (K.nb > 0 ? " a-lire" : ""),
            "aria-current": m === K.id ? "page" : void 0,
            onClick: () => {
              try {
                navigator.vibrate?.(8);
              } catch {}
              if (K.id === "chat") return ls(!0), tn("chat");
              E(K.id), Ic((ge) => ge + 1);
              window.scrollTo(0, 0);
            },
          },
          React.default.createElement(
            "span",
            { className: "pastille" },
            K.ic(21, "currentColor"),
            K.nb > 0 && React.default.createElement("b", { className: "tab-nb" }, K.nb > 9 ? "9+" : K.nb),
            m === K.id &&
              [0, 60, 120, 180, 240, 300].map((ge) =>
                React.default.createElement("i", {
                  key: ge,
                  className: "etincelle",
                  style: { "--a": ge + "deg" },
                }),
              ),
          ),
          React.default.createElement("span", { className: "tab-l" }, K.label),
        ),
      ),
    ),
  );
}

// Petite mémoire partagée pour afficher une alerte de commande.
var es = {
  v: null,
  l: new Set(),
  set(t) {
    (this.v = t), this.l.forEach((e) => e());
  },
  sub(t) {
    return es.l.add(t), () => es.l.delete(t);
  },
};

// Affiche l'alerte de commande.
function Y9() {
  let t = (0, React.useSyncExternalStore)(es.sub, () => es.v),
    [e, n] = (0, React.useState)(null);
  (0, React.useEffect)(() => {
    t && !e && n(t), !t && e && n(null);
  }, [t]);
  let r = e || t;
  return r
    ? React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement("style", null, CSS_APPLI),
        React.default.createElement(Intro, {
          moi: r.moi,
          tampons: r.tampons,
          prenom: r.prenom,
          theme: r.theme,
          onSortie: () => es.v?.onSortie(),
          onEnd: () => es.v?.onEnd(),
        }),
      )
    : null;
}

// Lance l'appli dans la page.
(0, ReactDOMClient.createRoot)(document.getElementById("root")).render(
  React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(Y9, null),
    React.default.createElement(App, null),
  ),
);
