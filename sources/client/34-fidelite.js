/* ═══════════════════════════════════════════════════════════════════════
 *  FIDÉLITÉ — carte à tampons, jauge, récompenses, niveaux, animations.
 * ═══════════════════════════════════════════════════════════════════════ */

// Jauge circulaire de progression vers la prochaine remise
function Jauge({ progres, taille = 136, children }) {
  let i = 2 * Math.PI * 42,
    [p, setP] = (0, React.useState)(0);
  return (
    (0, React.useEffect)(() => {
      let l = setTimeout(() => setP(progres), 60);
      return () => clearTimeout(l);
    }, [progres]),
    React.default.createElement(
      "div",
      { className: "jauge", style: { width: taille, height: taille } },
      React.default.createElement(
        "svg",
        { viewBox: "0 0 100 100", width: taille, height: taille },
        React.default.createElement(
          "defs",
          null,
          React.default.createElement(
            "linearGradient",
            { id: "jg", x1: "0", y1: "0", x2: "1", y2: "1" },
            React.default.createElement("stop", { offset: "0", stopColor: "#C9E38A" }),
            React.default.createElement("stop", { offset: "1", stopColor: "#8AAD3B" }),
          ),
        ),
        React.default.createElement("circle", {
          cx: "50",
          cy: "50",
          r: 42,
          fill: "none",
          stroke: "rgba(255,255,255,.13)",
          strokeWidth: "9",
        }),
        React.default.createElement("circle", {
          cx: "50",
          cy: "50",
          r: 42,
          fill: "none",
          stroke: "url(#jg)",
          strokeWidth: "9",
          strokeLinecap: "round",
          strokeDasharray: i,
          strokeDashoffset: i * (1 - Math.max(0.015, Math.min(1, p))),
          transform: "rotate(-90 50 50)",
          style: { transition: "stroke-dashoffset 1.1s cubic-bezier(.3,.9,.3,1)" },
        }),
      ),
      React.default.createElement("div", { className: "jauge-in" }, children),
    )
  );
}

// Choix de la récompense : mémoire de la roue, choix en cours.
var xT = "epicerie-raddonnaise-roue-ok",
  XO = () => {
    try {
      return localStorage.getItem(xT) === "1";
    } catch {
      return !1;
    }
  },
  X2 = (t) => (t && t.choix && (t.choixLe || 0) > (t.dernierTampon || 0) ? t.choix : ""),
  Z2 = "";

// Enregistre le choix de récompense du client (et prévient l'épicerie pour un cadeau).
async function ZO(t, e) {
  if (
    (await setDoc(doc2(db, "clients", t.ref), { choix: e, choixLe: Date.now() }, { merge: !0 }),
    e === "cadeau" && g2(Z2))
  )
    try {
      await waitForPendingWrites(db),
        fetch(Z2 + "?fid=" + encodeURIComponent(t.ref) + "&e=choix", {
          method: "GET",
          mode: "no-cors",
          redirect: "follow",
        }).catch(() => {});
    } catch {}
}

// Choix de la récompense (cadeau ou remise).
function ChoixRecompense({ moi, t, onFait }) {
  let [r, i] = (0, React.useState)(!1),
    [o, s] = (0, React.useState)(""),
    l = async (u) => {
      i(!0), s("");
      try {
        await ZO(moi, u), onFait?.(u);
      } catch {
        s("Pas de connexion : réessayez dans un instant.");
      }
      i(!1);
    };
  return React.default.createElement(
    "div",
    { className: "choix-b" },
    React.default.createElement(
      "button",
      { disabled: r, onClick: () => l("cadeau") },
      React.default.createElement("span", null, "🎁"),
      React.default.createElement("b", null, "Je vais chercher mon cadeau"),
      React.default.createElement("small", null, "L'épicerie est prévenue, votre carte repartira à zéro"),
    ),
    React.default.createElement(
      "button",
      { disabled: r, onClick: () => l("continue") },
      React.default.createElement("span", null, "🚀"),
      React.default.createElement("b", null, "Je continue"),
      React.default.createElement("small", null, "Jusqu'à ", t.nb, " tampons pour votre chouette cadeau"),
    ),
    o && React.default.createElement("div", { className: "choix-err" }, o),
  );
}

