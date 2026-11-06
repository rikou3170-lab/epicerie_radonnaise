/* ═══════════════════════════════════════════════════════════════════════
 *  SCANNER — lecture du QR code de la carte avec la caméra.
 * ═══════════════════════════════════════════════════════════════════════ */

// Caméra choisie pour le scan (avant / arrière), gardée sur l'iPad.
var cv = "epicerie-raddonnaise-caisse-camera",
  _k = () => {
    try {
      return localStorage.getItem(cv) === "user" ? "user" : "environment";
    } catch {
      return "environment";
    }
  };

// ── Scanner de QR code (appareil photo) ──
function Scanner({ onCode, cam = "environment" }) {
  let n = (0, React.useRef)(null),
    [etat, setEtat] = (0, React.useState)("demarrage"),
    o = (0, React.useRef)(onCode);
  return (
    (o.current = onCode),
    (0, React.useEffect)(() => {
      let s,
        a = !1,
        u,
        c = document.createElement("canvas"),
        d = c.getContext("2d", { willReadFrequently: !0 }),
        f = () => {
          if (a) return;
          let h = n.current;
          if (h && h.readyState >= 2 && h.videoWidth) {
            let _ = Math.round((h.videoHeight * 480) / h.videoWidth);
            (c.width = 480), (c.height = _), d.drawImage(h, 0, 0, 480, _);
            let b = (0, jsQR.default)(d.getImageData(0, 0, 480, _).data, 480, _, {
                inversionAttempts: "dontInvert",
              }),
              O = b && Fk.exec((b.data || "").toUpperCase());
            if (O) {
              a = !0;
              try {
                navigator.vibrate?.(80);
              } catch {}
              o.current(O[0]);
              return;
            }
          }
          u = setTimeout(f, 140);
        };
      return (
        (async () => {
          if (!navigator.mediaDevices?.getUserMedia) return setEtat("indispo");
          try {
            if (
              ((s = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: cam }, width: { ideal: 1280 } },
                audio: !1,
              })),
              a)
            )
              return s.getTracks().forEach((h) => h.stop());
            (n.current.srcObject = s), await n.current.play().catch(() => {}), setEtat("actif"), f();
          } catch (h) {
            setEtat(h?.name === "NotAllowedError" ? "refus" : "indispo");
          }
        })(),
        () => {
          (a = !0), clearTimeout(u), s?.getTracks().forEach((h) => h.stop());
        }
      );
    }, []),
    React.default.createElement(
      "div",
      { className: "cam" },
      React.default.createElement("video", {
        ref: n,
        playsInline: !0,
        muted: !0,
        style: cam === "user" ? { transform: "scaleX(-1)" } : void 0,
      }),
      etat === "actif" &&
        React.default.createElement(
          React.default.Fragment,
          null,
          React.default.createElement("div", { className: "cadre" }),
          React.default.createElement("div", { className: "ligne" }),
        ),
      etat !== "actif" &&
        React.default.createElement(
          "div",
          { className: "msg" },
          etat === "demarrage" && "Ouverture de l'appareil photo…",
          etat === "refus" &&
            React.default.createElement(
              React.default.Fragment,
              null,
              "📷",
              React.default.createElement(
                "span",
                null,
                "L'accès à l'appareil photo a été refusé.",
                React.default.createElement("br", null),
                "Autorisez-le dans les réglages du navigateur, ou cherchez le client ci-dessous.",
              ),
            ),
          etat === "indispo" &&
            React.default.createElement(
              React.default.Fragment,
              null,
              "📷",
              React.default.createElement(
                "span",
                null,
                "Appareil photo indisponible sur cet appareil.",
                React.default.createElement("br", null),
                "Cherchez le client ci-dessous (nom, téléphone ou code).",
              ),
            ),
        ),
    )
  );
}
