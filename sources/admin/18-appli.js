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
function GS({ tours: t, tickets: e, onFini: n, onRefus: r, demo: i, premiere: s }) {
  let [o, a] = (0, K.useState)(0),
    [u, d] = (0, K.useState)(s ? "intro" : "pret"),
    [h, p] = L9(),
    m = t[o],
    w = () => {
      (zS(),
        d("tourne"),
        p(!!m?.g, () => {
          (US(!!m?.g), d("res"));
        }));
    },
    E = () => {
      o + 1 < t.length ? (a(o + 1), d("pret")) : n?.();
    },
    A = t.length - o - 1;
  return u === "regl"
    ? K.default.createElement(
        "div",
        { className: "roue-fond" },
        K.default.createElement(
          "div",
          { className: "roue-in" },
          K.default.createElement(O9, { onClose: () => d(s && o === 0 ? "intro" : "pret") }),
        ),
      )
    : u === "refus"
      ? K.default.createElement(
          "div",
          { className: "roue-fond" },
          K.default.createElement(
            "div",
            { className: "roue-in" },
            K.default.createElement("h2", null, "C'est not\xE9"),
            K.default.createElement(
              "p",
              null,
              "La roue de No\xEBl ne s'affichera plus. Si vous changez d'avis, vous pourrez la r\xE9activer dans l'onglet Fid\xE9lit\xE9, rubrique \xAB Mes donn\xE9es \xBB.",
            ),
            K.default.createElement("button", { className: "roue-b", onClick: () => r?.() }, "D'accord"),
          ),
        )
      : K.default.createElement(
          "div",
          { className: "roue-fond", role: "dialog", "aria-modal": "true", "aria-label": "Roue de No\xEBl" },
          K.default.createElement(M9, { vite: u === "tourne" }),
          K.default.createElement(B9, null),
          u === "res" && m?.g && K.default.createElement($S, { key: o }),
          K.default.createElement(
            "div",
            { className: "roue-in" },
            K.default.createElement("h2", null, "La roue de No\xEBl"),
            u === "intro"
              ? K.default.createElement(
                  K.default.Fragment,
                  null,
                  K.default.createElement(
                    "p",
                    null,
                    K.default.createElement("b", null, "Chaque tampon en caisse vous offre un tour de roue."),
                    " Une part \xAB Gagn\xE9 \xBB ? Vous recevez un ticket pour le tirage au sort de No\xEBl. Plus vous gagnez, plus vous avez de chances !",
                  ),
                  K.default.createElement(OS, { angle: h, taille: 250 }),
                  K.default.createElement(
                    "button",
                    { className: "roue-b", onClick: () => d("pret") },
                    "\u{1F384} Je participe",
                  ),
                  K.default.createElement(
                    "button",
                    { className: "roue-lien", onClick: () => d("refus") },
                    "Je ne souhaite pas participer \xE0 la roue de No\xEBl",
                  ),
                  K.default.createElement(
                    "button",
                    { className: "roue-lien", onClick: () => d("regl") },
                    "R\xE8glement du jeu",
                  ),
                )
              : K.default.createElement(
                  K.default.Fragment,
                  null,
                  K.default.createElement(
                    "p",
                    null,
                    t.length > 1
                      ? K.default.createElement(
                          K.default.Fragment,
                          null,
                          "Tour ",
                          o + 1,
                          " sur ",
                          t.length,
                          " : merci pour votre passage !",
                        )
                      : K.default.createElement(
                          K.default.Fragment,
                          null,
                          "Merci pour votre passage : un tour de roue pour vous !",
                        ),
                  ),
                  K.default.createElement(OS, { angle: h, taille: 290, tourne: u === "tourne" }),
                  u === "pret" &&
                    K.default.createElement(
                      "button",
                      { className: "roue-b", onClick: w },
                      "\u{1F3A1} Lancer la roue",
                    ),
                  u === "tourne" &&
                    K.default.createElement("div", { className: "roue-cpt" }, "La roue tourne\u2026"),
                  u === "res" &&
                    K.default.createElement(
                      K.default.Fragment,
                      null,
                      K.default.createElement(
                        "div",
                        { className: "roue-res " + (m?.g ? "g" : "p") },
                        m?.g ? "\u{1F389} Gagn\xE9 !" : "Perdu\u2026 pas cette fois",
                      ),
                      K.default.createElement(
                        "p",
                        null,
                        m?.g
                          ? "Un ticket de plus pour le prochain tirage au sort de No\xEBl !"
                          : "Revenez vite : chaque tampon vous offre un nouveau tour.",
                      ),
                      A === 0 &&
                        e != null &&
                        K.default.createElement(
                          "div",
                          { className: "roue-cpt" },
                          "Vos tickets pour le prochain tirage : ",
                          K.default.createElement("b", null, e),
                        ),
                      K.default.createElement(
                        "button",
                        { className: "roue-b", onClick: E },
                        A > 0 ? "Tour suivant \u279C" : i ? "Fermer la d\xE9mo" : "Fermer",
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
                        "R\xE8glement du jeu",
                      ),
                      !i &&
                        K.default.createElement(
                          "button",
                          { className: "roue-lien", onClick: () => d("refus") },
                          "Je ne souhaite pas participer \xE0 la roue de No\xEBl",
                        ),
                    ),
                ),
          ),
        );
}
var iw = (t) => String(t?.nom || t?.prenom || "").trim() || "Client",
  V9 = (t) => {
    let e = [...t];
    for (let n = e.length - 1; n > 0; n--) {
      let r = Math.floor(sw() * (n + 1));
      [e[n], e[r]] = [e[r], e[n]];
    }
    return e;
  };
function HS({ participants: t, gagnant: e, onFin: n }) {
  let [i, s] = (0, K.useState)(0),
    [o, a] = (0, K.useState)(!1),
    u = (0, K.useRef)(null);
  if (!u.current) {
    let d = [];
    for (let m = 0; m < 3 || d.length < 40; m++) d.push(...V9(t).map(iw));
    let h = iw(e),
      p = d.length - 1;
    if (d[p] === h) {
      let m = d
        .slice(0, p)
        .map((w, E) => (w !== h ? E : -1))
        .filter((w) => w >= p - 6)
        .pop();
      m != null && m >= 0 && ([d[p], d[m]] = [d[m], d[p]]);
    }
    (d.push(h, "", ""), (u.current = d));
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
          (M !== w && ((w = M), jS(0.8)), _ < 1 ? (E = requestAnimationFrame(A)) : (a(!0), US(!0), n?.()));
        };
      return ((E = requestAnimationFrame(A)), () => cancelAnimationFrame(E));
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
      o && K.default.createElement("div", { className: "tir-gagnant" }, "Bravo ", iw(e), " !"),
    )
  );
}
var KS = {
    active: !0,
    delaiMin: 2,
    horizon: 60,
    jours: [0, 1, 2, 3, 4, 5, 6],
    fermes: [],
    mode: "retrait",
    note: "",
    heureDefaut: "17:00",
    script: "",
  },
  Er = (t) => ({ ...KS, ...(t || {}) }),
  lw = (t) => /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(t || ""),
  ac = lw,
  QS = [
    [1, "Lun"],
    [2, "Mar"],
    [3, "Mer"],
    [4, "Jeu"],
    [5, "Ven"],
    [6, "Sam"],
    [0, "Dim"],
  ],
  uw = { retrait: "Retrait \xE0 l'\xE9picerie", livraison: "Livraison" },
  An = (t) => (Math.round((Number(t) || 0) * 100) / 100).toFixed(2).replace(".", ",") + " \u20AC",
  ow = (t) => t.toLocaleDateString("sv-SE"),
  aw = (t) => {
    let e = new Date();
    return (e.setHours(12, 0, 0, 0), e.setDate(e.getDate() + t), e);
  },
  Yi = (t) =>
    t
      ? new Date(t + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
      : "";
function YS(t, e = []) {
  let n = Er(t),
    r = ow(aw(Math.max(0, Number(n.delaiMin) || 0))),
    i = ow(aw(Math.max(1, Number(n.horizon) || 60))),
    s = Array.isArray(n.jours) && n.jours.length ? n.jours : KS.jours,
    o = (d) => [...(n.fermes || []), ...(e || [])].some((h) => h && h.du && d >= h.du && d <= (h.au || h.du)),
    a = (d) => d >= r && d <= i && s.includes(new Date(d + "T12:00").getDay()) && !o(d),
    u = "";
  for (let d = 0; d <= 400; d++) {
    let h = ow(aw((Number(n.delaiMin) || 0) + d));
    if (h > i) break;
    if (a(h)) {
      u = h;
      break;
    }
  }
  return { min: r, max: i, ok: a, premiere: u };
}
var Ji = (t) => Number(String(t?.prixPersonne ?? "").replace(",", ".")) || 0,
  If = (t) => {
    let e = Math.max(1, parseInt(t?.partsMin) || 1),
      n = Math.max(e, parseInt(t?.partsMax) || 50);
    return [e, n];
  };
async function Pa(t, e, n) {
  let r = Er(t).script;
  if (!(!lw(r) || !n || !["cmd", "msg", "diff"].includes(e)))
    try {
      await fetch(r + "?push=" + e + "&id=" + encodeURIComponent(n), {
        method: "GET",
        mode: "no-cors",
        redirect: "follow",
      });
    } catch {}
}
var JS = (t) => {
    let e = Er(t).script;
    return lw(e) ? e + "?test=1" : "";
  },
  lc = (t) => (t ? t.replace(":", "h") : ""),
  er = (t) => t.dateRetrait || t.date;
function kf(t) {
  let e = t?.choix,
    n = ((e && e.options) || [])
      .filter((s) => s && String(s.nom || "").trim())
      .map((s) => ({ nom: String(s.nom).trim(), supp: Number(String(s.supp ?? 0).replace(",", ".")) || 0 }));
  if (!n.length) return null;
  let r = Math.max(0, parseInt(e.min) || 0),
    i = Math.min(n.length, Math.max(r || 1, parseInt(e.max) || n.length));
  return { titre: (e.titre || "").trim() || "Au choix", min: r, max: i, options: n };
}
var XS = (t, e = []) => {
    let n = kf(t);
    return Ji(t) + (n ? n.options.filter((r) => e.includes(r.nom)).reduce((r, i) => r + i.supp, 0) : 0);
  },
  ZS = {
    titre: "Vos fromages \xE0 raclette",
    min: 1,
    max: 3,
    options: [
      "Raclette nature",
      "Raclette au fenugrec",
      "Raclette \xE0 l'ail des ours",
      "Raclette aux 5 baies",
      "Raclette Estivale (poivron / tomate)",
      "Raclette \xE0 la cam\xE9line",
      "Morbier",
      "Bargkass nature",
      "Bargkass \xE0 l'ortie",
      "Bargkass au serpolet",
    ].map((t) => ({ nom: t, supp: 0 })),
  };
var yw =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwMDAgQDAwMEBAQFBgoGBgUFBgwICQcKDgwPDg4MDQ0PERYTDxAVEQ0NExoTFRcYGRkZDxIbHRsYHRYYGRj/2wBDAQQEBAYFBgsGBgsYEA0QGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBj/wAARCABoAHgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5wOO9Bx3oOKDitTxQ4zRxmjjNHGaADjNHGaD1rQh0PV7jQrjW4tOnbTrcgS3W3CAkgAZ7nJHSplJR3YGfxmjjNX9P0+O9chpyG2u4jjXc5CKWYnJAAAB5z+FTXmkQx+GrbXrG6aa1luGtJElTY8MqqHwcEgqVbIPsQQO9BYyuM0cZqa1tp729jtbWMySyHCjIHbJOT0AGTmmPFIkskbId0ZIfHOMHH86AGcZo4zRxmjjNIA4zRxmjjNHGaAAY7UUDFFAAaDig0HFMA71oaVoer65cSQ6Tp0920SGSTylyEUDOWPQdDVOOGaZisMMkhA3EIpbA9eK7TwJ4k8Tabp9/oWiJAlvqJCzXEiZaLjaWTkbiASdvJ44FY13UUP3Su/MaOOs7Sa/vI7a2UM7sFyxwq5OMsegGSOTxXpdlJ4rvvhu3gy+EFvpdo8olWMATMyeXKI93IJPm7gAMtsIrIvr7SPDdu1gIbO6uDaJbTQW5KvDMpyzmZcq/8QBGSQ+DggGuPvtTv9RKC+upJlTIRGOVQE5wP89hVTpQqW51ezuvUext+F57fQ/F8t3cxW91ZRW9xbzeaRj54HTgZ5OWxxmtVUmbR7DVI9Lb+wDazvCtrAZYrK92hZDJk8kbVI3H7pTHSuDJVVycADv6VoaJY3uu30emaXIXFwdzAOdmB/E2OwqpTjBOUtEgvZHb6be+Df7Sf7Df29k17G8ZuLuBleCSS4AzxlQiw9ADyS2cCopdET/hDlt9H/cfapS1y8kouGY72EcYKD5m2xs5xwu4+vF/UvAGh6D4Lvr+6lkubuOElZC21Q54GFHue9ebWt9e2KSpZXk9uJhiQROV3geuPqfzrmwmNp4pN09loJSTC6s7qykRLu3eEuu5N4xuXJGR7ZBqDjNdjpviKx1iS0sPE8IljiJSHDiOMZARAf7iJySRnOTxk5FS48Fah/wkkGk2c1u8lxdC1jV5RujLcqJMfKG24JAJIzziumTUU23oFuxzPejvXR+NfCj+C/Ey6LNfR3cwt0lkeNdoDNn5Rnnt+tc53qadSNSKnB6MQDFFAxRVgBoJoNBxTA6PwsNMvbg6NqEF8z3EySQmyZQ0jKGxC2SOGJABHIOODmtXwjrM2i2F5/aEMttpk1yEjdh81rcbWKvGWB+ZNqbiBnHXtXEBirBlJDA5BBwQavaprmta5PHNrWrXuoyRLsja6maQovoMnigaZVuUjivJoo5xOiuQso/jGfvfjUtlp2o6nMYtN0+6vHHVbeFpCPyBrqvhf4Cn+IPj6HSN0kdlEPOu5UHzLGDjav8AtMSAPz7V9q6d4XsvB9hHoun6SmlwxqCIVXBI/vE9WJ9TXhZrnccC+SMeaX4L1LhTctT4CvtE1ayUpqOkX9sCMHzrd0/mK2PgreW2lXuqwXUdxJNEfJhSGFpXYbs4AUH2r7ivhbt8sqF3I471zGjeE4dD8R65rNqHH9rzRTyRbAqxskYT5ceuAa+fr8SrEUZU6lO3o/NeRsqa5JRb3seQ6h4A8bePLdIZY4vD+kgh8XZ3TzHsSi/dHsTXL+I/gD4p0ewa90m7t9ZVBl4YlMcuPZSSG+gOa+rraG2kQt5RyOPmNLNZRshMQ2sOw6GvOoZ9iqFlSso9rfrv+JPsVY/Pl1ZJGjkQo6kqysMEHuCK7bwjqUmszW+g6hPDvRwYJpZPLlZeSYlk2nbk87spwOWwMV6B8ffAkFusfjTTYFjLyCG/RBgMT92T69j+FeExztBcJJDKY5VOVIOCDX6Bl+OhjaCrR67rszFpxdjR16C+h16d9RljlnlJkLxymVSMkcM3JAxgZ7Dv1rM71JNcS3MokmYMwGBhQvH0AqPvXalbREgMUUDFFAATignFBOKCcUwDPNV576C3uord93mSEBQB61YzzWZqunvdTQXUTvvtzuCA43DOT+NTK9tDSkouVpvQ+vP2RoLeys9R1xrdppW1COEqi5YqqZAH4vmvoPxPqq6v4he4SF4kRREFkGG465Hbk18zfsj+LorWTWLG2eN54ZY72ON+pBGxwR7fL+dfQ15dSXuoTXkwUPK5dgvQZr88z2tKNWrRb3kna3Sytr+h0w0hYgIBOSATS1yGq/EvwtpHitvD08moXF3E6R3DWdjLcRWrPjYJXRSEJyDz61154BJ4A714Eqc4JOStcpprcKK5fxHqHj1dWhsPBXhWx1FfJM897qN2YIF5wIl2hmLnrkjAHrXRWb3UmnwSX1sttdNGplgV94jfHKhuM4PGaudCcYKo9mNwaSk9mcR8TbGK/wDhp4ktZANps5HHsyjeD+YFfBxiuP8AhMfMjQGHywz89MjGfrxX3L8XdWOlfCXxJdpgySW7W8Sk4yzkIP518W2lu0Ks0r75ZDudsY/Ae1fZ8Jxl7Cb6c36GLnyXfdWLA9KM80Z5xRnmvrTlAHNFAOaKAAnFBOKCcUE4pgGeaD6UZ5ozzQBv+A/Ez+B/iNY+J7eHeYiY7hF4MsLcOv8AUe4FfdGlapYa3ottq2l3KXFncxiSKVTwQf69iPWvz4PXFekfCz4t6l8Pr02N2kl9ocz7pLYH5oSf4489D6joa+bz/J3i4qtSXvr8V/mawqW0Z9o2z2lvbzKLRPMlO5nAA3HGMn14FcX4i+GvhLxdr39q+I7S8vmFt9mW2+3TRQAZJ3bEYAtzjJ9q0fDvjHw54q0tb/Q9TiuYiOVB+dD6MvUH61D4m8aaF4V077brGow2kXQGTJZz6Ko5P4V8UsRiYzjCOko6JJanb9Ylo09jodNjTSNOgsLAeXbwRLDGh+baqjAHPsKbczbI2kJyx/U1xmkfFLwdrFi1za+JNNKr94TyiBl+qtg1578RvjtpenWUlh4UuotS1KQFRdR/NBbj1B6O3pjj19KqnhMZiZLDqL073su/oZyrPls3oct+0H4xju7618HWMoZbZvtF4VOf3mPlT8AST9RXhw64qSaee6upLm5leWaVi8kjnLMx5JJqPPNfpOX4KODoRox6b+bOKTu7hnmjPNGeaM812iAHNFANFAATQTQaCaYBnmjPNHejvQAZ5oJ5o70GgDPgvtbi1vy4DLZxhwwuLeUoSo5xkHucVrXV5d39x517dz3Mn9+aQufzJquYwTzmjYBwCahQV+a2pc581rKwrKrAq6gg9jWbbWeoQ6mB9qAsYwQkY6nPY/StEoDwSaAgDcEiqauEZuKaXUdnnFGeaM80Z5pkBnmjPNHejvSAAaKAaKAA0HNFFMA70d6KKQB3o5zRRQAc5o5zRRTAO9HOaKKADnNHOaKKADvR3oopAAzRRRQB/9k=",
  Ma = {
    store: {
      name: "\xC9picerie Raddonnaise",
      slogan: "\xC9picerie locale & familiale",
      address: "4 avenue des Vosges, 70280 Raddon-et-Chapendu",
      phone: "03 84 94 60 11",
      email: "epicerie.raddonnaise@outlook.fr",
      facebook: "",
    },
    hours: [
      { day: "Lundi", am: "8h30 - 13h00", pm: "16h00 - 19h30" },
      { day: "Mardi", am: "7h00 - 19h30", pm: "" },
      { day: "Mercredi", am: "7h00 - 19h30", pm: "" },
      { day: "Jeudi", am: "7h00 - 19h30", pm: "" },
      { day: "Vendredi", am: "7h00 - 19h30", pm: "" },
      { day: "Samedi", am: "7h00 - 19h30", pm: "" },
      { day: "Dimanche", am: "8h30 - 12h00", pm: "" },
    ],
    legal: {
      raison: "LTMP",
      forme: "SARL",
      capital: "3 000",
      siren: "979 301 132",
      rcs: "RCS Vesoul 979 301 132",
      responsable: "Marion Parnaso",
      tva: "FR00979301132",
      naf: "47.11B \u2014 Commerce d'alimentation g\xE9n\xE9rale",
      emailDonnees: "epicerie.raddonnaise@outlook.fr",
      hebergementDonnees: "Union europ\xE9enne",
      conservation: 3,
    },
    services: [],
    annonce: { active: !1, text: "", couleur: "apple" },
    popup: {
      active: !1,
      emoji: "\u{1F4E2}",
      titre: "",
      texte: "",
      photo: "",
      frequence: "une",
      debut: "",
      fin: "",
    },
    jour: { items: [], maj: "" },
    offres: [],
    actus: [],
    fidelite: {
      active: !0,
      parEuro: 1,
      paliers: [],
      titre: "Carte de fid\xE9lit\xE9",
      sousTitre: "1 \u20AC d\xE9pens\xE9 = 1 point \xB7 200 points = 5 \u20AC de remise",
      total: 10,
      remise: { active: !0, points: 200, euros: 5 },
    },
    clients: [],
    onglets: { carte: !0, fidelite: !0 },
  },
  Cf = [
    { id: "frais", label: "Frais du jour", c: "#6E9B3A" },
    { id: "plat", label: "Fait maison", c: "#1C433B" },
    { id: "promo", label: "Promo", c: "#C27B42" },
    { id: "gaspi", label: "Date courte", c: "#B08A2E" },
    { id: "panier", label: "Panier anti-gaspi", c: "#2E7D32" },
  ],
  Nf = () => new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }),
  Bn = () => new Date().toLocaleDateString("sv-SE");
var cc = (t) =>
    t ? new Date(t + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "",
  pN = (t, e) => {
    let n = e ? "e" : "";
    if (t.active === !1) return ["off", "Masqu\xE9" + n];
    let r = Bn();
    return t.debut && t.debut > r
      ? ["promo", "Programm\xE9" + n + " \u2014 d\xE8s le " + cc(t.debut)]
      : t.fin && t.fin < r
        ? ["off", "Termin\xE9" + n + " \u2014 masqu\xE9" + n]
        : ["on", t.fin ? "En ligne jusqu'au " + cc(t.fin) : "En ligne"];
  },
  io = ({ x: t, fem: e, style: n }) => {
    let [r, i] = pN(t, e);
    return l.default.createElement(
      "span",
      { className: "pill " + r, style: { display: "inline-block", ...n } },
      i,
    );
  };
function Zi({ v: t, onChange: e }) {
  return l.default.createElement(
    l.default.Fragment,
    null,
    l.default.createElement(
      "div",
      { style: { display: "flex", gap: 10 } },
      l.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        l.default.createElement("label", { className: "lab" }, "Para\xEEt \xE0 partir du"),
        l.default.createElement("input", {
          className: "inp",
          type: "date",
          value: t.debut || "",
          onChange: (n) => e({ ...t, debut: n.target.value }),
        }),
      ),
      l.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        l.default.createElement("label", { className: "lab" }, "Jusqu'au"),
        l.default.createElement("input", {
          className: "inp",
          type: "date",
          min: t.debut || void 0,
          value: t.fin || "",
          onChange: (n) => e({ ...t, fin: n.target.value }),
        }),
      ),
    ),
    l.default.createElement(
      "div",
      { style: { fontSize: 11, color: "var(--ink3)", margin: "5px 2px 0" } },
      "Vide = publi\xE9 tout de suite, sans date de fin.",
      (t.debut || t.fin) &&
        l.default.createElement(
          "button",
          {
            onClick: () => e({ ...t, debut: "", fin: "" }),
            style: {
              marginLeft: 6,
              border: "none",
              background: "none",
              color: "var(--red)",
              fontFamily: "var(--body)",
              fontSize: 11,
              fontWeight: 800,
              cursor: "pointer",
              padding: 0,
            },
          },
          "Effacer les dates",
        ),
    ),
  );
}
var Wr = () => Date.now() + Math.floor(Math.random() * 999),
  z9 = () => {
    let t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      e = new Uint8Array(20);
    return (crypto.getRandomValues(e), Array.from(e, (n) => t[n % 62]).join(""));
  },
  j9 = (t) => /^\d+$/.test(String(t)),
  U9 = ak,
  RS = ["accueil", "jour", "commandes", "messages"],
  fN = [
    "store",
    "hours",
    "services",
    "annonce",
    "fidelite",
    "onglets",
    "legal",
    "cmd",
    "themes",
    "chat",
    "fermetures",
    "push",
    "popup",
    "roue",
    "sondage",
    "menu",
  ],
  eN = [
    "offres",
    "actus",
    "jour",
    "clients",
    "pubs",
    "plateaux",
    "commandes",
    "conversations",
    "resas",
    "producteurs",
    "recettes",
    "reponses",
  ],
  cw = (t, e) => [...t].sort((n, r) => (e ? (r.cree || 0) - (n.cree || 0) : (n.cree || 0) - (r.cree || 0))),
  tN = () => Object.fromEntries(fN.filter((t) => Ma[t] !== void 0).map((t) => [t, Ma[t]]));
async function Pf(t) {
  for (let e = 0; e < t.length; e += 400) {
    let n = _n(de);
    (t.slice(e, e + 400).forEach((r) => n.delete(r)), await n.commit());
  }
}
async function nN(t) {
  let e = await Oi(Ge(de, "conversations", t, "messages")),
    n = [];
  (e.forEach((r) => n.push(r.ref)), await Pf(n), await Pf([xe(de, "conversations", t)]));
}
async function dw(t, e = [], n = []) {
  let r = _n(de),
    i = new Map(e.map((u) => [String(u.id), u])),
    s = new Set(),
    o = 0;
  n.forEach((u) => {
    let d = u.id != null ? String(u.id) : "",
      h = i.get(d),
      { id: p, ...m } = u;
    if (!h) (r.set(xe(Ge(de, t)), { cree: Date.now(), ...m }), o++);
    else {
      s.add(d);
      let { id: w, ...E } = h;
      if (t === "jour") {
        let { reserves: A, ...S } = m,
          { reserves: _, ...I } = E;
        JSON.stringify(I) !== JSON.stringify(S) && (r.set(xe(de, t, d), S, { merge: !0 }), o++);
      } else JSON.stringify(E) !== JSON.stringify(m) && (r.set(xe(de, t, d), m), o++);
    }
  });
  let a = e.filter((u) => !s.has(String(u.id)) && n.every((d) => String(d.id) !== String(u.id)));
  if (
    (a.forEach((u) => {
      (r.delete(xe(de, t, String(u.id))), o++);
    }),
    o && (await r.commit()),
    t === "clients")
  )
    for (let u of a) {
      let d = await Oi(Ge(de, "clients", String(u.id), "historique"));
      if (!d.empty) {
        let h = [];
        (d.forEach((p) => h.push(p.ref)), await Pf(h));
      }
    }
}
var Xi = (t) => (typeof t == "string" ? t : t == null ? "" : String(t)).slice(0, 500),
  Sf = (t) => {
    let e = Number(t);
    return isFinite(e) ? e : 0;
  },
  q9 = (t) => ({
    ...t,
    nom: Xi(t.nom),
    tel: Xi(t.tel),
    adresse: Xi(t.adresse),
    remarque: Xi(t.remarque),
    numero: Xi(t.numero),
    date: Xi(t.date),
    total: Sf(t.total),
    lignes: (Array.isArray(t.lignes) ? t.lignes : [])
      .filter((e) => e && typeof e == "object")
      .map((e) => ({
        ...e,
        nom: Xi(e.nom) || "Plateau",
        personnes: Sf(e.personnes),
        prixPersonne: Sf(e.prixPersonne),
        montant: Sf(e.montant),
        choix: Array.isArray(e.choix) ? e.choix.map(Xi) : [],
      })),
  }),
  vw = class extends l.default.Component {
    constructor(e) {
      (super(e), (this.state = { err: null }));
    }
    static getDerivedStateFromError(e) {
      return { err: e };
    }
    componentDidCatch(e) {
      console.error(e);
    }
    render() {
      return this.state.err
        ? l.default.createElement(
            "div",
            { className: "wrap" },
            l.default.createElement(
              "div",
              { className: "card" },
              l.default.createElement("div", { className: "nm" }, "Cet \xE9cran n'a pas pu s'afficher"),
              l.default.createElement(
                "div",
                { className: "de", style: { margin: "6px 0 10px" } },
                "Les autres onglets fonctionnent. Si le probl\xE8me revient, pr\xE9venez Eric.",
              ),
              l.default.createElement(
                "button",
                { className: "btn", onClick: () => this.setState({ err: null }) },
                "R\xE9essayer",
              ),
            ),
          )
        : this.props.children;
    }
  };
