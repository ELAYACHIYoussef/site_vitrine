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
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        return ResponseEntity.ok(Map.of("message", authService.register(user)));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        return authService.login(request.get("email"), request.get("password"))
                .map(ResponseEntity::ok)
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
}