// Fenêtre du choix de récompense.
function FenetreChoix({ moi, f, onClose }) {
  let r = MENTION_EXCLUSIONS(f),
    [i, o] = (0, React.useState)("");
  return (
    (0, React.useEffect)(() => {
      if (!i) return;
      let s = setTimeout(onClose, 3200);
      return () => clearTimeout(s);
    }, [i]),
    React.default.createElement(
      "div",
      { className: "choix-fond", role: "dialog", "aria-modal": "true", "aria-label": "Votre cadeau" },
      React.default.createElement(
        "div",
        { className: "choix-in" },
        React.default.createElement("div", { className: "choix-ico" }, "🎁"),
        i
          ? i === "cadeau"
            ? React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("h2", null, "C'est noté !"),
                React.default.createElement(
                  "p",
                  null,
                  "Votre cadeau vous attend en caisse. L'épicerie est prévenue 🎉",
                ),
              )
            : React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("h2", null, "On continue !"),
                React.default.createElement(
                  "p",
                  null,
                  "Encore ",
                  r.nb - r.palier,
                  " tampons pour votre chouette cadeau 🎁🎁",
                ),
              )
          : React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("h2", null, "Bravo, ", r.palier, " tampons !"),
              React.default.createElement(
                "p",
                null,
                "Votre cadeau surprise est débloqué. Que voulez-vous faire ?",
              ),
              React.default.createElement(ChoixRecompense, { moi, t: r, onFait: o }),
              React.default.createElement(
                "button",
                { className: "choix-tard", onClick: onClose },
                "Je déciderai plus tard",
              ),
            ),
      ),
    )
  );
}

// Mémoire des animations de tampons déjà jouées.
var wT = "epicerie-raddonnaise-tampons-anim",
  dT = () => {
    try {
      return JSON.parse(localStorage.getItem(wT) || "{}");
    } catch {
      return {};
    }
  };

// Joue l'animation des tampons quand la carte devient visible.
function useVisible(t, e, n) {
  let [r, i] = (0, React.useState)(() => {
      let u = dT()[t];
      return u == null || u > e ? e : u;
    }),
    [o, s] = (0, React.useState)(!1),
    l = (0, React.useRef)(e);
  return (
    (0, React.useEffect)(() => {
      if (o || !n.current) return;
      if (!("IntersectionObserver" in window)) {
        s(!0);
        return;
      }
      let u = new IntersectionObserver(
        (d) => {
          d.some((h) => h.isIntersecting) && (s(!0), u.disconnect());
        },
        { threshold: 0.5 },
      );
      return u.observe(n.current), () => u.disconnect();
    }, [o]),
    (0, React.useEffect)(() => {
      e < l.current ? i(e) : e > l.current && i(l.current), (l.current = e);
    }, [e]),
    (0, React.useEffect)(() => {
      if (!(!o || !t))
        try {
          let u = dT();
          (u[t] = e), localStorage.setItem(wT, JSON.stringify(u));
        } catch {}
    }, [o, t, e]),
    [r, o]
  );
}

