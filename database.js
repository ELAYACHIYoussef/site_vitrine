const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'products.db');
const db = new sqlite3.Database(dbPath);

const initDb = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                slug TEXT,
                category TEXT,
                categoryLabel TEXT,
                price REAL,
                badge TEXT,
                photos INTEGER,
                description_courte TEXT,
                description_complete TEXT,
                caracteristiques TEXT, -- JSON string
                thumbnail TEXT,
                images TEXT -- JSON string
            )`, (err) => {
                if (err) {
                    console.error('Error creating table:', err);
                    reject(err);
                    return;
                }
                console.log('Product table ready.');

                // Create Users Table
                db.run(`CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username TEXT UNIQUE,
                    email TEXT UNIQUE,
                    password TEXT,
                    role TEXT DEFAULT 'client'
                )`, (err) => {
                    if (err) console.error('Error creating users table:', err);
                    else console.log('Users table ready.');
                });

                // Create Orders Table
                db.run(`CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    total REAL NOT NULL,
                    status TEXT DEFAULT 'pending',
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )`, (err) => {
                    if (err) console.error('Error creating orders table:', err);
                    else console.log('Orders table ready.');
                });

                // Create Order Items Table
                db.run(`CREATE TABLE IF NOT EXISTS order_items (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    quantity INTEGER NOT NULL,
                    price REAL NOT NULL,
                    FOREIGN KEY (order_id) REFERENCES orders(id),
                    FOREIGN KEY (product_id) REFERENCES products(id)
                )`, (err) => {
                    if (err) console.error('Error creating order_items table:', err);
                    else console.log('Order items table ready.');
                });

                // Create Favorites Table
                db.run(`CREATE TABLE IF NOT EXISTS favorites (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(user_id, product_id),
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (product_id) REFERENCES products(id)
                )`, (err) => {
                    if (err) console.error('Error creating favorites table:', err);
                    else console.log('Favorites table ready.');
                });

                // Create Password Reset Tokens Table
                db.run(`CREATE TABLE IF NOT EXISTS password_reset_tokens (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    token TEXT NOT NULL UNIQUE,
                    expires_at DATETIME NOT NULL,
                    used BOOLEAN DEFAULT 0,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )`, (err) => {
                    if (err) console.error('Error creating password_reset_tokens table:', err);
                    else console.log('Password reset tokens table ready.');
                });

                // Create Cart Table
                db.run(`CREATE TABLE IF NOT EXISTS cart (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL,
                    product_id INTEGER NOT NULL,
                    quantity INTEGER NOT NULL DEFAULT 1,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    UNIQUE(user_id, product_id),
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (product_id) REFERENCES products(id)
                )`, (err) => {
                    if (err) console.error('Error creating cart table:', err);
                    else console.log('Cart table ready.');
                });

                // Check if table is empty
                db.get("SELECT count(*) as count FROM products", [], (err, row) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    if (row.count === 0) {
                        console.log('Seeding initial data...');
                        const productsDataPath = path.join(__dirname, 'data', 'products.json');
                        if (fs.existsSync(productsDataPath)) {
                            let fileContent = fs.readFileSync(productsDataPath, 'utf8');
                            // Remove BOM if present
                            if (fileContent.charCodeAt(0) === 0xFEFF) {
                                fileContent = fileContent.slice(1);
                            }
                            const products = JSON.parse(fileContent);
                            const stmt = db.prepare(`INSERT INTO products (
                                name, slug, category, categoryLabel, price, badge, photos,
                                description_courte, description_complete, caracteristiques,
                                thumbnail, images
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

                            products.forEach(p => {
                                stmt.run(
                                    p.name,
                                    p.slug || '',
                                    p.category,
                                    p.categoryLabel,
                                    p.price,
                                    p.badge,
                                    p.photos,
                                    p.description_courte,
                                    p.description_complete,
                                    JSON.stringify(p.caracteristiques),
                                    p.thumbnail,
                                    JSON.stringify(p.images)
                                );
                            });
                            stmt.finalize();
                            console.log('Product Data seeded successfully.');
                        }
                    }
                    resolve(db);
                });
            });
        });
    });
};

module.exports = { db, initDb };
