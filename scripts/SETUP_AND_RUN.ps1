# ==========================================================
# 🚀 SETUP & RUN - AzyMarket
# Ce script prépare l'environnement pour ton ami et lance le projet
# ==========================================================

Write-Host "🔄 1. Récupération de la dernière version du code..." -ForegroundColor Cyan
git fetch origin
git checkout main
git pull origin main

Write-Host "🔑 2. Configuration des secrets (Google OAuth)..." -ForegroundColor Cyan
$EnvFile = ".env"
$GoogleSecret = "GOOGLE_CLIENT_SECRET=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"

if (-not (Test-Path $EnvFile)) {
    Write-Host "   Création du fichier .env..." -ForegroundColor Yellow
    Set-Content -Path $EnvFile -Value $GoogleSecret
} else {
    Write-Host "   Le fichier .env existe déjà." -ForegroundColor Green
}

Write-Host "🐳 3. Lancement de Docker..." -ForegroundColor Cyan
Write-Host "   Cela peut prendre quelques minutes la première fois." -ForegroundColor Yellow
docker-compose up --build

# Une fois terminé
Write-Host "✅ Projet lancé !" -ForegroundColor Green
Write-Host "   Frontend : http://localhost:5173"
Write-Host "   Backend  : http://localhost:8080"