// Grille des tampons de la carte.
function GrilleTampons({ f: t, moi, amb }) {
  let r = MENTION_EXCLUSIONS(t),
    i = moi ? Math.min(moi.tampons || 0, r.nb) : 0,
    o = (0, React.useRef)(null),
    [s, l] = useVisible(moi?.ref, i, o),
    u = r.nb > 12 ? 5 : Math.min(r.nb, 5);
  return React.default.createElement(
    "div",
    { className: "tp" },
    React.default.createElement(
      "div",
      { className: "tp-grille", ref: o, style: { gridTemplateColumns: "repeat(" + u + ",1fr)" } },
      Array.from({ length: r.nb }, (d, h) => {
        let f = r.palier && h === r.palier - 1,
          m = h === r.nb - 1,
          E = h >= s && h < i,
          F = h < i && (!E || l);
        return React.default.createElement(
          "div",
          {
            key: h,
            className: "tp-c" + (F ? " on" : "") + (E && l ? " tombe" : "") + (f || m ? " cadeau" : ""),
            style: { animationDelay: (E ? 0.5 + (h - s) * 0.45 : h * 0.04) + "s" },
          },
          F
            ? React.default.createElement(
                "span",
                null,
                amb === "halloween" ? "🎃" : amb === "octobrerose" ? "🎀" : nn[amb] ? nn[amb].tampon : "🍏",
              )
            : m
              ? React.default.createElement(
                  "span",
                  { className: r.palier ? "deux" : "" },
                  r.palier ? "🎁🎁" : "🎁",
                )
              : f
                ? React.default.createElement("span", null, "🎁")
                : React.default.createElement("i", null, h + 1),
        );
      }),
    ),
    moi
      ? i >= r.nb
        ? React.default.createElement(
            "div",
            { className: "tp-plein" },
            "🎉 Carte complète ! ",
            React.default.createElement("b", null, "Votre cadeau"),
            " vous attend : présentez votre carte en caisse.",
          )
        : r.palier && i === r.palier
          ? X2(moi) === "cadeau"
            ? React.default.createElement(
                "div",
                { className: "tp-plein" },
                "🎁 C'est noté ! ",
                React.default.createElement("b", null, "Votre cadeau vous attend en caisse."),
                React.default.createElement("br", null),
                "L'épicerie est prévenue. Votre carte repartira à zéro.",
              )
            : X2(moi) === "continue"
              ? React.default.createElement(
                  "div",
                  { className: "tp-reste" },
                  "Vous continuez : encore ",
                  React.default.createElement("b", null, r.nb - i),
                  " tampon",
                  r.nb - i > 1 ? "s" : "",
                  " pour ",
                  React.default.createElement("b", null, "votre chouette cadeau"),
                  " 🎁🎁",
                )
              : React.default.createElement(
                  "div",
                  { className: "tp-plein" },
                  "🎁 Cadeau débloqué ! À vous de choisir :",
                  React.default.createElement(ChoixRecompense, { moi, t: r }),
                )
          : r.palier && i < r.palier
            ? React.default.createElement(
                "div",
                { className: "tp-reste" },
                "Encore ",
                React.default.createElement("b", null, r.palier - i),
                " tampon",
                r.palier - i > 1 ? "s" : "",
                " pour ",
                React.default.createElement("b", null, "votre cadeau"),
                " 🎁",
              )
            : r.palier
              ? React.default.createElement(
                  "div",
                  { className: "tp-reste" },
                  "Vous avez continué : encore ",
                  React.default.createElement("b", null, r.nb - i),
                  " tampon",
                  r.nb - i > 1 ? "s" : "",
                  " pour ",
                  React.default.createElement("b", null, "votre chouette cadeau"),
                  " 🎁🎁",
                )
              : React.default.createElement(
                  "div",
                  { className: "tp-reste" },
                  "Encore ",
                  React.default.createElement("b", null, r.nb - i),
                  " tampon",
                  r.nb - i > 1 ? "s" : "",
                  " pour ",
                  React.default.createElement("b", null, "votre cadeau"),
                )
      : null,
    moi?.bonusAttente > 0 &&
      React.default.createElement(
        "div",
        { className: "tp-reste" },
        "🎂 ",
        React.default.createElement(
          "b",
          null,
          moi.bonusAttente,
          " tampon",
          moi.bonusAttente > 1 ? "s" : "",
          " offert",
          moi.bonusAttente > 1 ? "s" : "",
        ),
        " vous attend",
        moi.bonusAttente > 1 ? "ent" : "",
        " : ajouté",
        moi.bonusAttente > 1 ? "s" : "",
        " sur votre carte à votre prochain passage en caisse.",
      ),
    moi && React.default.createElement(NiveauSuivant, { moi }),
    r.exclus && React.default.createElement("div", { className: "tp-exclus" }, "Hors ", r.exclus, "."),
  );
}

