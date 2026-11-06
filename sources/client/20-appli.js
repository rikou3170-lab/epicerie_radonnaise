var CHAT_KEY = "epicerie-raddonnaise-chat";
var U2 = (t) =>
    String(t || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 110),
  heureMsg = (t) => {
    let e = new Date(t),
      n = new Date(),
      r = new Date();
    r.setDate(r.getDate() - 1);
    let i = e.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    return e.toDateString() === n.toDateString()
      ? i
      : e.toDateString() === r.toDateString()
        ? "hier " + i
        : e.toLocaleDateString("fr-FR", { day: "numeric", month: "short" }) + " " + i;
  },
  jourMsg = (t) => {
    let e = new Date(t),
      n = new Date(),
      r = new Date();
    return (
      r.setDate(r.getDate() - 1),
      e.toDateString() === n.toDateString()
        ? "Aujourd'hui"
        : e.toDateString() === r.toDateString()
          ? "Hier"
          : e.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })
    );
  },
  q2 = (t) =>
    t?.id ||
    String(t?.path || "")
      .split("/")
      .pop();
var cO = () => new Date().toLocaleDateString("sv-SE"),
  USER_KEY = "epicerie-raddonnaise-carte",
  LOGO =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwMDAgQDAwMEBAQFBgoGBgUFBgwICQcKDgwPDg4MDQ0PERYTDxAVEQ0NExoTFRcYGRkZDxIbHRsYHRYYGRj/2wBDAQQEBAYFBgsGBgsYEA0QGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBj/wAARCABoAHgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5wOO9Bx3oOKDitTxQ4zRxmjjNHGaADjNHGaD1rQh0PV7jQrjW4tOnbTrcgS3W3CAkgAZ7nJHSplJR3YGfxmjjNX9P0+O9chpyG2u4jjXc5CKWYnJAAAB5z+FTXmkQx+GrbXrG6aa1luGtJElTY8MqqHwcEgqVbIPsQQO9BYyuM0cZqa1tp729jtbWMySyHCjIHbJOT0AGTmmPFIkskbId0ZIfHOMHH86AGcZo4zRxmjjNIA4zRxmjjNHGaAAY7UUDFFAAaDig0HFMA71oaVoer65cSQ6Tp0920SGSTylyEUDOWPQdDVOOGaZisMMkhA3EIpbA9eK7TwJ4k8Tabp9/oWiJAlvqJCzXEiZaLjaWTkbiASdvJ44FY13UUP3Su/MaOOs7Sa/vI7a2UM7sFyxwq5OMsegGSOTxXpdlJ4rvvhu3gy+EFvpdo8olWMATMyeXKI93IJPm7gAMtsIrIvr7SPDdu1gIbO6uDaJbTQW5KvDMpyzmZcq/8QBGSQ+DggGuPvtTv9RKC+upJlTIRGOVQE5wP89hVTpQqW51ezuvUext+F57fQ/F8t3cxW91ZRW9xbzeaRj54HTgZ5OWxxmtVUmbR7DVI9Lb+wDazvCtrAZYrK92hZDJk8kbVI3H7pTHSuDJVVycADv6VoaJY3uu30emaXIXFwdzAOdmB/E2OwqpTjBOUtEgvZHb6be+Df7Sf7Df29k17G8ZuLuBleCSS4AzxlQiw9ADyS2cCopdET/hDlt9H/cfapS1y8kouGY72EcYKD5m2xs5xwu4+vF/UvAGh6D4Lvr+6lkubuOElZC21Q54GFHue9ebWt9e2KSpZXk9uJhiQROV3geuPqfzrmwmNp4pN09loJSTC6s7qykRLu3eEuu5N4xuXJGR7ZBqDjNdjpviKx1iS0sPE8IljiJSHDiOMZARAf7iJySRnOTxk5FS48Fah/wkkGk2c1u8lxdC1jV5RujLcqJMfKG24JAJIzziumTUU23oFuxzPejvXR+NfCj+C/Ey6LNfR3cwt0lkeNdoDNn5Rnnt+tc53qadSNSKnB6MQDFFAxRVgBoJoNBxTA6PwsNMvbg6NqEF8z3EySQmyZQ0jKGxC2SOGJABHIOODmtXwjrM2i2F5/aEMttpk1yEjdh81rcbWKvGWB+ZNqbiBnHXtXEBirBlJDA5BBwQavaprmta5PHNrWrXuoyRLsja6maQovoMnigaZVuUjivJoo5xOiuQso/jGfvfjUtlp2o6nMYtN0+6vHHVbeFpCPyBrqvhf4Cn+IPj6HSN0kdlEPOu5UHzLGDjav8AtMSAPz7V9q6d4XsvB9hHoun6SmlwxqCIVXBI/vE9WJ9TXhZrnccC+SMeaX4L1LhTctT4CvtE1ayUpqOkX9sCMHzrd0/mK2PgreW2lXuqwXUdxJNEfJhSGFpXYbs4AUH2r7ivhbt8sqF3I471zGjeE4dD8R65rNqHH9rzRTyRbAqxskYT5ceuAa+fr8SrEUZU6lO3o/NeRsqa5JRb3seQ6h4A8bePLdIZY4vD+kgh8XZ3TzHsSi/dHsTXL+I/gD4p0ewa90m7t9ZVBl4YlMcuPZSSG+gOa+rraG2kQt5RyOPmNLNZRshMQ2sOw6GvOoZ9iqFlSso9rfrv+JPsVY/Pl1ZJGjkQo6kqysMEHuCK7bwjqUmszW+g6hPDvRwYJpZPLlZeSYlk2nbk87spwOWwMV6B8ffAkFusfjTTYFjLyCG/RBgMT92T69j+FeExztBcJJDKY5VOVIOCDX6Bl+OhjaCrR67rszFpxdjR16C+h16d9RljlnlJkLxymVSMkcM3JAxgZ7Dv1rM71JNcS3MokmYMwGBhQvH0AqPvXalbREgMUUDFFAATignFBOKCcUwDPNV576C3uord93mSEBQB61YzzWZqunvdTQXUTvvtzuCA43DOT+NTK9tDSkouVpvQ+vP2RoLeys9R1xrdppW1COEqi5YqqZAH4vmvoPxPqq6v4he4SF4kRREFkGG465Hbk18zfsj+LorWTWLG2eN54ZY72ON+pBGxwR7fL+dfQ15dSXuoTXkwUPK5dgvQZr88z2tKNWrRb3kna3Sytr+h0w0hYgIBOSATS1yGq/EvwtpHitvD08moXF3E6R3DWdjLcRWrPjYJXRSEJyDz61154BJ4A714Eqc4JOStcpprcKK5fxHqHj1dWhsPBXhWx1FfJM897qN2YIF5wIl2hmLnrkjAHrXRWb3UmnwSX1sttdNGplgV94jfHKhuM4PGaudCcYKo9mNwaSk9mcR8TbGK/wDhp4ktZANps5HHsyjeD+YFfBxiuP8AhMfMjQGHywz89MjGfrxX3L8XdWOlfCXxJdpgySW7W8Sk4yzkIP518W2lu0Ks0r75ZDudsY/Ae1fZ8Jxl7Cb6c36GLnyXfdWLA9KM80Z5xRnmvrTlAHNFAOaKAAnFBOKCcUE4pgGeaD6UZ5ozzQBv+A/Ez+B/iNY+J7eHeYiY7hF4MsLcOv8AUe4FfdGlapYa3ottq2l3KXFncxiSKVTwQf69iPWvz4PXFekfCz4t6l8Pr02N2kl9ocz7pLYH5oSf4489D6joa+bz/J3i4qtSXvr8V/mawqW0Z9o2z2lvbzKLRPMlO5nAA3HGMn14FcX4i+GvhLxdr39q+I7S8vmFt9mW2+3TRQAZJ3bEYAtzjJ9q0fDvjHw54q0tb/Q9TiuYiOVB+dD6MvUH61D4m8aaF4V077brGow2kXQGTJZz6Ko5P4V8UsRiYzjCOko6JJanb9Ylo09jodNjTSNOgsLAeXbwRLDGh+baqjAHPsKbczbI2kJyx/U1xmkfFLwdrFi1za+JNNKr94TyiBl+qtg1578RvjtpenWUlh4UuotS1KQFRdR/NBbj1B6O3pjj19KqnhMZiZLDqL073su/oZyrPls3oct+0H4xju7618HWMoZbZvtF4VOf3mPlT8AST9RXhw64qSaee6upLm5leWaVi8kjnLMx5JJqPPNfpOX4KODoRox6b+bOKTu7hnmjPNGeaM812iAHNFANFAATQTQaCaYBnmjPNHejvQAZ5oJ5o70GgDPgvtbi1vy4DLZxhwwuLeUoSo5xkHucVrXV5d39x517dz3Mn9+aQufzJquYwTzmjYBwCahQV+a2pc581rKwrKrAq6gg9jWbbWeoQ6mB9qAsYwQkY6nPY/StEoDwSaAgDcEiqauEZuKaXUdnnFGeaM80Z5pkBnmjPNHejvSAAaKAaKAA0HNFFMA70d6KKQB3o5zRRQAc5o5zRRTAO9HOaKKADnNHOaKKADvR3oopAAzRRRQB/9k=",
  EMPTY2 = {
    store: {
      name: "\xC9picerie Raddonnaise",
      slogan: "Votre \xE9picerie, tout pr\xE8s de chez vous",
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
  TYPES = {
    frais: { label: "Frais du jour", c: "#6E9B3A", bg: "#EEF3E2" },
    plat: { label: "Fait maison", c: "#1C433B", bg: "#E4EDE9" },
    promo: { label: "Promo", c: "#C27B42", bg: "#FBEFE4" },
    gaspi: { label: "Date courte", c: "#B08A2E", bg: "#FAF2DC" },
    panier: { label: "Panier anti-gaspi", c: "#2E7D32", bg: "#E3F1E3" },
  },
  Z5 = () => new Date().toLocaleDateString("sv-SE"),
  vn = (t) => !!t && t.active !== !1 && (!t.debut || t.debut <= Z5()) && (!t.fin || t.fin >= Z5()),
  dO = (t) =>
    t ? new Date(t + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "";
function QR({ texte: texte, taille: taille = 148, couleur: couleur = "#1C433B", style: style }) {
  let i = (0, React.useMemo)(() => {
    let o = G_(0, "M");
    o.addData(texte), o.make();
    let s = o.getModuleCount(),
      l = "";
    for (let u = 0; u < s; u++)
      for (let d = 0; d < s; d++) o.isDark(u, d) && (l += "M" + d + " " + u + "h1v1h-1z");
    return { d: l, n: s };
  }, [texte]);
  return React.default.createElement(
    "svg",
    {
      role: "img",
      "aria-label": "QR code " + texte,
      viewBox: "0 0 " + i.n + " " + i.n,
      width: typeof taille == "number" ? taille : void 0,
      height: typeof taille == "number" ? taille : void 0,
      shapeRendering: "crispEdges",
      style: { display: "block", background: "#fff", ...style },
    },
    React.default.createElement("path", { d: i.d, fill: couleur }),
  );
}
var $2 = (t, e) => [...t].sort((n, r) => (e ? (r.cree || 0) - (n.cree || 0) : (n.cree || 0) - (r.cree || 0)));
function useShop() {
  let [t, e] = (0, React.useState)({}),
    [n, r] = (0, React.useState)(!1),
    [i, o] = (0, React.useState)({
      offres: [],
      actus: [],
      jour: [],
      pubs: [],
      plateaux: [],
      producteurs: [],
      recettes: [],
    });
  return (
    (0, React.useEffect)(() => {
      let s = [
        onSnapshot(
          CONFIG_REF,
          (l) => {
            e(l.exists() ? l.data() : {}), r(!0);
          },
          () => r(!0),
        ),
      ];
      return (
        ["offres", "actus", "jour", "pubs", "plateaux", "producteurs", "recettes"].forEach((l) =>
          s.push(
            onSnapshot(
              collection(db2, l),
              (u) => o((d) => ({ ...d, [l]: u.docs.map((h) => ({ ...h.data(), id: h.id })) })),
              () => {},
            ),
          ),
        ),
        () => s.forEach((l) => l())
      );
    }, []),
    (0, React.useMemo)(() => {
      let s = { ...EMPTY2, ...t };
      return {
        ...s,
        pret: n,
        fermetures: Array.isArray(s.fermetures) ? s.fermetures : [],
        carteActive: s.onglets?.carte !== !1,
        fidActive: s.onglets?.fidelite !== !1 && !!s.fidelite?.active,
        offres: $2(i.offres),
        plateaux: [...i.plateaux].sort((l, u) => (l.ordre ?? l.cree ?? 0) - (u.ordre ?? u.cree ?? 0)),
        actus: $2(i.actus, !0),
        jour: { items: $2(i.jour, !0), maj: s.jourMaj || "" },
        pubs: [...i.pubs].filter(vn).sort((l, u) => (l.ordre ?? l.cree ?? 0) - (u.ordre ?? u.cree ?? 0)),
        producteurs: [...i.producteurs]
          .filter((l) => l.active !== !1 && l.nom)
          .sort((l, u) => (l.ordre ?? 0) - (u.ordre ?? 0) || (l.nom || "").localeCompare(u.nom || "", "fr")),
        recettes: [...i.recettes]
          .filter((l) => l.active !== !1 && l.titre)
          .sort((l, u) => (u.cree || 0) - (l.cree || 0)),
      };
    }, [t, i, n])
  );
}
function useMoi() {
  let t = () => {
      try {
        let i = localStorage.getItem(USER_KEY),
          o = i ? JSON.parse(i) : null;
        return o && o.ref ? o : null;
      } catch {
        return null;
      }
    },
    [moi, setMoi] = (0, React.useState)(t),
    r = (i) => {
      setMoi(i);
      try {
        i ? localStorage.setItem(USER_KEY, JSON.stringify(i)) : localStorage.removeItem(USER_KEY);
      } catch {}
    };
  return (
    (0, React.useEffect)(() => {
      if (moi?.ref)
        return onSnapshot(
          doc2(db2, "clients", moi.ref),
          (i) => {
            if (i.exists()) {
              let o = i.data();
              r({
                ref: i.id,
                code: o.code,
                nom: o.nom,
                points: o.points || 0,
                tampons: o.tampons || 0,
                dernierTampon: o.dernierTampon || 0,
                choix: o.choix || "",
                choixLe: o.choixLe || 0,
                roueAJouer: Array.isArray(o.roueAJouer) ? o.roueAJouer : [],
                roueNon: !!o.roueNon,
                roueG: o.roueG || 0,
                roueP: o.roueP ?? -1,
                anniv: o.anniv || "",
                annivAn: o.annivAn || 0,
                prenom: o.prenom || "",
                bonusAttente: Number(o.bonusAttente) || 0,
                cadeaux: Number(o.cadeaux) || 0,
              });
            } else i.metadata.fromCache || r(null);
          },
          () => {},
        );
    }, [moi?.ref]),
    [moi, r]
  );
}
var INSTALL_KEY = "epicerie-raddonnaise-install-masque";
function plateforme() {
  let t = navigator.userAgent || "",
    e = /iPhone|iPad|iPod/i.test(t) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    n = /Android/i.test(t),
    r =
      /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Messenger|Snapchat|TikTok|musical_ly|LinkedInApp|Line\/|; wv\)/i.test(
        t,
      ),
    i = /Instagram/i.test(t)
      ? "Instagram"
      : /Messenger|Orca/i.test(t)
        ? "Messenger"
        : /FBAN|FBAV|FB_IAB|FBIOS/i.test(t)
          ? "Facebook"
          : "cette application",
    o = /SamsungBrowser/i.test(t),
    s = /Firefox|FxiOS/i.test(t),
    l = /CriOS/i.test(t),
    u = e && /FxiOS|EdgiOS|OPiOS|GSA\//i.test(t),
    d = e || n;
  return {
    ipad: /iPad/i.test(t) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1),
    ios: e,
    android: n,
    inApp: r,
    appli: i,
    samsung: o,
    firefox: s,
    chromeIOS: l,
    autreIOS: u,
    mobile: d,
  };
}
function useInstall() {
  let t = (0, React.useMemo)(plateforme, []),
    [evt, setEvt] = (0, React.useState)(null),
    [ouvert, setOuvert] = (0, React.useState)(!1),
    [masque, setMasque] = (0, React.useState)(() => {
      try {
        return localStorage.getItem(INSTALL_KEY) === "1";
      } catch {
        return !1;
      }
    }),
    [installee, setInstallee] = (0, React.useState)(
      () => window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === !0,
    );
  (0, React.useEffect)(() => {
    let h = (m) => {
        m.preventDefault(), setEvt(m);
      },
      f = () => {
        setEvt(null), setInstallee(!0), setOuvert(!1);
      };
    return (
      window.addEventListener("beforeinstallprompt", h),
      window.addEventListener("appinstalled", f),
      () => {
        window.removeEventListener("beforeinstallprompt", h), window.removeEventListener("appinstalled", f);
      }
    );
  }, []);
  let d = async () => {
    if (evt) {
      evt.prompt();
      try {
        await evt.userChoice;
      } catch {}
      setEvt(null);
    }
  };
  return {
    p: t,
    evt: evt,
    installee: installee,
    ouvert: ouvert,
    possible: !installee,
    bandeau: !installee && !masque,
    lancer: () => {
      evt && !t.inApp ? d() : setOuvert(!0);
    },
    direct: d,
    fermerAssistant: () => setOuvert(!1),
    fermer: () => {
      setMasque(!0);
      try {
        localStorage.setItem(INSTALL_KEY, "1");
      } catch {}
    },
  };
}
var IcPartage = () =>
    React.default.createElement(
      "svg",
      {
        width: "17",
        height: "17",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        style: { verticalAlign: "-3px" },
      },
      React.default.createElement("path", { d: "M12 3v12M8 7l4-4 4 4" }),
      React.default.createElement("path", { d: "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" }),
    ),
  IcPoints = ({ v: v }) =>
    React.default.createElement(
      "svg",
      {
        width: "17",
        height: "17",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        style: { verticalAlign: "-3px" },
      },
      v
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("circle", { cx: "12", cy: "5", r: "2" }),
            React.default.createElement("circle", { cx: "12", cy: "12", r: "2" }),
            React.default.createElement("circle", { cx: "12", cy: "19", r: "2" }),
          )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("circle", { cx: "5", cy: "12", r: "2" }),
            React.default.createElement("circle", { cx: "12", cy: "12", r: "2" }),
            React.default.createElement("circle", { cx: "19", cy: "12", r: "2" }),
          ),
    ),
  IcMenu = () =>
    React.default.createElement(
      "svg",
      {
        width: "17",
        height: "17",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.2",
        strokeLinecap: "round",
        style: { verticalAlign: "-3px" },
      },
      React.default.createElement("path", { d: "M4 7h16M4 12h16M4 17h16" }),
    ),
  IcPlus = () =>
    React.default.createElement(
      "svg",
      {
        width: "17",
        height: "17",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        style: { verticalAlign: "-3px" },
      },
      React.default.createElement("rect", { x: "3", y: "3", width: "18", height: "18", rx: "4" }),
      React.default.createElement("path", { d: "M12 8v8M8 12h8" }),
    ),
  Fn = ({ children: children }) => React.default.createElement("span", { className: "bt" }, children);
function AssistantInstall({ inst: inst }) {
  let { p: e } = inst,
    [msg, setMsg] = (0, React.useState)(""),
    i = location.origin + location.pathname,
    o = async () => {
      try {
        await navigator.clipboard.writeText(i),
          setMsg("Lien copi\xE9 \u2713 \u2014 collez-le dans " + (e.ios ? "Safari" : "Chrome"));
      } catch {
        setMsg("Appuyez longuement sur le lien ci-dessous pour le copier");
      }
    },
    s = "Installer l'application",
    l = [],
    u = null,
    d = null;
  return (
    e.inApp
      ? ((s = "Ouvrez d'abord dans votre navigateur"),
        (l = [
          React.default.createElement(
            React.default.Fragment,
            null,
            "Vous \xEAtes dans ",
            React.default.createElement("b", null, e.appli),
            " : l'installation n'y est pas possible.",
          ),
          React.default.createElement(
            React.default.Fragment,
            null,
            "Touchez ",
            React.default.createElement(Fn, null, React.default.createElement(IcPoints, null)),
            " en haut \xE0 droite, puis ",
            React.default.createElement(
              "b",
              null,
              "\xAB Ouvrir dans ",
              e.ios ? "Safari" : "le navigateur",
              " \xBB",
            ),
            ".",
          ),
          React.default.createElement(
            React.default.Fragment,
            null,
            "Une fois la page ouverte, touchez \xE0 nouveau ",
            React.default.createElement("b", null, "Installer l'application"),
            ".",
          ),
        ]),
        (u = React.default.createElement(
          React.default.Fragment,
          null,
          e.android &&
            React.default.createElement(
              "a",
              {
                className: "btn",
                style: { display: "block", textAlign: "center", textDecoration: "none", marginBottom: 8 },
                href:
                  "intent://" +
                  location.host +
                  location.pathname +
                  "#Intent;scheme=https;package=com.android.chrome;end",
              },
              "Ouvrir dans Chrome",
            ),
          React.default.createElement("button", { className: "btn gh", onClick: o }, "Copier le lien"),
        )))
      : inst.evt
        ? ((s = "Installer en un clic"),
          (l = [
            React.default.createElement(
              React.default.Fragment,
              null,
              "Touchez le bouton ci-dessous, puis confirmez ",
              React.default.createElement("b", null, "\xAB Installer \xBB"),
              ".",
            ),
          ]),
          (u = React.default.createElement(
            "button",
            { className: "btn", onClick: inst.direct },
            "Installer maintenant",
          )))
        : e.ios && !e.chromeIOS && !e.autreIOS
          ? ((l = [
              React.default.createElement(
                React.default.Fragment,
                null,
                "Touchez ",
                React.default.createElement(
                  Fn,
                  null,
                  React.default.createElement(IcPartage, null),
                  " Partager",
                ),
                " ",
                e.ipad ? "en haut de l'\xE9cran" : "en bas de l'\xE9cran",
                ".",
                React.default.createElement("br", null),
                React.default.createElement(
                  "span",
                  { className: "pt2" },
                  "Sur les iPhone r\xE9cents, il est dans le menu ",
                  React.default.createElement(Fn, null, React.default.createElement(IcPoints, null)),
                  " en bas \xE0 droite.",
                ),
              ),
              React.default.createElement(
                React.default.Fragment,
                null,
                "Faites d\xE9filer et touchez ",
                React.default.createElement(
                  Fn,
                  null,
                  React.default.createElement(IcPlus, null),
                  " Sur l'\xE9cran d'accueil",
                ),
                ".",
              ),
              React.default.createElement(
                React.default.Fragment,
                null,
                "Touchez ",
                React.default.createElement("b", null, "Ajouter"),
                " en haut \xE0 droite. C'est fait !",
              ),
            ]),
            (d = "bas"))
          : e.chromeIOS
            ? ((l = [
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "Touchez ",
                  React.default.createElement(Fn, null, React.default.createElement(IcPartage, null)),
                  " en haut \xE0 droite, dans la barre d'adresse.",
                ),
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "Choisissez ",
                  React.default.createElement(
                    Fn,
                    null,
                    React.default.createElement(IcPlus, null),
                    " Ajouter \xE0 l'\xE9cran d'accueil",
                  ),
                  ".",
                ),
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "Touchez ",
                  React.default.createElement("b", null, "Ajouter"),
                  ".",
                ),
              ]),
              (u = React.default.createElement(
                "div",
                { className: "pt2", style: { textAlign: "center" } },
                "L'option n'appara\xEEt pas ? Ouvrez le lien dans ",
                React.default.createElement("b", null, "Safari"),
                " :",
                React.default.createElement(
                  "button",
                  { className: "btn gh", style: { marginTop: 8 }, onClick: o },
                  "Copier le lien",
                ),
              )))
            : e.ios
              ? ((l = [
                  React.default.createElement(
                    React.default.Fragment,
                    null,
                    "Sur iPhone, l'installation se fait depuis ",
                    React.default.createElement("b", null, "Safari"),
                    ".",
                  ),
                  React.default.createElement(
                    React.default.Fragment,
                    null,
                    "Copiez le lien, ouvrez ",
                    React.default.createElement("b", null, "Safari"),
                    " et collez-le dans la barre d'adresse.",
                  ),
                  React.default.createElement(
                    React.default.Fragment,
                    null,
                    "Touchez ensuite ",
                    React.default.createElement("b", null, "Installer l'application"),
                    ".",
                  ),
                ]),
                (u = React.default.createElement(
                  "button",
                  { className: "btn", onClick: o },
                  "Copier le lien",
                )))
              : e.samsung
                ? ((l = [
                    React.default.createElement(
                      React.default.Fragment,
                      null,
                      "Touchez ",
                      React.default.createElement(Fn, null, React.default.createElement(IcMenu, null)),
                      " en bas \xE0 droite.",
                    ),
                    React.default.createElement(
                      React.default.Fragment,
                      null,
                      "Touchez ",
                      React.default.createElement(Fn, null, "Ajouter page \xE0"),
                      " puis ",
                      React.default.createElement("b", null, "\xAB \xC9cran d'accueil \xBB"),
                      ".",
                    ),
                    React.default.createElement(
                      React.default.Fragment,
                      null,
                      "Confirmez avec ",
                      React.default.createElement("b", null, "Ajouter"),
                      ".",
                    ),
                  ]),
                  (d = "basdroite"))
                : e.firefox
                  ? (l = [
                      React.default.createElement(
                        React.default.Fragment,
                        null,
                        "Touchez ",
                        React.default.createElement(
                          Fn,
                          null,
                          React.default.createElement(IcPoints, { v: !0 }),
                        ),
                        " (menu du navigateur).",
                      ),
                      React.default.createElement(
                        React.default.Fragment,
                        null,
                        "Touchez ",
                        React.default.createElement(Fn, null, "Installer"),
                        " ou ",
                        React.default.createElement("b", null, "\xAB Ajouter \xE0 l'\xE9cran d'accueil \xBB"),
                        ".",
                      ),
                      React.default.createElement(React.default.Fragment, null, "Confirmez."),
                    ])
                  : e.android
                    ? ((l = [
                        React.default.createElement(
                          React.default.Fragment,
                          null,
                          "Touchez ",
                          React.default.createElement(
                            Fn,
                            null,
                            React.default.createElement(IcPoints, { v: !0 }),
                          ),
                          " en haut \xE0 droite.",
                        ),
                        React.default.createElement(
                          React.default.Fragment,
                          null,
                          "Touchez ",
                          React.default.createElement(Fn, null, "Installer l'application"),
                          " ou ",
                          React.default.createElement(
                            "b",
                            null,
                            "\xAB Ajouter \xE0 l'\xE9cran d'accueil \xBB",
                          ),
                          ".",
                        ),
                        React.default.createElement(
                          React.default.Fragment,
                          null,
                          "Confirmez avec ",
                          React.default.createElement("b", null, "Installer"),
                          ".",
                        ),
                      ]),
                      (d = "hautdroite"))
                    : ((s = "Installez-la sur votre t\xE9l\xE9phone"),
                      (l = [
                        React.default.createElement(
                          React.default.Fragment,
                          null,
                          "Scannez ce code avec l'appareil photo de votre t\xE9l\xE9phone pour ouvrir l'application, puis touchez ",
                          React.default.createElement("b", null, "Installer l'application"),
                          ".",
                        ),
                      ]),
                      (u = React.default.createElement(
                        "div",
                        { style: { textAlign: "center" } },
                        React.default.createElement(QR, {
                          texte: i,
                          taille: 170,
                          style: { display: "inline-block" },
                        }),
                      ))),
    React.default.createElement(
      "div",
      { className: "sheet-bg", onClick: inst.fermerAssistant },
      d && React.default.createElement("div", { className: "fleche " + d }, "\u2193"),
      React.default.createElement(
        "div",
        {
          className: "sheet" + (d && d.startsWith("bas") ? " avec-fleche" : ""),
          onClick: (h) => h.stopPropagation(),
        },
        React.default.createElement(
          "div",
          { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 } },
          React.default.createElement("img", {
            src: LOGO,
            alt: "",
            style: { width: 48, height: 48, borderRadius: 12 },
          }),
          React.default.createElement(
            "div",
            {
              style: {
                flex: 1,
                fontFamily: "var(--script)",
                fontSize: 27,
                color: "var(--forest)",
                lineHeight: 1.05,
              },
            },
            s,
          ),
          React.default.createElement(
            "button",
            { className: "ix", "aria-label": "Fermer", onClick: inst.fermerAssistant },
            "\xD7",
          ),
        ),
        React.default.createElement(
          "ol",
          { className: "etapes" },
          l.map((h, f) =>
            React.default.createElement(
              "li",
              { key: f },
              React.default.createElement("span", { className: "num" }, f + 1),
              React.default.createElement("div", null, h),
            ),
          ),
        ),
        u && React.default.createElement("div", { style: { marginTop: 14 } }, u),
        msg &&
          React.default.createElement(
            "div",
            {
              className: "pt2",
              style: { textAlign: "center", marginTop: 10, color: "var(--apple)", fontWeight: 800 },
            },
            msg,
          ),
        (e.inApp || e.ios) &&
          msg &&
          React.default.createElement(
            "div",
            {
              style: {
                marginTop: 8,
                padding: "9px 11px",
                background: "var(--bg)",
                borderRadius: 10,
                fontSize: 12.5,
                wordBreak: "break-all",
                userSelect: "all",
                WebkitUserSelect: "all",
              },
            },
            i,
          ),
        React.default.createElement(
          "div",
          { className: "pt2", style: { textAlign: "center", marginTop: 14 } },
          "Facultatif : sans installation, votre carte reste m\xE9moris\xE9e sur ce t\xE9l\xE9phone.",
        ),
      ),
    )
  );
}
function Installer({ inst: inst, compact: compact, texte: texte }) {
  return inst.possible
    ? React.default.createElement(
        "div",
        { className: "inst" },
        React.default.createElement("img", { src: LOGO, alt: "" }),
        React.default.createElement(
          "div",
          { style: { flex: 1, minWidth: 0 } },
          React.default.createElement("div", { className: "it" }, "Installer l'application"),
          React.default.createElement(
            "div",
            { className: "id" },
            texte || "Retrouvez l'\xE9picerie et votre carte d'un geste.",
          ),
        ),
        React.default.createElement("button", { className: "ib2", onClick: inst.lancer }, "Installer"),
        !compact &&
          React.default.createElement(
            "button",
            { className: "ix", "aria-label": "Fermer", onClick: inst.fermer },
            "\xD7",
          ),
      )
    : null;
}
function ProposeInstall({ inst: inst, onClose: onClose }) {
  return React.default.createElement(
    "div",
    { className: "sheet-bg", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "sheet", onClick: (n) => n.stopPropagation(), style: { textAlign: "center" } },
      React.default.createElement("img", {
        src: LOGO,
        alt: "",
        style: { width: 70, height: 70, borderRadius: 18, marginBottom: 10 },
      }),
      React.default.createElement(
        "div",
        { style: { fontFamily: "var(--script)", fontSize: 31, color: "var(--forest)", lineHeight: 1 } },
        "Votre carte est pr\xEAte !",
      ),
      React.default.createElement(
        "p",
        { style: { fontSize: 13.5, color: "var(--ink2)", lineHeight: 1.5, margin: "10px 0 16px" } },
        "Gardez-la \xE0 port\xE9e de main : installez l'application sur votre \xE9cran d'accueil et retrouvez votre carte d'un simple geste.",
      ),
      React.default.createElement(
        "button",
        {
          className: "btn",
          onClick: () => {
            onClose(), inst.lancer();
          },
        },
        "Installer l'application",
      ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { marginTop: 8 }, onClick: onClose },
        "Plus tard",
      ),
    ),
  );
}
var sx = (t, e = 12e3) =>
    new Promise((n) => {
      let r = setTimeout(() => n("lent"), e);
      t.then(
        () => {
          clearTimeout(r), n("ok");
        },
        () => {
          clearTimeout(r), n("erreur");
        },
      );
    }),
  gT = "epicerie-raddonnaise-a-prevenir",
  ax = () => {
    try {
      let t = JSON.parse(localStorage.getItem(gT) || "[]");
      return Array.isArray(t) ? t : [];
    } catch {
      return [];
    }
  },
  lx = (t) => {
    try {
      localStorage.setItem(gT, JSON.stringify(t.slice(-20)));
    } catch {}
  },
  ux = (t, e) => lx([...ax().filter((n) => n.id !== e), { type: t, id: e, cree: Date.now() }]),
  Cf = (t) => lx(ax().filter((e) => e.id !== t));
async function ns(t, e, n) {
  Cf(n),
    e === "cmd"
      ? await envoyerMail(t, n)
      : e === "resa"
        ? await avertirResa(t, n)
        : await avertirMessage(t, n);
}
function xO(t) {
  let e = ax().filter((n) => Date.now() - (n.cree || 0) < 864e5);
  lx(e),
    !(!e.length || !g2(Nn(t).script)) &&
      waitForPendingWrites(db2)
        .then(() => e.forEach((n) => ns(t, n.type, n.id)))
        .catch(() => {});
}
var W2 = (t, e) => {
    let n = (t || [])[(e.getDay() + 6) % 7];
    if (!n) return [];
    let r = /(\d{1,2})\s*[h:]\s*(\d{0,2})\s*[-–]\s*(\d{1,2})\s*[h:]\s*(\d{0,2})/g,
      i = [],
      o,
      s = [n.am, n.pm].filter(Boolean).join(" ");
    for (; (o = r.exec(s)); ) i.push([+o[1] * 60 + +(o[2] || 0), +o[3] * 60 + +(o[4] || 0)]);
    if (!i.length) {
      let l = (h) => {
          let f = /^\s*(\d{1,2})\s*(?:[h:.]\s*(\d{2})?)?\s*$/i.exec(h || "");
          return f ? +f[1] * 60 + +(f[2] || 0) : null;
        },
        u = l(n.am),
        d = l(n.pm);
      u != null && d != null && d > u && i.push([u, d]);
    }
    return i.sort((l, u) => l[0] - u[0]);
  },
  G2 = (t) => Math.floor(t / 60) + "h" + String(t % 60).padStart(2, "0");
