# 👋 Salut ! Voici comment lancer le projet AzyMarket

Ton collègue a préparé tout le terrain pour que tu puisses démarrer en 1 clic (ou presque).

## 📋 Prérequis

1.  Avoir **Git** installé.
2.  Avoir **Docker Desktop** lancé.

## 🚀 Démarrer le projet

Ouvre un terminal **PowerShell** dans ce dossier et lance simplement :

```powershell
.\SETUP_AND_RUN.ps1
```

**Ce script va automatiquement :**
1.  Télécharger la dernière version du code (branche `main`).
2.  Créer le fichier secret `.env` pour que Google Login fonctionne.
3.  Lancer tous les serveurs avec Docker.

## 🌐 Accéder au site

Une fois que le script affiche que tout est prêt :

-   **Site Web (Frontend)** : [http://localhost:5173](http://localhost:5173)
-   **API Gateway** : [http://localhost:8080](http://localhost:8080)
-   **Eureka (Dashboard)** : [http://localhost:8761](http://localhost:8761)

Bon code ! 👨‍💻
