// Plan d'une appli : liste des déclarations de premier niveau, dans l'ordre, avec leur fichier d'origine (v1.43) si connu.
//   node outils/plan.mjs client > /tmp/plan.txt
import fs from "fs"; import path from "path";
import { parse } from "@babel/parser";
import { programme } from "./analyse.mjs";
const ici = path.dirname(new URL(import.meta.url).pathname);
const appli = process.argv[2];
const auto = JSON.parse(fs.readFileSync(path.join(ici, `noms-${appli}.auto.json`), "utf8"));
const app = JSON.parse(fs.readFileSync(path.join(ici, `noms-${appli}.applique.json`), "utf8"));
const origine = {}; for (const [ancien, v] of Object.entries(auto)) origine[app[ancien] || v.nom] = v.source;
const { texte, zones } = programme(appli);
const ast = parse(texte, { sourceType: "module" });
for (const st of ast.program.body) {
  const z = zones.find(z => st.start >= z.debut && st.start < z.fin);
  const noms = st.type === "VariableDeclaration" ? st.declarations.map(d => d.id.name || "?") : [st.id?.name || st.type];
  const src = noms.map(n => origine[n]).find(Boolean) || "";
  const ligne = texte.slice(0, st.start).split("\n").length - texte.slice(0, z.debut).split("\n").length + 1;
  console.log([z.f, ligne, st.end - st.start, src, noms.slice(0, 4).join(",")].join("\t"));
}
