// Découpe un fichier compilé (esbuild, un seul bloc) en morceaux :
//  - « bibliotheques-NN.js » : code des bibliothèques (React, Firebase…), recopié tel quel
//  - « appli-NN.js »         : code de l'épicerie, remis en forme lisible
// La recompilation recolle les morceaux dans l'ordre : le résultat est le même programme.
import fs from "fs";
import path from "path";
import { parse } from "@babel/parser";
import * as prettier from "prettier";

const [, , entree, sortie] = process.argv;
const src = fs.readFileSync(entree, "utf8");
const ast = parse(src, { sourceType: "module", errorRecovery: false });
const corps = ast.program.body;

const MARQUES = /\\x[C-F][0-9A-F]|\\u20AC|[àâéèêëîïôûùçÉÈÀ]|epicerie|picerie|Raddon|RAD-|tampon|fid\\xE9lit|createElement\(/;
const LIB = /@firebase|FirebaseError|firebase-|grpc|webchannel|goog\.|Copyright|react\.production|scheduler|__SECRET_INTERNALS|qrcode|IndexedDb|indexedDB|Firestore\b/;

const morceaux = [];
for (const st of corps) {
  const txt = src.slice(st.start, st.end);
  // une déclaration peut mélanger : on tranche sur la présence de marques de l'appli et l'absence de marques de bibliothèque
  const appli = MARQUES.test(txt) && !(LIB.test(txt) && txt.length > 20000);
  const type = appli ? "appli" : "bibliotheques";
  const der = morceaux[morceaux.length - 1];
  if (der && der.type === type) der.fin = st.end;
  else morceaux.push({ type, debut: st.start, fin: st.end });
}
// les espaces / commentaires entre morceaux restent attachés au morceau précédent
for (let i = 0; i < morceaux.length; i++) morceaux[i].fin = i + 1 < morceaux.length ? morceaux[i + 1].debut : src.length;
morceaux[0].debut = 0;

// petits morceaux de bibliothèque coincés entre deux morceaux d'appli : on les fusionne avec l'appli (lisibilité)
const fusion = [];
for (const m of morceaux) {
  const der = fusion[fusion.length - 1];
  const taille = m.fin - m.debut;
  if (der && (der.type === m.type || (m.type === "bibliotheques" && taille < 3000 && der.type === "appli"))) der.fin = m.fin;
  else fusion.push({ ...m });
}
const final = [];
for (const m of fusion) { const d = final[final.length - 1]; if (d && d.type === m.type) d.fin = m.fin; else final.push(m); }

fs.mkdirSync(sortie, { recursive: true });
const ordre = [];
let n = 0, tailleAppli = 0;
for (const m of final) {
  n++;
  const nom = `${String(n).padStart(2, "0")}-${m.type}.js`;
  let code = src.slice(m.debut, m.fin);
  if (m.type === "appli") {
    tailleAppli += code.length;
    code = await prettier.format(code, { parser: "babel", printWidth: 110 });
  }
  fs.writeFileSync(path.join(sortie, nom), code);
  ordre.push(nom);
}
fs.writeFileSync(path.join(sortie, "ordre.json"), JSON.stringify(ordre, null, 2) + "\n");
console.log(entree, "→", final.length, "morceaux ;", "appli :", Math.round(tailleAppli / 1024), "Ko sur", Math.round(src.length / 1024), "Ko");
