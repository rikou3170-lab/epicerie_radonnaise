/* ═══════════════════════════════════════════════════════════════════════
 *  STYLES — icônes et feuille de style complète de l'appli.
 * ═══════════════════════════════════════════════════════════════════════ */

// Icônes de l'appli, et feuille de style complète.
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
.prods{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:2px 0 6px;margin:0 0 10px}
.prods::-webkit-scrollbar{display:none}
.prod{min-width:0;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:10px 4px 10px;overflow-wrap:anywhere;font-family:var(--body);color:var(--ink);cursor:pointer;position:relative}
.prod-ph{width:56px;height:56px;border-radius:50%;overflow:hidden;background:var(--apple-soft);display:flex;align-items:center;justify-content:center;font-size:34px;border:3px solid #fff;box-shadow:0 2px 8px rgba(28,67,59,.15);margin-bottom:4px}
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
  Deco = ({ a = "right" }) =>
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
  dx = ({ t, s }) =>
    React.default.createElement(
      "div",
      { className: "empty" },
      React.default.createElement("b", null, t),
      React.default.createElement("span", null, s),
    );