function texteOuverture(t, e, n = new Date()) {
  let r = n.getHours() * 60 + n.getMinutes(),
    i = W2(t, n);
  if (!!!E2(e, Wt(n))) {
    let s = i.find(([u, d]) => r >= u && r < d);
    if (s) {
      let u = s[1] - r;
      return {
        ouvert: !0,
        bientot: u <= 30,
        texte: u <= 30 ? "Ferme dans " + u + " min" : "Ouvert jusqu'\xE0 " + G2(s[1]),
      };
    }
    let l = i.find(([u]) => u > r);
    if (l) return { ouvert: !1, texte: "Ouvre aujourd'hui \xE0 " + G2(l[0]) };
  }
  for (let s = 1; s <= 14; s++) {
    let l = new Date(n);
    if ((l.setDate(l.getDate() + s), E2(e, Wt(l)))) continue;
    let u = W2(t, l);
    if (!u.length) continue;
    return {
      ouvert: !1,
      texte:
        "Ouvre " +
        (s === 1
          ? "demain"
          : l.toLocaleDateString("fr-FR", { weekday: "long" }) + (s > 6 ? " " + l.getDate() : "")) +
        " \xE0 " +
        G2(u[0][0]),
    };
  }
  return i.length || W2(t, new Date(n.getTime() + 864e5)).length ? { ouvert: !1, texte: "Ferm\xE9" } : null;
}
function wO() {
  let [t, e] = (0, React.useState)(() => Date.now());
  return (
    (0, React.useEffect)(() => {
      let n = setInterval(() => e(Date.now()), 6e4);
      return () => clearInterval(n);
    }, []),
    t
  );
}
function BadgeOuverture({ e: e }) {
  return e
    ? React.default.createElement(
        "div",
        { className: "ouverture " + (e.ouvert ? (e.bientot ? "bientot" : "on") : "off"), role: "status" },
        React.default.createElement("span", { className: "pt" }),
        React.default.createElement(
          "b",
          null,
          e.ouvert ? (e.bientot ? "Ferme bient\xF4t" : "Ouvert") : "Ferm\xE9",
        ),
        React.default.createElement(
          "span",
          null,
          "\xB7 ",
          e.ouvert && e.bientot ? e.texte.replace("Ferme ", "") : e.texte,
        ),
      )
    : null;
}
function ConseilInstallCommande({ inst: inst, quoi: quoi = "votre commande" }) {
  let [n, r] = (0, React.useState)(!1);
  return !inst?.p?.ios || !inst.possible || n
    ? null
    : React.default.createElement(
        "div",
        { className: "ios-avant" },
        React.default.createElement("b", null, "\u{1F4F1} Sur iPhone : installez d'abord l'application"),
        React.default.createElement(
          "p",
          null,
          "Si vous l'installez apr\xE8s, ",
          quoi,
          " n'appara\xEEtra pas dans l'appli install\xE9e (l'iPhone s\xE9pare Safari et les applis).",
        ),
        React.default.createElement(
          "div",
          { style: { display: "flex", gap: 8 } },
          React.default.createElement(
            "button",
            { className: "btn sm", onClick: inst.lancer },
            "Installer maintenant",
          ),
          React.default.createElement(
            "button",
            { className: "btn gh sm", onClick: () => r(!0) },
            "Continuer ici",
          ),
        ),
      );
}
var nT = "epicerie-raddonnaise-carte-notif";
function BandeauNotifications({ n: t, inst: inst }) {
  let [n, r] = (0, React.useState)(() => {
      try {
        return Date.now() - Number(localStorage.getItem(nT) || 0) < 2592e6;
      } catch {
        return !1;
      }
    }),
    [i, o] = (0, React.useState)(!0);
  return !t?.dispo || n || !["off", "ios"].includes(t.etat)
    ? null
    : React.default.createElement(
        "div",
        { className: "carte-notif" },
        React.default.createElement(
          "button",
          {
            className: "ix",
            "aria-label": "Fermer",
            onClick: () => {
              r(!0);
              try {
                localStorage.setItem(nT, String(Date.now()));
              } catch {}
            },
          },
          "\xD7",
        ),
        React.default.createElement("b", null, "\u{1F514} Ne ratez plus nos bons plans"),
        React.default.createElement(
          "p",
          null,
          "Arrivages, promos, commande pr\xEAte\u2026 on vous pr\xE9vient sur votre t\xE9l\xE9phone.",
        ),
        t.etat === "ios"
          ? React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "p",
                { style: { fontWeight: 700 } },
                "Sur iPhone, installez d'abord l'application, puis activez les notifications.",
              ),
              React.default.createElement(
                "button",
                { className: "btn sm", onClick: inst.lancer },
                "Installer l'application",
              ),
            )
          : React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "label",
                { className: "accord", style: { margin: "4px 0 8px" } },
                React.default.createElement("input", {
                  type: "checkbox",
                  checked: i,
                  onChange: (l) => o(l.target.checked),
                }),
                React.default.createElement("span", null, "Recevoir aussi les bons plans"),
              ),
              React.default.createElement(
                "button",
                { className: "btn sm", onClick: () => t.activer(i) },
                "Activer les notifications",
              ),
            ),
      );
}
var Ic2 = {
    home: (t = 21, e = "currentColor") =>
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
    basket: (t = 21, e = "currentColor") =>
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
    star: (t = 21, e = "currentColor") =>
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
    news: (t = 21, e = "currentColor") =>
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
        React.default.createElement("path", { d: "M7 9h6M7 13h10M7 17h7" }),
      ),
    info: (t = 21, e = "currentColor") =>
      React.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinecap: "round",
        },
        React.default.createElement("circle", { cx: "12", cy: "12", r: "9" }),
        React.default.createElement("path", { d: "M12 11v5M12 7.5h.01" }),
      ),
    leaf: (t = 18, e = "currentColor") =>
      React.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.6",
          strokeLinecap: "round",
        },
        React.default.createElement("path", {
          d: "M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 1 8-1 3.5-3.5 5-6.5 6",
        }),
        React.default.createElement("path", { d: "M2 21c0-3 1.9-5.4 5.1-6" }),
      ),
    phone: (t = 16, e = "currentColor") =>
      React.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinecap: "round",
        },
        React.default.createElement("path", {
          d: "M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3z",
        }),
      ),
    pin: (t = 16, e = "currentColor") =>
      React.default.createElement(
        "svg",
        {
          width: t,
          height: t,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: e,
          strokeWidth: "1.7",
          strokeLinecap: "round",
        },
        React.default.createElement("path", { d: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" }),
        React.default.createElement("circle", { cx: "12", cy: "10", r: "2.5" }),
      ),
  },
  CSS_APPLI =
    jI +
    t5 +
    `
:root{--bg:#F7F3EA;--card:#FFFFFF;--forest:#1C433B;--apple:#6E9B3A;--apple-l:#8AAD3B;
 --apple-soft:#EEF3E2;--terra:#C27B42;--gold:#C69A3C;--ink:#22302A;--ink2:#5C6A62;--ink3:#93A099;
 --line:#E6E0D2;--r:18px;--r-s:12px;--script:'Sacramento',cursive;--body:'Nunito',system-ui,sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
.app{max-width:440px;margin:0 auto;min-height:100vh;background:var(--bg);color:var(--ink);
 font-family:var(--body);padding-bottom:calc(88px + env(safe-area-inset-bottom));-webkit-font-smoothing:antialiased}
.top{position:sticky;top:0;z-index:60;display:flex;align-items:center;gap:11px;padding:11px 16px;background:var(--top,var(--forest));color:#fff;transition:background .4s}
.top img{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.85)}
.top h1{font-family:var(--script);font-size:25px;line-height:1;font-weight:400}
.top small{display:block;font-size:9px;letter-spacing:.9px;text-transform:uppercase;opacity:.65;margin-top:2px}
.top small .vers{display:inline-block;margin-left:6px;padding:2px 8px;border-radius:9px;background:rgba(255,255,255,.22);font-size:12.5px;font-weight:800;letter-spacing:.3px;text-transform:none;opacity:1;vertical-align:1px}
.state{margin-left:auto;font-size:10px;font-weight:800;padding:5px 11px;border-radius:20px;display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.14)}
.dot{width:6px;height:6px;border-radius:50%;background:#9BD46B}
.state.off .dot{background:#E4917F}
.wrap{padding:16px}
.ouverture{display:flex;align-items:center;gap:7px;justify-content:center;margin:10px auto 0;padding:7px 14px;border-radius:20px;font-size:13px;width:fit-content;max-width:100%}
.ouverture b{font-weight:900}.ouverture span:last-child{font-weight:700}
.ouverture .pt{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.ouverture.on{background:#E7F2DA;color:#2F5A17}.ouverture.on .pt{background:#4E9A22}
.ouverture.bientot{background:#FBEBD9;color:#8A4B12}.ouverture.bientot .pt{background:#D9822B}
.ouverture.off{background:#F8E1DC;color:#8E2F1F}.ouverture.off .pt{background:#C8442E}
.carte-notif{position:relative;background:#FFF8EE;border:1.5px solid #F0D7BF;border-radius:var(--r);padding:14px 16px;margin-bottom:14px}
.carte-notif b{font-size:15px;color:var(--forest)}.carte-notif p{font-size:13px;color:var(--ink2);margin:4px 0 6px;line-height:1.45}
.carte-notif .ix{position:absolute;top:6px;right:8px;border:none;background:none;font-size:24px;color:var(--ink3);width:40px;height:40px;cursor:pointer}
.carte-notif .btn.sm,.ios-avant .btn.sm{width:auto;padding:10px 16px;font-size:13px}
.ios-avant{background:#EEF3FB;border:1.5px solid #C9D8EE;border-radius:var(--r-s);padding:12px 14px;margin:0 0 12px;text-align:left}
.ios-avant b{font-size:13.5px;color:#1F3A5F}.ios-avant p{font-size:12.5px;color:#3E5370;margin:4px 0 8px;line-height:1.45}
.envoi-lent{background:#FFF4E0;border-radius:var(--r-s);padding:10px 12px;font-size:12.5px;color:#7A4B12;margin:8px 0;line-height:1.45}
.h2{font-family:var(--script);font-size:29px;line-height:1;margin-bottom:4px;color:var(--forest);display:flex;align-items:center;gap:9px}
.h2 i{display:block;width:22px;height:2px;border-radius:2px;background:var(--apple)}
.sub{font-size:11.5px;color:var(--ink3);margin:0 0 12px 31px}
.hero{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:14px 16px;display:flex;align-items:center;gap:14px;text-align:left;margin-bottom:14px}
.hero img{width:60px;height:60px;flex-shrink:0;border-radius:50%;object-fit:cover;border:3px solid var(--apple-soft)}
.hero-t{min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:6px}
.hero-t p{margin:0 !important}
.hero h2{font-family:var(--script);font-size:34px;color:var(--forest);line-height:1;margin-bottom:5px}
.hero p{font-family:var(--script);font-size:20px;color:var(--apple);margin-bottom:13px}
.chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}
.chip{font-size:10.5px;font-weight:700;padding:5px 12px;border-radius:20px;background:var(--apple-soft);color:#4C6B27}
.annonce{border-radius:var(--r-s);padding:13px 15px;margin-bottom:14px;font-size:13px;font-weight:700;line-height:1.4}
.annonce.apple{background:var(--apple);color:#fff}
.annonce.terra{background:var(--terra);color:#fff}
.annonce.forest{background:var(--forest);color:#fff}
.jour{background:var(--card);border:1px solid var(--line);border-radius:var(--r);overflow:hidden;margin-bottom:16px}
.ji{display:flex;align-items:center;gap:12px;padding:13px 15px;border-bottom:1px solid var(--line)}
.ji:last-child{border-bottom:none}
.ji img{width:84px;height:84px;border-radius:14px;object-fit:cover;flex-shrink:0;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.ji .lb{font-size:9px;font-weight:800;letter-spacing:.4px;padding:3px 8px;border-radius:6px;display:inline-block;margin-bottom:4px}
.ji .nm{font-weight:700;font-size:14px;line-height:1.25}
.ji .no{font-size:11.5px;color:var(--ink3);margin-top:2px;line-height:1.35}
.ji .px{margin-left:auto;text-align:right;font-size:17px;font-weight:800;color:var(--apple);flex-shrink:0}
.ji .un{display:block;font-size:10px;color:var(--ink3);font-weight:600}
.ji .old{display:block;font-size:11.5px;font-weight:700;color:var(--ink3);text-decoration:line-through}
.pubs{position:relative;margin:0 -16px 14px}
.pubs .rail{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.pubs .rail::-webkit-scrollbar{display:none}
.pub{flex:0 0 100%;scroll-snap-align:center;position:relative;aspect-ratio:16/9;max-height:300px;cursor:pointer}
.pub img{width:100%;height:100%;object-fit:cover;display:block}
.pub .txt{position:absolute;left:0;right:0;bottom:0;padding:34px 18px 22px;color:#fff;
  background:linear-gradient(transparent,rgba(16,36,31,.82))}
.pub .t{font-family:var(--script);font-size:31px;line-height:1;text-shadow:0 1px 3px rgba(0,0,0,.35)}
.pub .s{font-size:12.5px;font-weight:700;margin-top:5px;opacity:.95}
.pub .go{display:inline-block;margin-top:8px;font-size:11px;font-weight:800;background:rgba(255,255,255,.2);
  border:1px solid rgba(255,255,255,.4);padding:4px 11px;border-radius:20px}
.dots{position:absolute;left:0;right:0;bottom:8px;display:flex;justify-content:center;gap:6px;pointer-events:none}
.dots i{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.5);transition:all .2s}
.dots i.on{width:18px;border-radius:4px;background:#fff}
.maj{font-size:11px;color:var(--ink3);text-align:center;padding:9px;background:#FBF8F1;border-top:1px solid var(--line)}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);overflow:hidden;margin-bottom:11px;position:relative}
.card img.ph{width:100%;height:186px;object-fit:cover;display:block}
.card .b{padding:14px 15px}
.card h3{font-family:var(--script);font-size:25px;color:var(--forest);line-height:1.05;margin-bottom:4px}
.card p{font-size:12px;color:var(--ink2);line-height:1.45}
.foot{display:flex;justify-content:space-between;align-items:flex-end;margin-top:10px;gap:10px}
.px{font-size:20px;font-weight:800;color:var(--apple)}
.serves{font-size:11px;color:var(--ink3)}
.badge{position:absolute;top:11px;left:11px;background:var(--terra);color:#fff;font-size:10px;font-weight:800;padding:4px 10px;border-radius:20px}
.scroll{display:flex;gap:11px;overflow-x:auto;padding-bottom:6px;margin-bottom:18px}
.scroll::-webkit-scrollbar{display:none}
.mini{min-width:172px;flex-shrink:0;background:var(--card);border:1px solid var(--line);border-radius:var(--r);overflow:hidden}
.mini img{width:100%;height:112px;object-fit:cover;display:block}
.mini .b{padding:11px 12px}
.mini .nm{font-weight:700;font-size:12.5px;line-height:1.25;margin-bottom:5px}
.prods{display:flex;gap:10px;overflow-x:auto;scrollbar-width:none;padding:2px 2px 6px;margin:0 -2px 14px}
.prods::-webkit-scrollbar{display:none}
.prod{flex:0 0 132px;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:14px 8px 12px;font-family:var(--body);color:var(--ink);cursor:pointer;position:relative}
.prod-ph{width:72px;height:72px;border-radius:50%;overflow:hidden;background:var(--apple-soft);display:flex;align-items:center;justify-content:center;font-size:34px;border:3px solid #fff;box-shadow:0 2px 8px rgba(28,67,59,.15);margin-bottom:4px}
.prod-ph img{width:100%;height:100%;object-fit:cover}
.prod b{font-size:13.5px;line-height:1.2}
.prod-m{font-size:11.5px;color:var(--apple);font-weight:800;line-height:1.25}
.prod-l{display:flex;align-items:center;gap:2px;font-size:11px;color:var(--ink3)}
.prod-grande{width:100%;max-height:240px;object-fit:cover;border-radius:16px}
.prod-pr{margin-top:10px;font-size:13px;background:var(--apple-soft);border-radius:12px;padding:10px 12px;color:var(--ink)}
.fete{position:fixed;inset:0;z-index:600;background:radial-gradient(circle at 50% 42%,rgba(28,67,59,.94),rgba(10,24,20,.97));-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:22px;animation:popFond .25s ease;overflow:hidden}
.fete.gros{background:radial-gradient(circle at 50% 40%,#2E6B5E,#0E2A24 75%)}
.fete-in{position:relative;z-index:2;width:100%;max-width:360px;text-align:center;color:#fff}
.fete-plus{font-size:86px;font-weight:900;line-height:1;color:#C9E38A;text-shadow:0 0 30px rgba(201,227,138,.6);animation:ftPlus .7s cubic-bezier(.2,1.8,.4,1) both}
.fete-t{font-family:var(--script);font-size:46px;line-height:1.05;margin-top:6px;animation:ftMonte .5s ease .15s both;text-shadow:0 2px 12px rgba(0,0,0,.3)}
.fete.gros .fete-t{font-size:44px;color:#FFE08A}
.fete-s{font-size:15px;line-height:1.5;margin-top:8px;opacity:.95;animation:ftMonte .5s ease .3s both}
.fete-choix{display:flex;gap:10px;margin-top:14px;animation:ftMonte .5s ease .6s both}
.fete-choix div{flex:1;background:rgba(20,50,44,.85);border:1.5px solid rgba(255,224,138,.55);border-radius:16px;padding:12px 8px;display:flex;flex-direction:column;align-items:center;gap:3px}
.fete-choix span{font-size:28px;line-height:1}
.fete-choix b{font-size:14.5px;color:#FFE08A}
.fete-choix small{font-size:12px;line-height:1.35;opacity:.9}
.fete-rang{display:flex;justify-content:center;gap:5px;margin:22px auto 0;flex-wrap:wrap;max-width:330px}
.fr-c{position:relative;width:28px;height:28px;border-radius:50%;border:2px dashed rgba(255,255,255,.35);display:flex;align-items:center;justify-content:center;font-size:14px}
.fr-c.on{border:2px solid #A9C75A;background:rgba(169,199,90,.22)}
.fr-c.cad{border-color:#F4D774}
.fr-c b{font-weight:400;font-size:17px;line-height:1}
.fr-c.neuf b{animation:ftTombe .55s cubic-bezier(.3,1.6,.5,1) both}
.fr-c.neuf{animation:ftCase .5s ease both}
.fr-c em{position:absolute;inset:-4px;border-radius:50%;border:3px solid #FFE08A;opacity:0;animation:ftOnde .7s ease-out both}
.fete-cpt{margin-top:12px;font-size:14px;opacity:.9}
.fete-cpt b{font-size:22px;color:#C9E38A}
.fete .btn{background:#A9C75A;color:#1C433B}
.fete-boite{position:relative;width:130px;height:130px;margin:34px auto 0;animation:ftSecoue .5s ease-in-out .2s 3}
.fete-boite .b-couv{transform-origin:60px 48px;animation:ftCouv .6s cubic-bezier(.3,1.5,.5,1) 1.7s both}
.fete-boite.ouverte .b-couv{animation:ftCouv .6s ease both}
.fete-rayons{position:absolute;left:50%;top:40%;width:260px;height:260px;margin:-130px 0 0 -130px;border-radius:50%;z-index:-1;background:repeating-conic-gradient(rgba(255,224,138,.35) 0 10deg,transparent 10deg 24deg);animation:ftRayons 8s linear infinite,ftApparait .5s ease 1.7s both}
.confettis{position:absolute;inset:0;pointer-events:none;z-index:1}
.confettis i{position:absolute;top:-20px;display:block;animation:ftConf linear both infinite}
@keyframes ftPlus{from{transform:scale(.2);opacity:0}}
@keyframes ftMonte{from{transform:translateY(14px);opacity:0}}
@keyframes ftTombe{0%{transform:translateY(-140px) scale(1.8) rotate(-30deg);opacity:0}60%{opacity:1}100%{transform:none}}
@keyframes ftCase{50%{transform:scale(1.35)}}
@keyframes ftOnde{0%{opacity:1;transform:scale(.6)}100%{opacity:0;transform:scale(2.2)}}
@keyframes ftSecoue{0%,100%{transform:rotate(0)}25%{transform:rotate(-10deg)}75%{transform:rotate(10deg)}}
@keyframes ftCouv{to{transform:translate(-8px,-26px) rotate(-18deg)}}
@keyframes ftRayons{to{transform:rotate(360deg)}}
@keyframes ftApparait{from{opacity:0;transform:scale(.3)}}
@keyframes ftConf{0%{transform:translate3d(0,0,0) rotate(0)}100%{transform:translate3d(var(--dx),110vh,0) rotate(var(--rot))}}
@media (prefers-reduced-motion:reduce){.fete *{animation-duration:.01s!important;animation-iteration-count:1!important}}
.pop-fond{position:fixed;inset:0;z-index:450;background:rgba(20,32,26,.55);display:flex;align-items:center;justify-content:center;padding:22px;animation:popFond .2s ease}
.pop{background:#fff;border-radius:24px;max-width:360px;width:100%;padding:22px 20px 18px;text-align:center;box-shadow:0 18px 50px rgba(0,0,0,.25);max-height:88vh;overflow-y:auto;animation:popIn .35s cubic-bezier(.3,1.5,.5,1)}
.pop-ph{width:100%;max-height:200px;object-fit:cover;border-radius:16px;margin-bottom:10px}
.pop-em{font-size:42px;line-height:1.1}
.pop-t{font-family:var(--script);font-size:34px;color:var(--forest);line-height:1.1;margin-top:4px}
.pop-x{font-size:14.5px;line-height:1.5;color:var(--ink2);margin-top:8px;white-space:pre-line}
@keyframes popFond{from{opacity:0}}
@keyframes popIn{from{opacity:0;transform:scale(.85)}}
.modif{margin-top:10px;background:var(--bg);border-radius:14px;padding:4px 12px 12px}
.champ-err{font-size:11.5px;color:#C86B5C;font-weight:700;margin:4px 2px 0}
.avis{background:#FFF8E6;border:1.5px solid #F0D98C;border-radius:var(--r);padding:14px 16px;margin-bottom:14px;text-align:center}
.avis-et{font-size:18px;letter-spacing:2px}
.avis-t{font-weight:800;font-size:15.5px;color:var(--forest);margin-top:4px}
.avis-s{font-size:12.5px;color:var(--ink2);margin-top:2px}
.tp{margin-top:14px}
.tp-grille{display:grid;gap:8px}
.tp-c{aspect-ratio:1;border-radius:50%;border:2px dashed rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:rgba(255,255,255,.4)}
.tp-c i{font-style:normal}
.tp-c.cadeau{border-color:rgba(244,215,116,.6)}
.tp-c.on{border:2px solid var(--apple-l);background:rgba(169,199,90,.18);animation:tpPop .4s cubic-bezier(.3,1.6,.5,1) both}
.tp-c span{font-size:24px;line-height:1;display:inline-block}
.tp-c span.deux{font-size:19px;letter-spacing:-7px;margin-right:7px}
.tp-grille{max-width:300px;margin:0 auto}
.tp-c.on.tombe{animation:tpCase .9s ease both}
.tp-c.tombe span{display:inline-block;animation:pommeTombe 1s cubic-bezier(.35,0,.5,1) both;animation-delay:inherit}
@keyframes pommeTombe{0%{transform:translateY(-160px) rotate(-25deg);opacity:0}15%{opacity:1}55%{transform:translateY(0) rotate(0) scale(1.12,.85)}68%{transform:translateY(-16px) scale(.96,1.05)}80%{transform:translateY(0) scale(1.05,.95)}90%{transform:translateY(-5px)}100%{transform:none;opacity:1}}
@keyframes tpCase{0%,50%{border-color:rgba(255,255,255,.3);background:transparent;border-style:dashed}62%{box-shadow:0 0 0 6px rgba(169,199,90,.35)}100%{box-shadow:0 0 0 0 rgba(169,199,90,0)}}
@media (prefers-reduced-motion:reduce){.tp-c.tombe span,.tp-c.on.tombe{animation:none}}
@keyframes tpPop{from{transform:scale(.5);opacity:0}to{transform:none;opacity:1}}
.tp-reste{margin-top:12px;font-size:13px;text-align:center;opacity:.9}
.choix-b{display:flex;flex-direction:column;gap:9px;margin-top:12px}
.choix-b button{display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;border:none;border-radius:16px;padding:13px 12px;font:inherit;cursor:pointer;background:#FFE08A;color:#1C433B}
.choix-b button+button{background:rgba(255,255,255,.12);color:#fff;border:1.5px solid rgba(255,224,138,.6)}
.choix-b button:disabled{opacity:.6}
.choix-b span{font-size:26px;line-height:1}
.choix-b b{font-size:16px}
.choix-b small{font-size:12px;font-weight:600;opacity:.85;line-height:1.3}
.choix-err{font-size:12.5px;color:#FFB4A8;text-align:center}
.choix-fond{position:fixed;inset:0;z-index:9000;background:rgba(10,30,26,.78);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;animation:ftMonte .35s ease both}
.choix-in{width:100%;max-width:380px;background:linear-gradient(160deg,#24564B,#1C433B);color:#fff;border:2px solid rgba(255,224,138,.6);border-radius:26px;padding:24px 20px 18px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.45)}
.choix-ico{font-size:64px;line-height:1;animation:ftMonte .6s ease both}
.choix-in h2{font-family:'Sacramento',cursive;font-weight:400;font-size:46px;line-height:1.1;margin:8px 0 4px;color:#FFE08A}
.choix-in p{margin:0 0 4px;font-size:14.5px;line-height:1.4;opacity:.92}
.choix-tard{margin-top:12px;background:none;border:none;color:rgba(255,255,255,.75);font:inherit;font-size:13px;text-decoration:underline;cursor:pointer}
.etq-fond{position:fixed;inset:0;z-index:9100;display:flex;justify-content:center;background:rgba(14,38,32,.28);-webkit-backdrop-filter:blur(7px);backdrop-filter:blur(7px);animation:etqFond .4s ease both;cursor:pointer}
.etq-fond.out{animation:etqOut .42s ease both}
.etq-pend{position:absolute;top:22vh;display:flex;flex-direction:column;align-items:center;transform-origin:50% -22vh;animation:etqBalance 1.9s cubic-bezier(.3,.6,.3,1) both}
.etq-fil{position:absolute;bottom:100%;left:50%;width:2px;height:calc(22vh + 14px);margin-left:-1px;background:linear-gradient(#C9A96E,#8C6A32);margin-bottom:-14px}
.etq{position:relative;width:min(74vw,270px);padding:26px 20px 18px;text-align:center;color:#1C433B;background:linear-gradient(160deg,#FFEB99 0%,#FFE07A 55%,#F6CF5C 100%);
  clip-path:polygon(18% 0,82% 0,100% 13%,100% 100%,0 100%,0 13%);border-radius:0 0 14px 14px;filter:drop-shadow(0 18px 26px rgba(0,0,0,.35))}
.etq::after{content:"";position:absolute;inset:7px;border:1.5px dashed rgba(28,67,59,.35);clip-path:polygon(18% 0,82% 0,100% 13%,100% 100%,0 100%,0 13%);border-radius:0 0 10px 10px;pointer-events:none}
.etq-trou{position:absolute;top:9px;left:50%;width:16px;height:16px;margin-left:-8px;border-radius:50%;background:radial-gradient(circle,rgba(14,38,32,.55) 45%,#C9A96E 50%,#E8D3A0 70%,transparent 72%)}
.etq-bande{margin:10px -20px 10px;padding:6px 0;background:#1C433B;color:#FFE9A8;font-size:10.5px;font-weight:800;letter-spacing:.32em;text-transform:uppercase}
.etq-salut{font-family:var(--script);font-size:44px;line-height:1}
.etq-nom{font-size:clamp(24px,8vw,32px);font-weight:800;line-height:1.1;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.etq-sep{height:0;border-top:2px dotted rgba(28,67,59,.4);margin:14px 4px 12px}
.etq-bas{display:flex;align-items:center;gap:12px;justify-content:center}
.etq-code{width:64px;height:26px;background:repeating-linear-gradient(90deg,#1C433B 0 2px,transparent 2px 4px,#1C433B 4px 5px,transparent 5px 8px,#1C433B 8px 11px,transparent 11px 13px)}
.etq-local{font-size:12px;font-weight:800;text-align:left;line-height:1.2;max-width:120px}
.etq-pastille{position:absolute;right:calc(50% - min(37vw,135px) - 14px);top:44px;width:62px;height:62px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F06A5C,#D9473C 60%,#B8342A);color:#fff;
  font-size:11.5px;font-weight:800;line-height:1.1;display:flex;align-items:center;justify-content:center;text-align:center;transform:rotate(14deg) scale(0);box-shadow:0 4px 10px rgba(0,0,0,.25);animation:etqPastille .5s cubic-bezier(.3,1.7,.5,1) 1.15s forwards}
/* Halloween dans toute l'appli */
.app.halloween{--bg:#F3EDF6;--forest:#3A2252;--apple:#E8731C;--apple-l:#FF9A3C;--apple-soft:#FBE7D6;--terra:#7E57A8;--gold:#E9B949;--ink:#2A1D3D;--ink2:#5E4D70;--ink3:#9A8AAD;--line:#E5DAEC;
  background-color:var(--bg);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cg fill='%233A2252' opacity='.06'%3E%3Cpath d='M30 40c-4-6-10-7-18-4 4 1 5 3 5 5 3-1 5-1 7 1 2-1 4-1 6-2 2 1 4 1 6 2 2-2 4-2 7-1 0-2 1-4 5-5-8-3-14-2-18 4z'/%3E%3Cpath d='M128 118c-3-4-7-5-12-3 3 1 3 2 3 3 2-1 4-1 5 1l4-1 4 1c1-2 3-2 5-1 0-1 0-2 3-3-5-2-9-1-12 3z'/%3E%3Ccircle cx='150' cy='30' r='1.6'/%3E%3Ccircle cx='70' cy='150' r='1.4'/%3E%3Ccircle cx='100' cy='70' r='1.2'/%3E%3C/g%3E%3C/svg%3E")}
.app.halloween .h2{color:#3A2252}
.app.halloween .h2 i{background:linear-gradient(90deg,#E8731C,#7E57A8)}
.app.halloween .fid{background:radial-gradient(120% 90% at 85% 0%,#5E3F82 0%,#2B1B3D 55%,#140B22 100%)}
.app.halloween .fid::before{content:"";position:absolute;inset:0;background:radial-gradient(circle,rgba(255,236,200,.8) 1px,transparent 1.6px) 0 0/34px 34px;opacity:.22;pointer-events:none}
.app.halloween .tp-c.on{border-color:#FF9A3C;background:rgba(232,115,28,.2);box-shadow:0 0 10px rgba(255,154,60,.35)}
.app.halloween .tabs{background:#FBF7FD;border-top-color:#E5DAEC}
.app.halloween .tab.on{color:#5E3F82}
.app.halloween .rc .ic{color:#5E3F82;border-color:#E5DAEC;box-shadow:0 2px 8px rgba(58,34,82,.10)}
.app.halloween .card,.app.halloween .jour,.app.halloween .mini,.app.halloween .hero{border-color:#E5DAEC;box-shadow:0 3px 12px rgba(58,34,82,.07)}
.app.halloween .resa-btn{background:#E8731C}
.app.halloween .bulle-chat{background:#E8731C;box-shadow:0 6px 18px rgba(232,115,28,.45)}
.etq-halloween{background:rgba(20,11,34,.45)}
/* Octobre rose dans toute l'appli */
.app.octobrerose{--bg:#FCF3F6;--forest:#8E1E50;--apple:#E0457B;--apple-l:#F06292;--apple-soft:#FCE4EC;--terra:#B0235F;--gold:#E9A0BC;--ink:#3A1A2A;--ink2:#6E4A5C;--ink3:#A88A99;--line:#F3D9E3;
  background-color:var(--bg);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cg fill='%23E0457B' opacity='.07'%3E%3Cpath d='M30 44c-7-5-10-9-8-13 2-3 6-3 8 0 2-3 6-3 8 0 2 4-1 8-8 13z'/%3E%3Cpath d='M118 120c-5-4-8-7-6-10 1-2 4-2 6 0 2-2 5-2 6 0 2 3-1 6-6 10z'/%3E%3Ccircle cx='132' cy='34' r='1.8'/%3E%3Ccircle cx='60' cy='132' r='1.5'/%3E%3C/g%3E%3C/svg%3E")}
.app.octobrerose .h2{color:#8E1E50}
.app.octobrerose .h2 i{background:linear-gradient(90deg,#EC407A,#F8BBD0)}
.app.octobrerose .fid{background:radial-gradient(120% 90% at 85% 0%,#E26A98 0%,#B0235F 50%,#6E1640 100%)}
.app.octobrerose .fid::before{content:"";position:absolute;inset:0;background:radial-gradient(circle,rgba(255,255,255,.8) 1px,transparent 1.6px) 0 0/30px 30px;opacity:.22;pointer-events:none}
.app.octobrerose .tp-c.on{border-color:#F8BBD0;background:rgba(255,255,255,.18);box-shadow:0 0 10px rgba(248,187,208,.45)}
.app.octobrerose .tabs{background:#FFF9FB;border-top-color:#F3D9E3}
.app.octobrerose .tab.on{color:#B0235F}
.app.octobrerose .rc .ic{color:#B0235F;border-color:#F3D9E3;box-shadow:0 2px 8px rgba(176,35,95,.10)}
.app.octobrerose .card,.app.octobrerose .jour,.app.octobrerose .mini,.app.octobrerose .hero{border-color:#F3D9E3;box-shadow:0 3px 12px rgba(176,35,95,.07)}
.app.octobrerose .resa-btn,.app.octobrerose .bulle-chat{background:#E0457B}
.etq-octobrerose{background:rgba(110,22,64,.32)}
.etq-octobrerose .etq{background:linear-gradient(160deg,#FFE3EE 0%,#F8BBD0 55%,#F48FB1 100%);color:#6E1640}
.etq-octobrerose .etq::after{border-color:rgba(142,30,80,.35)}
.etq-octobrerose .etq-bande{background:#B0235F;color:#FFE3EE}
.etq-octobrerose .etq-sep{border-top-color:rgba(142,30,80,.4)}
.etq-octobrerose .etq-pastille{background:radial-gradient(circle at 35% 30%,#F06292,#EC407A 60%,#C2185B);font-size:10px}
.etq-octobrerose .etq-fil{background:linear-gradient(#F48FB1,#C2185B)}
.etq-halloween .etq{background:linear-gradient(160deg,#FFB25E 0%,#F28C28 55%,#D9621A 100%);color:#1A0F28}
.etq-halloween .etq::after{border-color:rgba(26,15,40,.45)}
.etq-halloween .etq-bande{background:#2B1B3D;color:#FFB547}
.etq-halloween .etq-sep{border-top-color:rgba(26,15,40,.45)}
.etq-halloween .etq-code{background:repeating-linear-gradient(90deg,#1A0F28 0 2px,transparent 2px 4px,#1A0F28 4px 5px,transparent 5px 8px,#1A0F28 8px 11px,transparent 11px 13px)}
.etq-halloween .etq-pastille{background:radial-gradient(circle at 35% 30%,#7E57A8,#5E3F82 60%,#3D2558);font-size:10px}
.etq-halloween .etq-fil{background:linear-gradient(#5E3F82,#2B1B3D)}
.etq-halloween .amb-araignee{position:absolute;top:-62px;left:50%;right:auto;margin-left:-17px;z-index:2;animation:araigneeEtq 2.4s ease-in-out 1s infinite;transform:none}
.etq-halloween .amb-araignee i{display:none}
.etq-halloween .amb-araignee svg{width:34px;height:29px;filter:drop-shadow(0 0 3px rgba(255,181,71,.5))}
@keyframes araigneeEtq{0%,100%{transform:translateY(-14px)}50%{transform:translateY(6px)}}
.etq-noel .etq{background:linear-gradient(160deg,#FFFFFF 0%,#F4F1EA 100%)}
.etq-noel .etq-bande{background:#A4161A;color:#F4D774}
.etq-noel .etq-pastille{background:radial-gradient(circle at 35% 30%,#4CAF50,#2E7D32 60%,#1B5E20);font-size:10.5px}
@keyframes etqFond{from{opacity:0}to{opacity:1}}
@keyframes etqOut{to{opacity:0}}
@keyframes etqBalance{0%{transform:translateY(-75vh) rotate(-22deg)}35%{transform:translateY(0) rotate(14deg)}52%{transform:rotate(-8deg)}68%{transform:rotate(4.5deg)}82%{transform:rotate(-2deg)}92%{transform:rotate(1deg)}100%{transform:rotate(0)}}
@keyframes etqPastille{to{transform:rotate(14deg) scale(1)}}
@media (prefers-reduced-motion:reduce){.etq-pend,.etq-pastille{animation:none}.etq-pastille{transform:rotate(14deg)}}
.niv-b{display:inline-block;margin-left:10px;padding:3px 10px;border-radius:20px;background:rgba(244,215,116,.18);border:1px solid rgba(244,215,116,.6);color:#F6D47A;font-family:var(--body);font-size:12px;font-weight:800;vertical-align:middle;white-space:nowrap}
.niv-l{margin-top:8px;font-size:12.5px;text-align:center;opacity:.9}
.niv-bravo{margin:0 0 12px;padding:12px 14px;border-radius:16px;display:flex;align-items:center;gap:10px;background:linear-gradient(100deg,#2E6B3A,#4C9A4A);color:#fff;font-size:14.5px}
.niv-bravo span{flex:1}.niv-bravo button{background:none;border:none;color:#fff;font-size:16px;opacity:.8;cursor:pointer;padding:4px}
.noel-b{margin:0 0 12px;padding:12px 14px;border-radius:16px;display:flex;align-items:center;gap:10px;background:linear-gradient(100deg,#B8860B,#F6D47A 30%,#FFF3C4 50%,#F2C14E 70%,#B8860B);background-size:220% 100%;animation:noelBrille 6s linear infinite;color:#3A2A05;font-size:14.5px;box-shadow:0 6px 16px rgba(184,134,11,.25)}
.noel-b.clic{cursor:pointer}.noel-b.clic:active{transform:scale(.98)}
.noel-i{font-size:22px;line-height:1}.noel-f{margin-left:auto;font-size:22px;font-weight:800;opacity:.7}
@keyframes noelBrille{from{background-position:0 0}to{background-position:-220% 0}}
@media (prefers-reduced-motion:reduce){.noel-b{animation:none}}
.anniv-b{margin:0 0 12px;padding:12px 14px;border-radius:16px;background:linear-gradient(100deg,#F48FB1,#F2B134);color:#3A1F1F;font-size:14.5px;text-align:center}
.recette{overflow:hidden;cursor:pointer}
.recette-img{width:100%;height:170px;object-fit:cover;display:block}
.recette-t{font-weight:800;font-size:16px;color:var(--forest)}
.recette-s{font-size:12.5px;color:var(--ink3);margin-top:2px}
.recette-autres{display:flex;gap:8px;overflow-x:auto;margin:8px 0 4px;padding-bottom:4px}
.recette-autres button{flex-shrink:0;border:1px solid var(--line);background:#fff;border-radius:14px;padding:8px 12px;font:inherit;font-size:12.5px;font-weight:700;color:var(--forest)}
.recette-rayon{margin-top:16px;padding:12px;border-radius:14px;background:#EEF3E2;color:var(--forest);font-weight:800;text-align:center}
.sondage-q{font-weight:800;font-size:15px;color:var(--forest);margin-bottom:10px}
.sondage-o{display:flex;flex-direction:column;gap:8px}
.sondage-o button{border:1.5px solid var(--apple);background:#fff;color:var(--forest);border-radius:14px;padding:11px;font:inherit;font-weight:800;font-size:14px}
.sondage-merci{font-weight:800;color:var(--apple);text-align:center;padding:8px}
.roue-annonce{margin:0 0 12px;padding:12px 14px;border-radius:16px;background:linear-gradient(100deg,#7A1E2C,#A61E2F);color:#FFF3C4;font-size:14.5px;text-align:center;box-shadow:0 6px 18px rgba(122,30,44,.25)}
.roue-choix{display:flex;align-items:center;gap:10px;flex-wrap:wrap;background:#FBF3D9;border-radius:14px;padding:10px 12px;margin-bottom:12px}
.roue-choix>div{flex:1;min-width:0;display:flex;flex-direction:column}
.roue-choix span{font-size:12.5px;color:var(--ink2)}
.roue-choix-ok{width:100%;font-size:12.5px;font-weight:700;color:var(--forest)}
.tp-plein{margin-top:12px;font-size:13.5px;font-weight:700;text-align:center;background:rgba(244,215,116,.18);border:1.5px solid rgba(244,215,116,.6);border-radius:12px;padding:10px}
.tp-exclus{margin-top:8px;font-size:11px;text-align:center;opacity:.6}
.fid{background:var(--forest);color:#fff;border-radius:var(--r);padding:22px 20px;margin-bottom:14px;position:relative;overflow:hidden}
.fid:after{content:'';position:absolute;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.05);top:-40px;right:-30px}
.fid h3{font-family:var(--script);font-size:28px;line-height:1;margin-bottom:4px}
.fid .s{font-size:11px;opacity:.7;margin-bottom:16px}
.pts{display:grid;gap:7px;margin-bottom:14px}
.pt{aspect-ratio:1;border-radius:50%;border:1.5px solid rgba(255,255,255,.28);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:rgba(255,255,255,.45)}
.pt.on{background:var(--apple-l);border-color:var(--apple-l);color:#fff}
.pt.next{border-color:var(--gold);color:var(--gold)}
.cpt{text-align:center;font-size:12px;opacity:.85}
.cpt b{font-size:22px;color:#F0C860}
.qr{background:#fff;border-radius:14px;padding:12px;display:inline-block;position:relative}
.qr img{display:block;width:148px;height:148px}
.zoom{position:absolute;right:6px;top:6px;background:rgba(0,0,0,.72);color:#fff;font-size:9px;font-weight:800;padding:3px 8px;border-radius:8px}
.code{font-size:19px;font-weight:800;letter-spacing:3px;color:#fff}
.btn{width:100%;padding:14px;border:none;border-radius:var(--r-s);font-family:var(--body);font-size:14px;font-weight:800;cursor:pointer;background:var(--apple);color:#fff}
.btn:active{transform:scale(.985)}
.btn.gh{background:transparent;border:1.5px solid var(--line);color:var(--ink2)}
.btn:disabled{background:#DDD8CC;color:#fff}
.inp{display:block;width:100%;max-width:100%;min-width:0;background:var(--card);border:1.5px solid var(--line);border-radius:var(--r-s);padding:12px 14px;font-family:var(--body);font-size:16px;color:var(--ink);outline:none;-webkit-appearance:none;appearance:none}
.inp:focus{border-color:var(--apple)}
.inp::placeholder{color:#B9BDB2}
.lab{font-size:11px;font-weight:800;color:var(--ink3);display:block;margin:0 0 5px 2px}
.empty{text-align:center;padding:34px 22px;color:var(--ink3);background:var(--card);border:1px dashed var(--line);border-radius:var(--r);margin-bottom:14px}
.empty b{display:block;color:var(--ink2);font-size:13.5px;margin-bottom:4px}
.empty span{font-size:12px;line-height:1.5}
.tbl{width:100%;border-collapse:collapse;font-size:12.5px}
.tbl td{padding:10px 0;border-bottom:1px solid var(--line)}
.tbl tr:last-child td{border-bottom:none}
.tbl td:first-child{font-weight:700;width:92px}
.tbl tr.now td{color:var(--apple);font-weight:800}
.tabs{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:440px;background:#fff;border-top:1px solid var(--line);display:flex;box-sizing:border-box;height:calc(76px + env(safe-area-inset-bottom));z-index:60;padding:6px 0 env(safe-area-inset-bottom)}
.tab{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;border:none;background:none;font-family:var(--body);font-size:9.5px;font-weight:800;color:var(--ink3);cursor:pointer;-webkit-tap-highlight-color:transparent;transition:color .25s}
.tab .pastille{position:relative;display:flex;align-items:center;justify-content:center;width:52px;height:32px;border-radius:16px;transition:transform .15s ease,background .3s}
.tab:active .pastille{transform:scale(.84)}
.tab .tab-l{transition:transform .25s}
.tab.on{color:var(--top,var(--forest))}
.tab.on .tab-l{font-weight:900;transform:translateY(-1px)}
.tab.on .pastille{background:#E3EDD4;background:color-mix(in srgb,var(--top,#6E9B3A) 20%,#fff);animation:tabPop .5s cubic-bezier(.3,1.6,.5,1)}
.tab.on .pastille svg{animation:tabSaut .55s cubic-bezier(.3,1.7,.5,1)}
.tab.on .pastille::after{content:"";position:absolute;inset:0;border-radius:16px;border:2px solid var(--top,var(--forest));opacity:0;animation:tabOnde .6s ease-out}
.tab.on::before{content:"";position:absolute;top:0;left:50%;width:26px;height:3px;margin-left:-13px;border-radius:0 0 3px 3px;background:var(--top,var(--forest));animation:tabBarre .35s ease-out}
.tab .etincelle{position:absolute;top:50%;left:50%;width:5px;height:5px;margin:-2.5px;border-radius:50%;background:var(--top,var(--apple));opacity:0;pointer-events:none}
.tab.on .etincelle{animation:tabEtincelle .6s ease-out forwards}
@keyframes tabPop{0%{transform:scale(.55)}60%{transform:scale(1.1)}100%{transform:scale(1)}}
@keyframes tabSaut{0%{transform:translateY(0) rotate(0)}35%{transform:translateY(-5px) rotate(-8deg)}70%{transform:translateY(1px) rotate(4deg)}100%{transform:translateY(0) rotate(0)}}
@keyframes tabOnde{0%{opacity:.6;transform:scale(1)}100%{opacity:0;transform:scale(1.6)}}
@keyframes tabBarre{from{width:0;margin-left:0}to{width:26px;margin-left:-13px}}
@keyframes tabEtincelle{0%{opacity:1;transform:rotate(var(--a)) translateY(0) scale(1)}100%{opacity:0;transform:rotate(var(--a)) translateY(-26px) scale(.3)}}
@media (prefers-reduced-motion:reduce){.tab.on .pastille,.tab.on .pastille svg,.tab.on .pastille::after,.tab.on::before,.tab.on .etincelle{animation:none}}
.full{position:fixed;inset:0;background:#fff;z-index:200;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px}
.inst{display:flex;align-items:center;gap:11px;background:#fff;border:1.5px solid var(--apple-l);border-radius:var(--r);padding:12px 12px 12px 13px;margin-bottom:14px}
.inst img{width:42px;height:42px;border-radius:11px;object-fit:cover;flex-shrink:0}
.inst .it{font-weight:800;font-size:13.5px;color:var(--forest)}
.inst .id{font-size:11.5px;color:var(--ink2);line-height:1.4;margin-top:2px}
.inst .ib2{flex-shrink:0;border:none;background:var(--forest);color:#fff;font-family:var(--body);font-size:12px;font-weight:800;padding:9px 13px;border-radius:10px;cursor:pointer}
.inst .ix{flex-shrink:0;border:none;background:none;color:var(--ink3);font-size:22px;line-height:1;padding:0 2px;cursor:pointer}
.racc{display:flex;gap:6px;margin:0 0 16px;overflow-x:auto;scrollbar-width:none;padding:8px 2px 2px}
.racc::-webkit-scrollbar{display:none}
.rc{flex:1 1 0;min-width:52px;display:flex;flex-direction:column;align-items:center;gap:6px;border:none;background:none;cursor:pointer;font-family:var(--body);padding:0}
.rc .ic{position:relative;width:50px;height:50px;border-radius:17px;background:#fff;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;color:var(--forest);box-shadow:0 2px 6px rgba(28,67,59,.06)}
.rc.chaud .ic{background:#FBEFE4;border-color:#F0D7BF;color:#A6612F}
.rc .ic b{position:absolute;top:-6px;right:-6px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:var(--terra);color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;border:2px solid var(--bg)}
.rc .lb2{font-size:11px;font-weight:800;color:var(--ink2)}
.rc:active .ic{transform:scale(.94)}
.ancre{scroll-margin-top:72px}
.voirtout{display:block;width:100%;margin:-6px 0 18px;padding:11px;border:1px dashed var(--line);border-radius:var(--r-s);background:none;font-family:var(--body);font-size:12.5px;font-weight:800;color:var(--forest);cursor:pointer}
.ch-regle{font-weight:700;text-transform:none}
.ch-liste{display:flex;flex-direction:column;gap:6px;max-height:42vh;overflow-y:auto;padding:2px}
.ch{display:flex;align-items:center;gap:10px;width:100%;text-align:left;border:1.5px solid var(--line);background:#fff;border-radius:12px;padding:10px 12px;font-family:var(--body);font-size:14px;font-weight:700;color:var(--ink);cursor:pointer}
.ch.on{border-color:var(--apple);background:var(--apple-soft)}
.ch.bloque{opacity:.45}
.ch-case{width:22px;height:22px;border-radius:7px;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:#fff;flex-shrink:0}
.ch.on .ch-case{background:var(--apple);border-color:var(--apple)}
.ch-nom{flex:1}
.ch-supp{font-size:11.5px;font-weight:800;color:var(--terra)}
.ch-compte{font-size:11.5px;color:var(--ink3);text-align:right;margin-top:6px;font-weight:700}
.ch-annonce{margin-top:6px;font-size:12px !important;font-weight:700;color:var(--terra) !important}
.pp{font-size:11px;font-weight:700;color:var(--ink3)}
.btn.choisir{width:auto;padding:11px 20px;font-size:13px;background:var(--terra);flex-shrink:0}
.cmd-note{background:#FBEFE4;border:1px solid #F0D7BF;color:#8A4F22;border-radius:var(--r-s);padding:11px 14px;font-size:12.5px;font-weight:700;line-height:1.45;margin-bottom:12px}
.cmd-hist{background:var(--card);border:1px solid var(--line);border-radius:var(--r-s);padding:11px 14px;margin-bottom:8px;font-size:12px;color:var(--ink2);line-height:1.5}
.cmd-hist b{color:var(--forest)}
.cmd-hist .t{font-weight:800;color:var(--apple)}
.sheet-fond{position:fixed;inset:0;z-index:400;background:rgba(20,30,25,.45);display:flex;align-items:flex-end;justify-content:center}
.sheet{width:100%;max-width:440px;background:var(--bg);border-radius:22px 22px 0 0;padding:18px 18px calc(18px + env(safe-area-inset-bottom));animation:monte .22s ease-out;max-height:92vh;overflow-y:auto}
@keyframes monte{from{transform:translateY(40px);opacity:.4}}
.sheet-hd{display:flex;gap:12px;align-items:center}
.sheet-hd img{width:64px;height:64px;border-radius:14px;object-fit:cover;flex-shrink:0}
.sheet-hd h3{font-family:var(--script);font-weight:400;font-size:27px;color:var(--forest);line-height:1}
.sheet-hd span{font-size:12.5px;font-weight:700;color:var(--ink2)}
.pas{display:flex;align-items:center;justify-content:center;gap:14px;margin:4px 0 6px}
.pas button{width:52px;height:52px;border-radius:50%;border:1.5px solid var(--line);background:#fff;font-size:26px;font-weight:700;color:var(--forest);cursor:pointer;font-family:var(--body)}
.pas button:disabled{opacity:.35}
.pas input{width:84px;text-align:center;font-family:var(--body);font-size:32px;font-weight:800;color:var(--forest);border:none;background:none;outline:none;-moz-appearance:textfield}
.pas input::-webkit-inner-spin-button{display:none}
.pas-info{text-align:center;font-size:11.5px;color:var(--ink3);margin-bottom:12px}
.calcul{text-align:center;font-size:14px;color:var(--ink2);margin-bottom:14px}
.calcul b{font-size:20px;color:var(--apple)}
.barre-panier{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(80px + env(safe-area-inset-bottom));z-index:70;width:calc(100% - 24px);max-width:416px;
 display:flex;justify-content:space-between;align-items:center;gap:10px;padding:14px 18px;border:none;border-radius:16px;background:var(--forest);color:#fff;
 font-family:var(--body);font-size:13.5px;cursor:pointer;box-shadow:0 8px 24px rgba(28,67,59,.32)}
.barre-panier .t{font-weight:800;font-size:15px}
.recap{background:var(--card);border:1px solid var(--line);border-radius:var(--r-s);overflow:hidden}
.recap .rl{display:flex;justify-content:space-between;gap:10px;padding:11px 14px;border-bottom:1px solid var(--line);font-size:13px;color:var(--ink)}
.recap .rl:last-child{border-bottom:none}
.recap .rl small{color:var(--ink3);font-size:11.5px}
.recap .rl.tot{background:var(--apple-soft);font-size:15px}
.recap .rl.tot b{color:var(--forest)}
.lien{border:none;background:none;color:var(--terra);font-family:var(--body);font-weight:800;font-size:12px;cursor:pointer;padding:0;text-decoration:underline}
.choix-mode{display:flex;gap:8px}
.choix-mode button{flex:1;padding:12px;border-radius:var(--r-s);border:1.5px solid var(--line);background:#fff;font-family:var(--body);font-size:13px;font-weight:800;color:var(--ink2);cursor:pointer}
.choix-mode button.on{border-color:var(--apple);background:var(--apple-soft);color:var(--forest)}
.cal{background:var(--card);border:1px solid var(--line);border-radius:var(--r-s);padding:10px}
.cal-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}
.cal-hd b{font-size:14px;color:var(--forest);text-transform:capitalize}
.cal-hd button{width:38px;height:38px;border-radius:50%;border:none;background:var(--apple-soft);color:var(--forest);font-size:22px;font-weight:800;cursor:pointer}
.cal-hd button:disabled{opacity:.25}
.cal-g{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.cal-j{text-align:center;font-size:10.5px;font-weight:800;color:var(--ink3);padding:4px 0}
.cal-d{aspect-ratio:1;border:none;border-radius:10px;background:var(--apple-soft);color:var(--forest);font-family:var(--body);font-size:14px;font-weight:800;cursor:pointer}
.cal-d:disabled{background:none;color:#CBC6BA;font-weight:600;cursor:default;text-decoration:line-through}
.cal-d.on{background:var(--apple);color:#fff}
.cal-info{font-size:12px !important;color:var(--ink3) !important;margin-top:8px}
.bientot{position:relative;overflow:hidden;background:var(--forest);color:#fff;border-radius:var(--r);padding:22px 20px;margin-bottom:14px;text-align:center}
.bientot.compact{padding:16px 18px;text-align:left}
.bt-badge{display:inline-block;background:#C9E38A;color:#1C433B;font-size:10.5px;font-weight:800;letter-spacing:1px;text-transform:uppercase;padding:4px 11px;border-radius:20px}
.bt-titre{font-family:var(--script);font-size:32px;line-height:1.05;margin:8px 0 6px}
.bientot.compact .bt-titre{font-size:27px}
.bt-txt{font-size:13px;line-height:1.5;opacity:.88}
.bt-deco{display:flex;justify-content:center;gap:9px;margin-top:16px}
.bt-deco i{width:22px;height:22px;border-radius:50%;border:2px solid rgba(255,255,255,.35);animation:btPulse 1.8s ease-in-out infinite}
@keyframes btPulse{0%,100%{background:transparent}50%{background:#A9C75A;border-color:#A9C75A}}
.remise{margin-top:14px}
.rm-ligne{display:flex;align-items:center;gap:16px}
.jauge{position:relative;flex-shrink:0}
.jauge-in{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1}
.jauge-in b{font-size:34px;font-weight:800;color:#fff}
.jauge-in span{font-size:11px;font-weight:700;opacity:.65;margin-top:3px}
.rm-cote{min-width:0}
.rm-total{font-size:13px;opacity:.85}
.rm-total b{font-size:16px;color:#C9E38A}
.rm-bon{font-size:13px;opacity:.85;margin-top:2px}
.rm-bon b{font-family:var(--script);font-weight:400;font-size:30px;color:#fff;opacity:1}
.rm-manque{margin-top:8px;font-size:12px;background:rgba(255,255,255,.1);border-radius:10px;padding:7px 10px;line-height:1.35}
.rm-manque b{color:#C9E38A}
.bons{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;align-items:stretch}
.bon{position:relative;background:#C9E38A;color:#1C433B;border-radius:10px;padding:8px 14px;text-align:center;line-height:1.05;
 -webkit-mask:radial-gradient(circle 6px at 0 50%,#0000 98%,#000) left/51% 100% no-repeat,radial-gradient(circle 6px at 100% 50%,#0000 98%,#000) right/51% 100% no-repeat;
 mask:radial-gradient(circle 6px at 0 50%,#0000 98%,#000) left/51% 100% no-repeat,radial-gradient(circle 6px at 100% 50%,#0000 98%,#000) right/51% 100% no-repeat;animation:bonPop .5s cubic-bezier(.3,1.5,.6,1) both}
.bon b{display:block;font-size:19px;font-weight:800}
.bon span{font-size:9.5px;font-weight:800;text-transform:uppercase;letter-spacing:.5px}
.bon.plus{display:flex;align-items:center;font-size:16px;font-weight:800}
@keyframes bonPop{from{transform:scale(.6) rotate(-6deg);opacity:0}}
.bons-txt{flex-basis:100%;font-size:12.5px;font-weight:700;margin-top:2px}
.bulle-chat{position:fixed;right:max(14px,calc(50% - 206px));bottom:calc(86px + env(safe-area-inset-bottom));z-index:65;width:52px;height:52px;justify-content:center;display:flex;align-items:center;gap:7px;border:none;border-radius:26px;padding:0 16px 0 13px;background:var(--terra);color:#fff;font-family:var(--body);font-size:13px;font-weight:800;box-shadow:0 6px 18px rgba(194,123,66,.45);cursor:pointer}
.bulle-chat:active{transform:scale(.94)}
.regle-plus{background:none;border:none;padding:0 2px;color:inherit;font:inherit;font-weight:800;text-decoration:underline;cursor:pointer;opacity:.9}
.regle-det{margin-top:6px;opacity:.85}
.bulle-chat.haut{bottom:calc(150px + env(safe-area-inset-bottom))}
.bulle-chat b{position:absolute;top:-6px;right:-4px;min-width:22px;height:22px;border-radius:11px;background:#B2263A;border:2px solid var(--bg);font-size:11px;display:flex;align-items:center;justify-content:center;padding:0 5px}
.bc-txt{white-space:nowrap;max-width:140px;overflow:hidden;transition:max-width .35s ease,opacity .25s ease}
.bulle-chat{transition:padding .35s ease,gap .35s ease}
.bulle-chat,.bulle-chat.petit{padding:0;gap:0;border-radius:50%}
.bulle-chat .bc-txt{max-width:0;opacity:0}
.chat-page{display:flex;flex-direction:column}
.chat-top{display:flex;align-items:center;gap:10px;color:#fff}
.chat-top button{font-size:22px !important;padding:0 6px 0 0 !important}
.chat-top img{width:36px;height:36px;border-radius:50%;border:2px solid rgba(255,255,255,.8)}
.chat-top b{display:block;font-size:14px}
.chat-top small{font-size:11px;opacity:.7}
.chat-fil{flex:1;overflow-y:auto;padding:14px 12px 10px;display:flex;flex-direction:column;gap:6px;max-width:620px;width:100%;margin:0 auto}
.chat-jour{align-self:center;font-size:11px;font-weight:800;color:var(--ink3);background:#EFE9DC;border-radius:10px;padding:3px 10px;margin:8px 0 2px;text-transform:capitalize}
.msg{max-width:82%;padding:9px 12px 6px;border-radius:16px;font-size:14px;line-height:1.4;white-space:pre-wrap;word-wrap:break-word}
.msg.client{align-self:flex-end;background:var(--apple);color:#fff;border-bottom-right-radius:5px}
.msg.epicerie{align-self:flex-start;background:#fff;border:1px solid var(--line);color:var(--ink);border-bottom-left-radius:5px}
.msg.premier{background:var(--apple-soft);border-color:#DCE8C4}
.msg .h{font-size:10px;opacity:.65;text-align:right;margin-top:3px}
.chat-saisie{position:sticky;bottom:0;background:var(--bg);border-top:1px solid var(--line);padding:10px 12px calc(10px + env(safe-area-inset-bottom));max-width:620px;width:100%;margin:0 auto}
.chat-ident .inp{padding:10px 12px}
.chat-rgpd{font-size:11px;color:var(--ink3);margin:6px 2px 8px}
.chat-ligne{display:flex;gap:8px;align-items:flex-end}
.chat-ligne textarea{flex:1;resize:none;max-height:120px;border-radius:22px;padding:11px 16px}
.chat-env{width:46px;height:46px;border-radius:50%;border:none;background:var(--terra);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0}
.chat-env:disabled{background:#DDD8CC}
.intro .bienv-txt{font-size:13px;font-weight:700;color:rgba(255,255,255,.85);margin:6px 0 4px;letter-spacing:.2px;animation:monteDoux .6s ease .9s both}
.pr-main{font-size:46px;text-align:center;animation:salut 1.4s ease-in-out 2;transform-origin:70% 80%}
@keyframes salut{0%,100%{transform:rotate(0)}25%{transform:rotate(18deg)}75%{transform:rotate(-12deg)}}
.tr-txt small{font-size:11.5px;color:var(--ink3)}
.resa-l{display:flex;align-items:center;gap:8px;margin-top:6px}
.resa-l span{font-size:11.5px;font-weight:800;color:var(--ink3)}
.resa-l span.chaud{color:#B2563F}
.resa-l .epuise{color:#B2563F;background:#F7E4DF;border-radius:8px;padding:3px 8px}
.resa-btn{border:none;background:var(--terra);color:#fff;font-family:var(--body);font-size:12px;font-weight:800;padding:7px 13px;border-radius:20px;cursor:pointer}
.resa-info{margin-top:10px;font-size:12.5px;color:#5C4A18;background:#FAF2DC;border-radius:10px;padding:8px 11px;text-align:center}
.resa-suivi{display:flex;gap:10px;align-items:center;background:#E3F1E3;border:1px solid #C5E1C5;border-radius:var(--r-s);padding:11px 13px;margin-bottom:10px;font-size:12px;color:#2E5E2E;line-height:1.4}
.resa-suivi b{font-size:13.5px;color:#1C433B}
.rs-ic{font-size:26px}
.notif-bloc{background:#FFF8EC;border:1.5px solid #F0D7BF;border-radius:var(--r);padding:14px 16px;margin:14px 0}
.notif-bloc b{font-size:14px;color:var(--forest)}
.notif-bloc p{font-size:12.5px;color:var(--ink2);line-height:1.5;margin-top:4px}
.notif-bloc.on{background:#EEF3E2;border-color:#CFE0AE}
.notif-bloc.compact{padding:12px 14px;margin:6px 0}
.tr-txt{font-size:13.5px;line-height:1.55;color:var(--ink2);margin-bottom:12px;text-align:center}
.tr-qr{display:flex;justify-content:center;background:#fff;border-radius:16px;padding:14px;margin-bottom:12px;border:1px solid var(--line)}
.tr-alerte{margin-top:10px;font-size:12px;line-height:1.45;color:#8A4F22;background:#FBEFE4;border-radius:10px;padding:9px 11px}
.allerg{display:flex;flex-wrap:wrap;gap:6px}
.allerg button{border:1.5px solid var(--line);background:#fff;border-radius:20px;padding:8px 12px;font-family:var(--body);font-size:12.5px;font-weight:800;color:var(--ink2);cursor:pointer}
.allerg button.on{border-color:#C86B5C;background:#FBEAE6;color:#9C3B2A}
.allerg-info{margin-top:8px;background:#FBEAE6;border-radius:var(--r-s);padding:10px 12px;font-size:12px;line-height:1.5;color:#7A3A2C}
.conditions{text-align:center;line-height:1.55}
.manque{font-size:12.5px !important;color:#B2563F !important;font-weight:700;margin-top:12px}
.btn.envoyer{margin-top:14px;background:var(--terra);font-size:15px;padding:16px}
.btn.envoyer:disabled{background:#DDD8CC}
.ok-rond{width:74px;height:74px;border-radius:50%;background:var(--apple);color:#fff;font-size:40px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.legal-in .recap .rl{margin:0}
.app.avec-panier{padding-bottom:150px}
.suivi{background:var(--card);border:1px solid var(--line);border-left:4px solid var(--apple);border-radius:var(--r-s);padding:12px 14px;margin-bottom:10px}
.suivi-hd{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:12px;color:var(--ink3)}
.suivi-hd span{color:#fff;font-size:10.5px;font-weight:800;padding:3px 10px;border-radius:20px;white-space:nowrap}
.suivi-tx{font-size:14px;font-weight:800;color:var(--forest);margin-top:6px;line-height:1.35}
.suivi-msg{font-size:13px;font-style:italic;color:var(--ink2);margin-top:8px;background:var(--bg);border-radius:10px;padding:8px 11px}
.suivi-msg small{display:block;font-style:normal;font-size:11px;color:var(--ink3);margin-top:2px}
.suivi-res{font-size:12px;color:var(--ink3);margin-top:6px}
.rappel{margin-top:10px;text-align:center}
.rappel .btn{font-size:13px;padding:12px}
.rappel .lien{display:inline-block;margin-top:8px;font-size:11.5px}
.ok-rond.non{background:#C86B5C}
.alerte-t{font-family:var(--script);font-weight:400;font-size:32px;color:var(--forest);text-align:center;margin-bottom:12px}
.legal{position:fixed;inset:0;z-index:380;background:var(--bg);overflow-y:auto;-webkit-overflow-scrolling:touch}
.legal-top{position:sticky;top:0;background:var(--forest);padding:12px 16px}
.legal-top button{border:none;background:none;color:#fff;font-family:var(--body);font-size:14px;font-weight:800;cursor:pointer;padding:4px 0}
.legal-in{max-width:620px;margin:0 auto;padding:20px 20px calc(40px + env(safe-area-inset-bottom))}
.legal-in h2{font-family:var(--script);font-weight:400;font-size:36px;color:var(--forest);margin-bottom:10px}
.legal-in h4{font-size:14px;font-weight:800;color:var(--forest);margin:20px 0 6px}
.legal-in p,.legal-in li{font-size:13.5px;line-height:1.6;color:var(--ink2);margin-bottom:6px}
.legal-in ul{padding-left:18px}
.legal-in .chapo{font-size:14.5px;color:var(--ink)}
.legal-in .maj-legal{font-size:11px;color:var(--ink3);margin-top:24px}
.donnees{background:var(--bg);border-radius:var(--r-s);padding:4px 12px}
.donnees div{display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid var(--line);font-size:13px}
.donnees div:last-child{border-bottom:none}
.donnees span{color:var(--ink3)}
.lienleg,.liens-leg button{display:block;margin:12px auto 0;border:none;background:none;font-family:var(--body);font-size:12px;font-weight:700;color:var(--ink3);text-decoration:underline;cursor:pointer}
.liens-leg{margin-top:20px;text-align:center}
.liens-leg button{display:inline-block;margin:6px 8px 0}
.rgpd-info{margin-top:16px;font-size:12px;line-height:1.5;color:var(--ink2);background:#fff;border:1px solid var(--line);border-radius:var(--r-s);padding:11px 13px}
.accord{display:flex;gap:10px;align-items:flex-start;margin-top:12px;font-size:12.5px;line-height:1.45;color:var(--ink);cursor:pointer}
.accord input{width:20px;height:20px;flex-shrink:0;margin-top:1px;accent-color:var(--apple)}
.accord button{border:none;background:none;padding:0;font:inherit;font-weight:800;color:var(--forest);text-decoration:underline;cursor:pointer}
.sheet-bg{position:fixed;inset:0;z-index:350;background:rgba(16,32,27,.55);display:flex;align-items:flex-end;justify-content:center;animation:fond .2s}
.sheet{background:#fff;width:100%;max-width:440px;border-radius:22px 22px 0 0;padding:20px 18px calc(22px + env(safe-area-inset-bottom));max-height:88vh;overflow-y:auto;animation:monte .25s ease}
@keyframes fond{from{opacity:0}}
@keyframes monte{from{transform:translateY(40px);opacity:0}}
.sheet.avec-fleche{padding-bottom:calc(74px + env(safe-area-inset-bottom))}
.sheet .ix{flex-shrink:0;border:none;background:var(--bg);color:var(--ink2);width:34px;height:34px;border-radius:50%;font-size:22px;line-height:1;cursor:pointer}
.etapes{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:12px}
.etapes li{display:flex;gap:12px;align-items:flex-start;font-size:14px;line-height:1.5;color:var(--ink)}
.etapes .num{flex-shrink:0;width:26px;height:26px;border-radius:50%;background:var(--forest);color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;margin-top:1px}
.bt{display:inline-flex;align-items:center;gap:4px;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:1px 8px;font-weight:800;font-size:13px;white-space:nowrap}
.pt2{font-size:12px;color:var(--ink3);line-height:1.45}
.fleche{position:fixed;z-index:351;color:#fff;font-size:40px;font-weight:800;text-shadow:0 2px 8px rgba(0,0,0,.4);animation:sautille 1s ease-in-out infinite;pointer-events:none}
.fleche.bas{bottom:6px;left:50%;margin-left:-12px}
.fleche.basdroite{bottom:6px;right:18px}
.fleche.hautdroite{top:6px;right:14px;transform:rotate(180deg);animation-name:sautille2}
@keyframes sautille{50%{transform:translateY(8px)}}
@keyframes sautille2{0%,100%{transform:rotate(180deg)}50%{transform:rotate(180deg) translateY(8px)}}
.intro{position:fixed;inset:0;z-index:400;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;
  background:radial-gradient(120% 75% at 50% 45%,#31544C 0%,#27423D 55%,#1D352F 100%);
  transition:opacity .55s ease,transform .6s cubic-bezier(.7,0,.3,1)}
.intro.out{opacity:0;transform:scale(1.04)}
.intro .halo{position:absolute;width:min(92vw,440px);aspect-ratio:1;border-radius:50%;
  background:radial-gradient(circle,rgba(169,199,90,.26) 0%,rgba(169,199,90,0) 64%);animation:halo 2.2s ease-out both}
.intro .logo{position:relative;width:min(70vw,300px);height:auto;filter:drop-shadow(0 10px 18px rgba(0,0,0,.28));
  animation:atterrit 1s cubic-bezier(.34,1.5,.64,1) .1s both}
.intro .slogan{position:relative;font-family:var(--script);font-size:29px;color:#fff;margin-top:6px;animation:monteDoux .7s ease .8s both}
.intro .accueil-perso{position:relative;text-align:center;margin-top:8px;animation:monteDoux .6s ease .6s both}
.intro .bonjour{font-family:var(--script);font-size:33px;color:#fff;line-height:1.1}
.intro .pts-chip{display:inline-block;margin-top:8px;font-size:12.5px;font-weight:800;color:#1C433B;background:#C9E38A;padding:6px 14px;border-radius:20px}
.intro .lieu{position:absolute;bottom:calc(30px + env(safe-area-inset-bottom));font-size:10px;font-weight:700;letter-spacing:3.5px;
  text-transform:uppercase;color:rgba(255,255,255,.5);animation:monteDoux .6s ease 1.1s both}
.feuille{position:absolute;top:-40px;opacity:0;animation-name:chute;animation-timing-function:linear;animation-iteration-count:infinite}
@keyframes chute{0%{opacity:0;transform:translate3d(0,0,0) rotate(0)}10%{opacity:.85}85%{opacity:.85}
  100%{opacity:0;transform:translate3d(var(--x),105vh,0) rotate(var(--r))}}
@keyframes atterrit{0%{opacity:0;transform:translateY(-70px) scale(.8) rotate(-8deg)}55%{opacity:1}100%{opacity:1;transform:none}}
@keyframes halo{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}
@keyframes monteDoux{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.bienv{position:fixed;inset:0;z-index:390;background:var(--bg);display:flex;flex-direction:column;animation:fond .4s ease}
.bienv .passer{position:absolute;top:calc(14px + env(safe-area-inset-top));right:16px;z-index:2;border:none;background:none;
  font-family:var(--body);font-size:13px;font-weight:800;color:var(--ink3);padding:8px;cursor:pointer}
.bienv .rail{flex:1;display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
.bienv .rail::-webkit-scrollbar{display:none}
.bienv .ecran{flex:0 0 100%;scroll-snap-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:40px 32px 10px;text-align:center}
.bienv .illu{position:relative;width:210px;height:210px;display:flex;align-items:center;justify-content:center;margin-bottom:28px}
.bienv .illu .rond{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F4F8EA,#E3EDCB)}
.bienv .illu svg{position:relative;width:138px;height:138px}
.bienv .ecran.vu .illu svg{animation:atterrit .8s cubic-bezier(.34,1.5,.64,1) both}
.bienv h2{font-family:var(--script);font-weight:400;font-size:40px;color:var(--forest);line-height:1;margin-bottom:12px}
.bienv p{font-size:15px;line-height:1.55;color:var(--ink2);max-width:320px}
.bienv .bas{padding:10px 24px calc(26px + env(safe-area-inset-bottom));max-width:440px;width:100%;margin:0 auto}
.bienv .pastilles{display:flex;justify-content:center;gap:7px;margin-bottom:18px}
.bienv .pastilles i{width:8px;height:8px;border-radius:5px;background:#D8D2C2;transition:all .25s;cursor:pointer}
.bienv .pastilles i.on{width:24px;background:var(--forest)}
@media (prefers-reduced-motion: reduce){
  .feuille{display:none}
  .intro .logo,.intro .slogan,.intro .accueil-perso,.intro .lieu,.intro .halo,.bienv .ecran.vu .illu svg{animation:none}
}
`,
  Deco = ({ a: a = "right" }) =>
    React.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: a === "right" ? "flex-end" : "flex-start",
          gap: 5,
          opacity: 0.28,
          margin: "2px 0 10px",
        },
      },
      Ic2.leaf(15, "#8AAD3B"),
      React.default.createElement("span", {
        style: { width: 4, height: 4, borderRadius: "50%", background: "#C9D6AE", alignSelf: "center" },
      }),
      Ic2.leaf(11, "#C9D6AE"),
    ),
  dx = ({ t, s: s }) =>
    React.default.createElement(
      "div",
      { className: "empty" },
      React.default.createElement("b", null, t),
      React.default.createElement("span", null, s),
    );
