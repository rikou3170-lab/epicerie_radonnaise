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
function lireCommande_(id) {
  const url = "https://firestore.googleapis.com/v1/projects/" + PROJET + "/databases/(default)/documents/commandes/" + id + "?key=" + CLE_API;
  const r = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
  if (r.getResponseCode() !== 200) return null;
  const doc = JSON.parse(r.getContentText());
  return valeur_({ mapValue: { fields: doc.fields || {} } });
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
    const base = "https://firestore.googleapis.com/v1/projects/" + PROJET + "/databases/(default)/documents/conversations/" + id;
    const r1 = UrlFetchApp.fetch(base + "?key=" + CLE_API, { muteHttpExceptions: true });
    if (r1.getResponseCode() !== 200) return "introuvable";
    const conv = valeur_({ mapValue: { fields: JSON.parse(r1.getContentText()).fields || {} } });
    const r2 = UrlFetchApp.fetch(base + "/messages?pageSize=300&key=" + CLE_API, { muteHttpExceptions: true });
    const docs = r2.getResponseCode() === 200 ? (JSON.parse(r2.getContentText()).documents || []) : [];
    const msgs = docs.map(d => valeur_({ mapValue: { fields: d.fields || {} } })).filter(m => m && m.date).sort((a, b) => a.date - b.date);
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

function reponse_(r) {
  return ContentService.createTextOutput(JSON.stringify({ r: r })).setMimeType(ContentService.MimeType.JSON);
}

// À lancer UNE fois à la main (bouton ▶ Exécuter) pour donner les autorisations au script.
function autoriser() {
  UrlFetchApp.fetch("https://www.google.com", { muteHttpExceptions: true });
  Logger.log("Autorisations OK. E-mails envoyés à : " + DEST + " — il reste " + MailApp.getRemainingDailyQuota() + " e-mails aujourd'hui.");
}
