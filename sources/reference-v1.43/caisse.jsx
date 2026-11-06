import React, { useState, useEffect, useRef, useMemo } from "react";
import { createRoot } from "react-dom/client";
import jsQR from "jsqr";
import {
  db, auth, CONFIG_REF, doc, collection, onSnapshot, writeBatch, increment,
  onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,
} from "./firebase.js";
import { VERSION } from "./version.js";
import { useMiseAJour, BandeauMaj } from "./maj.jsx";
import { etatRemise, remiseDe, eurosFr } from "./fidelite.js";

// ═══════════════════════════════════════════════════════════
//  ÉPICERIE RADDONNAISE — Caisse (au comptoir)
//  Scanner le QR code du client → sa fiche → nombre de points → points crédités.
//  Même compte que l'administration.
// ═══════════════════════════════════════════════════════════
const CODE_RE = /RAD-[A-Z0-9]{5}/;
const euros = (n) => (Math.round((Number(n) || 0) * 100) / 100).toFixed(2).replace(".", ",") + " €";

const CSS = `
:root{--bg:#F7F3EA;--forest:#1C433B;--apple:#6E9B3A;--apple-soft:#EEF3E2;--terra:#C27B42;--gold:#C69A3C;--red:#C86B5C;
 --ink:#22302A;--ink2:#5C6A62;--ink3:#93A099;--line:#E6E0D2;--script:'Sacramento',cursive;--body:'Nunito',system-ui,sans-serif}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg)}
.cs{min-height:100vh;min-height:100dvh;font-family:var(--body);color:var(--ink);display:flex;flex-direction:column;-webkit-font-smoothing:antialiased;-webkit-tap-highlight-color:transparent}
.cs-top{display:flex;align-items:center;gap:10px;padding:10px 16px;padding-top:calc(10px + env(safe-area-inset-top));background:var(--forest);color:#fff}
.cs-top img{width:36px;height:36px;border-radius:50%;border:2px solid rgba(255,255,255,.85)}
.cs-top h1{font-family:var(--script);font-weight:400;font-size:26px;line-height:1}
.cs-top small{display:block;font-size:9px;letter-spacing:1px;text-transform:uppercase;opacity:.65}
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
@media (min-width:820px) and (orientation:landscape){
  .cs-main.large{max-width:1000px;flex-direction:row;align-items:flex-start;gap:28px}
  .cs-main.large .col{flex:1}
}
`;

const LOGO = "logo.jpg";

// ── Connexion (même compte que l'administration) ──
function Connexion() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [err, setErr] = useState("");
  const go = async () => {
    setErr("");
    try { await signInWithEmailAndPassword(auth, email.trim(), mdp); }
    catch (e) { setErr(e?.code === "auth/too-many-requests" ? "Trop d'essais : réessayez dans quelques minutes." : "E-mail ou mot de passe incorrect."); }
  };
  return (
    <div className="cs-main"><div className="login">
      <div className="titre">Caisse</div>
      <div className="sous">Connectez-vous avec le compte de l'administration.</div>
      <label>E-mail</label><input type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} />
      <label>Mot de passe</label><input type="password" autoComplete="current-password" value={mdp} onChange={e => setMdp(e.target.value)} onKeyDown={e => e.key === "Enter" && go()} />
      {err && <div className="err">{err}</div>}
      <button className="btn" style={{ marginTop: 18 }} onClick={go}>Se connecter</button>
      <button className="lien" onClick={async () => { if (!email.trim()) return setErr("Saisissez d'abord votre e-mail."); try { await sendPasswordResetEmail(auth, email.trim()); setErr("E-mail de réinitialisation envoyé."); } catch { setErr("Envoi impossible."); } }}>Mot de passe oublié ?</button>
    </div></div>
  );
}

