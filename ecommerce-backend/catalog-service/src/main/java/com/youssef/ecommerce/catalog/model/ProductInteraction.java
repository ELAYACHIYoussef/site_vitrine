package com.youssef.ecommerce.catalog.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "product_interactions")
public class ProductInteraction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // VIEW, LIKE
    
    private Long productId;
    
    private String productName;
    
    private Long userId; // Optional, can be null for guests

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    @CreationTimestamp
    private LocalDateTime timestamp;

    public ProductInteraction() {}

    public ProductInteraction(Long id, String type, Long productId, String productName, Long userId, LocalDateTime timestamp) {
        this.id = id;
        this.type = type;
        this.productId = productId;
        this.productName = productName;
        this.userId = userId;
        this.timestamp = timestamp;
    }

    public static ProductInteractionBuilder builder() {
        return new ProductInteractionBuilder();
    }

    public static class ProductInteractionBuilder {
        private Long id;
        private String type;
        private Long productId;
        private String productName;
        private Long userId;
        private LocalDateTime timestamp;

        public ProductInteractionBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ProductInteractionBuilder type(String type) {
            this.type = type;
            return this;
        }

        public ProductInteractionBuilder productId(Long productId) {
            this.productId = productId;
            return this;
        }

        public ProductInteractionBuilder productName(String productName) {
            this.productName = productName;
            return this;
        }

        public ProductInteractionBuilder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public ProductInteractionBuilder timestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public ProductInteraction build() {
            return new ProductInteraction(id, type, productId, productName, userId, timestamp);
        }
    }
}