function Bannieres({ pubs: pubs, versCarte: versCarte, tel: tel }) {
  let r = (0, React.useRef)(null),
    [idx, setIdx] = (0, React.useState)(0),
    s = (0, React.useRef)(!1),
    l = pubs.length;
  if (
    ((0, React.useEffect)(() => {
      if (l < 2) return;
      let d = setInterval(() => {
        let h = r.current;
        if (!h || s.current) return;
        let f = (Math.round(h.scrollLeft / h.clientWidth) + 1) % l;
        h.scrollTo({ left: f * h.clientWidth, behavior: "smooth" });
      }, 5e3);
      return () => clearInterval(d);
    }, [l]),
    !l)
  )
    return null;
  let u = (d) => {
    d.action === "carte"
      ? versCarte()
      : d.action === "appeler" && tel && (location.href = "tel:" + tel.replace(/\s/g, ""));
  };
  return React.default.createElement(
    "div",
    { className: "pubs" },
    React.default.createElement(
      "div",
      {
        className: "rail",
        ref: r,
        onScroll: (d) => setIdx(Math.round(d.currentTarget.scrollLeft / d.currentTarget.clientWidth)),
        onTouchStart: () => {
          s.current = !0;
        },
        onTouchEnd: () => {
          setTimeout(() => {
            s.current = !1;
          }, 6e3);
        },
      },
      pubs.map((d) =>
        React.default.createElement(
          "div",
          { className: "pub", key: d.id, onClick: () => u(d) },
          React.default.createElement("img", { src: d.photo, alt: d.titre || "" }),
          (d.titre || d.texte || (d.action && d.action !== "aucune")) &&
            React.default.createElement(
              "div",
              { className: "txt" },
              d.titre && React.default.createElement("div", { className: "t" }, d.titre),
              d.texte && React.default.createElement("div", { className: "s" }, d.texte),
              d.action === "carte" &&
                React.default.createElement("span", { className: "go" }, "Voir la carte \u2192"),
              d.action === "appeler" &&
                React.default.createElement("span", { className: "go" }, "Appeler pour commander"),
            ),
        ),
      ),
    ),
    l > 1 &&
      React.default.createElement(
        "div",
        { className: "dots" },
        pubs.map((d, h) => React.default.createElement("i", { key: d.id, className: h === idx ? "on" : "" })),
      ),
  );
}
function ListeJour({ items: items, maj: maj, onReserver: onReserver }) {
  return React.default.createElement(
    "div",
    { className: "jour" },
    items.map((r) => {
      let i = TYPES[r.type] || TYPES.frais;
      return React.default.createElement(
        "div",
        { className: "ji", key: r.id },
        r.photo && React.default.createElement("img", { src: r.photo, alt: "" }),
        React.default.createElement(
          "div",
          { style: { minWidth: 0 } },
          React.default.createElement(
            "span",
            { className: "lb", style: { background: i.bg, color: i.c } },
            i.label.toUpperCase(),
          ),
          React.default.createElement("div", { className: "nm" }, r.titre),
          r.note && React.default.createElement("div", { className: "no" }, r.note),
          r.fin &&
            React.default.createElement(
              "div",
              { className: "no", style: { color: i.c, fontWeight: 700 } },
              "Jusqu'au ",
              dO(r.fin),
            ),
          j9(r) &&
            onReserver &&
            React.default.createElement(
              "div",
              { className: "resa-l" },
              Ro(r) > 0
                ? React.default.createElement(
                    React.default.Fragment,
                    null,
                    React.default.createElement(
                      "button",
                      { className: "resa-btn", onClick: () => onReserver(r) },
                      "Je r\xE9serve",
                    ),
                    parseInt(r.stock) < 999 &&
                      React.default.createElement(
                        "span",
                        { className: Ro(r) <= 2 ? "chaud" : "" },
                        Ro(r) <= 2 ? "Plus que " + Ro(r) + " !" : Ro(r) + " dispo.",
                      ),
                  )
                : React.default.createElement("span", { className: "epuise" }, "\xC9puis\xE9"),
            ),
        ),
        r.prix !== "" &&
          r.prix != null &&
          React.default.createElement(
            "div",
            { className: "px" },
            !!r.ancienPrix &&
              Number(r.ancienPrix) > Number(r.prix) &&
              React.default.createElement(
                "span",
                { className: "old" },
                Number(r.ancienPrix).toFixed(2),
                " \u20AC",
              ),
            Number(r.prix).toFixed(2),
            " \u20AC",
            r.unite && React.default.createElement("span", { className: "un" }, "/ ", r.unite),
          ),
      );
    }),
    maj && React.default.createElement("div", { className: "maj" }, "Mis \xE0 jour ", maj),
  );
}
function CarteActu({ a: a }) {
  return React.default.createElement(
    "div",
    { className: "card" },
    a.photo && React.default.createElement("img", { className: "ph", src: a.photo, alt: "" }),
    React.default.createElement(
      "div",
      { className: "b" },
      React.default.createElement("h3", null, a.titre),
      a.date &&
        React.default.createElement(
          "div",
          { style: { fontSize: 10.5, color: "var(--ink3)", marginBottom: 5 } },
          a.date,
        ),
      React.default.createElement("p", null, a.texte),
    ),
  );
}
var IcR = {
  promo: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("path", {
      d: "M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z",
    }),
    React.default.createElement("circle", { cx: "7.5", cy: "7.5", r: "1.5", fill: "currentColor" }),
  ),
  jour: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
    },
    React.default.createElement("path", {
      d: "M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 1 8-1 3.5-3.5 5-6.5 6",
    }),
    React.default.createElement("path", { d: "M2 21c0-3 1.9-5.4 5.1-6" }),
  ),
  plateau: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("path", { d: "M3 16h18" }),
    React.default.createElement("path", { d: "M4 16a8 8 0 0 1 16 0" }),
    React.default.createElement("path", { d: "M12 6V4M10 4h4M2 20h20" }),
  ),
  actus: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinejoin: "round",
    },
    React.default.createElement("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
    React.default.createElement("path", { d: "M7 9h6M7 13h10M7 17h7" }),
  ),
  carte: React.default.createElement(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinejoin: "round",
    },
    React.default.createElement("rect", { x: "2.5", y: "5", width: "19", height: "14", rx: "3" }),
    React.default.createElement("circle", { cx: "7.5", cy: "14", r: "1.3", fill: "currentColor" }),
    React.default.createElement("circle", { cx: "11.5", cy: "14", r: "1.3", fill: "currentColor" }),
    React.default.createElement("path", { d: "M6 9h7" }),
  ),
};
function Raccourcis({ liens: liens }) {
  return liens.length < 2
    ? null
    : React.default.createElement(
        "nav",
        { className: "racc", "aria-label": "Raccourcis" },
        liens.map((e) =>
          React.default.createElement(
            "button",
            { key: e.id, className: "rc " + (e.chaud ? "chaud" : ""), onClick: e.go },
            React.default.createElement(
              "span",
              { className: "ic" },
              IcR[e.id],
              !!e.n && React.default.createElement("b", null, e.n),
            ),
            React.default.createElement("span", { className: "lb2" }, e.label),
          ),
        ),
      );
}
var aller = (t) =>
  document
    .getElementById(t)
    ?.scrollIntoView({ behavior: mouvementReduit() ? "auto" : "smooth", block: "start" });
