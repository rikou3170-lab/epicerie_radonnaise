// Pour chaque déclaration de premier niveau de la v1.43 : la section (bandeau « ═══ … ═══ ») où elle se trouvait
import fs from "fs"; import path from "path"; import { parse } from "@babel/parser";
const ici = path.dirname(new URL(import.meta.url).pathname);
const res = {};
for (const f of fs.readdirSync(path.join(ici, "../reference-v1.43"))) {
  const src = fs.readFileSync(path.join(ici, "../reference-v1.43", f), "utf8");
  const ast = parse(src, { sourceType: "module", plugins: ["jsx"], attachComment: true });
  let section = f.replace(/\.(jsx|js)$/, "");
  for (const st0 of ast.program.body) {
    for (const c of st0.leadingComments || []) { const m = c.value.match(/═+\s*([^═]+?)\s*═+/); if (m && c.type === "CommentLine") section = f.replace(/\.(jsx|js)$/, "") + " / " + m[1].trim(); }
    const st = st0.declaration || st0;
    const noms = st.type === "VariableDeclaration" ? st.declarations.map(d => d.id.name) : st.id ? [st.id.name] : [];
    for (const n of noms) if (n) res[n] = section;
  }
}
fs.writeFileSync(path.join(ici, "sections-v143.json"), JSON.stringify(res, null, 1));
console.log(Object.keys(res).length, "déclarations repérées");
