// ═══════════════════════════════════════════════════════════
//  Épicerie Raddonnaise — e-mail « Nouvelle commande »
//  Installé sur le compte Google d'Eric ; les e-mails partent vers Marion (DEST).
//  Déployer : Application Web · Exécuter en tant que : Moi · Accès : Tout le monde
//
//  Sécurité : l'application n'envoie que l'identifiant de la commande.
//  Le script relit la commande dans Firebase, vérifie qu'elle est récente
//  et toute neuve, et n'envoie qu'UN seul e-mail par commande.
//  Réservations au kilo : le poids est affiché sans « N × » (appli v2.42+).
//  Il n'écrit qu'à Marion (adresse fixée ci-dessous, jamais transmise par l'appli).
//  Prévient aussi Marion des nouveaux messages de clients (?msg=…), 1 e-mail max / 10 min par conversation.
//  En plus de l'e-mail, une notification part sur les téléphones de Marion inscrits dans l'admin (Réglages → 🔔).
//  Bilan de la semaine par e-mail chaque lundi vers 7 h : lancer une fois installerBilan().
//
//  Notifications sur les téléphones des clients (?push=cmd|msg|diff&id=…) et sauvegarde
//  hebdomadaire dans Google Drive : passent par un « compte de service » Firebase dont la clé
//  est rangée dans Paramètres du projet → Propriétés du script → SA_JSON (jamais dans le code).
// ═══════════════════════════════════════════════════════════
const PROJET = "application-famille-897df";
const CLE_API = "AIzaSyCRvvyP7yCOSj2u4WDFCDvBWnGix0Ck-os";   // clé publique Firebase (pas un secret)
const ADMIN = "https://rikou3170-lab.github.io/epicerie_radonnaise/admin.html";
const DEST = "marion.parnaso@hotmail.fr";   // qui reçoit les commandes
const COPIE_BILAN = "(ton e-mail)";   // reçoit aussi le bilan du lundi (en copie)

function doGet(e) {
  const p = (e && e.parameter) || {};
  try {
    if (p.test) return reponse_(test_());
    if (p.msg) return reponse_(nouveauMessage_(p.msg));
    if (p.resa) return reponse_(nouvelleResa_(p.resa));
    if (p.push) return reponse_(push_(p.push, p.id));
    if (p.essaiMarion) return reponse_(essaiMarion_());
    if (p.fid) return reponse_(evenementFid_(p.fid, p.e));
    if (p.tirage) return reponse_(notifierTirage_(p.tirage));
    if (!/^[A-Za-z0-9]{15,40}$/.test(p.id || "")) return reponse_("id-invalide");
    const c = lireCommande_(p.id);
    if (!c) return reponse_("introuvable");
    // jusqu'à 24 h : une commande partie sans réseau prévient Marion quand elle arrive
    if (c.statut !== "nouvelle" || Date.now() - Number(c.cree || 0) > 24 * 3600 * 1000) return reponse_("trop-ancienne");
    const cle = "envoye_" + p.id;
    if (!reserver_(cle)) return reponse_("deja-envoye");
    if (!quotaMail_()) { liberer_(cle); return reponse_("quota"); }
    try { envoyer_(c, false); } catch (err) { liberer_(cle); throw err; }
    pushMarion_("📋 Nouvelle commande " + c.numero, c.nom + " — " + euros_(c.total) + " · " + dateFr_(c.date), "m-cmd-" + p.id);
    return reponse_("ok");
  } catch (err) {
    return reponse_("erreur: " + err.message);
  }
}

// ── Mémo « déjà envoyé » posé sous un verrou court (jamais pendant un envoi) ──
// true = c'est à nous d'envoyer ; false = déjà fait (ou en cours ailleurs). En cas d'échec : liberer_().
function reserver_(cle, valeur) {
  const verrou = LockService.getScriptLock();
  verrou.waitLock(20000);
  try {
    const props = PropertiesService.getScriptProperties();
    if (props.getProperty(cle)) return false;
    props.setProperty(cle, String(valeur || Date.now()));
    return true;
  } finally { verrou.releaseLock(); }
}
function liberer_(cle) { try { PropertiesService.getScriptProperties().deleteProperty(cle); } catch (e) { } }

// ── Plafonds globaux : quelqu'un qui appellerait le script en boucle ne peut pas épuiser le quota
//    d'e-mails de la journée (≈ 100) ni noyer la boîte de Marion. Au-delà : rien n'est envoyé (les
//    commandes restent bien visibles dans l'admin).
const MAX_MAILS_HEURE = 25, MAX_MAILS_JOUR = 70, MAX_PUSH_HEURE = 60;
function compter_(nom, max, duree) {
  const verrou = LockService.getScriptLock();
  verrou.waitLock(20000);
  try {
    const props = PropertiesService.getScriptProperties();
    const cle = "q_" + nom + "_" + Utilities.formatDate(new Date(), "Europe/Paris", duree === "jour" ? "yyyyMMdd" : "yyyyMMddHH");
    const n = Number(props.getProperty(cle) || 0);
    if (n >= max) return false;
    props.setProperty(cle, String(n + 1));
    return true;
  } finally { verrou.releaseLock(); }
}
function quotaMail_() { return compter_("mh", MAX_MAILS_HEURE, "heure") && compter_("mj", MAX_MAILS_JOUR, "jour"); }
function quotaPush_() { return compter_("ph", MAX_PUSH_HEURE, "heure"); }

