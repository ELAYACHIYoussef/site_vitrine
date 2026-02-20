# Start Auth Service
Write-Host "====================================" -ForegroundColor Blue
Write-Host "  Starting AUTH SERVICE (8081)" -ForegroundColor Blue
Write-Host "====================================" -ForegroundColor Blue

Set-Location "C:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\auth-service"

mvn spring-boot:run
