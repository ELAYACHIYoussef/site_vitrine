require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const dbPath = path.resolve(__dirname, 'products.db');
const db = new sqlite3.Database(dbPath);

async function migrateData() {
    console.log('--- Starting Migration: SQLite to Supabase ---');

    // 1. Migrate Products
    db.all("SELECT * FROM products", [], async (err, rows) => {
        if (err) {
            console.error('Error reading SQLite products:', err);
            return;
        }

        console.log(`Found ${rows.length} products to migrate.`);

        for (const p of rows) {
            const { error } = await supabase.from('products').upsert({
                id: p.id,
                name: p.name,
                slug: p.slug,
                category: p.category,
                categorylabel: p.categoryLabel,
                price: p.price,
                badge: p.badge,
                photos: p.photos,
                description_courte: p.description_courte,
                description_complete: p.description_complete,
                caracteristiques: p.caracteristiques ? JSON.parse(p.caracteristiques) : [],
                thumbnail: p.thumbnail,
                images: p.images ? JSON.parse(p.images) : [],
                views: p.views || 0,
                condition: p.condition || 'Occasion',
                images_json: p.images_json ? JSON.parse(p.images_json) : []
            });

            if (error) {
                console.error(`Error migrating product ${p.name}:`, error.message);
            } else {
                console.log(`Migrated product: ${p.name}`);
            }
        }

        console.log('--- Products Migration Finished ---');

        // Note: You can add users and orders migration here if needed
        console.log('Note: Users and Orders migration not implemented here to avoid conflicts. Please register again on the new platform or add them manually.');

        process.exit(0);
    });
}

migrateData();
