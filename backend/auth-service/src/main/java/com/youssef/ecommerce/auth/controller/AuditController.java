package com.youssef.ecommerce.auth.controller;

import com.youssef.ecommerce.auth.model.AuditLog;
import com.youssef.ecommerce.auth.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auth/audit")
@RequiredArgsConstructor
public class AuditController {

    private final AuditLogRepository auditLogRepository;

    @GetMapping
    public ResponseEntity<List<AuditLog>> getRecentLogs() {
        return ResponseEntity.ok(auditLogRepository.findTop50ByOrderByTimestampDesc());
    }
}
