# Start Eureka Server
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Starting EUREKA SERVER (8761)" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

Set-Location "C:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\eureka-server"

mvn spring-boot:run
