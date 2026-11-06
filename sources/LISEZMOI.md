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

### Noms clairs (6 novembre 2026, soir)

Les noms courts de la version compilée ont ensuite été remplacés par des noms clairs :

- **noms d'origine retrouvés** : en comparant les textes de chaque fonction avec la v1.43 (`reference-v1.43/`), environ 200 fonctions et constantes ont retrouvé leur nom d'origine (`Fidelite`, `useMiseAJour`, `envoyerMail`, `CONFIG_REF`…) ;
- **outils** : `React`, et pour Firebase `db`, `doc`, `collection`, `onSnapshot`, `setDoc`, `writeBatch`…, comme dans le code d'origine ;
- **fonctions ajoutées depuis la v1.43** : nommées d'après ce qu'elles font (`FormulaireCarte`, `RoueNoel`, `EditeurMenuDaval`, `MESSAGES_PRETS`…) ;
- **à l'intérieur des fonctions** : les propriétés reçues (`onDone`, `onClose`…) et, quand la fonction correspond à la v1.43, les états (`prenom`, `setPrenom`…).

Chaque étape est **prouvée sans effet sur le fonctionnement** : `verifier.mjs` compare l'appli en ligne et la recompilation des sources en remplaçant chaque nom de variable par un numéro selon sa portée ; le résultat doit être identique (✅), sinon c'est refusé (❌). Testé aussi en simulation (démarrage, onglets, thème de Noël, création de carte, admin, caisse).

Il reste des petits noms d'une lettre pour les variables locales (`t`, `e`, `n`…) et pour les décors des thèmes : le code reste lisible grâce aux textes affichés, et on peut continuer à renommer petit à petit avec `outils/renommer.mjs` (fichiers `outils/noms-<appli>.manuel.json`), toujours suivi de `verifier.mjs`.

### Repères utiles

| Nom | Où | Rôle |
|---|---|---|
| `FormulaireCarte` | client | Formulaire « Ma carte de fidélité » (création de carte, garde-fou Facebook / Safari) |
| `plateforme` | client | Détection du navigateur (iPhone, Android, Facebook, Instagram…) |
| `nomPropre`, `telFormate` | client | Mise en forme des noms (Majuscules) et des téléphones (06 12 34 56 78) |
| `RoueNoel`, `ReglementRoue` | client / admin | Roue de Noël et son règlement |
| `MESSAGES_PRETS` | admin | Messages tout prêts envoyés aux clients (commandes, réservations) |
| `STATUTS_COMMANDE`, `ETAPE_SUIVANTE` | admin | Statuts des commandes et boutons « étape suivante » |
| `EditeurMenuDaval`, `lancerOCR` | admin | Menu de la semaine de la charcuterie Daval (lecture de la photo) |
| `EcranCaisse`, `FicheClient` | caisse | Écran principal de la caisse, fiche client |
| `VERSION` | les trois | Numéro de version (changé par `publier.mjs`) |

## Outils

| Outil | Rôle |
|---|---|
| `outils/compiler.mjs` | Recolle les morceaux et compile |
| `outils/verifier.mjs` | Preuve d'équivalence avec un fichier compilé |
| `outils/renommer.mjs`, `outils/renommer-locaux.mjs` | Renommage sûr (analyse du code) |
| `outils/analyse.mjs`, `outils/externes.mjs` | Aide pour retrouver les noms |
| `outils/decouper.mjs` | Découpage d'un fichier compilé en morceaux |

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
