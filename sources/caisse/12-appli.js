var wt = vn(Pn()),
  ev = {
    active: !1,
    debut: "2026-12-01",
    fin: "2026-12-24",
    periode: 0,
    annonce: null,
    tirages: [
      { id: "t1", date: "2026-12-15", titre: "Tirage de mi-d\xE9cembre" },
      { id: "t2", date: "2026-12-24", titre: "Grand tirage du 24 d\xE9cembre" },
    ],
  },
  $s = (t) => ({
    ...ev,
    ...(t || {}),
    tirages: Array.isArray(t?.tirages) ? t.tirages : ev.tirages,
    periode: Number(t?.periode) || 0,
  }),
  fk = (t = new Date()) => t.toLocaleDateString("sv-SE"),
  tv = (t, e = new Date()) => {
    let n = $s(t),
      r = fk(e);
    return !!n.active && (!n.debut || r >= n.debut) && (!n.fin || r <= n.fin);
  },
  bE = () => {
    let t = new Uint32Array(1);
    return crypto.getRandomValues(t), t[0] / 4294967296;
  },
  nv = () => bE() < 0.5,
  pk = (t, e) => (t && Number(t.roueP) === $s(e).periode && Number(t.roueG)) || 0,
  mk = (t) =>
    String(
      t?.prenom ||
        String(t?.nom || "")
          .trim()
          .split(/\s+/)[0] ||
        "Client",
    ).trim();
