// Analyse d'une appli reconstituée : retrouve les noms d'origine (v1.43) des fonctions et constantes,
// en comparant les textes qu'elles contiennent. Sortie : outils/noms-<appli>.auto.json + liste des non trouvés.
import fs from "fs"; import path from "path";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
const traverse = _traverse.default || _traverse;

const ici = path.dirname(new URL(import.meta.url).pathname), racine = path.resolve(ici, "..");
const appli = process.argv[2];
const REF = { client: ["client.jsx"], admin: ["admin.jsx"], caisse: ["caisse.jsx"] }[appli]
  .concat(["themes.jsx", "maj.jsx", "fidelite.js", "boutique.js", "commande.js", "firebase.js", "chat.js", "version.js"]);

export function programme(appli) {
  const dos = path.join(racine, appli), ordre = JSON.parse(fs.readFileSync(path.join(dos, "ordre.json"), "utf8"));
  let texte = "", zones = [];
  for (const f of ordre) { const t = fs.readFileSync(path.join(dos, f), "utf8"); zones.push({ f, debut: texte.length, fin: texte.length + t.length, appli: !f.includes("bibliotheques") }); texte += t + "\n"; }
  return { texte, zones, ordre, dos };
}

const norm = (s) => String(s).replace(/\s+/g, " ").trim();
function textes(nodePath) {
  const s = new Set();
  nodePath.traverse({
    StringLiteral(p) { const v = norm(p.node.value); if (v.length >= 4) s.add(v); },
    TemplateElement(p) { const v = norm(p.node.value.cooked ?? ""); if (v.length >= 4) s.add(v); },
    JSXText(p) { const v = norm(p.node.value); if (v.length >= 4) s.add(v); },
  });
  return s;
}
function declarations(ast, filtre) {
  const res = [];
  traverse(ast, {
    Program(p) {
      for (const st of p.get("body")) {
        if (filtre && !filtre(st.node)) continue;
        const d = st.isExportNamedDeclaration() || st.isExportDefaultDeclaration() ? st.get("declaration") : st;
        if (!d || !d.node) continue;
        if (d.isFunctionDeclaration() || d.isClassDeclaration()) { if (d.node.id) res.push({ nom: d.node.id.name, textes: textes(d), taille: d.node.end - d.node.start, noeud: d.node, genre: d.isFunctionDeclaration() ? "fonction" : "classe" }); }
        else if (d.isVariableDeclaration()) for (const v of d.get("declarations")) if (v.node.id.type === "Identifier")
          res.push({ nom: v.node.id.name, textes: v.node.init ? textes(v.get("init")) : new Set(), taille: v.node.end - v.node.start, noeud: v.node, genre: "variable", valeur: v.node.init && ["StringLiteral", "NumericLiteral"].includes(v.node.init.type) ? v.node.init.value : undefined });
      }
      p.stop();
    },
  });
  return res;
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const { texte, zones } = programme(appli);
  const ast = parse(texte, { sourceType: "module" });
  const dansAppli = (n) => zones.some(z => z.appli && n.start >= z.debut && n.start < z.fin);
  const bundle = declarations(ast, dansAppli);
  const refs = [];
  for (const f of REF) {
    const src = fs.readFileSync(path.join(racine, "reference-v1.43", f), "utf8");
    const a = parse(src, { sourceType: "module", plugins: ["jsx"] });
    for (const d of declarations(a)) refs.push({ ...d, fichier: f });
  }
  // valeurs simples identiques (clés localStorage, etc.)
  const paires = [];
  for (const b of bundle) for (const r of refs) {
    let score = 0, communs = 0;
    if (b.valeur !== undefined && b.valeur === r.valeur && String(b.valeur).length >= 6) score = 1, communs = 1;
    else if (b.textes.size && r.textes.size) {
      let inter = 0, poidsI = 0, poidsU = 0;
      const tout = new Set([...b.textes, ...r.textes]);
      for (const t of tout) { const w = Math.log(2 + t.length); poidsU += w; if (b.textes.has(t) && r.textes.has(t)) { poidsI += w; inter++; } }
      communs = inter; score = poidsU ? poidsI / poidsU : 0;
    }
    const fort = [...b.textes].some(t => r.textes.has(t) && t.length >= 12) || (b.valeur !== undefined && b.valeur === r.valeur);
    if (score >= 0.35 && (communs >= 2 || (score >= 0.8 && fort))) paires.push({ b: b.nom, r: r.nom, fichier: r.fichier, score: +score.toFixed(2), communs });
  }
  paires.sort((x, y) => y.score - x.score);
  const prisB = new Set(), prisR = new Set(), noms = {};
  for (const p of paires) { if (prisB.has(p.b) || prisR.has(p.r)) continue; prisB.add(p.b); prisR.add(p.r); noms[p.b] = { nom: p.r, source: p.fichier, score: p.score }; }
  fs.writeFileSync(path.join(ici, `noms-${appli}.auto.json`), JSON.stringify(noms, null, 1));
  const restants = bundle.filter(b => !noms[b.nom]);
  console.log(`${appli} : ${bundle.length} déclarations dans le code de l'appli, ${Object.keys(noms).length} noms retrouvés, ${restants.length} restants`);
  fs.writeFileSync(path.join(ici, `restants-${appli}.txt`), restants.map(b => `${b.nom}\t${b.genre}\t${b.taille}\t${[...b.textes].slice(0, 4).join(" | ").slice(0, 160)}`).join("\n"));
}