// ── Scanner de QR code (appareil photo) ──
function Scanner({ onCode }) {
  const video = useRef(null);
  const [etat, setEtat] = useState("demarrage");   // demarrage | actif | refus | indispo
  useEffect(() => {
    let flux, fini = false, minuteur;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const lire = () => {
      if (fini) return;
      const v = video.current;
      if (v && v.readyState >= 2 && v.videoWidth) {
        const w = 480, h = Math.round(v.videoHeight * w / v.videoWidth);
        canvas.width = w; canvas.height = h;
        ctx.drawImage(v, 0, 0, w, h);
        const r = jsQR(ctx.getImageData(0, 0, w, h).data, w, h, { inversionAttempts: "dontInvert" });
        const m = r && CODE_RE.exec((r.data || "").toUpperCase());
        if (m) { fini = true; try { navigator.vibrate?.(80); } catch { } onCode(m[0]); return; }
      }
      minuteur = setTimeout(lire, 140);
    };
    (async () => {
      if (!navigator.mediaDevices?.getUserMedia) return setEtat("indispo");
      try {
        flux = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 } }, audio: false });
        if (fini) return flux.getTracks().forEach(t => t.stop());
        video.current.srcObject = flux;
        await video.current.play().catch(() => { });
        setEtat("actif"); lire();
      } catch (e) { setEtat(e?.name === "NotAllowedError" ? "refus" : "indispo"); }
    })();
    return () => { fini = true; clearTimeout(minuteur); flux?.getTracks().forEach(t => t.stop()); };
  }, []);
  return (
    <div className="cam">
      <video ref={video} playsInline muted />
      {etat === "actif" && <><div className="cadre" /><div className="ligne" /></>}
      {etat !== "actif" && <div className="msg">
        {etat === "demarrage" && "Ouverture de l'appareil photo…"}
        {etat === "refus" && <>📷<span>L'accès à l'appareil photo a été refusé.<br />Autorisez-le dans les réglages du navigateur, ou saisissez le code ci-dessous.</span></>}
        {etat === "indispo" && <>📷<span>Appareil photo indisponible sur cet appareil.<br />Saisissez le code du client ci-dessous.</span></>}
      </div>}
    </div>
  );
}

// ── Points : incrément atomique + trace dans l'historique (comme l'administration) ──
async function crediter(client, points) {
  const b = writeBatch(db);
  const ref = doc(db, "clients", String(client.id));
  b.update(ref, { points: increment(points), derniere: new Date().toISOString().slice(0, 10) });
  b.set(doc(collection(db, "clients", String(client.id), "historique")), { date: Date.now(), points, type: "achat", source: "caisse" });
  await b.commit();
}

