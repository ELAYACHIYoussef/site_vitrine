package com.youssef.ecommerce.order.dto;

import lombok.Data;
import java.util.List;

@Data
public class OrderRequest {
    private Long userId;
    private List<OrderItemRequest> items;
    private String shippingAddress;
    private String billingAddress;
}