function VoeuxDuJour({ aCommander: aCommander, onClick: onClick }) {
  let [n, r] = new Date()
    .toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" })
    .slice(5)
    .split("-")
    .map(Number);
  if (n !== 12 || r > 25) return null;
  let i = 25 - r,
    o =
      i === 0
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("b", null, "Joyeux No\xEBl !"),
            " Toute l'\xE9picerie vous souhaite de belles f\xEAtes",
          )
        : i === 1
          ? React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("b", null, "No\xEBl, c'est demain !"),
              " Joyeux r\xE9veillon \xE0 tous",
            )
          : React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("b", null, "No\xEBl dans ", i, " jours"),
              aCommander && i >= 3 ? " : pensez \xE0 vos plateaux !" : "",
            ),
    s = aCommander && i >= 2;
  return React.default.createElement(
    "div",
    { className: "noel-b" + (s ? " clic" : ""), onClick: s ? onClick : void 0, role: s ? "button" : void 0 },
    React.default.createElement("span", { className: "noel-i" }, "\u{1F384}"),
    React.default.createElement("span", null, o),
    s && React.default.createElement("span", { className: "noel-f" }, "\u203A"),
  );
}
function Accueil({
  d: t,
  theme: theme,
  prenom: prenom,
  onReserver: onReserver,
  mesResas: mesResas = [],
  moi: moi,
  onFid: onFid,
  versCarte: versCarte,
  versActus: versActus,
  versFid: versFid,
  inst: inst,
  mesCmds: mesCmds = [],
  ouverture: ouverture,
  notifs: notifs,
}) {
  let [F, D] = (0, React.useState)(!1),
    M = mesCmds.filter(
      (v) =>
        v.ref &&
        ["nouvelle", "acceptee", "prep", "prete"].includes(v.statut) &&
        (Ua(v) || "") >= Wt(new Date()),
    ),
    C = (t.jour?.items || []).filter(vn),
    A = C.filter((v) => ["promo", "gaspi", "panier"].includes(v.type)),
    S = C.filter((v) => !["promo", "gaspi", "panier"].includes(v.type)),
    P = t.carteActive ? t.offres.filter(vn) : [],
    z = t.carteActive ? t.plateaux.filter(vn) : [],
    j = t.actus.filter(vn),
    b =
      !!z.length &&
      Nn(t.cmd).active &&
      (() => {
        let v = y2(t.cmd, t.fermetures).premiere;
        return !!v && v.slice(5) <= "12-24" && v.slice(0, 4) === String(new Date().getFullYear());
      })(),
    y = [
      A.length && { id: "promo", label: "Promos", n: A.length, chaud: !0, go: () => aller("sec-promos") },
      S.length && { id: "jour", label: "Du jour", n: S.length, go: () => aller("sec-jour") },
      (P.length || z.length) && { id: "plateau", label: "Plateaux", n: P.length + z.length, go: versCarte },
      j.length && { id: "actus", label: "Actus", n: j.length, go: versActus },
      t.fidActive && { id: "carte", label: "Ma carte", go: versFid },
    ].filter(Boolean);
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement(CarteTheme, { theme: theme }),
    c9(moi?.anniv) &&
      t.fidelite?.anniv !== !1 &&
      React.default.createElement(
        "div",
        { className: "anniv-b" },
        "\u{1F382} ",
        React.default.createElement(
          "b",
          null,
          "Joyeux anniversaire",
          moi.prenom ? " " + moi.prenom : "",
          " !",
        ),
        moi.annivAn === new Date().getFullYear()
          ? " Un tampon vous a \xE9t\xE9 offert sur votre carte \u{1F34F}"
          : " Un tampon vous est offert aujourd'hui \u{1F34F}",
      ),
    (() => {
      let v = t.roue?.annonce;
      return v?.prenom && Date.now() - (v.date || 0) < 10 * 864e5
        ? React.default.createElement(
            "div",
            { className: "roue-annonce" },
            "\u{1F389} ",
            React.default.createElement("b", null, "Bravo \xE0 ", v.prenom),
            ", qui remporte ",
            s9(v.titre),
            " !",
          )
        : null;
    })(),
    !(theme?.magie && theme.id === "noel") &&
      React.default.createElement(VoeuxDuJour, { aCommander: b, onClick: versCarte }),
    moi && t.fidActive && React.default.createElement(BravoNiveau, { moi: moi }),
    React.default.createElement(DemandeAvis, { d: t, mesCmds: mesCmds }),
    React.default.createElement(Bannieres, { pubs: t.pubs, versCarte: versCarte, tel: t.store.phone }),
    React.default.createElement(
      "div",
      { className: "hero" },
      React.default.createElement("img", { src: LOGO, alt: "" }),
      React.default.createElement(
        "div",
        { className: "hero-t" },
        React.default.createElement(
          "p",
          null,
          prenom ? "Bonjour " + prenom + " !" : t.store.slogan || "Bienvenue !",
        ),
        React.default.createElement(BadgeOuverture, { e: ouverture }),
      ),
    ),
    React.default.createElement(BandeauNotifications, { n: notifs, inst: inst }),
    React.default.createElement(TuileMenu, { menu: t.menu, onOuvrir: () => D(!0) }),
    F && React.default.createElement(FeuilleMenu, { menu: t.menu, onClose: () => D(!1) }),
    React.default.createElement(Raccourcis, { liens: y }),
    React.default.createElement(MesResas, { resas: mesResas }),
    M.slice(0, 2).map((v) =>
      React.default.createElement(SuiviCommande, { key: v.numero, c: v, store: t.store, compact: !0 }),
    ),
    inst.bandeau &&
      moi &&
      React.default.createElement(Installer, {
        inst: inst,
        texte: "Retrouvez votre carte de fid\xE9lit\xE9 d'un geste.",
      }),
    _2(t.fermetures) &&
      React.default.createElement(
        "div",
        { className: "annonce terra" },
        "\u{1F514} ",
        texteFermeture(_2(t.fermetures)),
      ),
    vn(t.annonce) &&
      t.annonce.active &&
      t.annonce.text &&
      React.default.createElement(
        "div",
        { className: "annonce " + (t.annonce.couleur || "apple") },
        t.annonce.text,
      ),
    !!A.length &&
      React.default.createElement(
        "section",
        { id: "sec-promos", className: "ancre" },
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", { style: { background: "var(--terra)" } }),
          "Promos & bonnes affaires",
        ),
        React.default.createElement(
          "div",
          { className: "sub" },
          "Prix r\xE9duits et dates courtes, tant qu'il y en a",
        ),
        React.default.createElement(ListeJour, { items: A, onReserver: onReserver }),
      ),
    React.default.createElement(
      "section",
      { id: "sec-jour", className: "ancre" },
      React.default.createElement(
        "h3",
        { className: "h2" },
        React.default.createElement("i", null),
        "Aujourd'hui",
      ),
      React.default.createElement("div", { className: "sub" }, "Le frais et les plats maison du moment"),
      S.length
        ? React.default.createElement(ListeJour, { items: S, maj: t.jour?.maj, onReserver: onReserver })
        : !A.length &&
            React.default.createElement(dx, {
              t: "Rien de publi\xE9 pour aujourd'hui",
              s: "Passez \xE0 l'\xE9picerie : le frais et les plats du jour vous y attendent.",
            }),
      !S.length &&
        !!A.length &&
        t.jour?.maj &&
        React.default.createElement(
          "div",
          { className: "sub", style: { marginLeft: 0 } },
          "Mis \xE0 jour ",
          t.jour.maj,
        ),
    ),
    !!j.length &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, null),
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", null),
          "Actualit\xE9s",
        ),
        React.default.createElement("div", { className: "sub" }),
        j.slice(0, 2).map((v) => React.default.createElement(CarteActu, { key: v.id, a: v })),
        j.length > 2 &&
          React.default.createElement(
            "button",
            { className: "voirtout", onClick: versActus },
            "Toutes les actualit\xE9s (",
            j.length,
            ") \u2192",
          ),
      ),
    !!(P.length || z.length) &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, null),
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", { style: { background: "var(--terra)" } }),
          "Plateaux & paniers",
        ),
        React.default.createElement(
          "div",
          { className: "sub" },
          z.length && Nn(t.cmd).active
            ? "\xC0 commander directement dans l'application"
            : "Sur commande, \xE0 retirer en boutique",
        ),
        React.default.createElement(
          "div",
          { className: "scroll" },
          z
            .slice(0, 6)
            .map((v) =>
              React.default.createElement(
                "div",
                { className: "mini", key: "p" + v.id, onClick: versCarte },
                v.photo && React.default.createElement("img", { src: v.photo, alt: "" }),
                React.default.createElement(
                  "div",
                  { className: "b" },
                  React.default.createElement("div", { className: "nm" }, v.nom),
                  React.default.createElement(
                    "div",
                    { className: "px", style: { fontSize: 16 } },
                    ze(xc(v)),
                    React.default.createElement("span", { className: "pp" }, " /pers."),
                  ),
                ),
              ),
            ),
          P.slice(0, 6).map((v) =>
            React.default.createElement(
              "div",
              { className: "mini", key: v.id, onClick: versCarte },
              v.photo && React.default.createElement("img", { src: v.photo, alt: "" }),
              React.default.createElement(
                "div",
                { className: "b" },
                React.default.createElement("div", { className: "nm" }, v.titre),
                React.default.createElement(
                  "div",
                  { className: "px", style: { fontSize: 16 } },
                  v.prix ? Number(v.prix).toFixed(2) + " \u20AC" : "Sur devis",
                ),
              ),
            ),
          ),
        ),
        React.default.createElement(
          "button",
          { className: "voirtout", onClick: versCarte },
          "Voir toute la carte \u2192",
        ),
      ),
    !t.fidActive &&
      t.onglets?.fidelite !== !1 &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, { a: "left" }),
        React.default.createElement(Bientot, { compact: !0 }),
      ),
    t.fidActive &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, { a: "left" }),
        React.default.createElement(FidCarte, { d: t, moi: moi, onFid: onFid, compact: !0 }),
      ),
    React.default.createElement(SectionProducteurs, { liste: t.producteurs || [] }),
    React.default.createElement(RecetteSemaine, { liste: t.recettes || [] }),
    React.default.createElement(Sondage, { d: t, moi: moi }),
  );
}
var oT = "epicerie-raddonnaise-tampons-vu",
  sT = ["#E05A73", "#F2B134", "#6E9B3A", "#4FC3F7", "#BA68C8", "#FF8A65", "#FFFFFF", "#A9C75A"],
  SO = Array.from({ length: 70 }, (t, e) => {
    let n = (r) => {
      let i = Math.sin(e * 77.7 + r * 13.1) * 43758.5453;
      return i - Math.floor(i);
    };
    return {
      x: n(1) * 100,
      d: 1.8 + n(2) * 1.8,
      delai: n(3) * 0.7,
      w: 6 + n(4) * 7,
      h: 8 + n(5) * 10,
      c: sT[e % sT.length],
      rot: (n(6) - 0.5) * 1440,
      dx: (n(7) - 0.5) * 160,
      rond: n(8) < 0.3,
    };
  });
function NO(t, e) {
  let [n, r] = (0, React.useState)(null),
    i = t?.tampons;
  return (
    (0, React.useEffect)(() => {
      if (!t?.ref || i == null || !fc(e)) return;
      let o = {};
      try {
        o = JSON.parse(localStorage.getItem(oT) || "{}");
      } catch {}
      let s = o[t.ref];
      o[t.ref] = i;
      try {
        localStorage.setItem(oT, JSON.stringify(o));
      } catch {}
      s != null &&
        (i > s
          ? r({ avant: s, apres: i, cle: Date.now() })
          : i < s && s > 0 && r({ avant: s, apres: i, cadeau: !0, cle: Date.now() }));
    }, [t?.ref, i]),
    [n, () => r(null)]
  );
}
function PopupFete({ fete: fete, f: e, onFin: onFin }) {
  let r = MENTION_EXCLUSIONS(e),
    { avant: i, apres: o } = fete,
    s = !fete.cadeau && r.palier && i < r.palier && o === r.palier,
    l = !fete.cadeau && o >= r.nb,
    u = s || l;
  (0, React.useEffect)(() => {
    try {
      navigator.vibrate?.(u ? [60, 60, 60, 60, 200] : [40, 40, 90]);
    } catch {}
    let h = setTimeout(onFin, u ? 7e3 : 4200);
    return () => clearTimeout(h);
  }, [fete.cle]);
  let d = Array.from({ length: r.nb }, (h, f) => f);
  return React.default.createElement(
    "div",
    { className: "fete" + (u ? " gros" : ""), onClick: onFin, role: "dialog", "aria-live": "polite" },
    u &&
      !mouvementReduit() &&
      React.default.createElement(
        "div",
        { className: "confettis", "aria-hidden": "true" },
        SO.map((h, f) =>
          React.default.createElement("i", {
            key: f,
            style: {
              left: h.x + "%",
              width: h.w,
              height: h.rond ? h.w : h.h,
              background: h.c,
              borderRadius: h.rond ? "50%" : 2,
              animationDuration: h.d + "s",
              animationDelay: h.delai + "s",
              "--rot": h.rot + "deg",
              "--dx": h.dx + "px",
            },
          }),
        ),
      ),
    React.default.createElement(
      "div",
      { className: "fete-in" },
      fete.cadeau
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "div",
              { className: "fete-boite ouverte" },
              React.default.createElement(aT, null),
            ),
            React.default.createElement("div", { className: "fete-t" }, "Profitez bien de votre cadeau !"),
            React.default.createElement(
              "div",
              { className: "fete-s" },
              "Votre carte repart \xE0 z\xE9ro : c'est parti pour une nouvelle collection \u{1F34F}",
            ),
          )
        : u
          ? React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "div",
                { className: "fete-boite" },
                React.default.createElement(aT, null),
                React.default.createElement("span", { className: "fete-rayons" }),
              ),
              React.default.createElement(
                "div",
                { className: "fete-t" },
                l ? "BRAVO ! Carte compl\xE8te !" : "Cadeau d\xE9bloqu\xE9 !",
              ),
              React.default.createElement(
                "div",
                { className: "fete-s" },
                l
                  ? React.default.createElement(
                      React.default.Fragment,
                      null,
                      React.default.createElement("b", null, "Votre cadeau"),
                      " vous attend en caisse \u{1F389}",
                    )
                  : React.default.createElement(
                      React.default.Fragment,
                      null,
                      "\xC0 vous de choisir, dites-le en caisse :",
                    ),
              ),
              s &&
                React.default.createElement(
                  "div",
                  { className: "fete-choix" },
                  React.default.createElement(
                    "div",
                    null,
                    React.default.createElement("span", null, "\u{1F381}"),
                    React.default.createElement("b", null, "Je prends mon cadeau"),
                    React.default.createElement(
                      "small",
                      null,
                      "Votre cadeau maintenant, et votre carte repart \xE0 z\xE9ro",
                    ),
                  ),
                  React.default.createElement(
                    "div",
                    null,
                    React.default.createElement("span", null, "\u{1F680}"),
                    React.default.createElement("b", null, "Je continue"),
                    React.default.createElement(
                      "small",
                      null,
                      "Jusqu'\xE0 ",
                      r.nb,
                      " tampons pour votre chouette cadeau",
                    ),
                  ),
                ),
            )
          : React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("div", { className: "fete-plus" }, "+", o - i),
              React.default.createElement(
                "div",
                { className: "fete-t" },
                o - i > 1 ? "Tampons gagn\xE9s !" : "Tampon gagn\xE9 !",
              ),
            ),
      !fete.cadeau &&
        React.default.createElement(
          "div",
          { className: "fete-rang" },
          d.map((h) => {
            let f = h >= i && h < o,
              m = h === r.nb - 1 || (r.palier && h === r.palier - 1);
            return React.default.createElement(
              "span",
              {
                key: h,
                className: "fr-c" + (h < o ? " on" : "") + (f ? " neuf" : "") + (m ? " cad" : ""),
                style: f ? { animationDelay: 0.35 + (h - i) * 0.25 + "s" } : void 0,
              },
              h < o
                ? React.default.createElement(
                    "b",
                    { style: f ? { animationDelay: 0.35 + (h - i) * 0.25 + "s" } : void 0 },
                    "\u{1F34F}",
                  )
                : m
                  ? "\u{1F381}"
                  : "",
              f &&
                React.default.createElement("em", { style: { animationDelay: 0.55 + (h - i) * 0.25 + "s" } }),
            );
          }),
        ),
      !fete.cadeau &&
        React.default.createElement(
          "div",
          { className: "fete-cpt" },
          React.default.createElement("b", null, Math.min(o, r.nb)),
          " / ",
          r.nb,
          !u && r.palier && o < r.palier
            ? " \xB7 encore " +
                (r.palier - o) +
                " tampon" +
                (r.palier - o > 1 ? "s" : "") +
                " pour votre cadeau"
            : !u && o < r.nb
              ? " \xB7 encore " +
                (r.nb - o) +
                " tampon" +
                (r.nb - o > 1 ? "s" : "") +
                " pour votre " +
                (r.palier ? "gros " : "") +
                "cadeau"
              : "",
        ),
    ),
  );
}
var aT = () =>
    React.default.createElement(
      "svg",
      {
        viewBox: "0 0 120 120",
        width: "130",
        height: "130",
        "aria-hidden": "true",
        style: { overflow: "visible" },
      },
      React.default.createElement(
        "g",
        { className: "b-couv" },
        React.default.createElement("rect", {
          x: "18",
          y: "38",
          width: "84",
          height: "20",
          rx: "4",
          fill: "#E05A73",
        }),
        React.default.createElement("rect", { x: "53", y: "38", width: "14", height: "20", fill: "#F2B134" }),
        React.default.createElement("path", {
          d: "M60 38c-8-16-30-18-30-6 0 8 16 8 30 6zm0 0c8-16 30-18 30-6 0 8-16 8-30 6z",
          fill: "#F2B134",
        }),
      ),
      React.default.createElement("rect", {
        x: "24",
        y: "58",
        width: "72",
        height: "50",
        rx: "4",
        fill: "#C2185B",
      }),
      React.default.createElement("rect", { x: "53", y: "58", width: "14", height: "50", fill: "#F2B134" }),
    ),
  lT = "epicerie-raddonnaise-popup-vu",
  DO = (t) => {
    let e = (t.titre || "") + "|" + (t.texte || ""),
      n = 0;
    for (let r = 0; r < e.length; r++) n = (n * 31 + e.charCodeAt(r)) | 0;
    return String(n);
  };
function PopupMessage({ d: d }) {
  let e = d.popup,
    [n, r] = (0, React.useState)(!1);
  if (n || !e || !vn({ ...e, active: !!e.active }) || !(e.titre || e.texte)) return null;
  let i = DO(e);
  if (e.frequence !== "chaque")
    try {
      if (localStorage.getItem(lT) === i) return null;
    } catch {}
  let o = () => {
    try {
      localStorage.setItem(lT, i);
    } catch {}
    r(!0);
  };
  return React.default.createElement(
    "div",
    { className: "pop-fond", onClick: o },
    React.default.createElement(
      "div",
      { className: "pop", role: "dialog", "aria-modal": "true", onClick: (s) => s.stopPropagation() },
      e.photo && React.default.createElement("img", { src: e.photo, alt: "", className: "pop-ph" }),
      e.emoji && React.default.createElement("div", { className: "pop-em" }, e.emoji),
      e.titre && React.default.createElement("div", { className: "pop-t" }, e.titre),
      e.texte && React.default.createElement("div", { className: "pop-x" }, e.texte),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 14 }, onClick: o },
        "J'en prends note",
      ),
    ),
  );
}
function SectionProducteurs({ liste: liste }) {
  let [e, n] = (0, React.useState)(null);
  return liste.length
    ? React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, { a: "left" }),
        React.default.createElement(
          "h3",
          { className: "h2", id: "sec-prod" },
          React.default.createElement("i", null),
          "Nos producteurs",
        ),
        React.default.createElement(
          "div",
          { className: "sub" },
          "Ils fabriquent, on vous les propose : du local, pr\xE8s de chez vous",
        ),
        React.default.createElement(
          "div",
          { className: "prods" },
          liste.map((r) =>
            React.default.createElement(
              "button",
              {
                key: r.id,
                className: "prod",
                onClick: () => {
                  n(r), tn("prod_" + r.id);
                },
              },
              React.default.createElement(
                "span",
                { className: "prod-ph" },
                r.photo
                  ? React.default.createElement("img", { src: r.photo, alt: "" })
                  : React.default.createElement("span", null, "\u{1F9D1}\u200D\u{1F33E}"),
              ),
              React.default.createElement("b", null, r.nom),
              r.metier && React.default.createElement("span", { className: "prod-m" }, r.metier),
              r.lieu &&
                React.default.createElement("span", { className: "prod-l" }, Ic2.pin(12, "#93A099"), r.lieu),
            ),
          ),
        ),
        e &&
          React.default.createElement(
            "div",
            { className: "sheet-fond", onClick: () => n(null) },
            React.default.createElement(
              "div",
              { className: "sheet", onClick: (r) => r.stopPropagation() },
              e.photo &&
                React.default.createElement("img", { src: e.photo, alt: "", className: "prod-grande" }),
              React.default.createElement(
                "h3",
                {
                  style: {
                    fontFamily: "var(--script)",
                    fontSize: 34,
                    color: "var(--forest)",
                    fontWeight: 400,
                    marginTop: 6,
                  },
                },
                e.nom,
              ),
              React.default.createElement(
                "div",
                { style: { fontWeight: 800, color: "var(--apple)", fontSize: 14 } },
                e.metier,
                e.lieu ? " \xB7 " + e.lieu : "",
              ),
              e.texte &&
                React.default.createElement(
                  "p",
                  {
                    style: {
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: "var(--ink2)",
                      marginTop: 10,
                      whiteSpace: "pre-line",
                    },
                  },
                  e.texte,
                ),
              e.produits &&
                React.default.createElement(
                  "div",
                  { className: "prod-pr" },
                  React.default.createElement("b", null, "\xC0 l'\xE9picerie :"),
                  " ",
                  e.produits,
                ),
              /^https?:\/\//.test(e.lien || "") &&
                React.default.createElement(
                  "a",
                  {
                    className: "btn gh",
                    style: { marginTop: 12, display: "block", textAlign: "center", textDecoration: "none" },
                    href: e.lien,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  },
                  "Voir sa page",
                ),
              React.default.createElement(
                "button",
                { className: "btn", style: { marginTop: 10 }, onClick: () => n(null) },
                "Fermer",
              ),
            ),
          ),
      )
    : null;
}
var uT = "epicerie-raddonnaise-avis",
  Y2 = (t) =>
    /^https:\/\/(g\.page|search\.google\.|www\.google\.|maps\.app\.goo\.gl|goo\.gl|g\.co)\//.test(
      t.store?.avis || "",
    )
      ? t.store.avis
      : "";
function DemandeAvis({ d: d, mesCmds: mesCmds }) {
  let [n, r] = (0, React.useState)(() => {
      try {
        return JSON.parse(localStorage.getItem(uT) || "{}");
      } catch {
        return {};
      }
    }),
    i = Y2(d),
    o = mesCmds.find((l) => l.statut === "remise" && l.ref);
  if (!i || !o || n.fait || (n.plusTard && Date.now() - n.plusTard < 30 * 864e5)) return null;
  let s = (l) => {
    r(l);
    try {
      localStorage.setItem(uT, JSON.stringify(l));
    } catch {}
  };
  return React.default.createElement(
    "div",
    { className: "avis" },
    React.default.createElement("div", { className: "avis-et" }, "\u2B50\u2B50\u2B50\u2B50\u2B50"),
    React.default.createElement("div", { className: "avis-t" }, "Votre plateau vous a plu ?"),
    React.default.createElement(
      "div",
      { className: "avis-s" },
      "Un petit avis Google aide beaucoup une \xE9picerie de village. Merci !",
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 8, marginTop: 10 } },
      React.default.createElement(
        "button",
        { className: "btn gh", style: { flex: 1 }, onClick: () => s({ plusTard: Date.now() }) },
        "Plus tard",
      ),
      React.default.createElement(
        "a",
        {
          className: "btn",
          style: { flex: 2, textDecoration: "none", textAlign: "center" },
          href: i,
          target: "_blank",
          rel: "noopener noreferrer",
          onClick: () => {
            s({ fait: Date.now() }), tn("avis");
          },
        },
        "Laisser un avis",
      ),
    ),
  );
}
function Actus({ d: d }) {
  let e = d.actus.filter(vn);
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement(
      "h3",
      { className: "h2" },
      React.default.createElement("i", null),
      "Actualit\xE9s",
    ),
    React.default.createElement("div", { className: "sub" }, "Les nouvelles de l'\xE9picerie"),
    e.length
      ? e.map((n) => React.default.createElement(CarteActu, { key: n.id, a: n }))
      : React.default.createElement(dx, {
          t: "Pas d'actualit\xE9 pour le moment",
          s: "Revenez bient\xF4t !",
        }),
  );
}
var CMD_KEY = "epicerie-raddonnaise-commandes",
  Dn = () => {
    try {
      return JSON.parse(localStorage.getItem(CMD_KEY) || "[]");
    } catch {
      return [];
    }
  },
  $a = (t) => {
    try {
      localStorage.setItem(CMD_KEY, JSON.stringify(t.slice(0, 10)));
    } catch {}
  };
function useMesCommandes(t) {
  let [liste, setListe] = (0, React.useState)(Dn),
    [live, setLive] = (0, React.useState)({});
  (0, React.useEffect)(() => {
    setListe(Dn());
  }, [t]);
  let o = liste.filter((h) => h.ref && (Ua(h) || "") >= Wt(Ko(-14))).map((h) => h.ref);
  (0, React.useEffect)(() => {
    let h = o.map((f) =>
      onSnapshot(
        doc2(db2, "commandes", f),
        (m) =>
          setLive((E) => ({
            ...E,
            [f]: m.exists() ? m.data() : m.metadata?.fromCache ? E[f] : { statut: "supprimee" },
          })),
        () => {},
      ),
    );
    return () => h.forEach((f) => f());
  }, [o.join()]);
  let s = liste
      .map((h) => {
        let f = h.ref && live[h.ref];
        return f
          ? {
              ...h,
              statut: f.statut,
              heure: f.heure || "",
              dateRetrait: f.dateRetrait || "",
              message: f.message || "",
              date: f.date || h.date,
              lignes: f.lignes || [],
              conv: f.conv || "",
            }
          : h;
      })
      .filter((h) => h.statut !== "supprimee"),
    l = Object.keys(live)
      .filter((h) => live[h]?.statut === "supprimee")
      .join();
  return (
    (0, React.useEffect)(() => {
      if (!l) return;
      let h = l.split(","),
        f = Dn().filter((m) => !h.includes(m.ref));
      f.length !== Dn().length && ($a(f), setListe(f));
    }, [l]),
    [
      s,
      (h, f) => {
        let m = Dn().map((E) => (E.ref === h ? { ...E, vu: f } : E));
        $a(m), setListe(m);
      },
      (h) => {
        let f = Dn().filter((m) => m.numero !== h);
        $a(f), setListe(f);
      },
    ]
  );
}
var AVERTIR = ["acceptee", "prete", "refusee", "annulee"],
  cT = (t) => t.ref && t.statut && AVERTIR.includes(t.statut) && t.vu !== t.statut;
