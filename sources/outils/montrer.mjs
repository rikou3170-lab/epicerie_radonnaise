// Affiche le code (abrégé) des déclarations de premier niveau d'un fichier, pour les relire
import fs from "fs"; import path from "path"; import { parse } from "@babel/parser";
const [, , appli, motif, max = "600"] = process.argv;
const dos = path.join(path.dirname(new URL(import.meta.url).pathname), "..", appli);
for (const f of JSON.parse(fs.readFileSync(path.join(dos, "ordre.json"), "utf8"))) {
  if (f.includes("bibliotheques") || !new RegExp(motif).test(f)) continue;
  const code = fs.readFileSync(path.join(dos, f), "utf8");
  console.log("######## " + f);
  for (const st of parse(code, { sourceType: "module" }).program.body) {
    const t = code.slice(st.start, st.end).replace(/\s+/g, " ");
    console.log("— " + (t.length > +max ? t.slice(0, +max) + " …" : t));
  }
}
