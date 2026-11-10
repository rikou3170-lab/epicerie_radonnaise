/* ═══════════════════════════════════════════════════════════════════════
 *  STYLES — icônes et feuille de style complète de l'appli.
 * ═══════════════════════════════════════════════════════════════════════ */

// Icônes de l'appli, et feuille de style complète.
var Fk = /RAD-[A-Z0-9]{5}/;

// Styles de la caisse, et logo.
var CSS_CAISSE = `
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
.mt-saisie{display:block;width:260px;max-width:90%;margin:18px auto 10px;font-size:46px;font-weight:800;text-align:center;padding:12px 16px;border-radius:16px}
.mt-suivi{width:560px;max-width:94%;margin:0 auto;background:#fff;border:1px solid var(--line,#E6E0D2);border-radius:20px;padding:16px 20px;text-align:left}
.mt-nom{font-size:24px;font-weight:800;color:var(--forest,#1C433B);text-align:center}
.mt-chiffres{display:flex;gap:12px;margin:10px 0 6px}
.mt-chiffres>div{flex:1;background:#F6F1E7;border-radius:14px;padding:10px;text-align:center}
.mt-chiffres b{display:block;font-size:28px;color:var(--gold,#C9972C);line-height:1.1}
.mt-chiffres span{font-size:12px;color:var(--ink3,#5C6A62)}
.mt-ligne{display:flex;gap:8px;align-items:baseline;font-size:15px;padding:5px 0;border-top:1px solid #F0EBE0}
.mt-ligne b{color:var(--forest,#1C433B)}
.mt-ligne i{margin-left:auto;font-style:normal;color:var(--ink3,#5C6A62);font-size:13.5px;text-align:right}
.mt-histo{margin-top:10px;border-top:1px solid #F0EBE0;padding-top:8px}
.mt-ht{font-size:12px;font-weight:800;color:var(--ink3,#5C6A62);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
.mt-hl{display:flex;gap:8px;align-items:baseline;font-size:13.5px;padding:3px 0}
.mt-hl b{font-weight:600;color:var(--ink,#22302A)}
.mt-hl i{margin-left:auto;font-style:normal;color:var(--ink3,#5C6A62);font-size:12px;white-space:nowrap}
.mt-pied{font-size:12px;color:var(--ink3,#5C6A62);text-align:center;margin-top:8px}
.mt-reprise{width:560px;max-width:94%;margin:16px auto 0;background:#FBF1E4;border:1px solid #EFD7B8;border-radius:18px;padding:14px 18px;text-align:left}
.mt-rt{font-weight:800;color:#8A5418;margin-bottom:8px}
.mt-rc{display:flex;gap:12px}
.mt-rc label{flex:1;font-size:12.5px;color:#7A5426;display:flex;flex-direction:column;gap:5px}
.mt-rc label{min-width:0}
.mt-rc .inp{width:100%;box-sizing:border-box;font-size:22px;font-weight:800;text-align:center}
.mt-calc{font-size:17px;font-weight:700;color:var(--forest,#1C433B);margin-top:6px;line-height:1.4}
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
/* iPad en portrait : on demande de tourner l'écran (la caisse est prévue en paysage) */
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
/* iPad / tablette : grands boutons, caméra à gauche et recherche à droite en paysage */
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
  LOGO = "logo.jpg";
