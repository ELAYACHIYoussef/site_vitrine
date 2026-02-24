# 🤝 Guide de Collaboration Git - Projet Site Vitrine

Pour travailler efficacement à deux sur le même repository sans conflits, suivez ces règles d'or.

## 1. Règle d'Or : Jamais sur `main` ! 🚫
La branche `main` est sacrée. C'est la version qui marche. **Ne jamais coder directement dessus.**

## 2. Workflow (Flux de Travail)

### Étape 1 : Récupérer les dernières modifs
Avant de commencer QUOI QUE CE SOIT, assurez-vous d'être à jour :
```bash
git checkout main
git pull origin main
```

### Étape 2 : Créer sa branche
Créez une branche pour **chaque** nouvelle fonctionnalité ou correction. Nommez-la clairement.
*Format : `type/nom-de-la-tache`*

Exemples :
- `feat/ajout-panier` (pour une nouvelle feature)
- `fix/correction-login` (pour un bug)
- `style/design-home` (pour du CSS)

```bash
git checkout -b feat/ma-nouvelle-fonctionnalite
```

### Étape 3 : Coder et Commiter
Faites vos modifications. Commitez souvent.
```bash
git add .
git commit -m "Ajout de la logique du panier"
```

### Étape 4 : Publier votre branche
Envoyez votre branche sur GitHub (pas sur main !).
```bash
git push origin feat/ma-nouvelle-fonctionnalite
```

### Étape 5 : Pull Request (PR)
1. Allez sur GitHub.
2. Vous verrez un bouton "Compare & pull request". Cliquez dessus.
3. **Important** : Regardez les fichiers modifiés.
4. Demandez à votre collègue de valider (Code Review).
5. Si tout est bon, cliquez sur **"Merge pull request"**.

## 3. Comment éviter les conflits ? 💥

1. **Travaillez sur des fichiers différents** : Si toi tu touches au `Navbar.jsx`, ton pote ne doit pas y toucher en même temps.
2. **Communiquez** : "Je m'occupe du CSS du footer", "Ok, moi je fais le backend du login".
3. **Pull souvent** : Si ta branche dure 3 jours, fusionne `main` dans ta branche chaque matin pour récupérer ce que ton pote a fini.

```bash
# Sur ta branche feature
git merge main
# Règle les petits conflits tout de suite s'il y en a
```

## 4. En cas de conflit (Panique pas !) 😱
Si Git vous dit "CONFLICT", c'est normal.
1. Ouvrez le fichier concerné dans VS Code.
2. Vous verrez des zones :
   ```
   <<<<<<< HEAD
   Votre code
   =======
   Le code de votre pote
   >>>>>>> main
   ```
3. Choisissez ce qu'il faut garder (ou mélangez les deux).
4. Sauvegardez, puis :
   ```bash
   git add .
   git commit -m "Résolution de conflit"
   ```

## Résumé des Commandes
| Action | Commande |
| :--- | :--- |
| **Mettre à jour** | `git pull origin main` |
| **Nouvelle tâche** | `git checkout -b feat/nom-tache` |
| **Sauvegarder** | `git commit -m "message"` |
| **Envoyer** | `git push origin feat/nom-tache` |
