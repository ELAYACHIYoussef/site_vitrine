# FULL STACK RESTART SCRIPT

# 0. Setup Environment
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot"
$MavenBin = "$env:LOCALAPPDATA\Maven\apache-maven-3.9.12\bin"
$env:Path = "$env:JAVA_HOME\bin;$MavenBin;$env:Path"

# 1. Kill potentially running processes (Cleanup)
Write-Host "Stopping existing Java and Node processes..." -ForegroundColor Red
Stop-Process -Name "java" -ErrorAction SilentlyContinue
Stop-Process -Name "node" -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

$basePath = "c:\Users\Utilisateur\Desktop\site_vitrine-main"

# 2. Start Eureka (Discovery)
Write-Host "Starting Eureka Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$basePath\backend\discovery-service'; $env:Path='$env:Path'; mvn spring-boot:run"
Write-Host "Waiting 20s for Eureka..."
Start-Sleep -Seconds 20

# 3. Start API Gateway
Write-Host "Starting API Gateway..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$basePath\backend\api-gateway'; $env:Path='$env:Path'; mvn spring-boot:run"
Start-Sleep -Seconds 10

# 4. Start Microservices
Write-Host "Starting Auth Service..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$basePath\backend\auth-service'; $env:Path='$env:Path'; mvn spring-boot:run"

Write-Host "Starting Catalog Service..." -ForegroundColor Magenta
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$basePath\backend\catalog-service'; $env:Path='$env:Path'; mvn spring-boot:run"

# Order Service commented out as requested or optional? Script had it.
Write-Host "Starting Order Service..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$basePath\backend\order-service'; $env:Path='$env:Path'; mvn spring-boot:run"

# 5. Start Frontend
Write-Host "Starting Frontend..." -ForegroundColor White
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$basePath\frontend'; npm run dev"

Write-Host "==================================================" -ForegroundColor Green
Write-Host "FULL STACK STARTED!"
Write-Host "Frontend: http://localhost:5173"
Write-Host "Eureka:   http://localhost:8761"
Write-Host "Gateway:  http://localhost:8080"
Write-Host "==================================================" -ForegroundColor Green
