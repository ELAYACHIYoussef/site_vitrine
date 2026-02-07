require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { db, initDb } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

// Validate required environment variables
if (!JWT_SECRET) {
    console.error('ERREUR: JWT_SECRET n\'est pas défini dans le fichier .env');
    process.exit(1);
}

// Google OAuth Client ID
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const googleClient = GOOGLE_CLIENT_ID ? new OAuth2Client(GOOGLE_CLIENT_ID) : null;

// Admin emails list from environment
const ADMIN_EMAILS = process.env.ADMIN_EMAILS 
    ? process.env.ADMIN_EMAILS.split(',').map(email => email.trim().toLowerCase())
    : [];

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Accès refusé. Token manquant.' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token invalide.' });
        req.user = user;
        next();
    });
};

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Accès refusé. Réservé aux administrateurs.' });
    }
};

// Multer for uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'images/products/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Helper: Determine role by email
function getRoleByEmail(email) {
    return ADMIN_EMAILS.includes(email.toLowerCase()) ? 'admin' : 'client';
}

// ========== AUTH ROUTES ==========

// Register
app.post('/api/auth/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const role = getRoleByEmail(email);
        db.run(`INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
            [username, email, hashedPassword, role],
            function (err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: 'Email ou nom d\'utilisateur déjà pris.' });
                    }
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'Compte créé avec succès !' });
            }
        );
    } catch (e) {
        res.status(500).json({ error: 'Erreur serveur.' });
    }
});

// Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ error: 'Utilisateur non trouvé.' });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'Mot de passe incorrect.' });
        const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    });
});

// Google OAuth Login
app.post('/api/auth/google', async (req, res) => {
    // Check if Google OAuth is configured
    if (!googleClient || !GOOGLE_CLIENT_ID) {
        return res.status(503).json({ 
            error: 'Authentification Google non configurée. Veuillez contacter l\'administrateur.' 
        });
    }

    const { credential } = req.body;
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;
        const role = getRoleByEmail(email);

        // Check if user exists
        db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
            if (err) return res.status(500).json({ error: err.message });

            if (user) {
                // User exists, login
                const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
            } else {
                // Create new user
                db.run(`INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`,
                    [name, email, 'google_oauth_' + googleId, role],
                    function (err) {
                        if (err) return res.status(500).json({ error: err.message });
                        const token = jwt.sign({ id: this.lastID, role, username: name }, JWT_SECRET, { expiresIn: '1h' });
                        res.json({ token, user: { id: this.lastID, username: name, email, role } });
                    }
                );
            }
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(401).json({ error: 'Authentification Google échouée.' });
    }
});

// ========== PRODUCTS ROUTES ==========

app.get('/api/products', (req, res) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const products = rows.map(p => ({
            ...p,
            caracteristiques: JSON.parse(p.caracteristiques || '[]'),
            images: JSON.parse(p.images || '[]')
        }));
        res.json(products);
    });
});

app.post('/api/products', authenticateToken, authorizeAdmin, upload.single('image'), (req, res) => {
    const { name, category, price, description, categoryLabel } = req.body;
    const imagePath = req.file ? `images/products/${req.file.filename}` : 'images/placeholder.jpg';
    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const sql = `INSERT INTO products (name, slug, category, categoryLabel, price, description_courte, thumbnail, images, caracteristiques) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [name, slug, category, categoryLabel || category, parseFloat(price), description, imagePath, JSON.stringify([imagePath]), JSON.stringify([])];
    db.run(sql, params, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product added', id: this.lastID });
    });
});

app.delete('/api/products/:id', authenticateToken, authorizeAdmin, (req, res) => {
    db.run("DELETE FROM products WHERE id = ?", req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product deleted', changes: this.changes });
    });
});

// ========== PROFILE ROUTES ==========

// Get user profile
app.get('/api/profile', authenticateToken, (req, res) => {
    db.get(`SELECT id, username, email, role FROM users WHERE id = ?`, [req.user.id], (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    });
});

// Update user profile
app.put('/api/profile', authenticateToken, async (req, res) => {
    const { username, email, currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // If changing password, verify current password first
    if (newPassword) {
        db.get(`SELECT password FROM users WHERE id = ?`, [userId], async (err, user) => {
            if (err) return res.status(500).json({ error: err.message });
            const validPassword = await bcrypt.compare(currentPassword, user.password);
            if (!validPassword) return res.status(400).json({ error: 'Mot de passe actuel incorrect' });

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            db.run(`UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`,
                [username, email, hashedPassword, userId],
                (err) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ message: 'Profil mis à jour' });
                }
            );
        });
    } else {
        db.run(`UPDATE users SET username = ?, email = ? WHERE id = ?`, [username, email, userId], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Profil mis à jour' });
        });
    }
});

// ========== FAVORITES ROUTES ==========

// Get user favorites
app.get('/api/favorites', authenticateToken, (req, res) => {
    const sql = `SELECT p.* FROM products p 
                 INNER JOIN favorites f ON p.id = f.product_id 
                 WHERE f.user_id = ?`;
    db.all(sql, [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const products = rows.map(p => ({
            ...p,
            caracteristiques: JSON.parse(p.caracteristiques || '[]'),
            images: JSON.parse(p.images || '[]')
        }));
        res.json(products);
    });
});

// Add to favorites
app.post('/api/favorites/:productId', authenticateToken, (req, res) => {
    db.run(`INSERT INTO favorites (user_id, product_id) VALUES (?, ?)`,
        [req.user.id, req.params.productId],
        (err) => {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({ error: 'Déjà dans les favoris' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: 'Ajouté aux favoris' });
        }
    );
});