// Bouton « Envoyer un e-mail de test » de l'admin (1 par minute, 5 par jour maximum)
function test_() {
  const cache = CacheService.getScriptCache();
  if (cache.get("test")) return "attendre";
  cache.put("test", "1", 60);
  if (!compter_("test", 5, "jour") || !quotaMail_()) return "quota";
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
function listerDocs_(chemin, strict) {
  let tous = [], page = "";
  do {
    const r = fs_(chemin + "?pageSize=300" + (page ? "&pageToken=" + encodeURIComponent(page) : ""));
    if (r.code !== 200) { if (strict) throw new Error("lecture impossible de " + chemin + " (" + r.code + ")"); break; }
    tous = tous.concat(r.json.documents || []);
    page = r.json.nextPageToken || "";
  } while (page);
  return tous;
}
function requete_(structuredQuery, strict) {
  const r = fs_(":runQuery", "post", { structuredQuery: structuredQuery });
  if (r.code !== 200 && strict) throw new Error("requête refusée (" + r.code + ")");
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
    (c.lignes || []).map(l => '<tr><td style="padding:6px 0;border-bottom:1px solid #eee">' + html_(l.nom) + ' — <b>' + html_(l.personnes) + ' pers.</b> × ' + euros_(l.prixPersonne) + '</td><td style="text-align:right;border-bottom:1px solid #eee"><b>' + euros_(l.montant) + '</b></td></tr>').join("") +
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
  const props = PropertiesService.getScriptProperties();
  const deja = Number(props.getProperty("msg_" + id) || 0);
  if (Date.now() - deja < 10 * 60 * 1000) return "deja-prevenu";
  const conv = lireDoc_("/conversations/" + id);
  if (!conv) return "introuvable";
  const msgs = listerDocs_("/conversations/" + id + "/messages").map(d => valeur_({ mapValue: { fields: d.fields || {} } })).filter(m => m && m.date).sort((a, b) => a.date - b.date);
  // jusqu'à 24 h : un message parti sans réseau prévient Marion quand il arrive
  const recents = msgs.filter(m => m.de === "client" && Date.now() - m.date < 24 * 3600 * 1000 && m.date > deja).slice(-10);
  if (!recents.length) return "rien-de-nouveau";
  // mémo posé sous verrou court : un seul e-mail même si deux appels arrivent ensemble
  const verrou = LockService.getScriptLock();
  verrou.waitLock(20000);
  try {
    if (Date.now() - Number(props.getProperty("msg_" + id) || 0) < 10 * 60 * 1000) return "deja-prevenu";
    props.setProperty("msg_" + id, String(Date.now()));
  } finally { verrou.releaseLock(); }
  if (!quotaMail_()) { props.setProperty("msg_" + id, String(deja)); return "quota"; }
  try {
    const texte = recents.map(m => "« " + m.texte + " »").join("\n");
    const htmlBody =
      '<div style="font-family:Arial,sans-serif;max-width:520px;color:#22302A">' +
      '<div style="background:#C27B42;color:#fff;padding:14px 18px;border-radius:12px 12px 0 0;font-size:18px"><b>💬 Message de ' + html_(conv.nom) + '</b></div>' +
      '<div style="border:1px solid #E6E0D2;border-top:none;padding:16px 18px;border-radius:0 0 12px 12px">' +
      recents.map(m => '<p style="background:#F2EDE2;border-radius:12px;padding:10px 12px;margin:0 0 8px;white-space:pre-wrap">' + html_(m.texte) + '</p>').join("") +
      (conv.tel ? '<p style="color:#5C6A62;margin:6px 0">Téléphone : <a href="tel:' + html_(String(conv.tel).replace(/\s/g, "")) + '">' + html_(conv.tel) + '</a></p>' : '') +
      '<p style="margin:14px 0 0"><a href="' + ADMIN + '" style="background:#6E9B3A;color:#fff;text-decoration:none;padding:11px 18px;border-radius:10px;display:inline-block;font-weight:bold">Répondre dans l\'application</a></p>' +
      '</div></div>';
    const dernier = String(recents[recents.length - 1].texte || "").replace(/\s+/g, " ").trim();
    pushMarion_("💬 " + conv.nom, dernier.length > 120 ? dernier.slice(0, 118) + "…" : dernier, "m-msg-" + id);
    MailApp.sendEmail({ to: DEST, replyTo: DEST, subject: "💬 Nouveau message de " + conv.nom, body: "Message de " + conv.nom + " :\n\n" + texte + "\n\nRépondre : " + ADMIN, htmlBody: htmlBody, name: "Appli Épicerie Raddonnaise" });
    return "ok";
  } catch (err) { props.setProperty("msg_" + id, String(deja)); throw err; }
}

// ── Nouvelle réservation anti-gaspi (promo, date courte, panier) ──
// Libellé d'une réservation : « 2 × Panier » ; au kilo, le poids est déjà dans le titre (« Comté · 1,1 kg »)
function libelleResa_(r) { return / · \d+(,\d+)? k?g$/.test(String(r.titre || "")) ? String(r.titre) : r.qte + " × " + r.titre; }
function nouvelleResa_(id) {
  if (!/^[A-Za-z0-9]{15,40}$/.test(id || "")) return "id-invalide";
  const r = lireDoc_("/resas/" + id);
  if (!r) return "introuvable";
  if (r.statut !== "reservee" || Date.now() - Number(r.cree || 0) > 24 * 3600 * 1000) return "trop-ancienne";
  const cle = "resa_" + id;
  if (!reserver_(cle)) return "deja-envoye";
  if (!quotaMail_()) { liberer_(cle); return "quota"; }
  try {
    const htmlBody =
      '<div style="font-family:Arial,sans-serif;max-width:520px;color:#22302A">' +
      '<div style="background:#2E7D32;color:#fff;padding:14px 18px;border-radius:12px 12px 0 0;font-size:18px"><b>🧺 Réservation ' + html_(r.numero) + '</b></div>' +
      '<div style="border:1px solid #E6E0D2;border-top:none;padding:16px 18px;border-radius:0 0 12px 12px">' +
      '<p style="font-size:17px;margin:0 0 8px"><b>' + html_(libelleResa_(r)) + '</b>' + (r.total ? ' — ' + euros_(r.total) : '') + '</p>' +
      '<p style="margin:0 0 6px">' + html_(r.nom) + (r.tel ? ' — <a href="tel:' + html_(String(r.tel).replace(/\s/g, "")) + '">' + html_(r.tel) + '</a>' : '') + '</p>' +
      '<p style="color:#5C6A62;margin:0">À retirer ' + html_(r.retrait || "à l'épicerie") + '</p>' +
      '<p style="margin:14px 0 0"><a href="' + ADMIN + '" style="background:#6E9B3A;color:#fff;text-decoration:none;padding:11px 18px;border-radius:10px;display:inline-block;font-weight:bold">Voir les réservations</a></p>' +
      '</div></div>';
    pushMarion_("🧺 Réservation : " + libelleResa_(r), r.nom + " — à retirer " + (r.retrait || "à l'épicerie"), "m-resa-" + id);
    MailApp.sendEmail({ to: DEST, replyTo: DEST, subject: "🧺 Réservation : " + libelleResa_(r) + " (" + r.nom + ")",
      body: libelleResa_(r) + "\n" + r.nom + (r.tel ? " — " + r.tel : "") + "\nÀ retirer " + (r.retrait || "à l'épicerie") + "\n\n" + ADMIN, htmlBody: htmlBody, name: "Appli Épicerie Raddonnaise" });
    return "ok";
  } catch (err) { liberer_(cle); throw err; }
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
  if (type === "diff") return pushDiffusion_(id);   // créée par Marion seule (règles) : pas de plafond
  if (!quotaPush_()) return "quota";
  if (type === "cmd") return pushCommande_(id);
  if (type === "msg") return pushMessage_(id);
  return "type-invalide";
}
function heure_(h) { return h ? String(h).replace(":", "h") : ""; }

function pushCommande_(id) {
  const c = lireDoc_("/commandes/" + id);
  if (!c) return "introuvable";
  const cle = "pc_" + id + "_" + c.statut;
  const jour = c.dateRetrait || c.date;
  const hier = Utilities.formatDate(new Date(Date.now() - 2 * 864e5), "Europe/Paris", "yyyy-MM-dd");
  if (!jour || jour < hier) return "trop-ancienne";
  const quand = dateFr_(jour) + (c.heure ? " à " + heure_(c.heure) : "");
  let titre, texte;
  if (c.statut === "acceptee") { titre = "✅ Commande " + c.numero + " validée"; texte = "À retirer le " + quand + (c.message ? " — " + c.message : ""); }
  else if (c.statut === "refusee") { titre = "Commande " + c.numero + " non acceptée"; texte = c.message || "Contactez l'épicerie pour en savoir plus."; }
  else if (c.statut === "prete") { titre = "🧺 Votre commande est prête !"; texte = "Commande " + c.numero + " — vous pouvez venir la chercher" + (c.heure ? " (prévu à " + heure_(c.heure) + ")" : "") + "."; }
  else return "rien-a-dire";
  if (!reserver_(cle)) return "deja-envoye";
  try {
    const app = requete_({ from: [{ collectionId: "appareils" }], where: { fieldFilter: { field: { fieldPath: "refs" }, op: "ARRAY_CONTAINS", value: { stringValue: id } } } });
    return "ok:" + envoyerPush_(app, { titre: titre, texte: texte, tag: "cmd-" + id });
  } catch (err) { liberer_(cle); throw err; }
}

function pushMessage_(id) {
  const msgs = listerDocs_("/conversations/" + id + "/messages").map(d => valeur_({ mapValue: { fields: d.fields || {} } }))
    .filter(m => m && m.date).sort((a, b) => a.date - b.date);
  const m = msgs[msgs.length - 1];
  if (!m || m.de !== "epicerie" || Date.now() - m.date > 30 * 60 * 1000) return "rien-de-nouveau";
  const cle = "pm_" + id + "_" + m.date;
  if (!reserver_(cle)) return "deja-envoye";
  try {
    const t = String(m.texte || "").replace(/\s+/g, " ").trim();
    const parRef = (ref) => requete_({ from: [{ collectionId: "appareils" }], where: { fieldFilter: { field: { fieldPath: "refs" }, op: "ARRAY_CONTAINS", value: { stringValue: ref } } } });
    let app = parRef(id);
    // conversation ouverte par Marion depuis une commande ou une réservation (« Écrire au client ») :
    // le téléphone ne la connaît pas encore, mais il suit la commande / la réservation d'origine
    if (!app.length) { const conv = lireDoc_("/conversations/" + id); if (conv && /^[A-Za-z0-9]{15,40}$/.test(conv.via || "")) app = parRef(conv.via); }
    return "ok:" + envoyerPush_(app, { titre: "💬 Message de l'épicerie", texte: t.length > 120 ? t.slice(0, 118) + "…" : t, tag: "msg" });
  } catch (err) { liberer_(cle); throw err; }
}

function pushDiffusion_(id) {
  const x = lireDoc_("/diffusions/" + id);
  if (!x) return "introuvable";
  if (Date.now() - Number(x.cree || 0) > 30 * 60 * 1000) return "trop-ancienne";
  if (!reserver_("pd_" + id)) return "deja-envoye";
  let n;
  try {
    const app = requete_({ from: [{ collectionId: "appareils" }], where: { fieldFilter: { field: { fieldPath: "promo" }, op: "EQUAL", value: { booleanValue: true } } } });
    n = envoyerPush_(app, { titre: String(x.titre || "").slice(0, 50), texte: String(x.texte || "").slice(0, 160), tag: "bonplan" });
  } catch (err) { liberer_("pd_" + id); throw err; }
  fs_("/diffusions/" + id + "?updateMask.fieldPaths=envoye", "patch", { fields: { envoye: { integerValue: String(n) } } });
  return "ok:" + n;
}


// ═══════════ CARTE À TAMPONS : Marion prévenue (e-mail + notification) ═══════════
// La caisse n'envoie que l'identifiant de la carte et l'évènement ; le script relit la carte et son historique
// dans Firebase et ne prévient que si l'évènement vient vraiment d'arriver (moins de 15 min), une seule fois.
//   palier = 1er cadeau atteint (le client choisit à la caisse) · plein = carte complète · pris1 / pris2 = cadeau donné
function evenementFid_(id, e) {
  if (!/^[A-Za-z0-9]{10,40}$/.test(id || "")) return "id-invalide";
  if (["tampon", "palier", "plein", "pris1", "pris2", "choix", "parrain"].indexOf(e) < 0) return "evenement-invalide";
  if (!aCompteService_()) return "pas-de-compte-de-service";
  const c = lireDoc_("/clients/" + id); if (!c) return "introuvable";
  const cfg = lireDoc_("/shop/config") || {}, tp = Object.assign({ nb: 20, palier: 10 }, ((cfg.fidelite || {}).tampons) || {});   // mêmes valeurs par défaut que l'appli
  const nb = parseInt(tp.nb) || 20, palier = parseInt(tp.palier) > 0 && parseInt(tp.palier) < nb ? parseInt(tp.palier) : 0;
  const cad1 = tp.recompense1 || "un cadeau surprise", cad2 = tp.recompense || "un chouette cadeau surprise";
  // le client a choisi dans l'appli « je vais chercher mon cadeau » (au 10e tampon) : Marion est prévenue
  if (e === "choix") {
    const le = Number(c.choixLe) || 0;
    if (c.choix !== "cadeau" || !palier || Number(c.tampons) !== palier || le <= (Number(c.dernierTampon) || 0) || Date.now() - le > 15 * 60 * 1000) return "pas-confirme";
    if (!reserver_("fidch_" + id + "_" + le)) return "deja-envoye";
    const nomC = String(c.nom || "Un client");
    const t1 = "🎁 " + nomC + " vient chercher son cadeau", t2 = "Choisi dans l'appli au " + palier + "e tampon : " + cad1 + ". À donner à son prochain passage (la carte repart à zéro).";
    pushMarion_(t1, t2, "m-fid-" + id);
    if (!quotaMail_()) return "ok-sans-mail";
    MailApp.sendEmail({ to: DEST, replyTo: DEST, subject: t1, body: t1 + "\n" + t2 + "\n\nCarte " + (c.code || "") + (c.tel ? " · " + c.tel : "") + "\n" + ADMIN, name: "Appli Épicerie Raddonnaise" });
    return "ok";
  }
  const hs = listerDocs_("/clients/" + id + "/historique").map(d => valeur_({ mapValue: { fields: d.fields || {} } })).filter(x => x && x.date).sort((a, b) => b.date - a.date);
  // tampon / palier / plein : on regarde le dernier passage en caisse (le tampon), même si une ligne « parrainage » ou « bonus » a été écrite en même temps
  const hT = hs.filter(x => x.type === "tampon")[0], annuleDepuis = hT && hs.some(x => x.date > hT.date);   // annulé (ou cadeau donné) depuis : on ne prévient pas
  const h = ["tampon", "palier", "plein"].indexOf(e) >= 0 ? (annuleDepuis ? null : hT) : e === "parrain" ? hs.filter(x => x.type === "parrainage")[0] : hs[0];
  if (!h || Date.now() - h.date > 15 * 60 * 1000) return "rien-de-recent";
  // tampons gagnés à ce passage : le tampon + ceux offerts en même temps (parrainage, anniversaire en attente)
  const gain = hs.filter(x => x.date === h.date && ["tampon", "parrainage", "bonus"].indexOf(x.type) >= 0).reduce((t, x) => t + (Number(x.points) || 0), 0) || 1;
  const n = Number(c.tampons) || 0;
  // parrainage : le parrain est remercié (+1 tampon donné par la caisse au 1er passage de son voisin)
  if (e === "parrain") {
    if (h.type !== "parrainage" || hs.some(x => x.date > h.date)) return "pas-confirme";   // annulé depuis
    if (!reserver_("fidp_" + id + "_" + h.date)) return "deja-envoye";
    const qui = h.filleul ? h.filleul + " vient" : "Votre voisin vient";
    try { return "ok:" + pushClientFid_(id, "🤝 Merci pour le parrainage !", qui + " de faire son premier passage : +1 tampon pour vous" + (h.attente ? ", ajouté à votre prochain passage en caisse." : " (" + n + " / " + nb + ")." + (palier && n === palier ? " Votre cadeau est débloqué !" : n >= nb ? " Votre carte est complète !" : ""))); } catch (err) { return "erreur"; }
  }
  // notification sur le téléphone du client (s'il a activé les notifications)
  if (e === "tampon") {
    if (h.type !== "tampon") return "pas-confirme";
    const cleC = "fidc_" + id + "_" + h.date;
    if (!reserver_(cleC)) return "deja-envoye";
    const reste = palier && n < palier ? palier - n : nb - n;
    const T2 = n >= nb ? ["🎁🎁 Carte complète : " + nb + " tampons !", "Bravo ! " + cad2.charAt(0).toUpperCase() + cad2.slice(1) + " vous attend en caisse."]
      : palier && n === palier ? ["🎁 " + n + " tampons : votre cadeau vous attend !", "En caisse : prenez " + cad1 + ", ou continuez jusqu'à " + nb + " pour " + cad2 + "."]
      : [gain > 1 ? "🍏 +" + gain + " tampons !" : "🍏 +1 tampon !", (gain > 1 ? "Dont " + (gain - 1) + " tampon" + (gain > 2 ? "s" : "") + " offert" + (gain > 2 ? "s" : "") + (hs.some(x => x.date === h.date && x.type === "parrainage") ? " pour le parrainage" : "") + " 🎁. " : "") + "Vous avez " + n + " / " + nb + " tampons · encore " + reste + " pour " + (palier && n < palier ? "votre cadeau" : "votre chouette cadeau") + "."];
    if (Array.isArray(c.roueAJouer) && c.roueAJouer.length && !c.roueNon) T2[1] += " 🎄 Un tour de roue de Noël vous attend dans l'appli !";
    try { return "ok:" + pushClientFid_(id, T2[0], T2[1]); } catch (err) { liberer_(cleC); throw err; }
  }
  const ok = { palier: h.type === "tampon" && palier && n >= palier && n < nb && n - gain < palier,
    plein: h.type === "tampon" && n >= nb, pris1: h.type === "recompense1", pris2: h.type === "recompense" }[e];
  if (!ok) return "pas-confirme";
  const cle = "fid_" + id + "_" + e + "_" + h.date;
  if (!reserver_(cle)) return "deja-envoye";
  const nom = String(c.nom || "Un client");
  const T = {
    palier: ["🎁 " + nom + " a atteint " + palier + " tampons", "Le client peut prendre " + cad1 + " ou continuer jusqu'à " + nb + " pour " + cad2 + "."],
    plein: ["🎁🎁 " + nom + " a complété sa carte (" + nb + " tampons)", "À donner : " + cad2 + "."],
    pris1: ["✅ " + nom + " a pris " + cad1, "Sa carte est repartie à zéro."],
    pris2: ["✅ " + nom + " a reçu " + cad2, "Sa carte est repartie à zéro."],
  }[e];
  pushMarion_(T[0], T[1], "m-fid-" + id);
  if (e === "pris1" || e === "pris2") { try { pushClientFid_(id, "🎁 Profitez bien de votre cadeau !", "Votre carte repart à zéro : à vous les prochains tampons."); } catch (err) { } }
  if (!quotaMail_()) return "ok-sans-mail";
  try {
    const htmlBody = '<div style="font-family:Arial,sans-serif;max-width:520px;color:#22302A">' +
      '<div style="background:#C27B42;color:#fff;padding:14px 18px;border-radius:12px 12px 0 0;font-size:18px"><b>' + html_(T[0]) + '</b></div>' +
      '<div style="border:1px solid #E6E0D2;border-top:none;padding:16px 18px;border-radius:0 0 12px 12px">' +
      '<p style="margin:0 0 8px;font-size:15px">' + html_(T[1]) + '</p>' +
      '<p style="margin:0;color:#5C6A62">Carte ' + html_(c.code || "") + (c.tel ? ' · <a href="tel:' + html_(String(c.tel).replace(/\s/g, "")) + '">' + html_(c.tel) + '</a>' : '') + ' · ' + (e.indexOf("pris") === 0 ? 0 : n) + ' / ' + nb + ' tampons</p>' +
      '<p style="margin:14px 0 0"><a href="' + ADMIN + '" style="background:#6E9B3A;color:#fff;text-decoration:none;padding:11px 18px;border-radius:10px;display:inline-block;font-weight:bold">Voir dans l\'administration</a></p>' +
      '</div></div>';
    MailApp.sendEmail({ to: DEST, replyTo: DEST, subject: T[0], body: T[0] + "\n" + T[1] + "\n\n" + ADMIN, htmlBody: htmlBody, name: "Appli Épicerie Raddonnaise" });
  } catch (err) { liberer_(cle); throw err; }
  return "ok";
}

// ═══════════ ROUE DE NOËL : le gagnant du tirage est prévenu (e-mail + notification), Marion aussi ═══════════
// La caisse enregistre le tirage dans Firebase (tirages/{id}) puis appelle ?tirage=<id> ; le script relit tout lui-même.
function notifierTirage_(id) {
  if (!/^[A-Za-z0-9]{15,40}$/.test(id || "")) return "id-invalide";
  if (!aCompteService_()) return "pas-de-compte-de-service";
  const t = lireDoc_("/tirages/" + id); if (!t || !t.gagnant || !t.gagnant.id) return "introuvable";
  if (Date.now() - Number(t.cree || 0) > 30 * 60 * 1000) return "trop-ancien";
  if (!reserver_("tir_" + id)) return "deja-envoye";
  const c = lireDoc_("/clients/" + t.gagnant.id) || {};
  const prenom = String(t.gagnant.prenom || "");
  const titre = String(t.titre || "Tirage au sort de Noël");
  try { pushClientFid_(String(t.gagnant.id), "🎉 Vous avez gagné, " + prenom + " !", "Vous êtes le gagnant du " + titre.charAt(0).toLowerCase() + titre.slice(1) + ". Votre lot vous attend à l'épicerie 🎁"); } catch (err) { }
  pushMarion_("🎄 " + titre + " : " + (c.nom || prenom) + " a gagné", "Prévenu par e-mail et notification. " + (t.total || 0) + " tickets étaient en jeu.", "m-tir-" + id);
  if (!quotaMail_()) return "ok-sans-mail";
  const mail = String(c.email || "").trim();
  if (/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(mail)) {
    const htmlBody = '<div style="font-family:Arial,sans-serif;max-width:520px;color:#22302A">' +
      '<div style="background:#1C433B;color:#FFE08A;padding:18px;border-radius:12px 12px 0 0;font-size:22px;text-align:center"><b>🎉 Félicitations ' + html_(prenom) + ' !</b></div>' +
      '<div style="border:1px solid #E6E0D2;border-top:none;padding:18px;border-radius:0 0 12px 12px;font-size:15px;line-height:1.5">' +
      '<p style="margin:0 0 10px">Vous avez gagné le <b>' + html_(titre.charAt(0).toLowerCase() + titre.slice(1)) + '</b> de la roue de Noël de l\'Épicerie Raddonnaise 🎄</p>' +
      '<p style="margin:0 0 10px">Votre lot vous attend à l\'épicerie : passez quand vous voulez le récupérer, nous avons hâte de vous le remettre !</p>' +
      '<p style="margin:0;color:#5C6A62">Joyeuses fêtes,<br>Marion — Épicerie Raddonnaise</p></div></div>';
    MailApp.sendEmail({ to: mail, replyTo: DEST, subject: "🎉 Vous avez gagné au tirage de Noël de l'Épicerie Raddonnaise !", body: "Félicitations " + prenom + " ! Vous avez gagné le " + titre + ". Votre lot vous attend à l'épicerie.", htmlBody: htmlBody, name: "Épicerie Raddonnaise" });
  }
  if (quotaMail_()) MailApp.sendEmail({ to: DEST, replyTo: DEST, subject: "🎄 " + titre + " : " + (c.nom || prenom) + " a gagné",
    body: (c.nom || prenom) + " a gagné le " + titre + ".\nTéléphone : " + (c.tel || "—") + "\nE-mail : " + (mail || "—") + (mail ? " (prévenu par e-mail)" : " (pas d'e-mail : à prévenir de vive voix)") + "\n" + (t.total || 0) + " tickets en jeu.\n\n" + ADMIN, name: "Appli Épicerie Raddonnaise" });
  return "ok";
}

// Téléphones du client qui suivent sa carte (refs contient l'identifiant de la carte)
function pushClientFid_(id, titre, texte) {
  const app = requete_({ from: [{ collectionId: "appareils" }], where: { fieldFilter: { field: { fieldPath: "refs" }, op: "ARRAY_CONTAINS", value: { stringValue: id } } } });
  return envoyerPush_(app, { titre: titre, texte: texte, tag: "fid" });
}

// ═══════════ NOTIFICATIONS SUR LE TÉLÉPHONE DE MARION ═══════════
// Téléphones rangés dans appareilsAdmin (seule l'admin peut s'y inscrire, voir les règles).
// Appelé seulement après les vérifications de commande / message / réservation : un échec ne bloque jamais l'e-mail.
function pushMarion_(titre, texte, tag) {
  try {
    if (!aCompteService_() || !quotaPush_()) return 0;
    const app = listerDocs_("/appareilsAdmin");
    return app.length ? envoyerPush_(app, { titre: titre, texte: texte, tag: tag }, "appareilsAdmin", ADMIN) : 0;
  } catch (err) { return 0; }
}
// Bouton « Envoyer un essai » de l'admin : 5 par jour au plus
function essaiMarion_() {
  if (!aCompteService_()) return "pas-de-compte-de-service";
  if (!compter_("em", 5, "jour")) return "quota";
  return "ok:" + pushMarion_("🔔 Essai réussi", "Les notifications de l'admin marchent sur ce téléphone.", "m-essai");
}

// Envoi via Firebase Cloud Messaging ; les téléphones qui ont désinstallé l'appli sont retirés.
function envoyerPush_(appareils, m, coll, url) {
  coll = coll || "appareils"; url = url || APPLI;
  const jeton = jetonService_();
  let ok = 0;
  for (let i = 0; i < appareils.length; i += 100) {
    const lot = appareils.slice(i, i + 100);
    const reqs = lot.map(d => ({
      url: "https://fcm.googleapis.com/v1/projects/" + PROJET + "/messages:send", method: "post", muteHttpExceptions: true,
      contentType: "application/json", headers: { Authorization: "Bearer " + jeton },
      payload: JSON.stringify({ message: {
        token: valeur_(d.fields.token),
        webpush: { headers: { Urgency: "high", TTL: "86400" }, data: { titre: m.titre, texte: m.texte, tag: m.tag, url: url } },
      } }),
    }));
    UrlFetchApp.fetchAll(reqs).forEach((r, j) => {
      if (r.getResponseCode() === 200) ok++;
      else if (r.getResponseCode() === 404 || ([400, 403].indexOf(r.getResponseCode()) >= 0 &&
        /UNREGISTERED|SENDER_ID_MISMATCH|registration token|not a valid FCM/i.test(r.getContentText()))) fs_("/" + coll + "/" + idDe_(lot[j]), "delete");
    });
  }
  return ok;
}

// ═══════════ SAUVEGARDE AUTOMATIQUE (chaque lundi vers 3 h, dans le Drive d'Eric) ═══════════
// Dossier « Sauvegardes Épicerie Raddonnaise » : un fichier par semaine, les 8 derniers sont gardés.
// Contient les données des clients (noms, téléphones) : ne pas partager ce dossier.
const COLLECTIONS = ["shop", "offres", "actus", "jour", "pubs", "plateaux", "commandes", "clients", "conversations", "resas", "diffusions", "producteurs"];
const SOUS_COLLECTIONS = ["historique", "messages"];
function sauvegarde() {
  if (!aCompteService_()) throw new Error("Compte de service manquant (SA_JSON).");
  const data = { date: new Date().toISOString(), projet: PROJET, documents: {} };
  const ranger = (d) => { data.documents[String(d.name).split("/documents/")[1]] = d.fields || {}; };
  // lecture stricte : au moindre refus la sauvegarde s'arrête en erreur (Google prévient Eric par e-mail)
  // au lieu d'enregistrer un fichier incomplet qui pousserait les bonnes sauvegardes hors des 8 gardées
  COLLECTIONS.forEach(c => listerDocs_("/" + c, true).forEach(ranger));
  SOUS_COLLECTIONS.forEach(c => requete_({ from: [{ collectionId: c, allDescendants: true }] }, true).forEach(ranger));
  if (!Object.keys(data.documents).some(k => k.indexOf("shop/") === 0)) throw new Error("Sauvegarde vide : configuration introuvable.");
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
  Object.keys(tout).forEach(k => { if ((/^(envoye_|msg_|resa_|pc_|pm_|pd_|fid_)/.test(k) && Number(tout[k]) < limite) || (/^q_/.test(k) && k.replace(/^q_[a-z]+_/, "").slice(0, 8) < Utilities.formatDate(new Date(Date.now() - 3 * 864e5), "Europe/Paris", "yyyyMMdd"))) props.deleteProperty(k); });
}
// À lancer UNE fois à la main : programme la sauvegarde chaque lundi vers 3 h.
function installerSauvegarde() {
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === "sauvegarde").forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("sauvegarde").timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(3).create();
  sauvegarde();
  Logger.log("Sauvegarde programmée chaque lundi vers 3 h. Une première sauvegarde vient d'être faite.");
}

