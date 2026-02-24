# 🔄 Guide : Persistance & Synchronisation des Données

Ce guide explique **comment vos données sont sauvegardées** et **comment les partager** avec votre binôme (ton pote).

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

## 1. 🧠 Comment ça marche ? (La Technique)

Quand tu crées une commande ou un utilisateur sur le site, voici le chemin parcouru :

1.  **Frontend (React)** : Envoie le JSON au Backend (ex: `POST /api/orders`).
2.  **Backend (Spring Boot)** : Reçoit la donnée, vérifie tout, et utilise **Hibernate/JPA** pour transformer l'objet Java en requête SQL.
3.  **Base de Données (PostgreSQL)** : Exécute le SQL (`INSERT INTO...`) et stocke la donnée sur le disque dur.

### 📍 Où sont stockés les fichiers ?

⚠️ **Important :** Les données NE SONT PAS dans votre dossier `site_vitrine` Windows.

Elles sont dans un **Volume Docker**.
*   Docker crée un espace disque virtuel séparé et sécurisé.
*   Dans votre `docker-compose.yml`, c'est la ligne :
    ```yaml
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ```
*   Cela permet de **garder les données** même si vous supprimez les conteneurs (`docker-compose down`).

---

## 2. 🤝 Comment travailler à deux ? (Synchronisation)

Comme chacun a son propre Docker, chacun a sa propre base de données. Voici comment rester synchronisés.

### Méthode A : Le "DataSeeder" (Pour le démarrage) 🌱
**C'est la méthode recommandée pour le développement.**
*   Les produits de base (T-shirts, Pantalons...) sont codés en DUR dans `DataSeeder.java`.
*   **Si ton pote ajoute un produit :**
    1.  Il modifie `DataSeeder.java`.
    2.  Il push sur Git.
    3.  Tu pull et tu redémarres ton Docker.
    4.  **Résultat :** Le produit apparaît chez toi.

### Méthode B : L'Export Manuel (Pour montrer un bug) 💾
Si tu as créé une commande spécifique "à la main" et que tu veux que ton pote la voie pour t'aider :

#### 📤 1. Exporter TA base (Toi)
Ouvre un terminal **PowerShell** dans le dossier du projet :
```powershell
# Créer le fichier "backup.sql"
docker exec -i azymarket-postgres pg_dump -U postgres ecommerce_auth > backup.sql
```
👉 Envoie ce fichier `backup.sql` à ton pote.

#### 📥 2. Importer chez LUI (Ton Pote)
Il place le fichier dans le dossier du projet et lance :
```powershell
# ⚠️ ATTENTION : Ça efface sa base actuelle !
cat backup.sql | docker exec -i azymarket-postgres psql -U postgres ecommerce_auth
```
*(Si `cat` ne marche pas, utilisez `Get-Content backup.sql | ...`)*

---

## 3. ☁️ La Vraie Synchronisation (Option Cloud)

Si vous voulez voir **exactement la même chose en temps réel** sans faire d'export :
1.  Louez une base de données PostgreSQL gratuite en ligne (ex: **Supabase**, **Railway**, **Neon**).
2.  Changez l'URL `SPRING_DATASOURCE_URL` dans vos fichiers `.env` pour pointer vers cette base en ligne.
3.  **Résultat :** Quand tu crées une commande, elle apparaît INSTANTANÉMENT chez lui.

> **Conseil :** Restez sur Docker local pour l'instant, c'est plus rapide et plus sûr pour apprendre.
