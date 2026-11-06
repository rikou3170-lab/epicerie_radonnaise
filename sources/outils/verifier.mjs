// Preuve d'équivalence : l'original et la recompilation, passés dans le même compilateur, donnent exactement le même code
import fs from "fs"; import path from "path"; import * as esbuild from "esbuild";
const [, , original, dossier] = process.argv;
const ordre = JSON.parse(fs.readFileSync(path.join(dossier, "ordre.json"), "utf8"));
const recolle = ordre.map(f => fs.readFileSync(path.join(dossier, f), "utf8")).join("\n");
const opt = { minify: true, format: "esm", target: "es2020", charset: "ascii", legalComments: "none" };
const a = (await esbuild.transform(fs.readFileSync(original, "utf8"), opt)).code;
const b = (await esbuild.transform(recolle, opt)).code;
console.log(path.basename(original), a === b ? "✅ IDENTIQUE" : "❌ DIFFÉRENT", a.length, b.length);
if (a !== b) { let i = 0; while (a[i] === b[i]) i++; console.log(a.slice(i - 80, i + 80)); console.log(b.slice(i - 80, i + 80)); }