// ═══════════ BILAN DU LUNDI (e-mail à Marion chaque lundi vers 7 h) ═══════════
// Résumé de la semaine écoulée (lundi → dimanche) : visites, commandes, réservations, messages, fidélité, ce qui plaît.
// Rien de personnel dans l'e-mail : seulement des chiffres et des noms de produits.
function bilanHebdo() {
  if (!aCompteService_()) throw new Error("Compte de service manquant (SA_JSON).");
  const tz = "Europe/Paris", jour = (d) => Utilities.formatDate(d, tz, "yyyy-MM-dd");
  const auj = new Date(), fin = new Date(auj); fin.setDate(auj.getDate() - ((auj.getDay() + 6) % 7));   // lundi de cette semaine
  const deb = new Date(fin); deb.setDate(fin.getDate() - 7), avant = new Date(deb); avant.setDate(deb.getDate() - 7);
  const J0 = jour(deb), J1 = jour(fin), JA = jour(avant);
  const t0 = new Date(J0 + "T00:00:00").getTime(), t1 = new Date(J1 + "T00:00:00").getTime();
  const champ = (d) => valeur_({ mapValue: { fields: d.fields || {} } });
  const entre = (col, f, a, b, type) => requete_({ from: [{ collectionId: col }], where: { compositeFilter: { op: "AND", filters: [
    { fieldFilter: { field: { fieldPath: f }, op: "GREATER_THAN_OR_EQUAL", value: { [type]: String(a) } } },
    { fieldFilter: { field: { fieldPath: f }, op: "LESS_THAN", value: { [type]: String(b) } } }] } } }).map(champ);
  // fréquentation
  const somme = (l) => { const o = {}; l.forEach(x => o[x.cle] = (o[x.cle] || 0) + (x.n || 0)); return o; };
  const st = somme(entre("stats", "jour", J0, J1, "stringValue")), stAvant = somme(entre("stats", "jour", JA, J0, "stringValue"));
  // noms des plateaux et des articles du jour (les compteurs gardent l'identifiant en minuscules)
  const noms = {};
  listerDocs_("/plateaux").forEach(d => noms["pl_" + idDe_(d).toLowerCase()] = champ(d).nom);
  listerDocs_("/jour").forEach(d => noms["resa_" + idDe_(d).toLowerCase()] = champ(d).titre);
  listerDocs_("/offres").forEach(d => noms["resa_" + idDe_(d).toLowerCase()] = champ(d).titre);
  const top = (pre, n) => Object.keys(st).filter(k => k.indexOf(pre) === 0 && noms[k]).sort((a, b) => st[b] - st[a]).slice(0, n).map(k => [noms[k], st[k]]);
  const RUB = { accueil: "Accueil", carte: "La carte", fidelite: "Fidélité", actus: "Actus", infos: "Infos" };
  const rubriques = Object.keys(RUB).map(k => [RUB[k], st["v_" + k] || 0]).filter(x => x[1]).sort((a, b) => b[1] - a[1]);
  let hPic = "", hMax = 0; for (let h = 0; h < 24; h++) { const v = st["h_" + String(h).padStart(2, "0")] || 0; if (v > hMax) { hMax = v; hPic = h + " h"; } }
  // activité
  const cmds = entre("commandes", "cree", t0, t1, "integerValue").filter(c => c.statut !== "refusee");
  const ca = cmds.reduce((t, c) => t + (Number(c.total) || 0), 0);
  const resas = entre("resas", "cree", t0, t1, "integerValue");
  const convs = entre("conversations", "cree", t0, t1, "integerValue").length;
  // fidélité : nouvelles cartes et tampons donnés
  const clients = listerDocs_("/clients");
  let nouvelles = 0, tampons = 0, recompenses = 0;
  clients.forEach(d => {
    const c = champ(d);
    if (c.depuis >= J0 && c.depuis < J1) nouvelles++;
    if (!c.derniere || c.derniere < J0) return;
    listerDocs_("/clients/" + idDe_(d) + "/historique").map(champ).forEach(h => {
      if (h.date >= t0 && h.date < t1) { if (h.type === "tampon" && h.points > 0) tampons += h.points; if (h.type === "recompense") recompenses++; }
    });
  });
  const abonnes = listerDocs_("/appareils").length;
  // e-mail
  const vis = st.visiteurs || 0, visA = stAvant.visiteurs || 0;
  const evol = visA ? Math.round((vis - visA) / visA * 100) : null;
  const ligne = (lib, val, sous) => '<tr><td style="padding:7px 0;border-bottom:1px solid #eee;color:#5C6A62">' + lib + '</td><td style="text-align:right;border-bottom:1px solid #eee;font-size:17px"><b>' + val + '</b>' + (sous ? '<div style="font-size:11px;color:#93A099">' + sous + '</div>' : '') + '</td></tr>';
  const liste = (t, l) => l.length ? '<p style="margin:16px 0 4px;font-weight:bold;color:#1C433B">' + t + '</p>' + l.map(x => '<div style="padding:3px 0">• ' + html_(x[0]) + ' <span style="color:#93A099">(' + x[1] + ')</span></div>').join("") : "";
  const periode = dateFr_(J0) + " → " + dateFr_(jour(new Date(fin.getTime() - 864e5)));
  const htmlBody = '<div style="font-family:Arial,sans-serif;max-width:520px;color:#22302A">' +
    '<div style="background:#1C433B;color:#fff;padding:14px 18px;border-radius:12px 12px 0 0;font-size:18px"><b>📊 Ta semaine à l\'épicerie</b><div style="font-size:13px;opacity:.8">' + periode + '</div></div>' +
    '<div style="border:1px solid #E6E0D2;border-top:none;padding:12px 18px 18px;border-radius:0 0 12px 12px"><table style="width:100%;border-collapse:collapse;font-size:14px">' +
    ligne("Visiteurs de l'appli", vis, evol === null ? "" : (evol >= 0 ? "+" : "") + evol + " % par rapport à la semaine d'avant") +
    ligne("Ouvertures de l'appli", st.ouvertures || 0, hPic ? "le plus de monde vers " + hPic : "") +
    ligne("Commandes de plateaux", cmds.length, cmds.length ? euros_(ca) : "") +
    ligne("Réservations anti-gaspi", resas.length, "") +
    ligne("Nouvelles conversations", convs, "") +
    ligne("Tampons donnés", tampons, recompenses ? recompenses + " carte" + (recompenses > 1 ? "s" : "") + " complète" + (recompenses > 1 ? "s" : "") + " récompensée" + (recompenses > 1 ? "s" : "") : "") +
    ligne("Nouvelles cartes de fidélité", nouvelles, clients.length + " cartes en tout") +
    ligne("Téléphones abonnés aux notifications", abonnes, "") + '</table>' +
    liste("Rubriques les plus vues", rubriques.slice(0, 3)) + liste("Plateaux les plus regardés", top("pl_", 3)) + liste("Produits les plus réservés", top("resa_", 3)) +
    '<p style="margin:18px 0 0"><a href="' + ADMIN + '" style="background:#6E9B3A;color:#fff;text-decoration:none;padding:11px 18px;border-radius:10px;display:inline-block;font-weight:bold">Ouvrir l\'administration</a></p>' +
    '</div><p style="font-size:11px;color:#93A099;text-align:center">Bilan automatique chaque lundi · Épicerie Raddonnaise</p></div>';
  const texte = "Ta semaine (" + periode + ") : " + vis + " visiteurs, " + cmds.length + " commandes, " + resas.length + " réservations, " + tampons + " tampons.\n" + ADMIN;
  MailApp.sendEmail({ to: DEST, cc: COPIE_BILAN, subject: "📊 Ta semaine à l'épicerie : " + vis + " visiteurs, " + cmds.length + " commande" + (cmds.length > 1 ? "s" : ""), body: texte, htmlBody: htmlBody, name: "Appli Épicerie Raddonnaise" });
  Logger.log("Bilan envoyé : " + texte);
}
// À lancer UNE fois à la main : programme le bilan chaque lundi vers 7 h (et en envoie un tout de suite).
function installerBilan() {
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === "bilanHebdo").forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("bilanHebdo").timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(7).create();
  bilanHebdo();
  Logger.log("Bilan programmé chaque lundi vers 7 h. Un premier bilan vient d'être envoyé.");
}

