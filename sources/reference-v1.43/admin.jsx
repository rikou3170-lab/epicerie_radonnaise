import React, { useState, useEffect, useRef, useMemo } from "react";
import { createRoot } from "react-dom/client";
import {
  db, auth, CONFIG_REF, nouveauCode, doc, collection, onSnapshot, setDoc, writeBatch,
  increment, getDocs, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,
} from "./firebase.js";
import { VERSION } from "./version.js";
import { useMiseAJour, BandeauMaj, BoutonMaj } from "./maj.jsx";
import { MAX_TEXTE, apercu, heureMsg, jourMsg } from "./chat.js";
import { etatRemise, remiseDe, eurosFr, REMISE_DEF } from "./fidelite.js";
import { THEMES, themeDuJour, periodeTheme, Particules, CarteTheme, IllustrationTheme, CSS_THEMES, persoVersTheme, emojisDe } from "./themes.jsx";
import { cmdCfg, regleDates, euros, dateLongue, prixPers, bornes, choixDe, prixAvecChoix, LISTE_RACLETTE, urlTestMail, scriptValide, MODES, JOURS_SEM, heureFr, dateRetrait } from "./commande.js";

// ═══════════════════════════════════════════════════════════
//  ÉPICERIE RADDONNAISE — Administration (pour Marion)
//  Tout ce qui est saisi ici alimente l'application client.
// ═══════════════════════════════════════════════════════════
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
  jour: { items: [], maj: "" }, offres: [], actus: [],
  fidelite: { active: true, parEuro: 1, paliers: [], titre: "Carte de fidélité",
    sousTitre: "1 € dépensé = 1 point · 200 points = 5 € de remise", total: 10, remise: { active: true, points: 200, euros: 5 } },
  clients: [],
  onglets: { carte: true, fidelite: true },
};

const TYPES = [
  { id: "frais", label: "Frais du jour", c: "#6E9B3A" },
  { id: "plat", label: "Fait maison", c: "#1C433B" },
  { id: "promo", label: "Promo", c: "#C27B42" },
  { id: "gaspi", label: "Date courte", c: "#B08A2E" },
  { id: "panier", label: "Panier anti-gaspi", c: "#2E7D32" },
];
const aujourdhui = () => new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

const aujourdISO = () => new Date().toLocaleDateString("sv-SE");   // AAAA-MM-JJ, heure locale
const finie = (fin) => !!fin && fin < aujourdISO();
const dateFr = (iso) => iso ? new Date(iso + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" }) : "";

// Statut d'une annonce selon ses dates de parution
const statut = (x, fem) => {
  const e = fem ? "e" : "";
  if (x.active === false) return ["off", "Masqué" + e];
  const t = aujourdISO();
  if (x.debut && x.debut > t) return ["promo", "Programmé" + e + " — dès le " + dateFr(x.debut)];
  if (x.fin && x.fin < t) return ["off", "Terminé" + e + " — masqué" + e];
  return ["on", x.fin ? "En ligne jusqu'au " + dateFr(x.fin) : "En ligne"];
};
const Pastille = ({ x, fem, style }) => { const [c, t] = statut(x, fem); return <span className={"pill " + c} style={{ display: "inline-block", ...style }}>{t}</span>; };

// Dates de parution : vides = tout de suite / sans fin
function Periode({ v, onChange }) {
  return (
    <>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Paraît à partir du</label>
          <input className="inp" type="date" value={v.debut || ""} onChange={e => onChange({ ...v, debut: e.target.value })} /></div>
        <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Jusqu'au</label>
          <input className="inp" type="date" min={v.debut || undefined} value={v.fin || ""} onChange={e => onChange({ ...v, fin: e.target.value })} /></div>
      </div>
      <div style={{ fontSize: 11, color: "var(--ink3)", margin: "5px 2px 0" }}>Vide = publié tout de suite, sans date de fin.
        {(v.debut || v.fin) && <button onClick={() => onChange({ ...v, debut: "", fin: "" })} style={{ marginLeft: 6, border: "none", background: "none", color: "var(--red)", fontFamily: "var(--body)", fontSize: 11, fontWeight: 800, cursor: "pointer", padding: 0 }}>Effacer les dates</button>}
      </div>
    </>
  );
}

const uid = () => Date.now() + Math.floor(Math.random() * 999);
const code4 = nouveauCode;

const CONFIG_KEYS = ["store", "hours", "services", "annonce", "fidelite", "onglets", "legal", "cmd", "themes", "chat", "fermetures"];
const COLS = ["offres", "actus", "jour", "clients", "pubs", "plateaux", "commandes", "conversations", "resas"];
const tri = (l, desc) => [...l].sort((x, y) => desc ? (y.cree || 0) - (x.cree || 0) : (x.cree || 0) - (y.cree || 0));
const configVide = () => Object.fromEntries(CONFIG_KEYS.filter(k => EMPTY[k] !== undefined).map(k => [k, EMPTY[k]]));

// Écrit les différences entre l'ancienne et la nouvelle liste (ajouts, modifs, suppressions)
async function syncCol(col, prev = [], next = []) {
  const b = writeBatch(db);
  const avant = new Map(prev.map(x => [String(x.id), x]));
  const gardes = new Set();
  let ops = 0;
  next.forEach(x => {
    const id = x.id != null ? String(x.id) : "";
    const ancien = avant.get(id);
    const { id: _ignore, ...data } = x;
    if (!ancien) {
      // nouvel élément → identifiant aléatoire Firestore (jamais devinable)
      b.set(doc(collection(db, col)), { cree: Date.now(), ...data }); ops++;
    } else {
      gardes.add(id);
      const { id: _a, ...dataAncien } = ancien;
      if (JSON.stringify(dataAncien) !== JSON.stringify(data)) { b.set(doc(db, col, id), data); ops++; }
    }
  });
  const supprimes = prev.filter(x => !gardes.has(String(x.id)) && next.every(y => String(y.id) !== String(x.id)));
  supprimes.forEach(x => { b.delete(doc(db, col, String(x.id))); ops++; });
  if (ops) await b.commit();
  // clients supprimés → on efface aussi leur historique de points
  if (col === "clients") for (const x of supprimes) {
    const h = await getDocs(collection(db, "clients", String(x.id), "historique"));
    if (!h.empty) { const bh = writeBatch(db); h.forEach(d => bh.delete(d.ref)); await bh.commit(); }
  }
}

function useShop(actif) {
  const [cfg, setCfg] = useState(null);
  const [cols, setCols] = useState({ offres: [], actus: [], jour: [], clients: [], pubs: [], plateaux: [], commandes: [], conversations: [], resas: [] });
  const [erreur, setErreur] = useState("");
  const [pend, setPend] = useState({});   // saisies en cours, pas encore envoyées
  const minuteurs = useRef({});

  useEffect(() => {
    if (!actif) return;
    const err = (e) => setErreur(e?.code || "erreur");
    const u = [onSnapshot(CONFIG_REF, { includeMetadataChanges: false }, s => {
      if (s.exists()) setCfg(s.data());
      else {
        setCfg({});
        // premier lancement : on crée la configuration de base
        if (!s.metadata.fromCache) setDoc(CONFIG_REF, configVide(), { merge: true }).catch(err);
      }
    }, err)];
    COLS.forEach(c => u.push(onSnapshot(collection(db, c), s => {
      setCols(p => ({ ...p, [c]: s.docs.map(x => ({ ...x.data(), id: x.id })) }));
    }, ["pubs", "plateaux", "commandes", "conversations", "resas"].includes(c) ? (e) => console.warn(c + " non lisible (règles Firestore à mettre à jour ?)", e?.code) : err)));
    return () => u.forEach(f => f());
  }, [actif]);

  const d = useMemo(() => {
    const base = { ...EMPTY, ...(cfg || {}), ...pend };
    return {
      ...base,
      offres: tri(cols.offres),
      actus: tri(cols.actus, true),
      jour: { items: tri(cols.jour, true), maj: base.jourMaj || "" },
      pubs: [...cols.pubs].sort((x, y) => (x.ordre ?? x.cree ?? 0) - (y.ordre ?? y.cree ?? 0)),
      plateaux: [...cols.plateaux].sort((x, y) => (x.ordre ?? x.cree ?? 0) - (y.ordre ?? y.cree ?? 0)),
      commandes: cols.commandes,
      conversations: cols.conversations,
      resas: cols.resas,
      fermetures: Array.isArray(base.fermetures) ? base.fermetures : [],
      clients: [...cols.clients].sort((x, y) => (x.nom || "").localeCompare(y.nom || "", "fr")),
    };
  }, [cfg, cols, pend]);

  const ref = useRef(d);
  ref.current = d;

  const signaler = (e) => {
    console.error(e);
    alert(e?.code === "permission-denied"
      ? "Enregistrement refusé : votre session a peut-être expiré. Reconnectez-vous."
      : "Enregistrement impossible. Vérifiez la connexion internet et réessayez.");
  };

  const set = async (champ, v) => {
    const prev = ref.current[champ];
    const next = typeof v === "function" ? v(prev) : v;
    try {
      if (CONFIG_KEYS.includes(champ)) {
        // affichage immédiat + envoi groupé (évite une écriture par touche du clavier)
        ref.current = { ...ref.current, [champ]: next };
        setPend(p => ({ ...p, [champ]: next }));
        clearTimeout(minuteurs.current[champ]);
        minuteurs.current[champ] = setTimeout(async () => {
          try { await setDoc(CONFIG_REF, { [champ]: next }, { merge: true }); }
          catch (e) { signaler(e); }
          setPend(p => { if (p[champ] !== next) return p; const { [champ]: _x, ...r } = p; return r; });
        }, 500);
      }
      else if (champ === "jour") {
        await syncCol("jour", prev.items, next.items);
        if (next.maj !== prev.maj) await setDoc(CONFIG_REF, { jourMaj: next.maj }, { merge: true });
      }
      else if (COLS.includes(champ)) await syncCol(champ, prev, next);
    } catch (e) { signaler(e); }
  };

  // Réinitialise le contenu affiché aux clients — les cartes de fidélité sont conservées
  const reinitialiser = async () => {
    try {
      for (const c of ["offres", "actus", "jour", "pubs", "plateaux"]) await syncCol(c, ref.current[c === "jour" ? "jour" : c].items || ref.current[c], []);
      await setDoc(CONFIG_REF, { ...configVide(), jourMaj: "" });
    } catch (e) { signaler(e); }
  };

  return [d, set, reinitialiser, { pret: cfg !== null, erreur }];
}

// Points fidélité : incrément atomique + trace dans l'historique du client
async function ajouterPoints(client, delta, info) {
  const n = Math.max(-(client.points || 0), delta);   // jamais en dessous de zéro
  const b = writeBatch(db);
  const ref = doc(db, "clients", String(client.id));
  b.update(ref, {
    points: increment(n),
    ...(info.montant ? { depense: increment(info.montant) } : {}),
    derniere: new Date().toISOString().slice(0, 10),
  });
  b.set(doc(collection(db, "clients", String(client.id), "historique")), { date: Date.now(), points: n, ...info });
  await b.commit();
}

// photo → base64 compressé
function lirePhoto(file, cb, max = 800) {
  const r = new FileReader();
  r.onload = () => {
    const img = new Image();
    img.onload = () => {
      const ech = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * ech); c.height = Math.round(img.height * ech);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      let q = 0.72, out = c.toDataURL("image/jpeg", q);
      while (out.length > 600000 && q > 0.35) { q -= 0.1; out = c.toDataURL("image/jpeg", q); }
      cb(out);
    };
    img.src = r.result;
  };
  r.readAsDataURL(file);
}

const I = {
  home: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>,
  shop: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round"><path d="M4 8h16l-1 12H5z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>,
  basket: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round"><path d="M3 9h18l-2 11H5z" /><path d="M8 9 12 3l4 6" /></svg>,
  news: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9h6M7 13h10M7 17h10" /></svg>,
  img: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 16-5-5-9 9" /></svg>,
  star: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round"><path d="m12 3 2.7 5.6 6.3.9-4.5 4.3 1 6.2-5.5-3-5.5 3 1-6.2L3 9.5l6.3-.9z" /></svg>,
  gear: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7"><circle cx="12" cy="12" r="3.2" /><path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3" /></svg>,
  plus: (s = 16, c = "#fff") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>,
  pen: (s = 16, c = "#5C6A62") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M11 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6" /><path d="M18.4 2.6a2 2 0 0 1 2.8 2.8L12 14.6 8 15.6l1-4z" /></svg>,
  bin: (s = 16, c = "#C86B5C") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><path d="M3.5 6h17M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6M6 6l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14" /></svg>,
  cam: (s = 18, c = "#5C6A62") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7"><path d="M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.3-2h7.9l1.3 2h2.3A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z" /><circle cx="12" cy="12.8" r="3.4" /></svg>,
  bulle: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></svg>,
  sapin: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><path d="M12 2.5 7 9h3l-4 6h3.5L5 20h14l-4.5-5H18l-4-6h3z" /><path d="M12 20v2" /></svg>,
  cmd: (s = 20, c = "currentColor") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round"><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3" /></svg>,
  qr: (s = 18, c = "#fff") => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3h-3zM20 14v3M14 20h6" /></svg>,
};

const CSS = CSS_THEMES + `
:root{--bg:#F7F3EA;--card:#fff;--forest:#1C433B;--apple:#6E9B3A;--apple-soft:#EEF3E2;
 --terra:#C27B42;--gold:#C69A3C;--red:#C86B5C;--ink:#22302A;--ink2:#5C6A62;--ink3:#93A099;
 --line:#E6E0D2;--r:16px;--r-s:11px;--script:'Sacramento',cursive;--body:'Nunito',system-ui,sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
.adm{max-width:440px;margin:0 auto;min-height:100vh;background:var(--bg);color:var(--ink);
 font-family:var(--body);padding-bottom:78px;-webkit-font-smoothing:antialiased}
.top{position:sticky;top:0;z-index:60;display:flex;align-items:center;gap:11px;padding:11px 16px;
 background:var(--forest);color:#fff}
.top img{width:38px;height:38px;border-radius:50%;border:2px solid rgba(255,255,255,.85);object-fit:cover}
.top h1{font-family:var(--script);font-size:23px;line-height:1}
.top small{display:block;font-size:9px;letter-spacing:1px;text-transform:uppercase;opacity:.65}
.wrap{padding:16px}
.hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:10px}
.t1{font-family:var(--script);font-size:30px;color:var(--forest);line-height:1}
.sub{font-size:12px;color:var(--ink3);margin:-6px 0 14px;line-height:1.45}
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
 border-top:1px solid var(--line);display:flex;height:74px;z-index:60;padding-bottom:env(safe-area-inset-bottom)}
.tab{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border:none;
 background:none;font-family:var(--body);font-size:8.8px;font-weight:800;color:var(--ink3);cursor:pointer;min-width:0;overflow:hidden;white-space:nowrap}
.tab.on{color:var(--forest)}
.apercu-tel{border:1px solid var(--line);border-radius:18px;overflow:hidden;background:#F7F3EA;max-width:360px;margin:0 auto}
.at-top{display:flex;align-items:center;gap:8px;padding:9px 12px;color:#fff;font-family:'Sacramento',cursive;font-size:21px}
.at-top img{width:28px;height:28px;border-radius:50%;border:2px solid rgba(255,255,255,.8)}
.at-corps{position:relative;padding:12px;height:230px;overflow:hidden}
.at-faux{height:44px;border-radius:12px;background:#fff;border:1px solid var(--line);margin-bottom:8px;position:relative;z-index:2}
.at-faux.court{width:60%}
.couleurs{display:flex;flex-wrap:wrap;gap:8px}
.couleurs button,.perso-coul{width:34px;height:34px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 1px var(--line);cursor:pointer}
.couleurs button.on{box-shadow:0 0 0 2.5px var(--ink)}
.perso-coul{position:relative;display:flex;align-items:center;justify-content:center;background:conic-gradient(red,orange,yellow,green,blue,violet,red);color:#fff;font-weight:800;font-size:18px;overflow:hidden}
.perso-coul input{position:absolute;inset:0;opacity:0;cursor:pointer}
.emojis{display:grid;grid-template-columns:repeat(auto-fill,minmax(40px,1fr));gap:5px}
.emojis button{height:40px;border-radius:10px;border:1.5px solid var(--line);background:#fff;font-size:21px;cursor:pointer;padding:0}
.emojis button.on{border-color:var(--apple);background:var(--apple-soft)}
.th-illu{width:54px;height:54px;border-radius:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
@media (max-width: 899px){.adm.main .tabs{overflow-x:auto;scrollbar-width:none}.adm.main .tabs::-webkit-scrollbar{display:none}.adm.main .tab{flex:1 0 50px}}
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
.resa-adm.retiree,.resa-adm.absent,.resa-adm.annulee{opacity:.6;border-left-color:var(--line)}
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
`;

const Sw = ({ on, set }) => <div className={"sw" + (on ? " on" : "")} onClick={set}><i /></div>;
const Vide = ({ t, s }) => <div className="empty"><b>{t}</b>{s}</div>;

function Modal({ titre, onClose, children }) {
  return (
    <div className="mdl" onClick={onClose}>
      <div className="in" onClick={e => e.stopPropagation()}>
        <div className="hd"><h3>{titre}</h3>
          <button className="ib" onClick={onClose} style={{ fontSize: 26, color: "#93A099", lineHeight: 1 }}>×</button></div>
        {children}
      </div>
    </div>
  );
}

