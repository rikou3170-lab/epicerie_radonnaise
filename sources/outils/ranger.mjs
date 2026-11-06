// Range le code d'une appli en fichiers par thème, d'après outils/rangement-<appli>.json :
//   { "08-appli.js": [[null, "demarrage"], ["firebaseConfig", "firebase"], …], … }
// Chaque morceau d'appli est coupé juste avant les déclarations indiquées. L'ordre du code ne change pas.
import fs from "fs"; import path from "path";
import { parse } from "@babel/parser";
const ici = path.dirname(new URL(import.meta.url).pathname), racine = path.resolve(ici, "..");
const appli = process.argv[2];
const dos = path.join(racine, appli);
const plan = JSON.parse(fs.readFileSync(path.join(ici, `rangement-${appli}.json`), "utf8"));
const ordre = JSON.parse(fs.readFileSync(path.join(dos, "ordre.json"), "utf8"));
const sortie = []; let n = 0;
const nomFichier = (label) => `${String(++n).padStart(2, "0")}-${label}.js`;
const nouveaux = {};
for (const f of ordre) {
  const code = fs.readFileSync(path.join(dos, f), "utf8");
  if (!plan[f]) { const nf = nomFichier(f.includes("bibliotheques") ? "bibliotheques" : f.replace(/^\d+-|\.js$/g, "")); nouveaux[nf] = code; sortie.push(nf); continue; }
  const ast = parse(code, { sourceType: "module" });
  const debutDe = (nom) => {
    const st = ast.program.body.find(s => (s.type === "VariableDeclaration" ? s.declarations.map(d => d.id.name) : [s.id?.name]).includes(nom));
    if (!st) throw new Error(`${f} : déclaration « ${nom} » introuvable`);
    return st.start;
  };
  const coupes = plan[f].map(([nom, label]) => [nom === null ? 0 : debutDe(nom), label]).sort((a, b) => a[0] - b[0]);
  if (coupes[0][0] !== 0) throw new Error(`${f} : la première coupe doit commencer au début (null)`);
  coupes.forEach(([d, label], i) => {
    const fin = i + 1 < coupes.length ? coupes[i + 1][0] : code.length;
    const nf = nomFichier(label); nouveaux[nf] = code.slice(d, fin); sortie.push(nf);
  });
}
// on remplace les anciens fichiers par les nouveaux
for (const f of ordre) fs.unlinkSync(path.join(dos, f));
for (const [nf, code] of Object.entries(nouveaux)) fs.writeFileSync(path.join(dos, nf), code.endsWith("\n") ? code : code + "\n");
fs.writeFileSync(path.join(dos, "ordre.json"), JSON.stringify(sortie, null, 2) + "\n");
console.log(`${appli} : ${ordre.length} morceaux → ${sortie.length} fichiers`);
