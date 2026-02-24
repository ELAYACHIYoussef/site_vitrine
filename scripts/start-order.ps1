# Start Order Service
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  Starting ORDER SERVICE (8083)" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Load .env variables
$basePath = "C:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine"
$envFile = "$basePath\.env"
Get-Content $envFile | Where-Object { $_ -match "^\s*[^#]" -and $_ -match "=" } | ForEach-Object {
    $parts = $_ -split "=", 2
    $key = $parts[0].Trim()
    $value = $parts[1].Trim()
    [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
    Write-Host "  ENV: $key loaded" -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "  DB URL: $env:ORDER_DB_URL" -ForegroundColor Cyan
Write-Host ""

Set-Location "$basePath\ecommerce-backend\order-service"

mvn spring-boot:run