function phraseSuivi(t) {
  let e = t.mode === "livraison",
    n = Ua(t),
    r = Wt(new Date()),
    i =
      (n === r ? "aujourd'hui" : n === Wt(Ko(1)) ? "demain" : "le " + jourFr(n)) +
      (t.heure ? " \xE0 " + l5(t.heure) : "");
  switch (t.statut) {
    case "acceptee":
    case "prep":
      return e
        ? "Valid\xE9e : livraison pr\xE9vue " + i + "."
        : "Valid\xE9e : \xE0 venir chercher " + i + ".";
    case "prete":
      return e
        ? "Votre commande est pr\xEAte, livraison " + i + "."
        : "Votre commande est pr\xEAte ! Elle vous attend " + i + ".";
    case "refusee":
      return "L'\xE9picerie n'a pas pu accepter cette commande.";
    case "annulee":
      return "Cette commande a \xE9t\xE9 annul\xE9e.";
    case "remise":
      return "Commande retir\xE9e. Merci et bonne d\xE9gustation !";
    default:
      return "Envoy\xE9e, en attente de validation par l'\xE9picerie.";
  }
}
function BoutonsRappel({ c: c, store: store }) {
  return !c.heure || !["acceptee", "prep", "prete"].includes(c.statut)
    ? null
    : React.default.createElement(
        "div",
        { className: "rappel" },
        React.default.createElement(
          "button",
          {
            className: "btn",
            onClick: () => {
              let r = document.createElement("a");
              (r.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(fichierAgenda(c, store))),
                (r.download = "commande-" + c.numero + ".ics"),
                document.body.appendChild(r),
                r.click(),
                r.remove();
            },
          },
          "\u{1F514} Me le rappeler (agenda du t\xE9l\xE9phone)",
        ),
        React.default.createElement(
          "a",
          { className: "lien", href: lienGoogleAgenda(c, store), target: "_blank", rel: "noopener" },
          "ou l'ajouter \xE0 Google Agenda",
        ),
      );
}
function SuiviCommande({ c: c, store: store, compact: compact, recommander: recommander, oublier: oublier }) {
  let o = SUIVI[c.statut] || SUIVI.nouvelle;
  return React.default.createElement(
    "div",
    { className: "suivi" + (compact ? " compact" : ""), style: { borderLeftColor: o.c } },
    React.default.createElement(
      "div",
      { className: "suivi-hd" },
      React.default.createElement("b", null, c.numero),
      React.default.createElement("span", { style: { background: o.c } }, o.t),
    ),
    React.default.createElement("div", { className: "suivi-tx" }, phraseSuivi(c)),
    c.message &&
      React.default.createElement(
        "div",
        { className: "suivi-msg" },
        "\xAB ",
        c.message,
        " \xBB",
        React.default.createElement("small", null, "\u2014 l'\xE9picerie"),
      ),
    !compact &&
      c.resume &&
      React.default.createElement(
        "div",
        { className: "suivi-res" },
        c.resume,
        c.total ? " \xB7 " + ze(c.total) : "",
      ),
    React.default.createElement(BoutonsRappel, { c: c, store: store }),
    recommander &&
      !compact &&
      ["remise", "refusee", "annulee", "prete", "prep", "acceptee"].includes(c.statut) &&
      c.lignes?.length > 0 &&
      React.default.createElement(
        "button",
        { className: "lien", style: { marginTop: 8 }, onClick: () => recommander(c.lignes) },
        "\u{1F501} Recommander la m\xEAme chose",
      ),
    oublier &&
      !compact &&
      React.default.createElement(
        "button",
        {
          className: "lien",
          style: { marginTop: 8, marginLeft: 12, color: "var(--ink3)" },
          onClick: async () =>
            (await p0(
              "Retirer la commande " +
                c.numero +
                ` de ce t\xE9l\xE9phone ?

Si l'\xE9picerie l'a bien re\xE7ue, elle reste enregistr\xE9e chez elle.`,
              { oui: "Retirer" },
            )) && oublier(c.numero),
        },
        "Retirer de ma liste",
      ),
  );
}
function AlerteCommande({ c: c, store: store, onClose: onClose }) {
  let r = c.statut === "acceptee" || c.statut === "prete";
  return React.default.createElement(
    "div",
    { className: "sheet-fond", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "sheet", onClick: (i) => i.stopPropagation(), role: "dialog" },
      React.default.createElement("div", { className: "ok-rond" + (r ? "" : " non") }, r ? "\u2713" : "!"),
      React.default.createElement(
        "h3",
        { className: "alerte-t" },
        c.statut === "prete"
          ? "Votre commande est pr\xEAte !"
          : r
            ? "Commande valid\xE9e !"
            : "Commande non accept\xE9e",
      ),
      React.default.createElement(SuiviCommande, { c: c, store: store }),
      !r &&
        store.phone &&
        React.default.createElement(
          "a",
          { href: "tel:" + store.phone.replace(/\s/g, ""), style: { textDecoration: "none" } },
          React.default.createElement(
            "button",
            { className: "btn gh", style: { marginTop: 8 } },
            "Appeler l'\xE9picerie",
          ),
        ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { marginTop: 8 }, onClick: onClose },
        r ? "Merci !" : "J'ai compris",
      ),
    ),
  );
}
function Carte({
  d: t,
  panier: panier,
  choisir: choisir,
  mesCmds: mesCmds,
  recommander: recommander,
  oublier: oublier,
}) {
  let s = t.offres.filter(vn),
    l = t.plateaux.filter(vn),
    u = [...new Set(s.map((f) => f.type).filter(Boolean))],
    d = Nn(t.cmd),
    h = mesCmds;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    !!l.length &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", { style: { background: "var(--terra)" } }),
          "Plateaux \xE0 commander",
        ),
        React.default.createElement(
          "div",
          { className: "sub" },
          "Choisissez votre plateau et le nombre de personnes : le prix se calcule tout seul",
        ),
        d.note && React.default.createElement("div", { className: "cmd-note" }, d.note),
        l.map((f) => {
          let [m, E] = x2(f),
            F = panier.find((D) => D.id === f.id);
          return React.default.createElement(
            "div",
            { className: "card", key: f.id },
            f.photo && React.default.createElement("img", { className: "ph", src: f.photo, alt: "" }),
            React.default.createElement(
              "div",
              { className: "b" },
              React.default.createElement("h3", null, f.nom),
              f.composition &&
                React.default.createElement("p", { style: { whiteSpace: "pre-line" } }, f.composition),
              Qo(f) &&
                React.default.createElement(
                  "p",
                  { className: "ch-annonce" },
                  "\u{1F9C0} ",
                  Qo(f).titre,
                  " : ",
                  Qo(f).options.length,
                  " au choix",
                ),
              React.default.createElement(
                "div",
                { className: "foot" },
                React.default.createElement(
                  "div",
                  null,
                  React.default.createElement("span", { className: "px" }, ze(xc(f))),
                  React.default.createElement("span", { className: "pp" }, " / personne"),
                  React.default.createElement(
                    "div",
                    { className: "serves" },
                    m === E ? "Pour " + m + " personnes" : "De " + m + " \xE0 " + E + " personnes",
                  ),
                ),
                d.active &&
                  React.default.createElement(
                    "button",
                    { className: "btn choisir", onClick: () => choisir(f) },
                    F ? F.personnes + " pers. \u2713" : "Choisir",
                  ),
              ),
            ),
          );
        }),
        !d.active &&
          t.store.phone &&
          React.default.createElement(
            "div",
            { className: "cmd-note" },
            "Les commandes en ligne sont momentan\xE9ment ferm\xE9es. Appelez-nous au ",
            t.store.phone,
            ".",
          ),
      ),
    !!s.length &&
      React.default.createElement(
        React.default.Fragment,
        null,
        !!l.length && React.default.createElement(Deco, null),
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", null),
          l.length ? "Paniers & autres offres" : "Plateaux & paniers",
        ),
        React.default.createElement(
          "div",
          { className: "sub" },
          "Sur commande \u2014 pr\xE9venez-nous \xE0 l'avance, on pr\xE9pare tout",
        ),
        (u.length ? u : [null]).map((f) =>
          React.default.createElement(
            "div",
            { key: f || "x" },
            f &&
              React.default.createElement(
                "div",
                {
                  style: {
                    fontFamily: "var(--script)",
                    fontSize: 24,
                    color: "var(--terra)",
                    margin: "16px 0 8px",
                  },
                },
                f,
              ),
            s
              .filter((m) => !f || m.type === f)
              .map((m) =>
                React.default.createElement(
                  "div",
                  { className: "card", key: m.id },
                  m.photo && React.default.createElement("img", { className: "ph", src: m.photo, alt: "" }),
                  m.badge && React.default.createElement("span", { className: "badge" }, m.badge),
                  React.default.createElement(
                    "div",
                    { className: "b" },
                    React.default.createElement("h3", null, m.titre),
                    m.desc && React.default.createElement("p", null, m.desc),
                    React.default.createElement(
                      "div",
                      { className: "foot" },
                      React.default.createElement(
                        "span",
                        { className: "px" },
                        m.prix ? Number(m.prix).toFixed(2) + " \u20AC" : "Sur devis",
                      ),
                      m.portions && React.default.createElement("span", { className: "serves" }, m.portions),
                    ),
                  ),
                ),
              ),
          ),
        ),
        t.store.phone &&
          React.default.createElement(
            "a",
            { href: "tel:" + t.store.phone.replace(/\s/g, ""), style: { textDecoration: "none" } },
            React.default.createElement(
              "button",
              { className: "btn gh", style: { marginTop: 8 } },
              "Commander par t\xE9l\xE9phone \u2014 ",
              t.store.phone,
            ),
          ),
      ),
    !s.length &&
      !l.length &&
      React.default.createElement(dx, {
        t: "La carte arrive bient\xF4t",
        s: "Plateaux ap\xE9ritifs, paniers garnis et corbeilles de fruits seront pr\xE9sent\xE9s ici, en photo.",
      }),
    !!h.length &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, { a: "left" }),
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", null),
          "Mes commandes envoy\xE9es",
        ),
        React.default.createElement("div", { className: "sub" }, "Enregistr\xE9es sur ce t\xE9l\xE9phone"),
        h.slice(0, 5).map((f) =>
          f.ref
            ? React.default.createElement(SuiviCommande, {
                key: f.numero,
                c: f,
                store: t.store,
                recommander: recommander,
                oublier: oublier,
              })
            : React.default.createElement(
                "div",
                { className: "cmd-hist", key: f.numero },
                React.default.createElement(
                  "div",
                  null,
                  React.default.createElement("b", null, f.numero),
                  " \xB7 pour le ",
                  jourFr(f.date),
                ),
                React.default.createElement("div", null, f.resume),
                React.default.createElement("div", { className: "t" }, ze(f.total)),
                oublier &&
                  React.default.createElement(
                    "button",
                    {
                      className: "lien",
                      style: { marginTop: 6 },
                      onClick: async () =>
                        (await p0("Retirer la commande " + f.numero + " de ce t\xE9l\xE9phone ?")) &&
                        oublier(f.numero),
                    },
                    "Retirer de ma liste",
                  ),
              ),
        ),
      ),
  );
}
function ChoixPlateau({
  p: p,
  actuel: actuel,
  onValider: onValider,
  onRetirer: onRetirer,
  onClose: onClose,
}) {
  let [o, s] = x2(p),
    l = Qo(p),
    [n, setN] = (0, React.useState)(actuel?.personnes || o),
    [sel, setSel] = (0, React.useState)(() =>
      (actuel?.choix || []).filter((M) => l?.options.some((C) => C.nom === M)),
    ),
    m = (M) =>
      setSel((C) =>
        C.includes(M) ? C.filter((A) => A !== M) : l.max === 1 ? [M] : C.length >= l.max ? C : [...C, M],
      ),
    E = w2(p, sel),
    F = parseInt(n) || 0,
    D = !l || (sel.length >= Math.max(l.min, 0) && sel.length <= l.max);
  return React.default.createElement(
    "div",
    { className: "sheet-fond", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "sheet", onClick: (M) => M.stopPropagation(), role: "dialog", "aria-label": p.nom },
      React.default.createElement(
        "div",
        { className: "sheet-hd" },
        p.photo && React.default.createElement("img", { src: p.photo, alt: "" }),
        React.default.createElement(
          "div",
          null,
          React.default.createElement("h3", null, p.nom),
          React.default.createElement("span", null, ze(xc(p)), " par personne"),
        ),
      ),
      l &&
        React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            "div",
            { className: "lab", style: { marginTop: 14 } },
            l.titre,
            React.default.createElement(
              "span",
              { className: "ch-regle" },
              l.min === l.max
                ? " \xB7 choisissez-en " + l.min
                : l.min > 0
                  ? " \xB7 de " + l.min + " \xE0 " + l.max
                  : " \xB7 jusqu'\xE0 " + l.max,
            ),
          ),
          React.default.createElement(
            "div",
            { className: "ch-liste" },
            l.options.map((M) => {
              let C = sel.includes(M.nom),
                A = !C && l.max > 1 && sel.length >= l.max;
              return React.default.createElement(
                "button",
                {
                  key: M.nom,
                  className: "ch" + (C ? " on" : "") + (A ? " bloque" : ""),
                  onClick: () => m(M.nom),
                  "aria-pressed": C,
                },
                React.default.createElement("span", { className: "ch-case" }, C ? "\u2713" : ""),
                React.default.createElement("span", { className: "ch-nom" }, M.nom),
                M.supp > 0 &&
                  React.default.createElement("span", { className: "ch-supp" }, "+", ze(M.supp), "/pers."),
              );
            }),
          ),
          React.default.createElement(
            "div",
            { className: "ch-compte" },
            sel.length,
            " / ",
            l.max,
            " choisi",
            sel.length > 1 ? "s" : "",
            !D && l.min > sel.length ? " \xB7 encore " + (l.min - sel.length) + " \xE0 choisir" : "",
          ),
        ),
      React.default.createElement(
        "div",
        { className: "lab", style: { textAlign: "center", marginTop: 14 } },
        "Nombre de personnes",
      ),
      React.default.createElement(
        "div",
        { className: "pas" },
        React.default.createElement(
          "button",
          {
            onClick: () => setN(Math.max(o, F - 1)),
            disabled: F <= o,
            "aria-label": "Une personne de moins",
          },
          "\u2212",
        ),
        React.default.createElement("input", {
          type: "number",
          inputMode: "numeric",
          value: n,
          min: o,
          max: s,
          onChange: (M) =>
            setN(M.target.value === "" ? "" : Math.min(s, Math.max(0, parseInt(M.target.value) || 0))),
          onBlur: () => setN(Math.min(s, Math.max(o, F || o))),
          "aria-label": "Nombre de personnes",
        }),
        React.default.createElement(
          "button",
          {
            onClick: () => setN(Math.min(s, (F || o) + 1)),
            disabled: F >= s,
            "aria-label": "Une personne de plus",
          },
          "+",
        ),
      ),
      React.default.createElement(
        "div",
        { className: "pas-info" },
        o === s ? "Plateau pour " + o + " personnes" : "De " + o + " \xE0 " + s + " personnes",
      ),
      React.default.createElement(
        "div",
        { className: "calcul" },
        F,
        " \xD7 ",
        ze(E),
        " = ",
        React.default.createElement("b", null, ze(F * E)),
      ),
      React.default.createElement(
        "button",
        { className: "btn", disabled: !(F >= o && F <= s) || !D, onClick: () => onValider(F, sel) },
        D
          ? (actuel ? "Mettre \xE0 jour" : "Ajouter \xE0 ma commande") + " \u2014 " + ze(F * E || 0)
          : "Choisissez " +
              (l.min === l.max ? l.min : "au moins " + l.min) +
              " option" +
              (l.min > 1 ? "s" : ""),
      ),
      actuel
        ? React.default.createElement(
            "button",
            { className: "btn gh", style: { marginTop: 8 }, onClick: onRetirer },
            "Retirer ce plateau",
          )
        : React.default.createElement(
            "button",
            { className: "btn gh", style: { marginTop: 8 }, onClick: onClose },
            "Annuler",
          ),
    ),
  );
}
function BarrePanier({ lignes: lignes, onOuvrir: onOuvrir }) {
  if (!lignes.length) return null;
  let n = lignes.reduce((r, i) => r + i.montant, 0);
  return React.default.createElement(
    "button",
    { className: "barre-panier", onClick: onOuvrir },
    React.default.createElement(
      "span",
      null,
      React.default.createElement("b", null, "Ma commande"),
      " \xB7 ",
      lignes.length,
      " plateau",
      lignes.length > 1 ? "x" : "",
    ),
    React.default.createElement("span", { className: "t" }, ze(n), " \u2192"),
  );
}
function Calendrier({ regle: regle, value: value, onChange: onChange }) {
  let [mois, setMois] = (0, React.useState)(() => (value || regle.premiere || regle.min).slice(0, 7)),
    [o, s] = mois.split("-").map(Number),
    l = new Date(o, s - 1, 1, 12),
    u = (l.getDay() + 6) % 7,
    d = new Date(o, s, 0).getDate(),
    h = [...Array(u).fill(null), ...Array.from({ length: d }, (m, E) => Wt(new Date(o, s - 1, E + 1, 12)))],
    f = (m) => setMois(Wt(new Date(o, s - 1 + m, 1, 12)).slice(0, 7));
  return React.default.createElement(
    "div",
    { className: "cal" },
    React.default.createElement(
      "div",
      { className: "cal-hd" },
      React.default.createElement(
        "button",
        {
          disabled: mois <= regle.min.slice(0, 7),
          onClick: () => f(-1),
          "aria-label": "Mois pr\xE9c\xE9dent",
        },
        "\u2039",
      ),
      React.default.createElement(
        "b",
        null,
        l.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }),
      ),
      React.default.createElement(
        "button",
        { disabled: mois >= regle.max.slice(0, 7), onClick: () => f(1), "aria-label": "Mois suivant" },
        "\u203A",
      ),
    ),
    React.default.createElement(
      "div",
      { className: "cal-g" },
      ["L", "M", "M", "J", "V", "S", "D"].map((m, E) =>
        React.default.createElement("span", { key: "h" + E, className: "cal-j" }, m),
      ),
      h.map((m, E) =>
        m
          ? React.default.createElement(
              "button",
              {
                key: m,
                disabled: !regle.ok(m),
                className: "cal-d" + (m === value ? " on" : ""),
                onClick: () => onChange(m),
                "aria-label": jourFr(m),
                "aria-pressed": m === value,
              },
              +m.slice(8),
            )
          : React.default.createElement("span", { key: "v" + E }),
      ),
    ),
  );
}
var ALLERGENES = [
    "Gluten",
    "Lait / lactose",
    "\u0152ufs",
    "Fruits \xE0 coque",
    "Arachides",
    "Poisson",
    "Crustac\xE9s",
    "Mollusques",
    "Soja",
    "C\xE9leri",
    "Moutarde",
    "S\xE9same",
    "Sulfites",
    "Lupin",
  ],
  REGIMES = ["Sans porc", "V\xE9g\xE9tarien", "Sans alcool"],
  ALLERG_PREFIXE = "\u26A0\uFE0F Allergies / r\xE9gime : ";
