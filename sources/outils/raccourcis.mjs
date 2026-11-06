// Écriture courte : { d: d, set: set } → { d, set }   et   { taille: taille = 30 } → { taille = 30 }
import fs from "fs"; import path from "path"; import { parse } from "@babel/parser";
import _traverse from "@babel/traverse"; const traverse = _traverse.default || _traverse;
const ici = path.dirname(new URL(import.meta.url).pathname);
const appli = process.argv[2], dos = path.join(ici, "..", appli); let total = 0;
for (const f of JSON.parse(fs.readFileSync(path.join(dos, "ordre.json"), "utf8"))) {
  if (f.includes("bibliotheques")) continue;
  let code = fs.readFileSync(path.join(dos, f), "utf8");
  const ast = parse(code, { sourceType: "module" }); const modifs = [];
  traverse(ast, { ObjectProperty(p) {
    const { key, value, computed, shorthand } = p.node;
    if (computed || shorthand || key.type !== "Identifier") return;
    const v = value.type === "AssignmentPattern" ? value.left : value;
    if (v.type !== "Identifier" || v.name !== key.name) return;
    modifs.push([key.start, v.start]); // on retire « nom: »
  } });
  for (const [d, e] of modifs.sort((a, b) => b[0] - a[0])) code = code.slice(0, d) + code.slice(e);
  total += modifs.length; fs.writeFileSync(path.join(dos, f), code);
}
console.log(`${appli} : ${total} écritures raccourcies`);
