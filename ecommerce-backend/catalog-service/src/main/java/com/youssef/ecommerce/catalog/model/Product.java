package com.youssef.ecommerce.catalog.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String slug;
    private String category;

    @Column(name = "categorylabel")
    private String categoryLabel;

    private Double price;

    @lombok.Builder.Default
    private Integer stock = 0;

    @Column(length = 2000)
    private String description; // Full description for admin

    @Column(name = "description_courte")
    private String descriptionCourte;

    private String thumbnail;

    // List of image URLs (up to 6)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_images", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "image_url")
    @lombok.Builder.Default
    private java.util.List<String> images = new java.util.ArrayList<>();

    @Column(columnDefinition = "TEXT")
    private String caracteristiques; // Store as JSON string

    @lombok.Builder.Default
    private Integer views = 0;

    @Column(name = "created_at")
    private java.time.LocalDateTime createdAt;

    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
        updatedAt = java.time.LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = java.time.LocalDateTime.now();
    }
}
