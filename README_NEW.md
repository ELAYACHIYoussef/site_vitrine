# 🛒 E-commerce Platform (Microservices & React)

Ce projet est une plateforme e-commerce moderne construite avec une architecture microservices en **Java (Spring Boot)** et un frontend en **React**.

## 👥 Collaboration à deux

Pour travailler ensemble efficacement :
1. **GitHub** : Créez une repository et poussez ce dossier. Utilisez des branches pour vos fonctionnalités (`feat/auth`, `feat/catalog`).
2. **Base de données partagée** : Le projet est pré-configuré pour utiliser **PostgreSQL (Supabase)**. Assurez-vous d'utiliser la même `DATABASE_URL` dans vos fichiers `.env`respectifs.
3. **Même Version** : Grâce au `pom.xml` parent et au `package.json`, vous aurez toujours les mêmes versions de bibliothèques.

## 🏗️ Structure du Projet

- `/ecommerce-backend` : Contient les services Java.
  - `discovery-service` (Port 8761)
  - `api-gateway` (Port 8080)
  - `auth-service` (Port 8081)
  - `catalog-service` (Port 8082)
- `/ecommerce-frontend` : Application React (Port 5173).

## 🚀 Comment lancer le projet

### Backend (Java)
1. Allez dans `ecommerce-backend`.
2. Lancez les services dans cet ordre :
   - Discovery Service
   - API Gateway
   - Auth & Catalog Services
3. Utilisez `mvn spring-boot:run` dans chaque dossier.

### Frontend (React)
1. Allez dans `ecommerce-frontend`.
2. Installez les dépendances : `npm install`.
3. Lancez : `npm run dev`.

## 🔐 Sécurité & Variables d'Environnement
Créez un fichier `.env` à la racine de chaque service ou utilisez les variables système :
- `DATABASE_URL` : Votre URL Supabase.
- `JWT_SECRET_KEY` : Votre clé secrète pour les tokens.
