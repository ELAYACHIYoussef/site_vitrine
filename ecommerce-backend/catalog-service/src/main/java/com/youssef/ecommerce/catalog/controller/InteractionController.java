package com.youssef.ecommerce.catalog.controller;

import com.youssef.ecommerce.catalog.model.Product;
import com.youssef.ecommerce.catalog.model.ProductInteraction;
import com.youssef.ecommerce.catalog.repository.ProductInteractionRepository;
import com.youssef.ecommerce.catalog.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/catalog/interactions")
@RequiredArgsConstructor
public class InteractionController {

    private final ProductInteractionRepository interactionRepository;
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<?> logInteraction(@RequestBody Map<String, Object> payload) {
        String type = (String) payload.get("type");
        Long productId = ((Number) payload.get("productId")).longValue();
        Long userId = payload.containsKey("userId") ? ((Number) payload.get("userId")).longValue() : null;

        // Get product name for easier reading in logs
        String productName = productService.getProductById(productId)
                .map(Product::getName)
                .orElse("Unknown Product");

        interactionRepository.save(ProductInteraction.builder()
                .type(type)
                .productId(productId)
                .productName(productName)
                .userId(userId)
                .build());

        // Increment likes on product entity for direct display
        if ("LIKE".equals(type) || "INSTAGRAM_LIKE".equals(type)) {
            productService.incrementLikes(productId);
        }

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<ProductInteraction>> getRecentInteractions() {
        return ResponseEntity.ok(interactionRepository.findTop50ByOrderByTimestampDesc());
    }
}
