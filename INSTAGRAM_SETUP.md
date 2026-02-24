# Guide de Configuration Instagram API

Pour activer la publication réelle des produits sur Instagram, suivez ces étapes.

## 1. Prérequis sur Meta for Developers
1. Allez sur [Meta for Developers](https://developers.facebook.com/) et créez une nouvelle application de type **Business**.
2. Ajoutez le produit **Instagram Graph API** à votre application.
3. Liez votre **Compte Instagram Professionnel** à une **Page Facebook**.
4. Dans l'Explorateur Graph API, obtenez un **Access Token** avec les permissions :
   - `instagram_content_publish`
   - `instagram_basic`
   - `pages_read_engagement`
   - `pages_show_list`

## 2. Configuration du projet
Mettez à jour votre fichier `.env` avec les valeurs réelles :
```env
INSTAGRAM_ACCESS_TOKEN=votre_jeton_ici
INSTAGRAM_ACCOUNT_ID=votre_id_instagram_ici
```

## 3. Le problème du "Localhost"
L'API Instagram doit pouvoir télécharger vos images depuis une URL publique. Elle ne peut pas voir `http://localhost:8082`.

**Solution temporaire (Développement) :**
1. Téléchargez et installez **ngrok**.
2. Lancez ngrok sur le port du service de catalogue :
   `ngrok http 8082`
3. Utilisez l'URL fournie par ngrok (ex: `https://a1b2-c3d4.ngrok.io`) pour configurer l'URL de base des images dans le code.

## 4. Flux de publication
Une fois configuré, le backend effectuera :
1. Une demande de création de conteneur média.
2. Une demande de publication de ce conteneur.
