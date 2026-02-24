-- Supprimer les doublons de test identifiés (ID 17 et 18)
DELETE FROM product_engagement WHERE product_id IN (17, 18);
DELETE FROM product_images WHERE product_id IN (17, 18);
DELETE FROM product_colors WHERE product_id IN (17, 18);
DELETE FROM product_sizes WHERE product_id IN (17, 18);
DELETE FROM products WHERE id IN (17, 18);

-- Vérifier le nombre de produits restants
SELECT COUNT(*) FROM products;
