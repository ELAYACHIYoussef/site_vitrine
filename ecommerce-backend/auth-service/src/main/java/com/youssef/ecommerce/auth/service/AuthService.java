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
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Cet email est déjà utilisé");
        }
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Ce nom d'utilisateur est déjà pris");
        }
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
                .map(this::generateAuthResponse);
    }

    public Map<String, Object> simulateGoogleLogin(String email) {
        User user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setUsername(email.split("@")[0]);
                    newUser.setPassword(passwordEncoder.encode("mock_password"));

                    if (ADMIN_EMAILS.contains(email.toLowerCase())) {
                        newUser.setRole("admin");
                    } else {
                        newUser.setRole("client");
                    }

                    return userRepository.save(newUser);
                });

        return generateAuthResponse(user);
    }

    private Map<String, Object> generateAuthResponse(User user) {
        String token = jwtService.generateToken(user.getUsername(), user.getRole());
        Map<String, Object> userData = new java.util.LinkedHashMap<>();
        userData.put("id", user.getId());
        userData.put("username", user.getUsername());
        userData.put("email", user.getEmail());
        userData.put("role", user.getRole());
        userData.put("avatarUrl", user.getAvatarUrl());

        Map<String, Object> response = new java.util.LinkedHashMap<>();
        response.put("token", token);
        response.put("user", userData);
        return response;
    }

    public void deleteUser(String email) {
        userRepository.findByEmail(email).ifPresent(userRepository::delete);
    }
}
