// Liste des déclarations de premier niveau du code de l'appli, avec un résumé (pour écrire les commentaires)
import fs from "fs"; import path from "path"; import { parse } from "@babel/parser";
import _traverse from "@babel/traverse"; const traverse = _traverse.default || _traverse;
const ici = path.dirname(new URL(import.meta.url).pathname);
const appli = process.argv[2], dos = path.join(ici, "..", appli);
const orig = JSON.parse(fs.readFileSync(path.join(ici, "commentaires-v143.json"), "utf8"));
const ordre = JSON.parse(fs.readFileSync(path.join(dos, "ordre.json"), "utf8"));
const norm = s => String(s).replace(/\s+/g, " ").trim();
for (const f of ordre) {
  if (f.includes("bibliotheques")) continue;
  const code = fs.readFileSync(path.join(dos, f), "utf8");
  const ast = parse(code, { sourceType: "module" });
  console.log("## " + f);
  for (const st of ast.program.body) {
    const noms = st.type === "VariableDeclaration" ? st.declarations.map(d => d.id.name || "{…}") : [st.id?.name || st.type];
    const deja = noms.some(n => orig[n]);
    const textes = new Set();
    traverse(st, { noScope: true, StringLiteral(p) { const v = norm(p.node.value); if (v.length >= 3 && v.length < 90) textes.add(v); }, TemplateElement(p) { const v = norm(p.node.value.cooked || ""); if (v.length >= 3 && v.length < 90) textes.add(v); } }, null, {});
    const props = st.type === "FunctionDeclaration" && st.params[0]?.type === "ObjectPattern" ? "(" + st.params[0].properties.map(p => p.key?.name).filter(Boolean).join(",") + ")" : "";
    console.log(`${deja ? "✓" : "·"} ${noms.join(",")}${props} [${st.end - st.start}] ${[...textes].slice(0, 6).join(" | ").slice(0, 200)}`);
  }
}