function Commande({
  d: t,
  moi: moi,
  lignes: lignes,
  modifier: modifier,
  vider: vider,
  onClose: onClose,
  ouvrirLegal: ouvrirLegal,
  onEnvoyee: onEnvoyee,
  notifs: notifs,
  inst: inst,
}) {
  let h = Nn(t.cmd),
    f = (0, React.useMemo)(() => y2(h, t.fermetures), [t.cmd, t.fermetures]),
    m = Dn()[0] || {},
    [date, setDate] = (0, React.useState)(""),
    [mode, setMode] = (0, React.useState)(h.mode === "livraison" ? "livraison" : "retrait"),
    [nom, setNom] = (0, React.useState)(moi?.nom || m.nom || Sf().prenom || ""),
    [tel, setTel] = (0, React.useState)(m.tel || ""),
    [adresse, setAdresse] = (0, React.useState)(m.adresse || ""),
    [remarque, setRemarque] = (0, React.useState)(""),
    [allergies, setAllergies] = (0, React.useState)([]),
    k = (Q) => setAllergies((Ae) => (Ae.includes(Q) ? Ae.filter((ot) => ot !== Q) : [...Ae, Q])),
    [etat, setEtat] = (0, React.useState)(""),
    [fini, setFini] = (0, React.useState)(null),
    se = lignes.reduce((Q, Ae) => Q + Ae.montant, 0),
    R = lignes.length
      ? date
        ? nom.trim()
          ? tel.replace(/\D/g, "").length < 10
            ? "Indiquez un num\xE9ro de t\xE9l\xE9phone pour que l'\xE9picerie puisse vous joindre."
            : mode === "livraison" && !adresse.trim()
              ? "Indiquez l'adresse de livraison."
              : ""
          : "Indiquez votre nom."
        : "Choisissez une date de " + (mode === "livraison" ? "livraison" : "retrait") + "."
      : "Ajoutez au moins un plateau.",
    fe = async () => {
      if (R || etat === "envoi") return;
      if (!f.ok(date)) {
        setEtat("Cette date n'est plus disponible, choisissez-en une autre."), setDate("");
        return;
      }
      setEtat("envoi");
      let Q = {
          numero: i5(),
          cree: Date.now(),
          statut: "nouvelle",
          nom: nom.trim().slice(0, 60),
          tel: tel.trim().slice(0, 20),
          mode: mode,
          adresse: mode === "livraison" ? adresse.trim().slice(0, 200) : "",
          date: date,
          remarque: [allergies.length ? ALLERG_PREFIXE + allergies.join(", ") : "", remarque.trim()]
            .filter(Boolean)
            .join(
              `
`,
            )
            .slice(0, 500),
          carte: moi?.code || "",
          lignes: lignes.map((st) => ({
            id: String(st.id),
            nom: st.nom.slice(0, 300),
            choix: (st.choix || []).slice(0, 12),
            personnes: st.personnes,
            prixPersonne: Math.round(st.prixPersonne * 100) / 100,
            montant: Math.round(st.montant * 100) / 100,
          })),
          total: Math.round(se * 100) / 100,
        },
        Ae = doc2(collection(db2, "commandes")),
        ot = Ae.id,
        et = () => {
          $a(Dn().filter((st) => st.ref !== ot)), Cf(ot);
        };
      try {
        let st = Q.lignes.map((is) => is.nom + " (" + is.personnes + " pers.)").join(", ");
        $a([
          {
            numero: Q.numero,
            ref: ot,
            date: date,
            mode: mode,
            total: Q.total,
            resume: st,
            nom: Q.nom,
            tel: Q.tel,
            adresse: Q.adresse,
            statut: "nouvelle",
            vu: "nouvelle",
          },
          ...Dn(),
        ]);
      } catch {}
      ux("cmd", ot);
      let de = setDoc(Ae, Q),
        Ht = await sx(de);
      if (Ht === "erreur") {
        et(),
          setEtat(
            "La commande n'a pas pu \xEAtre envoy\xE9e. V\xE9rifiez votre connexion et r\xE9essayez" +
              (t.store.phone ? ", ou appelez le " + t.store.phone : "") +
              ".",
          );
        return;
      }
      Ht === "ok" ? ns(t.cmd, "cmd", ot) : de.then(() => ns(t.cmd, "cmd", ot), et),
        onEnvoyee?.(),
        _c(),
        vider(),
        setFini({ ...Q, attente: Ht === "lent" }),
        window.scrollTo(0, 0);
    };
  return fini
    ? React.default.createElement(
        "div",
        { className: "legal" },
        React.default.createElement(
          "div",
          { className: "legal-in", style: { textAlign: "center", paddingTop: 50 } },
          React.default.createElement("div", { className: "ok-rond" }, "\u2713"),
          React.default.createElement("h2", null, "Commande envoy\xE9e !"),
          fini.attente
            ? React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement(
                  "p",
                  { className: "chapo" },
                  "Merci ",
                  fini.nom.split(" ")[0],
                  ". Votre commande ",
                  React.default.createElement("b", null, fini.numero),
                  " est enregistr\xE9e sur votre t\xE9l\xE9phone.",
                ),
                React.default.createElement(
                  "div",
                  { className: "envoi-lent" },
                  "\u{1F4F6} La connexion est faible : elle partira automatiquement \xE0 l'\xE9picerie d\xE8s que le r\xE9seau revient. Inutile de la renvoyer. Rouvrez l'appli plus tard pour voir sa validation.",
                ),
              )
            : React.default.createElement(
                "p",
                { className: "chapo" },
                "Merci ",
                fini.nom.split(" ")[0],
                ". L'\xE9picerie a bien re\xE7u votre commande ",
                React.default.createElement("b", null, fini.numero),
                ".",
              ),
          React.default.createElement(
            "div",
            { className: "recap", style: { textAlign: "left", margin: "18px 0" } },
            fini.lignes.map((Q) =>
              React.default.createElement(
                "div",
                { className: "rl", key: Q.id },
                React.default.createElement("span", null, Q.nom, " \xB7 ", Q.personnes, " pers."),
                React.default.createElement("b", null, ze(Q.montant)),
              ),
            ),
            React.default.createElement(
              "div",
              { className: "rl tot" },
              React.default.createElement("span", null, "Total"),
              React.default.createElement("b", null, ze(fini.total)),
            ),
            React.default.createElement(
              "div",
              { className: "rl" },
              React.default.createElement("span", null, MODES[fini.mode]),
              React.default.createElement("b", null, jourFr(fini.date)),
            ),
          ),
          React.default.createElement(
            "p",
            null,
            React.default.createElement("b", null, "L'\xE9picerie va valider votre commande"),
            " et fixer l'heure ",
            fini.mode === "livraison" ? "de livraison" : "\xE0 laquelle venir la chercher",
            ". Vous serez pr\xE9venu ici, dans l'application (onglet La carte \u2192 Mes commandes), et pourrez ajouter un rappel \xE0 votre agenda.",
          ),
          React.default.createElement(
            "p",
            null,
            "Le r\xE8glement se fait ",
            fini.mode === "livraison" ? "\xE0 la livraison" : "au retrait, \xE0 l'\xE9picerie",
            ". En cas de question, l'\xE9picerie vous appellera au ",
            fini.tel,
            ".",
          ),
          notifs &&
            React.default.createElement(
              "div",
              { style: { textAlign: "left", marginTop: 14 } },
              React.default.createElement(BlocNotifications, { n: notifs, compact: !0 }),
            ),
          React.default.createElement(
            "button",
            { className: "btn", style: { marginTop: 18 }, onClick: onClose },
            "Termin\xE9",
          ),
        ),
      )
    : React.default.createElement(
        "div",
        { className: "legal" },
        React.default.createElement(
          "div",
          { className: "legal-top" },
          React.default.createElement("button", { onClick: onClose }, "\u2190 Continuer mes achats"),
        ),
        React.default.createElement(
          "div",
          { className: "legal-in" },
          React.default.createElement("h2", null, "Ma commande"),
          React.default.createElement("h4", null, "1. Vos plateaux"),
          !lignes.length && React.default.createElement("p", null, "Votre commande est vide."),
          React.default.createElement(
            "div",
            { className: "recap" },
            lignes.map((Q) =>
              React.default.createElement(
                "div",
                { className: "rl", key: Q.id },
                React.default.createElement(
                  "span",
                  null,
                  React.default.createElement("b", null, Q.nom),
                  React.default.createElement("br", null),
                  React.default.createElement("small", null, Q.personnes, " pers. \xD7 ", ze(Q.prixPersonne)),
                ),
                React.default.createElement(
                  "span",
                  { style: { textAlign: "right" } },
                  React.default.createElement("b", null, ze(Q.montant)),
                  React.default.createElement("br", null),
                  React.default.createElement(
                    "button",
                    { className: "lien", onClick: () => modifier(Q.id) },
                    "Modifier",
                  ),
                ),
              ),
            ),
            !!lignes.length &&
              React.default.createElement(
                "div",
                { className: "rl tot" },
                React.default.createElement("span", null, "Total"),
                React.default.createElement("b", null, ze(se)),
              ),
          ),
          h.mode === "choix" &&
            React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("h4", null, "2. Retrait ou livraison ?"),
              React.default.createElement(
                "div",
                { className: "choix-mode" },
                ["retrait", "livraison"].map((Q) =>
                  React.default.createElement(
                    "button",
                    { key: Q, className: mode === Q ? "on" : "", onClick: () => setMode(Q) },
                    MODES[Q],
                  ),
                ),
              ),
            ),
          React.default.createElement(
            "h4",
            null,
            h.mode === "choix" ? "3" : "2",
            ". Date de ",
            mode === "livraison" ? "livraison" : "retrait",
          ),
          f.premiere
            ? React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement(Calendrier, { regle: f, value: date, onChange: setDate }),
                React.default.createElement(
                  "p",
                  { className: "cal-info" },
                  date
                    ? React.default.createElement(
                        React.default.Fragment,
                        null,
                        "Choisi : ",
                        React.default.createElement("b", null, jourFr(date)),
                      )
                    : "Touchez une date disponible.",
                  Number(h.delaiMin) > 0 &&
                    React.default.createElement(
                      React.default.Fragment,
                      null,
                      " Les commandes se passent au moins ",
                      h.delaiMin,
                      " jour",
                      h.delaiMin > 1 ? "s" : "",
                      " \xE0 l'avance.",
                    ),
                ),
              )
            : React.default.createElement(
                "p",
                null,
                "Aucune date n'est disponible pour le moment. ",
                t.store.phone && "Appelez-nous au " + t.store.phone + ".",
              ),
          React.default.createElement("h4", null, h.mode === "choix" ? "4" : "3", ". Vos coordonn\xE9es"),
          React.default.createElement("label", { className: "lab" }, "Nom et pr\xE9nom"),
          React.default.createElement("input", {
            className: "inp",
            value: nom,
            onChange: (Q) => setNom(Q.target.value),
            maxLength: 60,
            autoComplete: "name",
          }),
          React.default.createElement(
            "label",
            { className: "lab", style: { marginTop: 10 } },
            "T\xE9l\xE9phone",
          ),
          React.default.createElement("input", {
            className: "inp",
            type: "tel",
            value: tel,
            onChange: (Q) => setTel(Q.target.value),
            maxLength: 20,
            autoComplete: "tel",
            placeholder: "06 12 34 56 78",
          }),
          mode === "livraison" &&
            React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "label",
                { className: "lab", style: { marginTop: 10 } },
                "Adresse de livraison",
              ),
              React.default.createElement("textarea", {
                className: "inp",
                rows: 2,
                value: adresse,
                onChange: (Q) => setAdresse(Q.target.value),
                maxLength: 200,
                autoComplete: "street-address",
              }),
            ),
          React.default.createElement(
            "label",
            { className: "lab", style: { marginTop: 12 } },
            "Allergies ou r\xE9gime (facultatif)",
          ),
          React.default.createElement(
            "div",
            { className: "allerg" },
            [...ALLERGENES, ...REGIMES].map((Q) =>
              React.default.createElement(
                "button",
                {
                  key: Q,
                  type: "button",
                  className: allergies.includes(Q) ? "on" : "",
                  "aria-pressed": allergies.includes(Q),
                  onClick: () => k(Q),
                },
                allergies.includes(Q) ? "\u2713 " : "",
                Q,
              ),
            ),
          ),
          !!allergies.length &&
            React.default.createElement(
              "div",
              { className: "allerg-info" },
              "L'\xE9picerie fera au mieux pour \xE9viter : ",
              React.default.createElement("b", null, allergies.join(", ")),
              ". Les plateaux sont pr\xE9par\xE9s dans un atelier qui manipule ces ingr\xE9dients : des traces restent possibles. En cas d'allergie s\xE9v\xE8re, appelez l'\xE9picerie",
              t.store.phone ? " au " + t.store.phone : "",
              " avant de commander. Cette information sert uniquement \xE0 pr\xE9parer votre commande.",
            ),
          React.default.createElement(
            "label",
            { className: "lab", style: { marginTop: 10 } },
            "Remarque (facultatif)",
          ),
          React.default.createElement("textarea", {
            className: "inp",
            rows: 2,
            value: remarque,
            onChange: (Q) => setRemarque(Q.target.value),
            maxLength: 400,
            placeholder: "Heure souhait\xE9e, ingr\xE9dient \xE0 \xE9viter, message\u2026",
          }),
          React.default.createElement(
            "div",
            { className: "rgpd-info", style: { marginTop: 12 } },
            "Vos coordonn\xE9es servent uniquement \xE0 pr\xE9parer et vous remettre cette commande.",
            " ",
            React.default.createElement(
              "button",
              { className: "lien", onClick: () => ouvrirLegal("confidentialite") },
              "En savoir plus",
            ),
          ),
          React.default.createElement(ConseilInstallCommande, {
            inst: inst,
            quoi: "le suivi de votre commande",
          }),
          R && lignes.length > 0 && React.default.createElement("p", { className: "manque" }, R),
          etat && etat !== "envoi" && React.default.createElement("p", { className: "manque" }, etat),
          React.default.createElement(
            "button",
            { className: "btn envoyer", disabled: !!R || etat === "envoi", onClick: fe },
            etat === "envoi" ? "Envoi en cours\u2026" : "Envoyer ma commande \u2014 " + ze(se),
          ),
          React.default.createElement(
            "p",
            { className: "cal-info conditions" },
            "Paiement ",
            mode === "livraison" ? "\xE0 la livraison" : "au retrait \xE0 l'\xE9picerie",
            ", aucun paiement en ligne. Produits frais pr\xE9par\xE9s sur commande : pas de droit de r\xE9tractation. Pour annuler ou modifier",
            t.store.phone ? ", appelez le " + t.store.phone : ", contactez l'\xE9picerie",
            " au moins 48 h avant.",
          ),
        ),
      );
}
function Jauge({ progres: progres, taille: taille = 136, children: children }) {
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
async function ZO(t, e) {
  if (
    (await setDoc(doc2(db2, "clients", t.ref), { choix: e, choixLe: Date.now() }, { merge: !0 }),
    e === "cadeau" && g2(Z2))
  )
    try {
      await waitForPendingWrites(db2),
        fetch(Z2 + "?fid=" + encodeURIComponent(t.ref) + "&e=choix", {
          method: "GET",
          mode: "no-cors",
          redirect: "follow",
        }).catch(() => {});
    } catch {}
}
function ChoixRecompense({ moi: moi, t: t, onFait: onFait }) {
  let [r, i] = (0, React.useState)(!1),
    [o, s] = (0, React.useState)(""),
    l = async (u) => {
      i(!0), s("");
      try {
        await ZO(moi, u), onFait?.(u);
      } catch {
        s("Pas de connexion : r\xE9essayez dans un instant.");
      }
      i(!1);
    };
  return React.default.createElement(
    "div",
    { className: "choix-b" },
    React.default.createElement(
      "button",
      { disabled: r, onClick: () => l("cadeau") },
      React.default.createElement("span", null, "\u{1F381}"),
      React.default.createElement("b", null, "Je vais chercher mon cadeau"),
      React.default.createElement(
        "small",
        null,
        "L'\xE9picerie est pr\xE9venue, votre carte repartira \xE0 z\xE9ro",
      ),
    ),
    React.default.createElement(
      "button",
      { disabled: r, onClick: () => l("continue") },
      React.default.createElement("span", null, "\u{1F680}"),
      React.default.createElement("b", null, "Je continue"),
      React.default.createElement("small", null, "Jusqu'\xE0 ", t.nb, " tampons pour votre chouette cadeau"),
    ),
    o && React.default.createElement("div", { className: "choix-err" }, o),
  );
}
function FenetreChoix({ moi: moi, f: f, onClose: onClose }) {
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
        React.default.createElement("div", { className: "choix-ico" }, "\u{1F381}"),
        i
          ? i === "cadeau"
            ? React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("h2", null, "C'est not\xE9 !"),
                React.default.createElement(
                  "p",
                  null,
                  "Votre cadeau vous attend en caisse. L'\xE9picerie est pr\xE9venue \u{1F389}",
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
                  " tampons pour votre chouette cadeau \u{1F381}\u{1F381}",
                ),
              )
          : React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("h2", null, "Bravo, ", r.palier, " tampons !"),
              React.default.createElement(
                "p",
                null,
                "Votre cadeau surprise est d\xE9bloqu\xE9. Que voulez-vous faire ?",
              ),
              React.default.createElement(ChoixRecompense, { moi: moi, t: r, onFait: o }),
              React.default.createElement(
                "button",
                { className: "choix-tard", onClick: onClose },
                "Je d\xE9ciderai plus tard",
              ),
            ),
      ),
    )
  );
}
var wT = "epicerie-raddonnaise-tampons-anim",
  dT = () => {
    try {
      return JSON.parse(localStorage.getItem(wT) || "{}");
    } catch {
      return {};
    }
  };
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
function GrilleTampons({ f: t, moi: moi, amb: amb }) {
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
                amb === "halloween"
                  ? "\u{1F383}"
                  : amb === "octobrerose"
                    ? "\u{1F380}"
                    : nn[amb]
                      ? nn[amb].tampon
                      : "\u{1F34F}",
              )
            : m
              ? React.default.createElement(
                  "span",
                  { className: r.palier ? "deux" : "" },
                  r.palier ? "\u{1F381}\u{1F381}" : "\u{1F381}",
                )
              : f
                ? React.default.createElement("span", null, "\u{1F381}")
                : React.default.createElement("i", null, h + 1),
        );
      }),
    ),
    moi
      ? i >= r.nb
        ? React.default.createElement(
            "div",
            { className: "tp-plein" },
            "\u{1F389} Carte compl\xE8te ! ",
            React.default.createElement("b", null, "Votre cadeau"),
            " vous attend : pr\xE9sentez votre carte en caisse.",
          )
        : r.palier && i === r.palier
          ? X2(moi) === "cadeau"
            ? React.default.createElement(
                "div",
                { className: "tp-plein" },
                "\u{1F381} C'est not\xE9 ! ",
                React.default.createElement("b", null, "Votre cadeau vous attend en caisse."),
                React.default.createElement("br", null),
                "L'\xE9picerie est pr\xE9venue. Votre carte repartira \xE0 z\xE9ro.",
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
                  " \u{1F381}\u{1F381}",
                )
              : React.default.createElement(
                  "div",
                  { className: "tp-plein" },
                  "\u{1F381} Cadeau d\xE9bloqu\xE9 ! \xC0 vous de choisir :",
                  React.default.createElement(ChoixRecompense, { moi: moi, t: r }),
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
                " \u{1F381}",
              )
            : r.palier
              ? React.default.createElement(
                  "div",
                  { className: "tp-reste" },
                  "Vous avez continu\xE9 : encore ",
                  React.default.createElement("b", null, r.nb - i),
                  " tampon",
                  r.nb - i > 1 ? "s" : "",
                  " pour ",
                  React.default.createElement("b", null, "votre chouette cadeau"),
                  " \u{1F381}\u{1F381}",
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
        "\u{1F382} ",
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
        " : ajout\xE9",
        moi.bonusAttente > 1 ? "s" : "",
        " sur votre carte \xE0 votre prochain passage en caisse.",
      ),
    moi && React.default.createElement(NiveauSuivant, { moi: moi }),
    r.exclus && React.default.createElement("div", { className: "tp-exclus" }, "Hors ", r.exclus, "."),
  );
}
function NiveauSuivant({ moi: moi }) {
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
                " \xB7 ",
              )
            : null,
          "Encore ",
          i(r),
          " re\xE7u",
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
          " : merci pour votre fid\xE9lit\xE9 !",
        ),
  );
}
var hT = "epicerie-raddonnaise-niveau-vu";
function BravoNiveau({ moi: moi }) {
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
          "\u{1F389} ",
          React.default.createElement(
            "span",
            null,
            "Bravo",
            moi.prenom ? " " + moi.prenom : "",
            ", vous devenez ",
            React.default.createElement("b", null, e.ico, " ", e.nom),
            " ! Merci pour votre fid\xE9lit\xE9.",
          ),
          React.default.createElement(
            "button",
            {
              onClick: () => {
                s(n), i(n);
              },
              "aria-label": "Fermer",
            },
            "\u2715",
          ),
        )
  );
}
function RegleTampons({ f: f }) {
  let [e, n] = (0, React.useState)(!1),
    r = MENTION_EXCLUSIONS(f);
  return React.default.createElement(
    "div",
    { className: "s" },
    r.seuil ? "1 passage d\xE8s " + pc(r.seuil) + " d'achats = 1 tampon" : "1 passage = 1 tampon",
    " ",
    React.default.createElement(
      "button",
      { className: "regle-plus", onClick: () => n(!e), "aria-expanded": e },
      e ? "Moins" : "D\xE9tails",
    ),
    e &&
      React.default.createElement(
        "div",
        { className: "regle-det" },
        $I(f).split(" \xB7 ").slice(1).join(" \xB7 "),
        ".",
      ),
  );
}
function FidCarte({ d: t, moi: moi, onFid: onFid, compact: compact }) {
  let i = t.fidelite,
    o = Re(n2(t.themes));
  if (fc(i))
    return React.default.createElement(
      "div",
      { className: "fid" },
      React.default.createElement(
        "h3",
        null,
        i.titre || "Carte de fid\xE9lit\xE9",
        moi &&
          Va(moi).niv &&
          React.default.createElement("span", { className: "niv-b" }, Va(moi).niv.ico, " ", Va(moi).niv.nom),
      ),
      React.default.createElement(RegleTampons, { f: i }),
      React.default.createElement(GrilleTampons, { f: i, moi: moi, amb: o }),
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
                " \u2014 \xE0 pr\xE9senter en caisse",
              ),
            )
          : React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "div",
                { style: { fontSize: 12, opacity: 0.8, marginBottom: 10 } },
                "Cr\xE9ez votre carte pour collectionner vos tampons",
              ),
              React.default.createElement(
                "button",
                {
                  className: "btn",
                  style: { background: "var(--apple-l)", width: "auto", padding: "11px 22px" },
                  onClick: onFid,
                },
                "Cr\xE9er ma carte",
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
    React.default.createElement("h3", null, i.titre || "Carte de fid\xE9lit\xE9"),
    React.default.createElement(
      "div",
      { className: "s" },
      i.sousTitre ||
        (d
          ? `1 point par ${i.parEuro || 1} \u20AC d\xE9pens\xE9 \xB7 ${d.points} points = ${pc(d.euros)} de remise`
          : `1 point par tranche de ${i.parEuro || 10} \u20AC d'achat`),
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
                "\u{1F389} ",
                d.nb > 1 ? d.nb + " bons disponibles" : "Bon disponible",
                " : pr\xE9sentez votre carte en caisse !",
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
                f < l ? "\u25CF" : m ? "\u2605" : "",
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
            u ? ` \u2014 encore ${u.at - l} pour \xAB ${u.label} \xBB` : "",
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
              " \u2014 \xE0 pr\xE9senter en caisse",
            ),
          )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "div",
              { style: { fontSize: 12, opacity: 0.8, marginBottom: 10 } },
              "Cr\xE9ez votre carte pour cumuler vos points",
            ),
            React.default.createElement(
              "button",
              {
                className: "btn",
                style: { background: "var(--apple-l)", width: "auto", padding: "11px 22px" },
                onClick: onFid,
              },
              "Cr\xE9er ma carte",
            ),
          ),
    ),
  );
}
function Bientot({ compact: compact }) {
  return React.default.createElement(
    "div",
    { className: "bientot" + (compact ? " compact" : "") },
    React.default.createElement("div", { className: "bt-badge" }, "Bient\xF4t"),
    React.default.createElement("div", { className: "bt-titre" }, "La carte de fid\xE9lit\xE9 arrive !"),
    React.default.createElement(
      "div",
      { className: "bt-txt" },
      "Tr\xE8s bient\xF4t dans l'application : un tampon \xE0 chaque passage \xE0 l'\xE9picerie, et une r\xE9compense quand la carte est pleine. Restez connect\xE9s \u{1F34F}",
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
function Fidelite({ d: d, moi: moi, setMoi: setMoi, onFid: onFid, inst: inst, ouvrirLegal: ouvrirLegal }) {
  return d.fidelite?.active
    ? React.default.createElement(
        "div",
        { className: "wrap" },
        React.default.createElement(Deco, null),
        React.default.createElement(FidCarte, { d: d, moi: moi, onFid: onFid }),
        moi && d.fidelite?.parrainage !== !1 && React.default.createElement(Parrainage, { moi: moi }),
        moi &&
          React.default.createElement(Installer, {
            inst: inst,
            compact: !0,
            texte: "Gardez votre carte sur l'\xE9cran d'accueil.",
          }),
        moi &&
          React.default.createElement(MesDonnees, {
            moi: moi,
            d: d,
            setMoi: setMoi,
            ouvrirLegal: ouvrirLegal,
          }),
      )
    : React.default.createElement(
        "div",
        { className: "wrap" },
        React.default.createElement(Deco, null),
        React.default.createElement(Bientot, null),
      );
}
function PageLegale({ type: type, d: d, onClose: onClose }) {
  let r = Object.fromEntries(
      Object.entries({ ...EMPTY2.legal, ...(d.legal || {}) }).map(([l, u]) => [
        l,
        u === "" || u == null ? EMPTY2.legal[l] : u,
      ]),
    ),
    i = d.store,
    o = r.emailDonnees || i.email,
    s = ({ children: children }) => React.default.createElement("h4", null, children);
  return React.default.createElement(
    "div",
    { className: "legal" },
    React.default.createElement(
      "div",
      { className: "legal-top" },
      React.default.createElement("button", { onClick: onClose, "aria-label": "Retour" }, "\u2190 Retour"),
    ),
    React.default.createElement(
      "div",
      { className: "legal-in" },
      type === "mentions"
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("h2", null, "Mentions l\xE9gales"),
            React.default.createElement(s, null, "\xC9diteur de l'application"),
            React.default.createElement(
              "p",
              null,
              React.default.createElement("b", null, i.name),
              React.default.createElement("br", null),
              r.raison,
              r.forme ? ", " + r.forme : "",
              r.capital ? " au capital de " + r.capital + " \u20AC" : "",
              React.default.createElement("br", null),
              "Si\xE8ge : ",
              i.address,
              React.default.createElement("br", null),
              r.siren &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "SIREN : ",
                  r.siren,
                  React.default.createElement("br", null),
                ),
              r.rcs &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  r.rcs,
                  React.default.createElement("br", null),
                ),
              r.tva &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "N\xB0 TVA intracommunautaire : ",
                  r.tva,
                  React.default.createElement("br", null),
                ),
              r.naf &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "Activit\xE9 : ",
                  r.naf,
                  React.default.createElement("br", null),
                ),
              i.phone &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  "T\xE9l\xE9phone : ",
                  i.phone,
                  React.default.createElement("br", null),
                ),
              i.email && React.default.createElement(React.default.Fragment, null, "E-mail : ", i.email),
            ),
            React.default.createElement(s, null, "Directrice de la publication"),
            React.default.createElement("p", null, r.responsable, ", g\xE9rante"),
            React.default.createElement(s, null, "H\xE9bergement"),
            React.default.createElement(
              "p",
              null,
              "Application : GitHub Pages \u2014 GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, \xC9tats-Unis.",
              React.default.createElement("br", null),
              "Donn\xE9es : Firebase \u2014 Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande.",
            ),
            React.default.createElement(s, null, "Propri\xE9t\xE9"),
            React.default.createElement(
              "p",
              null,
              "Le nom, le logo et les contenus de l'application appartiennent \xE0 ",
              i.name,
              ". Toute reproduction sans autorisation est interdite.",
            ),
          )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("h2", null, "Vos donn\xE9es personnelles"),
            React.default.createElement(
              "p",
              { className: "chapo" },
              "L'application est con\xE7ue pour collecter le moins de donn\xE9es possible. Voici exactement ce que nous faisons.",
            ),
            React.default.createElement(s, null, "Qui est responsable ?"),
            React.default.createElement(
              "p",
              null,
              r.raison,
              r.forme ? " (" + r.forme + ")" : "",
              " \u2014 ",
              i.name,
              ", ",
              i.address,
              r.siren ? ", SIREN " + r.siren : "",
              ", repr\xE9sent\xE9e par ",
              r.responsable,
              ".",
            ),
            React.default.createElement(s, null, "Quelles donn\xE9es ?"),
            React.default.createElement(
              "p",
              null,
              "Uniquement si vous cr\xE9ez une carte de fid\xE9lit\xE9 : vos ",
              React.default.createElement("b", null, "nom et pr\xE9nom"),
              ", votre ",
              React.default.createElement("b", null, "t\xE9l\xE9phone"),
              ", votre ",
              React.default.createElement("b", null, "adresse e-mail"),
              ", votre code de carte, vos tampons, la date d'inscription, le code de votre parrain si vous en indiquez un (pour vous offrir \xE0 tous les deux le tampon de parrainage), et, si vous l'indiquez, le jour et le mois de votre anniversaire (sans l'ann\xE9e), pour vous offrir un tampon ce jour-l\xE0. Les r\xE9ponses aux sondages de l'appli sont anonymes et l'historique de vos passages en caisse (date, tampons ou points gagn\xE9s), dont le nombre de cadeaux re\xE7us qui donne votre niveau (Membre supporter, Pilier de l'\xE9picerie).",
            ),
            React.default.createElement(
              "p",
              null,
              "Si vous passez une commande de plateaux : votre ",
              React.default.createElement("b", null, "nom"),
              ", votre ",
              React.default.createElement("b", null, "t\xE9l\xE9phone"),
              ", l'",
              React.default.createElement("b", null, "adresse de livraison"),
              " le cas \xE9ch\xE9ant, la date choisie, le d\xE9tail de la commande, votre remarque \xE9ventuelle et, si vous les indiquez, vos allergies ou votre r\xE9gime alimentaire. Ces derni\xE8res informations servent uniquement \xE0 pr\xE9parer votre commande et sont supprim\xE9es avec elle.",
            ),
            React.default.createElement(
              "p",
              null,
              "Si vous \xE9crivez \xE0 l'\xE9picerie depuis l'application : votre ",
              React.default.createElement("b", null, "pr\xE9nom"),
              ", votre ",
              React.default.createElement("b", null, "t\xE9l\xE9phone"),
              " si vous le donnez, et vos ",
              React.default.createElement("b", null, "messages"),
              ". Ils servent uniquement \xE0 vous r\xE9pondre et sont supprim\xE9s au plus tard 1 an apr\xE8s le dernier \xE9change.",
            ),
            React.default.createElement(
              "p",
              null,
              "Si vous activez les notifications : un identifiant technique de votre t\xE9l\xE9phone (fourni par Google Firebase Cloud Messaging), utilis\xE9 uniquement pour vous pr\xE9venir de vos commandes, r\xE9servations et messages et, seulement si vous le cochez, des bons plans de l'\xE9picerie. Vous pouvez les d\xE9sactiver \xE0 tout moment (onglet Infos).",
            ),
            React.default.createElement(
              "p",
              null,
              "Aucune donn\xE9e bancaire, aucune g\xE9olocalisation, aucune publicit\xE9. Consulter l'application sans carte ne collecte aucune donn\xE9e personnelle.",
            ),
            React.default.createElement(s, null, "Pourquoi ?"),
            React.default.createElement(
              "p",
              null,
              "Uniquement pour g\xE9rer votre carte de fid\xE9lit\xE9 et vos r\xE9compenses. Base l\xE9gale : l'ex\xE9cution du programme de fid\xE9lit\xE9 auquel vous adh\xE9rez en cr\xE9ant votre carte (article 6.1.b du RGPD). Votre t\xE9l\xE9phone et votre e-mail servent seulement \xE0 vous retrouver ou \xE0 vous contacter au sujet de votre carte : jamais de prospection, jamais de revente.",
            ),
            React.default.createElement(
              "p",
              null,
              "Les coordonn\xE9es donn\xE9es lors d'une commande servent uniquement \xE0 la pr\xE9parer, vous la remettre et vous joindre \xE0 son sujet (ex\xE9cution de la commande, article 6.1.b du RGPD).",
            ),
            React.default.createElement(s, null, "Qui y a acc\xE8s ?"),
            React.default.createElement(
              "p",
              null,
              "Uniquement l'\xE9picerie. Les donn\xE9es sont h\xE9berg\xE9es par notre prestataire technique Firebase (Google)",
              r.hebergementDonnees ? " (" + r.hebergementDonnees + ")" : "",
              ", qui agit pour notre compte et n'a pas le droit de les utiliser. Google adh\xE8re au cadre de protection des donn\xE9es UE\u2013\xC9tats-Unis (Data Privacy Framework).",
              Nn(d.cmd).script &&
                " L'avis de nouvelle commande est envoy\xE9 \xE0 l'\xE9picerie sur sa messagerie Gmail (Google).",
            ),
            React.default.createElement(s, null, "Combien de temps ?"),
            React.default.createElement(
              "p",
              null,
              "Tant que votre carte est utilis\xE9e. Une carte sans aucun passage en caisse depuis ",
              React.default.createElement("b", null, r.conservation || 3, " ans"),
              " est supprim\xE9e avec son historique. Vous pouvez aussi demander sa suppression \xE0 tout moment. Les commandes sont conserv\xE9es ",
              React.default.createElement("b", null, "1 an"),
              " apr\xE8s la date de retrait ou de livraison, puis supprim\xE9es.",
            ),
            React.default.createElement(s, null, "Sur votre t\xE9l\xE9phone"),
            React.default.createElement(
              "p",
              null,
              "L'application n'enregistre que ce qui est indispensable \xE0 son fonctionnement : l'identifiant de votre carte, de vos commandes et de vos messages, vos pr\xE9f\xE9rences d'affichage et, si vous le donnez, votre pr\xE9nom (qui ne quitte pas votre t\xE9l\xE9phone). Aucun cookie publicitaire ni traceur : c'est pourquoi aucun bandeau de consentement ne vous est demand\xE9.",
            ),
            React.default.createElement(s, null, "Mesure d'audience anonyme"),
            React.default.createElement(
              "p",
              null,
              "Pour savoir ce qui vous int\xE9resse, l'\xE9picerie compte de fa\xE7on ",
              React.default.createElement("b", null, "anonyme"),
              " les ouvertures de l'application et les rubriques consult\xE9es (par exemple : \xAB La carte vue 40 fois aujourd'hui \xBB). Ces compteurs ne contiennent ni nom, ni t\xE9l\xE9phone, ni identifiant : ils ne permettent pas de savoir qui a consult\xE9 quoi, et ne sont partag\xE9s avec personne. Seule la date du jour est gard\xE9e sur votre t\xE9l\xE9phone, pour ne compter qu'un visiteur par jour. Ils sont supprim\xE9s apr\xE8s 13 mois.",
            ),
            React.default.createElement(s, null, "Vos droits"),
            React.default.createElement(
              "p",
              null,
              "Vous pouvez consulter, corriger, t\xE9l\xE9charger ou supprimer vos donn\xE9es, et vous opposer \xE0 leur traitement.",
            ),
            React.default.createElement(
              "ul",
              null,
              React.default.createElement(
                "li",
                null,
                React.default.createElement(
                  "b",
                  null,
                  "Consultation et t\xE9l\xE9chargement dans l'application",
                ),
                " : onglet Fid\xE9lit\xE9 \u2192 \xAB Mes donn\xE9es \xBB.",
              ),
              React.default.createElement(
                "li",
                null,
                React.default.createElement("b", null, "Ou en nous contactant"),
                " : ",
                o,
                i.phone ? ", " + i.phone : "",
                ", ou en boutique.",
              ),
            ),
            React.default.createElement(
              "p",
              null,
              "En cas de d\xE9saccord, vous pouvez saisir la CNIL (cnil.fr).",
            ),
            React.default.createElement(s, null, "S\xE9curit\xE9"),
            React.default.createElement(
              "p",
              null,
              "L'administration est prot\xE9g\xE9e par mot de passe. Votre fiche n'est consultable qu'avec l'identifiant secret enregistr\xE9 sur votre t\xE9l\xE9phone : personne ne peut parcourir la liste des clients depuis l'application.",
            ),
          ),
      React.default.createElement(
        "p",
        { className: "maj-legal" },
        "Derni\xE8re mise \xE0 jour : octobre 2026",
      ),
    ),
  );
}
var s9 = (t) => {
  let e = String(t || "").trim();
  return e
    ? "le " + (/^[A-ZÀ-Ý][a-zà-ÿ]/.test(e) ? e[0].toLowerCase() + e.slice(1) : e).replace(/^le /i, "")
    : "le tirage au sort de No\xEBl";
};
function ParticipationRoue({ moi: moi, d: d }) {
  let [n, r] = (0, React.useState)(""),
    i = d.roue ? l2(d.roue) : null;
  if (!i || !i.active || (i.fin && cO() > i.fin)) return null;
  let o = async (s) => {
    r("\u2026");
    try {
      await setDoc(doc2(db2, "clients", moi.ref), s ? { roueNon: !0, roueAJouer: [] } : { roueNon: !1 }, {
        merge: !0,
      }),
        r(
          s
            ? "C'est not\xE9, la roue ne s'affichera plus."
            : "\u{1F384} C'est not\xE9, vous participez \xE0 la roue de No\xEBl !",
        );
    } catch {
      r("Pas de connexion : r\xE9essayez dans un instant.");
    }
  };
  return React.default.createElement(
    "div",
    { className: "roue-choix" },
    React.default.createElement(
      "div",
      null,
      React.default.createElement("b", null, "\u{1F384} Roue de No\xEBl"),
      React.default.createElement(
        "span",
        null,
        moi.roueNon ? "Vous ne participez pas." : "Vous participez : un tour de roue \xE0 chaque tampon.",
      ),
    ),
    React.default.createElement(
      "button",
      { className: "btn gh sm", style: { width: "auto" }, onClick: () => o(!moi.roueNon) },
      moi.roueNon ? "Participer" : "Ne plus participer",
    ),
    n && n !== "\u2026" && React.default.createElement("div", { className: "roue-choix-ok" }, n),
  );
}
function MesDonnees({ moi: moi, d: e, setMoi: setMoi, ouvrirLegal: ouvrirLegal }) {
  let [i, o] = (0, React.useState)(""),
    [s, l] = (0, React.useState)(null),
    u = e.store.phone,
    d = async () => {
      o("Chargement\u2026");
      try {
        let A = await getDoc(doc2(db2, "clients", moi.ref)),
          S = [];
        try {
          S = (await getDocs(collection(db2, "clients", moi.ref, "historique"))).docs
            .map((z) => z.data())
            .sort((z, j) => (j.date || 0) - (z.date || 0));
        } catch {}
        let P = A.exists() ? A.data() : {};
        l({
          fiche: {
            nom: P.nom,
            prenom: P.prenom ?? String(P.nom || "").split(" ")[0],
            nomFamille:
              P.nomFamille ??
              String(P.nom || "")
                .split(" ")
                .slice(1)
                .join(" "),
            telephone: P.tel || "",
            email: P.email || "",
            anniv: P.anniv || "",
            code: P.code,
            points: P.points || 0,
            tampons: P.tampons || 0,
            inscription: P.depuis,
            accord: P.accord || "",
          },
          historique: S,
        }),
          o("");
      } catch {
        o("Impossible de charger vos donn\xE9es. V\xE9rifiez votre connexion.");
      }
    },
    h = () => {
      let A = {
          application: e.store.name,
          exporte_le: new Date().toISOString(),
          carte: s.fiche,
          passages: s.historique.map((P) => ({
            date: P.date ? new Date(P.date).toISOString() : "",
            type: P.type,
            montant: P.montant ?? null,
            points: P.points,
          })),
        },
        S = document.createElement("a");
      (S.href = URL.createObjectURL(new Blob([JSON.stringify(A, null, 2)], { type: "application/json" }))),
        (S.download = "mes-donnees-epicerie-raddonnaise.json"),
        S.click();
    },
    [f, m] = (0, React.useState)(!1),
    [E, F] = (0, React.useState)(null),
    D = async () => {
      let A = nomPropre(E.prenom).slice(0, 40),
        S = nomPropre(E.nomFamille).slice(0, 40);
      o("Enregistrement\u2026");
      try {
        let P = writeBatch(db2);
        P.update(doc2(db2, "clients", moi.ref), {
          prenom: A,
          nomFamille: S,
          nom: (A + " " + S).slice(0, 60),
          tel: telFormate(E.tel),
          email: E.email.trim().toLowerCase().slice(0, 100),
          anniv: E.aj && E.am ? String(E.am).padStart(2, "0") + "-" + String(E.aj).padStart(2, "0") : "",
        }),
          await P.commit(),
          F(null),
          await d(),
          o("\u2713 Vos informations sont enregistr\xE9es.");
      } catch {
        o("Enregistrement impossible. V\xE9rifiez votre connexion et r\xE9essayez.");
      }
    },
    M = e.legal?.emailDonnees || e.store.email,
    C = encodeURIComponent(
      `Bonjour,

Je souhaite la suppression de ma carte de fid\xE9lit\xE9 ` +
        (moi.code || "") +
        " (" +
        (moi.nom || "") +
        `) et de toutes mes donn\xE9es.

Merci.`,
    );
  return React.default.createElement(
    "div",
    { className: "card", style: { marginTop: 14 } },
    React.default.createElement(
      "div",
      { className: "b" },
      React.default.createElement(
        "div",
        { style: { fontWeight: 800, fontSize: 14, color: "var(--forest)", marginBottom: 4 } },
        "Mes donn\xE9es",
      ),
      React.default.createElement(
        "p",
        { style: { marginBottom: 12 } },
        "Vous gardez la main sur vos informations personnelles.",
      ),
      React.default.createElement(ParticipationRoue, { moi: moi, d: e }),
      s
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "div",
              { className: "donnees" },
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "Nom"),
                React.default.createElement("b", null, s.fiche.nom),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "T\xE9l\xE9phone"),
                React.default.createElement("b", null, s.fiche.telephone || "\u2014"),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "E-mail"),
                React.default.createElement(
                  "b",
                  { style: { wordBreak: "break-all" } },
                  s.fiche.email || "\u2014",
                ),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "Anniversaire"),
                React.default.createElement("b", null, u9(s.fiche.anniv) || "\u2014"),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "Code carte"),
                React.default.createElement("b", null, s.fiche.code),
              ),
              fc(e.fidelite)
                ? React.default.createElement(
                    "div",
                    null,
                    React.default.createElement("span", null, "Tampons"),
                    React.default.createElement("b", null, s.fiche.tampons),
                  )
                : React.default.createElement(
                    "div",
                    null,
                    React.default.createElement("span", null, "Points"),
                    React.default.createElement("b", null, s.fiche.points),
                  ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "Inscription"),
                React.default.createElement("b", null, s.fiche.inscription),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("span", null, "Passages en caisse"),
                React.default.createElement("b", null, s.historique.length),
              ),
            ),
            React.default.createElement(
              "button",
              { className: "btn gh", style: { marginTop: 10 }, onClick: h },
              "T\xE9l\xE9charger mes donn\xE9es",
            ),
            E
              ? React.default.createElement(
                  "div",
                  { className: "modif" },
                  React.default.createElement(
                    "div",
                    { style: { display: "flex", gap: 10 } },
                    React.default.createElement(
                      "div",
                      { style: { flex: 1, minWidth: 0 } },
                      React.default.createElement("label", { className: "lab" }, "Pr\xE9nom"),
                      React.default.createElement("input", {
                        className: "inp",
                        value: E.prenom,
                        onChange: (A) => F({ ...E, prenom: A.target.value }),
                      }),
                    ),
                    React.default.createElement(
                      "div",
                      { style: { flex: 1, minWidth: 0 } },
                      React.default.createElement("label", { className: "lab" }, "Nom"),
                      React.default.createElement("input", {
                        className: "inp",
                        value: E.nomFamille,
                        onChange: (A) => F({ ...E, nomFamille: A.target.value }),
                      }),
                    ),
                  ),
                  React.default.createElement("label", { className: "lab" }, "T\xE9l\xE9phone"),
                  React.default.createElement("input", {
                    className: "inp",
                    type: "tel",
                    value: E.tel,
                    onChange: (A) => F({ ...E, tel: A.target.value }),
                  }),
                  E.tel &&
                    !telValide(E.tel) &&
                    React.default.createElement(
                      "div",
                      { className: "champ-err" },
                      "Num\xE9ro incomplet (10 chiffres).",
                    ),
                  React.default.createElement("label", { className: "lab" }, "Adresse e-mail"),
                  React.default.createElement("input", {
                    className: "inp",
                    type: "email",
                    autoCapitalize: "off",
                    value: E.email,
                    onChange: (A) => F({ ...E, email: A.target.value }),
                  }),
                  E.email &&
                    !emailValide(E.email) &&
                    React.default.createElement(
                      "div",
                      { className: "champ-err" },
                      "Adresse e-mail incompl\xE8te.",
                    ),
                  React.default.createElement("label", { className: "lab" }, "Anniversaire (facultatif)"),
                  React.default.createElement(ChoixAnniversaire, {
                    j: E.aj,
                    m: E.am,
                    setJ: (A) => F((S) => ({ ...S, aj: A })),
                    setM: (A) => F((S) => ({ ...S, am: A })),
                  }),
                  React.default.createElement(
                    "div",
                    { style: { display: "flex", gap: 8, marginTop: 10 } },
                    React.default.createElement(
                      "button",
                      { className: "btn gh", style: { flex: 1 }, onClick: () => F(null) },
                      "Annuler",
                    ),
                    React.default.createElement(
                      "button",
                      {
                        className: "btn",
                        style: { flex: 2 },
                        disabled:
                          !E.prenom.trim() ||
                          !E.nomFamille.trim() ||
                          !telValide(E.tel) ||
                          !emailValide(E.email),
                        onClick: D,
                      },
                      "Enregistrer",
                    ),
                  ),
                )
              : React.default.createElement(
                  "button",
                  {
                    className: "btn gh",
                    style: { marginTop: 8 },
                    onClick: () =>
                      F({
                        prenom: s.fiche.prenom || "",
                        nomFamille: s.fiche.nomFamille || "",
                        tel: s.fiche.telephone || "",
                        email: s.fiche.email || "",
                        aj: s.fiche.anniv ? String(+s.fiche.anniv.slice(3)) : "",
                        am: s.fiche.anniv ? String(+s.fiche.anniv.slice(0, 2)) : "",
                      }),
                  },
                  "\u270F\uFE0F Modifier mes infos",
                ),
          )
        : React.default.createElement(
            "button",
            { className: "btn gh", onClick: d },
            "Consulter mes donn\xE9es",
          ),
      f
        ? React.default.createElement(
            "div",
            { className: "rgpd-info", style: { marginTop: 10 } },
            "Pour prot\xE9ger votre carte, la suppression est faite par l'\xE9picerie. Demandez-la en un geste, elle sera faite rapidement :",
            React.default.createElement(
              "div",
              { style: { display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" } },
              u &&
                React.default.createElement(
                  "a",
                  {
                    className: "btn gh",
                    style: { flex: 1, textDecoration: "none", textAlign: "center" },
                    href: "tel:" + u.replace(/\s/g, ""),
                  },
                  "Appeler",
                ),
              M &&
                React.default.createElement(
                  "a",
                  {
                    className: "btn gh",
                    style: { flex: 1, textDecoration: "none", textAlign: "center" },
                    href:
                      "mailto:" +
                      M +
                      "?subject=" +
                      encodeURIComponent("Suppression de ma carte de fid\xE9lit\xE9") +
                      "&body=" +
                      C,
                  },
                  "Envoyer un e-mail",
                ),
            ),
            React.default.createElement(
              "div",
              { style: { marginTop: 8 } },
              "Ou simplement en boutique, en donnant votre code ",
              React.default.createElement("b", null, moi.code),
              ".",
            ),
          )
        : React.default.createElement(
            "button",
            {
              className: "btn gh",
              style: { marginTop: 8, color: "#C86B5C", borderColor: "#EBC9C2" },
              onClick: () => m(!0),
            },
            "Supprimer ma carte et mes donn\xE9es",
          ),
      i &&
        React.default.createElement("p", { style: { fontSize: 12, marginTop: 8, color: "var(--ink2)" } }, i),
      React.default.createElement(
        "button",
        { className: "lienleg", onClick: () => ouvrirLegal("confidentialite") },
        "Politique de confidentialit\xE9",
      ),
    ),
  );
}
var nomPropre = (t) => {
    let x = String(t || "")
      .normalize("NFC")
      .trim()
      .replace(/\s+/g, " ");
    if (!x) return x;
    let parts = x.toLocaleLowerCase("fr-FR").split(/([ \-'\u2019])/),
      pt = ["de", "du", "des", "la", "le", "d", "van", "von"];
    return parts
      .map((w, i) =>
        /^[ \-'\u2019]$/.test(w) || !w
          ? w
          : i > 0 && pt.includes(w) && parts[i + 1] !== "-"
            ? w
            : w.charAt(0).toLocaleUpperCase("fr-FR") + w.slice(1),
      )
      .join("");
  },
  telFormate = (t) => {
    let x = String(t || "").trim(),
      d = x.replace(/\D/g, "");
    if (d.length === 11 && d.startsWith("33")) d = "0" + d.slice(2);
    return d.length === 10 && d[0] === "0" ? d.replace(/(\d{2})(?=\d)/g, "$1 ") : x.slice(0, 20);
  };
var telValide = (t) =>
    /^(\+33\s?|0)[1-9](\s?\.?-?\d{2}){4}$/.test(String(t || "").trim()) ||
    String(t || "").replace(/\D/g, "").length === 10,
  emailValide = (t) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(t || "").trim()),
  AT = [
    "janvier",
    "f\xE9vrier",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "ao\xFBt",
    "septembre",
    "octobre",
    "novembre",
    "d\xE9cembre",
  ],
  u9 = (t) => (/^\d\d-\d\d$/.test(t || "") ? +t.slice(3) + " " + AT[+t.slice(0, 2) - 1] : ""),
  c9 = (t, e = new Date()) => {
    let n = e.getMonth() + 1,
      r = e.getDate(),
      i = String(n).padStart(2, "0") + "-" + String(r).padStart(2, "0"),
      o = new Date(e.getFullYear(), 1, 29).getMonth() === 1;
    return !!t && (t === i || (t === "02-29" && i === "02-28" && !o));
  };
function ChoixAnniversaire({ j: j, m: m, setJ: setJ, setM: setM }) {
  let i = m ? new Date(2024, +m, 0).getDate() : 31;
  return React.default.createElement(
    "div",
    { style: { display: "flex", gap: 10 } },
    React.default.createElement(
      "select",
      {
        className: "inp",
        style: { flex: 1, minWidth: 0 },
        value: j,
        onChange: (o) => setJ(o.target.value),
        "aria-label": "Jour",
      },
      React.default.createElement("option", { value: "" }, "Jour"),
      Array.from({ length: i }, (o, s) =>
        React.default.createElement("option", { key: s, value: String(s + 1) }, s + 1),
      ),
    ),
    React.default.createElement(
      "select",
      {
        className: "inp",
        style: { flex: 2, minWidth: 0 },
        value: m,
        onChange: (o) => {
          setM(o.target.value), j && +j > new Date(2024, +o.target.value, 0).getDate() && setJ("");
        },
        "aria-label": "Mois",
      },
      React.default.createElement("option", { value: "" }, "Mois"),
      AT.map((o, s) => React.default.createElement("option", { key: s, value: String(s + 1) }, o)),
    ),
  );
}
function RecetteSemaine({ liste: liste }) {
  let [e, n] = (0, React.useState)(null);
  if (!liste.length) return null;
  let r = liste[0],
    i = (o) =>
      String(o || "")
        .split(
          `
`,
        )
        .map((s) => s.trim())
        .filter(Boolean);
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "h3",
      { className: "h2" },
      React.default.createElement("i", null),
      "La recette de la semaine",
    ),
    React.default.createElement(
      "div",
      { className: "card recette", onClick: () => n(r), role: "button" },
      r.photo && React.default.createElement("img", { src: r.photo, alt: "", className: "recette-img" }),
      React.default.createElement(
        "div",
        { className: "b" },
        React.default.createElement("div", { className: "recette-t" }, "\u{1F4D6} ", r.titre),
        React.default.createElement(
          "div",
          { className: "recette-s" },
          [r.duree, r.personnes ? r.personnes + " pers." : ""].filter(Boolean).join(" \xB7 ") ||
            "Voir la recette",
          " \u203A",
        ),
      ),
    ),
    liste.length > 1 &&
      React.default.createElement(
        "div",
        { className: "recette-autres" },
        liste
          .slice(1, 6)
          .map((o) =>
            React.default.createElement("button", { key: o.id, onClick: () => n(o) }, "\u{1F4D6} ", o.titre),
          ),
      ),
    e &&
      React.default.createElement(
        "div",
        { className: "legal", style: { zIndex: 9e3 } },
        React.default.createElement(
          "div",
          { className: "legal-top" },
          React.default.createElement(
            "button",
            { onClick: () => n(null), "aria-label": "Retour" },
            "\u2190 Retour",
          ),
        ),
        React.default.createElement(
          "div",
          { className: "legal-in" },
          e.photo &&
            React.default.createElement("img", {
              src: e.photo,
              alt: "",
              style: { width: "100%", borderRadius: 18, marginBottom: 12 },
            }),
          React.default.createElement("h2", null, e.titre),
          (e.duree || e.personnes) &&
            React.default.createElement(
              "p",
              { className: "chapo" },
              [e.duree, e.personnes ? "pour " + e.personnes + " personnes" : ""]
                .filter(Boolean)
                .join(" \xB7 "),
            ),
          e.intro && React.default.createElement("p", null, e.intro),
          i(e.ingredients).length > 0 &&
            React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("h4", null, "Ingr\xE9dients"),
              React.default.createElement(
                "ul",
                null,
                i(e.ingredients).map((o, s) => React.default.createElement("li", { key: s }, o)),
              ),
            ),
          i(e.etapes).length > 0 &&
            React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement("h4", null, "Pr\xE9paration"),
              React.default.createElement(
                "ol",
                null,
                i(e.etapes).map((o, s) => React.default.createElement("li", { key: s }, o)),
              ),
            ),
          React.default.createElement(
            "div",
            { className: "recette-rayon" },
            "\u{1F6D2} Les ingr\xE9dients sont en rayon \xE0 l'\xE9picerie !",
          ),
        ),
      ),
  );
}
var K2 = "epicerie-raddonnaise-sondages",
  h9 = [...crypto.getRandomValues(new Uint32Array(16))]
    .map((t) => "abcdefghijkmnpqrstuvwxyz23456789"[t % 32])
    .join(""),
  p9 = () => {
    try {
      let t = localStorage.getItem("epicerie-raddonnaise-idtel");
      if (!t) {
        let e = new Uint32Array(16);
        crypto.getRandomValues(e),
          (t = [...e].map((n) => "abcdefghijkmnpqrstuvwxyz23456789"[n % 32]).join("")),
          localStorage.setItem("epicerie-raddonnaise-idtel", t);
      }
      return t;
    } catch {
      return h9;
    }
  };
function Sondage({ d: t, moi: moi }) {
  let n = t.sondage,
    [r, i] = (0, React.useState)(() => {
      try {
        return JSON.parse(localStorage.getItem(K2) || "[]");
      } catch {
        return [];
      }
    }),
    [o, s] = (0, React.useState)(""),
    [l, u] = (0, React.useState)(!1),
    [d, h] = (0, React.useState)("");
  if (!n?.active || !n.id || !n.question) return null;
  let f = r.includes(n.id),
    m = async (E, F) => {
      u(!0), h("");
      try {
        await setDoc(doc2(db2, "reponses", n.id + "_" + p9()), {
          s: n.id,
          o: E,
          r: String(F || "")
            .trim()
            .slice(0, 500),
          cree: Date.now(),
        });
        let D = [...r, n.id].slice(-30);
        i(D);
        try {
          localStorage.setItem(K2, JSON.stringify(D));
        } catch {}
      } catch (D) {
        if (D?.code === "permission-denied") {
          let M = [...r, n.id];
          i(M);
          try {
            localStorage.setItem(K2, JSON.stringify(M));
          } catch {}
        } else h("Pas de connexion : r\xE9essayez dans un instant.");
      }
      u(!1);
    };
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "h3",
      { className: "h2" },
      React.default.createElement("i", null),
      n.mode === "libre" ? "La bo\xEEte \xE0 id\xE9es" : "Votre avis compte",
    ),
    React.default.createElement(
      "div",
      { className: "card sondage" },
      React.default.createElement(
        "div",
        { className: "b" },
        React.default.createElement("div", { className: "sondage-q" }, "\u{1F4A1} ", n.question),
        f
          ? React.default.createElement(
              "div",
              { className: "sondage-merci" },
              "Merci pour votre r\xE9ponse ! \u{1F34F}",
            )
          : n.mode === "libre"
            ? React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("textarea", {
                  className: "inp",
                  value: o,
                  maxLength: 500,
                  onChange: (E) => s(E.target.value),
                  placeholder: "Votre id\xE9e\u2026",
                  style: { minHeight: 80 },
                }),
                React.default.createElement(
                  "button",
                  { className: "btn", disabled: !o.trim() || l, onClick: () => m(-1, o) },
                  "Envoyer mon id\xE9e",
                ),
              )
            : React.default.createElement(
                "div",
                { className: "sondage-o" },
                (n.options || [])
                  .filter(Boolean)
                  .map((E, F) =>
                    React.default.createElement("button", { key: F, disabled: l, onClick: () => m(F, E) }, E),
                  ),
              ),
        d && React.default.createElement("div", { className: "champ-err" }, d),
        !f &&
          React.default.createElement(
            "div",
            { style: { fontSize: 11, color: "var(--ink3)", marginTop: 8 } },
            "R\xE9ponse anonyme.",
          ),
      ),
    ),
  );
}
var tx = "epicerie-raddonnaise-parrain",
  m9 = (t) => {
    let e = String(t || "")
      .toUpperCase()
      .replace(/\s/g, "")
      .match(/^(?:RAD-?)?([A-Z0-9]{5})$/);
    return e ? "RAD-" + e[1] : "";
  };
