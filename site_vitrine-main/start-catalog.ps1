# Start Catalog Service
Write-Host "======================================" -ForegroundColor Magenta
Write-Host "  Starting CATALOG SERVICE (8082)" -ForegroundColor Magenta
Write-Host "======================================" -ForegroundColor Magenta

Set-Location "C:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\catalog-service"

mvn spring-boot:run
