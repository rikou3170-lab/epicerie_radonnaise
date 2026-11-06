# Sources de l'appli — Épicerie Raddonnaise

Ce dossier contient **le code source** des trois applis : client (`index.html`), administration (`admin.html`) et caisse (`caisse.html`).
Il est mis à jour **à chaque nouvelle version**, en même temps que l'appli : il ne peut plus se perdre.

## Ce qu'il y a dedans

| Dossier | Contenu |
|---|---|
| `client/`, `admin/`, `caisse/` | Le code de chaque appli, rangé **par thème**, dans l'ordre (`ordre.json`) : `firebase.js`, `themes.js`, `accueil.js`, `fidelite.js`, `formulaire-carte.js`, `commandes.js`, `ecran-caisse.js`… |
| `NN-<thème>.js` | **Le code de l'épicerie**, commenté : un en-tête par fichier et une explication au-dessus de chaque fonction. C'est là qu'on fait les modifications. |
| `NN-bibliotheques.js` | Les bibliothèques (React, Firebase, QR code, lecture de texte…), à ne pas toucher |
| `outils/` | Compilation, preuve d'équivalence, renommage, commentaires (voir plus bas) |
| `publier.mjs` | Prépare une nouvelle version **à partir des sources** |
| `reference-v1.43/` | Ancienne version (v1.43) des sources d'origine : sert de repère |

**L'ordre des fichiers compte** (le code est recollé dans l'ordre de `ordre.json`) : on peut ajouter du code dans un fichier, mais on ne déplace pas une fonction d'un fichier à un autre sans vérifier qu'elle reste après ce qu'elle utilise au démarrage.

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

### Commentaires et mise en forme (6 novembre 2026, nuit)

- **Rangement par thème** : le code a été redécoupé selon les modules d'origine (firebase, mise à jour, thèmes, commande, boutique, messagerie…) et les grandes parties de l'appli (accueil, carte, fidélité, RGPD, introduction, messagerie, réservations, notifications…), en suivant les bandeaux de section de la v1.43.
- **Commentaires** : chaque fichier a un en-tête, et chaque fonction ou constante importante a une explication (≈ 510 au total). Les commentaires d'origine de la v1.43 ont été remis là où la fonction existait déjà ; les autres ont été écrits en relisant le code. Les commentaires ligne à ligne de l'original, à l'intérieur des fonctions, n'ont pas pu être retrouvés (la compilation les avait effacés) ; ils seront ajoutés au fil des modifications.
- **Textes lisibles** : les accents et émojis s'écrivent normalement (« apparaît », « 💬 ») au lieu de codes (`\xEE`, `\u{1F4AC}`).
- **Écriture courte** : `{ d: d, set: set }` → `{ d, set }`.

Toutes ces étapes sont vérifiées par `verifier.mjs` (✅ même programme que l'appli en ligne) et l'appli recompilée a été retestée.

## Outils

| Outil | Rôle |
|---|---|
| `outils/compiler.mjs` | Recolle les fichiers dans l'ordre et compile |
| `outils/verifier.mjs` | Preuve d'équivalence avec un fichier compilé (à lancer après toute réorganisation) |
| `outils/renommer.mjs`, `outils/renommer-locaux.mjs` | Renommage sûr (analyse du code) |
| `outils/commenter.mjs` + `commentaires.json` | Pose les en-têtes et les commentaires de fonctions (relançable) |
| `outils/ranger.mjs` | Découpe / renomme les fichiers par thème |
| `outils/accents.mjs`, `outils/raccourcis.mjs` | Mise en forme lisible des textes et des propriétés |
| `outils/analyse.mjs`, `outils/externes.mjs`, `outils/plan.mjs`, `outils/montrer.mjs`, `outils/a-commenter.mjs` | Aides pour relire le code |
| `outils/decouper.mjs` | Découpage initial d'un fichier compilé |

## Publier une nouvelle version

```
cd sources && npm install        # la première fois seulement
cd ..
# 1. modifier le code dans sources/<appli>/NN-<thème>.js (puis node sources/outils/commenter.mjs <appli> si on a ajouté une fonction dans commentaires.json)
# 2. préparer la version (numéro partout + recompilation) :
node sources/publier.mjs 2.38
# 3. tester, puis publier appli + sources ensemble :
git add -A && git commit -m "v2.38 : …" && git push
```

**Règle : on ne modifie plus jamais `client.js`, `admin.js` ou `caisse.js` à la main.** On modifie les sources, puis `publier.mjs` recompile.
