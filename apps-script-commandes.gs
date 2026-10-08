// ═══════════════════════════════════════════════════════════
//  Épicerie Raddonnaise — e-mail « Nouvelle commande »
//  Installé sur le compte Google d'Eric ; les e-mails partent vers Marion (DEST).
//  Déployer : Application Web · Exécuter en tant que : Moi · Accès : Tout le monde
//
//  Sécurité : l'application n'envoie que l'identifiant de la commande.
//  Le script relit la commande dans Firebase, vérifie qu'elle est récente
//  et toute neuve, et n'envoie qu'UN seul e-mail par commande.
//  Il n'écrit qu'à Marion (adresse fixée ci-dessous, jamais transmise par l'appli).
//  Prévient aussi Marion des nouveaux messages de clients (?msg=…), 1 e-mail max / 10 min par conversation.
//
//  Notifications sur les téléphones des clients (?push=cmd|msg|diff&id=…) et sauvegarde
//  hebdomadaire dans Google Drive : passent par un « compte de service » Firebase dont la clé
//  est rangée dans Paramètres du projet → Propriétés du script → SA_JSON (jamais dans le code).
// ═══════════════════════════════════════════════════════════
const PROJET = "application-famille-897df";
const CLE_API = "AIzaSyCRvvyP7yCOSj2u4WDFCDvBWnGix0Ck-os";   // clé publique Firebase (pas un secret)
const ADMIN = "https://rikou3170-lab.github.io/epicerie_radonnaise/admin.html";
const DEST = "marion.parnaso@hotmail.fr";   // qui reçoit les commandes

function doGet(e) {
  const p = (e && e.parameter) || {};
  try {
    if (p.test) return reponse_(test_());
    if (p.msg) return reponse_(nouveauMessage_(p.msg));
    if (p.resa) return reponse_(nouvelleResa_(p.resa));
    if (p.push) return reponse_(push_(p.push, p.id));
    if (!/^[A-Za-z0-9]{15,40}$/.test(p.id || "")) return reponse_("id-invalide");
    const verrou = LockService.getScriptLock();
    verrou.waitLock(10000);
    try {
      const props = PropertiesService.getScriptProperties();
      if (props.getProperty("envoye_" + p.id)) return reponse_("deja-envoye");
      const c = lireCommande_(p.id);
      if (!c) return reponse_("introuvable");
      if (c.statut !== "nouvelle" || Date.now() - Number(c.cree || 0) > 30 * 60 * 1000) return reponse_("trop-ancienne");
      envoyer_(c, false);
      props.setProperty("envoye_" + p.id, String(Date.now()));
      return reponse_("ok");
    } finally { verrou.releaseLock(); }
  } catch (err) {
    return reponse_("erreur: " + err.message);
  }
}

// Bouton « Envoyer un e-mail de test » de l'admin (1 par minute maximum)
function test_() {
  const cache = CacheService.getScriptCache();
  if (cache.get("test")) return "attendre";
  cache.put("test", "1", 60);
  const demain = new Date(Date.now() + 2 * 864e5);
  envoyer_({
    numero: "C-TEST", nom: "Client test", tel: "06 00 00 00 00", mode: "retrait", adresse: "",
    date: Utilities.formatDate(demain, "Europe/Paris", "yyyy-MM-dd"), remarque: "Ceci est un essai depuis l'administration.",
    lignes: [{ nom: "Plateau charcuterie", personnes: 6, prixPersonne: 8.5, montant: 51 }], total: 51,
  }, true);
  return "ok";
}

// Lecture de la commande dans Firestore (lecture publique par identifiant, autorisée par les règles)
function lireCommande_(id) { return lireDoc_("/commandes/" + id); }

