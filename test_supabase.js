const { Client } = require('pg');

// Credentials from .env (Supabase Pooler - IPv4 compatible, port 6543)
const client = new Client({
    host: 'aws-1-eu-north-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.rvmytniriifkbrgsjwdk',
    password: 'rVlxTXkcWbleCBra',
    ssl: {
        rejectUnauthorized: false
    }
});

async function testConnection() {
    try {
        console.log('Tentative de connexion à Supabase (Pooler IPv4)...');
        await client.connect();
        console.log('✅ Connexion REUSSIE !');
        const res = await client.query('SELECT current_database(), current_schema(), version();');
        console.log('Base de données :', res.rows[0].current_database);
        console.log('Schéma :', res.rows[0].current_schema);
        console.log('Version PostgreSQL :', res.rows[0].version.split(' ').slice(0, 2).join(' '));

        // List existing tables
        const tables = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        `);
        if (tables.rows.length > 0) {
            console.log('\n📋 Tables existantes dans public:');
            tables.rows.forEach(row => console.log('  -', row.table_name));
        } else {
            console.log('\n📋 Aucune table dans le schéma public (sera créé par Hibernate au démarrage des services)');
        }

        await client.end();
    } catch (err) {
        console.error('❌ ECHEC de la connexion :', err.message);
        process.exit(1);
    }
}

testConnection();