function W9(t) {
  let [e, n] = (0, l.useState)(null),
    [r, i] = (0, l.useState)({
      offres: [],
      actus: [],
      jour: [],
      clients: [],
      pubs: [],
      plateaux: [],
      commandes: [],
      conversations: [],
      resas: [],
      producteurs: [],
      recettes: [],
      reponses: [],
    }),
    [s, o] = (0, l.useState)(""),
    [a, u] = (0, l.useState)(!1),
    [d, h] = (0, l.useState)({}),
    p = (0, l.useRef)({});
  (0, l.useEffect)(() => {
    if (!t) return;
    let _ = (T) => o(T?.code || "erreur"),
      I = [
        fr(
          Sa,
          { includeMetadataChanges: !0 },
          (T) => {
            (T.metadata.fromCache || u(!0),
              T.exists()
                ? n(T.data())
                : (n({}), T.metadata.fromCache || ln(Sa, tN(), { merge: !0 }).catch(_)));
          },
          _,
        ),
      ];
    return (
      eN.forEach((T) =>
        I.push(
          fr(
            Ge(de, T),
            (M) => {
              i((V) => ({ ...V, [T]: M.docs.map((O) => ({ ...O.data(), id: O.id })) }));
            },
            [
              "pubs",
              "plateaux",
              "commandes",
              "conversations",
              "resas",
              "producteurs",
              "recettes",
              "reponses",
            ].includes(T)
              ? (M) => console.warn(T + " non lisible (r\xE8gles Firestore \xE0 mettre \xE0 jour ?)", M?.code)
              : _,
          ),
        ),
      ),
      () => I.forEach((T) => T())
    );
  }, [t]);
  let m = (0, l.useMemo)(() => {
      let _ = { ...Ma, ...(e || {}), ...d };
      return {
        ..._,
        offres: cw(r.offres),
        actus: cw(r.actus, !0),
        jour: { items: cw(r.jour, !0), maj: _.jourMaj || "" },
        pubs: [...r.pubs].sort((I, T) => (I.ordre ?? I.cree ?? 0) - (T.ordre ?? T.cree ?? 0)),
        plateaux: [...r.plateaux].sort((I, T) => (I.ordre ?? I.cree ?? 0) - (T.ordre ?? T.cree ?? 0)),
        commandes: r.commandes.map(q9),
        conversations: r.conversations,
        resas: r.resas,
        producteurs: [...r.producteurs].sort(
          (I, T) => (I.ordre ?? 0) - (T.ordre ?? 0) || (I.nom || "").localeCompare(T.nom || "", "fr"),
        ),
        recettes: [...r.recettes].sort((I, T) => (T.cree || 0) - (I.cree || 0)),
        reponses: [...r.reponses].sort((I, T) => (T.cree || 0) - (I.cree || 0)),
        fermetures: Array.isArray(_.fermetures) ? _.fermetures : [],
        clients: [...r.clients].sort((I, T) => (I.nom || "").localeCompare(T.nom || "", "fr")),
      };
    }, [e, r, d]),
    w = (0, l.useRef)(m);
  w.current = m;
  let E = (_) => {
    (console.error(_),
      ft(
        _?.code === "permission-denied"
          ? "Enregistrement refus\xE9 : votre session a peut-\xEAtre expir\xE9. Reconnectez-vous."
          : "Enregistrement impossible. V\xE9rifiez la connexion internet et r\xE9essayez.",
      ));
  };
  return [
    m,
    async (_, I) => {
      let T = w.current[_],
        M = typeof I == "function" ? I(T) : I;
      try {
        return (
          fN.includes(_)
            ? ((w.current = { ...w.current, [_]: M }),
              h((V) => ({ ...V, [_]: M })),
              clearTimeout(p.current[_]),
              (p.current[_] = setTimeout(async () => {
                try {
                  await ln(Sa, { [_]: M }, { merge: !0 });
                } catch (V) {
                  E(V);
                }
                h((V) => {
                  if (V[_] !== M) return V;
                  let { [_]: O, ...b } = V;
                  return b;
                });
              }, 500)))
            : _ === "jour"
              ? (await dw("jour", T.items, M.items),
                M.maj !== T.maj && (await ln(Sa, { jourMaj: M.maj }, { merge: !0 })))
              : eN.includes(_) && (await dw(_, T, M)),
          !0
        );
      } catch (V) {
        return (E(V), !1);
      }
    },
    async () => {
      try {
        for (let I of ["offres", "actus", "jour", "pubs", "plateaux"])
          await dw(I, w.current[I === "jour" ? "jour" : I].items || w.current[I], []);
        (Object.values(p.current).forEach(clearTimeout), (p.current = {}), h({}));
        let _ = tN();
        await ln(
          Sa,
          {
            store: _.store,
            hours: _.hours,
            services: _.services,
            annonce: _.annonce,
            onglets: _.onglets,
            jourMaj: "",
          },
          { merge: !0 },
        );
      } catch (_) {
        E(_);
      }
    },
    { pret: e !== null, erreur: s, serveur: a },
  ];
}
async function $9(t, e, n, r) {
  let i = _n(de),
    s = Date.now(),
    o = n === "recompense" || n === "recompense1",
    a = (o && Number(t.bonusAttente)) || 0,
    u = r ? Math.min(a, (r.palier || r.nb) - 1) : 0;
  (i.update(xe(de, "clients", String(t.id)), {
    tampons: Bi(e + u),
    ...(n === "tampon" ? { dernierTampon: s } : {}),
    ...(o ? { cadeaux: Bi(1) } : {}),
    ...(u ? { bonusAttente: a - u } : {}),
    derniere: new Date().toLocaleDateString("sv-SE"),
  }),
    i.set(xe(Ge(de, "clients", String(t.id), "historique")), {
      date: s,
      points: e,
      type: n,
      source: "admin",
    }),
    u &&
      i.set(xe(Ge(de, "clients", String(t.id), "historique")), {
        date: s - 1,
        points: u,
        type: "bonus",
        source: "admin",
      }),
    await i.commit());
}
async function hw(t, e, n) {
  let r = Math.max(-(t.points || 0), e),
    i = _n(de),
    s = xe(de, "clients", String(t.id));
  (i.update(s, {
    points: Bi(r),
    ...(n.montant ? { depense: Bi(n.montant) } : {}),
    derniere: new Date().toLocaleDateString("sv-SE"),
  }),
    i.set(xe(Ge(de, "clients", String(t.id), "historique")), { date: Date.now(), points: r, ...n }),
    await i.commit());
}
function G9(t, e, n = 800) {
  let r = new FileReader();
  ((r.onload = () => {
    let i = new Image();
    ((i.onload = () => {
      let s = Math.min(1, n / Math.max(i.width, i.height)),
        o = document.createElement("canvas");
      ((o.width = Math.round(i.width * s)),
        (o.height = Math.round(i.height * s)),
        o.getContext("2d").drawImage(i, 0, 0, o.width, o.height));
      let a = 0.72,
        u = o.toDataURL("image/jpeg", a);
      for (; u.length > 6e5 && a > 0.35;) ((a -= 0.1), (u = o.toDataURL("image/jpeg", a)));
      e(u);
    }),
      (i.src = r.result));
  }),
    r.readAsDataURL(t));
}
var he = {
    home: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinejoin: "round",
        },
        l.default.createElement("path", {
          d: "M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
        }),
      ),
    shop: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinejoin: "round",
        },
        l.default.createElement("path", { d: "M4 8h16l-1 12H5z" }),
        l.default.createElement("path", { d: "M9 8V6a3 3 0 0 1 6 0v2" }),
      ),
    ferme: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinejoin: "round",
          strokeLinecap: "round",
        },
        l.default.createElement("path", { d: "M3 21V10l9-6 9 6v11z" }),
        l.default.createElement("path", { d: "M9 21v-6h6v6M3 13h18" }),
        l.default.createElement("path", { d: "M9 15l6 6M15 15l-6 6" }),
      ),
    basket: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinejoin: "round",
        },
        l.default.createElement("path", { d: "M3 9h18l-2 11H5z" }),
        l.default.createElement("path", { d: "M8 9 12 3l4 6" }),
      ),
    news: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinejoin: "round",
        },
        l.default.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
        l.default.createElement("path", { d: "M7 9h6M7 13h10M7 17h10" }),
      ),
    img: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinejoin: "round",
        },
        l.default.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
        l.default.createElement("circle", { cx: "9", cy: "10", r: "2" }),
        l.default.createElement("path", { d: "m21 16-5-5-9 9" }),
      ),
    star: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinejoin: "round",
        },
        l.default.createElement("path", {
          d: "m12 3 2.7 5.6 6.3.9-4.5 4.3 1 6.2-5.5-3-5.5 3 1-6.2L3 9.5l6.3-.9z",
        }),
      ),
    gear: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        { width: t, height: t, viewBox: "0 0 24 24", fill: "none", stroke: e, strokeWidth: "1.7" },
        l.default.createElement("circle", { cx: "12", cy: "12", r: "3.2" }),
        l.default.createElement("path", {
          d: "M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3",
        }),
      ),
    plus: (t = 16, e = "#fff") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "2.6",
          strokeLinecap: "round",
        },
        l.default.createElement("path", { d: "M12 5v14M5 12h14" }),
      ),
    pen: (t = 16, e = "#5C6A62") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.8",
          strokeLinecap: "round",
        },
        l.default.createElement("path", { d: "M11 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6" }),
        l.default.createElement("path", { d: "M18.4 2.6a2 2 0 0 1 2.8 2.8L12 14.6 8 15.6l1-4z" }),
      ),
    porteVoix: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.8",
          strokeLinecap: "round",
          strokeLinejoin: "round",
        },
        l.default.createElement("path", { d: "M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" }),
        l.default.createElement("path", { d: "M15 9a4 4 0 0 1 0 6" }),
        l.default.createElement("path", { d: "M18 6a8 8 0 0 1 0 12" }),
      ),
    graph: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.8",
          strokeLinecap: "round",
        },
        l.default.createElement("path", { d: "M4 20V10M10 20V4M16 20v-7M22 20H2" }),
      ),
    plusMenu: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.8",
          strokeLinecap: "round",
        },
        l.default.createElement("rect", { x: "3.5", y: "3.5", width: "7", height: "7", rx: "2" }),
        l.default.createElement("rect", { x: "13.5", y: "3.5", width: "7", height: "7", rx: "2" }),
        l.default.createElement("rect", { x: "3.5", y: "13.5", width: "7", height: "7", rx: "2" }),
        l.default.createElement("rect", { x: "13.5", y: "13.5", width: "7", height: "7", rx: "2" }),
      ),
    bin: (t = 16, e = "#C86B5C") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.8",
          strokeLinecap: "round",
        },
        l.default.createElement("path", {
          d: "M3.5 6h17M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6M6 6l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14",
        }),
      ),
    cam: (t = 18, e = "#5C6A62") =>
      l.default.createElement(
        "svg",
        { width: t, height: t, viewBox: "0 0 24 24", fill: "none", stroke: e, strokeWidth: "1.7" },
        l.default.createElement("path", {
          d: "M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.3-2h7.9l1.3 2h2.3A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z",
        }),
        l.default.createElement("circle", { cx: "12", cy: "12.8", r: "3.4" }),
      ),
    bulle: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinejoin: "round",
          strokeLinecap: "round",
        },
        l.default.createElement("path", { d: "M4 5h16v11H9l-5 4z" }),
        l.default.createElement("path", { d: "M8 9.5h8M8 12.5h5" }),
      ),
    sapin: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinejoin: "round",
          strokeLinecap: "round",
        },
        l.default.createElement("path", { d: "M12 2.5 7 9h3l-4 6h3.5L5 20h14l-4.5-5H18l-4-6h3z" }),
        l.default.createElement("path", { d: "M12 20v2" }),
      ),
    cmd: (t = 20, e = "currentColor") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinejoin: "round",
          strokeLinecap: "round",
        },
        l.default.createElement("rect", { x: "5", y: "4", width: "14", height: "17", rx: "2" }),
        l.default.createElement("path", { d: "M9 4V3h6v1M9 10h6M9 14h6M9 18h3" }),
      ),
    qr: (t = 18, e = "#fff") =>
      l.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.8",
          strokeLinecap: "round",
        },
        l.default.createElement("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1" }),
        l.default.createElement("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1" }),
        l.default.createElement("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }),
        l.default.createElement("path", { d: "M14 14h3v3h-3zM20 14v3M14 20h6" }),
      ),
  },
  ww =
    SC +
    NS +
    MS +
    `
:root{--bg:#F7F3EA;--card:#fff;--forest:#1C433B;--apple:#6E9B3A;--apple-soft:#EEF3E2;
 --terra:#C27B42;--gold:#C69A3C;--red:#C86B5C;--ink:#22302A;--ink2:#5C6A62;--ink3:#93A099;
 --line:#E6E0D2;--r:16px;--r-s:11px;--script:'Sacramento',cursive;--body:'Nunito',system-ui,sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
.adm{max-width:440px;margin:0 auto;min-height:100vh;background:var(--bg);color:var(--ink);
 font-family:var(--body);padding-bottom:calc(84px + env(safe-area-inset-bottom));-webkit-font-smoothing:antialiased}
.top{position:sticky;top:0;z-index:60;display:flex;align-items:center;gap:11px;padding:11px 16px;
 background:var(--forest);color:#fff}
.top img{width:38px;height:38px;border-radius:50%;border:2px solid rgba(255,255,255,.85);object-fit:cover}
.top h1{font-family:var(--script);font-size:23px;line-height:1}
.top small{display:block;font-size:9px;letter-spacing:1px;text-transform:uppercase;opacity:.65}
.top small .vers{display:inline-block;margin-left:6px;padding:2px 8px;border-radius:9px;background:rgba(255,255,255,.22);font-size:12.5px;font-weight:800;letter-spacing:.3px;text-transform:none;vertical-align:1px}
.wrap{padding:16px}
.hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:10px}
.t1{font-family:var(--script);font-size:30px;color:var(--forest);line-height:1.15;margin-bottom:4px}
.sub{font-size:12px;color:var(--ink3);margin:0 0 14px;line-height:1.45}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:14px;margin-bottom:10px}
.row{display:flex;align-items:center;gap:11px}
.nm{font-weight:800;font-size:13.5px}
.de{font-size:11.5px;color:var(--ink3);margin-top:2px}
.rt{margin-left:auto;display:flex;align-items:center;gap:8px;flex-shrink:0}
.ib{background:none;border:none;padding:5px;cursor:pointer;line-height:0}
.thumb{width:50px;height:50px;border-radius:10px;object-fit:cover;flex-shrink:0;background:var(--apple-soft)}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.stat{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:14px;text-align:center}
.stat b{display:block;font-size:26px;color:var(--apple);line-height:1.1}
.stat span{font-size:10.5px;color:var(--ink3)}
.btn{width:100%;padding:13px;border:none;border-radius:var(--r-s);font-family:var(--body);
 font-size:13.5px;font-weight:800;cursor:pointer;background:var(--apple);color:#fff;
 display:flex;align-items:center;justify-content:center;gap:7px}
.btn.sm{width:auto;padding:9px 14px;font-size:12px}
.btn.gh{background:transparent;border:1.5px solid var(--line);color:var(--ink2)}
.btn.dark{background:var(--forest)}
.btn.terra{background:var(--terra)}
.btn:disabled{background:#DDD8CC}
.inp,textarea.inp,select.inp{width:100%;background:#fff;border:1.5px solid var(--line);border-radius:var(--r-s);
 padding:11px 13px;font-family:var(--body);font-size:14px;color:var(--ink);outline:none}
.inp:focus{border-color:var(--apple)}
/* T\xE9l\xE9phone : 16 px minimum, sinon l'iPhone zoome sur le champ et fait d\xE9border l'\xE9cran */
@media (max-width: 899px){
  .inp,textarea.inp,select.inp{font-size:16px !important;max-width:100%;min-width:0;-webkit-appearance:none;appearance:none}
}
textarea.inp{min-height:74px;resize:vertical}
.lab{font-size:11px;font-weight:800;color:var(--ink3);display:block;margin:12px 0 5px 2px}
.lab:first-child{margin-top:0}
.sw{width:46px;height:26px;border-radius:14px;background:#DDD8CC;position:relative;cursor:pointer;flex-shrink:0;transition:background .18s}
.sw.on{background:var(--apple)}
.sw i{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .18s}
.sw.on i{transform:translateX(20px)}
.tog{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--line)}
.tir-adm{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:8px}
.tir-adm .inp{flex:1;min-width:140px;margin:0}
.tog:last-child{border-bottom:none}
.pill{font-size:9.5px;font-weight:800;padding:3px 9px;border-radius:20px}
.pill.on{background:var(--apple-soft);color:#4C6B27}
.pill.off{background:#F2EDE2;color:var(--ink3)}
.pill.promo{background:#FBEFE4;color:#9A5A28}
.mdl{position:fixed;inset:0;background:rgba(20,32,26,.55);z-index:200;display:flex;align-items:flex-end}
.mdl .in{background:var(--bg);width:100%;max-width:440px;margin:0 auto;border-radius:20px 20px 0 0;
 padding:18px 16px calc(26px + env(safe-area-inset-bottom));max-height:92vh;overflow-y:auto}
.mdl h3{font-family:var(--script);font-size:27px;color:var(--forest);line-height:1}
.ph{width:100%;height:150px;border-radius:var(--r-s);object-fit:cover;background:var(--apple-soft);display:block}
.phbox{width:100%;height:110px;border:1.5px dashed var(--line);border-radius:var(--r-s);background:#fff;
 display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;
 font-size:12px;font-weight:700;color:var(--ink2);cursor:pointer}
.seg{display:flex;gap:5px;background:#EFE9DC;padding:4px;border-radius:12px;margin-bottom:14px}
.seg button{flex:1;border:none;background:none;font-family:var(--body);font-size:12px;font-weight:800;
 padding:9px 6px;border-radius:9px;color:var(--ink2);cursor:pointer}
.seg button.on{background:#fff;color:var(--forest);box-shadow:0 1px 4px rgba(0,0,0,.07)}
.empty{text-align:center;padding:30px 20px;border:1px dashed var(--line);border-radius:var(--r);
 background:#fff;color:var(--ink3);font-size:12.5px;line-height:1.5}
.empty b{display:block;color:var(--ink2);font-size:13.5px;margin-bottom:4px}
.tabs{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:440px;background:#fff;
 border-top:1px solid var(--line);display:flex;box-sizing:border-box;height:calc(68px + env(safe-area-inset-bottom));z-index:60;padding:4px 0 env(safe-area-inset-bottom)}
.hor-ligne{display:grid;grid-template-columns:1fr 1fr;gap:6px 8px;align-items:center;padding:8px 0}
.hor-ligne>span{grid-column:1/-1}
@media (min-width:520px){.hor-ligne{grid-template-columns:90px 1fr 1fr}.hor-ligne>span{grid-column:auto}}
.tab.plus{display:none}
button.carte-lien{display:block;width:100%;text-align:left;font-family:var(--body);color:var(--ink);cursor:pointer;transition:transform .12s}
button.carte-lien:active{transform:scale(.98)}
.plus-fond{position:fixed;inset:0;z-index:150;background:rgba(20,32,26,.45);display:flex;align-items:flex-end;justify-content:center}
.plus-in{background:#fff;width:100%;max-width:440px;border-radius:22px 22px 0 0;padding:14px 14px calc(84px + env(safe-area-inset-bottom));animation:plusIn .2s ease}
.plus-g+.plus-g{margin-top:14px}
.plus-g h4{margin:0 2px 8px;font-family:var(--body);font-size:11px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#93A099}
.plus-l{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.plus-in button{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;padding:12px 2px;border-radius:16px;border:1.5px solid var(--line);background:#fff;font-family:var(--body);font-size:11.5px;letter-spacing:-.01em;font-weight:800;color:var(--ink2);cursor:pointer}
.plus-in button.on{border-color:var(--apple);background:var(--apple-soft);color:var(--forest)}
.plus-in .tab-n{top:6px;right:10px}
@keyframes plusIn{from{transform:translateY(30px);opacity:0}to{transform:none;opacity:1}}
@media (max-width:899px){.tab.sec{display:none}.tab.plus{display:flex}.tab{font-size:10.5px}}
.tab{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:none;
 background:none;font-family:var(--body);font-size:8.8px;font-weight:800;color:var(--ink3);cursor:pointer;min-width:0;overflow:hidden;white-space:nowrap}
.tab.on{color:var(--forest)}
.apercu-tel{border:1px solid var(--line);border-radius:18px;overflow:hidden;background:#F7F3EA;max-width:360px;margin:0 auto}
.at-top{display:flex;align-items:center;gap:8px;padding:9px 12px;color:#fff;font-family:'Sacramento',cursive;font-size:21px}
.at-top img{width:28px;height:28px;border-radius:50%;border:2px solid rgba(255,255,255,.8)}
.at-acc{position:absolute;left:0;top:0;width:120px;height:60px;transform:translate(12px,9px) scale(.7) translate(-16px,-11px);transform-origin:0 0;pointer-events:none}
.apercu-tel .at-corps{position:relative;overflow:hidden}
.at-corps{position:relative;padding:12px;height:230px;overflow:hidden}
.at-faux{height:44px;border-radius:12px;background:#fff;border:1px solid var(--line);margin-bottom:8px;position:relative;z-index:2}
.at-faux.court{width:60%}
.intro-tel{position:relative;max-width:300px;height:460px;margin:0 auto;border-radius:26px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;border:6px solid #22302A;box-shadow:0 10px 30px rgba(0,0,0,.18)}
.it-logo{position:relative;z-index:2;width:72%;height:auto;filter:drop-shadow(0 8px 14px rgba(0,0,0,.28));animation:itPop .9s cubic-bezier(.3,1.5,.5,1) both}
.it-txt{position:relative;z-index:2;text-align:center;margin-top:8px;padding:0 14px;animation:itMonte .6s ease .5s both}
.it-bonjour{font-family:'Sacramento',cursive;font-size:30px;color:#fff;line-height:1.1}
.it-bienv{font-size:11.5px;font-weight:700;color:rgba(255,255,255,.88);margin-top:4px}
.it-titre{font-family:'Sacramento',cursive;font-size:22px;color:#fff;margin-top:4px}
.it-lieu{position:absolute;bottom:18px;z-index:2;font-size:8.5px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,.6)}
@keyframes itPop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
@keyframes itMonte{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.plan-l{display:flex;align-items:center;gap:10px;padding:9px 2px;border-top:1px solid var(--line)}
.plan-pt{width:12px;height:12px;border-radius:50%;flex-shrink:0}
.pop-fond{position:fixed;inset:0;z-index:500;background:rgba(20,32,26,.55);display:flex;align-items:center;justify-content:center;padding:22px}
.pop{background:#fff;border-radius:24px;max-width:360px;width:100%;padding:22px 20px 18px;text-align:center;box-shadow:0 18px 50px rgba(0,0,0,.25);max-height:88vh;overflow-y:auto}
.pop-ph{width:100%;max-height:200px;object-fit:cover;border-radius:16px;margin-bottom:10px}
.pop-em{font-size:42px;line-height:1.1}
.pop-t{font-family:'Sacramento',cursive;font-size:34px;color:var(--forest);line-height:1.1;margin-top:4px}
.pop-x{font-size:14.5px;line-height:1.5;color:var(--ink2);margin-top:8px;white-space:pre-line}
.ri{margin-top:14px;padding-top:12px;border-top:1px solid var(--line)}
.ri-magie{background:linear-gradient(140deg,#1F3A66,#0E1B33);color:#fff;border-radius:14px;padding:12px 14px;margin-bottom:14px}
.ri-magie .de{color:rgba(255,255,255,.75)}

.ri-t{font-weight:800;font-size:14.5px;margin-bottom:6px}
.ri-logos{display:flex;gap:8px}
.ri-logos button{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 6px;border-radius:14px;border:1.5px solid var(--line);background:#fff;font-family:var(--body);font-size:12.5px;font-weight:800;color:var(--ink2);cursor:pointer}
.ri-logos img{width:64px;height:64px;object-fit:contain}
.ri-logos button.on,.ri-fonds button.on,.ri-motifs button.on{border-color:var(--apple);background:var(--apple-soft);color:var(--forest)}
.ri-fonds{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.ri-fonds button{display:flex;flex-direction:column;align-items:center;gap:4px;padding:6px 2px;border-radius:12px;border:1.5px solid var(--line);background:#fff;font-family:var(--body);font-size:11px;font-weight:800;color:var(--ink2);cursor:pointer}
.ri-fonds span{width:100%;height:34px;border-radius:8px}
.ri-motifs{display:grid;grid-template-columns:repeat(auto-fill,minmax(42px,1fr));gap:6px}
.ri-motifs button{height:42px;display:flex;align-items:center;justify-content:center;border-radius:12px;border:1.5px solid var(--line);background:#F2EDE2;cursor:pointer;padding:0}
.couleurs{display:flex;flex-wrap:wrap;gap:8px}
.couleurs button,.perso-coul{width:34px;height:34px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 1px var(--line);cursor:pointer}
.couleurs button.on{box-shadow:0 0 0 2.5px var(--ink)}
.perso-coul{position:relative;display:flex;align-items:center;justify-content:center;background:conic-gradient(red,orange,yellow,green,blue,violet,red);color:#fff;font-weight:800;font-size:18px;overflow:hidden}
.perso-coul input{position:absolute;inset:0;opacity:0;cursor:pointer}
.emojis{display:grid;grid-template-columns:repeat(auto-fill,minmax(40px,1fr));gap:5px}
.emojis button{height:40px;border-radius:10px;border:1.5px solid var(--line);background:#fff;font-size:21px;cursor:pointer;padding:0}
.emojis button.on{border-color:var(--apple);background:var(--apple-soft)}
.th-illu{width:54px;height:54px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
@media (max-width: 899px){.adm.main .tab{flex:1 1 0}}
.tab-ic{position:relative;display:inline-flex}
.tab-n{position:absolute;top:-6px;right:-10px;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:var(--terra);color:#fff;font-size:9.5px;font-weight:800;display:flex;align-items:center;justify-content:center}
.cmd-cli{margin-top:10px;font-size:13.5px;line-height:1.5}
.cmd-cli a{color:var(--forest);font-weight:800}
.cmd-lignes{margin-top:10px;background:var(--bg);border-radius:10px;padding:8px 11px;font-size:12.5px}
.cmd-lignes>div{display:flex;justify-content:space-between;gap:10px;padding:4px 0}
.cmd-lignes .tot{border-top:1px solid var(--line);margin-top:4px;padding-top:7px;font-size:14px;color:var(--forest)}
.cmd-alerte{margin-top:8px;font-size:12px;font-weight:700;color:#9A5A28;background:#FBEFE4;border-radius:8px;padding:7px 10px}
.cmd-allerg{margin-top:8px;font-size:13px;font-weight:800;color:#9C3B2A;background:#FBEAE6;border:1.5px solid #EBC9C2;border-radius:8px;padding:8px 10px}
.cmd-rq{margin-top:8px;font-size:12.5px;font-style:italic;color:var(--ink2)}
.lienadm{display:block;border:none;background:none;padding:0;font-family:var(--body);font-size:11px;font-weight:700;color:var(--ink3);text-decoration:underline;cursor:pointer}
.choix-bloc{background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:12px;margin:12px 0}
.opt-ligne{display:flex;gap:6px;align-items:center;margin-top:6px}
.opt-ligne>.inp{flex:1;min-width:0;padding:9px 11px}
.opt-supp{display:flex;align-items:center;gap:3px;font-size:12px;font-weight:800;color:var(--ink3)}
.opt-supp .inp{width:62px;padding:9px 6px;text-align:center}
.barres{display:flex;gap:8px;align-items:flex-end;height:128px;padding:4px 2px 0;border-bottom:1px solid var(--line)}
.bcol{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%}
.bcol i{display:block;width:70%;max-width:44px;background:linear-gradient(180deg,var(--apple),#4C6B27);border-radius:6px 6px 0 0}
.bv{font-size:10px;font-weight:800;color:var(--ink2);margin-bottom:2px}
.bm{font-size:10.5px;color:var(--ink3);margin-top:4px;text-transform:capitalize;position:relative;top:18px}
.stats .barres{margin-bottom:20px}
.stat i{display:block;font-style:normal;font-size:10px;font-weight:800;color:var(--apple)}
.prepa{background:#FBF8F1}
.resa-adm{border-left:4px solid #2E7D32}
.resa-adm.retiree,.resa-adm.absent,.resa-adm.annulee{opacity:.6;border-left-color:var(--line)}
.conv{cursor:pointer}
.conv.attente{border-left:4px solid var(--terra)}
.av-conv{width:42px;height:42px;border-radius:50%;background:var(--apple-soft);color:var(--forest);font-weight:800;font-size:17px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.conv-der{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.fil-adm{background:#fff;border:1px solid var(--line);border-radius:18px;padding:12px;max-width:760px}
.fil-hd{display:flex;gap:10px;align-items:center;padding-bottom:10px;border-bottom:1px solid var(--line)}
.fil-hd .btn{width:auto;flex-shrink:0}
.fil-corps{display:flex;flex-direction:column;gap:6px;max-height:55vh;overflow-y:auto;padding:12px 2px}
.fil-jour{align-self:center;font-size:11px;font-weight:800;color:var(--ink3);background:#F2EDE2;border-radius:10px;padding:3px 10px;margin:6px 0;text-transform:capitalize}
.fmsg{max-width:80%;padding:8px 12px 5px;border-radius:15px;font-size:14px;line-height:1.4;white-space:pre-wrap;word-wrap:break-word}
.fmsg small{display:block;font-size:10px;opacity:.6;text-align:right;margin-top:2px}
.fmsg.lui{align-self:flex-start;background:#F2EDE2;border-bottom-left-radius:5px}
.fmsg.moi{align-self:flex-end;background:var(--apple);color:#fff;border-bottom-right-radius:5px}
.fil-saisie{display:flex;gap:8px;align-items:stretch}
.fil-saisie textarea{flex:1;resize:vertical}
.motifs{display:flex;flex-wrap:wrap;gap:6px}
.motifs button{border:1.5px solid var(--line);background:#fff;border-radius:20px;padding:7px 12px;font-family:var(--body);font-size:12px;font-weight:800;color:var(--ink2);cursor:pointer}
.motifs button.on{background:var(--apple-soft);border-color:var(--apple);color:var(--forest)}
.inp.sel{width:auto;flex:1;min-width:120px;padding:8px 10px;font-size:13px}
.jours-sem{display:flex;gap:5px}
.jours-sem button{flex:1;padding:10px 0;border-radius:10px;border:1.5px solid var(--line);background:#fff;font-family:var(--body);font-size:12px;font-weight:800;color:var(--ink3);cursor:pointer}
.jours-sem button.on{background:var(--apple);border-color:var(--apple);color:#fff}
.apercu-prix{background:var(--apple-soft);border-radius:10px;padding:9px 12px;font-size:12.5px;color:var(--forest);margin:10px 0 4px}
.bar{height:6px;border-radius:4px;background:#EFE9DC;overflow:hidden;margin-top:6px}
.bar i{display:block;height:100%;background:var(--apple)}

/* \u2550\u2550\u2550 Ordinateur : menu lat\xE9ral, contenu large, fen\xEAtres centr\xE9es \u2550\u2550\u2550 */
@media (min-width: 900px){
  .adm.main{max-width:none;padding:0 0 48px 236px}
  .adm.main .top{margin-left:-236px;padding:12px 28px;z-index:70}
  .adm.main .top h1{font-size:27px}
  .adm.main .wrap{max-width:1100px;margin:0 auto;padding:28px 36px}
  .adm.main .t1{font-size:40px}
  .adm.main .t1{margin-bottom:10px}
  .adm.main .sub{font-size:13.5px;max-width:680px;margin:0 0 20px}
  .adm.main .grid2{grid-template-columns:repeat(4,1fr);gap:14px}
  .adm.main .grille{display:grid;grid-template-columns:repeat(auto-fill,minmax(380px,1fr));gap:12px;align-items:start;margin-bottom:12px}
  .adm.main .grille>.card{margin-bottom:0}
  .adm.main .card{transition:border-color .15s,box-shadow .15s}
  .adm.main .grille>.card:hover{border-color:#D6CDB8;box-shadow:0 3px 14px rgba(28,67,59,.06)}
  .adm.main .wrap>.btn{width:auto;display:inline-flex;padding:12px 24px}
  .adm.main .seg{max-width:520px}
  .adm.main .tabs{top:0;bottom:0;left:0;transform:none;width:236px;max-width:none;height:auto;
    flex-direction:column;justify-content:flex-start;gap:4px;padding:88px 14px 20px;
    border-top:none;border-right:1px solid var(--line);z-index:65}
  .adm.main .tab{flex:0 0 auto;width:100%;flex-direction:row;justify-content:flex-start;gap:12px;
    padding:12px 14px;border-radius:12px;font-size:14px;letter-spacing:0}
  .adm.main .tab:hover{background:var(--bg)}
  .adm.main .tab.on{background:var(--apple-soft)}
  .mdl{align-items:center;justify-content:center}
  .mdl .in{max-width:580px;border-radius:20px;padding:24px 26px;max-height:88vh}
  .ib:hover{opacity:.65}
}
`,
  ze = ({ on: t, set: e }) =>
    l.default.createElement(
      "div",
      { className: "sw" + (t ? " on" : ""), onClick: e },
      l.default.createElement("i", null),
    ),
  Vn = ({ t, s: e }) =>
    l.default.createElement("div", { className: "empty" }, l.default.createElement("b", null, t), e);
function ut({ titre: t, onClose: e, children: n }) {
  return l.default.createElement(
    "div",
    { className: "mdl", onClick: e },
    l.default.createElement(
      "div",
      { className: "in", onClick: (r) => r.stopPropagation() },
      l.default.createElement(
        "div",
        { className: "hd" },
        l.default.createElement("h3", null, t),
        l.default.createElement(
          "button",
          { className: "ib", onClick: e, style: { fontSize: 26, color: "#93A099", lineHeight: 1 } },
          "\xD7",
        ),
      ),
      n,
    ),
  );
}
function Ri({ value: t, onChange: e, max: n, large: r }) {
  let i = (0, l.useRef)();
  return l.default.createElement(
    l.default.Fragment,
    null,
    l.default.createElement("input", {
      ref: i,
      type: "file",
      accept: "image/*",
      style: { display: "none" },
      onChange: (s) => {
        let o = s.target.files?.[0];
        (o && G9(o, e, n), (s.target.value = ""));
      },
    }),
    t
      ? l.default.createElement(
          "div",
          { style: { position: "relative" } },
          l.default.createElement("img", { className: "ph", src: t, alt: "" }),
          l.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 8 } },
            l.default.createElement(
              "button",
              { className: "btn gh sm", style: { flex: 1 }, onClick: () => i.current.click() },
              "Changer",
            ),
            l.default.createElement(
              "button",
              { className: "btn gh sm", style: { flex: 1, color: "var(--red)" }, onClick: () => e("") },
              "Retirer",
            ),
          ),
        )
      : l.default.createElement(
          "div",
          { className: "phbox", onClick: () => i.current.click() },
          he.cam(22),
          "Ajouter une photo",
        ),
  );
}
function H9({ d: t, set: e, aller: n }) {
  let r = t.resas.filter((a) => a.statut === "reservee").length,
    i = t.conversations.filter((a) => a.attente).length,
    s = t.commandes.filter((a) => a.statut === "nouvelle").length,
    o = !r && !i && !s;
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Bonjour Marion"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Tout ce que vous modifiez ici appara\xEEt aussit\xF4t dans l'application de vos clients.",
    ),
    l.default.createElement("div", { className: "nm", style: { margin: "4px 0 8px" } }, "\xC0 faire"),
    !!s &&
      l.default.createElement(
        "button",
        {
          className: "card carte-lien",
          style: { background: "#FBEFE4", borderColor: "#F0D7BF" },
          onClick: () => n("commandes"),
        },
        l.default.createElement(
          "div",
          { className: "nm" },
          "\u{1F4CB} ",
          s,
          " commande(s) de plateaux \xE0 accepter ou refuser",
        ),
        l.default.createElement("div", { className: "de" }, "Ouvrir les commandes \u2192"),
      ),
    !!i &&
      l.default.createElement(
        "button",
        {
          className: "card carte-lien",
          style: { background: "#FBEFE4", borderColor: "#F0D7BF" },
          onClick: () => n("messages"),
        },
        l.default.createElement(
          "div",
          { className: "nm" },
          "\u{1F4AC} ",
          i,
          " message(s) de client en attente de r\xE9ponse",
        ),
        l.default.createElement("div", { className: "de" }, "Ouvrir les messages \u2192"),
      ),
    !!r &&
      l.default.createElement(
        "button",
        {
          className: "card carte-lien",
          style: { background: "#E3F1E3", borderColor: "#C5E1C5" },
          onClick: () => n("jour"),
        },
        l.default.createElement(
          "div",
          { className: "nm" },
          "\u{1F9FA} ",
          r,
          " r\xE9servation(s) anti-gaspi \xE0 mettre de c\xF4t\xE9",
        ),
        l.default.createElement("div", { className: "de" }, "Ouvrir Aujourd'hui \u2192"),
      ),
    l.default.createElement(
      "button",
      {
        className: "card carte-lien",
        style: {
          background: t.jour?.maj === Nf() ? "#EEF3E2" : "#FDF6EE",
          borderColor: t.jour?.maj === Nf() ? "#CFE0AE" : "#EFDCC6",
        },
        onClick: () => n("jour"),
      },
      l.default.createElement(
        "div",
        { className: "nm" },
        t.jour?.maj === Nf() ? "\u2705 Publication du jour faite" : "\u{1F955} Pensez \xE0 publier le jour",
      ),
      l.default.createElement(
        "div",
        { className: "de" },
        t.jour?.maj ? "Derni\xE8re mise \xE0 jour : " + t.jour.maj : "Aucune publication pour l'instant",
      ),
    ),
    o &&
      l.default.createElement(
        "div",
        { className: "de", style: { margin: "0 2px 12px" } },
        "Rien d'autre en attente. Bonne journ\xE9e !",
      ),
    l.default.createElement(
      "div",
      { className: "nm", style: { margin: "14px 0 8px" } },
      "En ligne en ce moment",
    ),
    l.default.createElement(
      "div",
      { className: "grid2", style: { marginBottom: 10 } },
      l.default.createElement(
        "div",
        { className: "stat" },
        l.default.createElement("b", null, (t.jour?.items || []).filter((a) => a.active !== !1).length),
        l.default.createElement("span", null, "articles du jour"),
      ),
      l.default.createElement(
        "div",
        { className: "stat" },
        l.default.createElement(
          "b",
          null,
          t.plateaux.filter((a) => a.active !== !1).length + t.offres.filter((a) => a.active !== !1).length,
        ),
        l.default.createElement("span", null, "plateaux & paniers"),
      ),
      l.default.createElement(
        "div",
        { className: "stat" },
        l.default.createElement("b", null, t.actus.filter((a) => a.active !== !1).length),
        l.default.createElement("span", null, "actualit\xE9s"),
      ),
      l.default.createElement(
        "div",
        { className: "stat" },
        l.default.createElement("b", null, t.pubs.filter((a) => a.active !== !1).length),
        l.default.createElement("span", null, "banni\xE8res"),
      ),
    ),
    l.default.createElement(
      "div",
      { className: "grid2" },
      l.default.createElement(
        "button",
        { className: "card carte-lien", onClick: () => n("com") },
        l.default.createElement("div", { className: "nm" }, "\u{1F4E3} Communication"),
        l.default.createElement("div", { className: "de" }, "Notifications, message d'accueil \u2192"),
      ),
      l.default.createElement(
        "button",
        { className: "card carte-lien", onClick: () => n("stats") },
        l.default.createElement("div", { className: "nm" }, "\u{1F4CA} Statistiques"),
        l.default.createElement("div", { className: "de" }, "Ventes, fr\xE9quentation, connexions \u2192"),
      ),
    ),
  );
}
function K9({ d: t }) {
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Statistiques"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Vos ventes dans l'appli et ce que regardent vos clients, pour choisir quoi mettre en avant.",
    ),
    l.default.createElement(i7, { d: t }),
    l.default.createElement(Kk, { d: t }),
  );
}
function Q9({ d: t, set: e }) {
  let n = { emoji: "\u{1F4E2}", titre: "", texte: "", photo: "", frequence: "une", ...(t.popup || {}) },
    r = (o) => e("popup", (a) => ({ emoji: "\u{1F4E2}", frequence: "une", ...(a || {}), ...o })),
    [i, s] = (0, l.useState)(!1);
  return l.default.createElement(
    "div",
    { className: "card" },
    l.default.createElement(
      "div",
      { className: "row", style: { marginBottom: 10 } },
      l.default.createElement(
        "div",
        null,
        l.default.createElement("div", { className: "nm" }, "\u{1F4AC} Message \xE0 l'ouverture"),
        l.default.createElement(
          "div",
          { className: "de" },
          "Une fen\xEAtre qui s'affiche quand le client ouvre l'appli",
        ),
      ),
      l.default.createElement(
        "div",
        { className: "rt" },
        l.default.createElement(ze, { on: !!n.active, set: () => r({ active: !n.active }) }),
      ),
    ),
    l.default.createElement(
      "div",
      { style: { display: "flex", gap: 8 } },
      l.default.createElement("input", {
        className: "inp",
        value: n.emoji,
        maxLength: 4,
        onChange: (o) => r({ emoji: o.target.value }),
        style: { width: 64, textAlign: "center", fontSize: 22 },
        "aria-label": "\xC9moji",
      }),
      l.default.createElement("input", {
        className: "inp",
        style: { flex: 1 },
        value: n.titre,
        maxLength: 60,
        placeholder: "Ex : Ferm\xE9 lundi 2 novembre",
        onChange: (o) => r({ titre: o.target.value }),
      }),
    ),
    l.default.createElement("textarea", {
      className: "inp",
      style: { marginTop: 8 },
      value: n.texte,
      maxLength: 400,
      placeholder:
        "Ex : L'\xE9picerie sera exceptionnellement ferm\xE9e lundi. Pensez \xE0 commander vos plateaux avant samedi !",
      onChange: (o) => r({ texte: o.target.value }),
    }),
    l.default.createElement(Ri, { value: n.photo, onChange: (o) => r({ photo: o }) }),
    l.default.createElement("label", { className: "lab" }, "Combien de fois ?"),
    l.default.createElement(
      "div",
      { className: "seg" },
      [
        ["une", "Une seule fois par client"],
        ["chaque", "\xC0 chaque ouverture"],
      ].map(([o, a]) =>
        l.default.createElement(
          "button",
          { key: o, className: n.frequence === o ? "on" : "", onClick: () => r({ frequence: o }) },
          a,
        ),
      ),
    ),
    l.default.createElement(
      "div",
      { style: { marginTop: 8 } },
      l.default.createElement(Zi, { v: n, onChange: (o) => r(o) }),
    ),
    n.active && l.default.createElement(io, { x: n, style: { marginTop: 8 } }),
    l.default.createElement(
      "button",
      {
        className: "btn gh sm",
        style: { marginTop: 10 },
        disabled: !n.titre && !n.texte,
        onClick: () => s(!0),
      },
      "Aper\xE7u",
    ),
    l.default.createElement(
      "div",
      { className: "de", style: { marginTop: 6 } },
      "Si vous modifiez le titre ou le texte, la fen\xEAtre s'affiche \xE0 nouveau \xE0 tous les clients.",
    ),
    i &&
      l.default.createElement(
        "div",
        { className: "pop-fond", onClick: () => s(!1) },
        l.default.createElement(
          "div",
          { className: "pop", onClick: (o) => o.stopPropagation() },
          n.photo && l.default.createElement("img", { src: n.photo, alt: "", className: "pop-ph" }),
          n.emoji && l.default.createElement("div", { className: "pop-em" }, n.emoji),
          n.titre && l.default.createElement("div", { className: "pop-t" }, n.titre),
          n.texte && l.default.createElement("div", { className: "pop-x" }, n.texte),
          l.default.createElement(
            "button",
            { className: "btn", style: { marginTop: 14 }, onClick: () => s(!1) },
            "J'en prends note",
          ),
        ),
      ),
  );
}
function Y9({ d: t, set: e }) {
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Communication"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Pr\xE9venez vos clients : une notification sur leur t\xE9l\xE9phone, ou un bandeau en haut de l'appli.",
    ),
    bw(t)
      ? l.default.createElement(r7, { d: t })
      : l.default.createElement(
          "div",
          { className: "card" },
          l.default.createElement("div", { className: "nm" }, "\u{1F4E3} Notifications"),
          l.default.createElement(
            "div",
            { className: "de" },
            "Pas encore activ\xE9es (r\xE9glage technique d'Eric).",
          ),
        ),
    l.default.createElement(Q9, { d: t, set: e }),
    l.default.createElement(
      "div",
      { className: "card" },
      l.default.createElement(
        "div",
        { className: "row", style: { marginBottom: 10 } },
        l.default.createElement(
          "div",
          null,
          l.default.createElement("div", { className: "nm" }, "Message d'accueil"),
          l.default.createElement("div", { className: "de" }, "Bandeau en haut de l'application"),
        ),
        l.default.createElement(
          "div",
          { className: "rt" },
          l.default.createElement(ze, {
            on: t.annonce.active,
            set: () => e("annonce", (n) => ({ ...n, active: !n.active })),
          }),
        ),
      ),
      l.default.createElement("textarea", {
        className: "inp",
        placeholder:
          "Ex : Fermeture exceptionnelle jeudi 14 \u2014 commandes de plateaux jusqu'\xE0 mercredi soir",
        value: t.annonce.text,
        onChange: (n) => e("annonce", (r) => ({ ...r, text: n.target.value })),
      }),
      t.annonce.active && l.default.createElement(io, { x: t.annonce, style: { marginTop: 8 } }),
      l.default.createElement(
        "div",
        { style: { marginTop: 8 } },
        l.default.createElement(Zi, { v: t.annonce, onChange: (n) => e("annonce", n) }),
      ),
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: 7, marginTop: 9 } },
        [
          ["apple", "#6E9B3A", "Vert"],
          ["terra", "#C27B42", "Orange"],
          ["forest", "#1C433B", "Fonc\xE9"],
        ].map(([n, r, i]) =>
          l.default.createElement(
            "button",
            {
              key: n,
              onClick: () => e("annonce", (s) => ({ ...s, couleur: n })),
              style: {
                flex: 1,
                padding: "8px 0",
                borderRadius: 9,
                cursor: "pointer",
                fontFamily: "var(--body)",
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
                background: r,
                border: t.annonce.couleur === n ? "2px solid #22302A" : "2px solid transparent",
              },
            },
            i,
          ),
        ),
      ),
    ),
  );
}
async function J9(t, e, n, r) {
  let i = n.conv;
  if (!i) {
    let a = String(n.tel || "").replace(/\D/g, "");
    i = a.length >= 10 ? t.conversations.find((u) => String(u.tel || "").replace(/\D/g, "") === a)?.id : null;
  }
  let s = Date.now(),
    o = _n(de);
  if (i) o.update(xe(de, "conversations", i), { maj: s, dernier: "Vous : " + uf(r), attente: !1 });
  else {
    let a = xe(Ge(de, "conversations"));
    ((i = a.id),
      o.set(a, {
        nom: String(n.nom || "Client").slice(0, 40),
        tel: String(n.tel || "").slice(0, 20),
        cree: s,
        maj: s,
        dernier: "Vous : " + uf(r),
        attente: !1,
        via: n.id,
      }));
  }
  (o.set(xe(Ge(de, "conversations", i, "messages")), { de: "epicerie", texte: r, date: s }),
    n.conv !== i && o.update(xe(de, e, n.id), { conv: i }),
    await o.commit(),
    Pa(t.cmd, "msg", i));
}
var X9 = {
  commandes: [
    "Nous vous confirmons la bonne prise en compte de votre commande \u{1F601}",
    "Votre commande est pr\xEAte, \xE0 tout \xE0 l'heure !",
    "Petit changement : il me manque un produit, je vous propose de le remplacer par\u2026 D'accord pour vous ?",
    "Pouvez-vous me rappeler \xE0 l'\xE9picerie s'il vous pla\xEEt ?",
  ],
  resas: [
    "Nous vous confirmons la bonne prise en compte de votre r\xE9servation \u{1F601}",
    "C'est mis de c\xF4t\xE9 pour vous, \xE0 tout \xE0 l'heure !",
    "Petit souci : il n'en reste plus, d\xE9sol\xE9e ! Je vous pr\xE9viens au prochain arrivage.",
    "N'oubliez pas de passer les chercher avant la fermeture \u{1F60A}",
  ],
};
function mN({ d: t, cible: e, x: n, onClose: r }) {
  let [i, s] = (0, l.useState)(""),
    [o, a] = (0, l.useState)(!1),
    u = async () => {
      let d = i.trim().slice(0, 1e3);
      if (!(!d || o)) {
        a(!0);
        try {
          (await J9(t, e, n, d), r(!0));
        } catch {
          (ft("Message non envoy\xE9. V\xE9rifiez la connexion et r\xE9essayez."), a(!1));
        }
      }
    };
  return l.default.createElement(
    ut,
    { titre: "\u{1F4AC} \xC9crire \xE0 " + (n.nom || "ce client"), onClose: () => r(!1) },
    l.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 8 } },
      "Le message arrive dans l'application du client",
      n.tel ? " (" + n.tel + ")" : "",
      ". Vous verrez sa r\xE9ponse dans l'onglet Messages.",
    ),
    l.default.createElement(
      "div",
      { className: "motifs", style: { margin: "0 0 8px" } },
      (X9[e] || []).map((d) =>
        l.default.createElement(
          "button",
          { key: d, onClick: () => s(d) },
          d.length > 40 ? d.slice(0, 38) + "\u2026" : d,
        ),
      ),
    ),
    l.default.createElement("textarea", {
      className: "inp",
      rows: 4,
      autoFocus: !0,
      value: i,
      maxLength: 1e3,
      placeholder: "Votre message\u2026",
      onChange: (d) => s(d.target.value),
    }),
    l.default.createElement(
      "button",
      { className: "btn", style: { marginTop: 10 }, disabled: !i.trim() || o, onClick: u },
      o ? "Envoi\u2026" : "Envoyer le message",
    ),
  );
}
function Z9({ d: t }) {
  let [e, n] = (0, l.useState)(!1),
    [r, i] = (0, l.useState)(null),
    s = [...t.resas].sort((h, p) => (p.cree || 0) - (h.cree || 0)),
    o = s.filter((h) => h.statut === "reservee"),
    a = s.filter((h) => h.statut !== "reservee").slice(0, e ? 50 : 5),
    u = async (h, p) => {
      try {
        let m = _n(de);
        m.update(xe(de, "resas", h.id), { statut: p });
        let w = t.jour.items.find((E) => String(E.id) === String(h.item));
        (p !== "retiree" &&
          w &&
          m.update(xe(de, "jour", String(h.item)), {
            reserves: (parseInt(w.reserves) || 0) >= (h.qte || 0) ? Bi(-(h.qte || 0)) : 0,
          }),
          await m.commit());
      } catch {
        ft("Modification impossible. V\xE9rifiez la connexion.");
      }
    };
  if (!s.length) return null;
  let d = ({ r: h }) =>
    l.default.createElement(
      "div",
      { className: "card resa-adm " + h.statut, key: h.id },
      l.default.createElement(
        "div",
        { className: "row", style: { alignItems: "flex-start" } },
        l.default.createElement(
          "div",
          { style: { minWidth: 0, flex: 1 } },
          l.default.createElement(
            "div",
            { className: "nm" },
            h.qte,
            " \xD7 ",
            h.titre,
            h.total > 0 &&
              l.default.createElement(
                "span",
                { style: { color: "var(--apple)", marginLeft: 6 } },
                An(h.total),
              ),
          ),
          l.default.createElement(
            "div",
            { className: "de" },
            l.default.createElement("b", { style: { color: "var(--ink)" } }, h.nom),
            h.tel &&
              l.default.createElement(
                l.default.Fragment,
                null,
                " \xB7 ",
                l.default.createElement("a", { href: "tel:" + h.tel.replace(/\s/g, "") }, h.tel),
              ),
            " \xB7 ",
            h.retrait || "retrait \xE0 l'\xE9picerie",
          ),
          l.default.createElement(
            "div",
            { className: "de" },
            "N\xB0 ",
            h.numero,
            " \xB7 r\xE9serv\xE9 \xE0 ",
            new Date(h.cree || 0).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
            h.statut !== "reservee" &&
              " \xB7 " +
                ({ retiree: "\u2713 Retir\xE9", absent: "Pas venu", annulee: "Annul\xE9" }[h.statut] ||
                  h.statut),
          ),
        ),
      ),
      h.statut === "reservee" &&
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 6, marginTop: 8 } },
          l.default.createElement(
            "button",
            { className: "btn sm", style: { flex: 2 }, onClick: () => u(h, "retiree") },
            "\u2713 Retir\xE9",
          ),
          l.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { flex: 1 },
              onClick: async () =>
                (await De("Le client n'est pas venu ? L'article sera remis en vente.")) && u(h, "absent"),
            },
            "Pas venu",
          ),
          l.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { flex: 1, color: "var(--red)" },
              onClick: async () =>
                (await De("Annuler cette r\xE9servation ? L'article sera remis en vente.")) &&
                u(h, "annulee"),
            },
            "Annuler",
          ),
        ),
      l.default.createElement(
        "button",
        { className: "btn gh sm", style: { marginTop: 8, width: "auto" }, onClick: () => i(h) },
        "\u{1F4AC} \xC9crire au client",
        h.conv ? " (conversation en cours)" : "",
      ),
    );
  return l.default.createElement(
    "div",
    { style: { marginBottom: 16 } },
    l.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 6 } },
      "\u{1F9FA} R\xE9servations ",
      o.length ? "\u2014 " + o.length + " \xE0 retirer" : "",
    ),
    !o.length &&
      l.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 8 } },
        "Aucune r\xE9servation en attente.",
      ),
    l.default.createElement(
      "div",
      { className: "grille" },
      o.map((h) => l.default.createElement(d, { r: h, key: h.id })),
    ),
    !!a.length &&
      l.default.createElement(
        "details",
        { style: { marginTop: 6 } },
        l.default.createElement(
          "summary",
          { className: "de", style: { cursor: "pointer" } },
          "Historique r\xE9cent",
        ),
        l.default.createElement(
          "div",
          { className: "grille", style: { marginTop: 6 } },
          a.map((h) => l.default.createElement(d, { r: h, key: h.id })),
        ),
        !e &&
          l.default.createElement("button", { className: "btn gh sm", onClick: () => n(!0) }, "Voir plus"),
      ),
    r && l.default.createElement(mN, { d: t, cible: "resas", x: r, onClose: () => i(null) }),
  );
}
function rN({ v: t, onChange: e }) {
  let n = (parseInt(t.stock) || 0) > 0 || t.resaOn,
    r = parseInt(t.stock) >= 999;
  return l.default.createElement(
    "div",
    { className: "choix-bloc", style: { background: "#F3F8EC", borderColor: "#D6E6C2" } },
    l.default.createElement(
      "div",
      { className: "tog", style: { borderTop: "none", paddingTop: 0 } },
      l.default.createElement(
        "div",
        null,
        l.default.createElement(
          "div",
          { style: { fontSize: 13, fontWeight: 800 } },
          "\u{1F9FA} R\xE9servable dans l'application",
        ),
        l.default.createElement(
          "div",
          { className: "de" },
          "Les clients r\xE9servent, vous mettez de c\xF4t\xE9 (fa\xE7on Too Good To Go)",
        ),
      ),
      l.default.createElement(
        "div",
        { className: "rt" },
        l.default.createElement(ze, {
          on: !!n,
          set: () =>
            e(
              n
                ? { ...t, stock: 0, resaOn: !1 }
                : { ...t, stock: "", resaOn: !0, retrait: t.retrait || "aujourd'hui avant la fermeture" },
            ),
        }),
      ),
    ),
    n &&
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, marginTop: 6 } },
        l.default.createElement(
          "div",
          { style: { width: 110, flexShrink: 0 } },
          l.default.createElement("label", { className: "lab" }, "Quantit\xE9 dispo."),
          l.default.createElement("input", {
            className: "inp",
            type: "number",
            inputMode: "numeric",
            min: "1",
            max: "998",
            value: r ? "" : t.stock || "",
            placeholder: "Sans limite",
            onChange: (i) => e({ ...t, stock: i.target.value, resaOn: i.target.value.trim() !== "0" }),
          }),
        ),
        l.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          l.default.createElement("label", { className: "lab" }, "\xC0 retirer\u2026"),
          l.default.createElement("input", {
            className: "inp",
            value: t.retrait || "",
            maxLength: 60,
            placeholder: "aujourd'hui entre 17h et 19h",
            onChange: (i) => e({ ...t, retrait: i.target.value }),
          }),
        ),
      ),
    n &&
      l.default.createElement(
        "div",
        { className: "de", style: { marginTop: 4 } },
        "Laissez la quantit\xE9 vide si vous en avez beaucoup (sans limite). Tapez 0 pour arr\xEAter les r\xE9servations.",
      ),
    n &&
      (parseInt(t.reserves) || 0) > 0 &&
      l.default.createElement(
        "div",
        { className: "de", style: { marginTop: 6 } },
        "D\xE9j\xE0 r\xE9serv\xE9s : ",
        l.default.createElement("b", null, t.reserves),
        r ? "" : " / " + t.stock,
        l.default.createElement(
          "button",
          {
            className: "lienadm",
            style: { display: "inline", marginLeft: 8 },
            onClick: async () => {
              (await De("Remettre le compteur de r\xE9servations \xE0 0 ?")) &&
                (await R9(t.id)) &&
                e({ ...t, reserves: 0 });
            },
          },
          "remettre \xE0 0",
        ),
      ),
  );
}
var iN = (t) => {
  let e = String(t.stock ?? "").trim() === "",
    n = t.resaOn && e ? 999 : Math.max(0, Math.min(999, parseInt(t.stock) || 0)),
    { resaOn: r, ...i } = t;
  return {
    ...i,
    stock: n,
    reserves: parseInt(t.reserves) || 0,
    retrait: n ? (t.retrait || "").trim().slice(0, 60) : "",
  };
};
async function R9(t) {
  if (!t) return !0;
  try {
    let e = _n(de);
    return (e.update(xe(de, "jour", String(t)), { reserves: 0 }), await e.commit(), !0);
  } catch {
    return (ft("Impossible de remettre le compteur \xE0 0. V\xE9rifiez la connexion."), !1);
  }
}
var lt = (t) =>
  String(t ?? "").replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
