package com.youssef.ecommerce.order.service;

import com.youssef.ecommerce.order.dto.OrderItemRequest;
import com.youssef.ecommerce.order.dto.OrderRequest;
import com.youssef.ecommerce.order.model.Order;
import com.youssef.ecommerce.order.model.OrderItem;
import com.youssef.ecommerce.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final org.springframework.web.client.RestTemplate restTemplate;

    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = Order.builder()
                .userId(request.getUserId())
                .customerName(request.getCustomerName())
                .customerEmail(request.getCustomerEmail())
                .shippingAddress(request.getShippingAddress())
                .status(Order.OrderStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .build();

        List<OrderItem> items = request.getItems().stream()
                .map(itemRequest -> OrderItem.builder()
                        .order(order)
                        .productId(itemRequest.getProductId())
                        .productName(itemRequest.getProductName())
                        .price(itemRequest.getPrice())
                        .quantity(itemRequest.getQuantity())
                        .build())
                .collect(Collectors.toList());

        order.setItems(items);

        // Calculate total amount
        double total = items.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);

        // Reduce stock in Catalog Service
        try {
            items.forEach(item -> {
                String url = "http://catalog-service/api/catalog/products/" + item.getProductId()
                        + "/reduce-stock?quantity=" + item.getQuantity();
                restTemplate.postForEntity(url, null, Void.class);
            });
        } catch (Exception e) {
            // In a real system, we might want to rollback or queue this
            System.err.println("Failed to update stock: " + e.getMessage());
        }

        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order updateStatus(Long id, String status) {
        Order order = getOrderById(id);
        order.setStatus(Order.OrderStatus.valueOf(status));
        return orderRepository.save(order);
    }
}
