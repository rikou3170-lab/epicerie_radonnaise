var NS=`
.mn-carte{position:relative;display:flex;align-items:center;gap:12px;width:100%;margin:12px 0 4px;padding:14px 14px 13px;border:1px solid var(--line,#E5E0D4);border-radius:18px;text-align:left;cursor:pointer;font:inherit;color:var(--ink,#1E2A26);
  background:linear-gradient(135deg,#FFFDF7 0%,#FBF5E6 100%);box-shadow:0 4px 16px rgba(0,0,0,.06);overflow:hidden}
.mn-carte::before{content:"";position:absolute;inset:5px;border:1px dashed color-mix(in srgb,var(--gold,#C9972C) 45%,transparent);border-radius:14px;pointer-events:none}
.mn-carte .mn-ic{flex-shrink:0;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:color-mix(in srgb,var(--apple,#7FB24A) 14%,#fff);color:var(--forest,#1C433B)}
.mn-carte.petite .mn-ic{width:46px;height:46px}
.mn-txt{display:flex;flex-direction:column;min-width:0;flex:1}
.mn-lab{font-size:10.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--terra,#B5652E)}
.mn-carte .mn-plat{font-weight:800;font-size:16.5px;line-height:1.2;margin-top:3px;color:var(--forest,#1C433B)}
.mn-carte .mn-acc{font-size:13px;color:var(--ink2,#5A6A62);margin-top:1px}
.mn-bas{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:8px}
.mn-prix{font-size:15px;font-weight:800;color:#fff;background:var(--forest,#1C433B);padding:3px 11px;border-radius:20px}
.mn-voir{font-size:12px;font-weight:800;color:var(--apple,#6E9B3A);white-space:nowrap}
.mn-carte.petite .mn-voir{align-self:center}
.mn-ruban{position:absolute;top:16px;right:-38px;width:150px;text-align:center;transform:rotate(35deg);background:var(--gold,#C9972C);color:#fff;font-size:9.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;padding:3px 0;box-shadow:0 1px 3px rgba(0,0,0,.2)}
.mn-carte:not(.petite) .mn-txt{padding-right:18px}
.mn-fumee{animation:mnFumee 2.6s ease-in-out infinite}
@keyframes mnFumee{0%,100%{transform:translateY(1px);opacity:.25}50%{transform:translateY(-2px);opacity:.7}}
.mn-fond{position:fixed;inset:0;z-index:480;background:rgba(14,24,20,.55);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);display:flex;align-items:flex-end;justify-content:center;animation:mnFond .25s ease}
@keyframes mnFond{from{opacity:0}}
.mn-feuille{position:relative;width:100%;max-width:440px;max-height:92vh;overflow-y:auto;-webkit-overflow-scrolling:touch;border-radius:24px 24px 0 0;padding:26px 20px calc(20px + env(safe-area-inset-bottom));
  background:#FFFDF7 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cg fill='%23C9972C' opacity='.06'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='80' cy='60' r='1.6'/%3E%3Ccircle cx='40' cy='100' r='1.4'/%3E%3C/g%3E%3C/svg%3E");
  animation:mnMonte .38s cubic-bezier(.2,.9,.3,1);color:#2A2A24;box-shadow:0 -10px 40px rgba(0,0,0,.2)}
@keyframes mnMonte{from{transform:translateY(40px);opacity:0}}
.mn-feuille::before{content:"";position:absolute;inset:9px 9px 0;border:1.5px solid color-mix(in srgb,var(--gold,#C9972C) 55%,transparent);border-bottom:none;border-radius:18px 18px 0 0;pointer-events:none}
.mn-tete{text-align:center;margin-bottom:14px}
.mn-four{font-size:10.5px;font-weight:800;letter-spacing:.24em;text-transform:uppercase;color:var(--terra,#B5652E)}
.mn-titre{font-family:'Sacramento',cursive;font-size:46px;line-height:1.05;color:var(--forest,#1C433B);margin:4px 0 2px}
.mn-dates{display:flex;align-items:center;justify-content:center;gap:10px;font-size:13px;font-weight:700;color:var(--ink2,#5A6A62)}
.mn-dates i{width:28px;height:1px;background:var(--gold,#C9972C)}
.mn-liste{display:flex;flex-direction:column;gap:2px;margin-top:6px}
.mn-ligne{position:relative;display:grid;grid-template-columns:76px 1fr auto;align-items:center;gap:10px;padding:13px 10px;border-bottom:1px dotted color-mix(in srgb,var(--gold,#C9972C) 50%,transparent)}
.mn-ligne:last-child{border-bottom:none}
.mn-jour span{display:block;font-weight:800;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--forest,#1C433B)}
.mn-jour small{font-size:11px;color:var(--ink3,#93A099)}
.mn-desc .mn-plat{font-weight:800;font-size:15.5px;line-height:1.25;color:#2A2A24}
.mn-desc .mn-acc{font-size:13px;color:var(--ink2,#5A6A62);margin-top:2px;font-style:italic}
.mn-px{font-weight:800;font-size:14px;color:var(--forest,#1C433B);border:1.5px solid color-mix(in srgb,var(--gold,#C9972C) 70%,transparent);padding:3px 9px;border-radius:20px;white-space:nowrap}
.mn-ligne.auj{background:color-mix(in srgb,var(--apple,#7FB24A) 13%,#fff);border-radius:14px;border-bottom-color:transparent;box-shadow:inset 0 0 0 1.5px color-mix(in srgb,var(--apple,#7FB24A) 55%,transparent)}
.mn-ligne.auj .mn-px{background:var(--forest,#1C433B);color:#fff;border-color:var(--forest,#1C433B)}
.mn-auj{display:inline-block;margin-top:5px;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#fff;background:var(--apple,#6E9B3A);padding:2px 8px;border-radius:10px}
.mn-ligne.passe{opacity:.45}
.mn-msg{margin:16px 6px 0;text-align:center;font-family:'Sacramento',cursive;font-size:24px;line-height:1.15;color:var(--terra,#9A4A2A)}
.mn-pied{margin-top:10px;text-align:center;font-size:11px;color:var(--ink3,#93A099)}
.mn-fermer{display:block;width:100%;margin-top:16px;padding:13px;border:none;border-radius:14px;background:var(--forest,#1C433B);color:#fff;font:inherit;font-weight:800;font-size:15px;cursor:pointer}
.mn-apercu .mn-feuille{border-radius:20px;max-height:none;animation:none;box-shadow:0 4px 18px rgba(0,0,0,.08);border:1px solid #EEE6D4}
.mn-apercu .mn-feuille::before{border-bottom:1.5px solid color-mix(in srgb,var(--gold,#C9972C) 55%,transparent);inset:9px;border-radius:14px}
@media (prefers-reduced-motion: reduce){.mn-fumee,.mn-feuille,.mn-fond{animation:none}}
`;
