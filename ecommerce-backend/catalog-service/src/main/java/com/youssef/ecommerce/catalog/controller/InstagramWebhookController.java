package com.youssef.ecommerce.catalog.controller;

import com.youssef.ecommerce.catalog.model.ProductInteraction;
import com.youssef.ecommerce.catalog.repository.ProductInteractionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/webhooks/instagram")
@Slf4j
@RequiredArgsConstructor
public class InstagramWebhookController {

    @Value("${instagram.webhook.verify-token:azymarket-verify-token}")
    private String verifyToken;

    private final ProductInteractionRepository interactionRepository;

    @GetMapping
    public ResponseEntity<String> verifyWebhook(
            @RequestParam("hub.mode") String mode,
            @RequestParam("hub.verify_token") String token,
            @RequestParam("hub.challenge") String challenge) {
        
        if ("subscribe".equals(mode) && verifyToken.equals(token)) {
            log.info("Instagram Webhook Verified");
            return ResponseEntity.ok(challenge);
        } else {
            return ResponseEntity.status(403).build();
        }
    }

    @PostMapping
    public ResponseEntity<Void> handleWebhook(@RequestBody Map<String, Object> payload) {
        log.info("Received Instagram Webhook: {}", payload);
        
        // TODO: Parse payload to extract Media ID and Like/Comment info
        // "entry": [ { "changes": [ { "field": "comments", "value": ... } ] } ]
        // Then find Product by matching Instagram Media ID (needs a new column in Product)
        
        return ResponseEntity.ok().build();
    }
}