function e7(t, e) {
  let n = t.commandes
      .filter((p) => (er(p) || "") === e && !["refusee", "annulee", "remise"].includes(p.statut))
      .sort((p, m) => (p.heure || "99").localeCompare(m.heure || "99")),
    r = new Date(e + "T00:00");
  r.setDate(r.getDate() - 1);
  let i = new Date(e + "T23:59:59"),
    s = t.resas.filter(
      (p) => p.statut === "reservee" && (p.cree || 0) >= r.getTime() && (p.cree || 0) <= i.getTime(),
    ),
    o = {};
  n.forEach((p) =>
    (p.lignes || []).forEach((m) => {
      let w = String(m.nom || "Plateau").split(" \u2014 ")[0];
      o[w] = (o[w] || 0) + (m.personnes || 0);
    }),
  );
  let a = new Date(e + "T12:00").toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    u = (p) => {
      let m = (p.remarque || "")
        .split(
          `
`,
        )
        .filter(Boolean);
      return `<div class="c"><div class="h"><span class="box"></span><b>${lt(p.heure ? lc(p.heure) : "\u2014")}</b> \xB7 ${lt(p.nom)} \xB7 ${lt(p.tel)}
      <span class="st">${p.statut === "nouvelle" ? "\u26A0 \xC0 VALIDER" : lt(uw[p.mode] || p.mode)}</span></div>
      ${p.adresse ? `<div class="ad">\u{1F4CD} ${lt(p.adresse)}</div>` : ""}
      <ul>${(p.lignes || []).map((w) => `<li><b>${lt(w.personnes)} pers.</b> \u2014 ${lt(w.nom)}</li>`).join("")}</ul>
      ${m.map((w) => (w.startsWith("\u26A0\uFE0F") ? `<div class="al">${lt(w)}</div>` : `<div class="rq">\xAB ${lt(w)} \xBB</div>`)).join("")}
      <div class="t">N\xB0 ${lt(p.numero)} \xB7 ${An(p.total)}</div></div>`;
    },
    d = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Pr\xE9paration du ${lt(a)}</title><style>
    body{font-family:Arial,sans-serif;color:#222;margin:24px;font-size:13px}h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:22px 0 8px;border-bottom:2px solid #1C433B;padding-bottom:4px}
    .sub{color:#666;margin-bottom:10px}.c{border:1px solid #bbb;border-radius:8px;padding:10px 12px;margin-bottom:10px;page-break-inside:avoid}
    .h{font-size:14px}.box{display:inline-block;width:14px;height:14px;border:2px solid #222;border-radius:3px;vertical-align:-2px;margin-right:6px}
    .st{float:right;font-weight:bold;color:#1C433B}.ad{color:#555;margin-top:4px}ul{margin:6px 0 4px 18px;padding:0}li{margin:2px 0}
    .al{font-weight:bold;color:#a00;border:1px solid #a00;border-radius:5px;padding:4px 7px;margin:5px 0}.rq{font-style:italic;color:#444}.t{color:#666;font-size:11.5px;margin-top:4px}
    table{border-collapse:collapse}td{padding:3px 12px 3px 0}.vide{color:#888;font-style:italic}@media print{button{display:none}}
  </style></head><body>
  <button onclick="print()" style="float:right;padding:8px 16px;font-size:14px">\u{1F5A8}\uFE0F Imprimer</button>
  <h1>Pr\xE9paration \u2014 ${lt(a)}</h1><div class="sub">${lt(t.store.name)} \xB7 \xE9dit\xE9e le ${new Date().toLocaleString("fr-FR")}</div>
  <h2>Plateaux (${n.length} commande${n.length > 1 ? "s" : ""})</h2>
  ${
    Object.keys(o).length
      ? `<table>${Object.entries(o)
          .map(([p, m]) => `<tr><td><b>${lt(p)}</b></td><td>${m} personnes au total</td></tr>`)
          .join("")}</table><br>`
      : ""
  }
  ${n.length ? n.map(u).join("") : '<p class="vide">Aucun plateau \xE0 pr\xE9parer ce jour-l\xE0.</p>'}
  <h2>R\xE9servations anti-gaspi \xE0 mettre de c\xF4t\xE9 (${s.length})</h2>
  ${s.length ? s.map((p) => `<div class="c"><span class="box"></span><b>${lt(p.qte)} \xD7 ${lt(p.titre)}</b> \u2014 ${lt(p.nom)} ${lt(p.tel)} \xB7 \xE0 retirer ${lt(p.retrait || "\xE0 l'\xE9picerie")} <span class="st">${lt(p.numero)}</span></div>`).join("") : '<p class="vide">Aucune r\xE9servation en attente.</p>'}
  </body></html>`,
    h = window.open("", "_blank");
  if (!h)
    return ft("La fen\xEAtre a \xE9t\xE9 bloqu\xE9e : autorisez les fen\xEAtres (pop-up) pour ce site.");
  (h.document.open(), h.document.write(d), h.document.close());
}
function t7({ d: t }) {
  let [e, n] = (0, l.useState)(Bn()),
    r = (() => {
      let i = new Date();
      return (i.setDate(i.getDate() + 1), i.toLocaleDateString("sv-SE"));
    })();
  return l.default.createElement(
    "div",
    { className: "card prepa" },
    l.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 6 } },
      "\u{1F5A8}\uFE0F Feuille de pr\xE9paration",
    ),
    l.default.createElement(
      "div",
      { style: { display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" } },
      l.default.createElement(
        "button",
        { className: "btn sm " + (e === Bn() ? "" : "gh"), onClick: () => n(Bn()) },
        "Aujourd'hui",
      ),
      l.default.createElement(
        "button",
        { className: "btn sm " + (e === r ? "" : "gh"), onClick: () => n(r) },
        "Demain",
      ),
      l.default.createElement("input", {
        className: "inp",
        type: "date",
        value: e,
        onChange: (i) => n(i.target.value || Bn()),
        style: { width: "auto", flex: "1 1 140px", padding: "8px 10px" },
      }),
      l.default.createElement(
        "button",
        { className: "btn terra sm", onClick: () => e7(t, e) },
        "Ouvrir / imprimer",
      ),
    ),
  );
}
var pw = (t) => {
    let e = new Date(t);
    return e.getFullYear() + "-" + String(e.getMonth() + 1).padStart(2, "0");
  },
  bw = (t) => !!t.push?.vapid && ac(Er(t.cmd).script);
function gN(t) {
  let [e, n] = (0, l.useState)(null);
  return (
    (0, l.useEffect)(
      () =>
        t
          ? fr(
              Ge(de, "appareils"),
              (r) => n(r.docs.map((i) => i.data())),
              () => n([]),
            )
          : void 0,
      [t],
    ),
    { total: e ? e.length : null, promo: (e || []).filter((r) => r.promo).length }
  );
}
function vN({ d: t, abonnes: e, titre0: n = "", texte0: r = "", onFini: i, onAnnuler: s }) {
  let [o, a] = (0, l.useState)(n.slice(0, 50)),
    [u, d] = (0, l.useState)(r.slice(0, 160)),
    [h, p] = (0, l.useState)(!1),
    m = async () => {
      let w = o.trim(),
        E = u.trim();
      if (
        !(!w || !E || h) &&
        (await De(
          "Envoyer cette notification \xE0 " +
            e +
            ` t\xE9l\xE9phone(s) ?

\xAB ` +
            w +
            ` \xBB
` +
            E,
        ))
      ) {
        p(!0);
        try {
          let A = xe(Ge(de, "diffusions"));
          (await ln(A, { titre: w.slice(0, 50), texte: E.slice(0, 160), cree: Date.now() }),
            await Pa(t.cmd, "diff", A.id),
            i?.());
        } catch {
          ft("Envoi impossible. V\xE9rifiez la connexion internet et r\xE9essayez.");
        }
        p(!1);
      }
    };
  return l.default.createElement(
    "div",
    { style: { marginTop: 10 } },
    l.default.createElement("label", { className: "lab" }, "Titre"),
    l.default.createElement("input", {
      className: "inp",
      value: o,
      maxLength: 50,
      placeholder: "Ex : Arrivage de potimarrons \u{1F383}",
      onChange: (w) => a(w.target.value),
    }),
    l.default.createElement("label", { className: "lab" }, "Message"),
    l.default.createElement("textarea", {
      className: "inp",
      value: u,
      maxLength: 160,
      placeholder: "Ex : Tout frais du producteur, r\xE9servez-les dans l'appli !",
      onChange: (w) => d(w.target.value),
    }),
    l.default.createElement(
      "div",
      { className: "de", style: { margin: "4px 2px 8px" } },
      160 - u.length,
      " caract\xE8res restants. Envoy\xE9 seulement aux ",
      e,
      " client(s) qui ont accept\xE9 les bons plans.",
      " ",
      "\xC9vitez d'en envoyer trop souvent, sinon les clients les d\xE9sactivent.",
    ),
    l.default.createElement(
      "div",
      { style: { display: "flex", gap: 8 } },
      l.default.createElement("button", { className: "btn gh", style: { flex: 1 }, onClick: s }, "Annuler"),
      l.default.createElement(
        "button",
        { className: "btn", style: { flex: 2 }, disabled: !o.trim() || !u.trim() || h || !e, onClick: m },
        h ? "Envoi\u2026" : "Envoyer la notification",
      ),
    ),
  );
}
function n7(t, e) {
  let n = (o) => Number(String(o).replace(",", ".")).toFixed(2).replace(".", ",") + " \u20AC",
    r =
      (t.type === "gaspi"
        ? "\u23F3 Date courte : "
        : t.type === "panier"
          ? "\u{1F9FA} Panier anti-gaspi : "
          : "\u{1F3F7}\uFE0F Promo : ") + t.titre,
    i =
      t.prix !== "" && t.prix != null
        ? n(t.prix) +
          (t.unite ? " / " + t.unite : "") +
          (t.ancienPrix ? " au lieu de " + n(t.ancienPrix) : "")
        : "",
    s =
      (parseInt(t.stock) || 0) > 0
        ? "R\xE9servation possible dans l'appli !"
        : "\xC0 d\xE9couvrir \xE0 l'\xE9picerie.";
  return { titre: r, texte: [i, t.note, s].filter(Boolean).join(" \u2014 ") };
}
function r7({ d: t }) {
  let e = bw(t),
    n = gN(e),
    [r, i] = (0, l.useState)([]),
    [s, o] = (0, l.useState)(!1);
  return (
    (0, l.useEffect)(
      () =>
        e
          ? fr(
              Ge(de, "diffusions"),
              (a) =>
                i(
                  a.docs
                    .map((u) => ({ ...u.data(), id: u.id }))
                    .sort((u, d) => (d.cree || 0) - (u.cree || 0))
                    .slice(0, 5),
                ),
              () => {},
            )
          : void 0,
      [e],
    ),
    e
      ? l.default.createElement(
          "div",
          { className: "card" },
          l.default.createElement(
            "div",
            { className: "row" },
            l.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              l.default.createElement("div", { className: "nm" }, "\u{1F4E3} Pr\xE9venir mes clients"),
              l.default.createElement(
                "div",
                { className: "de" },
                n.total === null
                  ? "\u2026"
                  : n.total +
                      " t\xE9l\xE9phone(s) re\xE7oivent les notifications \xB7 " +
                      n.promo +
                      " pour les bons plans",
              ),
            ),
            !s &&
              l.default.createElement(
                "button",
                { className: "btn sm", style: { width: "auto" }, disabled: !n.promo, onClick: () => o(!0) },
                "\xC9crire",
              ),
          ),
          s &&
            l.default.createElement(vN, {
              d: t,
              abonnes: n.promo,
              onFini: () => o(!1),
              onAnnuler: () => o(!1),
            }),
          !!r.length &&
            l.default.createElement(
              "div",
              { style: { marginTop: 10 } },
              r
                .slice(0, 3)
                .map((a) =>
                  l.default.createElement(
                    "div",
                    {
                      key: a.id,
                      className: "de",
                      style: { padding: "4px 0", borderTop: "1px solid var(--line)" },
                    },
                    l.default.createElement("b", null, a.titre),
                    " \xB7 ",
                    new Date(a.cree).toLocaleDateString("fr-FR", { day: "numeric", month: "short" }),
                    " \u2014 ",
                    a.envoye == null
                      ? "en cours d'envoi\u2026"
                      : "re\xE7ue par " + a.envoye + " t\xE9l\xE9phone(s)",
                  ),
                ),
            ),
        )
      : null
  );
}
function i7({ d: t }) {
  let e = t.commandes.filter((m) => !["refusee", "annulee"].includes(m.statut)),
    n = new Date(),
    r = Array.from({ length: 6 }, (m, w) => {
      let E = new Date(n.getFullYear(), n.getMonth() - 5 + w, 1);
      return { cle: pw(E), nom: E.toLocaleDateString("fr-FR", { month: "short" }) };
    }),
    i = Object.fromEntries(r.map((m) => [m.cle, { n: 0, ca: 0, r: 0 }]));
  (e.forEach((m) => {
    let w = pw(m.cree || 0);
    i[w] && (i[w].n++, (i[w].ca += Number(m.total) || 0));
  }),
    t.resas
      .filter((m) => !["annulee", "absent"].includes(m.statut))
      .forEach((m) => {
        let w = pw(m.cree || 0);
        i[w] && i[w].r++;
      }));
  let s = i[r[5].cle],
    o = i[r[4].cle],
    a = Math.max(1, ...r.map((m) => i[m.cle].ca)),
    u = {};
  e.filter((m) => (m.cree || 0) > Date.now() - 90 * 864e5).forEach((m) =>
    (m.lignes || []).forEach((w) => {
      let E = String(w.nom || "Plateau").split(" \u2014 ")[0];
      u[E] = (u[E] || 0) + 1;
    }),
  );
  let d = Object.entries(u)
      .sort((m, w) => w[1] - m[1])
      .slice(0, 3),
    h = new Set(t.commandes.map((m) => (m.tel || "").replace(/\D/g, "")).filter(Boolean)).size,
    p = (m, w) =>
      w ? (m >= w ? "\u25B2 " : "\u25BC ") + Math.abs(Math.round(((m - w) / w) * 100)) + " %" : "";
  return l.default.createElement(
    "div",
    { className: "card stats" },
    l.default.createElement("div", { className: "nm", style: { marginBottom: 10 } }, "\u{1F4CA} Ce mois-ci"),
    l.default.createElement(
      "div",
      { className: "grid2", style: { marginBottom: 12 } },
      l.default.createElement(
        "div",
        { className: "stat" },
        l.default.createElement("b", null, s.n),
        l.default.createElement(
          "span",
          null,
          "commandes de plateaux ",
          l.default.createElement("i", null, p(s.n, o.n)),
        ),
      ),
      l.default.createElement(
        "div",
        { className: "stat" },
        l.default.createElement("b", null, An(s.ca).replace(",00", "")),
        l.default.createElement(
          "span",
          null,
          "de plateaux ",
          l.default.createElement("i", null, p(s.ca, o.ca)),
        ),
      ),
      l.default.createElement(
        "div",
        { className: "stat" },
        l.default.createElement("b", null, s.r),
        l.default.createElement("span", null, "r\xE9servations anti-gaspi"),
      ),
      l.default.createElement(
        "div",
        { className: "stat" },
        l.default.createElement(
          "b",
          null,
          t.conversations.filter((m) => (m.maj || 0) > Date.now() - 30 * 864e5).length,
        ),
        l.default.createElement("span", null, "conversations (30 j)"),
      ),
    ),
    l.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 4 } },
      "Plateaux command\xE9s sur 6 mois (\u20AC)",
    ),
    l.default.createElement(
      "div",
      { className: "barres" },
      r.map((m) => {
        let w = i[m.cle];
        return l.default.createElement(
          "div",
          { className: "bcol", key: m.cle, title: w.n + " commande(s) \xB7 " + An(w.ca) },
          l.default.createElement("span", { className: "bv" }, w.ca ? Math.round(w.ca) : ""),
          l.default.createElement("i", { style: { height: Math.max(3, (w.ca / a) * 90) + "px" } }),
          l.default.createElement("span", { className: "bm" }, m.nom),
        );
      }),
    ),
    l.default.createElement(
      "div",
      { style: { display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 } },
      l.default.createElement(
        "div",
        { style: { flex: "1 1 200px" } },
        l.default.createElement(
          "div",
          { className: "de", style: { fontWeight: 800 } },
          "Plateaux les plus demand\xE9s (3 mois)",
        ),
        d.length
          ? d.map(([m, w], E) =>
              l.default.createElement(
                "div",
                { key: m, className: "de", style: { color: "var(--ink)" } },
                ["\u{1F947}", "\u{1F948}", "\u{1F949}"][E],
                " ",
                m,
                " \u2014 ",
                w,
                " fois",
              ),
            )
          : l.default.createElement("div", { className: "de" }, "Pas encore de commande."),
      ),
      l.default.createElement(
        "div",
        { style: { flex: "1 1 200px" } },
        l.default.createElement(
          "div",
          { className: "de", style: { fontWeight: 800 } },
          "Vos clients dans l'appli",
        ),
        l.default.createElement(
          "div",
          { className: "de", style: { color: "var(--ink)" } },
          h,
          " ont d\xE9j\xE0 command\xE9 \xB7 ",
          t.conversations.length,
          " vous ont \xE9crit \xB7 ",
          t.clients.length,
          " carte",
          t.clients.length > 1 ? "s" : "",
          " fid\xE9lit\xE9",
        ),
      ),
    ),
  );
}
function s7({ d: t, set: e }) {
  let n = Array.isArray(t.fermetures) ? t.fermetures : [],
    [r, i] = (0, l.useState)({ du: "", au: "", motif: "" }),
    s = Bn(),
    o = () => {
      r.du &&
        (e("fermetures", (a) =>
          [
            ...(Array.isArray(a) ? a : []),
            { du: r.du, au: r.au && r.au >= r.du ? r.au : r.du, motif: r.motif.trim().slice(0, 40) },
          ].sort((u, d) => u.du.localeCompare(d.du)),
        ),
        i({ du: "", au: "", motif: "" }));
    };
  return l.default.createElement(
    l.default.Fragment,
    null,
    l.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 4px" } },
      "Fermetures exceptionnelles",
    ),
    l.default.createElement(
      "div",
      { className: "sub", style: { margin: "0 0 8px" } },
      "Cong\xE9s, jours f\xE9ri\xE9s\u2026 Saisissez-les une fois : l'application affiche un bandeau 14 jours avant, indique \xAB Ferm\xE9 \xBB et bloque les commandes ces jours-l\xE0.",
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      n
        .filter((a) => (a.au || a.du) >= s)
        .map((a, u) =>
          l.default.createElement(
            "div",
            { className: "tog", key: a.du + u },
            l.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              a.du === a.au ? "Le " + Yi(a.du) : "Du " + Yi(a.du) + " au " + Yi(a.au),
              a.motif ? " \xB7 " + a.motif : "",
              a.du <= s &&
                l.default.createElement(
                  "span",
                  { className: "pill promo", style: { marginLeft: 6 } },
                  "En cours",
                ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: () =>
                    e("fermetures", (d) =>
                      (d || []).filter((h) => !(h.du === a.du && h.au === a.au && h.motif === a.motif)),
                    ),
                },
                he.bin(),
              ),
            ),
          ),
        ),
      !n.some((a) => (a.au || a.du) >= s) &&
        l.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 8 } },
          "Aucune fermeture pr\xE9vue.",
        ),
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 } },
        l.default.createElement(
          "div",
          { style: { flex: "1 1 130px" } },
          l.default.createElement("label", { className: "lab" }, "Du"),
          l.default.createElement("input", {
            className: "inp",
            type: "date",
            min: s,
            value: r.du,
            onChange: (a) => i({ ...r, du: a.target.value }),
          }),
        ),
        l.default.createElement(
          "div",
          { style: { flex: "1 1 130px" } },
          l.default.createElement("label", { className: "lab" }, "Au (facultatif)"),
          l.default.createElement("input", {
            className: "inp",
            type: "date",
            min: r.du || s,
            value: r.au,
            onChange: (a) => i({ ...r, au: a.target.value }),
          }),
        ),
        l.default.createElement(
          "div",
          { style: { flex: "2 1 180px" } },
          l.default.createElement("label", { className: "lab" }, "Motif (facultatif)"),
          l.default.createElement("input", {
            className: "inp",
            value: r.motif,
            maxLength: 40,
            placeholder: "Cong\xE9s d'\xE9t\xE9, 11 novembre\u2026",
            onChange: (a) => i({ ...r, motif: a.target.value }),
          }),
        ),
      ),
      l.default.createElement(
        "button",
        { className: "btn sm", style: { marginTop: 8 }, disabled: !r.du, onClick: o },
        "Ajouter la fermeture",
      ),
    ),
  );
}
function o7({ d: t, set: e }) {
  let [n, r] = (0, l.useState)(""),
    [i, s] = (0, l.useState)(""),
    [o, a] = (0, l.useState)(""),
    [u, d] = (0, l.useState)("frais"),
    [h, p] = (0, l.useState)(""),
    [m, w] = (0, l.useState)({ debut: "", fin: "" }),
    [E, A] = (0, l.useState)(!1),
    [S, _] = (0, l.useState)(null),
    [I, T] = (0, l.useState)({ stock: 0, retrait: "" }),
    [M, V] = (0, l.useState)(null),
    O = bw(t),
    b = gN(O),
    v = t.jour?.items || [],
    x = (k) => k === "promo" || k === "gaspi" || k === "panier",
    C = (k) => e("jour", ($) => ({ items: k($?.items || []), maj: Nf() })),
    F = () => {
      n.trim() &&
        (C((k) => [
          iN({
            id: Wr(),
            titre: n.trim(),
            prix: i,
            unite: o,
            type: u,
            note: "",
            photo: "",
            active: !0,
            ancienPrix: x(u) ? h : "",
            debut: m.debut,
            fin: m.fin,
            ...I,
            reserves: 0,
          }),
          ...k,
        ]),
        r(""),
        s(""),
        a(""),
        p(""),
        w({ debut: "", fin: "" }),
        A(!1),
        T({ stock: 0, retrait: "" }));
    },
    P = () => {
      S.titre?.trim() && (C((k) => k.map(($) => ($.id === S.id ? iN(S) : $))), _(null));
    };
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Aujourd'hui"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Le c\u0153ur de l'application : ce qui change chaque jour. Un titre, un prix, c'est publi\xE9. Comptez 20 secondes.",
    ),
    l.default.createElement(Z9, { d: t }),
    l.default.createElement(
      "div",
      { className: "card", style: { background: "#FBF8F1" } },
      l.default.createElement("label", { className: "lab" }, "Quoi de neuf ?"),
      l.default.createElement("input", {
        className: "inp",
        value: n,
        onChange: (k) => r(k.target.value),
        onKeyDown: (k) => k.key === "Enter" && F(),
        placeholder: "Fraises de Bergerac, lasagnes maison\u2026",
      }),
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, marginTop: 8 } },
        l.default.createElement("input", {
          className: "inp",
          style: { flex: 1 },
          type: "number",
          inputMode: "decimal",
          step: "0.01",
          value: i,
          onChange: (k) => s(k.target.value),
          placeholder: "Prix (facultatif)",
        }),
        l.default.createElement("input", {
          className: "inp",
          style: { width: 108 },
          value: o,
          onChange: (k) => a(k.target.value),
          placeholder: "kg, part\u2026",
        }),
      ),
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: 6, marginTop: 9, flexWrap: "wrap" } },
        Cf.map((k) =>
          l.default.createElement(
            "button",
            {
              key: k.id,
              onClick: () => d(k.id),
              style: {
                flex: "1 1 40%",
                padding: "9px 6px",
                borderRadius: 9,
                cursor: "pointer",
                fontFamily: "var(--body)",
                fontSize: 11.5,
                fontWeight: 800,
                color: u === k.id ? "#fff" : k.c,
                background: u === k.id ? k.c : "#fff",
                border: "1.5px solid " + k.c,
              },
            },
            k.label,
          ),
        ),
      ),
      x(u) &&
        l.default.createElement(
          "div",
          { style: { marginTop: 9 } },
          l.default.createElement("label", { className: "lab" }, "Prix avant (barr\xE9)"),
          l.default.createElement("input", {
            className: "inp",
            type: "number",
            inputMode: "decimal",
            step: "0.01",
            value: h,
            onChange: (k) => p(k.target.value),
            placeholder: "Facultatif",
          }),
        ),
      x(u) && l.default.createElement(rN, { v: I, onChange: T }),
      u === "panier" &&
        !n &&
        l.default.createElement(
          "div",
          { className: "de", style: { marginTop: 4 } },
          "Ex : \xAB Panier surprise fruits & l\xE9gumes \xBB, prix 5 \u20AC, prix avant 15 \u20AC (valeur).",
        ),
      E || x(u)
        ? l.default.createElement(
            "div",
            { style: { marginTop: 9 } },
            l.default.createElement(Zi, { v: m, onChange: w }),
          )
        : l.default.createElement(
            "button",
            {
              onClick: () => A(!0),
              style: {
                marginTop: 9,
                border: "none",
                background: "none",
                color: "var(--apple)",
                fontFamily: "var(--body)",
                fontSize: 12,
                fontWeight: 800,
                cursor: "pointer",
                padding: 0,
              },
            },
            "+ Programmer des dates de parution",
          ),
      l.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 10 }, disabled: !n.trim(), onClick: F },
        he.plus(),
        "Publier",
      ),
    ),
    !v.length &&
      l.default.createElement(Vn, {
        t: "Rien pour aujourd'hui",
        s: "Ajoutez au moins un article : c'est ce que vos clients regardent en ouvrant l'application.",
      }),
    l.default.createElement(
      "div",
      { className: "grille" },
      v.map((k) => {
        let $ = Cf.find((Q) => Q.id === k.type) || Cf[0];
        return l.default.createElement(
          "div",
          { className: "card", key: k.id },
          l.default.createElement(
            "div",
            { className: "row" },
            k.photo
              ? l.default.createElement("img", { className: "thumb", src: k.photo, alt: "" })
              : l.default.createElement("div", {
                  style: { width: 6, alignSelf: "stretch", borderRadius: 4, background: $.c, flexShrink: 0 },
                }),
            l.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              l.default.createElement("div", { className: "nm" }, k.titre),
              l.default.createElement(
                "div",
                { className: "de", style: { color: $.c, fontWeight: 700 } },
                $.label,
                k.prix !== "" && k.prix != null
                  ? " \xB7 " + Number(k.prix).toFixed(2) + " \u20AC" + (k.unite ? " / " + k.unite : "")
                  : "",
                !!k.ancienPrix &&
                  l.default.createElement(
                    "span",
                    {
                      style: {
                        textDecoration: "line-through",
                        color: "var(--ink3)",
                        fontWeight: 600,
                        marginLeft: 6,
                      },
                    },
                    Number(k.ancienPrix).toFixed(2),
                    " \u20AC",
                  ),
              ),
              k.note && l.default.createElement("div", { className: "de" }, k.note),
              (parseInt(k.stock) || 0) > 0 &&
                l.default.createElement(
                  "div",
                  { className: "de", style: { fontWeight: 800, color: "#2E7D32" } },
                  "\u{1F9FA} R\xE9servable \xB7 ",
                  parseInt(k.reserves) || 0,
                  parseInt(k.stock) >= 999 ? "" : " / " + k.stock,
                  " r\xE9serv\xE9",
                  (parseInt(k.reserves) || 0) > 1 ? "s" : "",
                  parseInt(k.stock) < 999 && (parseInt(k.reserves) || 0) >= parseInt(k.stock)
                    ? " \xB7 \xC9PUIS\xC9"
                    : "",
                ),
              l.default.createElement(io, { x: k, style: { marginTop: 5 } }),
              O &&
                x(k.type) &&
                k.active !== !1 &&
                l.default.createElement(
                  "button",
                  {
                    className: "btn gh sm",
                    style: { width: "auto", marginTop: 8, padding: "6px 12px" },
                    disabled: !b.promo,
                    title: b.promo ? "" : "Aucun client abonn\xE9 aux bons plans pour l'instant",
                    onClick: () => V(k),
                  },
                  "\u{1F4E3} Pr\xE9venir",
                  b.promo ? " (" + b.promo + ")" : "",
                ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement(ze, {
                on: k.active !== !1,
                set: () => C((Q) => Q.map((Y) => (Y.id === k.id ? { ...Y, active: Y.active === !1 } : Y))),
              }),
              l.default.createElement("button", { className: "ib", onClick: () => _(k) }, he.pen()),
              l.default.createElement(
                "button",
                { className: "ib", onClick: () => C((Q) => Q.filter((Y) => Y.id !== k.id)) },
                he.bin(),
              ),
            ),
          ),
        );
      }),
    ),
    !!v.length &&
      l.default.createElement(
        "button",
        {
          className: "btn gh",
          style: { marginTop: 6, color: "var(--red)" },
          onClick: async () => (await De("Vider la liste du jour ?")) && C(() => []),
        },
        "Vider la liste du jour",
      ),
    M &&
      l.default.createElement(
        ut,
        { titre: "\u{1F4E3} Pr\xE9venir mes clients", onClose: () => V(null) },
        l.default.createElement(
          "div",
          { className: "de" },
          "Le message est pr\xEAt, vous pouvez le modifier avant d'envoyer.",
        ),
        l.default.createElement(vN, {
          d: t,
          abonnes: b.promo,
          ...(({ titre: k, texte: $ }) => ({ titre0: k, texte0: $ }))(n7(M, t)),
          onFini: () => V(null),
          onAnnuler: () => V(null),
        }),
      ),
    S &&
      l.default.createElement(
        ut,
        { titre: "Modifier l'article", onClose: () => _(null) },
        l.default.createElement(Ri, { value: S.photo, onChange: (k) => _(($) => ({ ...$, photo: k })) }),
        l.default.createElement("label", { className: "lab" }, "Titre"),
        l.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: S.titre,
          onChange: (k) => _({ ...S, titre: k.target.value }),
        }),
        l.default.createElement("label", { className: "lab" }, "Pr\xE9cision (facultatif)"),
        l.default.createElement("input", {
          className: "inp",
          value: S.note,
          onChange: (k) => _({ ...S, note: k.target.value }),
          placeholder:
            S.type === "panier"
              ? "Contenu : fruits, l\xE9gumes, laitages du jour\u2026"
              : "Dernier jour, quantit\xE9 limit\xE9e\u2026",
        }),
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          l.default.createElement(
            "div",
            { style: { flex: 1 } },
            l.default.createElement("label", { className: "lab" }, "Prix (\u20AC)"),
            l.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "decimal",
              step: "0.01",
              value: S.prix,
              onChange: (k) => _({ ...S, prix: k.target.value }),
            }),
          ),
          l.default.createElement(
            "div",
            { style: { flex: 1 } },
            l.default.createElement("label", { className: "lab" }, "Unit\xE9"),
            l.default.createElement("input", {
              className: "inp",
              value: S.unite,
              onChange: (k) => _({ ...S, unite: k.target.value }),
            }),
          ),
        ),
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          l.default.createElement(
            "div",
            { style: { flex: 1 } },
            l.default.createElement("label", { className: "lab" }, "Prix avant (barr\xE9)"),
            l.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "decimal",
              step: "0.01",
              value: S.ancienPrix || "",
              onChange: (k) => _({ ...S, ancienPrix: k.target.value }),
              placeholder: "Facultatif",
            }),
          ),
        ),
        l.default.createElement(Zi, { v: S, onChange: _ }),
        x(S.type) && l.default.createElement(rN, { v: S, onChange: _ }),
        l.default.createElement("label", { className: "lab" }, "Cat\xE9gorie"),
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
          Cf.map((k) =>
            l.default.createElement(
              "button",
              {
                key: k.id,
                onClick: () => _({ ...S, type: k.id }),
                style: {
                  flex: "1 1 40%",
                  padding: "9px 6px",
                  borderRadius: 9,
                  cursor: "pointer",
                  fontFamily: "var(--body)",
                  fontSize: 11.5,
                  fontWeight: 800,
                  color: S.type === k.id ? "#fff" : k.c,
                  background: S.type === k.id ? k.c : "#fff",
                  border: "1.5px solid " + k.c,
                },
              },
              k.label,
            ),
          ),
        ),
        l.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: P },
          "Enregistrer",
        ),
      ),
  );
}
function a7({ d: t, set: e }) {
  let [n, r] = (0, l.useState)(null),
    i = () => {
      n.titre?.trim() &&
        (e("offres", (s) => (n.id ? s.map((o) => (o.id === n.id ? n : o)) : [...s, { ...n, id: Wr() }])),
        r(null));
    };
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Paniers & plateaux"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Vos plateaux, paniers garnis et corbeilles de fruits, avec photo et prix. Regroupez-les par type.",
    ),
    l.default.createElement(
      "button",
      {
        className: "btn terra",
        onClick: () =>
          r({
            titre: "",
            desc: "",
            prix: "",
            portions: "",
            type: "Plateaux",
            badge: "",
            photo: "",
            active: !0,
          }),
      },
      he.plus(),
      "Nouvelle offre",
    ),
    l.default.createElement("div", { style: { height: 12 } }),
    !t.offres.length &&
      l.default.createElement(Vn, {
        t: "Aucune offre",
        s: "Ajoutez par exemple \xAB Plateau ap\xE9ritif 4-6 personnes \xBB avec sa photo : c'est ce que vos clients regardent en premier.",
      }),
    l.default.createElement(
      "div",
      { className: "grille" },
      t.offres.map((s) =>
        l.default.createElement(
          "div",
          { className: "card", key: s.id },
          l.default.createElement(
            "div",
            { className: "row" },
            s.photo
              ? l.default.createElement("img", { className: "thumb", src: s.photo, alt: "" })
              : l.default.createElement("div", { className: "thumb" }),
            l.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              l.default.createElement("div", { className: "nm" }, s.titre),
              l.default.createElement(
                "div",
                { className: "de" },
                s.type,
                s.portions ? " \xB7 " + s.portions : "",
              ),
              l.default.createElement(
                "div",
                { style: { marginTop: 5 } },
                l.default.createElement(io, { x: s, fem: !0 }),
                l.default.createElement(
                  "span",
                  { style: { fontSize: 13, fontWeight: 800, color: "var(--apple)", marginLeft: 6 } },
                  s.prix ? Number(s.prix).toFixed(2) + " \u20AC" : "Sur devis",
                ),
              ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement("button", { className: "ib", onClick: () => r(s) }, he.pen()),
              l.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer \xAB " + s.titre + " \xBB ?")) &&
                    e("offres", (o) => o.filter((a) => a.id !== s.id)),
                },
                he.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    n &&
      l.default.createElement(
        ut,
        { titre: n.id ? "Modifier l'offre" : "Nouvelle offre", onClose: () => r(null) },
        l.default.createElement(Ri, { value: n.photo, onChange: (s) => r((o) => ({ ...o, photo: s })) }),
        l.default.createElement("label", { className: "lab" }, "Titre"),
        l.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: n.titre,
          onChange: (s) => r({ ...n, titre: s.target.value }),
          placeholder: "Plateau charcuterie & fromages",
        }),
        l.default.createElement("label", { className: "lab" }, "Composition"),
        l.default.createElement("textarea", {
          className: "inp",
          value: n.desc,
          onChange: (s) => r({ ...n, desc: s.target.value }),
          placeholder: "Comt\xE9, morbier, saucisson, jambon sec, raisins\u2026",
        }),
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          l.default.createElement(
            "div",
            { style: { flex: 1 } },
            l.default.createElement("label", { className: "lab" }, "Prix (\u20AC)"),
            l.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "decimal",
              step: "0.01",
              value: n.prix,
              onChange: (s) => r({ ...n, prix: s.target.value }),
              placeholder: "Laisser vide = sur devis",
            }),
          ),
          l.default.createElement(
            "div",
            { style: { flex: 1 } },
            l.default.createElement("label", { className: "lab" }, "Pour"),
            l.default.createElement("input", {
              className: "inp",
              value: n.portions,
              onChange: (s) => r({ ...n, portions: s.target.value }),
              placeholder: "4-6 pers.",
            }),
          ),
        ),
        l.default.createElement("label", { className: "lab" }, "Type (sert de titre de section)"),
        l.default.createElement("input", {
          className: "inp",
          value: n.type,
          onChange: (s) => r({ ...n, type: s.target.value }),
          placeholder: "Plateaux / Paniers garnis / Corbeilles",
        }),
        l.default.createElement("label", { className: "lab" }, "Pastille (facultatif)"),
        l.default.createElement("input", {
          className: "inp",
          value: n.badge,
          onChange: (s) => r({ ...n, badge: s.target.value }),
          placeholder: "Nouveau, F\xEAtes\u2026",
        }),
        l.default.createElement(Zi, { v: n, onChange: r }),
        l.default.createElement(
          "div",
          { className: "tog", style: { marginTop: 6 } },
          l.default.createElement(
            "span",
            { style: { fontSize: 13, fontWeight: 700 } },
            "Visible par les clients",
          ),
          l.default.createElement(
            "div",
            { className: "rt" },
            l.default.createElement(ze, {
              on: n.active !== !1,
              set: () => r({ ...n, active: n.active === !1 }),
            }),
          ),
        ),
        l.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 12 }, onClick: i },
          "Enregistrer",
        ),
      ),
  );
}
var fw = [
    { id: "nouvelle", label: "\xC0 valider", c: "#C27B42", bg: "#FBEFE4" },
    { id: "acceptee", label: "Accept\xE9e", c: "#4C6B27", bg: "#EEF3E2" },
    { id: "prep", label: "En pr\xE9paration", c: "#B08A2E", bg: "#FAF2DC" },
    { id: "prete", label: "Pr\xEAte", c: "#6E9B3A", bg: "#EEF3E2" },
    { id: "remise", label: "Remise au client", c: "#1C433B", bg: "#E4EDE9" },
    { id: "refusee", label: "Refus\xE9e", c: "#B2563F", bg: "#F7E4DF" },
    { id: "annulee", label: "Annul\xE9e", c: "#93A099", bg: "#F0EEE8" },
  ],
  mw = {
    acceptee: ["prep", "Commencer la pr\xE9paration"],
    prep: ["prete", "Marquer pr\xEAte (le client est pr\xE9venu)"],
    prete: ["remise", "Marquer remise au client"],
  },
  uc = (t) => !["remise", "annulee", "refusee"].includes(t.statut),
  l7 = [
    "Complet ce jour-l\xE0",
    "D\xE9lai trop court",
    "Produits indisponibles",
    "\xC9picerie ferm\xE9e ce jour-l\xE0",
  ];
function u7({ c: t, type: e, d: n, onClose: r, onValider: i }) {
  let s = Er(n.cmd),
    [o, a] = (0, l.useState)(er(t)),
    [u, d] = (0, l.useState)(t.heure || s.heureDefaut || "17:00"),
    [h, p] = (0, l.useState)(t.message || ""),
    m = t.mode === "livraison";
  return e === "refus"
    ? l.default.createElement(
        ut,
        { titre: "Refuser la commande", onClose: r },
        l.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 10 } },
          t.nom,
          " sera pr\xE9venu dans l'application. Indiquez-lui pourquoi :",
        ),
        l.default.createElement(
          "div",
          { className: "motifs" },
          l7.map((w) =>
            l.default.createElement(
              "button",
              { key: w, className: h === w ? "on" : "", onClick: () => p(w) },
              w,
            ),
          ),
        ),
        l.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Message au client"),
        l.default.createElement("textarea", {
          className: "inp",
          value: h,
          onChange: (w) => p(w.target.value),
          maxLength: 300,
          placeholder: "Ex : D\xE9sol\xE9e, nous sommes complets samedi. Appelez-nous pour une autre date !",
        }),
        l.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 12, background: "var(--red)" },
            onClick: () => i({ statut: "refusee", message: h.trim(), decision: Date.now() }),
          },
          "Refuser et pr\xE9venir le client",
        ),
      )
    : l.default.createElement(
        ut,
        { titre: t.statut === "nouvelle" ? "Accepter la commande" : "Modifier le rendez-vous", onClose: r },
        l.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 10 } },
          "Choisissez ",
          m
            ? "l'heure de livraison"
            : "l'heure \xE0 laquelle " + t.nom.split(" ")[0] + " peut venir la chercher",
          ". Il sera pr\xE9venu dans l'application et pourra mettre un rappel.",
        ),
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, m ? "Livraison le" : "Retrait le"),
            l.default.createElement("input", {
              className: "inp",
              type: "date",
              value: o,
              onChange: (w) => a(w.target.value || er(t)),
            }),
          ),
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, "\xC0"),
            l.default.createElement("input", {
              className: "inp",
              type: "time",
              step: "900",
              value: u,
              onChange: (w) => d(w.target.value),
            }),
          ),
        ),
        o !== t.date &&
          l.default.createElement(
            "div",
            { className: "cmd-alerte" },
            "Le client avait demand\xE9 le ",
            Yi(t.date),
            ". Pensez \xE0 le lui pr\xE9ciser dans le message.",
          ),
        l.default.createElement(
          "div",
          { className: "motifs", style: { marginTop: 10 } },
          ["08:00", "10:00", "12:00", "16:00", "17:00", "18:00"].map((w) =>
            l.default.createElement(
              "button",
              { key: w, className: u === w ? "on" : "", onClick: () => d(w) },
              lc(w),
            ),
          ),
        ),
        l.default.createElement(
          "label",
          { className: "lab", style: { marginTop: 10 } },
          "Petit mot au client (facultatif)",
        ),
        l.default.createElement("textarea", {
          className: "inp",
          value: h,
          onChange: (w) => p(w.target.value),
          maxLength: 300,
          placeholder: "Ex : Merci ! Votre plateau sera pr\xEAt, \xE0 samedi.",
        }),
        l.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 12 },
            disabled: !u || !o,
            onClick: () =>
              i({
                statut: t.statut === "nouvelle" ? "acceptee" : t.statut,
                dateRetrait: o,
                heure: u,
                message: h.trim(),
                decision: t.decision || Date.now(),
              }),
          },
          t.statut === "nouvelle" ? "Accepter \u2014 " + Yi(o) + " \xE0 " + lc(u) : "Enregistrer",
        ),
      );
}
var yN = (t) => Math.round((new Date(t + "T12:00") - new Date(Bn() + "T12:00")) / 864e5),
  c7 = (t) => {
    let e = yN(t);
    return e === 0
      ? "aujourd'hui"
      : e === 1
        ? "demain"
        : e < 0
          ? "en retard de " + -e + " j"
          : "dans " + e + " jours";
  };
function d7({ d: t, set: e }) {
  let [n, r] = (0, l.useState)("cmd"),
    i = t.commandes.filter((s) => s.statut === "nouvelle").length;
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Commandes"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Les plateaux command\xE9s par vos clients depuis l'application.",
    ),
    l.default.createElement(
      "div",
      { className: "seg" },
      l.default.createElement(
        "button",
        { className: n === "cmd" ? "on" : "", onClick: () => r("cmd") },
        "Commandes",
        i ? " (" + i + ")" : "",
      ),
      l.default.createElement(
        "button",
        { className: n === "plateaux" ? "on" : "", onClick: () => r("plateaux") },
        "Plateaux",
      ),
      l.default.createElement(
        "button",
        { className: n === "regl" ? "on" : "", onClick: () => r("regl") },
        "Calendrier",
      ),
    ),
    n === "cmd" && l.default.createElement(h7, { d: t, set: e }),
    n === "plateaux" && l.default.createElement(p7, { d: t, set: e }),
    n === "regl" && l.default.createElement(m7, { d: t, set: e }),
  );
}
function h7({ d: t, set: e }) {
  let [n, r] = (0, l.useState)("encours"),
    [i, s] = (0, l.useState)(null),
    [o, a] = (0, l.useState)(null),
    u = (E) => (E.statut === "nouvelle" ? "0" : "1") + (er(E) || "") + (E.heure || ""),
    d = t.commandes
      .filter((E) => (n === "encours" ? uc(E) : !uc(E)))
      .sort((E, A) =>
        n === "encours"
          ? u(E).localeCompare(u(A)) || (E.cree || 0) - (A.cree || 0)
          : (er(A) || "").localeCompare(er(E) || ""),
      ),
    h = async (E, A) => {
      (await e("commandes", (S) => S.map((_) => (_.id === E.id ? { ..._, ...A } : _)))) &&
        Pa(t.cmd, "cmd", E.id);
    },
    p = async (E, A) => {
      (await e("commandes", (S) => S.map((_) => (_.id === E.id ? { ..._, statut: A } : _)))) &&
        ["acceptee", "refusee", "prete"].includes(A) &&
        Pa(t.cmd, "cmd", E.id);
    },
    m = (() => {
      let E = new Date();
      return (E.setFullYear(E.getFullYear() - 1), E.toLocaleDateString("sv-SE"));
    })(),
    w = t.commandes.filter((E) => !uc(E) && (er(E) || "") < m);
  return l.default.createElement(
    l.default.Fragment,
    null,
    l.default.createElement(t7, { d: t }),
    l.default.createElement(
      "div",
      { style: { display: "flex", gap: 8, marginBottom: 12 } },
      [
        ["encours", "\xC0 pr\xE9parer (" + t.commandes.filter(uc).length + ")"],
        ["terminees", "Termin\xE9es"],
      ].map(([E, A]) =>
        l.default.createElement(
          "button",
          { key: E, className: "btn sm " + (n === E ? "" : "gh"), style: { flex: 1 }, onClick: () => r(E) },
          A,
        ),
      ),
    ),
    !d.length &&
      l.default.createElement(Vn, {
        t: n === "encours" ? "Aucune commande \xE0 pr\xE9parer" : "Aucune commande termin\xE9e",
        s:
          n === "encours"
            ? "Les commandes pass\xE9es par vos clients appara\xEEtront ici, tri\xE9es par date de retrait."
            : "",
      }),
    l.default.createElement(
      "div",
      { className: "grille" },
      d.map((E) => {
        let A = fw.find((_) => _.id === E.statut) || fw[0],
          S = (E.lignes || []).reduce((_, I) => {
            let T = t.plateaux.find((M) => String(M.id) === String(I.id));
            return _ + (T ? I.personnes * XS(T, I.choix || []) : I.montant);
          }, 0);
        return l.default.createElement(
          "div",
          { className: "card cmd", key: E.id, style: { borderLeft: "4px solid " + A.c } },
          l.default.createElement(
            "div",
            { className: "row", style: { alignItems: "flex-start" } },
            l.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              l.default.createElement(
                "div",
                { className: "nm", style: { fontSize: 15 } },
                Yi(er(E)),
                E.heure && " \xE0 " + lc(E.heure),
              ),
              l.default.createElement(
                "div",
                {
                  className: "de",
                  style: { fontWeight: 800, color: yN(er(E)) < 0 && uc(E) ? "var(--red)" : "var(--ink2)" },
                },
                uw[E.mode] || E.mode,
                " \xB7 ",
                c7(er(E)),
                E.statut === "nouvelle" && " \xB7 demand\xE9e par le client",
              ),
            ),
            l.default.createElement(
              "span",
              {
                className: "pill",
                style: { marginLeft: "auto", background: A.bg, color: A.c, whiteSpace: "nowrap" },
              },
              A.label,
            ),
          ),
          l.default.createElement(
            "div",
            { className: "cmd-cli" },
            l.default.createElement("b", null, E.nom),
            E.carte && l.default.createElement("span", { className: "de" }, " \xB7 carte ", E.carte),
            l.default.createElement("br", null),
            l.default.createElement("a", { href: "tel:" + (E.tel || "").replace(/\s/g, "") }, E.tel),
            E.adresse &&
              l.default.createElement(
                "div",
                { className: "de", style: { marginTop: 3 } },
                "\u{1F4CD} ",
                E.adresse,
              ),
          ),
          l.default.createElement(
            "div",
            { className: "cmd-lignes" },
            (E.lignes || []).map((_, I) =>
              l.default.createElement(
                "div",
                { key: I },
                l.default.createElement(
                  "span",
                  null,
                  _.nom,
                  " \u2014 ",
                  l.default.createElement("b", null, _.personnes, " pers."),
                  " \xD7 ",
                  An(_.prixPersonne),
                ),
                l.default.createElement("b", { style: { whiteSpace: "nowrap" } }, An(_.montant)),
              ),
            ),
            l.default.createElement(
              "div",
              { className: "tot" },
              l.default.createElement("span", null, "Total"),
              l.default.createElement("b", null, An(E.total)),
            ),
          ),
          Math.abs(S - E.total) > 0.01 &&
            l.default.createElement(
              "div",
              { className: "cmd-alerte" },
              "Attention : avec vos prix actuels, cette commande ferait ",
              An(S),
              ". V\xE9rifiez avant de l'encaisser.",
            ),
          (E.remarque || "")
            .split(
              `
`,
            )
            .filter(Boolean)
            .map((_, I) =>
              _.startsWith("\u26A0\uFE0F")
                ? l.default.createElement("div", { key: I, className: "cmd-allerg" }, _)
                : l.default.createElement("div", { key: I, className: "cmd-rq" }, "\xAB ", _, " \xBB"),
            ),
          E.message &&
            E.statut !== "nouvelle" &&
            l.default.createElement(
              "div",
              { className: "cmd-rq", style: { fontStyle: "normal" } },
              "Votre message : \xAB ",
              E.message,
              " \xBB",
            ),
          l.default.createElement(
            "div",
            { className: "de", style: { marginTop: 6 } },
            "N\xB0 ",
            E.numero,
            " \xB7 re\xE7ue le ",
            E.cree
              ? new Date(E.cree).toLocaleString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "\u2014",
          ),
          E.statut === "nouvelle" &&
            l.default.createElement(
              "div",
              { style: { display: "flex", gap: 8, marginTop: 10 } },
              l.default.createElement(
                "button",
                { className: "btn", style: { flex: 2 }, onClick: () => s({ c: E, type: "ok" }) },
                "\u2713 Accepter",
              ),
              l.default.createElement(
                "button",
                {
                  className: "btn gh",
                  style: { flex: 1, color: "var(--red)", borderColor: "#EBC9C2" },
                  onClick: () => s({ c: E, type: "refus" }),
                },
                "Refuser",
              ),
            ),
          E.statut !== "nouvelle" &&
            l.default.createElement(
              "div",
              { style: { display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" } },
              mw[E.statut] &&
                l.default.createElement(
                  "button",
                  { className: "btn sm", style: { flex: 2 }, onClick: () => p(E, mw[E.statut][0]) },
                  mw[E.statut][1],
                ),
              ["acceptee", "prep", "prete"].includes(E.statut) &&
                l.default.createElement(
                  "button",
                  { className: "btn gh sm", onClick: () => s({ c: E, type: "ok" }) },
                  "Changer l'heure",
                ),
              l.default.createElement(
                "select",
                {
                  className: "inp sel",
                  value: E.statut,
                  onChange: (_) => p(E, _.target.value),
                  "aria-label": "Changer le statut",
                },
                fw.map((_) => l.default.createElement("option", { key: _.id, value: _.id }, _.label)),
              ),
            ),
          l.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" } },
            l.default.createElement(
              "button",
              { className: "btn gh sm", style: { width: "auto" }, onClick: () => a(E) },
              "\u{1F4AC} \xC9crire au client",
              E.conv ? " (conversation en cours)" : "",
            ),
            l.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: {
                  width: "auto",
                  marginLeft: "auto",
                  color: "var(--red)",
                  borderColor: "#EBC9C2",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                },
                onClick: async () =>
                  (await De(
                    "Supprimer d\xE9finitivement la commande " +
                      (E.numero || "") +
                      " de " +
                      E.nom +
                      ` ?

Elle dispara\xEEtra aussi de l'appli du client.`,
                  )) && e("commandes", (_) => _.filter((I) => I.id !== E.id)),
              },
              he.bin(),
              "Supprimer",
            ),
          ),
        );
      }),
    ),
    o && l.default.createElement(mN, { d: t, cible: "commandes", x: o, onClose: () => a(null) }),
    i &&
      l.default.createElement(u7, {
        c: i.c,
        type: i.type,
        d: t,
        onClose: () => s(null),
        onValider: (E) => {
          (h(i.c, E), s(null));
        },
      }),
    n === "terminees" &&
      !!w.length &&
      l.default.createElement(
        "button",
        {
          className: "btn gh",
          style: { marginTop: 10, color: "var(--red)" },
          onClick: async () =>
            (await De("Supprimer les " + w.length + " commande(s) termin\xE9e(s) depuis plus d'un an ?")) &&
            e("commandes", (E) => E.filter((A) => !w.some((S) => S.id === A.id))),
        },
        "Supprimer les commandes de plus d'un an (",
        w.length,
        ")",
      ),
    n === "terminees" &&
      l.default.createElement(
        "div",
        { className: "de", style: { marginTop: 8 } },
        "Donn\xE9es personnelles (RGPD) : les commandes sont gard\xE9es 1 an apr\xE8s leur date, puis \xE0 supprimer avec ce bouton.",
      ),
  );
}
function p7({ d: t, set: e }) {
  let [n, r] = (0, l.useState)(null),
    i = () => {
      if (!n.nom?.trim() || !(Ji(n) > 0)) return ft("Indiquez au moins le nom et le prix par personne.");
      let [a] = If(n),
        u = {
          ...n,
          nom: n.nom.trim(),
          prixPersonne: String(n.prixPersonne).replace(",", "."),
          partsMin: String(a),
          partsMax: n.partsMax ? String(Math.max(a, parseInt(n.partsMax) || a)) : "",
        };
      (e("plateaux", (d) => (n.id ? d.map((h) => (h.id === n.id ? u : h)) : [...d, { ...u, id: Wr() }])),
        r(null));
    },
    [s, o] = n ? If(n) : [0, 0];
  return l.default.createElement(
    l.default.Fragment,
    null,
    l.default.createElement(
      "button",
      {
        className: "btn terra",
        onClick: () =>
          r({
            nom: "",
            composition: "",
            prixPersonne: "",
            partsMin: "4",
            partsMax: "",
            photo: "",
            active: !0,
          }),
      },
      he.plus(),
      "Nouveau plateau",
    ),
    l.default.createElement("div", { style: { height: 12 } }),
    !t.plateaux.length &&
      l.default.createElement(Vn, {
        t: "Aucun plateau",
        s: "Cr\xE9ez par exemple \xAB Plateau charcuterie \xBB \xE0 8,50 \u20AC par personne, \xE0 partir de 4 personnes. Vos clients pourront le commander directement.",
      }),
    l.default.createElement(
      "div",
      { className: "grille" },
      t.plateaux.map((a) => {
        let [u, d] = If(a);
        return l.default.createElement(
          "div",
          { className: "card", key: a.id },
          l.default.createElement(
            "div",
            { className: "row" },
            a.photo
              ? l.default.createElement("img", { className: "thumb", src: a.photo, alt: "" })
              : l.default.createElement("div", { className: "thumb" }),
            l.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              l.default.createElement("div", { className: "nm" }, a.nom),
              l.default.createElement(
                "div",
                { className: "de" },
                a.partsMax ? u + " \xE0 " + d + " parts" : "\xC0 partir de " + u + " parts",
                kf(a) ? " \xB7 " + kf(a).options.length + " choix" : "",
              ),
              l.default.createElement(
                "div",
                { style: { marginTop: 5 } },
                l.default.createElement(io, { x: a }),
                l.default.createElement(
                  "span",
                  { style: { fontSize: 13, fontWeight: 800, color: "var(--apple)", marginLeft: 6 } },
                  An(Ji(a)),
                  " / pers.",
                ),
              ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement("button", { className: "ib", onClick: () => r(a) }, he.pen()),
              l.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer \xAB " + a.nom + " \xBB ?")) &&
                    e("plateaux", (h) => h.filter((p) => p.id !== a.id)),
                },
                he.bin(),
              ),
            ),
          ),
        );
      }),
    ),
    n &&
      l.default.createElement(
        ut,
        { titre: n.id ? "Modifier le plateau" : "Nouveau plateau", onClose: () => r(null) },
        l.default.createElement(Ri, { value: n.photo, onChange: (a) => r((u) => ({ ...u, photo: a })) }),
        l.default.createElement("label", { className: "lab" }, "Nom du plateau"),
        l.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: n.nom,
          onChange: (a) => r({ ...n, nom: a.target.value }),
          placeholder: "Plateau charcuterie",
          maxLength: 80,
        }),
        l.default.createElement("label", { className: "lab" }, "Ce qu'il y a dedans"),
        l.default.createElement("textarea", {
          className: "inp",
          rows: 4,
          value: n.composition,
          onChange: (a) => r({ ...n, composition: a.target.value }),
          placeholder: `Jambon cru, rosette, terrine maison,
saucisson de Franche-Comt\xE9, cornichons, pain`,
        }),
        l.default.createElement("label", { className: "lab" }, "Prix par personne (\u20AC)"),
        l.default.createElement("input", {
          className: "inp",
          type: "number",
          inputMode: "decimal",
          step: "0.10",
          min: "0",
          value: n.prixPersonne,
          onChange: (a) => r({ ...n, prixPersonne: a.target.value }),
          placeholder: "8.50",
        }),
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, "Nombre de parts minimum"),
            l.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "1",
              value: n.partsMin,
              onChange: (a) => r({ ...n, partsMin: a.target.value }),
              placeholder: "4",
            }),
          ),
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, "Maximum (facultatif)"),
            l.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "1",
              value: n.partsMax,
              onChange: (a) => r({ ...n, partsMax: a.target.value }),
              placeholder: "Sans limite",
            }),
          ),
        ),
        Ji(n) > 0 &&
          l.default.createElement(
            "div",
            { className: "apercu-prix" },
            "Exemple : ",
            s,
            " pers. \xD7 ",
            An(Ji(n)),
            " = ",
            l.default.createElement("b", null, An(s * Ji(n))),
            n.partsMax &&
              o > s &&
              l.default.createElement(
                l.default.Fragment,
                null,
                " \xB7 ",
                o,
                " pers. = ",
                l.default.createElement("b", null, An(o * Ji(n))),
              ),
          ),
        l.default.createElement(f7, { m: n, setM: r }),
        l.default.createElement(Zi, { v: n, onChange: r }),
        l.default.createElement(
          "div",
          { className: "tog", style: { marginTop: 6 } },
          l.default.createElement(
            "span",
            { style: { fontSize: 13, fontWeight: 700 } },
            "Visible par les clients",
          ),
          l.default.createElement(
            "div",
            { className: "rt" },
            l.default.createElement(ze, {
              on: n.active !== !1,
              set: () => r({ ...n, active: n.active === !1 }),
            }),
          ),
        ),
        l.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 12 }, onClick: i },
          "Enregistrer",
        ),
      ),
  );
}
function f7({ m: t, setM: e }) {
  let n = t.choix,
    [r, i] = (0, l.useState)(""),
    s = (u) => e({ ...t, choix: { ...n, ...u } }),
    o = n?.options || [],
    a = (u, d) => s({ options: o.map((h, p) => (p === u ? { ...h, ...d } : h)) });
  return n
    ? l.default.createElement(
        "div",
        { className: "choix-bloc" },
        l.default.createElement(
          "div",
          { className: "nm", style: { fontSize: 13, marginBottom: 6 } },
          "Choix propos\xE9s au client",
        ),
        l.default.createElement("label", { className: "lab" }, "Titre affich\xE9"),
        l.default.createElement("input", {
          className: "inp",
          value: n.titre,
          maxLength: 60,
          placeholder: "Ex : Vos fromages \xE0 raclette",
          onChange: (u) => s({ titre: u.target.value }),
        }),
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 10, marginTop: 8 } },
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, "Minimum \xE0 cocher"),
            l.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "0",
              value: n.min,
              onChange: (u) => s({ min: u.target.value }),
            }),
          ),
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, "Maximum"),
            l.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "1",
              value: n.max,
              onChange: (u) => s({ max: u.target.value }),
            }),
          ),
        ),
        l.default.createElement(
          "label",
          { className: "lab", style: { marginTop: 8 } },
          "Options ",
          l.default.createElement(
            "span",
            { style: { fontWeight: 600 } },
            "(suppl\xE9ment par personne, 0 = m\xEAme prix)",
          ),
        ),
        o.map((u, d) =>
          l.default.createElement(
            "div",
            { className: "opt-ligne", key: d },
            l.default.createElement("input", {
              className: "inp",
              value: u.nom,
              maxLength: 60,
              onChange: (h) => a(d, { nom: h.target.value }),
            }),
            l.default.createElement(
              "div",
              { className: "opt-supp" },
              l.default.createElement("span", null, "+"),
              l.default.createElement("input", {
                className: "inp",
                type: "number",
                inputMode: "decimal",
                step: "0.5",
                min: "0",
                value: u.supp,
                onChange: (h) => a(d, { supp: h.target.value }),
              }),
              l.default.createElement("span", null, "\u20AC"),
            ),
            l.default.createElement(
              "button",
              {
                className: "ib",
                onClick: () => s({ options: o.filter((h, p) => p !== d) }),
                "aria-label": "Retirer",
              },
              he.bin(),
            ),
          ),
        ),
        l.default.createElement(
          "div",
          { className: "opt-ligne" },
          l.default.createElement("input", {
            className: "inp",
            value: r,
            maxLength: 60,
            placeholder: "Ajouter une option\u2026",
            onChange: (u) => i(u.target.value),
            onKeyDown: (u) => {
              u.key === "Enter" && r.trim() && (s({ options: [...o, { nom: r.trim(), supp: 0 }] }), i(""));
            },
          }),
          l.default.createElement(
            "button",
            {
              className: "btn sm",
              disabled: !r.trim(),
              onClick: () => {
                (s({ options: [...o, { nom: r.trim(), supp: 0 }] }), i(""));
              },
            },
            "Ajouter",
          ),
        ),
        l.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { marginTop: 8, color: "var(--red)" },
            onClick: async () =>
              (await De("Retirer tous les choix de ce plateau ?")) && e({ ...t, choix: null }),
          },
          "Retirer les choix",
        ),
      )
    : l.default.createElement(
        "div",
        { className: "choix-bloc" },
        l.default.createElement(
          "div",
          { className: "nm", style: { fontSize: 13 } },
          "Choix propos\xE9s au client ",
          l.default.createElement("span", { className: "de" }, "(facultatif)"),
        ),
        l.default.createElement(
          "div",
          { className: "de", style: { margin: "2px 0 8px" } },
          "Le client coche ce qu'il pr\xE9f\xE8re : fromages, charcuteries\u2026",
        ),
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
          l.default.createElement(
            "button",
            { className: "btn gh sm", onClick: () => e({ ...t, choix: JSON.parse(JSON.stringify(ZS)) }) },
            "\u{1F9C0} Fromages \xE0 raclette",
          ),
          l.default.createElement(
            "button",
            {
              className: "btn gh sm",
              onClick: () => e({ ...t, choix: { titre: "", min: 1, max: 1, options: [] } }),
            },
            "+ Liste vide",
          ),
        ),
      );
}
function m7({ d: t, set: e }) {
  let n = Er(t.cmd),
    r = (A, S) => e("cmd", (_) => ({ ...Er(_), [A]: S })),
    i = YS(n, t.fermetures),
    [s, o] = (0, l.useState)(""),
    [a, u] = (0, l.useState)(""),
    [d, h] = (0, l.useState)(""),
    p = async () => {
      let A = JS(n);
      if (!A) return h("Collez d'abord l'adresse du script.");
      h("Envoi\u2026");
      try {
        (await fetch(A, { method: "GET", mode: "no-cors", redirect: "follow" }),
          h(
            "Demande de test envoy\xE9e. V\xE9rifiez que l'e-mail \xAB [TEST] Nouvelle commande \xBB est bien arriv\xE9 (en g\xE9n\xE9ral en moins d'une minute, regardez aussi les ind\xE9sirables). Rien re\xE7u apr\xE8s quelques minutes ? Pr\xE9venez Eric.",
          ));
      } catch {
        h("Envoi impossible : v\xE9rifiez la connexion internet et r\xE9essayez.");
      }
    },
    m = ac(n.script),
    [w, E] = (0, l.useState)(!1);
  return l.default.createElement(
    l.default.Fragment,
    null,
    l.default.createElement(
      "div",
      { className: "card" },
      l.default.createElement(
        "div",
        { className: "tog", style: { borderTop: "none", paddingTop: 0 } },
        l.default.createElement(
          "div",
          null,
          l.default.createElement("div", { className: "nm" }, "Commandes en ligne"),
          l.default.createElement(
            "div",
            { className: "de" },
            "D\xE9sactivez-les pendant vos cong\xE9s, par exemple",
          ),
        ),
        l.default.createElement(
          "div",
          { className: "rt" },
          l.default.createElement(ze, { on: n.active, set: () => r("active", !n.active) }),
        ),
      ),
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      l.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 4 } },
        "Calendrier des clients",
      ),
      l.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 10 } },
        "Vous d\xE9cidez quelles dates les clients peuvent choisir.",
      ),
      l.default.createElement("label", { className: "lab" }, "D\xE9lai minimum avant le retrait"),
      l.default.createElement(
        "select",
        { className: "inp", value: n.delaiMin, onChange: (A) => r("delaiMin", Number(A.target.value)) },
        [0, 1, 2, 3, 4, 5, 6, 7, 10, 14].map((A) =>
          l.default.createElement(
            "option",
            { key: A, value: A },
            A === 0
              ? "Aucun (le jour m\xEAme possible)"
              : A === 1
                ? "1 jour (pas le jour m\xEAme)"
                : A + " jours (ni aujourd'hui" + (A > 1 ? ", ni demain" : "") + (A > 2 ? "\u2026" : "") + ")",
          ),
        ),
      ),
      l.default.createElement(
        "label",
        { className: "lab", style: { marginTop: 10 } },
        "Les clients peuvent commander jusqu'\xE0",
      ),
      l.default.createElement(
        "select",
        { className: "inp", value: n.horizon, onChange: (A) => r("horizon", Number(A.target.value)) },
        [14, 30, 45, 60, 90, 120].map((A) =>
          l.default.createElement("option", { key: A, value: A }, A, " jours \xE0 l'avance"),
        ),
      ),
      l.default.createElement(
        "label",
        { className: "lab", style: { marginTop: 10 } },
        "Jours o\xF9 vous acceptez les retraits / livraisons",
      ),
      l.default.createElement(
        "div",
        { className: "jours-sem" },
        QS.map(([A, S]) => {
          let _ = (n.jours || []).includes(A);
          return l.default.createElement(
            "button",
            {
              key: A,
              className: _ ? "on" : "",
              onClick: () => {
                let I = _ ? n.jours.filter((T) => T !== A) : [...n.jours, A];
                I.length && r("jours", I);
              },
            },
            S,
          );
        }),
      ),
      l.default.createElement(
        "label",
        { className: "lab", style: { marginTop: 12 } },
        "Fermetures (cong\xE9s, jours f\xE9ri\xE9s\u2026)",
      ),
      (n.fermes || []).map((A, S) =>
        l.default.createElement(
          "div",
          { className: "tog", key: S },
          l.default.createElement(
            "span",
            { style: { fontSize: 13, fontWeight: 700 } },
            A.au && A.au !== A.du ? "Du " + cc(A.du) + " au " + cc(A.au) : "Le " + cc(A.du),
          ),
          l.default.createElement(
            "div",
            { className: "rt" },
            l.default.createElement(
              "button",
              {
                className: "ib",
                onClick: () =>
                  r(
                    "fermes",
                    n.fermes.filter((_, I) => I !== S),
                  ),
              },
              he.bin(),
            ),
          ),
        ),
      ),
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, alignItems: "flex-end", marginTop: 6 } },
        l.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          l.default.createElement("label", { className: "lab" }, "Du"),
          l.default.createElement("input", {
            className: "inp",
            type: "date",
            value: s,
            onChange: (A) => o(A.target.value),
          }),
        ),
        l.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          l.default.createElement("label", { className: "lab" }, "Au (facultatif)"),
          l.default.createElement("input", {
            className: "inp",
            type: "date",
            min: s || void 0,
            value: a,
            onChange: (A) => u(A.target.value),
          }),
        ),
      ),
      l.default.createElement(
        "button",
        {
          className: "btn gh sm",
          style: { marginTop: 8 },
          disabled: !s,
          onClick: () => {
            (r(
              "fermes",
              [...(n.fermes || []), { du: s, au: a && a >= s ? a : s }].sort((A, S) =>
                A.du.localeCompare(S.du),
              ),
            ),
              o(""),
              u(""));
          },
        },
        "Ajouter cette fermeture",
      ),
      l.default.createElement(
        "div",
        { className: "apercu-prix", style: { marginTop: 12 } },
        i.premiere
          ? l.default.createElement(
              l.default.Fragment,
              null,
              "Aujourd'hui, la premi\xE8re date propos\xE9e aux clients est le ",
              l.default.createElement("b", null, Yi(i.premiere)),
              ".",
            )
          : l.default.createElement(
              l.default.Fragment,
              null,
              "Aucune date n'est propos\xE9e aux clients avec ces r\xE9glages.",
            ),
      ),
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      l.default.createElement("div", { className: "nm", style: { marginBottom: 8 } }, "Retrait ou livraison"),
      l.default.createElement(
        "div",
        { className: "seg", style: { marginBottom: 10 } },
        [
          ["retrait", "Retrait"],
          ["livraison", "Livraison"],
          ["choix", "Au choix"],
        ].map(([A, S]) =>
          l.default.createElement(
            "button",
            { key: A, className: n.mode === A ? "on" : "", onClick: () => r("mode", A) },
            S,
          ),
        ),
      ),
      l.default.createElement("label", { className: "lab" }, "Heure de retrait propos\xE9e par d\xE9faut"),
      l.default.createElement("input", {
        className: "inp",
        type: "time",
        step: "900",
        value: n.heureDefaut,
        onChange: (A) => r("heureDefaut", A.target.value),
        style: { maxWidth: 200 },
      }),
      l.default.createElement(
        "div",
        { className: "de", style: { margin: "4px 2px 10px" } },
        "Vous la confirmez ou la changez pour chaque commande en l'acceptant.",
      ),
      l.default.createElement("label", { className: "lab" }, "Message affich\xE9 aux clients (facultatif)"),
      l.default.createElement("textarea", {
        className: "inp",
        value: n.note,
        onChange: (A) => r("note", A.target.value),
        placeholder: "Ex : Livraison uniquement sur Raddon et les communes voisines.",
        maxLength: 300,
      }),
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      l.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 4 } },
        "E-mail \xAB commande \xE0 pr\xE9parer \xBB",
      ),
      l.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 10 } },
        m
          ? "\u2713 Configur\xE9 : vous recevez un e-mail \xE0 chaque nouvelle commande."
          : "Pas encore configur\xE9. Les commandes arrivent quand m\xEAme ici, dans l'onglet Commandes.",
      ),
      !m || w
        ? l.default.createElement(
            l.default.Fragment,
            null,
            l.default.createElement(
              "label",
              { className: "lab" },
              "Adresse du script Google (r\xE9glage technique)",
            ),
            l.default.createElement("input", {
              className: "inp",
              value: n.script,
              placeholder: "https://script.google.com/macros/s/\u2026/exec",
              autoCapitalize: "off",
              autoCorrect: "off",
              spellCheck: !1,
              onChange: (A) => r("script", A.target.value.trim()),
            }),
            n.script &&
              !m &&
              l.default.createElement(
                "div",
                { className: "cmd-alerte" },
                "Cette adresse ne ressemble pas \xE0 celle d'un script d\xE9ploy\xE9 (elle doit finir par /exec).",
              ),
            l.default.createElement(
              "label",
              { className: "lab" },
              "Cl\xE9 des notifications (Firebase \u2192 Cloud Messaging \u2192 Certificats Web Push)",
            ),
            l.default.createElement("input", {
              className: "inp",
              value: t.push?.vapid || "",
              placeholder: "B\u2026",
              autoCapitalize: "off",
              autoCorrect: "off",
              spellCheck: !1,
              onChange: (A) => e("push", (S) => ({ ...(S || {}), vapid: A.target.value.trim() })),
            }),
            t.push?.vapid &&
              !/^[A-Za-z0-9_-]{80,100}$/.test(t.push.vapid) &&
              l.default.createElement(
                "div",
                { className: "cmd-alerte" },
                "Cette cl\xE9 ne ressemble pas \xE0 une cl\xE9 \xAB Web Push \xBB (environ 87 caract\xE8res).",
              ),
            m &&
              l.default.createElement(
                "button",
                { className: "btn gh sm", style: { marginTop: 8 }, onClick: () => E(!1) },
                "Masquer",
              ),
          )
        : l.default.createElement(
            "button",
            {
              className: "lienadm",
              onClick: async () =>
                (await De(`R\xE9glage technique : ne modifiez cette adresse que si Eric vous le demande.

Afficher quand m\xEAme ?`)) && E(!0),
            },
            "R\xE9glage technique (r\xE9serv\xE9 \xE0 Eric)",
          ),
      l.default.createElement(
        "button",
        { className: "btn gh sm", style: { marginTop: 10 }, onClick: p },
        "Envoyer un e-mail de test",
      ),
      d && l.default.createElement("div", { className: "de", style: { marginTop: 6, fontWeight: 700 } }, d),
    ),
  );
}
var sN = { mode: "auto", force: "", animations: !0, items: {}, perso: [] },
  qr = (t) =>
    t
      ? new Date(t + "T12:00")
          .toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
          .replace(/^1 /, "1er ")
      : "",
  g7 = [
    ["normal", "Logo habituel", "logo-intro.png"],
    ["rose", "Ruban rose", "logo-rose.png"],
  ],
  v7 = (t) => {
    let e = Zn(t);
    return t.logo === "rose" || e === "octobrerose"
      ? "logo-rose.png"
      : wr[e]
        ? wr[e].logo
        : t.magie && t.id === "noel"
          ? "logo-noel.png"
          : e === "halloween"
            ? "logo-halloween.png"
            : "logo-intro.png";
  };
