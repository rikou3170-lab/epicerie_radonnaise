/* ═══════════════════════════════════════════════════════════════════════
 *  STYLES — icônes et feuille de style complète de l'appli.
 * ═══════════════════════════════════════════════════════════════════════ */

// Icônes de l'appli, et feuille de style complète.
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
/* Téléphone : 16 px minimum, sinon l'iPhone zoome sur le champ et fait déborder l'écran */
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
.resa-adm.menu-attente{border-left-color:var(--terra,#C27B42)}
.resa-adm .rs-menu{font-size:11.5px;font-weight:800;color:var(--terra,#C27B42);margin-bottom:2px}
.resa-adm.retiree,.resa-adm.absent,.resa-adm.annulee,.resa-adm.refusee{opacity:.6;border-left-color:var(--line)}
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

/* ═══ Ordinateur : menu latéral, contenu large, fenêtres centrées ═══ */
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
  ze = ({ on, set }) =>
    React.default.createElement(
      "div",
      { className: "sw" + (on ? " on" : ""), onClick: set },
      React.default.createElement("i", null),
    ),
  Vn = ({ t, s }) =>
    React.default.createElement("div", { className: "empty" }, React.default.createElement("b", null, t), s);
