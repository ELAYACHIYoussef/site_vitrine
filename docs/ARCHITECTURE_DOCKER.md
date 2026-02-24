# 🏗️ Comprendre l'Architecture Docker de votre Projet E-Commerce

Voici une explication étape par étape de comment fonctionne votre nouvelle architecture avec Docker.

## 1. Vue d'ensemble : Le "Conteneur" 📦

Imaginez Docker comme un cargo. Au lieu d'installer Java, Node.js, Maven, et Postgres directement sur votre ordinateur (ce qui peut créer des conflits), on met chaque partie de votre application dans son propre "conteneur" isolé.

Chaque conteneur contient tout ce dont il a besoin pour fonctionner (le code + les outils).

## 2. Vos Services (Les Conteneurs)

Votre application est composée de 6 principaux conteneurs qui tournent ensemble :

1.  **Frontend (React)** 🌐
    *   **Ce qu'il fait :** C'est le site web que vous voyez.
    *   **Port :** 5173 (Accessible via `http://localhost:5173`)
    *   **Communication :** Il envoie des requêtes à l'API Gateway.

2.  **API Gateway** 🚪
    *   **Ce qu'il fait :** C'est la porte d'entrée unique pour tout le backend.
    *   **Port :** 8080 (Accessible via `http://localhost:8080`)
    *   **Rôle :** Quand le Frontend demande "Je veux me connecter", le Gateway reçoit la demande et demande à **Discovery Service (Eureka)** : "Où est le service d'authentification ?".

3.  **Discovery Service (Eureka)** 🧭
    *   **Ce qu'il fait :** C'est l'annuaire ou le GPS.
    *   **Port :** 8761
    *   **Rôle :** Chaque microservice (Auth, Catalog, Order) s'enregistre ici en démarrant ("Je suis Auth-Service et je suis à l'adresse X").
    *   **Pourquoi ?** Comme les adresses IP des conteneurs peuvent changer, Eureka permet de toujours les retrouver.

4.  **Microservices Métier** (Auth, Catalog, Order) ⚙️
    *   **Ce qu'ils font :** La logique pure (Authentification, Gestion des produits, Commandes).
    *   **Ports :** 8081, 8082, 8083 (Mais ils sont cachés derrière le Gateway, vous ne les appelez pas directement).
    *   **Communication :** Ils parlent à la base de données.

5.  **PostgreSQL (Base de Données)** 💾
    *   **Ce qu'il fait :** Stocke toutes les données (Utilisateurs, Produits, Commandes).
    *   **Port :** 5432
    *   **Données :** Les données sont sauvegardées dans un "Volume" Docker, donc même si vous éteignez le conteneur, les données restent.

## 3. Le Chef d'Orchestre : `docker-compose.yml` 🎶

C'est le fichier qui dit à Docker : "Lance tous ces services ensemble et assure-toi qu'ils peuvent se parler".

*   **`services:`** La liste des conteneurs à lancer.
*   **`networks:` (azymarket-net)** Un réseau virtuel privé. Tous vos conteneurs sont branchés sur ce réseau, comme s'ils étaient sur le même Wifi. Ils peuvent se parler en utilisant leur nom (`postgres`, `discovery-service`, etc.).
*   **`volumes:`** Pour ne pas perdre vos données de base de données.

## 4. Le Flux d'une Requête (Exemple) 🔄

Quand vous vous connectez sur le site :

1.  **Vous** cliquez sur "Login" (Navigateur).
2.  **Frontend** envoie une requête à `http://localhost:8080/api/auth/login`.
3.  **API Gateway** reçoit la requête sur le port 8080.
4.  **API Gateway** demande à **Eureka** : "Où est `auth-service` ?".
5.  **Eureka** répond : "Il est à l'adresse interne `172.18.0.5`".
6.  **API Gateway** transfère la requête à **Auth Service**.
7.  **Auth Service** vérifie vos identifiants dans **Postgres**.
8.  La réponse remonte tout le chemin inverse jusqu'à votre navigateur.

## 5. Pourquoi c'est mieux ?

*   ✅ **Installation Unique :** `docker-compose up` et tout marche. Pas besoin d'installer Java ou Postgres manuellement.
*   ✅ **Isolement :** Le Frontend ne peut pas casser la base de données directement.
*   ✅ **Scalabilité :** Plus tard, on pourra lancer 2 ou 3 instances de `order-service` si beaucoup de gens commandent, sans changer le code.

C'est une architecture professionnelle moderne ! 🚀