try {
  let t = location.hash.match(/parrain=(RAD-[A-Z0-9]{5})/i);
  t &&
    (localStorage.setItem(tx, t[1].toUpperCase()),
    history.replaceState(null, "", location.pathname + location.search));
} catch {}
function Parrainage({ moi: moi }) {
  let [e, n] = (0, React.useState)(""),
    r = location.origin + location.pathname + "#parrain=" + moi.code,
    i =
      "Je te conseille l'appli de l'\xC9picerie Raddonnaise (promos, plateaux, carte \xE0 tampons\u2026). Cr\xE9e ta carte avec mon code " +
      moi.code +
      " : \xE0 ton premier passage, on gagne chacun un tampon \u{1F34F}",
    o = async () => {
      n("");
      try {
        if (navigator.share) {
          await navigator.share({ title: "\xC9picerie Raddonnaise", text: i, url: r });
          return;
        }
      } catch (s) {
        if (s?.name === "AbortError") return;
      }
      try {
        await navigator.clipboard.writeText(i + " " + r),
          n("\u2713 Message copi\xE9 : collez-le dans un SMS ou sur WhatsApp.");
      } catch {
        n("Donnez simplement votre code \xE0 votre voisin : " + moi.code);
      }
    };
  return React.default.createElement(
    "div",
    { className: "card parr", style: { marginTop: 14 } },
    React.default.createElement(
      "div",
      { className: "b" },
      React.default.createElement(
        "div",
        { style: { fontWeight: 800, fontSize: 15, color: "var(--forest)" } },
        "\u{1F91D} Parrainez un voisin",
      ),
      React.default.createElement(
        "p",
        { style: { margin: "6px 0 10px", fontSize: 13, lineHeight: 1.45 } },
        "Il cr\xE9e sa carte avec votre code ",
        React.default.createElement("b", null, moi.code),
        ". \xC0 son premier passage en caisse, ",
        React.default.createElement("b", null, "vous gagnez chacun 1 tampon"),
        " !",
      ),
      React.default.createElement("button", { className: "btn", onClick: o }, "Partager mon code"),
      e &&
        React.default.createElement(
          "div",
          { style: { fontSize: 12.5, marginTop: 8, color: "var(--ink2)" } },
          e,
        ),
    ),
  );
}
function FormulaireCarte({ onDone: onDone, onCancel: onCancel, ouvrirLegal: ouvrirLegal }) {
  let [__q, __sq] = (0, React.useState)(!1),
    [__c, __sc] = (0, React.useState)(!1),
    [r, i] = (0, React.useState)(""),
    [o, s] = (0, React.useState)(""),
    [l, u] = (0, React.useState)(""),
    [d, h] = (0, React.useState)(""),
    [f, m] = (0, React.useState)(!1),
    [E, F] = (0, React.useState)(""),
    [D, M] = (0, React.useState)(!1),
    [C, A] = (0, React.useState)(() => {
      try {
        return localStorage.getItem(tx) || "";
      } catch {
        return "";
      }
    }),
    S = m9(C),
    [P, z] = (0, React.useState)(""),
    [j, b] = (0, React.useState)(""),
    y = P && j ? String(j).padStart(2, "0") + "-" + String(P).padStart(2, "0") : "",
    v = telValide(l),
    w = emailValide(d),
    k = r.trim() && o.trim() && v && w;
  let __p = plateforme(),
    __ni = !(window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === !0);
  if (__p.inApp || (__p.ios && __ni && !__q)) {
    let __e = (x, y) =>
      React.default.createElement(
        "div",
        {
          style: {
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
            margin: "10px 0",
            fontSize: 14,
            lineHeight: 1.45,
            color: "var(--ink)",
          },
        },
        React.default.createElement(
          "span",
          {
            style: {
              flex: "none",
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "var(--forest)",
              color: "#E9B949",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
            },
          },
          x,
        ),
        React.default.createElement("div", null, y),
      );
    return React.default.createElement(
      "div",
      { className: "wrap", style: { paddingTop: 28 } },
      React.default.createElement(
        "div",
        { style: { textAlign: "center", marginBottom: 18 } },
        React.default.createElement("img", {
          src: LOGO,
          alt: "",
          style: { width: 86, height: 86, borderRadius: "50%", border: "3px solid var(--apple-soft)" },
        }),
        React.default.createElement(
          "h2",
          { style: { fontFamily: "var(--script)", fontSize: 33, color: "var(--forest)", marginTop: 12 } },
          "Ma carte de fid\xE9lit\xE9",
        ),
        React.default.createElement(
          "p",
          { style: { fontSize: 13.5, color: "var(--ink2)", lineHeight: 1.5, marginTop: 6 } },
          __p.inApp
            ? "Vous \xEAtes dans " +
                __p.appli +
                ". Pour ne pas perdre votre carte, cr\xE9ez-la dans l'appli install\xE9e sur votre t\xE9l\xE9phone :"
            : "Installez d'abord l'appli sur votre \xE9cran d'accueil, puis cr\xE9ez votre carte dedans. Sinon, elle resterait dans Safari et vous ne la retrouveriez pas dans l'appli.",
        ),
      ),
      React.default.createElement(
        "div",
        {
          style: {
            background: "#fff",
            border: "1px solid var(--line, #E5E0D4)",
            borderRadius: 16,
            padding: "6px 16px",
            marginBottom: 16,
          },
        },
        __p.inApp
          ? __e(
              "1",
              "Touchez les 3 petits points \u22EF puis \xAB Ouvrir dans le navigateur \xBB (" +
                (__p.ios ? "Safari" : "Chrome") +
                ")",
            )
          : null,
        __e(
          __p.inApp ? "2" : "1",
          __p.ios
            ? "Touchez Partager \u2B06\uFE0F puis \xAB Sur l'\xE9cran d'accueil \xBB"
            : "Touchez \u22EE puis \xAB Installer l'application \xBB",
        ),
        __e(__p.inApp ? "3" : "2", "Ouvrez l'appli depuis votre \xE9cran d'accueil et cr\xE9ez votre carte"),
      ),
      __p.inApp
        ? React.default.createElement(
            "button",
            {
              className: "btn",
              onClick: () => {
                try {
                  navigator.clipboard.writeText(location.origin + location.pathname).then(
                    () => __sc(!0),
                    () => {},
                  );
                } catch {}
              },
            },
            __c ? "Lien copi\xE9 \u2713" : "Copier le lien de l'appli",
          )
        : React.default.createElement(
            "button",
            { className: "btn gh", onClick: () => __sq(!0) },
            "Cr\xE9er quand m\xEAme ici",
          ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { marginTop: 8 }, onClick: onCancel },
        "Plus tard",
      ),
    );
  }
  return React.default.createElement(
    "div",
    { className: "wrap", style: { paddingTop: 28 } },
    React.default.createElement(
      "div",
      { style: { textAlign: "center", marginBottom: 22 } },
      React.default.createElement("img", {
        src: LOGO,
        alt: "",
        style: { width: 86, height: 86, borderRadius: "50%", border: "3px solid var(--apple-soft)" },
      }),
      React.default.createElement(
        "h2",
        { style: { fontFamily: "var(--script)", fontSize: 33, color: "var(--forest)", marginTop: 12 } },
        "Ma carte de fid\xE9lit\xE9",
      ),
      React.default.createElement(
        "p",
        { style: { fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, marginTop: 6 } },
        "Un code personnel vous est attribu\xE9. Pr\xE9sentez-le en caisse \xE0 chaque passage pour gagner vos tampons.",
      ),
    ),
    React.default.createElement(
      "div",
      { style: { display: "flex", gap: 10 } },
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Pr\xE9nom"),
        React.default.createElement("input", {
          className: "inp",
          value: r,
          onChange: (T) => i(T.target.value),
          placeholder: "Marie",
          autoComplete: "given-name",
          autoFocus: !0,
        }),
      ),
      React.default.createElement(
        "div",
        { style: { flex: 1, minWidth: 0 } },
        React.default.createElement("label", { className: "lab" }, "Nom"),
        React.default.createElement("input", {
          className: "inp",
          value: o,
          onChange: (T) => s(T.target.value),
          placeholder: "Dupont",
          autoComplete: "family-name",
        }),
      ),
    ),
    React.default.createElement("label", { className: "lab", style: { marginTop: 12 } }, "T\xE9l\xE9phone"),
    React.default.createElement("input", {
      className: "inp",
      type: "tel",
      inputMode: "tel",
      value: l,
      onChange: (T) => u(T.target.value),
      placeholder: "06 12 34 56 78",
      autoComplete: "tel",
    }),
    l &&
      !v &&
      React.default.createElement("div", { className: "champ-err" }, "Num\xE9ro incomplet (10 chiffres)."),
    React.default.createElement("label", { className: "lab", style: { marginTop: 12 } }, "Adresse e-mail"),
    React.default.createElement("input", {
      className: "inp",
      type: "email",
      inputMode: "email",
      value: d,
      onChange: (T) => h(T.target.value),
      placeholder: "marie.dupont@exemple.fr",
      autoComplete: "email",
      autoCapitalize: "off",
    }),
    d &&
      !w &&
      React.default.createElement("div", { className: "champ-err" }, "Adresse e-mail incompl\xE8te."),
    React.default.createElement(
      "label",
      { className: "lab", style: { marginTop: 12 } },
      "Votre anniversaire ",
      React.default.createElement(
        "span",
        { style: { fontWeight: 600, color: "var(--ink3)" } },
        "(facultatif : un tampon offert ce jour-l\xE0 \u{1F382})",
      ),
    ),
    React.default.createElement(ChoixAnniversaire, { j: P, m: j, setJ: z, setM: b }),
    React.default.createElement(
      "label",
      { className: "lab", style: { marginTop: 12 } },
      "Code de parrainage ",
      React.default.createElement(
        "span",
        { style: { fontWeight: 600, color: "var(--ink3)" } },
        "(facultatif)",
      ),
    ),
    React.default.createElement("input", {
      className: "inp",
      value: C,
      onChange: (T) => A(T.target.value.toUpperCase()),
      placeholder: "RAD-XXXXX",
      autoCapitalize: "characters",
      maxLength: 9,
    }),
    C &&
      !S &&
      React.default.createElement("div", { className: "champ-err" }, "Code incomplet (exemple : RAD-AB2CD)."),
    S &&
      React.default.createElement(
        "div",
        { style: { fontSize: 12, color: "var(--apple)", fontWeight: 700, marginTop: 4 } },
        "\u{1F91D} \xC0 votre premier passage en caisse, vous et votre parrain gagnez chacun 1 tampon !",
      ),
    React.default.createElement(
      "div",
      { className: "rgpd-info" },
      "Vos nom, pr\xE9nom, t\xE9l\xE9phone et e-mail servent ",
      React.default.createElement("b", null, "uniquement"),
      " \xE0 g\xE9rer votre carte de fid\xE9lit\xE9 (vous retrouver en caisse, vous joindre au sujet de votre carte). Ils ne sont ni revendus, ni utilis\xE9s pour de la publicit\xE9. Vous pouvez les consulter \xE0 tout moment depuis l'onglet Fid\xE9lit\xE9, et en demander la suppression \xE0 l'\xE9picerie.",
    ),
    React.default.createElement(
      "label",
      { className: "accord" },
      React.default.createElement("input", {
        type: "checkbox",
        checked: D,
        onChange: (T) => M(T.target.checked),
      }),
      React.default.createElement(
        "span",
        null,
        "J'ai lu la ",
        React.default.createElement(
          "button",
          { type: "button", onClick: () => ouvrirLegal("confidentialite") },
          "politique de confidentialit\xE9",
        ),
        " et j'accepte l'utilisation de mes donn\xE9es pour ma carte de fid\xE9lit\xE9.",
      ),
    ),
    E &&
      React.default.createElement(
        "div",
        { style: { color: "#C86B5C", fontSize: 12.5, fontWeight: 700, marginTop: 12 } },
        E,
      ),
    React.default.createElement(
      "button",
      {
        className: "btn",
        style: { marginTop: 16 },
        disabled: !k || !D || f,
        onClick: async () => {
          if (!k || !D || f) return;
          m(!0), F("");
          let T = new Date().toLocaleDateString("sv-SE"),
            X = nomPropre(r).slice(0, 40),
            le = nomPropre(o).slice(0, 40),
            se = {
              code: qy(),
              prenom: X,
              nomFamille: le,
              nom: (X + " " + le).slice(0, 60),
              tel: telFormate(l),
              email: d.trim().toLowerCase().slice(0, 100),
              points: 0,
              depuis: T,
              accord: T,
              ...(S ? { parrain: S } : {}),
              ...(y ? { anniv: y } : {}),
            };
          try {
            let R,
              fe = 0;
            for (;;) {
              R = doc2(collection(db2, "clients"));
              let Q = writeBatch(db2);
              Q.set(R, se), Q.set(doc2(db2, "codes", se.code), { c: R.id });
              try {
                await Q.commit();
                break;
              } catch (Ae) {
                if (Ae?.code !== "permission-denied" || ++fe >= 4) throw Ae;
                se.code = qy();
              }
            }
            try {
              localStorage.removeItem(tx);
            } catch {}
            onDone({ ref: R.id, code: se.code, nom: se.nom, points: 0, tampons: 0 });
          } catch {
            F(
              "La carte n'a pas pu \xEAtre cr\xE9\xE9e. V\xE9rifiez votre connexion internet et r\xE9essayez.",
            ),
              m(!1);
          }
        },
      },
      f ? "Cr\xE9ation\u2026" : "Cr\xE9er ma carte",
    ),
    !k &&
      React.default.createElement(
        "div",
        { style: { fontSize: 11.5, color: "var(--ink3)", textAlign: "center", marginTop: 6 } },
        "Tous les champs sont n\xE9cessaires pour cr\xE9er la carte.",
      ),
    React.default.createElement(
      "button",
      { className: "btn gh", style: { marginTop: 8 }, onClick: onCancel },
      "Plus tard",
    ),
  );
}
function Infos({
  d: d,
  inst: inst,
  ouvrirLegal: ouvrirLegal,
  pr: r = {},
  setPrenom: setPrenom,
  notifs: notifs,
}) {
  let s = (new Date().getDay() + 6) % 7;
  return React.default.createElement(
    "div",
    { className: "wrap" },
    React.default.createElement(Installer, { inst: inst, compact: !0 }),
    React.default.createElement(
      "h3",
      { className: "h2" },
      React.default.createElement("i", null),
      "L'\xE9picerie",
    ),
    React.default.createElement("div", { className: "sub" }),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "b" },
        React.default.createElement("h3", null, d.store.name),
        React.default.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              marginTop: 10,
              fontSize: 13,
              color: "var(--ink2)",
            },
          },
          Ic2.pin(16, "#6E9B3A"),
          React.default.createElement("span", null, d.store.address),
        ),
        d.store.phone &&
          React.default.createElement(
            "a",
            {
              href: "tel:" + d.store.phone.replace(/\s/g, ""),
              style: {
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginTop: 9,
                fontSize: 13,
                color: "var(--apple)",
                fontWeight: 700,
                textDecoration: "none",
              },
            },
            Ic2.phone(16, "#6E9B3A"),
            d.store.phone,
          ),
        d.store.email &&
          React.default.createElement(
            "div",
            { style: { fontSize: 12.5, color: "var(--ink3)", marginTop: 8, wordBreak: "break-all" } },
            d.store.email,
          ),
        Y2(d) &&
          React.default.createElement(
            "a",
            {
              className: "btn gh",
              style: { marginTop: 12, display: "block", textAlign: "center", textDecoration: "none" },
              href: Y2(d),
              target: "_blank",
              rel: "noopener noreferrer",
              onClick: () => tn("avis"),
            },
            "\u2B50 Laisser un avis Google",
          ),
      ),
    ),
    React.default.createElement(Deco, null),
    React.default.createElement(
      "h3",
      { className: "h2" },
      React.default.createElement("i", null),
      "Horaires",
    ),
    React.default.createElement("div", { className: "sub" }),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "b", style: { paddingTop: 4, paddingBottom: 4 } },
        React.default.createElement(
          "table",
          { className: "tbl" },
          React.default.createElement(
            "tbody",
            null,
            d.hours.map((l, u) =>
              React.default.createElement(
                "tr",
                { key: u, className: u === s ? "now" : "" },
                React.default.createElement("td", null, l.day),
                React.default.createElement("td", null, l.am || "Ferm\xE9"),
                React.default.createElement("td", { style: { textAlign: "right" } }, l.pm),
              ),
            ),
          ),
        ),
      ),
    ),
    !!d.services.filter((l) => l.active !== !1).length &&
      React.default.createElement(
        React.default.Fragment,
        null,
        React.default.createElement(Deco, { a: "left" }),
        React.default.createElement(
          "h3",
          { className: "h2" },
          React.default.createElement("i", null),
          "Nos services",
        ),
        React.default.createElement("div", { className: "sub" }),
        d.services
          .filter((l) => l.active !== !1)
          .map((l) =>
            React.default.createElement(
              "div",
              {
                className: "ji",
                key: l.id,
                style: {
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  marginBottom: 8,
                },
              },
              React.default.createElement(
                "div",
                {
                  style: {
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: "var(--apple-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  },
                },
                Ic2.leaf(20, "#8AAD3B"),
              ),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("div", { className: "nm", style: { fontSize: 13.5 } }, l.label),
                l.desc && React.default.createElement("div", { className: "no" }, l.desc),
              ),
            ),
          ),
      ),
    React.default.createElement(BlocNotifications, { n: notifs }),
    React.default.createElement(PartagerAppli, { d: d }),
    React.default.createElement(MonPrenom, { prenom: r.prenom || "", onChange: setPrenom }),
    React.default.createElement(ChangerTelephone, null),
    React.default.createElement(
      "div",
      { className: "liens-leg" },
      React.default.createElement(
        "button",
        { onClick: () => ouvrirLegal("confidentialite") },
        "Confidentialit\xE9 & donn\xE9es personnelles",
      ),
      React.default.createElement(
        "button",
        { onClick: () => ouvrirLegal("mentions") },
        "Mentions l\xE9gales",
      ),
    ),
    React.default.createElement(BoutonMaj, { style: { marginTop: 18 } }),
    d.store.facebook &&
      React.default.createElement(
        "a",
        { href: d.store.facebook, target: "_blank", rel: "noreferrer", style: { textDecoration: "none" } },
        React.default.createElement(
          "button",
          { className: "btn gh", style: { marginTop: 10 } },
          "Voir la page Facebook",
        ),
      ),
  );
}
var BIENVENUE_KEY = "epicerie-raddonnaise-bienvenue-vue",
  mouvementReduit = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  FEUILLES = [
    { l: 8, t: 3.6, d: 0, s: 26, c: "#A9C75A", r: 220, x: 30 },
    { l: 22, t: 4.2, d: 0.5, s: 18, c: "#C9D6AE", r: -160, x: -20, erable: !0 },
    { l: 41, t: 3.9, d: 0.2, s: 22, c: "#8AAD3B", r: 260, x: 25 },
    { l: 63, t: 4.4, d: 0.8, s: 16, c: "#C9D6AE", r: -200, x: -30 },
    { l: 78, t: 3.7, d: 0.3, s: 28, c: "#A9C75A", r: 180, x: -25, erable: !0 },
    { l: 90, t: 4.6, d: 1.1, s: 18, c: "#8AAD3B", r: -240, x: 15 },
    { l: 52, t: 5, d: 1.4, s: 14, c: "#A9C75A", r: 300, x: 20 },
  ],
  Feuille = ({ f: f }) =>
    React.default.createElement(
      "svg",
      {
        className: "feuille",
        width: f.s,
        height: f.s,
        viewBox: "0 0 24 24",
        style: {
          left: f.l + "%",
          animationDuration: f.t + "s",
          animationDelay: f.d + "s",
          "--r": f.r + "deg",
          "--x": f.x + "px",
        },
      },
      f.erable
        ? React.default.createElement("path", {
            fill: f.c,
            d: "M12 2c-1 3-3 5-5 6 1 1 1 3 0 5 2-1 4 0 5 2 1-2 3-3 5-2-1-2-1-4 0-5-2-1-4-3-5-6zM12 15v7",
            stroke: f.c,
            strokeWidth: "1.2",
          })
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("path", {
              fill: f.c,
              d: "M12 2C6 6 4.5 11 6.5 16c1.3 3 3.6 4.7 5.5 6 1.9-1.3 4.2-3 5.5-6C19.5 11 18 6 12 2z",
            }),
            React.default.createElement("path", {
              d: "M12 5v16M12 10l-3-2M12 13l3-2M12 16l-3-2",
              stroke: "rgba(0,0,0,.18)",
              strokeWidth: "1",
              fill: "none",
            }),
          ),
    ),
  w9 = (t) =>
    t?.logo === "rose" || Re(t) === "octobrerose"
      ? "logo-rose.png"
      : nn[Re(t)]
        ? nn[Re(t)].logo
        : t?.magie && t.id === "noel"
          ? "logo-noel.png"
          : Re(t) === "halloween"
            ? "logo-halloween.png"
            : "logo-intro.png";
function Intro({
  moi: moi,
  prenom: prenom,
  onEnd: onEnd,
  onSortie: onSortie,
  theme: theme,
  tampons: tampons,
  actif: actif = !0,
}) {
  let l = (prenom || (moi?.nom ? moi.nom.trim().split(/\s+/)[0] : "")).trim(),
    u = !!l,
    d = mouvementReduit() ? 900 : u ? 3e3 : 4200,
    [out, setOut] = (0, React.useState)(!1),
    m = (0, React.useRef)(!1),
    E = () => {
      m.current || ((m.current = !0), setOut(!0), onSortie?.(), setTimeout(onEnd, 550));
    };
  (0, React.useEffect)(() => {
    if (!actif) return;
    let D = setTimeout(E, d);
    return () => clearTimeout(D);
  }, [actif]);
  let F = moi?.points || 0;
  return React.default.createElement(
    "div",
    {
      className: "intro" + (out ? " out" : ""),
      onClick: E,
      role: "presentation",
      style: theme ? { background: MI(theme) } : void 0,
    },
    theme?.magie && React.default.createElement(CielEtoile, null),
    Re(theme) === "halloween" && React.default.createElement(cI, null),
    Re(theme) === "octobrerose" && React.default.createElement(mI, null),
    hc.includes(Re(theme)) && React.default.createElement(II, { id: Re(theme) }),
    React.default.createElement("div", { className: "halo" }),
    theme
      ? React.default.createElement(Particules, { theme: theme, nb: 18 })
      : FEUILLES.map((D, M) => React.default.createElement(Feuille, { key: M, f: D })),
    React.default.createElement("img", {
      className: "logo",
      src: w9(theme),
      alt: "\xC9picerie Raddonnaise",
      onError: (D) => {
        D.target.src.endsWith("logo-intro.png") || (D.target.src = "logo-intro.png");
      },
    }),
    u
      ? React.default.createElement(
          "div",
          { className: "accueil-perso" },
          React.default.createElement("div", { className: "bonjour" }, "Bonjour ", l, " !"),
          React.default.createElement(
            "div",
            { className: "bienv-txt" },
            "Bienvenue sur l'application de l'\xE9picerie",
          ),
          theme
            ? React.default.createElement(
                "div",
                { className: "slogan", style: { fontSize: 24 } },
                theme.phrase || theme.titre,
              )
            : moi &&
                (tampons
                  ? React.default.createElement(
                      "div",
                      { className: "pts-chip" },
                      "\u{1F34F} ",
                      moi.tampons || 0,
                      " tampon",
                      (moi.tampons || 0) > 1 ? "s" : "",
                      " sur votre carte",
                    )
                  : React.default.createElement(
                      "div",
                      { className: "pts-chip" },
                      F,
                      " point",
                      F > 1 ? "s" : "",
                      " sur votre carte",
                    )),
        )
      : React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement(
            "div",
            { className: "slogan" },
            theme ? theme.phrase || theme.titre : "Votre \xE9picerie, tout pr\xE8s de chez vous",
          ),
          React.default.createElement(
            "div",
            { className: "bienv-txt", style: { position: "relative" } },
            "Bienvenue sur l'application de l'\xE9picerie",
          ),
        ),
    React.default.createElement(
      "div",
      {
        className: "lieu",
        style: theme?.magie
          ? { color: "#3B4F6B", zIndex: 2 }
          : Re(theme)
            ? { color: "#FFB547", zIndex: 2 }
            : void 0,
      },
      "Raddon-et-Chapendu",
    ),
  );
}
var Illu = {
  jour: React.default.createElement(
    "svg",
    {
      viewBox: "0 0 120 120",
      width: "120",
      height: "120",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("path", {
      d: "M22 50h76l-8 46a6 6 0 0 1-6 5H36a6 6 0 0 1-6-5z",
      fill: "#fff",
      stroke: "#1C433B",
      strokeWidth: "3.5",
    }),
    React.default.createElement("path", {
      d: "M40 50 54 24M80 50 66 24",
      stroke: "#1C433B",
      strokeWidth: "3.5",
    }),
    React.default.createElement("circle", { cx: "48", cy: "44", r: "11", fill: "#E05A47" }),
    React.default.createElement("path", { d: "M48 33c1-4 4-5 6-5", stroke: "#6E9B3A", strokeWidth: "3" }),
    React.default.createElement("circle", { cx: "70", cy: "42", r: "12", fill: "#A9C75A" }),
    React.default.createElement("path", { d: "M70 30v-4", stroke: "#5C3D2E", strokeWidth: "3" }),
    React.default.createElement("path", { d: "M86 46c2-10 8-14 14-14-1 8-6 13-14 14z", fill: "#6E9B3A" }),
    React.default.createElement("path", { d: "M44 70h32M44 82h22", stroke: "#C9D6AE", strokeWidth: "4" }),
  ),
  plateau: React.default.createElement(
    "svg",
    {
      viewBox: "0 0 120 120",
      width: "120",
      height: "120",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("ellipse", {
      cx: "60",
      cy: "78",
      rx: "46",
      ry: "16",
      fill: "#fff",
      stroke: "#1C433B",
      strokeWidth: "3.5",
    }),
    React.default.createElement("path", {
      d: "M30 74c4-10 14-12 20-6M52 70c6-12 18-12 24-2",
      stroke: "#C27B42",
      strokeWidth: "6",
    }),
    React.default.createElement("circle", { cx: "80", cy: "70", r: "6", fill: "#E05A47" }),
    React.default.createElement("circle", { cx: "90", cy: "74", r: "5", fill: "#E05A47" }),
    React.default.createElement("path", {
      d: "M38 64l10-10 8 8-10 6z",
      fill: "#F2C94C",
      stroke: "#C69A3C",
      strokeWidth: "2",
    }),
    React.default.createElement("circle", { cx: "66", cy: "60", r: "4", fill: "#8AAD3B" }),
    React.default.createElement("circle", { cx: "72", cy: "57", r: "4", fill: "#8AAD3B" }),
    React.default.createElement("circle", { cx: "69", cy: "52", r: "4", fill: "#8AAD3B" }),
    React.default.createElement("path", {
      d: "M60 30v8M48 34l3 6M72 34l-3 6",
      stroke: "#C69A3C",
      strokeWidth: "3",
    }),
  ),
  carte: React.default.createElement(
    "svg",
    {
      viewBox: "0 0 120 120",
      width: "120",
      height: "120",
      fill: "none",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    React.default.createElement("rect", {
      x: "16",
      y: "30",
      width: "88",
      height: "58",
      rx: "10",
      fill: "#1C433B",
    }),
    [0, 1, 2, 3, 4].map((t) =>
      React.default.createElement("circle", {
        key: t,
        cx: 32 + t * 14,
        cy: "66",
        r: "5.5",
        fill: t < 3 ? "#A9C75A" : "none",
        stroke: t < 3 ? "none" : "rgba(255,255,255,.4)",
        strokeWidth: "2",
      }),
    ),
    React.default.createElement("path", {
      d: "M28 46h34",
      stroke: "rgba(255,255,255,.85)",
      strokeWidth: "4",
    }),
    React.default.createElement("path", {
      d: "m92 22 3.5 7 7.5 1-5.5 5.3 1.3 7.7L92 39.4 85.2 43l1.3-7.7L81 30l7.5-1z",
      fill: "#F0C860",
      stroke: "#C69A3C",
      strokeWidth: "1.5",
    }),
    React.default.createElement("rect", {
      x: "70",
      y: "40",
      width: "24",
      height: "24",
      rx: "3",
      fill: "#fff",
    }),
    React.default.createElement("path", {
      d: "M74 44h6v6h-6zM84 44h6v6h-6zM74 54h6v6h-6zM86 56h2v2h-2z",
      fill: "#1C433B",
    }),
  ),
};
function Bienvenue({ d: t, onFin: onFin }) {
  let n = [
      {
        id: "jour",
        titre: "Le frais du jour",
        texte:
          "Fruits, l\xE9gumes, plats maison et bonnes affaires : voyez ce qui vous attend avant m\xEAme de passer.",
      },
      t.onglets?.carte !== !1 && {
        id: "plateau",
        titre: "Plateaux & paniers",
        texte:
          "Ap\xE9ritifs, paniers garnis, corbeilles de fruits : choisissez en photo, on pr\xE9pare tout pour vous.",
      },
      t.onglets?.fidelite !== !1 &&
        t.fidelite?.active && {
          id: "carte",
          titre: "Votre carte de fid\xE9lit\xE9",
          texte:
            "Des points \xE0 chaque passage en caisse, des r\xE9compenses \xE0 la cl\xE9. Votre carte tient dans votre t\xE9l\xE9phone.",
        },
    ].filter(Boolean),
    r = (0, React.useRef)(null),
    [i, setI] = (0, React.useState)(0),
    s = i === n.length - 1,
    l = (h) =>
      r.current?.scrollTo({
        left: h * r.current.clientWidth,
        behavior: mouvementReduit() ? "auto" : "smooth",
      }),
    u = (h) => {
      try {
        localStorage.setItem(BIENVENUE_KEY, "1");
      } catch {}
      onFin(h);
    },
    d = n[n.length - 1]?.id === "carte";
  return React.default.createElement(
    "div",
    { className: "bienv" },
    React.default.createElement("button", { className: "passer", onClick: () => u() }, "Passer"),
    React.default.createElement(
      "div",
      {
        className: "rail",
        ref: r,
        onScroll: (h) => setI(Math.round(h.currentTarget.scrollLeft / h.currentTarget.clientWidth)),
      },
      n.map((h, f) =>
        React.default.createElement(
          "section",
          { className: "ecran" + (f === i ? " vu" : ""), key: h.id },
          React.default.createElement(
            "div",
            { className: "illu" },
            React.default.createElement("span", { className: "rond" }),
            Illu[h.id],
          ),
          React.default.createElement("h2", null, h.titre),
          React.default.createElement("p", null, h.texte),
        ),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "bas" },
      React.default.createElement(
        "div",
        { className: "pastilles" },
        n.map((h, f) =>
          React.default.createElement("i", {
            key: h.id,
            className: f === i ? "on" : "",
            onClick: () => l(f),
          }),
        ),
      ),
      s
        ? d
          ? React.default.createElement(
              React.default.Fragment,
              null,
              React.default.createElement(
                "button",
                { className: "btn", onClick: () => u("carte") },
                "Cr\xE9er ma carte de fid\xE9lit\xE9",
              ),
              React.default.createElement(
                "button",
                { className: "btn gh", style: { marginTop: 8 }, onClick: () => u() },
                "D\xE9couvrir l'\xE9picerie",
              ),
            )
          : React.default.createElement("button", { className: "btn", onClick: () => u() }, "C'est parti")
        : React.default.createElement("button", { className: "btn", onClick: () => l(i + 1) }, "Suivant"),
    ),
  );
}
var pT = "epicerie-raddonnaise-conv-adoptees",
  fx = () => {
    try {
      return JSON.parse(localStorage.getItem(CHAT_KEY) || "null");
    } catch {
      return null;
    }
  },
  Tf = (t) => {
    try {
      t ? localStorage.setItem(CHAT_KEY, JSON.stringify(t)) : localStorage.removeItem(CHAT_KEY);
    } catch {}
  };
function useChat() {
  let [moiChat, setMoiChat] = (0, React.useState)(fx),
    [msgs, setMsgs] = (0, React.useState)([]);
  (0, React.useEffect)(() => {
    if (!moiChat?.ref) {
      setMsgs([]);
      return;
    }
    let l = onSnapshot(
        collection(db2, "conversations", moiChat.ref, "messages"),
        (d) =>
          setMsgs(
            d.docs.map((h) => ({ ...h.data(), id: h.id })).sort((h, f) => (h.date || 0) - (f.date || 0)),
          ),
        () => {},
      ),
      u = onSnapshot(
        doc2(db2, "conversations", moiChat.ref),
        (d) => {
          !d.exists() && !d.metadata?.fromCache && (Tf(null), setMoiChat(null));
        },
        () => {},
      );
    return () => {
      l(), u();
    };
  }, [moiChat?.ref]);
  let i = msgs.filter((l) => l.de === "epicerie" && (l.date || 0) > (moiChat?.vu || 0)).length;
  return {
    moiChat: moiChat,
    msgs: msgs,
    nonLus: i,
    marquerVu: () => {
      if (!moiChat) return;
      let l = { ...moiChat, vu: Date.now() };
      Tf(l), setMoiChat(l);
    },
    enregistrer: (l) => {
      Tf(l), setMoiChat(l);
    },
  };
}
function Salutation({ prenom: prenom, onFin: onFin, amb: amb }) {
  let [r, i] = (0, React.useState)(!1),
    o = (0, React.useRef)(!1),
    s = () => {
      o.current || ((o.current = !0), i(!0), setTimeout(onFin, 420));
    };
  (0, React.useEffect)(() => {
    let h = setTimeout(s, mouvementReduit() ? 2200 : 4800);
    return () => clearTimeout(h);
  }, []);
  let l = new Date().getHours(),
    u = l >= 18 || l < 5 ? "Bonsoir" : "Bonjour",
    d =
      amb === "halloween"
        ? React.default.createElement(
            React.default.Fragment,
            null,
            "Joyeux",
            React.default.createElement("br", null),
            "Halloween",
          )
        : amb === "octobrerose"
          ? React.default.createElement(
              React.default.Fragment,
              null,
              "Octobre",
              React.default.createElement("br", null),
              "rose \u{1F380}",
            )
          : nn[amb]
            ? nn[amb].pastille
            : amb === "noel"
              ? React.default.createElement(
                  React.default.Fragment,
                  null,
                  "Joyeux",
                  React.default.createElement("br", null),
                  "No\xEBl",
                )
              : u === "Bonsoir"
                ? React.default.createElement(
                    React.default.Fragment,
                    null,
                    "Belle",
                    React.default.createElement("br", null),
                    "soir\xE9e !",
                  )
                : React.default.createElement(
                    React.default.Fragment,
                    null,
                    "Belle",
                    React.default.createElement("br", null),
                    "journ\xE9e !",
                  );
  return React.default.createElement(
    "div",
    {
      className: "etq-fond" + (r ? " out" : "") + (amb ? " etq-" + amb : ""),
      onClick: s,
      role: "dialog",
      "aria-label": u + " " + prenom,
    },
    React.default.createElement(
      "div",
      { className: "etq-pend" },
      React.default.createElement("div", { className: "etq-fil" }),
      amb === "halloween" && React.default.createElement(SvgAraignee, null),
      React.default.createElement(
        "div",
        { className: "etq" },
        React.default.createElement("div", { className: "etq-trou" }),
        React.default.createElement("div", { className: "etq-bande" }, "\xC9picerie Raddonnaise"),
        React.default.createElement("div", { className: "etq-salut" }, u),
        React.default.createElement("div", { className: "etq-nom" }, prenom, " !"),
        React.default.createElement("div", { className: "etq-sep" }),
        React.default.createElement(
          "div",
          { className: "etq-bas" },
          React.default.createElement("div", { className: "etq-code", "aria-hidden": "true" }),
          React.default.createElement("div", { className: "etq-local" }, "Content de vous revoir"),
        ),
      ),
      React.default.createElement("div", { className: "etq-pastille" }, d),
    ),
  );
}
function BulleChat({ nonLus: nonLus, haut: haut, onClick: onClick }) {
  let [petit, setPetit] = (0, React.useState)(!1);
  return (
    (0, React.useEffect)(() => {
      let o = setTimeout(() => setPetit(!0), 5e3),
        s = () => {
          window.scrollY > 30 && setPetit(!0);
        };
      return (
        window.addEventListener("scroll", s, { passive: !0 }),
        () => {
          clearTimeout(o), window.removeEventListener("scroll", s);
        }
      );
    }, []),
    React.default.createElement(
      "button",
      {
        className: "bulle-chat" + (haut ? " haut" : "") + (petit && !nonLus ? " petit" : ""),
        onClick: onClick,
        "aria-label": "Parlez avec nous",
      },
      React.default.createElement(
        "svg",
        {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinejoin: "round",
        },
        React.default.createElement("path", { d: "M4 5h16v11H9l-5 4z" }),
        React.default.createElement("path", { d: "M8 9.5h8M8 12.5h5", strokeLinecap: "round" }),
      ),
      React.default.createElement("span", { className: "bc-txt" }, "Parlez avec nous"),
      nonLus > 0 && React.default.createElement("b", null, nonLus),
    )
  );
}
function Messagerie({
  d: t,
  moi: moi,
  chat: chat,
  onClose: onClose,
  ouvrirLegal: ouvrirLegal,
  notifs: notifs,
  inst: inst,
}) {
  let { moiChat: l, msgs: u, marquerVu: d, enregistrer: h } = chat,
    [nom, setNom] = (0, React.useState)(Sf().prenom || moi?.nom || ""),
    [tel, setTel] = (0, React.useState)(""),
    [texte, setTexte] = (0, React.useState)(""),
    [envoi, setEnvoi] = (0, React.useState)(!1),
    [err, setErr] = (0, React.useState)(""),
    z = (0, React.useRef)(null);
  (0, React.useEffect)(() => {
    d(), z.current?.scrollIntoView({ block: "end" });
  }, [u.length]);
  let j = async () => {
      let y = texte.trim().slice(0, 1e3);
      if (!(!y || envoi)) {
        if (!l && !nom.trim())
          return setErr("Indiquez votre pr\xE9nom pour que l'\xE9picerie sache qui \xE9crit.");
        setEnvoi(!0), setErr("");
        try {
          let v = Date.now(),
            w = writeBatch(db2),
            k = l?.ref,
            N = !k;
          if (k) w.update(doc2(db2, "conversations", k), { maj: v, dernier: U2(y), attente: !0 });
          else {
            let le = doc2(collection(db2, "conversations"));
            (k = q2(le)),
              w.set(le, {
                nom: nom.trim().slice(0, 40),
                tel: tel.trim().slice(0, 20),
                cree: v,
                maj: v,
                dernier: U2(y),
                attente: !0,
              });
          }
          w.set(doc2(collection(db2, "conversations", k, "messages")), { de: "client", texte: y, date: v }),
            N && h({ ref: k, nom: nom.trim(), vu: v }),
            ux("msg", k);
          let T = w.commit(),
            X = await sx(T);
          if (X === "erreur") throw (N && h(null), Cf(k), new Error("refus"));
          N && setTimeout(_c, 300),
            setTexte(""),
            X === "ok"
              ? setTimeout(() => ns(t.cmd, "msg", k), 1500)
              : (setErr(
                  "\u{1F4F6} Connexion faible : votre message partira d\xE8s que le r\xE9seau revient.",
                ),
                T.then(
                  () => {
                    setErr(""), ns(t.cmd, "msg", k);
                  },
                  () => {},
                ));
        } catch {
          setErr("Message non envoy\xE9. V\xE9rifiez votre connexion et r\xE9essayez.");
        }
        setEnvoi(!1);
      }
    },
    b = "";
  return React.default.createElement(
    "div",
    { className: "legal chat-page" },
    React.default.createElement(
      "div",
      { className: "legal-top chat-top" },
      React.default.createElement("button", { onClick: onClose, "aria-label": "Retour" }, "\u2190"),
      React.default.createElement("img", { src: LOGO, alt: "" }),
      React.default.createElement(
        "div",
        null,
        React.default.createElement("b", null, t.store.name),
        React.default.createElement("small", null, "R\xE9pond en g\xE9n\xE9ral dans la journ\xE9e"),
      ),
    ),
    React.default.createElement(
      "div",
      { className: "chat-fil" },
      React.default.createElement(
        "div",
        { className: "msg epicerie premier" },
        React.default.createElement(
          "div",
          { className: "txt" },
          "Bonjour \u{1F44B} Une question sur un produit, un plateau, nos horaires ? \xC9crivez-nous ici, on vous r\xE9pond d\xE8s que possible.",
        ),
      ),
      u.map((y) => {
        let v = jourMsg(y.date),
          w = v !== b;
        return (
          (b = v),
          React.default.createElement(
            React.default.Fragment,
            { key: y.id },
            w && React.default.createElement("div", { className: "chat-jour" }, v),
            React.default.createElement(
              "div",
              { className: "msg " + (y.de === "epicerie" ? "epicerie" : "client") },
              React.default.createElement("div", { className: "txt" }, y.texte),
              React.default.createElement("div", { className: "h" }, heureMsg(y.date)),
            ),
          )
        );
      }),
      l &&
        notifs &&
        React.default.createElement(
          "div",
          { style: { margin: "8px 0" } },
          React.default.createElement(BlocNotifications, { n: notifs, compact: !0 }),
        ),
      React.default.createElement("div", { ref: z }),
    ),
    React.default.createElement(
      "div",
      { className: "chat-saisie" },
      !l && React.default.createElement(ConseilInstallCommande, { inst: inst, quoi: "votre conversation" }),
      !l &&
        React.default.createElement(
          "div",
          { className: "chat-ident" },
          React.default.createElement(
            "div",
            { style: { display: "flex", gap: 8 } },
            React.default.createElement("input", {
              className: "inp",
              value: nom,
              maxLength: 40,
              placeholder: "Votre pr\xE9nom",
              onChange: (y) => setNom(y.target.value),
              autoComplete: "given-name",
            }),
            React.default.createElement("input", {
              className: "inp",
              type: "tel",
              value: tel,
              maxLength: 20,
              placeholder: "T\xE9l\xE9phone (facultatif)",
              onChange: (y) => setTel(y.target.value),
              autoComplete: "tel",
            }),
          ),
          React.default.createElement(
            "div",
            { className: "chat-rgpd" },
            "Vos messages servent uniquement \xE0 \xE9changer avec l'\xE9picerie. ",
            React.default.createElement(
              "button",
              { className: "lien", onClick: () => ouvrirLegal("confidentialite") },
              "En savoir plus",
            ),
          ),
        ),
      err && React.default.createElement("div", { className: "manque", style: { margin: "0 0 6px" } }, err),
      React.default.createElement(
        "div",
        { className: "chat-ligne" },
        React.default.createElement("textarea", {
          className: "inp",
          rows: 1,
          value: texte,
          maxLength: 1e3,
          placeholder: "Votre message\u2026",
          onChange: (y) => setTexte(y.target.value),
          onKeyDown: (y) => {
            y.key === "Enter" &&
              !y.shiftKey &&
              window.matchMedia("(pointer:fine)").matches &&
              (y.preventDefault(), j());
          },
        }),
        React.default.createElement(
          "button",
          { className: "chat-env", disabled: !texte.trim() || envoi, onClick: j, "aria-label": "Envoyer" },
          React.default.createElement(
            "svg",
            { width: "22", height: "22", viewBox: "0 0 24 24", fill: "currentColor" },
            React.default.createElement("path", { d: "M3 20.5 21 12 3 3.5l2.5 7.2L14 12l-8.5 1.3z" }),
          ),
        ),
      ),
    ),
  );
}
var PRENOM_KEY = "epicerie-raddonnaise-prenom",
  Sf = () => {
    try {
      return JSON.parse(localStorage.getItem(PRENOM_KEY) || "null") || {};
    } catch {
      return {};
    }
  };
function S9() {
  let [t, e] = (0, React.useState)(Sf);
  return [
    t,
    (r) => {
      let i = {
        prenom: String(r || "")
          .trim()
          .slice(0, 30),
        demande: !0,
      };
      try {
        localStorage.setItem(PRENOM_KEY, JSON.stringify(i));
      } catch {}
      e(i);
    },
  ];
}
function DemandePrenom({ initial: initial, onFin: onFin }) {
  let [p, setP] = (0, React.useState)(initial || "");
  return React.default.createElement(
    "div",
    { className: "sheet-fond" },
    React.default.createElement(
      "div",
      { className: "sheet", role: "dialog", "aria-label": "Votre pr\xE9nom" },
      React.default.createElement("div", { className: "pr-main" }, "\u{1F44B}"),
      React.default.createElement("h3", { className: "alerte-t" }, "On fait connaissance ?"),
      React.default.createElement(
        "p",
        { className: "tr-txt" },
        "Comment vous appelez-vous ? L'application vous dira bonjour \xE0 chaque visite.",
        React.default.createElement("br", null),
        React.default.createElement("small", null, "Votre pr\xE9nom reste sur votre t\xE9l\xE9phone."),
      ),
      React.default.createElement("input", {
        className: "inp",
        value: p,
        maxLength: 30,
        placeholder: "Votre pr\xE9nom",
        autoComplete: "given-name",
        onChange: (i) => setP(i.target.value),
        onKeyDown: (i) => i.key === "Enter" && p.trim() && onFin(p),
        style: { textAlign: "center", fontSize: 18, fontWeight: 800 },
      }),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 12 }, disabled: !p.trim(), onClick: () => onFin(p) },
        "C'est not\xE9 !",
      ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { marginTop: 8 }, onClick: () => onFin("") },
        "Plus tard",
      ),
    ),
  );
}
var nx = "ERT1.",
  N9 = (t) =>
    btoa(unescape(encodeURIComponent(t)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, ""),
  F9 = (t) => decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))),
  Ec = (t) => typeof t == "string" && /^[A-Za-z0-9]{15,40}$/.test(t),
  D9 = (t) => typeof t == "string" && /^[A-Za-z0-9]{12,40}$/.test(t);
