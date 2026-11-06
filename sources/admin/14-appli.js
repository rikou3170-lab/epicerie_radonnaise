var T9 = /(\d{1,3})\s*[,.]\s*(\d{2})\s*(?:€|e|eur)?\s*$/i,
  CS = (t) => (t == null || t === "" || isNaN(t) ? "" : Number(t).toFixed(2).replace(".", ",") + " \u20AC");
function GrilleMenuSemaine(t, e = new Date()) {
  let n = t
      .map((T) => ({
        text: String(T.text || "")
          .replace(/\s+/g, " ")
          .trim(),
        y: T.y,
      }))
      .filter((T) => T.text),
    r = [],
    i = null,
    s = -1;
  n.forEach((T, M) => {
    if (!i && /semaine|du .* au /i.test(X2(T.text))) {
      let V = A9(T.text, e);
      V && ((i = V), (s = M));
    }
  }),
    i || r.push("dates");
  let o = n.slice(s + 1),
    a = [];
  o.forEach((T) => {
    let M = T.text.split(" "),
      V = -1,
      O = 0;
    for (; O < Math.min(2, M.length) && ((V = J2(M[O], _f)), !(V >= 0)); O++);
    let b = V >= 0 ? M.slice(O + 1).join(" ") : T.text,
      v = null,
      x = b.match(T9);
    x && ((v = +(x[1] + "." + x[2])), (b = b.slice(0, x.index))),
      (b = b.replace(/^[^A-Za-zÀ-ÿ0-9]+|[^A-Za-zÀ-ÿ0-9)]+$/g, "").trim()),
      a.push({ y: T.y, j: V, prix: v, texte: b });
  });
  let u = a.filter((T) => T.j >= 0 || T.prix != null);
  if (
    (u.forEach((T, M) => {
      if (T.j < 0) {
        let V = u
          .slice(0, M)
          .reverse()
          .find((O) => O.j >= 0);
        (T.j = V ? Math.min(6, V.j + (M - u.indexOf(V))) : M), (T.devine = !0);
      }
    }),
    !u.length)
  )
    return { ...i, jours: [], message: "", doutes: [...r, "jours"] };
  let d = u
      .slice(1)
      .map((T, M) => T.y - u[M].y)
      .filter((T) => T > 0)
      .sort((T, M) => T - M),
    h = d.length ? d[Math.floor(d.length / 2)] : 100,
    p = u[u.length - 1].y + h * 0.6,
    m = u.map((T) => ({ j: T.j, lignes: [{ y: T.y, t: T.texte }], prix: T.prix, devine: !!T.devine }));
  a.forEach((T) => {
    if (
      T.j >= 0 ||
      T.prix != null ||
      (T.texte.match(/[A-Za-zÀ-ÿ]/g) || []).length < 3 ||
      T.y > p ||
      T.y < u[0].y - h * 0.6
    )
      return;
    let M = m[0],
      V = 1e9;
    m.forEach((O, b) => {
      let v = Math.abs(u[b].y - T.y);
      v < V && ((V = v), (M = O));
    }),
      M.lignes.push({ y: T.y, t: T.texte });
  });
  let w = o
      .filter((T) => T.y > p + h * 0.3)
      .map((T) => T.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 240),
    E = {};
  m.forEach((T) => {
    T.prix != null && (E[T.prix] = (E[T.prix] || 0) + 1);
  });
  let A = Object.keys(E).sort((T, M) => E[M] - E[T])[0],
    S = m.map((T) => {
      let M = T.lignes
          .sort((O, b) => O.y - b.y)
          .map((O) => O.t)
          .filter(Boolean).join(`
`),
        V = T.prix ?? (A != null ? Number(A) : null);
      return (
        (T.prix == null || (A != null && E[A] >= 3 && T.prix !== Number(A))) && r.push("prix-" + T.j),
        T.devine && r.push("jour-" + T.j),
        M || r.push("plat-" + T.j),
        { j: T.j, plat: M, prix: V }
      );
    }),
    _ = new Set(),
    I = S.filter((T) => !_.has(T.j) && _.add(T.j)).sort((T, M) => T.j - M.j);
  return { ...(i || {}), jours: I, message: w, doutes: r };
}
var I9 = () => On(new Date()),
  Z2 = (t) => (new Date(t + "T12:00").getDay() + 6) % 7,
  R2 = (t, e) => {
    let n = new Date(t.du + "T12:00");
    return n.setDate(n.getDate() + (e - Z2(t.du))), On(n);
  },
  ew = (t, e = I9()) =>
    !!(t && t.actif !== !1 && t.du && t.au && Array.isArray(t.jours) && t.jours.length && e <= t.au);
