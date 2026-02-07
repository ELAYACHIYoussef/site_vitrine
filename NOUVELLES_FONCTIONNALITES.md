# 🚀 Nouvelles Fonctionnalités - Version 2.1.0

Date de mise à jour : 2026-02-07

## 📋 Résumé des Améliorations

### ✅ Fonctionnalités Ajoutées

1. **🔒 Sécurité Renforcée** (Rate Limiting + Helmet + CORS)
2. **📧 Système d'Emails & Réinitialisation de Mot de Passe**
3. **🔍 Recherche Avancée avec Filtres**
4. **📱 Optimisation Mobile & Responsive**

---

## 🔒 1. Sécurité Renforcée

### Rate Limiting
- Authentification : 5 tentatives max / 15 minutes
- API générale : 100 requêtes max / 15 minutes

### Helmet - Sécurité HTTP
- Content Security Policy (CSP)
- Protection XSS, Clickjacking, HSTS

### CORS Strict
- Dev : Toutes origines
- Prod : Origines configurables via ALLOWED_ORIGINS

---

## 📧 2. Réinitialisation Mot de Passe

### Pages créées :
- forgot-password.html
- reset-password.html

### Configuration Email (.env) :
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

---

## 🔍 3. Recherche Avancée

### API :
```
GET /api/products/search?q=terme&category=cat&minPrice=10&maxPrice=100&sortBy=price_asc
GET /api/products/categories
```

### Frontend :
- js/search.js - Module de recherche
- css/search.css - Styles

---

## 📱 4. Mobile Responsive

- Media queries optimisées
- Navigation adaptative
- Grilles responsives

---

## 🛠️ Installation

```powershell
npm install
npm start
```

Packages ajoutés :
- express-rate-limit
- helmet
- nodemailer

---

**Version 2.1.0 - 2026-02-07**
