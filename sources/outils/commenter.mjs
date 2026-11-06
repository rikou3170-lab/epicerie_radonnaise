// Place les commentaires dans le code d'une appli (en-tête de chaque fichier + une explication au-dessus de chaque déclaration).
//   node outils/commenter.mjs client
// Sources : outils/commentaires.json (commentaires écrits en 2026) et outils/commentaires-v143.json (commentaires d'origine).
// Les commentaires précédents placés entre les déclarations sont d'abord retirés : l'outil peut être relancé sans doublon.
import fs from "fs"; import path from "path"; import { parse } from "@babel/parser";
const ici = path.dirname(new URL(import.meta.url).pathname);
const appli = process.argv[2], dos = path.join(ici, "..", appli);
const C = JSON.parse(fs.readFileSync(path.join(ici, "commentaires.json"), "utf8"));
const ORIG = JSON.parse(fs.readFileSync(path.join(ici, "commentaires-v143.json"), "utf8"));
const propres = { ...C.declarations, ...(C["declarations_" + appli] || {}) };
const ordre = JSON.parse(fs.readFileSync(path.join(dos, "ordre.json"), "utf8"));
const manquants = []; let poses = 0;
const enLignes = (txt) => txt.split("\n").map(l => "// " + l).join("\n");

for (const f of ordre) {
  if (f.includes("bibliotheques")) continue;
  const label = f.replace(/^\d+-|\.js$/g, "");
  let code = fs.readFileSync(path.join(dos, f), "utf8");
  // 1. on retire les commentaires placés entre les déclarations (ceux d'un passage précédent)
  let ast = parse(code, { sourceType: "module", attachComment: false });
  const dedans = (c) => ast.program.body.some(s => c.start >= s.start && c.end <= s.end);
  const aRetirer = ast.comments.filter(c => !dedans(c)).sort((a, b) => b.start - a.start);
  for (const c of aRetirer) { let fin = c.end; while (code[fin] === "\n") fin++; code = code.slice(0, c.start) + code.slice(fin); }
  code = code.replace(/^\s+/, "");
  // 2. on pose les nouveaux
  ast = parse(code, { sourceType: "module" });
  const poses2 = [];
  ast.program.body.forEach((st, i) => {
    const noms = st.type === "VariableDeclaration" ? st.declarations.map(d => d.id.name).filter(Boolean) : st.id ? [st.id.name] : [];
    let txt = null;
    for (const n of noms) {
      const o = ORIG[n]?.texte?.join("\n"), p = propres[n];
      if (p || o) { txt = p && o && !o.includes(p) ? o + "\n" + p : (o || p); break; }
    }
    txt = txt || propres[`${label}:${i + 1}`];
    if (txt) { poses2.push([st.start, enLignes(txt)]); poses++; }
    else if (st.end - st.start >= 120) manquants.push(`${f} — ${noms.join(",") || label + ":" + (i + 1)}`);
  });
  for (const [pos, txt] of poses2.sort((a, b) => b[0] - a[0])) {
    const debutLigne = code.lastIndexOf("\n", pos - 1) + 1;
    const avant = code.slice(debutLigne, pos);
    const sep = debutLigne > 0 && code[debutLigne - 2] !== "\n" ? "\n" : "";
    code = code.slice(0, debutLigne) + sep + txt.replace(/^/gm, avant) + "\n" + code.slice(debutLigne);
  }
  const entete = C.fichiers[label];
  if (entete) code = "/* ═══════════════════════════════════════════════════════════════════════\n" + entete.split("\n").map(l => " *  " + l).join("\n") + "\n * ═══════════════════════════════════════════════════════════════════════ */\n\n" + code;
  else manquants.push(`${f} — (en-tête de fichier)`);
  fs.writeFileSync(path.join(dos, f), code);
}
console.log(`${appli} : ${poses} commentaires posés, ${manquants.length} déclarations importantes sans commentaire`);
const fm = path.join(ici, `sans-commentaire-${appli}.txt`); if (fs.existsSync(fm)) fs.unlinkSync(fm);
if (manquants.length) fs.writeFileSync(path.join(ici, `sans-commentaire-${appli}.txt`), manquants.join("\n") + "\n");
