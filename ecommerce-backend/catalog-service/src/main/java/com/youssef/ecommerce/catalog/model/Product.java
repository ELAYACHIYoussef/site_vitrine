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
    
    @Column(name = "description_courte")
    private String descriptionCourte;
    
    private String thumbnail;
    
    @Column(columnDefinition = "TEXT")
    private String images; // Store as JSON string as per existing project or use List<String> with converter
    
    @Column(columnDefinition = "TEXT")
    private String caracteristiques; // Store as JSON string
    
    private Integer views = 0;
}
