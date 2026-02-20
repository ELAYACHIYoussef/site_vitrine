
package com.youssef.ecommerce.order;

import com.youssef.ecommerce.order.model.Order;
import com.youssef.ecommerce.order.model.OrderStatus;
import com.youssef.ecommerce.order.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.UUID;

@SpringBootTest
@ActiveProfiles("test")
public class SmokeTest {

    @Autowired
    private OrderRepository orderRepository;

    @Test
    public void testStatusUpdate() {
        System.out.println("Starting Smoke Test...");
        try {
            Order order = new Order();
            order.setUserId(1L);
            order.setStatus(OrderStatus.PENDING);
            order.setTotalAmount(BigDecimal.TEN);
            order = orderRepository.save(order);
            System.out.println("Saved order: " + order.getId());

            order.setStatus(OrderStatus.PAID);
            orderRepository.save(order);
            System.out.println("Updated order status to CONFIRMED");
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
