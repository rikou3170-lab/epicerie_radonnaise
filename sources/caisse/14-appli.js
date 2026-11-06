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
var yi = (t) => String(t?.nom || t?.prenom || "").trim() || "Client",
  yk = (t) => {
    let e = [...t];
    for (let n = e.length - 1; n > 0; n--) {
      let r = Math.floor(bE() * (n + 1));
      [e[n], e[r]] = [e[r], e[n]];
    }
    return e;
  };
function ov({ participants: t, gagnant: e, onFin: n }) {
  let [i, o] = (0, wt.useState)(0),
    [s, a] = (0, wt.useState)(!1),
    u = (0, wt.useRef)(null);
  if (!u.current) {
    let c = [];
    for (let h = 0; h < 3 || c.length < 40; h++) c.push(...yk(t).map(yi));
    let d = yi(e),
      f = c.length - 1;
    if (c[f] === d) {
      let h = c
        .slice(0, f)
        .map((B, _) => (B !== d ? _ : -1))
        .filter((B) => B >= f - 6)
        .pop();
      h != null && h >= 0 && ([c[f], c[h]] = [c[h], c[f]]);
    }
    (c.push(d, "", ""), (u.current = c));
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
          (k !== B && ((B = k), gk(0.8)), C < 1 ? (_ = requestAnimationFrame(b)) : (a(!0), Ak(!0), n?.()));
        };
      return ((_ = requestAnimationFrame(b)), () => cancelAnimationFrame(_));
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
      s && wt.default.createElement("div", { className: "tir-gagnant" }, "Bravo ", yi(e), " !"),
    )
  );
}
var Fk = /RAD-[A-Z0-9]{5}/;
var Bk = `
.niv-b{display:inline-block;margin-left:10px;padding:3px 12px;border-radius:20px;background:#FFF4D6;color:#8A5A0B;border:1.5px solid #E9B949;font-size:15px;font-weight:800;vertical-align:middle}
.tir-annonce{display:flex;flex-direction:column;align-items:center;text-align:center;gap:8px;max-width:640px;margin:10px auto 0;animation:tirIn .5s ease both}
.tir-annonce p{margin:0;font-size:20px;line-height:1.45;color:var(--ink)}
.tir-att{font-family:var(--script);font-size:54px;line-height:1.1;color:#A61E2F}
.tir-dec{font-family:var(--script);font-size:150px;line-height:1;color:#B8860B;animation:tirDec 1s ease both}
@keyframes tirIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
@keyframes tirDec{0%{opacity:0;transform:scale(2.2)}25%{opacity:1;transform:scale(1)}80%{opacity:1}100%{opacity:0;transform:scale(.7)}}
.roue-l{margin-top:10px;padding:10px 16px;border-radius:14px;font-size:16px;font-weight:700;text-align:center}
.roue-l.g{background:#E3F4DC;color:#1F6B2B;border:2px solid #3E8E3A}
.roue-l.p{background:#FBE7E9;color:#A61E2F}
.tir-liste{width:100%;max-width:520px;max-height:38vh;overflow-y:auto;background:#fff;border:1px solid var(--line);border-radius:14px;margin-top:10px}
.tir-liste div{display:flex;justify-content:space-between;padding:9px 14px;border-bottom:1px solid var(--line);font-size:15px}
.tir-liste div:last-child{border-bottom:none}
:root{--bg:#F7F3EA;--forest:#1C433B;--apple:#6E9B3A;--apple-soft:#EEF3E2;--terra:#C27B42;--gold:#C69A3C;--red:#C86B5C;
 --ink:#22302A;--ink2:#5C6A62;--ink3:#93A099;--line:#E6E0D2;--script:'Sacramento',cursive;--body:'Nunito',system-ui,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg)}
.cs{min-height:100vh;min-height:100dvh;font-family:var(--body);color:var(--ink);display:flex;flex-direction:column;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}
.cs-top{position:relative;display:flex;align-items:center;gap:10px;padding:10px 16px;padding-top:calc(10px + env(safe-area-inset-top));background:var(--top,var(--forest));color:#fff;transition:background .4s}
.cs .guirlande,.cs .frise-theme,.cs .amb-guirl{position:relative;top:0}
.cs-top img{width:36px;height:36px;border-radius:50%;border:2px solid rgba(255,255,255,.85)}
.cs-top h1{font-family:var(--script);font-weight:400;font-size:26px;line-height:1}
.cs-top small{display:block;font-size:9px;letter-spacing:1px;text-transform:uppercase;opacity:.65}
.cs-top small .vers{display:inline-block;margin-left:6px;padding:2px 8px;border-radius:9px;background:rgba(255,255,255,.22);font-size:12.5px;font-weight:800;letter-spacing:.3px;text-transform:none;vertical-align:1px}
.cs-top button{margin-left:auto;background:rgba(255,255,255,.14);border:none;color:#fff;font-family:var(--body);font-size:11px;font-weight:800;padding:7px 12px;border-radius:20px;cursor:pointer}
.cs-main{flex:1;display:flex;flex-direction:column;align-items:center;padding:18px 16px calc(18px + env(safe-area-inset-bottom));width:100%;max-width:520px;margin:0 auto}
.titre{font-family:var(--script);font-size:36px;color:var(--forest);line-height:1;text-align:center;margin-bottom:4px}
.sous{font-size:13px;color:var(--ink3);text-align:center;margin-bottom:14px}
.cam{position:relative;width:100%;aspect-ratio:1;max-width:420px;border-radius:24px;overflow:hidden;background:#111;box-shadow:0 10px 30px rgba(28,67,59,.25)}
.cam video{width:100%;height:100%;object-fit:cover;display:block}
.cam .cadre{position:absolute;inset:16%;border-radius:20px;box-shadow:0 0 0 999px rgba(0,0,0,.35)}
.cam .cadre:before,.cam .cadre:after{content:"";position:absolute;inset:0;border-radius:20px;border:4px solid #A9C75A;clip-path:polygon(0 0,28% 0,28% 6%,6% 6%,6% 28%,0 28%,0 72%,6% 72%,6% 94%,28% 94%,28% 100%,72% 100%,72% 94%,94% 94%,94% 72%,100% 72%,100% 28%,94% 28%,94% 6%,72% 6%,72% 0,100% 0,100% 100%,0 100%)}
.cam .ligne{position:absolute;left:18%;right:18%;height:3px;border-radius:3px;background:#A9C75A;box-shadow:0 0 12px #A9C75A;animation:balaye 2.2s ease-in-out infinite}
@keyframes balaye{0%,100%{top:20%}50%{top:78%}}
.cam .msg{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:#fff;text-align:center;padding:24px;font-size:14px;font-weight:700;line-height:1.45}
.btn{width:100%;padding:16px;border:none;border-radius:16px;font-family:var(--body);font-size:16px;font-weight:800;cursor:pointer;background:var(--apple);color:#fff}
.btn:disabled{background:#DDD8CC}
.btn.gh{background:#fff;border:1.5px solid var(--line);color:var(--ink2)}
.btn.terra{background:var(--terra)}
.btn:active{transform:scale(.985)}
.saisie{display:flex;gap:8px;width:100%;max-width:420px;margin-top:14px}
.inp{flex:1;min-width:0;border:1.5px solid var(--line);border-radius:14px;padding:14px;font-family:var(--body);font-size:18px;font-weight:800;letter-spacing:2px;text-transform:uppercase;text-align:center;background:#fff;color:var(--ink);outline:none}
.inp:focus{border-color:var(--apple)}
.saisie .btn{width:auto;padding:14px 20px}
.err{margin-top:10px;color:#B2563F;font-size:13px;font-weight:800;text-align:center}
.fiche{width:100%;background:#fff;border:1px solid var(--line);border-radius:22px;padding:16px 18px;display:flex;align-items:center;gap:14px}
.fiche .av{width:54px;height:54px;border-radius:50%;background:var(--apple-soft);color:var(--forest);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;flex-shrink:0}
.fiche .nm{font-size:19px;font-weight:800;line-height:1.15}
.fiche .cd{font-size:12px;color:var(--ink3);letter-spacing:1px;margin-top:2px}
.fiche .pt{margin-left:auto;text-align:center}
.fiche .pt b{display:block;font-size:30px;color:var(--gold);line-height:1}
.fiche .pt span{font-size:10px;color:var(--ink3);font-weight:700}
.palier{width:100%;margin-top:8px;font-size:12.5px;font-weight:700;color:var(--gold);text-align:center}
.barre{height:8px;border-radius:5px;background:#EFE9DC;overflow:hidden;margin-top:6px}
.barre i{display:block;height:100%;background:var(--gold);border-radius:5px}
.ecran{width:100%;margin:16px 0 10px;text-align:center;background:#fff;border:2px solid var(--line);border-radius:20px;padding:14px}
.ecran .m{font-size:42px;font-weight:800;color:var(--forest);line-height:1.1;min-height:46px}
.ecran .p{font-size:15px;font-weight:800;color:var(--apple);margin-top:4px}
.pave{width:100%;display:grid;grid-template-columns:repeat(3,1fr);gap:9px}
.pave button{height:62px;border-radius:16px;border:1.5px solid var(--line);background:#fff;font-family:var(--body);font-size:26px;font-weight:800;color:var(--ink);cursor:pointer}
.pave button:active{background:var(--apple-soft)}
.actions{display:flex;gap:9px;width:100%;margin-top:12px}
.actions .gh{flex:0 0 34%}
.ok{width:100%;text-align:center;padding-top:16px}
.ok .rond{width:110px;height:110px;border-radius:50%;background:var(--apple);color:#fff;font-size:58px;font-weight:800;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;animation:pop .35s cubic-bezier(.3,1.6,.6,1)}
@keyframes pop{from{transform:scale(.4);opacity:0}}
.ok .plus{font-size:44px;font-weight:800;color:var(--apple);line-height:1}
.ok .tot{font-size:16px;color:var(--ink2);margin-top:8px}
.ok .tot b{color:var(--gold);font-size:20px}
.cadeau{margin:16px 0 4px;background:#FAF2DC;border:1.5px solid #EBD9A8;border-radius:16px;padding:12px 14px;font-size:15px;font-weight:800;color:#8A6A1C}
.compte{margin-top:14px;font-size:12px;color:var(--ink3)}
.login{width:100%;max-width:380px;margin-top:10vh}
.login label{display:block;font-size:12px;font-weight:800;color:var(--ink3);margin:12px 2px 5px}
.login input{width:100%;border:1.5px solid var(--line);border-radius:14px;padding:14px;font-family:var(--body);font-size:16px;background:#fff;outline:none}
.lien{border:none;background:none;color:var(--ink3);font-family:var(--body);font-size:12.5px;font-weight:700;text-decoration:underline;cursor:pointer;margin-top:12px}
.mult{display:flex;gap:8px;width:100%;max-width:420px;margin-top:14px}
.mult button{flex:1;height:54px;border-radius:16px;border:2px solid var(--line);background:#fff;font-family:var(--body);font-size:20px;font-weight:800;color:var(--ink2);cursor:pointer}
.mult button.on{border-color:var(--apple);background:var(--apple-soft);color:var(--forest)}
.mini-t{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin:16px auto 0;max-width:330px}
.mini-t i{width:26px;height:26px;border-radius:50%;border:2px dashed #D8D2C2;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:15px}
.mini-t i.on{border:2px solid var(--apple);background:var(--apple-soft)}
.inp.nom{text-transform:none;letter-spacing:0;font-size:17px;text-align:left;padding-left:16px}
.cherche-t{width:100%;max-width:420px;margin-top:16px;font-size:15px;font-weight:800;color:var(--forest)}
@media (min-width:700px){.cherche-t{font-size:18px}}
.resultats{width:100%;max-width:420px;margin-top:8px;background:#fff;border:1.5px solid var(--line);border-radius:16px;overflow:hidden}
.res-l{display:flex;border-bottom:1px solid var(--line)}
.res-l:last-child{border-bottom:none}
.res-l button{border-bottom:none!important}
.res-l .res-f{flex:0 0 58px;justify-content:center;border-left:1px solid var(--line)!important;font-size:20px}
.fiche-fond{position:fixed;inset:0;z-index:300;background:rgba(20,32,26,.5);display:flex;align-items:center;justify-content:center;padding:18px}
.fiche-in{background:var(--bg);border-radius:24px;width:100%;max-width:640px;max-height:92vh;overflow-y:auto;padding:20px 22px}
.fiche-hd{display:flex;align-items:flex-start;gap:10px;margin-bottom:6px}
.fiche-x{margin-left:auto;border:none;background:#fff;border-radius:50%;width:42px;height:42px;font-size:18px;cursor:pointer;flex-shrink:0}
.fiche-g{display:grid;grid-template-columns:1fr 1fr;gap:4px 14px}
.fiche-g .inp{width:100%}
@media (max-width:520px){.fiche-g{grid-template-columns:1fr}}
.lab{display:block;font-size:12px;font-weight:800;color:var(--ink3);margin:12px 2px 5px}
/* iPad en portrait : on demande de tourner l'\xE9cran (la caisse est pr\xE9vue en paysage) */
.tourner{display:none}
@media (orientation:portrait) and (min-width:700px){
  .tourner{display:flex;position:fixed;inset:0;z-index:2147483000;background:var(--forest);color:#fff;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center;padding:30px;font-family:var(--body)}
  .tourner .ic{font-size:90px;animation:tourne 2s ease-in-out infinite}
  .tourner b{font-size:28px}
}
@keyframes tourne{0%,30%{transform:rotate(0)}60%,100%{transform:rotate(-90deg)}}
.resultats button{display:flex;align-items:center;gap:10px;width:100%;padding:13px 14px;border:none;border-bottom:1px solid var(--line);background:#fff;font-family:var(--body);text-align:left;cursor:pointer}
.resultats button:last-child{border-bottom:none}
.resultats button:active{background:var(--apple-soft)}
.resultats b{font-size:16px;color:var(--ink)}
.resultats span{flex:1;font-size:12px;color:var(--ink3)}
.resultats i{font-style:normal;font-weight:800;color:var(--gold)}
.resultats .vide{padding:14px;text-align:center;color:var(--ink3);font-size:13px}
.regle{margin-top:12px;font-size:12px;color:var(--ink3);text-align:center;line-height:1.45}
.outils-cam{display:flex;gap:18px;justify-content:center;flex-wrap:wrap;align-items:center}
.son{display:inline-flex;gap:10px}
.col-cam,.col-cmd{width:100%;display:flex;flex-direction:column;align-items:center}
/* iPad / tablette : grands boutons, cam\xE9ra \xE0 gauche et recherche \xE0 droite en paysage */
@media (min-width:700px){
  .cs-main{max-width:760px;padding-top:24px}
  .titre{font-size:46px}
  .sous{font-size:15px}
  .cam{max-width:480px}
  .mult button{height:66px;font-size:24px}
  .inp.nom{font-size:20px;padding:18px}
  .resultats button{padding:17px 18px}.resultats b{font-size:19px}.resultats span{font-size:14px}.resultats i{font-size:17px}
  .btn{padding:20px;font-size:19px}
  .ok .rond{width:150px;height:150px;font-size:76px}
  .ok .plus{font-size:60px}
  .ok .tot{font-size:20px}.ok .tot b{font-size:26px}
  .mini-t{max-width:430px;gap:8px}.mini-t i{width:34px;height:34px;font-size:19px}
  .cadeau{font-size:19px;padding:16px 18px}
  .regle{font-size:13.5px}
}
@media (min-width:900px) and (orientation:landscape){
  .cs-main.tab2{max-width:1180px;flex-direction:row;align-items:flex-start;gap:36px}
  .cs-main.tab2 .col-cam{flex:1.1}
  .cs-main.tab2 .col-cmd{flex:1;padding-top:70px}
  .cs-main.tab2 .mult,.cs-main.tab2 .saisie,.cs-main.tab2 .resultats{max-width:none}
}
@media (min-width:820px) and (orientation:landscape){
  .cs-main.large{max-width:1000px;flex-direction:row;align-items:flex-start;gap:28px}
  .cs-main.large .col{flex:1}
}
`,
  Dk = "logo.jpg";
