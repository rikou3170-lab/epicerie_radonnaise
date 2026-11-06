// Noms clairs pour les variables À L'INTÉRIEUR des fonctions :
//  1. propriétés reçues : function X({ onDone: t }) → t devient onDone
//  2. états React : const [r, i] = useState("") → noms d'origine de la v1.43 quand la fonction correspond exactement
// Sans risque : chaque renommage vérifie qu'aucun autre nom n'entre en conflit dans la fonction.
import fs from "fs"; import path from "path";
import { parse } from "@babel/parser";
import _traverse from "@babel/traverse"; const traverse = _traverse.default || _traverse;
import { programme } from "./analyse.mjs";

const ici = path.dirname(new URL(import.meta.url).pathname), racine = path.resolve(ici, "..");
const appli = process.argv[2];
const REF = { client: ["client.jsx"], admin: ["admin.jsx"], caisse: ["caisse.jsx"] }[appli].concat(["themes.jsx", "maj.jsx"]);
const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const MOTS = new Set(["default", "class", "function", "new", "delete", "in", "of", "let", "var", "const", "this", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "try", "catch", "finally", "throw", "typeof", "instanceof", "void", "with", "yield", "await", "async", "import", "export", "super", "extends", "enum", "static", "null", "true", "false", "undefined", "arguments", "eval"]);

// ── états React de la v1.43 : fonction → [[valeur, setter, forme de la valeur initiale], …]
const etatInit = (n) => !n ? "rien" : n.type === "ArrowFunctionExpression" ? "fn" : n.type === "UnaryExpression" && n.argument.type === "NumericLiteral" ? "bool" : n.type === "BooleanLiteral" ? "bool" : n.type;
function etats(fnPath, estUseState) {
  const res = [];
  fnPath.traverse({
    Function(p) { p.skip(); },
    VariableDeclarator(p) {
      const id = p.node.id, init = p.node.init;
      if (id.type === "ArrayPattern" && id.elements.length === 2 && id.elements.every(e => e && e.type === "Identifier") && init && init.type === "CallExpression" && estUseState(init.callee))
        res.push([id.elements[0].name, id.elements[1].name, etatInit(init.arguments[0]), p]);
    },
  });
  return res;
}
const refEtats = new Map();
for (const f of REF) {
  const a = parse(fs.readFileSync(path.join(racine, "reference-v1.43", f), "utf8"), { sourceType: "module", plugins: ["jsx"] });
  traverse(a, {
    FunctionDeclaration(p) { if (p.parent.type === "Program" || p.parent.type === "ExportNamedDeclaration") refEtats.set(p.node.id.name, etats(p, c => c.type === "Identifier" && c.name === "useState")); },
  });
}

const { texte, zones, dos } = programme(appli);
const ast = parse(texte, { sourceType: "module" });
const modifs = [];
const nouveauxNoms = new Map(); // nœud de déclaration → nouveau nom
const nomEffectif = (b) => nouveauxNoms.get(b.identifier) || b.identifier.name;
const visible = (scope, nom) => { for (let s = scope; s; s = s.parent) for (const b of Object.values(s.bindings)) if (nomEffectif(b) === nom) return true; return false; };
let nbProps = 0, nbEtats = 0;

function nomsUtilises(fnPath) {
  const s = new Set();
  fnPath.traverse({ Identifier(p) {
    const par = p.parent;
    if ((par.type === "MemberExpression" || par.type === "OptionalMemberExpression") && par.property === p.node && !par.computed) return;
    if ((par.type === "ObjectProperty" || par.type === "ObjectMethod") && par.key === p.node && !par.computed && !par.shorthand) return;
    const b = p.scope.getBinding(p.node.name);
    s.add(b ? nomEffectif(b) : p.node.name);
  } });
  return s;
}
function renommerLocal(fnPath, utilises, binding, nouveau) {
  if (!binding || binding.identifier.name === nouveau || !IDENT.test(nouveau) || MOTS.has(nouveau) || utilises.has(nouveau)) return false;
  // le nouveau nom ne doit pas masquer un nom extérieur utilisé dans la portée de la variable
  if (visible(binding.scope, nouveau)) return false;
  const ancien = binding.identifier.name;
  const pose = (node, parent) => {
    if (parent && parent.type === "ObjectProperty" && parent.shorthand && parent.value === node) modifs.push([node.start, node.end, `${ancien}: ${nouveau}`]);
    else modifs.push([node.start, node.end, nouveau]);
  };
  pose(binding.identifier, binding.path.parent);
  for (const r of binding.referencePaths) pose(r.node, r.parent);
  for (const c of binding.constantViolations) { const id = c.getBindingIdentifiers()[ancien]; if (id) pose(id, null); }
  nouveauxNoms.set(binding.identifier, nouveau);
  utilises.delete(ancien); utilises.add(nouveau);
  return true;
}

traverse(ast, {
  Function(p) {
    if (!zones.some(z => z.appli && p.node.start >= z.debut && p.node.start < z.fin)) return; // bibliothèques : on n'y touche pas
    const utilises = nomsUtilises(p);
    // 1. propriétés reçues
    const p0 = p.node.params[0];
    if (p0 && p0.type === "ObjectPattern") for (const prop of p0.properties) {
      if (prop.type !== "ObjectProperty" || prop.computed || prop.key.type !== "Identifier") continue;
      const v = prop.value.type === "AssignmentPattern" ? prop.value.left : prop.value;
      if (v.type !== "Identifier" || v.name === prop.key.name) continue;
      if (renommerLocal(p, utilises, p.scope.getOwnBinding(v.name), prop.key.name)) nbProps++;
    }
    // 2. états React, pour les fonctions de premier niveau qui ont gardé leur nom d'origine
    const nom = p.node.id?.name;
    if (nom && refEtats.has(nom) && p.parentPath.isProgram()) {
      const ref = refEtats.get(nom);
      const ici2 = etats(p, c => c.type === "MemberExpression" && c.property.name === "useState" || (c.type === "SequenceExpression" && c.expressions.at(-1)?.property?.name === "useState"));
      if (ref.length && ref.length === ici2.length && ref.every((r, i) => r[2] === ici2[i][2])) {
        ici2.forEach(([v, s, , dp], i) => {
          const sc = dp.scope;
          if (renommerLocal(p, utilises, sc.getBinding(v), ref[i][0])) nbEtats++;
          if (renommerLocal(p, utilises, sc.getBinding(s), ref[i][1])) nbEtats++;
        });
      }
    }
  },
});

// application (positions uniques, de la fin vers le début), en respectant le découpage
const uniq = new Map(); for (const m of modifs) uniq.set(m[0] + ":" + m[1], m);
const finales = [...uniq.values()].sort((a, b) => b[0] - a[0]);
let t = texte; const decal = zones.map(() => 0);
for (const [d, f, txt] of finales) {
  t = t.slice(0, d) + txt + t.slice(f);
  const z = zones.findIndex(z => d >= z.debut && d < z.fin); decal[z] += txt.length - (f - d);
}
let pos = 0;
zones.forEach((z, i) => { const long = (z.fin - z.debut) + decal[i]; fs.writeFileSync(path.join(dos, z.f), t.slice(pos, pos + long)); pos += long + 1; });
console.log(`${appli} : ${nbProps} propriétés reçues et ${nbEtats} états React renommés`);
