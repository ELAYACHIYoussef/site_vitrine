# 🚀 Les Commandes Git pour ton pote

Voici exactement ce que ton ami doit taper dans son terminal pour récupérer la dernière version (main) et lancer le projet.

## 1. Récupérer la dernière version

Il doit se mettre sur la branche principale et tout télécharger :

```powershell
# Aller sur la branche principale
git checkout main

# Télécharger les dernières modifs (tes corrections Docker)
git pull origin main
```

## 2. Configurer le Secret (Une seule fois)

Comme le mot de passe Google est secret, il n'est pas dans Git. Il doit créer le fichier manuellement ou taper cette commande magique (PowerShell) :

```powershell
# Créer le fichier .env avec la clé
echo "GOOGLE_CLIENT_SECRET=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" > .env
```

## 3. Lancer le projet

```powershell
# Lancer Docker (avec reconstruction pour être sûr)
docker-compose up --build
```

---

## 🔄 Et pour toi ? (Pour rester à jour)

Comme on a mis à jour `main`, toi aussi tu restes dessus pour l'instant si tu veux faire simple :

```powershell
git checkout main
git pull origin main
```
