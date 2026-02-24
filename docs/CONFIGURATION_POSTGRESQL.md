# 🔧 Guide Étape par Étape - Configuration PostgreSQL et Variables

## Partie 1 : Installation et Configuration de PostgreSQL

### Étape 1 : Vérifier si PostgreSQL est installé

Ouvrez PowerShell et tapez :

```powershell
psql --version
```

**Résultat attendu :**
- ✅ Si vous voyez `psql (PostgreSQL) 15.x` ou similaire → PostgreSQL est installé
- ❌ Si vous voyez une erreur → Passez à l'étape 2

### Étape 2 : Installer PostgreSQL (si nécessaire)

Si PostgreSQL n'est pas installé :

1. **Télécharger PostgreSQL** :
   - Allez sur https://www.postgresql.org/download/windows/
   - Cliquez sur "Download the installer"
   - Téléchargez la version recommandée (PostgreSQL 15 ou 16)

2. **Installer** :
   - Exécutez le fichier `.exe` téléchargé
   - Cliquez sur "Next" plusieurs fois
   - **IMPORTANT** : Notez le mot de passe que vous définissez pour l'utilisateur `postgres`
   - Port par défaut : `5432` (laissez tel quel)
   - Terminez l'installation

3. **Vérifier l'installation** :
```powershell
psql --version
```

### Étape 3 : Trouver le chemin de PostgreSQL

PostgreSQL est généralement installé dans :
```
C:\Program Files\PostgreSQL\16\bin\
```

Si la commande `psql` ne fonctionne pas, ajoutez PostgreSQL au PATH :

1. Recherchez "Variables d'environnement" dans Windows
2. Cliquez sur "Variables d'environnement"
3. Dans "Variables système", trouvez `Path`
4. Cliquez sur "Modifier"
5. Cliquez sur "Nouveau"
6. Ajoutez : `C:\Program Files\PostgreSQL\16\bin`
7. Cliquez sur "OK" partout
8. **Fermez et rouvrez PowerShell**

## Partie 2 : Créer les Bases de Données

### Étape 4 : Se connecter à PostgreSQL

Ouvrez PowerShell et tapez :

```powershell
psql -U postgres
```

> **⚠️ Si cela ne marche pas** (erreur `psql : The term...`), utilisez cette commande à la place :
> ```powershell
> & "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres
> ```

**Ce qui va se passer :**
- On vous demandera un mot de passe
- Tapez le mot de passe que vous avez défini lors de l'installation
- Appuyez sur Entrée

**Résultat attendu :**
```
psql (15.x)
Type "help" for help.

postgres=#
```

Vous êtes maintenant connecté à PostgreSQL ! ✅

### Étape 5 : Créer la base de données pour auth-service

Dans le terminal PostgreSQL (avec le prompt `postgres=#`), tapez :

```sql
CREATE DATABASE ecommerce_auth;
```

**Résultat attendu :**
```
CREATE DATABASE
```

### Étape 6 : Créer la base de données pour catalog-service

Toujours dans PostgreSQL, tapez :

```sql
CREATE DATABASE ecommerce_catalog;
```

**Résultat attendu :**
```
CREATE DATABASE
```

### Étape 7 : Vérifier que les bases de données existent

Tapez :

```sql
\l
```

**Résultat attendu :**
Vous devriez voir une liste de bases de données incluant :
- `ecommerce_auth`
- `ecommerce_catalog`

### Étape 8 : Quitter PostgreSQL

Tapez :

```sql
\q
```

Vous êtes de retour dans PowerShell normal. ✅

---

## Partie 3 : Configuration des Variables d'Environnement

Vous avez **2 options**. Je recommande l'**Option 2** pour débuter car c'est plus simple.

---

### ⭐ OPTION 1 : Variables d'Environnement Temporaires (Simple et Rapide)

Ces variables ne sont valides que pour la session PowerShell actuelle.

**Étape 9a : Définir les variables pour auth-service**

Dans PowerShell, copiez-collez ces lignes **une par une** :

```powershell
$env:DATABASE_URL="jdbc:postgresql://localhost:5432/ecommerce_auth"
```
```powershell
$env:DATABASE_USERNAME="postgres"
```
```powershell
$env:DATABASE_PASSWORD="VotreMotDePasse"
```
⚠️ **Remplacez `VotreMot DePasse` par votre vrai mot de passe PostgreSQL**

