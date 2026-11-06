import React, { useState, useEffect, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import qrcode from "qrcode-generator";
import { VERSION } from "./version.js";
import { useMiseAJour, BandeauMaj, BoutonMaj } from "./maj.jsx";
import { themeDuJour, Particules, CarteTheme, CSS_THEMES } from "./themes.jsx";
import { etatRemise, eurosFr } from "./fidelite.js";
import { fermeLe, fermetureAAnnoncer, texteFermeture } from "./boutique.js";
import { cmdCfg, regleDates, euros, isoDe, dansJours, dateLongue, prixPers, bornes, numeroCommande, envoyerMail, avertirMessage, avertirResa, choixDe, prixAvecChoix, MODES, SUIVI, heureFr, dateRetrait, fichierAgenda, lienGoogleAgenda } from "./commande.js";
import { db, CONFIG_REF, nouveauCode, doc, collection, onSnapshot, addDoc, getDoc, getDocs, writeBatch, increment } from "./firebase.js";
import { CHAT_KEY, MAX_TEXTE, apercu, heureMsg, jourMsg, refId } from "./chat.js";

// ═══════════════════════════════════════════════════════════
//  ÉPICERIE RADDONNAISE — Application client
//  Coquille vide : tout vient de l'application d'administration.
// ═══════════════════════════════════════════════════════════
const USER_KEY = "epicerie-raddonnaise-carte";
const LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQDAwMDAgQDAwMEBAQFBgoGBgUFBgwICQcKDgwPDg4MDQ0PERYTDxAVEQ0NExoTFRcYGRkZDxIbHRsYHRYYGRj/2wBDAQQEBAYFBgsGBgsYEA0QGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBgYGBj/wAARCABoAHgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD5wOO9Bx3oOKDitTxQ4zRxmjjNHGaADjNHGaD1rQh0PV7jQrjW4tOnbTrcgS3W3CAkgAZ7nJHSplJR3YGfxmjjNX9P0+O9chpyG2u4jjXc5CKWYnJAAAB5z+FTXmkQx+GrbXrG6aa1luGtJElTY8MqqHwcEgqVbIPsQQO9BYyuM0cZqa1tp729jtbWMySyHCjIHbJOT0AGTmmPFIkskbId0ZIfHOMHH86AGcZo4zRxmjjNIA4zRxmjjNHGaAAY7UUDFFAAaDig0HFMA71oaVoer65cSQ6Tp0920SGSTylyEUDOWPQdDVOOGaZisMMkhA3EIpbA9eK7TwJ4k8Tabp9/oWiJAlvqJCzXEiZaLjaWTkbiASdvJ44FY13UUP3Su/MaOOs7Sa/vI7a2UM7sFyxwq5OMsegGSOTxXpdlJ4rvvhu3gy+EFvpdo8olWMATMyeXKI93IJPm7gAMtsIrIvr7SPDdu1gIbO6uDaJbTQW5KvDMpyzmZcq/8QBGSQ+DggGuPvtTv9RKC+upJlTIRGOVQE5wP89hVTpQqW51ezuvUext+F57fQ/F8t3cxW91ZRW9xbzeaRj54HTgZ5OWxxmtVUmbR7DVI9Lb+wDazvCtrAZYrK92hZDJk8kbVI3H7pTHSuDJVVycADv6VoaJY3uu30emaXIXFwdzAOdmB/E2OwqpTjBOUtEgvZHb6be+Df7Sf7Df29k17G8ZuLuBleCSS4AzxlQiw9ADyS2cCopdET/hDlt9H/cfapS1y8kouGY72EcYKD5m2xs5xwu4+vF/UvAGh6D4Lvr+6lkubuOElZC21Q54GFHue9ebWt9e2KSpZXk9uJhiQROV3geuPqfzrmwmNp4pN09loJSTC6s7qykRLu3eEuu5N4xuXJGR7ZBqDjNdjpviKx1iS0sPE8IljiJSHDiOMZARAf7iJySRnOTxk5FS48Fah/wkkGk2c1u8lxdC1jV5RujLcqJMfKG24JAJIzziumTUU23oFuxzPejvXR+NfCj+C/Ey6LNfR3cwt0lkeNdoDNn5Rnnt+tc53qadSNSKnB6MQDFFAxRVgBoJoNBxTA6PwsNMvbg6NqEF8z3EySQmyZQ0jKGxC2SOGJABHIOODmtXwjrM2i2F5/aEMttpk1yEjdh81rcbWKvGWB+ZNqbiBnHXtXEBirBlJDA5BBwQavaprmta5PHNrWrXuoyRLsja6maQovoMnigaZVuUjivJoo5xOiuQso/jGfvfjUtlp2o6nMYtN0+6vHHVbeFpCPyBrqvhf4Cn+IPj6HSN0kdlEPOu5UHzLGDjav8AtMSAPz7V9q6d4XsvB9hHoun6SmlwxqCIVXBI/vE9WJ9TXhZrnccC+SMeaX4L1LhTctT4CvtE1ayUpqOkX9sCMHzrd0/mK2PgreW2lXuqwXUdxJNEfJhSGFpXYbs4AUH2r7ivhbt8sqF3I471zGjeE4dD8R65rNqHH9rzRTyRbAqxskYT5ceuAa+fr8SrEUZU6lO3o/NeRsqa5JRb3seQ6h4A8bePLdIZY4vD+kgh8XZ3TzHsSi/dHsTXL+I/gD4p0ewa90m7t9ZVBl4YlMcuPZSSG+gOa+rraG2kQt5RyOPmNLNZRshMQ2sOw6GvOoZ9iqFlSso9rfrv+JPsVY/Pl1ZJGjkQo6kqysMEHuCK7bwjqUmszW+g6hPDvRwYJpZPLlZeSYlk2nbk87spwOWwMV6B8ffAkFusfjTTYFjLyCG/RBgMT92T69j+FeExztBcJJDKY5VOVIOCDX6Bl+OhjaCrR67rszFpxdjR16C+h16d9RljlnlJkLxymVSMkcM3JAxgZ7Dv1rM71JNcS3MokmYMwGBhQvH0AqPvXalbREgMUUDFFAATignFBOKCcUwDPNV576C3uord93mSEBQB61YzzWZqunvdTQXUTvvtzuCA43DOT+NTK9tDSkouVpvQ+vP2RoLeys9R1xrdppW1COEqi5YqqZAH4vmvoPxPqq6v4he4SF4kRREFkGG465Hbk18zfsj+LorWTWLG2eN54ZY72ON+pBGxwR7fL+dfQ15dSXuoTXkwUPK5dgvQZr88z2tKNWrRb3kna3Sytr+h0w0hYgIBOSATS1yGq/EvwtpHitvD08moXF3E6R3DWdjLcRWrPjYJXRSEJyDz61154BJ4A714Eqc4JOStcpprcKK5fxHqHj1dWhsPBXhWx1FfJM897qN2YIF5wIl2hmLnrkjAHrXRWb3UmnwSX1sttdNGplgV94jfHKhuM4PGaudCcYKo9mNwaSk9mcR8TbGK/wDhp4ktZANps5HHsyjeD+YFfBxiuP8AhMfMjQGHywz89MjGfrxX3L8XdWOlfCXxJdpgySW7W8Sk4yzkIP518W2lu0Ks0r75ZDudsY/Ae1fZ8Jxl7Cb6c36GLnyXfdWLA9KM80Z5xRnmvrTlAHNFAOaKAAnFBOKCcUE4pgGeaD6UZ5ozzQBv+A/Ez+B/iNY+J7eHeYiY7hF4MsLcOv8AUe4FfdGlapYa3ottq2l3KXFncxiSKVTwQf69iPWvz4PXFekfCz4t6l8Pr02N2kl9ocz7pLYH5oSf4489D6joa+bz/J3i4qtSXvr8V/mawqW0Z9o2z2lvbzKLRPMlO5nAA3HGMn14FcX4i+GvhLxdr39q+I7S8vmFt9mW2+3TRQAZJ3bEYAtzjJ9q0fDvjHw54q0tb/Q9TiuYiOVB+dD6MvUH61D4m8aaF4V077brGow2kXQGTJZz6Ko5P4V8UsRiYzjCOko6JJanb9Ylo09jodNjTSNOgsLAeXbwRLDGh+baqjAHPsKbczbI2kJyx/U1xmkfFLwdrFi1za+JNNKr94TyiBl+qtg1578RvjtpenWUlh4UuotS1KQFRdR/NBbj1B6O3pjj19KqnhMZiZLDqL073su/oZyrPls3oct+0H4xju7618HWMoZbZvtF4VOf3mPlT8AST9RXhw64qSaee6upLm5leWaVi8kjnLMx5JJqPPNfpOX4KODoRox6b+bOKTu7hnmjPNGeaM812iAHNFANFAATQTQaCaYBnmjPNHejvQAZ5oJ5o70GgDPgvtbi1vy4DLZxhwwuLeUoSo5xkHucVrXV5d39x517dz3Mn9+aQufzJquYwTzmjYBwCahQV+a2pc581rKwrKrAq6gg9jWbbWeoQ6mB9qAsYwQkY6nPY/StEoDwSaAgDcEiqauEZuKaXUdnnFGeaM80Z5pkBnmjPNHejvSAAaKAaKAA0HNFFMA70d6KKQB3o5zRRQAc5o5zRRTAO9HOaKKADnNHOaKKADvR3oopAAzRRRQB/9k=";

const EMPTY = {
  store: { name: "Épicerie Raddonnaise", slogan: "Épicerie locale & familiale",
    address: "4 avenue des Vosges, 70280 Raddon-et-Chapendu", phone: "03 84 94 60 11",
    email: "epicerie.raddonnaise@outlook.fr", facebook: "" },
  hours: [
    { day: "Lundi", am: "8h30 - 13h00", pm: "16h00 - 19h30" },
    { day: "Mardi", am: "7h00 - 19h30", pm: "" },
    { day: "Mercredi", am: "7h00 - 19h30", pm: "" },
    { day: "Jeudi", am: "7h00 - 19h30", pm: "" },
    { day: "Vendredi", am: "7h00 - 19h30", pm: "" },
    { day: "Samedi", am: "7h00 - 19h30", pm: "" },
    { day: "Dimanche", am: "8h30 - 12h00", pm: "" },
  ],
  // Sources : Pappers / RNE (SARL LTMP, immatriculée le 12/09/2023 au greffe de Vesoul)
  legal: { raison: "LTMP", forme: "SARL", capital: "3 000", siren: "979 301 132", rcs: "RCS Vesoul 979 301 132", responsable: "Marion Parnaso",
    tva: "FR00979301132", naf: "47.11B — Commerce d'alimentation générale",
    emailDonnees: "epicerie.raddonnaise@outlook.fr", hebergementDonnees: "Union européenne", conservation: 3 },
  services: [], annonce: { active: false, text: "", couleur: "apple" },
  jour: { items: [], maj: "" },
  offres: [], actus: [],
  fidelite: { active: true, parEuro: 1, paliers: [], titre: "Carte de fidélité",
    sousTitre: "1 € dépensé = 1 point · 200 points = 5 € de remise", total: 10, remise: { active: true, points: 200, euros: 5 } },
  clients: [],
  onglets: { carte: true, fidelite: true },
};

const TYPES = {
  frais: { label: "Frais du jour", c: "#6E9B3A", bg: "#EEF3E2" },
  plat: { label: "Fait maison", c: "#1C433B", bg: "#E4EDE9" },
  promo: { label: "Promo", c: "#C27B42", bg: "#FBEFE4" },
  gaspi: { label: "Date courte", c: "#B08A2E", bg: "#FAF2DC" },
  panier: { label: "Panier anti-gaspi", c: "#2E7D32", bg: "#E3F1E3" },
};

const aujourdISO = () => new Date().toLocaleDateString("sv-SE");
// Visible si actif ET dans sa période de parution (dates vides = pas de limite)
const enCours = (x) => !!x && x.active !== false && (!x.debut || x.debut <= aujourdISO()) && (!x.fin || x.fin >= aujourdISO());
const dateFr = (iso) => iso ? new Date(iso + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "";
// QR code dessiné par l'application (aucun service extérieur, fonctionne hors ligne)
function QR({ texte, taille = 148, couleur = "#1C433B", style }) {
  const chemin = useMemo(() => {
    const q = qrcode(0, "M"); q.addData(texte); q.make();
    const n = q.getModuleCount(); let d = "";
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.isDark(y, x)) d += "M" + x + " " + y + "h1v1h-1z";
    return { d, n };
  }, [texte]);
  return (
    <svg role="img" aria-label={"QR code " + texte} viewBox={"0 0 " + chemin.n + " " + chemin.n} width={typeof taille === "number" ? taille : undefined} height={typeof taille === "number" ? taille : undefined}
      shapeRendering="crispEdges" style={{ display: "block", background: "#fff", ...style }}>
      <path d={chemin.d} fill={couleur} />
    </svg>
  );
}

const tri = (l, desc) => [...l].sort((x, y) => desc ? (y.cree || 0) - (x.cree || 0) : (x.cree || 0) - (y.cree || 0));

// Contenu publié par Marion (lecture seule, temps réel)
function useShop() {
  const [cfg, setCfg] = useState({});
  const [cols, setCols] = useState({ offres: [], actus: [], jour: [], pubs: [], plateaux: [] });
  useEffect(() => {
    const u = [onSnapshot(CONFIG_REF, s => setCfg(s.exists() ? s.data() : {}), () => { })];
    ["offres", "actus", "jour", "pubs", "plateaux"].forEach(c => u.push(onSnapshot(collection(db, c),
      s => setCols(p => ({ ...p, [c]: s.docs.map(x => ({ ...x.data(), id: x.id })) })), () => { })));
    return () => u.forEach(f => f());
  }, []);
  return useMemo(() => {
    const base = { ...EMPTY, ...cfg };
    return { ...base, fermetures: Array.isArray(base.fermetures) ? base.fermetures : [], carteActive: base.onglets?.carte !== false, fidActive: base.onglets?.fidelite !== false && !!base.fidelite?.active,
      offres: tri(cols.offres), plateaux: [...cols.plateaux].sort((x, y) => (x.ordre ?? x.cree ?? 0) - (y.ordre ?? y.cree ?? 0)), actus: tri(cols.actus, true), jour: { items: tri(cols.jour, true), maj: base.jourMaj || "" },
      pubs: [...cols.pubs].filter(enCours).sort((x, y) => (x.ordre ?? x.cree ?? 0) - (y.ordre ?? y.cree ?? 0)) };
  }, [cfg, cols]);
}

// Ma carte : on garde sur le téléphone l'identifiant secret de la fiche,
// et on suit les points en temps réel.
function useMoi() {
  const lire = () => { try { const s = localStorage.getItem(USER_KEY); const u = s ? JSON.parse(s) : null; return u && u.ref ? u : null; } catch { return null; } };
  const [moi, setMoi] = useState(lire);
  const save = (u) => {
    setMoi(u);
    try { u ? localStorage.setItem(USER_KEY, JSON.stringify(u)) : localStorage.removeItem(USER_KEY); } catch { }
  };
  useEffect(() => {
    if (!moi?.ref) return;
    return onSnapshot(doc(db, "clients", moi.ref), s => {
      if (s.exists()) {
        const x = s.data();
        save({ ref: s.id, code: x.code, nom: x.nom, points: x.points || 0 });
      } else if (!s.metadata.fromCache) save(null);   // carte supprimée par l'épicerie
    }, () => { });
  }, [moi?.ref]);
  return [moi, save];
}

// ═══════ INSTALLATION SUR L'ÉCRAN D'ACCUEIL ═══════
// Chaque navigateur a sa méthode : on détecte le téléphone et on n'affiche
// que les étapes qui le concernent.
const INSTALL_KEY = "epicerie-raddonnaise-install-masque";

function plateforme() {
  const ua = navigator.userAgent || "";
  const ios = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const android = /Android/i.test(ua);
  const inApp = /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Messenger|Snapchat|TikTok|musical_ly|LinkedInApp|Line\/|; wv\)/i.test(ua);
  const appli = /Instagram/i.test(ua) ? "Instagram" : /Messenger|Orca/i.test(ua) ? "Messenger" : /FBAN|FBAV|FB_IAB|FBIOS/i.test(ua) ? "Facebook" : "cette application";
  const samsung = /SamsungBrowser/i.test(ua);
  const firefox = /Firefox|FxiOS/i.test(ua);
  const chromeIOS = /CriOS/i.test(ua);
  const autreIOS = ios && /FxiOS|EdgiOS|OPiOS|GSA\//i.test(ua);
  const mobile = ios || android;
  const ipad = /iPad/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  return { ipad, ios, android, inApp, appli, samsung, firefox, chromeIOS, autreIOS, mobile };
}

