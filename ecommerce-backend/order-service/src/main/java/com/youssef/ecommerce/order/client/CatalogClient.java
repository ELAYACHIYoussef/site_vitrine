package com.youssef.ecommerce.order.client;

import com.youssef.ecommerce.order.dto.ProductResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "catalog-service")
public interface CatalogClient {

    @GetMapping("/api/catalog/products/{id}")
    ProductResponse getProductById(@PathVariable("id") String id);

    @GetMapping("/api/catalog/products/exists/{id}")
    boolean existsById(@PathVariable("id") String id);

    // Future: Method to reduce stock
    // @PutMapping("/api/products/reduce-stock")
    // void reduceStock(@RequestParam String productId, @RequestParam Integer
    // quantity);
}
