/* ═══════════════════════════════════════════════════════════════════════
 *  ROUE DE NOËL (2/2) — la roue animée (intro, lancement, résultat, confettis) et le tirage au sort des gagnants.
 * ═══════════════════════════════════════════════════════════════════════ */

// Confettis quand on gagne.
function vk() {
  let t = ["#F6D47A", "#C9E38A", "#E05A73", "#FFFFFF", "#F2C14E", "#3E8E3A"];
  return wt.default.createElement(
    "div",
    { className: "roue-confetti", "aria-hidden": "true" },
    Array.from({ length: 60 }, (e, n) =>
      wt.default.createElement("i", {
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

// Tirage : nom affiché d'un client, et mélange équitable de la liste.
var yi = (t) => String(t?.nom || t?.prenom || "").trim() || "Client",
  yk = (t) => {
    let e = [...t];
    for (let n = e.length - 1; n > 0; n--) {
      let r = Math.floor(bE() * (n + 1));
      [e[n], e[r]] = [e[r], e[n]];
    }
    return e;
  };

// Animation du tirage au sort (les noms défilent puis s'arrêtent sur le gagnant).
function TirageAuSort({ participants, gagnant, onFin }) {
  let [i, o] = (0, wt.useState)(0),
    [s, a] = (0, wt.useState)(!1),
    u = (0, wt.useRef)(null);
  if (!u.current) {
    let c = [];
    for (let h = 0; h < 3 || c.length < 40; h++) c.push(...yk(participants).map(yi));
    let d = yi(gagnant),
      f = c.length - 1;
    if (c[f] === d) {
      let h = c
        .slice(0, f)
        .map((B, _) => (B !== d ? _ : -1))
        .filter((B) => B >= f - 6)
        .pop();
      h != null && h >= 0 && ([c[f], c[h]] = [c[h], c[f]]);
    }
    c.push(d, "", ""), (u.current = c);
  }
  return (
    (0, wt.useEffect)(() => {
      Ek();
      let c = u.current.length - 3,
        d = c * 70,
        f = 1e4,
        h = performance.now(),
        B = 0,
        _,
        b = (O) => {
          let C = Math.min(1, (O - h) / f),
            m = 1 - Math.pow(1 - C, 3.2),
            g = d * m;
          o(g);
          let k = Math.floor(g / 70);
          k !== B && ((B = k), gk(0.8)), C < 1 ? (_ = requestAnimationFrame(b)) : (a(!0), Ak(!0), onFin?.());
        };
      return (_ = requestAnimationFrame(b)), () => cancelAnimationFrame(_);
    }, []),
    wt.default.createElement(
      "div",
      { className: "tir" },
      s && wt.default.createElement(vk, null),
      wt.default.createElement(
        "div",
        { className: "tir-fen" },
        wt.default.createElement("div", { className: "tir-cadre" }),
        u.current.map((c, d) =>
          wt.default.createElement(
            "div",
            { key: d, className: "tir-nom", style: { top: 70 + d * 70 - i } },
            c,
          ),
        ),
      ),
      s && wt.default.createElement("div", { className: "tir-gagnant" }, "Bravo ", yi(gagnant), " !"),
    )
  );
}