function PhotoField({ value, onChange, max, large }) {
  const ref = useRef();
  return (
    <>
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }}
        onChange={e => { const f = e.target.files?.[0]; if (f) lirePhoto(f, onChange, max); e.target.value = ""; }} />
      {value ? (
        <div style={{ position: "relative" }}>
          <img className="ph" src={value} alt="" />
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button className="btn gh sm" style={{ flex: 1 }} onClick={() => ref.current.click()}>Changer</button>
            <button className="btn gh sm" style={{ flex: 1, color: "var(--red)" }} onClick={() => onChange("")}>Retirer</button>
          </div>
        </div>
      ) : (
        <div className="phbox" onClick={() => ref.current.click()}>{I.cam(22)}Ajouter une photo</div>
      )}
    </>
  );
}

// ═══════════ ACCUEIL / TABLEAU DE BORD ═══════════
function Accueil({ d, set }) {
  return (
    <div className="wrap">
      <div className="t1">Bonjour Marion</div>
      <div className="sub">Tout ce que vous modifiez ici apparaît aussitôt dans l'application de vos clients.</div>

      {d.resas.some(r => r.statut === "reservee") && <div className="card" style={{ background: "#E3F1E3", borderColor: "#C5E1C5" }}>
        <div className="nm">🧺 {d.resas.filter(r => r.statut === "reservee").length} réservation(s) anti-gaspi à mettre de côté</div>
        <div className="de">À voir dans l'onglet Aujourd'hui</div>
      </div>}
      {d.conversations.some(c => c.attente) && <div className="card" style={{ background: "#FBEFE4", borderColor: "#F0D7BF" }}>
        <div className="nm">{d.conversations.filter(c => c.attente).length} message(s) de client en attente de réponse</div>
        <div className="de">À voir dans l'onglet Messages</div>
      </div>}
      {d.commandes.some(c => c.statut === "nouvelle") && <div className="card" style={{ background: "#FBEFE4", borderColor: "#F0D7BF" }}>
        <div className="nm">{d.commandes.filter(c => c.statut === "nouvelle").length} commande(s) de plateaux à accepter ou refuser</div>
        <div className="de">À voir dans l'onglet Commandes</div>
      </div>}
      <Statistiques d={d} />
      <div className="grid2" style={{ marginBottom: 10 }}>
        <div className="stat"><b>{(d.jour?.items || []).filter(i => i.active !== false).length}</b><span>articles du jour</span></div>
        <div className="stat"><b>{d.offres.filter(o => o.active !== false).length}</b><span>plateaux & paniers</span></div>
        <div className="stat"><b>{d.actus.filter(a => a.active !== false).length}</b><span>actualités</span></div>
        <div className="stat"><b>{d.clients.length}</b><span>clients fidélité</span></div>
      </div>

      <div className="card" style={{ background: (d.jour?.maj === aujourdhui() ? "#EEF3E2" : "#FDF6EE"), borderColor: (d.jour?.maj === aujourdhui() ? "#CFE0AE" : "#EFDCC6") }}>
        <div className="nm">{d.jour?.maj === aujourdhui() ? "Publication du jour faite" : "Pensez à publier le jour"}</div>
        <div className="de">{d.jour?.maj ? "Dernière mise à jour : " + d.jour.maj : "Aucune publication pour l'instant"}</div>
      </div>

      <div className="card">
        <div className="row" style={{ marginBottom: 10 }}>
          <div><div className="nm">Message d'accueil</div><div className="de">Bandeau en haut de l'application</div></div>
          <div className="rt"><Sw on={d.annonce.active} set={() => set("annonce", a => ({ ...a, active: !a.active }))} /></div>
        </div>
        <textarea className="inp" placeholder="Ex : Fermeture exceptionnelle jeudi 14 — commandes de plateaux jusqu'à mercredi soir"
          value={d.annonce.text} onChange={e => set("annonce", a => ({ ...a, text: e.target.value }))} />
        {d.annonce.active && <Pastille x={d.annonce} style={{ marginTop: 8 }} />}
        <div style={{ marginTop: 8 }}><Periode v={d.annonce} onChange={v => set("annonce", v)} /></div>
        <div style={{ display: "flex", gap: 7, marginTop: 9 }}>
          {[["apple", "#6E9B3A", "Vert"], ["terra", "#C27B42", "Orange"], ["forest", "#1C433B", "Foncé"]].map(([k, col, lab]) => (
            <button key={k} onClick={() => set("annonce", a => ({ ...a, couleur: k }))}
              style={{ flex: 1, padding: "8px 0", borderRadius: 9, cursor: "pointer", fontFamily: "var(--body)", fontSize: 11, fontWeight: 800, color: "#fff", background: col, border: d.annonce.couleur === k ? "2px solid #22302A" : "2px solid transparent" }}>{lab}</button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="nm" style={{ marginBottom: 8 }}>Onglets visibles par les clients</div>
        {[["carte", "La carte (plateaux & paniers)"], ["fidelite", "Carte de fidélité"]].map(([k, lab]) => (
          <div className="tog" key={k}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{lab}</span>
            <div className="rt"><Sw on={d.onglets?.[k] !== false} set={() => set("onglets", o => ({ ...o, [k]: o?.[k] === false }))} /></div>
          </div>
        ))}
      </div>

    </div>
  );
}

// Réservations anti-gaspi (promos, dates courtes, paniers)
function Reservations({ d }) {
  const [voirTout, setVoirTout] = useState(false);
  const liste = [...d.resas].sort((a, b) => (b.cree || 0) - (a.cree || 0));
  const aRetirer = liste.filter(r => r.statut === "reservee");
  const autres = liste.filter(r => r.statut !== "reservee").slice(0, voirTout ? 50 : 5);
  const changer = async (r, statut) => {
    try {
      const b = writeBatch(db);
      b.update(doc(db, "resas", r.id), { statut });
      // pas venu / annulé : l'article est remis en vente
      if (statut !== "retiree" && d.jour.items.some(i => String(i.id) === String(r.item))) b.update(doc(db, "jour", String(r.item)), { reserves: increment(-(r.qte || 0)) });
      await b.commit();
    } catch { alert("Modification impossible. Vérifiez la connexion."); }
  };
  if (!liste.length) return null;
  const Ligne = ({ r }) => (
    <div className={"card resa-adm " + r.statut} key={r.id}>
      <div className="row" style={{ alignItems: "flex-start" }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div className="nm">{r.qte} × {r.titre}{r.total > 0 && <span style={{ color: "var(--apple)", marginLeft: 6 }}>{euros(r.total)}</span>}</div>
          <div className="de"><b style={{ color: "var(--ink)" }}>{r.nom}</b>{r.tel && <> · <a href={"tel:" + r.tel.replace(/\s/g, "")}>{r.tel}</a></>} · {r.retrait || "retrait à l'épicerie"}</div>
          <div className="de">N° {r.numero} · réservé à {new Date(r.cree || 0).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}{r.statut !== "reservee" && " · " + ({ retiree: "✓ Retiré", absent: "Pas venu", annulee: "Annulé" }[r.statut] || r.statut)}</div>
        </div>
      </div>
      {r.statut === "reservee" && <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
        <button className="btn sm" style={{ flex: 2 }} onClick={() => changer(r, "retiree")}>✓ Retiré</button>
        <button className="btn gh sm" style={{ flex: 1 }} onClick={() => confirm("Le client n'est pas venu ? L'article sera remis en vente.") && changer(r, "absent")}>Pas venu</button>
        <button className="btn gh sm" style={{ flex: 1, color: "var(--red)" }} onClick={() => confirm("Annuler cette réservation ? L'article sera remis en vente.") && changer(r, "annulee")}>Annuler</button>
      </div>}
    </div>
  );
  return (
    <div style={{ marginBottom: 16 }}>
      <div className="nm" style={{ marginBottom: 6 }}>🧺 Réservations {aRetirer.length ? "— " + aRetirer.length + " à retirer" : ""}</div>
      {!aRetirer.length && <div className="de" style={{ marginBottom: 8 }}>Aucune réservation en attente.</div>}
      <div className="grille">{aRetirer.map(r => <Ligne r={r} key={r.id} />)}</div>
      {!!autres.length && <details style={{ marginTop: 6 }}><summary className="de" style={{ cursor: "pointer" }}>Historique récent</summary>
        <div className="grille" style={{ marginTop: 6 }}>{autres.map(r => <Ligne r={r} key={r.id} />)}</div>
        {!voirTout && <button className="btn gh sm" onClick={() => setVoirTout(true)}>Voir plus</button>}
      </details>}
    </div>
  );
}

// Champs « réservable » d'un article du jour
function ChampsResa({ v, onChange }) {
  const on = (parseInt(v.stock) || 0) > 0 || v.resaOn;
  const illimite = parseInt(v.stock) >= 999;
  return (
    <div className="choix-bloc" style={{ background: "#F3F8EC", borderColor: "#D6E6C2" }}>
      <div className="tog" style={{ borderTop: "none", paddingTop: 0 }}>
        <div><div style={{ fontSize: 13, fontWeight: 800 }}>🧺 Réservable dans l'application</div><div className="de">Les clients réservent, vous mettez de côté (façon Too Good To Go)</div></div>
        <div className="rt"><Sw on={!!on} set={() => onChange(on ? { ...v, stock: 0, resaOn: false } : { ...v, stock: "", resaOn: true, retrait: v.retrait || "aujourd'hui avant la fermeture" })} /></div>
      </div>
      {on && <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
        <div style={{ width: 110, flexShrink: 0 }}><label className="lab">Quantité dispo.</label>
          <input className="inp" type="number" inputMode="numeric" min="1" max="998" value={illimite ? "" : v.stock || ""} placeholder="Sans limite" onChange={e => onChange({ ...v, stock: e.target.value, resaOn: true })} /></div>
        <div style={{ flex: 1, minWidth: 0 }}><label className="lab">À retirer…</label>
          <input className="inp" value={v.retrait || ""} maxLength={60} placeholder="aujourd'hui entre 17h et 19h" onChange={e => onChange({ ...v, retrait: e.target.value })} /></div>
      </div>}
      {on && <div className="de" style={{ marginTop: 4 }}>Laissez la quantité vide si vous en avez beaucoup (sans limite).</div>}
      {on && (parseInt(v.reserves) || 0) > 0 && <div className="de" style={{ marginTop: 6 }}>Déjà réservés : <b>{v.reserves}</b>{illimite ? "" : " / " + v.stock}
        <button className="lienadm" style={{ display: "inline", marginLeft: 8 }} onClick={() => confirm("Remettre le compteur de réservations à 0 ?") && onChange({ ...v, reserves: 0 })}>remettre à 0</button></div>}
    </div>
  );
}
const nettoyerResa = (x) => { const st = x.resaOn && !(parseInt(x.stock) > 0) ? 999 : Math.max(0, Math.min(999, parseInt(x.stock) || 0)); const { resaOn, ...r } = x; return { ...r, stock: st, reserves: Math.min(st, parseInt(x.reserves) || 0), retrait: st ? (x.retrait || "").trim().slice(0, 60) : "" }; };

// ═══════════ FEUILLE DE PRÉPARATION (impression) ═══════════
const esc = (t) => String(t == null ? "" : t).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m]));
function imprimerPreparation(d, jour) {
  const cmds = d.commandes.filter(c => (dateRetrait(c) || "") === jour && !["refusee", "annulee", "remise"].includes(c.statut))
    .sort((a, b) => (a.heure || "99").localeCompare(b.heure || "99"));
  const resas = d.resas.filter(r => r.statut === "reservee");
  const recap = {};
  cmds.forEach(c => (c.lignes || []).forEach(l => { const k = l.nom.split(" — ")[0]; recap[k] = (recap[k] || 0) + (l.personnes || 0); }));
  const titre = new Date(jour + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const bloc = (c) => {
    const lignes = (c.remarque || "").split("\n").filter(Boolean);
    return `<div class="c"><div class="h"><span class="box"></span><b>${esc(c.heure ? heureFr(c.heure) : "—")}</b> · ${esc(c.nom)} · ${esc(c.tel)}
      <span class="st">${c.statut === "nouvelle" ? "⚠ À VALIDER" : esc(MODES[c.mode] || c.mode)}</span></div>
      ${c.adresse ? `<div class="ad">📍 ${esc(c.adresse)}</div>` : ""}
      <ul>${(c.lignes || []).map(l => `<li><b>${esc(l.personnes)} pers.</b> — ${esc(l.nom)}</li>`).join("")}</ul>
      ${lignes.map(l => l.startsWith("⚠️") ? `<div class="al">${esc(l)}</div>` : `<div class="rq">« ${esc(l)} »</div>`).join("")}
      <div class="t">N° ${esc(c.numero)} · ${euros(c.total)}</div></div>`;
  };
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Préparation du ${esc(titre)}</title><style>
    body{font-family:Arial,sans-serif;color:#222;margin:24px;font-size:13px}h1{font-size:22px;margin:0 0 4px}h2{font-size:16px;margin:22px 0 8px;border-bottom:2px solid #1C433B;padding-bottom:4px}
    .sub{color:#666;margin-bottom:10px}.c{border:1px solid #bbb;border-radius:8px;padding:10px 12px;margin-bottom:10px;page-break-inside:avoid}
    .h{font-size:14px}.box{display:inline-block;width:14px;height:14px;border:2px solid #222;border-radius:3px;vertical-align:-2px;margin-right:6px}
    .st{float:right;font-weight:bold;color:#1C433B}.ad{color:#555;margin-top:4px}ul{margin:6px 0 4px 18px;padding:0}li{margin:2px 0}
    .al{font-weight:bold;color:#a00;border:1px solid #a00;border-radius:5px;padding:4px 7px;margin:5px 0}.rq{font-style:italic;color:#444}.t{color:#666;font-size:11.5px;margin-top:4px}
    table{border-collapse:collapse}td{padding:3px 12px 3px 0}.vide{color:#888;font-style:italic}@media print{button{display:none}}
  </style></head><body>
  <button onclick="print()" style="float:right;padding:8px 16px;font-size:14px">🖨️ Imprimer</button>
  <h1>Préparation — ${esc(titre)}</h1><div class="sub">${esc(d.store.name)} · éditée le ${new Date().toLocaleString("fr-FR")}</div>
  <h2>Plateaux (${cmds.length} commande${cmds.length > 1 ? "s" : ""})</h2>
  ${Object.keys(recap).length ? `<table>${Object.entries(recap).map(([k, n]) => `<tr><td><b>${esc(k)}</b></td><td>${n} personnes au total</td></tr>`).join("")}</table><br>` : ""}
  ${cmds.length ? cmds.map(bloc).join("") : `<p class="vide">Aucun plateau à préparer ce jour-là.</p>`}
  <h2>Réservations anti-gaspi à mettre de côté (${resas.length})</h2>
  ${resas.length ? resas.map(r => `<div class="c"><span class="box"></span><b>${esc(r.qte)} × ${esc(r.titre)}</b> — ${esc(r.nom)} ${esc(r.tel)} · à retirer ${esc(r.retrait || "à l'épicerie")} <span class="st">${esc(r.numero)}</span></div>`).join("") : `<p class="vide">Aucune réservation en attente.</p>`}
  </body></html>`;
  const w = window.open("", "_blank");
  if (!w) return alert("La fenêtre a été bloquée : autorisez les fenêtres (pop-up) pour ce site.");
  w.document.open(); w.document.write(html); w.document.close();
}
function BoutonPreparation({ d }) {
  const [jour, setJour] = useState(aujourdISO());
  const demain = (() => { const x = new Date(); x.setDate(x.getDate() + 1); return x.toLocaleDateString("sv-SE"); })();
  return (
    <div className="card prepa">
      <div className="nm" style={{ marginBottom: 6 }}>🖨️ Feuille de préparation</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <button className={"btn sm " + (jour === aujourdISO() ? "" : "gh")} onClick={() => setJour(aujourdISO())}>Aujourd'hui</button>
        <button className={"btn sm " + (jour === demain ? "" : "gh")} onClick={() => setJour(demain)}>Demain</button>
        <input className="inp" type="date" value={jour} onChange={e => setJour(e.target.value || aujourdISO())} style={{ width: "auto", flex: "1 1 140px", padding: "8px 10px" }} />
        <button className="btn terra sm" onClick={() => imprimerPreparation(d, jour)}>Ouvrir / imprimer</button>
      </div>
    </div>
  );
}

// ═══════════ TABLEAU DE BORD ═══════════
const moisCle = (ms) => { const x = new Date(ms); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0"); };
function Statistiques({ d }) {
  const valides = d.commandes.filter(c => !["refusee", "annulee"].includes(c.statut));
  const maintenant = new Date();
  const mois = Array.from({ length: 6 }, (_, i) => { const x = new Date(maintenant.getFullYear(), maintenant.getMonth() - 5 + i, 1); return { cle: moisCle(x), nom: x.toLocaleDateString("fr-FR", { month: "short" }) }; });
  const parMois = Object.fromEntries(mois.map(m => [m.cle, { n: 0, ca: 0, r: 0 }]));
  valides.forEach(c => { const k = moisCle(c.cree || 0); if (parMois[k]) { parMois[k].n++; parMois[k].ca += Number(c.total) || 0; } });
  d.resas.filter(r => !["annulee", "absent"].includes(r.statut)).forEach(r => { const k = moisCle(r.cree || 0); if (parMois[k]) parMois[k].r++; });
  const ce = parMois[mois[5].cle], avant = parMois[mois[4].cle];
  const maxCa = Math.max(1, ...mois.map(m => parMois[m.cle].ca));
  const top = {};
  valides.filter(c => (c.cree || 0) > Date.now() - 90 * 864e5).forEach(c => (c.lignes || []).forEach(l => { const k = l.nom.split(" — ")[0]; top[k] = (top[k] || 0) + 1; }));
  const tops = Object.entries(top).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const clientsCmd = new Set(d.commandes.map(c => (c.tel || "").replace(/\D/g, "")).filter(Boolean)).size;
  const evol = (a, b) => b ? (a >= b ? "▲ " : "▼ ") + Math.abs(Math.round((a - b) / b * 100)) + " %" : "";
  return (
    <div className="card stats">
      <div className="nm" style={{ marginBottom: 10 }}>📊 Ce mois-ci</div>
      <div className="grid2" style={{ marginBottom: 12 }}>
        <div className="stat"><b>{ce.n}</b><span>commandes de plateaux <i>{evol(ce.n, avant.n)}</i></span></div>
        <div className="stat"><b>{euros(ce.ca).replace(",00", "")}</b><span>de plateaux <i>{evol(ce.ca, avant.ca)}</i></span></div>
        <div className="stat"><b>{ce.r}</b><span>réservations anti-gaspi</span></div>
        <div className="stat"><b>{d.conversations.filter(c => (c.maj || 0) > Date.now() - 30 * 864e5).length}</b><span>conversations (30 j)</span></div>
      </div>
      <div className="de" style={{ marginBottom: 4 }}>Plateaux commandés sur 6 mois (€)</div>
      <div className="barres">
        {mois.map(m => { const v = parMois[m.cle]; return (
          <div className="bcol" key={m.cle} title={v.n + " commande(s) · " + euros(v.ca)}>
            <span className="bv">{v.ca ? Math.round(v.ca) : ""}</span>
            <i style={{ height: Math.max(3, v.ca / maxCa * 90) + "px" }} />
            <span className="bm">{m.nom}</span>
          </div>); })}
      </div>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 12 }}>
        <div style={{ flex: "1 1 200px" }}><div className="de" style={{ fontWeight: 800 }}>Plateaux les plus demandés (3 mois)</div>
          {tops.length ? tops.map(([k, n], i) => <div key={k} className="de" style={{ color: "var(--ink)" }}>{["🥇", "🥈", "🥉"][i]} {k} — {n} fois</div>) : <div className="de">Pas encore de commande.</div>}</div>
        <div style={{ flex: "1 1 200px" }}><div className="de" style={{ fontWeight: 800 }}>Vos clients dans l'appli</div>
          <div className="de" style={{ color: "var(--ink)" }}>{clientsCmd} ont déjà commandé · {d.conversations.length} vous ont écrit · {d.clients.length} carte{d.clients.length > 1 ? "s" : ""} fidélité</div></div>
      </div>
    </div>
  );
}

// ═══════════ FERMETURES EXCEPTIONNELLES ═══════════
function Fermetures({ d, set }) {
  const l = Array.isArray(d.fermetures) ? d.fermetures : [];
  const [f, setF] = useState({ du: "", au: "", motif: "" });
  const auj = aujourdISO();
  const ajouter = () => { if (!f.du) return; set("fermetures", x => [...(Array.isArray(x) ? x : []), { du: f.du, au: f.au && f.au >= f.du ? f.au : f.du, motif: f.motif.trim().slice(0, 40) }].sort((a, b) => a.du.localeCompare(b.du))); setF({ du: "", au: "", motif: "" }); };
  return (
    <>
      <div style={{ fontWeight: 800, fontSize: 14, margin: "18px 0 4px" }}>Fermetures exceptionnelles</div>
      <div className="sub" style={{ margin: "0 0 8px" }}>Congés, jours fériés… Saisissez-les une fois : l'application affiche un bandeau 14 jours avant, indique « Fermé » et bloque les commandes ces jours-là.</div>
      <div className="card">
        {l.filter(x => (x.au || x.du) >= auj).map((x, i) => (
          <div className="tog" key={x.du + i}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{x.du === x.au ? "Le " + dateLongue(x.du) : "Du " + dateLongue(x.du) + " au " + dateLongue(x.au)}{x.motif ? " · " + x.motif : ""}
              {x.du <= auj && <span className="pill promo" style={{ marginLeft: 6 }}>En cours</span>}</span>
            <div className="rt"><button className="ib" onClick={() => set("fermetures", y => (y || []).filter(z => !(z.du === x.du && z.au === x.au && z.motif === x.motif)))}>{I.bin()}</button></div>
          </div>
        ))}
        {!l.some(x => (x.au || x.du) >= auj) && <div className="de" style={{ marginBottom: 8 }}>Aucune fermeture prévue.</div>}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
          <div style={{ flex: "1 1 130px" }}><label className="lab">Du</label><input className="inp" type="date" min={auj} value={f.du} onChange={e => setF({ ...f, du: e.target.value })} /></div>
          <div style={{ flex: "1 1 130px" }}><label className="lab">Au (facultatif)</label><input className="inp" type="date" min={f.du || auj} value={f.au} onChange={e => setF({ ...f, au: e.target.value })} /></div>
          <div style={{ flex: "2 1 180px" }}><label className="lab">Motif (facultatif)</label><input className="inp" value={f.motif} maxLength={40} placeholder="Congés d'été, 11 novembre…" onChange={e => setF({ ...f, motif: e.target.value })} /></div>
        </div>
        <button className="btn sm" style={{ marginTop: 8 }} disabled={!f.du} onClick={ajouter}>Ajouter la fermeture</button>
      </div>
    </>
  );
}

// ═══════════ AUJOURD'HUI ═══════════
function Jour({ d, set }) {
  const [titre, setTitre] = useState("");
  const [prix, setPrix] = useState("");
  const [unite, setUnite] = useState("");
  const [type, setType] = useState("frais");
  const [ancien, setAncien] = useState("");
  const [per, setPer] = useState({ debut: "", fin: "" });
  const [dates, setDates] = useState(false);
  const [m, setM] = useState(null);
  const [resa, setResa] = useState({ stock: 0, retrait: "" });
  const items = d.jour?.items || [];
  const estPromo = (t) => t === "promo" || t === "gaspi" || t === "panier";

  const majJour = (fn) => set("jour", j => ({ items: fn(j?.items || []), maj: aujourdhui() }));

  const ajouter = () => {
    if (!titre.trim()) return;
    majJour(l => [nettoyerResa({ id: uid(), titre: titre.trim(), prix, unite, type, note: "", photo: "", active: true,
      ancienPrix: estPromo(type) ? ancien : "", debut: per.debut, fin: per.fin, ...resa, reserves: 0 }), ...l]);
    setTitre(""); setPrix(""); setUnite(""); setAncien(""); setPer({ debut: "", fin: "" }); setDates(false); setResa({ stock: 0, retrait: "" });
  };
  const sauver = () => {
    if (!m.titre?.trim()) return;
    majJour(l => l.map(i => i.id === m.id ? nettoyerResa(m) : i));
    setM(null);
  };

  return (
    <div className="wrap">
      <div className="t1">Aujourd'hui</div>
      <div className="sub">Le cœur de l'application : ce qui change chaque jour. Un titre, un prix, c'est publié. Comptez 20 secondes.</div>
      <Reservations d={d} />

      <div className="card" style={{ background: "#FBF8F1" }}>
        <label className="lab">Quoi de neuf ?</label>
        <input className="inp" value={titre} onChange={e => setTitre(e.target.value)}
          onKeyDown={e => e.key === "Enter" && ajouter()} placeholder="Fraises de Bergerac, lasagnes maison…" />
        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <input className="inp" style={{ flex: 1 }} type="number" inputMode="decimal" step="0.01"
            value={prix} onChange={e => setPrix(e.target.value)} placeholder="Prix (facultatif)" />
          <input className="inp" style={{ width: 108 }} value={unite} onChange={e => setUnite(e.target.value)} placeholder="kg, part…" />
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 9, flexWrap: "wrap" }}>
          {TYPES.map(t => (
            <button key={t.id} onClick={() => setType(t.id)}
              style={{ flex: "1 1 40%", padding: "9px 6px", borderRadius: 9, cursor: "pointer", fontFamily: "var(--body)",
                fontSize: 11.5, fontWeight: 800, color: type === t.id ? "#fff" : t.c,
                background: type === t.id ? t.c : "#fff", border: "1.5px solid " + t.c }}>{t.label}</button>
          ))}
        </div>
        {estPromo(type) && <div style={{ marginTop: 9 }}><label className="lab">Prix avant (barré)</label>
          <input className="inp" type="number" inputMode="decimal" step="0.01" value={ancien} onChange={e => setAncien(e.target.value)} placeholder="Facultatif" /></div>}
        {estPromo(type) && <ChampsResa v={resa} onChange={setResa} />}
        {type === "panier" && !titre && <div className="de" style={{ marginTop: 4 }}>Ex : « Panier surprise fruits & légumes », prix 5 €, prix avant 15 € (valeur).</div>}
        {dates || estPromo(type) ? <div style={{ marginTop: 9 }}><Periode v={per} onChange={setPer} /></div>
          : <button onClick={() => setDates(true)} style={{ marginTop: 9, border: "none", background: "none", color: "var(--apple)", fontFamily: "var(--body)", fontSize: 12, fontWeight: 800, cursor: "pointer", padding: 0 }}>+ Programmer des dates de parution</button>}
        <button className="btn" style={{ marginTop: 10 }} disabled={!titre.trim()} onClick={ajouter}>{I.plus()}Publier</button>
      </div>

      {!items.length && <Vide t="Rien pour aujourd'hui" s="Ajoutez au moins un article : c'est ce que vos clients regardent en ouvrant l'application." />}

      <div className="grille">
      {items.map(i => {
        const t = TYPES.find(x => x.id === i.type) || TYPES[0];
        return (
          <div className="card" key={i.id}><div className="row">
            {i.photo ? <img className="thumb" src={i.photo} alt="" /> :
              <div style={{ width: 6, alignSelf: "stretch", borderRadius: 4, background: t.c, flexShrink: 0 }} />}
            <div style={{ minWidth: 0 }}>
              <div className="nm">{i.titre}</div>
              <div className="de" style={{ color: t.c, fontWeight: 700 }}>{t.label}{i.prix !== "" && i.prix != null ? " · " + Number(i.prix).toFixed(2) + " €" + (i.unite ? " / " + i.unite : "") : ""}
                {!!i.ancienPrix && <span style={{ textDecoration: "line-through", color: "var(--ink3)", fontWeight: 600, marginLeft: 6 }}>{Number(i.ancienPrix).toFixed(2)} €</span>}</div>
              {i.note && <div className="de">{i.note}</div>}
              {(parseInt(i.stock) || 0) > 0 && <div className="de" style={{ fontWeight: 800, color: "#2E7D32" }}>🧺 Réservable · {parseInt(i.reserves) || 0}{parseInt(i.stock) >= 999 ? "" : " / " + i.stock} réservé{(parseInt(i.reserves) || 0) > 1 ? "s" : ""}{parseInt(i.stock) < 999 && (parseInt(i.reserves) || 0) >= parseInt(i.stock) ? " · ÉPUISÉ" : ""}</div>}
              <Pastille x={i} style={{ marginTop: 5 }} />
            </div>
            <div className="rt">
              <Sw on={i.active !== false} set={() => majJour(l => l.map(x => x.id === i.id ? { ...x, active: x.active === false } : x))} />
              <button className="ib" onClick={() => setM(i)}>{I.pen()}</button>
              <button className="ib" onClick={() => majJour(l => l.filter(x => x.id !== i.id))}>{I.bin()}</button>
            </div>
          </div></div>
        );
      })}
      </div>

      {!!items.length && <button className="btn gh" style={{ marginTop: 6, color: "var(--red)" }}
        onClick={() => confirm("Vider la liste du jour ?") && majJour(() => [])}>Vider la liste du jour</button>}

      {m && <Modal titre="Modifier l'article" onClose={() => setM(null)}>
        <PhotoField value={m.photo} onChange={v => setM({ ...m, photo: v })} />
        <label className="lab">Titre</label>
        <input className="inp" autoFocus value={m.titre} onChange={e => setM({ ...m, titre: e.target.value })} />
        <label className="lab">Précision (facultatif)</label>
        <input className="inp" value={m.note} onChange={e => setM({ ...m, note: e.target.value })} placeholder={m.type === "panier" ? "Contenu : fruits, légumes, laitages du jour…" : "Dernier jour, quantité limitée…"} />
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}><label className="lab">Prix (€)</label>
            <input className="inp" type="number" inputMode="decimal" step="0.01" value={m.prix} onChange={e => setM({ ...m, prix: e.target.value })} /></div>
          <div style={{ flex: 1 }}><label className="lab">Unité</label>
            <input className="inp" value={m.unite} onChange={e => setM({ ...m, unite: e.target.value })} /></div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}><label className="lab">Prix avant (barré)</label>
            <input className="inp" type="number" inputMode="decimal" step="0.01" value={m.ancienPrix || ""} onChange={e => setM({ ...m, ancienPrix: e.target.value })} placeholder="Facultatif" /></div>
        </div>
        <Periode v={m} onChange={setM} />
        {estPromo(m.type) && <ChampsResa v={m} onChange={setM} />}
        <label className="lab">Catégorie</label>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {TYPES.map(t => (
            <button key={t.id} onClick={() => setM({ ...m, type: t.id })}
              style={{ flex: "1 1 40%", padding: "9px 6px", borderRadius: 9, cursor: "pointer", fontFamily: "var(--body)",
                fontSize: 11.5, fontWeight: 800, color: m.type === t.id ? "#fff" : t.c,
                background: m.type === t.id ? t.c : "#fff", border: "1.5px solid " + t.c }}>{t.label}</button>
          ))}
        </div>
        <button className="btn" style={{ marginTop: 14 }} onClick={sauver}>Enregistrer</button>
      </Modal>}
    </div>
  );
}

// ═══════════ OFFRES : paniers, plateaux ═══════════
function Offres({ d, set }) {
  const [m, setM] = useState(null);
  const sauver = () => {
    if (!m.titre?.trim()) return;
    set("offres", l => m.id ? l.map(o => o.id === m.id ? m : o) : [...l, { ...m, id: uid() }]);
    setM(null);
  };
  return (
    <div className="wrap">
      <div className="t1">Paniers & plateaux</div>
      <div className="sub">Vos plateaux, paniers garnis et corbeilles de fruits, avec photo et prix. Regroupez-les par type.</div>
      <button className="btn terra" onClick={() => setM({ titre: "", desc: "", prix: "", portions: "", type: "Plateaux", badge: "", photo: "", active: true })}>{I.plus()}Nouvelle offre</button>
      <div style={{ height: 12 }} />
      {!d.offres.length && <Vide t="Aucune offre" s="Ajoutez par exemple « Plateau apéritif 4-6 personnes » avec sa photo : c'est ce que vos clients regardent en premier." />}
      <div className="grille">
      {d.offres.map(o => (
        <div className="card" key={o.id}><div className="row">
          {o.photo ? <img className="thumb" src={o.photo} alt="" /> : <div className="thumb" />}
          <div style={{ minWidth: 0 }}>
            <div className="nm">{o.titre}</div>
            <div className="de">{o.type}{o.portions ? " · " + o.portions : ""}</div>
            <div style={{ marginTop: 5 }}>
              <Pastille x={o} fem />
              <span style={{ fontSize: 13, fontWeight: 800, color: "var(--apple)", marginLeft: 6 }}>{o.prix ? Number(o.prix).toFixed(2) + " €" : "Sur devis"}</span>
            </div>
          </div>
          <div className="rt">
            <button className="ib" onClick={() => setM(o)}>{I.pen()}</button>
            <button className="ib" onClick={() => confirm("Supprimer « " + o.titre + " » ?") && set("offres", l => l.filter(x => x.id !== o.id))}>{I.bin()}</button>
          </div>
        </div></div>
      ))}
      </div>
      {m && <Modal titre={m.id ? "Modifier l'offre" : "Nouvelle offre"} onClose={() => setM(null)}>
        <PhotoField value={m.photo} onChange={v => setM({ ...m, photo: v })} />
        <label className="lab">Titre</label>
        <input className="inp" autoFocus value={m.titre} onChange={e => setM({ ...m, titre: e.target.value })} placeholder="Plateau charcuterie & fromages" />
        <label className="lab">Composition</label>
        <textarea className="inp" value={m.desc} onChange={e => setM({ ...m, desc: e.target.value })} placeholder="Comté, morbier, saucisson, jambon sec, raisins…" />
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}><label className="lab">Prix (€)</label>
            <input className="inp" type="number" inputMode="decimal" step="0.01" value={m.prix} onChange={e => setM({ ...m, prix: e.target.value })} placeholder="Laisser vide = sur devis" /></div>
          <div style={{ flex: 1 }}><label className="lab">Pour</label>
            <input className="inp" value={m.portions} onChange={e => setM({ ...m, portions: e.target.value })} placeholder="4-6 pers." /></div>
        </div>
        <label className="lab">Type (sert de titre de section)</label>
        <input className="inp" value={m.type} onChange={e => setM({ ...m, type: e.target.value })} placeholder="Plateaux / Paniers garnis / Corbeilles" />
        <label className="lab">Pastille (facultatif)</label>
        <input className="inp" value={m.badge} onChange={e => setM({ ...m, badge: e.target.value })} placeholder="Nouveau, Fêtes…" />
        <Periode v={m} onChange={setM} />
        <div className="tog" style={{ marginTop: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Visible par les clients</span>
          <div className="rt"><Sw on={m.active !== false} set={() => setM({ ...m, active: m.active === false })} /></div>
        </div>
        <button className="btn" style={{ marginTop: 12 }} onClick={sauver}>Enregistrer</button>
      </Modal>}
    </div>
  );
}

// ═══════════ COMMANDES DE PLATEAUX ═══════════
const STATUTS = [
  { id: "nouvelle", label: "À valider", c: "#C27B42", bg: "#FBEFE4" },
  { id: "acceptee", label: "Acceptée", c: "#4C6B27", bg: "#EEF3E2" },
  { id: "prep", label: "En préparation", c: "#B08A2E", bg: "#FAF2DC" },
  { id: "prete", label: "Prête", c: "#6E9B3A", bg: "#EEF3E2" },
  { id: "remise", label: "Remise au client", c: "#1C433B", bg: "#E4EDE9" },
  { id: "refusee", label: "Refusée", c: "#B2563F", bg: "#F7E4DF" },
  { id: "annulee", label: "Annulée", c: "#93A099", bg: "#F0EEE8" },
];
const SUIVANT = { acceptee: ["prep", "Commencer la préparation"], prep: ["prete", "Marquer prête (le client est prévenu)"], prete: ["remise", "Marquer remise au client"] };
const enCoursCmd = (c) => !["remise", "annulee", "refusee"].includes(c.statut);
const MOTIFS = ["Complet ce jour-là", "Délai trop court", "Produits indisponibles", "Épicerie fermée ce jour-là"];

// Accepter (avec l'heure de retrait) ou refuser (avec un motif) : le client est prévenu dans son application
function Decision({ c, type, d, onClose, onValider }) {
  const cfg = cmdCfg(d.cmd);
  const [date, setDate] = useState(dateRetrait(c));
  const [heure, setHeure] = useState(c.heure || cfg.heureDefaut || "17:00");
  const [msg, setMsg] = useState(c.message || "");
  const liv = c.mode === "livraison";
  if (type === "refus") return (
    <Modal titre="Refuser la commande" onClose={onClose}>
      <div className="de" style={{ marginBottom: 10 }}>{c.nom} sera prévenu dans l'application. Indiquez-lui pourquoi :</div>
      <div className="motifs">{MOTIFS.map(m => <button key={m} className={msg === m ? "on" : ""} onClick={() => setMsg(m)}>{m}</button>)}</div>
      <label className="lab" style={{ marginTop: 10 }}>Message au client</label>
      <textarea className="inp" value={msg} onChange={e => setMsg(e.target.value)} maxLength={300} placeholder="Ex : Désolée, nous sommes complets samedi. Appelez-nous pour une autre date !" />
      <button className="btn" style={{ marginTop: 12, background: "var(--red)" }} onClick={() => onValider({ statut: "refusee", message: msg.trim(), decision: Date.now() })}>Refuser et prévenir le client</button>
    </Modal>
  );
  return (
    <Modal titre={c.statut === "nouvelle" ? "Accepter la commande" : "Modifier le rendez-vous"} onClose={onClose}>
      <div className="de" style={{ marginBottom: 10 }}>Choisissez {liv ? "l'heure de livraison" : "l'heure à laquelle " + c.nom.split(" ")[0] + " peut venir la chercher"}. Il sera prévenu dans l'application et pourra mettre un rappel.</div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}><label className="lab">{liv ? "Livraison le" : "Retrait le"}</label>
          <input className="inp" type="date" value={date} onChange={e => setDate(e.target.value || dateRetrait(c))} /></div>
        <div style={{ flex: 1, minWidth: 0 }}><label className="lab">À</label>
          <input className="inp" type="time" step="900" value={heure} onChange={e => setHeure(e.target.value)} /></div>
      </div>
      {date !== c.date && <div className="cmd-alerte">Le client avait demandé le {dateLongue(c.date)}. Pensez à le lui préciser dans le message.</div>}
      <div className="motifs" style={{ marginTop: 10 }}>{["08:00", "10:00", "12:00", "16:00", "17:00", "18:00"].map(h => <button key={h} className={heure === h ? "on" : ""} onClick={() => setHeure(h)}>{heureFr(h)}</button>)}</div>
      <label className="lab" style={{ marginTop: 10 }}>Petit mot au client (facultatif)</label>
      <textarea className="inp" value={msg} onChange={e => setMsg(e.target.value)} maxLength={300} placeholder="Ex : Merci ! Votre plateau sera prêt, à samedi." />
      <button className="btn" style={{ marginTop: 12 }} disabled={!heure || !date}
        onClick={() => onValider({ statut: c.statut === "nouvelle" ? "acceptee" : c.statut, dateRetrait: date, heure, message: msg.trim(), decision: c.decision || Date.now() })}>
        {c.statut === "nouvelle" ? "Accepter — " + dateLongue(date) + " à " + heureFr(heure) : "Enregistrer"}</button>
    </Modal>
  );
}
const ecart = (iso) => Math.round((new Date(iso + "T12:00") - new Date(aujourdISO() + "T12:00")) / 864e5);
const quand = (iso) => { const n = ecart(iso); return n === 0 ? "aujourd'hui" : n === 1 ? "demain" : n < 0 ? "en retard de " + (-n) + " j" : "dans " + n + " jours"; };

function Commandes({ d, set }) {
  const [vue, setVue] = useState("cmd");
  const nouvelles = d.commandes.filter(c => c.statut === "nouvelle").length;
  return (
    <div className="wrap">
      <div className="t1">Commandes</div>
      <div className="sub">Les plateaux commandés par vos clients depuis l'application.</div>
      <div className="seg">
        <button className={vue === "cmd" ? "on" : ""} onClick={() => setVue("cmd")}>Commandes{nouvelles ? " (" + nouvelles + ")" : ""}</button>
        <button className={vue === "plateaux" ? "on" : ""} onClick={() => setVue("plateaux")}>Plateaux</button>
        <button className={vue === "regl" ? "on" : ""} onClick={() => setVue("regl")}>Calendrier</button>
      </div>
      {vue === "cmd" && <ListeCommandes d={d} set={set} />}
      {vue === "plateaux" && <Plateaux d={d} set={set} />}
      {vue === "regl" && <ReglagesCmd d={d} set={set} />}
    </div>
  );
}

function ListeCommandes({ d, set }) {
  const [filtre, setFiltre] = useState("encours");
  const [dec, setDec] = useState(null);   // { c, type: "ok" | "refus" }
  const cle = (c) => (c.statut === "nouvelle" ? "0" : "1") + (dateRetrait(c) || "") + (c.heure || "");
  const liste = d.commandes.filter(c => filtre === "encours" ? enCoursCmd(c) : !enCoursCmd(c))
    .sort((a, b) => filtre === "encours" ? cle(a).localeCompare(cle(b)) || (a.cree || 0) - (b.cree || 0) : (dateRetrait(b) || "").localeCompare(dateRetrait(a) || ""));
  const maj = (c, v) => set("commandes", l => l.map(x => x.id === c.id ? { ...x, ...v } : x));
  const statut = (c, s) => set("commandes", l => l.map(x => x.id === c.id ? { ...x, statut: s } : x));
  const limite = (() => { const x = new Date(); x.setFullYear(x.getFullYear() - 1); return x.toLocaleDateString("sv-SE"); })();
  const vieilles = d.commandes.filter(c => !enCoursCmd(c) && (dateRetrait(c) || "") < limite);
  return (
    <>
      <BoutonPreparation d={d} />
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {[["encours", "À préparer (" + d.commandes.filter(enCoursCmd).length + ")"], ["terminees", "Terminées"]].map(([k, l]) => (
          <button key={k} className={"btn sm " + (filtre === k ? "" : "gh")} style={{ flex: 1 }} onClick={() => setFiltre(k)}>{l}</button>
        ))}
      </div>
      {!liste.length && <Vide t={filtre === "encours" ? "Aucune commande à préparer" : "Aucune commande terminée"}
        s={filtre === "encours" ? "Les commandes passées par vos clients apparaîtront ici, triées par date de retrait." : ""} />}
      <div className="grille">
      {liste.map(c => {
        const st = STATUTS.find(s => s.id === c.statut) || STATUTS[0];
        const recalc = (c.lignes || []).reduce((s, l) => { const p = d.plateaux.find(x => String(x.id) === String(l.id)); return s + (p ? l.personnes * prixAvecChoix(p, l.choix || []) : l.montant); }, 0);
        return (
          <div className="card cmd" key={c.id} style={{ borderLeft: "4px solid " + st.c }}>
            <div className="row" style={{ alignItems: "flex-start" }}>
              <div style={{ minWidth: 0 }}>
                <div className="nm" style={{ fontSize: 15 }}>{dateLongue(dateRetrait(c))}{c.heure && " à " + heureFr(c.heure)}</div>
                <div className="de" style={{ fontWeight: 800, color: ecart(dateRetrait(c)) < 0 && enCoursCmd(c) ? "var(--red)" : "var(--ink2)" }}>
                  {MODES[c.mode] || c.mode} · {quand(dateRetrait(c))}{c.statut === "nouvelle" && " · demandée par le client"}</div>
              </div>
              <span className="pill" style={{ marginLeft: "auto", background: st.bg, color: st.c, whiteSpace: "nowrap" }}>{st.label}</span>
            </div>
            <div className="cmd-cli">
              <b>{c.nom}</b>{c.carte && <span className="de"> · carte {c.carte}</span>}<br />
              <a href={"tel:" + (c.tel || "").replace(/\s/g, "")}>{c.tel}</a>
              {c.adresse && <div className="de" style={{ marginTop: 3 }}>📍 {c.adresse}</div>}
            </div>
            <div className="cmd-lignes">
              {(c.lignes || []).map((l, i) => <div key={i}><span>{l.nom} — <b>{l.personnes} pers.</b> × {euros(l.prixPersonne)}</span><b>{euros(l.montant)}</b></div>)}
              <div className="tot"><span>Total</span><b>{euros(c.total)}</b></div>
            </div>
            {Math.abs(recalc - c.total) > 0.01 && <div className="cmd-alerte">Attention : avec vos prix actuels, cette commande ferait {euros(recalc)}. Vérifiez avant de l'encaisser.</div>}
            {(c.remarque || "").split("\n").filter(Boolean).map((l, i) => l.startsWith("⚠️")
              ? <div key={i} className="cmd-allerg">{l}</div>
              : <div key={i} className="cmd-rq">« {l} »</div>)}
            {c.message && c.statut !== "nouvelle" && <div className="cmd-rq" style={{ fontStyle: "normal" }}>Votre message : « {c.message} »</div>}
            <div className="de" style={{ marginTop: 6 }}>N° {c.numero} · reçue le {c.cree ? new Date(c.cree).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—"}</div>
            {c.statut === "nouvelle" && <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="btn" style={{ flex: 2 }} onClick={() => setDec({ c, type: "ok" })}>✓ Accepter</button>
              <button className="btn gh" style={{ flex: 1, color: "var(--red)", borderColor: "#EBC9C2" }} onClick={() => setDec({ c, type: "refus" })}>Refuser</button>
            </div>}
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              {SUIVANT[c.statut] && <button className="btn sm" style={{ flex: 2 }} onClick={() => statut(c, SUIVANT[c.statut][0])}>{SUIVANT[c.statut][1]}</button>}
              {["acceptee", "prep", "prete"].includes(c.statut) && <button className="btn gh sm" onClick={() => setDec({ c, type: "ok" })}>Changer l'heure</button>}
              <select className="inp sel" value={c.statut} onChange={e => statut(c, e.target.value)} aria-label="Changer le statut">
                {STATUTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <button className="ib" onClick={() => confirm("Supprimer définitivement la commande de " + c.nom + " ?") && set("commandes", l => l.filter(x => x.id !== c.id))}>{I.bin()}</button>
            </div>
          </div>
        );
      })}
      </div>
      {dec && <Decision c={dec.c} type={dec.type} d={d} onClose={() => setDec(null)} onValider={(v) => { maj(dec.c, v); setDec(null); }} />}
      {filtre === "terminees" && !!vieilles.length && (
        <button className="btn gh" style={{ marginTop: 10, color: "var(--red)" }}
          onClick={() => confirm("Supprimer les " + vieilles.length + " commande(s) terminée(s) depuis plus d'un an ?") && set("commandes", l => l.filter(c => !vieilles.some(v => v.id === c.id)))}>
          Supprimer les commandes de plus d'un an ({vieilles.length})</button>
      )}
      {filtre === "terminees" && <div className="de" style={{ marginTop: 8 }}>Données personnelles (RGPD) : les commandes sont gardées 1 an après leur date, puis à supprimer avec ce bouton.</div>}
    </>
  );
}

function Plateaux({ d, set }) {
  const [m, setM] = useState(null);
  const sauver = () => {
    if (!m.nom?.trim() || !(prixPers(m) > 0)) return alert("Indiquez au moins le nom et le prix par personne.");
    const [mn] = bornes(m);
    const v = { ...m, nom: m.nom.trim(), prixPersonne: String(m.prixPersonne).replace(",", "."), partsMin: String(mn), partsMax: m.partsMax ? String(Math.max(mn, parseInt(m.partsMax) || mn)) : "" };
    set("plateaux", l => m.id ? l.map(o => o.id === m.id ? v : o) : [...l, { ...v, id: uid() }]);
    setM(null);
  };
  const [mn, mx] = m ? bornes(m) : [0, 0];
  return (
    <>
      <button className="btn terra" onClick={() => setM({ nom: "", composition: "", prixPersonne: "", partsMin: "4", partsMax: "", photo: "", active: true })}>{I.plus()}Nouveau plateau</button>
      <div style={{ height: 12 }} />
      {!d.plateaux.length && <Vide t="Aucun plateau" s="Créez par exemple « Plateau charcuterie » à 8,50 € par personne, à partir de 4 personnes. Vos clients pourront le commander directement." />}
      <div className="grille">
      {d.plateaux.map(p => {
        const [a, b] = bornes(p);
        return (
          <div className="card" key={p.id}><div className="row">
            {p.photo ? <img className="thumb" src={p.photo} alt="" /> : <div className="thumb" />}
            <div style={{ minWidth: 0 }}>
              <div className="nm">{p.nom}</div>
              <div className="de">{p.partsMax ? a + " à " + b + " parts" : "À partir de " + a + " parts"}{choixDe(p) ? " · " + choixDe(p).options.length + " choix" : ""}</div>
              <div style={{ marginTop: 5 }}>
                <Pastille x={p} />
                <span style={{ fontSize: 13, fontWeight: 800, color: "var(--apple)", marginLeft: 6 }}>{euros(prixPers(p))} / pers.</span>
              </div>
            </div>
            <div className="rt">
              <button className="ib" onClick={() => setM(p)}>{I.pen()}</button>
              <button className="ib" onClick={() => confirm("Supprimer « " + p.nom + " » ?") && set("plateaux", l => l.filter(x => x.id !== p.id))}>{I.bin()}</button>
            </div>
          </div></div>
        );
      })}
      </div>
      {m && <Modal titre={m.id ? "Modifier le plateau" : "Nouveau plateau"} onClose={() => setM(null)}>
        <PhotoField value={m.photo} onChange={v => setM({ ...m, photo: v })} />
        <label className="lab">Nom du plateau</label>
        <input className="inp" autoFocus value={m.nom} onChange={e => setM({ ...m, nom: e.target.value })} placeholder="Plateau charcuterie" maxLength={80} />
        <label className="lab">Ce qu'il y a dedans</label>
        <textarea className="inp" rows={4} value={m.composition} onChange={e => setM({ ...m, composition: e.target.value })} placeholder={"Jambon cru, rosette, terrine maison,\nsaucisson de Franche-Comté, cornichons, pain"} />
        <label className="lab">Prix par personne (€)</label>
        <input className="inp" type="number" inputMode="decimal" step="0.10" min="0" value={m.prixPersonne} onChange={e => setM({ ...m, prixPersonne: e.target.value })} placeholder="8.50" />
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Nombre de parts minimum</label>
            <input className="inp" type="number" inputMode="numeric" min="1" value={m.partsMin} onChange={e => setM({ ...m, partsMin: e.target.value })} placeholder="4" /></div>
          <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Maximum (facultatif)</label>
            <input className="inp" type="number" inputMode="numeric" min="1" value={m.partsMax} onChange={e => setM({ ...m, partsMax: e.target.value })} placeholder="Sans limite" /></div>
        </div>
        {prixPers(m) > 0 && <div className="apercu-prix">Exemple : {mn} pers. × {euros(prixPers(m))} = <b>{euros(mn * prixPers(m))}</b>
          {m.partsMax && mx > mn && <> · {mx} pers. = <b>{euros(mx * prixPers(m))}</b></>}</div>}
        <EditionChoix m={m} setM={setM} />
        <Periode v={m} onChange={setM} />
        <div className="tog" style={{ marginTop: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Visible par les clients</span>
          <div className="rt"><Sw on={m.active !== false} set={() => setM({ ...m, active: m.active === false })} /></div>
        </div>
        <button className="btn" style={{ marginTop: 12 }} onClick={sauver}>Enregistrer</button>
      </Modal>}
    </>
  );
}

// Choix proposés au client sur un plateau (fromages, charcuteries…)
function EditionChoix({ m, setM }) {
  const c = m.choix;
  const [nouveau, setNouveau] = useState("");
  const maj = (v) => setM({ ...m, choix: { ...c, ...v } });
  const opts = c?.options || [];
  const majOpt = (i, v) => maj({ options: opts.map((o, j) => j === i ? { ...o, ...v } : o) });
  if (!c) return (
    <div className="choix-bloc">
      <div className="nm" style={{ fontSize: 13 }}>Choix proposés au client <span className="de">(facultatif)</span></div>
      <div className="de" style={{ margin: "2px 0 8px" }}>Le client coche ce qu'il préfère : fromages, charcuteries…</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="btn gh sm" onClick={() => setM({ ...m, choix: JSON.parse(JSON.stringify(LISTE_RACLETTE)) })}>🧀 Fromages à raclette</button>
        <button className="btn gh sm" onClick={() => setM({ ...m, choix: { titre: "", min: 1, max: 1, options: [] } })}>+ Liste vide</button>
      </div>
    </div>
  );
  return (
    <div className="choix-bloc">
      <div className="nm" style={{ fontSize: 13, marginBottom: 6 }}>Choix proposés au client</div>
      <label className="lab">Titre affiché</label>
      <input className="inp" value={c.titre} maxLength={60} placeholder="Ex : Vos fromages à raclette" onChange={e => maj({ titre: e.target.value })} />
      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Minimum à cocher</label>
          <input className="inp" type="number" inputMode="numeric" min="0" value={c.min} onChange={e => maj({ min: e.target.value })} /></div>
        <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Maximum</label>
          <input className="inp" type="number" inputMode="numeric" min="1" value={c.max} onChange={e => maj({ max: e.target.value })} /></div>
      </div>
      <label className="lab" style={{ marginTop: 8 }}>Options <span style={{ fontWeight: 600 }}>(supplément par personne, 0 = même prix)</span></label>
      {opts.map((o, i) => (
        <div className="opt-ligne" key={i}>
          <input className="inp" value={o.nom} maxLength={60} onChange={e => majOpt(i, { nom: e.target.value })} />
          <div className="opt-supp"><span>+</span><input className="inp" type="number" inputMode="decimal" step="0.5" min="0" value={o.supp} onChange={e => majOpt(i, { supp: e.target.value })} /><span>€</span></div>
          <button className="ib" onClick={() => maj({ options: opts.filter((_, j) => j !== i) })} aria-label="Retirer">{I.bin()}</button>
        </div>
      ))}
      <div className="opt-ligne">
        <input className="inp" value={nouveau} maxLength={60} placeholder="Ajouter une option…" onChange={e => setNouveau(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && nouveau.trim()) { maj({ options: [...opts, { nom: nouveau.trim(), supp: 0 }] }); setNouveau(""); } }} />
        <button className="btn sm" disabled={!nouveau.trim()} onClick={() => { maj({ options: [...opts, { nom: nouveau.trim(), supp: 0 }] }); setNouveau(""); }}>Ajouter</button>
      </div>
      <button className="btn gh sm" style={{ marginTop: 8, color: "var(--red)" }} onClick={() => confirm("Retirer tous les choix de ce plateau ?") && setM({ ...m, choix: null })}>Retirer les choix</button>
    </div>
  );
}

function ReglagesCmd({ d, set }) {
  const c = cmdCfg(d.cmd);
  const maj = (k, v) => set("cmd", x => ({ ...cmdCfg(x), [k]: v }));
  const regle = regleDates(c, d.fermetures);
  const [du, setDu] = useState("");
  const [au, setAu] = useState("");
  const [test, setTest] = useState("");
  const essai = async () => {
    const u = urlTestMail(c);
    if (!u) return setTest("Collez d'abord l'adresse du script.");
    setTest("Envoi…");
    try {
      await fetch(u, { method: "GET", mode: "no-cors", redirect: "follow" });
      setTest("Demande de test envoyée. Vérifiez que l'e-mail « [TEST] Nouvelle commande » est bien arrivé (en général en moins d'une minute, regardez aussi les indésirables). Rien reçu après quelques minutes ? Prévenez Eric.");
    } catch { setTest("Envoi impossible : vérifiez la connexion internet et réessayez."); }
  };
  const mailOk = scriptValide(c.script);
  const [ouvrirScript, setOuvrirScript] = useState(false);
  return (
    <>
      <div className="card">
        <div className="tog" style={{ borderTop: "none", paddingTop: 0 }}>
          <div><div className="nm">Commandes en ligne</div><div className="de">Désactivez-les pendant vos congés, par exemple</div></div>
          <div className="rt"><Sw on={c.active} set={() => maj("active", !c.active)} /></div>
        </div>
      </div>

      <div className="card">
        <div className="nm" style={{ marginBottom: 4 }}>Calendrier des clients</div>
        <div className="de" style={{ marginBottom: 10 }}>Vous décidez quelles dates les clients peuvent choisir.</div>
        <label className="lab">Délai minimum avant le retrait</label>
        <select className="inp" value={c.delaiMin} onChange={e => maj("delaiMin", Number(e.target.value))}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 10, 14].map(n => <option key={n} value={n}>{n === 0 ? "Aucun (le jour même possible)" : n === 1 ? "1 jour (pas le jour même)" : n + " jours (ni aujourd'hui" + (n > 1 ? ", ni demain" : "") + (n > 2 ? "…" : "") + ")"}</option>)}
        </select>
        <label className="lab" style={{ marginTop: 10 }}>Les clients peuvent commander jusqu'à</label>
        <select className="inp" value={c.horizon} onChange={e => maj("horizon", Number(e.target.value))}>
          {[14, 30, 45, 60, 90, 120].map(n => <option key={n} value={n}>{n} jours à l'avance</option>)}
        </select>
        <label className="lab" style={{ marginTop: 10 }}>Jours où vous acceptez les retraits / livraisons</label>
        <div className="jours-sem">
          {JOURS_SEM.map(([n, l]) => {
            const on = (c.jours || []).includes(n);
            return <button key={n} className={on ? "on" : ""} onClick={() => { const j = on ? c.jours.filter(x => x !== n) : [...c.jours, n]; if (j.length) maj("jours", j); }}>{l}</button>;
          })}
        </div>
        <label className="lab" style={{ marginTop: 12 }}>Fermetures (congés, jours fériés…)</label>
        {(c.fermes || []).map((f, i) => (
          <div className="tog" key={i}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>{f.au && f.au !== f.du ? "Du " + dateFr(f.du) + " au " + dateFr(f.au) : "Le " + dateFr(f.du)}</span>
            <div className="rt"><button className="ib" onClick={() => maj("fermes", c.fermes.filter((_, k) => k !== i))}>{I.bin()}</button></div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginTop: 6 }}>
          <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Du</label><input className="inp" type="date" value={du} onChange={e => setDu(e.target.value)} /></div>
          <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Au (facultatif)</label><input className="inp" type="date" min={du || undefined} value={au} onChange={e => setAu(e.target.value)} /></div>
        </div>
        <button className="btn gh sm" style={{ marginTop: 8 }} disabled={!du} onClick={() => { maj("fermes", [...(c.fermes || []), { du, au: au && au >= du ? au : du }].sort((a, b) => a.du.localeCompare(b.du))); setDu(""); setAu(""); }}>Ajouter cette fermeture</button>
        <div className="apercu-prix" style={{ marginTop: 12 }}>
          {regle.premiere ? <>Aujourd'hui, la première date proposée aux clients est le <b>{dateLongue(regle.premiere)}</b>.</> : <>Aucune date n'est proposée aux clients avec ces réglages.</>}
        </div>
      </div>

      <div className="card">
        <div className="nm" style={{ marginBottom: 8 }}>Retrait ou livraison</div>
        <div className="seg" style={{ marginBottom: 10 }}>
          {[["retrait", "Retrait"], ["livraison", "Livraison"], ["choix", "Au choix"]].map(([k, l]) => <button key={k} className={c.mode === k ? "on" : ""} onClick={() => maj("mode", k)}>{l}</button>)}
        </div>
        <label className="lab">Heure de retrait proposée par défaut</label>
        <input className="inp" type="time" step="900" value={c.heureDefaut} onChange={e => maj("heureDefaut", e.target.value)} style={{ maxWidth: 200 }} />
        <div className="de" style={{ margin: "4px 2px 10px" }}>Vous la confirmez ou la changez pour chaque commande en l'acceptant.</div>
        <label className="lab">Message affiché aux clients (facultatif)</label>
        <textarea className="inp" value={c.note} onChange={e => maj("note", e.target.value)} placeholder="Ex : Livraison uniquement sur Raddon et les communes voisines." maxLength={300} />
      </div>

      <div className="card">
        <div className="nm" style={{ marginBottom: 4 }}>E-mail « commande à préparer »</div>
        <div className="de" style={{ marginBottom: 10 }}>
          {mailOk ? "✓ Configuré : vous recevez un e-mail à chaque nouvelle commande." : "Pas encore configuré. Les commandes arrivent quand même ici, dans l'onglet Commandes."}</div>
        {(!mailOk || ouvrirScript) ? <>
          <label className="lab">Adresse du script Google (réglage technique)</label>
          <input className="inp" value={c.script} placeholder="https://script.google.com/macros/s/…/exec" autoCapitalize="off" autoCorrect="off" spellCheck={false}
            onChange={e => maj("script", e.target.value.trim())} />
          {c.script && !mailOk && <div className="cmd-alerte">Cette adresse ne ressemble pas à celle d'un script déployé (elle doit finir par /exec).</div>}
          {mailOk && <button className="btn gh sm" style={{ marginTop: 8 }} onClick={() => setOuvrirScript(false)}>Masquer</button>}
        </> : <button className="lienadm" onClick={() => confirm("Réglage technique : ne modifiez cette adresse que si Eric vous le demande.\n\nAfficher quand même ?") && setOuvrirScript(true)}>Réglage technique (réservé à Eric)</button>}
        <button className="btn gh sm" style={{ marginTop: 10 }} onClick={essai}>Envoyer un e-mail de test</button>
        {test && <div className="de" style={{ marginTop: 6, fontWeight: 700 }}>{test}</div>}
      </div>
    </>
  );
}

// ═══════════ THÈMES DE SAISON ═══════════
const THEMES_DEF = { mode: "auto", force: "", animations: true, items: {}, perso: [] };
const dateCourte = (iso) => iso ? new Date(iso + "T12:00").toLocaleDateString("fr-FR", { day: "numeric", month: "long" }).replace(/^1 /, "1er ") : "";

function ApercuTheme({ theme }) {
  return (
    <div className="apercu-tel">
      <div className="at-top" style={{ background: theme.top }}><img src={LOGO} alt="" /><span>Épicerie Raddonnaise</span></div>
      <div className="frise-theme" style={{ background: theme.frise, position: "relative", top: 0 }} />
      <div className="at-corps">
        {theme.anim !== false && <Particules theme={theme} nb={12} dans />}
        <div style={{ position: "relative", zIndex: 2 }}><CarteTheme theme={theme} /></div>
        <div className="at-faux" /><div className="at-faux court" />
      </div>
    </div>
  );
}

const COULEURS_THEME = ["#A4161A", "#C2577E", "#E05A73", "#E8731C", "#C69A3C", "#6E9B3A", "#2E7D32", "#1C433B", "#24507E", "#1F3A93", "#4F3A8C", "#2B1B3D"];
const EMOJIS_THEME = "🐣 🐰 🥚 🌷 🌸 🌼 🌻 💐 🍫 🍓 🍒 🍎 🍐 🍇 🍋 🧀 🥖 🥐 🍷 🍾 🥂 🎂 🎉 🎈 🎁 ⭐ ✨ ❤️ ☀️ 🍂 🍁 🍄 ❄️ ⛄ 🎄 🔔 🎃 👻 ⚽ 🏆 🎶 🐟".split(" ");
const nouveauPerso = () => { const a = aujourdISO(); return { id: "p" + Date.now().toString(36), nom: "", titre: "", message: "", couleur: "#E8731C", emojis: "🎉✨", illu: "", du: a, au: a, chaqueAnnee: true, active: true }; };

function EditionPerso({ p0, onClose, onSave, onDelete }) {
  const [p, setP] = useState(p0);
  const em = emojisDe(p.emojis);
  const basculer = (e) => setP({ ...p, emojis: em.includes(e) ? em.filter(x => x !== e).join("") : em.length >= 6 ? p.emojis : em.join("") + e });
  const th = { ...persoVersTheme({ ...p, titre: p.titre || p.nom || "Mon thème" }), anim: true };
  const ok = p.nom.trim() && p.du && p.au && p.au >= p.du;
  return (
    <Modal titre={p0.nom ? "Modifier « " + p0.nom + " »" : "Créer mon thème"} onClose={onClose}>
      <ApercuTheme theme={th} />
      <label className="lab" style={{ marginTop: 12 }}>Nom du thème</label>
      <input className="inp" value={p.nom} maxLength={40} placeholder="Ex : Fête du village, Anniversaire de l'épicerie…" onChange={e => setP({ ...p, nom: e.target.value })} />
      <label className="lab" style={{ marginTop: 10 }}>Couleur</label>
      <div className="couleurs">
        {COULEURS_THEME.map(c => <button key={c} className={p.couleur === c ? "on" : ""} style={{ background: c }} onClick={() => setP({ ...p, couleur: c })} aria-label={"Couleur " + c} />)}
        <label className="perso-coul" title="Autre couleur"><input type="color" value={p.couleur} onChange={e => setP({ ...p, couleur: e.target.value })} />+</label>
      </div>
      <label className="lab" style={{ marginTop: 10 }}>Petits dessins qui tombent (jusqu'à 6)</label>
      <div className="emojis">{EMOJIS_THEME.map(e => <button key={e} className={em.includes(e) ? "on" : ""} onClick={() => basculer(e)}>{e}</button>)}</div>
      <input className="inp" style={{ marginTop: 6 }} value={p.emojis} maxLength={40} placeholder="…ou tapez vos émojis ici" onChange={e => setP({ ...p, emojis: e.target.value })} />
      <label className="lab" style={{ marginTop: 10 }}>Grand dessin de la carte (facultatif)</label>
      <input className="inp" value={p.illu} maxLength={8} placeholder={"Par défaut : " + (em[0] || "⭐")} onChange={e => setP({ ...p, illu: e.target.value })} style={{ maxWidth: 200 }} />
      <label className="lab" style={{ marginTop: 10 }}>Titre de la carte</label>
      <input className="inp" value={p.titre} maxLength={50} placeholder={p.nom || "Ex : Joyeux anniversaire !"} onChange={e => setP({ ...p, titre: e.target.value })} />
      <label className="lab" style={{ marginTop: 10 }}>Message</label>
      <textarea className="inp" value={p.message} maxLength={200} placeholder="Ex : Venez fêter les 3 ans de l'épicerie samedi, café offert !" onChange={e => setP({ ...p, message: e.target.value })} />
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Du</label><input className="inp" type="date" value={p.du} onChange={e => setP({ ...p, du: e.target.value, au: p.au < e.target.value ? e.target.value : p.au })} /></div>
        <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Au</label><input className="inp" type="date" min={p.du} value={p.au} onChange={e => setP({ ...p, au: e.target.value })} /></div>
      </div>
      <div className="tog" style={{ marginTop: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 700 }}>Revient tous les ans aux mêmes dates</span>
        <div className="rt"><Sw on={p.chaqueAnnee} set={() => setP({ ...p, chaqueAnnee: !p.chaqueAnnee })} /></div>
      </div>
      <button className="btn" style={{ marginTop: 12 }} disabled={!ok} onClick={() => onSave({ ...p, nom: p.nom.trim(), titre: p.titre.trim(), message: p.message.trim() })}>Enregistrer</button>
      {onDelete && <button className="btn gh" style={{ marginTop: 8, color: "var(--red)" }} onClick={() => confirm("Supprimer le thème « " + p0.nom + " » ?") && onDelete()}>Supprimer ce thème</button>}
    </Modal>
  );
}

function MesThemes({ c, maj, setVoir }) {
  const [ed, setEd] = useState(null);
  const liste = c.perso || [];
  const sauver = (p) => { maj({ perso: liste.some(x => x.id === p.id) ? liste.map(x => x.id === p.id ? p : x) : [...liste, p] }); setEd(null); };
  return (
    <>
      <div className="nm" style={{ margin: "16px 0 4px" }}>Mes thèmes</div>
      <div className="de" style={{ marginBottom: 8 }}>Créez vos propres thèmes : fête du village, anniversaire de l'épicerie, foire, marché de Noël… Ils passent avant les fêtes prévues.</div>
      <button className="btn terra" onClick={() => setEd(nouveauPerso())}>{I.plus()}Créer mon thème</button>
      <div style={{ height: 10 }} />
      <div className="grille">
      {liste.map(p => {
        const t = persoVersTheme(p), on = p.active !== false;
        return (
          <div className="card theme-ligne" key={p.id} style={{ opacity: on ? 1 : .55, borderLeft: "4px solid " + t.top }}>
            <div className="row">
              <div className="th-illu" style={{ background: t.soft }}><IllustrationTheme theme={t} taille={46} /></div>
              <div style={{ minWidth: 0 }}>
                <div className="nm">{p.nom}</div>
                <div className="de">{p.du === p.au ? "Le " + dateCourte(p.du) : "Du " + dateCourte(p.du) + " au " + dateCourte(p.au)}{p.chaqueAnnee ? " · tous les ans" : " " + p.du.slice(0, 4)}</div>
              </div>
              <div className="rt"><Sw on={on} set={() => maj({ perso: liste.map(x => x.id === p.id ? { ...x, active: !on } : x) })} /></div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="btn gh sm" style={{ flex: 1 }} onClick={() => setEd(p)}>Modifier</button>
              <button className="btn gh sm" style={{ flex: 1 }} onClick={() => setVoir({ ...t, anim: c.animations !== false })}>Aperçu</button>
            </div>
          </div>
        );
      })}
      </div>
      {ed && <EditionPerso p0={ed} onClose={() => setEd(null)} onSave={sauver}
        onDelete={liste.some(x => x.id === ed.id) ? () => { maj({ perso: liste.filter(x => x.id !== ed.id), ...(c.force === ed.id ? { mode: "auto" } : {}) }); setEd(null); } : null} />}
    </>
  );
}

function Themes({ d, set }) {
  const c = { ...THEMES_DEF, ...(d.themes || {}), items: { ...((d.themes || {}).items || {}) } };
  const base = (x) => ({ ...THEMES_DEF, ...(x || {}), items: { ...((x || {}).items || {}) } });
  const maj = (v) => set("themes", x => ({ ...base(x), ...v }));
  const majItem = (id, v) => set("themes", x => { const b = base(x); return { ...b, items: { ...b.items, [id]: { ...(b.items[id] || {}), ...v } } }; });
  const [edit, setEdit] = useState(null);
  const [voir, setVoir] = useState(null);
  const auj = aujourdISO(), y = Number(auj.slice(0, 4));
  const actuel = themeDuJour(c);
  const prochaine = (t) => {
    for (const yy of [y - 1, y, y + 1]) { const p = periodeTheme(t, c.items[t.id], yy); if (p[1] >= auj) return p; }
    return periodeTheme(t, c.items[t.id], y + 1);
  };
  const liste = [...THEMES].map(t => ({ t, p: prochaine(t) })).sort((a, b) => a.p[0].localeCompare(b.p[0]));
  const en = (t) => { const [du, au] = prochaine(t); return du <= auj && auj <= au; };
  return (
    <div className="wrap">
      <div className="t1">Thèmes</div>
      <div className="sub">L'application s'habille pour les fêtes : couleurs, petite animation et carte de vœux sur l'accueil. Activez les fêtes que vous voulez et ajustez les dates.</div>

      <div className="card">
        <div className="nm" style={{ marginBottom: 8 }}>Affiché en ce moment</div>
        {actuel ? <ApercuTheme theme={actuel} /> : <div className="de" style={{ marginBottom: 6 }}>Aucun thème : l'application garde ses couleurs habituelles.</div>}
        <div className="seg" style={{ margin: "12px 0 8px" }}>
          {[["auto", "Selon le calendrier"], ["force", "Choisir un thème"], ["off", "Aucun thème"]].map(([k, l]) => <button key={k} className={c.mode === k ? "on" : ""} onClick={() => maj({ mode: k, force: k === "force" ? (c.force || actuel?.id || "noel") : c.force })}>{l}</button>)}
        </div>
        {c.mode === "force" && <select className="inp" value={c.force} onChange={e => maj({ force: e.target.value })}>
          {(c.perso || []).map(p => <option key={p.id} value={p.id}>{p.nom} (mon thème)</option>)}
          {THEMES.map(t => <option key={t.id} value={t.id}>{t.nom}</option>)}
        </select>}
        {c.mode === "force" && <div className="de" style={{ marginTop: 6 }}>Ce thème reste affiché tant que vous ne repassez pas sur « Selon le calendrier ».</div>}
        <div className="tog" style={{ marginTop: 6 }}>
          <div><div style={{ fontSize: 13, fontWeight: 700 }}>Petite animation</div><div className="de">Flocons, cœurs, citrouilles… qui tombent doucement</div></div>
          <div className="rt"><Sw on={c.animations !== false} set={() => maj({ animations: c.animations === false })} /></div>
        </div>
      </div>

      <MesThemes c={c} maj={maj} setVoir={setVoir} />

      <div className="nm" style={{ margin: "16px 0 8px" }}>Les fêtes de l'année</div>
      <div className="grille">
      {liste.map(({ t, p: [du, au, perso] }) => {
        const on = c.items[t.id]?.active !== false;
        return (
          <div className="card theme-ligne" key={t.id} style={{ opacity: on ? 1 : .55, borderLeft: "4px solid " + t.top }}>
            <div className="row">
              <div className="th-illu" style={{ background: t.soft }}><IllustrationTheme theme={t} taille={46} /></div>
              <div style={{ minWidth: 0 }}>
                <div className="nm">{t.nom}{en(t) && on && <span className="pill on" style={{ marginLeft: 6 }}>En cours</span>}</div>
                <div className="de">{du === au ? "Le " + dateCourte(du) : "Du " + dateCourte(du) + " au " + dateCourte(au)}{perso ? " · dates modifiées" : ""}</div>
              </div>
              <div className="rt"><Sw on={on} set={() => majItem(t.id, { active: !on })} /></div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button className="btn gh sm" style={{ flex: 1 }} onClick={() => setEdit({ t, du, au, message: c.items[t.id]?.message || "" })}>Dates & message</button>
              <button className="btn gh sm" style={{ flex: 1 }} onClick={() => setVoir({ ...t, message: c.items[t.id]?.message || t.message, anim: c.animations !== false })}>Aperçu</button>
            </div>
          </div>
        );
      })}
      </div>

      {voir && <Modal titre={"Aperçu — " + voir.nom} onClose={() => setVoir(null)}>
        <ApercuTheme theme={voir} />
        <button className="btn" style={{ marginTop: 12 }} onClick={() => { maj({ mode: "force", force: voir.id }); setVoir(null); }}>Afficher ce thème maintenant sur l'application</button>
        {c.mode === "force" && <button className="btn gh" style={{ marginTop: 8 }} onClick={() => { maj({ mode: "auto" }); setVoir(null); }}>Revenir au calendrier automatique</button>}
      </Modal>}

      {edit && <Modal titre={edit.t.nom} onClose={() => setEdit(null)}>
        <div className="de" style={{ marginBottom: 10 }}>Période d'affichage {edit.du.slice(0, 4) !== edit.au.slice(0, 4) ? edit.du.slice(0, 4) + "-" + edit.au.slice(0, 4) : edit.du.slice(0, 4)}. L'année suivante, les dates habituelles reviennent toutes seules.</div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Du</label><input className="inp" type="date" value={edit.du} onChange={e => setEdit({ ...edit, du: e.target.value })} /></div>
          <div style={{ flex: 1, minWidth: 0 }}><label className="lab">Au</label><input className="inp" type="date" min={edit.du} value={edit.au} onChange={e => setEdit({ ...edit, au: e.target.value })} /></div>
        </div>
        <label className="lab" style={{ marginTop: 10 }}>Message de la carte de vœux</label>
        <textarea className="inp" value={edit.message} maxLength={200} placeholder={edit.t.message} onChange={e => setEdit({ ...edit, message: e.target.value })} />
        <div className="de" style={{ marginTop: 4 }}>Vide = message proposé : « {edit.t.message} »</div>
        <button className="btn" style={{ marginTop: 12 }} disabled={!edit.du || !edit.au || edit.au < edit.du}
          onClick={() => { const [dd, da] = edit.t.dates(Number(edit.du.slice(0, 4))); const habituel = dd === edit.du && da === edit.au; majItem(edit.t.id, { du: habituel ? "" : edit.du, au: habituel ? "" : edit.au, message: edit.message.trim() }); setEdit(null); }}>Enregistrer</button>
        <button className="btn gh" style={{ marginTop: 8 }} onClick={() => { majItem(edit.t.id, { du: "", au: "" }); setEdit(null); }}>Remettre les dates habituelles</button>
      </Modal>}
    </div>
  );
}

// ═══════════ MESSAGES DES CLIENTS ═══════════
const REPONSES = ["Bonjour ! Oui, c'est possible 😊", "Merci pour votre message, je regarde et je vous réponds vite.", "C'est noté, à bientôt à l'épicerie !", "Désolée, ce n'est plus disponible pour le moment."];

function Fil({ conv, onRetour }) {
  const [msgs, setMsgs] = useState([]);
  const [texte, setTexte] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const fin = useRef(null);
  useEffect(() => onSnapshot(collection(db, "conversations", conv.id, "messages"),
    s => setMsgs(s.docs.map(x => ({ ...x.data(), id: x.id })).sort((a, b) => (a.date || 0) - (b.date || 0))), () => { }), [conv.id]);
  useEffect(() => { if (conv.attente) setDoc(doc(db, "conversations", conv.id), { attente: false }, { merge: true }).catch(() => { }); }, [conv.id, conv.attente]);
  useEffect(() => { fin.current?.scrollIntoView({ block: "end" }); }, [msgs.length]);
  const repondre = async () => {
    const t = texte.trim().slice(0, MAX_TEXTE); if (!t || envoi) return;
    setEnvoi(true);
    try {
      const now = Date.now(), b = writeBatch(db);
      b.set(doc(collection(db, "conversations", conv.id, "messages")), { de: "epicerie", texte: t, date: now });
      b.update(doc(db, "conversations", conv.id), { maj: now, dernier: "Vous : " + apercu(t), attente: false });
      await b.commit(); setTexte("");
    } catch (e) { alert("Message non envoyé. Vérifiez la connexion et réessayez."); }
    setEnvoi(false);
  };
  let dj = "";
  return (
    <div className="fil-adm">
      <div className="fil-hd">
        <button className="btn gh sm" onClick={onRetour}>←</button>
        <div style={{ minWidth: 0 }}><div className="nm">{conv.nom}</div>
          <div className="de">{conv.tel ? <a href={"tel:" + conv.tel.replace(/\s/g, "")}>{conv.tel}</a> : "Pas de téléphone"} · depuis le {new Date(conv.cree || Date.now()).toLocaleDateString("fr-FR")}</div></div>
      </div>
      <div className="fil-corps">
        {!msgs.length && <div className="de" style={{ textAlign: "center", padding: 20 }}>Chargement…</div>}
        {msgs.map(m => { const j = jourMsg(m.date); const sep = j !== dj; dj = j; return <React.Fragment key={m.id}>
          {sep && <div className="fil-jour">{j}</div>}
          <div className={"fmsg " + (m.de === "epicerie" ? "moi" : "lui")}><div>{m.texte}</div><small>{heureMsg(m.date)}</small></div>
        </React.Fragment>; })}
        <div ref={fin} />
      </div>
      <div className="motifs" style={{ margin: "8px 0" }}>{REPONSES.map(r => <button key={r} onClick={() => setTexte(r)}>{r.length > 34 ? r.slice(0, 32) + "…" : r}</button>)}</div>
      <div className="fil-saisie">
        <textarea className="inp" rows={2} value={texte} maxLength={MAX_TEXTE} placeholder={"Répondre à " + conv.nom + "…"} onChange={e => setTexte(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey && window.matchMedia("(pointer:fine)").matches) { e.preventDefault(); repondre(); } }} />
        <button className="btn" style={{ width: "auto", padding: "0 20px" }} disabled={!texte.trim() || envoi} onClick={repondre}>Envoyer</button>
      </div>
    </div>
  );
}

function Messages({ d, set }) {
  const [ouvert, setOuvert] = useState(null);
  const convs = [...d.conversations].sort((a, b) => (b.maj || 0) - (a.maj || 0));
  const actuel = ouvert && convs.find(c => c.id === ouvert);
  const limite = Date.now() - 365 * 864e5;
  const vieilles = convs.filter(c => (c.maj || 0) < limite);
  const supprimer = async (c) => {
    if (!confirm("Supprimer la conversation avec " + c.nom + " ?\n\nLe client ne verra plus ses messages.")) return;
    try {
      const h = await getDocs(collection(db, "conversations", c.id, "messages"));
      const b = writeBatch(db); h.forEach(x => b.delete(x.ref)); b.delete(doc(db, "conversations", c.id)); await b.commit();
      setOuvert(null);
    } catch { alert("Suppression impossible. Vérifiez la connexion."); }
  };
  return (
    <div className="wrap">
      <div className="t1">Messages</div>
      <div className="sub">Les questions de vos clients, envoyées depuis l'application.</div>
      {actuel ? <>
        <Fil conv={actuel} onRetour={() => setOuvert(null)} />
        <button className="btn gh sm" style={{ marginTop: 12, color: "var(--red)" }} onClick={() => supprimer(actuel)}>Supprimer cette conversation</button>
      </> : <>
        <div className="tog card" style={{ marginBottom: 12 }}>
          <div><div style={{ fontSize: 13, fontWeight: 800 }}>Bouton « Une question ? » sur l'application</div><div className="de">Désactivez-le si vous ne voulez plus recevoir de messages</div></div>
          <div className="rt"><Sw on={d.chat?.active !== false} set={() => set("chat", x => ({ ...(x || {}), active: x?.active === false }))} /></div>
        </div>
        {!convs.length && <Vide t="Aucun message pour l'instant" s="Quand un client vous écrit depuis l'application, sa conversation apparaît ici." />}
        <div className="grille">
          {convs.map(c => (
            <div className={"card conv" + (c.attente ? " attente" : "")} key={c.id} onClick={() => setOuvert(c.id)}>
              <div className="row">
                <div className="av-conv">{(c.nom || "?").trim()[0]?.toUpperCase()}</div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="nm">{c.nom}{c.attente && <span className="pill promo" style={{ marginLeft: 6 }}>Nouveau</span>}</div>
                  <div className="de conv-der">{c.dernier}</div>
                </div>
                <div className="de" style={{ flexShrink: 0 }}>{c.maj ? heureMsg(c.maj) : ""}</div>
              </div>
            </div>
          ))}
        </div>
        {!!vieilles.length && <button className="btn gh" style={{ marginTop: 10, color: "var(--red)" }}
          onClick={async () => { if (!confirm("Supprimer les " + vieilles.length + " conversation(s) sans message depuis plus d'un an ?")) return; for (const c of vieilles) { const h = await getDocs(collection(db, "conversations", c.id, "messages")); const b = writeBatch(db); h.forEach(x => b.delete(x.ref)); b.delete(doc(db, "conversations", c.id)); await b.commit(); } }}>
          Supprimer les conversations de plus d'un an ({vieilles.length})</button>}
        <div className="de" style={{ marginTop: 8 }}>Données personnelles (RGPD) : les conversations sont à supprimer au plus tard 1 an après le dernier message.</div>
      </>}
    </div>
  );
}

// ═══════════ BANNIÈRES PUBLICITAIRES ═══════════
const ACTIONS = [
  { id: "aucune", label: "Aucune" },
  { id: "carte", label: "Voir la carte" },
  { id: "appeler", label: "Appeler l'épicerie" },
];

function Pubs({ d, set }) {
  const [m, setM] = useState(null);
  const pubs = d.pubs || [];
  const sauver = () => {
    if (!m.photo) return alert("Ajoutez une image : c'est l'essentiel d'une bannière.");
    set("pubs", l => m.id ? l.map(p => p.id === m.id ? m : p) : [...l, { ...m, id: uid(), ordre: l.length }]);
    setM(null);
  };
  const deplacer = (i, dir) => {
    const j = i + dir; if (j < 0 || j >= pubs.length) return;
    const ordre = [...pubs]; [ordre[i], ordre[j]] = [ordre[j], ordre[i]];
    set("pubs", l => l.map(x => ({ ...x, ordre: ordre.findIndex(y => y.id === x.id) })));
  };
  const enLigne = pubs.filter(p => statut(p)[0] === "on").length;
  return (
    <div className="wrap">
      <div className="t1">Bannières</div>
      <div className="sub">Les grandes images en haut de l'application : plateaux de fêtes, nouveautés, événements. Elles défilent toutes seules. Format conseillé : photo horizontale.</div>
      <button className="btn terra" onClick={() => setM({ photo: "", titre: "", texte: "", action: "carte", fin: "", active: true })}>{I.plus()}Nouvelle bannière</button>
      <div style={{ fontSize: 12, color: "var(--ink3)", margin: "10px 0 12px" }}>{enLigne} bannière{enLigne > 1 ? "s" : ""} visible{enLigne > 1 ? "s" : ""} par les clients</div>
      {!pubs.length && <Vide t="Aucune bannière" s="Une belle photo de plateau et deux mots suffisent : « Plateaux de Noël — commandez avant le 20 »." />}
      <div className="grille">
      {pubs.map((p, i) => (
        <div className="card" key={p.id} style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ position: "relative" }}>
            {p.photo ? <img src={p.photo} alt="" style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
              : <div style={{ aspectRatio: "16/9", background: "var(--apple-soft)" }} />}
            <Pastille x={p} fem style={{ position: "absolute", top: 9, left: 9 }} />
          </div>
          <div className="row" style={{ padding: "11px 13px" }}>
            <div style={{ minWidth: 0 }}>
              <div className="nm">{p.titre || "Sans titre"}</div>
              <div className="de">Action : {ACTIONS.find(a => a.id === p.action)?.label || "Aucune"}</div>
            </div>
            <div className="rt">
              <button className="ib" title="Monter" disabled={i === 0} onClick={() => deplacer(i, -1)} style={{ fontSize: 16, color: "#5C6A62", opacity: i === 0 ? .3 : 1 }}>↑</button>
              <button className="ib" title="Descendre" disabled={i === pubs.length - 1} onClick={() => deplacer(i, 1)} style={{ fontSize: 16, color: "#5C6A62", opacity: i === pubs.length - 1 ? .3 : 1 }}>↓</button>
              <Sw on={p.active !== false} set={() => set("pubs", l => l.map(x => x.id === p.id ? { ...x, active: x.active === false } : x))} />
              <button className="ib" onClick={() => setM(p)}>{I.pen()}</button>
              <button className="ib" onClick={() => confirm("Supprimer cette bannière ?") && set("pubs", l => l.filter(x => x.id !== p.id))}>{I.bin()}</button>
            </div>
          </div>
        </div>
      ))}
      </div>
      {m && <Modal titre={m.id ? "Modifier la bannière" : "Nouvelle bannière"} onClose={() => setM(null)}>
        <PhotoField value={m.photo} max={1400} onChange={v => setM({ ...m, photo: v })} />
        <label className="lab">Titre (facultatif)</label>
        <input className="inp" value={m.titre} onChange={e => setM({ ...m, titre: e.target.value })} placeholder="Plateaux de Noël" />
        <label className="lab">Petit texte (facultatif)</label>
        <input className="inp" value={m.texte} onChange={e => setM({ ...m, texte: e.target.value })} placeholder="Commandez avant le 20 décembre" />
        <label className="lab">Quand le client touche la bannière</label>
        <div className="seg" style={{ marginBottom: 0 }}>
          {ACTIONS.map(a => <button key={a.id} className={m.action === a.id ? "on" : ""} onClick={() => setM({ ...m, action: a.id })}>{a.label}</button>)}
        </div>
        <Periode v={m} onChange={setM} />
        <div className="tog" style={{ marginTop: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700 }}>Visible par les clients</span>
          <div className="rt"><Sw on={m.active !== false} set={() => setM({ ...m, active: m.active === false })} /></div>
        </div>
        <button className="btn" style={{ marginTop: 12 }} onClick={sauver}>Enregistrer</button>
      </Modal>}
    </div>
  );
}

// ═══════════ ACTUALITÉS ═══════════
function Actus({ d, set }) {
  const [m, setM] = useState(null);
  const sauver = () => {
    if (!m.titre?.trim()) return;
    set("actus", l => m.id ? l.map(a => a.id === m.id ? m : a) : [{ ...m, id: uid() }, ...l]);
    setM(null);
  };
  return (
    <div className="wrap">
      <div className="t1">Actualités</div>
      <div className="sub">Vos publications : créations maison, arrivages, menu du jour, fermeture exceptionnelle…</div>
      <button className="btn dark" onClick={() => setM({ titre: "", texte: "", photo: "", date: new Date().toLocaleDateString("fr-FR"), active: true })}>{I.plus()}Nouvelle publication</button>
      <div style={{ height: 12 }} />
      {!d.actus.length && <Vide t="Aucune publication" s="Une photo et deux lignes suffisent : vos clients voient la nouveauté dès l'ouverture de l'application." />}
      <div className="grille">
      {d.actus.map(a => (
        <div className="card" key={a.id}><div className="row">
          {a.photo ? <img className="thumb" src={a.photo} alt="" /> : <div className="thumb" />}
          <div style={{ minWidth: 0 }}>
            <div className="nm">{a.titre}</div>
            <div className="de">{a.date}</div>
            <Pastille x={a} fem style={{ marginTop: 5 }} />
          </div>
          <div className="rt">
            <Sw on={a.active !== false} set={() => set("actus", l => l.map(x => x.id === a.id ? { ...x, active: x.active === false } : x))} />
            <button className="ib" onClick={() => setM(a)}>{I.pen()}</button>
            <button className="ib" onClick={() => confirm("Supprimer cette publication ?") && set("actus", l => l.filter(x => x.id !== a.id))}>{I.bin()}</button>
          </div>
        </div></div>
      ))}
      </div>
      {m && <Modal titre={m.id ? "Modifier" : "Nouvelle publication"} onClose={() => setM(null)}>
        <PhotoField value={m.photo} onChange={v => setM({ ...m, photo: v })} />
        <label className="lab">Titre</label>
        <input className="inp" autoFocus value={m.titre} onChange={e => setM({ ...m, titre: e.target.value })} placeholder="Nos tartes maison sont arrivées" />
        <label className="lab">Texte</label>
        <textarea className="inp" value={m.texte} onChange={e => setM({ ...m, texte: e.target.value })} />
        <label className="lab">Date affichée</label>
        <input className="inp" value={m.date} onChange={e => setM({ ...m, date: e.target.value })} />
        <Periode v={m} onChange={setM} />
        <button className="btn" style={{ marginTop: 14 }} onClick={sauver}>Publier</button>
      </Modal>}
    </div>
  );
}

// ═══════════ FIDÉLITÉ ═══════════
function Fidelite({ d, set }) {
  const [vue, setVue] = useState("clients");
  const [q, setQ] = useState("");
  const [scan, setScan] = useState(false);
  const [saisie, setSaisie] = useState("");
  const [mc, setMc] = useState(null);       // modale client
  const [pts, setPts] = useState(null);     // modale points
  const [mode, setMode] = useState("achat");
  const [montant, setMontant] = useState("");
  const [manuel, setManuel] = useState("");
  const f = d.fidelite;

  const [envoi, setEnvoi] = useState(false);
  const actuel = (id) => d.clients.find(c => c.id === id) || pts;

  const validerAchat = async () => {
    const a = parseFloat(montant); if (!a || envoi) return;
    const gagnes = Math.floor(a / (f.parEuro || 10));
    setEnvoi(true);
    try { await ajouterPoints(actuel(pts.id), gagnes, { type: "achat", montant: a }); setPts(null); setMontant(""); }
    catch (e) { alert("Points non enregistrés. Vérifiez la connexion et réessayez."); }
    setEnvoi(false);
  };
  const rmCfg = remiseDe(f);
  const appliquerRemise = async () => {
    const c = actuel(pts.id); if (!rmCfg || envoi || (c.points || 0) < rmCfg.points) return;
    if (!confirm("Appliquer " + eurosFr(rmCfg.euros) + " de remise à " + c.nom + " ?\n\n" + rmCfg.points + " points seront retirés de sa carte.")) return;
    setEnvoi(true);
    try { await ajouterPoints(c, -rmCfg.points, { type: "remise", remise: rmCfg.euros }); }
    catch (e) { alert("Remise non enregistrée. Vérifiez la connexion et réessayez."); }
    setEnvoi(false);
  };
  const validerManuel = async () => {
    const n = parseInt(manuel); if (!n || envoi) return;
    setEnvoi(true);
    try { await ajouterPoints(actuel(pts.id), n, n > 0 ? { type: "achat", source: "admin" } : { type: "manuel", motif: "Correction" }); setPts(null); setManuel(""); }
    catch (e) { alert("Ajustement non enregistré. Vérifiez la connexion et réessayez."); }
    setEnvoi(false);
  };
  const chercher = () => {
    const c = d.clients.find(x => x.code.toUpperCase() === saisie.toUpperCase().trim());
    if (c) { setScan(false); setSaisie(""); setPts(c); setMode("achat"); }
    else alert("Aucun client avec le code " + saisie);
  };
  const sauverClient = () => {
    if (!mc.nom?.trim()) return;
    if (!mc.id && !mc.informe) return alert("Cochez la case : le client doit avoir été informé de l'utilisation de ses données (RGPD).");
    const jour = new Date().toISOString().slice(0, 10);
    const { informe, ...fiche } = mc;
    set("clients", l => mc.id ? l.map(c => c.id === mc.id ? fiche : c) : [...l, { ...fiche, id: uid(), code: mc.code || code4(), points: mc.points || 0, depuis: jour, accord: jour }]);
    setMc(null);
  };

  const liste = d.clients.filter(c => !q || c.nom.toLowerCase().includes(q.toLowerCase()) || c.code.toLowerCase().includes(q.toLowerCase()) || (c.tel || "").includes(q));

  return (
    <div className="wrap">
      <div className="t1">Fidélité</div>
      <div className="sub">Scannez ou saisissez le code du client, puis ajoutez ses points. Les anciennes cartes papier se reprennent en ajout manuel.</div>

      <div className="seg">
        <button className={vue === "clients" ? "on" : ""} onClick={() => setVue("clients")}>Clients ({d.clients.length})</button>
        <button className={vue === "reglages" ? "on" : ""} onClick={() => setVue("reglages")}>Réglages</button>
      </div>

      {vue === "clients" && <>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button className="btn dark" onClick={() => setScan(true)}>{I.qr()}Encaisser</button>
          <button className="btn gh sm" style={{ flex: "0 0 auto", padding: "13px 16px" }} onClick={() => setMc({ nom: "", tel: "", points: 0 })}>{I.plus(16, "#5C6A62")}</button>
        </div>
        <input className="inp" placeholder="Rechercher un client…" value={q} onChange={e => setQ(e.target.value)} style={{ marginBottom: 12 }} />
        {!d.clients.length && <Vide t="Aucun client inscrit" s="Vos clients créent eux-mêmes leur carte depuis l'application. Vous pouvez aussi en ajouter un ici." />}
        <div className="grille">
        {liste.map(c => {
          const suiv = (f.paliers || []).find(p => p.at > (c.points || 0));
          const er = etatRemise(f, c.points || 0);
          return (
            <div className="card" key={c.id}><div className="row">
              <div style={{ minWidth: 0 }}>
                <div className="nm">{c.nom}</div>
                <div className="de">{c.code}{c.tel ? " · " + c.tel : ""}</div>
                <div className="de" style={{ color: "var(--gold)", fontWeight: 700 }}>
                  {er ? (er.nb > 0 ? `🎁 ${eurosFr(er.valeur)} de remise disponible` : `Encore ${er.manque} points pour ${eurosFr(er.euros)} de remise`)
                    : suiv ? `Encore ${suiv.at - (c.points || 0)} pour « ${suiv.label} »` : "Tous les paliers atteints"}
                </div>
              </div>
              <div className="rt">
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "var(--gold)", lineHeight: 1 }}>{c.points || 0}</div>
                  <div style={{ fontSize: 9, color: "var(--ink3)" }}>points</div>
                </div>
                <button className="btn sm" onClick={() => { setPts(c); setMode("achat"); setMontant(""); setManuel(""); }}>Points</button>
                <button className="ib" onClick={() => confirm("Supprimer " + c.nom + " ?") && set("clients", l => l.filter(x => x.id !== c.id))}>{I.bin()}</button>
              </div>
            </div></div>
          );
        })}
        </div>
      </>}

      {vue === "reglages" && <>
        <Conservation d={d} set={set} />
        <div className="card">
          <div className="tog"><span style={{ fontSize: 13, fontWeight: 700 }}>Programme actif<span className="de" style={{ display: "block", fontWeight: 400 }}>{f.active ? "Les clients voient leur carte et leurs points." : "Désactivé : les clients voient « La carte de fidélité arrive bientôt »."}</span></span>
            <div className="rt"><Sw on={f.active} set={() => set("fidelite", x => ({ ...x, active: !x.active }))} /></div></div>
          <label className="lab">Titre affiché</label>
          <input className="inp" value={f.titre} onChange={e => set("fidelite", x => ({ ...x, titre: e.target.value }))} />
          <label className="lab">Phrase d'explication</label>
          <input className="inp" value={f.sousTitre} onChange={e => set("fidelite", x => ({ ...x, sousTitre: e.target.value }))} />
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}><label className="lab">1 point tous les… (€)</label>
              <input className="inp" type="number" inputMode="numeric" value={f.parEuro} onChange={e => set("fidelite", x => ({ ...x, parEuro: +e.target.value || 1 }))} /></div>
            {!rmCfg && <div style={{ flex: 1 }}><label className="lab">Points sur la carte</label>
              <input className="inp" type="number" inputMode="numeric" value={f.total} onChange={e => set("fidelite", x => ({ ...x, total: +e.target.value || 10 }))} /></div>}
          </div>
        </div>
        <div className="card">
          <div className="tog" style={{ borderTop: "none", paddingTop: 0 }}>
            <div><div style={{ fontSize: 13, fontWeight: 800 }}>Remise en euros</div><div className="de">Les points se transforment en bon de réduction</div></div>
            <div className="rt"><Sw on={!!rmCfg} set={() => set("fidelite", x => ({ ...x, remise: { ...REMISE_DEF, ...(x.remise || {}), active: !(x.remise && x.remise.active !== false) } }))} /></div>
          </div>
          {rmCfg && <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}><label className="lab">Nombre de points</label>
              <input className="inp" type="number" inputMode="numeric" value={f.remise.points} onChange={e => set("fidelite", x => ({ ...x, remise: { ...x.remise, points: +e.target.value || 1 } }))} /></div>
            <div style={{ paddingBottom: 14, fontWeight: 800, color: "var(--ink3)" }}>=</div>
            <div style={{ flex: 1 }}><label className="lab">Remise (€)</label>
              <input className="inp" type="number" inputMode="decimal" step="0.5" value={f.remise.euros} onChange={e => set("fidelite", x => ({ ...x, remise: { ...x.remise, euros: e.target.value } }))} /></div>
          </div>}
          {rmCfg && <div className="apercu-prix">Exemple : 1 point par {f.parEuro || 1} € → un client qui dépense {rmCfg.points * (f.parEuro || 1)} € gagne {eurosFr(rmCfg.euros)} de remise.</div>}
        </div>
        <div className="hd" style={{ marginTop: 6 }}>
          <div style={{ fontWeight: 800, fontSize: 14 }}>Récompenses</div>
          <button className="btn gh sm" onClick={() => set("fidelite", x => ({ ...x, paliers: [...(x.paliers || []), { at: (x.paliers?.length + 1) * 5 || 5, label: "" }] }))}>Ajouter</button>
        </div>
        {!(f.paliers || []).length && <Vide t="Aucune récompense" s="Exemple : 5 points = une baguette offerte." />}
        {(f.paliers || []).map((p, i) => (
          <div className="card" key={i}><div className="row">
            <input className="inp" type="number" inputMode="numeric" style={{ width: 66, textAlign: "center", fontWeight: 800, color: "var(--gold)" }}
              value={p.at} onChange={e => set("fidelite", x => ({ ...x, paliers: x.paliers.map((y, j) => j === i ? { ...y, at: +e.target.value || 0 } : y) }))} />
            <input className="inp" style={{ flex: 1 }} placeholder="Récompense" value={p.label}
              onChange={e => set("fidelite", x => ({ ...x, paliers: x.paliers.map((y, j) => j === i ? { ...y, label: e.target.value } : y) }))} />
            <button className="ib" onClick={() => set("fidelite", x => ({ ...x, paliers: x.paliers.filter((_, j) => j !== i) }))}>{I.bin()}</button>
          </div></div>
        ))}
      </>}

      {scan && <Modal titre="Encaisser un client" onClose={() => setScan(false)}>
        <div style={{ border: "2px dashed var(--apple)", borderRadius: 14, padding: "26px 16px", textAlign: "center", background: "#fff", marginBottom: 14 }}>
          {I.qr(40, "#6E9B3A")}
          <div style={{ fontSize: 12, color: "var(--ink3)", marginTop: 8 }}>Demandez au client d'afficher son QR code, puis saisissez son code.</div>
        </div>
        <label className="lab">Code client</label>
        <input className="inp" autoFocus placeholder="RAD-0000" value={saisie} onChange={e => setSaisie(e.target.value)}
          style={{ textAlign: "center", letterSpacing: 3, fontWeight: 800, fontSize: 19, textTransform: "uppercase" }} />
        <button className="btn" style={{ marginTop: 14 }} onClick={chercher}>Rechercher</button>
      </Modal>}

      {pts && <Modal titre={pts.nom} onClose={() => setPts(null)}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: "var(--ink3)" }}>{pts.code}</div>
          <div style={{ fontSize: 40, fontWeight: 800, color: "var(--gold)", lineHeight: 1.1 }}>{d.clients.find(c => c.id === pts.id)?.points || 0}</div>
          <div style={{ fontSize: 11, color: "var(--ink3)" }}>points</div>
        </div>
        {rmCfg && (() => { const e = etatRemise(f, d.clients.find(c => c.id === pts.id)?.points || 0); return e.nb > 0
          ? <button className="btn terra" style={{ marginBottom: 12 }} disabled={envoi} onClick={appliquerRemise}>🎁 Appliquer {eurosFr(e.euros)} de remise (−{e.points} points){e.nb > 1 ? " · " + e.nb + " disponibles" : ""}</button>
          : <div className="de" style={{ textAlign: "center", marginBottom: 12 }}>Encore {e.manque} points pour {eurosFr(e.euros)} de remise</div>; })()}
          <div className="de" style={{ textAlign: "center", marginBottom: 2 }}>Saisissez les points à créditer (un nombre négatif en retire, par exemple pour corriger une erreur ou reprendre une carte papier).</div>
          <label className="lab">Points</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="btn gh sm" style={{ width: 46 }} onClick={() => setManuel(String((parseInt(manuel) || 0) - 1))}>−</button>
            <input className="inp" type="number" inputMode="numeric" value={manuel} onChange={e => setManuel(e.target.value)}
              style={{ textAlign: "center", fontSize: 22, fontWeight: 800, color: "var(--apple)" }} />
            <button className="btn sm" style={{ width: 46 }} onClick={() => setManuel(String((parseInt(manuel) || 0) + 1))}>+</button>
          </div>
          {!!parseInt(manuel) && <div className="card" style={{ textAlign: "center", marginTop: 12 }}>
            <div style={{ fontSize: 11, color: "var(--ink3)" }}>Nouveau total</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: "var(--apple)" }}>{Math.max(0, (d.clients.find(c => c.id === pts.id)?.points || 0) + parseInt(manuel))}</div>
          </div>}
          <button className="btn" style={{ marginTop: 14 }} disabled={!parseInt(manuel) || envoi} onClick={validerManuel}>{parseInt(manuel) < 0 ? "Retirer " + (-parseInt(manuel)) + " points" : "Créditer " + (parseInt(manuel) || "") + " points"}</button>
      </Modal>}

      {mc && <Modal titre={mc.id ? "Modifier le client" : "Nouveau client"} onClose={() => setMc(null)}>
        <label className="lab">Nom</label>
        <input className="inp" autoFocus value={mc.nom} onChange={e => setMc({ ...mc, nom: e.target.value })} />
        <label className="lab">Téléphone</label>
        <input className="inp" type="tel" value={mc.tel} onChange={e => setMc({ ...mc, tel: e.target.value })} />
        <label className="lab">Points de départ</label>
        <input className="inp" type="number" inputMode="numeric" value={mc.points} onChange={e => setMc({ ...mc, points: +e.target.value || 0 })} />
        {!mc.id && <label style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: 14, fontSize: 12.5, lineHeight: 1.45, cursor: "pointer" }}>
          <input type="checkbox" checked={!!mc.informe} onChange={e => setMc({ ...mc, informe: e.target.checked })} style={{ width: 20, height: 20, flexShrink: 0, accentColor: "#6E9B3A" }} />
          <span>Le client a été informé que son nom et son téléphone servent uniquement à sa carte de fidélité, et qu'il peut les faire supprimer à tout moment.</span>
        </label>}
        <button className="btn" style={{ marginTop: 14 }} onClick={sauverClient}>Enregistrer</button>
      </Modal>}
    </div>
  );
}

// ═══════════ RGPD ═══════════
const activite = (c) => c.derniere || c.depuis || "";
function Conservation({ d, set }) {
  const ans = d.legal?.conservation || 3;
  const limite = new Date(); limite.setFullYear(limite.getFullYear() - ans);
  const lim = limite.toISOString().slice(0, 10);
  const inactifs = d.clients.filter(c => activite(c) && activite(c) < lim);
  return (
    <div className="card" style={{ background: "#F6F9EF", borderColor: "#D9E6C2" }}>
      <div className="nm">Durée de conservation (RGPD)</div>
      <div className="de" style={{ marginBottom: 10 }}>Les cartes sans aucun passage en caisse depuis {ans} ans doivent être supprimées.</div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <label className="lab" style={{ margin: 0 }}>Conserver</label>
        <select className="inp" style={{ width: "auto" }} value={ans} onChange={e => set("legal", x => ({ ...x, conservation: +e.target.value }))}>
          {[1, 2, 3].map(n => <option key={n} value={n}>{n} an{n > 1 ? "s" : ""}</option>)}
        </select>
        <span style={{ fontSize: 12, color: "var(--ink3)" }}>après le dernier passage</span>
      </div>
      <div style={{ marginTop: 12, fontSize: 13, fontWeight: 700 }}>
        {inactifs.length ? inactifs.length + " carte" + (inactifs.length > 1 ? "s" : "") + " inactive" + (inactifs.length > 1 ? "s" : "") + " à supprimer" : "Aucune carte à supprimer ✓"}
      </div>
      {!!inactifs.length && <button className="btn sm" style={{ marginTop: 8, background: "var(--red)" }}
        onClick={() => confirm("Supprimer " + inactifs.length + " carte(s) inactive(s) et leur historique ?\n\n" + inactifs.slice(0, 8).map(c => "• " + c.nom).join("\n") + (inactifs.length > 8 ? "\n…" : "")) &&
          set("clients", l => l.filter(c => !inactifs.some(x => x.id === c.id)))}>Supprimer les cartes inactives</button>}
    </div>
  );
}

function InfosLegales({ d, set }) {
  const L = Object.fromEntries(Object.entries({ ...EMPTY.legal, ...(d.legal || {}) }).map(([k, v]) => [k, v === "" || v == null ? EMPTY.legal[k] : v]));
  const maj = (k, v) => set("legal", x => ({ ...EMPTY.legal, ...(x || {}), [k]: v }));
  const champ = (k, lab, ph) => <><label className="lab">{lab}</label><input className="inp" value={L[k] || ""} placeholder={ph} onChange={e => maj(k, e.target.value)} /></>;
  return (
    <>
      <div style={{ fontWeight: 800, fontSize: 14, margin: "18px 0 4px" }}>Informations légales</div>
      <div className="sub" style={{ margin: "0 0 8px" }}>Affichées dans « Mentions légales » et « Confidentialité » de l'application (onglet Infos).</div>
      <div className="card">
        {champ("raison", "Raison sociale", "LTMP")}
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>{champ("forme", "Forme juridique", "SARL")}</div>
          <div style={{ flex: 1 }}>{champ("capital", "Capital social (€)", "3 000")}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>{champ("siren", "SIREN", "979 301 132")}</div>
          <div style={{ flex: 1 }}>{champ("rcs", "RCS", "RCS Vesoul")}</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}>{champ("tva", "N° TVA intracommunautaire", "FR00979301132")}</div>
          <div style={{ flex: 1 }}>{champ("naf", "Activité (code NAF)", "47.11B")}</div>
        </div>
        {champ("responsable", "Responsable / directrice de publication", "Marion Parnaso")}
        {champ("emailDonnees", "E-mail pour les demandes RGPD", d.store.email)}
        {champ("hebergementDonnees", "Lieu d'hébergement des données", "Union européenne")}
        <div className="de" style={{ marginTop: 6 }}>Pré-rempli avec les données officielles de la société (registre du commerce). Vérifiez et corrigez si besoin.</div>
      </div>
    </>
  );
}

// ═══════════ RÉGLAGES BOUTIQUE ═══════════
function Reglages({ d, set, reinitialiser }) {
  const [ms, setMs] = useState(null);
  const s = d.store;
  const maj = (k, v) => set("store", x => ({ ...x, [k]: v }));
  const exporter = () => {
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "epicerie-raddonnaise-sauvegarde.json";
    a.click();
  };
  return (
    <div className="wrap">
      <div className="t1">L'épicerie</div>
      <div className="sub">Coordonnées, horaires et services affichés dans l'onglet Infos (les services n'apparaissent plus sur l'accueil).</div>

      <div className="card">
        <label className="lab">Nom</label><input className="inp" value={s.name} onChange={e => maj("name", e.target.value)} />
        <label className="lab">Slogan</label><input className="inp" value={s.slogan} onChange={e => maj("slogan", e.target.value)} />
        <label className="lab">Adresse</label><input className="inp" value={s.address} onChange={e => maj("address", e.target.value)} />
        <label className="lab">Téléphone</label><input className="inp" type="tel" value={s.phone} onChange={e => maj("phone", e.target.value)} />
        <label className="lab">E-mail</label><input className="inp" type="email" value={s.email} onChange={e => maj("email", e.target.value)} />
        <label className="lab">Page Facebook</label><input className="inp" value={s.facebook} placeholder="https://facebook.com/…" onChange={e => maj("facebook", e.target.value)} />
      </div>

      <Fermetures d={d} set={set} />
      <InfosLegales d={d} set={set} />

      <div style={{ fontWeight: 800, fontSize: 14, margin: "16px 0 8px" }}>Horaires</div>
      <div className="card">
        {d.hours.map((h, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "78px 1fr 1fr", gap: 7, alignItems: "center", padding: "6px 0", borderBottom: i < 6 ? "1px solid var(--line)" : "none" }}>
            <span style={{ fontSize: 12.5, fontWeight: 700 }}>{h.day}</span>
            <input className="inp" style={{ padding: "8px 9px", fontSize: 12.5 }} value={h.am} placeholder="Fermé"
              onChange={e => set("hours", l => l.map((x, j) => j === i ? { ...x, am: e.target.value } : x))} />
            <input className="inp" style={{ padding: "8px 9px", fontSize: 12.5 }} value={h.pm} placeholder="—"
              onChange={e => set("hours", l => l.map((x, j) => j === i ? { ...x, pm: e.target.value } : x))} />
          </div>
        ))}
      </div>

      <div className="hd" style={{ marginTop: 18 }}>
        <div style={{ fontWeight: 800, fontSize: 14 }}>Services</div>
        <button className="btn gh sm" onClick={() => setMs({ label: "", desc: "", active: true })}>Ajouter</button>
      </div>
      {!d.services.length && <Vide t="Aucun service" s="Ex : Dépôt de pain, Relais Pickup, Station-service, Plats à emporter, Droguerie." />}
      <div className="grille">
      {d.services.map(sv => (
        <div className="card" key={sv.id}><div className="row">
          <div><div className="nm">{sv.label}</div>{sv.desc && <div className="de">{sv.desc}</div>}</div>
          <div className="rt">
            <Sw on={sv.active !== false} set={() => set("services", l => l.map(x => x.id === sv.id ? { ...x, active: x.active === false } : x))} />
            <button className="ib" onClick={() => setMs(sv)}>{I.pen()}</button>
            <button className="ib" onClick={() => set("services", l => l.filter(x => x.id !== sv.id))}>{I.bin()}</button>
          </div>
        </div></div>
      ))}
      </div>

      <div style={{ fontWeight: 800, fontSize: 14, margin: "18px 0 8px" }}>Application</div>
      <BoutonMaj />

      <div style={{ fontWeight: 800, fontSize: 14, margin: "18px 0 8px" }}>Sauvegarde</div>
      <div style={{ fontSize: 11.5, color: "#9A5A28", background: "#FDF6EE", border: "1px solid #EFDCC6", borderRadius: 10, padding: "9px 12px", lineHeight: 1.45, marginBottom: 8 }}>
        La sauvegarde contient les noms et téléphones des clients : conservez-la en lieu sûr, ne l'envoyez pas par e-mail.</div>
      <button className="btn gh" onClick={exporter}>Télécharger une sauvegarde</button>
      <button className="btn gh" style={{ marginTop: 8, color: "var(--red)" }}
        onClick={() => confirm("Effacer tout le contenu affiché aux clients (articles du jour, offres, actualités, réglages) ?\n\nLes cartes de fidélité des clients sont conservées.") && reinitialiser()}>Réinitialiser le contenu</button>

      {ms && <Modal titre={ms.id ? "Modifier le service" : "Nouveau service"} onClose={() => setMs(null)}>
        <label className="lab">Nom</label>
        <input className="inp" autoFocus value={ms.label} onChange={e => setMs({ ...ms, label: e.target.value })} placeholder="Relais Pickup" />
        <label className="lab">Précision (facultatif)</label>
        <input className="inp" value={ms.desc} onChange={e => setMs({ ...ms, desc: e.target.value })} placeholder="Retrait et dépôt de colis" />
        <button className="btn" style={{ marginTop: 14 }} onClick={() => {
          if (!ms.label.trim()) return;
          set("services", l => ms.id ? l.map(x => x.id === ms.id ? ms : x) : [...l, { ...ms, id: uid() }]);
          setMs(null);
        }}>Enregistrer</button>
      </Modal>}
    </div>
  );
}

// ═══════════ CONNEXION ═══════════
const msgErreur = (e) => ({
  "auth/invalid-credential": "E-mail ou mot de passe incorrect.",
  "auth/wrong-password": "E-mail ou mot de passe incorrect.",
  "auth/user-not-found": "E-mail ou mot de passe incorrect.",
  "auth/invalid-email": "Adresse e-mail invalide.",
  "auth/too-many-requests": "Trop de tentatives. Patientez quelques minutes.",
  "auth/network-request-failed": "Pas de connexion internet.",
}[e?.code] || "Connexion impossible. Réessayez.");

function Connexion() {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [err, setErr] = useState("");
  const [info, setInfo] = useState("");
  const [load, setLoad] = useState(false);
  const go = async () => {
    if (!email.trim() || !mdp || load) return;
    setErr(""); setInfo(""); setLoad(true);
    try { await signInWithEmailAndPassword(auth, email.trim(), mdp); }
    catch (e) { setErr(msgErreur(e)); setLoad(false); }
  };
  const oubli = async () => {
    setErr(""); setInfo("");
    if (!email.trim()) return setErr("Saisissez d'abord votre adresse e-mail.");
    try { await sendPasswordResetEmail(auth, email.trim()); setInfo("Si ce compte existe, un e-mail de réinitialisation vient d'être envoyé."); }
    catch (e) { setErr(msgErreur(e)); }
  };
  return (
    <div className="adm"><style>{CSS}</style>
      <div className="wrap" style={{ paddingTop: 48 }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <img src={LOGO} alt="" style={{ width: 92, height: 92, borderRadius: "50%", border: "3px solid #EEF3E2" }} />
          <div className="t1" style={{ marginTop: 12 }}>Administration</div>
          <div style={{ fontSize: 12.5, color: "var(--ink3)", marginTop: 6 }}>Épicerie Raddonnaise — accès réservé · v{VERSION}</div>
        </div>
        <label className="lab">E-mail</label>
        <input className="inp" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} />
        <label className="lab">Mot de passe</label>
        <input className="inp" type="password" autoComplete="current-password" value={mdp}
          onChange={e => setMdp(e.target.value)} onKeyDown={e => e.key === "Enter" && go()} />
        {err && <div style={{ color: "var(--red)", fontSize: 12.5, fontWeight: 700, marginTop: 10 }}>{err}</div>}
        {info && <div style={{ color: "var(--apple)", fontSize: 12.5, fontWeight: 700, marginTop: 10 }}>{info}</div>}
        <button className="btn" style={{ marginTop: 16 }} disabled={load || !email.trim() || !mdp} onClick={go}>{load ? "Connexion…" : "Se connecter"}</button>
        <button className="btn gh" style={{ marginTop: 8 }} onClick={oubli}>Mot de passe oublié</button>
      </div>
    </div>
  );
}

const Attente = ({ t }) => (
  <div className="adm"><style>{CSS}</style>
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink3)", fontSize: 13, fontWeight: 700 }}>{t}</div>
  </div>
);

// ═══════════ APP ═══════════
function Admin() {
  const [user, setUser] = useState(undefined);
  useEffect(() => onAuthStateChanged(auth, u => setUser(u || null)), []);
  const maj = useMiseAJour();
  const [d, set, reinitialiser, etat] = useShop(!!user);
  const [tab, setTab] = useState("accueil");
  useEffect(() => {
    if (etat.pret && user && !d.fidelite?.migreRemise) set("fidelite", x => ({ ...x, parEuro: 1, remise: { ...REMISE_DEF }, sousTitre: "1 € dépensé = 1 point · 200 points = 5 € de remise", migreRemise: true }));
    // oct. 2026 : fidélité mise en pause (« bientôt disponible » côté clients), réactivable dans Fidélité → Réglages
    if (etat.pret && user && !d.fidelite?.migreBientot) set("fidelite", x => ({ ...x, active: false, migreBientot: true }));
  }, [etat.pret, !!user]);
  if (user === undefined) return <Attente t="Chargement…" />;
  if (!user) return <Connexion />;
  if (etat.erreur === "permission-denied") return <Attente t="Accès refusé : ce compte n'a pas les droits d'administration." />;
  if (!etat.pret) return <Attente t="Synchronisation…" />;
  const nav = [
    { id: "accueil", label: "Accueil", ic: I.home },
    { id: "jour", label: "Aujourd'hui", ic: I.shop, n: d.resas.filter(r => r.statut === "reservee").length },
    { id: "commandes", label: "Commandes", ic: I.cmd, n: d.commandes.filter(c => c.statut === "nouvelle").length },
    { id: "messages", label: "Messages", ic: I.bulle, n: d.conversations.filter(c => c.attente).length },
    { id: "offres", label: "Offres", ic: I.basket },
    { id: "pubs", label: "Pubs", ic: I.img },
    { id: "themes", label: "Thèmes", ic: I.sapin },
    { id: "actus", label: "Actus", ic: I.news },
    { id: "fidelite", label: "Fidélité", ic: I.star },
    { id: "reglages", label: "Réglages", ic: I.gear },
  ];
  return (
    <div className="adm main">
      <style>{CSS}</style>
      <header className="top">
        <img src={LOGO} alt="" />
        <div><h1>Administration</h1><small>Épicerie Raddonnaise · v{VERSION}</small></div>
        <button onClick={() => confirm("Se déconnecter ?") && signOut(auth)}
          style={{ marginLeft: "auto", background: "rgba(255,255,255,.14)", border: "none", color: "#fff", fontFamily: "var(--body)", fontSize: 10.5, fontWeight: 800, padding: "6px 11px", borderRadius: 20, cursor: "pointer" }}>Déconnexion</button>
      </header>
      {tab === "accueil" && <Accueil d={d} set={set} />}
      {tab === "jour" && <Jour d={d} set={set} />}
      {tab === "commandes" && <Commandes d={d} set={set} />}
      {tab === "messages" && <Messages d={d} set={set} />}
      {tab === "offres" && <Offres d={d} set={set} />}
      {tab === "pubs" && <Pubs d={d} set={set} />}
      {tab === "themes" && <Themes d={d} set={set} />}
      {tab === "actus" && <Actus d={d} set={set} />}
      {tab === "fidelite" && <Fidelite d={d} set={set} />}
      {tab === "reglages" && <Reglages d={d} set={set} reinitialiser={reinitialiser} />}
      <BandeauMaj dispo={maj} />
      <nav className="tabs">
        {nav.map(n => (
          <button key={n.id} className={"tab" + (tab === n.id ? " on" : "")}
            onClick={() => { setTab(n.id); window.scrollTo(0, 0); }}>
            <span className="tab-ic">{n.ic(20, tab === n.id ? "#1C433B" : "#93A099")}{!!n.n && <b className="tab-n">{n.n}</b>}</span>{n.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Admin />);
