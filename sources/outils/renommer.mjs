// Renomme, dans tout le programme d'une appli, les noms courts en noms clairs.
//   node outils/renommer.mjs client
// Utilise noms-<appli>.auto.json (retrouvés depuis la v1.43) puis noms-<appli>.manuel.json (prioritaire).
// Le renommage passe par l'analyse du code (portée des variables) : seules les vraies références sont changées.
import fs from "fs"; import path from "path";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse"; const traverse = _traverse.default || _traverse;
import { programme } from "./analyse.mjs";

const ici = path.dirname(new URL(import.meta.url).pathname);
const appli = process.argv[2];
const lire = (f) => fs.existsSync(path.join(ici, f)) ? JSON.parse(fs.readFileSync(path.join(ici, f), "utf8")) : {};
const auto = Object.fromEntries(Object.entries(lire(`noms-${appli}.auto.json`)).map(([k, v]) => [k, v.nom]));
const voulu = { ...auto, ...lire(`noms-${appli}.manuel.json`), ...lire(`noms-${appli}.complement.json`) };

const { texte, zones, dos } = programme(appli);
const ast = parse(texte, { sourceType: "module" });

// tous les noms déjà utilisés (toutes portées), pour ne jamais créer de conflit
const utilises = new Set();
traverse(ast, { Identifier(p) {
  const par = p.parent;
  // les noms de propriétés (objet.nom, { nom: … }) ne sont pas des variables : pas de conflit possible
  if ((par.type === "MemberExpression" || par.type === "OptionalMemberExpression") && par.property === p.node && !par.computed) return;
  if ((par.type === "ObjectProperty" || par.type === "ObjectMethod" || par.type === "ClassMethod" || par.type === "ClassProperty") && par.key === p.node && !par.computed && !par.shorthand) return;
  utilises.add(p.node.name);
} });
const RESERVES = new Set(["window", "document", "navigator", "location", "globalThis", "self", "Object", "Array", "String", "Number", "Date", "Math", "JSON", "Promise", "Error", "Set", "Map", "crypto", "fetch", "console", "localStorage", "sessionStorage", "Intl", "URL", "Notification", "Image", "Blob"]);

let racine; traverse(ast, { Program(p) { racine = p; p.stop(); } });
const globaux = new Set(Object.keys(racine.scope.globals || {}));
traverse(ast, { ReferencedIdentifier(p) { if (!p.scope.getBinding(p.node.name)) globaux.add(p.node.name); } });
const liaisons = racine.scope.bindings;
const choisis = new Map(), pris = new Set();
for (const [ancien, nouveau0] of Object.entries(voulu)) {
  if (!liaisons[ancien] || ancien === nouveau0) continue;
  let nouveau = nouveau0, i = 2;
  // conflit seulement si le nouveau nom existe au premier niveau, est une variable globale du navigateur,
  // ou masquerait / serait masqué là où la variable est utilisée
  const conflit = (n) => pris.has(n) || RESERVES.has(n) || liaisons[n] || globaux.has(n) ||
    [liaisons[ancien].identifier && liaisons[ancien].path, ...liaisons[ancien].referencePaths].some(r => r && r.scope.getBinding(n));
  while (conflit(nouveau)) nouveau = nouveau0 + i++;
  pris.add(nouveau); choisis.set(ancien, nouveau);
}

// relevé des modifications (position → nouveau texte)
const modifs = [];
const ajout = (node, ancien, nouveau, parent) => {
  if (parent && (parent.type === "ObjectProperty" || parent.type === "Property") && parent.shorthand && parent.value === node)
    modifs.push({ debut: node.start, fin: node.end, texte: `${ancien}: ${nouveau}`, raccourci: true, prop: parent });
  else modifs.push({ debut: node.start, fin: node.end, texte: nouveau });
};
for (const [ancien, nouveau] of choisis) {
  const b = liaisons[ancien];
  ajout(b.identifier, ancien, nouveau, b.path.parent);
  for (const r of b.referencePaths) ajout(r.node, ancien, nouveau, r.parent);
  for (const c of b.constantViolations) {
    const ids = c.getBindingIdentifiers();
    const id = ids[ancien];
    if (id) ajout(id, ancien, nouveau, null);
  }
}
// raccourcis { a } : on remplace toute la propriété pour éviter un double remplacement
const vus = new Set(), finales = [];
for (const m of modifs.sort((x, y) => x.debut - y.debut)) {
  const cle = m.debut + ":" + m.fin; if (vus.has(cle)) continue; vus.add(cle); finales.push(m);
}

// application, du bout vers le début, en suivant le découpage en morceaux
let t = texte; const decal = zones.map(() => 0);
for (const m of finales.slice().reverse()) {
  t = t.slice(0, m.debut) + m.texte + t.slice(m.fin);
  const z = zones.findIndex(z => m.debut >= z.debut && m.debut < z.fin);
  decal[z] += m.texte.length - (m.fin - m.debut);
}
let pos = 0;
zones.forEach((z, i) => {
  const long = (z.fin - z.debut) + decal[i];
  fs.writeFileSync(path.join(dos, z.f), t.slice(pos, pos + long));
  pos += long + 1; // le « \n » ajouté entre les morceaux
});
console.log(`${appli} : ${choisis.size} noms renommés (${finales.length} endroits)`);
fs.writeFileSync(path.join(ici, `noms-${appli}.applique.json`), JSON.stringify(Object.fromEntries(choisis), null, 1));
