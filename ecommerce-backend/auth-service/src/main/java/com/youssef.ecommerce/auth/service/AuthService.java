package com.youssef.ecommerce.auth.service;

import com.youssef.ecommerce.auth.model.User;
import com.youssef.ecommerce.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public String register(User user) {
        user.setPassword(passwordEncoder.encode(user.password()));
        // Default role logic if needed
        if (user.getRole() == null) user.setRole("client");
        userRepository.save(user);
        return "User registered successfully";
    }

    public Optional<String> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> jwtService.generateToken(user.getUsername(), user.getRole()));
    }
}