var Tf = (t) => (_f[t] ? _f[t][0].toUpperCase() + _f[t].slice(1) : ""),
  dateFr = (t) =>
    new Date(t + "T12:00")
      .toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
      .replace(/^1 /, "1er ");
var Pe = en(hn());
var k9 = ({ plat: plat }) => {
  let [e, ...n] = String(plat || "")
    .split(
      `
`,
    )
    .map((r) => r.trim())
    .filter(Boolean);
  return Pe.default.createElement(
    Pe.default.Fragment,
    null,
    Pe.default.createElement("div", { className: "mn-plat" }, e),
    !!n.length && Pe.default.createElement("div", { className: "mn-acc" }, n.join(" \xB7 ")),
  );
};
function FeuilleMenu({
  menu: menu,
  onClose: onClose,
  aujourdhui: aujourdhui = On(new Date()),
  apercu: apercu,
}) {
  if (
    ((0, Pe.useEffect)(() => {
      if (apercu) return;
      let o = (a) => a.key === "Escape" && onClose?.();
      return addEventListener("keydown", o), () => removeEventListener("keydown", o);
    }, []),
    !menu?.jours?.length)
  )
    return null;
  let i = aujourdhui >= menu.du && aujourdhui <= menu.au ? Z2(aujourdhui) : -1,
    s = Pe.default.createElement(
      "div",
      { className: "mn-feuille", onClick: (o) => o.stopPropagation() },
      Pe.default.createElement(
        "div",
        { className: "mn-tete" },
        Pe.default.createElement(
          "div",
          { className: "mn-four" },
          "Plats cuisin\xE9s par la charcuterie ",
          Af.replace("Charcuterie ", ""),
        ),
        Pe.default.createElement("div", { className: "mn-titre" }, "Menu de la semaine"),
        Pe.default.createElement(
          "div",
          { className: "mn-dates" },
          Pe.default.createElement("i", null),
          "du ",
          dateFr(menu.du),
          " au ",
          dateFr(menu.au),
          Pe.default.createElement("i", null),
        ),
      ),
      Pe.default.createElement(
        "div",
        { className: "mn-liste" },
        menu.jours
          .filter((o) => o.plat)
          .map((o) => {
            let a = i >= 0 ? o.j < i : aujourdhui > R2(menu, o.j);
            return Pe.default.createElement(
              "div",
              { key: o.j, className: "mn-ligne" + (o.j === i ? " auj" : "") + (a ? " passe" : "") },
              Pe.default.createElement(
                "div",
                { className: "mn-jour" },
                Pe.default.createElement("span", null, Tf(o.j)),
                Pe.default.createElement("small", null, dateFr(R2(menu, o.j))),
              ),
              Pe.default.createElement(
                "div",
                { className: "mn-desc" },
                Pe.default.createElement(k9, { plat: o.plat }),
                o.j === i && Pe.default.createElement("span", { className: "mn-auj" }, "Aujourd'hui"),
              ),
              o.prix != null && Pe.default.createElement("div", { className: "mn-px" }, CS(o.prix)),
            );
          }),
      ),
      !!menu.message &&
        Pe.default.createElement("div", { className: "mn-msg" }, "\xAB ", menu.message, " \xBB"),
      Pe.default.createElement(
        "div",
        { className: "mn-pied" },
        "Plats \xE0 retrouver \xE0 l'\xE9picerie, dans la limite des quantit\xE9s disponibles",
      ),
      !apercu && Pe.default.createElement("button", { className: "mn-fermer", onClick: onClose }, "Fermer"),
    );
  return apercu
    ? Pe.default.createElement("div", { className: "mn-apercu" }, s)
    : Pe.default.createElement(
        "div",
        { className: "mn-fond", onClick: onClose, role: "dialog", "aria-label": "Menu de la semaine" },
        s,
      );
}
