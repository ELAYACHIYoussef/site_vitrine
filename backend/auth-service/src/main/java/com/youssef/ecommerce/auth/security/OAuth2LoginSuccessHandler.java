package com.youssef.ecommerce.auth.security;

import com.youssef.ecommerce.auth.model.User;
import com.youssef.ecommerce.auth.repository.UserRepository;
import com.youssef.ecommerce.auth.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        Optional<User> userOptional = userRepository.findByEmail(email);
        User user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            // Register new user
            user = User.builder()
                    .email(email)
                    .username(email) // Use email as username for Google users
                    .password(passwordEncoder.encode(UUID.randomUUID().toString())) // Random password
                    .role("client")
                    .build();
            userRepository.save(user);
        }

        String jwtToken = jwtService.generateToken(user.getUsername(), user.getRole());

        // Redirect to Frontend with Token
        String targetUrl = "http://localhost:5173/oauth2/redirect?token=" + jwtToken;
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
