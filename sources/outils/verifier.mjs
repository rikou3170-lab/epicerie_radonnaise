// Preuve d'équivalence entre un fichier compilé (en ligne) et les sources :
//   node outils/verifier.mjs ../client.js client
// 1. les deux passent dans le même compilateur ;
// 2. si le texte diffère seulement par les NOMS de variables (renommage), on remplace chaque nom par un
//    numéro d'ordre selon sa portée (analyse du code) : deux programmes identiques à des noms près donnent
//    alors exactement le même texte. Sinon → DIFFÉRENT.
import fs from "fs"; import path from "path"; import * as esbuild from "esbuild";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse"; const traverse = _traverse.default || _traverse;

const [, , original, dossierArg] = process.argv;
const dossier = path.isAbsolute(dossierArg) || fs.existsSync(dossierArg) ? dossierArg : path.join(path.dirname(new URL(import.meta.url).pathname), "..", dossierArg);
const ordre = JSON.parse(fs.readFileSync(path.join(dossier, "ordre.json"), "utf8"));
const recolle = ordre.map(f => fs.readFileSync(path.join(dossier, f), "utf8")).join("\n");
const opt = { minify: true, format: "esm", target: "es2020", charset: "ascii", legalComments: "none" };
const a = (await esbuild.transform(fs.readFileSync(original, "utf8"), opt)).code;
const b = (await esbuild.transform(recolle, opt)).code;

function canonique(code) {
  const ast = parse(code, { sourceType: "module" });
  const noms = new Map(); // position de l'identifiant → nom canonique
  let n = 0;
  traverse(ast, {
    Scopable: { enter(p) {
      const liste = Object.values(p.scope.bindings).sort((x, y) => x.identifier.start - y.identifier.start);
      for (const b of liste) {
        if (b.__vu) continue; b.__vu = true;
        const c = "v" + (n++);
        noms.set(b.identifier.start, c);
        for (const r of b.referencePaths) noms.set(r.node.start, c);
        for (const v of b.constantViolations) { const id = v.getBindingIdentifiers()[b.identifier.name]; if (id) noms.set(id.start, c); }
      }
    } },
  });
  // réécriture : chaque identifiant lié est remplacé par son nom canonique
  const ids = [];
  // écriture courte { r } ou { r = 1 } : on la développe en { r: nom } pour comparer à égalité avec { r: nom }
  traverse(ast, { Identifier(p) {
    if (!noms.has(p.node.start)) return;
    const par = p.parent, gp = p.parentPath.parent;
    if (par.type === "ObjectProperty" && par.shorthand && par.key === p.node && par.value !== p.node) return; // la clé, traitée avec la valeur
    const court = (par.type === "ObjectProperty" && par.shorthand && par.value === p.node) ||
      (par.type === "AssignmentPattern" && par.left === p.node && gp?.type === "ObjectProperty" && gp.shorthand);
    ids.push([p.node.start, p.node.end, (court ? p.node.name + ":" : "") + noms.get(p.node.start)]);
  } });
  ids.sort((x, y) => x[0] - y[0]);
  let out = "", pos = 0;
  for (const [d, f, c] of ids) { if (d < pos) continue; out += code.slice(pos, d) + c; pos = f; }
  return out + code.slice(pos);
}

const nom = path.basename(original);
if (a === b) console.log(nom, "✅ IDENTIQUE (texte compilé strictement égal)");
else {
  const ca = canonique(a), cb = canonique(b);
  if (ca === cb) console.log(nom, "✅ IDENTIQUE (même programme, seuls les noms de variables changent)");
  else {
    let i = 0; while (ca[i] === cb[i]) i++;
    console.log(nom, "❌ DIFFÉRENT"); console.log(ca.slice(i - 100, i + 100)); console.log(cb.slice(i - 100, i + 100));
    process.exitCode = 1;
  }
}
