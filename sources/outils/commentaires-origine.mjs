// Récupère les commentaires d'origine (v1.43) placés juste au-dessus de chaque déclaration de premier niveau.
import fs from "fs"; import path from "path"; import { parse } from "@babel/parser";
const ici = path.dirname(new URL(import.meta.url).pathname);
const res = {};
for (const f of fs.readdirSync(path.join(ici, "../reference-v1.43"))) {
  const src = fs.readFileSync(path.join(ici, "../reference-v1.43", f), "utf8");
  const ast = parse(src, { sourceType: "module", plugins: ["jsx"], attachComment: true });
  for (const st0 of ast.program.body) {
    const st = st0.declaration || st0;
    const noms = st.type === "VariableDeclaration" ? st.declarations.map(d => d.id.name).filter(Boolean) : st.id ? [st.id.name] : [];
    if (!noms.length) continue;
    const lignes = [];
    for (const c of st0.leadingComments || []) {
      if (/═{3,}/.test(c.value)) { lignes.length = 0; continue; }            // bandeau de section : on le garde pour l'en-tête de fichier
      if (c.type === "CommentBlock") lignes.push(...c.value.split("\n").map(l => l.replace(/^\s*\*\s?/, "").trimEnd()).filter(l => l.trim()));
      else lignes.push(c.value.replace(/^ /, "").trimEnd());
    }
    // commentaire en fin de ligne de la déclaration
    const fin = (st0.trailingComments || []).filter(c => c.loc.start.line === st0.loc.end.line && c.type === "CommentLine").map(c => c.value.trim());
    const txt = [...lignes, ...fin].filter(Boolean);
    if (txt.length) for (const n of noms) res[n] = { fichier: f, texte: txt };
  }
}
fs.writeFileSync(path.join(ici, "commentaires-v143.json"), JSON.stringify(res, null, 1));
console.log(Object.keys(res).length, "commentaires d'origine retrouvés");
