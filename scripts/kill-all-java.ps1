Stop-Process -Name "java" -Force -ErrorAction SilentlyContinue
Write-Host "Tous les processus Java ont été arrêtés." -ForegroundColor Green
