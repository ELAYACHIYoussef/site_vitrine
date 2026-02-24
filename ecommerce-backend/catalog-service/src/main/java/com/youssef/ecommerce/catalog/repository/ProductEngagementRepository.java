package com.youssef.ecommerce.catalog.repository;

import com.youssef.ecommerce.catalog.model.ProductEngagement;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProductEngagementRepository extends JpaRepository<ProductEngagement, Long> {
    Optional<ProductEngagement> findByProductId(Long productId);
}