function Caisse({ user }) {
  const [clients, setClients] = useState([]);
  const [fid, setFid] = useState({ parEuro: 1, paliers: [], active: true, remise: { active: true, points: 200, euros: 5 } });
  const [ecran, setEcran] = useState("scan");      // scan | fiche | ok
  const [client, setClient] = useState(null);
  const [saisie, setSaisie] = useState("");
  const [err, setErr] = useState("");
  const [montant, setMontant] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [res, setRes] = useState(null);
  const [cle, setCle] = useState(0);              // relance la caméra
  const maj = useMiseAJour();

  useEffect(() => {
    const u1 = onSnapshot(collection(db, "clients"), s => setClients(s.docs.map(x => ({ ...x.data(), id: x.id }))), e => setErr("Lecture des clients impossible (" + (e?.code || "erreur") + ")."));
    const u2 = onSnapshot(CONFIG_REF, s => s.exists() && setFid(f => ({ ...f, ...(s.data().fidelite || {}) })), () => { });
    return () => { u1(); u2(); };
  }, []);

  const parEuro = Math.max(1, Number(fid.parEuro) || 1);
  const appliquerRemise = async () => {
    const r = remiseDe(fid); if (!r || envoi || (actuel.points || 0) < r.points) return;
    setEnvoi(true);
    try {
      const b = writeBatch(db);
      b.update(doc(db, "clients", String(actuel.id)), { points: increment(-r.points), derniere: new Date().toISOString().slice(0, 10) });
      b.set(doc(collection(db, "clients", String(actuel.id), "historique")), { date: Date.now(), points: -r.points, type: "remise", remise: r.euros, source: "caisse" });
      await b.commit();
      setRes({ remise: true, nom: actuel.nom, euros: r.euros, retires: r.points, apres: (actuel.points || 0) - r.points, debloque: [] });
      setEcran("ok");
    } catch (e) { setErr(e?.code === "permission-denied" ? "Refusé : reconnectez-vous." : "Remise non enregistrée : vérifiez la connexion et réessayez."); }
    setEnvoi(false);
  };
  const actuel = client && (clients.find(c => c.id === client.id) || client);
  const er = actuel && etatRemise(fid, actuel.points || 0);
  const gagnes = parseInt(montant || "0") || 0;   // saisie directe du nombre de points
  const val = gagnes;
  const paliers = [...(fid.paliers || [])].filter(p => p.at > 0).sort((a, b) => a.at - b.at);

  const trouver = (code) => {
    const c = clients.find(x => (x.code || "").toUpperCase() === code.toUpperCase().trim());
    if (!c) { setErr("Aucune carte avec le code " + code.toUpperCase() + "."); setCle(k => k + 1); return; }
    setErr(""); setClient(c); setMontant(""); setSaisie(""); setEcran("fiche");
  };
  const touche = (k) => {
    setMontant(m => {
      if (k === "⌫") return m.slice(0, -1);
      if (k === "C") return "";
      if (m.length >= 4) return m;
      return m === "0" ? k : m + k;
    });
  };
  const valider = async () => {
    if (!val || envoi) return;
    setEnvoi(true);
    try {
      const avant = actuel.points || 0;
      await crediter(actuel, gagnes);
      const apres = avant + gagnes;
      const debloque = paliers.filter(p => p.at > avant && p.at <= apres);
      setRes({ nom: actuel.nom, gagnes, apres, montant: val, debloque, dispo: paliers.filter(p => p.at <= apres) });
      setEcran("ok");
    } catch (e) {
      setErr(e?.code === "permission-denied" ? "Refusé : reconnectez-vous." : "Points non enregistrés : vérifiez la connexion et réessayez.");
    }
    setEnvoi(false);
  };
  const suivant = () => { setClient(null); setRes(null); setMontant(""); setErr(""); setEcran("scan"); setCle(k => k + 1); };
  useEffect(() => { if (ecran !== "ok") return; const t = setTimeout(suivant, 8000); return () => clearTimeout(t); }, [ecran]);

  const prochain = actuel && paliers.find(p => p.at > (actuel.points || 0));
  const initiale = (actuel?.nom || "?").trim()[0]?.toUpperCase();

  return (
    <>
      {ecran === "scan" && <div className="cs-main">
        <div className="titre">Scanner la carte</div>
        <div className="sous">Le client affiche son QR code (onglet Fidélité de son appli).</div>
        <Scanner key={cle} onCode={trouver} />
        <div className="saisie">
          <input className="inp" placeholder="RAD-XXXXX" value={saisie} maxLength={9} onChange={e => setSaisie(e.target.value.toUpperCase())} onKeyDown={e => e.key === "Enter" && saisie && trouver(saisie)} aria-label="Code de la carte" />
          <button className="btn" disabled={saisie.length < 5} onClick={() => trouver(saisie.startsWith("RAD-") ? saisie : "RAD-" + saisie.replace(/^RAD/, ""))}>OK</button>
        </div>
        {err && <div className="err">{err}</div>}
        {!fid.active && <div className="err">Le programme de fidélité est désactivé dans l'administration.</div>}
        <div className="compte">Connecté : {user.email} · {clients.length} carte{clients.length > 1 ? "s" : ""}</div>
      </div>}

      {ecran === "fiche" && actuel && <div className="cs-main large">
        <div className="col" style={{ width: "100%" }}>
          <div className="fiche">
            <div className="av">{initiale}</div>
            <div style={{ minWidth: 0 }}><div className="nm">{actuel.nom}</div><div className="cd">{actuel.code}</div></div>
            <div className="pt"><b>{actuel.points || 0}</b><span>points</span></div>
          </div>
          {er ? (er.nb > 0
            ? <button className="btn terra" style={{ marginTop: 10 }} disabled={envoi} onClick={appliquerRemise}>🎁 Appliquer {eurosFr(er.euros)} de remise (−{er.points} points){er.nb > 1 ? " · " + er.nb + " dispo." : ""}</button>
            : <div className="palier">Encore {er.manque} point{er.manque > 1 ? "s" : ""} pour {eurosFr(er.euros)} de remise<div className="barre"><i style={{ width: er.progres * 100 + "%" }} /></div></div>)
          : prochain ? <div className="palier">Encore {prochain.at - (actuel.points || 0)} point{prochain.at - (actuel.points || 0) > 1 ? "s" : ""} pour « {prochain.label || "la récompense"} »
            <div className="barre"><i style={{ width: Math.min(100, (actuel.points || 0) / prochain.at * 100) + "%" }} /></div></div>
            : paliers.length ? <div className="palier">🎁 Toutes les récompenses sont atteintes</div> : null}
          <div className="ecran">
            <div className="m">{montant ? "+" + gagnes : <span style={{ color: "#C9C3B6" }}>0</span>}</div>
            <div className="p">{val ? "point" + (gagnes > 1 ? "s" : "") + " · nouveau total " + ((actuel.points || 0) + gagnes) : "Points à créditer"}</div>
          </div>
        </div>
        <div className="col" style={{ width: "100%" }}>
          <div className="pave">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map(k => <button key={k} onClick={() => touche(k)} aria-label={k === "⌫" ? "Effacer" : k === "C" ? "Tout effacer" : k}>{k}</button>)}
          </div>
          {err && <div className="err">{err}</div>}
          <div className="actions">
            <button className="btn gh" onClick={suivant}>Annuler</button>
            <button className="btn" disabled={!val || envoi} onClick={valider}>
              {envoi ? "Envoi…" : !val ? "Créditer" : "Créditer " + gagnes + " point" + (gagnes > 1 ? "s" : "")}</button>
          </div>
          <div className="compte" style={{ textAlign: "center" }}>{parEuro === 1 ? "1 € = 1 point" : "1 point par tranche de " + parEuro + " €"}{remiseDe(fid) ? " · " + remiseDe(fid).points + " points = " + eurosFr(remiseDe(fid).euros) + " de remise" : ""}</div>
        </div>
      </div>}

      {ecran === "ok" && res?.remise && <div className="cs-main"><div className="ok">
        <div className="rond" style={{ background: "var(--terra)" }}>🎁</div>
        <div className="plus" style={{ color: "var(--terra)" }}>−{eurosFr(res.euros)}</div>
        <div className="tot">Remise à déduire du ticket de {res.nom}<br />{res.retires} points utilisés · il reste <b>{res.apres} points</b></div>
        <button className="btn" style={{ marginTop: 22 }} onClick={suivant}>Client suivant</button>
        <div className="compte">Retour automatique dans quelques secondes</div>
      </div></div>}
      {ecran === "ok" && res && !res.remise && <div className="cs-main"><div className="ok">
        <div className="rond">✓</div>
        <div className="plus">+{res.gagnes} point{res.gagnes > 1 ? "s" : ""}</div>
        <div className="tot">{res.nom}<br />Nouveau total : <b>{res.apres} points</b></div>
        {res.debloque.map(p => <div className="cadeau" key={p.at}>🎁 Récompense débloquée : {p.label || p.at + " points"}</div>)}
        {(() => { const e = etatRemise(fid, res.apres); return e && e.nb > 0 && <div className="cadeau">🎁 {eurosFr(e.valeur)} de remise disponible : utilisable dès maintenant ou au prochain passage</div>; })()}
        <button className="btn" style={{ marginTop: 22 }} onClick={suivant}>Client suivant</button>
        <div className="compte">Retour automatique dans quelques secondes</div>
      </div></div>}
      <BandeauMaj dispo={maj} />
    </>
  );
}

function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => onAuthStateChanged(auth, u => setUser(u || null)), []);
  return (
    <div className="cs">
      <style>{CSS}</style>
      <header className="cs-top">
        <img src={LOGO} alt="" />
        <div><h1>Caisse</h1><small>Épicerie Raddonnaise · v{VERSION}</small></div>
        {user && <button onClick={() => confirm("Se déconnecter de la caisse ?") && signOut(auth)}>Déconnexion</button>}
      </header>
      {user === undefined ? <div className="cs-main"><div className="sous" style={{ marginTop: "30vh" }}>Chargement…</div></div>
        : user ? <Caisse user={user} /> : <Connexion />}
    </div>
  );
}

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => { });
createRoot(document.getElementById("root")).render(<App />);
