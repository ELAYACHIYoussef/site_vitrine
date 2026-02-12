package com.youssef.ecommerce.catalog.service;

import com.youssef.ecommerce.catalog.model.Product;
import com.youssef.ecommerce.catalog.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ImageService imageService;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public void incrementViews(Long id) {
        productRepository.findById(id).ifPresent(p -> {
            p.setViews(p.getViews() + 1);
            productRepository.save(p);
        });
    }

    /**
     * Create product with images
     */
    public Product createProductWithImages(
            String name, String category, String categoryLabel,
            Double price, Integer stock, String description,
            String descriptionCourte, List<org.springframework.web.multipart.MultipartFile> images)
            throws java.io.IOException {

        // Save images and get URLs
        List<String> imageUrls = imageService.saveImages(images);

        // Create slug from name
        String slug = name.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "")
                .replaceAll("\\s+", "-");

        // Build product
        Product product = Product.builder()
                .name(name)
                .slug(slug)
                .category(category)
                .categoryLabel(categoryLabel)
                .price(price)
                .stock(stock)
                .description(description)
                .descriptionCourte(descriptionCourte)
                .thumbnail(!imageUrls.isEmpty() ? imageUrls.get(0) : null)
                .images(imageUrls)
                .build();

        return productRepository.save(product);
    }

    /**
     * Update product with images
     */
    public Product updateProductWithImages(
            Long id, String name, String category, String categoryLabel,
            Double price, Integer stock, String description,
            String descriptionCourte, List<org.springframework.web.multipart.MultipartFile> images)
            throws java.io.IOException {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // Update fields if provided
        if (name != null) {
            product.setName(name);
            product.setSlug(name.toLowerCase()
                    .replaceAll("[^a-z0-9\\s-]", "")
                    .replaceAll("\\s+", "-"));
        }
        if (category != null)
            product.setCategory(category);
        if (categoryLabel != null)
            product.setCategoryLabel(categoryLabel);
        if (price != null)
            product.setPrice(price);
        if (stock != null)
            product.setStock(stock);
        if (description != null)
            product.setDescription(description);
        if (descriptionCourte != null)
            product.setDescriptionCourte(descriptionCourte);

        // Add new images if provided
        if (images != null && !images.isEmpty()) {
            List<String> newImageUrls = imageService.saveImages(images);
            product.getImages().addAll(newImageUrls);

            // Update thumbnail if it was empty
            if (product.getThumbnail() == null && !newImageUrls.isEmpty()) {
                product.setThumbnail(newImageUrls.get(0));
            }
        }

        return productRepository.save(product);
    }
}
