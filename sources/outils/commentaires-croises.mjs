// Le même code existe souvent dans plusieurs applis (thèmes, décors, roue…) avec des noms courts différents.
// Cet outil reporte les commentaires de l'appli client sur les déclarations identiques de l'admin et de la caisse
// (même contenu, comparé par les textes et la taille). Résultat : declarations_admin / declarations_caisse.
import fs from "fs"; import path from "path"; import { parse } from "@babel/parser";
import _traverse from "@babel/traverse"; const traverse = _traverse.default || _traverse;
const ici = path.dirname(new URL(import.meta.url).pathname);
const C = JSON.parse(fs.readFileSync(path.join(ici, "commentaires.json"), "utf8"));
const ORIG = JSON.parse(fs.readFileSync(path.join(ici, "commentaires-v143.json"), "utf8"));
function decls(appli) {
  const dos = path.join(ici, "..", appli), res = [];
  for (const f of JSON.parse(fs.readFileSync(path.join(dos, "ordre.json"), "utf8"))) {
    if (f.includes("bibliotheques")) continue;
    const ast = parse(fs.readFileSync(path.join(dos, f), "utf8"), { sourceType: "module" });
    for (const st of ast.program.body) {
      const noms = st.type === "VariableDeclaration" ? st.declarations.map(d => d.id.name).filter(Boolean) : st.id ? [st.id.name] : [];
      if (!noms.length) continue;
      const s = new Set();
      traverse(st, { noScope: true,
        StringLiteral(p) { s.add(p.node.value); }, TemplateElement(p) { s.add(p.node.value.raw); },
        NumericLiteral(p) { s.add("#" + p.node.value); },
        Identifier(p) { const par = p.parent; if ((par.type === "MemberExpression" && par.property === p.node && !par.computed) || (par.type === "ObjectProperty" && par.key === p.node)) s.add("." + p.node.name); },
      }, null, {});
      res.push({ noms, s, taille: st.end - st.start });
    }
  }
  return res;
}
const commentaire = (appli, noms) => { for (const n of noms) { const t = (C["declarations_" + appli] || {})[n] || C.declarations[n] || ORIG[n]?.texte?.join("\n"); if (t) return t; } return null; };
const client = decls("client").map(d => ({ ...d, c: commentaire("client", d.noms) })).filter(d => d.c);
for (const appli of ["admin", "caisse"]) {
  const cle = "declarations_" + appli; C[cle] = C[cle] || {}; let n = 0;
  for (const d of decls(appli)) {
    if (commentaire(appli, d.noms)) continue;
    let mieux = null, score = 0;
    for (const c of client) {
      const r = d.taille / c.taille; if (r < 0.6 || r > 1.6) continue;
      let inter = 0; for (const x of d.s) if (c.s.has(x)) inter++;
      const j = inter / (d.s.size + c.s.size - inter || 1);
      if (j > score) { score = j; mieux = c; }
    }
    if (mieux && score >= 0.75) { C[cle][d.noms[0]] = mieux.c; n++; }
  }
  console.log(`${appli} : ${n} commentaires reportés depuis l'appli client`);
}
fs.writeFileSync(path.join(ici, "commentaires.json"), JSON.stringify(C, null, 1));
