# 🤝 Guide de Collaboration Git

Pour travailler efficacement avec ton ami sur ce projet, voici la méthode standard utilisée par les pros (le "Git Flow" simplifié).

## 1. La Règle d'Or : Ne jamais coder directement sur `main` 🛑

La branche `main` (ou `master`) doit toujours rester propre et fonctionnelle. C'est la version "production".

## 2. Le Cycle de Travail (Workflow) 🔄

À chaque fois que tu veux ajouter une fonctionnalité ou corriger un bug, suis ces étapes :

### Étape 1 : Créer une nouvelle branche
Donne un nom clair à ta branche (ex: `fix-docker`, `feature-login`, `style-home`).

```powershell
# S'assurer d'être à jour sur main
git checkout main
git pull origin main

# Créer et aller sur la nouvelle branche
git checkout -b fix-docker-login
```

### Étape 2 : Coder et Tester 👨‍💻
Fais tes modifications, teste que ça marche (comme on vient de le faire avec Docker).

### Étape 3 : Sauvegarder (Commit) 💾

```powershell
# Voir les fichiers modifiés
git status

# Ajouter les fichiers (tout ce qui a changé)
git add .

# Enregistrer avec un message clair
git commit -m "Fix: Correction redirection Google OAuth vers port 8080"
```

### Étape 4 : Envoyer (Push) 🚀

```powershell
# Envoyer ta branche sur GitHub/GitLab
git push origin fix-docker-login
```

### Étape 5 : Fusionner (Pull Request / Merge Request) 🔀
1.  Va sur GitHub/GitLab.
2.  Tu verras un bouton "Compare & pull request".
3.  Ton ami peut relire ton code, mettre des commentaires.
4.  Si tout est bon, on clique sur "Merge" pour fusionner dans `main`.

---

## 🛠️ Pour ton cas actuel (Docker fixes)

Comme nous avons déjà fait les modifications pour Docker sur ta machine, voici comment les sauvegarder proprement maintenant :

1.  **Créer la branche maintenant** (tes modifications suivront) :
    ```powershell
    git checkout -b fix-docker-config
    ```

2.  **Vérifier le statut** :
    ```powershell
    git status
    ```
    *(Si ça dit "nothing to commit", c'est que c'est déjà enregistré, sinon continue)*

3.  **Ajouter et Commiter** :
    ```powershell
    git add .
    git commit -m "Config: Update Docker setup and Auth redirect for WSL"
    ```

4.  **Envoyer** :
    ```powershell
    git push origin fix-docker-config
    ```

Ensuite, dis à ton pote : "C'est bon, j'ai poussé la branche `fix-docker-config`, tu peux regarder !"
