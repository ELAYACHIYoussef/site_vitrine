# 🔐 Guide de Configuration Google OAuth2

Pour activer la connexion avec Google sur AzyMarket, vous devez créer des identifiants sur la console Google Cloud. Suivez ces étapes :

## Étape 1 : Créer un Projet Google Cloud
1.  Allez sur [Google Cloud Console](https://console.cloud.google.com/).
2.  Connectez-vous avec votre compte Google.
3.  En haut à gauche, cliquez sur le sélecteur de projet (ou "Sélectionner un projet").
4.  Cliquez sur **"Nouveau projet"**.
5.  Nommez-le `AzyMarket-Dev` et cliquez sur **Créer**.
6.  Une fois créé, sélectionnez ce projet.

## Étape 2 : Configurer l'écran de consentement (Audience)
1.  Sur l'écran que vous m'avez montré ("Google Auth Platform / Audience"), cliquez sur le bouton bleu **"Premiers pas"** (ou "Get Started") au centre ou en bas.
2.  Une fenêtre ou une page de configuration va s'ouvrir.
3.  **App Information** (Informations sur l'application) :
    *   **Nom de l'application** : `AzyMarket`
    *   **Email d'assistance** : Sélectionnez votre email.
    *   cliquez sur **Suivant** (Next).
4.  **Audience** :
    *   C'est ici que vous devez choisir **"Externe"** (External).
    *   *Si on ne vous le demande pas tout de suite, continuez, vous pourrez le vérifier plus tard.*
5.  **Coordonnées** :
    *   Mettez votre email dans "Email address".
    *   Cliquez sur **Suivant** ou **Enregistrer**.
6.  Acceptez les conditions si demandé.
7.  Une fois terminé, vous devriez voir un écran avec "Data Access" ou "Clients".

## Étape 2.1 : Ajouter votre email en testeur (Important pour "Externe")
1.  Dans le menu de gauche, cherchez **"Audience"** (ou "Utilisateurs tests").
2.  Ajoutez votre propre adresse Gmail dans la liste des **"Test Users"** (Utilisateurs test).
    *   *Sans ça, vous aurez une erreur "Access Blocked" car l'app n'est pas vérifiée.*

## Étape 3 : Créer les Identifiants (Clients)
1.  Dans le menu de gauche, cliquez sur **"Clients"** (sous Audience ou Branding).
2.  Cliquez sur le bouton **"+ CRÉER UN CLIENT"** (Create Client).
3.  **Type d'application** : Sélectionnez **"Application Web"**.
4.  **Nom** : `AzyMarket Web`.
5.  **Origines JavaScript autorisées** :
    *   Ajoutez : `http://localhost:5173`
    *   Ajoutez : `http://localhost:8081`
6.  **URI de redirection autorisés** (TRES IMPORTANT) :
    *   Ajoutez : `http://localhost:8081/login/oauth2/code/google`
7.  Cliquez sur **CRÉER**.

## Étape 4 : Copier les clés
Une fenêtre va s'ouvrir avec vos codes :
1.  Copiez votre **"ID client"**.
2.  Copiez votre **"Code secret du client"**.

## Étape 5 : Intégrer dans le Projet
Ouvrez le fichier `ecommerce-backend/auth-service/src/main/resources/application.yml` et remplacez les placeholders :

```yaml
spring:
  security:
    oauth2:
      client:
        registration:
          google:
            client-id: COLLEZ_VOTRE_CLIENT_ID_ICI
            client-secret: COLLEZ_VOTRE_SECRET_ICI
```

## Étape 6 : Redémarrer
Une fois le fichier sauvegardé, **redémarrez le service `auth-service`** pour prendre en compte les changements.
