# 🐳 Guide de Démarrage Rapide avec Docker

Ce guide vous explique comment lancer toute l'application (Base de données, Backend et Frontend) en une seule commande grâce à Docker.

## 📋 Prérequis

- [x] **Docker Desktop** installé et lancé.
- [x] **WSL 2** configuré (déjà fait).

## 🚀 Démarrer l'application

1.  **Ouvrir un terminal** à la racine du projet :
    `c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine`

2.  **Lancer la commande suivante** :
    ```powershell
    docker-compose up --build
    ```
    *L'option `--build` assure que les images sont recréées avec vos dernières modifications.*
    *Vous pouvez ajouter `-d` à la fin pour lancer en arrière-plan (mode détaché).*

3.  **Attendre** que tous les services soient démarrés. Cela peut prendre quelques minutes la première fois (téléchargement des images, compilation Maven et Node).

## 🌐 Accéder à l'application

Une fois lancé, accédez aux services :

| Service | URL | Description |
| :--- | :--- | :--- |
| **Frontend** | [http://localhost:5173](http://localhost:5173) | Site Web (React) |
| **API Gateway** | [http://localhost:8080](http://localhost:8080) | Point d'entrée API |
| **Eureka** | [http://localhost:8761](http://localhost:8761) | Tableau de bord des microservices |

## 🛑 Arrêter l'application

Pour arrêter proprement :
```powershell
docker-compose down
```
*(Ajoutez `-v` pour supprimer aussi les volumes de base de données si nécessaire : `docker-compose down -v`)*