// ── Accès à Firebase ──
// Avec le compte de service (SA_JSON) : accès complet, la clé publique peut alors être restreinte.
// Sans : lecture publique par identifiant, avec la clé publique (comme avant).
const BASE = "https://firestore.googleapis.com/v1/projects/" + PROJET + "/databases/(default)/documents";
function aCompteService_() { return !!PropertiesService.getScriptProperties().getProperty("SA_JSON"); }
function fs_(chemin, methode, corps) {
  const o = { method: methode || "get", muteHttpExceptions: true };
  let url = BASE + chemin;
  if (aCompteService_()) o.headers = { Authorization: "Bearer " + jetonService_() };
  else url += (url.indexOf("?") < 0 ? "?" : "&") + "key=" + CLE_API;
  if (corps) { o.contentType = "application/json"; o.payload = JSON.stringify(corps); }
  const r = UrlFetchApp.fetch(url, o);
  const t = r.getContentText();
  return { code: r.getResponseCode(), json: t ? JSON.parse(t) : {} };
}
function lireDoc_(chemin) {
  const r = fs_(chemin);
  return r.code === 200 ? valeur_({ mapValue: { fields: r.json.fields || {} } }) : null;
}
function listerDocs_(chemin) {
  let tous = [], page = "";
  do {
    const r = fs_(chemin + "?pageSize=300" + (page ? "&pageToken=" + encodeURIComponent(page) : ""));
    if (r.code !== 200) break;
    tous = tous.concat(r.json.documents || []);
    page = r.json.nextPageToken || "";
  } while (page);
  return tous;
}
function requete_(structuredQuery) {
  const r = fs_(":runQuery", "post", { structuredQuery: structuredQuery });
  return r.code === 200 ? (r.json || []).filter(x => x.document).map(x => x.document) : [];
}
const idDe_ = (d) => String(d.name).split("/").pop();