function useInstall() {
  const p = useMemo(plateforme, []);
  const [evt, setEvt] = useState(null);
  const [ouvert, setOuvert] = useState(false);
  const [masque, setMasque] = useState(() => { try { return localStorage.getItem(INSTALL_KEY) === "1"; } catch { return false; } });
  const [installee, setInstallee] = useState(() =>
    window.matchMedia?.("(display-mode: standalone)").matches || window.navigator.standalone === true);
  useEffect(() => {
    const avant = (e) => { e.preventDefault(); setEvt(e); };
    const fait = () => { setEvt(null); setInstallee(true); setOuvert(false); };
    window.addEventListener("beforeinstallprompt", avant);
    window.addEventListener("appinstalled", fait);
    return () => { window.removeEventListener("beforeinstallprompt", avant); window.removeEventListener("appinstalled", fait); };
  }, []);
  const direct = async () => { if (!evt) return; evt.prompt(); try { await evt.userChoice; } catch { } setEvt(null); };
  return {
    p, evt, installee, ouvert,
    possible: !installee,
    bandeau: !installee && !masque,
    // Un clic : installation directe si le navigateur le permet, sinon l'assistant
    lancer: () => { if (evt && !p.inApp) direct(); else setOuvert(true); },
    direct,
    fermerAssistant: () => setOuvert(false),
    fermer: () => { setMasque(true); try { localStorage.setItem(INSTALL_KEY, "1"); } catch { } },
  };
}

// Petites icônes qui ressemblent aux vrais boutons des navigateurs
const IcPartage = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: "-3px" }}><path d="M12 3v12M8 7l4-4 4 4" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" /></svg>;
const IcPoints = ({ v }) => <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: "-3px" }}>{v ? <><circle cx="12" cy="5" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="19" r="2" /></> : <><circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></>}</svg>;
const IcMenu = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={{ verticalAlign: "-3px" }}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
const IcPlus = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ verticalAlign: "-3px" }}><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M12 8v8M8 12h8" /></svg>;
const Bt = ({ children }) => <span className="bt">{children}</span>;

function AssistantInstall({ inst }) {
  const { p } = inst;
  const [msg, setMsg] = useState("");
  const lien = location.origin + location.pathname;
  const copier = async () => {
    try { await navigator.clipboard.writeText(lien); setMsg("Lien copié ✓ — collez-le dans " + (p.ios ? "Safari" : "Chrome")); }
    catch { setMsg("Appuyez longuement sur le lien ci-dessous pour le copier"); }
  };

  let titre = "Installer l'application", etapes = [], bas = null, fleche = null;

  if (p.inApp) {
    titre = "Ouvrez d'abord dans votre navigateur";
    etapes = [
      <>Vous êtes dans <b>{p.appli}</b> : l'installation n'y est pas possible.</>,
      <>Touchez <Bt><IcPoints /></Bt> en haut à droite, puis <b>« Ouvrir dans {p.ios ? "Safari" : "le navigateur"} »</b>.</>,
      <>Une fois la page ouverte, touchez à nouveau <b>Installer l'application</b>.</>,
    ];
    bas = <>
      {p.android && <a className="btn" style={{ display: "block", textAlign: "center", textDecoration: "none", marginBottom: 8 }}
        href={"intent://" + location.host + location.pathname + "#Intent;scheme=https;package=com.android.chrome;end"}>Ouvrir dans Chrome</a>}
      <button className="btn gh" onClick={copier}>Copier le lien</button>
    </>;
  } else if (inst.evt) {
    titre = "Installer en un clic";
    etapes = [<>Touchez le bouton ci-dessous, puis confirmez <b>« Installer »</b>.</>];
    bas = <button className="btn" onClick={inst.direct}>Installer maintenant</button>;
  } else if (p.ios && !p.chromeIOS && !p.autreIOS) {
    etapes = [
      <>Touchez <Bt><IcPartage /> Partager</Bt> {p.ipad ? "en haut de l'écran" : "en bas de l'écran"}.<br /><span className="pt2">Sur les iPhone récents, il est dans le menu <Bt><IcPoints /></Bt> en bas à droite.</span></>,
      <>Faites défiler et touchez <Bt><IcPlus /> Sur l'écran d'accueil</Bt>.</>,
      <>Touchez <b>Ajouter</b> en haut à droite. C'est fait !</>,
    ];
    fleche = "bas";
  } else if (p.chromeIOS) {
    etapes = [
      <>Touchez <Bt><IcPartage /></Bt> en haut à droite, dans la barre d'adresse.</>,
      <>Choisissez <Bt><IcPlus /> Ajouter à l'écran d'accueil</Bt>.</>,
      <>Touchez <b>Ajouter</b>.</>,
    ];
    bas = <div className="pt2" style={{ textAlign: "center" }}>L'option n'apparaît pas ? Ouvrez le lien dans <b>Safari</b> :<button className="btn gh" style={{ marginTop: 8 }} onClick={copier}>Copier le lien</button></div>;
  } else if (p.ios) {
    etapes = [
      <>Sur iPhone, l'installation se fait depuis <b>Safari</b>.</>,
      <>Copiez le lien, ouvrez <b>Safari</b> et collez-le dans la barre d'adresse.</>,
      <>Touchez ensuite <b>Installer l'application</b>.</>,
    ];
    bas = <button className="btn" onClick={copier}>Copier le lien</button>;
  } else if (p.samsung) {
    etapes = [
      <>Touchez <Bt><IcMenu /></Bt> en bas à droite.</>,
      <>Touchez <Bt>Ajouter page à</Bt> puis <b>« Écran d'accueil »</b>.</>,
      <>Confirmez avec <b>Ajouter</b>.</>,
    ];
    fleche = "basdroite";
  } else if (p.firefox) {
    etapes = [
      <>Touchez <Bt><IcPoints v /></Bt> (menu du navigateur).</>,
      <>Touchez <Bt>Installer</Bt> ou <b>« Ajouter à l'écran d'accueil »</b>.</>,
      <>Confirmez.</>,
    ];
  } else if (p.android) {
    etapes = [
      <>Touchez <Bt><IcPoints v /></Bt> en haut à droite.</>,
      <>Touchez <Bt>Installer l'application</Bt> ou <b>« Ajouter à l'écran d'accueil »</b>.</>,
      <>Confirmez avec <b>Installer</b>.</>,
    ];
    fleche = "hautdroite";
  } else {
    titre = "Installez-la sur votre téléphone";
    etapes = [<>Scannez ce code avec l'appareil photo de votre téléphone pour ouvrir l'application, puis touchez <b>Installer l'application</b>.</>];
    bas = <div style={{ textAlign: "center" }}><QR texte={lien} taille={170} style={{ display: "inline-block" }} /></div>;
  }

  return (
    <div className="sheet-bg" onClick={inst.fermerAssistant}>
      {fleche && <div className={"fleche " + fleche}>↓</div>}
      <div className={"sheet" + (fleche && fleche.startsWith("bas") ? " avec-fleche" : "")} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <img src={LOGO} alt="" style={{ width: 48, height: 48, borderRadius: 12 }} />
          <div style={{ flex: 1, fontFamily: "var(--script)", fontSize: 27, color: "var(--forest)", lineHeight: 1.05 }}>{titre}</div>
          <button className="ix" aria-label="Fermer" onClick={inst.fermerAssistant}>×</button>
        </div>
        <ol className="etapes">{etapes.map((e, i) => <li key={i}><span className="num">{i + 1}</span><div>{e}</div></li>)}</ol>
        {bas && <div style={{ marginTop: 14 }}>{bas}</div>}
        {msg && <div className="pt2" style={{ textAlign: "center", marginTop: 10, color: "var(--apple)", fontWeight: 800 }}>{msg}</div>}
        {(p.inApp || p.ios) && msg && <div style={{ marginTop: 8, padding: "9px 11px", background: "var(--bg)", borderRadius: 10, fontSize: 12.5, wordBreak: "break-all", userSelect: "all", WebkitUserSelect: "all" }}>{lien}</div>}
        <div className="pt2" style={{ textAlign: "center", marginTop: 14 }}>Facultatif : sans installation, votre carte reste mémorisée sur ce téléphone.</div>
      </div>
    </div>
  );
}

// Encart « Installer » (accueil, fidélité, infos)
function Installer({ inst, compact, texte }) {
  if (!inst.possible) return null;
  return (
    <div className="inst">
      <img src={LOGO} alt="" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="it">Installer l'application</div>
        <div className="id">{texte || "Retrouvez l'épicerie et votre carte d'un geste."}</div>
      </div>
      <button className="ib2" onClick={inst.lancer}>Installer</button>
      {!compact && <button className="ix" aria-label="Fermer" onClick={inst.fermer}>×</button>}
    </div>
  );
}

// Proposée une seule fois, juste après la création de la carte
function ProposeInstall({ inst, onClose }) {
  return (
    <div className="sheet-bg" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()} style={{ textAlign: "center" }}>
        <img src={LOGO} alt="" style={{ width: 70, height: 70, borderRadius: 18, marginBottom: 10 }} />
        <div style={{ fontFamily: "var(--script)", fontSize: 31, color: "var(--forest)", lineHeight: 1 }}>Votre carte est prête !</div>
        <p style={{ fontSize: 13.5, color: "var(--ink2)", lineHeight: 1.5, margin: "10px 0 16px" }}>
          Gardez-la à portée de main : installez l'application sur votre écran d'accueil et retrouvez vos points d'un simple geste.</p>
        <button className="btn" onClick={() => { onClose(); inst.lancer(); }}>Installer l'application</button>
        <button className="btn gh" style={{ marginTop: 8 }} onClick={onClose}>Plus tard</button>
      </div>
    </div>
  );
}

function estOuvert(hours) {
  const now = new Date();
  const j = hours[(now.getDay() + 6) % 7];
  if (!j) return null;
  const mins = now.getHours() * 60 + now.getMinutes();
  const re = /(\d{1,2})\s*[h:]\s*(\d{0,2})\s*[-–]\s*(\d{1,2})\s*[h:]\s*(\d{0,2})/g;
  let m, ouvert = false, found = false;
  const plages = [j.am, j.pm].filter(Boolean).join(" ");
  while ((m = re.exec(plages))) {
    found = true;
    const a = (+m[1]) * 60 + (+(m[2] || 0)), b = (+m[3]) * 60 + (+(m[4] || 0));
    if (mins >= a && mins <= b) ouvert = true;
  }
  return found ? ouvert : null;
}

