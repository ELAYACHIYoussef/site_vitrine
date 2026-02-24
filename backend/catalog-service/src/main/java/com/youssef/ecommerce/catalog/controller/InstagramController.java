package com.youssef.ecommerce.catalog.controller;

import com.youssef.ecommerce.catalog.service.GlobalConfigService;
import com.youssef.ecommerce.catalog.service.InstagramService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/catalog/instagram")
@Slf4j
@RequiredArgsConstructor
public class InstagramController {

    private final GlobalConfigService globalConfigService;
    private final InstagramService instagramService;

    /**
     * GET /api/catalog/instagram/status
     * Returns the current Instagram connection status and simulated stats.
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, String> config = globalConfigService.getAllConfigs();
        boolean connected = "true".equals(config.getOrDefault("INSTAGRAM_CONNECTED", "false"));
        String username = config.getOrDefault("INSTAGRAM_USERNAME", "@azyymarket");

        Map<String, Object> status = new java.util.HashMap<>();
        status.put("connected", connected);
        status.put("username", username);

        if (connected) {
            // Return simulated/real stats
            Map<String, Object> stats = instagramService.getInstagramStats();
            status.putAll(stats);
        }
        return ResponseEntity.ok(status);
    }

    /**
     * POST /api/catalog/instagram/connect
     * Simulates connecting an Instagram account.
     * Body: { "username": "@my_store" }
     */
    @PostMapping("/connect")
    public ResponseEntity<Map<String, Object>> connect(@RequestBody Map<String, String> body) {
        String username = body.getOrDefault("username", "@azyymarket");
        log.info("[INSTAGRAM SYNC] Simulating connection for account: {}", username);

        globalConfigService.updateConfigs(Map.of(
            "INSTAGRAM_CONNECTED", "true",
            "INSTAGRAM_USERNAME", username,
            "instagram", "https://www.instagram.com/" + username.replace("@", "")
        ));

        return ResponseEntity.ok(Map.of(
            "connected", true,
            "username", username,
            "message", "Compte Instagram connecté avec succès (simulé)",
            "followers", 1284,
            "following", 47,
            "posts", 15
        ));
    }

    /**
     * POST /api/catalog/instagram/disconnect
     * Simulates disconnecting an Instagram account.
     */
    @PostMapping("/disconnect")
    public ResponseEntity<Map<String, Object>> disconnect() {
        log.info("[INSTAGRAM SYNC] Simulating disconnection.");
        globalConfigService.updateConfigs(Map.of(
            "INSTAGRAM_CONNECTED", "false",
            "INSTAGRAM_USERNAME", ""
        ));
        return ResponseEntity.ok(Map.of(
            "connected", false,
            "message", "Compte Instagram déconnecté"
        ));
    }

    /**
     * POST /api/catalog/instagram/sync-product/{id}
     * Simulates syncing a specific product to Instagram.
     */
    @PostMapping("/sync-product/{id}")
    public ResponseEntity<Map<String, Object>> syncProduct(@PathVariable Long id) {
        Map<String, String> config = globalConfigService.getAllConfigs();
        boolean connected = "true".equals(config.getOrDefault("INSTAGRAM_CONNECTED", "false"));

        if (!connected) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Instagram non connecté"
            ));
        }

        log.info("[INSTAGRAM SYNC] Simulating sync for product ID: {}", id);

        // Simulate API delay
        try { Thread.sleep(500); } catch (InterruptedException ignored) {}

        String mockMediaId = "IG_" + id + "_" + System.currentTimeMillis();
        return ResponseEntity.ok(Map.of(
            "success", true,
            "mediaId", mockMediaId,
            "message", "Produit publié sur Instagram (simulé)",
            "instagramUrl", "https://www.instagram.com/p/" + mockMediaId
        ));
    }
}
