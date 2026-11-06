/* ═══════════════════════════════════════════════════════════════════════
 *  TAMPONS — créditer la carte du client.
 * ═══════════════════════════════════════════════════════════════════════ */

// ── Points : incrément atomique + trace dans l'historique (comme l'administration) ──
async function crediter(t, e) {
  let n = writeBatch(db),
    r = doc2(db, "clients", String(t.id));
  n.update(r, { points: increment(e), derniere: new Date().toLocaleDateString("sv-SE") }),
    n.set(doc2(collection(db, "clients", String(t.id), "historique")), {
      date: Date.now(),
      points: e,
      type: "achat",
      source: "caisse",
    }),
    await n.commit();
}

// Sons de la caisse : réglage (activé / coupé) et haut-parleur.
var dv = "epicerie-raddonnaise-caisse-son",
  sl,
  ME = (() => {
    try {
      return localStorage.getItem(dv) !== "off";
    } catch {
      return !0;
    }
  })(),
  hv = () => {
    try {
      navigator.audioSession && (navigator.audioSession.type = "playback");
    } catch {}
    return (
      (sl = sl || new (window.AudioContext || window.webkitAudioContext)()),
      sl.state === "suspended" && sl.resume().catch(() => {}),
      sl
    );
  };

// Débloque le son au premier toucher (exigence de l'iPad).
if (typeof window < "u") {
  let t = () => {
    try {
      let e = hv(),
        n = e.createOscillator(),
        r = e.createGain();
      (r.gain.value = 1e-4), n.connect(r).connect(e.destination), n.start(), n.stop(e.currentTime + 0.02);
    } catch {}
  };
  ["pointerdown", "touchend", "keydown"].forEach((e) =>
    window.addEventListener(e, t, { once: !0, passive: !0 }),
  );
}

// Joue une note (sons de la caisse).
function Ws(t, e, n, r, i = 0.3, o = "sine") {
  let s = t.createOscillator(),
    a = t.createGain();
  (s.type = o),
    (s.frequency.value = e),
    a.gain.setValueAtTime(1e-4, n),
    a.gain.exponentialRampToValueAtTime(i, n + 0.012),
    a.gain.exponentialRampToValueAtTime(1e-4, n + r),
    s.connect(a).connect(t.destination),
    s.start(n),
    s.stop(n + r + 0.02);
}

// Petit dessin d'un tampon (plein / vide).
function IconeTampon(t = "tampon") {
  if (ME)
    try {
      let e = hv(),
        n = e.currentTime + 0.02;
      if (t === "refus") {
        Ws(e, 330, n, 0.18, 0.25, "triangle"), Ws(e, 247, n + 0.2, 0.3, 0.25, "triangle");
        return;
      }
      if (t === "tampon") {
        Ws(e, 1320, n, 0.12), Ws(e, 1760, n + 0.1, 0.2, 0.22);
        return;
      }
      let r = t === "plein" ? [784, 988, 1175, 1568, 1175, 1568, 2093] : [880, 1109, 1319, 1760];
      r.forEach((i, o) => Ws(e, i, n + o * 0.11, 0.22, 0.28, "triangle")),
        Ws(e, r[r.length - 1] / 2, n + r.length * 0.11, 0.6, 0.2);
    } catch {}
}

// Bouton pour couper / remettre le son.
function Ik() {
  let [t, e] = (0, React.useState)(ME);
  return React.default.createElement(
    "span",
    { className: "son" },
    React.default.createElement(
      "button",
      {
        className: "lien",
        onClick: () => {
          let r = !t;
          e(r), (ME = r);
          try {
            localStorage.setItem(dv, r ? "on" : "off");
          } catch {}
          r && IconeTampon("tampon");
        },
      },
      t ? "🔊 Son activé" : "🔇 Son coupé",
    ),
    t &&
      React.default.createElement(
        "button",
        { className: "lien", onClick: () => IconeTampon("palier") },
        "Tester",
      ),
  );
}
