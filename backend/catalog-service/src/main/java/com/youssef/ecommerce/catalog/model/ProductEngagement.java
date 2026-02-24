package com.youssef.ecommerce.catalog.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_engagement")
public class ProductEngagement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;

    private Integer instagramLikes = 0;
    private Integer instagramComments = 0;
    private Integer instagramShares = 0;
    
    @Column(name = "last_synced_at")
    private LocalDateTime lastSyncedAt;

    public ProductEngagement() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Integer getInstagramLikes() { return instagramLikes; }
    public void setInstagramLikes(Integer instagramLikes) { this.instagramLikes = instagramLikes; }

    public Integer getInstagramComments() { return instagramComments; }
    public void setInstagramComments(Integer instagramComments) { this.instagramComments = instagramComments; }

    public Integer getInstagramShares() { return instagramShares; }
    public void setInstagramShares(Integer instagramShares) { this.instagramShares = instagramShares; }

    public LocalDateTime getLastSyncedAt() { return lastSyncedAt; }
    public void setLastSyncedAt(LocalDateTime lastSyncedAt) { this.lastSyncedAt = lastSyncedAt; }
}