// Prochain niveau « supporter ».
function NiveauSuivant({ moi }) {
  let { niv: e, suivant: n, reste: r } = Va(moi),
    i = (o) => o + " cadeau" + (o > 1 ? "x" : "");
  return React.default.createElement(
    "div",
    { className: "niv-l" },
    n
      ? React.default.createElement(
          React.default.Fragment,
          null,
          e
            ? React.default.createElement(
                React.default.Fragment,
                null,
                e.ico,
                " ",
                React.default.createElement("b", null, e.nom),
                " · ",
              )
            : null,
          "Encore ",
          i(r),
          " reçu",
          r > 1 ? "s" : "",
          " pour devenir ",
          React.default.createElement("b", null, n.ico, " ", n.nom),
        )
      : React.default.createElement(
          React.default.Fragment,
          null,
          e.ico,
          " ",
          React.default.createElement("b", null, e.nom),
          " : merci pour votre fidélité !",
        ),
  );
}

// Mémoire : niveau déjà fêté.
var hT = "epicerie-raddonnaise-niveau-vu";

// Félicitations pour un nouveau niveau.
function BravoNiveau({ moi }) {
  let { niv: e } = Va(moi),
    n = e ? gf.indexOf(e) : -1,
    r = () => {
      try {
        return JSON.parse(localStorage.getItem(hT) || "{}");
      } catch {
        return {};
      }
    },
    i = (l) => {
      try {
        let u = r();
        (u[moi.ref] = l), localStorage.setItem(hT, JSON.stringify(u));
      } catch {}
    },
    [o, s] = (0, React.useState)(() => {
      let l = r()[moi?.ref];
      return l ?? n;
    });
  return (
    (0, React.useEffect)(() => {
      moi?.ref && r()[moi.ref] == null && i(n);
    }, [moi?.ref]),
    (0, React.useEffect)(() => {
      n < o && (s(n), i(n));
    }, [n]),
    !moi?.ref || !e || n <= o
      ? null
      : React.default.createElement(
          "div",
          { className: "niv-bravo" },
          "🎉 ",
          React.default.createElement(
            "span",
            null,
            "Bravo",
            moi.prenom ? " " + moi.prenom : "",
            ", vous devenez ",
            React.default.createElement("b", null, e.ico, " ", e.nom),
            " ! Merci pour votre fidélité.",
          ),
          React.default.createElement(
            "button",
            {
              onClick: () => {
                s(n), i(n);
              },
              "aria-label": "Fermer",
            },
            "✕",
          ),
        )
  );
}

// Règle de la carte (« 1 passage dès 10 € = 1 tampon »).
function RegleTampons({ f }) {
  let [e, n] = (0, React.useState)(!1),
    r = MENTION_EXCLUSIONS(f);
  return React.default.createElement(
    "div",
    { className: "s" },
    r.seuil ? "1 passage dès " + pc(r.seuil) + " d'achats = 1 tampon" : "1 passage = 1 tampon",
    " ",
    React.default.createElement(
      "button",
      { className: "regle-plus", onClick: () => n(!e), "aria-expanded": e },
      e ? "Moins" : "Détails",
    ),
    e &&
      React.default.createElement(
        "div",
        { className: "regle-det" },
        $I(f).split(" · ").slice(1).join(" · "),
        ".",
      ),
  );
}