function y7({ theme: t }) {
  let [e, n] = (0, l.useState)(0),
    r = Zn(t);
  return l.default.createElement(
    "div",
    {
      className: "intro-tel",
      key: e,
      onClick: () => n(e + 1),
      title: "Toucher pour rejouer",
      style: { background: O2(t) },
    },
    t.magie && l.default.createElement(CC, { apercu: !0 }),
    r === "halloween" && l.default.createElement(rC, { apercu: !0 }),
    r === "octobrerose" && l.default.createElement(aC, null),
    pf.includes(r) && l.default.createElement(yC, { id: r }),
    t.anim !== !1 && l.default.createElement(z2, { theme: t, nb: 14, dans: !0 }),
    l.default.createElement("img", {
      className: "it-logo",
      src: v7(t),
      alt: "",
      onError: (i) => {
        i.target.src.endsWith("logo-intro.png") || (i.target.src = "logo-intro.png");
      },
    }),
    l.default.createElement(
      "div",
      { className: "it-txt" },
      l.default.createElement("div", { className: "it-bonjour" }, "Bonjour Marion !"),
      l.default.createElement(
        "div",
        { className: "it-bienv" },
        "Bienvenue sur l'application de l'\xE9picerie",
      ),
      (t.phrase || t.titre) && l.default.createElement("div", { className: "it-titre" }, t.phrase || t.titre),
    ),
    l.default.createElement(
      "div",
      {
        className: "it-lieu",
        style: t.magie ? { color: "#3B4F6B", zIndex: 2 } : r ? { color: "#FFB547", zIndex: 2 } : void 0,
      },
      "Raddon-et-Chapendu",
    ),
  );
}
function Ff({ theme: t, du: e, vue0: n }) {
  let [r, i] = (0, l.useState)(n || "accueil"),
    s = Zn(t);
  return l.default.createElement(
    l.default.Fragment,
    null,
    l.default.createElement(
      "div",
      { className: "seg", style: { maxWidth: 360, margin: "0 auto 10px" } },
      [
        ["accueil", "Accueil de l'appli"],
        ["intro", "\xC9cran d'ouverture"],
      ].map(([o, a]) =>
        l.default.createElement("button", { key: o, className: r === o ? "on" : "", onClick: () => i(o) }, a),
      ),
    ),
    r === "intro"
      ? l.default.createElement(y7, { theme: t })
      : l.default.createElement(
          "div",
          { className: "apercu-tel" },
          l.default.createElement(
            "div",
            { className: t.magie ? "magie" : s || "" },
            l.default.createElement(
              "div",
              { className: "at-top", style: { background: t.top, position: "relative" } },
              l.default.createElement("img", { src: yw, alt: "" }),
              t.magie && l.default.createElement(kC, { taille: 24, style: { left: 18, top: 0 } }),
              s &&
                l.default.createElement(
                  "span",
                  { className: "at-acc" },
                  s === "halloween"
                    ? l.default.createElement(tC, { taille: 30, style: { left: 28, top: 0 } })
                    : s === "octobrerose"
                      ? l.default.createElement(sC, { style: { left: 44, top: 28 } })
                      : l.default.createElement(gC, { id: s }),
                ),
              l.default.createElement("span", null, "\xC9picerie Raddonnaise"),
            ),
            t.magie
              ? l.default.createElement(IC, { n: 12, apercu: !0 })
              : s === "halloween"
                ? l.default.createElement(nC, { apercu: !0 })
                : s === "octobrerose"
                  ? l.default.createElement(oC, { apercu: !0 })
                  : pf.includes(s)
                    ? l.default.createElement(vC, { id: s, apercu: !0 })
                    : l.default.createElement("div", {
                        className: "frise-theme",
                        style: { background: t.frise, position: "relative", top: 0 },
                      }),
            l.default.createElement(
              "div",
              { className: "at-corps" },
              pf.includes(s) && t.anim !== !1 && l.default.createElement(ec, { id: s, apercu: !0 }),
              t.anim !== !1 && l.default.createElement(z2, { theme: t, nb: 12, dans: !0 }),
              t.magie && t.anim !== !1 && l.default.createElement(j2, { nb: 22, dans: !0 }),
              l.default.createElement(
                "div",
                { style: { position: "relative", zIndex: 2 } },
                l.default.createElement(TC, { theme: t }),
              ),
              l.default.createElement("div", { className: "at-faux" }),
              l.default.createElement("div", { className: "at-faux court" }),
            ),
          ),
        ),
    r === "intro" &&
      l.default.createElement(
        "div",
        { className: "de", style: { textAlign: "center", marginTop: 6 } },
        "Ce que voient les clients en ouvrant l'appli (2 \xE0 4 secondes). Touchez l'image pour rejouer.",
      ),
  );
}
function wN({ v: t, setV: e, titreDef: n, motifsDef: r, top: i, acc: s, magieDef: o }) {
  let a = t.magie == null ? !!o : !!t.magie,
    u = Array.isArray(t.motifs) ? t.motifs : r || [],
    d = (p) => e({ ...t, motifs: u.includes(p) ? u.filter((m) => m !== p) : u.length >= 6 ? u : [...u, p] }),
    h = _7;
  return l.default.createElement(
    "div",
    { className: "ri" },
    l.default.createElement(
      "div",
      { className: "tog ri-magie" },
      l.default.createElement(
        "div",
        null,
        l.default.createElement(
          "div",
          { style: { fontSize: 14, fontWeight: 800 } },
          "\u2728 Magie de No\xEBl",
        ),
        l.default.createElement(
          "div",
          { className: "de" },
          "Neige qui tombe et pos\xE9e sur les menus, guirlande lumineuse, bonnet sur le logo, tra\xEEneau du P\xE8re No\xEBl, village enneig\xE9 \xE0 l'ouverture, poussi\xE8re d'\xE9toiles quand on touche l'\xE9cran, compte \xE0 rebours.",
        ),
      ),
      l.default.createElement(
        "div",
        { className: "rt" },
        l.default.createElement(ze, { on: a, set: () => e({ ...t, magie: !a }) }),
      ),
    ),
    l.default.createElement("div", { className: "ri-t" }, "\xC9cran d'ouverture"),
    l.default.createElement("label", { className: "lab" }, "Logo"),
    l.default.createElement(
      "div",
      { className: "ri-logos" },
      g7.map(([p, m, w]) =>
        l.default.createElement(
          "button",
          { key: p, className: (t.logo || "normal") === p ? "on" : "", onClick: () => e({ ...t, logo: p }) },
          l.default.createElement("img", { src: w, alt: "" }),
          m,
        ),
      ),
    ),
    l.default.createElement(
      "label",
      { className: "lab", style: { marginTop: 10 } },
      "Phrase sous \xAB Bonjour \u2026 ! \xBB",
    ),
    l.default.createElement("input", {
      className: "inp",
      value: t.phrase || "",
      maxLength: 40,
      placeholder: n || "Ex : Bonne rentr\xE9e !",
      onChange: (p) => e({ ...t, phrase: p.target.value }),
    }),
    l.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Fond"),
    l.default.createElement(
      "div",
      { className: "ri-fonds" },
      L2.map((p) =>
        l.default.createElement(
          "button",
          {
            key: p.id,
            className: (t.fond || "degrade") === p.id ? "on" : "",
            onClick: () => e({ ...t, fond: p.id }),
          },
          l.default.createElement("span", {
            style: { background: O2({ top: i || "#1C433B", accent: s || "#6E9B3A", fond: p.id }) },
          }),
          p.nom,
        ),
      ),
    ),
    l.default.createElement(
      "div",
      { className: "ri-t", style: { marginTop: 16 } },
      "Petits dessins qui tombent ",
      l.default.createElement("span", { className: "de" }, "(", u.length, "/6)"),
    ),
    l.default.createElement(
      "div",
      { className: "ri-motifs" },
      yf.map((p) =>
        l.default.createElement(
          "button",
          {
            key: p.id,
            className: u.includes(p.id) ? "on" : "",
            onClick: () => d(p.id),
            title: p.nom,
            "aria-label": p.nom,
          },
          l.default.createElement(AC, { id: p.id, taille: 26 }),
        ),
      ),
      h.map((p) =>
        l.default.createElement(
          "button",
          { key: p, className: u.includes(p) ? "on" : "", onClick: () => d(p) },
          l.default.createElement("span", { style: { fontSize: 21 } }, p),
        ),
      ),
    ),
    r &&
      Array.isArray(t.motifs) &&
      l.default.createElement(
        "button",
        { className: "lienadm", onClick: () => e({ ...t, motifs: null }) },
        "Remettre les dessins d'origine",
      ),
    l.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Quantit\xE9"),
    l.default.createElement(
      "div",
      { className: "seg" },
      [
        ["peu", "Un peu"],
        ["normal", "Normal"],
        ["beaucoup", "Beaucoup"],
      ].map(([p, m]) =>
        l.default.createElement(
          "button",
          {
            key: p,
            className: (t.densite || "normal") === p ? "on" : "",
            onClick: () => e({ ...t, densite: p }),
          },
          m,
        ),
      ),
    ),
    l.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Sens"),
    l.default.createElement(
      "div",
      { className: "seg" },
      [
        ["", "D'origine"],
        ["tombe", "Ils tombent"],
        ["monte", "Ils montent"],
      ].map(([p, m]) =>
        l.default.createElement(
          "button",
          { key: p || "o", className: (t.sens || "") === p ? "on" : "", onClick: () => e({ ...t, sens: p }) },
          m,
        ),
      ),
    ),
  );
}
var w7 = ["logo", "phrase", "fond", "motifs", "densite", "sens", "magie"],
  oN = (t) =>
    Object.fromEntries(w7.map((e) => [e, e === "phrase" ? String(t[e] || "").trim() : (t[e] ?? null)])),
  b7 = (t) =>
    (t.parts || []).flatMap(([e, n]) => (e === "emoji" ? n : [e])).filter((e, n, r) => r.indexOf(e) === n);
