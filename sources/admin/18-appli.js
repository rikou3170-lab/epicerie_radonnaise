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
function RoueNoel({
  tours: tours,
  tickets: tickets,
  onFini: onFini,
  onRefus: onRefus,
  demo: demo,
  premiere: premiere,
}) {
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
            K.default.createElement("h2", null, "C'est not\xE9"),
            K.default.createElement(
              "p",
              null,
              "La roue de No\xEBl ne s'affichera plus. Si vous changez d'avis, vous pourrez la r\xE9activer dans l'onglet Fid\xE9lit\xE9, rubrique \xAB Mes donn\xE9es \xBB.",
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
                  K.default.createElement(RoueSvg, { angle: h, taille: 250 }),
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
                        A > 0 ? "Tour suivant \u279C" : demo ? "Fermer la d\xE9mo" : "Fermer",
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
                      !demo &&
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
function TirageAuSort({ participants: participants, gagnant: gagnant, onFin: onFin }) {
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
var CMD_DEF = {
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
  Er = (t) => ({ ...CMD_DEF, ...(t || {}) }),
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
  MODES = { retrait: "Retrait \xE0 l'\xE9picerie", livraison: "Livraison" },
  An = (t) => (Math.round((Number(t) || 0) * 100) / 100).toFixed(2).replace(".", ",") + " \u20AC",
  ow = (t) => t.toLocaleDateString("sv-SE"),
  aw = (t) => {
    let e = new Date();
    return e.setHours(12, 0, 0, 0), e.setDate(e.getDate() + t), e;
  },
  dateCourte = (t) =>
    t
      ? new Date(t + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
      : "";
function YS(t, e = []) {
  let n = Er(t),
    r = ow(aw(Math.max(0, Number(n.delaiMin) || 0))),
    i = ow(aw(Math.max(1, Number(n.horizon) || 60))),
    s = Array.isArray(n.jours) && n.jours.length ? n.jours : CMD_DEF.jours,
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
async function avertirMessage(t, e, n) {
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
  LISTE_RACLETTE = {
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
var LOGO =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwMDAgQDAwMEBAQFBgoGBgUFBgwICQcKDgwPDg4MDQ0PERYTDxAVEQ0NExoTFRcYGRkZDxIbHRsYHRYYGRj/2wBDAQQEBAYFBgsGBgsYEA0QGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBj/wAARCABoAHgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5wOO9Bx3oOKDitTxQ4zRxmjjNHGaADjNHGaD1rQh0PV7jQrjW4tOnbTrcgS3W3CAkgAZ7nJHSplJR3YGfxmjjNX9P0+O9chpyG2u4jjXc5CKWYnJAAAB5z+FTXmkQx+GrbXrG6aa1luGtJElTY8MqqHwcEgqVbIPsQQO9BYyuM0cZqa1tp729jtbWMySyHCjIHbJOT0AGTmmPFIkskbId0ZIfHOMHH86AGcZo4zRxmjjNIA4zRxmjjNHGaAAY7UUDFFAAaDig0HFMA71oaVoer65cSQ6Tp0920SGSTylyEUDOWPQdDVOOGaZisMMkhA3EIpbA9eK7TwJ4k8Tabp9/oWiJAlvqJCzXEiZaLjaWTkbiASdvJ44FY13UUP3Su/MaOOs7Sa/vI7a2UM7sFyxwq5OMsegGSOTxXpdlJ4rvvhu3gy+EFvpdo8olWMATMyeXKI93IJPm7gAMtsIrIvr7SPDdu1gIbO6uDaJbTQW5KvDMpyzmZcq/8QBGSQ+DggGuPvtTv9RKC+upJlTIRGOVQE5wP89hVTpQqW51ezuvUext+F57fQ/F8t3cxW91ZRW9xbzeaRj54HTgZ5OWxxmtVUmbR7DVI9Lb+wDazvCtrAZYrK92hZDJk8kbVI3H7pTHSuDJVVycADv6VoaJY3uu30emaXIXFwdzAOdmB/E2OwqpTjBOUtEgvZHb6be+Df7Sf7Df29k17G8ZuLuBleCSS4AzxlQiw9ADyS2cCopdET/hDlt9H/cfapS1y8kouGY72EcYKD5m2xs5xwu4+vF/UvAGh6D4Lvr+6lkubuOElZC21Q54GFHue9ebWt9e2KSpZXk9uJhiQROV3geuPqfzrmwmNp4pN09loJSTC6s7qykRLu3eEuu5N4xuXJGR7ZBqDjNdjpviKx1iS0sPE8IljiJSHDiOMZARAf7iJySRnOTxk5FS48Fah/wkkGk2c1u8lxdC1jV5RujLcqJMfKG24JAJIzziumTUU23oFuxzPejvXR+NfCj+C/Ey6LNfR3cwt0lkeNdoDNn5Rnnt+tc53qadSNSKnB6MQDFFAxRVgBoJoNBxTA6PwsNMvbg6NqEF8z3EySQmyZQ0jKGxC2SOGJABHIOODmtXwjrM2i2F5/aEMttpk1yEjdh81rcbWKvGWB+ZNqbiBnHXtXEBirBlJDA5BBwQavaprmta5PHNrWrXuoyRLsja6maQovoMnigaZVuUjivJoo5xOiuQso/jGfvfjUtlp2o6nMYtN0+6vHHVbeFpCPyBrqvhf4Cn+IPj6HSN0kdlEPOu5UHzLGDjav8AtMSAPz7V9q6d4XsvB9hHoun6SmlwxqCIVXBI/vE9WJ9TXhZrnccC+SMeaX4L1LhTctT4CvtE1ayUpqOkX9sCMHzrd0/mK2PgreW2lXuqwXUdxJNEfJhSGFpXYbs4AUH2r7ivhbt8sqF3I471zGjeE4dD8R65rNqHH9rzRTyRbAqxskYT5ceuAa+fr8SrEUZU6lO3o/NeRsqa5JRb3seQ6h4A8bePLdIZY4vD+kgh8XZ3TzHsSi/dHsTXL+I/gD4p0ewa90m7t9ZVBl4YlMcuPZSSG+gOa+rraG2kQt5RyOPmNLNZRshMQ2sOw6GvOoZ9iqFlSso9rfrv+JPsVY/Pl1ZJGjkQo6kqysMEHuCK7bwjqUmszW+g6hPDvRwYJpZPLlZeSYlk2nbk87spwOWwMV6B8ffAkFusfjTTYFjLyCG/RBgMT92T69j+FeExztBcJJDKY5VOVIOCDX6Bl+OhjaCrR67rszFpxdjR16C+h16d9RljlnlJkLxymVSMkcM3JAxgZ7Dv1rM71JNcS3MokmYMwGBhQvH0AqPvXalbREgMUUDFFAATignFBOKCcUwDPNV576C3uord93mSEBQB61YzzWZqunvdTQXUTvvtzuCA43DOT+NTK9tDSkouVpvQ+vP2RoLeys9R1xrdppW1COEqi5YqqZAH4vmvoPxPqq6v4he4SF4kRREFkGG465Hbk18zfsj+LorWTWLG2eN54ZY72ON+pBGxwR7fL+dfQ15dSXuoTXkwUPK5dgvQZr88z2tKNWrRb3kna3Sytr+h0w0hYgIBOSATS1yGq/EvwtpHitvD08moXF3E6R3DWdjLcRWrPjYJXRSEJyDz61154BJ4A714Eqc4JOStcpprcKK5fxHqHj1dWhsPBXhWx1FfJM897qN2YIF5wIl2hmLnrkjAHrXRWb3UmnwSX1sttdNGplgV94jfHKhuM4PGaudCcYKo9mNwaSk9mcR8TbGK/wDhp4ktZANps5HHsyjeD+YFfBxiuP8AhMfMjQGHywz89MjGfrxX3L8XdWOlfCXxJdpgySW7W8Sk4yzkIP518W2lu0Ks0r75ZDudsY/Ae1fZ8Jxl7Cb6c36GLnyXfdWLA9KM80Z5xRnmvrTlAHNFAOaKAAnFBOKCcUE4pgGeaD6UZ5ozzQBv+A/Ez+B/iNY+J7eHeYiY7hF4MsLcOv8AUe4FfdGlapYa3ottq2l3KXFncxiSKVTwQf69iPWvz4PXFekfCz4t6l8Pr02N2kl9ocz7pLYH5oSf4489D6joa+bz/J3i4qtSXvr8V/mawqW0Z9o2z2lvbzKLRPMlO5nAA3HGMn14FcX4i+GvhLxdr39q+I7S8vmFt9mW2+3TRQAZJ3bEYAtzjJ9q0fDvjHw54q0tb/Q9TiuYiOVB+dD6MvUH61D4m8aaF4V077brGow2kXQGTJZz6Ko5P4V8UsRiYzjCOko6JJanb9Ylo09jodNjTSNOgsLAeXbwRLDGh+baqjAHPsKbczbI2kJyx/U1xmkfFLwdrFi1za+JNNKr94TyiBl+qtg1578RvjtpenWUlh4UuotS1KQFRdR/NBbj1B6O3pjj19KqnhMZiZLDqL073su/oZyrPls3oct+0H4xju7618HWMoZbZvtF4VOf3mPlT8AST9RXhw64qSaee6upLm5leWaVi8kjnLMx5JJqPPNfpOX4KODoRox6b+bOKTu7hnmjPNGeaM812iAHNFANFAATQTQaCaYBnmjPNHejvQAZ5oJ5o70GgDPgvtbi1vy4DLZxhwwuLeUoSo5xkHucVrXV5d39x517dz3Mn9+aQufzJquYwTzmjYBwCahQV+a2pc581rKwrKrAq6gg9jWbbWeoQ6mB9qAsYwQkY6nPY/StEoDwSaAgDcEiqauEZuKaXUdnnFGeaM80Z5pkBnmjPNHejvSAAaKAaKAA0HNFFMA70d6KKQB3o5zRRQAc5o5zRRTAO9HOaKKADnNHOaKKADvR3oopAAzRRRQB/9k=",
  EMPTY2 = {
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
  TYPES = [
    { id: "frais", label: "Frais du jour", c: "#6E9B3A" },
    { id: "plat", label: "Fait maison", c: "#1C433B" },
    { id: "promo", label: "Promo", c: "#C27B42" },
    { id: "gaspi", label: "Date courte", c: "#B08A2E" },
    { id: "panier", label: "Panier anti-gaspi", c: "#2E7D32" },
  ],
  aujourdhui2 = () =>
    new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }),
  Bn = () => new Date().toLocaleDateString("sv-SE");
var jourFr = (t) =>
    t ? new Date(t + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "",
  statut2 = (t, e) => {
    let n = e ? "e" : "";
    if (t.active === !1) return ["off", "Masqu\xE9" + n];
    let r = Bn();
    return t.debut && t.debut > r
      ? ["promo", "Programm\xE9" + n + " \u2014 d\xE8s le " + jourFr(t.debut)]
      : t.fin && t.fin < r
        ? ["off", "Termin\xE9" + n + " \u2014 masqu\xE9" + n]
        : ["on", t.fin ? "En ligne jusqu'au " + jourFr(t.fin) : "En ligne"];
  },
  Pastille = ({ x: x, fem: fem, style: style }) => {
    let [r, i] = statut2(x, fem);
    return React.default.createElement(
      "span",
      { className: "pill " + r, style: { display: "inline-block", ...style } },
      i,
    );
  };
function Periode({ v: v, onChange: onChange }) {
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 10 } },
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Para\xEEt \xE0 partir du"),
        React.default.createElement("input", {
          className: "inp",
          type: "date",
          value: v.debut || "",
          onChange: (n) => onChange({ ...v, debut: n.target.value }),
        }),
      ),
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Jusqu'au"),
        React.default.createElement("input", {
          className: "inp",
          type: "date",
          min: v.debut || void 0,
          value: v.fin || "",
          onChange: (n) => onChange({ ...v, fin: n.target.value }),
        }),
      ),
    ),
    React.default.createElement(
      "div",
      { style: { fontSize: 11, color: "var(--ink3)", margin: "5px 2px 0" } },
      "Vide = publi\xE9 tout de suite, sans date de fin.",
      (v.debut || v.fin) &&
        React.default.createElement(
          "button",
          {
            onClick: () => onChange({ ...v, debut: "", fin: "" }),
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
    return crypto.getRandomValues(e), Array.from(e, (n) => t[n % 62]).join("");
  },
  j9 = (t) => /^\d+$/.test(String(t)),
  U9 = ak,
  RS = ["accueil", "jour", "commandes", "messages"],
  CONFIG_KEYS = [
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
  COLS = [
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
  tN = () => Object.fromEntries(CONFIG_KEYS.filter((t) => EMPTY2[t] !== void 0).map((t) => [t, EMPTY2[t]]));
async function Pf(t) {
  for (let e = 0; e < t.length; e += 400) {
    let n = writeBatch(db2);
    t.slice(e, e + 400).forEach((r) => n.delete(r)), await n.commit();
  }
}
async function nN(t) {
  let e = await getDocs(collection(db2, "conversations", t, "messages")),
    n = [];
  e.forEach((r) => n.push(r.ref)), await Pf(n), await Pf([doc2(db2, "conversations", t)]);
}
async function syncCol(t, e = [], n = []) {
  let r = writeBatch(db2),
    i = new Map(e.map((u) => [String(u.id), u])),
    s = new Set(),
    o = 0;
  n.forEach((u) => {
    let d = u.id != null ? String(u.id) : "",
      h = i.get(d),
      { id: p, ...m } = u;
    if (!h) r.set(doc2(collection(db2, t)), { cree: Date.now(), ...m }), o++;
    else {
      s.add(d);
      let { id: w, ...E } = h;
      if (t === "jour") {
        let { reserves: A, ...S } = m,
          { reserves: _, ...I } = E;
        JSON.stringify(I) !== JSON.stringify(S) && (r.set(doc2(db2, t, d), S, { merge: !0 }), o++);
      } else JSON.stringify(E) !== JSON.stringify(m) && (r.set(doc2(db2, t, d), m), o++);
    }
  });
  let a = e.filter((u) => !s.has(String(u.id)) && n.every((d) => String(d.id) !== String(u.id)));
  if (
    (a.forEach((u) => {
      r.delete(doc2(db2, t, String(u.id))), o++;
    }),
    o && (await r.commit()),
    t === "clients")
  )
    for (let u of a) {
      let d = await getDocs(collection(db2, "clients", String(u.id), "historique"));
      if (!d.empty) {
        let h = [];
        d.forEach((p) => h.push(p.ref)), await Pf(h);
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
  SecoursEcran = class extends React.default.Component {
    constructor(e) {
      super(e), (this.state = { err: null });
    }
    static getDerivedStateFromError(e) {
      return { err: e };
    }
    componentDidCatch(e) {
      console.error(e);
    }
    render() {
      return this.state.err
        ? React.default.createElement(
            "div",
            { className: "wrap" },
            React.default.createElement(
              "div",
              { className: "card" },
              React.default.createElement("div", { className: "nm" }, "Cet \xE9cran n'a pas pu s'afficher"),
              React.default.createElement(
                "div",
                { className: "de", style: { margin: "6px 0 10px" } },
                "Les autres onglets fonctionnent. Si le probl\xE8me revient, pr\xE9venez Eric.",
              ),
              React.default.createElement(
                "button",
                { className: "btn", onClick: () => this.setState({ err: null }) },
                "R\xE9essayer",
              ),
            ),
          )
        : this.props.children;
    }
  };
function useShop(t) {
  let [e, n] = (0, React.useState)(null),
    [r, i] = (0, React.useState)({
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
    [s, o] = (0, React.useState)(""),
    [a, u] = (0, React.useState)(!1),
    [d, h] = (0, React.useState)({}),
    p = (0, React.useRef)({});
  (0, React.useEffect)(() => {
    if (!t) return;
    let _ = (T) => o(T?.code || "erreur"),
      I = [
        onSnapshot(
          CONFIG_REF,
          { includeMetadataChanges: !0 },
          (T) => {
            T.metadata.fromCache || u(!0),
              T.exists()
                ? n(T.data())
                : (n({}), T.metadata.fromCache || setDoc(CONFIG_REF, tN(), { merge: !0 }).catch(_));
          },
          _,
        ),
      ];
    return (
      COLS.forEach((T) =>
        I.push(
          onSnapshot(
            collection(db2, T),
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
  let m = (0, React.useMemo)(() => {
      let _ = { ...EMPTY2, ...(e || {}), ...d };
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
    w = (0, React.useRef)(m);
  w.current = m;
  let E = (_) => {
    console.error(_),
      ft(
        _?.code === "permission-denied"
          ? "Enregistrement refus\xE9 : votre session a peut-\xEAtre expir\xE9. Reconnectez-vous."
          : "Enregistrement impossible. V\xE9rifiez la connexion internet et r\xE9essayez.",
      );
  };
  return [
    m,
    async (_, I) => {
      let T = w.current[_],
        M = typeof I == "function" ? I(T) : I;
      try {
        return (
          CONFIG_KEYS.includes(_)
            ? ((w.current = { ...w.current, [_]: M }),
              h((V) => ({ ...V, [_]: M })),
              clearTimeout(p.current[_]),
              (p.current[_] = setTimeout(async () => {
                try {
                  await setDoc(CONFIG_REF, { [_]: M }, { merge: !0 });
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
              ? (await syncCol("jour", T.items, M.items),
                M.maj !== T.maj && (await setDoc(CONFIG_REF, { jourMaj: M.maj }, { merge: !0 })))
              : COLS.includes(_) && (await syncCol(_, T, M)),
          !0
        );
      } catch (V) {
        return E(V), !1;
      }
    },
    async () => {
      try {
        for (let I of ["offres", "actus", "jour", "pubs", "plateaux"])
          await syncCol(I, w.current[I === "jour" ? "jour" : I].items || w.current[I], []);
        Object.values(p.current).forEach(clearTimeout), (p.current = {}), h({});
        let _ = tN();
        await setDoc(
          CONFIG_REF,
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
async function ajouterRecompense(t, e, n, r) {
  let i = writeBatch(db2),
    s = Date.now(),
    o = n === "recompense" || n === "recompense1",
    a = (o && Number(t.bonusAttente)) || 0,
    u = r ? Math.min(a, (r.palier || r.nb) - 1) : 0;
  i.update(doc2(db2, "clients", String(t.id)), {
    tampons: increment2(e + u),
    ...(n === "tampon" ? { dernierTampon: s } : {}),
    ...(o ? { cadeaux: increment2(1) } : {}),
    ...(u ? { bonusAttente: a - u } : {}),
    derniere: new Date().toLocaleDateString("sv-SE"),
  }),
    i.set(doc2(collection(db2, "clients", String(t.id), "historique")), {
      date: s,
      points: e,
      type: n,
      source: "admin",
    }),
    u &&
      i.set(doc2(collection(db2, "clients", String(t.id), "historique")), {
        date: s - 1,
        points: u,
        type: "bonus",
        source: "admin",
      }),
    await i.commit();
}
async function ajouterPoints(t, e, n) {
  let r = Math.max(-(t.points || 0), e),
    i = writeBatch(db2),
    s = doc2(db2, "clients", String(t.id));
  i.update(s, {
    points: increment2(r),
    ...(n.montant ? { depense: increment2(n.montant) } : {}),
    derniere: new Date().toLocaleDateString("sv-SE"),
  }),
    i.set(doc2(collection(db2, "clients", String(t.id), "historique")), {
      date: Date.now(),
      points: r,
      ...n,
    }),
    await i.commit();
}
function lirePhoto(t, e, n = 800) {
  let r = new FileReader();
  (r.onload = () => {
    let i = new Image();
    (i.onload = () => {
      let s = Math.min(1, n / Math.max(i.width, i.height)),
        o = document.createElement("canvas");
      (o.width = Math.round(i.width * s)),
        (o.height = Math.round(i.height * s)),
        o.getContext("2d").drawImage(i, 0, 0, o.width, o.height);
      let a = 0.72,
        u = o.toDataURL("image/jpeg", a);
      for (; u.length > 6e5 && a > 0.35; ) (a -= 0.1), (u = o.toDataURL("image/jpeg", a));
      e(u);
    }),
      (i.src = r.result);
  }),
    r.readAsDataURL(t);
}
var I10 = {
    home: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("path", {
          d: "M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
        }),
      ),
    shop: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("path", { d: "M4 8h16l-1 12H5z" }),
        React.default.createElement("path", { d: "M9 8V6a3 3 0 0 1 6 0v2" }),
      ),
    ferme: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("path", { d: "M3 21V10l9-6 9 6v11z" }),
        React.default.createElement("path", { d: "M9 21v-6h6v6M3 13h18" }),
        React.default.createElement("path", { d: "M9 15l6 6M15 15l-6 6" }),
      ),
    basket: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("path", { d: "M3 9h18l-2 11H5z" }),
        React.default.createElement("path", { d: "M8 9 12 3l4 6" }),
      ),
    news: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
        React.default.createElement("path", { d: "M7 9h6M7 13h10M7 17h10" }),
      ),
    img: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
        React.default.createElement("circle", { cx: "9", cy: "10", r: "2" }),
        React.default.createElement("path", { d: "m21 16-5-5-9 9" }),
      ),
    star: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("path", {
          d: "m12 3 2.7 5.6 6.3.9-4.5 4.3 1 6.2-5.5-3-5.5 3 1-6.2L3 9.5l6.3-.9z",
        }),
      ),
    gear: (t = 20, e = "currentColor") =>
      React.default.createElement(
        "svg",
        { width: t, height: t, viewBox: "0 0 24 24", fill: "none", stroke: e, strokeWidth: "1.7" },
        React.default.createElement("circle", { cx: "12", cy: "12", r: "3.2" }),
        React.default.createElement("path", {
          d: "M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3",
        }),
      ),
    plus: (t = 16, e = "#fff") =>
      React.default.createElement(
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
        React.default.createElement("path", { d: "M12 5v14M5 12h14" }),
      ),
    pen: (t = 16, e = "#5C6A62") =>
      React.default.createElement(
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
        React.default.createElement("path", {
          d: "M11 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6",
        }),
        React.default.createElement("path", { d: "M18.4 2.6a2 2 0 0 1 2.8 2.8L12 14.6 8 15.6l1-4z" }),
      ),
    porteVoix: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("path", { d: "M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" }),
        React.default.createElement("path", { d: "M15 9a4 4 0 0 1 0 6" }),
        React.default.createElement("path", { d: "M18 6a8 8 0 0 1 0 12" }),
      ),
    graph: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("path", { d: "M4 20V10M10 20V4M16 20v-7M22 20H2" }),
      ),
    plusMenu: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("rect", { x: "3.5", y: "3.5", width: "7", height: "7", rx: "2" }),
        React.default.createElement("rect", { x: "13.5", y: "3.5", width: "7", height: "7", rx: "2" }),
        React.default.createElement("rect", { x: "3.5", y: "13.5", width: "7", height: "7", rx: "2" }),
        React.default.createElement("rect", { x: "13.5", y: "13.5", width: "7", height: "7", rx: "2" }),
      ),
    bin: (t = 16, e = "#C86B5C") =>
      React.default.createElement(
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
        React.default.createElement("path", {
          d: "M3.5 6h17M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6M6 6l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14",
        }),
      ),
    cam: (t = 18, e = "#5C6A62") =>
      React.default.createElement(
        "svg",
        { width: t, height: t, viewBox: "0 0 24 24", fill: "none", stroke: e, strokeWidth: "1.7" },
        React.default.createElement("path", {
          d: "M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.3-2h7.9l1.3 2h2.3A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z",
        }),
        React.default.createElement("circle", { cx: "12", cy: "12.8", r: "3.4" }),
      ),
    bulle: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("path", { d: "M4 5h16v11H9l-5 4z" }),
        React.default.createElement("path", { d: "M8 9.5h8M8 12.5h5" }),
      ),
    sapin: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("path", { d: "M12 2.5 7 9h3l-4 6h3.5L5 20h14l-4.5-5H18l-4-6h3z" }),
        React.default.createElement("path", { d: "M12 20v2" }),
      ),
    cmd: (t = 20, e = "currentColor") =>
      React.default.createElement(
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
        React.default.createElement("rect", { x: "5", y: "4", width: "14", height: "17", rx: "2" }),
        React.default.createElement("path", { d: "M9 4V3h6v1M9 10h6M9 14h6M9 18h3" }),
      ),
    qr: (t = 18, e = "#fff") =>
      React.default.createElement(
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
        React.default.createElement("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1" }),
        React.default.createElement("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1" }),
        React.default.createElement("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1" }),
        React.default.createElement("path", { d: "M14 14h3v3h-3zM20 14v3M14 20h6" }),
      ),
  },
  CSS_ADMIN =
    SC +
    NS +
    CSS_MENU +
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
  ze = ({ on: on, set: set }) =>
    React.default.createElement(
      "div",
      { className: "sw" + (on ? " on" : ""), onClick: set },
      React.default.createElement("i", null),
    ),
  Vn = ({ t, s: s }) =>
    React.default.createElement("div", { className: "empty" }, React.default.createElement("b", null, t), s);
function ut({ titre: titre, onClose: onClose, children: children }) {
  return React.default.createElement(
    "div",
    { className: "mdl", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "in", onClick: (r) => r.stopPropagation() },
      React.default.createElement(
        "div",
        { className: "hd" },
        React.default.createElement("h3", null, titre),
        React.default.createElement(
          "button",
          { className: "ib", onClick: onClose, style: { fontSize: 26, color: "#93A099", lineHeight: 1 } },
          "\xD7",
        ),
      ),
      children,
    ),
  );
}
function PhotoField({ value: value, onChange: onChange, max: max, large: large }) {
  let i = (0, React.useRef)();
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement("input", {
      ref: i,
      type: "file",
      accept: "image/*",
      style: { display: "none" },
      onChange: (s) => {
        let o = s.target.files?.[0];
        o && lirePhoto(o, onChange, max), (s.target.value = "");
      },
    }),
    value
      ? React.default.createElement(
          "div",
          { style: { position: "relative" } },
          React.default.createElement("img", { className: "ph", src: value, alt: "" }),
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 8 } },
            React.default.createElement(
              "button",
              { className: "btn gh sm", style: { flex: 1 }, onClick: () => i.current.click() },
              "Changer",
            ),
            React.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { flex: 1, color: "var(--red)" },
                onClick: () => onChange(""),
              },
              "Retirer",
            ),
          ),
        )
      : React.default.createElement(
          "div",
          { className: "phbox", onClick: () => i.current.click() },
          I10.cam(22),
          "Ajouter une photo",
        ),
  );
}
function TableauDeBord({ d: d, set: set, aller: aller }) {
  let r = d.resas.filter((a) => a.statut === "reservee").length,
    i = d.conversations.filter((a) => a.attente).length,
    s = d.commandes.filter((a) => a.statut === "nouvelle").length,
    o = !r && !i && !s;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Bonjour Marion"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Tout ce que vous modifiez ici appara\xEEt aussit\xF4t dans l'application de vos clients.",
    ),
    React.default.createElement("div", { className: "nm", style: { margin: "4px 0 8px" } }, "\xC0 faire"),
    !!s &&
      React.default.createElement(
        "button",
        {
          className: "card carte-lien",
          style: { background: "#FBEFE4", borderColor: "#F0D7BF" },
          onClick: () => aller("commandes"),
        },
        React.default.createElement(
          "div",
          { className: "nm" },
          "\u{1F4CB} ",
          s,
          " commande(s) de plateaux \xE0 accepter ou refuser",
        ),
        React.default.createElement("div", { className: "de" }, "Ouvrir les commandes \u2192"),
      ),
    !!i &&
      React.default.createElement(
        "button",
        {
          className: "card carte-lien",
          style: { background: "#FBEFE4", borderColor: "#F0D7BF" },
          onClick: () => aller("messages"),
        },
        React.default.createElement(
          "div",
          { className: "nm" },
          "\u{1F4AC} ",
          i,
          " message(s) de client en attente de r\xE9ponse",
        ),
        React.default.createElement("div", { className: "de" }, "Ouvrir les messages \u2192"),
      ),
    !!r &&
      React.default.createElement(
        "button",
        {
          className: "card carte-lien",
          style: { background: "#E3F1E3", borderColor: "#C5E1C5" },
          onClick: () => aller("jour"),
        },
        React.default.createElement(
          "div",
          { className: "nm" },
          "\u{1F9FA} ",
          r,
          " r\xE9servation(s) anti-gaspi \xE0 mettre de c\xF4t\xE9",
        ),
        React.default.createElement("div", { className: "de" }, "Ouvrir Aujourd'hui \u2192"),
      ),
    React.default.createElement(
      "button",
      {
        className: "card carte-lien",
        style: {
          background: d.jour?.maj === aujourdhui2() ? "#EEF3E2" : "#FDF6EE",
          borderColor: d.jour?.maj === aujourdhui2() ? "#CFE0AE" : "#EFDCC6",
        },
        onClick: () => aller("jour"),
      },
      React.default.createElement(
        "div",
        { className: "nm" },
        d.jour?.maj === aujourdhui2()
          ? "\u2705 Publication du jour faite"
          : "\u{1F955} Pensez \xE0 publier le jour",
      ),
      React.default.createElement(
        "div",
        { className: "de" },
        d.jour?.maj ? "Derni\xE8re mise \xE0 jour : " + d.jour.maj : "Aucune publication pour l'instant",
      ),
    ),
    o &&
      React.default.createElement(
        "div",
        { className: "de", style: { margin: "0 2px 12px" } },
        "Rien d'autre en attente. Bonne journ\xE9e !",
      ),
    React.default.createElement(
      "div",
      { className: "nm", style: { margin: "14px 0 8px" } },
      "En ligne en ce moment",
    ),
    React.default.createElement(
      "div",
      { className: "grid2", style: { marginBottom: 10 } },
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, (d.jour?.items || []).filter((a) => a.active !== !1).length),
        React.default.createElement("span", null, "articles du jour"),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement(
          "b",
          null,
          d.plateaux.filter((a) => a.active !== !1).length + d.offres.filter((a) => a.active !== !1).length,
        ),
        React.default.createElement("span", null, "plateaux & paniers"),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, d.actus.filter((a) => a.active !== !1).length),
        React.default.createElement("span", null, "actualit\xE9s"),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, d.pubs.filter((a) => a.active !== !1).length),
        React.default.createElement("span", null, "banni\xE8res"),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "grid2" },
      React.default.createElement(
        "button",
        { className: "card carte-lien", onClick: () => aller("com") },
        React.default.createElement("div", { className: "nm" }, "\u{1F4E3} Communication"),
        React.default.createElement("div", { className: "de" }, "Notifications, message d'accueil \u2192"),
      ),
      React.default.createElement(
        "button",
        { className: "card carte-lien", onClick: () => aller("stats") },
        React.default.createElement("div", { className: "nm" }, "\u{1F4CA} Statistiques"),
        React.default.createElement(
          "div",
          { className: "de" },
          "Ventes, fr\xE9quentation, connexions \u2192",
        ),
      ),
    ),
  );
}
function EcranStatistiques({ d: d }) {
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Statistiques"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Vos ventes dans l'appli et ce que regardent vos clients, pour choisir quoi mettre en avant.",
    ),
    React.default.createElement(Statistiques, { d: d }),
    React.default.createElement(Statistiques2, { d: d }),
  );
}
function MessageOuverture({ d: d, set: set }) {
  let n = { emoji: "\u{1F4E2}", titre: "", texte: "", photo: "", frequence: "une", ...(d.popup || {}) },
    r = (o) => set("popup", (a) => ({ emoji: "\u{1F4E2}", frequence: "une", ...(a || {}), ...o })),
    [i, s] = (0, React.useState)(!1);
  return React.default.createElement(
    "div",
    { className: "card" },
    React.default.createElement(
      "div",
      { className: "row", style: { marginBottom: 10 } },
      React.default.createElement(
        "div",
        null,
        React.default.createElement("div", { className: "nm" }, "\u{1F4AC} Message \xE0 l'ouverture"),
        React.default.createElement(
          "div",
          { className: "de" },
          "Une fen\xEAtre qui s'affiche quand le client ouvre l'appli",
        ),
      ),
      React.default.createElement(
        "div",
        { className: "rt" },
        React.default.createElement(ze, { on: !!n.active, set: () => r({ active: !n.active }) }),
      ),
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 8 } },
      React.default.createElement("input", {
        className: "inp",
        value: n.emoji,
        maxLength: 4,
        onChange: (o) => r({ emoji: o.target.value }),
        style: { width: 64, textAlign: "center", fontSize: 22 },
        "aria-label": "\xC9moji",
      }),
      React.default.createElement("input", {
        className: "inp",
        style: { flex: 1 },
        value: n.titre,
        maxLength: 60,
        placeholder: "Ex : Ferm\xE9 lundi 2 novembre",
        onChange: (o) => r({ titre: o.target.value }),
      }),
    ),
    React.default.createElement("textarea", {
      className: "inp",
      style: { marginTop: 8 },
      value: n.texte,
      maxLength: 400,
      placeholder:
        "Ex : L'\xE9picerie sera exceptionnellement ferm\xE9e lundi. Pensez \xE0 commander vos plateaux avant samedi !",
      onChange: (o) => r({ texte: o.target.value }),
    }),
    React.default.createElement(PhotoField, { value: n.photo, onChange: (o) => r({ photo: o }) }),
    React.default.createElement("label", { className: "lab" }, "Combien de fois ?"),
    React.default.createElement(
      "div",
      { className: "seg" },
      [
        ["une", "Une seule fois par client"],
        ["chaque", "\xC0 chaque ouverture"],
      ].map(([o, a]) =>
        React.default.createElement(
          "button",
          { key: o, className: n.frequence === o ? "on" : "", onClick: () => r({ frequence: o }) },
          a,
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { style: { marginTop: 8 } },
      React.default.createElement(Periode, { v: n, onChange: (o) => r(o) }),
    ),
    n.active && React.default.createElement(Pastille, { x: n, style: { marginTop: 8 } }),
    React.default.createElement(
      "button",
      {
        className: "btn gh sm",
        style: { marginTop: 10 },
        disabled: !n.titre && !n.texte,
        onClick: () => s(!0),
      },
      "Aper\xE7u",
    ),
    React.default.createElement(
      "div",
      { className: "de", style: { marginTop: 6 } },
      "Si vous modifiez le titre ou le texte, la fen\xEAtre s'affiche \xE0 nouveau \xE0 tous les clients.",
    ),
    i &&
      React.default.createElement(
        "div",
        { className: "pop-fond", onClick: () => s(!1) },
        React.default.createElement(
          "div",
          { className: "pop", onClick: (o) => o.stopPropagation() },
          n.photo && React.default.createElement("img", { src: n.photo, alt: "", className: "pop-ph" }),
          n.emoji && React.default.createElement("div", { className: "pop-em" }, n.emoji),
          n.titre && React.default.createElement("div", { className: "pop-t" }, n.titre),
          n.texte && React.default.createElement("div", { className: "pop-x" }, n.texte),
          React.default.createElement(
            "button",
            { className: "btn", style: { marginTop: 14 }, onClick: () => s(!1) },
            "J'en prends note",
          ),
        ),
      ),
  );
}
function Communication({ d: d, set: set }) {
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Communication"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Pr\xE9venez vos clients : une notification sur leur t\xE9l\xE9phone, ou un bandeau en haut de l'appli.",
    ),
    bw(d)
      ? React.default.createElement(PrevenirClients, { d: d })
      : React.default.createElement(
          "div",
          { className: "card" },
          React.default.createElement("div", { className: "nm" }, "\u{1F4E3} Notifications"),
          React.default.createElement(
            "div",
            { className: "de" },
            "Pas encore activ\xE9es (r\xE9glage technique d'Eric).",
          ),
        ),
    React.default.createElement(MessageOuverture, { d: d, set: set }),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "row", style: { marginBottom: 10 } },
        React.default.createElement(
          "div",
          null,
          React.default.createElement("div", { className: "nm" }, "Message d'accueil"),
          React.default.createElement("div", { className: "de" }, "Bandeau en haut de l'application"),
        ),
        React.default.createElement(
          "div",
          { className: "rt" },
          React.default.createElement(ze, {
            on: d.annonce.active,
            set: () => set("annonce", (n) => ({ ...n, active: !n.active })),
          }),
        ),
      ),
      React.default.createElement("textarea", {
        className: "inp",
        placeholder:
          "Ex : Fermeture exceptionnelle jeudi 14 \u2014 commandes de plateaux jusqu'\xE0 mercredi soir",
        value: d.annonce.text,
        onChange: (n) => set("annonce", (r) => ({ ...r, text: n.target.value })),
      }),
      d.annonce.active && React.default.createElement(Pastille, { x: d.annonce, style: { marginTop: 8 } }),
      React.default.createElement(
        "div",
        { style: { marginTop: 8 } },
        React.default.createElement(Periode, { v: d.annonce, onChange: (n) => set("annonce", n) }),
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 7, marginTop: 9 } },
        [
          ["apple", "#6E9B3A", "Vert"],
          ["terra", "#C27B42", "Orange"],
          ["forest", "#1C433B", "Fonc\xE9"],
        ].map(([n, r, i]) =>
          React.default.createElement(
            "button",
            {
              key: n,
              onClick: () => set("annonce", (s) => ({ ...s, couleur: n })),
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
                border: d.annonce.couleur === n ? "2px solid #22302A" : "2px solid transparent",
              },
            },
            i,
          ),
        ),
      ),
    ),
  );
}
async function envoyerMessageClient(t, e, n, r) {
  let i = n.conv;
  if (!i) {
    let a = String(n.tel || "").replace(/\D/g, "");
    i = a.length >= 10 ? t.conversations.find((u) => String(u.tel || "").replace(/\D/g, "") === a)?.id : null;
  }
  let s = Date.now(),
    o = writeBatch(db2);
  if (i) o.update(doc2(db2, "conversations", i), { maj: s, dernier: "Vous : " + uf(r), attente: !1 });
  else {
    let a = doc2(collection(db2, "conversations"));
    (i = a.id),
      o.set(a, {
        nom: String(n.nom || "Client").slice(0, 40),
        tel: String(n.tel || "").slice(0, 20),
        cree: s,
        maj: s,
        dernier: "Vous : " + uf(r),
        attente: !1,
        via: n.id,
      });
  }
  o.set(doc2(collection(db2, "conversations", i, "messages")), { de: "epicerie", texte: r, date: s }),
    n.conv !== i && o.update(doc2(db2, e, n.id), { conv: i }),
    await o.commit(),
    avertirMessage(t.cmd, "msg", i);
}
var MESSAGES_PRETS = {
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
function EcrireAuClient({ d: t, cible: cible, x: x, onClose: onClose }) {
  let [i, s] = (0, React.useState)(""),
    [o, a] = (0, React.useState)(!1),
    u = async () => {
      let d = i.trim().slice(0, 1e3);
      if (!(!d || o)) {
        a(!0);
        try {
          await envoyerMessageClient(t, cible, x, d), onClose(!0);
        } catch {
          ft("Message non envoy\xE9. V\xE9rifiez la connexion et r\xE9essayez."), a(!1);
        }
      }
    };
  return React.default.createElement(
    ut,
    { titre: "\u{1F4AC} \xC9crire \xE0 " + (x.nom || "ce client"), onClose: () => onClose(!1) },
    React.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 8 } },
      "Le message arrive dans l'application du client",
      x.tel ? " (" + x.tel + ")" : "",
      ". Vous verrez sa r\xE9ponse dans l'onglet Messages.",
    ),
    React.default.createElement(
      "div",
      { className: "motifs", style: { margin: "0 0 8px" } },
      (MESSAGES_PRETS[cible] || []).map((d) =>
        React.default.createElement(
          "button",
          { key: d, onClick: () => s(d) },
          d.length > 40 ? d.slice(0, 38) + "\u2026" : d,
        ),
      ),
    ),
    React.default.createElement("textarea", {
      className: "inp",
      rows: 4,
      autoFocus: !0,
      value: i,
      maxLength: 1e3,
      placeholder: "Votre message\u2026",
      onChange: (d) => s(d.target.value),
    }),
    React.default.createElement(
      "button",
      { className: "btn", style: { marginTop: 10 }, disabled: !i.trim() || o, onClick: u },
      o ? "Envoi\u2026" : "Envoyer le message",
    ),
  );
}
function Reservations({ d: t }) {
  let [e, n] = (0, React.useState)(!1),
    [r, i] = (0, React.useState)(null),
    s = [...t.resas].sort((h, p) => (p.cree || 0) - (h.cree || 0)),
    o = s.filter((h) => h.statut === "reservee"),
    a = s.filter((h) => h.statut !== "reservee").slice(0, e ? 50 : 5),
    u = async (h, p) => {
      try {
        let m = writeBatch(db2);
        m.update(doc2(db2, "resas", h.id), { statut: p });
        let w = t.jour.items.find((E) => String(E.id) === String(h.item));
        p !== "retiree" &&
          w &&
          m.update(doc2(db2, "jour", String(h.item)), {
            reserves: (parseInt(w.reserves) || 0) >= (h.qte || 0) ? increment2(-(h.qte || 0)) : 0,
          }),
          await m.commit();
      } catch {
        ft("Modification impossible. V\xE9rifiez la connexion.");
      }
    };
  if (!s.length) return null;
  let d = ({ r: h }) =>
    React.default.createElement(
      "div",
      { className: "card resa-adm " + h.statut, key: h.id },
      React.default.createElement(
        "div",
        { className: "row", style: { alignItems: "flex-start" } },
        React.default.createElement(
          "div",
          { style: { minWidth: 0, flex: 1 } },
          React.default.createElement(
            "div",
            { className: "nm" },
            h.qte,
            " \xD7 ",
            h.titre,
            h.total > 0 &&
              React.default.createElement(
                "span",
                { style: { color: "var(--apple)", marginLeft: 6 } },
                An(h.total),
              ),
          ),
          React.default.createElement(
            "div",
            { className: "de" },
            React.default.createElement("b", { style: { color: "var(--ink)" } }, h.nom),
            h.tel &&
              React.default.createElement(
                React.default.Fragment,
                null,
                " \xB7 ",
                React.default.createElement("a", { href: "tel:" + h.tel.replace(/\s/g, "") }, h.tel),
              ),
            " \xB7 ",
            h.retrait || "retrait \xE0 l'\xE9picerie",
          ),
          React.default.createElement(
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
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 6, marginTop: 8 } },
          React.default.createElement(
            "button",
            { className: "btn sm", style: { flex: 2 }, onClick: () => u(h, "retiree") },
            "\u2713 Retir\xE9",
          ),
          React.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { flex: 1 },
              onClick: async () =>
                (await De("Le client n'est pas venu ? L'article sera remis en vente.")) && u(h, "absent"),
            },
            "Pas venu",
          ),
          React.default.createElement(
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
      React.default.createElement(
        "button",
        { className: "btn gh sm", style: { marginTop: 8, width: "auto" }, onClick: () => i(h) },
        "\u{1F4AC} \xC9crire au client",
        h.conv ? " (conversation en cours)" : "",
      ),
    );
  return React.default.createElement(
    "div",
    { style: { marginBottom: 16 } },
    React.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 6 } },
      "\u{1F9FA} R\xE9servations ",
      o.length ? "\u2014 " + o.length + " \xE0 retirer" : "",
    ),
    !o.length &&
      React.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 8 } },
        "Aucune r\xE9servation en attente.",
      ),
    React.default.createElement(
      "div",
      { className: "grille" },
      o.map((h) => React.default.createElement(d, { r: h, key: h.id })),
    ),
    !!a.length &&
      React.default.createElement(
        "details",
        { style: { marginTop: 6 } },
        React.default.createElement(
          "summary",
          { className: "de", style: { cursor: "pointer" } },
          "Historique r\xE9cent",
        ),
        React.default.createElement(
          "div",
          { className: "grille", style: { marginTop: 6 } },
          a.map((h) => React.default.createElement(d, { r: h, key: h.id })),
        ),
        !e &&
          React.default.createElement(
            "button",
            { className: "btn gh sm", onClick: () => n(!0) },
            "Voir plus",
          ),
      ),
    r && React.default.createElement(EcrireAuClient, { d: t, cible: "resas", x: r, onClose: () => i(null) }),
  );
}
function ChampsResa({ v: v, onChange: onChange }) {
  let n = (parseInt(v.stock) || 0) > 0 || v.resaOn,
    r = parseInt(v.stock) >= 999;
  return React.default.createElement(
    "div",
    { className: "choix-bloc", style: { background: "#F3F8EC", borderColor: "#D6E6C2" } },
    React.default.createElement(
      "div",
      { className: "tog", style: { borderTop: "none", paddingTop: 0 } },
      React.default.createElement(
        "div",
        null,
        React.default.createElement(
          "div",
          { style: { fontSize: 13, fontWeight: 800 } },
          "\u{1F9FA} R\xE9servable dans l'application",
        ),
        React.default.createElement(
          "div",
          { className: "de" },
          "Les clients r\xE9servent, vous mettez de c\xF4t\xE9 (fa\xE7on Too Good To Go)",
        ),
      ),
      React.default.createElement(
        "div",
        { className: "rt" },
        React.default.createElement(ze, {
          on: !!n,
          set: () =>
            onChange(
              n
                ? { ...v, stock: 0, resaOn: !1 }
                : { ...v, stock: "", resaOn: !0, retrait: v.retrait || "aujourd'hui avant la fermeture" },
            ),
        }),
      ),
    ),
    n &&
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, marginTop: 6 } },
        React.default.createElement(
          "div",
          { style: { width: 110, flexShrink: 0 } },
          React.default.createElement("label", { className: "lab" }, "Quantit\xE9 dispo."),
          React.default.createElement("input", {
            className: "inp",
            type: "number",
            inputMode: "numeric",
            min: "1",
            max: "998",
            value: r ? "" : v.stock || "",
            placeholder: "Sans limite",
            onChange: (i) => onChange({ ...v, stock: i.target.value, resaOn: i.target.value.trim() !== "0" }),
          }),
        ),
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("label", { className: "lab" }, "\xC0 retirer\u2026"),
          React.default.createElement("input", {
            className: "inp",
            value: v.retrait || "",
            maxLength: 60,
            placeholder: "aujourd'hui entre 17h et 19h",
            onChange: (i) => onChange({ ...v, retrait: i.target.value }),
          }),
        ),
      ),
    n &&
      React.default.createElement(
        "div",
        { className: "de", style: { marginTop: 4 } },
        "Laissez la quantit\xE9 vide si vous en avez beaucoup (sans limite). Tapez 0 pour arr\xEAter les r\xE9servations.",
      ),
    n &&
      (parseInt(v.reserves) || 0) > 0 &&
      React.default.createElement(
        "div",
        { className: "de", style: { marginTop: 6 } },
        "D\xE9j\xE0 r\xE9serv\xE9s : ",
        React.default.createElement("b", null, v.reserves),
        r ? "" : " / " + v.stock,
        React.default.createElement(
          "button",
          {
            className: "lienadm",
            style: { display: "inline", marginLeft: 8 },
            onClick: async () => {
              (await De("Remettre le compteur de r\xE9servations \xE0 0 ?")) &&
                (await R9(v.id)) &&
                onChange({ ...v, reserves: 0 });
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
    let e = writeBatch(db2);
    return e.update(doc2(db2, "jour", String(t)), { reserves: 0 }), await e.commit(), !0;
  } catch {
    return ft("Impossible de remettre le compteur \xE0 0. V\xE9rifiez la connexion."), !1;
  }
}
var esc = (t) =>
  String(t ?? "").replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
function imprimerPreparation(t, e) {
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
      return `<div class="c"><div class="h"><span class="box"></span><b>${esc(p.heure ? lc(p.heure) : "\u2014")}</b> \xB7 ${esc(p.nom)} \xB7 ${esc(p.tel)}
      <span class="st">${p.statut === "nouvelle" ? "\u26A0 \xC0 VALIDER" : esc(MODES[p.mode] || p.mode)}</span></div>
      ${p.adresse ? `<div class="ad">\u{1F4CD} ${esc(p.adresse)}</div>` : ""}
      <ul>${(p.lignes || []).map((w) => `<li><b>${esc(w.personnes)} pers.</b> \u2014 ${esc(w.nom)}</li>`).join("")}</ul>
      ${m.map((w) => (w.startsWith("\u26A0\uFE0F") ? `<div class="al">${esc(w)}</div>` : `<div class="rq">\xAB ${esc(w)} \xBB</div>`)).join("")}
      <div class="t">N\xB0 ${esc(p.numero)} \xB7 ${An(p.total)}</div></div>`;
    },
    d = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Pr\xE9paration du ${esc(a)}</title><style>
    body{font-family:Arial,sans-serif;color:#222;margin:24px;font-size:13px}h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:22px 0 8px;border-bottom:2px solid #1C433B;padding-bottom:4px}
    .sub{color:#666;margin-bottom:10px}.c{border:1px solid #bbb;border-radius:8px;padding:10px 12px;margin-bottom:10px;page-break-inside:avoid}
    .h{font-size:14px}.box{display:inline-block;width:14px;height:14px;border:2px solid #222;border-radius:3px;vertical-align:-2px;margin-right:6px}
    .st{float:right;font-weight:bold;color:#1C433B}.ad{color:#555;margin-top:4px}ul{margin:6px 0 4px 18px;padding:0}li{margin:2px 0}
    .al{font-weight:bold;color:#a00;border:1px solid #a00;border-radius:5px;padding:4px 7px;margin:5px 0}.rq{font-style:italic;color:#444}.t{color:#666;font-size:11.5px;margin-top:4px}
    table{border-collapse:collapse}td{padding:3px 12px 3px 0}.vide{color:#888;font-style:italic}@media print{button{display:none}}
  </style></head><body>
  <button onclick="print()" style="float:right;padding:8px 16px;font-size:14px">\u{1F5A8}\uFE0F Imprimer</button>
  <h1>Pr\xE9paration \u2014 ${esc(a)}</h1><div class="sub">${esc(t.store.name)} \xB7 \xE9dit\xE9e le ${new Date().toLocaleString("fr-FR")}</div>
  <h2>Plateaux (${n.length} commande${n.length > 1 ? "s" : ""})</h2>
  ${
    Object.keys(o).length
      ? `<table>${Object.entries(o)
          .map(([p, m]) => `<tr><td><b>${esc(p)}</b></td><td>${m} personnes au total</td></tr>`)
          .join("")}</table><br>`
      : ""
  }
  ${n.length ? n.map(u).join("") : '<p class="vide">Aucun plateau \xE0 pr\xE9parer ce jour-l\xE0.</p>'}
  <h2>R\xE9servations anti-gaspi \xE0 mettre de c\xF4t\xE9 (${s.length})</h2>
  ${s.length ? s.map((p) => `<div class="c"><span class="box"></span><b>${esc(p.qte)} \xD7 ${esc(p.titre)}</b> \u2014 ${esc(p.nom)} ${esc(p.tel)} \xB7 \xE0 retirer ${esc(p.retrait || "\xE0 l'\xE9picerie")} <span class="st">${esc(p.numero)}</span></div>`).join("") : '<p class="vide">Aucune r\xE9servation en attente.</p>'}
  </body></html>`,
    h = window.open("", "_blank");
  if (!h)
    return ft("La fen\xEAtre a \xE9t\xE9 bloqu\xE9e : autorisez les fen\xEAtres (pop-up) pour ce site.");
  h.document.open(), h.document.write(d), h.document.close();
}
function BoutonPreparation({ d: d }) {
  let [jour, setJour] = (0, React.useState)(Bn()),
    r = (() => {
      let i = new Date();
      return i.setDate(i.getDate() + 1), i.toLocaleDateString("sv-SE");
    })();
  return React.default.createElement(
    "div",
    { className: "card prepa" },
    React.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 6 } },
      "\u{1F5A8}\uFE0F Feuille de pr\xE9paration",
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" } },
      React.default.createElement(
        "button",
        { className: "btn sm " + (jour === Bn() ? "" : "gh"), onClick: () => setJour(Bn()) },
        "Aujourd'hui",
      ),
      React.default.createElement(
        "button",
        { className: "btn sm " + (jour === r ? "" : "gh"), onClick: () => setJour(r) },
        "Demain",
      ),
      React.default.createElement("input", {
        className: "inp",
        type: "date",
        value: jour,
        onChange: (i) => setJour(i.target.value || Bn()),
        style: { width: "auto", flex: "1 1 140px", padding: "8px 10px" },
      }),
      React.default.createElement(
        "button",
        { className: "btn terra sm", onClick: () => imprimerPreparation(d, jour) },
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
  let [e, n] = (0, React.useState)(null);
  return (
    (0, React.useEffect)(
      () =>
        t
          ? onSnapshot(
              collection(db2, "appareils"),
              (r) => n(r.docs.map((i) => i.data())),
              () => n([]),
            )
          : void 0,
      [t],
    ),
    { total: e ? e.length : null, promo: (e || []).filter((r) => r.promo).length }
  );
}
function EnvoiNotification({
  d: t,
  abonnes: abonnes,
  titre0: titre0 = "",
  texte0: texte0 = "",
  onFini: onFini,
  onAnnuler: onAnnuler,
}) {
  let [o, a] = (0, React.useState)(titre0.slice(0, 50)),
    [u, d] = (0, React.useState)(texte0.slice(0, 160)),
    [h, p] = (0, React.useState)(!1),
    m = async () => {
      let w = o.trim(),
        E = u.trim();
      if (
        !(!w || !E || h) &&
        (await De(
          "Envoyer cette notification \xE0 " +
            abonnes +
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
          let A = doc2(collection(db2, "diffusions"));
          await setDoc(A, { titre: w.slice(0, 50), texte: E.slice(0, 160), cree: Date.now() }),
            await avertirMessage(t.cmd, "diff", A.id),
            onFini?.();
        } catch {
          ft("Envoi impossible. V\xE9rifiez la connexion internet et r\xE9essayez.");
        }
        p(!1);
      }
    };
  return React.default.createElement(
    "div",
    { style: { marginTop: 10 } },
    React.default.createElement("label", { className: "lab" }, "Titre"),
    React.default.createElement("input", {
      className: "inp",
      value: o,
      maxLength: 50,
      placeholder: "Ex : Arrivage de potimarrons \u{1F383}",
      onChange: (w) => a(w.target.value),
    }),
    React.default.createElement("label", { className: "lab" }, "Message"),
    React.default.createElement("textarea", {
      className: "inp",
      value: u,
      maxLength: 160,
      placeholder: "Ex : Tout frais du producteur, r\xE9servez-les dans l'appli !",
      onChange: (w) => d(w.target.value),
    }),
    React.default.createElement(
      "div",
      { className: "de", style: { margin: "4px 2px 8px" } },
      160 - u.length,
      " caract\xE8res restants. Envoy\xE9 seulement aux ",
      abonnes,
      " client(s) qui ont accept\xE9 les bons plans.",
      " ",
      "\xC9vitez d'en envoyer trop souvent, sinon les clients les d\xE9sactivent.",
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 8 } },
      React.default.createElement(
        "button",
        { className: "btn gh", style: { flex: 1 }, onClick: onAnnuler },
        "Annuler",
      ),
      React.default.createElement(
        "button",
        {
          className: "btn",
          style: { flex: 2 },
          disabled: !o.trim() || !u.trim() || h || !abonnes,
          onClick: m,
        },
        h ? "Envoi\u2026" : "Envoyer la notification",
      ),
    ),
  );
}
function texteGaspi(t, e) {
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
function PrevenirClients({ d: t }) {
  let e = bw(t),
    n = gN(e),
    [r, i] = (0, React.useState)([]),
    [s, o] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(
      () =>
        e
          ? onSnapshot(
              collection(db2, "diffusions"),
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
      ? React.default.createElement(
          "div",
          { className: "card" },
          React.default.createElement(
            "div",
            { className: "row" },
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, "\u{1F4E3} Pr\xE9venir mes clients"),
              React.default.createElement(
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
              React.default.createElement(
                "button",
                { className: "btn sm", style: { width: "auto" }, disabled: !n.promo, onClick: () => o(!0) },
                "\xC9crire",
              ),
          ),
          s &&
            React.default.createElement(EnvoiNotification, {
              d: t,
              abonnes: n.promo,
              onFini: () => o(!1),
              onAnnuler: () => o(!1),
            }),
          !!r.length &&
            React.default.createElement(
              "div",
              { style: { marginTop: 10 } },
              r.slice(0, 3).map((a) =>
                React.default.createElement(
                  "div",
                  {
                    key: a.id,
                    className: "de",
                    style: { padding: "4px 0", borderTop: "1px solid var(--line)" },
                  },
                  React.default.createElement("b", null, a.titre),
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
function Statistiques({ d: t }) {
  let e = t.commandes.filter((m) => !["refusee", "annulee"].includes(m.statut)),
    n = new Date(),
    r = Array.from({ length: 6 }, (m, w) => {
      let E = new Date(n.getFullYear(), n.getMonth() - 5 + w, 1);
      return { cle: pw(E), nom: E.toLocaleDateString("fr-FR", { month: "short" }) };
    }),
    i = Object.fromEntries(r.map((m) => [m.cle, { n: 0, ca: 0, r: 0 }]));
  e.forEach((m) => {
    let w = pw(m.cree || 0);
    i[w] && (i[w].n++, (i[w].ca += Number(m.total) || 0));
  }),
    t.resas
      .filter((m) => !["annulee", "absent"].includes(m.statut))
      .forEach((m) => {
        let w = pw(m.cree || 0);
        i[w] && i[w].r++;
      });
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
  return React.default.createElement(
    "div",
    { className: "card stats" },
    React.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 10 } },
      "\u{1F4CA} Ce mois-ci",
    ),
    React.default.createElement(
      "div",
      { className: "grid2", style: { marginBottom: 12 } },
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, s.n),
        React.default.createElement(
          "span",
          null,
          "commandes de plateaux ",
          React.default.createElement("i", null, p(s.n, o.n)),
        ),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, An(s.ca).replace(",00", "")),
        React.default.createElement(
          "span",
          null,
          "de plateaux ",
          React.default.createElement("i", null, p(s.ca, o.ca)),
        ),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement("b", null, s.r),
        React.default.createElement("span", null, "r\xE9servations anti-gaspi"),
      ),
      React.default.createElement(
        "div",
        { className: "stat" },
        React.default.createElement(
          "b",
          null,
          t.conversations.filter((m) => (m.maj || 0) > Date.now() - 30 * 864e5).length,
        ),
        React.default.createElement("span", null, "conversations (30 j)"),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 4 } },
      "Plateaux command\xE9s sur 6 mois (\u20AC)",
    ),
    React.default.createElement(
      "div",
      { className: "barres" },
      r.map((m) => {
        let w = i[m.cle];
        return React.default.createElement(
          "div",
          { className: "bcol", key: m.cle, title: w.n + " commande(s) \xB7 " + An(w.ca) },
          React.default.createElement("span", { className: "bv" }, w.ca ? Math.round(w.ca) : ""),
          React.default.createElement("i", { style: { height: Math.max(3, (w.ca / a) * 90) + "px" } }),
          React.default.createElement("span", { className: "bm" }, m.nom),
        );
      }),
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 } },
      React.default.createElement(
        "div",
        { style: { flex: "1 1 200px" } },
        React.default.createElement(
          "div",
          { className: "de", style: { fontWeight: 800 } },
          "Plateaux les plus demand\xE9s (3 mois)",
        ),
        d.length
          ? d.map(([m, w], E) =>
              React.default.createElement(
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
          : React.default.createElement("div", { className: "de" }, "Pas encore de commande."),
      ),
      React.default.createElement(
        "div",
        { style: { flex: "1 1 200px" } },
        React.default.createElement(
          "div",
          { className: "de", style: { fontWeight: 800 } },
          "Vos clients dans l'appli",
        ),
        React.default.createElement(
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
function Fermetures({ d: t, set: set }) {
  let n = Array.isArray(t.fermetures) ? t.fermetures : [],
    [f, setF] = (0, React.useState)({ du: "", au: "", motif: "" }),
    s = Bn(),
    o = () => {
      f.du &&
        (set("fermetures", (a) =>
          [
            ...(Array.isArray(a) ? a : []),
            { du: f.du, au: f.au && f.au >= f.du ? f.au : f.du, motif: f.motif.trim().slice(0, 40) },
          ].sort((u, d) => u.du.localeCompare(d.du)),
        ),
        setF({ du: "", au: "", motif: "" }));
    };
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 4px" } },
      "Fermetures exceptionnelles",
    ),
    React.default.createElement(
      "div",
      { className: "sub", style: { margin: "0 0 8px" } },
      "Cong\xE9s, jours f\xE9ri\xE9s\u2026 Saisissez-les une fois : l'application affiche un bandeau 14 jours avant, indique \xAB Ferm\xE9 \xBB et bloque les commandes ces jours-l\xE0.",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      n
        .filter((a) => (a.au || a.du) >= s)
        .map((a, u) =>
          React.default.createElement(
            "div",
            { className: "tog", key: a.du + u },
            React.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              a.du === a.au ? "Le " + dateCourte(a.du) : "Du " + dateCourte(a.du) + " au " + dateCourte(a.au),
              a.motif ? " \xB7 " + a.motif : "",
              a.du <= s &&
                React.default.createElement(
                  "span",
                  { className: "pill promo", style: { marginLeft: 6 } },
                  "En cours",
                ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: () =>
                    set("fermetures", (d) =>
                      (d || []).filter((h) => !(h.du === a.du && h.au === a.au && h.motif === a.motif)),
                    ),
                },
                I10.bin(),
              ),
            ),
          ),
        ),
      !n.some((a) => (a.au || a.du) >= s) &&
        React.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 8 } },
          "Aucune fermeture pr\xE9vue.",
        ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 } },
        React.default.createElement(
          "div",
          { style: { flex: "1 1 130px" } },
          React.default.createElement("label", { className: "lab" }, "Du"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            min: s,
            value: f.du,
            onChange: (a) => setF({ ...f, du: a.target.value }),
          }),
        ),
        React.default.createElement(
          "div",
          { style: { flex: "1 1 130px" } },
          React.default.createElement("label", { className: "lab" }, "Au (facultatif)"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            min: f.du || s,
            value: f.au,
            onChange: (a) => setF({ ...f, au: a.target.value }),
          }),
        ),
        React.default.createElement(
          "div",
          { style: { flex: "2 1 180px" } },
          React.default.createElement("label", { className: "lab" }, "Motif (facultatif)"),
          React.default.createElement("input", {
            className: "inp",
            value: f.motif,
            maxLength: 40,
            placeholder: "Cong\xE9s d'\xE9t\xE9, 11 novembre\u2026",
            onChange: (a) => setF({ ...f, motif: a.target.value }),
          }),
        ),
      ),
      React.default.createElement(
        "button",
        { className: "btn sm", style: { marginTop: 8 }, disabled: !f.du, onClick: o },
        "Ajouter la fermeture",
      ),
    ),
  );
}
function Jour({ d: t, set: set }) {
  let [n, r] = (0, React.useState)(""),
    [i, s] = (0, React.useState)(""),
    [o, a] = (0, React.useState)(""),
    [u, d] = (0, React.useState)("frais"),
    [h, p] = (0, React.useState)(""),
    [m, w] = (0, React.useState)({ debut: "", fin: "" }),
    [E, A] = (0, React.useState)(!1),
    [S, _] = (0, React.useState)(null),
    [I, T] = (0, React.useState)({ stock: 0, retrait: "" }),
    [M, V] = (0, React.useState)(null),
    O = bw(t),
    b = gN(O),
    v = t.jour?.items || [],
    x = (k) => k === "promo" || k === "gaspi" || k === "panier",
    C = (k) => set("jour", ($) => ({ items: k($?.items || []), maj: aujourdhui2() })),
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
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Aujourd'hui"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Le c\u0153ur de l'application : ce qui change chaque jour. Un titre, un prix, c'est publi\xE9. Comptez 20 secondes.",
    ),
    React.default.createElement(Reservations, { d: t }),
    React.default.createElement(
      "div",
      { className: "card", style: { background: "#FBF8F1" } },
      React.default.createElement("label", { className: "lab" }, "Quoi de neuf ?"),
      React.default.createElement("input", {
        className: "inp",
        value: n,
        onChange: (k) => r(k.target.value),
        onKeyDown: (k) => k.key === "Enter" && F(),
        placeholder: "Fraises de Bergerac, lasagnes maison\u2026",
      }),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, marginTop: 8 } },
        React.default.createElement("input", {
          className: "inp",
          style: { flex: 1 },
          type: "number",
          inputMode: "decimal",
          step: "0.01",
          value: i,
          onChange: (k) => s(k.target.value),
          placeholder: "Prix (facultatif)",
        }),
        React.default.createElement("input", {
          className: "inp",
          style: { width: 108 },
          value: o,
          onChange: (k) => a(k.target.value),
          placeholder: "kg, part\u2026",
        }),
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 6, marginTop: 9, flexWrap: "wrap" } },
        TYPES.map((k) =>
          React.default.createElement(
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
        React.default.createElement(
          "div",
          { style: { marginTop: 9 } },
          React.default.createElement("label", { className: "lab" }, "Prix avant (barr\xE9)"),
          React.default.createElement("input", {
            className: "inp",
            type: "number",
            inputMode: "decimal",
            step: "0.01",
            value: h,
            onChange: (k) => p(k.target.value),
            placeholder: "Facultatif",
          }),
        ),
      x(u) && React.default.createElement(ChampsResa, { v: I, onChange: T }),
      u === "panier" &&
        !n &&
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 4 } },
          "Ex : \xAB Panier surprise fruits & l\xE9gumes \xBB, prix 5 \u20AC, prix avant 15 \u20AC (valeur).",
        ),
      E || x(u)
        ? React.default.createElement(
            "div",
            { style: { marginTop: 9 } },
            React.default.createElement(Periode, { v: m, onChange: w }),
          )
        : React.default.createElement(
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
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 10 }, disabled: !n.trim(), onClick: F },
        I10.plus(),
        "Publier",
      ),
    ),
    !v.length &&
      React.default.createElement(Vn, {
        t: "Rien pour aujourd'hui",
        s: "Ajoutez au moins un article : c'est ce que vos clients regardent en ouvrant l'application.",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      v.map((k) => {
        let $ = TYPES.find((Q) => Q.id === k.type) || TYPES[0];
        return React.default.createElement(
          "div",
          { className: "card", key: k.id },
          React.default.createElement(
            "div",
            { className: "row" },
            k.photo
              ? React.default.createElement("img", { className: "thumb", src: k.photo, alt: "" })
              : React.default.createElement("div", {
                  style: { width: 6, alignSelf: "stretch", borderRadius: 4, background: $.c, flexShrink: 0 },
                }),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, k.titre),
              React.default.createElement(
                "div",
                { className: "de", style: { color: $.c, fontWeight: 700 } },
                $.label,
                k.prix !== "" && k.prix != null
                  ? " \xB7 " + Number(k.prix).toFixed(2) + " \u20AC" + (k.unite ? " / " + k.unite : "")
                  : "",
                !!k.ancienPrix &&
                  React.default.createElement(
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
              k.note && React.default.createElement("div", { className: "de" }, k.note),
              (parseInt(k.stock) || 0) > 0 &&
                React.default.createElement(
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
              React.default.createElement(Pastille, { x: k, style: { marginTop: 5 } }),
              O &&
                x(k.type) &&
                k.active !== !1 &&
                React.default.createElement(
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
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: k.active !== !1,
                set: () => C((Q) => Q.map((Y) => (Y.id === k.id ? { ...Y, active: Y.active === !1 } : Y))),
              }),
              React.default.createElement("button", { className: "ib", onClick: () => _(k) }, I10.pen()),
              React.default.createElement(
                "button",
                { className: "ib", onClick: () => C((Q) => Q.filter((Y) => Y.id !== k.id)) },
                I10.bin(),
              ),
            ),
          ),
        );
      }),
    ),
    !!v.length &&
      React.default.createElement(
        "button",
        {
          className: "btn gh",
          style: { marginTop: 6, color: "var(--red)" },
          onClick: async () => (await De("Vider la liste du jour ?")) && C(() => []),
        },
        "Vider la liste du jour",
      ),
    M &&
      React.default.createElement(
        ut,
        { titre: "\u{1F4E3} Pr\xE9venir mes clients", onClose: () => V(null) },
        React.default.createElement(
          "div",
          { className: "de" },
          "Le message est pr\xEAt, vous pouvez le modifier avant d'envoyer.",
        ),
        React.default.createElement(EnvoiNotification, {
          d: t,
          abonnes: b.promo,
          ...(({ titre: titre, texte: texte }) => ({ titre0: titre, texte0: texte }))(texteGaspi(M, t)),
          onFini: () => V(null),
          onAnnuler: () => V(null),
        }),
      ),
    S &&
      React.default.createElement(
        ut,
        { titre: "Modifier l'article", onClose: () => _(null) },
        React.default.createElement(PhotoField, {
          value: S.photo,
          onChange: (k) => _(($) => ({ ...$, photo: k })),
        }),
        React.default.createElement("label", { className: "lab" }, "Titre"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: S.titre,
          onChange: (k) => _({ ...S, titre: k.target.value }),
        }),
        React.default.createElement("label", { className: "lab" }, "Pr\xE9cision (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: S.note,
          onChange: (k) => _({ ...S, note: k.target.value }),
          placeholder:
            S.type === "panier"
              ? "Contenu : fruits, l\xE9gumes, laitages du jour\u2026"
              : "Dernier jour, quantit\xE9 limit\xE9e\u2026",
        }),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1 } },
            React.default.createElement("label", { className: "lab" }, "Prix (\u20AC)"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "decimal",
              step: "0.01",
              value: S.prix,
              onChange: (k) => _({ ...S, prix: k.target.value }),
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1 } },
            React.default.createElement("label", { className: "lab" }, "Unit\xE9"),
            React.default.createElement("input", {
              className: "inp",
              value: S.unite,
              onChange: (k) => _({ ...S, unite: k.target.value }),
            }),
          ),
        ),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1 } },
            React.default.createElement("label", { className: "lab" }, "Prix avant (barr\xE9)"),
            React.default.createElement("input", {
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
        React.default.createElement(Periode, { v: S, onChange: _ }),
        x(S.type) && React.default.createElement(ChampsResa, { v: S, onChange: _ }),
        React.default.createElement("label", { className: "lab" }, "Cat\xE9gorie"),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 6, flexWrap: "wrap" } },
          TYPES.map((k) =>
            React.default.createElement(
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
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: P },
          "Enregistrer",
        ),
      ),
  );
}
function Offres({ d: d, set: set }) {
  let [m, setM] = (0, React.useState)(null),
    i = () => {
      m.titre?.trim() &&
        (set("offres", (s) => (m.id ? s.map((o) => (o.id === m.id ? m : o)) : [...s, { ...m, id: Wr() }])),
        setM(null));
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Paniers & plateaux"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Vos plateaux, paniers garnis et corbeilles de fruits, avec photo et prix. Regroupez-les par type.",
    ),
    React.default.createElement(
      "button",
      {
        className: "btn terra",
        onClick: () =>
          setM({
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
      I10.plus(),
      "Nouvelle offre",
    ),
    React.default.createElement("div", { style: { height: 12 } }),
    !d.offres.length &&
      React.default.createElement(Vn, {
        t: "Aucune offre",
        s: "Ajoutez par exemple \xAB Plateau ap\xE9ritif 4-6 personnes \xBB avec sa photo : c'est ce que vos clients regardent en premier.",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      d.offres.map((s) =>
        React.default.createElement(
          "div",
          { className: "card", key: s.id },
          React.default.createElement(
            "div",
            { className: "row" },
            s.photo
              ? React.default.createElement("img", { className: "thumb", src: s.photo, alt: "" })
              : React.default.createElement("div", { className: "thumb" }),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, s.titre),
              React.default.createElement(
                "div",
                { className: "de" },
                s.type,
                s.portions ? " \xB7 " + s.portions : "",
              ),
              React.default.createElement(
                "div",
                { style: { marginTop: 5 } },
                React.default.createElement(Pastille, { x: s, fem: !0 }),
                React.default.createElement(
                  "span",
                  { style: { fontSize: 13, fontWeight: 800, color: "var(--apple)", marginLeft: 6 } },
                  s.prix ? Number(s.prix).toFixed(2) + " \u20AC" : "Sur devis",
                ),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement("button", { className: "ib", onClick: () => setM(s) }, I10.pen()),
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer \xAB " + s.titre + " \xBB ?")) &&
                    set("offres", (o) => o.filter((a) => a.id !== s.id)),
                },
                I10.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    m &&
      React.default.createElement(
        ut,
        { titre: m.id ? "Modifier l'offre" : "Nouvelle offre", onClose: () => setM(null) },
        React.default.createElement(PhotoField, {
          value: m.photo,
          onChange: (s) => setM((o) => ({ ...o, photo: s })),
        }),
        React.default.createElement("label", { className: "lab" }, "Titre"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: m.titre,
          onChange: (s) => setM({ ...m, titre: s.target.value }),
          placeholder: "Plateau charcuterie & fromages",
        }),
        React.default.createElement("label", { className: "lab" }, "Composition"),
        React.default.createElement("textarea", {
          className: "inp",
          value: m.desc,
          onChange: (s) => setM({ ...m, desc: s.target.value }),
          placeholder: "Comt\xE9, morbier, saucisson, jambon sec, raisins\u2026",
        }),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1 } },
            React.default.createElement("label", { className: "lab" }, "Prix (\u20AC)"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "decimal",
              step: "0.01",
              value: m.prix,
              onChange: (s) => setM({ ...m, prix: s.target.value }),
              placeholder: "Laisser vide = sur devis",
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1 } },
            React.default.createElement("label", { className: "lab" }, "Pour"),
            React.default.createElement("input", {
              className: "inp",
              value: m.portions,
              onChange: (s) => setM({ ...m, portions: s.target.value }),
              placeholder: "4-6 pers.",
            }),
          ),
        ),
        React.default.createElement("label", { className: "lab" }, "Type (sert de titre de section)"),
        React.default.createElement("input", {
          className: "inp",
          value: m.type,
          onChange: (s) => setM({ ...m, type: s.target.value }),
          placeholder: "Plateaux / Paniers garnis / Corbeilles",
        }),
        React.default.createElement("label", { className: "lab" }, "Pastille (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: m.badge,
          onChange: (s) => setM({ ...m, badge: s.target.value }),
          placeholder: "Nouveau, F\xEAtes\u2026",
        }),
        React.default.createElement(Periode, { v: m, onChange: setM }),
        React.default.createElement(
          "div",
          { className: "tog", style: { marginTop: 6 } },
          React.default.createElement(
            "span",
            { style: { fontSize: 13, fontWeight: 700 } },
            "Visible par les clients",
          ),
          React.default.createElement(
            "div",
            { className: "rt" },
            React.default.createElement(ze, {
              on: m.active !== !1,
              set: () => setM({ ...m, active: m.active === !1 }),
            }),
          ),
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 12 }, onClick: i },
          "Enregistrer",
        ),
      ),
  );
}
var STATUTS_COMMANDE = [
    { id: "nouvelle", label: "\xC0 valider", c: "#C27B42", bg: "#FBEFE4" },
    { id: "acceptee", label: "Accept\xE9e", c: "#4C6B27", bg: "#EEF3E2" },
    { id: "prep", label: "En pr\xE9paration", c: "#B08A2E", bg: "#FAF2DC" },
    { id: "prete", label: "Pr\xEAte", c: "#6E9B3A", bg: "#EEF3E2" },
    { id: "remise", label: "Remise au client", c: "#1C433B", bg: "#E4EDE9" },
    { id: "refusee", label: "Refus\xE9e", c: "#B2563F", bg: "#F7E4DF" },
    { id: "annulee", label: "Annul\xE9e", c: "#93A099", bg: "#F0EEE8" },
  ],
  ETAPE_SUIVANTE = {
    acceptee: ["prep", "Commencer la pr\xE9paration"],
    prep: ["prete", "Marquer pr\xEAte (le client est pr\xE9venu)"],
    prete: ["remise", "Marquer remise au client"],
  },
  enCoursCmd = (t) => !["remise", "annulee", "refusee"].includes(t.statut),
  MOTIFS_REFUS = [
    "Complet ce jour-l\xE0",
    "D\xE9lai trop court",
    "Produits indisponibles",
    "\xC9picerie ferm\xE9e ce jour-l\xE0",
  ];
function Decision({ c: c, type: type, d: n, onClose: onClose, onValider: onValider }) {
  let s = Er(n.cmd),
    [date, setDate] = (0, React.useState)(er(c)),
    [heure, setHeure] = (0, React.useState)(c.heure || s.heureDefaut || "17:00"),
    [msg, setMsg] = (0, React.useState)(c.message || ""),
    m = c.mode === "livraison";
  return type === "refus"
    ? React.default.createElement(
        ut,
        { titre: "Refuser la commande", onClose: onClose },
        React.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 10 } },
          c.nom,
          " sera pr\xE9venu dans l'application. Indiquez-lui pourquoi :",
        ),
        React.default.createElement(
          "div",
          { className: "motifs" },
          MOTIFS_REFUS.map((w) =>
            React.default.createElement(
              "button",
              { key: w, className: msg === w ? "on" : "", onClick: () => setMsg(w) },
              w,
            ),
          ),
        ),
        React.default.createElement(
          "label",
          { className: "lab", style: { marginTop: 10 } },
          "Message au client",
        ),
        React.default.createElement("textarea", {
          className: "inp",
          value: msg,
          onChange: (w) => setMsg(w.target.value),
          maxLength: 300,
          placeholder: "Ex : D\xE9sol\xE9e, nous sommes complets samedi. Appelez-nous pour une autre date !",
        }),
        React.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 12, background: "var(--red)" },
            onClick: () => onValider({ statut: "refusee", message: msg.trim(), decision: Date.now() }),
          },
          "Refuser et pr\xE9venir le client",
        ),
      )
    : React.default.createElement(
        ut,
        {
          titre: c.statut === "nouvelle" ? "Accepter la commande" : "Modifier le rendez-vous",
          onClose: onClose,
        },
        React.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 10 } },
          "Choisissez ",
          m
            ? "l'heure de livraison"
            : "l'heure \xE0 laquelle " + c.nom.split(" ")[0] + " peut venir la chercher",
          ". Il sera pr\xE9venu dans l'application et pourra mettre un rappel.",
        ),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, m ? "Livraison le" : "Retrait le"),
            React.default.createElement("input", {
              className: "inp",
              type: "date",
              value: date,
              onChange: (w) => setDate(w.target.value || er(c)),
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "\xC0"),
            React.default.createElement("input", {
              className: "inp",
              type: "time",
              step: "900",
              value: heure,
              onChange: (w) => setHeure(w.target.value),
            }),
          ),
        ),
        date !== c.date &&
          React.default.createElement(
            "div",
            { className: "cmd-alerte" },
            "Le client avait demand\xE9 le ",
            dateCourte(c.date),
            ". Pensez \xE0 le lui pr\xE9ciser dans le message.",
          ),
        React.default.createElement(
          "div",
          { className: "motifs", style: { marginTop: 10 } },
          ["08:00", "10:00", "12:00", "16:00", "17:00", "18:00"].map((w) =>
            React.default.createElement(
              "button",
              { key: w, className: heure === w ? "on" : "", onClick: () => setHeure(w) },
              lc(w),
            ),
          ),
        ),
        React.default.createElement(
          "label",
          { className: "lab", style: { marginTop: 10 } },
          "Petit mot au client (facultatif)",
        ),
        React.default.createElement("textarea", {
          className: "inp",
          value: msg,
          onChange: (w) => setMsg(w.target.value),
          maxLength: 300,
          placeholder: "Ex : Merci ! Votre plateau sera pr\xEAt, \xE0 samedi.",
        }),
        React.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 12 },
            disabled: !heure || !date,
            onClick: () =>
              onValider({
                statut: c.statut === "nouvelle" ? "acceptee" : c.statut,
                dateRetrait: date,
                heure: heure,
                message: msg.trim(),
                decision: c.decision || Date.now(),
              }),
          },
          c.statut === "nouvelle"
            ? "Accepter \u2014 " + dateCourte(date) + " \xE0 " + lc(heure)
            : "Enregistrer",
        ),
      );
}
var yN = (t) => Math.round((new Date(t + "T12:00") - new Date(Bn() + "T12:00")) / 864e5),
  quand = (t) => {
    let e = yN(t);
    return e === 0
      ? "aujourd'hui"
      : e === 1
        ? "demain"
        : e < 0
          ? "en retard de " + -e + " j"
          : "dans " + e + " jours";
  };
function Commandes({ d: d, set: set }) {
  let [vue, setVue] = (0, React.useState)("cmd"),
    i = d.commandes.filter((s) => s.statut === "nouvelle").length;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Commandes"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Les plateaux command\xE9s par vos clients depuis l'application.",
    ),
    React.default.createElement(
      "div",
      { className: "seg" },
      React.default.createElement(
        "button",
        { className: vue === "cmd" ? "on" : "", onClick: () => setVue("cmd") },
        "Commandes",
        i ? " (" + i + ")" : "",
      ),
      React.default.createElement(
        "button",
        { className: vue === "plateaux" ? "on" : "", onClick: () => setVue("plateaux") },
        "Plateaux",
      ),
      React.default.createElement(
        "button",
        { className: vue === "regl" ? "on" : "", onClick: () => setVue("regl") },
        "Calendrier",
      ),
    ),
    vue === "cmd" && React.default.createElement(ListeCommandes, { d: d, set: set }),
    vue === "plateaux" && React.default.createElement(Plateaux, { d: d, set: set }),
    vue === "regl" && React.default.createElement(ReglagesCmd, { d: d, set: set }),
  );
}
function ListeCommandes({ d: t, set: set }) {
  let [n, r] = (0, React.useState)("encours"),
    [i, s] = (0, React.useState)(null),
    [o, a] = (0, React.useState)(null),
    u = (E) => (E.statut === "nouvelle" ? "0" : "1") + (er(E) || "") + (E.heure || ""),
    d = t.commandes
      .filter((E) => (n === "encours" ? enCoursCmd(E) : !enCoursCmd(E)))
      .sort((E, A) =>
        n === "encours"
          ? u(E).localeCompare(u(A)) || (E.cree || 0) - (A.cree || 0)
          : (er(A) || "").localeCompare(er(E) || ""),
      ),
    h = async (E, A) => {
      (await set("commandes", (S) => S.map((_) => (_.id === E.id ? { ..._, ...A } : _)))) &&
        avertirMessage(t.cmd, "cmd", E.id);
    },
    p = async (E, A) => {
      (await set("commandes", (S) => S.map((_) => (_.id === E.id ? { ..._, statut: A } : _)))) &&
        ["acceptee", "refusee", "prete"].includes(A) &&
        avertirMessage(t.cmd, "cmd", E.id);
    },
    m = (() => {
      let E = new Date();
      return E.setFullYear(E.getFullYear() - 1), E.toLocaleDateString("sv-SE");
    })(),
    w = t.commandes.filter((E) => !enCoursCmd(E) && (er(E) || "") < m);
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(BoutonPreparation, { d: t }),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 8, marginBottom: 12 } },
      [
        ["encours", "\xC0 pr\xE9parer (" + t.commandes.filter(enCoursCmd).length + ")"],
        ["terminees", "Termin\xE9es"],
      ].map(([E, A]) =>
        React.default.createElement(
          "button",
          { key: E, className: "btn sm " + (n === E ? "" : "gh"), style: { flex: 1 }, onClick: () => r(E) },
          A,
        ),
      ),
    ),
    !d.length &&
      React.default.createElement(Vn, {
        t: n === "encours" ? "Aucune commande \xE0 pr\xE9parer" : "Aucune commande termin\xE9e",
        s:
          n === "encours"
            ? "Les commandes pass\xE9es par vos clients appara\xEEtront ici, tri\xE9es par date de retrait."
            : "",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      d.map((E) => {
        let A = STATUTS_COMMANDE.find((_) => _.id === E.statut) || STATUTS_COMMANDE[0],
          S = (E.lignes || []).reduce((_, I) => {
            let T = t.plateaux.find((M) => String(M.id) === String(I.id));
            return _ + (T ? I.personnes * XS(T, I.choix || []) : I.montant);
          }, 0);
        return React.default.createElement(
          "div",
          { className: "card cmd", key: E.id, style: { borderLeft: "4px solid " + A.c } },
          React.default.createElement(
            "div",
            { className: "row", style: { alignItems: "flex-start" } },
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement(
                "div",
                { className: "nm", style: { fontSize: 15 } },
                dateCourte(er(E)),
                E.heure && " \xE0 " + lc(E.heure),
              ),
              React.default.createElement(
                "div",
                {
                  className: "de",
                  style: {
                    fontWeight: 800,
                    color: yN(er(E)) < 0 && enCoursCmd(E) ? "var(--red)" : "var(--ink2)",
                  },
                },
                MODES[E.mode] || E.mode,
                " \xB7 ",
                quand(er(E)),
                E.statut === "nouvelle" && " \xB7 demand\xE9e par le client",
              ),
            ),
            React.default.createElement(
              "span",
              {
                className: "pill",
                style: { marginLeft: "auto", background: A.bg, color: A.c, whiteSpace: "nowrap" },
              },
              A.label,
            ),
          ),
          React.default.createElement(
            "div",
            { className: "cmd-cli" },
            React.default.createElement("b", null, E.nom),
            E.carte && React.default.createElement("span", { className: "de" }, " \xB7 carte ", E.carte),
            React.default.createElement("br", null),
            React.default.createElement("a", { href: "tel:" + (E.tel || "").replace(/\s/g, "") }, E.tel),
            E.adresse &&
              React.default.createElement(
                "div",
                { className: "de", style: { marginTop: 3 } },
                "\u{1F4CD} ",
                E.adresse,
              ),
          ),
          React.default.createElement(
            "div",
            { className: "cmd-lignes" },
            (E.lignes || []).map((_, I) =>
              React.default.createElement(
                "div",
                { key: I },
                React.default.createElement(
                  "span",
                  null,
                  _.nom,
                  " \u2014 ",
                  React.default.createElement("b", null, _.personnes, " pers."),
                  " \xD7 ",
                  An(_.prixPersonne),
                ),
                React.default.createElement("b", { style: { whiteSpace: "nowrap" } }, An(_.montant)),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "tot" },
              React.default.createElement("span", null, "Total"),
              React.default.createElement("b", null, An(E.total)),
            ),
          ),
          Math.abs(S - E.total) > 0.01 &&
            React.default.createElement(
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
                ? React.default.createElement("div", { key: I, className: "cmd-allerg" }, _)
                : React.default.createElement("div", { key: I, className: "cmd-rq" }, "\xAB ", _, " \xBB"),
            ),
          E.message &&
            E.statut !== "nouvelle" &&
            React.default.createElement(
              "div",
              { className: "cmd-rq", style: { fontStyle: "normal" } },
              "Votre message : \xAB ",
              E.message,
              " \xBB",
            ),
          React.default.createElement(
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
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 8, marginTop: 10 } },
              React.default.createElement(
                "button",
                { className: "btn", style: { flex: 2 }, onClick: () => s({ c: E, type: "ok" }) },
                "\u2713 Accepter",
              ),
              React.default.createElement(
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
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" } },
              ETAPE_SUIVANTE[E.statut] &&
                React.default.createElement(
                  "button",
                  {
                    className: "btn sm",
                    style: { flex: 2 },
                    onClick: () => p(E, ETAPE_SUIVANTE[E.statut][0]),
                  },
                  ETAPE_SUIVANTE[E.statut][1],
                ),
              ["acceptee", "prep", "prete"].includes(E.statut) &&
                React.default.createElement(
                  "button",
                  { className: "btn gh sm", onClick: () => s({ c: E, type: "ok" }) },
                  "Changer l'heure",
                ),
              React.default.createElement(
                "select",
                {
                  className: "inp sel",
                  value: E.statut,
                  onChange: (_) => p(E, _.target.value),
                  "aria-label": "Changer le statut",
                },
                STATUTS_COMMANDE.map((_) =>
                  React.default.createElement("option", { key: _.id, value: _.id }, _.label),
                ),
              ),
            ),
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" } },
            React.default.createElement(
              "button",
              { className: "btn gh sm", style: { width: "auto" }, onClick: () => a(E) },
              "\u{1F4AC} \xC9crire au client",
              E.conv ? " (conversation en cours)" : "",
            ),
            React.default.createElement(
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
                  )) && set("commandes", (_) => _.filter((I) => I.id !== E.id)),
              },
              I10.bin(),
              "Supprimer",
            ),
          ),
        );
      }),
    ),
    o &&
      React.default.createElement(EcrireAuClient, { d: t, cible: "commandes", x: o, onClose: () => a(null) }),
    i &&
      React.default.createElement(Decision, {
        c: i.c,
        type: i.type,
        d: t,
        onClose: () => s(null),
        onValider: (E) => {
          h(i.c, E), s(null);
        },
      }),
    n === "terminees" &&
      !!w.length &&
      React.default.createElement(
        "button",
        {
          className: "btn gh",
          style: { marginTop: 10, color: "var(--red)" },
          onClick: async () =>
            (await De("Supprimer les " + w.length + " commande(s) termin\xE9e(s) depuis plus d'un an ?")) &&
            set("commandes", (E) => E.filter((A) => !w.some((S) => S.id === A.id))),
        },
        "Supprimer les commandes de plus d'un an (",
        w.length,
        ")",
      ),
    n === "terminees" &&
      React.default.createElement(
        "div",
        { className: "de", style: { marginTop: 8 } },
        "Donn\xE9es personnelles (RGPD) : les commandes sont gard\xE9es 1 an apr\xE8s leur date, puis \xE0 supprimer avec ce bouton.",
      ),
  );
}
function Plateaux({ d: t, set: set }) {
  let [m, setM] = (0, React.useState)(null),
    i = () => {
      if (!m.nom?.trim() || !(Ji(m) > 0)) return ft("Indiquez au moins le nom et le prix par personne.");
      let [a] = If(m),
        u = {
          ...m,
          nom: m.nom.trim(),
          prixPersonne: String(m.prixPersonne).replace(",", "."),
          partsMin: String(a),
          partsMax: m.partsMax ? String(Math.max(a, parseInt(m.partsMax) || a)) : "",
        };
      set("plateaux", (d) => (m.id ? d.map((h) => (h.id === m.id ? u : h)) : [...d, { ...u, id: Wr() }])),
        setM(null);
    },
    [s, o] = m ? If(m) : [0, 0];
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "button",
      {
        className: "btn terra",
        onClick: () =>
          setM({
            nom: "",
            composition: "",
            prixPersonne: "",
            partsMin: "4",
            partsMax: "",
            photo: "",
            active: !0,
          }),
      },
      I10.plus(),
      "Nouveau plateau",
    ),
    React.default.createElement("div", { style: { height: 12 } }),
    !t.plateaux.length &&
      React.default.createElement(Vn, {
        t: "Aucun plateau",
        s: "Cr\xE9ez par exemple \xAB Plateau charcuterie \xBB \xE0 8,50 \u20AC par personne, \xE0 partir de 4 personnes. Vos clients pourront le commander directement.",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      t.plateaux.map((a) => {
        let [u, d] = If(a);
        return React.default.createElement(
          "div",
          { className: "card", key: a.id },
          React.default.createElement(
            "div",
            { className: "row" },
            a.photo
              ? React.default.createElement("img", { className: "thumb", src: a.photo, alt: "" })
              : React.default.createElement("div", { className: "thumb" }),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, a.nom),
              React.default.createElement(
                "div",
                { className: "de" },
                a.partsMax ? u + " \xE0 " + d + " parts" : "\xC0 partir de " + u + " parts",
                kf(a) ? " \xB7 " + kf(a).options.length + " choix" : "",
              ),
              React.default.createElement(
                "div",
                { style: { marginTop: 5 } },
                React.default.createElement(Pastille, { x: a }),
                React.default.createElement(
                  "span",
                  { style: { fontSize: 13, fontWeight: 800, color: "var(--apple)", marginLeft: 6 } },
                  An(Ji(a)),
                  " / pers.",
                ),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement("button", { className: "ib", onClick: () => setM(a) }, I10.pen()),
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer \xAB " + a.nom + " \xBB ?")) &&
                    set("plateaux", (h) => h.filter((p) => p.id !== a.id)),
                },
                I10.bin(),
              ),
            ),
          ),
        );
      }),
    ),
    m &&
      React.default.createElement(
        ut,
        { titre: m.id ? "Modifier le plateau" : "Nouveau plateau", onClose: () => setM(null) },
        React.default.createElement(PhotoField, {
          value: m.photo,
          onChange: (a) => setM((u) => ({ ...u, photo: a })),
        }),
        React.default.createElement("label", { className: "lab" }, "Nom du plateau"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: m.nom,
          onChange: (a) => setM({ ...m, nom: a.target.value }),
          placeholder: "Plateau charcuterie",
          maxLength: 80,
        }),
        React.default.createElement("label", { className: "lab" }, "Ce qu'il y a dedans"),
        React.default.createElement("textarea", {
          className: "inp",
          rows: 4,
          value: m.composition,
          onChange: (a) => setM({ ...m, composition: a.target.value }),
          placeholder: `Jambon cru, rosette, terrine maison,
saucisson de Franche-Comt\xE9, cornichons, pain`,
        }),
        React.default.createElement("label", { className: "lab" }, "Prix par personne (\u20AC)"),
        React.default.createElement("input", {
          className: "inp",
          type: "number",
          inputMode: "decimal",
          step: "0.10",
          min: "0",
          value: m.prixPersonne,
          onChange: (a) => setM({ ...m, prixPersonne: a.target.value }),
          placeholder: "8.50",
        }),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Nombre de parts minimum"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "1",
              value: m.partsMin,
              onChange: (a) => setM({ ...m, partsMin: a.target.value }),
              placeholder: "4",
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Maximum (facultatif)"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "1",
              value: m.partsMax,
              onChange: (a) => setM({ ...m, partsMax: a.target.value }),
              placeholder: "Sans limite",
            }),
          ),
        ),
        Ji(m) > 0 &&
          React.default.createElement(
            "div",
            { className: "apercu-prix" },
            "Exemple : ",
            s,
            " pers. \xD7 ",
            An(Ji(m)),
            " = ",
            React.default.createElement("b", null, An(s * Ji(m))),
            m.partsMax &&
              o > s &&
              React.default.createElement(
                React.default.Fragment,
                null,
                " \xB7 ",
                o,
                " pers. = ",
                React.default.createElement("b", null, An(o * Ji(m))),
              ),
          ),
        React.default.createElement(EditionChoix, { m: m, setM: setM }),
        React.default.createElement(Periode, { v: m, onChange: setM }),
        React.default.createElement(
          "div",
          { className: "tog", style: { marginTop: 6 } },
          React.default.createElement(
            "span",
            { style: { fontSize: 13, fontWeight: 700 } },
            "Visible par les clients",
          ),
          React.default.createElement(
            "div",
            { className: "rt" },
            React.default.createElement(ze, {
              on: m.active !== !1,
              set: () => setM({ ...m, active: m.active === !1 }),
            }),
          ),
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 12 }, onClick: i },
          "Enregistrer",
        ),
      ),
  );
}
function EditionChoix({ m: m, setM: setM }) {
  let n = m.choix,
    [nouveau, setNouveau] = (0, React.useState)(""),
    s = (u) => setM({ ...m, choix: { ...n, ...u } }),
    o = n?.options || [],
    a = (u, d) => s({ options: o.map((h, p) => (p === u ? { ...h, ...d } : h)) });
  return n
    ? React.default.createElement(
        "div",
        { className: "choix-bloc" },
        React.default.createElement(
          "div",
          { className: "nm", style: { fontSize: 13, marginBottom: 6 } },
          "Choix propos\xE9s au client",
        ),
        React.default.createElement("label", { className: "lab" }, "Titre affich\xE9"),
        React.default.createElement("input", {
          className: "inp",
          value: n.titre,
          maxLength: 60,
          placeholder: "Ex : Vos fromages \xE0 raclette",
          onChange: (u) => s({ titre: u.target.value }),
        }),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10, marginTop: 8 } },
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Minimum \xE0 cocher"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "0",
              value: n.min,
              onChange: (u) => s({ min: u.target.value }),
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Maximum"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              min: "1",
              value: n.max,
              onChange: (u) => s({ max: u.target.value }),
            }),
          ),
        ),
        React.default.createElement(
          "label",
          { className: "lab", style: { marginTop: 8 } },
          "Options ",
          React.default.createElement(
            "span",
            { style: { fontWeight: 600 } },
            "(suppl\xE9ment par personne, 0 = m\xEAme prix)",
          ),
        ),
        o.map((u, d) =>
          React.default.createElement(
            "div",
            { className: "opt-ligne", key: d },
            React.default.createElement("input", {
              className: "inp",
              value: u.nom,
              maxLength: 60,
              onChange: (h) => a(d, { nom: h.target.value }),
            }),
            React.default.createElement(
              "div",
              { className: "opt-supp" },
              React.default.createElement("span", null, "+"),
              React.default.createElement("input", {
                className: "inp",
                type: "number",
                inputMode: "decimal",
                step: "0.5",
                min: "0",
                value: u.supp,
                onChange: (h) => a(d, { supp: h.target.value }),
              }),
              React.default.createElement("span", null, "\u20AC"),
            ),
            React.default.createElement(
              "button",
              {
                className: "ib",
                onClick: () => s({ options: o.filter((h, p) => p !== d) }),
                "aria-label": "Retirer",
              },
              I10.bin(),
            ),
          ),
        ),
        React.default.createElement(
          "div",
          { className: "opt-ligne" },
          React.default.createElement("input", {
            className: "inp",
            value: nouveau,
            maxLength: 60,
            placeholder: "Ajouter une option\u2026",
            onChange: (u) => setNouveau(u.target.value),
            onKeyDown: (u) => {
              u.key === "Enter" &&
                nouveau.trim() &&
                (s({ options: [...o, { nom: nouveau.trim(), supp: 0 }] }), setNouveau(""));
            },
          }),
          React.default.createElement(
            "button",
            {
              className: "btn sm",
              disabled: !nouveau.trim(),
              onClick: () => {
                s({ options: [...o, { nom: nouveau.trim(), supp: 0 }] }), setNouveau("");
              },
            },
            "Ajouter",
          ),
        ),
        React.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { marginTop: 8, color: "var(--red)" },
            onClick: async () =>
              (await De("Retirer tous les choix de ce plateau ?")) && setM({ ...m, choix: null }),
          },
          "Retirer les choix",
        ),
      )
    : React.default.createElement(
        "div",
        { className: "choix-bloc" },
        React.default.createElement(
          "div",
          { className: "nm", style: { fontSize: 13 } },
          "Choix propos\xE9s au client ",
          React.default.createElement("span", { className: "de" }, "(facultatif)"),
        ),
        React.default.createElement(
          "div",
          { className: "de", style: { margin: "2px 0 8px" } },
          "Le client coche ce qu'il pr\xE9f\xE8re : fromages, charcuteries\u2026",
        ),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
          React.default.createElement(
            "button",
            {
              className: "btn gh sm",
              onClick: () => setM({ ...m, choix: JSON.parse(JSON.stringify(LISTE_RACLETTE)) }),
            },
            "\u{1F9C0} Fromages \xE0 raclette",
          ),
          React.default.createElement(
            "button",
            {
              className: "btn gh sm",
              onClick: () => setM({ ...m, choix: { titre: "", min: 1, max: 1, options: [] } }),
            },
            "+ Liste vide",
          ),
        ),
      );
}
function ReglagesCmd({ d: t, set: set }) {
  let n = Er(t.cmd),
    r = (A, S) => set("cmd", (_) => ({ ...Er(_), [A]: S })),
    i = YS(n, t.fermetures),
    [s, setDu] = (0, React.useState)(""),
    [a, setAu] = (0, React.useState)(""),
    [test, setTest] = (0, React.useState)(""),
    p = async () => {
      let A = JS(n);
      if (!A) return setTest("Collez d'abord l'adresse du script.");
      setTest("Envoi\u2026");
      try {
        await fetch(A, { method: "GET", mode: "no-cors", redirect: "follow" }),
          setTest(
            "Demande de test envoy\xE9e. V\xE9rifiez que l'e-mail \xAB [TEST] Nouvelle commande \xBB est bien arriv\xE9 (en g\xE9n\xE9ral en moins d'une minute, regardez aussi les ind\xE9sirables). Rien re\xE7u apr\xE8s quelques minutes ? Pr\xE9venez Eric.",
          );
      } catch {
        setTest("Envoi impossible : v\xE9rifiez la connexion internet et r\xE9essayez.");
      }
    },
    m = ac(n.script),
    [ouvrirScript, setOuvrirScript] = (0, React.useState)(!1);
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "tog", style: { borderTop: "none", paddingTop: 0 } },
        React.default.createElement(
          "div",
          null,
          React.default.createElement("div", { className: "nm" }, "Commandes en ligne"),
          React.default.createElement(
            "div",
            { className: "de" },
            "D\xE9sactivez-les pendant vos cong\xE9s, par exemple",
          ),
        ),
        React.default.createElement(
          "div",
          { className: "rt" },
          React.default.createElement(ze, { on: n.active, set: () => r("active", !n.active) }),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 4 } },
        "Calendrier des clients",
      ),
      React.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 10 } },
        "Vous d\xE9cidez quelles dates les clients peuvent choisir.",
      ),
      React.default.createElement("label", { className: "lab" }, "D\xE9lai minimum avant le retrait"),
      React.default.createElement(
        "select",
        { className: "inp", value: n.delaiMin, onChange: (A) => r("delaiMin", Number(A.target.value)) },
        [0, 1, 2, 3, 4, 5, 6, 7, 10, 14].map((A) =>
          React.default.createElement(
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
      React.default.createElement(
        "label",
        { className: "lab", style: { marginTop: 10 } },
        "Les clients peuvent commander jusqu'\xE0",
      ),
      React.default.createElement(
        "select",
        { className: "inp", value: n.horizon, onChange: (A) => r("horizon", Number(A.target.value)) },
        [14, 30, 45, 60, 90, 120].map((A) =>
          React.default.createElement("option", { key: A, value: A }, A, " jours \xE0 l'avance"),
        ),
      ),
      React.default.createElement(
        "label",
        { className: "lab", style: { marginTop: 10 } },
        "Jours o\xF9 vous acceptez les retraits / livraisons",
      ),
      React.default.createElement(
        "div",
        { className: "jours-sem" },
        QS.map(([A, S]) => {
          let _ = (n.jours || []).includes(A);
          return React.default.createElement(
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
      React.default.createElement(
        "label",
        { className: "lab", style: { marginTop: 12 } },
        "Fermetures (cong\xE9s, jours f\xE9ri\xE9s\u2026)",
      ),
      (n.fermes || []).map((A, S) =>
        React.default.createElement(
          "div",
          { className: "tog", key: S },
          React.default.createElement(
            "span",
            { style: { fontSize: 13, fontWeight: 700 } },
            A.au && A.au !== A.du ? "Du " + jourFr(A.du) + " au " + jourFr(A.au) : "Le " + jourFr(A.du),
          ),
          React.default.createElement(
            "div",
            { className: "rt" },
            React.default.createElement(
              "button",
              {
                className: "ib",
                onClick: () =>
                  r(
                    "fermes",
                    n.fermes.filter((_, I) => I !== S),
                  ),
              },
              I10.bin(),
            ),
          ),
        ),
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, alignItems: "flex-end", marginTop: 6 } },
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("label", { className: "lab" }, "Du"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            value: s,
            onChange: (A) => setDu(A.target.value),
          }),
        ),
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("label", { className: "lab" }, "Au (facultatif)"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            min: s || void 0,
            value: a,
            onChange: (A) => setAu(A.target.value),
          }),
        ),
      ),
      React.default.createElement(
        "button",
        {
          className: "btn gh sm",
          style: { marginTop: 8 },
          disabled: !s,
          onClick: () => {
            r(
              "fermes",
              [...(n.fermes || []), { du: s, au: a && a >= s ? a : s }].sort((A, S) =>
                A.du.localeCompare(S.du),
              ),
            ),
              setDu(""),
              setAu("");
          },
        },
        "Ajouter cette fermeture",
      ),
      React.default.createElement(
        "div",
        { className: "apercu-prix", style: { marginTop: 12 } },
        i.premiere
          ? React.default.createElement(
              React.default.Fragment,
              null,
              "Aujourd'hui, la premi\xE8re date propos\xE9e aux clients est le ",
              React.default.createElement("b", null, dateCourte(i.premiere)),
              ".",
            )
          : React.default.createElement(
              React.default.Fragment,
              null,
              "Aucune date n'est propos\xE9e aux clients avec ces r\xE9glages.",
            ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 8 } },
        "Retrait ou livraison",
      ),
      React.default.createElement(
        "div",
        { className: "seg", style: { marginBottom: 10 } },
        [
          ["retrait", "Retrait"],
          ["livraison", "Livraison"],
          ["choix", "Au choix"],
        ].map(([A, S]) =>
          React.default.createElement(
            "button",
            { key: A, className: n.mode === A ? "on" : "", onClick: () => r("mode", A) },
            S,
          ),
        ),
      ),
      React.default.createElement(
        "label",
        { className: "lab" },
        "Heure de retrait propos\xE9e par d\xE9faut",
      ),
      React.default.createElement("input", {
        className: "inp",
        type: "time",
        step: "900",
        value: n.heureDefaut,
        onChange: (A) => r("heureDefaut", A.target.value),
        style: { maxWidth: 200 },
      }),
      React.default.createElement(
        "div",
        { className: "de", style: { margin: "4px 2px 10px" } },
        "Vous la confirmez ou la changez pour chaque commande en l'acceptant.",
      ),
      React.default.createElement(
        "label",
        { className: "lab" },
        "Message affich\xE9 aux clients (facultatif)",
      ),
      React.default.createElement("textarea", {
        className: "inp",
        value: n.note,
        onChange: (A) => r("note", A.target.value),
        placeholder: "Ex : Livraison uniquement sur Raddon et les communes voisines.",
        maxLength: 300,
      }),
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 4 } },
        "E-mail \xAB commande \xE0 pr\xE9parer \xBB",
      ),
      React.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 10 } },
        m
          ? "\u2713 Configur\xE9 : vous recevez un e-mail \xE0 chaque nouvelle commande."
          : "Pas encore configur\xE9. Les commandes arrivent quand m\xEAme ici, dans l'onglet Commandes.",
      ),
      !m || ouvrirScript
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "label",
              { className: "lab" },
              "Adresse du script Google (r\xE9glage technique)",
            ),
            React.default.createElement("input", {
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
              React.default.createElement(
                "div",
                { className: "cmd-alerte" },
                "Cette adresse ne ressemble pas \xE0 celle d'un script d\xE9ploy\xE9 (elle doit finir par /exec).",
              ),
            React.default.createElement(
              "label",
              { className: "lab" },
              "Cl\xE9 des notifications (Firebase \u2192 Cloud Messaging \u2192 Certificats Web Push)",
            ),
            React.default.createElement("input", {
              className: "inp",
              value: t.push?.vapid || "",
              placeholder: "B\u2026",
              autoCapitalize: "off",
              autoCorrect: "off",
              spellCheck: !1,
              onChange: (A) => set("push", (S) => ({ ...(S || {}), vapid: A.target.value.trim() })),
            }),
            t.push?.vapid &&
              !/^[A-Za-z0-9_-]{80,100}$/.test(t.push.vapid) &&
              React.default.createElement(
                "div",
                { className: "cmd-alerte" },
                "Cette cl\xE9 ne ressemble pas \xE0 une cl\xE9 \xAB Web Push \xBB (environ 87 caract\xE8res).",
              ),
            m &&
              React.default.createElement(
                "button",
                { className: "btn gh sm", style: { marginTop: 8 }, onClick: () => setOuvrirScript(!1) },
                "Masquer",
              ),
          )
        : React.default.createElement(
            "button",
            {
              className: "lienadm",
              onClick: async () =>
                (await De(`R\xE9glage technique : ne modifiez cette adresse que si Eric vous le demande.

Afficher quand m\xEAme ?`)) && setOuvrirScript(!0),
            },
            "R\xE9glage technique (r\xE9serv\xE9 \xE0 Eric)",
          ),
      React.default.createElement(
        "button",
        { className: "btn gh sm", style: { marginTop: 10 }, onClick: p },
        "Envoyer un e-mail de test",
      ),
      test &&
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 6, fontWeight: 700 } },
          test,
        ),
    ),
  );
}
var sN = { mode: "auto", force: "", animations: !0, items: {}, perso: [] },
  dateLongue = (t) =>
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
function ApercuIntro({ theme: theme }) {
  let [e, n] = (0, React.useState)(0),
    r = Zn(theme);
  return React.default.createElement(
    "div",
    {
      className: "intro-tel",
      key: e,
      onClick: () => n(e + 1),
      title: "Toucher pour rejouer",
      style: { background: O2(theme) },
    },
    theme.magie && React.default.createElement(CielEtoile, { apercu: !0 }),
    r === "halloween" && React.default.createElement(rC, { apercu: !0 }),
    r === "octobrerose" && React.default.createElement(aC, null),
    pf.includes(r) && React.default.createElement(yC, { id: r }),
    theme.anim !== !1 && React.default.createElement(Particules, { theme: theme, nb: 14, dans: !0 }),
    React.default.createElement("img", {
      className: "it-logo",
      src: v7(theme),
      alt: "",
      onError: (i) => {
        i.target.src.endsWith("logo-intro.png") || (i.target.src = "logo-intro.png");
      },
    }),
    React.default.createElement(
      "div",
      { className: "it-txt" },
      React.default.createElement("div", { className: "it-bonjour" }, "Bonjour Marion !"),
      React.default.createElement(
        "div",
        { className: "it-bienv" },
        "Bienvenue sur l'application de l'\xE9picerie",
      ),
      (theme.phrase || theme.titre) &&
        React.default.createElement("div", { className: "it-titre" }, theme.phrase || theme.titre),
    ),
    React.default.createElement(
      "div",
      {
        className: "it-lieu",
        style: theme.magie ? { color: "#3B4F6B", zIndex: 2 } : r ? { color: "#FFB547", zIndex: 2 } : void 0,
      },
      "Raddon-et-Chapendu",
    ),
  );
}
function ApercuTheme({ theme: theme, du: e, vue0: vue0 }) {
  let [r, i] = (0, React.useState)(vue0 || "accueil"),
    s = Zn(theme);
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "div",
      { className: "seg", style: { maxWidth: 360, margin: "0 auto 10px" } },
      [
        ["accueil", "Accueil de l'appli"],
        ["intro", "\xC9cran d'ouverture"],
      ].map(([o, a]) =>
        React.default.createElement(
          "button",
          { key: o, className: r === o ? "on" : "", onClick: () => i(o) },
          a,
        ),
      ),
    ),
    r === "intro"
      ? React.default.createElement(ApercuIntro, { theme: theme })
      : React.default.createElement(
          "div",
          { className: "apercu-tel" },
          React.default.createElement(
            "div",
            { className: theme.magie ? "magie" : s || "" },
            React.default.createElement(
              "div",
              { className: "at-top", style: { background: theme.top, position: "relative" } },
              React.default.createElement("img", { src: LOGO, alt: "" }),
              theme.magie &&
                React.default.createElement(SvgBonnet, { taille: 24, style: { left: 18, top: 0 } }),
              s &&
                React.default.createElement(
                  "span",
                  { className: "at-acc" },
                  s === "halloween"
                    ? React.default.createElement(SvgChapeauSorciere, {
                        taille: 30,
                        style: { left: 28, top: 0 },
                      })
                    : s === "octobrerose"
                      ? React.default.createElement(sC, { style: { left: 44, top: 28 } })
                      : React.default.createElement(gC, { id: s }),
                ),
              React.default.createElement("span", null, "\xC9picerie Raddonnaise"),
            ),
            theme.magie
              ? React.default.createElement(GuirlandeNoel, { n: 12, apercu: !0 })
              : s === "halloween"
                ? React.default.createElement(nC, { apercu: !0 })
                : s === "octobrerose"
                  ? React.default.createElement(oC, { apercu: !0 })
                  : pf.includes(s)
                    ? React.default.createElement(vC, { id: s, apercu: !0 })
                    : React.default.createElement("div", {
                        className: "frise-theme",
                        style: { background: theme.frise, position: "relative", top: 0 },
                      }),
            React.default.createElement(
              "div",
              { className: "at-corps" },
              pf.includes(s) &&
                theme.anim !== !1 &&
                React.default.createElement(DecorAne, { id: s, apercu: !0 }),
              theme.anim !== !1 &&
                React.default.createElement(Particules, { theme: theme, nb: 12, dans: !0 }),
              theme.magie && theme.anim !== !1 && React.default.createElement(Neige, { nb: 22, dans: !0 }),
              React.default.createElement(
                "div",
                { style: { position: "relative", zIndex: 2 } },
                React.default.createElement(CarteTheme, { theme: theme }),
              ),
              React.default.createElement("div", { className: "at-faux" }),
              React.default.createElement("div", { className: "at-faux court" }),
            ),
          ),
        ),
    r === "intro" &&
      React.default.createElement(
        "div",
        { className: "de", style: { textAlign: "center", marginTop: 6 } },
        "Ce que voient les clients en ouvrant l'appli (2 \xE0 4 secondes). Touchez l'image pour rejouer.",
      ),
  );
}
function ReglageMagieNoel({
  v: v,
  setV: setV,
  titreDef: titreDef,
  motifsDef: motifsDef,
  top: top,
  acc: acc,
  magieDef: magieDef,
}) {
  let a = v.magie == null ? !!magieDef : !!v.magie,
    u = Array.isArray(v.motifs) ? v.motifs : motifsDef || [],
    d = (p) =>
      setV({ ...v, motifs: u.includes(p) ? u.filter((m) => m !== p) : u.length >= 6 ? u : [...u, p] }),
    h = EMOJIS_THEME;
  return React.default.createElement(
    "div",
    { className: "ri" },
    React.default.createElement(
      "div",
      { className: "tog ri-magie" },
      React.default.createElement(
        "div",
        null,
        React.default.createElement(
          "div",
          { style: { fontSize: 14, fontWeight: 800 } },
          "\u2728 Magie de No\xEBl",
        ),
        React.default.createElement(
          "div",
          { className: "de" },
          "Neige qui tombe et pos\xE9e sur les menus, guirlande lumineuse, bonnet sur le logo, tra\xEEneau du P\xE8re No\xEBl, village enneig\xE9 \xE0 l'ouverture, poussi\xE8re d'\xE9toiles quand on touche l'\xE9cran, compte \xE0 rebours.",
        ),
      ),
      React.default.createElement(
        "div",
        { className: "rt" },
        React.default.createElement(ze, { on: a, set: () => setV({ ...v, magie: !a }) }),
      ),
    ),
    React.default.createElement("div", { className: "ri-t" }, "\xC9cran d'ouverture"),
    React.default.createElement("label", { className: "lab" }, "Logo"),
    React.default.createElement(
      "div",
      { className: "ri-logos" },
      g7.map(([p, m, w]) =>
        React.default.createElement(
          "button",
          {
            key: p,
            className: (v.logo || "normal") === p ? "on" : "",
            onClick: () => setV({ ...v, logo: p }),
          },
          React.default.createElement("img", { src: w, alt: "" }),
          m,
        ),
      ),
    ),
    React.default.createElement(
      "label",
      { className: "lab", style: { marginTop: 10 } },
      "Phrase sous \xAB Bonjour \u2026 ! \xBB",
    ),
    React.default.createElement("input", {
      className: "inp",
      value: v.phrase || "",
      maxLength: 40,
      placeholder: titreDef || "Ex : Bonne rentr\xE9e !",
      onChange: (p) => setV({ ...v, phrase: p.target.value }),
    }),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Fond"),
    React.default.createElement(
      "div",
      { className: "ri-fonds" },
      L2.map((p) =>
        React.default.createElement(
          "button",
          {
            key: p.id,
            className: (v.fond || "degrade") === p.id ? "on" : "",
            onClick: () => setV({ ...v, fond: p.id }),
          },
          React.default.createElement("span", {
            style: { background: O2({ top: top || "#1C433B", accent: acc || "#6E9B3A", fond: p.id }) },
          }),
          p.nom,
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "ri-t", style: { marginTop: 16 } },
      "Petits dessins qui tombent ",
      React.default.createElement("span", { className: "de" }, "(", u.length, "/6)"),
    ),
    React.default.createElement(
      "div",
      { className: "ri-motifs" },
      FORMES_NEIGE.map((p) =>
        React.default.createElement(
          "button",
          {
            key: p.id,
            className: u.includes(p.id) ? "on" : "",
            onClick: () => d(p.id),
            title: p.nom,
            "aria-label": p.nom,
          },
          React.default.createElement(AC, { id: p.id, taille: 26 }),
        ),
      ),
      h.map((p) =>
        React.default.createElement(
          "button",
          { key: p, className: u.includes(p) ? "on" : "", onClick: () => d(p) },
          React.default.createElement("span", { style: { fontSize: 21 } }, p),
        ),
      ),
    ),
    motifsDef &&
      Array.isArray(v.motifs) &&
      React.default.createElement(
        "button",
        { className: "lienadm", onClick: () => setV({ ...v, motifs: null }) },
        "Remettre les dessins d'origine",
      ),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Quantit\xE9"),
    React.default.createElement(
      "div",
      { className: "seg" },
      [
        ["peu", "Un peu"],
        ["normal", "Normal"],
        ["beaucoup", "Beaucoup"],
      ].map(([p, m]) =>
        React.default.createElement(
          "button",
          {
            key: p,
            className: (v.densite || "normal") === p ? "on" : "",
            onClick: () => setV({ ...v, densite: p }),
          },
          m,
        ),
      ),
    ),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Sens"),
    React.default.createElement(
      "div",
      { className: "seg" },
      [
        ["", "D'origine"],
        ["tombe", "Ils tombent"],
        ["monte", "Ils montent"],
      ].map(([p, m]) =>
        React.default.createElement(
          "button",
          {
            key: p || "o",
            className: (v.sens || "") === p ? "on" : "",
            onClick: () => setV({ ...v, sens: p }),
          },
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
function CalendrierThemes({ c: c, setVoir: setVoir }) {
  let n = { ...c, mode: "auto" },
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
  let s = (o) =>
    o.du === o.au ? "Le " + dateLongue(o.du) : "Du " + dateLongue(o.du) + " au " + dateLongue(o.au);
  return React.default.createElement(
    "div",
    { className: "card" },
    React.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 4 } },
      "\u{1F4C5} \xC0 venir (4 prochains mois)",
    ),
    React.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 10 } },
      c.mode === "force"
        ? "Un th\xE8me est choisi \xE0 la main en ce moment : ce planning s'appliquera d\xE8s que vous repasserez sur \xAB Selon le calendrier \xBB."
        : c.mode === "off"
          ? "\xAB Aucun th\xE8me \xBB est choisi : ce planning s'appliquera si vous repassez sur \xAB Selon le calendrier \xBB."
          : "Ce qui s'affichera tout seul sur l'appli. Pour changer, modifiez les dates d'une f\xEAte ou cr\xE9ez votre th\xE8me ci-dessous.",
    ),
    r.map((o, a) =>
      React.default.createElement(
        "div",
        {
          key: a,
          className: "plan-l",
          onClick: o.t ? () => setVoir({ ...o.t, du: o.du }) : void 0,
          style: { cursor: o.t ? "pointer" : "default" },
        },
        React.default.createElement("span", {
          className: "plan-pt",
          style: { background: o.t ? o.t.top : "#D8D2C2" },
        }),
        React.default.createElement(
          "div",
          { style: { minWidth: 0, flex: 1 } },
          React.default.createElement(
            "div",
            { style: { fontWeight: 800, fontSize: 13.5 } },
            o.t ? o.t.nom || o.t.titre : "Couleurs habituelles",
            a === 0 &&
              c.mode === "auto" &&
              React.default.createElement(
                "span",
                { className: "pill on", style: { marginLeft: 6 } },
                "En cours",
              ),
          ),
          React.default.createElement("div", { className: "de" }, s(o)),
        ),
        o.t &&
          React.default.createElement(
            "span",
            { className: "de", style: { fontWeight: 700 } },
            "Aper\xE7u \u203A",
          ),
      ),
    ),
  );
}
var COULEURS_THEME = [
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
  EMOJIS_THEME =
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
function EditionPerso({ p0: p0, onClose: onClose, onSave: onSave, onDelete: onDelete }) {
  let [i, s] = (0, React.useState)({ ...p0, motifs: Array.isArray(p0.motifs) ? p0.motifs : mf(p0.emojis) }),
    o = { ...persoVersTheme({ ...i, titre: i.titre || i.nom || "Mon th\xE8me" }), anim: !0 },
    a = i.nom.trim() && i.du && i.au && i.au >= i.du;
  return React.default.createElement(
    ut,
    { titre: p0.nom ? "Modifier \xAB " + p0.nom + " \xBB" : "Cr\xE9er mon th\xE8me", onClose: onClose },
    React.default.createElement(ApercuTheme, { theme: o }),
    React.default.createElement("label", { className: "lab", style: { marginTop: 12 } }, "Nom du th\xE8me"),
    React.default.createElement("input", {
      className: "inp",
      value: i.nom,
      maxLength: 40,
      placeholder: "Ex : F\xEAte du village, Anniversaire de l'\xE9picerie\u2026",
      onChange: (u) => s({ ...i, nom: u.target.value }),
    }),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Couleur"),
    React.default.createElement(
      "div",
      { className: "couleurs" },
      COULEURS_THEME.map((u) =>
        React.default.createElement("button", {
          key: u,
          className: i.couleur === u ? "on" : "",
          style: { background: u },
          onClick: () => s({ ...i, couleur: u }),
          "aria-label": "Couleur " + u,
        }),
      ),
      React.default.createElement(
        "label",
        { className: "perso-coul", title: "Autre couleur" },
        React.default.createElement("input", {
          type: "color",
          value: i.couleur,
          onChange: (u) => s({ ...i, couleur: u.target.value }),
        }),
        "+",
      ),
    ),
    React.default.createElement(
      "label",
      { className: "lab", style: { marginTop: 10 } },
      "Grand dessin de la carte (facultatif)",
    ),
    React.default.createElement("input", {
      className: "inp",
      value: i.illu,
      maxLength: 8,
      placeholder: "Par d\xE9faut : " + (o.illuEmoji || "\u2B50"),
      onChange: (u) => s({ ...i, illu: u.target.value }),
      style: { maxWidth: 200 },
    }),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Titre de la carte"),
    React.default.createElement("input", {
      className: "inp",
      value: i.titre,
      maxLength: 50,
      placeholder: i.nom || "Ex : Joyeux anniversaire !",
      onChange: (u) => s({ ...i, titre: u.target.value }),
    }),
    React.default.createElement("label", { className: "lab", style: { marginTop: 10 } }, "Message"),
    React.default.createElement("textarea", {
      className: "inp",
      value: i.message,
      maxLength: 200,
      placeholder: "Ex : Venez f\xEAter les 3 ans de l'\xE9picerie samedi, caf\xE9 offert !",
      onChange: (u) => s({ ...i, message: u.target.value }),
    }),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 10, marginTop: 10 } },
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Du"),
        React.default.createElement("input", {
          className: "inp",
          type: "date",
          value: i.du,
          onChange: (u) => s({ ...i, du: u.target.value, au: i.au < u.target.value ? u.target.value : i.au }),
        }),
      ),
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Au"),
        React.default.createElement("input", {
          className: "inp",
          type: "date",
          min: i.du,
          value: i.au,
          onChange: (u) => s({ ...i, au: u.target.value }),
        }),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "tog", style: { marginTop: 6 } },
      React.default.createElement(
        "span",
        { style: { fontSize: 13, fontWeight: 700 } },
        "Revient tous les ans aux m\xEAmes dates",
      ),
      React.default.createElement(
        "div",
        { className: "rt" },
        React.default.createElement(ze, {
          on: i.chaqueAnnee,
          set: () => s({ ...i, chaqueAnnee: !i.chaqueAnnee }),
        }),
      ),
    ),
    React.default.createElement(ReglageMagieNoel, {
      v: i,
      setV: s,
      titreDef: i.titre || i.nom,
      top: o.top,
      acc: o.accent,
    }),
    React.default.createElement(
      "button",
      {
        className: "btn",
        style: { marginTop: 12 },
        disabled: !a,
        onClick: () =>
          onSave({
            ...i,
            nom: i.nom.trim(),
            titre: i.titre.trim(),
            message: i.message.trim(),
            phrase: String(i.phrase || "").trim(),
            emojis: (i.motifs || []).filter((u) => !FORMES_NEIGE.some((d) => d.id === u)).join(""),
          }),
      },
      "Enregistrer",
    ),
    onDelete &&
      React.default.createElement(
        "button",
        {
          className: "btn gh",
          style: { marginTop: 8, color: "var(--red)" },
          onClick: async () => (await De("Supprimer le th\xE8me \xAB " + p0.nom + " \xBB ?")) && onDelete(),
        },
        "Supprimer ce th\xE8me",
      ),
  );
}
function MesThemes({ c: c, maj: maj, setVoir: setVoir }) {
  let [ed, setEd] = (0, React.useState)(null),
    s = c.perso || [],
    o = (a) => {
      maj({ perso: s.some((u) => u.id === a.id) ? s.map((u) => (u.id === a.id ? a : u)) : [...s, a] }),
        setEd(null);
    };
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement("div", { className: "nm", style: { margin: "16px 0 4px" } }, "Mes th\xE8mes"),
    React.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 8 } },
      "Cr\xE9ez vos propres th\xE8mes : f\xEAte du village, anniversaire de l'\xE9picerie, foire, march\xE9 de No\xEBl\u2026 Ils passent avant les f\xEAtes pr\xE9vues.",
    ),
    React.default.createElement(
      "button",
      { className: "btn terra", onClick: () => setEd(A7()) },
      I10.plus(),
      "Cr\xE9er mon th\xE8me",
    ),
    React.default.createElement("div", { style: { height: 10 } }),
    React.default.createElement(
      "div",
      { className: "grille" },
      s.map((a) => {
        let u = persoVersTheme(a),
          d = a.active !== !1;
        return React.default.createElement(
          "div",
          {
            className: "card theme-ligne",
            key: a.id,
            style: { opacity: d ? 1 : 0.55, borderLeft: "4px solid " + u.top },
          },
          React.default.createElement(
            "div",
            { className: "row" },
            React.default.createElement(
              "div",
              { className: "th-illu", style: { background: u.soft } },
              React.default.createElement(IllustrationTheme, { theme: u, taille: 46 }),
            ),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, a.nom),
              React.default.createElement(
                "div",
                { className: "de" },
                a.du === a.au
                  ? "Le " + dateLongue(a.du)
                  : "Du " + dateLongue(a.du) + " au " + dateLongue(a.au),
                a.chaqueAnnee ? " \xB7 tous les ans" : " " + a.du.slice(0, 4),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: d,
                set: () => maj({ perso: s.map((h) => (h.id === a.id ? { ...h, active: !d } : h)) }),
              }),
            ),
          ),
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 10 } },
            React.default.createElement(
              "button",
              { className: "btn gh sm", style: { flex: 1 }, onClick: () => setEd(a) },
              "Modifier",
            ),
            React.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { flex: 1 },
                onClick: () => setVoir({ ...u, anim: c.animations !== !1, du: a.du }),
              },
              "Aper\xE7u",
            ),
          ),
        );
      }),
    ),
    ed &&
      React.default.createElement(EditionPerso, {
        p0: ed,
        onClose: () => setEd(null),
        onSave: o,
        onDelete: s.some((a) => a.id === ed.id)
          ? () => {
              maj({ perso: s.filter((a) => a.id !== ed.id), ...(c.force === ed.id ? { mode: "auto" } : {}) }),
                setEd(null);
            }
          : null,
      }),
  );
}
function Themes({ d: t, set: set }) {
  let n = { ...sN, ...(t.themes || {}), items: { ...((t.themes || {}).items || {}) } },
    r = (S) => ({ ...sN, ...(S || {}), items: { ...((S || {}).items || {}) } }),
    i = (S) => set("themes", (_) => ({ ...r(_), ...S })),
    s = (S, _) =>
      set("themes", (I) => {
        let T = r(I);
        return { ...T, items: { ...T.items, [S]: { ...(T.items[S] || {}), ..._ } } };
      }),
    [edit, setEdit] = (0, React.useState)(null),
    [voir, setVoir] = (0, React.useState)(null),
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
    E = [...THEMES].map((S) => ({ t: S, p: w(S) })).sort((S, _) => S.p[0].localeCompare(_.p[0])),
    A = (S) => {
      let [_, I] = w(S);
      return _ <= h && h <= I;
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Th\xE8mes"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "L'application s'habille pour les f\xEAtes : couleurs, petite animation et carte de v\u0153ux sur l'accueil. Activez les f\xEAtes que vous voulez et ajustez les dates.",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 8 } },
        "Affich\xE9 en ce moment",
      ),
      m
        ? React.default.createElement(ApercuTheme, { theme: m, du: Bn() })
        : React.default.createElement(
            "div",
            { className: "de", style: { marginBottom: 6 } },
            "Aucun th\xE8me : l'application garde ses couleurs habituelles.",
          ),
      React.default.createElement(
        "div",
        { className: "seg", style: { margin: "12px 0 8px" } },
        [
          ["auto", "Selon le calendrier"],
          ["off", "Aucun th\xE8me"],
        ].map(([S, _]) =>
          React.default.createElement(
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
      React.default.createElement(
        "div",
        { className: "tog", style: { marginTop: 6 } },
        React.default.createElement(
          "div",
          null,
          React.default.createElement(
            "div",
            { style: { fontSize: 13, fontWeight: 700 } },
            "Petite animation",
          ),
          React.default.createElement(
            "div",
            { className: "de" },
            "Flocons, c\u0153urs, citrouilles\u2026 qui tombent doucement",
          ),
        ),
        React.default.createElement(
          "div",
          { className: "rt" },
          React.default.createElement(ze, {
            on: n.animations !== !1,
            set: () => i({ animations: n.animations === !1 }),
          }),
        ),
      ),
    ),
    React.default.createElement(CalendrierThemes, { c: n, setVoir: setVoir }),
    B2 && React.default.createElement(MesThemes, { c: n, maj: i, setVoir: setVoir }),
    React.default.createElement(
      "div",
      { className: "nm", style: { margin: "16px 0 8px" } },
      "Les f\xEAtes de l'ann\xE9e",
    ),
    React.default.createElement(
      "div",
      { className: "grille" },
      E.map(({ t: S, p: [_, I, T] }) => {
        let M = n.items[S.id]?.active !== !1;
        return React.default.createElement(
          "div",
          {
            className: "card theme-ligne",
            key: S.id,
            style: { opacity: M ? 1 : 0.55, borderLeft: "4px solid " + S.top },
          },
          React.default.createElement(
            "div",
            { className: "row" },
            React.default.createElement(
              "div",
              { className: "th-illu", style: { background: S.soft } },
              React.default.createElement(IllustrationTheme, { theme: S, taille: 46 }),
            ),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement(
                "div",
                { className: "nm" },
                S.nom,
                A(S) &&
                  M &&
                  React.default.createElement(
                    "span",
                    { className: "pill on", style: { marginLeft: 6 } },
                    "En cours",
                  ),
              ),
              React.default.createElement(
                "div",
                { className: "de" },
                _ === I ? "Le " + dateLongue(_) : "Du " + dateLongue(_) + " au " + dateLongue(I),
                T ? " \xB7 dates modifi\xE9es" : "",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, { on: M, set: () => s(S.id, { active: !M }) }),
            ),
          ),
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 10 } },
            React.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { flex: 1 },
                onClick: () =>
                  setEdit({
                    t: S,
                    du: _,
                    au: I,
                    message: n.items[S.id]?.message || "",
                    ...oN(n.items[S.id] || {}),
                  }),
              },
              "Dates & message",
            ),
            React.default.createElement(
              "button",
              {
                className: "btn gh sm",
                style: { flex: 1 },
                onClick: () =>
                  setVoir({
                    ...ParticulesMontantes(S, n.items[S.id]),
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
    voir &&
      React.default.createElement(
        ut,
        { titre: "Aper\xE7u \u2014 " + voir.nom, onClose: () => setVoir(null) },
        React.default.createElement(ApercuTheme, { theme: voir, du: voir.du }),
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 10, textAlign: "center" } },
          "Ce th\xE8me s'affichera tout seul dans l'application \xE0 ses dates, selon le calendrier.",
        ),
      ),
    edit &&
      React.default.createElement(
        ut,
        { titre: edit.t.nom, onClose: () => setEdit(null) },
        React.default.createElement(ApercuTheme, {
          theme: {
            ...ParticulesMontantes(edit.t, edit),
            message: edit.message.trim() || edit.t.message,
            anim: !0,
          },
          vue0: "intro",
        }),
        React.default.createElement("div", { style: { height: 12 } }),
        React.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 10 } },
          "P\xE9riode d'affichage ",
          edit.du.slice(0, 4) !== edit.au.slice(0, 4)
            ? edit.du.slice(0, 4) + "-" + edit.au.slice(0, 4)
            : edit.du.slice(0, 4),
          ". L'ann\xE9e suivante, les dates habituelles reviennent toutes seules.",
        ),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Du"),
            React.default.createElement("input", {
              className: "inp",
              type: "date",
              value: edit.du,
              onChange: (S) => setEdit({ ...edit, du: S.target.value }),
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Au"),
            React.default.createElement("input", {
              className: "inp",
              type: "date",
              min: edit.du,
              value: edit.au,
              onChange: (S) => setEdit({ ...edit, au: S.target.value }),
            }),
          ),
        ),
        React.default.createElement(
          "label",
          { className: "lab", style: { marginTop: 10 } },
          "Message de la carte de v\u0153ux",
        ),
        React.default.createElement("textarea", {
          className: "inp",
          value: edit.message,
          maxLength: 200,
          placeholder: edit.t.message,
          onChange: (S) => setEdit({ ...edit, message: S.target.value }),
        }),
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 4 } },
          "Vide = message propos\xE9 : \xAB ",
          edit.t.message,
          " \xBB",
        ),
        M2 &&
          React.default.createElement(ReglageMagieNoel, {
            v: edit,
            setV: (S) => setEdit({ ...edit, ...S }),
            titreDef: edit.t.titre,
            motifsDef: b7(edit.t),
            top: edit.t.top,
            acc: edit.t.accent,
            magieDef: edit.t.id === "noel",
          }),
        React.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 12 },
            disabled: !edit.du || !edit.au || edit.au < edit.du,
            onClick: () => {
              let [S, _] = edit.t.dates(Number(edit.du.slice(0, 4))),
                I = S === edit.du && _ === edit.au;
              s(edit.t.id, {
                du: I ? "" : edit.du,
                au: I ? "" : edit.au,
                message: edit.message.trim(),
                ...oN(edit),
              }),
                setEdit(null);
            },
          },
          "Enregistrer",
        ),
        React.default.createElement(
          "button",
          {
            className: "btn gh",
            style: { marginTop: 8 },
            onClick: () => {
              s(edit.t.id, { du: "", au: "" }), setEdit(null);
            },
          },
          "Remettre les dates habituelles",
        ),
      ),
  );
}
var REPONSES = [
  "Bonjour ! Oui, c'est possible \u{1F60A}",
  "Merci pour votre message, je regarde et je vous r\xE9ponds vite.",
  "C'est not\xE9, \xE0 bient\xF4t \xE0 l'\xE9picerie !",
  "D\xE9sol\xE9e, ce n'est plus disponible pour le moment.",
];
function Fil({ conv: conv, onRetour: onRetour, cmd: cmd }) {
  let [msgs, setMsgs] = (0, React.useState)([]),
    [texte, setTexte] = (0, React.useState)(""),
    [envoi, setEnvoi] = (0, React.useState)(!1),
    d = (0, React.useRef)(null);
  (0, React.useEffect)(
    () =>
      onSnapshot(
        collection(db2, "conversations", conv.id, "messages"),
        (m) =>
          setMsgs(
            m.docs.map((w) => ({ ...w.data(), id: w.id })).sort((w, E) => (w.date || 0) - (E.date || 0)),
          ),
        () => {},
      ),
    [conv.id],
  ),
    (0, React.useEffect)(() => {
      conv.attente &&
        setDoc(doc2(db2, "conversations", conv.id), { attente: !1 }, { merge: !0 }).catch(() => {});
    }, [conv.id, conv.attente]),
    (0, React.useEffect)(() => {
      d.current?.scrollIntoView({ block: "end" });
    }, [msgs.length]);
  let h = async () => {
      let m = texte.trim().slice(0, 1e3);
      if (!(!m || envoi)) {
        setEnvoi(!0);
        try {
          let w = Date.now(),
            E = writeBatch(db2);
          E.set(doc2(collection(db2, "conversations", conv.id, "messages")), {
            de: "epicerie",
            texte: m,
            date: w,
          }),
            E.update(doc2(db2, "conversations", conv.id), {
              maj: w,
              dernier: "Vous : " + uf(m),
              attente: !1,
            }),
            await E.commit(),
            setTexte(""),
            avertirMessage(cmd, "msg", conv.id);
        } catch {
          ft("Message non envoy\xE9. V\xE9rifiez la connexion et r\xE9essayez.");
        }
        setEnvoi(!1);
      }
    },
    p = "";
  return React.default.createElement(
    "div",
    { className: "fil-adm" },
    React.default.createElement(
      "div",
      { className: "fil-hd" },
      React.default.createElement("button", { className: "btn gh sm", onClick: onRetour }, "\u2190"),
      React.default.createElement(
        "div",
        { style: { minWidth: 0 } },
        React.default.createElement("div", { className: "nm" }, conv.nom),
        React.default.createElement(
          "div",
          { className: "de" },
          conv.tel
            ? React.default.createElement("a", { href: "tel:" + conv.tel.replace(/\s/g, "") }, conv.tel)
            : "Pas de t\xE9l\xE9phone",
          " \xB7 depuis le ",
          new Date(conv.cree || Date.now()).toLocaleDateString("fr-FR"),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "fil-corps" },
      !msgs.length &&
        React.default.createElement(
          "div",
          { className: "de", style: { textAlign: "center", padding: 20 } },
          "Chargement\u2026",
        ),
      msgs.map((m) => {
        let w = jourMsg(m.date),
          E = w !== p;
        return (
          (p = w),
          React.default.createElement(
            React.default.Fragment,
            { key: m.id },
            E && React.default.createElement("div", { className: "fil-jour" }, w),
            React.default.createElement(
              "div",
              { className: "fmsg " + (m.de === "epicerie" ? "moi" : "lui") },
              React.default.createElement("div", null, m.texte),
              React.default.createElement("small", null, heureMsg(m.date)),
            ),
          )
        );
      }),
      React.default.createElement("div", { ref: d }),
    ),
    React.default.createElement(
      "div",
      { className: "motifs", style: { margin: "8px 0" } },
      REPONSES.map((m) =>
        React.default.createElement(
          "button",
          { key: m, onClick: () => setTexte(m) },
          m.length > 34 ? m.slice(0, 32) + "\u2026" : m,
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "fil-saisie" },
      React.default.createElement("textarea", {
        className: "inp",
        rows: 2,
        value: texte,
        maxLength: 1e3,
        placeholder: "R\xE9pondre \xE0 " + conv.nom + "\u2026",
        onChange: (m) => setTexte(m.target.value),
        onKeyDown: (m) => {
          m.key === "Enter" &&
            !m.shiftKey &&
            window.matchMedia("(pointer:fine)").matches &&
            (m.preventDefault(), h());
        },
      }),
      React.default.createElement(
        "button",
        {
          className: "btn",
          style: { width: "auto", padding: "0 20px" },
          disabled: !texte.trim() || envoi,
          onClick: h,
        },
        "Envoyer",
      ),
    ),
  );
}
function Messages({ d: t, set: set }) {
  let [ouvert, setOuvert] = (0, React.useState)(null),
    i = [...t.conversations].sort((d, h) => (h.maj || 0) - (d.maj || 0)),
    s = ouvert && i.find((d) => d.id === ouvert),
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
          await nN(d.id), setOuvert(null);
        } catch {
          ft("Suppression impossible. V\xE9rifiez la connexion.");
        }
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Messages"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Les questions de vos clients, envoy\xE9es depuis l'application.",
    ),
    s
      ? React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(Fil, { conv: s, cmd: t.cmd, onRetour: () => setOuvert(null) }),
          React.default.createElement(
            "button",
            { className: "btn gh sm", style: { marginTop: 12, color: "var(--red)" }, onClick: () => u(s) },
            "Supprimer cette conversation",
          ),
        )
      : React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            "div",
            { className: "tog card", style: { marginBottom: 12 } },
            React.default.createElement(
              "div",
              null,
              React.default.createElement(
                "div",
                { style: { fontSize: 13, fontWeight: 800 } },
                "Bouton \xAB Une question ? \xBB sur l'application",
              ),
              React.default.createElement(
                "div",
                { className: "de" },
                "D\xE9sactivez-le si vous ne voulez plus recevoir de messages",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: t.chat?.active !== !1,
                set: () => set("chat", (d) => ({ ...(d || {}), active: d?.active === !1 })),
              }),
            ),
          ),
          !i.length &&
            React.default.createElement(Vn, {
              t: "Aucun message pour l'instant",
              s: "Quand un client vous \xE9crit depuis l'application, sa conversation appara\xEEt ici.",
            }),
          React.default.createElement(
            "div",
            { className: "grille" },
            i.map((d) =>
              React.default.createElement(
                "div",
                {
                  className: "card conv" + (d.attente ? " attente" : ""),
                  key: d.id,
                  onClick: () => setOuvert(d.id),
                },
                React.default.createElement(
                  "div",
                  { className: "row" },
                  React.default.createElement(
                    "div",
                    { className: "av-conv" },
                    (d.nom || "?").trim()[0]?.toUpperCase(),
                  ),
                  React.default.createElement(
                    "div",
                    { style: { minWidth: 0, flex: 1 } },
                    React.default.createElement(
                      "div",
                      { className: "nm" },
                      d.nom,
                      d.attente &&
                        React.default.createElement(
                          "span",
                          { className: "pill promo", style: { marginLeft: 6 } },
                          "Nouveau",
                        ),
                    ),
                    React.default.createElement("div", { className: "de conv-der" }, d.dernier),
                  ),
                  React.default.createElement(
                    "div",
                    { className: "de", style: { flexShrink: 0 } },
                    d.maj ? heureMsg(d.maj) : "",
                  ),
                ),
              ),
            ),
          ),
          !!a.length &&
            React.default.createElement(
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
          React.default.createElement(
            "div",
            { className: "de", style: { marginTop: 8 } },
            "Donn\xE9es personnelles (RGPD) : les conversations sont \xE0 supprimer au plus tard 1 an apr\xE8s le dernier message.",
          ),
        ),
  );
}
var ACTIONS = [
  { id: "aucune", label: "Aucune" },
  { id: "carte", label: "Voir la carte" },
  { id: "appeler", label: "Appeler l'\xE9picerie" },
];
function Pubs({ d: t, set: set }) {
  let [n, setM] = (0, React.useState)(null),
    i = t.pubs || [],
    s = () => {
      if (!n.photo) return ft("Ajoutez une image : c'est l'essentiel d'une banni\xE8re.");
      set("pubs", (u) =>
        n.id ? u.map((d) => (d.id === n.id ? n : d)) : [...u, { ...n, id: Wr(), ordre: u.length }],
      ),
        setM(null);
    },
    o = (u, d) => {
      let h = u + d;
      if (h < 0 || h >= i.length) return;
      let p = [...i];
      ([p[u], p[h]] = [p[h], p[u]]),
        set("pubs", (m) => m.map((w) => ({ ...w, ordre: p.findIndex((E) => E.id === w.id) })));
    },
    a = i.filter((u) => statut2(u)[0] === "on").length;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Banni\xE8res"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Les grandes images en haut de l'application : plateaux de f\xEAtes, nouveaut\xE9s, \xE9v\xE9nements. Elles d\xE9filent toutes seules. Format conseill\xE9 : photo horizontale.",
    ),
    React.default.createElement(
      "button",
      {
        className: "btn terra",
        onClick: () => setM({ photo: "", titre: "", texte: "", action: "carte", fin: "", active: !0 }),
      },
      I10.plus(),
      "Nouvelle banni\xE8re",
    ),
    React.default.createElement(
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
      React.default.createElement(Vn, {
        t: "Aucune banni\xE8re",
        s: "Une belle photo de plateau et deux mots suffisent : \xAB Plateaux de No\xEBl \u2014 commandez avant le 20 \xBB.",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      i.map((u, d) =>
        React.default.createElement(
          "div",
          { className: "card", key: u.id, style: { padding: 0, overflow: "hidden" } },
          React.default.createElement(
            "div",
            { style: { position: "relative" } },
            u.photo
              ? React.default.createElement("img", {
                  src: u.photo,
                  alt: "",
                  style: { width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" },
                })
              : React.default.createElement("div", {
                  style: { aspectRatio: "16/9", background: "var(--apple-soft)" },
                }),
            React.default.createElement(Pastille, {
              x: u,
              fem: !0,
              style: { position: "absolute", top: 9, left: 9 },
            }),
          ),
          React.default.createElement(
            "div",
            { className: "row", style: { padding: "11px 13px" } },
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, u.titre || "Sans titre"),
              React.default.createElement(
                "div",
                { className: "de" },
                "Action : ",
                ACTIONS.find((h) => h.id === u.action)?.label || "Aucune",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(
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
              React.default.createElement(
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
              React.default.createElement(ze, {
                on: u.active !== !1,
                set: () =>
                  set("pubs", (h) => h.map((p) => (p.id === u.id ? { ...p, active: p.active === !1 } : p))),
              }),
              React.default.createElement("button", { className: "ib", onClick: () => setM(u) }, I10.pen()),
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer cette banni\xE8re ?")) &&
                    set("pubs", (h) => h.filter((p) => p.id !== u.id)),
                },
                I10.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    n &&
      React.default.createElement(
        ut,
        { titre: n.id ? "Modifier la banni\xE8re" : "Nouvelle banni\xE8re", onClose: () => setM(null) },
        React.default.createElement(PhotoField, {
          value: n.photo,
          max: 1400,
          onChange: (u) => setM((d) => ({ ...d, photo: u })),
        }),
        React.default.createElement("label", { className: "lab" }, "Titre (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: n.titre,
          onChange: (u) => setM({ ...n, titre: u.target.value }),
          placeholder: "Plateaux de No\xEBl",
        }),
        React.default.createElement("label", { className: "lab" }, "Petit texte (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: n.texte,
          onChange: (u) => setM({ ...n, texte: u.target.value }),
          placeholder: "Commandez avant le 20 d\xE9cembre",
        }),
        React.default.createElement("label", { className: "lab" }, "Quand le client touche la banni\xE8re"),
        React.default.createElement(
          "div",
          { className: "seg", style: { marginBottom: 0 } },
          ACTIONS.map((u) =>
            React.default.createElement(
              "button",
              {
                key: u.id,
                className: n.action === u.id ? "on" : "",
                onClick: () => setM({ ...n, action: u.id }),
              },
              u.label,
            ),
          ),
        ),
        React.default.createElement(Periode, { v: n, onChange: setM }),
        React.default.createElement(
          "div",
          { className: "tog", style: { marginTop: 6 } },
          React.default.createElement(
            "span",
            { style: { fontSize: 13, fontWeight: 700 } },
            "Visible par les clients",
          ),
          React.default.createElement(
            "div",
            { className: "rt" },
            React.default.createElement(ze, {
              on: n.active !== !1,
              set: () => setM({ ...n, active: n.active === !1 }),
            }),
          ),
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 12 }, onClick: s },
          "Enregistrer",
        ),
      ),
  );
}
function Actus({ d: d, set: set }) {
  let [m, setM] = (0, React.useState)(null),
    i = () => {
      m.titre?.trim() &&
        (set("actus", (s) => (m.id ? s.map((o) => (o.id === m.id ? m : o)) : [{ ...m, id: Wr() }, ...s])),
        setM(null));
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Actualit\xE9s"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Vos publications : cr\xE9ations maison, arrivages, menu du jour, fermeture exceptionnelle\u2026",
    ),
    React.default.createElement(
      "button",
      {
        className: "btn dark",
        onClick: () =>
          setM({ titre: "", texte: "", photo: "", date: new Date().toLocaleDateString("fr-FR"), active: !0 }),
      },
      I10.plus(),
      "Nouvelle publication",
    ),
    React.default.createElement("div", { style: { height: 12 } }),
    !d.actus.length &&
      React.default.createElement(Vn, {
        t: "Aucune publication",
        s: "Une photo et deux lignes suffisent : vos clients voient la nouveaut\xE9 d\xE8s l'ouverture de l'application.",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      d.actus.map((s) =>
        React.default.createElement(
          "div",
          { className: "card", key: s.id },
          React.default.createElement(
            "div",
            { className: "row" },
            s.photo
              ? React.default.createElement("img", { className: "thumb", src: s.photo, alt: "" })
              : React.default.createElement("div", { className: "thumb" }),
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, s.titre),
              React.default.createElement("div", { className: "de" }, s.date),
              React.default.createElement(Pastille, { x: s, fem: !0, style: { marginTop: 5 } }),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: s.active !== !1,
                set: () =>
                  set("actus", (o) => o.map((a) => (a.id === s.id ? { ...a, active: a.active === !1 } : a))),
              }),
              React.default.createElement("button", { className: "ib", onClick: () => setM(s) }, I10.pen()),
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer cette publication ?")) &&
                    set("actus", (o) => o.filter((a) => a.id !== s.id)),
                },
                I10.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    m &&
      React.default.createElement(
        ut,
        { titre: m.id ? "Modifier" : "Nouvelle publication", onClose: () => setM(null) },
        React.default.createElement(PhotoField, {
          value: m.photo,
          onChange: (s) => setM((o) => ({ ...o, photo: s })),
        }),
        React.default.createElement("label", { className: "lab" }, "Titre"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: m.titre,
          onChange: (s) => setM({ ...m, titre: s.target.value }),
          placeholder: "Nos tartes maison sont arriv\xE9es",
        }),
        React.default.createElement("label", { className: "lab" }, "Texte"),
        React.default.createElement("textarea", {
          className: "inp",
          value: m.texte,
          onChange: (s) => setM({ ...m, texte: s.target.value }),
        }),
        React.default.createElement("label", { className: "lab" }, "Date affich\xE9e"),
        React.default.createElement("input", {
          className: "inp",
          value: m.date,
          onChange: (s) => setM({ ...m, date: s.target.value }),
        }),
        React.default.createElement(Periode, { v: m, onChange: setM }),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: i },
          "Publier",
        ),
      ),
  );
}
function Producteurs({ d: t, set: set }) {
  let [n, r] = (0, React.useState)(null),
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
      set("producteurs", (u) =>
        n.id
          ? u.map((d) => (d.id === n.id ? a : d))
          : [...u, { ...a, id: Wr(), ordre: u.length, active: !0 }],
      ),
        r(null);
    },
    o = (a, u) => {
      let d = [...i];
      ([d[a], d[u]] = [d[u], d[a]]),
        set("producteurs", (h) => h.map((p) => ({ ...p, ordre: d.findIndex((m) => m.id === p.id) })));
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Nos producteurs"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Pr\xE9sentez les producteurs dont vous vendez les produits : une photo, quelques mots. Ils apparaissent sur l'accueil de l'appli.",
    ),
    React.default.createElement(
      "button",
      {
        className: "btn dark",
        onClick: () => r({ nom: "", metier: "", lieu: "", texte: "", produits: "", lien: "", photo: "" }),
      },
      I10.plus(),
      "Ajouter un producteur",
    ),
    React.default.createElement("div", { style: { height: 12 } }),
    !i.length &&
      React.default.createElement(Vn, {
        t: "Aucun producteur",
        s: "Exemple : la fromagerie du village, le mara\xEEcher d'\xE0 c\xF4t\xE9, l'apiculteur\u2026",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      i.map((a, u) =>
        React.default.createElement(
          "div",
          { className: "card", key: a.id, style: { opacity: a.active === !1 ? 0.55 : 1 } },
          React.default.createElement(
            "div",
            { className: "row" },
            a.photo
              ? React.default.createElement("img", {
                  className: "thumb",
                  src: a.photo,
                  alt: "",
                  style: { borderRadius: "50%" },
                })
              : React.default.createElement(
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
            React.default.createElement(
              "div",
              { style: { minWidth: 0 } },
              React.default.createElement("div", { className: "nm" }, a.nom),
              React.default.createElement(
                "div",
                { className: "de" },
                [a.metier, a.lieu].filter(Boolean).join(" \xB7 "),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              u > 0 &&
                React.default.createElement(
                  "button",
                  { className: "ib", onClick: () => o(u, u - 1), "aria-label": "Monter" },
                  "\u2191",
                ),
              React.default.createElement(ze, {
                on: a.active !== !1,
                set: () =>
                  set("producteurs", (d) =>
                    d.map((h) => (h.id === a.id ? { ...h, active: h.active === !1 } : h)),
                  ),
              }),
              React.default.createElement("button", { className: "ib", onClick: () => r(a) }, I10.pen()),
              React.default.createElement(
                "button",
                {
                  className: "ib",
                  onClick: async () =>
                    (await De("Supprimer " + a.nom + " ?")) &&
                    set("producteurs", (d) => d.filter((h) => h.id !== a.id)),
                },
                I10.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    n &&
      React.default.createElement(
        ut,
        { titre: n.id ? "Modifier" : "Nouveau producteur", onClose: () => r(null) },
        React.default.createElement(PhotoField, {
          value: n.photo,
          onChange: (a) => r((u) => ({ ...u, photo: a })),
        }),
        React.default.createElement("label", { className: "lab" }, "Nom"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: n.nom,
          maxLength: 60,
          onChange: (a) => r({ ...n, nom: a.target.value }),
          placeholder: "Ex : Fromagerie de la Vall\xE9e",
        }),
        React.default.createElement("label", { className: "lab" }, "Ce qu'il fait"),
        React.default.createElement("input", {
          className: "inp",
          value: n.metier,
          maxLength: 60,
          onChange: (a) => r({ ...n, metier: a.target.value }),
          placeholder: "Ex : Fromager, mara\xEEcher, apiculteur\u2026",
        }),
        React.default.createElement("label", { className: "lab" }, "Village"),
        React.default.createElement("input", {
          className: "inp",
          value: n.lieu,
          maxLength: 60,
          onChange: (a) => r({ ...n, lieu: a.target.value }),
          placeholder: "Ex : Faucogney-et-la-Mer",
        }),
        React.default.createElement("label", { className: "lab" }, "Quelques mots"),
        React.default.createElement("textarea", {
          className: "inp",
          value: n.texte,
          maxLength: 600,
          onChange: (a) => r({ ...n, texte: a.target.value }),
          placeholder: "Son histoire, sa fa\xE7on de travailler\u2026",
        }),
        React.default.createElement("label", { className: "lab" }, "Ses produits \xE0 l'\xE9picerie"),
        React.default.createElement("input", {
          className: "inp",
          value: n.produits,
          maxLength: 200,
          onChange: (a) => r({ ...n, produits: a.target.value }),
          placeholder: "Ex : comt\xE9, morbier, cancoillotte",
        }),
        React.default.createElement("label", { className: "lab" }, "Lien vers sa page (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: n.lien,
          placeholder: "https://\u2026",
          autoCapitalize: "off",
          onChange: (a) => r({ ...n, lien: a.target.value }),
        }),
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 6 } },
          "Demandez-lui son accord avant de publier sa photo et son nom.",
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: s },
          "Enregistrer",
        ),
      ),
  );
}
function Recettes({ d: t, set: set }) {
  let [n, r] = (0, React.useState)(null),
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
      set("recettes", (a) =>
        n.id
          ? a.map((u) => (u.id === n.id ? o : u))
          : [{ ...o, id: Wr(), cree: Date.now(), active: !0 }, ...a],
      ),
        r(null);
    };
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "La recette de la semaine"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "La recette la plus r\xE9cente s'affiche sur l'accueil de l'appli, les pr\xE9c\xE9dentes juste en dessous. \xC9crivez un ingr\xE9dient ou une \xE9tape par ligne.",
    ),
    React.default.createElement(
      "button",
      {
        className: "btn dark",
        onClick: () =>
          r({ titre: "", duree: "", personnes: 4, intro: "", ingredients: "", etapes: "", photo: "" }),
      },
      I10.plus(),
      "Nouvelle recette",
    ),
    React.default.createElement("div", { style: { height: 12 } }),
    !i.length &&
      React.default.createElement(Vn, {
        t: "Aucune recette",
        s: "Exemple : la tarte aux myrtilles, la cancoillotte chaude, la pot\xE9e\u2026",
      }),
    i.map((o, a) =>
      React.default.createElement(
        "div",
        { className: "card", key: o.id, style: { opacity: o.active === !1 ? 0.55 : 1 } },
        React.default.createElement(
          "div",
          { className: "row" },
          o.photo
            ? React.default.createElement("img", { className: "thumb", src: o.photo, alt: "" })
            : React.default.createElement(
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
          React.default.createElement(
            "div",
            { style: { minWidth: 0 } },
            React.default.createElement("div", { className: "nm" }, o.titre),
            React.default.createElement(
              "div",
              { className: "de" },
              a === 0 && o.active !== !1 ? "\u2B50 Recette de la semaine \xB7 " : "",
              new Date(o.cree || 0).toLocaleDateString("fr-FR"),
            ),
          ),
          React.default.createElement(
            "div",
            { className: "rt" },
            React.default.createElement(ze, {
              on: o.active !== !1,
              set: () =>
                set("recettes", (u) => u.map((d) => (d.id === o.id ? { ...d, active: d.active === !1 } : d))),
            }),
            React.default.createElement("button", { className: "ib", onClick: () => r(o) }, I10.pen()),
            React.default.createElement(
              "button",
              {
                className: "ib",
                onClick: async () =>
                  (await De("Supprimer \xAB " + o.titre + " \xBB ?")) &&
                  set("recettes", (u) => u.filter((d) => d.id !== o.id)),
              },
              I10.bin(),
            ),
          ),
        ),
      ),
    ),
    n &&
      React.default.createElement(
        ut,
        { titre: n.id ? "Modifier la recette" : "Nouvelle recette", onClose: () => r(null) },
        React.default.createElement(PhotoField, {
          value: n.photo,
          onChange: (o) => r((a) => ({ ...a, photo: o })),
        }),
        React.default.createElement("label", { className: "lab" }, "Titre"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: n.titre,
          maxLength: 80,
          onChange: (o) => r({ ...n, titre: o.target.value }),
          placeholder: "Ex : Tarte aux myrtilles de grand-m\xE8re",
        }),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 2, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Temps"),
            React.default.createElement("input", {
              className: "inp",
              value: n.duree,
              maxLength: 40,
              onChange: (o) => r({ ...n, duree: o.target.value }),
              placeholder: "Ex : 45 min",
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Personnes"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              value: n.personnes,
              onChange: (o) => r({ ...n, personnes: o.target.value }),
            }),
          ),
        ),
        React.default.createElement("label", { className: "lab" }, "Petit mot (facultatif)"),
        React.default.createElement("textarea", {
          className: "inp",
          value: n.intro,
          maxLength: 400,
          onChange: (o) => r({ ...n, intro: o.target.value }),
          placeholder: "Ex : La recette pr\xE9f\xE9r\xE9e de mes clients en automne\u2026",
        }),
        React.default.createElement("label", { className: "lab" }, "Ingr\xE9dients (un par ligne)"),
        React.default.createElement("textarea", {
          className: "inp",
          value: n.ingredients,
          maxLength: 1500,
          onChange: (o) => r({ ...n, ingredients: o.target.value }),
          placeholder: `250 g de myrtilles
1 p\xE2te bris\xE9e
2 \u0153ufs`,
          style: { minHeight: 110 },
        }),
        React.default.createElement("label", { className: "lab" }, "Pr\xE9paration (une \xE9tape par ligne)"),
        React.default.createElement("textarea", {
          className: "inp",
          value: n.etapes,
          maxLength: 3e3,
          onChange: (o) => r({ ...n, etapes: o.target.value }),
          placeholder: `Pr\xE9chauffer le four \xE0 180 \xB0C
\xC9taler la p\xE2te dans le moule
\u2026`,
          style: { minHeight: 140 },
        }),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: s },
          "Enregistrer",
        ),
      ),
  );
}
function Sondages({ d: t, set: set }) {
  let n = { active: !1, id: "", question: "", mode: "choix", options: ["", ""], ...(t.sondage || {}) },
    r = (a) => set("sondage", (u) => ({ ...n, ...(u || {}), ...a })),
    i = (t.reponses || []).filter((a) => a.s === n.id),
    s = async () => {
      (n.question &&
        !(await De(
          "Commencer un nouveau sondage ? Le sondage actuel s'arr\xEAte (ses r\xE9ponses restent consultables ci-dessous jusqu'\xE0 ce que vous les effaciez).",
          { oui: "Nouveau sondage" },
        ))) ||
        set("sondage", { active: !1, id: "s" + Date.now(), question: "", mode: "choix", options: ["", ""] });
    },
    o = [...new Set((t.reponses || []).map((a) => a.s).filter((a) => a && a !== n.id))];
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Sondages et bo\xEEte \xE0 id\xE9es"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Posez une question \xE0 vos clients : ils r\xE9pondent depuis l'accueil de l'appli, de fa\xE7on anonyme (une r\xE9ponse par t\xE9l\xE9phone).",
    ),
    n.id
      ? React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            "div",
            { className: "card" },
            React.default.createElement(
              "div",
              { className: "tog" },
              React.default.createElement(
                "span",
                { style: { fontSize: 13, fontWeight: 700 } },
                "Visible dans l'appli",
                React.default.createElement(
                  "span",
                  { className: "de", style: { display: "block", fontWeight: 400 } },
                  n.active
                    ? "\u2713 Les clients voient la question sur l'accueil."
                    : "Masqu\xE9 : les clients ne le voient pas.",
                ),
              ),
              React.default.createElement(
                "div",
                { className: "rt" },
                React.default.createElement(ze, { on: n.active, set: () => r({ active: !n.active }) }),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "seg", style: { margin: "10px 0" } },
              [
                ["choix", "Choix \xE0 cocher"],
                ["libre", "Bo\xEEte \xE0 id\xE9es (texte libre)"],
              ].map(([a, u]) =>
                React.default.createElement(
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
            React.default.createElement("label", { className: "lab" }, "Question"),
            React.default.createElement("input", {
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
              React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("label", { className: "lab" }, "R\xE9ponses possibles"),
                (n.options || []).map((a, u) =>
                  React.default.createElement(
                    "div",
                    { key: u, style: { display: "flex", gap: 8, marginBottom: 6 } },
                    React.default.createElement("input", {
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
                      React.default.createElement(
                        "button",
                        {
                          className: "ib",
                          onClick: () => r({ options: n.options.filter((d, h) => h !== u) }),
                        },
                        I10.bin(),
                      ),
                  ),
                ),
                n.options.length < 6 &&
                  !i.length &&
                  React.default.createElement(
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
              React.default.createElement(
                "div",
                { className: "de", style: { marginTop: 8 } },
                "La question ne se modifie plus une fois les premi\xE8res r\xE9ponses re\xE7ues.",
              ),
          ),
          React.default.createElement(
            "div",
            { className: "card" },
            React.default.createElement(
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
                  return React.default.createElement(
                    "div",
                    { key: u, style: { marginBottom: 8 } },
                    React.default.createElement(
                      "div",
                      { style: { display: "flex", justifyContent: "space-between", fontSize: 13.5 } },
                      React.default.createElement("span", null, a || "R\xE9ponse " + (u + 1)),
                      React.default.createElement("b", null, d, " (", h, " %)"),
                    ),
                    React.default.createElement(
                      "div",
                      { style: { height: 8, borderRadius: 4, background: "#EEF3E2", overflow: "hidden" } },
                      React.default.createElement("div", {
                        style: { width: h + "%", height: "100%", background: "var(--apple)" },
                      }),
                    ),
                  );
                })
              : i.length
                ? i.map((a) =>
                    React.default.createElement(
                      "div",
                      {
                        key: a.id,
                        style: { padding: "8px 0", borderBottom: "1px solid var(--line)", fontSize: 13.5 },
                      },
                      "\u{1F4A1} ",
                      a.r,
                      React.default.createElement(
                        "div",
                        { className: "de" },
                        new Date(a.cree || 0).toLocaleDateString("fr-FR"),
                      ),
                    ),
                  )
                : React.default.createElement("div", { className: "de" }, "Pas encore de r\xE9ponse."),
          ),
          React.default.createElement(
            "button",
            { className: "btn gh", onClick: s },
            I10.plus(),
            "Nouveau sondage",
          ),
        )
      : React.default.createElement(
          "button",
          { className: "btn dark", onClick: s },
          I10.plus(),
          "Cr\xE9er un sondage",
        ),
    o.length > 0 &&
      React.default.createElement(
        "div",
        { className: "card", style: { marginTop: 12 } },
        React.default.createElement(
          "div",
          { className: "nm", style: { marginBottom: 6 } },
          "Anciens sondages",
        ),
        React.default.createElement(
          "div",
          { className: "de", style: { marginBottom: 8 } },
          (t.reponses || []).filter((a) => a.s !== n.id).length,
          " r\xE9ponse(s) d'anciens sondages sont encore gard\xE9es.",
        ),
        React.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { width: "auto" },
            onClick: async () =>
              (await De("Effacer les r\xE9ponses des anciens sondages ?", { oui: "Effacer" })) &&
              set("reponses", (a) => a.filter((u) => u.s === n.id)),
          },
          "Effacer les anciennes r\xE9ponses",
        ),
      ),
  );
}
function RoueAdmin({ d: t, set: set }) {
  let n = oc(t.roue),
    r = (E) => set("roue", (A) => ({ ...oc(A), ...E })),
    i = (E, A) => r({ tirages: n.tirages.map((S) => (S.id === E ? { ...S, ...A } : S)) }),
    s = VS(t.clients, n).sort((E, A) => A.tickets - E.tickets),
    o = s.reduce((E, A) => E + A.tickets, 0),
    [a, u] = (0, React.useState)(null),
    [d, h] = (0, React.useState)(null),
    p = BS(n),
    m = [
      { id: "a", prenom: "Jean", tickets: 3 },
      { id: "b", prenom: "Sophie", tickets: 5 },
      { id: "c", prenom: "Michel", tickets: 2 },
      { id: "d", prenom: "Claire", tickets: 4 },
      { id: "e", prenom: "Paul", tickets: 1 },
    ],
    w = s.length >= 2 ? s : m;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("style", null, WS),
    React.default.createElement("div", { className: "t1" }, "Roue de No\xEBl"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Chaque tampon en caisse offre un tour de roue au client (une chance sur deux). Chaque \xAB Gagn\xE9 \xBB = 1 ticket pour le prochain tirage au sort. Le tirage se lance depuis la caisse, sur l'iPad.",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "tog" },
        React.default.createElement(
          "span",
          { style: { fontSize: 13, fontWeight: 700 } },
          "Roue active",
          React.default.createElement(
            "span",
            { className: "de", style: { display: "block", fontWeight: 400 } },
            p
              ? "\u2713 La roue tourne en ce moment \xE0 chaque tampon."
              : n.active
                ? "Active, mais en dehors des dates choisies."
                : "D\xE9sactiv\xE9e : aucun tour de roue en caisse.",
          ),
        ),
        React.default.createElement(
          "div",
          { className: "rt" },
          React.default.createElement(ze, { on: n.active, set: () => r({ active: !n.active }) }),
        ),
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 10 } },
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("label", { className: "lab" }, "Du"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            style: { width: "100%", minWidth: 0, boxSizing: "border-box" },
            value: n.debut || "",
            onChange: (E) => r({ debut: E.target.value }),
          }),
        ),
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("label", { className: "lab" }, "Au (inclus)"),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            style: { width: "100%", minWidth: 0, boxSizing: "border-box" },
            value: n.fin || "",
            onChange: (E) => r({ fin: E.target.value }),
          }),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 6 } },
        "\u{1F3A1} Voir la d\xE9mo",
      ),
      React.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 10 } },
        "Ce que voit le client dans son appli, et l'animation du tirage sur l'iPad. Rien n'est enregistr\xE9.",
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
        React.default.createElement(
          "button",
          { className: "btn sm", style: { width: "auto" }, onClick: () => u("g") },
          "Roue : tour gagn\xE9",
        ),
        React.default.createElement(
          "button",
          { className: "btn gh sm", style: { width: "auto" }, onClick: () => u("p") },
          "Roue : tour perdu",
        ),
        React.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { width: "auto" },
            onClick: () => {
              h(w[Math.floor(Math.random() * w.length)]), u("tirage");
            },
          },
          "Animation du tirage",
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 6 } },
        "\u{1F381} Tirages au sort",
      ),
      React.default.createElement(
        "div",
        { className: "de", style: { marginBottom: 8 } },
        "Les dates sont des rep\xE8res : le tirage se fait quand vous appuyez sur \xAB Lancer le tirage \xBB dans la caisse. Apr\xE8s chaque tirage, les tickets repartent \xE0 z\xE9ro.",
      ),
      n.tirages.map((E) =>
        React.default.createElement(
          "div",
          { key: E.id, className: "tir-adm" },
          React.default.createElement("input", {
            className: "inp",
            value: E.titre || "",
            maxLength: 60,
            disabled: E.fait,
            onChange: (A) => i(E.id, { titre: A.target.value }),
          }),
          React.default.createElement("input", {
            className: "inp",
            type: "date",
            value: E.date || "",
            disabled: E.fait,
            onChange: (A) => i(E.id, { date: A.target.value }),
            style: { maxWidth: 160 },
          }),
          E.fait
            ? React.default.createElement(
                "span",
                { className: "de" },
                "\u2713 Gagnant : ",
                React.default.createElement("b", null, E.gagnant),
              )
            : React.default.createElement(
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
      React.default.createElement(
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
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "nm", style: { marginBottom: 6 } },
        "\u{1F39F}\uFE0F Tickets en jeu pour le prochain tirage : ",
        o,
      ),
      s.length
        ? s.map((E) =>
            React.default.createElement(
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
              React.default.createElement("span", null, E.nom || E.prenom),
              React.default.createElement("b", null, E.tickets, " ticket", E.tickets > 1 ? "s" : ""),
            ),
          )
        : React.default.createElement("div", { className: "de" }, "Aucun ticket pour l'instant."),
      n.annonce?.prenom &&
        React.default.createElement(
          "div",
          { className: "de", style: { marginTop: 10 } },
          "Dernier gagnant annonc\xE9 dans l'appli : ",
          React.default.createElement("b", null, n.annonce.prenom),
          " (",
          new Date(n.annonce.date).toLocaleDateString("fr-FR"),
          ")",
        ),
    ),
    a === "g" || a === "p"
      ? React.default.createElement(RoueNoel, {
          key: a,
          demo: !0,
          premiere: !1,
          tours: [{ g: a === "g", t: 0 }],
          tickets: null,
          onFini: () => u(null),
        })
      : a === "tirage"
        ? React.default.createElement(
            "div",
            { className: "roue-fond", onClick: () => {} },
            React.default.createElement(
              "div",
              { className: "roue-in", style: { maxWidth: 560 } },
              React.default.createElement("h2", null, "Tirage au sort"),
              d && React.default.createElement(TirageAuSort, { participants: w, gagnant: d }),
              React.default.createElement(
                "button",
                { className: "roue-b2", style: { marginTop: 10 }, onClick: () => u(null) },
                "Fermer la d\xE9mo",
              ),
            ),
          )
        : null,
  );
}
function Fidelite({ d: t, set: set }) {
  let [n, r] = (0, React.useState)("clients"),
    [i, s] = (0, React.useState)(""),
    [o, a] = (0, React.useState)(!1),
    [u, d] = (0, React.useState)(""),
    [h, p] = (0, React.useState)(null),
    [m, w] = (0, React.useState)(null),
    [E, A] = (0, React.useState)(null),
    [S, _] = (0, React.useState)("achat"),
    [I, T] = (0, React.useState)(""),
    [M, V] = (0, React.useState)(""),
    O = t.fidelite,
    [b, v] = (0, React.useState)(!1),
    x = (L) => t.clients.find((z) => z.id === L) || E,
    C = async () => {
      let L = parseFloat(I);
      if (!L || b) return;
      let z = Math.floor(L / (O.parEuro || 10));
      v(!0);
      try {
        await ajouterPoints(x(E.id), z, { type: "achat", montant: L }), A(null), T("");
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
          await ajouterPoints(L, -F.points, { type: "remise", remise: F.euros });
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
          await ajouterPoints(
            x(E.id),
            L,
            L > 0 ? { type: "achat", source: "admin" } : { type: "manuel", motif: "Correction" },
          ),
            A(null),
            V("");
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
      for (; !Ae || (!h.id && t.clients.some((Je) => Je.code === Ae)); ) Ae = U9();
      set("clients", (Je) =>
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
        p(null);
    },
    Y = eC(O) && MENTION_EXCLUSIONS(O),
    U = Object.values(t.clients.reduce((L, z) => ((L[z.code] = L[z.code] || []).push(z), L), {})).filter(
      (L) => L.length > 1,
    ),
    [G, Z] = (0, React.useState)(null),
    fe = async (L, z, ne) => {
      if (!b) {
        v(!0);
        try {
          await ajouterRecompense(L, z, ne, Y);
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
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "Fid\xE9lit\xE9"),
    React.default.createElement(
      "div",
      { className: "sub" },
      Y
        ? "Carte \xE0 tampons : au comptoir, ouvrez la Caisse sur votre iPhone, le client pr\xE9sente son QR code, bip, c'est tamponn\xE9."
        : "Scannez ou saisissez le code du client, puis ajoutez ses points. Les anciennes cartes papier se reprennent en ajout manuel.",
    ),
    U.length > 0 &&
      React.default.createElement(
        "div",
        { className: "cmd-alerte", style: { marginBottom: 12 } },
        "\u26A0\uFE0F Code en double : ",
        U.map((L) => L[0].code + " (" + L.map((z) => z.nom).join(", ") + ")").join(" \xB7 "),
        ". Supprimez l'une des cartes et recr\xE9ez-la (un nouveau code sera donn\xE9).",
      ),
    React.default.createElement(
      "div",
      { className: "seg" },
      React.default.createElement(
        "button",
        { className: n === "clients" ? "on" : "", onClick: () => r("clients") },
        "Clients (",
        t.clients.length,
        ")",
      ),
      React.default.createElement(
        "button",
        { className: n === "reglages" ? "on" : "", onClick: () => r("reglages") },
        "R\xE9glages",
      ),
    ),
    n === "clients" &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, marginBottom: 12 } },
          Y
            ? React.default.createElement(
                "a",
                { className: "btn dark", href: "caisse.html", style: { textDecoration: "none" } },
                I10.qr(),
                "Ouvrir la caisse",
              )
            : React.default.createElement(
                "button",
                { className: "btn dark", onClick: () => a(!0) },
                I10.qr(),
                "Encaisser",
              ),
          React.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { flex: "0 0 auto", padding: "13px 16px" },
              onClick: () => p({ nom: "", tel: "", points: 0 }),
            },
            I10.plus(16, "#5C6A62"),
          ),
        ),
        React.default.createElement("input", {
          className: "inp",
          placeholder: "Rechercher un client\u2026",
          value: i,
          onChange: (L) => s(L.target.value),
          style: { marginBottom: 12 },
        }),
        !t.clients.length &&
          React.default.createElement(Vn, {
            t: "Aucun client inscrit",
            s: "Vos clients cr\xE9ent eux-m\xEAmes leur carte depuis l'application. Vous pouvez aussi en ajouter un ici.",
          }),
        React.default.createElement(
          "div",
          { className: "grille" },
          ce.map((L) => {
            let z = (O.paliers || []).find((ge) => ge.at > (L.points || 0)),
              ne = _2(O, L.points || 0);
            return React.default.createElement(
              "div",
              { className: "card", key: L.id },
              React.default.createElement(
                "div",
                { className: "row" },
                React.default.createElement(
                  "div",
                  { style: { minWidth: 0 } },
                  React.default.createElement("div", { className: "nm" }, L.nom),
                  React.default.createElement(
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
                  React.default.createElement(
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
                React.default.createElement(
                  "div",
                  { className: "rt" },
                  React.default.createElement(
                    "div",
                    { style: { textAlign: "center" } },
                    React.default.createElement(
                      "div",
                      { style: { fontSize: 22, fontWeight: 800, color: "var(--gold)", lineHeight: 1 } },
                      Y ? (L.tampons || 0) + "/" + Y.nb : L.points || 0,
                    ),
                    React.default.createElement(
                      "div",
                      { style: { fontSize: 9, color: "var(--ink3)" } },
                      Y ? "tampons" : "points",
                    ),
                  ),
                  Y
                    ? React.default.createElement(
                        "button",
                        { className: "btn sm", onClick: () => Z(L) },
                        "Tampons",
                      )
                    : React.default.createElement(
                        "button",
                        {
                          className: "btn sm",
                          onClick: () => {
                            A(L), _("achat"), T(""), V("");
                          },
                        },
                        "Points",
                      ),
                  React.default.createElement(
                    "button",
                    {
                      className: "ib",
                      onClick: async () =>
                        (await De("Supprimer " + L.nom + " ?")) &&
                        set("clients", (ge) => ge.filter((ve) => ve.id !== L.id)),
                    },
                    I10.bin(),
                  ),
                ),
              ),
            );
          }),
        ),
      ),
    n === "reglages" &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Conservation, { d: t, set: set }),
        Y &&
          React.default.createElement(
            "div",
            { className: "card" },
            React.default.createElement(
              "div",
              { style: { fontWeight: 800, fontSize: 14, marginBottom: 4 } },
              "Carte \xE0 tampons",
            ),
            React.default.createElement("div", { className: "de", style: { marginBottom: 6 } }, A2(O)),
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 10 } },
              React.default.createElement(
                "div",
                { style: { flex: 1 } },
                React.default.createElement("label", { className: "lab" }, "Tampons sur la carte"),
                React.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "numeric",
                  min: "3",
                  max: "30",
                  value: O.tampons?.nb ?? it.nb,
                  onChange: (L) =>
                    set("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), nb: L.target.value },
                    })),
                }),
              ),
              React.default.createElement(
                "div",
                { style: { flex: 1 } },
                React.default.createElement("label", { className: "lab" }, "1er cadeau au\u2026 (0 = aucun)"),
                React.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "numeric",
                  min: "0",
                  value: O.tampons?.palier ?? it.palier,
                  onChange: (L) =>
                    set("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), palier: L.target.value },
                    })),
                }),
              ),
            ),
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 10 } },
              React.default.createElement(
                "div",
                { style: { flex: 1 } },
                React.default.createElement("label", { className: "lab" }, "Achat minimum (\u20AC)"),
                React.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "decimal",
                  value: O.tampons?.seuil ?? it.seuil,
                  onChange: (L) =>
                    set("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), seuil: L.target.value },
                    })),
                }),
              ),
            ),
            Y.palier > 0 &&
              React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement(
                  "label",
                  { className: "lab" },
                  "1er cadeau (au ",
                  Y.palier,
                  "e tampon)",
                ),
                React.default.createElement("input", {
                  className: "inp",
                  value: O.tampons?.recompense1 ?? it.recompense1,
                  maxLength: 60,
                  onChange: (L) =>
                    set("fidelite", (z) => ({
                      ...z,
                      tampons: { ...it, ...(z.tampons || {}), recompense1: L.target.value },
                    })),
                }),
              ),
            React.default.createElement(
              "label",
              { className: "lab" },
              Y.palier
                ? "Gros cadeau (carte pleine, " + Y.nb + "e tampon)"
                : "R\xE9compense quand la carte est pleine",
            ),
            React.default.createElement("input", {
              className: "inp",
              value: O.tampons?.recompense ?? it.recompense,
              maxLength: 60,
              onChange: (L) =>
                set("fidelite", (z) => ({
                  ...z,
                  tampons: { ...it, ...(z.tampons || {}), recompense: L.target.value },
                })),
            }),
            React.default.createElement("label", { className: "lab" }, "Produits qui ne comptent pas"),
            React.default.createElement("input", {
              className: "inp",
              value: O.tampons?.exclus ?? it.exclus,
              maxLength: 120,
              onChange: (L) =>
                set("fidelite", (z) => ({
                  ...z,
                  tampons: { ...it, ...(z.tampons || {}), exclus: L.target.value },
                })),
            }),
            React.default.createElement(
              "label",
              { className: "lab" },
              "Pas deux tampons en moins de\u2026 (minutes)",
            ),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              value: O.tampons?.delai ?? it.delai,
              onChange: (L) =>
                set("fidelite", (z) => ({
                  ...z,
                  tampons: { ...it, ...(z.tampons || {}), delai: L.target.value },
                })),
              style: { maxWidth: 160 },
            }),
            React.default.createElement(
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
              MENTION_EXCLUSIONS(O).exclus,
              " \xBB.",
            ),
          ),
        React.default.createElement(
          "div",
          { className: "card" },
          React.default.createElement(
            "div",
            { className: "tog" },
            React.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              "Programme actif",
              React.default.createElement(
                "span",
                { className: "de", style: { display: "block", fontWeight: 400 } },
                O.active
                  ? "Les clients voient leur carte et leurs points."
                  : "D\xE9sactiv\xE9 : les clients voient \xAB La carte de fid\xE9lit\xE9 arrive bient\xF4t \xBB.",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: O.active,
                set: () => set("fidelite", (L) => ({ ...L, active: !L.active })),
              }),
            ),
          ),
          React.default.createElement(
            "div",
            { className: "tog" },
            React.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              "\u{1F382} Tampon d'anniversaire",
              React.default.createElement(
                "span",
                { className: "de", style: { display: "block", fontWeight: 400 } },
                O.anniv !== !1
                  ? "Le jour de son anniversaire (si le client l'a indiqu\xE9), un tampon est ajout\xE9 \xE0 sa carte automatiquement, avec une notification."
                  : "D\xE9sactiv\xE9.",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: O.anniv !== !1,
                set: () => set("fidelite", (L) => ({ ...L, anniv: L.anniv === !1 })),
              }),
            ),
          ),
          React.default.createElement(
            "div",
            { className: "tog" },
            React.default.createElement(
              "span",
              { style: { fontSize: 13, fontWeight: 700 } },
              "\u{1F91D} Parrainage",
              React.default.createElement(
                "span",
                { className: "de", style: { display: "block", fontWeight: 400 } },
                O.parrainage !== !1
                  ? "Un client parraine un voisin : au 1er passage du voisin, la caisse donne 1 tampon \xE0 chacun."
                  : "D\xE9sactiv\xE9 : le bloc \xAB Parrainez un voisin \xBB est masqu\xE9.",
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: O.parrainage !== !1,
                set: () => set("fidelite", (L) => ({ ...L, parrainage: L.parrainage === !1 })),
              }),
            ),
          ),
          React.default.createElement("label", { className: "lab" }, "Titre affich\xE9"),
          React.default.createElement("input", {
            className: "inp",
            value: O.titre,
            onChange: (L) => set("fidelite", (z) => ({ ...z, titre: L.target.value })),
          }),
          React.default.createElement("label", { className: "lab" }, "Phrase d'explication"),
          React.default.createElement("input", {
            className: "inp",
            value: O.sousTitre,
            onChange: (L) => set("fidelite", (z) => ({ ...z, sousTitre: L.target.value })),
          }),
          !Y &&
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 10 } },
              React.default.createElement(
                "div",
                { style: { flex: 1 } },
                React.default.createElement("label", { className: "lab" }, "1 point tous les\u2026 (\u20AC)"),
                React.default.createElement("input", {
                  className: "inp",
                  type: "number",
                  inputMode: "numeric",
                  value: O.parEuro,
                  onChange: (L) => set("fidelite", (z) => ({ ...z, parEuro: +L.target.value || 1 })),
                }),
              ),
              !F &&
                React.default.createElement(
                  "div",
                  { style: { flex: 1 } },
                  React.default.createElement("label", { className: "lab" }, "Points sur la carte"),
                  React.default.createElement("input", {
                    className: "inp",
                    type: "number",
                    inputMode: "numeric",
                    value: O.total,
                    onChange: (L) => set("fidelite", (z) => ({ ...z, total: +L.target.value || 10 })),
                  }),
                ),
            ),
        ),
        !Y &&
          React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "div",
              { className: "card" },
              React.default.createElement(
                "div",
                { className: "tog", style: { borderTop: "none", paddingTop: 0 } },
                React.default.createElement(
                  "div",
                  null,
                  React.default.createElement(
                    "div",
                    { style: { fontSize: 13, fontWeight: 800 } },
                    "Remise en euros",
                  ),
                  React.default.createElement(
                    "div",
                    { className: "de" },
                    "Les points se transforment en bon de r\xE9duction",
                  ),
                ),
                React.default.createElement(
                  "div",
                  { className: "rt" },
                  React.default.createElement(ze, {
                    on: !!F,
                    set: () =>
                      set("fidelite", (L) => ({
                        ...L,
                        remise: { ...Na, ...(L.remise || {}), active: !(L.remise && L.remise.active !== !1) },
                      })),
                  }),
                ),
              ),
              F &&
                React.default.createElement(
                  "div",
                  { style: { display: "flex", gap: 10, alignItems: "flex-end" } },
                  React.default.createElement(
                    "div",
                    { style: { flex: 1 } },
                    React.default.createElement("label", { className: "lab" }, "Nombre de points"),
                    React.default.createElement("input", {
                      className: "inp",
                      type: "number",
                      inputMode: "numeric",
                      value: O.remise.points,
                      onChange: (L) =>
                        set("fidelite", (z) => ({
                          ...z,
                          remise: { ...z.remise, points: +L.target.value || 1 },
                        })),
                    }),
                  ),
                  React.default.createElement(
                    "div",
                    { style: { paddingBottom: 14, fontWeight: 800, color: "var(--ink3)" } },
                    "=",
                  ),
                  React.default.createElement(
                    "div",
                    { style: { flex: 1 } },
                    React.default.createElement("label", { className: "lab" }, "Remise (\u20AC)"),
                    React.default.createElement("input", {
                      className: "inp",
                      type: "number",
                      inputMode: "decimal",
                      step: "0.5",
                      value: O.remise.euros,
                      onChange: (L) =>
                        set("fidelite", (z) => ({ ...z, remise: { ...z.remise, euros: L.target.value } })),
                    }),
                  ),
                ),
              F &&
                React.default.createElement(
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
            React.default.createElement(
              "div",
              { className: "hd", style: { marginTop: 6 } },
              React.default.createElement(
                "div",
                { style: { fontWeight: 800, fontSize: 14 } },
                "R\xE9compenses",
              ),
              React.default.createElement(
                "button",
                {
                  className: "btn gh sm",
                  onClick: () =>
                    set("fidelite", (L) => ({
                      ...L,
                      paliers: [...(L.paliers || []), { at: (L.paliers?.length + 1) * 5 || 5, label: "" }],
                    })),
                },
                "Ajouter",
              ),
            ),
            !(O.paliers || []).length &&
              React.default.createElement(Vn, {
                t: "Aucune r\xE9compense",
                s: "Exemple : 5 points = une baguette offerte.",
              }),
            (O.paliers || []).map((L, z) =>
              React.default.createElement(
                "div",
                { className: "card", key: z },
                React.default.createElement(
                  "div",
                  { className: "row" },
                  React.default.createElement("input", {
                    className: "inp",
                    type: "number",
                    inputMode: "numeric",
                    style: { width: 66, textAlign: "center", fontWeight: 800, color: "var(--gold)" },
                    value: L.at,
                    onChange: (ne) =>
                      set("fidelite", (ge) => ({
                        ...ge,
                        paliers: ge.paliers.map((ve, Ae) =>
                          Ae === z ? { ...ve, at: +ne.target.value || 0 } : ve,
                        ),
                      })),
                  }),
                  React.default.createElement("input", {
                    className: "inp",
                    style: { flex: 1 },
                    placeholder: "R\xE9compense",
                    value: L.label,
                    onChange: (ne) =>
                      set("fidelite", (ge) => ({
                        ...ge,
                        paliers: ge.paliers.map((ve, Ae) =>
                          Ae === z ? { ...ve, label: ne.target.value } : ve,
                        ),
                      })),
                  }),
                  React.default.createElement(
                    "button",
                    {
                      className: "ib",
                      onClick: () =>
                        set("fidelite", (ne) => ({
                          ...ne,
                          paliers: ne.paliers.filter((ge, ve) => ve !== z),
                        })),
                    },
                    I10.bin(),
                  ),
                ),
              ),
            ),
          ),
      ),
    o &&
      React.default.createElement(
        ut,
        { titre: "Encaisser un client", onClose: () => a(!1) },
        React.default.createElement(
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
          I10.qr(40, "#6E9B3A"),
          React.default.createElement(
            "div",
            { style: { fontSize: 12, color: "var(--ink3)", marginTop: 8 } },
            "Demandez au client d'afficher son QR code, puis saisissez son code.",
          ),
        ),
        React.default.createElement("label", { className: "lab" }, "Code client"),
        React.default.createElement("input", {
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
        React.default.createElement(
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
        return React.default.createElement(
          ut,
          { titre: L.nom, onClose: () => Z(null) },
          React.default.createElement(
            "div",
            { style: { textAlign: "center", marginBottom: 14 } },
            React.default.createElement("div", { style: { fontSize: 12, color: "var(--ink3)" } }, L.code),
            React.default.createElement(
              "div",
              { style: { fontSize: 40, fontWeight: 800, color: "var(--gold)", lineHeight: 1.1 } },
              z,
              " / ",
              Y.nb,
            ),
            React.default.createElement("div", { style: { fontSize: 11, color: "var(--ink3)" } }, "tampons"),
          ),
          z >= Y.nb
            ? React.default.createElement(
                "button",
                { className: "btn terra", disabled: b, onClick: () => fe(L, -z, "recompense") },
                "\u{1F381}\u{1F381} ",
                Y.recompense,
                " donn\xE9 : remettre \xE0 z\xE9ro",
              )
            : Y.palier && z >= Y.palier
              ? React.default.createElement(
                  "button",
                  { className: "btn terra", disabled: b, onClick: () => fe(L, -z, "recompense1") },
                  "\u{1F381} ",
                  Y.recompense1,
                  " donn\xE9 : remettre \xE0 z\xE9ro",
                )
              : null,
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8, marginTop: 10 } },
            React.default.createElement(
              "button",
              { className: "btn gh", disabled: b || z <= 0, onClick: () => fe(L, -1, "correction") },
              "\u2212 1 tampon",
            ),
          ),
          React.default.createElement(
            "div",
            { className: "de", style: { marginTop: 10 } },
            "Les tampons s'ajoutent uniquement avec la Caisse (scan ou recherche du nom). Ici, seulement pour corriger une erreur.",
          ),
          React.default.createElement(
            "button",
            {
              className: "btn gh",
              style: { marginTop: 12 },
              onClick: () => {
                Z(null), w(L);
              },
            },
            "\u{1F4F1} R\xE9installer la carte sur un nouveau t\xE9l\xE9phone",
          ),
        );
      })(),
    E &&
      React.default.createElement(
        ut,
        { titre: E.nom, onClose: () => A(null) },
        React.default.createElement(
          "div",
          { style: { textAlign: "center", marginBottom: 14 } },
          React.default.createElement("div", { style: { fontSize: 12, color: "var(--ink3)" } }, E.code),
          React.default.createElement(
            "div",
            { style: { fontSize: 40, fontWeight: 800, color: "var(--gold)", lineHeight: 1.1 } },
            t.clients.find((L) => L.id === E.id)?.points || 0,
          ),
          React.default.createElement("div", { style: { fontSize: 11, color: "var(--ink3)" } }, "points"),
        ),
        F &&
          (() => {
            let L = _2(O, t.clients.find((z) => z.id === E.id)?.points || 0);
            return L.nb > 0
              ? React.default.createElement(
                  "button",
                  { className: "btn terra", style: { marginBottom: 12 }, disabled: b, onClick: P },
                  "\u{1F381} Appliquer ",
                  eo(L.euros),
                  " de remise (\u2212",
                  L.points,
                  " points)",
                  L.nb > 1 ? " \xB7 " + L.nb + " disponibles" : "",
                )
              : React.default.createElement(
                  "div",
                  { className: "de", style: { textAlign: "center", marginBottom: 12 } },
                  "Encore ",
                  L.manque,
                  " points pour ",
                  eo(L.euros),
                  " de remise",
                );
          })(),
        React.default.createElement(
          "div",
          { className: "de", style: { textAlign: "center", marginBottom: 2 } },
          "Saisissez les points \xE0 cr\xE9diter (un nombre n\xE9gatif en retire, par exemple pour corriger une erreur ou reprendre une carte papier).",
        ),
        React.default.createElement("label", { className: "lab" }, "Points"),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 8, alignItems: "center" } },
          React.default.createElement(
            "button",
            {
              className: "btn gh sm",
              style: { width: 46 },
              onClick: () => V(String((parseInt(M) || 0) - 1)),
            },
            "\u2212",
          ),
          React.default.createElement("input", {
            className: "inp",
            type: "number",
            inputMode: "numeric",
            value: M,
            onChange: (L) => V(L.target.value),
            style: { textAlign: "center", fontSize: 22, fontWeight: 800, color: "var(--apple)" },
          }),
          React.default.createElement(
            "button",
            { className: "btn sm", style: { width: 46 }, onClick: () => V(String((parseInt(M) || 0) + 1)) },
            "+",
          ),
        ),
        !!parseInt(M) &&
          React.default.createElement(
            "div",
            { className: "card", style: { textAlign: "center", marginTop: 12 } },
            React.default.createElement(
              "div",
              { style: { fontSize: 11, color: "var(--ink3)" } },
              "Nouveau total",
            ),
            React.default.createElement(
              "div",
              { style: { fontSize: 30, fontWeight: 800, color: "var(--apple)" } },
              Math.max(0, (t.clients.find((L) => L.id === E.id)?.points || 0) + parseInt(M)),
            ),
          ),
        React.default.createElement(
          "button",
          {
            className: "btn gh",
            style: { marginTop: 12 },
            onClick: () => {
              let L = t.clients.find((z) => z.id === E.id) || E;
              A(null), w(L);
            },
          },
          "\u{1F4F1} R\xE9installer la carte sur un nouveau t\xE9l\xE9phone",
        ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, disabled: !parseInt(M) || b, onClick: k },
          parseInt(M) < 0
            ? "Retirer " + -parseInt(M) + " points"
            : "Cr\xE9diter " + (parseInt(M) || "") + " points",
        ),
      ),
    h &&
      React.default.createElement(
        ut,
        { titre: h.id ? "Modifier le client" : "Nouveau client", onClose: () => p(null) },
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 10 } },
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Pr\xE9nom"),
            React.default.createElement("input", {
              className: "inp",
              autoFocus: !0,
              value: h.prenom ?? (h.nom || "").split(" ")[0],
              onChange: (L) => p({ ...h, prenom: L.target.value }),
            }),
          ),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement("label", { className: "lab" }, "Nom"),
            React.default.createElement("input", {
              className: "inp",
              value: h.nomFamille ?? (h.nom || "").split(" ").slice(1).join(" "),
              onChange: (L) => p({ ...h, nomFamille: L.target.value }),
            }),
          ),
        ),
        React.default.createElement("label", { className: "lab" }, "T\xE9l\xE9phone"),
        React.default.createElement("input", {
          className: "inp",
          type: "tel",
          value: h.tel,
          onChange: (L) => p({ ...h, tel: L.target.value }),
        }),
        React.default.createElement("label", { className: "lab" }, "E-mail"),
        React.default.createElement("input", {
          className: "inp",
          type: "email",
          autoCapitalize: "off",
          value: h.email || "",
          onChange: (L) => p({ ...h, email: L.target.value }),
        }),
        !Y &&
          React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("label", { className: "lab" }, "Points de d\xE9part"),
            React.default.createElement("input", {
              className: "inp",
              type: "number",
              inputMode: "numeric",
              value: h.points,
              onChange: (L) => p({ ...h, points: +L.target.value || 0 }),
            }),
          ),
        !h.id &&
          React.default.createElement(
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
            React.default.createElement("input", {
              type: "checkbox",
              checked: !!h.informe,
              onChange: (L) => p({ ...h, informe: L.target.checked }),
              style: { width: 20, height: 20, flexShrink: 0, accentColor: "#6E9B3A" },
            }),
            React.default.createElement(
              "span",
              null,
              "Le client a \xE9t\xE9 inform\xE9 que ses nom, t\xE9l\xE9phone et e-mail servent uniquement \xE0 sa carte de fid\xE9lit\xE9, et qu'il peut les faire supprimer \xE0 tout moment.",
            ),
          ),
        React.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: Q },
          "Enregistrer",
        ),
        h.id &&
          React.default.createElement(
            "button",
            {
              className: "btn gh",
              style: { marginTop: 8 },
              onClick: () => {
                let L = t.clients.find((z) => z.id === h.id) || h;
                p(null), w(L);
              },
            },
            "\u{1F4F1} R\xE9installer la carte sur un nouveau t\xE9l\xE9phone",
          ),
      ),
    m && React.default.createElement(QrCarteClient, { c: m, onClose: () => w(null) }),
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
function QrPixels({ texte: texte, taille: taille = 240 }) {
  let n = (0, React.useMemo)(() => {
    let r = PC(0, "M");
    r.addData(texte), r.make();
    let i = r.getModuleCount(),
      s = "";
    for (let o = 0; o < i; o++)
      for (let a = 0; a < i; a++) r.isDark(o, a) && (s += "M" + a + " " + o + "h1v1h-1z");
    return { d: s, n: i };
  }, [texte]);
  return React.default.createElement(
    "svg",
    {
      viewBox: "-2 -2 " + (n.n + 4) + " " + (n.n + 4),
      width: taille,
      height: taille,
      shapeRendering: "crispEdges",
      style: { display: "block", margin: "0 auto", background: "#fff" },
    },
    React.default.createElement("path", { d: n.d, fill: "#000" }),
  );
}
function QrCarteClient({ c: c, onClose: onClose }) {
  let n = c.prenom || (c.nom || "").split(" ")[0] || "ce client";
  return React.default.createElement(
    ut,
    { titre: "Carte de " + n, onClose: onClose },
    React.default.createElement(
      "div",
      { className: "de", style: { fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, marginBottom: 12 } },
      "Le client ouvre l'",
      React.default.createElement("b", null, "appareil photo"),
      " de son nouveau t\xE9l\xE9phone et scanne ce code : l'application s'ouvre et r\xE9cup\xE8re sa carte (m\xEAme code ",
      c.code,
      ", m\xEAmes tampons, m\xEAme historique). Il touche ensuite \xAB R\xE9cup\xE9rer \xBB.",
    ),
    React.default.createElement(QrPixels, { texte: z7(c) }),
    React.default.createElement(
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
    React.default.createElement(
      "div",
      { className: "de", style: { marginTop: 8 } },
      "Si l'ancien t\xE9l\xE9phone a \xE9t\xE9 vol\xE9, l'ancien t\xE9l\xE9phone garde aussi l'acc\xE8s \xE0 la carte : dans ce cas, mieux vaut cr\xE9er une nouvelle carte et y reporter les tampons.",
    ),
    React.default.createElement(
      "button",
      { className: "btn", style: { marginTop: 12 }, onClick: onClose },
      "Termin\xE9",
    ),
  );
}
var lN = (t) => t.derniere || t.depuis || "";
function Conservation({ d: d, set: set }) {
  let n = d.legal?.conservation || 3,
    r = new Date();
  r.setFullYear(r.getFullYear() - n);
  let i = r.toLocaleDateString("sv-SE"),
    s = d.clients.filter((o) => lN(o) && lN(o) < i);
  return React.default.createElement(
    "div",
    { className: "card", style: { background: "#F6F9EF", borderColor: "#D9E6C2" } },
    React.default.createElement("div", { className: "nm" }, "Dur\xE9e de conservation (RGPD)"),
    React.default.createElement(
      "div",
      { className: "de", style: { marginBottom: 10 } },
      "Les cartes sans aucun passage en caisse depuis ",
      n,
      " ans doivent \xEAtre supprim\xE9es.",
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 10, alignItems: "center" } },
      React.default.createElement("label", { className: "lab", style: { margin: 0 } }, "Conserver"),
      React.default.createElement(
        "select",
        {
          className: "inp",
          style: { width: "auto" },
          value: n,
          onChange: (o) => set("legal", (a) => ({ ...a, conservation: +o.target.value })),
        },
        [1, 2, 3].map((o) =>
          React.default.createElement("option", { key: o, value: o }, o, " an", o > 1 ? "s" : ""),
        ),
      ),
      React.default.createElement(
        "span",
        { style: { fontSize: 12, color: "var(--ink3)" } },
        "apr\xE8s le dernier passage",
      ),
    ),
    React.default.createElement(
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
      React.default.createElement(
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
            )) && set("clients", (o) => o.filter((a) => !s.some((u) => u.id === a.id))),
        },
        "Supprimer les cartes inactives",
      ),
  );
}
function InfosLegales({ d: d, set: set }) {
  let n = Object.fromEntries(
      Object.entries({ ...EMPTY2.legal, ...(d.legal || {}) }).map(([s, o]) => [
        s,
        o === "" || o == null ? EMPTY2.legal[s] : o,
      ]),
    ),
    r = (s, o) => set("legal", (a) => ({ ...EMPTY2.legal, ...(a || {}), [s]: o })),
    i = (s, o, a) =>
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement("label", { className: "lab" }, o),
        React.default.createElement("input", {
          className: "inp",
          value: n[s] || "",
          placeholder: a,
          onChange: (u) => r(s, u.target.value),
        }),
      );
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 4px" } },
      "Informations l\xE9gales",
    ),
    React.default.createElement(
      "div",
      { className: "sub", style: { margin: "0 0 8px" } },
      "Affich\xE9es dans \xAB Mentions l\xE9gales \xBB et \xAB Confidentialit\xE9 \xBB de l'application (onglet Infos).",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      i("raison", "Raison sociale", "LTMP"),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: "0 10px", flexWrap: "wrap" } },
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("forme", "Forme juridique", "SARL"),
        ),
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("capital", "Capital social (\u20AC)", "3 000"),
        ),
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: "0 10px", flexWrap: "wrap" } },
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("siren", "SIREN", "979 301 132"),
        ),
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("rcs", "RCS", "RCS Vesoul"),
        ),
      ),
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: "0 10px", flexWrap: "wrap" } },
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("tva", "N\xB0 TVA intracommunautaire", "FR00979301132"),
        ),
        React.default.createElement(
          "div",
          { style: { flex: "1 1 230px", minWidth: 0 } },
          i("naf", "Activit\xE9 (code NAF)", "47.11B"),
        ),
      ),
      i("responsable", "Responsable / directrice de publication", "Marion Parnaso"),
      i("emailDonnees", "E-mail pour les demandes RGPD", d.store.email),
      i("hebergementDonnees", "Lieu d'h\xE9bergement des donn\xE9es", "Union europ\xE9enne"),
      React.default.createElement(
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
async function idAleatoire(t) {
  let n =
    Ew()?.id ||
    [...crypto.getRandomValues(new Uint32Array(24))]
      .map((i) => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"[i % 56])
      .join("");
  await setDoc(doc2(db2, "appareilsAdmin", n), { token: t, appareil: typeAppareil(), maj: Date.now() });
  let r = { id: n, token: t };
  try {
    localStorage.setItem(Mf, JSON.stringify(r));
  } catch {}
  return r;
}
var cN = "epicerie-raddonnaise-admin-notif-plus-tard";
function BlocNotifsAdmin({ d: t }) {
  let e = t.push?.vapid || "",
    n = Er(t.cmd).script,
    [r, i] = (0, React.useState)(!1),
    [s, o] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(() => {
      let u = !1;
      return (
        (async () => {
          if (!(!e || !ac(n) || bN() || !(await lf()))) {
            if (Notification.permission === "granted")
              try {
                let d = await Yu(e),
                  h = Ew();
                !u && d.token && (!h?.id || d.token !== h.token) && (await idAleatoire(d.token));
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
      ? React.default.createElement(
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
          React.default.createElement("div", { style: { fontSize: 28 } }, "\u{1F514}"),
          React.default.createElement(
            "div",
            { style: { flex: 1, minWidth: 0 } },
            React.default.createElement(
              "div",
              { className: "nm" },
              "\xCAtre pr\xE9venue sur ce t\xE9l\xE9phone",
            ),
            React.default.createElement(
              "div",
              { className: "de" },
              "Commandes, r\xE9servations et messages des clients.",
            ),
          ),
          React.default.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: 6 } },
            React.default.createElement(
              "button",
              {
                className: "btn sm",
                style: { width: "auto" },
                disabled: s,
                onClick: async () => {
                  o(!0);
                  try {
                    let u = await Yu(e);
                    u.token && (await idAleatoire(u.token));
                  } catch {}
                  o(!1), i(!1);
                },
              },
              "Activer",
            ),
            React.default.createElement(
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
function NotificationsAdmin({ d: t }) {
  let e = t.push?.vapid || "",
    n = Er(t.cmd).script,
    [r, i] = (0, React.useState)(Ew),
    [s, o] = (0, React.useState)("\u2026"),
    [a, u] = (0, React.useState)(""),
    d = async (E) => {
      let A =
        r?.id ||
        [...crypto.getRandomValues(new Uint32Array(24))]
          .map((_) => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"[_ % 56])
          .join("");
      await setDoc(doc2(db2, "appareilsAdmin", A), { token: E, appareil: typeAppareil(), maj: Date.now() });
      let S = { id: A, token: E };
      try {
        localStorage.setItem(Mf, JSON.stringify(S));
      } catch {}
      return i(S), S;
    };
  (0, React.useEffect)(() => {
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
      o("\u2026"), u("");
      try {
        let E = await Yu(e);
        if (E.erreur) return o(E.erreur === "refus" ? "refus" : "nonsup");
        await d(E.token), o("on");
      } catch {
        o("off"), ft("Activation impossible pour le moment. R\xE9essayez plus tard.");
      }
    },
    p = async () => {
      if (await De("Ne plus recevoir les notifications sur ce t\xE9l\xE9phone ?", { oui: "Couper" })) {
        try {
          r?.id && (await deleteDoc(doc2(db2, "appareilsAdmin", r.id)));
        } catch {}
        try {
          localStorage.removeItem(Mf);
        } catch {}
        i(null), o("off");
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
  return React.default.createElement(
    "div",
    { className: "card" },
    React.default.createElement(
      "div",
      { className: "nm", style: { marginBottom: 4 } },
      "\u{1F514} \xCAtre pr\xE9venue sur ce t\xE9l\xE9phone",
    ),
    React.default.createElement("div", { className: "de", style: { marginBottom: 10 } }, w),
    s === "off" &&
      React.default.createElement("button", { className: "btn", onClick: h }, "Activer les notifications"),
    s === "on" &&
      React.default.createElement(
        "div",
        { style: { display: "flex", gap: 8, flexWrap: "wrap" } },
        React.default.createElement(
          "button",
          { className: "btn gh sm", style: { width: "auto" }, onClick: m },
          "Envoyer un essai",
        ),
        React.default.createElement(
          "button",
          {
            className: "btn gh sm",
            style: { width: "auto", marginLeft: "auto", color: "var(--red)", borderColor: "#EBC9C2" },
            onClick: p,
          },
          "Couper",
        ),
      ),
    a && React.default.createElement("div", { className: "de", style: { marginTop: 8, fontWeight: 700 } }, a),
    React.default.createElement(
      "div",
      { className: "de", style: { marginTop: 8, fontSize: 12 } },
      "\xC0 activer sur chaque t\xE9l\xE9phone ou tablette o\xF9 vous voulez \xEAtre pr\xE9venue.",
    ),
  );
}
function Reglages({ d: t, set: set, reinitialiser: reinitialiser }) {
  let [r, i] = (0, React.useState)(null),
    s = t.store,
    o = (h, p) => set("store", (m) => ({ ...m, [h]: p })),
    [a, u] = (0, React.useState)(null),
    d = async () => {
      u("prep");
      try {
        let h = [];
        for (let w of t.clients || []) {
          let E = await getDocs(collection(db2, "clients", String(w.id), "historique")),
            A = [];
          E.forEach((S) => A.push({ id: S.id, ...S.data() })), h.push({ ...w, historique: A });
        }
        let p = { ...t, clients: h, sauvegardeLe: new Date().toISOString(), version: VERSION },
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
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement("div", { className: "t1" }, "L'\xE9picerie"),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Coordonn\xE9es, horaires et services affich\xE9s dans l'onglet Infos (les services n'apparaissent plus sur l'accueil).",
    ),
    React.default.createElement(NotificationsAdmin, { d: t }),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement("label", { className: "lab" }, "Nom"),
      React.default.createElement("input", {
        className: "inp",
        value: s.name,
        onChange: (h) => o("name", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "Slogan"),
      React.default.createElement("input", {
        className: "inp",
        value: s.slogan,
        onChange: (h) => o("slogan", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "Adresse"),
      React.default.createElement("input", {
        className: "inp",
        value: s.address,
        onChange: (h) => o("address", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "T\xE9l\xE9phone"),
      React.default.createElement("input", {
        className: "inp",
        type: "tel",
        value: s.phone,
        onChange: (h) => o("phone", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "E-mail"),
      React.default.createElement("input", {
        className: "inp",
        type: "email",
        value: s.email,
        onChange: (h) => o("email", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "Page Facebook"),
      React.default.createElement("input", {
        className: "inp",
        value: s.facebook,
        placeholder: "https://facebook.com/\u2026",
        onChange: (h) => o("facebook", h.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "Lien pour laisser un avis Google"),
      React.default.createElement("input", {
        className: "inp",
        value: s.avis || "",
        placeholder: "https://g.page/r/\u2026/review",
        autoCapitalize: "off",
        onChange: (h) => o("avis", h.target.value.trim()),
      }),
      React.default.createElement(
        "div",
        { className: "de", style: { marginTop: 4 } },
        "Dans Google (fiche de l'\xE9picerie) \u2192 \xAB Demander des avis \xBB \u2192 copier le lien. Les clients le voient dans Infos, et une fois apr\xE8s une commande retir\xE9e.",
      ),
    ),
    React.default.createElement(Fermetures, { d: t, set: set }),
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 8px" } },
      "Onglets visibles par les clients",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      [
        ["carte", "La carte (plateaux & paniers)"],
        ["fidelite", "Carte de fid\xE9lit\xE9"],
      ].map(([h, p]) =>
        React.default.createElement(
          "div",
          { className: "tog", key: h },
          React.default.createElement("span", { style: { fontSize: 13, fontWeight: 700 } }, p),
          React.default.createElement(
            "div",
            { className: "rt" },
            React.default.createElement(ze, {
              on: t.onglets?.[h] !== !1,
              set: () => set("onglets", (m) => ({ ...m, [h]: m?.[h] === !1 })),
            }),
          ),
        ),
      ),
    ),
    React.default.createElement(InfosLegales, { d: t, set: set }),
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "16px 0 8px" } },
      "Horaires",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      t.hours.map((h, p) =>
        React.default.createElement(
          "div",
          {
            key: p,
            className: "hor-ligne",
            style: { borderBottom: p < 6 ? "1px solid var(--line)" : "none" },
          },
          React.default.createElement("span", { style: { fontSize: 12.5, fontWeight: 700 } }, h.day),
          React.default.createElement("input", {
            className: "inp",
            style: { padding: "8px 6px", fontSize: 12.5 },
            value: h.am,
            placeholder: "Ferm\xE9",
            "aria-label": h.day + " matin",
            onChange: (m) =>
              set("hours", (w) => w.map((E, A) => (A === p ? { ...E, am: m.target.value } : E))),
          }),
          React.default.createElement("input", {
            className: "inp",
            style: { padding: "8px 6px", fontSize: 12.5 },
            value: h.pm,
            placeholder: "\u2014",
            "aria-label": h.day + " apr\xE8s-midi",
            onChange: (m) =>
              set("hours", (w) => w.map((E, A) => (A === p ? { ...E, pm: m.target.value } : E))),
          }),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "hd", style: { marginTop: 18 } },
      React.default.createElement("div", { style: { fontWeight: 800, fontSize: 14 } }, "Services"),
      React.default.createElement(
        "button",
        { className: "btn gh sm", onClick: () => i({ label: "", desc: "", active: !0 }) },
        "Ajouter",
      ),
    ),
    !t.services.length &&
      React.default.createElement(Vn, {
        t: "Aucun service",
        s: "Ex : D\xE9p\xF4t de pain, Relais Pickup, Station-service, Plats \xE0 emporter, Droguerie.",
      }),
    React.default.createElement(
      "div",
      { className: "grille" },
      t.services.map((h) =>
        React.default.createElement(
          "div",
          { className: "card", key: h.id },
          React.default.createElement(
            "div",
            { className: "row" },
            React.default.createElement(
              "div",
              null,
              React.default.createElement("div", { className: "nm" }, h.label),
              h.desc && React.default.createElement("div", { className: "de" }, h.desc),
            ),
            React.default.createElement(
              "div",
              { className: "rt" },
              React.default.createElement(ze, {
                on: h.active !== !1,
                set: () =>
                  set("services", (p) =>
                    p.map((m) => (m.id === h.id ? { ...m, active: m.active === !1 } : m)),
                  ),
              }),
              React.default.createElement("button", { className: "ib", onClick: () => i(h) }, I10.pen()),
              React.default.createElement(
                "button",
                { className: "ib", onClick: () => set("services", (p) => p.filter((m) => m.id !== h.id)) },
                I10.bin(),
              ),
            ),
          ),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 8px" } },
      "Application",
    ),
    React.default.createElement(BoutonMaj, null),
    React.default.createElement(
      "div",
      { style: { fontWeight: 800, fontSize: 14, margin: "18px 0 8px" } },
      "Sauvegarde",
    ),
    React.default.createElement(
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
      ? React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            "button",
            { className: "btn gh", onClick: d },
            "Pr\xE9parer une sauvegarde",
          ),
          a?.erreur &&
            React.default.createElement(
              "div",
              { className: "de", style: { color: "#B3261E", marginTop: 6 } },
              "La sauvegarde n'a pas pu \xEAtre pr\xE9par\xE9e (r\xE9seau ?). R\xE9essayez.",
            ),
        )
      : a === "prep"
        ? React.default.createElement(
            "button",
            { className: "btn gh", disabled: !0 },
            "Pr\xE9paration de la sauvegarde\u2026",
          )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "a",
              {
                className: "btn",
                href: a.url,
                download: a.nom,
                style: { textDecoration: "none", textAlign: "center", display: "block" },
              },
              "T\xE9l\xE9charger la sauvegarde",
            ),
            React.default.createElement(
              "div",
              { className: "de", style: { marginTop: 6 } },
              a.n,
              " carte",
              a.n > 1 ? "s" : "",
              " avec leur historique de tampons, commandes, r\xE9glages et contenus.",
            ),
          ),
    React.default.createElement(
      "button",
      {
        className: "btn gh",
        style: { marginTop: 8, color: "var(--red)" },
        onClick: async () =>
          (await De(`Effacer tout le contenu affich\xE9 aux clients (articles du jour, offres, actualit\xE9s, plateaux, pubs, coordonn\xE9es et horaires) ?

Les cartes de fid\xE9lit\xE9, les commandes, les messages et les r\xE9glages techniques sont conserv\xE9s.`)) &&
          reinitialiser(),
      },
      "R\xE9initialiser le contenu",
    ),
    r &&
      React.default.createElement(
        ut,
        { titre: r.id ? "Modifier le service" : "Nouveau service", onClose: () => i(null) },
        React.default.createElement("label", { className: "lab" }, "Nom"),
        React.default.createElement("input", {
          className: "inp",
          autoFocus: !0,
          value: r.label,
          onChange: (h) => i({ ...r, label: h.target.value }),
          placeholder: "Relais Pickup",
        }),
        React.default.createElement("label", { className: "lab" }, "Pr\xE9cision (facultatif)"),
        React.default.createElement("input", {
          className: "inp",
          value: r.desc,
          onChange: (h) => i({ ...r, desc: h.target.value }),
          placeholder: "Retrait et d\xE9p\xF4t de colis",
        }),
        React.default.createElement(
          "button",
          {
            className: "btn",
            style: { marginTop: 14 },
            onClick: () => {
              r.label.trim() &&
                (set("services", (h) =>
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
var msgErreur = (t) =>
  ({
    "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
    "auth/wrong-password": "E-mail ou mot de passe incorrect.",
    "auth/user-not-found": "E-mail ou mot de passe incorrect.",
    "auth/invalid-email": "Adresse e-mail invalide.",
    "auth/too-many-requests": "Trop de tentatives. Patientez quelques minutes.",
    "auth/network-request-failed": "Pas de connexion internet.",
  })[t?.code] || "Connexion impossible. R\xE9essayez.";
function Connexion() {
  let [email, setEmail] = (0, React.useState)(""),
    [mdp, setMdp] = (0, React.useState)(""),
    [err, setErr] = (0, React.useState)(""),
    [info, setInfo] = (0, React.useState)(""),
    [load, setLoad] = (0, React.useState)(!1),
    h = async () => {
      if (!(!email.trim() || !mdp || load)) {
        setErr(""), setInfo(""), setLoad(!0);
        try {
          await signInWithEmailAndPassword(auth2, email.trim(), mdp);
        } catch (m) {
          setErr(msgErreur(m)), setLoad(!1);
        }
      }
    },
    p = async () => {
      if ((setErr(""), setInfo(""), !email.trim())) return setErr("Saisissez d'abord votre adresse e-mail.");
      try {
        await sendPasswordResetEmail(auth2, email.trim()),
          setInfo("Si ce compte existe, un e-mail de r\xE9initialisation vient d'\xEAtre envoy\xE9.");
      } catch (m) {
        setErr(msgErreur(m));
      }
    };
  return React.default.createElement(
    "div",
    { className: "adm" },
    React.default.createElement("style", null, CSS_ADMIN),
    React.default.createElement(
      "div",
      { className: "wrap", style: { paddingTop: 48 } },
      React.default.createElement(
        "div",
        { style: { textAlign: "center", marginBottom: 26 } },
        React.default.createElement("img", {
          src: LOGO,
          alt: "",
          style: { width: 92, height: 92, borderRadius: "50%", border: "3px solid #EEF3E2" },
        }),
        React.default.createElement("div", { className: "t1", style: { marginTop: 12 } }, "Administration"),
        React.default.createElement(
          "div",
          { style: { fontSize: 12.5, color: "var(--ink3)", marginTop: 6 } },
          "\xC9picerie Raddonnaise \u2014 acc\xE8s r\xE9serv\xE9 \xB7 v",
          VERSION,
        ),
      ),
      React.default.createElement("label", { className: "lab" }, "E-mail"),
      React.default.createElement("input", {
        className: "inp",
        type: "email",
        autoComplete: "username",
        value: email,
        onChange: (m) => setEmail(m.target.value),
      }),
      React.default.createElement("label", { className: "lab" }, "Mot de passe"),
      React.default.createElement("input", {
        className: "inp",
        type: "password",
        autoComplete: "current-password",
        value: mdp,
        onChange: (m) => setMdp(m.target.value),
        onKeyDown: (m) => m.key === "Enter" && h(),
      }),
      err &&
        React.default.createElement(
          "div",
          { style: { color: "var(--red)", fontSize: 12.5, fontWeight: 700, marginTop: 10 } },
          err,
        ),
      info &&
        React.default.createElement(
          "div",
          { style: { color: "var(--apple)", fontSize: 12.5, fontWeight: 700, marginTop: 10 } },
          info,
        ),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 16 }, disabled: load || !email.trim() || !mdp, onClick: h },
        load ? "Connexion\u2026" : "Se connecter",
      ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { marginTop: 8 }, onClick: p },
        "Mot de passe oubli\xE9",
      ),
    ),
  );
}
var Attente = ({ t }) =>
  React.default.createElement(
    "div",
    { className: "adm" },
    React.default.createElement("style", null, CSS_ADMIN),
    React.default.createElement(
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
function Admin() {
  let [t, e] = (0, React.useState)(void 0);
  (0, React.useEffect)(() => onAuthStateChanged2(auth2, (A) => e(A || null)), []),
    (0, React.useEffect)(() => {
      t && ck("admin");
    }, [!!t]);
  let n = useMiseAJour(),
    [r, i, s, o] = useShop(!!t),
    [a, u] = (0, React.useState)("accueil"),
    [d, h] = (0, React.useState)(!1);
  (0, React.useEffect)(() => {
    o.serveur &&
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
        }));
  }, [o.pret, !!t]);
  let p = (0, React.useRef)(new Set());
  (0, React.useEffect)(() => {
    !t ||
      !o.pret ||
      (r.clients || []).forEach((A) => {
        !/^RAD-[A-Z0-9]{5}$/.test(A.code || "") ||
          p.current.has(A.code) ||
          (p.current.add(A.code),
          setDoc(doc2(db2, "codes", A.code), { c: String(A.id) }).catch(() => p.current.delete(A.code)));
      });
  }, [!!t, o.pret, (r.clients || []).length]);
  let m = (0, React.useRef)(!1);
  (0, React.useEffect)(() => {
    if (!t || !o.serveur || !o.pret || m.current) return;
    let A = (r.clients || []).filter((S) => j9(S.id));
    A.length &&
      ((m.current = !0),
      (async () => {
        for (let S of A)
          try {
            let _ = z9(),
              I = String(S.id),
              T = await getDoc(doc2(db2, "clients", I));
            if (!T.exists()) continue;
            let M = await getDocs(collection(db2, "clients", I, "historique")),
              V = [];
            M.forEach((O) => V.push(O)), await setDoc(doc2(db2, "clients", _), T.data());
            for (let O = 0; O < V.length; O += 400) {
              let b = writeBatch(db2);
              V.slice(O, O + 400).forEach((v) =>
                b.set(doc2(db2, "clients", _, "historique", v.id), v.data()),
              ),
                await b.commit();
            }
            T.data().code && (await setDoc(doc2(db2, "codes", T.data().code), { c: _ })),
              await Pf([...V.map((O) => O.ref), doc2(db2, "clients", I)]);
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
    ((0, React.useEffect)(() => {
      document.title = (w ? "(" + w + ") " : "") + "Administration \u2014 \xC9picerie Raddonnaise";
      try {
        w && navigator.setAppBadge
          ? navigator.setAppBadge(w).catch(() => {})
          : navigator.clearAppBadge && navigator.clearAppBadge().catch(() => {});
      } catch {}
    }, [w]),
    t === void 0)
  )
    return React.default.createElement(Attente, { t: "Chargement\u2026" });
  if (!t) return React.default.createElement(Connexion, null);
  if (o.erreur === "permission-denied")
    return React.default.createElement(Attente, {
      t: "Acc\xE8s refus\xE9 : ce compte n'a pas les droits d'administration.",
    });
  if (!o.pret) return React.default.createElement(Attente, { t: "Synchronisation\u2026" });
  let E = [
    { id: "accueil", label: "Accueil", ic: I10.home },
    {
      id: "jour",
      label: "Aujourd'hui",
      ic: I10.shop,
      n: r.resas.filter((A) => A.statut === "reservee").length,
    },
    {
      id: "commandes",
      label: "Commandes",
      ic: I10.cmd,
      n: r.commandes.filter((A) => A.statut === "nouvelle").length,
    },
    { id: "messages", label: "Messages", ic: I10.bulle, n: r.conversations.filter((A) => A.attente).length },
    { id: "offres", label: "Offres", ic: I10.basket, g: "Ma vitrine" },
    { id: "actus", label: "Actus", ic: I10.news, g: "Ma vitrine" },
    { id: "pubs", label: "Pubs", ic: I10.img, g: "Ma vitrine" },
    { id: "menu", label: "Menu semaine", ic: I10.cmd, g: "Ma vitrine" },
    { id: "themes", label: "Th\xE8mes", ic: I10.sapin, g: "Ma vitrine" },
    { id: "producteurs", label: "Producteurs", ic: I10.ferme, g: "Ma vitrine" },
    { id: "recettes", label: "Recettes", ic: I10.news, g: "Ma vitrine" },
    { id: "com", label: "Communication", ic: I10.porteVoix, g: "Mes clients" },
    { id: "fidelite", label: "Fid\xE9lit\xE9", ic: I10.star, g: "Mes clients" },
    { id: "roue", label: "Roue de No\xEBl", ic: I10.sapin, g: "Mes clients" },
    { id: "sondage", label: "Sondages", ic: I10.bulle, g: "Mes clients" },
    { id: "stats", label: "Statistiques", ic: I10.graph, g: "Suivi" },
    { id: "reglages", label: "R\xE9glages", ic: I10.gear, g: "Suivi" },
  ];
  return React.default.createElement(
    "div",
    { className: "adm main" },
    React.default.createElement("style", null, CSS_ADMIN),
    React.default.createElement(
      "header",
      { className: "top" },
      React.default.createElement("img", { src: LOGO, alt: "" }),
      React.default.createElement(
        "div",
        null,
        React.default.createElement("h1", null, "Administration"),
        React.default.createElement(
          "small",
          null,
          "\xC9picerie Raddonnaise ",
          React.default.createElement("span", { className: "vers" }, "v", VERSION),
        ),
      ),
      React.default.createElement(
        "button",
        {
          onClick: async () => (await De("Se d\xE9connecter ?")) && signOut2(auth2),
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
    React.default.createElement(BlocNotifsAdmin, { d: r }),
    React.default.createElement(
      SecoursEcran,
      { key: a },
      a === "accueil" &&
        React.default.createElement(TableauDeBord, {
          d: r,
          set: i,
          aller: (A) => {
            u(A), window.scrollTo(0, 0);
          },
        }),
      a === "stats" && React.default.createElement(EcranStatistiques, { d: r }),
      a === "com" && React.default.createElement(Communication, { d: r, set: i }),
      a === "jour" && React.default.createElement(Jour, { d: r, set: i }),
      a === "commandes" && React.default.createElement(Commandes, { d: r, set: i }),
      a === "messages" && React.default.createElement(Messages, { d: r, set: i }),
      a === "offres" && React.default.createElement(Offres, { d: r, set: i }),
      a === "pubs" && React.default.createElement(Pubs, { d: r, set: i }),
      a === "themes" && React.default.createElement(Themes, { d: r, set: i }),
      a === "menu" && React.default.createElement(EditeurMenuDaval, { d: r, set: i }),
      a === "actus" && React.default.createElement(Actus, { d: r, set: i }),
      a === "producteurs" && React.default.createElement(Producteurs, { d: r, set: i }),
      a === "fidelite" && React.default.createElement(Fidelite, { d: r, set: i }),
      a === "roue" && React.default.createElement(RoueAdmin, { d: r, set: i }),
      a === "recettes" && React.default.createElement(Recettes, { d: r, set: i }),
      a === "sondage" && React.default.createElement(Sondages, { d: r, set: i }),
      a === "reglages" && React.default.createElement(Reglages, { d: r, set: i, reinitialiser: s }),
    ),
    React.default.createElement(
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
      React.default.createElement("br", null),
      "Reproduction interdite",
    ),
    React.default.createElement(BandeauMaj, { dispo: n }),
    React.default.createElement(
      "nav",
      { className: "tabs" },
      E.map((A) =>
        React.default.createElement(
          "button",
          {
            key: A.id,
            className: "tab" + (a === A.id ? " on" : "") + (RS.includes(A.id) ? "" : " sec"),
            onClick: () => {
              u(A.id), window.scrollTo(0, 0);
            },
          },
          React.default.createElement(
            "span",
            { className: "tab-ic" },
            A.ic(20, a === A.id ? "#1C433B" : "#93A099"),
            !!A.n && React.default.createElement("b", { className: "tab-n" }, A.n),
          ),
          A.label,
        ),
      ),
      (() => {
        let A = E.filter((I) => !RS.includes(I.id)),
          S = A.find((I) => I.id === a),
          _ = A.reduce((I, T) => I + (T.n || 0), 0);
        return React.default.createElement(
          "button",
          {
            className: "tab plus" + (S ? " on" : ""),
            onClick: () => h(!0),
            "aria-label": "Autres rubriques",
          },
          React.default.createElement(
            "span",
            { className: "tab-ic" },
            S ? S.ic(20, "#1C433B") : I10.plusMenu(20, "#93A099"),
            !!_ && React.default.createElement("b", { className: "tab-n" }, _),
          ),
          S ? S.label : "Plus",
        );
      })(),
    ),
    d &&
      React.default.createElement(
        "div",
        { className: "plus-fond", onClick: () => h(!1) },
        React.default.createElement(
          "div",
          {
            className: "plus-in",
            onClick: (A) => A.stopPropagation(),
            role: "dialog",
            "aria-label": "Autres rubriques",
          },
          ["Ma vitrine", "Mes clients", "Suivi"].map((A) =>
            React.default.createElement(
              "section",
              { key: A, className: "plus-g" },
              React.default.createElement("h4", null, A),
              React.default.createElement(
                "div",
                { className: "plus-l" },
                E.filter((S) => S.g === A).map((S) =>
                  React.default.createElement(
                    "button",
                    {
                      key: S.id,
                      className: a === S.id ? "on" : "",
                      onClick: () => {
                        u(S.id), h(!1), window.scrollTo(0, 0);
                      },
                    },
                    S.ic(24, a === S.id ? "#1C433B" : "#5C6A62"),
                    S.label,
                    !!S.n && React.default.createElement("b", { className: "tab-n" }, S.n),
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
(0, ReactDOMClient.createRoot)(document.getElementById("root")).render(
  React.default.createElement(Admin, null),
);
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
