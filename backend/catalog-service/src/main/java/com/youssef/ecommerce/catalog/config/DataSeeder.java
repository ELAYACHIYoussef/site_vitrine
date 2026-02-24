package com.youssef.ecommerce.catalog.config;

import com.youssef.ecommerce.catalog.model.Category;
import com.youssef.ecommerce.catalog.model.Product;
import com.youssef.ecommerce.catalog.repository.CategoryRepository;
import com.youssef.ecommerce.catalog.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

        private final CategoryRepository categoryRepository;
        private final ProductRepository productRepository;

        @Override
        public void run(String... args) throws Exception {
                seedCategories();
                seedProducts();
        }

        private void seedCategories() {
                if (categoryRepository.count() == 0) {
                        List<Category> categories = new ArrayList<>();

                        categories.add(Category.builder()
                                        .name("electronics")
                                        .label("Électronique")
                                        .description("Gadgets, téléphones, ordinateurs et plus.")
                                        .icon("Smartphone")
                                        .build());

                        categories.add(Category.builder()
                                        .name("fashion")
                                        .label("Mode")
                                        .description("Vêtements, chaussures et accessoires.")
                                        .icon("Shirt")
                                        .build());

                        categories.add(Category.builder()
                                        .name("home")
                                        .label("Maison")
                                        .description("Décoration, meubles et jardin.")
                                        .icon("Home")
                                        .build());

                        categories.add(Category.builder()
                                        .name("sports")
                                        .label("Sports")
                                        .description("Équipements sportifs et vêtements.")
                                        .icon("Activity")
                                        .build());

                        categories.add(Category.builder()
                                        .name("beauty")
                                        .label("Beauté")
                                        .description("Maquillage, soins et santé.")
                                        .icon("Heart")
                                        .build());

                        categories.add(Category.builder()
                                        .name("automotive")
                                        .label("Automobile")
                                        .description("Accessoires et pièces détachées.")
                                        .icon("Car")
                                        .build());

                        categoryRepository.saveAll(categories);
                        System.out.println("Categories seeded successfully.");
                }
        }

        private void seedProducts() {
                if (productRepository.count() == 0) {
                        List<Product> products = new ArrayList<>();

                        // Electronics: Phone
                        List<String> phoneImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1556656793-0275ccb990cd?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1533228124798-ad2332616bd5?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1580910051074-3eb6948d3c90?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("Smartphone X Pro", "smartphone-x-pro", "electronics",
                                        "Électronique", 999.00, "Un smartphone ultra puissant pour les pros.",
                                        phoneImages));

                        // Electronics: Headphones
                        List<String> headphoneImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1556656793-0275ccb990cd?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1524678606372-571d755b8d5a?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("Casque Audio Sans Fil", "wireless-headphones", "electronics",
                                        "Électronique", 199.00, "Son immersif et réduction de bruit active.",
                                        headphoneImages));

                        // Fashion: Tshirt
                        List<String> tshirtImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1521572008054-d62e33d0e746?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("T-shirt Coton Bio", "organic-tshirt", "fashion", "Mode", 29.99,
                                        "Confortable et écologique.", tshirtImages));

                        // Fashion: Sneakers
                        List<String> sneakersImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("Sneakers Urbaines", "urban-sneakers", "fashion", "Mode", 89.99,
                                        "Style moderne pour la ville.", sneakersImages));

                        // Home: Sofa
                        List<String> sofaImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1550226891-ef816aed4a98?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1616627547584-bf28cee262db?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("Canapé 3 Places", "sofa-3-seater", "home", "Maison", 499.00,
                                        "Confort maximal pour votre salon.", sofaImages));

                        // Home: Lamp
                        List<String> lampImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1507473883581-209633381638?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1513506003013-d534d82a3965?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1596443686812-2f45229eeb36?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1510613426831-7b19280d4db0?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("Lampe de Bureau LED", "led-desk-lamp", "home", "Maison", 39.99,
                                        "Éclairage ajustable et économique.", lampImages));

                        // Sports: Yoga Mat
                        List<String> yogaImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1575052814088-613568d90291?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("Tapis de Yoga", "yoga-mat", "sports", "Sports", 25.00,
                                        "Antidérapant et durable.", yogaImages));

                        // Sports: Dumbbells
                        List<String> dumbbellsImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1574680096141-1cddd32e38e1?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("Haltères 5kg", "dumbbells-5kg", "sports", "Sports", 40.00,
                                        "Pour vos exercices de musculation.", dumbbellsImages));

                        // Beauty: Moisturizer
                        List<String> beautyImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1570194065650-d99fb4b8ccb0?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1556228578-8d893d298717?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("Crème Hydratante Bio", "organic-moisturizer", "beauty", "Beauté",
                                        35.00, "Pour une peau douce et nourrie.", beautyImages));

                        // Beauty: Perfume
                        List<String> perfumeImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1594035910387-fea4779426e9?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1616949755610-8c9ad0e2709d?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("Parfum Floral", "floral-perfume", "beauty", "Beauté", 75.00,
                                        "Une fragrance délicate et longue durée.", perfumeImages));

                        // Automotive: Phone Holder
                        List<String> carImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("Support Téléphone Voiture", "car-phone-holder", "automotive",
                                        "Automobile", 15.99, "Universel et facile à installer.", carImages));

                        // Automotive: Vacuum
                        List<String> vacuumImages = Arrays.asList(
                                        "https://images.unsplash.com/photo-1585338107529-13f953b6f29f?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1558317374-a35c202f4366?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
                                        "https://images.unsplash.com/photo-1549488344-c705018e83be?auto=format&fit=crop&w=800&q=80");
                        products.add(createProduct("Aspirateur Voiture Portable", "car-vacuum", "automotive",
                                        "Automobile", 45.99, "Puissant et compact.", vacuumImages));

                        productRepository.saveAll(products);
                        System.out.println("Products seeded successfully.");
                }
        }

        private Product createProduct(String name, String slug, String category, String categoryLabel, Double price,
                        String shortDesc, List<String> images) {
                return Product.builder()
                                .name(name)
                                .slug(slug)
                                .category(category)
                                .categoryLabel(categoryLabel)
                                .price(price)
                                .stock(50)
                                .description("Description détaillée du produit " + name
                                                + ". Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
                                .descriptionCourte(shortDesc)
                                .thumbnail(images.get(0))
                                .images(new ArrayList<>(images)) // Copy list
                                .sizes(Arrays.asList("S", "M", "L", "XL"))
                                .colors(Arrays.asList("Rouge", "Bleu", "Noir"))
                                .views(0)
                                .build();
        }
}
