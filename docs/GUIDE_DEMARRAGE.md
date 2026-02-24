# 🚀 Guide de Démarrage - Projet E-Commerce Microservices

## Prérequis

### Backend (Java)
- ✅ **Java 17** ou supérieur
- ✅ **Maven 3.6+**
- ✅ **PostgreSQL** (pour auth-service et catalog-service)

### Frontend (React)
- ✅ **Node.js 18+** et **npm**

### Vérification des prérequis

```powershell
# Vérifier Java
java -version

# Vérifier Maven
mvn -version

# Vérifier Node.js
node -v
npm -v

# Vérifier PostgreSQL
psql --version
```

## 📦 Installation des Dépendances

### Backend

```powershell
# Aller dans le répertoire backend
cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend

# Installer toutes les dépendances Maven (à la racine du projet parent)
mvn clean install
```

### Frontend

```powershell
# Aller dans le répertoire frontend
cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-frontend

# Installer les dépendances npm
npm install
```

## 🗄️ Configuration de la Base de Données

### Créer les bases de données PostgreSQL

```sql
-- Connexion à PostgreSQL
psql -U postgres

-- Créer la base de données pour auth-service
CREATE DATABASE ecommerce_auth;

-- Créer la base de données pour catalog-service
CREATE DATABASE ecommerce_catalog;

-- Quitter psql
\q
```

## ⚙️ Configuration des Variables d'Environnement

### Option 1: Variables d'environnement système (Recommandé pour le développement)

```powershell
# Variables pour auth-service
$env:DATABASE_URL="jdbc:postgresql://localhost:5432/ecommerce_auth"
$env:DATABASE_USERNAME="postgres"
$env:DATABASE_PASSWORD="votre_mot_de_passe"
$env:JWT_SECRET_KEY="votre_cle_secrete_jwt_au_moins_256_bits"
```

### Option 2: Modifier les fichiers application.yml (Pour tests locaux)

Vous pouvez temporairement remplacer les variables par des valeurs en dur dans :
- `auth-service/src/main/resources/application.yml`
- `catalog-service/src/main/resources/application.yml`

**Exemple pour auth-service/application.yml** :
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ecommerce_auth
    username: postgres
    password: votre_mot_de_passe
```

## 🎯 Démarrage du Projet

### Ordre de Démarrage (IMPORTANT !)

Les microservices doivent être démarrés dans cet ordre :

#### 1️⃣ Discovery Service (Eureka) - EN PREMIER

```powershell
cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\discovery-service
mvn spring-boot:run
```

**Attendre que le message "Started Eureka Server" apparaisse**  
✅ Vérifier : http://localhost:8761

---

#### 2️⃣ API Gateway - EN DEUXIÈME

**Ouvrir un NOUVEAU terminal PowerShell**

```powershell
cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\api-gateway
mvn spring-boot:run
```

✅ Vérifier : http://localhost:8080

---

#### 3️⃣ Auth Service - ENSUITE

**Ouvrir un NOUVEAU terminal PowerShell**

```powershell
# Définir les variables d'environnement
$env:DATABASE_URL="jdbc:postgresql://localhost:5432/ecommerce_auth"
$env:DATABASE_USERNAME="postgres"
$env:DATABASE_PASSWORD="votre_mot_de_passe"
$env:JWT_SECRET_KEY="ma_cle_secrete_super_longue_et_securisee_256bits"

# Démarrer le service
cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\auth-service
mvn spring-boot:run
```

✅ Service disponible via : http://localhost:8080/api/auth/**

---

#### 4️⃣ Catalog Service - ENSUITE

**Ouvrir un NOUVEAU terminal PowerShell**

```powershell
# Définir les variables d'environnement
$env:DATABASE_URL="jdbc:postgresql://localhost:5432/ecommerce_catalog"
$env:DATABASE_USERNAME="postgres"
$env:DATABASE_PASSWORD="votre_mot_de_passe"

