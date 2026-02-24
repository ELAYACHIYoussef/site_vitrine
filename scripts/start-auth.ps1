# Start Auth Service
Write-Host "====================================" -ForegroundColor Blue
Write-Host "  Starting AUTH SERVICE (8081)" -ForegroundColor Blue
Write-Host "====================================" -ForegroundColor Blue

# Load .env variables
$envFile = "C:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\.env"
Get-Content $envFile | Where-Object { $_ -match "^\s*[^#]" -and $_ -match "=" } | ForEach-Object {
    $parts = $_ -split "=", 2
    $key = $parts[0].Trim()
    $value = $parts[1].Trim()
    [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
    Write-Host "  ENV: $key loaded" -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "  DB URL: $env:AUTH_DB_URL" -ForegroundColor Cyan
Write-Host ""

Set-Location "C:\Users\Administrator\OneDrive\Desktop\site_vitrine\site_vitrine\ecommerce-backend\auth-service"

mvn spring-boot:run
