package com.youssef.ecommerce.catalog.controller;

import com.youssef.ecommerce.catalog.model.Product;
import com.youssef.ecommerce.catalog.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/catalog")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/products")
    public List<Map<String, Object>> getAllProducts() {
        return productService.getAllProducts().stream()
                .map(this::toMap)
                .collect(Collectors.toList());
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") Long id) {
        return productService.getProductById(id)
                .map(product -> ResponseEntity.ok((Object) toMap(product)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(value = "/products", consumes = "multipart/form-data")
    public ResponseEntity<?> addProductWithImages(
            @RequestParam("name") String name,
            @RequestParam("category") String category,
            @RequestParam(value = "categoryLabel", required = false) String categoryLabel,
            @RequestParam("price") Double price,
            @RequestParam(value = "stock", defaultValue = "0") Integer stock,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "descriptionCourte", required = false) String descriptionCourte,
            @RequestParam(value = "images", required = false) List<org.springframework.web.multipart.MultipartFile> images) {
        try {
            Product product = productService.createProductWithImages(
                    name, category, categoryLabel, price, stock,
                    description, descriptionCourte, images);
            return ResponseEntity.ok(toMap(product));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value = "/products/{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> updateProductWithImages(
            @PathVariable("id") Long id,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "categoryLabel", required = false) String categoryLabel,
            @RequestParam(value = "price", required = false) Double price,
            @RequestParam(value = "stock", required = false) Integer stock,
            @RequestParam(value = "description", required = false) String description,
            @RequestParam(value = "descriptionCourte", required = false) String descriptionCourte,
            @RequestParam(value = "images", required = false) List<org.springframework.web.multipart.MultipartFile> images) {
        try {
            Product product = productService.updateProductWithImages(
                    id, name, category, categoryLabel, price, stock,
                    description, descriptionCourte, images);
            return ResponseEntity.ok(toMap(product));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/products/{id}/view")
    public ResponseEntity<?> incrementView(@PathVariable("id") Long id) {
        productService.incrementViews(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }

    /**
     * Convert Product entity to a plain Map to avoid Jackson/Hibernate
     * serialization issues
     */
    private Map<String, Object> toMap(Product product) {
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("id", product.getId());
        map.put("name", product.getName());
        map.put("slug", product.getSlug());
        map.put("category", product.getCategory());
        map.put("categoryLabel", product.getCategoryLabel());
        map.put("price", product.getPrice());
        map.put("stock", product.getStock());
        map.put("description", product.getDescription());
        map.put("descriptionCourte", product.getDescriptionCourte());
        map.put("thumbnail", product.getThumbnail());
        map.put("images", product.getImages() != null ? new ArrayList<>(product.getImages()) : new ArrayList<>());
        map.put("caracteristiques", product.getCaracteristiques());
        map.put("views", product.getViews());
        map.put("createdAt", product.getCreatedAt());
        map.put("updatedAt", product.getUpdatedAt());
        return map;
    }
}
