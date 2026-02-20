package com.youssef.ecommerce.order.service;

import com.youssef.ecommerce.order.client.CatalogClient;
import com.youssef.ecommerce.order.dto.OrderItemRequest;
import com.youssef.ecommerce.order.dto.OrderRequest;
import com.youssef.ecommerce.order.dto.ProductResponse;
import com.youssef.ecommerce.order.model.Order;
import com.youssef.ecommerce.order.model.OrderItem;
import com.youssef.ecommerce.order.model.OrderStatus;
import com.youssef.ecommerce.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final CatalogClient catalogClient;

    public Order createOrder(OrderRequest orderRequest, Long userId) {
        log.info("Creating order for user: {}", userId);

        Order order = new Order();
        order.setUserId(userId);
        order.setStatus(OrderStatus.PENDING);
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setBillingAddress(orderRequest.getBillingAddress());
        order.setOrderNumber(UUID.randomUUID().toString());

        List<OrderItem> orderItems = orderRequest.getItems().stream()
                .map(itemRequest -> {
                    // 1. Fetch product details from Catalog Service
                    ProductResponse product = null;
                    try {
                        product = catalogClient.getProductById(itemRequest.getProductId());
                    } catch (Exception e) {
                        log.error("Error fetching product: {}", itemRequest.getProductId(), e);
                        throw new RuntimeException(
                                "Product not found or Catalog Service unavailable: " + itemRequest.getProductId());
                    }

                    if (product == null) {
                        throw new RuntimeException("Product not found: " + itemRequest.getProductId());
                    }

                    // 2. Create OrderItem
                    return OrderItem.builder()
                            .productId(product.getId())
                            .productName(product.getName())
                            .productThumbnail(product.getThumbnail())
                            .quantity(itemRequest.getQuantity())
                            .price(product.getPrice())
                            .order(order)
                            .build();
                })
                .collect(Collectors.toList());

        order.setOrderItems(orderItems);

        // 3. Calculate Total
        BigDecimal totalAmount = orderItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setTotalAmount(totalAmount);

        // 4. Save Order
        return orderRepository.save(order);
    }

    public List<Order> getMyOrders(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(UUID id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(UUID id, String status) {
        Order order = getOrderById(id);
        try {
            order.setStatus(OrderStatus.valueOf(status));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid order status: " + status);
        }
        return orderRepository.save(order);
    }
}