// Carte de fidélité du client (QR code, tampons, récompenses) ou invitation à la créer.
function FidCarte({ d: t, moi, onFid, compact }) {
  let i = t.fidelite,
    o = Re(n2(t.themes));
  if (fc(i))
    return React.default.createElement(
      "div",
      { className: "fid" },
      React.default.createElement(
        "h3",
        null,
        i.titre || "Carte de fidélité",
        moi &&
          Va(moi).niv &&
          React.default.createElement("span", { className: "niv-b" }, Va(moi).niv.ico, " ", Va(moi).niv.nom),
      ),
      React.default.createElement(RegleTampons, { f: i }),
      React.default.createElement(GrilleTampons, { f: i, moi, amb: o }),
      React.default.createElement(
        "div",
        {
          style: {
            marginTop: 16,
            borderTop: "1px solid rgba(255,255,255,.15)",
            paddingTop: 16,
            textAlign: "center",
          },
        },
        moi
          ? React.default.createElement(
              "div",
              { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 9 } },
              React.default.createElement(
                "div",
                { className: "qr", onClick: onFid },
                React.default.createElement(QR, { texte: moi.code, taille: 148 }),
                React.default.createElement("span", { className: "zoom" }, "Agrandir"),
              ),
              React.default.createElement("div", { className: "code" }, moi.code),
              React.default.createElement(
                "div",
                { style: { fontSize: 10.5, opacity: 0.7 } },
                moi.nom,
                " — à présenter en caisse",
              ),
            )
          : React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "div",
                { style: { fontSize: 12, opacity: 0.8, marginBottom: 10 } },
                "Créez votre carte pour collectionner vos tampons",
              ),
              React.default.createElement(
                "button",
                {
                  className: "btn",
                  style: { background: "var(--apple-l)", width: "auto", padding: "11px 22px" },
                  onClick: onFid,
                },
                "Créer ma carte",
              ),
            ),
      ),
    );
  let s = Math.max(1, i.total || 10),
    l = (moi && moi.points) || 0,
    u = (i.paliers || []).find((h) => h.at > l),
    d = qI(i, l);
  return React.default.createElement(
    "div",
    { className: "fid" },
    React.default.createElement("h3", null, i.titre || "Carte de fidélité"),
    React.default.createElement(
      "div",
      { className: "s" },
      i.sousTitre ||
        (d
          ? `1 point par ${i.parEuro || 1} € dépensé · ${d.points} points = ${pc(d.euros)} de remise`
          : `1 point par tranche de ${i.parEuro || 10} € d'achat`),
    ),
    d
      ? React.default.createElement(
          "div",
          { className: "remise" },
          React.default.createElement(
            "div",
            { className: "rm-ligne" },
            React.default.createElement(
              Jauge,
              { progres: moi ? d.progres : 0, taille: compact ? 112 : 136 },
              React.default.createElement("b", null, l % d.points),
              React.default.createElement("span", null, "/ ", d.points),
            ),
            React.default.createElement(
              "div",
              { className: "rm-cote" },
              React.default.createElement(
                "div",
                { className: "rm-total" },
                moi
                  ? React.default.createElement(
                      React.default.Fragment,
                      null,
                      "Vous avez ",
                      React.default.createElement("b", null, l),
                      " point",
                      l > 1 ? "s" : "",
                    )
                  : React.default.createElement(React.default.Fragment, null, d.points, " points"),
              ),
              React.default.createElement(
                "div",
                { className: "rm-bon" },
                moi ? "Prochain bon : " : "= ",
                React.default.createElement("b", null, pc(d.euros)),
                moi ? "" : " de remise",
              ),
              moi &&
                React.default.createElement(
                  "div",
                  { className: "rm-manque" },
                  "Plus que ",
                  React.default.createElement("b", null, d.manque),
                  " point",
                  d.manque > 1 ? "s" : "",
                  " pour ",
                  d.nb > 0 ? "le bon suivant" : "votre bon",
                ),
            ),
          ),
          moi &&
            d.nb > 0 &&
            React.default.createElement(
              "div",
              { className: "bons" },
              Array.from({ length: Math.min(d.nb, 4) }, (h, f) =>
                React.default.createElement(
                  "div",
                  { className: "bon", key: f },
                  React.default.createElement("b", null, pc(d.euros)),
                  React.default.createElement("span", null, "de remise"),
                ),
              ),
              d.nb > 4 && React.default.createElement("div", { className: "bon plus" }, "+", d.nb - 4),
              React.default.createElement(
                "div",
                { className: "bons-txt" },
                "🎉 ",
                d.nb > 1 ? d.nb + " bons disponibles" : "Bon disponible",
                " : présentez votre carte en caisse !",
              ),
            ),
        )
      : React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            "div",
            { className: "pts", style: { gridTemplateColumns: `repeat(${Math.min(s, 10)},1fr)` } },
            Array.from({ length: s }, (h, f) => {
              let m = (i.paliers || []).some((E) => E.at === f + 1);
              return React.default.createElement(
                "div",
                { key: f, className: "pt" + (f < l ? " on" : m ? " next" : "") },
                f < l ? "●" : m ? "★" : "",
              );
            }),
          ),
          React.default.createElement(
            "div",
            { className: "cpt" },
            React.default.createElement("b", null, l),
            " / ",
            s,
            " points",
            u ? ` — encore ${u.at - l} pour « ${u.label} »` : "",
          ),
        ),
    !compact &&
      !!(i.paliers || []).length &&
      React.default.createElement(
        "div",
        { style: { marginTop: 16, borderTop: "1px solid rgba(255,255,255,.15)", paddingTop: 12 } },
        i.paliers.map((h, f) =>
          React.default.createElement(
            "div",
            {
              key: f,
              style: { display: "flex", gap: 10, alignItems: "center", padding: "7px 0", fontSize: 12.5 },
            },
            React.default.createElement(
              "span",
              {
                style: {
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 11,
                  background: l >= h.at ? "var(--apple-l)" : "rgba(255,255,255,.12)",
                },
              },
              h.at,
            ),
            React.default.createElement("span", { style: { opacity: l >= h.at ? 1 : 0.7 } }, h.label),
          ),
        ),
      ),
    React.default.createElement(
      "div",
      {
        style: {
          marginTop: 16,
          borderTop: "1px solid rgba(255,255,255,.15)",
          paddingTop: 16,
          textAlign: "center",
        },
      },
      moi
        ? React.default.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 9 } },
            React.default.createElement(
              "div",
              { className: "qr", onClick: onFid },
              React.default.createElement(QR, { texte: moi.code, taille: 148 }),
              React.default.createElement("span", { className: "zoom" }, "Agrandir"),
            ),
            React.default.createElement("div", { className: "code" }, moi.code),
            React.default.createElement(
              "div",
              { style: { fontSize: 10.5, opacity: 0.7 } },
              moi.nom,
              " — à présenter en caisse",
            ),
          )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "div",
              { style: { fontSize: 12, opacity: 0.8, marginBottom: 10 } },
              "Créez votre carte pour cumuler vos points",
            ),
            React.default.createElement(
              "button",
              {
                className: "btn",
                style: { background: "var(--apple-l)", width: "auto", padding: "11px 22px" },
                onClick: onFid,
              },
              "Créer ma carte",
            ),
          ),
    ),
  );
}

