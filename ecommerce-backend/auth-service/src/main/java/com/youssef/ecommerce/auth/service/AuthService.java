package com.youssef.ecommerce.auth.service;

import com.youssef.ecommerce.auth.model.User;
import com.youssef.ecommerce.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Liste des emails administrateurs
    private static final List<String> ADMIN_EMAILS = List.of(
            "ysf.elayachi@gmail.com",
            "selmanim113@gmail.com");

    public String register(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Attribution automatique du rôle en fonction de l'email
        if (ADMIN_EMAILS.contains(user.getEmail().toLowerCase())) {
            user.setRole("admin");
        } else {
            user.setRole("client");
        }

        userRepository.save(user);
        return "User registered successfully";
    }

    public Optional<Map<String, Object>> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> {
                    String token = jwtService.generateToken(user.getUsername(), user.getRole());
                    Map<String, Object> userData = Map.of(
                            "id", user.getId(),
                            "username", user.getUsername(),
                            "email", user.getEmail(),
                            "role", user.getRole());
                    return Map.of(
                            "token", token,
                            "user", userData);
                });
    }
}