const Ic = {
  home: (s = 21, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>,
  basket: (s = 21, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round"><path d="M3 9h18l-2 11H5z" /><path d="M8 9 12 3l4 6" /></svg>,
  star: (s = 21, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round"><path d="m12 3 2.7 5.6 6.3.9-4.5 4.3 1 6.2-5.5-3-5.5 3 1-6.2L3 9.5l6.3-.9z" /></svg>,
  news: (s = 21, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9h6M7 13h10M7 17h7" /></svg>,
  info: (s = 21, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 7.5h.01" /></svg>,
  leaf: (s = 18, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 1 8-1 3.5-3.5 5-6.5 6" /><path d="M2 21c0-3 1.9-5.4 5.1-6" /></svg>,
  phone: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round"><path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3z" /></svg>,
  pin: (s = 16, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round"><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>,
};

const CSS = CSS_THEMES + `
:root{--bg:#F7F3EA;--card:#FFFFFF;--forest:#1C433B;--apple:#6E9B3A;--apple-l:#8AAD3B;
 --apple-soft:#EEF3E2;--terra:#C27B42;--gold:#C69A3C;--ink:#22302A;--ink2:#5C6A62;--ink3:#93A099;
 --line:#E6E0D2;--r:18px;--r-s:12px;--script:'Sacramento',cursive;--body:'Nunito',system-ui,sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
.app{max-width:440px;margin:0 auto;min-height:100vh;background:var(--bg);color:var(--ink);
 font-family:var(--body);padding-bottom:78px;-webkit-font-smoothing:antialiased}
.top{position:sticky;top:0;z-index:60;display:flex;align-items:center;gap:11px;padding:11px 16px;background:var(--top,var(--forest));color:#fff;transition:background .4s}
.top img{width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.85)}
.top h1{font-family:var(--script);font-size:25px;line-height:1;font-weight:400}
.top small{display:block;font-size:9px;letter-spacing:.9px;text-transform:uppercase;opacity:.65;margin-top:2px}
.state{margin-left:auto;font-size:10px;font-weight:800;padding:5px 11px;border-radius:20px;display:flex;align-items:center;gap:5px;background:rgba(255,255,255,.14)}
.dot{width:6px;height:6px;border-radius:50%;background:#9BD46B}
.state.off .dot{background:#E4917F}
.wrap{padding:16px}
.h2{font-family:var(--script);font-size:29px;line-height:1;margin-bottom:4px;color:var(--forest);display:flex;align-items:center;gap:9px}
.h2 i{display:block;width:22px;height:2px;border-radius:2px;background:var(--apple)}
.sub{font-size:11.5px;color:var(--ink3);margin:0 0 12px 31px}
.hero{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:24px 20px;text-align:center;margin-bottom:14px}
.hero img{width:86px;height:86px;border-radius:50%;object-fit:cover;border:3px solid var(--apple-soft);margin-bottom:12px}
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
.ji img{width:50px;height:50px;border-radius:10px;object-fit:cover;flex-shrink:0}
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
.tabs{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:440px;background:#fff;border-top:1px solid var(--line);display:flex;height:72px;z-index:60;padding-bottom:env(safe-area-inset-bottom)}
.tab{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:none;background:none;font-family:var(--body);font-size:9.5px;font-weight:800;color:var(--ink3);cursor:pointer}
.tab.on{color:var(--forest)}
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
.bulle-chat{position:fixed;right:max(14px,calc(50% - 206px));bottom:calc(86px + env(safe-area-inset-bottom));z-index:65;height:48px;display:flex;align-items:center;gap:7px;border:none;border-radius:26px;padding:0 16px 0 13px;background:var(--terra);color:#fff;font-family:var(--body);font-size:13px;font-weight:800;box-shadow:0 6px 18px rgba(194,123,66,.45);cursor:pointer}
.bulle-chat:active{transform:scale(.94)}
.bulle-chat.haut{bottom:calc(150px + env(safe-area-inset-bottom))}
.bulle-chat b{position:absolute;top:-6px;right:-4px;min-width:22px;height:22px;border-radius:11px;background:#B2263A;border:2px solid var(--bg);font-size:11px;display:flex;align-items:center;justify-content:center;padding:0 5px}
.bc-txt{white-space:nowrap;max-width:140px;overflow:hidden;transition:max-width .35s ease,opacity .25s ease}
.bulle-chat{transition:padding .35s ease,gap .35s ease}
.bulle-chat.petit{padding:0 12px;gap:0}
.bulle-chat.petit .bc-txt{max-width:0;opacity:0}
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
`;

const Deco = ({ a = "right" }) => (
  <div style={{ display: "flex", justifyContent: a === "right" ? "flex-end" : "flex-start", gap: 5, opacity: .28, margin: "2px 0 10px" }}>
    {Ic.leaf(15, "#8AAD3B")}
    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#C9D6AE", alignSelf: "center" }} />
    {Ic.leaf(11, "#C9D6AE")}
  </div>
);
const Vide = ({ t, s }) => <div className="empty"><b>{t}</b><span>{s}</span></div>;

// ═══════ BANNIÈRES (défilement automatique) ═══════
function Bannieres({ pubs, versCarte, tel }) {
  const rail = useRef(null);
  const [idx, setIdx] = useState(0);
  const pause = useRef(false);
  const n = pubs.length;
  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(() => {
      const r = rail.current; if (!r || pause.current) return;
      const next = (Math.round(r.scrollLeft / r.clientWidth) + 1) % n;
      r.scrollTo({ left: next * r.clientWidth, behavior: "smooth" });
    }, 5000);
    return () => clearInterval(t);
  }, [n]);
  if (!n) return null;
  const agir = (p) => {
    if (p.action === "carte") versCarte();
    else if (p.action === "appeler" && tel) location.href = "tel:" + tel.replace(/\s/g, "");
  };
  return (
    <div className="pubs">
      <div className="rail" ref={rail}
        onScroll={e => setIdx(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        onTouchStart={() => { pause.current = true; }} onTouchEnd={() => { setTimeout(() => { pause.current = false; }, 6000); }}>
        {pubs.map(p => (
          <div className="pub" key={p.id} onClick={() => agir(p)}>
            <img src={p.photo} alt={p.titre || ""} />
            {(p.titre || p.texte || (p.action && p.action !== "aucune")) && (
              <div className="txt">
                {p.titre && <div className="t">{p.titre}</div>}
                {p.texte && <div className="s">{p.texte}</div>}
                {p.action === "carte" && <span className="go">Voir la carte →</span>}
                {p.action === "appeler" && <span className="go">Appeler pour commander</span>}
              </div>
            )}
          </div>
        ))}
      </div>
      {n > 1 && <div className="dots">{pubs.map((p, i) => <i key={p.id} className={i === idx ? "on" : ""} />)}</div>}
    </div>
  );
}

// ═══════ ACCUEIL ═══════
function ListeJour({ items, maj, onReserver }) {
  return (
    <div className="jour">
      {items.map(i => {
        const t = TYPES[i.type] || TYPES.frais;
        return (
          <div className="ji" key={i.id}>
            {i.photo && <img src={i.photo} alt="" />}
            <div style={{ minWidth: 0 }}>
              <span className="lb" style={{ background: t.bg, color: t.c }}>{t.label.toUpperCase()}</span>
              <div className="nm">{i.titre}</div>
              {i.note && <div className="no">{i.note}</div>}
              {i.fin && <div className="no" style={{ color: t.c, fontWeight: 700 }}>Jusqu'au {dateFr(i.fin)}</div>}
              {reservable(i) && onReserver && <div className="resa-l">
                {restant(i) > 0 ? <><button className="resa-btn" onClick={() => onReserver(i)}>Je réserve</button>{parseInt(i.stock) < 999 && <span className={restant(i) <= 2 ? "chaud" : ""}>{restant(i) <= 2 ? "Plus que " + restant(i) + " !" : restant(i) + " dispo."}</span>}</>
                  : <span className="epuise">Épuisé</span>}
              </div>}
            </div>
            {i.prix !== "" && i.prix != null && (
              <div className="px">
                {!!i.ancienPrix && Number(i.ancienPrix) > Number(i.prix) && <span className="old">{Number(i.ancienPrix).toFixed(2)} €</span>}
                {Number(i.prix).toFixed(2)} €{i.unite && <span className="un">/ {i.unite}</span>}
              </div>
            )}
          </div>
        );
      })}
      {maj && <div className="maj">Mis à jour {maj}</div>}
    </div>
  );
}

function CarteActu({ a }) {
  return (
    <div className="card">
      {a.photo && <img className="ph" src={a.photo} alt="" />}
      <div className="b">
        <h3>{a.titre}</h3>
        {a.date && <div style={{ fontSize: 10.5, color: "var(--ink3)", marginBottom: 5 }}>{a.date}</div>}
        <p>{a.texte}</p>
      </div>
    </div>
  );
}

// Icônes des raccourcis
const IcR = {
  promo: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" /></svg>,
  jour: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 1 8-1 3.5-3.5 5-6.5 6" /><path d="M2 21c0-3 1.9-5.4 5.1-6" /></svg>,
  plateau: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 16h18" /><path d="M4 16a8 8 0 0 1 16 0" /><path d="M12 6V4M10 4h4M2 20h20" /></svg>,
  actus: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9h6M7 13h10M7 17h7" /></svg>,
  carte: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="3" /><circle cx="7.5" cy="14" r="1.3" fill="currentColor" /><circle cx="11.5" cy="14" r="1.3" fill="currentColor" /><path d="M6 9h7" /></svg>,
};

function Raccourcis({ liens }) {
  if (liens.length < 2) return null;
  return (
    <nav className="racc" aria-label="Raccourcis">
      {liens.map(l => (
        <button key={l.id} className={"rc " + (l.chaud ? "chaud" : "")} onClick={l.go}>
          <span className="ic">{IcR[l.id]}{!!l.n && <b>{l.n}</b>}</span>
          <span className="lb2">{l.label}</span>
        </button>
      ))}
    </nav>
  );
}

const aller = (id) => document.getElementById(id)?.scrollIntoView({ behavior: mouvementReduit() ? "auto" : "smooth", block: "start" });

function Accueil({ d, theme, prenom, onReserver, mesResas = [], moi, onFid, versCarte, versActus, versFid, inst, mesCmds = [] }) {
  const aSuivre = mesCmds.filter(c => c.ref && ["nouvelle", "acceptee", "prep", "prete"].includes(c.statut) && (dateRetrait(c) || "") >= isoDe(new Date()));
  const tous = (d.jour?.items || []).filter(enCours);
  const promos = tous.filter(i => ["promo", "gaspi", "panier"].includes(i.type));
  const items = tous.filter(i => !["promo", "gaspi", "panier"].includes(i.type));
  const offres = d.carteActive ? d.offres.filter(enCours) : [];
  const plateaux = d.carteActive ? d.plateaux.filter(enCours) : [];
  const actus = d.actus.filter(enCours);
  const liens = [
    promos.length && { id: "promo", label: "Promos", n: promos.length, chaud: true, go: () => aller("sec-promos") },
    items.length && { id: "jour", label: "Du jour", n: items.length, go: () => aller("sec-jour") },
    (offres.length || plateaux.length) && { id: "plateau", label: "Plateaux", n: offres.length + plateaux.length, go: versCarte },
    actus.length && { id: "actus", label: "Actus", n: actus.length, go: versActus },
    d.fidActive && { id: "carte", label: "Ma carte", go: versFid },
  ].filter(Boolean);
  return (
    <div className="wrap">
      <CarteTheme theme={theme} />
      <Bannieres pubs={d.pubs} versCarte={versCarte} tel={d.store.phone} />
      <div className="hero">
        <img src={LOGO} alt="" />
        <h2>{d.store.name}</h2>
        {prenom ? <p>Bonjour {prenom} !</p> : d.store.slogan && <p>{d.store.slogan}</p>}
      </div>

      <Raccourcis liens={liens} />

      <MesResas resas={mesResas} />
      {aSuivre.slice(0, 2).map(c => <SuiviCommande key={c.numero} c={c} store={d.store} compact />)}

      {inst.bandeau && moi && <Installer inst={inst} texte="Retrouvez votre carte de fidélité d'un geste." />}

      {fermetureAAnnoncer(d.fermetures) && <div className="annonce terra">🔔 {texteFermeture(fermetureAAnnoncer(d.fermetures))}</div>}
      {enCours(d.annonce) && d.annonce.active && d.annonce.text && <div className={"annonce " + (d.annonce.couleur || "apple")}>{d.annonce.text}</div>}

      {!!promos.length && <section id="sec-promos" className="ancre">
        <h3 className="h2"><i style={{ background: "var(--terra)" }} />Promos & bonnes affaires</h3>
        <div className="sub">Prix réduits et dates courtes, tant qu'il y en a</div>
        <ListeJour items={promos} onReserver={onReserver} />
      </section>}

      <section id="sec-jour" className="ancre">
        <h3 className="h2"><i />Aujourd'hui</h3>
        <div className="sub">Le frais et les plats maison du moment</div>
        {items.length ? <ListeJour items={items} maj={d.jour?.maj} onReserver={onReserver} />
          : !promos.length && <Vide t="Rien de publié pour aujourd'hui" s="Passez à l'épicerie : le frais et les plats du jour vous y attendent." />}
        {!items.length && !!promos.length && d.jour?.maj && <div className="sub" style={{ marginLeft: 0 }}>Mis à jour {d.jour.maj}</div>}
      </section>

      {!!(offres.length || plateaux.length) && <>
        <Deco />
        <h3 className="h2"><i style={{ background: "var(--terra)" }} />Plateaux & paniers</h3>
        <div className="sub">{plateaux.length && cmdCfg(d.cmd).active ? "À commander directement dans l'application" : "Sur commande, à retirer en boutique"}</div>
        <div className="scroll">
          {plateaux.slice(0, 6).map(p => (
            <div className="mini" key={"p" + p.id} onClick={versCarte}>
              {p.photo && <img src={p.photo} alt="" />}
              <div className="b">
                <div className="nm">{p.nom}</div>
                <div className="px" style={{ fontSize: 16 }}>{euros(prixPers(p))}<span className="pp"> /pers.</span></div>
              </div>
            </div>
          ))}
          {offres.slice(0, 6).map(o => (
            <div className="mini" key={o.id} onClick={versCarte}>
              {o.photo && <img src={o.photo} alt="" />}
              <div className="b">
                <div className="nm">{o.titre}</div>
                <div className="px" style={{ fontSize: 16 }}>{o.prix ? Number(o.prix).toFixed(2) + " €" : "Sur devis"}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="voirtout" onClick={versCarte}>Voir toute la carte →</button>
      </>}

      {!d.fidActive && d.onglets?.fidelite !== false && <><Deco a="left" /><Bientot compact /></>}
      {d.fidActive && <>
        <Deco a="left" />
        <FidCarte d={d} moi={moi} onFid={onFid} compact />
      </>}

      {!!actus.length && <>
        <Deco />
        <h3 className="h2"><i />Actualités</h3>
        <div className="sub" />
        {actus.slice(0, 2).map(a => <CarteActu key={a.id} a={a} />)}
        {actus.length > 2 && <button className="voirtout" onClick={versActus}>Toutes les actualités ({actus.length}) →</button>}
      </>}
    </div>
  );
}

function Actus({ d }) {
  const actus = d.actus.filter(enCours);
  return (
    <div className="wrap">
      <h3 className="h2"><i />Actualités</h3>
      <div className="sub">Les nouvelles de l'épicerie</div>
      {actus.length ? actus.map(a => <CarteActu key={a.id} a={a} />)
        : <Vide t="Pas d'actualité pour le moment" s="Revenez bientôt !" />}
    </div>
  );
}

// ═══════ LA CARTE (plateaux à commander + autres offres) ═══════
const CMD_KEY = "epicerie-raddonnaise-commandes";
const lireCmds = () => { try { return JSON.parse(localStorage.getItem(CMD_KEY) || "[]"); } catch { return []; } };
const ecrireCmds = (l) => { try { localStorage.setItem(CMD_KEY, JSON.stringify(l.slice(0, 10))); } catch { } };

// Suivi en temps réel des commandes passées depuis ce téléphone
// (chaque commande est lue avec son identifiant secret gardé sur le téléphone)
function useMesCommandes(version) {
  const [liste, setListe] = useState(lireCmds);
  const [live, setLive] = useState({});
  useEffect(() => { setListe(lireCmds()); }, [version]);
  const refs = liste.filter(c => c.ref && (dateRetrait(c) || "") >= isoDe(dansJours(-14))).map(c => c.ref);
  useEffect(() => {
    const u = refs.map(r => onSnapshot(doc(db, "commandes", r),
      s => setLive(p => ({ ...p, [r]: s.exists() ? s.data() : (s.metadata?.fromCache ? p[r] : { statut: "annulee" }) })), () => { }));
    return () => u.forEach(f => f());
  }, [refs.join()]);
  const items = liste.map(c => {
    const l = c.ref && live[c.ref];
    return l ? { ...c, statut: l.statut, heure: l.heure || "", dateRetrait: l.dateRetrait || "", message: l.message || "", date: l.date || c.date, lignes: l.lignes || [] } : c;
  });
  const marquerVu = (ref, statut) => { const l = lireCmds().map(c => c.ref === ref ? { ...c, vu: statut } : c); ecrireCmds(l); setListe(l); };
  return [items, marquerVu];
}

const AVERTIR = ["acceptee", "prete", "refusee", "annulee"];
const aAvertir = (c) => c.ref && c.statut && AVERTIR.includes(c.statut) && c.vu !== c.statut;

// Phrase de suivi pour le client
function phraseSuivi(c) {
  const liv = c.mode === "livraison", j = dateRetrait(c), auj = isoDe(new Date());
  const quand = (j === auj ? "aujourd'hui" : j === isoDe(dansJours(1)) ? "demain" : "le " + dateLongue(j)) + (c.heure ? " à " + heureFr(c.heure) : "");
  switch (c.statut) {
    case "acceptee": case "prep": return liv ? "Validée : livraison prévue " + quand + "." : "Validée : à venir chercher " + quand + ".";
    case "prete": return liv ? "Votre commande est prête, livraison " + quand + "." : "Votre commande est prête ! Elle vous attend " + quand + ".";
    case "refusee": return "L'épicerie n'a pas pu accepter cette commande.";
    case "annulee": return "Cette commande a été annulée.";
    case "remise": return "Commande retirée. Merci et bonne dégustation !";
    default: return "Envoyée, en attente de validation par l'épicerie.";
  }
}

function BoutonsRappel({ c, store }) {
  if (!c.heure || !["acceptee", "prep", "prete"].includes(c.statut)) return null;
  const ajouter = () => {
    const a = document.createElement("a");
    a.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(fichierAgenda(c, store));
    a.download = "commande-" + c.numero + ".ics"; document.body.appendChild(a); a.click(); a.remove();
  };
  return (
    <div className="rappel">
      <button className="btn" onClick={ajouter}>🔔 Me le rappeler (agenda du téléphone)</button>
      <a className="lien" href={lienGoogleAgenda(c, store)} target="_blank" rel="noopener">ou l'ajouter à Google Agenda</a>
    </div>
  );
}

function SuiviCommande({ c, store, compact, recommander }) {
  const s = SUIVI[c.statut] || SUIVI.nouvelle;
  return (
    <div className={"suivi" + (compact ? " compact" : "")} style={{ borderLeftColor: s.c }}>
      <div className="suivi-hd"><b>{c.numero}</b><span style={{ background: s.c }}>{s.t}</span></div>
      <div className="suivi-tx">{phraseSuivi(c)}</div>
      {c.message && <div className="suivi-msg">« {c.message} »<small>— l'épicerie</small></div>}
      {!compact && c.resume && <div className="suivi-res">{c.resume}{c.total ? " · " + euros(c.total) : ""}</div>}
      <BoutonsRappel c={c} store={store} />
      {recommander && !compact && ["remise", "refusee", "annulee", "prete", "prep", "acceptee"].includes(c.statut) && c.lignes?.length > 0 &&
        <button className="lien" style={{ marginTop: 8 }} onClick={() => recommander(c.lignes)}>🔁 Recommander la même chose</button>}
    </div>
  );
}

// Fenêtre qui s'ouvre quand l'épicerie a répondu
function AlerteCommande({ c, store, onClose }) {
  const ok = c.statut === "acceptee" || c.statut === "prete";
  return (
    <div className="sheet-fond" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()} role="dialog">
        <div className={"ok-rond" + (ok ? "" : " non")}>{ok ? "✓" : "!"}</div>
        <h3 className="alerte-t">{c.statut === "prete" ? "Votre commande est prête !" : ok ? "Commande validée !" : "Commande non acceptée"}</h3>
        <SuiviCommande c={c} store={store} />
        {!ok && store.phone && <a href={"tel:" + store.phone.replace(/\s/g, "")} style={{ textDecoration: "none" }}><button className="btn gh" style={{ marginTop: 8 }}>Appeler l'épicerie</button></a>}
        <button className="btn gh" style={{ marginTop: 8 }} onClick={onClose}>{ok ? "Merci !" : "J'ai compris"}</button>
      </div>
    </div>
  );
}

function Carte({ d, panier, choisir, mesCmds, recommander }) {
  const offres = d.offres.filter(enCours);
  const plateaux = d.plateaux.filter(enCours);
  const types = [...new Set(offres.map(o => o.type).filter(Boolean))];
  const cmd = cmdCfg(d.cmd);
  const envoyees = mesCmds;
  return (
    <div className="wrap">
      {!!plateaux.length && <>
        <h3 className="h2"><i style={{ background: "var(--terra)" }} />Plateaux à commander</h3>
        <div className="sub">Choisissez votre plateau et le nombre de personnes : le prix se calcule tout seul</div>
        {cmd.note && <div className="cmd-note">{cmd.note}</div>}
        {plateaux.map(p => {
          const [min, max] = bornes(p);
          const dans = panier.find(l => l.id === p.id);
          return (
            <div className="card" key={p.id}>
              {p.photo && <img className="ph" src={p.photo} alt="" />}
              <div className="b">
                <h3>{p.nom}</h3>
                {p.composition && <p style={{ whiteSpace: "pre-line" }}>{p.composition}</p>}
                {choixDe(p) && <p className="ch-annonce">🧀 {choixDe(p).titre} : {choixDe(p).options.length} au choix</p>}
                <div className="foot">
                  <div>
                    <span className="px">{euros(prixPers(p))}</span><span className="pp"> / personne</span>
                    <div className="serves">{min === max ? "Pour " + min + " personnes" : "De " + min + " à " + max + " personnes"}</div>
                  </div>
                  {cmd.active && <button className="btn choisir" onClick={() => choisir(p)}>{dans ? dans.personnes + " pers. ✓" : "Choisir"}</button>}
                </div>
              </div>
            </div>
          );
        })}
        {!cmd.active && d.store.phone && <div className="cmd-note">Les commandes en ligne sont momentanément fermées. Appelez-nous au {d.store.phone}.</div>}
      </>}

      {!!offres.length && <>
        {!!plateaux.length && <Deco />}
        <h3 className="h2"><i />{plateaux.length ? "Paniers & autres offres" : "Plateaux & paniers"}</h3>
        <div className="sub">Sur commande — prévenez-nous à l'avance, on prépare tout</div>
        {(types.length ? types : [null]).map(t => (
          <div key={t || "x"}>
            {t && <div style={{ fontFamily: "var(--script)", fontSize: 24, color: "var(--terra)", margin: "16px 0 8px" }}>{t}</div>}
            {offres.filter(o => !t || o.type === t).map(o => (
              <div className="card" key={o.id}>
                {o.photo && <img className="ph" src={o.photo} alt="" />}
                {o.badge && <span className="badge">{o.badge}</span>}
                <div className="b">
                  <h3>{o.titre}</h3>
                  {o.desc && <p>{o.desc}</p>}
                  <div className="foot">
                    <span className="px">{o.prix ? Number(o.prix).toFixed(2) + " €" : "Sur devis"}</span>
                    {o.portions && <span className="serves">{o.portions}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        {d.store.phone && (
          <a href={"tel:" + d.store.phone.replace(/\s/g, "")} style={{ textDecoration: "none" }}>
            <button className="btn gh" style={{ marginTop: 8 }}>Commander par téléphone — {d.store.phone}</button>
          </a>
        )}
      </>}

      {!offres.length && !plateaux.length && <Vide t="La carte arrive bientôt" s="Plateaux apéritifs, paniers garnis et corbeilles de fruits seront présentés ici, en photo." />}

      {!!envoyees.length && <>
        <Deco a="left" />
        <h3 className="h2"><i />Mes commandes envoyées</h3>
        <div className="sub">Enregistrées sur ce téléphone</div>
        {envoyees.slice(0, 5).map(c => c.ref ? <SuiviCommande key={c.numero} c={c} store={d.store} recommander={recommander} /> : (
          <div className="cmd-hist" key={c.numero}>
            <div><b>{c.numero}</b> · pour le {dateLongue(c.date)}</div>
            <div>{c.resume}</div>
            <div className="t">{euros(c.total)}</div>
          </div>
        ))}
      </>}
    </div>
  );
}

// Choix du nombre de personnes pour un plateau
function ChoixPlateau({ p, actuel, onValider, onRetirer, onClose }) {
  const [min, max] = bornes(p);
  const ch = choixDe(p);
  const [n, setN] = useState(actuel?.personnes || min);
  const [sel, setSel] = useState(() => (actuel?.choix || []).filter(x => ch?.options.some(o => o.nom === x)));
  const basculer = (nom) => setSel(l => l.includes(nom) ? l.filter(x => x !== nom) : ch.max === 1 ? [nom] : l.length >= ch.max ? l : [...l, nom]);
  const prix = prixAvecChoix(p, sel);
  const nb = parseInt(n) || 0;
  const choixOk = !ch || (sel.length >= Math.max(ch.min, 0) && sel.length <= ch.max);
  return (
    <div className="sheet-fond" onClick={onClose}>
      <div className="sheet" onClick={e => e.stopPropagation()} role="dialog" aria-label={p.nom}>
        <div className="sheet-hd">
          {p.photo && <img src={p.photo} alt="" />}
          <div><h3>{p.nom}</h3><span>{euros(prixPers(p))} par personne</span></div>
        </div>
        {ch && <>
          <div className="lab" style={{ marginTop: 14 }}>{ch.titre}
            <span className="ch-regle">{ch.min === ch.max ? " · choisissez-en " + ch.min : ch.min > 0 ? " · de " + ch.min + " à " + ch.max : " · jusqu'à " + ch.max}</span></div>
          <div className="ch-liste">
            {ch.options.map(o => { const on = sel.includes(o.nom), bloque = !on && ch.max > 1 && sel.length >= ch.max; return (
              <button key={o.nom} className={"ch" + (on ? " on" : "") + (bloque ? " bloque" : "")} onClick={() => basculer(o.nom)} aria-pressed={on}>
                <span className="ch-case">{on ? "✓" : ""}</span><span className="ch-nom">{o.nom}</span>
                {o.supp > 0 && <span className="ch-supp">+{euros(o.supp)}/pers.</span>}
              </button>); })}
          </div>
          <div className="ch-compte">{sel.length} / {ch.max} choisi{sel.length > 1 ? "s" : ""}{!choixOk && ch.min > sel.length ? " · encore " + (ch.min - sel.length) + " à choisir" : ""}</div>
        </>}
        <div className="lab" style={{ textAlign: "center", marginTop: 14 }}>Nombre de personnes</div>
        <div className="pas">
          <button onClick={() => setN(Math.max(min, nb - 1))} disabled={nb <= min} aria-label="Une personne de moins">−</button>
          <input type="number" inputMode="numeric" value={n} min={min} max={max}
            onChange={e => setN(e.target.value === "" ? "" : Math.min(max, Math.max(0, parseInt(e.target.value) || 0)))}
            onBlur={() => setN(Math.min(max, Math.max(min, nb || min)))} aria-label="Nombre de personnes" />
          <button onClick={() => setN(Math.min(max, (nb || min) + 1))} disabled={nb >= max} aria-label="Une personne de plus">+</button>
        </div>
        <div className="pas-info">{min === max ? "Plateau pour " + min + " personnes" : "De " + min + " à " + max + " personnes"}</div>
        <div className="calcul">{nb} × {euros(prix)} = <b>{euros(nb * prix)}</b></div>
        <button className="btn" disabled={!(nb >= min && nb <= max) || !choixOk} onClick={() => onValider(nb, sel)}>
          {!choixOk ? "Choisissez " + (ch.min === ch.max ? ch.min : "au moins " + ch.min) + " option" + (ch.min > 1 ? "s" : "") : (actuel ? "Mettre à jour" : "Ajouter à ma commande") + " — " + euros(nb * prix || 0)}
        </button>
        {actuel ? <button className="btn gh" style={{ marginTop: 8 }} onClick={onRetirer}>Retirer ce plateau</button>
          : <button className="btn gh" style={{ marginTop: 8 }} onClick={onClose}>Annuler</button>}
      </div>
    </div>
  );
}

// Barre « Ma commande » en bas d'écran
function BarrePanier({ lignes, onOuvrir }) {
  if (!lignes.length) return null;
  const total = lignes.reduce((s, l) => s + l.montant, 0);
  return (
    <button className="barre-panier" onClick={onOuvrir}>
      <span><b>Ma commande</b> · {lignes.length} plateau{lignes.length > 1 ? "x" : ""}</span>
      <span className="t">{euros(total)} →</span>
    </button>
  );
}

// Calendrier : seules les dates autorisées par Marion sont cliquables
function Calendrier({ regle, value, onChange }) {
  const [mois, setMois] = useState(() => (value || regle.premiere || regle.min).slice(0, 7));
  const [a, m] = mois.split("-").map(Number);
  const premier = new Date(a, m - 1, 1, 12);
  const decal = (premier.getDay() + 6) % 7;
  const nb = new Date(a, m, 0).getDate();
  const cases = [...Array(decal).fill(null), ...Array.from({ length: nb }, (_, i) => isoDe(new Date(a, m - 1, i + 1, 12)))];
  const bouger = (n) => setMois(isoDe(new Date(a, m - 1 + n, 1, 12)).slice(0, 7));
  return (
    <div className="cal">
      <div className="cal-hd">
        <button disabled={mois <= regle.min.slice(0, 7)} onClick={() => bouger(-1)} aria-label="Mois précédent">‹</button>
        <b>{premier.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}</b>
        <button disabled={mois >= regle.max.slice(0, 7)} onClick={() => bouger(1)} aria-label="Mois suivant">›</button>
      </div>
      <div className="cal-g">
        {["L", "M", "M", "J", "V", "S", "D"].map((j, i) => <span key={"h" + i} className="cal-j">{j}</span>)}
        {cases.map((iso, i) => iso
          ? <button key={iso} disabled={!regle.ok(iso)} className={"cal-d" + (iso === value ? " on" : "")} onClick={() => onChange(iso)}
            aria-label={dateLongue(iso)} aria-pressed={iso === value}>{+iso.slice(8)}</button>
          : <span key={"v" + i} />)}
      </div>
    </div>
  );
}

// Les 14 allergènes à déclaration obligatoire + régimes courants
const ALLERGENES = ["Gluten", "Lait / lactose", "Œufs", "Fruits à coque", "Arachides", "Poisson", "Crustacés", "Mollusques", "Soja", "Céleri", "Moutarde", "Sésame", "Sulfites", "Lupin"];
const REGIMES = ["Sans porc", "Végétarien", "Sans alcool"];
const ALLERG_PREFIXE = "⚠️ Allergies / régime : ";

// Récapitulatif, date, coordonnées et envoi
function Commande({ d, moi, lignes, modifier, vider, onClose, ouvrirLegal, onEnvoyee }) {
  const cmd = cmdCfg(d.cmd);
  const regle = useMemo(() => regleDates(cmd, d.fermetures), [d.cmd, d.fermetures]);
  const dernier = lireCmds()[0] || {};
  const [date, setDate] = useState("");
  const [mode, setMode] = useState(cmd.mode === "livraison" ? "livraison" : "retrait");
  const [nom, setNom] = useState(moi?.nom || dernier.nom || lirePrenom().prenom || "");
  const [tel, setTel] = useState(dernier.tel || "");
  const [adresse, setAdresse] = useState(dernier.adresse || "");
  const [remarque, setRemarque] = useState("");
  const [allergies, setAllergies] = useState([]);
  const basculerAll = (a) => setAllergies(l => l.includes(a) ? l.filter(x => x !== a) : [...l, a]);
  const [etat, setEtat] = useState("");
  const [fini, setFini] = useState(null);
  const total = lignes.reduce((s, l) => s + l.montant, 0);
  const manque = !lignes.length ? "Ajoutez au moins un plateau."
    : !date ? "Choisissez une date de " + (mode === "livraison" ? "livraison" : "retrait") + "."
    : !nom.trim() ? "Indiquez votre nom."
    : tel.replace(/\D/g, "").length < 10 ? "Indiquez un numéro de téléphone pour que l'épicerie puisse vous joindre."
    : mode === "livraison" && !adresse.trim() ? "Indiquez l'adresse de livraison." : "";

  const envoyer = async () => {
    if (manque || etat === "envoi") return;
    if (!regle.ok(date)) { setEtat("Cette date n'est plus disponible, choisissez-en une autre."); setDate(""); return; }
    setEtat("envoi");
    const c = {
      numero: numeroCommande(), cree: Date.now(), statut: "nouvelle",
      nom: nom.trim().slice(0, 60), tel: tel.trim().slice(0, 20), mode,
      adresse: mode === "livraison" ? adresse.trim().slice(0, 200) : "",
      date, remarque: [allergies.length ? ALLERG_PREFIXE + allergies.join(", ") : "", remarque.trim()].filter(Boolean).join("\n").slice(0, 500), carte: moi?.code || "",
      lignes: lignes.map(l => ({ id: String(l.id), nom: l.nom.slice(0, 300), choix: (l.choix || []).slice(0, 12), personnes: l.personnes, prixPersonne: Math.round(l.prixPersonne * 100) / 100, montant: Math.round(l.montant * 100) / 100 })),
      total: Math.round(total * 100) / 100,
    };
    try {
      var ref = await addDoc(collection(db, "commandes"), c);
    } catch (e) {
      setEtat("La commande n'a pas pu être envoyée. Vérifiez votre connexion et réessayez" + (d.store.phone ? ", ou appelez le " + d.store.phone : "") + ".");
      return;
    }
    if (ref?.id) envoyerMail(d.cmd, ref.id);   // l'e-mail part en arrière-plan ; la commande est déjà enregistrée
    try {
      const resume = c.lignes.map(l => l.nom + " (" + l.personnes + " pers.)").join(", ");
      ecrireCmds([{ numero: c.numero, ref: ref?.id || "", date, mode, total: c.total, resume, nom: c.nom, tel: c.tel, adresse: c.adresse, statut: "nouvelle", vu: "nouvelle" }, ...lireCmds()]);
    } catch { }
    onEnvoyee?.();
    vider();
    setFini(c);
    window.scrollTo(0, 0);
  };

  if (fini) return (
    <div className="legal"><div className="legal-in" style={{ textAlign: "center", paddingTop: 50 }}>
      <div className="ok-rond">✓</div>
      <h2>Commande envoyée !</h2>
      <p className="chapo">Merci {fini.nom.split(" ")[0]}. L'épicerie a bien reçu votre commande <b>{fini.numero}</b>.</p>
      <div className="recap" style={{ textAlign: "left", margin: "18px 0" }}>
        {fini.lignes.map(l => <div className="rl" key={l.id}><span>{l.nom} · {l.personnes} pers.</span><b>{euros(l.montant)}</b></div>)}
        <div className="rl tot"><span>Total</span><b>{euros(fini.total)}</b></div>
        <div className="rl"><span>{MODES[fini.mode]}</span><b>{dateLongue(fini.date)}</b></div>
      </div>
      <p><b>L'épicerie va valider votre commande</b> et fixer l'heure {fini.mode === "livraison" ? "de livraison" : "à laquelle venir la chercher"}.
        Vous serez prévenu ici, dans l'application (onglet La carte → Mes commandes), et pourrez ajouter un rappel à votre agenda.</p>
      <p>Le règlement se fait {fini.mode === "livraison" ? "à la livraison" : "au retrait, à l'épicerie"}. En cas de question, l'épicerie vous appellera au {fini.tel}.</p>
      <button className="btn" style={{ marginTop: 18 }} onClick={onClose}>Terminé</button>
    </div></div>
  );

  return (
    <div className="legal">
      <div className="legal-top"><button onClick={onClose}>← Continuer mes achats</button></div>
      <div className="legal-in">
        <h2>Ma commande</h2>

        <h4>1. Vos plateaux</h4>
        {!lignes.length && <p>Votre commande est vide.</p>}
        <div className="recap">
          {lignes.map(l => (
            <div className="rl" key={l.id}>
              <span><b>{l.nom}</b><br /><small>{l.personnes} pers. × {euros(l.prixPersonne)}</small></span>
              <span style={{ textAlign: "right" }}><b>{euros(l.montant)}</b><br /><button className="lien" onClick={() => modifier(l.id)}>Modifier</button></span>
            </div>
          ))}
          {!!lignes.length && <div className="rl tot"><span>Total</span><b>{euros(total)}</b></div>}
        </div>

        {cmd.mode === "choix" && <>
          <h4>2. Retrait ou livraison ?</h4>
          <div className="choix-mode">
            {["retrait", "livraison"].map(k => <button key={k} className={mode === k ? "on" : ""} onClick={() => setMode(k)}>{MODES[k]}</button>)}
          </div>
        </>}

        <h4>{cmd.mode === "choix" ? "3" : "2"}. Date de {mode === "livraison" ? "livraison" : "retrait"}</h4>
        {regle.premiere ? <>
          <Calendrier regle={regle} value={date} onChange={setDate} />
          <p className="cal-info">{date ? <>Choisi : <b>{dateLongue(date)}</b></> : "Touchez une date disponible."}
            {Number(cmd.delaiMin) > 0 && <> Les commandes se passent au moins {cmd.delaiMin} jour{cmd.delaiMin > 1 ? "s" : ""} à l'avance.</>}</p>
        </> : <p>Aucune date n'est disponible pour le moment. {d.store.phone && "Appelez-nous au " + d.store.phone + "."}</p>}

        <h4>{cmd.mode === "choix" ? "4" : "3"}. Vos coordonnées</h4>
        <label className="lab">Nom et prénom</label>
        <input className="inp" value={nom} onChange={e => setNom(e.target.value)} maxLength={60} autoComplete="name" />
        <label className="lab" style={{ marginTop: 10 }}>Téléphone</label>
        <input className="inp" type="tel" value={tel} onChange={e => setTel(e.target.value)} maxLength={20} autoComplete="tel" placeholder="06 12 34 56 78" />
        {mode === "livraison" && <>
          <label className="lab" style={{ marginTop: 10 }}>Adresse de livraison</label>
          <textarea className="inp" rows={2} value={adresse} onChange={e => setAdresse(e.target.value)} maxLength={200} autoComplete="street-address" />
        </>}
        <label className="lab" style={{ marginTop: 12 }}>Allergies ou régime (facultatif)</label>
        <div className="allerg">
          {[...ALLERGENES, ...REGIMES].map(a => <button key={a} type="button" className={allergies.includes(a) ? "on" : ""} aria-pressed={allergies.includes(a)} onClick={() => basculerAll(a)}>{allergies.includes(a) ? "✓ " : ""}{a}</button>)}
        </div>
        {!!allergies.length && <div className="allerg-info">
          L'épicerie fera au mieux pour éviter : <b>{allergies.join(", ")}</b>. Les plateaux sont préparés dans un atelier qui manipule ces ingrédients : des traces restent possibles.
          En cas d'allergie sévère, appelez l'épicerie{d.store.phone ? " au " + d.store.phone : ""} avant de commander.
          Cette information sert uniquement à préparer votre commande.
        </div>}
        <label className="lab" style={{ marginTop: 10 }}>Remarque (facultatif)</label>
        <textarea className="inp" rows={2} value={remarque} onChange={e => setRemarque(e.target.value)} maxLength={400} placeholder="Heure souhaitée, ingrédient à éviter, message…" />

        <div className="rgpd-info" style={{ marginTop: 12 }}>
          Vos coordonnées servent uniquement à préparer et vous remettre cette commande.{" "}
          <button className="lien" onClick={() => ouvrirLegal("confidentialite")}>En savoir plus</button>
        </div>

        {manque && lignes.length > 0 && <p className="manque">{manque}</p>}
        {etat && etat !== "envoi" && <p className="manque">{etat}</p>}
        <button className="btn envoyer" disabled={!!manque || etat === "envoi"} onClick={envoyer}>
          {etat === "envoi" ? "Envoi en cours…" : "Envoyer ma commande — " + euros(total)}
        </button>
        <p className="cal-info conditions">Paiement {mode === "livraison" ? "à la livraison" : "au retrait à l'épicerie"}, aucun paiement en ligne.
          Produits frais préparés sur commande : pas de droit de rétractation.
          Pour annuler ou modifier{d.store.phone ? ", appelez le " + d.store.phone : ", contactez l'épicerie"} au moins 48 h avant.</p>
      </div>
    </div>
  );
}

// ═══════ FIDÉLITÉ ═══════
// Jauge circulaire de progression vers la prochaine remise
function Jauge({ progres, taille = 136, children }) {
  const r = 42, c = 2 * Math.PI * r;
  const [p, setP] = useState(0);
  useEffect(() => { const t = setTimeout(() => setP(progres), 60); return () => clearTimeout(t); }, [progres]);
  return (
    <div className="jauge" style={{ width: taille, height: taille }}>
      <svg viewBox="0 0 100 100" width={taille} height={taille}>
        <defs><linearGradient id="jg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#C9E38A" /><stop offset="1" stopColor="#8AAD3B" /></linearGradient></defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="9" />
        <circle cx="50" cy="50" r={r} fill="none" stroke="url(#jg)" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - Math.max(0.015, Math.min(1, p)))} transform="rotate(-90 50 50)"
          style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.3,.9,.3,1)" }} />
      </svg>
      <div className="jauge-in">{children}</div>
    </div>
  );
}

function FidCarte({ d, moi, onFid, compact }) {
  const f = d.fidelite;
  const total = Math.max(1, f.total || 10);
  const pts = moi ? (moi.points || 0) : 0;
  const suivant = (f.paliers || []).find(p => p.at > pts);
  const rm = etatRemise(f, pts);
  return (
    <div className="fid">
      <h3>{f.titre || "Carte de fidélité"}</h3>
      <div className="s">{f.sousTitre || (rm ? `1 point par ${f.parEuro || 1} € dépensé · ${rm.points} points = ${eurosFr(rm.euros)} de remise` : `1 point par tranche de ${f.parEuro || 10} € d'achat`)}</div>
      {rm ? <div className="remise">
        <div className="rm-ligne">
          <Jauge progres={moi ? rm.progres : 0} taille={compact ? 112 : 136}>
            <b>{pts % rm.points}</b><span>/ {rm.points}</span>
          </Jauge>
          <div className="rm-cote">
            <div className="rm-total">{moi ? <>Vous avez <b>{pts}</b> point{pts > 1 ? "s" : ""}</> : <>{rm.points} points</>}</div>
            <div className="rm-bon">{moi ? "Prochain bon : " : "= "}<b>{eurosFr(rm.euros)}</b>{moi ? "" : " de remise"}</div>
            {moi && <div className="rm-manque">Plus que <b>{rm.manque}</b> point{rm.manque > 1 ? "s" : ""} pour {rm.nb > 0 ? "le bon suivant" : "votre bon"}</div>}
          </div>
        </div>
        {moi && rm.nb > 0 && <div className="bons">
          {Array.from({ length: Math.min(rm.nb, 4) }, (_, i) => <div className="bon" key={i}><b>{eurosFr(rm.euros)}</b><span>de remise</span></div>)}
          {rm.nb > 4 && <div className="bon plus">+{rm.nb - 4}</div>}
          <div className="bons-txt">🎉 {rm.nb > 1 ? rm.nb + " bons disponibles" : "Bon disponible"} : présentez votre carte en caisse !</div>
        </div>}
      </div> : <>
      <div className="pts" style={{ gridTemplateColumns: `repeat(${Math.min(total, 10)},1fr)` }}>
        {Array.from({ length: total }, (_, i) => {
          const rec = (f.paliers || []).some(p => p.at === i + 1);
          return <div key={i} className={"pt" + (i < pts ? " on" : rec ? " next" : "")}>{i < pts ? "●" : rec ? "★" : ""}</div>;
        })}
      </div>
      <div className="cpt"><b>{pts}</b> / {total} points{suivant ? ` — encore ${suivant.at - pts} pour « ${suivant.label} »` : ""}</div>
      </>}
      {!compact && !!(f.paliers || []).length && (
        <div style={{ marginTop: 16, borderTop: "1px solid rgba(255,255,255,.15)", paddingTop: 12 }}>
          {f.paliers.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "7px 0", fontSize: 12.5 }}>
              <span style={{ width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11, background: pts >= p.at ? "var(--apple-l)" : "rgba(255,255,255,.12)" }}>{p.at}</span>
              <span style={{ opacity: pts >= p.at ? 1 : .7 }}>{p.label}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: 16, borderTop: "1px solid rgba(255,255,255,.15)", paddingTop: 16, textAlign: "center" }}>
        {moi ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 9 }}>
            <div className="qr" onClick={onFid}>
              <QR texte={moi.code} taille={148} />
              <span className="zoom">Agrandir</span>
            </div>
            <div className="code">{moi.code}</div>
            <div style={{ fontSize: 10.5, opacity: .7 }}>{moi.nom} — à présenter en caisse</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 12, opacity: .8, marginBottom: 10 }}>Créez votre carte pour cumuler vos points</div>
            <button className="btn" style={{ background: "var(--apple-l)", width: "auto", padding: "11px 22px" }} onClick={onFid}>Créer ma carte</button>
          </>
        )}
      </div>
    </div>
  );
}

// Carte de fidélité pas encore ouverte : on l'annonce
function Bientot({ compact }) {
  return (
    <div className={"bientot" + (compact ? " compact" : "")}>
      <div className="bt-badge">Bientôt</div>
      <div className="bt-titre">La carte de fidélité arrive !</div>
      <div className="bt-txt">Très bientôt dans l'application : cumulez des points à chaque passage à l'épicerie et profitez de remises. Restez connectés 🍏</div>
      {!compact && <div className="bt-deco" aria-hidden="true">{[0, 1, 2, 3, 4].map(i => <i key={i} style={{ animationDelay: i * .18 + "s" }} />)}</div>}
    </div>
  );
}

function Fidelite({ d, moi, setMoi, onFid, inst, ouvrirLegal }) {
  if (!d.fidelite?.active) return <div className="wrap"><Deco /><Bientot /></div>;
  return <div className="wrap"><Deco /><FidCarte d={d} moi={moi} onFid={onFid} />
    {moi && <Installer inst={inst} compact texte="Gardez votre carte sur l'écran d'accueil." />}
    {moi && <MesDonnees moi={moi} d={d} setMoi={setMoi} ouvrirLegal={ouvrirLegal} />}</div>;
}

// ═══════ RGPD : MENTIONS LÉGALES, CONFIDENTIALITÉ, MES DONNÉES ═══════
function PageLegale({ type, d, onClose }) {
  const L = Object.fromEntries(Object.entries({ ...EMPTY.legal, ...(d.legal || {}) }).map(([k, v]) => [k, v === "" || v == null ? EMPTY.legal[k] : v]));
  const s = d.store;
  const contact = L.emailDonnees || s.email;
  const T = ({ children }) => <h4>{children}</h4>;
  return (
    <div className="legal">
      <div className="legal-top">
        <button onClick={onClose} aria-label="Retour">← Retour</button>
      </div>
      <div className="legal-in">
        {type === "mentions" ? <>
          <h2>Mentions légales</h2>
          <T>Éditeur de l'application</T>
          <p><b>{s.name}</b><br />{L.raison}{L.forme ? ", " + L.forme : ""}{L.capital ? " au capital de " + L.capital + " €" : ""}<br />
            Siège : {s.address}<br />
            {L.siren && <>SIREN : {L.siren}<br /></>}
            {L.rcs && <>{L.rcs}<br /></>}
            {L.tva && <>N° TVA intracommunautaire : {L.tva}<br /></>}
            {L.naf && <>Activité : {L.naf}<br /></>}
            {s.phone && <>Téléphone : {s.phone}<br /></>}
            {s.email && <>E-mail : {s.email}</>}</p>
          <T>Directrice de la publication</T>
          <p>{L.responsable}, gérante</p>
          <T>Hébergement</T>
          <p>Application : GitHub Pages — GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.<br />
            Données : Firebase — Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande.</p>
          <T>Propriété</T>
          <p>Le nom, le logo et les contenus de l'application appartiennent à {s.name}. Toute reproduction sans autorisation est interdite.</p>
        </> : <>
          <h2>Vos données personnelles</h2>
          <p className="chapo">L'application est conçue pour collecter le moins de données possible. Voici exactement ce que nous faisons.</p>
          <T>Qui est responsable ?</T>
          <p>{L.raison}{L.forme ? " (" + L.forme + ")" : ""} — {s.name}, {s.address}{L.siren ? ", SIREN " + L.siren : ""}, représentée par {L.responsable}.</p>
          <T>Quelles données ?</T>
          <p>Uniquement si vous créez une carte de fidélité : votre <b>nom</b>, votre <b>téléphone</b> (facultatif), votre code de carte, vos points, la date d'inscription
            et l'historique de vos passages en caisse (date, montant de l'achat, points gagnés).</p>
          <p>Si vous passez une commande de plateaux : votre <b>nom</b>, votre <b>téléphone</b>, l'<b>adresse de livraison</b> le cas échéant,
            la date choisie, le détail de la commande, votre remarque éventuelle et, si vous les indiquez, vos allergies ou votre régime alimentaire.
            Ces dernières informations servent uniquement à préparer votre commande et sont supprimées avec elle.</p>
          <p>Si vous écrivez à l'épicerie depuis l'application : votre <b>prénom</b>, votre <b>téléphone</b> si vous le donnez, et vos <b>messages</b>.
            Ils servent uniquement à vous répondre et sont supprimés au plus tard 1 an après le dernier échange.</p>
          <p>Aucune donnée bancaire, aucune géolocalisation, aucune publicité, aucune mesure d'audience. Consulter l'application sans carte ne collecte rien.</p>
          <T>Pourquoi ?</T>
          <p>Uniquement pour gérer votre carte de fidélité et vos récompenses. Base légale : l'exécution du programme de fidélité auquel vous adhérez
            en créant votre carte (article 6.1.b du RGPD). Votre téléphone sert seulement à vous retrouver ou à vous contacter au sujet de votre carte :
            jamais de prospection, jamais de revente.</p>
          <p>Les coordonnées données lors d'une commande servent uniquement à la préparer, vous la remettre et vous joindre à son sujet
            (exécution de la commande, article 6.1.b du RGPD).</p>
          <T>Qui y a accès ?</T>
          <p>Uniquement l'épicerie. Les données sont hébergées par notre prestataire technique Firebase (Google){L.hebergementDonnees ? " (" + L.hebergementDonnees + ")" : ""}, qui agit pour notre compte
            et n'a pas le droit de les utiliser. Google adhère au cadre de protection des données UE–États-Unis (Data Privacy Framework).
            {cmdCfg(d.cmd).script && " L'avis de nouvelle commande est envoyé à l'épicerie sur sa messagerie Gmail (Google)."}</p>
          <T>Combien de temps ?</T>
          <p>Tant que votre carte est utilisée. Une carte sans aucun passage en caisse depuis <b>{L.conservation || 3} ans</b> est supprimée avec son historique.
            Vous pouvez aussi demander sa suppression à tout moment.
            Les commandes sont conservées <b>1 an</b> après la date de retrait ou de livraison, puis supprimées.</p>
          <T>Sur votre téléphone</T>
          <p>L'application n'enregistre que ce qui est indispensable à son fonctionnement : l'identifiant de votre carte, de vos commandes et de vos messages,
            vos préférences d'affichage et, si vous le donnez, votre prénom (qui ne quitte pas votre téléphone).
            Aucun cookie publicitaire ni traceur : c'est pourquoi aucun bandeau de consentement ne vous est demandé.</p>
          <T>Vos droits</T>
          <p>Vous pouvez consulter, corriger, télécharger ou supprimer vos données, et vous opposer à leur traitement.</p>
          <ul>
            <li><b>Consultation et téléchargement dans l'application</b> : onglet Fidélité → « Mes données ».</li>
            <li><b>Ou en nous contactant</b> : {contact}{s.phone ? ", " + s.phone : ""}, ou en boutique.</li>
          </ul>
          <p>En cas de désaccord, vous pouvez saisir la CNIL (cnil.fr).</p>
          <T>Sécurité</T>
          <p>L'administration est protégée par mot de passe. Votre fiche n'est consultable qu'avec l'identifiant secret enregistré sur votre téléphone :
            personne ne peut parcourir la liste des clients depuis l'application.</p>
        </>}
        <p className="maj-legal">Dernière mise à jour : octobre 2026</p>
      </div>
    </div>
  );
}

function MesDonnees({ moi, d, setMoi, ouvrirLegal }) {
  const [etat, setEtat] = useState("");
  const [vue, setVue] = useState(null);
  const tel = d.store.phone;
  const charger = async () => {
    setEtat("Chargement…");
    try {
      const fiche = await getDoc(doc(db, "clients", moi.ref));
      let historique = [];
      try { historique = (await getDocs(collection(db, "clients", moi.ref, "historique"))).docs.map(x => x.data()).sort((a, b) => (b.date || 0) - (a.date || 0)); } catch { }
      const f = fiche.exists() ? fiche.data() : {};
      setVue({ fiche: { nom: f.nom, telephone: f.tel || "", code: f.code, points: f.points || 0, inscription: f.depuis, accord: f.accord || "" }, historique });
      setEtat("");
    } catch { setEtat("Impossible de charger vos données. Vérifiez votre connexion."); }
  };
  const telecharger = () => {
    const contenu = {
      application: d.store.name, exporte_le: new Date().toISOString(),
      carte: vue.fiche,
      passages: vue.historique.map(h => ({ date: h.date ? new Date(h.date).toISOString() : "", type: h.type, montant: h.montant ?? null, points: h.points })),
    };
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(contenu, null, 2)], { type: "application/json" }));
    a.download = "mes-donnees-epicerie-raddonnaise.json"; a.click();
  };
  const [demande, setDemande] = useState(false);
  const mail = d.legal?.emailDonnees || d.store.email;
  const corps = encodeURIComponent("Bonjour,\n\nJe souhaite la suppression de ma carte de fidélité " + (moi.code || "") + " (" + (moi.nom || "") + ") et de toutes mes données.\n\nMerci.");
  return (
    <div className="card" style={{ marginTop: 14 }}><div className="b">
      <div style={{ fontWeight: 800, fontSize: 14, color: "var(--forest)", marginBottom: 4 }}>Mes données</div>
      <p style={{ marginBottom: 12 }}>Vous gardez la main sur vos informations personnelles.</p>
      {!vue ? <button className="btn gh" onClick={charger}>Consulter mes données</button> : <>
        <div className="donnees">
          <div><span>Nom</span><b>{vue.fiche.nom}</b></div>
          <div><span>Téléphone</span><b>{vue.fiche.telephone || "—"}</b></div>
          <div><span>Code carte</span><b>{vue.fiche.code}</b></div>
          <div><span>Points</span><b>{vue.fiche.points}</b></div>
          <div><span>Inscription</span><b>{vue.fiche.inscription}</b></div>
          <div><span>Passages en caisse</span><b>{vue.historique.length}</b></div>
        </div>
        <button className="btn gh" style={{ marginTop: 10 }} onClick={telecharger}>Télécharger mes données</button>
        <p style={{ fontSize: 11.5, marginTop: 8 }}>Une erreur ? Demandez la correction à l'épicerie.</p>
      </>}
      {!demande
        ? <button className="btn gh" style={{ marginTop: 8, color: "#C86B5C", borderColor: "#EBC9C2" }} onClick={() => setDemande(true)}>Supprimer ma carte et mes données</button>
        : <div className="rgpd-info" style={{ marginTop: 10 }}>
            Pour protéger votre carte, la suppression est faite par l'épicerie. Demandez-la en un geste, elle sera faite rapidement :
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {tel && <a className="btn gh" style={{ flex: 1, textDecoration: "none", textAlign: "center" }} href={"tel:" + tel.replace(/\s/g, "")}>Appeler</a>}
              {mail && <a className="btn gh" style={{ flex: 1, textDecoration: "none", textAlign: "center" }} href={"mailto:" + mail + "?subject=" + encodeURIComponent("Suppression de ma carte de fidélité") + "&body=" + corps}>Envoyer un e-mail</a>}
            </div>
            <div style={{ marginTop: 8 }}>Ou simplement en boutique, en donnant votre code <b>{moi.code}</b>.</div>
          </div>}
      {etat && <p style={{ fontSize: 12, marginTop: 8, color: "var(--ink2)" }}>{etat}</p>}
      <button className="lienleg" onClick={() => ouvrirLegal("confidentialite")}>Politique de confidentialité</button>
    </div></div>
  );
}

function Inscription({ onDone, onCancel, ouvrirLegal }) {
  const [nom, setNom] = useState(""); const [tel, setTel] = useState("");
  const [envoi, setEnvoi] = useState(false); const [err, setErr] = useState("");
  const [ok, setOk] = useState(false);
  const creer = async () => {
    if (!nom.trim() || !ok || envoi) return;
    setEnvoi(true); setErr("");
    const jour = new Date().toISOString().slice(0, 10);
    const data = { code: nouveauCode(), nom: nom.trim().slice(0, 60), tel: tel.trim().slice(0, 20), points: 0, depuis: jour, accord: jour };
    try {
      let ref;
      try { ref = await addDoc(collection(db, "clients"), data); }
      catch (e) {
        // anciennes règles Firestore (sans le champ « accord ») : on réessaie sans
        if (e?.code !== "permission-denied") throw e;
        const { accord, ...sans } = data; ref = await addDoc(collection(db, "clients"), sans);
      }
      onDone({ ref: ref.id, code: data.code, nom: data.nom, points: 0 });
    } catch (e) {
      setErr("La carte n'a pas pu être créée. Vérifiez votre connexion internet et réessayez.");
      setEnvoi(false);
    }
  };
  return (
    <div className="wrap" style={{ paddingTop: 28 }}>
      <div style={{ textAlign: "center", marginBottom: 22 }}>
        <img src={LOGO} alt="" style={{ width: 86, height: 86, borderRadius: "50%", border: "3px solid var(--apple-soft)" }} />
        <h2 style={{ fontFamily: "var(--script)", fontSize: 33, color: "var(--forest)", marginTop: 12 }}>Ma carte de fidélité</h2>
        <p style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, marginTop: 6 }}>Un code personnel vous est attribué. Présentez-le en caisse pour cumuler vos points.</p>
      </div>
      <label className="lab">Nom et prénom</label>
      <input className="inp" value={nom} onChange={e => setNom(e.target.value)} placeholder="Marie Dupont" autoFocus />
      <label className="lab" style={{ marginTop: 12 }}>Téléphone (facultatif)</label>
      <input className="inp" type="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="06 12 34 56 78" />
      <div className="rgpd-info">
        Vos nom et téléphone servent <b>uniquement</b> à gérer votre carte de fidélité. Ils ne sont ni revendus, ni utilisés pour de la publicité.
        Vous pouvez les consulter à tout moment depuis l'onglet Fidélité, et en demander la suppression à l'épicerie.
      </div>
      <label className="accord">
        <input type="checkbox" checked={ok} onChange={e => setOk(e.target.checked)} />
        <span>J'ai lu la <button type="button" onClick={() => ouvrirLegal("confidentialite")}>politique de confidentialité</button> et j'accepte l'utilisation de mes données pour ma carte de fidélité.</span>
      </label>
      {err && <div style={{ color: "#C86B5C", fontSize: 12.5, fontWeight: 700, marginTop: 12 }}>{err}</div>}
      <button className="btn" style={{ marginTop: 16 }} disabled={!nom.trim() || !ok || envoi} onClick={creer}>{envoi ? "Création…" : "Créer ma carte"}</button>
      <button className="btn gh" style={{ marginTop: 8 }} onClick={onCancel}>Plus tard</button>
    </div>
  );
}

function Infos({ d, inst, ouvrirLegal, pr = {}, setPrenom }) {
  const jour = (new Date().getDay() + 6) % 7;
  return (
    <div className="wrap">
      <Installer inst={inst} compact />
      <h3 className="h2"><i />L'épicerie</h3>
      <div className="sub" />
      <div className="card"><div className="b">
        <h3>{d.store.name}</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginTop: 10, fontSize: 13, color: "var(--ink2)" }}>
          {Ic.pin(16, "#6E9B3A")}<span>{d.store.address}</span></div>
        {d.store.phone && <a href={"tel:" + d.store.phone.replace(/\s/g, "")} style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 9, fontSize: 13, color: "var(--apple)", fontWeight: 700, textDecoration: "none" }}>{Ic.phone(16, "#6E9B3A")}{d.store.phone}</a>}
        {d.store.email && <div style={{ fontSize: 12.5, color: "var(--ink3)", marginTop: 8, wordBreak: "break-all" }}>{d.store.email}</div>}
      </div></div>
      <Deco />
      <h3 className="h2"><i />Horaires</h3><div className="sub" />
      <div className="card"><div className="b" style={{ paddingTop: 4, paddingBottom: 4 }}>
        <table className="tbl"><tbody>
          {d.hours.map((h, i) => (
            <tr key={i} className={i === jour ? "now" : ""}>
              <td>{h.day}</td><td>{h.am || "Fermé"}</td><td style={{ textAlign: "right" }}>{h.pm}</td>
            </tr>))}
        </tbody></table>
      </div></div>
      {!!d.services.filter(s => s.active !== false).length && <>
        <Deco a="left" />
        <h3 className="h2"><i />Nos services</h3><div className="sub" />
        {d.services.filter(s => s.active !== false).map(s => (
          <div className="ji" key={s.id} style={{ background: "#fff", border: "1px solid var(--line)", borderRadius: 12, marginBottom: 8 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--apple-soft)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{Ic.leaf(20, "#8AAD3B")}</div>
            <div><div className="nm" style={{ fontSize: 13.5 }}>{s.label}</div>{s.desc && <div className="no">{s.desc}</div>}</div>
          </div>))}
      </>}
      <PartagerAppli d={d} />
      <MonPrenom prenom={pr.prenom || ""} onChange={setPrenom} />
      <ChangerTelephone />
      <div className="liens-leg">
        <button onClick={() => ouvrirLegal("confidentialite")}>Confidentialité & données personnelles</button>
        <button onClick={() => ouvrirLegal("mentions")}>Mentions légales</button>
      </div>
      <BoutonMaj style={{ marginTop: 18 }} />
      {d.store.facebook && <a href={d.store.facebook} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
        <button className="btn gh" style={{ marginTop: 10 }}>Voir la page Facebook</button></a>}
    </div>
  );
}

// ═══════ SÉQUENCE D'INTRODUCTION ═══════
// 1. Écran d'ouverture (à chaque lancement) : feuilles qui tombent, la pomme
//    qui atterrit, le slogan. Plus court pour un habitué, avec son prénom.
// 2. Présentation en 3 écrans (une seule fois, au tout premier lancement).
const BIENVENUE_KEY = "epicerie-raddonnaise-bienvenue-vue";
const mouvementReduit = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const FEUILLES = [
  { l: 8, t: 3.6, d: 0, s: 26, c: "#A9C75A", r: 220, x: 30 },
  { l: 22, t: 4.2, d: .5, s: 18, c: "#C9D6AE", r: -160, x: -20, erable: true },
  { l: 41, t: 3.9, d: .2, s: 22, c: "#8AAD3B", r: 260, x: 25 },
  { l: 63, t: 4.4, d: .8, s: 16, c: "#C9D6AE", r: -200, x: -30 },
  { l: 78, t: 3.7, d: .3, s: 28, c: "#A9C75A", r: 180, x: -25, erable: true },
  { l: 90, t: 4.6, d: 1.1, s: 18, c: "#8AAD3B", r: -240, x: 15 },
  { l: 52, t: 5.0, d: 1.4, s: 14, c: "#A9C75A", r: 300, x: 20 },
];
const Feuille = ({ f }) => (
  <svg className="feuille" width={f.s} height={f.s} viewBox="0 0 24 24"
    style={{ left: f.l + "%", animationDuration: f.t + "s", animationDelay: f.d + "s", "--r": f.r + "deg", "--x": f.x + "px" }}>
    {f.erable
      ? <path fill={f.c} d="M12 2c-1 3-3 5-5 6 1 1 1 3 0 5 2-1 4 0 5 2 1-2 3-3 5-2-1-2-1-4 0-5-2-1-4-3-5-6zM12 15v7" stroke={f.c} strokeWidth="1.2" />
      : <><path fill={f.c} d="M12 2C6 6 4.5 11 6.5 16c1.3 3 3.6 4.7 5.5 6 1.9-1.3 4.2-3 5.5-6C19.5 11 18 6 12 2z" />
        <path d="M12 5v16M12 10l-3-2M12 13l3-2M12 16l-3-2" stroke="rgba(0,0,0,.18)" strokeWidth="1" fill="none" /></>}
  </svg>
);

function Intro({ moi, prenom: prenom0, onEnd, theme }) {
  const prenom = (prenom0 || (moi?.nom ? moi.nom.trim().split(/\s+/)[0] : "")).trim();
  const habitue = !!prenom;
  const duree = mouvementReduit() ? 900 : habitue ? 3000 : 4200;
  const [out, setOut] = useState(false);
  const fini = useRef(false);
  const finir = () => { if (fini.current) return; fini.current = true; setOut(true); setTimeout(onEnd, 550); };
  useEffect(() => { const t = setTimeout(finir, duree); return () => clearTimeout(t); }, []);
  const pts = moi?.points || 0;
  return (
    <div className={"intro" + (out ? " out" : "")} onClick={finir} role="presentation"
      style={theme ? { background: "radial-gradient(120% 75% at 50% 45%," + theme.top + "EE 0%," + theme.top + " 60%,#111 140%)" } : undefined}>
      <div className="halo" />
      {theme ? <Particules theme={theme} nb={18} /> : FEUILLES.map((f, i) => <Feuille key={i} f={f} />)}
      <img className="logo" src="logo-intro.png" alt="Épicerie Raddonnaise" />
      {habitue
        ? <div className="accueil-perso">
            <div className="bonjour">Bonjour {prenom} !</div>
            <div className="bienv-txt">Bienvenue sur l'application de l'épicerie</div>
            {theme ? <div className="slogan" style={{ fontSize: 24 }}>{theme.titre}</div>
              : moi && <div className="pts-chip">{pts} point{pts > 1 ? "s" : ""} sur votre carte</div>}
          </div>
        : <><div className="slogan">{theme ? theme.titre : "Épicerie locale & familiale"}</div>
          <div className="bienv-txt" style={{ position: "relative" }}>Bienvenue sur l'application de l'épicerie</div></>}
      <div className="lieu">Raddon-et-Chapendu</div>
    </div>
  );
}

// Illustrations des écrans de présentation (dessin au trait, couleurs de la marque)
const Illu = {
  jour: <svg viewBox="0 0 120 120" width="120" height="120" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 50h76l-8 46a6 6 0 0 1-6 5H36a6 6 0 0 1-6-5z" fill="#fff" stroke="#1C433B" strokeWidth="3.5" />
    <path d="M40 50 54 24M80 50 66 24" stroke="#1C433B" strokeWidth="3.5" />
    <circle cx="48" cy="44" r="11" fill="#E05A47" /><path d="M48 33c1-4 4-5 6-5" stroke="#6E9B3A" strokeWidth="3" />
    <circle cx="70" cy="42" r="12" fill="#A9C75A" /><path d="M70 30v-4" stroke="#5C3D2E" strokeWidth="3" />
    <path d="M86 46c2-10 8-14 14-14-1 8-6 13-14 14z" fill="#6E9B3A" />
    <path d="M44 70h32M44 82h22" stroke="#C9D6AE" strokeWidth="4" />
  </svg>,
  plateau: <svg viewBox="0 0 120 120" width="120" height="120" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="60" cy="78" rx="46" ry="16" fill="#fff" stroke="#1C433B" strokeWidth="3.5" />
    <path d="M30 74c4-10 14-12 20-6M52 70c6-12 18-12 24-2" stroke="#C27B42" strokeWidth="6" />
    <circle cx="80" cy="70" r="6" fill="#E05A47" /><circle cx="90" cy="74" r="5" fill="#E05A47" />
    <path d="M38 64l10-10 8 8-10 6z" fill="#F2C94C" stroke="#C69A3C" strokeWidth="2" />
    <circle cx="66" cy="60" r="4" fill="#8AAD3B" /><circle cx="72" cy="57" r="4" fill="#8AAD3B" /><circle cx="69" cy="52" r="4" fill="#8AAD3B" />
    <path d="M60 30v8M48 34l3 6M72 34l-3 6" stroke="#C69A3C" strokeWidth="3" />
  </svg>,
  carte: <svg viewBox="0 0 120 120" width="120" height="120" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="16" y="30" width="88" height="58" rx="10" fill="#1C433B" />
    {[0, 1, 2, 3, 4].map(i => <circle key={i} cx={32 + i * 14} cy="66" r="5.5" fill={i < 3 ? "#A9C75A" : "none"} stroke={i < 3 ? "none" : "rgba(255,255,255,.4)"} strokeWidth="2" />)}
    <path d="M28 46h34" stroke="rgba(255,255,255,.85)" strokeWidth="4" />
    <path d="m92 22 3.5 7 7.5 1-5.5 5.3 1.3 7.7L92 39.4 85.2 43l1.3-7.7L81 30l7.5-1z" fill="#F0C860" stroke="#C69A3C" strokeWidth="1.5" />
    <rect x="70" y="40" width="24" height="24" rx="3" fill="#fff" />
    <path d="M74 44h6v6h-6zM84 44h6v6h-6zM74 54h6v6h-6zM86 56h2v2h-2z" fill="#1C433B" />
  </svg>,
};

function Bienvenue({ d, onFin }) {
  const ecrans = [
    { id: "jour", titre: "Le frais du jour", texte: "Fruits, légumes, plats maison et bonnes affaires : voyez ce qui vous attend avant même de passer." },
    d.onglets?.carte !== false && { id: "plateau", titre: "Plateaux & paniers", texte: "Apéritifs, paniers garnis, corbeilles de fruits : choisissez en photo, on prépare tout pour vous." },
    d.onglets?.fidelite !== false && d.fidelite?.active && { id: "carte", titre: "Votre carte de fidélité", texte: "Des points à chaque passage en caisse, des récompenses à la clé. Votre carte tient dans votre téléphone." },
  ].filter(Boolean);
  const rail = useRef(null);
  const [i, setI] = useState(0);
  const dernier = i === ecrans.length - 1;
  const aller = (n) => rail.current?.scrollTo({ left: n * rail.current.clientWidth, behavior: mouvementReduit() ? "auto" : "smooth" });
  const fin = (action) => { try { localStorage.setItem(BIENVENUE_KEY, "1"); } catch { } onFin(action); };
  const avecCarte = ecrans[ecrans.length - 1]?.id === "carte";
  return (
    <div className="bienv">
      <button className="passer" onClick={() => fin()}>Passer</button>
      <div className="rail" ref={rail} onScroll={e => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
        {ecrans.map((e, n) => (
          <section className={"ecran" + (n === i ? " vu" : "")} key={e.id}>
            <div className="illu"><span className="rond" />{Illu[e.id]}</div>
            <h2>{e.titre}</h2>
            <p>{e.texte}</p>
          </section>
        ))}
      </div>
      <div className="bas">
        <div className="pastilles">{ecrans.map((e, n) => <i key={e.id} className={n === i ? "on" : ""} onClick={() => aller(n)} />)}</div>
        {!dernier
          ? <button className="btn" onClick={() => aller(i + 1)}>Suivant</button>
          : avecCarte
            ? <><button className="btn" onClick={() => fin("carte")}>Créer ma carte de fidélité</button>
              <button className="btn gh" style={{ marginTop: 8 }} onClick={() => fin()}>Découvrir l'épicerie</button></>
            : <button className="btn" onClick={() => fin()}>C'est parti</button>}
      </div>
    </div>
  );
}

// ═══════ MESSAGES AVEC L'ÉPICERIE ═══════
const lireChat = () => { try { return JSON.parse(localStorage.getItem(CHAT_KEY) || "null"); } catch { return null; } };
const ecrireChat = (v) => { try { v ? localStorage.setItem(CHAT_KEY, JSON.stringify(v)) : localStorage.removeItem(CHAT_KEY); } catch { } };

// Suit la conversation du client (identifiant secret gardé sur le téléphone)
function useChat() {
  const [moiChat, setMoiChat] = useState(lireChat);
  const [msgs, setMsgs] = useState([]);
  useEffect(() => {
    if (!moiChat?.ref) { setMsgs([]); return; }
    const u1 = onSnapshot(collection(db, "conversations", moiChat.ref, "messages"),
      s => setMsgs(s.docs.map(x => ({ ...x.data(), id: x.id })).sort((a, b) => (a.date || 0) - (b.date || 0))), () => { });
    const u2 = onSnapshot(doc(db, "conversations", moiChat.ref), s => {
      if (!s.exists() && !s.metadata?.fromCache) { ecrireChat(null); setMoiChat(null); }   // conversation supprimée par l'épicerie
    }, () => { });
    return () => { u1(); u2(); };
  }, [moiChat?.ref]);
  const nonLus = msgs.filter(m => m.de === "epicerie" && (m.date || 0) > (moiChat?.vu || 0)).length;
  const marquerVu = () => { if (!moiChat) return; const v = { ...moiChat, vu: Date.now() }; ecrireChat(v); setMoiChat(v); };
  const enregistrer = (v) => { ecrireChat(v); setMoiChat(v); };
  return { moiChat, msgs, nonLus, marquerVu, enregistrer };
}

function BulleChat({ nonLus, haut, onClick }) {
  // « Parlez avec nous » visible quelques secondes, puis la bulle se réduit à l'icône (et dès qu'on fait défiler)
  const [petit, setPetit] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPetit(true), 5000);
    const f = () => { if (window.scrollY > 30) setPetit(true); };
    window.addEventListener("scroll", f, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", f); };
  }, []);
  return (
    <button className={"bulle-chat" + (haut ? " haut" : "") + (petit && !nonLus ? " petit" : "")} onClick={onClick} aria-label="Parlez avec nous">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" strokeLinecap="round" /></svg>
      <span className="bc-txt">Parlez avec nous</span>
      {nonLus > 0 && <b>{nonLus}</b>}
    </button>
  );
}

function Messagerie({ d, moi, chat, onClose, ouvrirLegal }) {
  const { moiChat, msgs, marquerVu, enregistrer } = chat;
  const [nom, setNom] = useState(lirePrenom().prenom || moi?.nom || "");
  const [tel, setTel] = useState("");
  const [texte, setTexte] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [err, setErr] = useState("");
  const fin = useRef(null);
  useEffect(() => { marquerVu(); fin.current?.scrollIntoView({ block: "end" }); }, [msgs.length]);
  const envoyer = async () => {
    const t = texte.trim().slice(0, MAX_TEXTE);
    if (!t || envoi) return;
    if (!moiChat && !nom.trim()) return setErr("Indiquez votre prénom pour que l'épicerie sache qui écrit.");
    setEnvoi(true); setErr("");
    try {
      const now = Date.now();
      const b = writeBatch(db);
      let ref = moiChat?.ref;
      if (!ref) {
        const conv = doc(collection(db, "conversations"));
        ref = refId(conv);
        b.set(conv, { nom: nom.trim().slice(0, 40), tel: tel.trim().slice(0, 20), cree: now, maj: now, dernier: apercu(t), attente: true });
      } else b.update(doc(db, "conversations", ref), { maj: now, dernier: apercu(t), attente: true });
      b.set(doc(collection(db, "conversations", ref, "messages")), { de: "client", texte: t, date: now });
      await b.commit();
      if (!moiChat) enregistrer({ ref, nom: nom.trim(), vu: now });
      setTexte("");
      setTimeout(() => avertirMessage(d.cmd, ref), 1500);   // e-mail à Marion (au plus 1 toutes les 10 min)
    } catch (e) { setErr("Message non envoyé. Vérifiez votre connexion et réessayez."); }
    setEnvoi(false);
  };
  let dernierJour = "";
  return (
    <div className="legal chat-page">
      <div className="legal-top chat-top">
        <button onClick={onClose} aria-label="Retour">←</button>
        <img src={LOGO} alt="" />
        <div><b>{d.store.name}</b><small>Répond en général dans la journée</small></div>
      </div>
      <div className="chat-fil">
        <div className="msg epicerie premier"><div className="txt">Bonjour 👋 Une question sur un produit, un plateau, nos horaires ? Écrivez-nous ici, on vous répond dès que possible.</div></div>
        {msgs.map(m => {
          const j = jourMsg(m.date); const sep = j !== dernierJour; dernierJour = j;
          return <React.Fragment key={m.id}>
            {sep && <div className="chat-jour">{j}</div>}
            <div className={"msg " + (m.de === "epicerie" ? "epicerie" : "client")}>
              <div className="txt">{m.texte}</div>
              <div className="h">{heureMsg(m.date)}</div>
            </div>
          </React.Fragment>;
        })}
        <div ref={fin} />
      </div>
      <div className="chat-saisie">
        {!moiChat && <div className="chat-ident">
          <div style={{ display: "flex", gap: 8 }}>
            <input className="inp" value={nom} maxLength={40} placeholder="Votre prénom" onChange={e => setNom(e.target.value)} autoComplete="given-name" />
            <input className="inp" type="tel" value={tel} maxLength={20} placeholder="Téléphone (facultatif)" onChange={e => setTel(e.target.value)} autoComplete="tel" />
          </div>
          <div className="chat-rgpd">Vos messages servent uniquement à échanger avec l'épicerie. <button className="lien" onClick={() => ouvrirLegal("confidentialite")}>En savoir plus</button></div>
        </div>}
        {err && <div className="manque" style={{ margin: "0 0 6px" }}>{err}</div>}
        <div className="chat-ligne">
          <textarea className="inp" rows={1} value={texte} maxLength={MAX_TEXTE} placeholder="Votre message…" onChange={e => setTexte(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && window.matchMedia("(pointer:fine)").matches) { e.preventDefault(); envoyer(); } }} />
          <button className="chat-env" disabled={!texte.trim() || envoi} onClick={envoyer} aria-label="Envoyer">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5 21 12 3 3.5l2.5 7.2L14 12l-8.5 1.3z" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════ PRÉNOM (reste uniquement sur le téléphone) ═══════
const PRENOM_KEY = "epicerie-raddonnaise-prenom";
const lirePrenom = () => { try { return JSON.parse(localStorage.getItem(PRENOM_KEY) || "null") || {}; } catch { return {}; } };
function usePrenom() {
  const [v, setV] = useState(lirePrenom);
  const enregistrer = (prenom) => { const n = { prenom: String(prenom || "").trim().slice(0, 30), demande: true }; try { localStorage.setItem(PRENOM_KEY, JSON.stringify(n)); } catch { } setV(n); };
  return [v, enregistrer];
}
function DemandePrenom({ initial, onFin }) {
  const [p, setP] = useState(initial || "");
  return (
    <div className="sheet-fond"><div className="sheet" role="dialog" aria-label="Votre prénom">
      <div className="pr-main">👋</div>
      <h3 className="alerte-t">On fait connaissance ?</h3>
      <p className="tr-txt">Comment vous appelez-vous ? L'application vous dira bonjour à chaque visite.<br /><small>Votre prénom reste sur votre téléphone.</small></p>
      <input className="inp" value={p} maxLength={30} placeholder="Votre prénom" autoComplete="given-name" onChange={e => setP(e.target.value)}
        onKeyDown={e => e.key === "Enter" && p.trim() && onFin(p)} style={{ textAlign: "center", fontSize: 18, fontWeight: 800 }} />
      <button className="btn" style={{ marginTop: 12 }} disabled={!p.trim()} onClick={() => onFin(p)}>C'est noté !</button>
      <button className="btn gh" style={{ marginTop: 8 }} onClick={() => onFin("")}>Plus tard</button>
    </div></div>
  );
}

// ═══════ CHANGER DE TÉLÉPHONE ═══════
// Le code de transfert contient les identifiants secrets de la carte, des commandes et de la conversation.
const TR_PREFIXE = "ERT1.";
const b64e = (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const b64d = (s) => decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/"))));
const idOk = (x) => typeof x === "string" && /^[A-Za-z0-9]{15,40}$/.test(x);
function codeTransfert() {
  let carte = null; try { carte = JSON.parse(localStorage.getItem(USER_KEY) || "null"); } catch { }
  const o = {};
  if (carte?.ref) o.c = carte.ref;
  const cmds = lireCmds().filter(c => idOk(c.ref)).map(c => c.ref).slice(0, 10); if (cmds.length) o.o = cmds;
  const ch = lireChat(); if (ch?.ref) o.m = ch.ref;
  const pr = lirePrenom().prenom; if (pr && Object.keys(o).length) o.p = pr.slice(0, 30);
  return Object.keys(o).length ? TR_PREFIXE + b64e(JSON.stringify(o)) : "";
}
function lireTransfert(txt) {
  try {
    const t = String(txt || "").trim().replace(/^.*#transfert=/, "");
    if (!t.startsWith(TR_PREFIXE)) return null;
    const o = JSON.parse(b64d(t.slice(TR_PREFIXE.length)));
    const r = { c: idOk(o.c) ? o.c : null, o: (Array.isArray(o.o) ? o.o : []).filter(idOk).slice(0, 10), m: idOk(o.m) ? o.m : null, p: typeof o.p === "string" ? o.p.slice(0, 30) : "" };
    return r.c || r.o.length || r.m ? r : null;
  } catch { return null; }
}
async function importerTransfert(t) {
  const bilan = { carte: false, cmds: 0, chat: false };
  if (t.c) { const s = await getDoc(doc(db, "clients", t.c)); if (s.exists()) { const x = s.data(); localStorage.setItem(USER_KEY, JSON.stringify({ ref: t.c, code: x.code, nom: x.nom, points: x.points || 0 })); bilan.carte = true; } }
  const deja = lireCmds(), ajout = [];
  for (const r of t.o) {
    if (deja.some(c => c.ref === r)) continue;
    const s = await getDoc(doc(db, "commandes", r)); if (!s.exists()) continue;
    const c = s.data();
    ajout.push({ numero: c.numero, ref: r, date: c.date, mode: c.mode, total: c.total, resume: (c.lignes || []).map(l => l.nom + " (" + l.personnes + " pers.)").join(", "), nom: c.nom, tel: c.tel, adresse: c.adresse, statut: c.statut, vu: c.statut });
  }
  if (ajout.length) { ecrireCmds([...ajout, ...deja].sort((a, b) => (b.date || "").localeCompare(a.date || ""))); bilan.cmds = ajout.length; }
  if (t.m) { const s = await getDoc(doc(db, "conversations", t.m)); if (s.exists()) { ecrireChat({ ref: t.m, nom: s.data().nom, vu: Date.now() }); bilan.chat = true; } }
  try { localStorage.setItem(BIENVENUE_KEY, "1"); if (t.p) localStorage.setItem(PRENOM_KEY, JSON.stringify({ prenom: t.p, demande: true })); } catch { }
  return bilan;
}

function FenetreEnvoi({ onClose }) {
  const code = useMemo(codeTransfert, []);
  const url = location.origin + location.pathname + "#transfert=" + code;
  const [copie, setCopie] = useState(false);
  const copier = async () => { try { await navigator.clipboard.writeText(url); setCopie(true); } catch { prompt("Copiez ce code :", url); } };
  return (
    <div className="sheet-fond" onClick={onClose}><div className="sheet" onClick={e => e.stopPropagation()}>
      <h3 className="alerte-t">Changer de téléphone</h3>
      {!code ? <p className="tr-txt">Il n'y a rien à transférer : pas encore de carte, de commande ni de message sur ce téléphone.</p> : <>
        <p className="tr-txt">Sur le <b>nouveau téléphone</b>, ouvrez l'appareil photo et scannez ce code : votre carte, vos commandes et vos messages seront récupérés.</p>
        <div className="tr-qr"><QR texte={url} taille={230} /></div>
        <button className="btn gh" onClick={copier}>{copie ? "✓ Lien copié" : "Copier le lien (à s'envoyer par SMS ou e-mail)"}</button>
        <div className="tr-alerte">🔒 Ce code donne accès à votre carte, vos commandes et vos messages : ne le montrez à personne d'autre.</div>
      </>}
      <button className="btn" style={{ marginTop: 10 }} onClick={onClose}>Fermer</button>
    </div></div>
  );
}

function FenetreReception({ code0, onClose }) {
  const [txt, setTxt] = useState(code0 || "");
  const [etat, setEtat] = useState("");
  const t = lireTransfert(txt);
  const go = async () => {
    if (!t) return;
    setEtat("…");
    try {
      const b = await importerTransfert(t);
      if (!b.carte && !b.cmds && !b.chat) return setEtat("Rien n'a été trouvé : le code est peut-être trop ancien (données supprimées par l'épicerie).");
      if (location.hash) history.replaceState(null, "", location.pathname);
      location.reload();
    } catch { setEtat("Récupération impossible : vérifiez votre connexion et réessayez."); }
  };
  return (
    <div className="sheet-fond" onClick={onClose}><div className="sheet" onClick={e => e.stopPropagation()}>
      <h3 className="alerte-t">Récupérer mes données</h3>
      {code0 && t ? <p className="tr-txt">Ce lien vient de votre ancien téléphone. On récupère :
        {t.c && <><br />✓ votre carte de fidélité</>}{!!t.o.length && <><br />✓ {t.o.length} commande{t.o.length > 1 ? "s" : ""}</>}{t.m && <><br />✓ vos messages avec l'épicerie</>}</p>
        : <>
          <p className="tr-txt">Sur l'<b>ancien téléphone</b> : onglet Infos → « Changer de téléphone » → scannez le code avec l'appareil photo de celui-ci.
            Ou collez ici le lien que vous vous êtes envoyé :</p>
          <textarea className="inp" rows={3} value={txt} onChange={e => setTxt(e.target.value)} placeholder="Collez le lien ou le code de transfert" />
          {txt && !t && <p className="manque">Ce code n'est pas reconnu.</p>}
        </>}
      {etat && etat !== "…" && <p className="manque">{etat}</p>}
      <button className="btn" style={{ marginTop: 10 }} disabled={!t || etat === "…"} onClick={go}>{etat === "…" ? "Récupération…" : "Récupérer"}</button>
      <button className="btn gh" style={{ marginTop: 8 }} onClick={() => { if (location.hash) history.replaceState(null, "", location.pathname); onClose(); }}>Annuler</button>
    </div></div>
  );
}

function MonPrenom({ prenom, onChange }) {
  const [ed, setEd] = useState(false);
  return (
    <div className="card" style={{ marginTop: 14 }}><div className="b" style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ flex: 1 }}><div style={{ fontSize: 12, color: "var(--ink3)", fontWeight: 700 }}>Votre prénom</div>
        <div style={{ fontWeight: 800, fontSize: 15 }}>{prenom || "Non renseigné"}</div></div>
      <button className="btn gh" style={{ width: "auto", padding: "9px 16px" }} onClick={() => setEd(true)}>{prenom ? "Modifier" : "Ajouter"}</button>
      {ed && <DemandePrenom initial={prenom} onFin={(p) => { if (p || prenom) onChange(p || prenom); setEd(false); }} />}
    </div></div>
  );
}

function ChangerTelephone() {
  const [vue, setVue] = useState(null);
  return (
    <>
      <h3 className="h2" style={{ marginTop: 18 }}><i />Changer de téléphone</h3>
      <div className="sub">Gardez votre carte, vos commandes et vos messages</div>
      <div className="card"><div className="b" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn gh" onClick={() => setVue("envoi")}>📤 Transférer vers un autre téléphone</button>
        <button className="btn gh" onClick={() => setVue("reception")}>📥 Récupérer depuis mon ancien téléphone</button>
      </div></div>
      {vue === "envoi" && <FenetreEnvoi onClose={() => setVue(null)} />}
      {vue === "reception" && <FenetreReception onClose={() => setVue(null)} />}
    </>
  );
}

// ═══════ RÉSERVATIONS ANTI-GASPI (promos, dates courtes, paniers) ═══════
const RESA_KEY = "epicerie-raddonnaise-resas";
const lireResas = () => { try { return JSON.parse(localStorage.getItem(RESA_KEY) || "[]"); } catch { return []; } };
const ecrireResas = (l) => { try { localStorage.setItem(RESA_KEY, JSON.stringify(l.slice(0, 15))); } catch { } };
const ALPHA_R = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const numeroResa = () => { const a = new Uint32Array(5); crypto.getRandomValues(a); return "R-" + [...a].map(x => ALPHA_R[x % ALPHA_R.length]).join(""); };
const restant = (i) => Math.max(0, (parseInt(i.stock) || 0) - (parseInt(i.reserves) || 0));
const reservable = (i) => (parseInt(i.stock) || 0) > 0;

function useMesResas(version) {
  const [liste, setListe] = useState(lireResas);
  const [live, setLive] = useState({});
  useEffect(() => { setListe(lireResas()); }, [version]);
  const refs = liste.filter(r => r.ref && Date.now() - (r.cree || 0) < 4 * 864e5).map(r => r.ref);
  useEffect(() => {
    const u = refs.map(r => onSnapshot(doc(db, "resas", r), s => setLive(p => ({ ...p, [r]: s.exists() ? s.data() : { statut: "annulee" } })), () => { }));
    return () => u.forEach(f => f());
  }, [refs.join()]);
  return liste.filter(r => refs.includes(r.ref)).map(r => live[r.ref] ? { ...r, statut: live[r.ref].statut } : r);
}

function MesResas({ resas }) {
  const actives = resas.filter(r => r.statut === "reservee");
  if (!actives.length) return null;
  return actives.map(r => (
    <div className="resa-suivi" key={r.numero}>
      <div className="rs-ic">🧺</div>
      <div style={{ minWidth: 0 }}><b>Réservé : {r.qte} × {r.titre}</b>
        <div>À retirer {r.retrait || "à l'épicerie"} · N° {r.numero}{r.total > 0 ? " · " + euros(r.total) : ""}</div></div>
    </div>
  ));
}

function Reserver({ i, d, prenom, onClose, onFait }) {
  const max = Math.min(10, restant(i));
  const [qte, setQte] = useState(1);
  const dernier = lireResas()[0] || {};
  const [nom, setNom] = useState(prenom || dernier.nom || "");
  const [tel, setTel] = useState(dernier.tel || "");
  const [etat, setEtat] = useState("");
  const [fini, setFini] = useState(null);
  const prix = Number(i.prix) || 0;
  const envoyer = async () => {
    if (!nom.trim() || qte < 1 || qte > max || etat === "envoi") return;
    setEtat("envoi");
    const r = { numero: numeroResa(), cree: Date.now(), statut: "reservee", item: String(i.id), titre: String(i.titre).slice(0, 80), qte, prix,
      total: Math.round(prix * qte * 100) / 100, nom: nom.trim().slice(0, 40), tel: tel.trim().slice(0, 20), retrait: String(i.retrait || "").slice(0, 60) };
    try {
      const b = writeBatch(db);
      const ref = doc(collection(db, "resas"));
      b.set(ref, r);
      b.update(doc(db, "jour", String(i.id)), { reserves: increment(qte) });
      await b.commit();
      ecrireResas([{ ref: refId(ref), numero: r.numero, titre: r.titre, qte, total: r.total, retrait: r.retrait, nom: r.nom, tel: r.tel, cree: r.cree, statut: "reservee" }, ...lireResas()]);
      setTimeout(() => avertirResa(d.cmd, refId(ref)), 1200);
      setFini(r); onFait?.();
    } catch (e) {
      setEtat(e?.code === "permission-denied" ? "Désolé, il n'en reste plus assez : quelqu'un a été plus rapide !" : "Réservation impossible. Vérifiez votre connexion et réessayez.");
      return;
    }
    setEtat("");
  };
  return (
    <div className="sheet-fond" onClick={onClose}><div className="sheet" onClick={e => e.stopPropagation()} role="dialog" aria-label={"Réserver " + i.titre}>
      {fini ? <>
        <div className="ok-rond">✓</div>
        <h3 className="alerte-t">C'est réservé !</h3>
        <p className="tr-txt"><b>{fini.qte} × {fini.titre}</b> mis de côté pour vous.<br />À retirer <b>{fini.retrait || "à l'épicerie"}</b>
          {fini.total > 0 && <><br />À régler sur place : {euros(fini.total)}</>}<br /><small>N° {fini.numero}</small></p>
        <button className="btn" onClick={onClose}>Merci !</button>
      </> : <>
        <div className="sheet-hd">
          {i.photo && <img src={i.photo} alt="" />}
          <div><h3>{i.titre}</h3><span>{prix > 0 ? euros(prix) + (i.unite ? " / " + i.unite : "") : ""}{i.ancienPrix && Number(i.ancienPrix) > prix ? " au lieu de " + euros(i.ancienPrix) : ""}</span></div>
        </div>
        {i.note && <p className="tr-txt" style={{ marginTop: 10, textAlign: "left" }}>{i.note}</p>}
        <div className="resa-info">🕒 À retirer <b>{i.retrait || "à l'épicerie"}</b>{parseInt(i.stock) < 999 ? " · " + (max > 0 ? "plus que " + restant(i) : "épuisé") : ""}</div>
        {max > 0 ? <>
          <div className="lab" style={{ textAlign: "center", marginTop: 12 }}>Quantité</div>
          <div className="pas">
            <button onClick={() => setQte(Math.max(1, qte - 1))} disabled={qte <= 1} aria-label="Un de moins">−</button>
            <input type="number" value={qte} readOnly aria-label="Quantité" />
            <button onClick={() => setQte(Math.min(max, qte + 1))} disabled={qte >= max} aria-label="Un de plus">+</button>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <input className="inp" value={nom} maxLength={40} placeholder="Votre nom" onChange={e => setNom(e.target.value)} />
            <input className="inp" type="tel" value={tel} maxLength={20} placeholder="Tél. (facultatif)" onChange={e => setTel(e.target.value)} />
          </div>
          {etat && etat !== "envoi" && <p className="manque">{etat}</p>}
          <button className="btn" style={{ marginTop: 12, background: "var(--terra)" }} disabled={!nom.trim() || etat === "envoi"} onClick={envoyer}>
            {etat === "envoi" ? "Réservation…" : "Je réserve" + (prix > 0 ? " — " + euros(prix * qte) : "")}</button>
          <p className="cal-info" style={{ textAlign: "center" }}>Paiement sur place. Pas venu à temps ? L'article est remis en vente.</p>
        </> : <p className="manque" style={{ textAlign: "center" }}>Tout est parti, désolé ! Revenez demain 😉</p>}
        <button className="btn gh" style={{ marginTop: 8 }} onClick={onClose}>Fermer</button>
      </>}
    </div></div>
  );
}

// ═══════ FAIRE DÉCOUVRIR L'APPLI ═══════
function PartagerAppli({ d }) {
  const url = location.origin + location.pathname;
  const texte = "Je te conseille l'appli de l'" + d.store.name + " : le frais du jour, les promos et les plateaux à commander 🍏 ";
  const [qr, setQr] = useState(false);
  const partager = async () => {
    if (navigator.share) { try { await navigator.share({ title: d.store.name, text: texte, url }); return; } catch (e) { if (e?.name === "AbortError") return; } }
    window.open("https://wa.me/?text=" + encodeURIComponent(texte + url), "_blank", "noopener");
  };
  return (
    <>
      <h3 className="h2" style={{ marginTop: 18 }}><i />Faites découvrir l'appli</h3>
      <div className="sub">À vos voisins, à votre famille…</div>
      <div className="card"><div className="b" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <button className="btn" onClick={partager}>📤 Partager l'application</button>
        <a className="btn gh" style={{ textDecoration: "none", textAlign: "center" }} href={"https://wa.me/?text=" + encodeURIComponent(texte + url)} target="_blank" rel="noopener">Envoyer par WhatsApp</a>
        <button className="btn gh" onClick={() => setQr(!qr)}>{qr ? "Masquer le QR code" : "Montrer le QR code à quelqu'un"}</button>
        {qr && <div className="tr-qr"><QR texte={url} taille={200} /></div>}
      </div></div>
    </>
  );
}

// ═══════ APP ═══════
function App() {
  const d = useShop();
  const [moi, setMoi] = useMoi();
  const [tab, setTab] = useState("accueil");
  const [ecran, setEcran] = useState(null);
  const [splash, setSplash] = useState(true);
  const [bienvenue, setBienvenue] = useState(() => { try { return !location.hash.includes("transfert=") && localStorage.getItem(BIENVENUE_KEY) !== "1"; } catch { return false; } });
  const [transfert, setTransfert] = useState(() => { try { return location.hash.includes("transfert=") ? location.hash : null; } catch { return null; } });
  const inst = useInstall();
  const [propose, setPropose] = useState(false);
  const [legal, setLegal] = useState(null);
  const [panier, setPanier] = useState([]);      // [{ id, personnes }]
  const [choix, setChoix] = useState(null);      // plateau en cours de choix
  const [cmdV, setCmdV] = useState(0);
  const chat = useChat();
  const [resaV, setResaV] = useState(0);
  const mesResas = useMesResas(resaV);
  const [resaItem, setResaItem] = useState(null);

  const [pr, setPrenom] = usePrenom();
  const prenom = pr.prenom || (moi?.nom ? moi.nom.trim().split(/\s+/)[0] : "");
  const [chatOuvert, setChatOuvert] = useState(false);
  const [mesCmds, marquerVu] = useMesCommandes(cmdV);
  const alerte = mesCmds.find(aAvertir);
  const maj = useMiseAJour();
  // Lignes calculées avec les prix actuels (un plateau retiré par Marion disparaît du panier)
  const lignes = panier.map(l => {
    const p = d.plateaux.find(x => x.id === l.id && enCours(x)); if (!p) return null;
    const ch = choixDe(p), sel = ch ? (l.choix || []).filter(x => ch.options.some(o => o.nom === x)) : [];
    const pu = prixAvecChoix(p, sel);
    return { id: p.id, nom: p.nom + (sel.length ? " — " + sel.join(", ") : ""), choix: sel, personnes: l.personnes, prixPersonne: pu, montant: l.personnes * pu };
  }).filter(Boolean);
  const choisir = (p) => setChoix(p);
  const ouvert = useMemo(() => fermeLe(d.fermetures, isoDe(new Date())) ? false : estOuvert(d.hours), [d.hours, d.fermetures]);
  const theme = useMemo(() => themeDuJour(d.themes), [d.themes]);
  const onFid = () => setEcran(moi ? "qr" : "inscription");
  const go = (t) => { setTab(t); window.scrollTo(0, 0); };

  if (splash) return <><style>{CSS}</style><Intro moi={d.fidActive ? moi : null} prenom={prenom} theme={theme} onEnd={() => setSplash(false)} /></>;
  if (bienvenue && !moi) return <><style>{CSS}</style>
    <Bienvenue d={d} onFin={(action) => { setBienvenue(false); if (action === "carte") setEcran("inscription"); }} /></>;

  if (legal && ecran !== "commande" && !chatOuvert) return <><style>{CSS}</style><PageLegale type={legal} d={d} onClose={() => setLegal(null)} /></>;

  const fenetreChoix = choix && <ChoixPlateau p={choix} actuel={panier.find(l => l.id === choix.id)}
    onClose={() => setChoix(null)}
    onRetirer={() => { setPanier(l => l.filter(x => x.id !== choix.id)); setChoix(null); }}
    onValider={(n, sel) => { setPanier(l => l.some(x => x.id === choix.id) ? l.map(x => x.id === choix.id ? { ...x, personnes: n, choix: sel } : x) : [...l, { id: choix.id, personnes: n, choix: sel }]); setChoix(null); }} />;

  if (chatOuvert) return <><style>{CSS}</style><Messagerie d={d} moi={moi} chat={chat} ouvrirLegal={setLegal} onClose={() => setChatOuvert(false)} />
    {legal && <div style={{ position: "relative", zIndex: 500 }}><PageLegale type={legal} d={d} onClose={() => setLegal(null)} /></div>}</>;

  if (ecran === "commande") return <><style>{CSS}</style>
    <Commande d={d} moi={moi} lignes={lignes} ouvrirLegal={setLegal} onEnvoyee={() => setCmdV(v => v + 1)}
      modifier={(id) => setChoix(d.plateaux.find(x => x.id === id))} vider={() => setPanier([])}
      onClose={() => { setEcran(null); setTab("carte"); window.scrollTo(0, 0); }} />{fenetreChoix}
    {legal && <div style={{ position: "relative", zIndex: 500 }}><PageLegale type={legal} d={d} onClose={() => setLegal(null)} /></div>}</>;

  if (ecran === "qr" && moi) return (
    <div className="full" onClick={() => setEcran(null)}>
      <style>{CSS}</style>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#666" }}>À présenter en caisse</div>
      <QR texte={moi.code} couleur="#000" taille="min(78vw,330px)" style={{ width: "min(78vw,330px)", height: "min(78vw,330px)" }} />
      <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 5 }}>{moi.code}</div>
      <div style={{ fontFamily: "'Sacramento',cursive", fontSize: 26, color: "#444" }}>{moi.nom}</div>
      <div style={{ fontSize: 11, color: "#999" }}>Touchez l'écran pour fermer</div>
    </div>
  );

  if (ecran === "inscription") return (
    <div className="app"><style>{CSS}</style>
      <Inscription ouvrirLegal={setLegal} onCancel={() => setEcran(null)} onDone={c => { setMoi(c); setEcran(null); setTab("fidelite"); if (inst.possible) setPropose(true); }} />
    </div>
  );

  const onglets = [
    { id: "accueil", label: "Accueil", ic: Ic.home, on: true },
    { id: "carte", label: "La carte", ic: Ic.basket, on: d.onglets?.carte !== false },
    { id: "fidelite", label: "Fidélité", ic: Ic.star, on: d.onglets?.fidelite !== false },
    { id: "actus", label: "Actus", ic: Ic.news, on: d.actus.some(enCours) },
    { id: "infos", label: "Infos", ic: Ic.info, on: true },
  ].filter(o => o.on);

  return (
    <div className={"app" + (lignes.length ? " avec-panier" : "")} style={theme ? { "--top": theme.top } : undefined}>
      <style>{CSS}</style>
      {theme?.anim && tab === "accueil" && <Particules theme={theme} />}
      <header className="top">
        <img src={LOGO} alt="" />
        <div><h1>{d.store.name}</h1><small>Raddon-et-Chapendu · v{VERSION}</small></div>
        {ouvert !== null && <span className={"state" + (ouvert ? "" : " off")}><span className="dot" />{ouvert ? "Ouvert" : "Fermé"}</span>}
      </header>
      {theme && <div className="frise-theme" style={{ background: theme.frise }} />}
      {tab === "accueil" && <Accueil d={d} theme={theme} prenom={prenom} onReserver={setResaItem} mesResas={mesResas} moi={moi} mesCmds={mesCmds} onFid={onFid} versCarte={() => go("carte")} versActus={() => go("actus")} versFid={() => go("fidelite")} inst={inst} />}
      {tab === "actus" && <Actus d={d} />}
      {tab === "carte" && <Carte d={d} panier={panier} choisir={choisir} mesCmds={mesCmds}
        recommander={(ls) => { setPanier(ls.filter(l => d.plateaux.some(p => String(p.id) === String(l.id) && enCours(p))).map(l => ({ id: d.plateaux.find(p => String(p.id) === String(l.id)).id, personnes: l.personnes, choix: l.choix || [] }))); setEcran("commande"); window.scrollTo(0, 0); }} />}

      {resaItem && <Reserver i={(d.jour?.items || []).find(x => x.id === resaItem.id) || resaItem} d={d} prenom={prenom} onClose={() => setResaItem(null)} onFait={() => setResaV(v => v + 1)} />}
      {transfert && <FenetreReception code0={transfert} onClose={() => setTransfert(null)} />}
      {!transfert && !prenom && !pr.demande && !alerte && <DemandePrenom onFin={setPrenom} />}
      {alerte && !choix && !transfert && <AlerteCommande c={alerte} store={d.store} onClose={() => marquerVu(alerte.ref, alerte.statut)} />}
      {fenetreChoix}
      <BarrePanier lignes={lignes} onOuvrir={() => { setEcran("commande"); window.scrollTo(0, 0); }} />
      {d.chat?.active !== false && <BulleChat nonLus={chat.nonLus} haut={lignes.length > 0} onClick={() => setChatOuvert(true)} />}
      {tab === "fidelite" && <Fidelite d={d} moi={moi} setMoi={setMoi} onFid={onFid} inst={inst} ouvrirLegal={setLegal} />}
      {tab === "infos" && <Infos d={d} inst={inst} ouvrirLegal={setLegal} pr={pr} setPrenom={setPrenom} />}
      <BandeauMaj dispo={maj} />
      {propose && <ProposeInstall inst={inst} onClose={() => setPropose(false)} />}
      {inst.ouvert && <AssistantInstall inst={inst} />}
      <nav className="tabs">
        {onglets.map(o => (
          <button key={o.id} className={"tab" + (tab === o.id ? " on" : "")} onClick={() => { setTab(o.id); window.scrollTo(0, 0); }}>
            {o.ic(21, tab === o.id ? "#1C433B" : "#93A099")}{o.label}
          </button>))}
      </nav>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
