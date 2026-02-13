package com.youssef.ecommerce.order.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private Long userId;
    private String customerName;
    private String customerEmail;
    private String shippingAddress;
    private List<OrderItemRequest> items;
}
