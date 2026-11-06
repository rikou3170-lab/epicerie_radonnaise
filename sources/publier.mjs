// Publie une nouvelle version À PARTIR DES SOURCES.
//   node sources/publier.mjs 2.38
// 1. met le numéro de version partout (sources, pages, service worker, version.json)
// 2. recompile client.js, admin.js, caisse.js depuis sources/<appli>/
// Ensuite : tester, puis git add -A && git commit && git push (les sources partent avec l'appli).
import fs from "fs"; import path from "path"; import { execFileSync } from "child_process";
const racine = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const nouv = process.argv[2];
if (!/^\d+\.\d+[a-z]?$/.test(nouv || "")) { console.error("Usage : node sources/publier.mjs 2.38"); process.exit(1); }
const anc = JSON.parse(fs.readFileSync(path.join(racine, "version.json"), "utf8")).version;
const remplacer = (fichier, a, b) => {
  const t = fs.readFileSync(fichier, "utf8"); const n = t.split(a).length - 1;
  if (n !== 1) throw new Error(`${fichier} : « ${a} » trouvé ${n} fois (1 attendu)`);
  fs.writeFileSync(fichier, t.replace(a, b));
};
for (const app of ["client", "admin", "caisse"]) {
  const dos = path.join(racine, "sources", app);
  const ordre = JSON.parse(fs.readFileSync(path.join(dos, "ordre.json"), "utf8"));
  // numéro actuel des sources (normalement = version.json ; accepte aussi une relance avec le même numéro)
  const re = new RegExp(`var (\\w+) ?= ?"(${anc.replace(".", "\\.")}|${nouv.replace(".", "\\.")})";`);
  const f = ordre.map(x => path.join(dos, x)).find(x => re.test(fs.readFileSync(x, "utf8")));
  if (!f) throw new Error(`${app} : numéro de version ${anc} introuvable dans les sources`);
  const m = fs.readFileSync(f, "utf8").match(re)[0];
  if (!m.includes(`"${nouv}"`)) remplacer(f, m, m.replace(`"${anc}"`, `"${nouv}"`));
  execFileSync("node", [path.join(racine, "sources/outils/compiler.mjs"), dos, path.join(racine, app + ".js")], { stdio: "inherit" });
}
remplacer(path.join(racine, "index.html"), `client.js?v=${anc}`, `client.js?v=${nouv}`);
remplacer(path.join(racine, "admin.html"), `admin.js?v=${anc}`, `admin.js?v=${nouv}`);
remplacer(path.join(racine, "caisse.html"), `caisse.js?v=${anc}`, `caisse.js?v=${nouv}`);
remplacer(path.join(racine, "sw.js"), `const VERSION = "${anc}"`, `const VERSION = "${nouv}"`);
fs.writeFileSync(path.join(racine, "version.json"), `{ "version": "${nouv}" }\n`);
console.log(`Version ${anc} → ${nouv} prête. À tester avant git push.`);
