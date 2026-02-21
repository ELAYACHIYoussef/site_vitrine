# 📘 Étude Technique & Analyse des Besoins - AzyMarket

**Date :** 14 Février 2026
**Version :** 2.0 (Post-MVP)
**Auteurs :** Équipe de Développement AzyMarket

---

## 1. 🎯 Introduction & Contexte

Le projet **AzyMarket** est une plateforme e-commerce moderne conçue pour offrir une expérience utilisateur fluide et une gestion administrative puissante. L'objectif est de fournir une solution évolutive capable de gérer un catalogue de produits, des commandes clients et un suivi administratif complet.

### Objectifs Principaux
1.  **Expérience Client Premium** : Interface réactive, Panier dynamique, Checkout simplifié.
2.  **Gestion Admin Efficace** : Dashboard centralisé pour Produits, Commandes, Clients.
3.  **Scalabilité** : Architecture Microservices pour supporter la montée en charge.
4.  **Sécurité** : Authentification JWT, Gestion des Rôles (RBAC).

---

## 2. 📋 Analyse des Besoins Fonctionnels

### A. Espace Client (Front-Office)
| Fonctionnalité | Description | Priorité |
| :--- | :--- | :--- |
| **Inscription/Connexion** | Création de compte sécurisée avec email/password. | Haute |
| **Catalogue Produits** | Affichage grille, recherche par nom, filtres par catégorie. | Haute |
| **Panier** | Ajout/Suppression, Modification quantité, Calcul total dynamique. | Haute |
| **Checkout** | Formulaire de livraison, Récapitulatif, Validation de commande. | Haute |
| **Tableau de Bord Client** | Historique des commandes, Suivi de statut. | Moyenne |

### B. Espace Administrateur (Back-Office)
| Fonctionnalité | Description | Priorité |
| :--- | :--- | :--- |
| **Dashboard Global** | Vue synthétique (KPIs) : Total ventes, Nouveaux clients. | Haute |
| **Gestion Catalogue** | CRUD Produits (Créer, Lire, Mettre à jour, Supprimer), Images. | Haute |
| **Gestion Commandes** | Liste des commandes, Changement de statut (En cours -> Livré). | Haute |
| **Analytiques** | Rapports détaillés sur les ventes et produits populaires. | Moyenne |

---

## 3. 🎭 Diagramme de Cas d'Utilisation (Use Case)

Ce diagramme illustre les interactions possibles selon le rôle de l'utilisateur.

```mermaid
usecaseDiagram
    actor "Client" as C
    actor "Administrateur" as A

    package "AzyMarket Platform" {
        usecase "S'inscrire / Se Connecter" as UC1
        usecase "Parcourir le Catalogue" as UC2
        usecase "Gérer son Panier" as UC3
        usecase "Passer une Commande" as UC4
        usecase "Voir ses Commandes" as UC5

        usecase "Gérer les Produits" as UC6
        usecase "Gérer les Commandes" as UC7
        usecase "Voir les Statistiques" as UC8
        usecase "Gérer les Utilisateurs" as UC9
    }

    C --> UC1
    C --> UC2
    C --> UC3
    C --> UC4
    C --> UC5

    A --> UC1
    A --> UC6
    A --> UC7
    A --> UC8
    A --> UC9
```

---

## 4. 🏗️ Architecture Technique (Microservices)

L'application repose sur une architecture distribuée pour garantir la robustesse.

### Composants Clés
*   **Gateway (Spring Cloud Gateway)** : Point d'entrée unique, gère le routage et la sécurité (CORS).
*   **Discovery (Eureka)** : Annuaire des services pour la scalabilité dynamique.
*   **Auth Service** : Gestion des utilisateurs et tokens JWT.
*   **Catalog Service** : Gestion des produits et stocks.
*   **Order Service** : Gestion du cycle de vie des commandes.

```mermaid
graph TD
    Client[Client React :5173] -->|HTTPS/REST| Gateway[API Gateway :8080]
    
    subgraph "Zone Sécurisée (Backend)"
        Gateway -->|Route /auth| Auth[Auth Service :8081]
        Gateway -->|Route /catalog| Catalog[Catalog Service :8082]
        Gateway -->|Route /orders| Order[Order Service :8083]
        
        Auth -.->|Register| Eureka[Discovery Server :8761]
        Catalog -.->|Register| Eureka
        Order -.->|Register| Eureka
        Gateway -.->|Fetch Routes| Eureka
    end
    
    subgraph "Persistance (Données)"
        Auth --> DB1[(DB Users)]
        Catalog --> DB2[(DB Products)]
        Order --> DB3[(DB Orders)]
    end
```

---

## 5. 🗃️ Modélisation des Données (ER Diagram)

Structure relationnelle optimisée pour l'intégrité des données.

```mermaid
erDiagram
    Users {
        Long id PK
        String email
        String password
        String role
    }

    Products {
        Long id PK
        String name
        Double price
        Integer stock
        Long category_id FK
    }

    Orders {
        Long id PK
        String order_number
        Date created_at
        Enum status "PENDING/PAID/SHIPPED"
        Long user_id FK
    }

    OrderItems {
        Long id PK
        Long order_id FK
        Long product_id FK
        Integer quantity
        Double unit_price
    }

    Users ||--o{ Orders : "passe"
    Orders ||--|{ OrderItems : "contient"
    Products ||--o{ OrderItems : "est référencé dans"
    
```

---

## 6. 🔒 Besoins Non-Fonctionnels & Sécurité

### Sécurité
1.  **Authentification Statless** : Utilisation de **JWT (JSON Web Tokens)**. Le serveur ne stocke pas de session.
2.  **Protection des Données** : Mots de passe hashés avec **BCrypt**.
3.  **CORS (Cross-Origin Resource Sharing)** : Configuré strictement sur la Gateway pour n'autoriser que le Frontend officiel.

### Performance
1.  **Mise en Cache** : Le catalogue produit peut être mis en cache (Redis) pour réduire la charge DB (Evolution future).
2.  **Asynchronisme** : Les emails de confirmation (futur) seront envoyés via RabbitMQ pour ne pas bloquer l'utilisateur.

---

## 7. 🚀 Roadmap & Prochaines Étapes

Planification stratégique pour les semaines à venir.

```mermaid
gantt
    title Roadmap AzyMarket Q1 2026
    dateFormat  YYYY-MM-DD
    section Phase 1 (Fini)
    Setup Microservices       :done,    des1, 2026-02-01, 2026-02-05
    Frontend Auth & Home      :done,    des2, 2026-02-06, 2026-02-10
    
    section Phase 2 (Actuel)
    Panier & Checkout         :active,  des3, 2026-02-11, 2026-02-14
    Admin Dashboard           :active,  des4, 2026-02-12, 2026-02-14
    
    section Phase 3 (Futur)
    Gestion Stocks Réels      :         des5, 2026-02-15, 2026-02-20
    Paiement Stripe           :         des6, 2026-02-21, 2026-02-28
    Déploiement Cloud (AWS)   :         des7, 2026-03-01, 2026-03-10
```

---

### 📥 Export PDF
Pour obtenir ce rapport en format professionnel :
1. Installer l'extension **Markdown PDF** sur VS Code.
2. Clic droit dans ce fichier -> `Export (pdf)`.
