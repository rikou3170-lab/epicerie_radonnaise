var e2=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 14'%3E%3Cpath d='M0 0h60v5c-3 0-4 5-8 5s-5-4-9-4-4 6-9 6-5-5-9-5-4 3-8 3-4-5-9-5-4 3-8 3z' fill='%23fff'/%3E%3C/svg%3E")`,FM=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 14'%3E%3Cpath d='M0 14V9c5-6 10-8 16-5s9 1 13-2 10-3 14 1 8 4 13 1 10-4 14 0 6 4 10 5v5z' fill='%23fff'/%3E%3C/svg%3E")`,DM=`
.neige{position:fixed;inset:0;pointer-events:none;z-index:58;overflow:hidden}
.neige.dans{position:absolute;z-index:1}
.neige i{position:absolute;top:-12px;display:block;animation:nTombe linear infinite}
.neige b{display:block;border-radius:50%;background:radial-gradient(circle,#fff 40%,rgba(255,255,255,.4) 70%,transparent 72%);box-shadow:0 0 2px rgba(110,140,180,.55);animation:nBalance ease-in-out infinite alternate}
@keyframes nTombe{to{transform:translateY(calc(100vh + 30px))}}
.neige.dans i{animation-name:nTombeBoite}
@keyframes nTombeBoite{to{transform:translateY(480px)}}
@keyframes nBalance{from{transform:translateX(calc(var(--dx) * -.5))}to{transform:translateX(calc(var(--dx) * .5))}}
.guirlande{position:sticky;top:62px;z-index:59;height:22px;margin-bottom:-14px;pointer-events:none}
.guirlande.apercu{position:relative;top:0;margin-bottom:-12px}
.gl-fil{position:absolute;left:0;top:0;width:100%;height:20px}
.guirlande span{position:absolute;top:9px;width:8px;height:11px;margin-left:-4px;border-radius:50% 50% 45% 45%;background:var(--c);box-shadow:0 0 6px 2px var(--c);animation:ampoule 1.6s ease-in-out infinite alternate}
.guirlande span::before{content:"";position:absolute;top:-3px;left:2px;width:4px;height:4px;border-radius:1px;background:#3E4A3E}
@keyframes ampoule{0%{opacity:1;filter:brightness(1.15)}100%{opacity:.35;box-shadow:0 0 1px 0 var(--c)}}
.magie .top::after,.magie .at-top::after{content:"";position:absolute;left:0;right:0;bottom:-9px;height:12px;background:${e2} repeat-x;background-size:60px 12px;filter:drop-shadow(0 2px 1.5px rgba(70,100,140,.35));pointer-events:none;z-index:1}
.bonnet{position:absolute;pointer-events:none;z-index:2;transform:rotate(-18deg);filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
.magie :is(.card,.hero,.jour,.mini,.suivi,.recap,.cal)::before,.magie .at-faux::before{content:"";position:absolute;left:0;right:0;top:-1px;height:11px;background:${e2} repeat-x;background-size:54px 11px;filter:drop-shadow(0 1.5px 1.2px rgba(80,115,160,.7)) drop-shadow(0 0 1px rgba(80,115,160,.4));pointer-events:none;z-index:3}
.magie .tabs::before{content:"";position:absolute;left:0;right:0;top:-12px;height:13px;background:${FM} repeat-x;background-size:80px 13px;filter:drop-shadow(0 -1px 1.5px rgba(90,125,165,.35));pointer-events:none}
.magie :is(.hero,.jour,.mini,.suivi,.recap,.cal){position:relative}
.magie .rc .ic::before{content:"";position:absolute;left:-1px;right:-1px;top:-4px;height:9px;background:${e2} repeat-x;background-size:30px 9px;border-radius:17px 17px 0 0;filter:drop-shadow(0 1px 1px rgba(80,115,160,.7));pointer-events:none}
.magie .tab.on .pastille{box-shadow:0 0 0 2px #fff,0 0 12px rgba(244,215,116,.9)}
.traineau{position:fixed;top:96px;left:0;z-index:57;pointer-events:none;transform:translateX(-170px);animation:vol 4.5s ease-in-out .6s 1 both}
.traineau.boucle{animation:volBoucle 32s linear 4s infinite}
.traineau.apercu{position:absolute;top:22%;animation:volApercu 4.5s ease-in-out .3s 1 both}
.traineau svg{display:block;filter:drop-shadow(0 0 6px rgba(244,215,116,.85))}
.traineau .poussiere{position:absolute;right:100%;top:22px;width:120px;height:3px;background:linear-gradient(90deg,transparent,rgba(244,215,116,.8));border-radius:3px;filter:blur(1px)}
@keyframes vol{0%{transform:translate(-170px,30px) rotate(-6deg)}100%{transform:translate(calc(100vw + 20px),-30px) rotate(-6deg)}}
@keyframes volApercu{0%{transform:translate(-170px,30px) rotate(-6deg)}100%{transform:translate(330px,-30px) rotate(-6deg)}}
@keyframes volBoucle{0%{transform:translate(-170px,40px) rotate(-5deg)}14%{transform:translate(calc(min(100vw,440px) + 20px),-20px) rotate(-5deg)}100%{transform:translate(calc(min(100vw,440px) + 20px),-20px) rotate(-5deg)}}
.decor-magie{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.etoiles-ciel{position:absolute;inset:0 0 35% 0;background:radial-gradient(circle,#fff 1px,transparent 1.6px) 0 0/38px 38px,radial-gradient(circle,rgba(255,255,255,.6) 1px,transparent 1.6px) 19px 13px/46px 46px;animation:scintille 3s ease-in-out infinite alternate;opacity:.8}
@keyframes scintille{from{opacity:.45}to{opacity:.95}}
.lune{position:absolute;top:7%;right:12%;width:46px;height:46px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#FFFBE6,#F4E2A8 70%);box-shadow:0 0 30px 8px rgba(255,245,200,.35)}
.village{position:absolute;left:0;right:0;bottom:0;width:100%;height:34%}
.village .fenetre{animation:fenetre 2.4s ease-in-out infinite alternate}
@keyframes fenetre{from{opacity:1}to{opacity:.6}}
.poudre{position:fixed;z-index:9999;pointer-events:none;width:0;height:0}
.poudre i{position:absolute;width:5px;height:5px;margin:-2.5px;border-radius:50%;box-shadow:0 0 6px #F4D774;animation:poudre .85s ease-out forwards}
@keyframes poudre{to{transform:rotate(var(--a)) translateX(var(--d)) scale(.2);opacity:0}}
.carte-theme.magie{background:linear-gradient(140deg,#1F3A66,#0E1B33)!important;border-color:#F4D77455!important}
.carte-theme.magie::after{content:"";position:absolute;inset:0;background:radial-gradient(circle,rgba(255,255,255,.8) 1px,transparent 1.6px) 0 0/30px 30px;opacity:.35;animation:scintille 2.6s ease-in-out infinite alternate;pointer-events:none}
.carte-theme.magie .ct-titre{color:#F4D774!important;text-shadow:0 0 12px rgba(244,215,116,.45)}
.carte-theme.magie .ct-msg{color:rgba(255,255,255,.88)}
.ct-compte{display:inline-block;margin-top:8px;font-size:12px;font-weight:800;color:#1F3A66;background:#F4D774;padding:5px 11px;border-radius:20px}
@media (prefers-reduced-motion: reduce){.neige,.traineau,.poudre{display:none}.guirlande span,.etoiles-ciel,.village .fenetre{animation:none}}
`,jI=DM+gI+TI+`
.parts{position:fixed;inset:0;pointer-events:none;z-index:58;overflow:hidden}
.parts.dans{position:absolute;z-index:1}
.part-emoji{display:block;line-height:1}
.part{position:absolute;top:-30px;display:block;animation-name:tombe;animation-timing-function:linear;animation-iteration-count:infinite;will-change:transform}
.parts.haut .part{top:auto;bottom:-30px;animation-name:monte}
@keyframes tombe{0%{transform:translate3d(0,0,0) rotate(0)}100%{transform:translate3d(var(--dx),calc(100vh + 60px),0) rotate(var(--rot))}}
@keyframes monte{0%{transform:translate3d(0,0,0) rotate(0) scale(.8)}100%{transform:translate3d(var(--dx),calc(-100vh - 60px),0) rotate(calc(var(--rot) / 8)) scale(1.1)}}
.parts.dans .part{animation-name:tombeBoite}
.parts.dans.haut .part{animation-name:monteBoite}
@keyframes tombeBoite{0%{transform:translate3d(0,0,0) rotate(0)}100%{transform:translate3d(var(--dx),340px,0) rotate(var(--rot))}}
@keyframes monteBoite{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(var(--dx),-340px,0)}}
@media (prefers-reduced-motion: reduce){.parts{display:none}}
.frise-theme{height:7px;position:sticky;top:62px;z-index:59}
.carte-theme{position:relative;display:flex;align-items:center;gap:10px;border:1.5px solid;border-radius:18px;padding:14px 12px 14px 16px;margin-bottom:14px;overflow:hidden}
.ct-txt{flex:1;min-width:0}
.ct-titre{font-family:'Sacramento',cursive;font-size:32px;line-height:1.05;margin-bottom:4px}
.ct-msg{font-size:12.5px;font-weight:700;color:#5C6A62;line-height:1.45}
.ct-illu{flex-shrink:0;animation:balance 3.2s ease-in-out infinite;transform-origin:50% 90%}
@keyframes balance{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
`;
