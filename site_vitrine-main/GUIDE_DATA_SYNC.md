# 🔄 Guide de Synchronisation des Données (Toi & Ton Pote)

Vous travaillez à deux sur le projet, mais chacun a sa propre base de données locale (dans son Docker). Voici comment s'assurer que vous voyez la même chose.

## 1. La Méthode "Automatique" (Recommandée) : Le DataSeeder 🌱

C'est la méthode que je viens de mettre en place.

*   **Le Principe :** Les données de test (Produits, Catégories, Admins par défaut) sont définies **DANS LE CODE** (Java).
*   **Avantage :** Si tu ajoutes un nouveau produit dans le code (`DataSeeder.java`) et que tu pousses sur Git, ton pote récupère le code, lance le projet, et **POUF**, le produit apparaît chez lui aussi.
*   **Comment faire ?**
    1.  Modifiez le fichier `ecommerce-backend/catalog-service/.../DataSeeder.java`.
    2.  Ajoutez vos produits/catégories là-dedans.
    3.  Faites un `git commit` et `git push`.
    4.  Votre pote fait `git pull` et `docker-compose up --build`.

✅ **C'est la meilleure méthode pour les données de développement.** Tout le monde a toujours la même base propre au démarrage.

---

## 2. La Méthode "Manuelle" (Pour les données temporaires) 💾

Parfois, tu crées un compte utilisateur ou une commande manuellement via le site, et tu veux que ton pote voie exactement ça pour debugger. Comme c'est dans ta base locale, il ne peut pas le voir.

**Solution : Exporter/Importer la base de données.**

### Étape A : Exporter tes données (Toi)
Ouvre un terminal dans le dossier du projet :
```powershell
# Créer un fichier de sauvegarde "backup.sql"
docker exec -t azymarket-postgres pg_dumpall -c -U postgres > backup.sql
```
Envoie ce fichier `backup.sql` à ton pote (par Discord, Slack, email...).

### Étape B : Importer les données (Ton Pote)
Il reçoit le fichier `backup.sql` et le met dans son dossier projet.
Ensuite, il lance :
```powershell
# ⚠️ ATTENTION : Ça efface sa base actuelle pour mettre la tienne !
cat backup.sql | docker exec -i azymarket-postgres psql -U postgres
```
(Sur Windows PowerShell, `cat` peut être remplacé par `Get-Content`).

---

## 3. La Méthode "Cloud" (Avancée) ☁️

Si vous en avez marre de synchroniser, la solution finale est d'héberger la base de données en ligne (ex: Supabase, Railway, NeonDB).

1.  Vous créez une base Postgres gratuite en ligne.
2.  Dans votre fichier `.env` ou `docker-compose.yml`, vous remplacez l'URL `jdbc:postgresql://postgres:5432/...` par l'URL de la base en ligne.
3.  **Résultat :** Vous tapez tous les deux sur la MÊME base en temps réel.

❌ **Inconvénient :** Si tu casses la base, tu casses celle de ton pote aussi. À éviter en phase de développement intensif.

---

## 🧩 Résumé

| Cas d'usage | Méthode Recommandée |
| :--- | :--- |
| **Ajouter des produits/catégories fixes** | **DataSeeder** (Code Java) |
| **Montrer un bug bizarre sur un client** | **Export SQL** (Fichier .sql) |
| **Production / Démo finale** | **Base de données Cloud** |
