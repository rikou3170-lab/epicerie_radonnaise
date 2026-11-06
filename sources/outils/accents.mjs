// Rend les textes lisibles : "appara\xEEt" → "apparaît", "\u{1F4AC}" → "💬" (dans le code de l'appli uniquement).
// Seule l'écriture change, pas la valeur : le compilateur produit exactement le même programme.
import fs from "fs"; import path from "path"; import { parse } from "@babel/parser";
import _traverse from "@babel/traverse"; const traverse = _traverse.default || _traverse;
const ici = path.dirname(new URL(import.meta.url).pathname);
const appli = process.argv[2], dos = path.join(ici, "..", appli);
const ESC = /\\x([0-9A-Fa-f]{2})|\\u\{([0-9A-Fa-f]+)\}|\\u([0-9A-Fa-f]{4})(?:\\u([0-9A-Fa-f]{4}))?/g;
const lisible = (cp) => cp >= 0xA0 && cp !== 0x2028 && cp !== 0x2029 && cp !== 0xFEFF && !(cp >= 0xD800 && cp <= 0xDFFF) && !(cp >= 0xFE00 && cp <= 0xFE0F) && cp !== 0x200D && cp !== 0xAD && !(cp >= 0x2000 && cp <= 0x200F);
function remplace(raw) {
  return raw.replace(ESC, (m, x, u, h1, h2, decal, tout) => {
    // ne pas toucher un « \\x… » précédé d'un antislash (déjà échappé)
    let n = 0; for (let i = decal - 1; i >= 0 && tout[i] === "\\"; i--) n++;
    if (n % 2) return m;
    let cp;
    if (x) cp = parseInt(x, 16);
    else if (u) cp = parseInt(u, 16);
    else {
      const a = parseInt(h1, 16), b = h2 ? parseInt(h2, 16) : null;
      if (a >= 0xD800 && a <= 0xDBFF && b >= 0xDC00 && b <= 0xDFFF) cp = 0x10000 + ((a - 0xD800) << 10) + (b - 0xDC00);
      else { const c = lisible(a) ? String.fromCodePoint(a) : "\\u" + h1; return b === null ? c : c + (lisible(b) ? String.fromCodePoint(b) : "\\u" + h2); }
    }
    return lisible(cp) ? String.fromCodePoint(cp) : m;
  });
}
let total = 0;
for (const f of JSON.parse(fs.readFileSync(path.join(dos, "ordre.json"), "utf8"))) {
  if (f.includes("bibliotheques")) continue;
  let code = fs.readFileSync(path.join(dos, f), "utf8");
  const ast = parse(code, { sourceType: "module" }); const modifs = [];
  traverse(ast, {
    StringLiteral(p) { const raw = code.slice(p.node.start, p.node.end); const r = remplace(raw); if (r !== raw) modifs.push([p.node.start, p.node.end, r]); },
    TemplateElement(p) { const raw = p.node.value.raw; const r = remplace(raw); if (r !== raw) modifs.push([p.node.start, p.node.end, r]); },
    DirectiveLiteral(p) {},
  });
  for (const [d, e, r] of modifs.sort((a, b) => b[0] - a[0])) code = code.slice(0, d) + r + code.slice(e);
  total += modifs.length; fs.writeFileSync(path.join(dos, f), code);
}
console.log(`${appli} : ${total} textes rendus lisibles`);
