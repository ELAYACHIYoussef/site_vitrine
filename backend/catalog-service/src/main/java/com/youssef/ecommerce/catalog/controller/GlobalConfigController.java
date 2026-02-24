package com.youssef.ecommerce.catalog.controller;

import com.youssef.ecommerce.catalog.service.GlobalConfigService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/catalog/config")
@RequiredArgsConstructor
public class GlobalConfigController {

    private final GlobalConfigService service;

    @GetMapping
    public ResponseEntity<Map<String, String>> getAllConfigs() {
        return ResponseEntity.ok(service.getAllConfigs());
    }

    @PostMapping
    public ResponseEntity<Void> updateConfigs(@RequestBody Map<String, String> updates) {
        service.updateConfigs(updates);
        return ResponseEntity.ok().build();
    }
}
