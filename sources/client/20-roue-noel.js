/* ═══════════════════════════════════════════════════════════════════════
 *  ROUE DE NOËL (2/2) — la roue animée (intro, lancement, résultat, confettis) et le tirage au sort des gagnants.
 * ═══════════════════════════════════════════════════════════════════════ */

// Confettis quand on gagne.
function jM() {
  let t = ["#F6D47A", "#C9E38A", "#E05A73", "#FFFFFF", "#F2C14E", "#3E8E3A"];
  return W.default.createElement(
    "div",
    { className: "roue-confetti", "aria-hidden": "true" },
    Array.from({ length: 60 }, (e, n) =>
      W.default.createElement("i", {
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
var UM = () =>
  W.default.createElement(
    "div",
    { className: "roue-etoiles", "aria-hidden": "true" },
    Array.from({ length: 18 }, (t, e) =>
      W.default.createElement("i", {
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
  let [s, l] = (0, W.useState)(0),
    [u, d] = (0, W.useState)(premiere ? "intro" : "pret"),
    [h, f] = VM(),
    m = tours[s],
    E = () => {
      MM(),
        d("tourne"),
        f(!!m?.g, () => {
          LM(!!m?.g), d("res");
        });
    },
    F = () => {
      s + 1 < tours.length ? (l(s + 1), d("pret")) : onFini?.();
    },
    D = tours.length - s - 1;
  return u === "regl"
    ? W.default.createElement(
        "div",
        { className: "roue-fond" },
        W.default.createElement(
          "div",
          { className: "roue-in" },
          W.default.createElement(ReglementRoue, {
            onClose: () => d(premiere && s === 0 ? "intro" : "pret"),
          }),
        ),
      )
    : u === "refus"
      ? W.default.createElement(
          "div",
          { className: "roue-fond" },
          W.default.createElement(
            "div",
            { className: "roue-in" },
            W.default.createElement("h2", null, "C'est noté"),
            W.default.createElement(
              "p",
              null,
              "La roue de Noël ne s'affichera plus. Si vous changez d'avis, vous pourrez la réactiver dans l'onglet Fidélité, rubrique « Mes données ».",
            ),
            W.default.createElement(
              "button",
              { className: "roue-b", onClick: () => onRefus?.() },
              "D'accord",
            ),
          ),
        )
      : W.default.createElement(
          "div",
          { className: "roue-fond", role: "dialog", "aria-modal": "true", "aria-label": "Roue de Noël" },
          W.default.createElement(BM, { vite: u === "tourne" }),
          W.default.createElement(UM, null),
          u === "res" && m?.g && W.default.createElement(jM, { key: s }),
          W.default.createElement(
            "div",
            { className: "roue-in" },
            W.default.createElement("h2", null, "La roue de Noël"),
            u === "intro"
              ? W.default.createElement(
                  W.default.Fragment,
                  null,
                  W.default.createElement(
                    "p",
                    null,
                    W.default.createElement("b", null, "Chaque tampon en caisse vous offre un tour de roue."),
                    " Une part « Gagné » ? Vous recevez un ticket pour le tirage au sort de Noël. Plus vous gagnez, plus vous avez de chances !",
                  ),
                  W.default.createElement(RoueSvg, { angle: h, taille: 250 }),
                  W.default.createElement(
                    "button",
                    { className: "roue-b", onClick: () => d("pret") },
                    "🎄 Je participe",
                  ),
                  W.default.createElement(
                    "button",
                    { className: "roue-lien", onClick: () => d("refus") },
                    "Je ne souhaite pas participer à la roue de Noël",
                  ),
                  W.default.createElement(
                    "button",
                    { className: "roue-lien", onClick: () => d("regl") },
                    "Règlement du jeu",
                  ),
                )
              : W.default.createElement(
                  W.default.Fragment,
                  null,
                  W.default.createElement(
                    "p",
                    null,
                    tours.length > 1
                      ? W.default.createElement(
                          W.default.Fragment,
                          null,
                          "Tour ",
                          s + 1,
                          " sur ",
                          tours.length,
                          " : merci pour votre passage !",
                        )
                      : W.default.createElement(
                          W.default.Fragment,
                          null,
                          "Merci pour votre passage : un tour de roue pour vous !",
                        ),
                  ),
                  W.default.createElement(RoueSvg, { angle: h, taille: 290, tourne: u === "tourne" }),
                  u === "pret" &&
                    W.default.createElement(
                      "button",
                      { className: "roue-b", onClick: E },
                      "🎡 Lancer la roue",
                    ),
                  u === "tourne" &&
                    W.default.createElement("div", { className: "roue-cpt" }, "La roue tourne…"),
                  u === "res" &&
                    W.default.createElement(
                      W.default.Fragment,
                      null,
                      W.default.createElement(
                        "div",
                        { className: "roue-res " + (m?.g ? "g" : "p") },
                        m?.g ? "🎉 Gagné !" : "Perdu… pas cette fois",
                      ),
                      W.default.createElement(
                        "p",
                        null,
                        m?.g
                          ? "Un ticket de plus pour le prochain tirage au sort de Noël !"
                          : "Revenez vite : chaque tampon vous offre un nouveau tour.",
                      ),
                      D === 0 &&
                        tickets != null &&
                        W.default.createElement(
                          "div",
                          { className: "roue-cpt" },
                          "Vos tickets pour le prochain tirage : ",
                          W.default.createElement("b", null, tickets),
                        ),
                      W.default.createElement(
                        "button",
                        { className: "roue-b", onClick: F },
                        D > 0 ? "Tour suivant ➜" : demo ? "Fermer la démo" : "Fermer",
                      ),
                    ),
                  u !== "tourne" &&
                    u !== "res" &&
                    W.default.createElement(
                      W.default.Fragment,
                      null,
                      W.default.createElement(
                        "button",
                        { className: "roue-lien", onClick: () => d("regl") },
                        "Règlement du jeu",
                      ),
                      !demo &&
                        W.default.createElement(
                          "button",
                          { className: "roue-lien", onClick: () => d("refus") },
                          "Je ne souhaite pas participer à la roue de Noël",
                        ),
                    ),
                ),
          ),
        );
}
