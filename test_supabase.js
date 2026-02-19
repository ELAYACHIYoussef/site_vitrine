const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgresql://postgres:you123@db.rvmytniriifkbrgsjwdk.supabase.co:5432/postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

async function testConnection() {
    try {
        console.log('Tentative de connexion à Supabase...');
        await client.connect();
        console.log('✅ Connexion REUSSIE !');
        const res = await client.query('SELECT current_database(), current_schema();');
        console.log('Données :', res.rows[0]);
        await client.end();
    } catch (err) {
        console.error('❌ ECHEC de la connexion :', err.message);
        process.exit(1);
    }
}

testConnection();
