# 🚀 Checklist de Mise en Production

## Avant de déployer en production

### 1. Configuration de Sécurité ✅

- [ ] **Générer une nouvelle clé JWT sécurisée**
  ```bash
  npm run generate-jwt
  ```
  Copier la clé générée dans votre fichier \.env\ de production

- [ ] **Configurer les variables d'environnement sur le serveur**
  - \JWT_SECRET\ : Clé JWT forte générée
  - \GOOGLE_CLIENT_ID\ : Client ID Google OAuth (si utilisé)
  - \NODE_ENV=production\
  - \PORT\ : Port du serveur (par défaut 3000)
  - \ADMIN_EMAILS\ : Liste des emails administrateurs

- [ ] **Vérifier le fichier .gitignore**
  - Confirmer que \.env\ est bien dans .gitignore
  - Ne jamais commiter le fichier \.env\

### 2. Configuration Google OAuth (Optionnel) ☁️

Si vous utilisez Google OAuth :

- [ ] Créer un projet sur [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Activer l'API Google+ / Google Identity
- [ ] Créer des identifiants OAuth 2.0
- [ ] Configurer les origines autorisées :
  - Développement : \http://localhost:3000\
  - Production : \https://votredomaine.com\
- [ ] Copier le Client ID dans votre \.env\

### 3. Base de Données 🗄️

- [ ] Sauvegarder \products.db\ régulièrement
- [ ] Configurer des sauvegardes automatiques en production
- [ ] Tester la restauration de sauvegarde

### 4. Sécurité Réseau 🔒

- [ ] **HTTPS obligatoire en production**
  - Obtenir un certificat SSL (Let's Encrypt gratuit)
  - Rediriger tout le trafic HTTP vers HTTPS

- [ ] **Configurer CORS** dans \server.js\
  ```javascript
  app.use(cors({
    origin: 'https://votredomaine.com',
    credentials: true
  }));
  ```

- [ ] **Rate limiting** (protection contre les attaques)
  ```bash
  npm install express-rate-limit
  ```

### 5. Performance ⚡

- [ ] Activer la compression gzip
- [ ] Mettre en cache les ressources statiques
- [ ] Utiliser un reverse proxy (Nginx)
- [ ] Configurer PM2 pour la gestion des processus Node.js

### 6. Monitoring & Logs 📊

- [ ] Configurer les logs d'erreur
- [ ] Mettre en place un monitoring (Uptime, CPU, RAM)
- [ ] Configurer les alertes d'erreur

### 7. Tests Avant Déploiement 🧪

- [ ] Tester l'inscription/connexion
- [ ] Tester l'authentification Google OAuth
- [ ] Tester les fonctionnalités admin
- [ ] Tester l'ajout/suppression de produits
- [ ] Tester le panier et les commandes
- [ ] Tester sur mobile

### 8. Documentation 📚

- [ ] Mettre à jour le README.md
- [ ] Documenter les APIs
- [ ] Former les administrateurs

---

## Commandes Utiles

### Développement
```bash
# Installer les dépendances
npm install

# Générer une clé JWT
npm run generate-jwt

# Démarrer le serveur
npm start
```

### Production avec PM2
```bash
# Installer PM2 globalement
npm install -g pm2

# Démarrer l'application
pm2 start server.js --name "site_vitrine"

# Voir les logs
pm2 logs site_vitrine

# Redémarrer
pm2 restart site_vitrine

# Sauvegarder la configuration
pm2 save
pm2 startup
```

---

## Variables d'Environnement Requises

### Développement (\.env\)
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=votre_clé_de_développement
GOOGLE_CLIENT_ID=votre_client_id_dev
DB_PATH=./products.db
ADMIN_EMAILS=admin@example.com
```

### Production (Variables serveur)
```env
PORT=3000
NODE_ENV=production
JWT_SECRET=clé_jwt_forte_et_aléatoire_de_64_caractères_minimum
GOOGLE_CLIENT_ID=votre_client_id_production
DB_PATH=/chemin/absolu/vers/products.db
ADMIN_EMAILS=admin@votredomaine.com,admin2@votredomaine.com
```

---

## Support & Dépannage

### Le serveur ne démarre pas
1. Vérifier que \.env\ existe et contient \JWT_SECRET\
2. Vérifier que toutes les dépendances sont installées
3. Vérifier les logs d'erreur

### Google OAuth ne fonctionne pas
1. Vérifier \GOOGLE_CLIENT_ID\ dans \.env\
2. Vérifier les origines autorisées dans Google Cloud Console
3. Vérifier que le domaine est en HTTPS en production

### Problème de base de données
1. Vérifier les permissions du fichier \products.db\
2. Restaurer depuis une sauvegarde si nécessaire
3. Recréer les tables avec \initDb()\

---

## Contacts & Ressources

- Documentation Express.js : https://expressjs.com/
- Google OAuth Documentation : https://developers.google.com/identity
- JWT Best Practices : https://jwt.io/introduction
- SQLite Documentation : https://www.sqlite.org/docs.html

---

**✅ Liste complétée ? Vous êtes prêt à déployer !**