// Carte de fidélité pas encore ouverte : on l'annonce
function Bientot({ compact }) {
  return React.default.createElement(
    "div",
    { className: "bientot" + (compact ? " compact" : "") },
    React.default.createElement("div", { className: "bt-badge" }, "Bientôt"),
    React.default.createElement("div", { className: "bt-titre" }, "La carte de fidélité arrive !"),
    React.default.createElement(
      "div",
      { className: "bt-txt" },
      "Très bientôt dans l'application : un tampon à chaque passage à l'épicerie, et une récompense quand la carte est pleine. Restez connectés 🍏",
    ),
    !compact &&
      React.default.createElement(
        "div",
        { className: "bt-deco", "aria-hidden": "true" },
        [0, 1, 2, 3, 4].map((e) =>
          React.default.createElement("i", { key: e, style: { animationDelay: e * 0.18 + "s" } }),
        ),
      ),
  );
}

// Onglet Fidélité.
function Fidelite({ d, moi, setMoi, onFid, inst, ouvrirLegal }) {
  return d.fidelite?.active
    ? React.default.createElement(
        "div",
        { className: "wrap" },
        React.default.createElement(Deco, null),
        React.default.createElement(FidCarte, { d, moi, onFid }),
        moi && d.fidelite?.parrainage !== !1 && React.default.createElement(Parrainage, { moi }),
        moi &&
          React.default.createElement(Installer, {
            inst,
            compact: !0,
            texte: "Gardez votre carte sur l'écran d'accueil.",
          }),
        moi &&
          React.default.createElement(MesDonnees, {
            moi,
            d,
            setMoi,
            ouvrirLegal,
          }),
      )
    : React.default.createElement(
        "div",
        { className: "wrap" },
        React.default.createElement(Deco, null),
        React.default.createElement(Bientot, null),
      );
}
