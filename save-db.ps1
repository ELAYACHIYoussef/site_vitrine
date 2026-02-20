# Save Database (Merge Friendly)
$ContainerName = "azymarket-postgres"
$DumpFile = "shared_data.sql"

Write-Host "🔄 Saving shared data (Catalog) to '$DumpFile'..." -ForegroundColor Cyan

# We only dump the 'ecommerce_catalog' data (products, categories, etc.)
# We use --column-inserts to make it git-merge friendly (one line per row)
# We use --data-only because schema changes should be managed via code/init.sql

$TablesToDump = "-t products -t categories -t product_images -t product_sizes -t product_colors"

docker exec -e PGPASSWORD=you123 $ContainerName pg_dump -U postgres --data-only --column-inserts $TablesToDump ecommerce_catalog > $DumpFile

Write-Host "✅ Data saved to '$DumpFile'." -ForegroundColor Green
Write-Host "📝 NOTE: This file contains only DATA (products), not the database structure."