function E7({ c: t, setVoir: e }) {
  let n = { ...t, mode: "auto" },
    r = [],
    i = new Date(Bn() + "T12:00");
  for (let o = 0; o < 120; o++) {
    let a = new Date(i);
    a.setDate(i.getDate() + o);
    let u = a.toLocaleDateString("sv-SE"),
      d = V2(n, u),
      h = r[r.length - 1];
    h && (h.t?.id || "") === (d?.id || "") ? (h.au = u) : r.push({ t: d, du: u, au: u });
  }
  let s = (o) => (o.du === o.au ? "Le " + qr(o.du) : "Du " + qr(o.du) + " au " + qr(o.au));
  return l.default.createElement(
    "div",
    { className: "card" },
    l.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 4 } },
      "\u{1F4C5} \xC0 venir (4 prochains mois)",
    ),
    l.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 10 } },
      t.mode === "force"
        ? "Un th\xE8me est choisi \xE0 la main en ce moment : ce planning s'appliquera d\xE8s que vous repasserez sur \xAB Selon le calendrier \xBB."
        : t.mode === "off"
          ? "\xAB Aucun th\xE8me \xBB est choisi : ce planning s'appliquera si vous repassez sur \xAB Selon le calendrier \xBB."
          : "Ce qui s'affichera tout seul sur l'appli. Pour changer, modifiez les dates d'une f\xEAte ou cr\xE9ez votre th\xE8me ci-dessous.",
    ),
    r.map((o, a) =>
      l.default.createElement(
        "div",
        {
          key: a,
          className: "plan-l",
          onClick: o.t ? () => e({ ...o.t, du: o.du }) : void 0,
          style: { cursor: o.t ? "pointer" : "default" },
        },
        l.default.createElement("span", {
          className: "plan-pt",
          style: { background: o.t ? o.t.top : "#D8D2C2" },
        }),
        l.default.createElement(
          "div",
          { style: { minWidth: 0, flex: 1 } },
          l.default.createElement(
            "div",
            { style: { fontWeight: 800, fontSize: 13.5 } },
            o.t ? o.t.nom || o.t.titre : "Couleurs habituelles",
            a === 0 &&
              t.mode === "auto" &&
              l.default.createElement("span", { className: "pill on", style: { marginLeft: 6 } }, "En cours"),
          ),
          l.default.createElement("div", { className: "de" }, s(o)),
        ),
        o.t &&
          l.default.createElement(
            "span",
            { className: "de", style: { fontWeight: 700 } },
            "Aper\xE7u \u203A",
          ),
      ),
    ),
  );
}
var x7 = [
    "#A4161A",
    "#C2577E",
    "#E05A73",
    "#E8731C",
    "#C69A3C",
    "#6E9B3A",
    "#2E7D32",
    "#1C433B",
    "#24507E",
    "#1F3A93",
    "#4F3A8C",
    "#2B1B3D",
  ],
  _7 =
    "\u{1F423} \u{1F430} \u{1F95A} \u{1F337} \u{1F338} \u{1F33C} \u{1F33B} \u{1F490} \u{1F36B} \u{1F353} \u{1F352} \u{1F34E} \u{1F350} \u{1F347} \u{1F34B} \u{1F9C0} \u{1F956} \u{1F950} \u{1F377} \u{1F37E} \u{1F942} \u{1F382} \u{1F389} \u{1F388} \u{1F381} \u2B50 \u2728 \u2764\uFE0F \u2600\uFE0F \u{1F342} \u{1F341} \u{1F344} \u2744\uFE0F \u26C4 \u{1F384} \u{1F514} \u{1F383} \u{1F47B} \u26BD \u{1F3C6} \u{1F3B6} \u{1F41F}".split(
      " ",
    ),
  A7 = () => {
    let t = Bn();
    return {
      id: "p" + Date.now().toString(36),
      nom: "",
      titre: "",
      message: "",
      couleur: "#E8731C",
      emojis: "\u{1F389}\u2728",
      illu: "",
      du: t,
      au: t,
      chaqueAnnee: !0,
      active: !0,
    };
  };
