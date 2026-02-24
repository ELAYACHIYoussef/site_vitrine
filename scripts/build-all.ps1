# Build All Script
$MavenBin = "$env:LOCALAPPDATA\Maven\apache-maven-3.9.12\bin"
$env:Path += ";$MavenBin"
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.18.8-hotspot"
$env:Path = "$env:JAVA_HOME\bin;$env:Path"

$basePath = "C:\Users\Utilisateur\Desktop\site_vitrine-main"

# Backend Build
Write-Host "Building Backend..." -ForegroundColor Cyan
Set-Location "$basePath\ecommerce-backend"
cmd /c mvn clean install -DskipTests

# Frontend Install
Write-Host "Installing Frontend Dependencies..." -ForegroundColor Cyan
Set-Location "$basePath\ecommerce-frontend"
npm install

Write-Host "Build Complete!" -ForegroundColor Green