```powershell
$env:JWT_SECRET_KEY="ma_cle_secrete_jwt_super_longue_au_moins_256_bits_de_securite"
```

**Étape 9b : Vérifier que les variables sont définies**

```powershell
echo $env:DATABASE_URL
echo $env:DATABASE_USERNAME
echo $env:JWT_SECRET_KEY
```

Vous devriez voir vos valeurs s'afficher. ✅

**Étape 9c : Démarrer auth-service**

Dans le MÊME terminal PowerShell, lancez :

```powershell
cd c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\auth-service
mvn spring-boot:run
```

**⚠️ IMPORTANT** : Les variables ne sont valides que dans CE terminal. Pour chaque nouveau terminal, vous devrez les redéfinir !

---

### 🎯 OPTION 2 : Modifier les fichiers application.yml (Recommandé pour débuter)

Cette option est **plus simple** : vous modifiez directement les fichiers de configuration.

**Étape 10a : Modifier auth-service/application.yml**

1. Ouvrez le fichier :
```
c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\auth-service\src\main\resources\application.yml
```

2. Trouvez la section `datasource` et remplacez :

**AVANT :**
```yaml
spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}
```

**APRÈS :**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ecommerce_auth
    username: postgres
    password: VotreMotDePasse
```

⚠️ **Remplacez `VotreMotDePasse` par votre vrai mot de passe PostgreSQL**

3. Trouvez la section `jwt` et remplacez :

**AVANT :**
```yaml
application:
  security:
    jwt:
      secret-key: ${JWT_SECRET_KEY}
```

**APRÈS :**
```yaml
application:
  security:
    jwt:
      secret-key: ma_cle_secrete_jwt_super_longue_au_moins_256_bits_de_securite
```

4. **Sauvegardez le fichier** (Ctrl + S)

**Étape 10b : Modifier catalog-service/application.yml**

1. Ouvrez le fichier :
```
c:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\catalog-service\src\main\resources\application.yml
```

2. Trouvez la section `datasource` et remplacez :

**AVANT :**
```yaml
spring:
  datasource:
    url: ${DATABASE_URL}
    username: ${DATABASE_USERNAME}
    password: ${DATABASE_PASSWORD}
```

**APRÈS :**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ecommerce_catalog
    username: postgres
    password: VotreMotDePasse
```

⚠️ **Remplacez `VotreMotDePasse` par votre vrai mot de passe PostgreSQL**

3. **Sauvegardez le fichier** (Ctrl + S)

---

## ✅ Vérification Finale

### Tester la connexion à la base de données

```powershell
psql -U postgres -d ecommerce_auth
```

Si vous voyez :
```
ecommerce_auth=#
```

C'est bon ! ✅ Tapez `\q` pour quitter.

### Récapitulatif de ce que vous avez fait

✅ PostgreSQL est installé  
✅ Bases de données `ecommerce_auth` et `ecommerce_catalog` créées  
✅ Variables d'environnement configurées (Option 1) OU fichiers application.yml modifiés (Option 2)

---

## 🚀 Prochaines Étapes

Vous pouvez maintenant démarrer vos microservices ! Suivez le guide de démarrage dans `GUIDE_DEMARRAGE.md` :

1. Discovery Service
2. API Gateway
3. Auth Service (avec les variables que vous venez de configurer)
4. Catalog Service (avec les variables que vous venez de configurer)
5. Frontend React

---

## ❓ Dépannage

### Erreur : `psql: command not found`
→ PostgreSQL n'est pas installé ou pas dans le PATH. Retournez à l'étape 2-3.

### Erreur : `password authentication failed`
→ Le mot de passe est incorrect. Vérifiez votre mot de passe PostgreSQL.

### Erreur : `database "ecommerce_auth" does not exist`
→ La base de données n'a pas été créée. Retournez à l'étape 4-6.

### Erreur : `JWT_SECRET_KEY not found` au démarrage
→ Les variables d'environnement ne sont pas définies. Utilisez l'Option 2 (modifier les fichiers `.yml`).

---

**Besoin d'aide ? N'hésitez pas à demander !** 💪
