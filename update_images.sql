-- Script de mise à jour des images produits
-- A exécuter dans PostgreSQL (Database: ecommerce_catalog)

UPDATE products SET thumbnail = '/products/product_' || id || '.jpg' WHERE id BETWEEN 1 AND 60;
