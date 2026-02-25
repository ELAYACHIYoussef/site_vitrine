# DÉMARRAGE 100% DOCKER - AZYMARKET
Write-Host "Initialisation du lancement Docker Compose..." -ForegroundColor Cyan

# 0. Arrêt des processus locaux pour éviter les conflits de ports
Write-Host "Nettoyage des anciens processus..." -ForegroundColor Yellow
Stop-Process -Name "java" -ErrorAction SilentlyContinue
Stop-Process -Name "node" -ErrorAction SilentlyContinue

# 1. Lancement via Docker Compose
Write-Host "Lancement de la stack via Docker Compose..." -ForegroundColor Green
docker-compose up --build -d

Write-Host "==================================================" -ForegroundColor Green
Write-Host "PROJET LANCÉ EN ARRIÈRE-PLAN (DOCKER)"
Write-Host "Frontend: http://localhost:5173"
Write-Host "Eureka:   http://localhost:8761"
Write-Host "Gateway:  http://localhost:8080"
Write-Host "==================================================" -ForegroundColor Green
Write-Host "Utilisez 'docker-compose logs -f' pour voir les journaux si besoin."
