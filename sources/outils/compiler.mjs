// Recolle les morceaux dans l'ordre et compile (minification) → fichier prêt à publier
import fs from "fs"; import path from "path"; import * as esbuild from "esbuild";
const [, , dossier, sortie] = process.argv;
const ordre = JSON.parse(fs.readFileSync(path.join(dossier, "ordre.json"), "utf8"));
const code = ordre.map(f => fs.readFileSync(path.join(dossier, f), "utf8")).join("\n");
const r = await esbuild.transform(code, { minify: true, format: "esm", target: "es2020", charset: "ascii", legalComments: "eof" });
fs.writeFileSync(sortie, r.code);
console.log(sortie, Math.round(r.code.length / 1024), "Ko");
