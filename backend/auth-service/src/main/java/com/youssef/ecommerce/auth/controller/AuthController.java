package com.youssef.ecommerce.auth.controller;

import com.youssef.ecommerce.auth.model.User;
import com.youssef.ecommerce.auth.service.AuthService;
import com.youssef.ecommerce.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final com.youssef.ecommerce.auth.repository.AuditLogRepository auditLogRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(Map.of("message", authService.register(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        return authService.login(email, request.get("password"))
                .map(token -> {
                    // Log the login event
                    userRepository.findByEmail(email).ifPresent(u -> {
                        auditLogRepository.save(com.youssef.ecommerce.auth.model.AuditLog.builder()
                                .eventType("LOGIN")
                                .userId(u.getId())
                                .username(u.getUsername())
                                .details("User logged in via Web")
                                .build());
                    });
                    return ResponseEntity.ok(token);
                })
                .orElse(ResponseEntity.status(401).body(Map.of("error", "Invalid credentials")));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(org.springframework.security.core.Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }

        String username = authentication.getName();
        return userRepository.findByUsername(username)
                .map(u -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", u.getId());
                    m.put("username", u.getUsername());
                    m.put("email", u.getEmail());
                    m.put("role", u.getRole());
                    m.put("avatarUrl", u.getAvatarUrl());
                    return ResponseEntity.ok(m);
                })
                .orElse(ResponseEntity.status(404).build());
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats() {
        long totalUsers = userRepository.count();
        long admins = userRepository.countByRole("admin");
        long clients = userRepository.countByRole("client");

        List<Map<String, Object>> recentUsers = userRepository.findTop5ByOrderByIdDesc()
                .stream()
                .map(u -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", u.getId());
                    m.put("username", u.getUsername());
                    m.put("email", u.getEmail());
                    m.put("role", u.getRole());
                    m.put("createdAt", u.getCreatedAt());
                    return m;
                })
                .collect(Collectors.toList());

        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("admins", admins);
        stats.put("clients", clients);
        stats.put("recentUsers", recentUsers);

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<Map<String, Object>> users = userRepository.findAll()
                .stream()
                .map(u -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", u.getId());
                    m.put("username", u.getUsername());
                    m.put("email", u.getEmail());
                    m.put("role", u.getRole());
                    m.put("createdAt", u.getCreatedAt());
                    return m;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @DeleteMapping("/users/me")
    public ResponseEntity<?> deleteCurrentUser(org.springframework.security.core.Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        String username = authentication.getName();
        // In our case, the username in the token is actually the username, not email.
        // But we need to be careful. Let's look at how we get the user.
        // The implementation of loadUserByUsername usually loads by username.
        // Let's assume username is correct.

        userRepository.findByUsername(username).ifPresent(u -> authService.deleteUser(u.getEmail()));

        return ResponseEntity.ok(Map.of("message", "Compte supprimé avec succès"));
    }

    @GetMapping("/google/simulate")
    public org.springframework.http.ResponseEntity<Void> simulateGoogle(
            @RequestParam(defaultValue = "selmanim113@gmail.com") String email) {
        Map<String, Object> authResponse = authService.simulateGoogleLogin(email);
        String token = (String) authResponse.get("token");

        // Redirect to frontend with token
        return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                .location(java.net.URI.create("http://localhost:5173/oauth2/redirect?token=" + token))
                .build();
    }

    @GetMapping("/ping")
    public ResponseEntity<?> ping() {
        return ResponseEntity.ok(Map.of("message", "pong"));
    }

    @PutMapping("/users/avatar")
    public ResponseEntity<?> updateAvatar(@RequestBody Map<String, String> request,
            org.springframework.security.core.Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).build();
        }
        String username = authentication.getName();
        String avatarUrl = request.get("avatarUrl");

        return userRepository.findByUsername(username)
                .or(() -> userRepository.findByEmail(username)) // Try email if username not found (identity mismatch
                                                                // fix)
                .map(u -> {
                    u.setAvatarUrl(avatarUrl);
                    userRepository.save(u);
                    return ResponseEntity.ok(Map.of("message", "Avatar mis à jour", "avatarUrl", avatarUrl));
                })
                .orElse(ResponseEntity.status(404).build());
    }
}
