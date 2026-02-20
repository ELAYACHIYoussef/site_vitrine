# Start Config Server
Write-Host "====================================" -ForegroundColor Green
Write-Host "  Starting CONFIG SERVER (8888)" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

Set-Location "C:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\config-server"

mvn spring-boot:run