// ═══════════ ANNIVERSAIRES : un tampon offert le jour J (chaque matin vers 8 h) ═══════════
// Seulement si le client a indiqué son anniversaire (jour et mois) et que Marion n'a pas coupé l'option.
function anniversaires() {
  if (!aCompteService_()) return "pas-de-compte-de-service";
  const cfg = lireDoc_("/shop/config") || {}, f = cfg.fidelite || {};
  if (f.anniv === false || f.active === false) return "desactive";
  const tp = Object.assign({ nb: 20, palier: 10 }, f.tampons || {});   // mêmes valeurs par défaut que l'appli
  const nb = Math.min(30, Math.max(3, parseInt(tp.nb) || 20)), palier = parseInt(tp.palier) > 0 && parseInt(tp.palier) < nb ? parseInt(tp.palier) : 0;
  const now = new Date(), an = Number(Utilities.formatDate(now, "Europe/Paris", "yyyy")), jour = Utilities.formatDate(now, "Europe/Paris", "MM-dd");
  const bis = (an % 4 === 0 && an % 100 !== 0) || an % 400 === 0;
  const fetes = [];
  listerDocs_("/clients", true).forEach(dc => {
    const id = idDe_(dc), c = valeur_({ mapValue: { fields: dc.fields || {} } }) || {};
    const a = String(c.anniv || "");
    if (!(a === jour || (a === "02-29" && jour === "02-28" && !bis))) return;
    if (Number(c.annivAn) === an) return;   // déjà offert cette année
    const t0 = Number(c.tampons) || 0;
    // carte au 10e (choix du cadeau pas fait) ou pleine : le tampon offert attend le prochain passage, pour ne pas sauter le choix ni dépasser la carte
    const continue_ = c.choix === "continue" && (Number(c.choixLe) || 0) > (Number(c.dernierTampon) || 0);
    const attente = t0 >= nb || (palier && t0 === palier && !continue_);
    const champ = attente ? "bonusAttente" : "tampons", v = attente ? (Number(c.bonusAttente) || 0) + 1 : t0 + 1;
    const r = fs_("/clients/" + id + "?updateMask.fieldPaths=" + champ + "&updateMask.fieldPaths=annivAn", "patch",
      { fields: { [champ]: { integerValue: String(v) }, annivAn: { integerValue: String(an) } } });
    if (r.code !== 200) return;
    fs_("/clients/" + id + "/historique", "post", { fields: { date: { integerValue: String(Date.now()) }, points: { integerValue: attente ? "0" : "1" }, type: { stringValue: "anniversaire" }, source: { stringValue: "appli" }, attente: { booleanValue: attente } } });
    const prenom = String(c.prenom || String(c.nom || "").split(" ")[0] || "");
    const texte = attente ? "L'Épicerie Raddonnaise vous offre un tampon 🍏 Il sera ajouté sur votre carte dès votre prochain passage en caisse."
      : "L'Épicerie Raddonnaise vous offre un tampon : " + v + " / " + nb + " sur votre carte 🍏" + (palier && v === palier ? " Votre cadeau est débloqué !" : v >= nb ? " Votre carte est complète !" : "");
    try { pushClientFid_(id, "🎂 Joyeux anniversaire" + (prenom ? " " + prenom : "") + " !", texte); } catch (e) { }
    fetes.push((c.nom || prenom) + (attente ? " (tampon ajouté à son prochain passage)" : palier && v === palier ? " (cadeau du " + palier + "e débloqué)" : v >= nb ? " (carte complète)" : ""));
  });
  if (fetes.length) try { pushMarion_("🎂 Anniversaire" + (fetes.length > 1 ? "s" : "") + " du jour", fetes.join(", ") + " : un tampon offert automatiquement.", "m-anniv"); } catch (e) { }
  return "ok:" + fetes.length;
}
// À lancer UNE fois à la main : vérifie les anniversaires chaque matin vers 8 h
function installerAnniversaires() {
  ScriptApp.getProjectTriggers().filter(t => t.getHandlerFunction() === "anniversaires").forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("anniversaires").timeBased().everyDays(1).atHour(8).inTimezone("Europe/Paris").create();
  Logger.log("Anniversaires vérifiés chaque matin vers 8 h. " + anniversaires());
}

// À lancer UNE fois à la main (bouton ▶ Exécuter) pour donner les autorisations au script.
function autoriser() {
  UrlFetchApp.fetch("https://www.google.com", { muteHttpExceptions: true });
  DriveApp.getRootFolder();
  if (aCompteService_()) { jetonService_(); Logger.log("Compte de service OK."); }
  Logger.log("Autorisations OK. E-mails envoyés à : " + DEST + " — il reste " + MailApp.getRemainingDailyQuota() + " e-mails aujourd'hui.");
}