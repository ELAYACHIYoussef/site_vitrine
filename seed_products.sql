-- Nettoyage des tables existantes (optionnel, pour recommencer propre)
DROP TABLE IF EXISTS product_images, product_sizes, product_colors;
TRUNCATE TABLE products RESTART IDENTITY CASCADE;

-- Création des tables manquantes (au cas où Hibernate ne les a pas créées)
CREATE TABLE IF NOT EXISTS product_images (
    product_id BIGINT NOT NULL,
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS product_sizes (
    product_id BIGINT NOT NULL,
    size VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS product_colors (
    product_id BIGINT NOT NULL,
    color VARCHAR(255)
);

-- Ajout des contraintes de clé étrangère si elles n'existent pas (simplifié)
-- ALTER TABLE product_images ADD CONSTRAINT fk_product_images_product_id FOREIGN KEY (product_id) REFERENCES products (id);
-- ALTER TABLE product_sizes ADD CONSTRAINT fk_product_sizes_product_id FOREIGN KEY (product_id) REFERENCES products (id);
-- ALTER TABLE product_colors ADD CONSTRAINT fk_product_colors_product_id FOREIGN KEY (product_id) REFERENCES products (id);

-- 1. Smartphone X Pro (Electronics)
INSERT INTO products (id, name, slug, category, categorylabel, price, stock, description, description_courte, thumbnail, caracteristiques, views, created_at, updated_at)
VALUES (1, 'Smartphone X Pro', 'smartphone-x-pro', 'electronics', 'Électronique', 999.99, 50, 
'Le dernier cri de la technologie mobile. Doté d''un écran OLED de 6,7 pouces, un processeur ultra-rapide et une batterie longue durée. Parfait pour le gaming et la photographie professionnelle.',
'Smartphone haut de gamme avec écran OLED 6.7"',
'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
'{"Ecran": "6.7 OLED", "Stockage": "256GB", "RAM": "12GB"}',
120, NOW(), NOW());

INSERT INTO product_images (product_id, image_url) VALUES
(1, 'https://images.unsplash.com/photo-1592899677712-a17ebd1e5200?q=80&w=800&auto=format&fit=crop'),
(1, 'https://images.unsplash.com/photo-1598327773245-65a880a423a9?q=80&w=800&auto=format&fit=crop');

INSERT INTO product_colors (product_id, color) VALUES (1, 'Noir'), (1, 'Argent'), (1, 'Bleuuit');
INSERT INTO product_sizes (product_id, size) VALUES (1, '256GB'), (1, '512GB');


-- 2. Casque Audio NoiseGuard (Electronics)
INSERT INTO products (id, name, slug, category, categorylabel, price, stock, description, description_courte, thumbnail, caracteristiques, views, created_at, updated_at)
VALUES (2, 'Casque Audio NoiseGuard', 'casque-audio-noiseguard', 'electronics', 'Électronique', 249.99, 100, 
'Expérience sonore immersive avec suppression active du bruit. Coussinets à mémoire de forme pour un confort optimal pendant des heures. Autonomie de 30 heures.',
'Casque sans fil à réduction de bruit active',
'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
'{"Type": "Sans fil", "Autonomie": "30h", "Réduction de bruit": "Oui"}',
85, NOW(), NOW());

INSERT INTO product_images (product_id, image_url) VALUES
(2, 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop'),
(2, 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop');

INSERT INTO product_colors (product_id, color) VALUES (2, 'Noir'), (2, 'Blanc');


-- 3. T-shirt Coton Bio (Mode)
INSERT INTO products (id, name, slug, category, categorylabel, price, stock, description, description_courte, thumbnail, caracteristiques, views, created_at, updated_at)
VALUES (3, 'T-shirt Basique Bio', 't-shirt-basique-bio', 'fashion', 'Mode', 29.99, 200, 
'Un incontournable de votre garde-robe. Fabriqué à 100% en coton biologique certifié, doux pour la peau et pour la planète. Coupe moderne et ajustée.',
'T-shirt 100% coton bio coupe ajustée',
'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
'{"Matière": "100% Coton Bio", "Entretien": "Lavage 30°C"}',
230, NOW(), NOW());

INSERT INTO product_images (product_id, image_url) VALUES
(3, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop'),
(3, 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop');

INSERT INTO product_sizes (product_id, size) VALUES (3, 'S'), (3, 'M'), (3, 'L'), (3, 'XL');
INSERT INTO product_colors (product_id, color) VALUES (3, 'Blanc'), (3, 'Noir'), (3, 'Gris'), (3, 'Bleu Marine');


-- 4. Sneakers Urban Run (Mode)
INSERT INTO products (id, name, slug, category, categorylabel, price, stock, description, description_courte, thumbnail, caracteristiques, views, created_at, updated_at)
VALUES (4, 'Sneakers Urban Run', 'sneakers-urban-run', 'fashion', 'Mode', 89.99, 75, 
'Alliez style et confort avec ces sneakers urbaines. Semelle amortissante et design respirant pour vos journées actives.',
'Baskets confortables pour le quotidien',
'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
'{"Semelle": "Caoutchouc", "Dessus": "Tissu respirant"}',
150, NOW(), NOW());

INSERT INTO product_images (product_id, image_url) VALUES
(4, 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop'),
(4, 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop');

INSERT INTO product_sizes (product_id, size) VALUES (4, '38'), (4, '39'), (4, '40'), (4, '41'), (4, '42'), (4, '43');
INSERT INTO product_colors (product_id, color) VALUES (4, 'Rouge'), (4, 'Noir');


-- 5. Canapé Moderne 3 Places (Maison)
INSERT INTO products (id, name, slug, category, categorylabel, price, stock, description, description_courte, thumbnail, caracteristiques, views, created_at, updated_at)
VALUES (5, 'Canapé Moderne 3 Places', 'canape-moderne-3-places', 'home', 'Maison', 799.00, 10, 
'Design scandinave épuré. Tissu résistant et mousse haute densité pour un confort durable. Pieds en chêne massif.',
'Canapé style scandinave 3 places',
'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
'{"Dimensions": "200x90x85cm", "Matière": "Tissu & Bois"}',
45, NOW(), NOW());

INSERT INTO product_images (product_id, image_url) VALUES
(5, 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=800&auto=format&fit=crop'),
(5, 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop');

INSERT INTO product_colors (product_id, color) VALUES (5, 'Gris Clair'), (5, 'Bleu Canard'), (5, 'Beige');


-- 6. Montre Connectée FitWatch (Electronics)
INSERT INTO products (id, name, slug, category, categorylabel, price, stock, description, description_courte, thumbnail, caracteristiques, views, created_at, updated_at)
VALUES (6, 'Montre Connectée FitWatch', 'montre-connectee-fitwatch', 'electronics', 'Électronique', 149.50, 60, 
'Suivez votre santé et vos performances sportives. Fréquence cardiaque, sommeil, GPS intégré et notifications smartphone.',
'Montre sport avec GPS et suivi santé',
'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop',
'{"Autonomie": "7 jours", "Étanchéité": "5ATM"}',
90, NOW(), NOW());

INSERT INTO product_images (product_id, image_url) VALUES
(6, 'https://images.unsplash.com/photo-1579613832125-5d34a13dfe09?q=80&w=800&auto=format&fit=crop');

INSERT INTO product_colors (product_id, color) VALUES (6, 'Noir'), (6, 'Rose Gold');


-- 7. Vase Céramique Artisanale (Maison)
INSERT INTO products (id, name, slug, category, categorylabel, price, stock, description, description_courte, thumbnail, caracteristiques, views, created_at, updated_at)
VALUES (7, 'Vase Céramique Minimaliste', 'vase-ceramique-minimaliste', 'home', 'Maison', 45.00, 30, 
'Pièce unique faite à la main. Design minimaliste qui s''intègre à tous les intérieurs. Finition mate.',
'Vase artisanal en céramique',
'https://images.unsplash.com/photo-1581783342308-f792ca11df53?q=80&w=800&auto=format&fit=crop',
'{"Hauteur": "25cm", "Matériau": "Céramique"}',
60, NOW(), NOW());

INSERT INTO product_images (product_id, image_url) VALUES
(7, 'https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?q=80&w=800&auto=format&fit=crop');

INSERT INTO product_colors (product_id, color) VALUES (7, 'Blanc'), (7, 'Terracotta');


-- Réinitialiser la séquence pour éviter les conflits lors des futurs ajouts
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