function T7({ p0: t, onClose: e, onSave: n, onDelete: r }) {
  let [i, s] = (0, l.useState)({ ...t, motifs: Array.isArray(t.motifs) ? t.motifs : mf(t.emojis) }),
    o = { ...gf({ ...i, titre: i.titre || i.nom || "Mon th\xE8me" }), anim: !0 },
    a = i.nom.trim() && i.du && i.au && i.au >= i.du;
  return l.default.createElement(
    ut,
    { titre: t.nom ? "Modifier \xAB " + t.nom + " \xBB" : "Cr\xE9er mon th\xE8me", onClose: e },
    l.default.createElement(Ff, { theme: o }),
    l.default.createElement("label", { className: "lab", style: { marginTop: 12 } }, "Nom du th\xE8me"),
    l.default.createElement("input", {
      className: "inp",
      value: i.nom,
      maxLength: 40,
      placeholder: "Ex : F\xEAte du village, Anniversaire de l'\xE9picerie\u2026",
      onChange: (u) => s({ ...i, nom: u.target.value }),
    }),
    l.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Couleur"),
    l.default.createElement(
      "div",
      { className: "couleurs" },
      x7.map((u) =>
        l.default.createElement("button", {
          key: u,
          className: i.couleur === u ? "on" : "",
          style: { background: u },
          onClick: () => s({ ...i, couleur: u }),
          "aria-label": "Couleur " + u,
        }),
      ),
      l.default.createElement(
        "label",
        { className: "perso-coul", title: "Autre couleur" },
        l.default.createElement("input", {
          type: "color",
          value: i.couleur,
          onChange: (u) => s({ ...i, couleur: u.target.value }),
        }),
        "+",
      ),
    ),
    l.default.createElement(
      "label",
      { className: "lab", style: { marginTop: 10 } },
      "Grand dessin de la carte (facultatif)",
    ),
    l.default.createElement("input", {
      className: "inp",
      value: i.illu,
      maxLength: 8,
      placeholder: "Par d\xE9faut : " + (o.illuEmoji || "\u2B50"),
      onChange: (u) => s({ ...i, illu: u.target.value }),
      style: { maxWidth: 200 },
    }),
    l.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Titre de la carte"),
    l.default.createElement("input", {
      className: "inp",
      value: i.titre,
      maxLength: 50,
      placeholder: i.nom || "Ex : Joyeux anniversaire !",
      onChange: (u) => s({ ...i, titre: u.target.value }),
    }),
    l.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Message"),
    l.default.createElement("textarea", {
      className: "inp",
      value: i.message,
      maxLength: 200,
      placeholder: "Ex : Venez f\xEAter les 3 ans de l'\xE9picerie samedi, caf\xE9 offert !",
      onChange: (u) => s({ ...i, message: u.target.value }),
    }),
    l.default.createElement(
      "div",
      { style: { display: "flex", gap: 10, marginTop: 10 } },
      l.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        l.default.createElement("label", { className: "lab" }, "Du"),
        l.default.createElement("input", {
          className: "inp",
          type: "date",
          value: i.du,
          onChange: (u) => s({ ...i, du: u.target.value, au: i.au < u.target.value ? u.target.value : i.au }),
        }),
      ),
      l.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        l.default.createElement("label", { className: "lab" }, "Au"),
        l.default.createElement("input", {
          className: "inp",
          type: "date",
          min: i.du,
          value: i.au,
          onChange: (u) => s({ ...i, au: u.target.value }),
        }),
      ),
    ),
    l.default.createElement(
      "div",
      { className: "tog", style: { marginTop: 6 } },
      l.default.createElement(
        "span",
        { style: { fontSize: 13, fontWeight: 700 } },
        "Revient tous les ans aux m\xEAmes dates",
      ),
      l.default.createElement(
        "div",
        { className: "rt" },
        l.default.createElement(ze, {
          on: i.chaqueAnnee,
          set: () => s({ ...i, chaqueAnnee: !i.chaqueAnnee }),
        }),
      ),
    ),
    l.default.createElement(wN, { v: i, setV: s, titreDef: i.titre || i.nom, top: o.top, acc: o.accent }),
    l.default.createElement(
      "button",
      {
        className: "btn",
        style: { marginTop: 12 },
        disabled: !a,
        onClick: () =>
          n({
            ...i,
            nom: i.nom.trim(),
            titre: i.titre.trim(),
            message: i.message.trim(),
            phrase: String(i.phrase || "").trim(),
            emojis: (i.motifs || []).filter((u) => !yf.some((d) => d.id === u)).join(""),
          }),
      },
      "Enregistrer",
    ),
    r &&
      l.default.createElement(
        "button",
        {
          className: "btn gh",
          style: { marginTop: 8, color: "var(--red)" },
          onClick: async () => (await De("Supprimer le th\xE8me \xAB " + t.nom + " \xBB ?")) && r(),
        },
        "Supprimer ce th\xE8me",
      ),
  );
}
function I7({ c: t, maj: e, setVoir: n }) {
  let [r, i] = (0, l.useState)(null),
    s = t.perso || [],
    o = (a) => {
      (e({ perso: s.some((u) => u.id === a.id) ? s.map((u) => (u.id === a.id ? a : u)) : [...s, a] }),
        i(null));
    };
  return l.default.createElement(
    l.default.Fragment,
    null,
    l.default.createElement("div", { className: "nm", style: { margin: "16px 0 4px" } }, "Mes th\xE8mes"),
    l.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 8 } },
      "Cr\xE9ez vos propres th\xE8mes : f\xEAte du village, anniversaire de l'\xE9picerie, foire, march\xE9 de No\xEBl\u2026 Ils passent avant les f\xEAtes pr\xE9vues.",
    ),
    l.default.createElement(
      "button",
      { className: "btn terra", onClick: () => i(A7()) },
      he.plus(),
      "Cr\xE9er mon th\xE8me",
    ),
    l.default.createElement("div", { style: { height: 10 } }),
    l.default.createElement(
      "div",
      { className: "grille" },
      s.map((a) => {
        let u = gf(a),
          d = a.active !== !1;
        return l.default.createElement(
          "div",
          {
            className: "card theme-ligne",
            key: a.id,
            style: { opacity: d ? 1 : 0.55, borderLeft: "4px solid " + u.top },
          },
          l.default.createElement(
            "div",
            { className: "row" },
            l.default.createElement(
              "div",
              { className: "th-illu", style: { background: u.soft } },
              l.default.createElement(wf, { theme: u, taille: 46 }),
            ),
            l.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              l.default.createElement("div", { className: "nm" }, a.nom),
              l.default.createElement(
                "div",
                { className: "de" },
                a.du === a.au ? "Le " + qr(a.du) : "Du " + qr(a.du) + " au " + qr(a.au),
                a.chaqueAnnee ? " \xB7 tous les ans" : " " + a.du.slice(0, 4),
              ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement(ze, {
                on: d,
                set: () => e({ perso: s.map((h) => (h.id === a.id ? { ...h, active: !d } : h)) }),
              }),
            ),
          ),
          l.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 10 } },
            l.default.createElement(
              "button",
              { className: "btn gh sm", style: { flex: 1 }, onClick: () => i(a) },
              "Modifier",
            ),
            l.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { flex: 1 },
                onClick: () => n({ ...u, anim: t.animations !== !1, du: a.du }),
              },
              "Aper\xE7u",
            ),
          ),
        );
      }),
    ),
    r &&
      l.default.createElement(T7, {
        p0: r,
        onClose: () => i(null),
        onSave: o,
        onDelete: s.some((a) => a.id === r.id)
          ? () => {
              (e({ perso: s.filter((a) => a.id !== r.id), ...(t.force === r.id ? { mode: "auto" } : {}) }),
                i(null));
            }
          : null,
      }),
  );
}
function k7({ d: t, set: e }) {
  let n = { ...sN, ...(t.themes || {}), items: { ...((t.themes || {}).items || {}) } },
    r = (S) => ({ ...sN, ...(S || {}), items: { ...((S || {}).items || {}) } }),
    i = (S) => e("themes", (_) => ({ ...r(_), ...S })),
    s = (S, _) =>
      e("themes", (I) => {
        let T = r(I);
        return { ...T, items: { ...T.items, [S]: { ...(T.items[S] || {}), ..._ } } };
      }),
    [o, a] = (0, l.useState)(null),
    [u, d] = (0, l.useState)(null),
    h = Bn(),
    p = Number(h.slice(0, 4)),
    m = V2(n),
    w = (S) => {
      for (let _ of [p - 1, p, p + 1]) {
        let I = vf(S, n.items[S.id], _);
        if (I[1] >= h) return I;
      }
      return vf(S, n.items[S.id], p + 1);
    },
    E = [...P2].map((S) => ({ t: S, p: w(S) })).sort((S, _) => S.p[0].localeCompare(_.p[0])),
    A = (S) => {
      let [_, I] = w(S);
      return _ <= h && h <= I;
    };
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Th\xE8mes"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "L'application s'habille pour les f\xEAtes : couleurs, petite animation et carte de v\u0153ux sur l'accueil. Activez les f\xEAtes que vous voulez et ajustez les dates.",
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      l.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 8 } },
        "Affich\xE9 en ce moment",
      ),
      m
        ? l.default.createElement(Ff, { theme: m, du: Bn() })
        : l.default.createElement(
            "div",
            { className: "de", style: { marginBottom: 6 } },
            "Aucun th\xE8me : l'application garde ses couleurs habituelles.",
          ),
      l.default.createElement(
        "div",
        { className: "seg", style: { margin: "12px 0 8px" } },
        [
          ["auto", "Selon le calendrier"],
          ["off", "Aucun th\xE8me"],
        ].map(([S, _]) =>
          l.default.createElement(
            "button",
            {
              key: S,
              className: n.mode === S ? "on" : "",
              onClick: () =>
                i({
                  mode: S,
                  force: S === "force" ? n.force || m?.id || "noel" : n.force,
                  ...(S === "force" ? { forceLe: Bn() } : {}),
                }),
            },
            _,
          ),
        ),
      ),
      l.default.createElement(
        "div",
        { className: "tog", style: { marginTop: 6 } },
        l.default.createElement(
          "div",
          null,
          l.default.createElement("div", { style: { fontSize: 13, fontWeight: 700 } }, "Petite animation"),
          l.default.createElement(
            "div",
            { className: "de" },
            "Flocons, c\u0153urs, citrouilles\u2026 qui tombent doucement",
          ),
        ),
        l.default.createElement(
          "div",
          { className: "rt" },
          l.default.createElement(ze, {
            on: n.animations !== !1,
            set: () => i({ animations: n.animations === !1 }),
          }),
        ),
      ),
    ),
    l.default.createElement(E7, { c: n, setVoir: d }),
    B2 && l.default.createElement(I7, { c: n, maj: i, setVoir: d }),
    l.default.createElement(
      "div",
      { className: "nm", style: { margin: "16px 0 8px" } },
      "Les f\xEAtes de l'ann\xE9e",
    ),
    l.default.createElement(
      "div",
      { className: "grille" },
      E.map(({ t: S, p: [_, I, T] }) => {
        let M = n.items[S.id]?.active !== !1;
        return l.default.createElement(
          "div",
          {
            className: "card theme-ligne",
            key: S.id,
            style: { opacity: M ? 1 : 0.55, borderLeft: "4px solid " + S.top },
          },
          l.default.createElement(
            "div",
            { className: "row" },
            l.default.createElement(
              "div",
              { className: "th-illu", style: { background: S.soft } },
              l.default.createElement(wf, { theme: S, taille: 46 }),
            ),
            l.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              l.default.createElement(
                "div",
                { className: "nm" },
                S.nom,
                A(S) &&
                  M &&
                  l.default.createElement(
                    "span",
                    { className: "pill on", style: { marginLeft: 6 } },
                    "En cours",
                  ),
              ),
              l.default.createElement(
                "div",
                { className: "de" },
                _ === I ? "Le " + qr(_) : "Du " + qr(_) + " au " + qr(I),
                T ? " \xB7 dates modifi\xE9es" : "",
              ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement(ze, { on: M, set: () => s(S.id, { active: !M }) }),
            ),
          ),
          l.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 10 } },
            l.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { flex: 1 },
                onClick: () =>
                  a({
                    t: S,
                    du: _,
                    au: I,
                    message: n.items[S.id]?.message || "",
                    ...oN(n.items[S.id] || {}),
                  }),
              },
              "Dates & message",
            ),
            l.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { flex: 1 },
                onClick: () =>
                  d({
                    ...tc(S, n.items[S.id]),
                    message: n.items[S.id]?.message || S.message,
                    anim: n.animations !== !1,
                    du: _,
                  }),
              },
              "Aper\xE7u",
            ),
          ),
        );
      }),
    ),
    u &&
      l.default.createElement(
        ut,
        { titre: "Aper\xE7u \u2014 " + u.nom, onClose: () => d(null) },
        l.default.createElement(Ff, { theme: u, du: u.du }),
        l.default.createElement(
          "div",
          { className: "de", style: { marginTop: 10, textAlign: "center" } },
          "Ce th\xE8me s'affichera tout seul dans l'application \xE0 ses dates, selon le calendrier.",
        ),
      ),
    o &&
      l.default.createElement(
        ut,
        { titre: o.t.nom, onClose: () => a(null) },
        l.default.createElement(Ff, {
          theme: { ...tc(o.t, o), message: o.message.trim() || o.t.message, anim: !0 },
          vue0: "intro",
        }),
        l.default.createElement("div", { style: { height: 12 } }),
        l.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 10 } },
          "P\xE9riode d'affichage ",
          o.du.slice(0, 4) !== o.au.slice(0, 4)
            ? o.du.slice(0, 4) + "-" + o.au.slice(0, 4)
            : o.du.slice(0, 4),
          ". L'ann\xE9e suivante, les dates habituelles reviennent toutes seules.",
        ),
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, "Du"),
            l.default.createElement("input", {
              className: "inp",
              type: "date",
              value: o.du,
              onChange: (S) => a({ ...o, du: S.target.value }),
            }),
          ),
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, "Au"),
            l.default.createElement("input", {
              className: "inp",
              type: "date",
              min: o.du,
              value: o.au,
              onChange: (S) => a({ ...o, au: S.target.value }),
            }),
          ),
        ),
        l.default.createElement(
          "label",
          { className: "lab", style: { marginTop: 10 } },
          "Message de la carte de v\u0153ux",
        ),
        l.default.createElement("textarea", {
          className: "inp",
          value: o.message,
          maxLength: 200,
          placeholder: o.t.message,
          onChange: (S) => a({ ...o, message: S.target.value }),
        }),
        l.default.createElement(
          "div",
          { className: "de", style: { marginTop: 4 } },
          "Vide = message propos\xE9 : \xAB ",
          o.t.message,
          " \xBB",
        ),
        M2 &&
          l.default.createElement(wN, {
            v: o,
            setV: (S) => a({ ...o, ...S }),
            titreDef: o.t.titre,
            motifsDef: b7(o.t),
            top: o.t.top,
            acc: o.t.accent,
            magieDef: o.t.id === "noel",
          }),
        l.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 12 },
            disabled: !o.du || !o.au || o.au < o.du,
            onClick: () => {
              let [S, _] = o.t.dates(Number(o.du.slice(0, 4))),
                I = S === o.du && _ === o.au;
              (s(o.t.id, { du: I ? "" : o.du, au: I ? "" : o.au, message: o.message.trim(), ...oN(o) }),
                a(null));
            },
          },
          "Enregistrer",
        ),
        l.default.createElement(
          "button",
          {
            className: "btn gh",
            style: { marginTop: 8 },
            onClick: () => {
              (s(o.t.id, { du: "", au: "" }), a(null));
            },
          },
          "Remettre les dates habituelles",
        ),
      ),
  );
}
var C7 = [
  "Bonjour ! Oui, c'est possible \u{1F60A}",
  "Merci pour votre message, je regarde et je vous r\xE9ponds vite.",
  "C'est not\xE9, \xE0 bient\xF4t \xE0 l'\xE9picerie !",
  "D\xE9sol\xE9e, ce n'est plus disponible pour le moment.",
];
function S7({ conv: t, onRetour: e, cmd: n }) {
  let [r, i] = (0, l.useState)([]),
    [s, o] = (0, l.useState)(""),
    [a, u] = (0, l.useState)(!1),
    d = (0, l.useRef)(null);
  ((0, l.useEffect)(
    () =>
      fr(
        Ge(de, "conversations", t.id, "messages"),
        (m) =>
          i(m.docs.map((w) => ({ ...w.data(), id: w.id })).sort((w, E) => (w.date || 0) - (E.date || 0))),
        () => {},
      ),
    [t.id],
  ),
    (0, l.useEffect)(() => {
      t.attente && ln(xe(de, "conversations", t.id), { attente: !1 }, { merge: !0 }).catch(() => {});
    }, [t.id, t.attente]),
    (0, l.useEffect)(() => {
      d.current?.scrollIntoView({ block: "end" });
    }, [r.length]));
  let h = async () => {
      let m = s.trim().slice(0, 1e3);
      if (!(!m || a)) {
        u(!0);
        try {
          let w = Date.now(),
            E = _n(de);
          (E.set(xe(Ge(de, "conversations", t.id, "messages")), { de: "epicerie", texte: m, date: w }),
            E.update(xe(de, "conversations", t.id), { maj: w, dernier: "Vous : " + uf(m), attente: !1 }),
            await E.commit(),
            o(""),
            Pa(n, "msg", t.id));
        } catch {
          ft("Message non envoy\xE9. V\xE9rifiez la connexion et r\xE9essayez.");
        }
        u(!1);
      }
    },
    p = "";
  return l.default.createElement(
    "div",
    { className: "fil-adm" },
    l.default.createElement(
      "div",
      { className: "fil-hd" },
      l.default.createElement("button", { className: "btn gh sm", onClick: e }, "\u2190"),
      l.default.createElement(
        "div",
        { style: { minWidth: 0 } },
        l.default.createElement("div", { className: "nm" }, t.nom),
        l.default.createElement(
          "div",
          { className: "de" },
          t.tel
            ? l.default.createElement("a", { href: "tel:" + t.tel.replace(/\s/g, "") }, t.tel)
            : "Pas de t\xE9l\xE9phone",
          " \xB7 depuis le ",
          new Date(t.cree || Date.now()).toLocaleDateString("fr-FR"),
        ),
      ),
    ),
    l.default.createElement(
      "div",
      { className: "fil-corps" },
      !r.length &&
        l.default.createElement(
          "div",
          { className: "de", style: { textAlign: "center", padding: 20 } },
          "Chargement\u2026",
        ),
      r.map((m) => {
        let w = Zk(m.date),
          E = w !== p;
        return (
          (p = w),
          l.default.createElement(
            l.default.Fragment,
            { key: m.id },
            E && l.default.createElement("div", { className: "fil-jour" }, w),
            l.default.createElement(
              "div",
              { className: "fmsg " + (m.de === "epicerie" ? "moi" : "lui") },
              l.default.createElement("div", null, m.texte),
              l.default.createElement("small", null, E2(m.date)),
            ),
          )
        );
      }),
      l.default.createElement("div", { ref: d }),
    ),
    l.default.createElement(
      "div",
      { className: "motifs", style: { margin: "8px 0" } },
      C7.map((m) =>
        l.default.createElement(
          "button",
          { key: m, onClick: () => o(m) },
          m.length > 34 ? m.slice(0, 32) + "\u2026" : m,
        ),
      ),
    ),
    l.default.createElement(
      "div",
      { className: "fil-saisie" },
      l.default.createElement("textarea", {
        className: "inp",
        rows: 2,
        value: s,
        maxLength: 1e3,
        placeholder: "R\xE9pondre \xE0 " + t.nom + "\u2026",
        onChange: (m) => o(m.target.value),
        onKeyDown: (m) => {
          m.key === "Enter" &&
            !m.shiftKey &&
            window.matchMedia("(pointer:fine)").matches &&
            (m.preventDefault(), h());
        },
      }),
      l.default.createElement(
        "button",
        {
          className: "btn",
          style: { width: "auto", padding: "0 20px" },
          disabled: !s.trim() || a,
          onClick: h,
        },
        "Envoyer",
      ),
    ),
  );
}
function N7({ d: t, set: e }) {
  let [n, r] = (0, l.useState)(null),
    i = [...t.conversations].sort((d, h) => (h.maj || 0) - (d.maj || 0)),
    s = n && i.find((d) => d.id === n),
    o = Date.now() - 365 * 864e5,
    a = i.filter((d) => (d.maj || 0) < o),
    u = async (d) => {
      if (
        await De(
          "Supprimer la conversation avec " +
            d.nom +
            ` ?

Le client ne verra plus ses messages.`,
        )
      )
        try {
          (await nN(d.id), r(null));
        } catch {
          ft("Suppression impossible. V\xE9rifiez la connexion.");
        }
    };
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Messages"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Les questions de vos clients, envoy\xE9es depuis l'application.",
    ),
    s
      ? l.default.createElement(
          l.default.Fragment,
          null,
          l.default.createElement(S7, { conv: s, cmd: t.cmd, onRetour: () => r(null) }),
          l.default.createElement(
            "button",
            { className: "btn gh sm", style: { marginTop: 12, color: "var(--red)" }, onClick: () => u(s) },
            "Supprimer cette conversation",
          ),
        )
      : l.default.createElement(
          l.default.Fragment,
          null,
          l.default.createElement(
            "div",
            { className: "tog card", style: { marginBottom: 12 } },
            l.default.createElement(
              "div",
              null,
              l.default.createElement(
                "div",
                { style: { fontSize: 13, fontWeight: 800 } },
                "Bouton \xAB Une question ? \xBB sur l'application",
              ),
              l.default.createElement(
                "div",
                { className: "de" },
                "D\xE9sactivez-le si vous ne voulez plus recevoir de messages",
              ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement(ze, {
                on: t.chat?.active !== !1,
                set: () => e("chat", (d) => ({ ...(d || {}), active: d?.active === !1 })),
              }),
            ),
          ),
          !i.length &&
            l.default.createElement(Vn, {
              t: "Aucun message pour l'instant",
              s: "Quand un client vous \xE9crit depuis l'application, sa conversation appara\xEEt ici.",
            }),
          l.default.createElement(
            "div",
            { className: "grille" },
            i.map((d) =>
              l.default.createElement(
                "div",
                { className: "card conv" + (d.attente ? " attente" : ""), key: d.id, onClick: () => r(d.id) },
                l.default.createElement(
                  "div",
                  { className: "row" },
                  l.default.createElement(
                    "div",
                    { className: "av-conv" },
                    (d.nom || "?").trim()[0]?.toUpperCase(),
                  ),
                  l.default.createElement(
                    "div",
                    { style: { minWidth: 0, flex: 1 } },
                    l.default.createElement(
                      "div",
                      { className: "nm" },
                      d.nom,
                      d.attente &&
                        l.default.createElement(
                          "span",
                          { className: "pill promo", style: { marginLeft: 6 } },
                          "Nouveau",
                        ),
                    ),
                    l.default.createElement("div", { className: "de conv-der" }, d.dernier),
                  ),
                  l.default.createElement(
                    "div",
                    { className: "de", style: { flexShrink: 0 } },
                    d.maj ? E2(d.maj) : "",
                  ),
                ),
              ),
            ),
          ),
          !!a.length &&
            l.default.createElement(
              "button",
              {
                className: "btn gh",
                style: { marginTop: 10, color: "var(--red)" },
                onClick: async () => {
                  if (
                    await De(
                      "Supprimer les " + a.length + " conversation(s) sans message depuis plus d'un an ?",
                    )
                  )
                    try {
                      for (let d of a) await nN(d.id);
                    } catch {
                      ft("Suppression interrompue. V\xE9rifiez la connexion et recommencez.");
                    }
                },
              },
              "Supprimer les conversations de plus d'un an (",
              a.length,
              ")",
            ),
          l.default.createElement(
            "div",
            { className: "de", style: { marginTop: 8 } },
            "Donn\xE9es personnelles (RGPD) : les conversations sont \xE0 supprimer au plus tard 1 an apr\xE8s le dernier message.",
          ),
        ),
  );
}
var aN = [
  { id: "aucune", label: "Aucune" },
  { id: "carte", label: "Voir la carte" },
  { id: "appeler", label: "Appeler l'\xE9picerie" },
];
function F7({ d: t, set: e }) {
  let [n, r] = (0, l.useState)(null),
    i = t.pubs || [],
    s = () => {
      if (!n.photo) return ft("Ajoutez une image : c'est l'essentiel d'une banni\xE8re.");
      (e("pubs", (u) =>
        n.id ? u.map((d) => (d.id === n.id ? n : d)) : [...u, { ...n, id: Wr(), ordre: u.length }],
      ),
        r(null));
    },
    o = (u, d) => {
      let h = u + d;
      if (h < 0 || h >= i.length) return;
      let p = [...i];
      (([p[u], p[h]] = [p[h], p[u]]),
        e("pubs", (m) => m.map((w) => ({ ...w, ordre: p.findIndex((E) => E.id === w.id) }))));
    },
    a = i.filter((u) => pN(u)[0] === "on").length;
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Banni\xE8res"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Les grandes images en haut de l'application : plateaux de f\xEAtes, nouveaut\xE9s, \xE9v\xE9nements. Elles d\xE9filent toutes seules. Format conseill\xE9 : photo horizontale.",
    ),
    l.default.createElement(
      "button",
      {
        className: "btn terra",
        onClick: () => r({ photo: "", titre: "", texte: "", action: "carte", fin: "", active: !0 }),
      },
      he.plus(),
      "Nouvelle banni\xE8re",
    ),
    l.default.createElement(
      "div",
      { style: { fontSize: 12, color: "var(--ink3)", margin: "10px 0 12px" } },
      a,
      " banni\xE8re",
      a > 1 ? "s" : "",
      " visible",
      a > 1 ? "s" : "",
      " par les clients",
    ),
    !i.length &&
      l.default.createElement(Vn, {
        t: "Aucune banni\xE8re",
        s: "Une belle photo de plateau et deux mots suffisent : \xAB Plateaux de No\xEBl \u2014 commandez avant le 20 \xBB.",
      }),
    l.default.createElement(
      "div",
      { className: "grille" },
      i.map((u, d) =>
        l.default.createElement(
          "div",
          { className: "card", key: u.id, style: { padding: 0, overflow: "hidden" } },
          l.default.createElement(
            "div",
            { style: { position: "relative" } },
            u.photo
              ? l.default.createElement("img", {
                  src: u.photo,
                  alt: "",
                  style: { width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" },
                })
              : l.default.createElement("div", {
                  style: { aspectRatio: "16/9", background: "var(--apple-soft)" },
                }),
            l.default.createElement(io, { x: u, fem: !0, style: { position: "absolute", top: 9, left: 9 } }),
          ),
          l.default.createElement(
            "div",
            { className: "row", style: { padding: "11px 13px" } },
            l.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              l.default.createElement("div", { className: "nm" }, u.titre || "Sans titre"),
              l.default.createElement(
                "div",
                { className: "de" },
                "Action : ",
                aN.find((h) => h.id === u.action)?.label || "Aucune",
              ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement(
                "button",
                {
                  className: "ib",
                  title: "Monter",
                  disabled: d === 0,
                  onClick: () => o(d, -1),
                  style: { fontSize: 16, color: "#5C6A62", opacity: d === 0 ? 0.3 : 1 },
                },
                "\u2191",
              ),
              l.default.createElement(
                "button",
                {
                  className: "ib",
                  title: "Descendre",
                  disabled: d === i.length - 1,
                  onClick: () => o(d, 1),
                  style: { fontSize: 16, color: "#5C6A62", opacity: d === i.length - 1 ? 0.3 : 1 },
                },
                "\u2193",
              ),
              l.default.createElement(ze, {
                on: u.active !== !1,
                set: () =>
                  e("pubs", (h) => h.map((p) => (p.id === u.id ? { ...p, active: p.active === !1 } : p))),
              }),
              l.default.createElement("button", { className: "ib", onClick: () => r(u) }, he.pen()),
              l.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer cette banni\xE8re ?")) &&
                    e("pubs", (h) => h.filter((p) => p.id !== u.id)),
                },
                he.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    n &&
      l.default.createElement(
        ut,
        { titre: n.id ? "Modifier la banni\xE8re" : "Nouvelle banni\xE8re", onClose: () => r(null) },
        l.default.createElement(Ri, {
          value: n.photo,
          max: 1400,
          onChange: (u) => r((d) => ({ ...d, photo: u })),
        }),
        l.default.createElement("label", { className: "lab" }, "Titre (facultatif)"),
        l.default.createElement("input", {
          className: "inp",
          value: n.titre,
          onChange: (u) => r({ ...n, titre: u.target.value }),
          placeholder: "Plateaux de No\xEBl",
        }),
        l.default.createElement("label", { className: "lab" }, "Petit texte (facultatif)"),
        l.default.createElement("input", {
          className: "inp",
          value: n.texte,
          onChange: (u) => r({ ...n, texte: u.target.value }),
          placeholder: "Commandez avant le 20 d\xE9cembre",
        }),
        l.default.createElement("label", { className: "lab" }, "Quand le client touche la banni\xE8re"),
        l.default.createElement(
          "div",
          { className: "seg", style: { marginBottom: 0 } },
          aN.map((u) =>
            l.default.createElement(
              "button",
              {
                key: u.id,
                className: n.action === u.id ? "on" : "",
                onClick: () => r({ ...n, action: u.id }),
              },
              u.label,
            ),
          ),
        ),
        l.default.createElement(Zi, { v: n, onChange: r }),
        l.default.createElement(
          "div",
          { className: "tog", style: { marginTop: 6 } },
          l.default.createElement(
            "span",
            { style: { fontSize: 13, fontWeight: 700 } },
            "Visible par les clients",
          ),
          l.default.createElement(
            "div",
            { className: "rt" },
            l.default.createElement(ze, {
              on: n.active !== !1,
              set: () => r({ ...n, active: n.active === !1 }),
            }),
          ),
        ),
        l.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 12 }, onClick: s },
          "Enregistrer",
        ),
      ),
  );
}
function D7({ d: t, set: e }) {
  let [n, r] = (0, l.useState)(null),
    i = () => {
      n.titre?.trim() &&
        (e("actus", (s) => (n.id ? s.map((o) => (o.id === n.id ? n : o)) : [{ ...n, id: Wr() }, ...s])),
        r(null));
    };
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Actualit\xE9s"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Vos publications : cr\xE9ations maison, arrivages, menu du jour, fermeture exceptionnelle\u2026",
    ),
    l.default.createElement(
      "button",
      {
        className: "btn dark",
        onClick: () =>
          r({ titre: "", texte: "", photo: "", date: new Date().toLocaleDateString("fr-FR"), active: !0 }),
      },
      he.plus(),
      "Nouvelle publication",
    ),
    l.default.createElement("div", { style: { height: 12 } }),
    !t.actus.length &&
      l.default.createElement(Vn, {
        t: "Aucune publication",
        s: "Une photo et deux lignes suffisent : vos clients voient la nouveaut\xE9 d\xE8s l'ouverture de l'application.",
      }),
    l.default.createElement(
      "div",
      { className: "grille" },
      t.actus.map((s) =>
        l.default.createElement(
          "div",
          { className: "card", key: s.id },
          l.default.createElement(
            "div",
            { className: "row" },
            s.photo
              ? l.default.createElement("img", { className: "thumb", src: s.photo, alt: "" })
              : l.default.createElement("div", { className: "thumb" }),
            l.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              l.default.createElement("div", { className: "nm" }, s.titre),
              l.default.createElement("div", { className: "de" }, s.date),
              l.default.createElement(io, { x: s, fem: !0, style: { marginTop: 5 } }),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement(ze, {
                on: s.active !== !1,
                set: () =>
                  e("actus", (o) => o.map((a) => (a.id === s.id ? { ...a, active: a.active === !1 } : a))),
              }),
              l.default.createElement("button", { className: "ib", onClick: () => r(s) }, he.pen()),
              l.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer cette publication ?")) &&
                    e("actus", (o) => o.filter((a) => a.id !== s.id)),
                },
                he.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    n &&
      l.default.createElement(
        ut,
        { titre: n.id ? "Modifier" : "Nouvelle publication", onClose: () => r(null) },
        l.default.createElement(Ri, { value: n.photo, onChange: (s) => r((o) => ({ ...o, photo: s })) }),
        l.default.createElement("label", { className: "lab" }, "Titre"),
        l.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: n.titre,
          onChange: (s) => r({ ...n, titre: s.target.value }),
          placeholder: "Nos tartes maison sont arriv\xE9es",
        }),
        l.default.createElement("label", { className: "lab" }, "Texte"),
        l.default.createElement("textarea", {
          className: "inp",
          value: n.texte,
          onChange: (s) => r({ ...n, texte: s.target.value }),
        }),
        l.default.createElement("label", { className: "lab" }, "Date affich\xE9e"),
        l.default.createElement("input", {
          className: "inp",
          value: n.date,
          onChange: (s) => r({ ...n, date: s.target.value }),
        }),
        l.default.createElement(Zi, { v: n, onChange: r }),
        l.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: i },
          "Publier",
        ),
      ),
  );
}
function P7({ d: t, set: e }) {
  let [n, r] = (0, l.useState)(null),
    i = t.producteurs || [],
    s = () => {
      if (!n.nom?.trim()) return;
      let a = {
        ...n,
        nom: n.nom.trim().slice(0, 60),
        metier: (n.metier || "").trim().slice(0, 60),
        lieu: (n.lieu || "").trim().slice(0, 60),
        texte: (n.texte || "").trim().slice(0, 600),
        produits: (n.produits || "").trim().slice(0, 200),
        lien: /^https?:\/\//.test((n.lien || "").trim()) ? n.lien.trim().slice(0, 300) : "",
      };
      (e("producteurs", (u) =>
        n.id
          ? u.map((d) => (d.id === n.id ? a : d))
          : [...u, { ...a, id: Wr(), ordre: u.length, active: !0 }],
      ),
        r(null));
    },
    o = (a, u) => {
      let d = [...i];
      (([d[a], d[u]] = [d[u], d[a]]),
        e("producteurs", (h) => h.map((p) => ({ ...p, ordre: d.findIndex((m) => m.id === p.id) }))));
    };
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Nos producteurs"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Pr\xE9sentez les producteurs dont vous vendez les produits : une photo, quelques mots. Ils apparaissent sur l'accueil de l'appli.",
    ),
    l.default.createElement(
      "button",
      {
        className: "btn dark",
        onClick: () => r({ nom: "", metier: "", lieu: "", texte: "", produits: "", lien: "", photo: "" }),
      },
      he.plus(),
      "Ajouter un producteur",
    ),
    l.default.createElement("div", { style: { height: 12 } }),
    !i.length &&
      l.default.createElement(Vn, {
        t: "Aucun producteur",
        s: "Exemple : la fromagerie du village, le mara\xEEcher d'\xE0 c\xF4t\xE9, l'apiculteur\u2026",
      }),
    l.default.createElement(
      "div",
      { className: "grille" },
      i.map((a, u) =>
        l.default.createElement(
          "div",
          { className: "card", key: a.id, style: { opacity: a.active === !1 ? 0.55 : 1 } },
          l.default.createElement(
            "div",
            { className: "row" },
            a.photo
              ? l.default.createElement("img", {
                  className: "thumb",
                  src: a.photo,
                  alt: "",
                  style: { borderRadius: "50%" },
                })
              : l.default.createElement(
                  "div",
                  {
                    className: "thumb",
                    style: {
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 26,
                    },
                  },
                  "\u{1F9D1}\u200D\u{1F33E}",
                ),
            l.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              l.default.createElement("div", { className: "nm" }, a.nom),
              l.default.createElement(
                "div",
                { className: "de" },
                [a.metier, a.lieu].filter(Boolean).join(" \xB7 "),
              ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              u > 0 &&
                l.default.createElement(
                  "button",
                  { className: "ib", onClick: () => o(u, u - 1), "aria-label": "Monter" },
                  "\u2191",
                ),
              l.default.createElement(ze, {
                on: a.active !== !1,
                set: () =>
                  e("producteurs", (d) =>
                    d.map((h) => (h.id === a.id ? { ...h, active: h.active === !1 } : h)),
                  ),
              }),
              l.default.createElement("button", { className: "ib", onClick: () => r(a) }, he.pen()),
              l.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer " + a.nom + " ?")) &&
                    e("producteurs", (d) => d.filter((h) => h.id !== a.id)),
                },
                he.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    n &&
      l.default.createElement(
        ut,
        { titre: n.id ? "Modifier" : "Nouveau producteur", onClose: () => r(null) },
        l.default.createElement(Ri, { value: n.photo, onChange: (a) => r((u) => ({ ...u, photo: a })) }),
        l.default.createElement("label", { className: "lab" }, "Nom"),
        l.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: n.nom,
          maxLength: 60,
          onChange: (a) => r({ ...n, nom: a.target.value }),
          placeholder: "Ex : Fromagerie de la Vall\xE9e",
        }),
        l.default.createElement("label", { className: "lab" }, "Ce qu'il fait"),
        l.default.createElement("input", {
          className: "inp",
          value: n.metier,
          maxLength: 60,
          onChange: (a) => r({ ...n, metier: a.target.value }),
          placeholder: "Ex : Fromager, mara\xEEcher, apiculteur\u2026",
        }),
        l.default.createElement("label", { className: "lab" }, "Village"),
        l.default.createElement("input", {
          className: "inp",
          value: n.lieu,
          maxLength: 60,
          onChange: (a) => r({ ...n, lieu: a.target.value }),
          placeholder: "Ex : Faucogney-et-la-Mer",
        }),
        l.default.createElement("label", { className: "lab" }, "Quelques mots"),
        l.default.createElement("textarea", {
          className: "inp",
          value: n.texte,
          maxLength: 600,
          onChange: (a) => r({ ...n, texte: a.target.value }),
          placeholder: "Son histoire, sa fa\xE7on de travailler\u2026",
        }),
        l.default.createElement("label", { className: "lab" }, "Ses produits \xE0 l'\xE9picerie"),
        l.default.createElement("input", {
          className: "inp",
          value: n.produits,
          maxLength: 200,
          onChange: (a) => r({ ...n, produits: a.target.value }),
          placeholder: "Ex : comt\xE9, morbier, cancoillotte",
        }),
        l.default.createElement("label", { className: "lab" }, "Lien vers sa page (facultatif)"),
        l.default.createElement("input", {
          className: "inp",
          value: n.lien,
          placeholder: "https://\u2026",
          autoCapitalize: "off",
          onChange: (a) => r({ ...n, lien: a.target.value }),
        }),
        l.default.createElement(
          "div",
          { className: "de", style: { marginTop: 6 } },
          "Demandez-lui son accord avant de publier sa photo et son nom.",
        ),
        l.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: s },
          "Enregistrer",
        ),
      ),
  );
}
function M7({ d: t, set: e }) {
  let [n, r] = (0, l.useState)(null),
    i = t.recettes || [],
    s = () => {
      if (!n.titre?.trim()) return;
      let o = {
        ...n,
        titre: n.titre.trim().slice(0, 80),
        duree: (n.duree || "").trim().slice(0, 40),
        personnes: Math.max(0, Math.min(50, parseInt(n.personnes) || 0)),
        intro: (n.intro || "").trim().slice(0, 400),
        ingredients: (n.ingredients || "").trim().slice(0, 1500),
        etapes: (n.etapes || "").trim().slice(0, 3e3),
      };
      (e("recettes", (a) =>
        n.id
          ? a.map((u) => (u.id === n.id ? o : u))
          : [{ ...o, id: Wr(), cree: Date.now(), active: !0 }, ...a],
      ),
        r(null));
    };
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "La recette de la semaine"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "La recette la plus r\xE9cente s'affiche sur l'accueil de l'appli, les pr\xE9c\xE9dentes juste en dessous. \xC9crivez un ingr\xE9dient ou une \xE9tape par ligne.",
    ),
    l.default.createElement(
      "button",
      {
        className: "btn dark",
        onClick: () =>
          r({ titre: "", duree: "", personnes: 4, intro: "", ingredients: "", etapes: "", photo: "" }),
      },
      he.plus(),
      "Nouvelle recette",
    ),
    l.default.createElement("div", { style: { height: 12 } }),
    !i.length &&
      l.default.createElement(Vn, {
        t: "Aucune recette",
        s: "Exemple : la tarte aux myrtilles, la cancoillotte chaude, la pot\xE9e\u2026",
      }),
    i.map((o, a) =>
      l.default.createElement(
        "div",
        { className: "card", key: o.id, style: { opacity: o.active === !1 ? 0.55 : 1 } },
        l.default.createElement(
          "div",
          { className: "row" },
          o.photo
            ? l.default.createElement("img", { className: "thumb", src: o.photo, alt: "" })
            : l.default.createElement(
                "div",
                {
                  className: "thumb",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    background: "#EEF3E2",
                  },
                },
                "\u{1F4D6}",
              ),
          l.default.createElement(
            "div",
            { style: { minWidth: 0 } },
            l.default.createElement("div", { className: "nm" }, o.titre),
            l.default.createElement(
              "div",
              { className: "de" },
              a === 0 && o.active !== !1 ? "\u2B50 Recette de la semaine \xB7 " : "",
              new Date(o.cree || 0).toLocaleDateString("fr-FR"),
            ),
          ),
          l.default.createElement(
            "div",
            { className: "rt" },
            l.default.createElement(ze, {
              on: o.active !== !1,
              set: () =>
                e("recettes", (u) => u.map((d) => (d.id === o.id ? { ...d, active: d.active === !1 } : d))),
            }),
            l.default.createElement("button", { className: "ib", onClick: () => r(o) }, he.pen()),
            l.default.createElement(
              "button",
              {
                className: "ib",
                onClick: async () =>
                  (await De("Supprimer \xAB " + o.titre + " \xBB ?")) &&
                  e("recettes", (u) => u.filter((d) => d.id !== o.id)),
              },
              he.bin(),
            ),
          ),
        ),
      ),
    ),
    n &&
      l.default.createElement(
        ut,
        { titre: n.id ? "Modifier la recette" : "Nouvelle recette", onClose: () => r(null) },
        l.default.createElement(Ri, { value: n.photo, onChange: (o) => r((a) => ({ ...a, photo: o })) }),
        l.default.createElement("label", { className: "lab" }, "Titre"),
        l.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: n.titre,
          maxLength: 80,
          onChange: (o) => r({ ...n, titre: o.target.value }),
          placeholder: "Ex : Tarte aux myrtilles de grand-m\xE8re",
        }),
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          l.default.createElement(
            "div",
            { style: { flex: 2, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, "Temps"),
            l.default.createElement("input", {
              className: "inp",
              value: n.duree,
              maxLength: 40,
              onChange: (o) => r({ ...n, duree: o.target.value }),
              placeholder: "Ex : 45 min",
            }),
          ),
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, "Personnes"),
            l.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              value: n.personnes,
              onChange: (o) => r({ ...n, personnes: o.target.value }),
            }),
          ),
        ),
        l.default.createElement("label", { className: "lab" }, "Petit mot (facultatif)"),
        l.default.createElement("textarea", {
          className: "inp",
          value: n.intro,
          maxLength: 400,
          onChange: (o) => r({ ...n, intro: o.target.value }),
          placeholder: "Ex : La recette pr\xE9f\xE9r\xE9e de mes clients en automne\u2026",
        }),
        l.default.createElement("label", { className: "lab" }, "Ingr\xE9dients (un par ligne)"),
        l.default.createElement("textarea", {
          className: "inp",
          value: n.ingredients,
          maxLength: 1500,
          onChange: (o) => r({ ...n, ingredients: o.target.value }),
          placeholder: `250 g de myrtilles
1 p\xE2te bris\xE9e
2 \u0153ufs`,
          style: { minHeight: 110 },
        }),
        l.default.createElement("label", { className: "lab" }, "Pr\xE9paration (une \xE9tape par ligne)"),
        l.default.createElement("textarea", {
          className: "inp",
          value: n.etapes,
          maxLength: 3e3,
          onChange: (o) => r({ ...n, etapes: o.target.value }),
          placeholder: `Pr\xE9chauffer le four \xE0 180 \xB0C
\xC9taler la p\xE2te dans le moule
\u2026`,
          style: { minHeight: 140 },
        }),
        l.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: s },
          "Enregistrer",
        ),
      ),
  );
}
function L7({ d: t, set: e }) {
  let n = { active: !1, id: "", question: "", mode: "choix", options: ["", ""], ...(t.sondage || {}) },
    r = (a) => e("sondage", (u) => ({ ...n, ...(u || {}), ...a })),
    i = (t.reponses || []).filter((a) => a.s === n.id),
    s = async () => {
      (n.question &&
        !(await De(
          "Commencer un nouveau sondage ? Le sondage actuel s'arr\xEAte (ses r\xE9ponses restent consultables ci-dessous jusqu'\xE0 ce que vous les effaciez).",
          { oui: "Nouveau sondage" },
        ))) ||
        e("sondage", { active: !1, id: "s" + Date.now(), question: "", mode: "choix", options: ["", ""] });
    },
    o = [...new Set((t.reponses || []).map((a) => a.s).filter((a) => a && a !== n.id))];
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Sondages et bo\xEEte \xE0 id\xE9es"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Posez une question \xE0 vos clients : ils r\xE9pondent depuis l'accueil de l'appli, de fa\xE7on anonyme (une r\xE9ponse par t\xE9l\xE9phone).",
    ),
    n.id
      ? l.default.createElement(
          l.default.Fragment,
          null,
          l.default.createElement(
            "div",
            { className: "card" },
            l.default.createElement(
              "div",
              { className: "tog" },
              l.default.createElement(
                "span",
                { style: { fontSize: 13, fontWeight: 700 } },
                "Visible dans l'appli",
                l.default.createElement(
                  "span",
                  { className: "de", style: { display: "block", fontWeight: 400 } },
                  n.active
                    ? "\u2713 Les clients voient la question sur l'accueil."
                    : "Masqu\xE9 : les clients ne le voient pas.",
                ),
              ),
              l.default.createElement(
                "div",
                { className: "rt" },
                l.default.createElement(ze, { on: n.active, set: () => r({ active: !n.active }) }),
              ),
            ),
            l.default.createElement(
              "div",
              { className: "seg", style: { margin: "10px 0" } },
              [
                ["choix", "Choix \xE0 cocher"],
                ["libre", "Bo\xEEte \xE0 id\xE9es (texte libre)"],
              ].map(([a, u]) =>
                l.default.createElement(
                  "button",
                  {
                    key: a,
                    className: n.mode === a ? "on" : "",
                    disabled: i.length > 0,
                    onClick: () => r({ mode: a }),
                  },
                  u,
                ),
              ),
            ),
            l.default.createElement("label", { className: "lab" }, "Question"),
            l.default.createElement("input", {
              className: "inp",
              value: n.question,
              maxLength: 140,
              disabled: i.length > 0,
              onChange: (a) => r({ question: a.target.value }),
              placeholder:
                n.mode === "libre"
                  ? "Ex : Quel produit aimeriez-vous trouver \xE0 l'\xE9picerie ?"
                  : "Ex : Plateau raclette ou fondue pour No\xEBl ?",
            }),
            n.mode === "choix" &&
              l.default.createElement(
                l.default.Fragment,
                null,
                l.default.createElement("label", { className: "lab" }, "R\xE9ponses possibles"),
                (n.options || []).map((a, u) =>
                  l.default.createElement(
                    "div",
                    { key: u, style: { display: "flex", gap: 8, marginBottom: 6 } },
                    l.default.createElement("input", {
                      className: "inp",
                      style: { margin: 0 },
                      value: a,
                      maxLength: 60,
                      disabled: i.length > 0,
                      onChange: (d) =>
                        r({ options: n.options.map((h, p) => (p === u ? d.target.value : h)) }),
                      placeholder: "R\xE9ponse " + (u + 1),
                    }),
                    n.options.length > 2 &&
                      !i.length &&
                      l.default.createElement(
                        "button",
                        {
                          className: "ib",
                          onClick: () => r({ options: n.options.filter((d, h) => h !== u) }),
                        },
                        he.bin(),
                      ),
                  ),
                ),
                n.options.length < 6 &&
                  !i.length &&
                  l.default.createElement(
                    "button",
                    {
                      className: "btn gh sm",
                      style: { width: "auto" },
                      onClick: () => r({ options: [...n.options, ""] }),
                    },
                    "+ Ajouter une r\xE9ponse",
                  ),
              ),
            i.length > 0 &&
              l.default.createElement(
                "div",
                { className: "de", style: { marginTop: 8 } },
                "La question ne se modifie plus une fois les premi\xE8res r\xE9ponses re\xE7ues.",
              ),
          ),
          l.default.createElement(
            "div",
            { className: "card" },
            l.default.createElement(
              "div",
              { className: "nm", style: { marginBottom: 8 } },
              "\u{1F4CA} R\xE9sultats : ",
              i.length,
              " r\xE9ponse",
              i.length > 1 ? "s" : "",
            ),
            n.mode === "choix"
              ? (n.options || []).map((a, u) => {
                  let d = i.filter((p) => p.o === u).length,
                    h = i.length ? Math.round((d * 100) / i.length) : 0;
                  return l.default.createElement(
                    "div",
                    { key: u, style: { marginBottom: 8 } },
                    l.default.createElement(
                      "div",
                      { style: { display: "flex", justifyContent: "space-between", fontSize: 13.5 } },
                      l.default.createElement("span", null, a || "R\xE9ponse " + (u + 1)),
                      l.default.createElement("b", null, d, " (", h, " %)"),
                    ),
                    l.default.createElement(
                      "div",
                      { style: { height: 8, borderRadius: 4, background: "#EEF3E2", overflow: "hidden" } },
                      l.default.createElement("div", {
                        style: { width: h + "%", height: "100%", background: "var(--apple)" },
                      }),
                    ),
                  );
                })
              : i.length
                ? i.map((a) =>
                    l.default.createElement(
                      "div",
                      {
                        key: a.id,
                        style: { padding: "8px 0", borderBottom: "1px solid var(--line)", fontSize: 13.5 },
                      },
                      "\u{1F4A1} ",
                      a.r,
                      l.default.createElement(
                        "div",
                        { className: "de" },
                        new Date(a.cree || 0).toLocaleDateString("fr-FR"),
                      ),
                    ),
                  )
                : l.default.createElement("div", { className: "de" }, "Pas encore de r\xE9ponse."),
          ),
          l.default.createElement(
            "button",
            { className: "btn gh", onClick: s },
            he.plus(),
            "Nouveau sondage",
          ),
        )
      : l.default.createElement(
          "button",
          { className: "btn dark", onClick: s },
          he.plus(),
          "Cr\xE9er un sondage",
        ),
    o.length > 0 &&
      l.default.createElement(
        "div",
        { className: "card", style: { marginTop: 12 } },
        l.default.createElement("div", { className: "nm", style: { marginBottom: 6 } }, "Anciens sondages"),
        l.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 8 } },
          (t.reponses || []).filter((a) => a.s !== n.id).length,
          " r\xE9ponse(s) d'anciens sondages sont encore gard\xE9es.",
        ),
        l.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { width: "auto" },
            onClick: async () =>
              (await De("Effacer les r\xE9ponses des anciens sondages ?", { oui: "Effacer" })) &&
              e("reponses", (a) => a.filter((u) => u.s === n.id)),
          },
          "Effacer les anciennes r\xE9ponses",
        ),
      ),
  );
}
function O7({ d: t, set: e }) {
  let n = oc(t.roue),
    r = (E) => e("roue", (A) => ({ ...oc(A), ...E })),
    i = (E, A) => r({ tirages: n.tirages.map((S) => (S.id === E ? { ...S, ...A } : S)) }),
    s = VS(t.clients, n).sort((E, A) => A.tickets - E.tickets),
    o = s.reduce((E, A) => E + A.tickets, 0),
    [a, u] = (0, l.useState)(null),
    [d, h] = (0, l.useState)(null),
    p = BS(n),
    m = [
      { id: "a", prenom: "Jean", tickets: 3 },
      { id: "b", prenom: "Sophie", tickets: 5 },
      { id: "c", prenom: "Michel", tickets: 2 },
      { id: "d", prenom: "Claire", tickets: 4 },
      { id: "e", prenom: "Paul", tickets: 1 },
    ],
    w = s.length >= 2 ? s : m;
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("style", null, WS),
    l.default.createElement("div", { className: "t1" }, "Roue de No\xEBl"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Chaque tampon en caisse offre un tour de roue au client (une chance sur deux). Chaque \xAB Gagn\xE9 \xBB = 1 ticket pour le prochain tirage au sort. Le tirage se lance depuis la caisse, sur l'iPad.",
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      l.default.createElement(
        "div",
        { className: "tog" },
        l.default.createElement(
          "span",
          { style: { fontSize: 13, fontWeight: 700 } },
          "Roue active",
          l.default.createElement(
            "span",
            { className: "de", style: { display: "block", fontWeight: 400 } },
            p
              ? "\u2713 La roue tourne en ce moment \xE0 chaque tampon."
              : n.active
                ? "Active, mais en dehors des dates choisies."
                : "D\xE9sactiv\xE9e : aucun tour de roue en caisse.",
          ),
        ),
        l.default.createElement(
          "div",
          { className: "rt" },
          l.default.createElement(ze, { on: n.active, set: () => r({ active: !n.active }) }),
        ),
      ),
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: 10 } },
        l.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          l.default.createElement("label", { className: "lab" }, "Du"),
          l.default.createElement("input", {
            className: "inp",
            type: "date",
            style: { width: "100%", minWidth: 0, boxSizing: "border-box" },
            value: n.debut || "",
            onChange: (E) => r({ debut: E.target.value }),
          }),
        ),
        l.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          l.default.createElement("label", { className: "lab" }, "Au (inclus)"),
          l.default.createElement("input", {
            className: "inp",
            type: "date",
            style: { width: "100%", minWidth: 0, boxSizing: "border-box" },
            value: n.fin || "",
            onChange: (E) => r({ fin: E.target.value }),
          }),
        ),
      ),
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      l.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 6 } },
        "\u{1F3A1} Voir la d\xE9mo",
      ),
      l.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 10 } },
        "Ce que voit le client dans son appli, et l'animation du tirage sur l'iPad. Rien n'est enregistr\xE9.",
      ),
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
        l.default.createElement(
          "button",
          { className: "btn sm", style: { width: "auto" }, onClick: () => u("g") },
          "Roue : tour gagn\xE9",
        ),
        l.default.createElement(
          "button",
          { className: "btn gh sm", style: { width: "auto" }, onClick: () => u("p") },
          "Roue : tour perdu",
        ),
        l.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { width: "auto" },
            onClick: () => {
              (h(w[Math.floor(Math.random() * w.length)]), u("tirage"));
            },
          },
          "Animation du tirage",
        ),
      ),
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      l.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 6 } },
        "\u{1F381} Tirages au sort",
      ),
      l.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 8 } },
        "Les dates sont des rep\xE8res : le tirage se fait quand vous appuyez sur \xAB Lancer le tirage \xBB dans la caisse. Apr\xE8s chaque tirage, les tickets repartent \xE0 z\xE9ro.",
      ),
      n.tirages.map((E) =>
        l.default.createElement(
          "div",
          { key: E.id, className: "tir-adm" },
          l.default.createElement("input", {
            className: "inp",
            value: E.titre || "",
            maxLength: 60,
            disabled: E.fait,
            onChange: (A) => i(E.id, { titre: A.target.value }),
          }),
          l.default.createElement("input", {
            className: "inp",
            type: "date",
            value: E.date || "",
            disabled: E.fait,
            onChange: (A) => i(E.id, { date: A.target.value }),
            style: { maxWidth: 160 },
          }),
          E.fait
            ? l.default.createElement(
                "span",
                { className: "de" },
                "\u2713 Gagnant : ",
                l.default.createElement("b", null, E.gagnant),
              )
            : l.default.createElement(
                "button",
                {
                  className: "btn gh sm",
                  style: { width: "auto" },
                  onClick: async () =>
                    (await De("Retirer ce tirage ?", { oui: "Retirer" })) &&
                    r({ tirages: n.tirages.filter((A) => A.id !== E.id) }),
                },
                "Retirer",
              ),
        ),
      ),
      l.default.createElement(
        "button",
        {
          className: "btn gh sm",
          style: { width: "auto", marginTop: 6 },
          onClick: () =>
            r({ tirages: [...n.tirages, { id: "t" + Date.now(), date: "", titre: "Tirage au sort" }] }),
        },
        "+ Ajouter un tirage",
      ),
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      l.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 6 } },
        "\u{1F39F}\uFE0F Tickets en jeu pour le prochain tirage : ",
        o,
      ),
      s.length
        ? s.map((E) =>
            l.default.createElement(
              "div",
              {
                key: E.id,
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "7px 0",
                  borderBottom: "1px solid var(--line)",
                  fontSize: 14,
                },
              },
              l.default.createElement("span", null, E.nom || E.prenom),
              l.default.createElement("b", null, E.tickets, " ticket", E.tickets > 1 ? "s" : ""),
            ),
          )
        : l.default.createElement("div", { className: "de" }, "Aucun ticket pour l'instant."),
      n.annonce?.prenom &&
        l.default.createElement(
          "div",
          { className: "de", style: { marginTop: 10 } },
          "Dernier gagnant annonc\xE9 dans l'appli : ",
          l.default.createElement("b", null, n.annonce.prenom),
          " (",
          new Date(n.annonce.date).toLocaleDateString("fr-FR"),
          ")",
        ),
    ),
    a === "g" || a === "p"
      ? l.default.createElement(GS, {
          key: a,
          demo: !0,
          premiere: !1,
          tours: [{ g: a === "g", t: 0 }],
          tickets: null,
          onFini: () => u(null),
        })
      : a === "tirage"
        ? l.default.createElement(
            "div",
            { className: "roue-fond", onClick: () => {} },
            l.default.createElement(
              "div",
              { className: "roue-in", style: { maxWidth: 560 } },
              l.default.createElement("h2", null, "Tirage au sort"),
              d && l.default.createElement(HS, { participants: w, gagnant: d }),
              l.default.createElement(
                "button",
                { className: "roue-b2", style: { marginTop: 10 }, onClick: () => u(null) },
                "Fermer la d\xE9mo",
              ),
            ),
          )
        : null,
  );
}
function B7({ d: t, set: e }) {
  let [n, r] = (0, l.useState)("clients"),
    [i, s] = (0, l.useState)(""),
    [o, a] = (0, l.useState)(!1),
    [u, d] = (0, l.useState)(""),
    [h, p] = (0, l.useState)(null),
    [m, w] = (0, l.useState)(null),
    [E, A] = (0, l.useState)(null),
    [S, _] = (0, l.useState)("achat"),
    [I, T] = (0, l.useState)(""),
    [M, V] = (0, l.useState)(""),
    O = t.fidelite,
    [b, v] = (0, l.useState)(!1),
    x = (L) => t.clients.find((z) => z.id === L) || E,
    C = async () => {
      let L = parseFloat(I);
      if (!L || b) return;
      let z = Math.floor(L / (O.parEuro || 10));
      v(!0);
      try {
        (await hw(x(E.id), z, { type: "achat", montant: L }), A(null), T(""));
      } catch {
        ft("Points non enregistr\xE9s. V\xE9rifiez la connexion et r\xE9essayez.");
      }
      v(!1);
    },
    F = x2(O),
    P = async () => {
      let L = x(E.id);
      if (
        !(!F || b || (L.points || 0) < F.points) &&
        (await De(
          "Appliquer " +
            eo(F.euros) +
            " de remise \xE0 " +
            L.nom +
            ` ?

` +
            F.points +
            " points seront retir\xE9s de sa carte.",
        ))
      ) {
        v(!0);
        try {
          await hw(L, -F.points, { type: "remise", remise: F.euros });
        } catch {
          ft("Remise non enregistr\xE9e. V\xE9rifiez la connexion et r\xE9essayez.");
        }
        v(!1);
      }
    },
    k = async () => {
      let L = parseInt(M);
      if (!(!L || b)) {
        v(!0);
        try {
          (await hw(
            x(E.id),
            L,
            L > 0 ? { type: "achat", source: "admin" } : { type: "manuel", motif: "Correction" },
          ),
            A(null),
            V(""));
        } catch {
          ft("Ajustement non enregistr\xE9. V\xE9rifiez la connexion et r\xE9essayez.");
        }
        v(!1);
      }
    },
    $ = () => {
      let L = t.clients.find((z) => z.code.toUpperCase() === u.toUpperCase().trim());
      L ? (a(!1), d(""), A(L), _("achat")) : ft("Aucun client avec le code " + u);
    },
    Q = () => {
      let L = (h.prenom ?? (h.nom || "").split(" ")[0]).trim(),
        z = (h.nomFamille ?? (h.nom || "").split(" ").slice(1).join(" ")).trim();
      if (!L && !z) return;
      if (
        ((h.prenom = L.slice(0, 40)),
        (h.nomFamille = z.slice(0, 40)),
        (h.nom = (L + " " + z).trim().slice(0, 60)),
        (h.email = String(h.email || "")
          .trim()
          .toLowerCase()
          .slice(0, 100)),
        !h.id && !h.informe)
      )
        return ft(
          "Cochez la case : le client doit avoir \xE9t\xE9 inform\xE9 de l'utilisation de ses donn\xE9es (RGPD).",
        );
      let ne = new Date().toLocaleDateString("sv-SE"),
        { informe: ge, ...ve } = h,
        Ae = h.code;
      for (; !Ae || (!h.id && t.clients.some((Je) => Je.code === Ae));) Ae = U9();
      (e("clients", (Je) =>
        h.id
          ? Je.map((bt) => (bt.id === h.id ? ve : bt))
          : [
              ...Je,
              {
                ...ve,
                id: Wr(),
                code: Ae,
                points: h.points || 0,
                tampons: h.tampons || 0,
                depuis: ne,
                accord: ne,
              },
            ],
      ),
        p(null));
    },
    Y = eC(O) && cf(O),
    U = Object.values(t.clients.reduce((L, z) => ((L[z.code] = L[z.code] || []).push(z), L), {})).filter(
      (L) => L.length > 1,
    ),
    [G, Z] = (0, l.useState)(null),
    fe = async (L, z, ne) => {
      if (!b) {
        v(!0);
        try {
          await $9(L, z, ne, Y);
        } catch {
          ft("Non enregistr\xE9. V\xE9rifiez la connexion et r\xE9essayez.");
        }
        v(!1);
      }
    },
    ce = t.clients.filter(
      (L) =>
        !i ||
        L.nom.toLowerCase().includes(i.toLowerCase()) ||
        L.code.toLowerCase().includes(i.toLowerCase()) ||
        (L.tel || "").includes(i),
    );
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "Fid\xE9lit\xE9"),
    l.default.createElement(
      "div",
      { className: "sub" },
      Y
        ? "Carte \xE0 tampons : au comptoir, ouvrez la Caisse sur votre iPhone, le client pr\xE9sente son QR code, bip, c'est tamponn\xE9."
        : "Scannez ou saisissez le code du client, puis ajoutez ses points. Les anciennes cartes papier se reprennent en ajout manuel.",
    ),
    U.length > 0 &&
      l.default.createElement(
        "div",
        { className: "cmd-alerte", style: { marginBottom: 12 } },
        "\u26A0\uFE0F Code en double : ",
        U.map((L) => L[0].code + " (" + L.map((z) => z.nom).join(", ") + ")").join(" \xB7 "),
        ". Supprimez l'une des cartes et recr\xE9ez-la (un nouveau code sera donn\xE9).",
      ),
    l.default.createElement(
      "div",
      { className: "seg" },
      l.default.createElement(
        "button",
        { className: n === "clients" ? "on" : "", onClick: () => r("clients") },
        "Clients (",
        t.clients.length,
        ")",
      ),
      l.default.createElement(
        "button",
        { className: n === "reglages" ? "on" : "", onClick: () => r("reglages") },
        "R\xE9glages",
      ),
    ),
    n === "clients" &&
      l.default.createElement(
        l.default.Fragment,
        null,
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, marginBottom: 12 } },
          Y
            ? l.default.createElement(
                "a",
                { className: "btn dark", href: "caisse.html", style: { textDecoration: "none" } },
                he.qr(),
                "Ouvrir la caisse",
              )
            : l.default.createElement(
                "button",
                { className: "btn dark", onClick: () => a(!0) },
                he.qr(),
                "Encaisser",
              ),
          l.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { flex: "0 0 auto", padding: "13px 16px" },
              onClick: () => p({ nom: "", tel: "", points: 0 }),
            },
            he.plus(16, "#5C6A62"),
          ),
        ),
        l.default.createElement("input", {
          className: "inp",
          placeholder: "Rechercher un client\u2026",
          value: i,
          onChange: (L) => s(L.target.value),
          style: { marginBottom: 12 },
        }),
        !t.clients.length &&
          l.default.createElement(Vn, {
            t: "Aucun client inscrit",
            s: "Vos clients cr\xE9ent eux-m\xEAmes leur carte depuis l'application. Vous pouvez aussi en ajouter un ici.",
          }),
        l.default.createElement(
          "div",
          { className: "grille" },
          ce.map((L) => {
            let z = (O.paliers || []).find((ge) => ge.at > (L.points || 0)),
              ne = _2(O, L.points || 0);
            return l.default.createElement(
              "div",
              { className: "card", key: L.id },
              l.default.createElement(
                "div",
                { className: "row" },
                l.default.createElement(
                  "div",
                  { style: { minWidth: 0 } },
                  l.default.createElement("div", { className: "nm" }, L.nom),
                  l.default.createElement(
                    "div",
                    { className: "de" },
                    L.code,
                    L.tel ? " \xB7 " + L.tel : "",
                    L.parrain
                      ? " \xB7 \u{1F91D} parrain\xE9" + (L.parrainFait ? "" : " (bonus au 1er passage)")
                      : "",
                    df(L).niv ? " \xB7 " + df(L).niv.ico + " " + df(L).niv.nom : "",
                    L.bonusAttente > 0
                      ? " \xB7 \u{1F382} " +
                          L.bonusAttente +
                          " tampon" +
                          (L.bonusAttente > 1 ? "s" : "") +
                          " offert" +
                          (L.bonusAttente > 1 ? "s" : "") +
                          " en attente"
                      : "",
                  ),
                  l.default.createElement(
                    "div",
                    { className: "de", style: { color: "var(--gold)", fontWeight: 700 } },
                    Y
                      ? (L.tampons || 0) >= Y.nb
                        ? "\u{1F381}\u{1F381} Carte compl\xE8te : " + Y.recompense
                        : Y.palier && (L.tampons || 0) === Y.palier
                          ? L.choix === "cadeau" && (L.choixLe || 0) > (L.dernierTampon || 0)
                            ? "\u{1F381} Vient chercher " + Y.recompense1 + " (choisi dans l'appli)"
                            : L.choix === "continue" && (L.choixLe || 0) > (L.dernierTampon || 0)
                              ? "Continue vers " + Y.recompense + " (choisi dans l'appli)"
                              : "\u{1F381} " + Y.recompense1 + " disponible (ou continue)"
                          : (() => {
                              let ge = Y.palier && (L.tampons || 0) < Y.palier ? Y.palier : Y.nb,
                                ve = ge - (L.tampons || 0);
                              return (
                                "Encore " +
                                ve +
                                " tampon" +
                                (ve > 1 ? "s" : "") +
                                " pour " +
                                (ge === Y.palier ? Y.recompense1 : Y.recompense)
                              );
                            })()
                      : ne
                        ? ne.nb > 0
                          ? `\u{1F381} ${eo(ne.valeur)} de remise disponible`
                          : `Encore ${ne.manque} points pour ${eo(ne.euros)} de remise`
                        : z
                          ? `Encore ${z.at - (L.points || 0)} pour \xAB ${z.label} \xBB`
                          : "Tous les paliers atteints",
                  ),
                ),
                l.default.createElement(
                  "div",
                  { className: "rt" },
                  l.default.createElement(
                    "div",
                    { style: { textAlign: "center" } },
                    l.default.createElement(
                      "div",
                      { style: { fontSize: 22, fontWeight: 800, color: "var(--gold)", lineHeight: 1 } },
                      Y ? (L.tampons || 0) + "/" + Y.nb : L.points || 0,
                    ),
                    l.default.createElement(
                      "div",
                      { style: { fontSize: 9, color: "var(--ink3)" } },
                      Y ? "tampons" : "points",
                    ),
                  ),
                  Y
                    ? l.default.createElement(
                        "button",
                        { className: "btn sm", onClick: () => Z(L) },
                        "Tampons",
                      )
                    : l.default.createElement(
                        "button",
                        {
                          className: "btn sm",
                          onClick: () => {
                            (A(L), _("achat"), T(""), V(""));
                          },
                        },
                        "Points",
                      ),
                  l.default.createElement(
                    "button",
                    {
                      className: "ib",
                      onClick: async () =>
                        (await De("Supprimer " + L.nom + " ?")) &&
                        e("clients", (ge) => ge.filter((ve) => ve.id !== L.id)),
                    },
                    he.bin(),
                  ),
                ),
              ),
            );
          }),
        ),
      ),
    n === "reglages" &&
      l.default.createElement(
        l.default.Fragment,
        null,
        l.default.createElement(q7, { d: t, set: e }),
        Y &&
          l.default.createElement(
            "div",
            { className: "card" },
            l.default.createElement(
              "div",
              { style: { fontWeight: 800, fontSize: 14, marginBottom: 4 } },
              "Carte \xE0 tampons",
            ),
            l.default.createElement("div", { className: "de", style: { marginBottom: 6 } }, A2(O)),
            l.default.createElement(
              "div",
              { style: { display: "flex", gap: 10 } },
              l.default.createElement(
                "div",
                { style: { flex: 1 } },
                l.default.createElement("label", { className: "lab" }, "Tampons sur la carte"),
                l.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "numeric",
                  min: "3",
                  max: "30",
                  value: O.tampons?.nb ?? it.nb,
                  onChange: (L) =>
                    e("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), nb: L.target.value },
                    })),
                }),
              ),
              l.default.createElement(
                "div",
                { style: { flex: 1 } },
                l.default.createElement("label", { className: "lab" }, "1er cadeau au\u2026 (0 = aucun)"),
                l.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "numeric",
                  min: "0",
                  value: O.tampons?.palier ?? it.palier,
                  onChange: (L) =>
                    e("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), palier: L.target.value },
                    })),
                }),
              ),
            ),
            l.default.createElement(
              "div",
              { style: { display: "flex", gap: 10 } },
              l.default.createElement(
                "div",
                { style: { flex: 1 } },
                l.default.createElement("label", { className: "lab" }, "Achat minimum (\u20AC)"),
                l.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "decimal",
                  value: O.tampons?.seuil ?? it.seuil,
                  onChange: (L) =>
                    e("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), seuil: L.target.value },
                    })),
                }),
              ),
            ),
            Y.palier > 0 &&
              l.default.createElement(
                l.default.Fragment,
                null,
                l.default.createElement(
                  "label",
                  { className: "lab" },
                  "1er cadeau (au ",
                  Y.palier,
                  "e tampon)",
                ),
                l.default.createElement("input", {
                  className: "inp",
                  value: O.tampons?.recompense1 ?? it.recompense1,
                  maxLength: 60,
                  onChange: (L) =>
                    e("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), recompense1: L.target.value },
                    })),
                }),
              ),
            l.default.createElement(
              "label",
              { className: "lab" },
              Y.palier
                ? "Gros cadeau (carte pleine, " + Y.nb + "e tampon)"
                : "R\xE9compense quand la carte est pleine",
            ),
            l.default.createElement("input", {
              className: "inp",
              value: O.tampons?.recompense ?? it.recompense,
              maxLength: 60,
              onChange: (L) =>
                e("fidelite", (z) => ({
                  ...z,
                  tampons: { ...it, ...(z.tampons || {}), recompense: L.target.value },
                })),
            }),
            l.default.createElement("label", { className: "lab" }, "Produits qui ne comptent pas"),
            l.default.createElement("input", {
              className: "inp",
              value: O.tampons?.exclus ?? it.exclus,
              maxLength: 120,
              onChange: (L) =>
                e("fidelite", (z) => ({
                  ...z,
                  tampons: { ...it, ...(z.tampons || {}), exclus: L.target.value },
                })),
            }),
            l.default.createElement(
              "label",
              { className: "lab" },
              "Pas deux tampons en moins de\u2026 (minutes)",
            ),
            l.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              value: O.tampons?.delai ?? it.delai,
              onChange: (L) =>
                e("fidelite", (z) => ({
                  ...z,
                  tampons: { ...it, ...(z.tampons || {}), delai: L.target.value },
                })),
              style: { maxWidth: 160 },
            }),
            l.default.createElement(
              "div",
              { className: "de", style: { marginTop: 8 } },
              Y.palier
                ? "Au " +
                    Y.palier +
                    "e tampon, la caisse demande : le client prend son cadeau (carte \xE0 z\xE9ro) ou continue jusqu'au " +
                    Y.nb +
                    "e pour le gros cadeau. "
                : "",
              "Affich\xE9 aux clients sur leur carte : \xAB ",
              A2(O),
              " \xB7 Hors ",
              cf(O).exclus,
              " \xBB.",
            ),
          ),
        l.default.createElement(
          "div",
          { className: "card" },
          l.default.createElement(
            "div",
            { className: "tog" },
            l.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              "Programme actif",
              l.default.createElement(
                "span",
                { className: "de", style: { display: "block", fontWeight: 400 } },
                O.active
                  ? "Les clients voient leur carte et leurs points."
                  : "D\xE9sactiv\xE9 : les clients voient \xAB La carte de fid\xE9lit\xE9 arrive bient\xF4t \xBB.",
              ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement(ze, {
                on: O.active,
                set: () => e("fidelite", (L) => ({ ...L, active: !L.active })),
              }),
            ),
          ),
          l.default.createElement(
            "div",
            { className: "tog" },
            l.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              "\u{1F382} Tampon d'anniversaire",
              l.default.createElement(
                "span",
                { className: "de", style: { display: "block", fontWeight: 400 } },
                O.anniv !== !1
                  ? "Le jour de son anniversaire (si le client l'a indiqu\xE9), un tampon est ajout\xE9 \xE0 sa carte automatiquement, avec une notification."
                  : "D\xE9sactiv\xE9.",
              ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement(ze, {
                on: O.anniv !== !1,
                set: () => e("fidelite", (L) => ({ ...L, anniv: L.anniv === !1 })),
              }),
            ),
          ),
          l.default.createElement(
            "div",
            { className: "tog" },
            l.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              "\u{1F91D} Parrainage",
              l.default.createElement(
                "span",
                { className: "de", style: { display: "block", fontWeight: 400 } },
                O.parrainage !== !1
                  ? "Un client parraine un voisin : au 1er passage du voisin, la caisse donne 1 tampon \xE0 chacun."
                  : "D\xE9sactiv\xE9 : le bloc \xAB Parrainez un voisin \xBB est masqu\xE9.",
              ),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement(ze, {
                on: O.parrainage !== !1,
                set: () => e("fidelite", (L) => ({ ...L, parrainage: L.parrainage === !1 })),
              }),
            ),
          ),
          l.default.createElement("label", { className: "lab" }, "Titre affich\xE9"),
          l.default.createElement("input", {
            className: "inp",
            value: O.titre,
            onChange: (L) => e("fidelite", (z) => ({ ...z, titre: L.target.value })),
          }),
          l.default.createElement("label", { className: "lab" }, "Phrase d'explication"),
          l.default.createElement("input", {
            className: "inp",
            value: O.sousTitre,
            onChange: (L) => e("fidelite", (z) => ({ ...z, sousTitre: L.target.value })),
          }),
          !Y &&
            l.default.createElement(
              "div",
              { style: { display: "flex", gap: 10 } },
              l.default.createElement(
                "div",
                { style: { flex: 1 } },
                l.default.createElement("label", { className: "lab" }, "1 point tous les\u2026 (\u20AC)"),
                l.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "numeric",
                  value: O.parEuro,
                  onChange: (L) => e("fidelite", (z) => ({ ...z, parEuro: +L.target.value || 1 })),
                }),
              ),
              !F &&
                l.default.createElement(
                  "div",
                  { style: { flex: 1 } },
                  l.default.createElement("label", { className: "lab" }, "Points sur la carte"),
                  l.default.createElement("input", {
                    className: "inp",
                    type: "number",
                    inputMode: "numeric",
                    value: O.total,
                    onChange: (L) => e("fidelite", (z) => ({ ...z, total: +L.target.value || 10 })),
                  }),
                ),
            ),
        ),
        !Y &&
          l.default.createElement(
            l.default.Fragment,
            null,
            l.default.createElement(
              "div",
              { className: "card" },
              l.default.createElement(
                "div",
                { className: "tog", style: { borderTop: "none", paddingTop: 0 } },
                l.default.createElement(
                  "div",
                  null,
                  l.default.createElement(
                    "div",
                    { style: { fontSize: 13, fontWeight: 800 } },
                    "Remise en euros",
                  ),
                  l.default.createElement(
                    "div",
                    { className: "de" },
                    "Les points se transforment en bon de r\xE9duction",
                  ),
                ),
                l.default.createElement(
                  "div",
                  { className: "rt" },
                  l.default.createElement(ze, {
                    on: !!F,
                    set: () =>
                      e("fidelite", (L) => ({
                        ...L,
                        remise: { ...Na, ...(L.remise || {}), active: !(L.remise && L.remise.active !== !1) },
                      })),
                  }),
                ),
              ),
              F &&
                l.default.createElement(
                  "div",
                  { style: { display: "flex", gap: 10, alignItems: "flex-end" } },
                  l.default.createElement(
                    "div",
                    { style: { flex: 1 } },
                    l.default.createElement("label", { className: "lab" }, "Nombre de points"),
                    l.default.createElement("input", {
                      className: "inp",
                      type: "number",
                      inputMode: "numeric",
                      value: O.remise.points,
                      onChange: (L) =>
                        e("fidelite", (z) => ({
                          ...z,
                          remise: { ...z.remise, points: +L.target.value || 1 },
                        })),
                    }),
                  ),
                  l.default.createElement(
                    "div",
                    { style: { paddingBottom: 14, fontWeight: 800, color: "var(--ink3)" } },
                    "=",
                  ),
                  l.default.createElement(
                    "div",
                    { style: { flex: 1 } },
                    l.default.createElement("label", { className: "lab" }, "Remise (\u20AC)"),
                    l.default.createElement("input", {
                      className: "inp",
                      type: "number",
                      inputMode: "decimal",
                      step: "0.5",
                      value: O.remise.euros,
                      onChange: (L) =>
                        e("fidelite", (z) => ({ ...z, remise: { ...z.remise, euros: L.target.value } })),
                    }),
                  ),
                ),
              F &&
                l.default.createElement(
                  "div",
                  { className: "apercu-prix" },
                  "Exemple : 1 point par ",
                  O.parEuro || 1,
                  " \u20AC \u2192 un client qui d\xE9pense ",
                  F.points * (O.parEuro || 1),
                  " \u20AC gagne ",
                  eo(F.euros),
                  " de remise.",
                ),
            ),
            l.default.createElement(
              "div",
              { className: "hd", style: { marginTop: 6 } },
              l.default.createElement("div", { style: { fontWeight: 800, fontSize: 14 } }, "R\xE9compenses"),
              l.default.createElement(
                "button",
                {
                  className: "btn gh sm",
                  onClick: () =>
                    e("fidelite", (L) => ({
                      ...L,
                      paliers: [...(L.paliers || []), { at: (L.paliers?.length + 1) * 5 || 5, label: "" }],
                    })),
                },
                "Ajouter",
              ),
            ),
            !(O.paliers || []).length &&
              l.default.createElement(Vn, {
                t: "Aucune r\xE9compense",
                s: "Exemple : 5 points = une baguette offerte.",
              }),
            (O.paliers || []).map((L, z) =>
              l.default.createElement(
                "div",
                { className: "card", key: z },
                l.default.createElement(
                  "div",
                  { className: "row" },
                  l.default.createElement("input", {
                    className: "inp",
                    type: "number",
                    inputMode: "numeric",
                    style: { width: 66, textAlign: "center", fontWeight: 800, color: "var(--gold)" },
                    value: L.at,
                    onChange: (ne) =>
                      e("fidelite", (ge) => ({
                        ...ge,
                        paliers: ge.paliers.map((ve, Ae) =>
                          Ae === z ? { ...ve, at: +ne.target.value || 0 } : ve,
                        ),
                      })),
                  }),
                  l.default.createElement("input", {
                    className: "inp",
                    style: { flex: 1 },
                    placeholder: "R\xE9compense",
                    value: L.label,
                    onChange: (ne) =>
                      e("fidelite", (ge) => ({
                        ...ge,
                        paliers: ge.paliers.map((ve, Ae) =>
                          Ae === z ? { ...ve, label: ne.target.value } : ve,
                        ),
                      })),
                  }),
                  l.default.createElement(
                    "button",
                    {
                      className: "ib",
                      onClick: () =>
                        e("fidelite", (ne) => ({ ...ne, paliers: ne.paliers.filter((ge, ve) => ve !== z) })),
                    },
                    he.bin(),
                  ),
                ),
              ),
            ),
          ),
      ),
    o &&
      l.default.createElement(
        ut,
        { titre: "Encaisser un client", onClose: () => a(!1) },
        l.default.createElement(
          "div",
          {
            style: {
              border: "2px dashed var(--apple)",
              borderRadius: 14,
              padding: "26px 16px",
              textAlign: "center",
              background: "#fff",
              marginBottom: 14,
            },
          },
          he.qr(40, "#6E9B3A"),
          l.default.createElement(
            "div",
            { style: { fontSize: 12, color: "var(--ink3)", marginTop: 8 } },
            "Demandez au client d'afficher son QR code, puis saisissez son code.",
          ),
        ),
        l.default.createElement("label", { className: "lab" }, "Code client"),
        l.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          placeholder: "RAD-0000",
          value: u,
          onChange: (L) => d(L.target.value),
          style: {
            textAlign: "center",
            letterSpacing: 3,
            fontWeight: 800,
            fontSize: 19,
            textTransform: "uppercase",
          },
        }),
        l.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: $ },
          "Rechercher",
        ),
      ),
    G &&
      Y &&
      (() => {
        let L = t.clients.find((ne) => ne.id === G.id) || G,
          z = L.tampons || 0;
        return l.default.createElement(
          ut,
          { titre: L.nom, onClose: () => Z(null) },
          l.default.createElement(
            "div",
            { style: { textAlign: "center", marginBottom: 14 } },
            l.default.createElement("div", { style: { fontSize: 12, color: "var(--ink3)" } }, L.code),
            l.default.createElement(
              "div",
              { style: { fontSize: 40, fontWeight: 800, color: "var(--gold)", lineHeight: 1.1 } },
              z,
              " / ",
              Y.nb,
            ),
            l.default.createElement("div", { style: { fontSize: 11, color: "var(--ink3)" } }, "tampons"),
          ),
          z >= Y.nb
            ? l.default.createElement(
                "button",
                { className: "btn terra", disabled: b, onClick: () => fe(L, -z, "recompense") },
                "\u{1F381}\u{1F381} ",
                Y.recompense,
                " donn\xE9 : remettre \xE0 z\xE9ro",
              )
            : Y.palier && z >= Y.palier
              ? l.default.createElement(
                  "button",
                  { className: "btn terra", disabled: b, onClick: () => fe(L, -z, "recompense1") },
                  "\u{1F381} ",
                  Y.recompense1,
                  " donn\xE9 : remettre \xE0 z\xE9ro",
                )
              : null,
          l.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 10 } },
            l.default.createElement(
              "button",
              { className: "btn gh", disabled: b || z <= 0, onClick: () => fe(L, -1, "correction") },
              "\u2212 1 tampon",
            ),
          ),
          l.default.createElement(
            "div",
            { className: "de", style: { marginTop: 10 } },
            "Les tampons s'ajoutent uniquement avec la Caisse (scan ou recherche du nom). Ici, seulement pour corriger une erreur.",
          ),
          l.default.createElement(
            "button",
            {
              className: "btn gh",
              style: { marginTop: 12 },
              onClick: () => {
                (Z(null), w(L));
              },
            },
            "\u{1F4F1} R\xE9installer la carte sur un nouveau t\xE9l\xE9phone",
          ),
        );
      })(),
    E &&
      l.default.createElement(
        ut,
        { titre: E.nom, onClose: () => A(null) },
        l.default.createElement(
          "div",
          { style: { textAlign: "center", marginBottom: 14 } },
          l.default.createElement("div", { style: { fontSize: 12, color: "var(--ink3)" } }, E.code),
          l.default.createElement(
            "div",
            { style: { fontSize: 40, fontWeight: 800, color: "var(--gold)", lineHeight: 1.1 } },
            t.clients.find((L) => L.id === E.id)?.points || 0,
          ),
          l.default.createElement("div", { style: { fontSize: 11, color: "var(--ink3)" } }, "points"),
        ),
        F &&
          (() => {
            let L = _2(O, t.clients.find((z) => z.id === E.id)?.points || 0);
            return L.nb > 0
              ? l.default.createElement(
                  "button",
                  { className: "btn terra", style: { marginBottom: 12 }, disabled: b, onClick: P },
                  "\u{1F381} Appliquer ",
                  eo(L.euros),
                  " de remise (\u2212",
                  L.points,
                  " points)",
                  L.nb > 1 ? " \xB7 " + L.nb + " disponibles" : "",
                )
              : l.default.createElement(
                  "div",
                  { className: "de", style: { textAlign: "center", marginBottom: 12 } },
                  "Encore ",
                  L.manque,
                  " points pour ",
                  eo(L.euros),
                  " de remise",
                );
          })(),
        l.default.createElement(
          "div",
          { className: "de", style: { textAlign: "center", marginBottom: 2 } },
          "Saisissez les points \xE0 cr\xE9diter (un nombre n\xE9gatif en retire, par exemple pour corriger une erreur ou reprendre une carte papier).",
        ),
        l.default.createElement("label", { className: "lab" }, "Points"),
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, alignItems: "center" } },
          l.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { width: 46 },
              onClick: () => V(String((parseInt(M) || 0) - 1)),
            },
            "\u2212",
          ),
          l.default.createElement("input", {
            className: "inp",
            type: "number",
            inputMode: "numeric",
            value: M,
            onChange: (L) => V(L.target.value),
            style: { textAlign: "center", fontSize: 22, fontWeight: 800, color: "var(--apple)" },
          }),
          l.default.createElement(
            "button",
            { className: "btn sm", style: { width: 46 }, onClick: () => V(String((parseInt(M) || 0) + 1)) },
            "+",
          ),
        ),
        !!parseInt(M) &&
          l.default.createElement(
            "div",
            { className: "card", style: { textAlign: "center", marginTop: 12 } },
            l.default.createElement(
              "div",
              { style: { fontSize: 11, color: "var(--ink3)" } },
              "Nouveau total",
            ),
            l.default.createElement(
              "div",
              { style: { fontSize: 30, fontWeight: 800, color: "var(--apple)" } },
              Math.max(0, (t.clients.find((L) => L.id === E.id)?.points || 0) + parseInt(M)),
            ),
          ),
        l.default.createElement(
          "button",
          {
            className: "btn gh",
            style: { marginTop: 12 },
            onClick: () => {
              let L = t.clients.find((z) => z.id === E.id) || E;
              (A(null), w(L));
            },
          },
          "\u{1F4F1} R\xE9installer la carte sur un nouveau t\xE9l\xE9phone",
        ),
        l.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, disabled: !parseInt(M) || b, onClick: k },
          parseInt(M) < 0
            ? "Retirer " + -parseInt(M) + " points"
            : "Cr\xE9diter " + (parseInt(M) || "") + " points",
        ),
      ),
    h &&
      l.default.createElement(
        ut,
        { titre: h.id ? "Modifier le client" : "Nouveau client", onClose: () => p(null) },
        l.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, "Pr\xE9nom"),
            l.default.createElement("input", {
              className: "inp",
              autoFocus: !0,
              value: h.prenom ?? (h.nom || "").split(" ")[0],
              onChange: (L) => p({ ...h, prenom: L.target.value }),
            }),
          ),
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("label", { className: "lab" }, "Nom"),
            l.default.createElement("input", {
              className: "inp",
              value: h.nomFamille ?? (h.nom || "").split(" ").slice(1).join(" "),
              onChange: (L) => p({ ...h, nomFamille: L.target.value }),
            }),
          ),
        ),
        l.default.createElement("label", { className: "lab" }, "T\xE9l\xE9phone"),
        l.default.createElement("input", {
          className: "inp",
          type: "tel",
          value: h.tel,
          onChange: (L) => p({ ...h, tel: L.target.value }),
        }),
        l.default.createElement("label", { className: "lab" }, "E-mail"),
        l.default.createElement("input", {
          className: "inp",
          type: "email",
          autoCapitalize: "off",
          value: h.email || "",
          onChange: (L) => p({ ...h, email: L.target.value }),
        }),
        !Y &&
          l.default.createElement(
            l.default.Fragment,
            null,
            l.default.createElement("label", { className: "lab" }, "Points de d\xE9part"),
            l.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              value: h.points,
              onChange: (L) => p({ ...h, points: +L.target.value || 0 }),
            }),
          ),
        !h.id &&
          l.default.createElement(
            "label",
            {
              style: {
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                marginTop: 14,
                fontSize: 12.5,
                lineHeight: 1.45,
                cursor: "pointer",
              },
            },
            l.default.createElement("input", {
              type: "checkbox",
              checked: !!h.informe,
              onChange: (L) => p({ ...h, informe: L.target.checked }),
              style: { width: 20, height: 20, flexShrink: 0, accentColor: "#6E9B3A" },
            }),
            l.default.createElement(
              "span",
              null,
              "Le client a \xE9t\xE9 inform\xE9 que ses nom, t\xE9l\xE9phone et e-mail servent uniquement \xE0 sa carte de fid\xE9lit\xE9, et qu'il peut les faire supprimer \xE0 tout moment.",
            ),
          ),
        l.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: Q },
          "Enregistrer",
        ),
        h.id &&
          l.default.createElement(
            "button",
            {
              className: "btn gh",
              style: { marginTop: 8 },
              onClick: () => {
                let L = t.clients.find((z) => z.id === h.id) || h;
                (p(null), w(L));
              },
            },
            "\u{1F4F1} R\xE9installer la carte sur un nouveau t\xE9l\xE9phone",
          ),
      ),
    m && l.default.createElement(U7, { c: m, onClose: () => w(null) }),
  );
}
var V7 = (t) =>
    btoa(unescape(encodeURIComponent(t)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, ""),
  z7 = (t) =>
    location.origin +
    location.pathname.replace(/[^/]*$/, "") +
    "#transfert=ERT1." +
    V7(
      JSON.stringify({
        c: String(t.id),
        p: String(t.prenom || (t.nom || "").split(" ")[0] || "").slice(0, 30),
      }),
    );
function j7({ texte: t, taille: e = 240 }) {
  let n = (0, l.useMemo)(() => {
    let r = PC(0, "M");
    (r.addData(t), r.make());
    let i = r.getModuleCount(),
      s = "";
    for (let o = 0; o < i; o++)
      for (let a = 0; a < i; a++) r.isDark(o, a) && (s += "M" + a + " " + o + "h1v1h-1z");
    return { d: s, n: i };
  }, [t]);
  return l.default.createElement(
    "svg",
    {
      viewBox: "-2 -2 " + (n.n + 4) + " " + (n.n + 4),
      width: e,
      height: e,
      shapeRendering: "crispEdges",
      style: { display: "block", margin: "0 auto", background: "#fff" },
    },
    l.default.createElement("path", { d: n.d, fill: "#000" }),
  );
}
function U7({ c: t, onClose: e }) {
  let n = t.prenom || (t.nom || "").split(" ")[0] || "ce client";
  return l.default.createElement(
    ut,
    { titre: "Carte de " + n, onClose: e },
    l.default.createElement(
      "div",
      { className: "de", style: { fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, marginBottom: 12 } },
      "Le client ouvre l'",
      l.default.createElement("b", null, "appareil photo"),
      " de son nouveau t\xE9l\xE9phone et scanne ce code : l'application s'ouvre et r\xE9cup\xE8re sa carte (m\xEAme code ",
      t.code,
      ", m\xEAmes tampons, m\xEAme historique). Il touche ensuite \xAB R\xE9cup\xE9rer \xBB.",
    ),
    l.default.createElement(j7, { texte: z7(t) }),
    l.default.createElement(
      "div",
      {
        style: {
          marginTop: 12,
          padding: "10px 12px",
          borderRadius: 10,
          background: "#FFF4E5",
          color: "#8A4B00",
          fontSize: 12.5,
          lineHeight: 1.45,
        },
      },
      "\u{1F512} Ce code ouvre la carte de ",
      n,
      " (nom, t\xE9l\xE9phone, e-mail) : montrez-le uniquement \xE0 cette personne, au comptoir. Ne le photographiez pas et ne l'envoyez \xE0 personne.",
    ),
    l.default.createElement(
      "div",
      { className: "de", style: { marginTop: 8 } },
      "Si l'ancien t\xE9l\xE9phone a \xE9t\xE9 vol\xE9, l'ancien t\xE9l\xE9phone garde aussi l'acc\xE8s \xE0 la carte : dans ce cas, mieux vaut cr\xE9er une nouvelle carte et y reporter les tampons.",
    ),
    l.default.createElement(
      "button",
      { className: "btn", style: { marginTop: 12 }, onClick: e },
      "Termin\xE9",
    ),
  );
}
var lN = (t) => t.derniere || t.depuis || "";
function q7({ d: t, set: e }) {
  let n = t.legal?.conservation || 3,
    r = new Date();
  r.setFullYear(r.getFullYear() - n);
  let i = r.toLocaleDateString("sv-SE"),
    s = t.clients.filter((o) => lN(o) && lN(o) < i);
  return l.default.createElement(
    "div",
    { className: "card", style: { background: "#F6F9EF", borderColor: "#D9E6C2" } },
    l.default.createElement("div", { className: "nm" }, "Dur\xE9e de conservation (RGPD)"),
    l.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 10 } },
      "Les cartes sans aucun passage en caisse depuis ",
      n,
      " ans doivent \xEAtre supprim\xE9es.",
    ),
    l.default.createElement(
      "div",
      { style: { display: "flex", gap: 10, alignItems: "center" } },
      l.default.createElement("label", { className: "lab", style: { margin: 0 } }, "Conserver"),
      l.default.createElement(
        "select",
        {
          className: "inp",
          style: { width: "auto" },
          value: n,
          onChange: (o) => e("legal", (a) => ({ ...a, conservation: +o.target.value })),
        },
        [1, 2, 3].map((o) =>
          l.default.createElement("option", { key: o, value: o }, o, " an", o > 1 ? "s" : ""),
        ),
      ),
      l.default.createElement(
        "span",
        { style: { fontSize: 12, color: "var(--ink3)" } },
        "apr\xE8s le dernier passage",
      ),
    ),
    l.default.createElement(
      "div",
      { style: { marginTop: 12, fontSize: 13, fontWeight: 700 } },
      s.length
        ? s.length +
            " carte" +
            (s.length > 1 ? "s" : "") +
            " inactive" +
            (s.length > 1 ? "s" : "") +
            " \xE0 supprimer"
        : "Aucune carte \xE0 supprimer \u2713",
    ),
    !!s.length &&
      l.default.createElement(
        "button",
        {
          className: "btn sm",
          style: { marginTop: 8, background: "var(--red)" },
          onClick: async () =>
            (await De(
              "Supprimer " +
                s.length +
                ` carte(s) inactive(s) et leur historique ?

` +
                s.slice(0, 8).map((o) => "\u2022 " + o.nom).join(`
`) +
                (s.length > 8
                  ? `
\u2026`
                  : ""),
            )) && e("clients", (o) => o.filter((a) => !s.some((u) => u.id === a.id))),
        },
        "Supprimer les cartes inactives",
      ),
  );
}
function W7({ d: t, set: e }) {
  let n = Object.fromEntries(
      Object.entries({ ...Ma.legal, ...(t.legal || {}) }).map(([s, o]) => [
        s,
        o === "" || o == null ? Ma.legal[s] : o,
      ]),
    ),
    r = (s, o) => e("legal", (a) => ({ ...Ma.legal, ...(a || {}), [s]: o })),
    i = (s, o, a) =>
      l.default.createElement(
        l.default.Fragment,
        null,
        l.default.createElement("label", { className: "lab" }, o),
        l.default.createElement("input", {
          className: "inp",
          value: n[s] || "",
          placeholder: a,
          onChange: (u) => r(s, u.target.value),
        }),
      );
  return l.default.createElement(
    l.default.Fragment,
    null,
    l.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 4px" } },
      "Informations l\xE9gales",
    ),
    l.default.createElement(
      "div",
      { className: "sub", style: { margin: "0 0 8px" } },
      "Affich\xE9es dans \xAB Mentions l\xE9gales \xBB et \xAB Confidentialit\xE9 \xBB de l'application (onglet Infos).",
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      i("raison", "Raison sociale", "LTMP"),
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: "0 10px", flexWrap: "wrap" } },
        l.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("forme", "Forme juridique", "SARL"),
        ),
        l.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("capital", "Capital social (\u20AC)", "3 000"),
        ),
      ),
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: "0 10px", flexWrap: "wrap" } },
        l.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("siren", "SIREN", "979 301 132"),
        ),
        l.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("rcs", "RCS", "RCS Vesoul"),
        ),
      ),
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: "0 10px", flexWrap: "wrap" } },
        l.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("tva", "N\xB0 TVA intracommunautaire", "FR00979301132"),
        ),
        l.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("naf", "Activit\xE9 (code NAF)", "47.11B"),
        ),
      ),
      i("responsable", "Responsable / directrice de publication", "Marion Parnaso"),
      i("emailDonnees", "E-mail pour les demandes RGPD", t.store.email),
      i("hebergementDonnees", "Lieu d'h\xE9bergement des donn\xE9es", "Union europ\xE9enne"),
      l.default.createElement(
        "div",
        { className: "de", style: { marginTop: 6 } },
        "Pr\xE9-rempli avec les donn\xE9es officielles de la soci\xE9t\xE9 (registre du commerce). V\xE9rifiez et corrigez si besoin.",
      ),
    ),
  );
}
var Mf = "epicerie-raddonnaise-admin-appareil",
  Ew = () => {
    try {
      return JSON.parse(localStorage.getItem(Mf) || "null");
    } catch {
      return null;
    }
  },
  bN = () =>
    /iPhone|iPad|iPod/.test(navigator.userAgent) &&
    !navigator.standalone &&
    !window.matchMedia("(display-mode: standalone)").matches;