# Démarrer le service
cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\catalog-service
mvn spring-boot:run
```

✅ Service disponible via : http://localhost:8080/api/catalog/**

---

#### 5️⃣ Frontend React - EN DERNIER

**Ouvrir un NOUVEAU terminal PowerShell**

```powershell
cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-frontend
npm run dev
```

✅ Application disponible : http://localhost:5173 (ou le port indiqué par Vite)

## 📊 Vérification du Démarrage

### 1. Eureka Dashboard
Ouvrir http://localhost:8761

Vous devriez voir :
- ✅ API-GATEWAY
- ✅ AUTH-SERVICE
- ✅ CATALOG-SERVICE

### 2. Tester l'API Gateway
```powershell
# Test simple
curl http://localhost:8080/api/auth/health
curl http://localhost:8080/api/catalog/products
```

### 3. Frontend
Ouvrir http://localhost:5173 dans votre navigateur

## 🔧 Résolution des Problèmes

### Problème : "Port already in use"

```powershell
# Trouver le processus utilisant un port (exemple: 8080)
netstat -ano | findstr :8080

# Tuer le processus (remplacer PID par le numéro affiché)
taskkill /PID <PID> /F
```

### Problème : "Connection refused to Eureka"

- ✅ Assurez-vous que Discovery Service (Eureka) est démarré EN PREMIER
- ✅ Attendez 30 secondes pour que l'enregistrement soit complet

### Problème : "Database connection error"

- ✅ Vérifiez que PostgreSQL est démarré
- ✅ Vérifiez les variables d'environnement (DATABASE_URL, USERNAME, PASSWORD)
- ✅ Vérifiez que les bases de données existent (ecommerce_auth, ecommerce_catalog)

### Problème : "JWT_SECRET_KEY not found"

```powershell
# Définir la variable JWT
$env:JWT_SECRET_KEY="ma_cle_secrete_super_longue_et_securisee_au_moins_256_bits"
```

## 📝 Ports Utilisés

| Service | Port | URL |
|---------|------|-----|
| Discovery Service (Eureka) | 8761 | http://localhost:8761 |
| API Gateway | 8080 | http://localhost:8080 |
| Auth Service | 8081 | Via Gateway uniquement |
| Catalog Service | 8082 | Via Gateway uniquement |
| Frontend React | 5173 | http://localhost:5173 |

## 🎨 Architecture en Fonctionnement

```
┌─────────────────┐
│   Browser       │
│   :5173         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  React Frontend │
│   (Vite)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────────┐
│  API Gateway    │◄─────┤ Discovery Service│
│    :8080        │      │  (Eureka) :8761  │
└────────┬────────┘      └──────────────────┘
         │                        ▲
         │                        │
    ┌────┴────┐                   │
    │         │                   │
    ▼         ▼                   │
┌─────┐   ┌─────────┐        ┌───┴──┐
│Auth │   │ Catalog │        │Register
│:8081│   │  :8082  │        │Services
└──┬──┘   └────┬────┘        └──────┘
   │           │
   ▼           ▼
  DB          DB
(auth)    (catalog)
```

## 🚀 Commandes Rapides

### Démarrage Complet (PowerShell - 5 terminaux)

```powershell
# Terminal 1 - Discovery Service
cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\discovery-service
mvn spring-boot:run

# Terminal 2 - API Gateway (attendre 30s après terminal 1)
cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\api-gateway
mvn spring-boot:run

# Terminal 3 - Auth Service
$env:DATABASE_URL="jdbc:postgresql://localhost:5432/ecommerce_auth"; $env:DATABASE_USERNAME="postgres"; $env:DATABASE_PASSWORD="votre_mdp"; $env:JWT_SECRET_KEY="cle_secrete_256bits"; cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\auth-service; mvn spring-boot:run

# Terminal 4 - Catalog Service
$env:DATABASE_URL="jdbc:postgresql://localhost:5432/ecommerce_catalog"; $env:DATABASE_USERNAME="postgres"; $env:DATABASE_PASSWORD="votre_mdp"; cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\catalog-service; mvn spring-boot:run

# Terminal 5 - Frontend
cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-frontend
npm run dev
```

---

**✨ Votre application e-commerce est maintenant lancée !**

Pour plus de détails sur l'architecture, consultez [architecture_analysis.md](file:///.gemini/antigravity/brain/4e653038-6914-48bd-9ffb-b473220e8c8d/architecture_analysis.md)
