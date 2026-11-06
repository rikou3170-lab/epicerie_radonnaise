/* ═══════════════════════════════════════════════════════════════════════
 *  ROUE DE NOËL (2/2) — la roue animée (intro, lancement, résultat, confettis) et le tirage au sort des gagnants.
 * ═══════════════════════════════════════════════════════════════════════ */

// Confettis quand on gagne.
function $S() {
  let t = ["#F6D47A", "#C9E38A", "#E05A73", "#FFFFFF", "#F2C14E", "#3E8E3A"];
  return K.default.createElement(
    "div",
    { className: "roue-confetti", "aria-hidden": "true" },
    Array.from({ length: 60 }, (e, n) =>
      K.default.createElement("i", {
        key: n,
        style: {
          left: ((n * 37) % 100) + "%",
          background: t[n % t.length],
          animationDelay: (n % 12) * 0.08 + "s",
          animationDuration: 2 + (n % 5) * 0.3 + "s",
        },
      }),
    ),
  );
}

// Étoiles scintillantes autour de la roue.
var B9 = () =>
  K.default.createElement(
    "div",
    { className: "roue-etoiles", "aria-hidden": "true" },
    Array.from({ length: 18 }, (t, e) =>
      K.default.createElement("i", {
        key: e,
        style: {
          left: ((e * 53) % 97) + 1.5 + "%",
          top: 12 + ((e * 37) % 85) + "%",
          animationDelay: (e % 6) * 0.4 + "s",
        },
      }),
    ),
  );

// La roue de Noël : introduction, lancement, rotation, résultat (gagné / perdu) et confettis.
function RoueNoel({ tours, tickets, onFini, onRefus, demo, premiere }) {
  let [o, a] = (0, K.useState)(0),
    [u, d] = (0, K.useState)(premiere ? "intro" : "pret"),
    [h, p] = L9(),
    m = tours[o],
    w = () => {
      zS(),
        d("tourne"),
        p(!!m?.g, () => {
          US(!!m?.g), d("res");
        });
    },
    E = () => {
      o + 1 < tours.length ? (a(o + 1), d("pret")) : onFini?.();
    },
    A = tours.length - o - 1;
  return u === "regl"
    ? K.default.createElement(
        "div",
        { className: "roue-fond" },
        K.default.createElement(
          "div",
          { className: "roue-in" },
          K.default.createElement(ReglementRoue, {
            onClose: () => d(premiere && o === 0 ? "intro" : "pret"),
          }),
        ),
      )
    : u === "refus"
      ? K.default.createElement(
          "div",
          { className: "roue-fond" },
          K.default.createElement(
            "div",
            { className: "roue-in" },
            K.default.createElement("h2", null, "C'est noté"),
            K.default.createElement(
              "p",
              null,
              "La roue de Noël ne s'affichera plus. Si vous changez d'avis, vous pourrez la réactiver dans l'onglet Fidélité, rubrique « Mes données ».",
            ),
            K.default.createElement(
              "button",
              { className: "roue-b", onClick: () => onRefus?.() },
              "D'accord",
            ),
          ),
        )
      : K.default.createElement(
          "div",
          { className: "roue-fond", role: "dialog", "aria-modal": "true", "aria-label": "Roue de Noël" },
          K.default.createElement(M9, { vite: u === "tourne" }),
          K.default.createElement(B9, null),
          u === "res" && m?.g && K.default.createElement($S, { key: o }),
          K.default.createElement(
            "div",
            { className: "roue-in" },
            K.default.createElement("h2", null, "La roue de Noël"),
            u === "intro"
              ? K.default.createElement(
                  K.default.Fragment,
                  null,
                  K.default.createElement(
                    "p",
                    null,
                    K.default.createElement("b", null, "Chaque tampon en caisse vous offre un tour de roue."),
                    " Une part « Gagné » ? Vous recevez un ticket pour le tirage au sort de Noël. Plus vous gagnez, plus vous avez de chances !",
                  ),
                  K.default.createElement(RoueSvg, { angle: h, taille: 250 }),
                  K.default.createElement(
                    "button",
                    { className: "roue-b", onClick: () => d("pret") },
                    "🎄 Je participe",
                  ),
                  K.default.createElement(
                    "button",
                    { className: "roue-lien", onClick: () => d("refus") },
                    "Je ne souhaite pas participer à la roue de Noël",
                  ),
                  K.default.createElement(
                    "button",
                    { className: "roue-lien", onClick: () => d("regl") },
                    "Règlement du jeu",
                  ),
                )
              : K.default.createElement(
                  K.default.Fragment,
                  null,
                  K.default.createElement(
                    "p",
                    null,
                    tours.length > 1
                      ? K.default.createElement(
                          K.default.Fragment,
                          null,
                          "Tour ",
                          o + 1,
                          " sur ",
                          tours.length,
                          " : merci pour votre passage !",
                        )
                      : K.default.createElement(
                          K.default.Fragment,
                          null,
                          "Merci pour votre passage : un tour de roue pour vous !",
                        ),
                  ),
                  K.default.createElement(RoueSvg, { angle: h, taille: 290, tourne: u === "tourne" }),
                  u === "pret" &&
                    K.default.createElement(
                      "button",
                      { className: "roue-b", onClick: w },
                      "🎡 Lancer la roue",
                    ),
                  u === "tourne" &&
                    K.default.createElement("div", { className: "roue-cpt" }, "La roue tourne…"),
                  u === "res" &&
                    K.default.createElement(
                      K.default.Fragment,
                      null,
                      K.default.createElement(
                        "div",
                        { className: "roue-res " + (m?.g ? "g" : "p") },
                        m?.g ? "🎉 Gagné !" : "Perdu… pas cette fois",
                      ),
                      K.default.createElement(
                        "p",
                        null,
                        m?.g
                          ? "Un ticket de plus pour le prochain tirage au sort de Noël !"
                          : "Revenez vite : chaque tampon vous offre un nouveau tour.",
                      ),
                      A === 0 &&
                        tickets != null &&
                        K.default.createElement(
                          "div",
                          { className: "roue-cpt" },
                          "Vos tickets pour le prochain tirage : ",
                          K.default.createElement("b", null, tickets),
                        ),
                      K.default.createElement(
                        "button",
                        { className: "roue-b", onClick: E },
                        A > 0 ? "Tour suivant ➜" : demo ? "Fermer la démo" : "Fermer",
                      ),
                    ),
                  u !== "tourne" &&
                    u !== "res" &&
                    K.default.createElement(
                      K.default.Fragment,
                      null,
                      K.default.createElement(
                        "button",
                        { className: "roue-lien", onClick: () => d("regl") },
                        "Règlement du jeu",
                      ),
                      !demo &&
                        K.default.createElement(
                          "button",
                          { className: "roue-lien", onClick: () => d("refus") },
                          "Je ne souhaite pas participer à la roue de Noël",
                        ),
                    ),
                ),
          ),
        );
}