async function uN(t) {
  let n =
    Ew()?.id ||
    [...crypto.getRandomValues(new Uint32Array(24))]
      .map((i) => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"[i % 56])
      .join("");
  await ln(xe(de, "appareilsAdmin", n), { token: t, appareil: rf(), maj: Date.now() });
  let r = { id: n, token: t };
  try {
    localStorage.setItem(Mf, JSON.stringify(r));
  } catch {}
  return r;
}
var cN = "epicerie-raddonnaise-admin-notif-plus-tard";
function $7({ d: t }) {
  let e = t.push?.vapid || "",
    n = Er(t.cmd).script,
    [r, i] = (0, l.useState)(!1),
    [s, o] = (0, l.useState)(!1);
  return (
    (0, l.useEffect)(() => {
      let u = !1;
      return (
        (async () => {
          if (!(!e || !ac(n) || bN() || !(await lf()))) {
            if (Notification.permission === "granted")
              try {
                let d = await Yu(e),
                  h = Ew();
                !u && d.token && (!h?.id || d.token !== h.token) && (await uN(d.token));
              } catch {}
            else if (Notification.permission === "default") {
              let d = !1;
              try {
                d = Date.now() - Number(localStorage.getItem(cN) || 0) < 3 * 864e5;
              } catch {}
              !u && !d && i(!0);
            }
          }
        })(),
        () => {
          u = !0;
        }
      );
    }, [e, n]),
    r
      ? l.default.createElement(
          "div",
          {
            className: "card",
            style: {
              margin: "12px 14px 0",
              border: "2px solid var(--apple)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            },
          },
          l.default.createElement("div", { style: { fontSize: 28 } }, "\u{1F514}"),
          l.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            l.default.createElement("div", { className: "nm" }, "\xCAtre pr\xE9venue sur ce t\xE9l\xE9phone"),
            l.default.createElement(
              "div",
              { className: "de" },
              "Commandes, r\xE9servations et messages des clients.",
            ),
          ),
          l.default.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 6 } },
            l.default.createElement(
              "button",
              {
                className: "btn sm",
                style: { width: "auto" },
                disabled: s,
                onClick: async () => {
                  o(!0);
                  try {
                    let u = await Yu(e);
                    u.token && (await uN(u.token));
                  } catch {}
                  (o(!1), i(!1));
                },
              },
              "Activer",
            ),
            l.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { width: "auto" },
                onClick: () => {
                  try {
                    localStorage.setItem(cN, String(Date.now()));
                  } catch {}
                  i(!1);
                },
              },
              "Plus tard",
            ),
          ),
        )
      : null
  );
}
function G7({ d: t }) {
  let e = t.push?.vapid || "",
    n = Er(t.cmd).script,
    [r, i] = (0, l.useState)(Ew),
    [s, o] = (0, l.useState)("\u2026"),
    [a, u] = (0, l.useState)(""),
    d = async (E) => {
      let A =
        r?.id ||
        [...crypto.getRandomValues(new Uint32Array(24))]
          .map((_) => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"[_ % 56])
          .join("");
      await ln(xe(de, "appareilsAdmin", A), { token: E, appareil: rf(), maj: Date.now() });
      let S = { id: A, token: E };
      try {
        localStorage.setItem(Mf, JSON.stringify(S));
      } catch {}
      return (i(S), S);
    };
  (0, l.useEffect)(() => {
    let E = !1;
    return (
      (async () => {
        if (!e || !ac(n)) return o("indispo");
        if (bN()) return o("ios");
        if (!(await lf())) return o("nonsup");
        if (Notification.permission === "denied") return o("refus");
        if (Notification.permission === "granted") {
          o("on");
          try {
            let A = await Yu(e);
            !E && A.token && (!r?.id || A.token !== r.token) && (await d(A.token));
          } catch {}
        } else o("off");
      })(),
      () => {
        E = !0;
      }
    );
  }, [e, n]);
  let h = async () => {
      (o("\u2026"), u(""));
      try {
        let E = await Yu(e);
        if (E.erreur) return o(E.erreur === "refus" ? "refus" : "nonsup");
        (await d(E.token), o("on"));
      } catch {
        (o("off"), ft("Activation impossible pour le moment. R\xE9essayez plus tard."));
      }
    },
    p = async () => {
      if (await De("Ne plus recevoir les notifications sur ce t\xE9l\xE9phone ?", { oui: "Couper" })) {
        try {
          r?.id && (await Cy(xe(de, "appareilsAdmin", r.id)));
        } catch {}
        try {
          localStorage.removeItem(Mf);
        } catch {}
        (i(null), o("off"));
      }
    },
    m = async () => {
      try {
        await fetch(n + "?essaiMarion=1", { method: "GET", mode: "no-cors", redirect: "follow" });
      } catch {}
      u(
        "Notification d'essai envoy\xE9e : elle doit arriver dans quelques secondes (5 essais par jour au plus).",
      );
    },
    w = {
      "\u2026": "V\xE9rification\u2026",
      indispo: "Les notifications ne sont pas encore r\xE9gl\xE9es (r\xE9glage technique d'Eric).",
      ios: "Sur iPhone, ajoutez d'abord l'admin \xE0 l'\xE9cran d'accueil : bouton Partager \u2B06\uFE0F \u2192 \xAB Sur l'\xE9cran d'accueil \xBB. Ouvrez-la ensuite depuis l'ic\xF4ne et revenez ici.",
      nonsup: "Ce navigateur ne peut pas recevoir de notifications.",
      refus:
        "Les notifications sont bloqu\xE9es pour l'admin sur ce t\xE9l\xE9phone. Autorisez-les dans les r\xE9glages du t\xE9l\xE9phone (Notifications \u2192 Admin), puis revenez ici.",
      off: "Recevez une notification sur ce t\xE9l\xE9phone \xE0 chaque nouvelle commande, r\xE9servation ou message d'un client, m\xEAme quand l'admin est ferm\xE9e.",
      on: "\u2713 Activ\xE9es sur ce t\xE9l\xE9phone : vous \xEAtes pr\xE9venue des nouvelles commandes, r\xE9servations et messages.",
    }[s];
  return l.default.createElement(
    "div",
    { className: "card" },
    l.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 4 } },
      "\u{1F514} \xCAtre pr\xE9venue sur ce t\xE9l\xE9phone",
    ),
    l.default.createElement("div", { className: "de", style: { marginBottom: 10 } }, w),
    s === "off" &&
      l.default.createElement("button", { className: "btn", onClick: h }, "Activer les notifications"),
    s === "on" &&
      l.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
        l.default.createElement(
          "button",
          { className: "btn gh sm", style: { width: "auto" }, onClick: m },
          "Envoyer un essai",
        ),
        l.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { width: "auto", marginLeft: "auto", color: "var(--red)", borderColor: "#EBC9C2" },
            onClick: p,
          },
          "Couper",
        ),
      ),
    a && l.default.createElement("div", { className: "de", style: { marginTop: 8, fontWeight: 700 } }, a),
    l.default.createElement(
      "div",
      { className: "de", style: { marginTop: 8, fontSize: 12 } },
      "\xC0 activer sur chaque t\xE9l\xE9phone ou tablette o\xF9 vous voulez \xEAtre pr\xE9venue.",
    ),
  );
}
function H7({ d: t, set: e, reinitialiser: n }) {
  let [r, i] = (0, l.useState)(null),
    s = t.store,
    o = (h, p) => e("store", (m) => ({ ...m, [h]: p })),
    [a, u] = (0, l.useState)(null),
    d = async () => {
      u("prep");
      try {
        let h = [];
        for (let w of t.clients || []) {
          let E = await Oi(Ge(de, "clients", String(w.id), "historique")),
            A = [];
          (E.forEach((S) => A.push({ id: S.id, ...S.data() })), h.push({ ...w, historique: A }));
        }
        let p = { ...t, clients: h, sauvegardeLe: new Date().toISOString(), version: yr },
          m = URL.createObjectURL(new Blob([JSON.stringify(p, null, 2)], { type: "application/json" }));
        u({
          url: m,
          nom: "epicerie-raddonnaise-sauvegarde-" + new Date().toLocaleDateString("sv-SE") + ".json",
          n: h.length,
        });
      } catch {
        u({ erreur: !0 });
      }
    };
  return l.default.createElement(
    "div",
    { className: "wrap" },
    l.default.createElement("div", { className: "t1" }, "L'\xE9picerie"),
    l.default.createElement(
      "div",
      { className: "sub" },
      "Coordonn\xE9es, horaires et services affich\xE9s dans l'onglet Infos (les services n'apparaissent plus sur l'accueil).",
    ),
    l.default.createElement(G7, { d: t }),
    l.default.createElement(
      "div",
      { className: "card" },
      l.default.createElement("label", { className: "lab" }, "Nom"),
      l.default.createElement("input", {
        className: "inp",
        value: s.name,
        onChange: (h) => o("name", h.target.value),
      }),
      l.default.createElement("label", { className: "lab" }, "Slogan"),
      l.default.createElement("input", {
        className: "inp",
        value: s.slogan,
        onChange: (h) => o("slogan", h.target.value),
      }),
      l.default.createElement("label", { className: "lab" }, "Adresse"),
      l.default.createElement("input", {
        className: "inp",
        value: s.address,
        onChange: (h) => o("address", h.target.value),
      }),
      l.default.createElement("label", { className: "lab" }, "T\xE9l\xE9phone"),
      l.default.createElement("input", {
        className: "inp",
        type: "tel",
        value: s.phone,
        onChange: (h) => o("phone", h.target.value),
      }),
      l.default.createElement("label", { className: "lab" }, "E-mail"),
      l.default.createElement("input", {
        className: "inp",
        type: "email",
        value: s.email,
        onChange: (h) => o("email", h.target.value),
      }),
      l.default.createElement("label", { className: "lab" }, "Page Facebook"),
      l.default.createElement("input", {
        className: "inp",
        value: s.facebook,
        placeholder: "https://facebook.com/\u2026",
        onChange: (h) => o("facebook", h.target.value),
      }),
      l.default.createElement("label", { className: "lab" }, "Lien pour laisser un avis Google"),
      l.default.createElement("input", {
        className: "inp",
        value: s.avis || "",
        placeholder: "https://g.page/r/\u2026/review",
        autoCapitalize: "off",
        onChange: (h) => o("avis", h.target.value.trim()),
      }),
      l.default.createElement(
        "div",
        { className: "de", style: { marginTop: 4 } },
        "Dans Google (fiche de l'\xE9picerie) \u2192 \xAB Demander des avis \xBB \u2192 copier le lien. Les clients le voient dans Infos, et une fois apr\xE8s une commande retir\xE9e.",
      ),
    ),
    l.default.createElement(s7, { d: t, set: e }),
    l.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 8px" } },
      "Onglets visibles par les clients",
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      [
        ["carte", "La carte (plateaux & paniers)"],
        ["fidelite", "Carte de fid\xE9lit\xE9"],
      ].map(([h, p]) =>
        l.default.createElement(
          "div",
          { className: "tog", key: h },
          l.default.createElement("span", { style: { fontSize: 13, fontWeight: 700 } }, p),
          l.default.createElement(
            "div",
            { className: "rt" },
            l.default.createElement(ze, {
              on: t.onglets?.[h] !== !1,
              set: () => e("onglets", (m) => ({ ...m, [h]: m?.[h] === !1 })),
            }),
          ),
        ),
      ),
    ),
    l.default.createElement(W7, { d: t, set: e }),
    l.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "16px 0 8px" } },
      "Horaires",
    ),
    l.default.createElement(
      "div",
      { className: "card" },
      t.hours.map((h, p) =>
        l.default.createElement(
          "div",
          {
            key: p,
            className: "hor-ligne",
            style: { borderBottom: p < 6 ? "1px solid var(--line)" : "none" },
          },
          l.default.createElement("span", { style: { fontSize: 12.5, fontWeight: 700 } }, h.day),
          l.default.createElement("input", {
            className: "inp",
            style: { padding: "8px 6px", fontSize: 12.5 },
            value: h.am,
            placeholder: "Ferm\xE9",
            "aria-label": h.day + " matin",
            onChange: (m) => e("hours", (w) => w.map((E, A) => (A === p ? { ...E, am: m.target.value } : E))),
          }),
          l.default.createElement("input", {
            className: "inp",
            style: { padding: "8px 6px", fontSize: 12.5 },
            value: h.pm,
            placeholder: "\u2014",
            "aria-label": h.day + " apr\xE8s-midi",
            onChange: (m) => e("hours", (w) => w.map((E, A) => (A === p ? { ...E, pm: m.target.value } : E))),
          }),
        ),
      ),
    ),
    l.default.createElement(
      "div",
      { className: "hd", style: { marginTop: 18 } },
      l.default.createElement("div", { style: { fontWeight: 800, fontSize: 14 } }, "Services"),
      l.default.createElement(
        "button",
        { className: "btn gh sm", onClick: () => i({ label: "", desc: "", active: !0 }) },
        "Ajouter",
      ),
    ),
    !t.services.length &&
      l.default.createElement(Vn, {
        t: "Aucun service",
        s: "Ex : D\xE9p\xF4t de pain, Relais Pickup, Station-service, Plats \xE0 emporter, Droguerie.",
      }),
    l.default.createElement(
      "div",
      { className: "grille" },
      t.services.map((h) =>
        l.default.createElement(
          "div",
          { className: "card", key: h.id },
          l.default.createElement(
            "div",
            { className: "row" },
            l.default.createElement(
              "div",
              null,
              l.default.createElement("div", { className: "nm" }, h.label),
              h.desc && l.default.createElement("div", { className: "de" }, h.desc),
            ),
            l.default.createElement(
              "div",
              { className: "rt" },
              l.default.createElement(ze, {
                on: h.active !== !1,
                set: () =>
                  e("services", (p) => p.map((m) => (m.id === h.id ? { ...m, active: m.active === !1 } : m))),
              }),
              l.default.createElement("button", { className: "ib", onClick: () => i(h) }, he.pen()),
              l.default.createElement(
                "button",
                { className: "ib", onClick: () => e("services", (p) => p.filter((m) => m.id !== h.id)) },
                he.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    l.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 8px" } },
      "Application",
    ),
    l.default.createElement(Xk, null),
    l.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 8px" } },
      "Sauvegarde",
    ),
    l.default.createElement(
      "div",
      {
        style: {
          fontSize: 11.5,
          color: "#9A5A28",
          background: "#FDF6EE",
          border: "1px solid #EFDCC6",
          borderRadius: 10,
          padding: "9px 12px",
          lineHeight: 1.45,
          marginBottom: 8,
        },
      },
      "La sauvegarde contient les noms et t\xE9l\xE9phones des clients : conservez-la en lieu s\xFBr, ne l'envoyez pas par e-mail.",
    ),
    !a || a.erreur
      ? l.default.createElement(
          l.default.Fragment,
          null,
          l.default.createElement(
            "button",
            { className: "btn gh", onClick: d },
            "Pr\xE9parer une sauvegarde",
          ),
          a?.erreur &&
            l.default.createElement(
              "div",
              { className: "de", style: { color: "#B3261E", marginTop: 6 } },
              "La sauvegarde n'a pas pu \xEAtre pr\xE9par\xE9e (r\xE9seau ?). R\xE9essayez.",
            ),
        )
      : a === "prep"
        ? l.default.createElement(
            "button",
            { className: "btn gh", disabled: !0 },
            "Pr\xE9paration de la sauvegarde\u2026",
          )
        : l.default.createElement(
            l.default.Fragment,
            null,
            l.default.createElement(
              "a",
              {
                className: "btn",
                href: a.url,
                download: a.nom,
                style: { textDecoration: "none", textAlign: "center", display: "block" },
              },
              "T\xE9l\xE9charger la sauvegarde",
            ),
            l.default.createElement(
              "div",
              { className: "de", style: { marginTop: 6 } },
              a.n,
              " carte",
              a.n > 1 ? "s" : "",
              " avec leur historique de tampons, commandes, r\xE9glages et contenus.",
            ),
          ),
    l.default.createElement(
      "button",
      {
        className: "btn gh",
        style: { marginTop: 8, color: "var(--red)" },
        onClick: async () =>
          (await De(`Effacer tout le contenu affich\xE9 aux clients (articles du jour, offres, actualit\xE9s, plateaux, pubs, coordonn\xE9es et horaires) ?

Les cartes de fid\xE9lit\xE9, les commandes, les messages et les r\xE9glages techniques sont conserv\xE9s.`)) &&
          n(),
      },
      "R\xE9initialiser le contenu",
    ),
    r &&
      l.default.createElement(
        ut,
        { titre: r.id ? "Modifier le service" : "Nouveau service", onClose: () => i(null) },
        l.default.createElement("label", { className: "lab" }, "Nom"),
        l.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: r.label,
          onChange: (h) => i({ ...r, label: h.target.value }),
          placeholder: "Relais Pickup",
        }),
        l.default.createElement("label", { className: "lab" }, "Pr\xE9cision (facultatif)"),
        l.default.createElement("input", {
          className: "inp",
          value: r.desc,
          onChange: (h) => i({ ...r, desc: h.target.value }),
          placeholder: "Retrait et d\xE9p\xF4t de colis",
        }),
        l.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 14 },
            onClick: () => {
              r.label.trim() &&
                (e("services", (h) =>
                  r.id ? h.map((p) => (p.id === r.id ? r : p)) : [...h, { ...r, id: Wr() }],
                ),
                i(null));
            },
          },
          "Enregistrer",
        ),
      ),
  );
}
var dN = (t) =>
  ({
    "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
    "auth/wrong-password": "E-mail ou mot de passe incorrect.",
    "auth/user-not-found": "E-mail ou mot de passe incorrect.",
    "auth/invalid-email": "Adresse e-mail invalide.",
    "auth/too-many-requests": "Trop de tentatives. Patientez quelques minutes.",
    "auth/network-request-failed": "Pas de connexion internet.",
  })[t?.code] || "Connexion impossible. R\xE9essayez.";
