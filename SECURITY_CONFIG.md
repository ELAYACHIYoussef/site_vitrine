# 🔐 Guide de Configuration de Sécurité

## Variables d'Environnement

Ce projet utilise des variables d'environnement pour sécuriser les informations sensibles.

### Configuration Initiale

1. **Copier le fichier d'exemple**
```powershell
Copy-Item .env.example .env
```

2. **Modifier le fichier .env** avec vos valeurs réelles

### Variables Requises

#### JWT_SECRET (OBLIGATOIRE)
Clé secrète pour signer les tokens JWT. **CHANGEZ cette valeur en production !**

**Génération d'une clé sécurisée :**
```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

#### GOOGLE_CLIENT_ID (Optionnel)
Client ID pour l'authentification Google OAuth.

**Comment obtenir un Client ID Google :**
1. Allez sur [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API Google+ 
4. Créez des identifiants OAuth 2.0
5. Ajoutez les origines autorisées : \http://localhost:3000\
6. Copiez le Client ID généré dans votre fichier .env

**Note :** Si vous ne configurez pas Google OAuth, l'authentification par email/mot de passe fonctionnera normalement. Le bouton Google sera simplement masqué.

#### ADMIN_EMAILS
Liste des emails qui recevront automatiquement le rôle administrateur lors de l'inscription, séparés par des virgules.

**Exemple :**
```
ADMIN_EMAILS=admin@example.com,super.admin@example.com
```

---

## 📋 Exemple de fichier .env

```env
PORT=3000
NODE_ENV=development

# JWT Secret - GÉNÉREZ UNE CLÉ SÉCURISÉE !
JWT_SECRET=a3f9d8c7b6e5f4a3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9

# Google OAuth (optionnel)
GOOGLE_CLIENT_ID=123456789-abcdefghijklmnop.apps.googleusercontent.com

# Base de données
DB_PATH=./products.db

# Administrateurs par défaut
ADMIN_EMAILS=ysf.elayachi@gmail.com,selmanim113@gmail.com
```

---

## 🚀 Démarrage du Serveur

```powershell
# Installer les dépendances
npm install

# Démarrer le serveur
node server.js
```

Le serveur affichera les informations de configuration au démarrage :
- ✅ JWT Secret configuré
- ✅ Google OAuth activé/désactivé
- ✅ Nombre d'emails admin configurés

---

## 👥 Gestion des Administrateurs

### Via Fichier .env
Les emails listés dans \ADMIN_EMAILS\ recevront automatiquement le rôle admin lors de leur inscription.

### Via Interface Admin
Les administrateurs peuvent :
1. **Promouvoir** un utilisateur existant en administrateur
2. **Révoquer** les droits administrateur d'un utilisateur
3. Voir la liste de tous les administrateurs

**Accès :** [http://localhost:3000/admin.html](http://localhost:3000/admin.html)

---

## 🔒 Sécurité

### ✅ Bonnes pratiques implémentées :
- JWT Secret via variable d'environnement
- Google Client ID non exposé dans le code
- Validation des tokens JWT
- Hashage des mots de passe avec bcrypt
- Protection CORS
- Middleware d'authentification et d'autorisation

### ⚠️ IMPORTANT - Production :
1. **Changez le JWT_SECRET** avec une clé aléatoire forte
2. **Configurez NODE_ENV=production**
3. **Utilisez HTTPS** pour toutes les requêtes
4. **Ne commitez JAMAIS le fichier .env** (déjà dans .gitignore)
5. **Limitez les CORS** aux domaines autorisés

---

## 📚 API Endpoints

### Configuration Publique
```
GET /api/config
```
Retourne la configuration publique (Google Client ID si configuré)

### Gestion des Admins (Admin uniquement)
```
GET    /api/admin/admins        # Liste des administrateurs
POST   /api/admin/admins        # Promouvoir un utilisateur
DELETE /api/admin/admins/:id    # Révoquer les droits admin
```

---

## 🐛 Dépannage

### Le serveur ne démarre pas
- Vérifiez que le fichier \.env\ existe et contient \JWT_SECRET\
- Assurez-vous que toutes les dépendances sont installées : \
pm install\

### Google OAuth ne fonctionne pas
- Vérifiez que \GOOGLE_CLIENT_ID\ est configuré dans \.env\
- Confirmez que l'origine \http://localhost:3000\ est autorisée dans Google Cloud Console
- Vérifiez les logs du serveur pour les erreurs

### Impossible d'accéder à l'admin
- Vérifiez que votre email est dans \ADMIN_EMAILS\
- Recréez votre compte après avoir ajouté votre email dans \.env\
- Ou demandez à un admin existant de vous promouvoir via l'interface

---

## 📝 Changelog

### Version actuelle
- ✅ Migration du JWT_SECRET vers variables d'environnement
- ✅ Configuration dynamique de Google OAuth
- ✅ Gestion des administrateurs depuis la base de données
- ✅ Interface admin pour gérer les rôles
- ✅ Documentation complète
