# Sources de l'appli — Épicerie Raddonnaise

Ce dossier contient **le code source** des trois applis : client (`index.html`), administration (`admin.html`) et caisse (`caisse.html`).
Il est mis à jour **à chaque nouvelle version**, en même temps que l'appli : il ne peut plus se perdre.

## Ce qu'il y a dedans

| Dossier | Contenu |
|---|---|
| `client/`, `admin/`, `caisse/` | Le code de chaque appli, découpé en morceaux dans l'ordre (`ordre.json`) |
| `…-appli.js` | **Le code de l'épicerie**, mis en forme lisible : c'est là qu'on fait les modifications |
| `…-bibliotheques.js` | Les bibliothèques (React, Firebase, QR code…), à ne pas toucher |
| `outils/` | `compiler.mjs` (recolle et compile), `verifier.mjs` (preuve d'équivalence), `decouper.mjs` (découpage d'un fichier compilé) |
| `publier.mjs` | Prépare une nouvelle version **à partir des sources** |
| `reference-v1.43/` | Ancienne version (v1.43) des sources, avec les noms d'origine : sert de repère pour comprendre le code |

## Origine (6 novembre 2026)

Les sources d'origine (v1.44 → v2.35) ont été perdues lors de l'effacement d'un espace de travail : elles n'avaient jamais été mises sur GitHub.
Elles ont été **reconstituées à partir de l'appli en ligne v2.37** :

- le code a été séparé en « appli » et « bibliothèques », puis remis en forme lisible ;
- **preuve** : l'appli en ligne et l'appli recompilée depuis ces sources donnent un code **strictement identique** une fois passées dans le même compilateur (`node sources/outils/verifier.mjs client.js sources/client` → ✅ IDENTIQUE, idem admin et caisse) ;
- l'appli recompilée a aussi été testée en simulation : démarrage, onglets, thème de Noël, création de carte, admin et caisse, sans erreur.

Limite : les **noms internes** (variables, fonctions) sont restés courts, comme dans la version compilée (`v9`, `fO`…). Le code fonctionne et se modifie, mais il est moins agréable à lire que l'original. Les renommer en noms clairs pourra se faire petit à petit, en s'aidant de `reference-v1.43/`.

### Repères utiles

| Nom | Où | Rôle |
|---|---|---|
| `v9` | client | Formulaire « Ma carte de fidélité » (création de carte, garde-fou Facebook / Safari) |
| `fO` | client | Détection du navigateur (iPhone, Android, Facebook, Instagram…) |
| `__nomP`, `__telF` | client | Mise en forme des noms (Majuscules) et des téléphones (06 12 34 56 78) |
| `X9` | admin | Messages tout prêts envoyés aux clients (commandes, réservations) |
| `fw`, `mw` | admin | Statuts des commandes et boutons « étape suivante » |

## Publier une nouvelle version

```
cd sources && npm install        # la première fois seulement
cd ..
# 1. modifier le code dans sources/<appli>/…-appli.js
# 2. préparer la version (numéro partout + recompilation) :
node sources/publier.mjs 2.38
# 3. tester, puis publier appli + sources ensemble :
git add -A && git commit -m "v2.38 : …" && git push
```

**Règle : on ne modifie plus jamais `client.js`, `admin.js` ou `caisse.js` à la main.** On modifie les sources, puis `publier.mjs` recompile.
