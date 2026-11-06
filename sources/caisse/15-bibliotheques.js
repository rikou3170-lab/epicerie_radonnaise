var U_=`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 30'%3E%3Cpath d='M12 2c-3.4 0-5.5 2.4-5.5 5.4 0 3.4 2.2 6.8 5.5 11.6 3.3-4.8 5.5-8.2 5.5-11.6C17.5 4.4 15.4 2 12 2zm0 3c1.5 0 2.5 1 2.5 2.5 0 1.6-1 3.5-2.5 6-1.5-2.5-2.5-4.4-2.5-6C9.5 6 10.5 5 12 5z' fill='%23EC407A'/%3E%3Cpath d='M10 17 3.5 27.5l3.7-.4 1.7 3.4 5.3-9.4zM14 17l6.5 10.5-3.7-.4-1.7 3.4-5.3-9.4z' fill='%23F06292'/%3E%3C/svg%3E")`,MC=`
/* \u2500\u2500 Halloween \u2500\u2500 */
.amb-chapeau{position:absolute;pointer-events:none;z-index:2;transform:rotate(-14deg);filter:drop-shadow(0 0 2px rgba(255,181,71,.55)) drop-shadow(0 1px 1px rgba(0,0,0,.35))}
.amb-guirl{position:sticky;top:62px;z-index:59;height:30px;margin-bottom:-22px;pointer-events:none}
.amb-guirl.apercu{position:relative;top:0;margin-bottom:-20px}
.amb-fil{position:absolute;left:0;top:0;width:100%;height:22px}
.amb-guirl span{position:absolute;top:6px}
.amb-lanterne{margin-left:-8.5px;top:8px!important;animation:lanterne 3s ease-in-out infinite;transform-origin:50% 0}
.amb-fanion{width:0;height:0;margin-left:-6px;border-left:6px solid transparent;border-right:6px solid transparent;border-top:13px solid #5E3F82;top:3px!important}
.amb-fanion.o{border-top-color:#E8731C}
@keyframes lanterne{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(6deg)}}
.amb-lueur{animation:lueur 1.8s ease-in-out infinite alternate}
@keyframes lueur{0%{opacity:1;filter:drop-shadow(0 0 2px #FFB547)}60%{opacity:.75}100%{opacity:.95;filter:drop-shadow(0 0 4px #FF9A3C)}}
.amb-vol{position:fixed;top:120px;left:0;z-index:57;pointer-events:none;width:110px;height:40px;transform:translateX(-140px);animation:volCS 6s ease-in-out 1s 1 both}
.amb-vol.boucle{animation:volCSBoucle 28s linear 3s infinite}
.amb-vol.apercu{position:absolute;top:30%;animation:volCSApercu 7s ease-in-out .4s infinite}
.amb-vol span{position:absolute;animation:batte .5s ease-in-out infinite alternate}
.amb-aile{transform-box:fill-box;animation:aile .22s ease-in-out infinite alternate}
.amb-aile.g{transform-origin:100% 60%}.amb-aile.d{transform-origin:0% 60%}
@keyframes aile{from{transform:scaleY(1)}to{transform:scaleY(.25)}}
@keyframes batte{from{transform:translateY(0)}to{transform:translateY(-6px)}}
@keyframes volCS{0%{transform:translate(-140px,40px)}100%{transform:translate(calc(100vw + 20px),-40px)}}
@keyframes volCSBoucle{0%{transform:translate(-140px,60px)}16%{transform:translate(calc(min(100vw,440px) + 20px),-10px)}100%{transform:translate(calc(min(100vw,440px) + 20px),-10px)}}
@keyframes volCSApercu{0%{transform:translate(-140px,30px)}60%,100%{transform:translate(380px,-40px)}}
.amb-araignee{position:fixed;top:56px;right:max(54px,calc(50% - 168px));z-index:61;pointer-events:none;display:flex;flex-direction:column;align-items:center;animation:araignee 9s ease-in-out 2s infinite;transform:translateY(-60px)}
.amb-araignee i{width:1px;height:60px;background:rgba(40,25,60,.55);margin-bottom:-2px}
@keyframes araignee{0%,100%{transform:translateY(-60px)}18%,40%{transform:translateY(10px)}29%{transform:translateY(4px)}55%{transform:translateY(-60px)}}
.halloween :is(.card,.hero,.jour,.mini,.suivi,.recap,.cal){position:relative}
.halloween :is(.card,.hero,.jour,.suivi,.recap,.cal)::after{content:"";position:absolute;right:0;top:0;width:44px;height:44px;background:${z_} no-repeat top right/44px 44px;pointer-events:none;z-index:3;border-top-right-radius:inherit}
.halloween .rc .ic{position:relative}
.halloween .tab.on .pastille{box-shadow:0 0 0 2px #fff,0 0 12px rgba(232,115,28,.85)}
.carte-theme.halloween{background:linear-gradient(140deg,#3A2558,#140B22)!important;border-color:#E8731C55!important;overflow:hidden}
.carte-theme.halloween::after{content:"";position:absolute;inset:0;background:radial-gradient(circle,rgba(255,236,200,.85) 1px,transparent 1.6px) 0 0/34px 34px;opacity:.3;animation:scintille 2.6s ease-in-out infinite alternate;pointer-events:none}
.carte-theme.halloween .ct-titre{color:#FFB547!important;text-shadow:0 0 12px rgba(232,115,28,.55)}
.carte-theme.halloween .ct-msg{color:rgba(255,255,255,.88)}
.amb-intro-h .amb-etoiles{position:absolute;inset:0 0 35% 0;background:radial-gradient(circle,#fff 1px,transparent 1.6px) 0 0/40px 40px,radial-gradient(circle,rgba(255,236,200,.6) 1px,transparent 1.6px) 20px 14px/48px 48px;animation:scintille 3s ease-in-out infinite alternate;opacity:.7}
.amb-lune{position:absolute;top:6%;right:8%;width:96px;height:96px;border-radius:50%;background:radial-gradient(circle at 38% 36%,#FFF6D6,#F7D98A 60%,#E9B949);box-shadow:0 0 50px 14px rgba(255,214,120,.35)}
.amb-lune::before{content:"";position:absolute;left:26%;top:52%;width:14px;height:14px;border-radius:50%;background:rgba(200,150,60,.25);box-shadow:30px -24px 0 -2px rgba(200,150,60,.2),36px 10px 0 -4px rgba(200,150,60,.18)}
.amb-passe{position:absolute;left:-140px;top:18px;animation:sorciere 7s ease-in-out .8s infinite}
@keyframes sorciere{0%{transform:translate(0,30px) rotate(-8deg);opacity:0}8%{opacity:1}55%{transform:translate(260px,-30px) rotate(-8deg);opacity:1}60%,100%{transform:translate(290px,-40px) rotate(-8deg);opacity:0}}
.amb-village{position:absolute;left:0;right:0;bottom:0;width:100%;height:36%}
.amb-fenetre{animation:fenetreH 2.2s ease-in-out infinite alternate}
@keyframes fenetreH{0%{opacity:1}40%{opacity:.55}50%{opacity:.95}100%{opacity:.7}}
.amb-brume{position:absolute;left:-30%;right:-30%;bottom:6%;height:22%;background:radial-gradient(ellipse at 30% 60%,rgba(200,180,230,.28),transparent 60%),radial-gradient(ellipse at 75% 50%,rgba(200,180,230,.22),transparent 55%);filter:blur(6px);animation:brume 14s linear infinite alternate}
.amb-brume.b2{bottom:0;opacity:.8;animation-duration:19s;animation-direction:alternate-reverse}
@keyframes brume{from{transform:translateX(-8%)}to{transform:translateX(8%)}}

/* \u2500\u2500 Octobre rose \u2500\u2500 */
.amb-ruban-logo{position:absolute;pointer-events:none;z-index:2;transform:rotate(12deg);filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
.amb-coeur{width:9px;height:9px;margin-left:-4.5px;top:7px!important;background:#fff;transform:rotate(45deg);border-radius:2px 0 0 0;box-shadow:0 0 0 1px rgba(236,64,122,.35)}
.amb-coeur::before,.amb-coeur::after{content:"";position:absolute;width:9px;height:9px;border-radius:50%;background:#fff}
.amb-coeur::before{left:-4.5px;top:0}.amb-coeur::after{left:0;top:-4.5px}
.amb-ballons{position:fixed;left:0;right:0;bottom:0;height:0;z-index:57;pointer-events:none;max-width:440px;margin:0 auto}
.amb-ballons span{position:absolute;bottom:-90px;animation:ballon 30s ease-in 3s infinite}
.amb-ballons.apercu{position:absolute;inset:0;height:auto}
.amb-ballons.apercu span{animation:ballonIntro 6s ease-out infinite}
@keyframes ballon{0%{transform:translate(0,0) rotate(-6deg);opacity:0}2%{opacity:.95}22%{transform:translate(18px,-110vh) rotate(6deg);opacity:.95}23%,100%{transform:translate(18px,-110vh);opacity:0}}
@keyframes ballonIntro{0%{transform:translate(0,0) rotate(-6deg);opacity:0}10%{opacity:.95}100%{transform:translate(20px,-115vh) rotate(6deg);opacity:.9}}
.octobrerose :is(.card,.hero,.jour,.mini,.suivi,.recap,.cal){position:relative}
.octobrerose :is(.card,.hero,.jour,.suivi,.recap,.cal)::after{content:"";position:absolute;right:12px;top:-6px;width:16px;height:20px;background:${U_} no-repeat center/contain;pointer-events:none;z-index:3;filter:drop-shadow(0 1px 1px rgba(142,30,80,.35))}
.octobrerose .tab.on .pastille{box-shadow:0 0 0 2px #fff,0 0 12px rgba(236,64,122,.75)}
.carte-theme.octobrerose{background:linear-gradient(140deg,#F06292,#B0235F)!important;border-color:#F8BBD088!important;overflow:hidden}
.carte-theme.octobrerose::after{content:"";position:absolute;inset:0;background:radial-gradient(circle,rgba(255,255,255,.8) 1px,transparent 1.6px) 0 0/30px 30px;opacity:.3;animation:scintille 2.6s ease-in-out infinite alternate;pointer-events:none}
.carte-theme.octobrerose .ct-titre{color:#FFFFFF!important;text-shadow:0 0 12px rgba(255,255,255,.4)}
.carte-theme.octobrerose .ct-msg{color:rgba(255,255,255,.92)}
.amb-aurore{position:absolute;inset:0;background:radial-gradient(80% 50% at 50% 92%,rgba(255,214,230,.9),rgba(248,187,208,.35) 45%,transparent 70%)}
.amb-bokeh-r{position:absolute;inset:0 0 30% 0;background:radial-gradient(circle,rgba(255,255,255,.55) 2px,transparent 3px) 0 0/46px 46px,radial-gradient(circle,rgba(255,214,230,.5) 1.4px,transparent 2.4px) 23px 17px/52px 52px;animation:scintille 3s ease-in-out infinite alternate;opacity:.7}
@media (prefers-reduced-motion: reduce){.amb-ballons{display:none}}
@media (prefers-reduced-motion: reduce){.amb-vol,.amb-araignee,.amb-passe,.poudre{display:none}.amb-lanterne,.amb-lueur,.amb-fenetre,.amb-brume,.amb-aile{animation:none}}
`;var ReactDecors=vn(Pn());
