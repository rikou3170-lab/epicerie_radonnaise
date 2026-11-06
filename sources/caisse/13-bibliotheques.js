function rv(t){let e=t.reduce((r,i)=>r+i.tickets,0);if(!e)return null;let n=Math.floor(bE()*e);for(let r of t){if(n<r.tickets)return r;n-=r.tickets}return t[t.length-1]}var SE=(t,e)=>(t||[]).filter(n=>!n.roueNon).map(n=>({id:String(n.id),prenom:mk(n),nom:n.nom||"",tickets:pk(n,e)})).filter(n=>n.tickets>0),vi=null,Ek=()=>{try{navigator.audioSession&&(navigator.audioSession.type="playback")}catch{}try{vi=vi||new(window.AudioContext||window.webkitAudioContext),vi.state==="suspended"&&vi.resume()}catch{vi=null}return vi};function gk(t=1){let e=vi;if(e)try{let n=e.currentTime,r=e.createOscillator(),i=e.createGain();r.type="square",r.frequency.setValueAtTime(1800,n),r.frequency.exponentialRampToValueAtTime(900,n+.03),i.gain.setValueAtTime(.12*t,n),i.gain.exponentialRampToValueAtTime(1e-4,n+.045),r.connect(i).connect(e.destination),r.start(n),r.stop(n+.05)}catch{}}function Ak(t){let e=vi;if(!e)return;(t?[523,659,784,1047]:[392,330]).forEach((r,i)=>{try{let o=e.currentTime+i*.13,s=e.createOscillator(),a=e.createGain();s.type="triangle",s.frequency.value=r,a.gain.setValueAtTime(1e-4,o),a.gain.exponentialRampToValueAtTime(.25,o+.02),a.gain.exponentialRampToValueAtTime(1e-4,o+(t?.5:.35)),s.connect(a).connect(e.destination),s.start(o),s.stop(o+.6)}catch{}})}var Ck=8,vb=360/Ck;var iv=`
.guirl{position:fixed;top:0;left:0;right:0;width:100%;max-height:96px;z-index:9601;pointer-events:none;filter:drop-shadow(0 3px 4px rgba(0,0,0,.35))}
.amp,.amp-g{animation:ampoule 1.4s ease-in-out infinite;filter:drop-shadow(0 0 3px currentColor) drop-shadow(0 0 6px currentColor)}
.amp.c1,.amp-g.c1{animation-name:ampoule2}
.vite .amp,.vite .amp-g{animation-duration:.45s}
@keyframes ampoule{0%,100%{opacity:1}50%{opacity:.25;filter:none}}
@keyframes ampoule2{0%,100%{opacity:.25;filter:none}50%{opacity:1}}
.roue-etoiles i{position:fixed;width:3px;height:3px;border-radius:50%;background:#FFF3C4;box-shadow:0 0 6px #FFF3C4;animation:scint 2.4s ease-in-out infinite;pointer-events:none}
@keyframes scint{0%,100%{opacity:.15;transform:scale(.7)}50%{opacity:1;transform:scale(1.3)}}
@media (prefers-reduced-motion:reduce){.amp,.amp-g,.roue-etoiles i{animation:none}}
.roue-fond{position:fixed;inset:0;z-index:9500;background:radial-gradient(circle at 50% 35%,#24564B 0%,#10302A 70%);display:flex;align-items:center;justify-content:center;padding:max(84px,env(safe-area-inset-top)) 16px 16px;overflow-y:auto;animation:roueIn .35s ease both}
@keyframes roueIn{from{opacity:0}to{opacity:1}}
.roue-in{width:100%;max-width:400px;color:#fff;text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;font-family:'Nunito',system-ui,sans-serif}
.roue-in h2{font-family:'Sacramento',cursive;font-weight:400;font-size:50px;line-height:1;margin:0;background:linear-gradient(100deg,#B8860B,#FFF3C4 40%,#E9B949 60%,#B8860B);-webkit-background-clip:text;background-clip:text;color:transparent;padding:6px 20px}
.roue-in p{margin:0;font-size:14.5px;line-height:1.45;opacity:.92;max-width:340px}
.roue-b{border:none;border-radius:18px;padding:15px 24px;font:inherit;font-weight:900;font-size:17px;cursor:pointer;background:linear-gradient(100deg,#C9971C,#F6D47A 35%,#FFF3C4 50%,#F2C14E 65%,#C9971C);color:#1C433B;box-shadow:0 8px 24px rgba(0,0,0,.35);width:100%;max-width:320px}
.roue-b:disabled{opacity:.6}
.roue-b2{border:1.5px solid rgba(255,233,168,.6);background:rgba(255,255,255,.08);color:#fff;border-radius:14px;padding:11px 18px;font:inherit;font-weight:800;font-size:14px;cursor:pointer}
.roue-lien{background:none;border:none;color:rgba(255,255,255,.7);font:inherit;font-size:12.5px;text-decoration:underline;cursor:pointer;padding:4px}
.roue-res{font-size:28px;font-weight:900;animation:roueRes .5s cubic-bezier(.3,1.6,.5,1) both}
.roue-res.g{color:#9BE07A}.roue-res.p{color:#FF9AA6}
@keyframes roueRes{from{transform:scale(.4);opacity:0}to{transform:scale(1);opacity:1}}
.roue-cpt{font-size:12.5px;opacity:.75}
.roue-regl{background:#fff;color:#22302A;border-radius:18px;padding:16px 16px 14px;text-align:left;max-height:70vh;overflow-y:auto}
.roue-regl h3{margin:0 0 8px;font-size:16px;color:#1C433B}
.roue-regl ol{margin:0 0 12px;padding-left:18px;font-size:13px;line-height:1.45}
.roue-regl li{margin-bottom:6px}
.roue-regl .roue-b2{color:#1C433B;border-color:#1C433B;background:#fff}
.roue-confetti{position:fixed;inset:0;pointer-events:none;z-index:9600;overflow:hidden}
.roue-confetti i{position:absolute;top:-20px;width:9px;height:14px;border-radius:2px;animation:roueTombe 2.6s linear forwards}
@keyframes roueTombe{to{transform:translateY(110vh) rotate(720deg)}}
.tir{display:flex;flex-direction:column;align-items:center;gap:14px;text-align:center;width:100%}
.tir-fen{position:relative;width:100%;max-width:520px;height:210px;overflow:hidden;border-radius:22px;background:linear-gradient(#5B1520,#7A1E2C);border:5px solid #E9B949;box-shadow:inset 0 0 40px rgba(0,0,0,.45)}
.tir-fen::before,.tir-fen::after{content:"";position:absolute;left:0;right:0;height:70px;z-index:2;pointer-events:none}
.tir-fen::before{top:0;background:linear-gradient(#5B1520,rgba(91,21,32,0))}
.tir-fen::after{bottom:0;background:linear-gradient(rgba(122,30,44,0),#7A1E2C)}
.tir-cadre{position:absolute;left:12px;right:12px;top:75px;height:60px;border:3px solid #FFF3C4;border-radius:14px;z-index:3;pointer-events:none;box-shadow:0 0 20px rgba(255,233,168,.6)}
.tir-nom{position:absolute;left:0;right:0;height:70px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:30px;padding:0 24px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:'Nunito',system-ui,sans-serif}
.tir-gagnant{font-family:'Sacramento',cursive;font-size:64px;line-height:1;background:linear-gradient(100deg,#B8860B,#FFF3C4 40%,#E9B949 60%,#B8860B);-webkit-background-clip:text;background-clip:text;color:transparent;padding:4px 24px;animation:roueRes .6s cubic-bezier(.3,1.6,.5,1) both}
`;