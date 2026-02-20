# Guide de Synchronisation de Base de Données (Sans Supabase)

Ce guide explique comment partager les données de la base de données (produits, utilisateurs, etc.) avec vos collaborateurs via Git.

## Principe

Nous n'utilisons pas de base de données Cloud (comme Supabase). À la place, nous avons deux scripts pour "sauvegarder" et "charger" les données locales dans un fichier partagé.

## Scénarios

### 1. J'ai ajouté des produits et je veux les envoyer à mon pote

1.  Assurez-vous que votre Docker tourne (`docker-compose up`).
2.  Lancez le script de sauvegarde :
    ```powershell
    .\save-db.ps1
    ```
    Cela va créer ou mettre à jour le fichier `db-dump.sql`.
3.  Envoyez le tout sur Git :
    ```powershell
    git add db-dump.sql
    git commit -m "Mise à jour des produits dans la DB"
    git push
    ```

### 2. Je viens de récupérer le code de mon pote et je veux ses données

1.  Récupérez le code :
    ```powershell
    git pull
    ```
2.  Assurez-vous que votre Docker tourne.
3.  Lancez le script de chargement :
    ```powershell
    .\load-db.ps1
    ```
    ⚠️ **Attention** : Cela va remplacer vos données locales par celles du fichier.

## Fichiers

- `save-db.ps1` : Crée le fichier `db-dump.sql` à partir de votre Docker.
- `load-db.ps1` : Lit `db-dump.sql` et l'injecte dans votre Docker.
- `db-dump.sql` : Le fichier qui contient les données (à ne pas modifier manuellement).