function P9() {
  let t = null;
  try {
    t = JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {}
  let e = {};
  t?.ref && (e.c = t.ref);
  let n = Dn()
    .filter((s) => Ec(s.ref))
    .map((s) => s.ref)
    .slice(0, 10);
  n.length && (e.o = n);
  let r = fx();
  r?.ref && (e.m = r.ref);
  let i = ts()
    .filter((s) => Ec(s.ref) && Date.now() - (s.cree || 0) < 4 * 864e5)
    .map((s) => s.ref)
    .slice(0, 5);
  i.length && (e.r = i);
  let o = Sf().prenom;
  return (
    o && Object.keys(e).length && (e.p = o.slice(0, 30)),
    Object.keys(e).length ? nx + N9(JSON.stringify(e)) : ""
  );
}
function M9(t) {
  try {
    let e = String(t || "")
      .trim()
      .replace(/^.*#transfert=/, "");
    if (!e.startsWith(nx)) return null;
    let n = JSON.parse(F9(e.slice(nx.length))),
      r = {
        c: D9(n.c) ? n.c : null,
        o: (Array.isArray(n.o) ? n.o : []).filter(Ec).slice(0, 10),
        m: Ec(n.m) ? n.m : null,
        r: (Array.isArray(n.r) ? n.r : []).filter(Ec).slice(0, 5),
        p: typeof n.p == "string" ? n.p.slice(0, 30) : "",
      };
    return r.c || r.o.length || r.m || r.r.length ? r : null;
  } catch {
    return null;
  }
}
async function importerTransfert(t) {
  let e = { carte: !1, cmds: 0, chat: !1 };
  if (t.c) {
    let s = await getDoc(doc2(db2, "clients", t.c));
    if (s.exists()) {
      let l = s.data();
      localStorage.setItem(
        USER_KEY,
        JSON.stringify({
          ref: t.c,
          code: l.code,
          nom: l.nom,
          points: l.points || 0,
          tampons: l.tampons || 0,
        }),
      ),
        (e.carte = !0);
    }
  }
  let n = Dn(),
    r = [];
  for (let s of t.o) {
    if (n.some((d) => d.ref === s)) continue;
    let l = await getDoc(doc2(db2, "commandes", s));
    if (!l.exists()) continue;
    let u = l.data();
    r.push({
      numero: u.numero,
      ref: s,
      date: u.date,
      mode: u.mode,
      total: u.total,
      resume: (u.lignes || []).map((d) => d.nom + " (" + d.personnes + " pers.)").join(", "),
      nom: u.nom,
      tel: u.tel,
      adresse: u.adresse,
      statut: u.statut,
      vu: u.statut,
    });
  }
  r.length &&
    ($a([...r, ...n].sort((s, l) => (l.date || "").localeCompare(s.date || ""))), (e.cmds = r.length));
  let i = ts(),
    o = [];
  for (let s of t.r || []) {
    if (i.some((d) => d.ref === s)) continue;
    let l = await getDoc(doc2(db2, "resas", s));
    if (!l.exists()) continue;
    let u = l.data();
    o.push({
      ref: s,
      numero: u.numero,
      titre: u.titre,
      qte: u.qte,
      total: u.total,
      retrait: u.retrait,
      nom: u.nom,
      tel: u.tel,
      cree: u.cree,
      statut: u.statut,
    });
  }
  if ((o.length && (rx([...o, ...i]), (e.cmds += o.length)), t.m)) {
    let s = await getDoc(doc2(db2, "conversations", t.m));
    s.exists() && (Tf({ ref: t.m, nom: s.data().nom, vu: Date.now() }), (e.chat = !0));
  }
  try {
    localStorage.setItem(BIENVENUE_KEY, "1"),
      t.p && localStorage.setItem(PRENOM_KEY, JSON.stringify({ prenom: t.p, demande: !0 }));
  } catch {}
  return e;
}
function FenetreEnvoi({ onClose: onClose }) {
  let e = (0, React.useMemo)(P9, []),
    n = location.origin + location.pathname + "#transfert=" + e,
    [copie, setCopie] = (0, React.useState)(!1);
  return React.default.createElement(
    "div",
    { className: "sheet-fond", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "sheet", onClick: (s) => s.stopPropagation() },
      React.default.createElement("h3", { className: "alerte-t" }, "Changer de t\xE9l\xE9phone"),
      e
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "p",
              { className: "tr-txt" },
              "Sur le ",
              React.default.createElement("b", null, "nouveau t\xE9l\xE9phone"),
              ", ouvrez l'appareil photo et scannez ce code : votre carte, vos commandes et vos messages seront r\xE9cup\xE9r\xE9s.",
            ),
            React.default.createElement(
              "div",
              { className: "tr-qr" },
              React.default.createElement(QR, { texte: n, taille: 230 }),
            ),
            React.default.createElement(
              "button",
              {
                className: "btn gh",
                onClick: async () => {
                  try {
                    await navigator.clipboard.writeText(n), setCopie(!0);
                  } catch {
                    h0(
                      `Copiez ce lien (appui long dessus) et envoyez-le-vous par SMS ou e-mail :

` + n,
                    );
                  }
                },
              },
              copie ? "\u2713 Lien copi\xE9" : "Copier le lien (\xE0 s'envoyer par SMS ou e-mail)",
            ),
            React.default.createElement(
              "div",
              { className: "tr-alerte" },
              "\u{1F512} Ce code donne acc\xE8s \xE0 votre carte, vos commandes et vos messages : ne le montrez \xE0 personne d'autre.",
            ),
          )
        : React.default.createElement(
            "p",
            { className: "tr-txt" },
            "Il n'y a rien \xE0 transf\xE9rer : pas encore de carte, de commande ni de message sur ce t\xE9l\xE9phone.",
          ),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 10 }, onClick: onClose },
        "Fermer",
      ),
    ),
  );
}
function FenetreReception({ code0: code0, onClose: onClose }) {
  let [txt, setTxt] = (0, React.useState)(code0 || ""),
    [etat, setEtat] = (0, React.useState)(""),
    s = M9(txt),
    l = async () => {
      if (s) {
        setEtat("\u2026");
        try {
          let u = await importerTransfert(s);
          if (!u.carte && !u.cmds && !u.chat)
            return setEtat(
              "Rien n'a \xE9t\xE9 trouv\xE9 : le code est peut-\xEAtre trop ancien (donn\xE9es supprim\xE9es par l'\xE9picerie).",
            );
          location.hash && history.replaceState(null, "", location.pathname), location.reload();
        } catch {
          setEtat("R\xE9cup\xE9ration impossible : v\xE9rifiez votre connexion et r\xE9essayez.");
        }
      }
    };
  return React.default.createElement(
    "div",
    { className: "sheet-fond", onClick: onClose },
    React.default.createElement(
      "div",
      { className: "sheet", onClick: (u) => u.stopPropagation() },
      React.default.createElement("h3", { className: "alerte-t" }, "R\xE9cup\xE9rer mes donn\xE9es"),
      code0 && s
        ? React.default.createElement(
            "p",
            { className: "tr-txt" },
            "Ce lien vient de votre ancien t\xE9l\xE9phone. On r\xE9cup\xE8re :",
            s.c &&
              React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("br", null),
                "\u2713 votre carte de fid\xE9lit\xE9",
              ),
            !!s.o.length &&
              React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("br", null),
                "\u2713 ",
                s.o.length,
                " commande",
                s.o.length > 1 ? "s" : "",
              ),
            s.m &&
              React.default.createElement(
                React.default.Fragment,
                null,
                React.default.createElement("br", null),
                "\u2713 vos messages avec l'\xE9picerie",
              ),
          )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "p",
              { className: "tr-txt" },
              "Sur l'",
              React.default.createElement("b", null, "ancien t\xE9l\xE9phone"),
              " : onglet Infos \u2192 \xAB Changer de t\xE9l\xE9phone \xBB \u2192 scannez le code avec l'appareil photo de celui-ci. Ou collez ici le lien que vous vous \xEAtes envoy\xE9 :",
            ),
            React.default.createElement("textarea", {
              className: "inp",
              rows: 3,
              value: txt,
              onChange: (u) => setTxt(u.target.value),
              placeholder: "Collez le lien ou le code de transfert",
            }),
            txt &&
              !s &&
              React.default.createElement("p", { className: "manque" }, "Ce code n'est pas reconnu."),
          ),
      etat && etat !== "\u2026" && React.default.createElement("p", { className: "manque" }, etat),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 10 }, disabled: !s || etat === "\u2026", onClick: l },
        etat === "\u2026" ? "R\xE9cup\xE9ration\u2026" : "R\xE9cup\xE9rer",
      ),
      React.default.createElement(
        "button",
        {
          className: "btn gh",
          style: { marginTop: 8 },
          onClick: () => {
            location.hash && history.replaceState(null, "", location.pathname), onClose();
          },
        },
        "Annuler",
      ),
    ),
  );
}
function MonPrenom({ prenom: prenom, onChange: onChange }) {
  let [ed, setEd] = (0, React.useState)(!1);
  return React.default.createElement(
    "div",
    { className: "card", style: { marginTop: 14 } },
    React.default.createElement(
      "div",
      { className: "b", style: { display: "flex", alignItems: "center", gap: 10 } },
      React.default.createElement(
        "div",
        { style: { flex: 1 } },
        React.default.createElement(
          "div",
          { style: { fontSize: 12, color: "var(--ink3)", fontWeight: 700 } },
          "Votre pr\xE9nom",
        ),
        React.default.createElement(
          "div",
          { style: { fontWeight: 800, fontSize: 15 } },
          prenom || "Non renseign\xE9",
        ),
      ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { width: "auto", padding: "9px 16px" }, onClick: () => setEd(!0) },
        prenom ? "Modifier" : "Ajouter",
      ),
      ed &&
        React.default.createElement(DemandePrenom, {
          initial: prenom,
          onFin: (i) => {
            (i || prenom) && onChange(i || prenom), setEd(!1);
          },
        }),
    ),
  );
}
function ChangerTelephone() {
  let [vue, setVue] = (0, React.useState)(null);
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "h3",
      { className: "h2", style: { marginTop: 18 } },
      React.default.createElement("i", null),
      "Changer de t\xE9l\xE9phone",
    ),
    React.default.createElement(
      "div",
      { className: "sub" },
      "Gardez votre carte, vos commandes et vos messages",
    ),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "b", style: { display: "flex", flexDirection: "column", gap: 8 } },
        React.default.createElement(
          "button",
          { className: "btn gh", onClick: () => setVue("envoi") },
          "\u{1F4E4} Transf\xE9rer vers un autre t\xE9l\xE9phone",
        ),
        React.default.createElement(
          "button",
          { className: "btn gh", onClick: () => setVue("reception") },
          "\u{1F4E5} R\xE9cup\xE9rer depuis mon ancien t\xE9l\xE9phone",
        ),
      ),
    ),
    vue === "envoi" && React.default.createElement(FenetreEnvoi, { onClose: () => setVue(null) }),
    vue === "reception" && React.default.createElement(FenetreReception, { onClose: () => setVue(null) }),
  );
}
var RESA_KEY = "epicerie-raddonnaise-resas",
  ts = () => {
    try {
      return JSON.parse(localStorage.getItem(RESA_KEY) || "[]");
    } catch {
      return [];
    }
  },
  rx = (t) => {
    try {
      localStorage.setItem(RESA_KEY, JSON.stringify(t.slice(0, 15)));
    } catch {}
  },
  fT = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789",
  z9 = () => {
    let t = new Uint32Array(5);
    return crypto.getRandomValues(t), "R-" + [...t].map((e) => fT[e % fT.length]).join("");
  },
  Ro = (t) => Math.max(0, (parseInt(t.stock) || 0) - (parseInt(t.reserves) || 0)),
  j9 = (t) => (parseInt(t.stock) || 0) > 0;
function useMesResas(t) {
  let [liste, setListe] = (0, React.useState)(ts),
    [live, setLive] = (0, React.useState)({});
  (0, React.useEffect)(() => {
    setListe(ts());
  }, [t]);
  let o = liste.filter((s) => s.ref && Date.now() - (s.cree || 0) < 4 * 864e5).map((s) => s.ref);
  return (
    (0, React.useEffect)(() => {
      let s = o.map((l) =>
        onSnapshot(
          doc2(db2, "resas", l),
          (u) =>
            setLive((d) => ({
              ...d,
              [l]: u.exists() ? u.data() : u.metadata?.fromCache ? d[l] : { statut: "annulee" },
            })),
          () => {},
        ),
      );
      return () => s.forEach((l) => l());
    }, [o.join()]),
    liste
      .filter((s) => o.includes(s.ref))
      .map((s) => (live[s.ref] ? { ...s, statut: live[s.ref].statut, conv: live[s.ref].conv || "" } : s))
  );
}
function MesResas({ resas: resas }) {
  let e = resas.filter((n) => n.statut === "reservee");
  return e.length
    ? e.map((n) =>
        React.default.createElement(
          "div",
          { className: "resa-suivi", key: n.numero },
          React.default.createElement("div", { className: "rs-ic" }, "\u{1F9FA}"),
          React.default.createElement(
            "div",
            { style: { minWidth: 0 } },
            React.default.createElement("b", null, "R\xE9serv\xE9 : ", n.qte, " \xD7 ", n.titre),
            React.default.createElement(
              "div",
              null,
              "\xC0 retirer ",
              n.retrait || "\xE0 l'\xE9picerie",
              " \xB7 N\xB0 ",
              n.numero,
              n.total > 0 ? " \xB7 " + ze(n.total) : "",
            ),
          ),
        ),
      )
    : null;
}
function Reserver({ i: t, d: e, prenom: prenom, onClose: onClose, onFait: onFait, inst: inst }) {
  let s = Math.min(10, Ro(t)),
    [qte, setQte] = (0, React.useState)(1),
    d = ts()[0] || {},
    [nom, setNom] = (0, React.useState)(prenom || d.nom || ""),
    [tel, setTel] = (0, React.useState)(d.tel || ""),
    [etat, setEtat] = (0, React.useState)(""),
    [fini, setFini] = (0, React.useState)(null),
    A = Number(t.prix) || 0;
  (0, React.useEffect)(() => {
    s > 0 && qte > s && (setQte(s), setEtat("Il n'en reste plus que " + s + " : quantit\xE9 ajust\xE9e."));
  }, [s]);
  let S = async () => {
    if (!nom.trim() || qte < 1 || etat === "envoi") return;
    if (qte > s) {
      setQte(Math.max(1, s)), setEtat("Il n'en reste plus que " + s + " : quantit\xE9 ajust\xE9e.");
      return;
    }
    setEtat("envoi");
    let P = {
        numero: z9(),
        cree: Date.now(),
        statut: "reservee",
        item: String(t.id),
        titre: String(t.titre).slice(0, 80),
        qte: qte,
        prix: A,
        total: Math.round(A * qte * 100) / 100,
        nom: nom.trim().slice(0, 40),
        tel: tel.trim().slice(0, 20),
        retrait: String(t.retrait || "").slice(0, 60),
      },
      z = writeBatch(db2),
      j = doc2(collection(db2, "resas")),
      b = q2(j);
    z.set(j, P), z.update(doc2(db2, "jour", String(t.id)), { reserves: increment2(qte), derniereResa: b });
    let y = () => {
      rx(ts().filter((N) => N.ref !== b)), Cf(b);
    };
    rx([
      {
        ref: b,
        numero: P.numero,
        titre: P.titre,
        qte: qte,
        total: P.total,
        retrait: P.retrait,
        nom: P.nom,
        tel: P.tel,
        cree: P.cree,
        statut: "reservee",
      },
      ...ts(),
    ]),
      ux("resa", b);
    let v = null,
      w = z.commit().catch((N) => {
        throw ((v = N), N);
      }),
      k = await sx(w);
    if (k === "erreur") {
      y(),
        setEtat(
          v?.code === "permission-denied"
            ? "D\xE9sol\xE9, il n'en reste plus assez : quelqu'un a \xE9t\xE9 plus rapide !"
            : "R\xE9servation impossible. V\xE9rifiez votre connexion et r\xE9essayez.",
        );
      return;
    }
    k === "ok" ? setTimeout(() => ns(e.cmd, "resa", b), 1200) : w.then(() => ns(e.cmd, "resa", b), y),
      setFini({ ...P, attente: k === "lent" }),
      onFait?.(),
      setTimeout(_c, 300),
      tn("reservations"),
      setEtat("");
  };
  return React.default.createElement(
    "div",
    { className: "sheet-fond", onClick: onClose },
    React.default.createElement(
      "div",
      {
        className: "sheet",
        onClick: (P) => P.stopPropagation(),
        role: "dialog",
        "aria-label": "R\xE9server " + t.titre,
      },
      fini
        ? React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement("div", { className: "ok-rond" }, "\u2713"),
            React.default.createElement("h3", { className: "alerte-t" }, "C'est r\xE9serv\xE9 !"),
            React.default.createElement(
              "p",
              { className: "tr-txt" },
              React.default.createElement("b", null, fini.qte, " \xD7 ", fini.titre),
              " mis de c\xF4t\xE9 pour vous.",
              React.default.createElement("br", null),
              "\xC0 retirer ",
              React.default.createElement("b", null, fini.retrait || "\xE0 l'\xE9picerie"),
              fini.total > 0 &&
                React.default.createElement(
                  React.default.Fragment,
                  null,
                  React.default.createElement("br", null),
                  "\xC0 r\xE9gler sur place : ",
                  ze(fini.total),
                ),
              React.default.createElement("br", null),
              React.default.createElement("small", null, "N\xB0 ", fini.numero),
            ),
            fini.attente &&
              React.default.createElement(
                "div",
                { className: "envoi-lent" },
                "\u{1F4F6} Connexion faible : la r\xE9servation partira d\xE8s que le r\xE9seau revient. Si l'article est parti entre-temps, elle dispara\xEEtra de votre accueil.",
              ),
            React.default.createElement("button", { className: "btn", onClick: onClose }, "Merci !"),
          )
        : React.default.createElement(
            React.default.Fragment,
            null,
            React.default.createElement(
              "div",
              { className: "sheet-hd" },
              t.photo && React.default.createElement("img", { src: t.photo, alt: "" }),
              React.default.createElement(
                "div",
                null,
                React.default.createElement("h3", null, t.titre),
                React.default.createElement(
                  "span",
                  null,
                  A > 0 ? ze(A) + (t.unite ? " / " + t.unite : "") : "",
                  t.ancienPrix && Number(t.ancienPrix) > A ? " au lieu de " + ze(t.ancienPrix) : "",
                ),
              ),
            ),
            t.note &&
              React.default.createElement(
                "p",
                { className: "tr-txt", style: { marginTop: 10, textAlign: "left" } },
                t.note,
              ),
            React.default.createElement(
              "div",
              { className: "resa-info" },
              "\u{1F552} \xC0 retirer ",
              React.default.createElement("b", null, t.retrait || "\xE0 l'\xE9picerie"),
              parseInt(t.stock) < 999 ? " \xB7 " + (s > 0 ? "plus que " + Ro(t) : "\xE9puis\xE9") : "",
            ),
            s > 0
              ? React.default.createElement(
                  React.default.Fragment,
                  null,
                  React.default.createElement(
                    "div",
                    { className: "lab", style: { textAlign: "center", marginTop: 12 } },
                    "Quantit\xE9",
                  ),
                  React.default.createElement(
                    "div",
                    { className: "pas" },
                    React.default.createElement(
                      "button",
                      {
                        onClick: () => setQte(Math.max(1, qte - 1)),
                        disabled: qte <= 1,
                        "aria-label": "Un de moins",
                      },
                      "\u2212",
                    ),
                    React.default.createElement("input", {
                      type: "number",
                      value: qte,
                      readOnly: !0,
                      "aria-label": "Quantit\xE9",
                    }),
                    React.default.createElement(
                      "button",
                      {
                        onClick: () => setQte(Math.min(s, qte + 1)),
                        disabled: qte >= s,
                        "aria-label": "Un de plus",
                      },
                      "+",
                    ),
                  ),
                  React.default.createElement(
                    "div",
                    { style: { display: "flex", gap: 8, marginTop: 6 } },
                    React.default.createElement("input", {
                      className: "inp",
                      value: nom,
                      maxLength: 40,
                      placeholder: "Votre nom",
                      onChange: (P) => setNom(P.target.value),
                    }),
                    React.default.createElement("input", {
                      className: "inp",
                      type: "tel",
                      value: tel,
                      maxLength: 20,
                      placeholder: "T\xE9l. (facultatif)",
                      onChange: (P) => setTel(P.target.value),
                    }),
                  ),
                  React.default.createElement(
                    "div",
                    { style: { marginTop: 10 } },
                    React.default.createElement(ConseilInstallCommande, {
                      inst: inst,
                      quoi: "votre r\xE9servation",
                    }),
                  ),
                  etat && etat !== "envoi" && React.default.createElement("p", { className: "manque" }, etat),
                  React.default.createElement(
                    "button",
                    {
                      className: "btn",
                      style: { marginTop: 12, background: "var(--terra)" },
                      disabled: !nom.trim() || etat === "envoi",
                      onClick: S,
                    },
                    etat === "envoi"
                      ? "R\xE9servation\u2026"
                      : "Je r\xE9serve" + (A > 0 ? " \u2014 " + ze(A * qte) : ""),
                  ),
                  React.default.createElement(
                    "p",
                    { className: "cal-info", style: { textAlign: "center" } },
                    "Paiement sur place. Pas venu \xE0 temps ? L'article est remis en vente.",
                  ),
                )
              : React.default.createElement(
                  "p",
                  { className: "manque", style: { textAlign: "center" } },
                  "Tout est parti, d\xE9sol\xE9 ! Revenez demain \u{1F609}",
                ),
            React.default.createElement(
              "button",
              { className: "btn gh", style: { marginTop: 8 }, onClick: onClose },
              "Fermer",
            ),
          ),
    ),
  );
}
var gx = "epicerie-raddonnaise-appareil",
  vx = () => {
    try {
      return JSON.parse(localStorage.getItem(gx) || "null");
    } catch {
      return null;
    }
  },
  W9 = () => {
    let t = new Uint32Array(24);
    return (
      crypto.getRandomValues(t),
      [...t].map((e) => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"[e % 56]).join("")
    );
  },
  refsSuivies = () => {
    let t = [];
    Dn().forEach((n) => n.ref && t.push(n.ref));
    let e = fx();
    e?.ref && t.push(e.ref);
    try {
      JSON.parse(localStorage.getItem("epicerie-raddonnaise-resas") || "[]").forEach(
        (n) => n.ref && t.push(n.ref),
      );
    } catch {}
    try {
      let n = JSON.parse(localStorage.getItem(USER_KEY) || "null");
      n?.ref && t.unshift(n.ref);
    } catch {}
    return [...new Set(t)].slice(0, 40);
  };
async function Q2(t, e) {
  let r = vx()?.id || W9();
  await setDoc(doc2(db2, "appareils", r), { token: t, refs: refsSuivies(), promo: !!e, maj: Date.now() });
  let i = { id: r, token: t, promo: !!e };
  try {
    localStorage.setItem(gx, JSON.stringify(i));
  } catch {}
  return i;
}
async function _c() {
  let t = vx();
  if (!(!t?.id || !t.token))
    try {
      await setDoc(doc2(db2, "appareils", t.id), {
        token: t.token,
        refs: refsSuivies(),
        promo: !!t.promo,
        maj: Date.now(),
      });
    } catch {}
}
var G9 = () =>
  /iPhone|iPad|iPod/.test(navigator.userAgent) &&
  !navigator.standalone &&
  !window.matchMedia("(display-mode: standalone)").matches;
function useNotifs(t) {
  let e = t.push?.vapid || "",
    [n, r] = (0, React.useState)("\u2026"),
    [i, o] = (0, React.useState)(vx);
  return (
    (0, React.useEffect)(() => {
      let d = !1;
      return (
        (async () => {
          if (!e) return r("indispo");
          if (G9()) return r("ios");
          if (!(await z2())) return r("indispo");
          if (Notification.permission === "denied") return r("refus");
          if (Notification.permission === "granted" && i?.id) {
            r("on");
            try {
              let h = await j2(e);
              !d && h.token && h.token !== i.token && o(await Q2(h.token, i.promo));
            } catch {}
          } else r("off");
        })(),
        () => {
          d = !0;
        }
      );
    }, [e]),
    {
      etat: n,
      app: i,
      activer: async (d) => {
        r("\u2026");
        try {
          let h = await j2(e);
          if (h.erreur) return r(h.erreur === "refus" ? "refus" : "indispo");
          o(await Q2(h.token, d)), r("on"), tn(d ? "notif_bonsplans" : "notif_on");
        } catch {
          r("off"), h0("Activation impossible pour le moment. R\xE9essayez plus tard.");
        }
      },
      bonsPlans: async (d) => {
        if (i?.token)
          try {
            o(await Q2(i.token, d));
          } catch {}
      },
      desactiver: async () => {
        try {
          i?.id && (await deleteDoc(doc2(db2, "appareils", i.id)));
        } catch {}
        try {
          localStorage.removeItem(gx);
        } catch {}
        o(null), r("off");
      },
      dispo: !!e,
    }
  );
}
function BlocNotifications({ n: t, compact: compact }) {
  let [n, r] = (0, React.useState)(!1);
  return !t.dispo || t.etat === "indispo" || t.etat === "\u2026" || (compact && t.etat !== "off")
    ? null
    : t.etat === "ios"
      ? compact
        ? null
        : React.default.createElement(
            "div",
            { className: "notif-bloc" },
            React.default.createElement("b", null, "\u{1F514} Notifications"),
            React.default.createElement(
              "p",
              null,
              "Sur iPhone, installez d'abord l'application sur votre \xE9cran d'accueil (bouton \xAB Installer \xBB), puis revenez ici pour activer les notifications.",
            ),
          )
      : t.etat === "refus"
        ? compact
          ? null
          : React.default.createElement(
              "div",
              { className: "notif-bloc" },
              React.default.createElement("b", null, "\u{1F514} Notifications bloqu\xE9es"),
              React.default.createElement(
                "p",
                null,
                "Vous les avez refus\xE9es. Pour les recevoir, autorisez les notifications pour ce site dans les r\xE9glages de votre t\xE9l\xE9phone.",
              ),
            )
        : t.etat === "on"
          ? React.default.createElement(
              "div",
              { className: "notif-bloc on" },
              React.default.createElement("b", null, "\u{1F514} Notifications activ\xE9es"),
              React.default.createElement(
                "p",
                null,
                "Vous \xEAtes pr\xE9venu quand votre commande est valid\xE9e ou pr\xEAte, et quand l'\xE9picerie vous r\xE9pond.",
              ),
              React.default.createElement(
                "label",
                { className: "accord", style: { marginTop: 6 } },
                React.default.createElement("input", {
                  type: "checkbox",
                  checked: !!t.app?.promo,
                  onChange: (i) => t.bonsPlans(i.target.checked),
                }),
                React.default.createElement(
                  "span",
                  null,
                  "Recevoir aussi les bons plans de l'\xE9picerie (arrivages, promos\u2026)",
                ),
              ),
              React.default.createElement(
                "button",
                { className: "lien", style: { marginTop: 8 }, onClick: t.desactiver },
                "D\xE9sactiver les notifications",
              ),
            )
          : React.default.createElement(
              "div",
              { className: "notif-bloc" + (compact ? " compact" : "") },
              React.default.createElement("b", null, "\u{1F514} \xCAtre pr\xE9venu sur mon t\xE9l\xE9phone"),
              !compact &&
                React.default.createElement(
                  "p",
                  null,
                  "Commande valid\xE9e, commande pr\xEAte, r\xE9ponse de l'\xE9picerie\u2026 m\xEAme quand l'application est ferm\xE9e.",
                ),
              React.default.createElement(
                "label",
                { className: "accord", style: { marginTop: 6 } },
                React.default.createElement("input", {
                  type: "checkbox",
                  checked: n,
                  onChange: (i) => r(i.target.checked),
                }),
                React.default.createElement(
                  "span",
                  null,
                  "Et les bons plans de l'\xE9picerie (arrivages, promos\u2026)",
                ),
              ),
              React.default.createElement(
                "button",
                { className: "btn", style: { marginTop: 8 }, onClick: () => t.activer(n) },
                "Activer les notifications",
              ),
            );
}
function PartagerAppli({ d: d }) {
  let e = location.origin + location.pathname,
    n =
      "Je te conseille l'appli de l'" +
      d.store.name +
      " : le frais du jour, les promos et les plateaux \xE0 commander \u{1F34F} ",
    [qr, setQr] = (0, React.useState)(!1);
  return React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(
      "h3",
      { className: "h2", style: { marginTop: 18 } },
      React.default.createElement("i", null),
      "Faites d\xE9couvrir l'appli",
    ),
    React.default.createElement("div", { className: "sub" }, "\xC0 vos voisins, \xE0 votre famille\u2026"),
    React.default.createElement(
      "div",
      { className: "card" },
      React.default.createElement(
        "div",
        { className: "b", style: { display: "flex", flexDirection: "column", gap: 8 } },
        React.default.createElement(
          "button",
          {
            className: "btn",
            onClick: async () => {
              if (navigator.share)
                try {
                  await navigator.share({ title: d.store.name, text: n, url: e });
                  return;
                } catch (s) {
                  if (s?.name === "AbortError") return;
                }
              window.open("https://wa.me/?text=" + encodeURIComponent(n + e), "_blank", "noopener");
            },
          },
          "\u{1F4E4} Partager l'application",
        ),
        React.default.createElement(
          "a",
          {
            className: "btn gh",
            style: { textDecoration: "none", textAlign: "center" },
            href: "https://wa.me/?text=" + encodeURIComponent(n + e),
            target: "_blank",
            rel: "noopener",
          },
          "Envoyer par WhatsApp",
        ),
        React.default.createElement(
          "button",
          { className: "btn gh", onClick: () => setQr(!qr) },
          qr ? "Masquer le QR code" : "Montrer le QR code \xE0 quelqu'un",
        ),
        qr &&
          React.default.createElement(
            "div",
            { className: "tr-qr" },
            React.default.createElement(QR, { texte: e, taille: 200 }),
          ),
      ),
    ),
  );
}
var ix = "epicerie-raddonnaise-panier",
  Q9 = () => {
    try {
      let t = JSON.parse(localStorage.getItem(ix) || "null");
      return t && Date.now() - t.t < 864e5 && Array.isArray(t.l) ? t.l : [];
    } catch {
      return [];
    }
  };
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
          nom: ge.nom + (ft.length ? " \u2014 " + ft.join(", ") : ""),
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
                z(!!y), C(!1);
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
        "\xC0 pr\xE9senter en caisse",
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
        "Touchez l'\xE9cran pour fermer",
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
    { id: "fidelite", label: "Fid\xE9lit\xE9", ic: Ic2.star, on: t.onglets?.fidelite !== !1 },
    { id: "actus", label: "Actus", ic: Ic2.news, on: t.actus.some(vn) },
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
          $r ? "Ouvert" : "Ferm\xE9",
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
        i: (t.jour?.items || []).find((K) => K.id === Gi.id) || Gi,
        d: t,
        prenom: y,
        inst: se,
        onClose: () => as(null),
        onFait: () => ss((K) => K + 1),
      }),
    X && React.default.createElement(FenetreReception, { code0: X, onClose: () => le(null) }),
    !X && !M && !y && !j.demande && !Zn && React.default.createElement(DemandePrenom, { onFin: b }),
    v &&
      !X &&
      React.default.createElement(Salutation, {
        prenom: y,
        amb: xe?.magie ? "noel" : Qe,
        onFin: () => z(!1),
      }),
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
                (await setDoc(doc2(db2, "clients", e.ref), { roueAJouer: arrayUnion(...K) }, { merge: !0 }));
            } catch {}
          },
          onRefus: async () => {
            d("");
            try {
              await setDoc(doc2(db2, "clients", e.ref), { roueNon: !0, roueAJouer: [] }, { merge: !0 });
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
      React.default.createElement(BulleChat, {
        nonLus: yn.nonLus,
        haut: qr.length > 0,
        onClick: () => {
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
      "Conception et r\xE9alisation Eric Tisserand",
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
            className: "tab" + (m === K.id ? " on" : ""),
            "aria-current": m === K.id ? "page" : void 0,
            onClick: () => {
              E(K.id), Ic((ge) => ge + 1);
              try {
                navigator.vibrate?.(8);
              } catch {}
              window.scrollTo(0, 0);
            },
          },
          React.default.createElement(
            "span",
            { className: "pastille" },
            K.ic(21, "currentColor"),
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
(0, ReactDOMClient.createRoot)(document.getElementById("root")).render(
  React.default.createElement(
    React.default.Fragment,
    null,
    React.default.createElement(Y9, null),
    React.default.createElement(App, null),
  ),
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
