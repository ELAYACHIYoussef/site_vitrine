package com.youssef.ecommerce.catalog.repository;

import com.youssef.ecommerce.catalog.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);

    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.images WHERE p.id = :id")
    Optional<Product> findByIdWithImages(@Param("id") Long id);

    @Query("SELECT DISTINCT p FROM Product p LEFT JOIN FETCH p.images")
    List<Product> findAllWithImages();

    // Stats queries
    @Query("SELECT COALESCE(SUM(p.stock), 0) FROM Product p")
    long sumTotalStock();

    @Query("SELECT COALESCE(SUM(p.price * p.stock), 0) FROM Product p")
    double sumCatalogValue();

    @Query("SELECT p.category, COUNT(p) FROM Product p GROUP BY p.category")
    List<Object[]> countByCategory();

    List<Product> findTop5ByOrderByViewsDesc();

    List<Product> findTop5ByOrderByIdDesc();

    @org.springframework.data.jpa.repository.Modifying
    @Query("UPDATE Product p SET p.stock = p.stock - :quantity WHERE p.id = :id AND p.stock >= :quantity")
    int decreaseStock(@Param("id") Long id, @Param("quantity") int quantity);

    @Query("SELECT COALESCE(SUM(p.views), 0) FROM Product p")
    long sumTotalViews();
}
