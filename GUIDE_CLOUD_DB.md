# ☁️ Guide : Passer en Base de Données Cloud (Neon / Supabase)

Pour que toi et ton pote partagiez la **MÊME** base de données en temps réel (plus besoin d'export/import), suivez ce guide.

## Étape 1 : Créer la Base en Ligne (Un de vous deux)

Je recommande **Neon** (https://neon.tech) ou **Supabase** (https://supabase.com). C'est gratuit et compatible Postgres.

1.  Crée un compte et un nouveau projet.
2.  Cherche les paramètres de connexion ("Connection String").
3.  Sélectionne l'onglet "Java" ou "JDBC" si disponible, sinon "Direct Connection".
4.  Copie l'URL qui ressemble à ça :
    ```
    jdbc:postgresql://ep-round-rain-123456.us-east-2.aws.neon.tech/neondb?sslmode=require&user=...
    ```
    *(Assure-toi bien que ça commence par `jdbc:postgresql://`)*

## Étape 2 : Configurer ton `.env`

J'ai préparé ton fichier `.env` pour qu'il soit facile à modifier.

1.  Ouvre le fichier `.env` à la racine du projet.
2.  Tu verras une section `# CONFIGURATION BASE DE DONNEES`.
3.  **Pour travailler en CLOUD :**
    *   Colle l'URL Cloud que tu as obtenue dans les 3 variables (`AUTH_DB_URL`, `CATALOG_DB_URL`, `ORDER_DB_URL`).
    *   Mets la même URL pour les trois (ce n'est pas grave si les services partagent la même database pour le dév).
    *   Change `DB_USERNAME` et `DB_PASSWORD` avec ceux fournis par le Cloud (souvent ils sont inclus dans l'URL, dans ce cas laisse les champs user/password vides ou mets ceux du cloud, l'URL est prioritaire).

**Exemple `.env` modifié :**
```ini
AUTH_DB_URL=jdbc:postgresql://ep-round-rain-1234.aws.neon.tech/neondb?sslmode=require&user=tonuser&password=tonpass
CATALOG_DB_URL=jdbc:postgresql://ep-round-rain-1234.aws.neon.tech/neondb?sslmode=require&user=tonuser&password=tonpass
ORDER_DB_URL=jdbc:postgresql://ep-round-rain-1234.aws.neon.tech/neondb?sslmode=require&user=tonuser&password=tonpass
```

## Étape 3 : Partager avec le Pote

1.  Une fois que tu as testé que ça marche (`docker-compose up --build`), envoie tes 3 lignes d'URL à ton pote (par message privé, **PAS sur GitHub** car c'est secret !).
2.  Il les colle dans son `.env`.
3.  Il relance son Docker.

🎉 **Magie :** Quand il crée un produit, tu le vois apparaître instantanément chez toi.

## ⚠️ Notes Importantes
*   **Latence :** Ce sera un peu plus lent qu'en local (le temps que les données traversent internet).
*   **Conflits :** Si vous modifiez le même produit en même temps, le dernier qui sauvegarde gagne.
*   **Retour en arrière :** Pour revenir en local, il suffit de remettre les URLs d'origine (celles avec `postgres:5432/...`) dans le `.env`.