// Jeton d'accès du compte de service (valable 1 h, gardé 50 min en cache)
function jetonService_() {
  const cache = CacheService.getScriptCache();
  const deja = cache.get("jeton_sa"); if (deja) return deja;
  const sa = JSON.parse(PropertiesService.getScriptProperties().getProperty("SA_JSON"));
  const b64 = (x) => Utilities.base64EncodeWebSafe(x).replace(/=+$/, "");
  const now = Math.floor(Date.now() / 1000);
  const tete = b64(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const corps = b64(JSON.stringify({
    iss: sa.client_email, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600,
    scope: "https://www.googleapis.com/auth/datastore https://www.googleapis.com/auth/firebase.messaging",
  }));
  const signature = b64(Utilities.computeRsaSha256Signature(tete + "." + corps, sa.private_key));
  const r = UrlFetchApp.fetch("https://oauth2.googleapis.com/token", { method: "post", muteHttpExceptions: true,
    payload: { grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: tete + "." + corps + "." + signature } });
  if (r.getResponseCode() !== 200) throw new Error("compte de service refusé : " + r.getContentText().slice(0, 200));
  const jeton = JSON.parse(r.getContentText()).access_token;
  cache.put("jeton_sa", jeton, 3000);
  return jeton;
}
function valeur_(v) {
  if (!v) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return Number(v.doubleValue);
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(valeur_);
  if ("mapValue" in v) { const o = {}; const f = v.mapValue.fields || {}; Object.keys(f).forEach(k => o[k] = valeur_(f[k])); return o; }
  return null;
}

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
function dateFr_(iso) { const d = new Date(iso + "T12:00:00"); return JOURS[d.getDay()] + " " + d.getDate() + " " + MOIS[d.getMonth()]; }
function euros_(n) { return (Math.round(Number(n || 0) * 100) / 100).toFixed(2).replace(".", ",") + " €"; }
function html_(t) { return String(t == null ? "" : t).replace(/[&<>"]/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[m])); }

function envoyer_(c, test) {
  const mode = c.mode === "livraison" ? "Livraison" : "Retrait à l'épicerie";
  const lignes = (c.lignes || []).map(l => "• " + l.nom + " — " + l.personnes + " pers. × " + euros_(l.prixPersonne) + " = " + euros_(l.montant));
  const sujet = (test ? "[TEST] " : "") + "Nouvelle commande " + c.numero + " — " + mode.toLowerCase() + " le " + dateFr_(c.date);
  const texte = [
    "Nouvelle commande " + c.numero, "",
    "Client : " + c.nom + " — " + c.tel,
    mode + " souhaité le " + dateFr_(c.date),
    c.adresse ? "Adresse : " + c.adresse : "", "",
    lignes.join("\n"), "",
    "Total : " + euros_(c.total),
    c.remarque ? "Remarque : " + c.remarque : "", "",
    "À accepter ou refuser ici : " + ADMIN,
  ].filter((l, i, a) => l !== "" || a[i - 1] !== "").join("\n");
  const htmlBody =
    '<div style="font-family:Arial,sans-serif;max-width:520px;color:#22302A">' +
    '<div style="background:#1C433B;color:#fff;padding:14px 18px;border-radius:12px 12px 0 0;font-size:18px"><b>Nouvelle commande ' + html_(c.numero) + '</b>' + (test ? " (test)" : "") + '</div>' +
    '<div style="border:1px solid #E6E0D2;border-top:none;padding:16px 18px;border-radius:0 0 12px 12px">' +
    '<p style="margin:0 0 4px;font-size:16px"><b>' + html_(c.nom) + '</b> — <a href="tel:' + html_(String(c.tel).replace(/\s/g, "")) + '">' + html_(c.tel) + '</a></p>' +
    '<p style="margin:0 0 12px;color:#5C6A62">' + mode + ' souhaité le <b>' + dateFr_(c.date) + '</b>' + (c.adresse ? '<br>📍 ' + html_(c.adresse) : '') + '</p>' +
    '<table style="width:100%;border-collapse:collapse;font-size:14px">' +
    (c.lignes || []).map(l => '<tr><td style="padding:6px 0;border-bottom:1px solid #eee">' + html_(l.nom) + ' — <b>' + l.personnes + ' pers.</b> × ' + euros_(l.prixPersonne) + '</td><td style="text-align:right;border-bottom:1px solid #eee"><b>' + euros_(l.montant) + '</b></td></tr>').join("") +
    '<tr><td style="padding:8px 0;font-size:16px"><b>Total</b></td><td style="text-align:right;font-size:16px;color:#1C433B"><b>' + euros_(c.total) + '</b></td></tr></table>' +
    (c.remarque ? '<p style="font-style:italic;color:#5C6A62">« ' + html_(c.remarque) + ' »</p>' : '') +
    '<p style="margin:16px 0 0"><a href="' + ADMIN + '" style="background:#6E9B3A;color:#fff;text-decoration:none;padding:11px 18px;border-radius:10px;display:inline-block;font-weight:bold">Accepter ou refuser la commande</a></p>' +
    '</div></div>';
  MailApp.sendEmail({ to: DEST, replyTo: DEST, subject: sujet, body: texte, htmlBody: htmlBody, name: "Appli Épicerie Raddonnaise" });
}

// ── Nouveau message d'un client (messagerie de l'application) ──
// Le script relit la conversation dans Firebase ; au plus 1 e-mail par conversation toutes les 10 minutes.
function nouveauMessage_(id) {
  if (!/^[A-Za-z0-9]{15,40}$/.test(id || "")) return "id-invalide";
  const verrou = LockService.getScriptLock();
  verrou.waitLock(10000);
  try {
    const props = PropertiesService.getScriptProperties();
    const deja = Number(props.getProperty("msg_" + id) || 0);
    if (Date.now() - deja < 10 * 60 * 1000) return "deja-prevenu";
    const conv = lireDoc_("/conversations/" + id);
    if (!conv) return "introuvable";
    const msgs = listerDocs_("/conversations/" + id + "/messages").map(d => valeur_({ mapValue: { fields: d.fields || {} } })).filter(m => m && m.date).sort((a, b) => a.date - b.date);
    const recents = msgs.filter(m => m.de === "client" && Date.now() - m.date < 15 * 60 * 1000 && m.date > deja);
    if (!recents.length) return "rien-de-nouveau";
    const texte = recents.map(m => "« " + m.texte + " »").join("\n");
    const htmlBody =
      '<div style="font-family:Arial,sans-serif;max-width:520px;color:#22302A">' +
      '<div style="background:#C27B42;color:#fff;padding:14px 18px;border-radius:12px 12px 0 0;font-size:18px"><b>💬 Message de ' + html_(conv.nom) + '</b></div>' +
      '<div style="border:1px solid #E6E0D2;border-top:none;padding:16px 18px;border-radius:0 0 12px 12px">' +
      recents.map(m => '<p style="background:#F2EDE2;border-radius:12px;padding:10px 12px;margin:0 0 8px;white-space:pre-wrap">' + html_(m.texte) + '</p>').join("") +
      (conv.tel ? '<p style="color:#5C6A62;margin:6px 0">Téléphone : <a href="tel:' + html_(String(conv.tel).replace(/\s/g, "")) + '">' + html_(conv.tel) + '</a></p>' : '') +
      '<p style="margin:14px 0 0"><a href="' + ADMIN + '" style="background:#6E9B3A;color:#fff;text-decoration:none;padding:11px 18px;border-radius:10px;display:inline-block;font-weight:bold">Répondre dans l\'application</a></p>' +
      '</div></div>';
    MailApp.sendEmail({ to: DEST, replyTo: DEST, subject: "💬 Nouveau message de " + conv.nom, body: "Message de " + conv.nom + " :\n\n" + texte + "\n\nRépondre : " + ADMIN, htmlBody: htmlBody, name: "Appli Épicerie Raddonnaise" });
    props.setProperty("msg_" + id, String(Date.now()));
    return "ok";
  } finally { verrou.releaseLock(); }
}

// ── Nouvelle réservation anti-gaspi (promo, date courte, panier) ──
function nouvelleResa_(id) {
  if (!/^[A-Za-z0-9]{15,40}$/.test(id || "")) return "id-invalide";
  const verrou = LockService.getScriptLock();
  verrou.waitLock(10000);
  try {
    const props = PropertiesService.getScriptProperties();
    if (props.getProperty("resa_" + id)) return "deja-envoye";
    const r = lireDoc_("/resas/" + id);
    if (!r) return "introuvable";
    if (r.statut !== "reservee" || Date.now() - Number(r.cree || 0) > 30 * 60 * 1000) return "trop-ancienne";
    const htmlBody =
      '<div style="font-family:Arial,sans-serif;max-width:520px;color:#22302A">' +
      '<div style="background:#2E7D32;color:#fff;padding:14px 18px;border-radius:12px 12px 0 0;font-size:18px"><b>🧺 Réservation ' + html_(r.numero) + '</b></div>' +
      '<div style="border:1px solid #E6E0D2;border-top:none;padding:16px 18px;border-radius:0 0 12px 12px">' +
      '<p style="font-size:17px;margin:0 0 8px"><b>' + html_(r.qte) + ' × ' + html_(r.titre) + '</b>' + (r.total ? ' — ' + euros_(r.total) : '') + '</p>' +
      '<p style="margin:0 0 6px">' + html_(r.nom) + (r.tel ? ' — <a href="tel:' + html_(String(r.tel).replace(/\s/g, "")) + '">' + html_(r.tel) + '</a>' : '') + '</p>' +
      '<p style="color:#5C6A62;margin:0">À retirer ' + html_(r.retrait || "à l'épicerie") + '</p>' +
      '<p style="margin:14px 0 0"><a href="' + ADMIN + '" style="background:#6E9B3A;color:#fff;text-decoration:none;padding:11px 18px;border-radius:10px;display:inline-block;font-weight:bold">Voir les réservations</a></p>' +
      '</div></div>';
    MailApp.sendEmail({ to: DEST, replyTo: DEST, subject: "🧺 Réservation : " + r.qte + " × " + r.titre + " (" + r.nom + ")",
      body: r.qte + " × " + r.titre + "\n" + r.nom + (r.tel ? " — " + r.tel : "") + "\nÀ retirer " + (r.retrait || "à l'épicerie") + "\n\n" + ADMIN, htmlBody: htmlBody, name: "Appli Épicerie Raddonnaise" });
    props.setProperty("resa_" + id, String(Date.now()));
    return "ok";
  } finally { verrou.releaseLock(); }
}

function reponse_(r) {
  return ContentService.createTextOutput(JSON.stringify({ r: r })).setMimeType(ContentService.MimeType.JSON);
}

// ═══════════ NOTIFICATIONS SUR LES TÉLÉPHONES DES CLIENTS ═══════════
// L'administration n'envoie qu'un identifiant. Le script relit tout dans Firebase, décide s'il y a
// vraiment quelque chose à dire, et ne l'envoie qu'une fois (impossible de spammer les clients).
const APPLI = "https://rikou3170-lab.github.io/epicerie_radonnaise/";
function push_(type, id) {
  if (!aCompteService_()) return "pas-de-compte-de-service";
  if (!/^[A-Za-z0-9]{15,40}$/.test(id || "")) return "id-invalide";
  const verrou = LockService.getScriptLock();
  verrou.waitLock(15000);
  try {
    if (type === "cmd") return pushCommande_(id);
    if (type === "msg") return pushMessage_(id);
    if (type === "diff") return pushDiffusion_(id);
    return "type-invalide";
  } finally { verrou.releaseLock(); }
}
function heure_(h) { return h ? String(h).replace(":", "h") : ""; }

function pushCommande_(id) {
  const c = lireDoc_("/commandes/" + id);
  if (!c) return "introuvable";
  const props = PropertiesService.getScriptProperties();
  const cle = "pc_" + id + "_" + c.statut;
  if (props.getProperty(cle)) return "deja-envoye";
  const jour = c.dateRetrait || c.date;
  const hier = Utilities.formatDate(new Date(Date.now() - 2 * 864e5), "Europe/Paris", "yyyy-MM-dd");
  if (!jour || jour < hier) return "trop-ancienne";
  const quand = dateFr_(jour) + (c.heure ? " à " + heure_(c.heure) : "");
  let titre, texte;
  if (c.statut === "acceptee") { titre = "✅ Commande " + c.numero + " validée"; texte = "À retirer le " + quand + (c.message ? " — " + c.message : ""); }
  else if (c.statut === "refusee") { titre = "Commande " + c.numero + " non acceptée"; texte = c.message || "Contactez l'épicerie pour en savoir plus."; }
  else if (c.statut === "prete") { titre = "🧺 Votre commande est prête !"; texte = "Commande " + c.numero + " — vous pouvez venir la chercher" + (c.heure ? " (prévu à " + heure_(c.heure) + ")" : "") + "."; }
  else return "rien-a-dire";
  props.setProperty(cle, String(Date.now()));
  const app = requete_({ from: [{ collectionId: "appareils" }], where: { fieldFilter: { field: { fieldPath: "refs" }, op: "ARRAY_CONTAINS", value: { stringValue: id } } } });
  return "ok:" + envoyerPush_(app, { titre: titre, texte: texte, tag: "cmd-" + id });
}

function pushMessage_(id) {
  const msgs = listerDocs_("/conversations/" + id + "/messages").map(d => valeur_({ mapValue: { fields: d.fields || {} } }))
    .filter(m => m && m.date).sort((a, b) => a.date - b.date);
  const m = msgs[msgs.length - 1];
  if (!m || m.de !== "epicerie" || Date.now() - m.date > 30 * 60 * 1000) return "rien-de-nouveau";
  const props = PropertiesService.getScriptProperties();
  if (Number(props.getProperty("pm_" + id) || 0) >= m.date) return "deja-envoye";
  props.setProperty("pm_" + id, String(m.date));
  const t = String(m.texte || "").replace(/\s+/g, " ").trim();
  const app = requete_({ from: [{ collectionId: "appareils" }], where: { fieldFilter: { field: { fieldPath: "refs" }, op: "ARRAY_CONTAINS", value: { stringValue: id } } } });
  return "ok:" + envoyerPush_(app, { titre: "💬 L'épicerie vous a répondu", texte: t.length > 120 ? t.slice(0, 118) + "…" : t, tag: "msg" });
}

function pushDiffusion_(id) {
  const x = lireDoc_("/diffusions/" + id);
  if (!x) return "introuvable";
  if (Date.now() - Number(x.cree || 0) > 30 * 60 * 1000) return "trop-ancienne";
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty("pd_" + id)) return "deja-envoye";
  props.setProperty("pd_" + id, String(Date.now()));
  const app = requete_({ from: [{ collectionId: "appareils" }], where: { fieldFilter: { field: { fieldPath: "promo" }, op: "EQUAL", value: { booleanValue: true } } } });
  const n = envoyerPush_(app, { titre: String(x.titre || "").slice(0, 50), texte: String(x.texte || "").slice(0, 160), tag: "bonplan" });
  fs_("/diffusions/" + id + "?updateMask.fieldPaths=envoye", "patch", { fields: { envoye: { integerValue: String(n) } } });
  return "ok:" + n;
}

// Envoi via Firebase Cloud Messaging ; les téléphones qui ont désinstallé l'appli sont retirés.
function envoyerPush_(appareils, m) {
  const jeton = jetonService_();
  let ok = 0;
  for (let i = 0; i < appareils.length; i += 100) {
    const lot = appareils.slice(i, i + 100);
    const reqs = lot.map(d => ({
      url: "https://fcm.googleapis.com/v1/projects/" + PROJET + "/messages:send", method: "post", muteHttpExceptions: true,
      contentType: "application/json", headers: { Authorization: "Bearer " + jeton },
      payload: JSON.stringify({ message: {
        token: valeur_(d.fields.token),
        webpush: { headers: { Urgency: "high", TTL: "86400" }, data: { titre: m.titre, texte: m.texte, tag: m.tag, url: APPLI } },
      } }),
    }));
    UrlFetchApp.fetchAll(reqs).forEach((r, j) => {
      if (r.getResponseCode() === 200) ok++;
      else if (r.getResponseCode() === 404) fs_("/appareils/" + idDe_(lot[j]), "delete");
    });
  }
  return ok;
}

// ═══════════ SAUVEGARDE AUTOMATIQUE (chaque lundi vers 3 h, dans le Drive d'Eric) ═══════════
// Dossier « Sauvegardes Épicerie Raddonnaise » : un fichier par semaine, les 8 derniers sont gardés.
// Contient les données des clients (noms, téléphones) : ne pas partager ce dossier.
const COLLECTIONS = ["shop", "offres", "actus", "jour", "pubs", "plateaux", "commandes", "clients", "conversations", "resas", "diffusions"];
const SOUS_COLLECTIONS = ["historique", "messages"];
function sauvegarde() {
  if (!aCompteService_()) throw new Error("Compte de service manquant (SA_JSON).");
  const data = { date: new Date().toISOString(), projet: PROJET, documents: {} };
  const ranger = (d) => { data.documents[String(d.name).split("/documents/")[1]] = d.fields || {}; };
  COLLECTIONS.forEach(c => listerDocs_("/" + c).forEach(ranger));
  SOUS_COLLECTIONS.forEach(c => requete_({ from: [{ collectionId: c, allDescendants: true }] }).forEach(ranger));
  const noms = DriveApp.getFoldersByName("Sauvegardes Épicerie Raddonnaise");
  const dossier = noms.hasNext() ? noms.next() : DriveApp.createFolder("Sauvegardes Épicerie Raddonnaise");
  const nom = "sauvegarde-" + Utilities.formatDate(new Date(), "Europe/Paris", "yyyy-MM-dd") + ".json";
  dossier.createFile(nom, JSON.stringify(data), "application/json");
  // on garde les 8 dernières
  const fichiers = []; const it = dossier.getFiles();
  while (it.hasNext()) fichiers.push(it.next());
  fichiers.sort((a, b) => b.getDateCreated() - a.getDateCreated()).slice(8).forEach(f => f.setTrashed(true));
  nettoyer_();
  Logger.log("Sauvegarde OK : " + Object.keys(data.documents).length + " documents → " + nom);
}
// Les mémos « déjà envoyé » de plus de 90 jours sont effacés (la mémoire du script est limitée)
function nettoyer_() {
  const props = PropertiesService.getScriptProperties(), tout = props.getProperties(), limite = Date.now() - 90 * 864e5;
  Object.keys(tout).forEach(k => { if (/^(envoye_|msg_|resa_|pc_|pm_|pd_)/.test(k) && Number(tout[k]) < limite) props.deleteProperty(k); });
}
// À lancer UNE fois à la main : programme la sauvegarde chaque lundi vers 3 h.
function installerSauvegarde() {
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === "sauvegarde").forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("sauvegarde").timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(3).create();
  sauvegarde();
  Logger.log("Sauvegarde programmée chaque lundi vers 3 h. Une première sauvegarde vient d'être faite.");
}

// À lancer UNE fois à la main (bouton ▶ Exécuter) pour donner les autorisations au script.
function autoriser() {
  UrlFetchApp.fetch("https://www.google.com", { muteHttpExceptions: true });
  DriveApp.getRootFolder();
  if (aCompteService_()) { jetonService_(); Logger.log("Compte de service OK."); }
  Logger.log("Autorisations OK. E-mails envoyés à : " + DEST + " — il reste " + MailApp.getRemainingDailyQuota() + " e-mails aujourd'hui.");
}
