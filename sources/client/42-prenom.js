/* ═══════════════════════════════════════════════════════════════════════
 *  PRÉNOM (reste uniquement sur le téléphone) et préparation du transfert vers un nouveau téléphone.
 * ═══════════════════════════════════════════════════════════════════════ */

// Prénom gardé sur le téléphone (lecture).
var PRENOM_KEY = "epicerie-raddonnaise-prenom",
  Sf = () => {
    try {
      return JSON.parse(localStorage.getItem(PRENOM_KEY) || "null") || {};
    } catch {
      return {};
    }
  };

// Prénom gardé sur le téléphone (lecture / modification).
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

// Demande du prénom (facultatif, reste sur le téléphone).
function DemandePrenom({ initial, onFin }) {
  let [p, setP] = (0, React.useState)(initial || "");
  return React.default.createElement(
    "div",
    { className: "sheet-fond" },
    React.default.createElement(
      "div",
      { className: "sheet", role: "dialog", "aria-label": "Votre prénom" },
      React.default.createElement("div", { className: "pr-main" }, "👋"),
      React.default.createElement("h3", { className: "alerte-t" }, "On fait connaissance ?"),
      React.default.createElement(
        "p",
        { className: "tr-txt" },
        "Comment vous appelez-vous ? L'application vous dira bonjour à chaque visite.",
        React.default.createElement("br", null),
        React.default.createElement("small", null, "Votre prénom reste sur votre téléphone."),
      ),
      React.default.createElement("input", {
        className: "inp",
        value: p,
        maxLength: 30,
        placeholder: "Votre prénom",
        autoComplete: "given-name",
        onChange: (i) => setP(i.target.value),
        onKeyDown: (i) => i.key === "Enter" && p.trim() && onFin(p),
        style: { textAlign: "center", fontSize: 18, fontWeight: 800 },
      }),
      React.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 12 }, disabled: !p.trim(), onClick: () => onFin(p) },
        "C'est noté !",
      ),
      React.default.createElement(
        "button",
        { className: "btn gh", style: { marginTop: 8 }, onClick: () => onFin("") },
        "Plus tard",
      ),
    ),
  );
}

// Transfert vers un nouveau téléphone : codage du lien.
var nx = "ERT1.",
  N9 = (t) =>
    btoa(unescape(encodeURIComponent(t)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, ""),
  F9 = (t) => decodeURIComponent(escape(atob(t.replace(/-/g, "+").replace(/_/g, "/")))),
  Ec = (t) => typeof t == "string" && /^[A-Za-z0-9]{15,40}$/.test(t),
  D9 = (t) => typeof t == "string" && /^[A-Za-z0-9]{12,40}$/.test(t);

// Prépare le lien de transfert (carte, commandes, conversation).
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

// Lit un lien de transfert reçu.
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
