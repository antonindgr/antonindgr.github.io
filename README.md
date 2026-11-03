# Portfolio BTS SIO — option SISR

Site statique (HTML / CSS / JavaScript, sans framework) hébergé gratuitement avec **GitHub Pages**.

## 📁 Structure

```
├── index.html      → structure de la page
├── style.css       → design (thème clair / sombre)
├── script.js       → affichage automatique
├── data.js         → ✏️ TES INFOS ET TES PROJETS (le seul fichier à modifier)
└── assets/
    ├── docs/       → CV.pdf, comptes rendus, documentations
    └── img/        → photo, captures d'écran
```

## ✏️ Personnaliser

1. Ouvre `data.js` et remplace : nom, e-mail, liens GitHub/LinkedIn, école.
2. Modifie la liste `PROJETS` : chaque projet indique les compétences du bloc 1 qu'il mobilise (`C1` à `C6`). Le **tableau de synthèse E5** se remplit tout seul.
3. Dépose ton CV dans `assets/docs/CV.pdf` (et ta photo dans `assets/img/` si tu veux).
4. Dans `index.html`, adapte la partie « Formation » et « Certifications ».

Pour tester en local : ouvre simplement `index.html` dans ton navigateur.

## 🚀 Mettre en ligne sur GitHub Pages

### Option A — sans ligne de commande
1. Crée un compte sur <https://github.com>.
2. Clique sur **New repository** et nomme-le **`ton-pseudo.github.io`** (remplace par ton pseudo exact) → *Public* → **Create repository**.
3. Clique sur **uploading an existing file**, glisse-dépose tout le contenu du dossier (pas le dossier lui-même), puis **Commit changes**.
4. Va dans **Settings → Pages** : *Source* = **Deploy from a branch**, *Branch* = **main** / **(root)** → **Save**.
5. Après 1 à 2 minutes, ton site est en ligne sur `https://ton-pseudo.github.io`.

### Option B — avec Git
```bash
cd portfolio
git init
git add .
git commit -m "Premier commit du portfolio"
git branch -M main
git remote add origin https://github.com/ton-pseudo/ton-pseudo.github.io.git
git push -u origin main
```
Puis active Pages comme à l'étape 4 ci-dessus.

### Mettre à jour
Modifie tes fichiers puis `git add . && git commit -m "Ajout projet X" && git push` (ou réuploade le fichier via l'interface web). Le site se met à jour automatiquement.

## 💡 Conseils pour l'épreuve E5
- Pour chaque réalisation, ajoute un lien vers une **documentation PDF** (contexte, schéma réseau, procédure, tests, captures).
- Publie tes scripts (PowerShell, Bash) dans des dépôts GitHub séparés et lie-les depuis le projet.
- Mets ton portfolio à jour après chaque AP et chaque stage.
- ⚠️ Ne publie jamais de mots de passe, d'adresses IP publiques réelles ni d'infos internes d'une entreprise de stage : floute tes captures.
