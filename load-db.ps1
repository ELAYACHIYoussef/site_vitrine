# Load Database (Merge Friendly)
$ContainerName = "azymarket-postgres"
$DumpFile = "shared_data.sql"

Write-Host "🔄 Loading shared data from '$DumpFile'..." -ForegroundColor Cyan

if (!(Test-Path $DumpFile)) {
    Write-Host "❌ File '$DumpFile' not found."
    exit 1
}

# Strategy:
# 1. Truncate tables to remove local data (to avoid ID conflicts with the incoming full dump)
# 2. Load the dump
# NOTE: This means "Local only" changes that weren't saved are lost. This is the trade-off for simple sync.

Write-Host "⚠️  Cleaning existing catalog data..."
docker exec -e PGPASSWORD=you123 $ContainerName psql -U postgres -d ecommerce_catalog -c "TRUNCATE products, categories RESTART IDENTITY CASCADE;"

Write-Host "📥 Importing data..."
Get-Content $DumpFile | docker exec -i -e PGPASSWORD=you123 $ContainerName psql -U postgres -d ecommerce_catalog

Write-Host "✅ Data imported successfully." -ForegroundColor Green