function wk() {
  let [t, e] = (0, y.useState)(""),
    [n, r] = (0, y.useState)(""),
    [i, o] = (0, y.useState)(""),
    s = async () => {
      o("");
      try {
        await jx(el, t.trim(), n);
      } catch (a) {
        o(
          a?.code === "auth/too-many-requests"
            ? "Trop d'essais : r\xE9essayez dans quelques minutes."
            : "E-mail ou mot de passe incorrect.",
        );
      }
    };
  return y.default.createElement(
    "div",
    { className: "cs-main" },
    y.default.createElement(
      "div",
      { className: "login" },
      y.default.createElement("div", { className: "titre" }, "Caisse"),
      y.default.createElement(
        "div",
        { className: "sous" },
        "Connectez-vous avec le compte de l'administration.",
      ),
      y.default.createElement("label", null, "E-mail"),
      y.default.createElement("input", {
        type: "email",
        autoComplete: "username",
        value: t,
        onChange: (a) => e(a.target.value),
      }),
      y.default.createElement("label", null, "Mot de passe"),
      y.default.createElement("input", {
        type: "password",
        autoComplete: "current-password",
        value: n,
        onChange: (a) => r(a.target.value),
        onKeyDown: (a) => a.key === "Enter" && s(),
      }),
      i && y.default.createElement("div", { className: "err" }, i),
      y.default.createElement(
        "button",
        { className: "btn", style: { marginTop: 18 }, onClick: s },
        "Se connecter",
      ),
      y.default.createElement(
        "button",
        {
          className: "lien",
          onClick: async () => {
            if (!t.trim()) return o("Saisissez d'abord votre e-mail.");
            try {
              (await Rx(el, t.trim()), o("E-mail de r\xE9initialisation envoy\xE9."));
            } catch {
              o("Envoi impossible.");
            }
          },
        },
        "Mot de passe oubli\xE9 ?",
      ),
    ),
  );
}
var cv = "epicerie-raddonnaise-caisse-camera",
  _k = () => {
    try {
      return localStorage.getItem(cv) === "user" ? "user" : "environment";
    } catch {
      return "environment";
    }
  };
