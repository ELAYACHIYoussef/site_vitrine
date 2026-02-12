package com.youssef.ecommerce.catalog.repository;

import com.youssef.ecommerce.catalog.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
}
