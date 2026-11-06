// Liste les noms définis dans les bibliothèques et utilisés par le code de l'appli (avec un exemple d'appel)
import fs from "fs"; import { parse } from "@babel/parser";
import _traverse from "@babel/traverse"; const traverse = _traverse.default || _traverse;
import { programme } from "./analyse.mjs";
const { texte, zones } = programme(process.argv[2]);
const ast = parse(texte, { sourceType: "module" });
const dansAppli = (pos) => zones.some(z => z.appli && pos >= z.debut && pos < z.fin);
const vus = new Map();
traverse(ast, {
  Program(p) {
    for (const [nom, b] of Object.entries(p.scope.bindings)) {
      if (dansAppli(b.identifier.start)) continue;
      const refs = b.referencePaths.filter(r => dansAppli(r.node.start));
      if (!refs.length) continue;
      const ex = refs.map(r => r.parentPath.isCallExpression() ? texte.slice(r.parentPath.node.start, Math.min(r.parentPath.node.end, r.parentPath.node.start + 90)) : texte.slice(Math.max(0, r.node.start - 20), r.node.end + 40)).slice(0, 2);
      vus.set(nom, { n: refs.length, ex });
    }
    p.stop();
  },
});
for (const [nom, v] of [...vus].sort((a, b) => b[1].n - a[1].n)) console.log(nom.padEnd(4), String(v.n).padStart(4), " | ", v.ex.map(e => e.replace(/\s+/g, " ")).join("  ‖  "));
