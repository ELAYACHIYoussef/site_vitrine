package com.youssef.ecommerce.catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private String name;
    private String category;
    private String categoryLabel;
    private Double price;
    private Integer stock;
    private String description;
    private String descriptionCourte;
    private String thumbnail;
    private List<String> images;
    private List<String> sizes;
    private List<String> colors;
    private String caracteristiques;
}