function xv({ onCode: t, cam: e = "environment" }) {
  let n = (0, y.useRef)(null),
    [r, i] = (0, y.useState)("demarrage"),
    o = (0, y.useRef)(t);
  return (
    (o.current = t),
    (0, y.useEffect)(() => {
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
            ((c.width = 480), (c.height = _), d.drawImage(h, 0, 0, 480, _));
            let b = (0, uv.default)(d.getImageData(0, 0, 480, _).data, 480, _, {
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
          if (!navigator.mediaDevices?.getUserMedia) return i("indispo");
          try {
            if (
              ((s = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { ideal: e }, width: { ideal: 1280 } },
                audio: !1,
              })),
              a)
            )
              return s.getTracks().forEach((h) => h.stop());
            ((n.current.srcObject = s), await n.current.play().catch(() => {}), i("actif"), f());
          } catch (h) {
            i(h?.name === "NotAllowedError" ? "refus" : "indispo");
          }
        })(),
        () => {
          ((a = !0), clearTimeout(u), s?.getTracks().forEach((h) => h.stop()));
        }
      );
    }, []),
    y.default.createElement(
      "div",
      { className: "cam" },
      y.default.createElement("video", {
        ref: n,
        playsInline: !0,
        muted: !0,
        style: e === "user" ? { transform: "scaleX(-1)" } : void 0,
      }),
      r === "actif" &&
        y.default.createElement(
          y.default.Fragment,
          null,
          y.default.createElement("div", { className: "cadre" }),
          y.default.createElement("div", { className: "ligne" }),
        ),
      r !== "actif" &&
        y.default.createElement(
          "div",
          { className: "msg" },
          r === "demarrage" && "Ouverture de l'appareil photo\u2026",
          r === "refus" &&
            y.default.createElement(
              y.default.Fragment,
              null,
              "\u{1F4F7}",
              y.default.createElement(
                "span",
                null,
                "L'acc\xE8s \xE0 l'appareil photo a \xE9t\xE9 refus\xE9.",
                y.default.createElement("br", null),
                "Autorisez-le dans les r\xE9glages du navigateur, ou cherchez le client ci-dessous.",
              ),
            ),
          r === "indispo" &&
            y.default.createElement(
              y.default.Fragment,
              null,
              "\u{1F4F7}",
              y.default.createElement(
                "span",
                null,
                "Appareil photo indisponible sur cet appareil.",
                y.default.createElement("br", null),
                "Cherchez le client ci-dessous (nom, t\xE9l\xE9phone ou code).",
              ),
            ),
        ),
    )
  );
}
async function kk(t, e) {
  let n = Er(ve),
    r = Ve(ve, "clients", String(t.id));
  (n.update(r, { points: Ot(e), derniere: new Date().toLocaleDateString("sv-SE") }),
    n.set(Ve($t(ve, "clients", String(t.id), "historique")), {
      date: Date.now(),
      points: e,
      type: "achat",
      source: "caisse",
    }),
    await n.commit());
}
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
if (typeof window < "u") {
  let t = () => {
    try {
      let e = hv(),
        n = e.createOscillator(),
        r = e.createGain();
      ((r.gain.value = 1e-4), n.connect(r).connect(e.destination), n.start(), n.stop(e.currentTime + 0.02));
    } catch {}
  };
  ["pointerdown", "touchend", "keydown"].forEach((e) =>
    window.addEventListener(e, t, { once: !0, passive: !0 }),
  );
}
function Ws(t, e, n, r, i = 0.3, o = "sine") {
  let s = t.createOscillator(),
    a = t.createGain();
  ((s.type = o),
    (s.frequency.value = e),
    a.gain.setValueAtTime(1e-4, n),
    a.gain.exponentialRampToValueAtTime(i, n + 0.012),
    a.gain.exponentialRampToValueAtTime(1e-4, n + r),
    s.connect(a).connect(t.destination),
    s.start(n),
    s.stop(n + r + 0.02));
}
function Co(t = "tampon") {
  if (ME)
    try {
      let e = hv(),
        n = e.currentTime + 0.02;
      if (t === "refus") {
        (Ws(e, 330, n, 0.18, 0.25, "triangle"), Ws(e, 247, n + 0.2, 0.3, 0.25, "triangle"));
        return;
      }
      if (t === "tampon") {
        (Ws(e, 1320, n, 0.12), Ws(e, 1760, n + 0.1, 0.2, 0.22));
        return;
      }
      let r = t === "plein" ? [784, 988, 1175, 1568, 1175, 1568, 2093] : [880, 1109, 1319, 1760];
      (r.forEach((i, o) => Ws(e, i, n + o * 0.11, 0.22, 0.28, "triangle")),
        Ws(e, r[r.length - 1] / 2, n + r.length * 0.11, 0.6, 0.2));
    } catch {}
}
function Ik() {
  let [t, e] = (0, y.useState)(ME);
  return y.default.createElement(
    "span",
    { className: "son" },
    y.default.createElement(
      "button",
      {
        className: "lien",
        onClick: () => {
          let r = !t;
          (e(r), (ME = r));
          try {
            localStorage.setItem(dv, r ? "on" : "off");
          } catch {}
          r && Co("tampon");
        },
      },
      t ? "\u{1F50A} Son activ\xE9" : "\u{1F507} Son coup\xE9",
    ),
    t && y.default.createElement("button", { className: "lien", onClick: () => Co("palier") }, "Tester"),
  );
}
var sv = ({ n: t, nb: e, palier: n }) =>
    y.default.createElement(
      "div",
      { className: "mini-t" },
      Array.from({ length: e }, (r, i) =>
        y.default.createElement(
          "i",
          { key: i, className: i < t ? "on" : "" },
          i < t ? "\u{1F34F}" : i === e - 1 || (n && i === n - 1) ? "\u{1F381}" : "",
        ),
      ),
    ),
  al = (t, e, n) => {
    if (FE(t))
      try {
        fetch(t + "?fid=" + encodeURIComponent(e) + "&e=" + n, {
          method: "GET",
          mode: "no-cors",
          redirect: "follow",
        }).catch(() => {});
      } catch {}
  },
  PE = (t) =>
    String(t || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase(),
  Tk = (t) => {
    if (t.prenom || t.nomFamille) return [t.prenom || "", t.nomFamille || ""];
    let e = String(t.nom || "")
      .trim()
      .split(/\s+/);
    return [e[0] || "", e.slice(1).join(" ")];
  };
function bk({ c: t, t: e, onClose: n, onTamponner: r }) {
  let [i, o] = Tk(t),
    [s, a] = (0, y.useState)({ prenom: i, nomFamille: o, tel: t.tel || "", email: t.email || "" }),
    [u, c] = (0, y.useState)(""),
    d = s.prenom !== i || s.nomFamille !== o || s.tel !== (t.tel || "") || s.email !== (t.email || ""),
    f = !s.email.trim() || /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(s.email.trim()),
    h = async () => {
      if (!s.prenom.trim() || !s.nomFamille.trim() || !f)
        return c("Pr\xE9nom, nom et un e-mail valide sont n\xE9cessaires.");
      c("Enregistrement\u2026");
      try {
        let _ = s.prenom.trim().slice(0, 40),
          b = s.nomFamille.trim().slice(0, 40),
          O = Er(ve);
        (O.update(Ve(ve, "clients", String(t.id)), {
          prenom: _,
          nomFamille: b,
          nom: (_ + " " + b).slice(0, 60),
          tel: s.tel.trim().slice(0, 20),
          email: s.email.trim().toLowerCase().slice(0, 100),
        }),
          await O.commit(),
          c("\u2713 Fiche enregistr\xE9e"));
      } catch (_) {
        c(
          _?.code === "permission-denied"
            ? "Refus\xE9 : reconnectez-vous."
            : "Non enregistr\xE9 : v\xE9rifiez la connexion.",
        );
      }
    },
    B = (_, b, O, C) =>
      y.default.createElement(
        y.default.Fragment,
        null,
        y.default.createElement("label", { className: "lab" }, b),
        y.default.createElement("input", {
          className: "inp nom",
          type: O || "text",
          value: s[_],
          placeholder: C,
          autoCapitalize: O === "email" ? "off" : "words",
          onChange: (m) => {
            (a({ ...s, [_]: m.target.value }), c(""));
          },
        }),
      );
  return y.default.createElement(
    "div",
    { className: "fiche-fond", onClick: n },
    y.default.createElement(
      "div",
      { className: "fiche-in", onClick: (_) => _.stopPropagation() },
      y.default.createElement(
        "div",
        { className: "fiche-hd" },
        y.default.createElement(
          "div",
          null,
          y.default.createElement(
            "div",
            { className: "titre", style: { fontSize: 34, textAlign: "left" } },
            t.nom,
          ),
          y.default.createElement(
            "div",
            { className: "sous", style: { textAlign: "left", margin: 0 } },
            "Carte ",
            t.code,
            " \xB7 ",
            t.tampons || 0,
            "/",
            e.nb,
            " tampons",
            t.depuis ? " \xB7 depuis le " + new Date(t.depuis + "T12:00").toLocaleDateString("fr-FR") : "",
            t.derniere
              ? " \xB7 dernier passage le " + new Date(t.derniere + "T12:00").toLocaleDateString("fr-FR")
              : "",
          ),
        ),
        y.default.createElement(
          "button",
          { className: "fiche-x", onClick: n, "aria-label": "Fermer" },
          "\u2715",
        ),
      ),
      y.default.createElement(
        "div",
        { className: "fiche-g" },
        y.default.createElement("div", null, B("prenom", "Pr\xE9nom", "text", "Marie")),
        y.default.createElement("div", null, B("nomFamille", "Nom", "text", "Dupont")),
        y.default.createElement("div", null, B("tel", "T\xE9l\xE9phone", "tel", "06 12 34 56 78")),
        y.default.createElement("div", null, B("email", "E-mail", "email", "marie@exemple.fr")),
      ),
      !f && y.default.createElement("div", { className: "err" }, "Adresse e-mail incompl\xE8te."),
      u &&
        y.default.createElement(
          "div",
          {
            className: "compte",
            style: { fontWeight: 800, color: u.startsWith("\u2713") ? "var(--apple)" : "var(--ink2)" },
          },
          u,
        ),
      y.default.createElement(
        "div",
        { className: "actions", style: { marginTop: 16 } },
        y.default.createElement(
          "button",
          { className: "btn gh", onClick: () => r(t) },
          "\u{1F34F} Tamponner",
        ),
        y.default.createElement("button", { className: "btn", disabled: !d, onClick: h }, "Enregistrer"),
      ),
      y.default.createElement(
        "div",
        { className: "regle" },
        "Corrigez une faute ou un changement de num\xE9ro. Les tampons ne se modifient pas ici.",
      ),
    ),
  );
}
var Sk = ({ c: t }) => {
    let e = Kx(t).niv;
    return e ? y.default.createElement("span", { className: "niv-b" }, e.ico, " ", e.nom) : null;
  },
  av = ({ r: t }) => {
    let e = t?.parr;
    return !e && !t?.k
      ? null
      : e
        ? y.default.createElement(
            "div",
            { className: "roue-l g" },
            "\u{1F91D} Parrainage : +1 tampon pour ",
            t.c.nom,
            t.filleul && !t.k ? " (gard\xE9 pour son prochain passage)" : "",
            " et +1 pour son parrain ",
            e.nom,
            e.att ? " (ajout\xE9 \xE0 son prochain passage)" : "",
          )
        : y.default.createElement(
            "div",
            { className: "roue-l g" },
            "\u{1F382} +",
            t.k,
            " tampon",
            t.k > 1 ? "s" : "",
            " offert",
            t.k > 1 ? "s" : "",
            " (en attente depuis le dernier passage)",
          );
  },
  NE = ({ g: t }) =>
    t == null
      ? null
      : y.default.createElement(
          "div",
          { className: "roue-l " + (t ? "g" : "p") },
          "\u{1F384} Roue de No\xEBl : ",
          t ? y.default.createElement("b", null, "GAGN\xC9, 1 ticket pour le tirage") : "perdu cette fois",
        );
function Pk({ clients: t, roue: e, script: n, onClose: r }) {
  let i = $s(e),
    o = SE(t, i).sort((N, v) => v.tickets - N.tickets || yi(N).localeCompare(yi(v), "fr")),
    s = o.reduce((N, v) => N + v.tickets, 0),
    a =
      i.tirages
        .filter((N) => !N.fait)
        .sort((N, v) =>
          (N.date || "9999") < (v.date || "9999") ? -1 : (N.date || "9999") > (v.date || "9999") ? 1 : 0,
        )[0] || null,
    [u, c] = (0, y.useState)("liste"),
    [d, f] = (0, y.useState)(3),
    [h, B] = (0, y.useState)(null),
    [_, b] = (0, y.useState)(""),
    O = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Paris" }),
    C = (N) =>
      new Date(N + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }),
    m = a
      ? a.date
        ? O < a.date
          ? "Ce tirage pourra \xEAtre lanc\xE9 \xE0 partir du " + C(a.date) + "."
          : ""
        : "Ce tirage n'a pas encore de date : Marion doit la fixer dans l'admin (Roue de No\xEBl)."
      : "Tous les tirages pr\xE9vus sont faits. Marion peut en ajouter un dans l'admin (Roue de No\xEBl).",
    g = () => {
      s && !m && c("annonce");
    },
    k = () => {
      (f(3), c("decompte"));
    };
  (0, y.useEffect)(() => {
    if (u !== "decompte") return;
    if (d === 0) {
      (B(rv(o)), c("anim"));
      return;
    }
    let N = setTimeout(() => f((v) => v - 1), 1e3);
    return () => clearTimeout(N);
  }, [u, d]);
  let T = async () => {
    try {
      let N = [...crypto.getRandomValues(new Uint32Array(20))]
          .map((w) => "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"[w % 56])
          .join(""),
        v = a?.titre || "Tirage au sort de No\xEBl",
        A = Date.now(),
        D = Er(ve);
      if (
        (D.set(Ve(ve, "tirages", N), {
          cree: A,
          titre: v,
          periode: i.periode,
          gagnant: { id: h.id, prenom: h.prenom, nom: h.nom },
          total: s,
          participants: o.map((w) => ({ id: w.id, prenom: w.prenom, t: w.tickets })),
        }),
        D.set(
          Hx,
          {
            roue: {
              ...i,
              periode: i.periode + 1,
              annonce: { prenom: h.prenom, date: A, titre: v },
              tirages: i.tirages.map((w) =>
                w.id === a?.id ? { ...w, fait: !0, gagnant: h.prenom, le: A } : w,
              ),
            },
          },
          { merge: !0 },
        ),
        await D.commit(),
        FE(n))
      )
        try {
          fetch(n + "?tirage=" + N, { method: "GET", mode: "no-cors", redirect: "follow" }).catch(() => {});
        } catch {}
      c("fini");
    } catch {
      (b(
        "Tirage non enregistr\xE9 : v\xE9rifiez la connexion. Le r\xE9sultat n'est pas pris en compte, relancez le tirage.",
      ),
        c("liste"));
    }
  };
  return y.default.createElement(
    "div",
    { className: "cs-main" },
    y.default.createElement("style", null, iv),
    y.default.createElement("div", { className: "titre" }, "\u{1F384} Tirage au sort de No\xEBl"),
    u === "liste" &&
      y.default.createElement(
        y.default.Fragment,
        null,
        y.default.createElement(
          "div",
          { className: "sous" },
          a
            ? a.titre +
                (a.date
                  ? " \xB7 pr\xE9vu le " +
                    new Date(a.date + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" })
                  : "")
            : "Tous les tirages pr\xE9vus sont faits (Marion peut en ajouter dans l'admin).",
        ),
        y.default.createElement(
          "div",
          { className: "cadeau", style: { fontSize: 17 } },
          o.length,
          " participant",
          o.length > 1 ? "s" : "",
          " \xB7 ",
          s,
          " ticket",
          s > 1 ? "s" : "",
          " en jeu",
        ),
        y.default.createElement(
          "div",
          { className: "tir-liste" },
          o.map((N) =>
            y.default.createElement(
              "div",
              { key: N.id },
              y.default.createElement("span", null, yi(N)),
              y.default.createElement("b", null, N.tickets, " ticket", N.tickets > 1 ? "s" : ""),
            ),
          ),
        ),
        _ && y.default.createElement("div", { className: "err" }, _),
        m &&
          y.default.createElement(
            "div",
            { className: "err", style: { background: "#FFF4D6", color: "#8A5A0B", borderColor: "#E9B949" } },
            "\u{1F512} ",
            m,
          ),
        y.default.createElement(
          "div",
          { className: "actions", style: { marginTop: 16 } },
          y.default.createElement("button", { className: "btn gh", onClick: r }, "Retour"),
          y.default.createElement(
            "button",
            { className: "btn terra", disabled: !s || !!m, onClick: g },
            m ? "\u{1F512} Pas encore" : "\u{1F3A1} Lancer le tirage",
          ),
        ),
        y.default.createElement(
          "div",
          { className: "regle" },
          "Le gagnant est tir\xE9 au hasard par l'appli : chaque ticket est une chance. Ici, nom et pr\xE9nom s'affichent. Dans l'appli des clients, seul le pr\xE9nom du gagnant est annonc\xE9.",
        ),
      ),
    u === "annonce" &&
      y.default.createElement(
        "div",
        { className: "tir-annonce" },
        y.default.createElement("div", { className: "tir-att" }, "Attention Marion,"),
        y.default.createElement(
          "p",
          null,
          "je vais proc\xE9der au tirage au sort",
          a?.titre ? y.default.createElement(y.default.Fragment, null, " du \xAB ", a.titre, " \xBB") : null,
          ".",
        ),
        y.default.createElement(
          "p",
          null,
          "Celui-ci est ",
          y.default.createElement("b", null, "totalement al\xE9atoire"),
          " : un algorithme d\xE9cidera du nom du gagnant.",
        ),
        y.default.createElement(
          "div",
          { className: "cadeau", style: { fontSize: 17 } },
          o.length,
          " participant",
          o.length > 1 ? "s" : "",
          " \xB7 ",
          s,
          " ticket",
          s > 1 ? "s" : "",
          " en jeu \xB7 chaque ticket est une chance",
        ),
        y.default.createElement(
          "div",
          { className: "regle", style: { marginTop: 4 } },
          "Apr\xE8s le tirage, les tickets repartent \xE0 z\xE9ro.",
        ),
        y.default.createElement(
          "div",
          { className: "actions", style: { marginTop: 18 } },
          y.default.createElement("button", { className: "btn gh", onClick: () => c("liste") }, "Annuler"),
          y.default.createElement(
            "button",
            { className: "btn terra", onClick: k },
            "\u{1F3B2} C'est parti !",
          ),
        ),
      ),
    u === "decompte" &&
      y.default.createElement(
        "div",
        { className: "tir-annonce" },
        y.default.createElement("div", { className: "tir-dec", key: d }, d || "\u{1F3B2}"),
        y.default.createElement("p", null, "Que le hasard d\xE9cide\u2026"),
      ),
    (u === "anim" || u === "fini") &&
      h &&
      y.default.createElement(ov, { participants: o, gagnant: h, onFin: T }),
    u === "fini" &&
      y.default.createElement(
        y.default.Fragment,
        null,
        y.default.createElement(
          "div",
          { className: "tot", style: { marginTop: 6 } },
          yi(h),
          " est pr\xE9venu",
          "(e)",
          " par e-mail et notification.",
          y.default.createElement("br", null),
          "L'appli annonce le gagnant \xE0 tous les clients (pr\xE9nom seulement).",
        ),
        y.default.createElement(
          "button",
          { className: "btn", style: { marginTop: 14 }, onClick: r },
          "Terminer",
        ),
      ),
  );
}
function Nk({ user: t, clients: e, charge: n, fid: r, maj: i, script: o, roue: s }) {
  let a = yE(r),
    [u, c] = (0, y.useState)("scan"),
    [d, f] = (0, y.useState)(1),
    [h, B] = (0, y.useState)(null),
    [_, b] = (0, y.useState)(""),
    [O, C] = (0, y.useState)(""),
    [m, g] = (0, y.useState)(!1),
    [k, T] = (0, y.useState)(0),
    [N, v] = (0, y.useState)(_k),
    [A, D] = (0, y.useState)(null),
    w = () => {
      let R = N === "user" ? "environment" : "user";
      v(R);
      try {
        localStorage.setItem(cv, R);
      } catch {}
      T((te) => te + 1);
    };
  (0, y.useEffect)(() => {
    let R = null,
      te = !1,
      q = async () => {
        try {
          !te &&
            document.visibilityState === "visible" &&
            navigator.wakeLock &&
            (R = await navigator.wakeLock.request("screen"));
        } catch {}
      };
    return (
      q(),
      document.addEventListener("visibilitychange", q),
      () => {
        ((te = !0), document.removeEventListener("visibilitychange", q));
        try {
          R?.release();
        } catch {}
      }
    );
  }, []);
  let P = () => {
    (B(null), C(""), f(1), c("scan"), T((R) => R + 1));
  };
  (0, y.useEffect)(() => {
    if (u !== "ok" && u !== "donne") return;
    let R = setTimeout(P, u === "ok" ? (h?.roue != null ? 5500 : 3500) : 4e3);
    return () => clearTimeout(R);
  }, [u, h]);
  let M = async (R) => {
      let te = R.tampons || 0,
        q = Date.now();
      g(!0);
      try {
        let X = Er(ve),
          ge = Ve(ve, "clients", String(R.id)),
          J = {},
          ue = null,
          Pe = null;
        if (s && tv(s) && !R.roueNon) {
          let Je = $s(s);
          ((ue = nv()),
            (Pe = { g: ue, t: q }),
            (J.roueAJouer = [...(Array.isArray(R.roueAJouer) ? R.roueAJouer : []).slice(-29), Pe]),
            ue && ((J.roueG = Number(R.roueP) === Je.periode ? Ot(1) : 1), (J.roueP = Je.periode)));
        }
        let W = null,
          ce = 0;
        if (r.parrainage !== !1 && R.parrain && !R.parrainFait) {
          let Je = e.find(
            (lt) => (lt.code || "").toUpperCase() === String(R.parrain).toUpperCase() && lt.id !== R.id,
          );
          if (((J.parrainFait = !0), Je)) {
            ce = 1;
            let lt = _C(Je, a);
            (X.update(Ve(ve, "clients", String(Je.id)), lt ? { bonusAttente: Ot(1) } : { tampons: Ot(1) }),
              X.set(Ve($t(ve, "clients", String(Je.id), "historique")), {
                date: q,
                points: lt ? 0 : 1,
                type: "parrainage",
                source: "caisse",
                ...(lt ? { attente: !0 } : {}),
                filleul: (R.prenom || String(R.nom || "").split(" ")[0] || "").slice(0, 40),
              }),
              (W = { id: Je.id, nom: Je.nom, att: lt }));
          }
        }
        let he = Number(R.bonusAttente) || 0,
          rt = he + ce,
          Xe = kC(te, rt, a);
        (rt - Xe !== he && (J.bonusAttente = rt - Xe),
          X.update(ge, {
            tampons: Ot(1 + Xe),
            dernierTampon: q,
            derniere: new Date().toLocaleDateString("sv-SE"),
            ...J,
          }),
          X.set(Ve($t(ve, "clients", String(R.id), "historique")), {
            date: q,
            points: 1,
            type: "tampon",
            source: "caisse",
            ...(ue == null ? {} : { roue: ue }),
          }),
          Xe &&
            X.set(Ve($t(ve, "clients", String(R.id), "historique")), {
              date: q,
              points: Xe,
              type: ce && Xe ? "parrainage" : "bonus",
              source: "caisse",
              ...(ce ? { parrain: R.parrain } : {}),
            }),
          await X.commit());
        let Lt = te + 1 + Xe;
        (W && al(o, W.id, "parrain"),
          al(o, R.id, "tampon"),
          Lt >= a.nb
            ? al(o, R.id, "plein")
            : a.palier && te < a.palier && Lt >= a.palier && al(o, R.id, "palier"),
          Co(Lt >= a.nb ? "plein" : a.palier && te < a.palier && Lt >= a.palier ? "palier" : "tampon"),
          B({
            c: R,
            avant: te,
            apres: Lt,
            n: 1 + Xe,
            k: Xe,
            attenteAvant: he,
            attenteApres: rt - Xe,
            filleul: ce,
            roue: ue,
            tour: Pe,
            roueNouv: ue && Number(R.roueP) !== $s(s).periode,
            parr: W,
            dernierAvant: R.dernierTampon || 0,
          }),
          c(Lt >= a.nb ? "cadeau" : a.palier && Lt === a.palier ? "palier" : "ok"));
      } catch (X) {
        (C(
          X?.code === "permission-denied"
            ? "Refus\xE9 : reconnectez-vous."
            : "Tampon non enregistr\xE9 : v\xE9rifiez la connexion.",
        ),
          T((ge) => ge + 1));
      }
      g(!1);
    },
    I = (R) => {
      if (!n) {
        (C("Les cartes sont en cours de chargement, r\xE9essayez dans un instant."), T((X) => X + 1));
        return;
      }
      let te = e.filter((X) => (X.code || "").toUpperCase() === R.toUpperCase().trim());
      if (!te.length) {
        (Co("refus"), C("Aucune carte avec le code " + R.toUpperCase() + "."), T((X) => X + 1));
        return;
      }
      if (te.length > 1) {
        (Co("refus"),
          C(
            "Ce code est en double (" +
              te.map((X) => X.nom).join(", ") +
              ") : \xE0 corriger dans l'administration.",
          ),
          T((X) => X + 1));
        return;
      }
      let q = te[0];
      if ((C(""), b(""), (q.tampons || 0) >= a.nb)) {
        (B({ c: q, avant: q.tampons, apres: q.tampons, n: 0 }), c("cadeau"));
        return;
      }
      if (a.delai && q.dernierTampon && Date.now() - q.dernierTampon < a.delai * 6e4) {
        (Co("refus"),
          B({ c: q, min: Math.max(1, Math.round((Date.now() - q.dernierTampon) / 6e4)) }),
          c("deja"));
        return;
      }
      if (a.palier && (q.tampons || 0) === a.palier) {
        (Co("palier"), B({ c: q, avant: a.palier, apres: a.palier, n: 0 }), c("palier"));
        return;
      }
      M(q);
    },
    K = async () => {
      if (!(!h?.n || m)) {
        g(!0);
        try {
          let R = Er(ve),
            te = Date.now(),
            q = h.c,
            X = { tampons: Ot(-h.n), dernierTampon: h.dernierAvant || 0 };
          (h.attenteApres !== h.attenteAvant && (X.bonusAttente = h.attenteAvant),
            h.tour && ((X.roueAJouer = q1(h.tour)), h.roue && (X.roueG = h.roueNouv ? 0 : Ot(-1))),
            q.parrain && !q.parrainFait && (X.parrainFait = !1),
            R.update(Ve(ve, "clients", String(q.id)), X),
            R.set(Ve($t(ve, "clients", String(q.id), "historique")), {
              date: te,
              points: -h.n,
              type: "annulation",
              source: "caisse",
            }),
            h.parr &&
              (R.update(
                Ve(ve, "clients", String(h.parr.id)),
                h.parr.att ? { bonusAttente: Ot(-1) } : { tampons: Ot(-1) },
              ),
              R.set(Ve($t(ve, "clients", String(h.parr.id), "historique")), {
                date: te,
                points: h.parr.att ? 0 : -1,
                type: "annulation",
                source: "caisse",
                motif: "parrainage",
              })),
            await R.commit(),
            P());
        } catch {
          C("Annulation impossible : v\xE9rifiez la connexion.");
        }
        g(!1);
      }
    },
    Q = async (R) => {
      if (m) return;
      g(!0);
      let te = Math.max(0, h.apres || 0),
        q = e.find((J) => J.id === h.c.id) || h.c,
        X = Number(q.bonusAttente) || 0,
        ge = Math.min(X, (a.palier || a.nb) - 1);
      try {
        let J = Er(ve),
          ue = Date.now(),
          Pe = Ve(ve, "clients", String(h.c.id));
        (J.update(Pe, {
          tampons: Ot(ge - te),
          cadeaux: Ot(1),
          derniere: new Date().toLocaleDateString("sv-SE"),
          ...(ge ? { bonusAttente: X - ge } : {}),
        }),
          J.set(Ve($t(ve, "clients", String(h.c.id), "historique")), {
            date: ue,
            points: -te,
            type: R ? "recompense1" : "recompense",
            source: "caisse",
          }),
          ge &&
            J.set(Ve($t(ve, "clients", String(h.c.id), "historique")), {
              date: ue - 1,
              points: ge,
              type: "bonus",
              source: "caisse",
            }),
          await J.commit(),
          al(o, h.c.id, R ? "pris1" : "pris2"));
        let W = Kx(q).niv,
          ce = Kx({ cadeaux: (Number(q.cadeaux) || 0) + 1 }).niv;
        (B({ ...h, apres: ge, palier: R, k: ge, monte: ce && ce !== W ? ce : null }), c("donne"));
      } catch {
        C("Non enregistr\xE9 : v\xE9rifiez la connexion et r\xE9essayez.");
      }
      g(!1);
    },
    le = h?.c && (e.find((R) => R.id === h.c.id) || h.c);
  return y.default.createElement(
    y.default.Fragment,
    null,
    u === "scan" &&
      y.default.createElement(
        "div",
        { className: "cs-main tab2" },
        y.default.createElement(
          "div",
          { className: "col-cam" },
          y.default.createElement("div", { className: "titre" }, "Tamponner la carte"),
          y.default.createElement(
            "div",
            { className: "sous" },
            "Le client pr\xE9sente son QR code (onglet Fid\xE9lit\xE9 de son appli). Pas de t\xE9l\xE9phone ? Cherchez son nom.",
          ),
          y.default.createElement(xv, { key: k, onCode: I, cam: N }),
          y.default.createElement(
            "div",
            { className: "outils-cam" },
            y.default.createElement(
              "button",
              { className: "lien", onClick: w },
              "\u{1F504} ",
              N === "user" ? "Utiliser la cam\xE9ra arri\xE8re" : "Utiliser la cam\xE9ra avant",
            ),
            y.default.createElement(Ik, null),
          ),
        ),
        y.default.createElement(
          "div",
          { className: "col-cmd" },
          y.default.createElement(
            "div",
            { className: "cherche-t" },
            "\u{1F50E} Pas de QR code ? Chercher le client",
          ),
          y.default.createElement(
            "div",
            { className: "saisie" },
            y.default.createElement("input", {
              className: "inp nom",
              type: "search",
              enterKeyHint: "search",
              placeholder: "Tapez son nom ou son t\xE9l\xE9phone\u2026",
              value: _,
              maxLength: 40,
              onChange: (R) => b(R.target.value),
              onKeyDown: (R) =>
                R.key === "Enter" &&
                /^(RAD-?)?[A-Z0-9]{5}$/i.test(_.trim()) &&
                I(
                  "RAD-" +
                    _.trim()
                      .toUpperCase()
                      .replace(/^RAD-?/, ""),
                ),
              "aria-label": "Chercher une carte",
            }),
            /^(RAD-?)?[A-Z0-9]{5}$/i.test(_.trim()) &&
              y.default.createElement(
                "button",
                {
                  className: "btn",
                  onClick: () =>
                    I(
                      "RAD-" +
                        _.trim()
                          .toUpperCase()
                          .replace(/^RAD-?/, ""),
                    ),
                },
                "OK",
              ),
          ),
          _.trim().length >= 2 &&
            (() => {
              let R = PE(_.trim()),
                te = _.replace(/\D/g, ""),
                q = e
                  .filter(
                    (X) =>
                      PE(X.nom).includes(R) ||
                      (te.length >= 3 &&
                        String(X.tel || "")
                          .replace(/\D/g, "")
                          .includes(te)) ||
                      PE(X.code).includes(R),
                  )
                  .slice(0, 8);
              return y.default.createElement(
                "div",
                { className: "resultats" },
                q.length
                  ? q.map((X) =>
                      y.default.createElement(
                        "div",
                        { key: X.id, className: "res-l" },
                        y.default.createElement(
                          "button",
                          { onClick: () => I(X.code) },
                          y.default.createElement("b", null, X.nom),
                          y.default.createElement("span", null, X.tel ? X.tel + " \xB7 " : "", X.code),
                          y.default.createElement("i", null, X.tampons || 0, "/", a.nb),
                        ),
                        y.default.createElement(
                          "button",
                          { className: "res-f", onClick: () => D(X), "aria-label": "Fiche de " + X.nom },
                          "\u270F\uFE0F",
                        ),
                      ),
                    )
                  : y.default.createElement("div", { className: "vide" }, "Aucune carte trouv\xE9e"),
              );
            })(),
          O && y.default.createElement("div", { className: "err" }, O),
          !r.active &&
            y.default.createElement(
              "div",
              { className: "err" },
              "Le programme de fid\xE9lit\xE9 est d\xE9sactiv\xE9 dans l'administration (les clients voient \xAB bient\xF4t \xBB).",
            ),
          s &&
            y.default.createElement(
              "button",
              { className: "btn gh", style: { marginTop: 12 }, onClick: () => c("tirage") },
              "\u{1F384} Tirage au sort de No\xEBl (",
              SE(e, s).reduce((R, te) => R + te.tickets, 0),
              " tickets)",
            ),
          y.default.createElement(
            "div",
            { className: "regle" },
            wC(r),
            a.exclus
              ? y.default.createElement(
                  y.default.Fragment,
                  null,
                  y.default.createElement("br", null),
                  "Hors ",
                  a.exclus,
                  ".",
                )
              : "",
          ),
          y.default.createElement(
            "div",
            { className: "compte" },
            "Connect\xE9 : ",
            t.email,
            " \xB7 ",
            e.length,
            " carte",
            e.length > 1 ? "s" : "",
          ),
        ),
      ),
    A &&
      y.default.createElement(bk, {
        c: e.find((R) => R.id === A.id) || A,
        t: a,
        onClose: () => D(null),
        onTamponner: (R) => {
          (D(null), I(R.code));
        },
      }),
    u === "ok" &&
      h &&
      y.default.createElement(
        "div",
        { className: "cs-main" },
        y.default.createElement(
          "div",
          { className: "ok" },
          y.default.createElement("div", { className: "rond" }, "\u2713"),
          y.default.createElement("div", { className: "plus" }, "+", h.n, " tampon", h.n > 1 ? "s" : ""),
          y.default.createElement(
            "div",
            { className: "tot" },
            h.c.nom,
            y.default.createElement(Sk, { c: le }),
            y.default.createElement("br", null),
            y.default.createElement("b", null, h.apres, " / ", a.nb),
          ),
          y.default.createElement(sv, { n: h.apres, nb: a.nb, palier: a.palier }),
          y.default.createElement(av, { r: h }),
          y.default.createElement(NE, { g: h.roue }),
          y.default.createElement(
            "div",
            { className: "actions", style: { marginTop: 22 } },
            y.default.createElement("button", { className: "btn gh", disabled: m, onClick: K }, "Annuler"),
            y.default.createElement("button", { className: "btn", onClick: P }, "Client suivant"),
          ),
          y.default.createElement(
            "button",
            { className: "lien", onClick: () => D(h.c) },
            "\u270F\uFE0F Voir / corriger la fiche de ",
            h.c.nom,
          ),
          y.default.createElement(
            "div",
            { className: "compte" },
            "Retour automatique dans ",
            h.roue != null ? 5 : 3,
            " secondes",
          ),
        ),
      ),
    u === "deja" &&
      h &&
      y.default.createElement(
        "div",
        { className: "cs-main" },
        y.default.createElement(
          "div",
          { className: "ok" },
          y.default.createElement("div", { className: "rond", style: { background: "var(--gold)" } }, "!"),
          y.default.createElement(
            "div",
            { className: "plus", style: { color: "var(--gold)", fontSize: 30 } },
            "D\xE9j\xE0 tamponn\xE9e",
          ),
          y.default.createElement(
            "div",
            { className: "tot" },
            h.c.nom,
            " a eu un tampon il y a ",
            h.min,
            " min.",
          ),
          y.default.createElement(
            "div",
            { className: "actions", style: { marginTop: 22 } },
            y.default.createElement("button", { className: "btn gh", onClick: P }, "Retour"),
            y.default.createElement(
              "button",
              { className: "btn", disabled: m, onClick: () => M(le) },
              "Tamponner quand m\xEAme",
            ),
          ),
        ),
      ),
    u === "tirage" && y.default.createElement(Pk, { clients: e, roue: s, script: o, onClose: P }),
    u === "cadeau" &&
      h &&
      y.default.createElement(
        "div",
        { className: "cs-main" },
        y.default.createElement(
          "div",
          { className: "ok" },
          y.default.createElement(
            "div",
            { className: "rond", style: { background: "var(--terra)" } },
            "\u{1F381}",
          ),
          y.default.createElement(
            "div",
            { className: "plus", style: { color: "var(--terra)", fontSize: 32 } },
            "Carte compl\xE8te !",
          ),
          y.default.createElement(
            "div",
            { className: "tot" },
            h.c.nom,
            h.n ? " \xB7 +" + h.n + " tampon" + (h.n > 1 ? "s" : "") : "",
          ),
          y.default.createElement(
            "div",
            { className: "cadeau" },
            "\u{1F381}\u{1F381} ",
            a.recompense[0].toUpperCase() + a.recompense.slice(1),
            " pour ",
            h.c.nom,
          ),
          y.default.createElement(NE, { g: h.roue }),
          O && y.default.createElement("div", { className: "err" }, O),
          y.default.createElement(
            "button",
            { className: "btn terra", style: { marginTop: 16 }, disabled: m, onClick: () => Q(!1) },
            "\u2713 Cadeau donn\xE9 : carte remise \xE0 z\xE9ro",
          ),
          y.default.createElement(
            "button",
            { className: "btn gh", style: { marginTop: 8 }, onClick: P },
            "Plus tard (la carte reste pleine)",
          ),
        ),
      ),
    u === "palier" &&
      h &&
      y.default.createElement(
        "div",
        { className: "cs-main" },
        y.default.createElement(
          "div",
          { className: "ok" },
          y.default.createElement(
            "div",
            { className: "rond", style: { background: "var(--terra)" } },
            "\u{1F381}",
          ),
          y.default.createElement(
            "div",
            { className: "plus", style: { color: "var(--terra)", fontSize: 30 } },
            h.avant < a.palier ? "Cadeau d\xE9bloqu\xE9 !" : "Cadeau disponible",
          ),
          y.default.createElement(
            "div",
            { className: "tot" },
            h.c.nom,
            " \xB7 ",
            y.default.createElement("b", null, h.apres, " / ", a.nb),
            h.n ? " (+" + h.n + ")" : "",
          ),
          y.default.createElement(sv, { n: h.apres, nb: a.nb, palier: a.palier }),
          y.default.createElement(av, { r: h }),
          y.default.createElement(NE, { g: h.roue }),
          (() => {
            let R = e.find((q) => q.id === h.c.id) || h.c,
              te = R.choix && (R.choixLe || 0) > (R.dernierTampon || 0) ? R.choix : "";
            return te === "cadeau"
              ? y.default.createElement(
                  "div",
                  { className: "cadeau", style: { fontSize: 17 } },
                  "\u{1F4F1} Dans l'appli, le client a choisi : ",
                  y.default.createElement("b", null, "son cadeau"),
                  " (",
                  a.recompense1,
                  ")",
                )
              : te === "continue"
                ? y.default.createElement(
                    "div",
                    { className: "cadeau", style: { fontSize: 17 } },
                    "\u{1F4F1} Dans l'appli, le client a choisi : ",
                    y.default.createElement("b", null, "de continuer"),
                    " jusqu'\xE0 ",
                    a.nb,
                  )
                : y.default.createElement(
                    "div",
                    { className: "cadeau" },
                    "Demandez au client : ",
                    a.recompense1,
                    " maintenant, ou on continue jusqu'\xE0 ",
                    a.nb,
                    " pour ",
                    a.recompense,
                    " ?",
                  );
          })(),
          O && y.default.createElement("div", { className: "err" }, O),
          y.default.createElement(
            "button",
            { className: "btn terra", style: { marginTop: 14 }, disabled: m, onClick: () => Q(!0) },
            "\u{1F381} Il prend son cadeau (carte \xE0 z\xE9ro)",
          ),
          y.default.createElement(
            "button",
            { className: "btn", style: { marginTop: 8 }, disabled: m, onClick: () => (h.n ? P() : M(h.c)) },
            "\u279C Il continue vers le chouette cadeau",
            h.n ? "" : " (+1 tampon)",
          ),
          h.n > 0 &&
            y.default.createElement(
              "button",
              { className: "lien", disabled: m, onClick: K },
              "Annuler ce tampon",
            ),
        ),
      ),
    u === "donne" &&
      h &&
      y.default.createElement(
        "div",
        { className: "cs-main" },
        y.default.createElement(
          "div",
          { className: "ok" },
          y.default.createElement("div", { className: "rond" }, "\u2713"),
          y.default.createElement(
            "div",
            { className: "plus", style: { fontSize: 30 } },
            "R\xE9compense donn\xE9e",
          ),
          h.monte &&
            y.default.createElement(
              "div",
              { className: "cadeau", style: { fontSize: 18 } },
              "\u{1F389} ",
              h.c.nom,
              " devient ",
              y.default.createElement("b", null, h.monte.ico, " ", h.monte.nom),
              " !",
            ),
          y.default.createElement(
            "div",
            { className: "tot" },
            h.c.nom,
            " repart avec une carte neuve",
            h.k
              ? y.default.createElement(
                  y.default.Fragment,
                  null,
                  y.default.createElement("br", null),
                  "+ ",
                  h.k,
                  " tampon",
                  h.k > 1 ? "s" : "",
                  " offert",
                  h.k > 1 ? "s" : "",
                  " d\xE9j\xE0 dessus \u{1F382}",
                )
              : ".",
          ),
          y.default.createElement(
            "button",
            { className: "btn", style: { marginTop: 22 }, onClick: P },
            "Client suivant",
          ),
        ),
      ),
    y.default.createElement(AE, { dispo: i }),
  );
}
function Mk({ user: t }) {
  let [e, n] = (0, y.useState)([]),
    [r, i] = (0, y.useState)(!1),
    [o, s] = (0, y.useState)(null),
    [a, u] = (0, y.useState)({
      parEuro: 1,
      paliers: [],
      active: !0,
      remise: { active: !0, points: 200, euros: 5 },
    }),
    [c, d] = (0, y.useState)("scan"),
    [f, h] = (0, y.useState)(null),
    [B, _] = (0, y.useState)(""),
    [b, O] = (0, y.useState)(""),
    [C, m] = (0, y.useState)(""),
    [g, k] = (0, y.useState)(!1),
    [T, N] = (0, y.useState)(null),
    [v, A] = (0, y.useState)(0),
    [D, w] = (0, y.useState)(""),
    P = yC();
  (0, y.useEffect)(() => {
    let W = z0(
        $t(ve, "clients"),
        (he) => {
          (n(he.docs.map((rt) => ({ ...rt.data(), id: rt.id }))), i(!0));
        },
        (he) => O("Lecture des clients impossible (" + (he?.code || "erreur") + ")."),
      ),
      ce = z0(
        Hx,
        (he) => {
          he.exists() &&
            (u((rt) => ({ ...rt, ...(he.data().fidelite || {}) })),
            s(he.data().roue || null),
            w(IC(he.data().cmd).script));
        },
        () => {},
      );
    return () => {
      (W(), ce());
    };
  }, []);
  let M = Math.max(1, Number(a.parEuro) || 1),
    I = async () => {
      let W = js(a);
      if (!(!W || g || (K.points || 0) < W.points)) {
        k(!0);
        try {
          let ce = Er(ve);
          (ce.update(Ve(ve, "clients", String(K.id)), {
            points: Ot(-W.points),
            derniere: new Date().toLocaleDateString("sv-SE"),
          }),
            ce.set(Ve($t(ve, "clients", String(K.id), "historique")), {
              date: Date.now(),
              points: -W.points,
              type: "remise",
              remise: W.euros,
              source: "caisse",
            }),
            await ce.commit(),
            N({
              remise: !0,
              nom: K.nom,
              euros: W.euros,
              retires: W.points,
              apres: (K.points || 0) - W.points,
              debloque: [],
            }),
            d("ok"));
        } catch (ce) {
          O(
            ce?.code === "permission-denied"
              ? "Refus\xE9 : reconnectez-vous."
              : "Remise non enregistr\xE9e : v\xE9rifiez la connexion et r\xE9essayez.",
          );
        }
        k(!1);
      }
    },
    K = f && (e.find((W) => W.id === f.id) || f),
    Q = K && vE(a, K.points || 0),
    le = parseInt(C || "0") || 0,
    R = le,
    te = [...(a.paliers || [])].filter((W) => W.at > 0).sort((W, ce) => W.at - ce.at),
    q = (W) => {
      if (!r) {
        (O("Les cartes sont en cours de chargement, r\xE9essayez dans un instant."), A((he) => he + 1));
        return;
      }
      let ce = e.find((he) => (he.code || "").toUpperCase() === W.toUpperCase().trim());
      if (!ce) {
        (O("Aucune carte avec le code " + W.toUpperCase() + "."), A((he) => he + 1));
        return;
      }
      (O(""), h(ce), m(""), _(""), d("fiche"));
    },
    X = (W) => {
      m((ce) =>
        W === "\u232B" ? ce.slice(0, -1) : W === "C" ? "" : ce.length >= 4 ? ce : ce === "0" ? W : ce + W,
      );
    },
    ge = async () => {
      if (!(!R || g)) {
        k(!0);
        try {
          let W = K.points || 0;
          await kk(K, le);
          let ce = W + le,
            he = te.filter((rt) => rt.at > W && rt.at <= ce);
          (N({
            nom: K.nom,
            gagnes: le,
            apres: ce,
            montant: R,
            debloque: he,
            dispo: te.filter((rt) => rt.at <= ce),
          }),
            d("ok"));
        } catch (W) {
          O(
            W?.code === "permission-denied"
              ? "Refus\xE9 : reconnectez-vous."
              : "Points non enregistr\xE9s : v\xE9rifiez la connexion et r\xE9essayez.",
          );
        }
        k(!1);
      }
    },
    J = () => {
      (h(null), N(null), m(""), O(""), d("scan"), A((W) => W + 1));
    };
  (0, y.useEffect)(() => {
    if (c !== "ok") return;
    let W = setTimeout(J, 8e3);
    return () => clearTimeout(W);
  }, [c]);
  let ue = K && te.find((W) => W.at > (K.points || 0)),
    Pe = (K?.nom || "?").trim()[0]?.toUpperCase();
  return DC(a)
    ? y.default.createElement(Nk, { user: t, clients: e, charge: r, fid: a, maj: P, script: D, roue: o })
    : y.default.createElement(
        y.default.Fragment,
        null,
        c === "scan" &&
          y.default.createElement(
            "div",
            { className: "cs-main" },
            y.default.createElement("div", { className: "titre" }, "Scanner la carte"),
            y.default.createElement(
              "div",
              { className: "sous" },
              "Le client affiche son QR code (onglet Fid\xE9lit\xE9 de son appli).",
            ),
            y.default.createElement(xv, { key: v, onCode: q }),
            y.default.createElement(
              "div",
              { className: "saisie" },
              y.default.createElement("input", {
                className: "inp",
                placeholder: "RAD-XXXXX",
                value: B,
                maxLength: 9,
                onChange: (W) => _(W.target.value.toUpperCase()),
                onKeyDown: (W) => W.key === "Enter" && B && q(B),
                "aria-label": "Code de la carte",
              }),
              y.default.createElement(
                "button",
                {
                  className: "btn",
                  disabled: B.length < 5,
                  onClick: () => q(B.startsWith("RAD-") ? B : "RAD-" + B.replace(/^RAD/, "")),
                },
                "OK",
              ),
            ),
            b && y.default.createElement("div", { className: "err" }, b),
            !a.active &&
              y.default.createElement(
                "div",
                { className: "err" },
                "Le programme de fid\xE9lit\xE9 est d\xE9sactiv\xE9 dans l'administration.",
              ),
            y.default.createElement(
              "div",
              { className: "compte" },
              "Connect\xE9 : ",
              t.email,
              " \xB7 ",
              e.length,
              " carte",
              e.length > 1 ? "s" : "",
            ),
          ),
        c === "fiche" &&
          K &&
          y.default.createElement(
            "div",
            { className: "cs-main large" },
            y.default.createElement(
              "div",
              { className: "col", style: { width: "100%" } },
              y.default.createElement(
                "div",
                { className: "fiche" },
                y.default.createElement("div", { className: "av" }, Pe),
                y.default.createElement(
                  "div",
                  { style: { minWidth: 0 } },
                  y.default.createElement("div", { className: "nm" }, K.nom),
                  y.default.createElement("div", { className: "cd" }, K.code),
                ),
                y.default.createElement(
                  "div",
                  { className: "pt" },
                  y.default.createElement("b", null, K.points || 0),
                  y.default.createElement("span", null, "points"),
                ),
              ),
              Q
                ? Q.nb > 0
                  ? y.default.createElement(
                      "button",
                      { className: "btn terra", style: { marginTop: 10 }, disabled: g, onClick: I },
                      "\u{1F381} Appliquer ",
                      qs(Q.euros),
                      " de remise (\u2212",
                      Q.points,
                      " points)",
                      Q.nb > 1 ? " \xB7 " + Q.nb + " dispo." : "",
                    )
                  : y.default.createElement(
                      "div",
                      { className: "palier" },
                      "Encore ",
                      Q.manque,
                      " point",
                      Q.manque > 1 ? "s" : "",
                      " pour ",
                      qs(Q.euros),
                      " de remise",
                      y.default.createElement(
                        "div",
                        { className: "barre" },
                        y.default.createElement("i", { style: { width: Q.progres * 100 + "%" } }),
                      ),
                    )
                : ue
                  ? y.default.createElement(
                      "div",
                      { className: "palier" },
                      "Encore ",
                      ue.at - (K.points || 0),
                      " point",
                      ue.at - (K.points || 0) > 1 ? "s" : "",
                      " pour \xAB ",
                      ue.label || "la r\xE9compense",
                      " \xBB",
                      y.default.createElement(
                        "div",
                        { className: "barre" },
                        y.default.createElement("i", {
                          style: { width: Math.min(100, ((K.points || 0) / ue.at) * 100) + "%" },
                        }),
                      ),
                    )
                  : te.length
                    ? y.default.createElement(
                        "div",
                        { className: "palier" },
                        "\u{1F381} Toutes les r\xE9compenses sont atteintes",
                      )
                    : null,
              y.default.createElement(
                "div",
                { className: "ecran" },
                y.default.createElement(
                  "div",
                  { className: "m" },
                  C ? "+" + le : y.default.createElement("span", { style: { color: "#C9C3B6" } }, "0"),
                ),
                y.default.createElement(
                  "div",
                  { className: "p" },
                  R
                    ? "point" + (le > 1 ? "s" : "") + " \xB7 nouveau total " + ((K.points || 0) + le)
                    : "Points \xE0 cr\xE9diter",
                ),
              ),
            ),
            y.default.createElement(
              "div",
              { className: "col", style: { width: "100%" } },
              y.default.createElement(
                "div",
                { className: "pave" },
                ["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "\u232B"].map((W) =>
                  y.default.createElement(
                    "button",
                    {
                      key: W,
                      onClick: () => X(W),
                      "aria-label": W === "\u232B" ? "Effacer" : W === "C" ? "Tout effacer" : W,
                    },
                    W,
                  ),
                ),
              ),
              b && y.default.createElement("div", { className: "err" }, b),
              y.default.createElement(
                "div",
                { className: "actions" },
                y.default.createElement("button", { className: "btn gh", onClick: J }, "Annuler"),
                y.default.createElement(
                  "button",
                  { className: "btn", disabled: !R || g, onClick: ge },
                  g
                    ? "Envoi\u2026"
                    : R
                      ? "Cr\xE9diter " + le + " point" + (le > 1 ? "s" : "")
                      : "Cr\xE9diter",
                ),
              ),
              y.default.createElement(
                "div",
                { className: "compte", style: { textAlign: "center" } },
                M === 1 ? "1 \u20AC = 1 point" : "1 point par tranche de " + M + " \u20AC",
                js(a) ? " \xB7 " + js(a).points + " points = " + qs(js(a).euros) + " de remise" : "",
              ),
            ),
          ),
        c === "ok" &&
          T?.remise &&
          y.default.createElement(
            "div",
            { className: "cs-main" },
            y.default.createElement(
              "div",
              { className: "ok" },
              y.default.createElement(
                "div",
                { className: "rond", style: { background: "var(--terra)" } },
                "\u{1F381}",
              ),
              y.default.createElement(
                "div",
                { className: "plus", style: { color: "var(--terra)" } },
                "\u2212",
                qs(T.euros),
              ),
              y.default.createElement(
                "div",
                { className: "tot" },
                "Remise \xE0 d\xE9duire du ticket de ",
                T.nom,
                y.default.createElement("br", null),
                T.retires,
                " points utilis\xE9s \xB7 il reste ",
                y.default.createElement("b", null, T.apres, " points"),
              ),
              y.default.createElement(
                "button",
                { className: "btn", style: { marginTop: 22 }, onClick: J },
                "Client suivant",
              ),
              y.default.createElement(
                "div",
                { className: "compte" },
                "Retour automatique dans quelques secondes",
              ),
            ),
          ),
        c === "ok" &&
          T &&
          !T.remise &&
          y.default.createElement(
            "div",
            { className: "cs-main" },
            y.default.createElement(
              "div",
              { className: "ok" },
              y.default.createElement("div", { className: "rond" }, "\u2713"),
              y.default.createElement(
                "div",
                { className: "plus" },
                "+",
                T.gagnes,
                " point",
                T.gagnes > 1 ? "s" : "",
              ),
              y.default.createElement(
                "div",
                { className: "tot" },
                T.nom,
                y.default.createElement("br", null),
                "Nouveau total : ",
                y.default.createElement("b", null, T.apres, " points"),
              ),
              T.debloque.map((W) =>
                y.default.createElement(
                  "div",
                  { className: "cadeau", key: W.at },
                  "\u{1F381} R\xE9compense d\xE9bloqu\xE9e : ",
                  W.label || W.at + " points",
                ),
              ),
              (() => {
                let W = vE(a, T.apres);
                return (
                  W &&
                  W.nb > 0 &&
                  y.default.createElement(
                    "div",
                    { className: "cadeau" },
                    "\u{1F381} ",
                    qs(W.valeur),
                    " de remise disponible : utilisable d\xE8s maintenant ou au prochain passage",
                  )
                );
              })(),
              y.default.createElement(
                "button",
                { className: "btn", style: { marginTop: 22 }, onClick: J },
                "Client suivant",
              ),
              y.default.createElement(
                "div",
                { className: "compte" },
                "Retour automatique dans quelques secondes",
              ),
            ),
          ),
        y.default.createElement(AE, { dispo: P }),
      );
}
function Ok() {
  let [t, e] = (0, y.useState)(void 0);
  ((0, y.useEffect)(() => qx(el, (o) => e(o || null)), []),
    (0, y.useEffect)(() => {
      t && vC("caisse");
    }, [!!t]));
  let [n, r] = (0, y.useState)(null);
  (0, y.useEffect)(
    () =>
      z0(
        Hx,
        (o) => r((o.exists() && o.data().themes) || null),
        () => {},
      ),
    [],
  );
  let i = (0, y.useMemo)(() => KC(n), [n]);
  return y.default.createElement(
    "div",
    {
      className: "cs" + (i?.magie ? " magie" : "") + (gn(i) ? " " + gn(i) : ""),
      style: i ? { "--top": i.top } : void 0,
    },
    y.default.createElement("style", null, ZC + Bk),
    i?.anim && y.default.createElement(QC, { theme: { ...i, nb: Math.min(i.nb || 16, 10) } }),
    i?.magie && i.anim && y.default.createElement(YC, { nb: 20 }),
    y.default.createElement(
      "div",
      { className: "tourner", role: "alert" },
      y.default.createElement("div", { className: "ic" }, "\u{1F4F1}"),
      y.default.createElement("b", null, "Tournez l'iPad en paysage"),
      y.default.createElement("span", null, "La caisse s'utilise \xE0 l'horizontale."),
    ),
    y.default.createElement(
      "header",
      { className: "cs-top" },
      y.default.createElement("img", { src: Dk, alt: "" }),
      i?.magie &&
        y.default.createElement(JC, {
          taille: 28,
          style: { left: 26, top: "calc(env(safe-area-inset-top) + 0px)" },
        }),
      IE.includes(gn(i)) &&
        y.default.createElement(UC, {
          id: gn(i),
          decal: { marginTop: "env(safe-area-inset-top)", marginLeft: -4 },
        }),
      gn(i) === "octobrerose" &&
        y.default.createElement(PC, { style: { left: 38, top: "calc(env(safe-area-inset-top) + 26px)" } }),
      gn(i) === "halloween" &&
        y.default.createElement(TC, {
          taille: 30,
          style: { left: 22, top: "calc(env(safe-area-inset-top) - 3px)" },
        }),
      y.default.createElement(
        "div",
        null,
        y.default.createElement("h1", null, "Caisse"),
        y.default.createElement(
          "small",
          null,
          "\xC9picerie Raddonnaise ",
          y.default.createElement("span", { className: "vers" }, "v", tl),
        ),
      ),
      t &&
        y.default.createElement(
          "button",
          { onClick: async () => (await CC("Se d\xE9connecter de la caisse ?")) && $x(el) },
          "D\xE9connexion",
        ),
    ),
    i &&
      (i.magie
        ? y.default.createElement(XC, { n: 24 })
        : gn(i) === "halloween"
          ? y.default.createElement(bC, { n: 16 })
          : gn(i) === "octobrerose"
            ? y.default.createElement(NC, { n: 16 })
            : IE.includes(gn(i))
              ? y.default.createElement(RC, { id: gn(i), n: 16 })
              : y.default.createElement("div", { className: "frise-theme", style: { background: i.frise } })),
    t === void 0
      ? y.default.createElement(
          "div",
          { className: "cs-main" },
          y.default.createElement(
            "div",
            { className: "sous", style: { marginTop: "30vh" } },
            "Chargement\u2026",
          ),
        )
      : t
        ? y.default.createElement(Mk, { user: t })
        : y.default.createElement(wk, null),
  );
}
"serviceWorker" in navigator && navigator.serviceWorker.register("sw.js").catch(() => {});
(0, lv.createRoot)(document.getElementById("root")).render(y.default.createElement(Ok, null));
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
*/
