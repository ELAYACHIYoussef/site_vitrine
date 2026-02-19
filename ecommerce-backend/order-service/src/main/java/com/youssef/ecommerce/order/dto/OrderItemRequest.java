package com.youssef.ecommerce.order.dto;

import lombok.Data;

@Data
public class OrderItemRequest {
    private String productId;
    private Integer quantity;
}
