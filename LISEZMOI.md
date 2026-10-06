# Épicerie Raddonnaise — version en ligne

Projet Firebase : « Application Marion » (`application-famille-897df`)

## Contenu
- `index.html` — application clients
- `admin.html` — administration (connexion de Marion obligatoire)
- `firestore.rules` — règles de sécurité à publier
- `firestore.rules` — règles Firestore

## 1. Publier les règles de sécurité (obligatoire, avant tout)
Firebase → Firestore Database → onglet **Règles** → remplacer tout par le contenu
de `firestore.rules` → **Publier**.

## 2. Mettre en ligne

**Option A — Firebase Hosting (recommandé)**
```
npm install -g firebase-tools
firebase login
cd en-ligne
firebase deploy
```
Adresses : `https://application-famille-897df.web.app` (clients)
et `https://application-famille-897df.web.app/admin.html` (Marion).

**Option B — GitHub Pages**
Copier le contenu de `public/` dans le dépôt, puis dans Firebase →
Authentication → Paramètres → **Domaines autorisés** → ajouter
`rikou3170-lab.github.io` (sinon la connexion de Marion est refusée).

## Structure des données
- `shop/config` — coordonnées, horaires, services, annonce, fidélité
- `jour/*`, `offres/*`, `actus/*` — contenu publié
- `clients/*` — cartes de fidélité (+ `historique/*` de chaque passage en caisse)