// Remove from favorites
app.delete('/api/favorites/:productId', authenticateToken, (req, res) => {
    db.run(`DELETE FROM favorites WHERE user_id = ? AND product_id = ?`,
        [req.user.id, req.params.productId],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Retiré des favoris' });
        }
    );
});

// ========== CART ROUTES ==========

// Get user cart
app.get('/api/cart', authenticateToken, (req, res) => {
    const sql = `SELECT c.id as cart_id, c.quantity, p.* FROM cart c 
                 INNER JOIN products p ON c.product_id = p.id 
                 WHERE c.user_id = ?`;
    db.all(sql, [req.user.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        const items = rows.map(item => ({
            cart_id: item.cart_id,
            quantity: item.quantity,
            product: {
                id: item.id,
                name: item.name,
                price: item.price,
                thumbnail: item.thumbnail,
                images: JSON.parse(item.images || '[]')
            }
        }));
        res.json(items);
    });
});

// Add to cart
app.post('/api/cart', authenticateToken, (req, res) => {
    const { product_id, quantity } = req.body;
    db.run(`INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?) 
            ON CONFLICT(user_id, product_id) DO UPDATE SET quantity = quantity + ?`,
        [req.user.id, product_id, quantity || 1, quantity || 1],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Ajouté au panier' });
        }
    );
});

// Update cart item quantity
app.put('/api/cart/:itemId', authenticateToken, (req, res) => {
    const { quantity } = req.body;
    db.run(`UPDATE cart SET quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`,
        [quantity, req.params.itemId, req.user.id],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Quantité mise à jour' });
        }
    );
});

// Remove from cart
app.delete('/api/cart/:itemId', authenticateToken, (req, res) => {
    db.run(`DELETE FROM cart WHERE id = ? AND user_id = ?`, [req.params.itemId, req.user.id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Retiré du panier' });
    });
});

// ========== ORDERS ROUTES ==========

// Get user orders
app.get('/api/orders', authenticateToken, (req, res) => {
    const sql = `SELECT o.*, 
                 (SELECT json_group_array(json_object('name', p.name, 'quantity', oi.quantity, 'price', oi.price))
                  FROM order_items oi 
                  INNER JOIN products p ON oi.product_id = p.id 
                  WHERE oi.order_id = o.id) as items
                 FROM orders o WHERE o.user_id = ? ORDER BY o.created_at DESC`;
    db.all(sql, [req.user.id], (err, orders) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(orders.map(o => ({ ...o, items: JSON.parse(o.items || '[]') })));
    });
});

// Create order (checkout)
app.post('/api/checkout', authenticateToken, (req, res) => {
    const userId = req.user.id;

    // Get cart items
    db.all(`SELECT c.product_id, c.quantity, p.price FROM cart c 
            INNER JOIN products p ON c.product_id = p.id WHERE c.user_id = ?`, [userId], (err, items) => {
        if (err) return res.status(500).json({ error: err.message });
        if (items.length === 0) return res.status(400).json({ error: 'Panier vide' });

        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Create order
        db.run(`INSERT INTO orders (user_id, total, status) VALUES (?, ?, 'pending')`, [userId, total], function (err) {
            if (err) return res.status(500).json({ error: err.message });
            const orderId = this.lastID;

            // Insert order items
            const stmt = db.prepare(`INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`);
            items.forEach(item => stmt.run(orderId, item.product_id, item.quantity, item.price));
            stmt.finalize();

            // Clear cart
            db.run(`DELETE FROM cart WHERE user_id = ?`, [userId]);

            res.json({ message: 'Commande créée', order_id: orderId, total });
        });
    });
});

// ========== CONFIG ROUTES ==========

// Get public configuration (pour le frontend)
app.get('/api/config', (req, res) => {
    res.json({
        googleClientId: GOOGLE_CLIENT_ID || null,
        googleAuthEnabled: !!GOOGLE_CLIENT_ID
    });
});

// ========== ADMIN MANAGEMENT ROUTES ==========

// Get all admin emails (admin only)
app.get('/api/admin/admins', authenticateToken, authorizeAdmin, (req, res) => {
    db.all(`SELECT id, username, email, role FROM users WHERE role = 'admin'`, [], (err, admins) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ 
            admins,
            configuredEmails: ADMIN_EMAILS 
        });
    });
});

// Add admin by email (admin only)
app.post('/api/admin/admins', authenticateToken, authorizeAdmin, (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email requis' });

    const normalizedEmail = email.trim().toLowerCase();
    
    // Update user role to admin if exists
    db.run(`UPDATE users SET role = 'admin' WHERE LOWER(email) = ?`, [normalizedEmail], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        if (this.changes > 0) {
            res.json({ message: `Utilisateur ${email} promu administrateur`, changes: this.changes });
        } else {
            res.status(404).json({ 
                error: 'Utilisateur non trouvé',
                info: 'L\'utilisateur doit d\'abord créer un compte'
            });
        }
    });
});

// Remove admin role (admin only)
app.delete('/api/admin/admins/:userId', authenticateToken, authorizeAdmin, (req, res) => {
    const userId = parseInt(req.params.userId);
    
    // Prevent removing own admin role
    if (userId === req.user.id) {
        return res.status(400).json({ error: 'Vous ne pouvez pas retirer vos propres droits d\'administrateur' });
    }

    db.run(`UPDATE users SET role = 'client' WHERE id = ?`, [userId], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Droits administrateur retirés', changes: this.changes });
    });
});

// Start Server
initDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`JWT Secret configured: ${!!JWT_SECRET}`);
        console.log(`Google OAuth enabled: ${!!GOOGLE_CLIENT_ID}`);
        console.log(`Admin emails configured: ${ADMIN_EMAILS.length}`);
    });
}).catch(err => console.error('DB init failed:', err));
