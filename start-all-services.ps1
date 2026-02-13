# Master Script to Start All Services in Separate PowerShell Windows
Write-Host "==========================================" -ForegroundColor White -BackgroundColor DarkGreen
Write-Host "  STARTING ALL MICROSERVICES" -ForegroundColor White -BackgroundColor DarkGreen
Write-Host "==========================================" -ForegroundColor White -BackgroundColor DarkGreen
Write-Host ""

$basePath = "C:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine"

# Start Eureka Server (MUST START FIRST)
Write-Host "[1/5] Starting Eureka Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-File", "$basePath\start-eureka.ps1"
Write-Host "  Waiting 30 seconds for Eureka to initialize..." -ForegroundColor Gray
Start-Sleep -Seconds 30

# Start Config Server
Write-Host "[2/5] Starting Config Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-File", "$basePath\start-config.ps1"
Write-Host "  Waiting 15 seconds..." -ForegroundColor Gray
Start-Sleep -Seconds 15

# Start API Gateway
Write-Host "[3/5] Starting API Gateway..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-File", "$basePath\start-gateway.ps1"
Write-Host "  Waiting 10 seconds..." -ForegroundColor Gray
Start-Sleep -Seconds 10

# Start Catalog Service
Write-Host "[4/5] Starting Catalog Service..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-File", "$basePath\start-catalog.ps1"
Write-Host "  Waiting 10 seconds..." -ForegroundColor Gray
Start-Sleep -Seconds 10

# Start Auth Service
Write-Host "[5/5] Starting Auth Service..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-File", "$basePath\start-auth.ps1"

Write-Host ""
Write-Host "==========================================" -ForegroundColor White -BackgroundColor DarkGreen
Write-Host "  ALL SERVICES STARTED!" -ForegroundColor White -BackgroundColor DarkGreen
Write-Host "==========================================" -ForegroundColor White -BackgroundColor DarkGreen
Write-Host ""
Write-Host "Services running in separate PowerShell windows:" -ForegroundColor White
Write-Host "  - Eureka Server    : http://localhost:8761" -ForegroundColor Cyan
Write-Host "  - Config Server    : http://localhost:8888" -ForegroundColor Green
Write-Host "  - API Gateway      : http://localhost:8080" -ForegroundColor Yellow
Write-Host "  - Catalog Service  : http://localhost:8082" -ForegroundColor Magenta
Write-Host "  - Auth Service     : http://localhost:8081" -ForegroundColor Blue
Write-Host ""
Write-Host "Press any key to exit this window..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