function K7() {
  let [t, e] = (0, l.useState)(""),
    [n, r] = (0, l.useState)(""),
    [i, s] = (0, l.useState)(""),
    [o, a] = (0, l.useState)(""),
    [u, d] = (0, l.useState)(!1),
    h = async () => {
      if (!(!t.trim() || !n || u)) {
        (s(""), a(""), d(!0));
        try {
          await Xp(Gu, t.trim(), n);
        } catch (m) {
          (s(dN(m)), d(!1));
        }
      }
    },
    p = async () => {
      if ((s(""), a(""), !t.trim())) return s("Saisissez d'abord votre adresse e-mail.");
      try {
        (await Jp(Gu, t.trim()),
          a("Si ce compte existe, un e-mail de r\xE9initialisation vient d'\xEAtre envoy\xE9."));
      } catch (m) {
        s(dN(m));
      }
    };
  return l.default.createElement(
    "div",
    { className: "adm" },
    l.default.createElement("style", null, ww),
    l.default.createElement(
      "div",
      { className: "wrap", style: { paddingTop: 48 } },
      l.default.createElement(
        "div",
        { style: { textAlign: "center", marginBottom: 26 } },
        l.default.createElement("img", {
          src: yw,
          alt: "",
          style: { width: 92, height: 92, borderRadius: "50%", border: "3px solid #EEF3E2" },
        }),
        l.default.createElement("div", { className: "t1", style: { marginTop: 12 } }, "Administration"),
        l.default.createElement(
          "div",
          { style: { fontSize: 12.5, color: "var(--ink3)", marginTop: 6 } },
          "\xC9picerie Raddonnaise \u2014 acc\xE8s r\xE9serv\xE9 \xB7 v",
          yr,
        ),
      ),
      l.default.createElement("label", { className: "lab" }, "E-mail"),
      l.default.createElement("input", {
        className: "inp",
        type: "email",
        autoComplete: "username",
        value: t,
        onChange: (m) => e(m.target.value),
      }),
      l.default.createElement("label", { className: "lab" }, "Mot de passe"),
      l.default.createElement("input", {
        className: "inp",
        type: "password",
        autoComplete: "current-password",
        value: n,
        onChange: (m) => r(m.target.value),
        onKeyDown: (m) => m.key === "Enter" && h(),
      }),
      i &&
        l.default.createElement(
          "div",
          { style: { color: "var(--red)", fontSize: 12.5, fontWeight: 700, marginTop: 10 } },
          i,
        ),
      o &&
        l.default.createElement(
          "div",
          { style: { color: "var(--apple)", fontSize: 12.5, fontWeight: 700, marginTop: 10 } },
          o,
        ),
      l.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 16 }, disabled: u || !t.trim() || !n, onClick: h },
        u ? "Connexion\u2026" : "Se connecter",
      ),
      l.default.createElement(
        "button",
        { className: "btn gh", style: { marginTop: 8 }, onClick: p },
        "Mot de passe oubli\xE9",
      ),
    ),
  );
}
var gw = ({ t }) =>
  l.default.createElement(
    "div",
    { className: "adm" },
    l.default.createElement("style", null, ww),
    l.default.createElement(
      "div",
      {
        style: {
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--ink3)",
          fontSize: 13,
          fontWeight: 700,
        },
      },
      t,
    ),
  );
function Q7() {
  let [t, e] = (0, l.useState)(void 0);
  ((0, l.useEffect)(() => Zp(Gu, (A) => e(A || null)), []),
    (0, l.useEffect)(() => {
      t && ck("admin");
    }, [!!t]));
  let n = Yk(),
    [r, i, s, o] = W9(!!t),
    [a, u] = (0, l.useState)("accueil"),
    [d, h] = (0, l.useState)(!1);
  (0, l.useEffect)(() => {
    (o.serveur &&
      t &&
      !r.fidelite?.migreRemise &&
      i("fidelite", (A) => ({
        ...A,
        parEuro: 1,
        remise: { ...Na },
        sousTitre: "1 \u20AC d\xE9pens\xE9 = 1 point \xB7 200 points = 5 \u20AC de remise",
        migreRemise: !0,
      })),
      o.serveur &&
        t &&
        !r.fidelite?.migreBientot &&
        i("fidelite", (A) => ({ ...A, active: !1, migreBientot: !0 })),
      o.serveur &&
        t &&
        r.fidelite?.migreTampons20 &&
        !r.fidelite?.migreChouette &&
        i("fidelite", (A) => ({
          ...A,
          tampons: {
            ...(A.tampons || {}),
            recompense:
              !A.tampons?.recompense || A.tampons.recompense === "un gros cadeau surprise"
                ? "un chouette cadeau surprise"
                : A.tampons.recompense,
          },
          migreChouette: !0,
        })),
      o.serveur &&
        t &&
        r.fidelite?.migreTampons20 &&
        !r.fidelite?.migreExclus &&
        i("fidelite", (A) => ({
          ...A,
          tampons: {
            ...(A.tampons || {}),
            exclus:
              !A.tampons?.exclus || A.tampons.exclus === "carburant, gaz, alcools, tabac, presse, jeux"
                ? "carburant, gaz et alcool"
                : A.tampons.exclus,
          },
          migreExclus: !0,
        })),
      o.serveur && t && r.themes?.mode === "force" && i("themes", (A) => ({ ...(A || {}), mode: "auto" })),
      o.serveur &&
        t &&
        !r.themes?.migreAuto &&
        i("themes", (A) => ({ ...(A || {}), mode: "auto", force: "", migreAuto: !0 })),
      o.serveur &&
        t &&
        !r.fidelite?.migreTampons20 &&
        i("fidelite", (A) => ({
          ...A,
          mode: "tampons",
          tampons: {
            ...it,
            ...(A.tampons || {}),
            nb: 20,
            palier: 10,
            recompense1: it.recompense1,
            recompense: it.recompense,
            exclus: it.exclus,
          },
          migreTampons20: !0,
          migreChouette: !0,
          migreExclus: !0,
        })));
  }, [o.pret, !!t]);
  let p = (0, l.useRef)(new Set());
  (0, l.useEffect)(() => {
    !t ||
      !o.pret ||
      (r.clients || []).forEach((A) => {
        !/^RAD-[A-Z0-9]{5}$/.test(A.code || "") ||
          p.current.has(A.code) ||
          (p.current.add(A.code),
          ln(xe(de, "codes", A.code), { c: String(A.id) }).catch(() => p.current.delete(A.code)));
      });
  }, [!!t, o.pret, (r.clients || []).length]);
  let m = (0, l.useRef)(!1);
  (0, l.useEffect)(() => {
    if (!t || !o.serveur || !o.pret || m.current) return;
    let A = (r.clients || []).filter((S) => j9(S.id));
    A.length &&
      ((m.current = !0),
      (async () => {
        for (let S of A)
          try {
            let _ = z9(),
              I = String(S.id),
              T = await ky(xe(de, "clients", I));
            if (!T.exists()) continue;
            let M = await Oi(Ge(de, "clients", I, "historique")),
              V = [];
            (M.forEach((O) => V.push(O)), await ln(xe(de, "clients", _), T.data()));
            for (let O = 0; O < V.length; O += 400) {
              let b = _n(de);
              (V.slice(O, O + 400).forEach((v) => b.set(xe(de, "clients", _, "historique", v.id), v.data())),
                await b.commit());
            }
            (T.data().code && (await ln(xe(de, "codes", T.data().code), { c: _ })),
              await Pf([...V.map((O) => O.ref), xe(de, "clients", I)]));
          } catch (_) {
            console.error("migration carte", S.id, _);
          }
      })());
  }, [!!t, o.serveur, o.pret, (r.clients || []).length]);
  let w =
    t && o.pret
      ? (r.conversations || []).filter((A) => A.attente).length +
        (r.commandes || []).filter((A) => A.statut === "nouvelle").length
      : 0;
  if (
    ((0, l.useEffect)(() => {
      document.title = (w ? "(" + w + ") " : "") + "Administration \u2014 \xC9picerie Raddonnaise";
      try {
        w && navigator.setAppBadge
          ? navigator.setAppBadge(w).catch(() => {})
          : navigator.clearAppBadge && navigator.clearAppBadge().catch(() => {});
      } catch {}
    }, [w]),
    t === void 0)
  )
    return l.default.createElement(gw, { t: "Chargement\u2026" });
  if (!t) return l.default.createElement(K7, null);
  if (o.erreur === "permission-denied")
    return l.default.createElement(gw, {
      t: "Acc\xE8s refus\xE9 : ce compte n'a pas les droits d'administration.",
    });
  if (!o.pret) return l.default.createElement(gw, { t: "Synchronisation\u2026" });
  let E = [
    { id: "accueil", label: "Accueil", ic: he.home },
    {
      id: "jour",
      label: "Aujourd'hui",
      ic: he.shop,
      n: r.resas.filter((A) => A.statut === "reservee").length,
    },
    {
      id: "commandes",
      label: "Commandes",
      ic: he.cmd,
      n: r.commandes.filter((A) => A.statut === "nouvelle").length,
    },
    { id: "messages", label: "Messages", ic: he.bulle, n: r.conversations.filter((A) => A.attente).length },
    { id: "offres", label: "Offres", ic: he.basket, g: "Ma vitrine" },
    { id: "actus", label: "Actus", ic: he.news, g: "Ma vitrine" },
    { id: "pubs", label: "Pubs", ic: he.img, g: "Ma vitrine" },
    { id: "menu", label: "Menu semaine", ic: he.cmd, g: "Ma vitrine" },
    { id: "themes", label: "Th\xE8mes", ic: he.sapin, g: "Ma vitrine" },
    { id: "producteurs", label: "Producteurs", ic: he.ferme, g: "Ma vitrine" },
    { id: "recettes", label: "Recettes", ic: he.news, g: "Ma vitrine" },
    { id: "com", label: "Communication", ic: he.porteVoix, g: "Mes clients" },
    { id: "fidelite", label: "Fid\xE9lit\xE9", ic: he.star, g: "Mes clients" },
    { id: "roue", label: "Roue de No\xEBl", ic: he.sapin, g: "Mes clients" },
    { id: "sondage", label: "Sondages", ic: he.bulle, g: "Mes clients" },
    { id: "stats", label: "Statistiques", ic: he.graph, g: "Suivi" },
    { id: "reglages", label: "R\xE9glages", ic: he.gear, g: "Suivi" },
  ];
  return l.default.createElement(
    "div",
    { className: "adm main" },
    l.default.createElement("style", null, ww),
    l.default.createElement(
      "header",
      { className: "top" },
      l.default.createElement("img", { src: yw, alt: "" }),
      l.default.createElement(
        "div",
        null,
        l.default.createElement("h1", null, "Administration"),
        l.default.createElement(
          "small",
          null,
          "\xC9picerie Raddonnaise ",
          l.default.createElement("span", { className: "vers" }, "v", yr),
        ),
      ),
      l.default.createElement(
        "button",
        {
          onClick: async () => (await De("Se d\xE9connecter ?")) && Rp(Gu),
          style: {
            marginLeft: "auto",
            background: "rgba(255,255,255,.14)",
            border: "none",
            color: "#fff",
            fontFamily: "var(--body)",
            fontSize: 10.5,
            fontWeight: 800,
            padding: "6px 11px",
            borderRadius: 20,
            cursor: "pointer",
          },
        },
        "D\xE9connexion",
      ),
    ),
    l.default.createElement($7, { d: r }),
    l.default.createElement(
      vw,
      { key: a },
      a === "accueil" &&
        l.default.createElement(H9, {
          d: r,
          set: i,
          aller: (A) => {
            (u(A), window.scrollTo(0, 0));
          },
        }),
      a === "stats" && l.default.createElement(K9, { d: r }),
      a === "com" && l.default.createElement(Y9, { d: r, set: i }),
      a === "jour" && l.default.createElement(o7, { d: r, set: i }),
      a === "commandes" && l.default.createElement(d7, { d: r, set: i }),
      a === "messages" && l.default.createElement(N7, { d: r, set: i }),
      a === "offres" && l.default.createElement(a7, { d: r, set: i }),
      a === "pubs" && l.default.createElement(F7, { d: r, set: i }),
      a === "themes" && l.default.createElement(k7, { d: r, set: i }),
      a === "menu" && l.default.createElement(PS, { d: r, set: i }),
      a === "actus" && l.default.createElement(D7, { d: r, set: i }),
      a === "producteurs" && l.default.createElement(P7, { d: r, set: i }),
      a === "fidelite" && l.default.createElement(B7, { d: r, set: i }),
      a === "roue" && l.default.createElement(O7, { d: r, set: i }),
      a === "recettes" && l.default.createElement(M7, { d: r, set: i }),
      a === "sondage" && l.default.createElement(L7, { d: r, set: i }),
      a === "reglages" && l.default.createElement(H7, { d: r, set: i, reinitialiser: s }),
    ),
    l.default.createElement(
      "div",
      {
        className: "signature",
        style: {
          textAlign: "center",
          fontSize: 11,
          color: "#9AA59E",
          margin: "28px 16px 8px",
          lineHeight: 1.5,
        },
      },
      "Conception et r\xE9alisation Eric Tisserand",
      l.default.createElement("br", null),
      "Reproduction interdite",
    ),
    l.default.createElement(Jk, { dispo: n }),
    l.default.createElement(
      "nav",
      { className: "tabs" },
      E.map((A) =>
        l.default.createElement(
          "button",
          {
            key: A.id,
            className: "tab" + (a === A.id ? " on" : "") + (RS.includes(A.id) ? "" : " sec"),
            onClick: () => {
              (u(A.id), window.scrollTo(0, 0));
            },
          },
          l.default.createElement(
            "span",
            { className: "tab-ic" },
            A.ic(20, a === A.id ? "#1C433B" : "#93A099"),
            !!A.n && l.default.createElement("b", { className: "tab-n" }, A.n),
          ),
          A.label,
        ),
      ),
      (() => {
        let A = E.filter((I) => !RS.includes(I.id)),
          S = A.find((I) => I.id === a),
          _ = A.reduce((I, T) => I + (T.n || 0), 0);
        return l.default.createElement(
          "button",
          {
            className: "tab plus" + (S ? " on" : ""),
            onClick: () => h(!0),
            "aria-label": "Autres rubriques",
          },
          l.default.createElement(
            "span",
            { className: "tab-ic" },
            S ? S.ic(20, "#1C433B") : he.plusMenu(20, "#93A099"),
            !!_ && l.default.createElement("b", { className: "tab-n" }, _),
          ),
          S ? S.label : "Plus",
        );
      })(),
    ),
    d &&
      l.default.createElement(
        "div",
        { className: "plus-fond", onClick: () => h(!1) },
        l.default.createElement(
          "div",
          {
            className: "plus-in",
            onClick: (A) => A.stopPropagation(),
            role: "dialog",
            "aria-label": "Autres rubriques",
          },
          ["Ma vitrine", "Mes clients", "Suivi"].map((A) =>
            l.default.createElement(
              "section",
              { key: A, className: "plus-g" },
              l.default.createElement("h4", null, A),
              l.default.createElement(
                "div",
                { className: "plus-l" },
                E.filter((S) => S.g === A).map((S) =>
                  l.default.createElement(
                    "button",
                    {
                      key: S.id,
                      className: a === S.id ? "on" : "",
                      onClick: () => {
                        (u(S.id), h(!1), window.scrollTo(0, 0));
                      },
                    },
                    S.ic(24, a === S.id ? "#1C433B" : "#5C6A62"),
                    S.label,
                    !!S.n && l.default.createElement("b", { className: "tab-n" }, S.n),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
  );
}
"serviceWorker" in navigator &&
  addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
(0, hN.createRoot)(document.getElementById("root")).render(l.default.createElement(Q7, null));
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

@firebase/util/dist/index.esm2017.js:
@firebase/util/dist/index.esm2017.js:
@firebase/util/dist/index.esm2017.js:
@firebase/util/dist/index.esm2017.js:
@firebase/util/dist/index.esm2017.js:
@firebase/util/dist/index.esm2017.js:
@firebase/util/dist/index.esm2017.js:
@firebase/util/dist/index.esm2017.js:
@firebase/util/dist/index.esm2017.js:
@firebase/util/dist/index.esm2017.js:
@firebase/logger/dist/esm/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
@firebase/util/dist/index.esm2017.js:
@firebase/util/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
@firebase/component/dist/esm/index.esm2017.js:
@firebase/app/dist/esm/index.esm2017.js:
@firebase/app/dist/esm/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/installations/dist/esm/index.esm2017.js:
@firebase/installations/dist/esm/index.esm2017.js:
@firebase/installations/dist/esm/index.esm2017.js:
@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
firebase/app/dist/esm/index.esm.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/installations/dist/esm/index.esm2017.js:
@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-454a0f5f.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
   * in compliance with the License. You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under the License
   * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
   * or implied. See the License for the specific language governing permissions and limitations under
   * the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
