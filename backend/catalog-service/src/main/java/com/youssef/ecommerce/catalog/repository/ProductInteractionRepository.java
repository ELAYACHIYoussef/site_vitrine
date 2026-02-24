package com.youssef.ecommerce.catalog.repository;

import com.youssef.ecommerce.catalog.model.ProductInteraction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductInteractionRepository extends JpaRepository<ProductInteraction, Long> {
    List<ProductInteraction> findTop50ByOrderByTimestampDesc();
}