// Tirage : nom affiché d'un client, et mélange équitable de la liste.
var iw = (t) => String(t?.nom || t?.prenom || "").trim() || "Client",
  V9 = (t) => {
    let e = [...t];
    for (let n = e.length - 1; n > 0; n--) {
      let r = Math.floor(sw() * (n + 1));
      [e[n], e[r]] = [e[r], e[n]];
    }
    return e;
  };

// Animation du tirage au sort (les noms défilent puis s'arrêtent sur le gagnant).
function TirageAuSort({ participants, gagnant, onFin }) {
  let [i, s] = (0, K.useState)(0),
    [o, a] = (0, K.useState)(!1),
    u = (0, K.useRef)(null);
  if (!u.current) {
    let d = [];
    for (let m = 0; m < 3 || d.length < 40; m++) d.push(...V9(participants).map(iw));
    let h = iw(gagnant),
      p = d.length - 1;
    if (d[p] === h) {
      let m = d
        .slice(0, p)
        .map((w, E) => (w !== h ? E : -1))
        .filter((w) => w >= p - 6)
        .pop();
      m != null && m >= 0 && ([d[p], d[m]] = [d[m], d[p]]);
    }
    d.push(h, "", ""), (u.current = d);
  }
  return (
    (0, K.useEffect)(() => {
      zS();
      let d = u.current.length - 3,
        h = d * 70,
        p = 1e4,
        m = performance.now(),
        w = 0,
        E,
        A = (S) => {
          let _ = Math.min(1, (S - m) / p),
            I = 1 - Math.pow(1 - _, 3.2),
            T = h * I;
          s(T);
          let M = Math.floor(T / 70);
          M !== w && ((w = M), jS(0.8)), _ < 1 ? (E = requestAnimationFrame(A)) : (a(!0), US(!0), onFin?.());
        };
      return (E = requestAnimationFrame(A)), () => cancelAnimationFrame(E);
    }, []),
    K.default.createElement(
      "div",
      { className: "tir" },
      o && K.default.createElement($S, null),
      K.default.createElement(
        "div",
        { className: "tir-fen" },
        K.default.createElement("div", { className: "tir-cadre" }),
        u.current.map((d, h) =>
          K.default.createElement(
            "div",
            { key: h, className: "tir-nom", style: { top: 70 + h * 70 - i } },
            d,
          ),
        ),
      ),
      o && K.default.createElement("div", { className: "tir-gagnant" }, "Bravo ", iw(gagnant), " !"),
    )
  );
}
