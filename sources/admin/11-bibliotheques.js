var N2=t=>wr[t]?.village.ciel,wC=Object.entries(wr).map(([t,e])=>`
.app.${t}{${e.css};background-color:var(--bg);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cg fill='${e.motif}' opacity='.07'%3E%3Cpath d='M30 30l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z'/%3E%3Ccircle cx='120' cy='110' r='3'/%3E%3Ccircle cx='132' cy='34' r='1.8'/%3E%3Ccircle cx='60' cy='132' r='1.5'/%3E%3C/g%3E%3C/svg%3E")}
.app.${t} .fid{background:${e.carte.bg}}
.app.${t} .fid::before{content:"";position:absolute;inset:0;background:radial-gradient(circle,rgba(255,240,200,.8) 1px,transparent 1.6px) 0 0/32px 32px;opacity:.22;pointer-events:none}
.app.${t} .tabs{background:color-mix(in srgb,var(--bg) 60%,#fff)}
.app.${t} .tab.on{color:var(--forest)}
.app.${t} .rc .ic{color:var(--forest);border-color:var(--line)}
.app.${t} .card,.app.${t} .jour,.app.${t} .mini,.app.${t} .hero{border-color:var(--line);box-shadow:0 3px 12px rgba(0,0,0,.05)}
.app.${t} .resa-btn,.app.${t} .bulle-chat{background:var(--apple)}
.${t} :is(.card,.hero,.jour,.mini,.suivi,.recap,.cal){position:relative}
.${t} :is(.card,.hero,.jour,.suivi,.recap,.cal)::after{content:"";position:absolute;right:12px;top:-7px;width:18px;height:20px;background:${e.coin} no-repeat center/contain;pointer-events:none;z-index:3;filter:drop-shadow(0 1px 1px rgba(0,0,0,.25))}
.carte-theme.${t}{background:${e.carte.bg}!important;border-color:${e.carte.titre}55!important;overflow:hidden}
.carte-theme.${t}::after{content:"";position:absolute;inset:0;background:radial-gradient(circle,rgba(255,240,200,.85) 1px,transparent 1.6px) 0 0/30px 30px;opacity:.3;animation:scintille 2.6s ease-in-out infinite alternate;pointer-events:none}
.carte-theme.${t} .ct-titre{color:${e.carte.titre}!important;text-shadow:0 0 12px ${e.carte.titre}66}
.carte-theme.${t} .ct-msg{color:rgba(255,255,255,.9)}
.etq-${t}{background:rgba(10,10,20,.35)}
.etq-${t} .etq{background:${e.etq.fond};color:${e.etq.texte}}
.etq-${t} .etq::after{border-color:${e.etq.texte}55}
.etq-${t} .etq-bande{background:${e.etq.bande};color:${e.etq.bandeTxt}}
.etq-${t} .etq-sep{border-top-color:${e.etq.texte}66}
.etq-${t} .etq-code{background:repeating-linear-gradient(90deg,${e.etq.texte} 0 2px,transparent 2px 4px,${e.etq.texte} 4px 5px,transparent 5px 8px,${e.etq.texte} 8px 11px,transparent 11px 13px)}
.etq-${t} .etq-pastille{background:${e.etq.pastille};color:${e.etq.pastilleTxt||"#fff"};font-size:10px}
`).join("")+`
.etq-stnicolas .etq::before{content:"";position:absolute;left:0;right:0;bottom:0;height:12px;background:radial-gradient(circle at 6px 0,#FFF6E8 5px,transparent 5.5px) 0 0/12px 12px repeat-x;opacity:.95}
.amb2-acc{position:absolute;pointer-events:none;z-index:2;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.4))}
.amb2-astre{position:absolute;top:7%;right:10%;width:84px;height:84px;border-radius:50%;box-shadow:0 0 50px 14px rgba(255,214,140,.3)}
.amb2-ane{position:fixed;bottom:calc(84px + env(safe-area-inset-bottom));left:0;z-index:57;pointer-events:none;transform:translateX(-130px);animation:ane 34s linear 3s infinite}
.amb2-ane svg{animation:aneTrot .5s ease-in-out infinite alternate}
.amb2-ane.apercu{position:absolute;bottom:20%;animation:aneIntro 9s linear .6s infinite}
@keyframes ane{0%{transform:translateX(-130px)}24%,100%{transform:translateX(calc(min(100vw,440px) + 20px))}}
@keyframes aneIntro{0%{transform:translateX(-130px)}100%{transform:translateX(460px)}}
@keyframes aneTrot{from{transform:translateY(0)}to{transform:translateY(-3px)}}
.amb2-feuilles{position:fixed;inset:0;z-index:57;pointer-events:none;overflow:hidden;max-width:440px;margin:0 auto}
.amb2-feuilles.apercu{position:absolute}
.amb2-feuilles span{position:absolute;top:-30px;animation:feuille 9s ease-in-out infinite}
@keyframes feuille{0%{transform:translate(0,0) rotate(0);opacity:0}8%{opacity:.95}50%{transform:translate(40px,50vh) rotate(220deg)}100%{transform:translate(-20px,105vh) rotate(420deg);opacity:.8}}
.amb2-feux{position:fixed;left:0;right:0;top:0;height:46vh;z-index:57;pointer-events:none;max-width:440px;margin:0 auto}
.amb2-feux.apercu{position:absolute;height:60%}
.amb2-feux span{position:absolute;width:0;height:0}
.amb2-feux i{position:absolute;width:3px;height:3px;margin:-1.5px;border-radius:50%;background:var(--c);box-shadow:0 0 6px var(--c);opacity:0;animation:feu 4.2s ease-out infinite;animation-delay:inherit}
@keyframes feu{0%{transform:rotate(var(--a)) translateX(0);opacity:0}4%{opacity:1}30%{transform:rotate(var(--a)) translateX(46px);opacity:.9}46%,100%{transform:rotate(var(--a)) translateX(54px) translateY(8px);opacity:0}}
@keyframes fusee{0%{stroke-dashoffset:0;opacity:0}10%{opacity:1}40%,100%{stroke-dashoffset:-66;opacity:0}}
.amb2-fusee{animation:fusee 2.8s ease-out infinite}
${CSS_MONTEE}
@media (prefers-reduced-motion: reduce){.amb2-fusee,.amb2-ane,.amb2-feuilles,.amb2-feux{display:none}}
`;var Ye=(t,e,n)=>new Date(t,e-1,n,12).toLocaleDateString("sv-SE"),no=(t,e)=>{let n=new Date(t+"T12:00");return n.setDate(n.getDate()+e),n.toLocaleDateString("sv-SE")},bC=(t,e,n,r)=>{let i=new Date(t,e-1,1,12);for(;i.getDay()!==n;)i.setDate(i.getDate()+1);return i.setDate(i.getDate()+7*(r-1)),i.toLocaleDateString("sv-SE")},TO=(t,e,n)=>{let r=new Date(t,e,0,12);for(;r.getDay()!==n;)r.setDate(r.getDate()-1);return r.toLocaleDateString("sv-SE")};function _C(t){let e=t%19,n=Math.floor(t/100),r=t%100,i=Math.floor(n/4),s=n%4,o=Math.floor((n+8)/25),a=Math.floor((n-o+1)/3),u=(19*e+n-i-a+15)%30,d=Math.floor(r/4),h=r%4,p=(32+2*s+2*d-u-h)%7,m=Math.floor((e+11*u+22*p)/451),w=Math.floor((u+p-7*m+114)/31),E=(u+p-7*m+114)%31+1;return Ye(t,w,E)}