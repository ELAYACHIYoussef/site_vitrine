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
    private final InstagramService instagramService;

    public List<Product> getAllProducts() {
        return productRepository.findAllWithImages();
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findByIdWithImages(id);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productRepository.findById(id).ifPresent(p -> {
            instagramService.deleteProductFromInstagram(p.getInstagramMediaId());
            productRepository.deleteById(id);
        });
    }

    public void incrementViews(Long id) {
        productRepository.findById(id).ifPresent(p -> {
            p.setViews(p.getViews() + 1);
            productRepository.save(p);
        });
    }

    public void incrementLikes(Long id) {
        productRepository.findById(id).ifPresent(p -> {
            p.setLikes(p.getLikes() + 1);
            productRepository.save(p);
        });
    }

    /**
     * Create product with images
     */
    public Product createProductWithImages(
            String name, String category, String categoryLabel,
            Double price, Integer stock, String description,
            String descriptionCourte, List<org.springframework.web.multipart.MultipartFile> images,
            List<String> sizes, List<String> colors)
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
                .sizes(sizes)
                .colors(colors)
                .build();

        Product savedProduct = productRepository.save(product);
        
        // Post to Instagram asynchronously (or synchronously for now)
        try {
            instagramService.postProductToInstagram(savedProduct);
            // If we got an ID back, we would save it here:
            // savedProduct.setInstagramMediaId(id);
            // productRepository.save(savedProduct);
        } catch (Exception e) {
            // Don't fail product creation if Instagram fails
            System.err.println("Failed to sync with Instagram: " + e.getMessage());
        }
        
        return savedProduct;
    }

    /**
     * Update product with images
     */
    public Product updateProductWithImages(
            Long id, String name, String category, String categoryLabel,
            Double price, Integer stock, String description,
            String descriptionCourte, List<org.springframework.web.multipart.MultipartFile> images,
            List<String> sizes, List<String> colors)
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
        if (sizes != null)
            product.setSizes(sizes);
        if (colors != null)
            product.setColors(colors);

        // Add new images if provided
        if (images != null && !images.isEmpty()) {
            List<String> newImageUrls = imageService.saveImages(images);
            product.getImages().addAll(newImageUrls);

            // Update thumbnail if it was empty
            if (product.getThumbnail() == null && !newImageUrls.isEmpty()) {
                product.setThumbnail(newImageUrls.get(0));
            }
        }

        Product savedAndUpdate = productRepository.save(product);
        try {
            instagramService.updateProductOnInstagram(savedAndUpdate);
        } catch (Exception e) {
             System.err.println("Failed to update Instagram: " + e.getMessage());
        }
        return savedAndUpdate;
    }

    // Stats methods
    public long getTotalStock() {
        return productRepository.sumTotalStock();
    }

    public double getCatalogValue() {
        return productRepository.sumCatalogValue();
    }

    public java.util.Map<String, Long> getProductsByCategory() {
        java.util.Map<String, Long> map = new java.util.LinkedHashMap<>();
        for (Object[] row : productRepository.countByCategory()) {
            map.put((String) row[0], (Long) row[1]);
        }
        return map;
    }

    public java.util.List<Product> getTopViewedProducts() {
        return productRepository.findTop5ByOrderByViewsDesc();
    }

    public java.util.List<Product> getRecentProducts() {
        return productRepository.findTop5ByOrderByIdDesc();
    }

    public long getTotalViews() {
        return productRepository.sumTotalViews();
    }

    @org.springframework.transaction.annotation.Transactional
    public boolean decreaseStock(Long productId, Integer quantity) {
        int updatedRows = productRepository.decreaseStock(productId, quantity);
        return updatedRows > 0;
    }
}
