package com.youssef.ecommerce.order.controller;

import com.youssef.ecommerce.order.dto.OrderRequest;
import com.youssef.ecommerce.order.model.Order;
import com.youssef.ecommerce.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest,
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader) {
        // 1. Prefer ID passed in body (from Frontend)
        Long userId = orderRequest.getUserId();

        // 2. Fallback to Header (from Gateway if configured later)
        if (userId == null && userIdHeader != null && !userIdHeader.isEmpty()) {
            try {
                userId = Long.parseLong(userIdHeader);
            } catch (NumberFormatException e) {
                // ignore
            }
        }

        // 3. Fallback to default (for dev/test) if nothing found
        if (userId == null) {
            userId = 1L;
        }

        return ResponseEntity.ok(orderService.createOrder(orderRequest, userId));
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<Order>> getMyOrders(
            @RequestHeader(value = "X-User-Id", required = false) String userIdHeader) {
        Long userId = 1L;
        if (userIdHeader != null) {
            try {
                userId = Long.parseLong(userIdHeader);
            } catch (NumberFormatException e) {
                // ignore
            }
        }
        return ResponseEntity.ok(orderService.getMyOrders(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable UUID id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getMyOrders(userId));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
