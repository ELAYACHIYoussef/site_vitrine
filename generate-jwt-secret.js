// generate-jwt-secret.js
// Script pour générer une clé JWT sécurisée

const crypto = require('crypto');

console.log('='.repeat(60));
console.log('🔐 Génération de clé JWT sécurisée');
console.log('='.repeat(60));
console.log('');
console.log('Votre nouvelle clé JWT :');
console.log('');
console.log(crypto.randomBytes(64).toString('hex'));
console.log('');
console.log('💡 Copiez cette clé dans votre fichier .env :');
console.log('   JWT_SECRET=votre_clé_générée');
console.log('');
console.log('⚠️  IMPORTANT : Ne partagez JAMAIS cette clé !');
console.log('='.repeat(60));
