# Start API Gateway
Write-Host "====================================" -ForegroundColor Yellow
Write-Host "  Starting API GATEWAY (8080)" -ForegroundColor Yellow
Write-Host "====================================" -ForegroundColor Yellow

Set-Location "C:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\api-gateway"

mvn spring-boot:run
