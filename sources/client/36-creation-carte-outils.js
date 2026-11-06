/* ═══════════════════════════════════════════════════════════════════════
 *  CRÉATION DE LA CARTE — mise en forme des noms et téléphones, contrôles, choix de l'anniversaire.
 * ═══════════════════════════════════════════════════════════════════════ */

// Met les noms en forme (« charline menigoz » → « Charline Menigoz ») et les téléphones (« +33 6… » → « 06 … »).
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

// Contrôles du téléphone et de l'e-mail ; noms des mois.
var telValide = (t) =>
    /^(\+33\s?|0)[1-9](\s?\.?-?\d{2}){4}$/.test(String(t || "").trim()) ||
    String(t || "").replace(/\D/g, "").length === 10,
  emailValide = (t) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(t || "").trim()),
  AT = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ],
  u9 = (t) => (/^\d\d-\d\d$/.test(t || "") ? +t.slice(3) + " " + AT[+t.slice(0, 2) - 1] : ""),
  c9 = (t, e = new Date()) => {
    let n = e.getMonth() + 1,
      r = e.getDate(),
      i = String(n).padStart(2, "0") + "-" + String(r).padStart(2, "0"),
      o = new Date(e.getFullYear(), 1, 29).getMonth() === 1;
    return !!t && (t === i || (t === "02-29" && i === "02-28" && !o));
  };

// Choix du jour et du mois d'anniversaire.
function ChoixAnniversaire({ j, m, setJ, setM }) {
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
