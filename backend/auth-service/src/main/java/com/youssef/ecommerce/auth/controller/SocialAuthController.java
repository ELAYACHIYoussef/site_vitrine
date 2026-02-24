package com.youssef.ecommerce.auth.controller;

import com.youssef.ecommerce.auth.model.User;
import com.youssef.ecommerce.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/instagram")
public class SocialAuthController {

    @Value("${INSTAGRAM_CLIENT_ID:placeholder_id}")
    private String clientId;

    @Value("${INSTAGRAM_CLIENT_SECRET:placeholder_secret}")
    private String clientSecret;

    @Value("${INSTAGRAM_REDIRECT_URI:http://localhost:8080/api/auth/instagram/callback}")
    private String redirectUri;

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    public SocialAuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.restTemplate = new RestTemplate();
    }

    @GetMapping("/connect")
    public ResponseEntity<Map<String, String>> connect(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        String state = authentication.getName(); // Username
        
        String url = "https://api.instagram.com/oauth/authorize" +
                "?client_id=" + clientId +
                "&redirect_uri=" + redirectUri +
                "&scope=user_profile,user_media" +
                "&response_type=code" +
                "&state=" + state;
        
        Map<String, String> response = new HashMap<>();
        response.put("url", url);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/callback")
    public RedirectView callback(@RequestParam("code") String code, @RequestParam(value = "state", required = false) String state) {
        if (state == null) {
             return new RedirectView("http://localhost:5173/profile?error=missing_state");
        }

        String tokenUrl = "https://api.instagram.com/oauth/access_token";
        
        org.springframework.util.MultiValueMap<String, String> map = new org.springframework.util.LinkedMultiValueMap<>();
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);
        map.add("grant_type", "authorization_code");
        map.add("redirect_uri", redirectUri);
        map.add("code", code);

        try {
            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED);
            
            org.springframework.http.HttpEntity<org.springframework.util.MultiValueMap<String, String>> request = 
                new org.springframework.http.HttpEntity<>(map, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);
            Map<String, Object> body = response.getBody();

            if (body != null && body.containsKey("access_token")) {
                String accessToken = (String) body.get("access_token");
                String instagramUserId = String.valueOf(body.get("user_id"));

                // Update User
                // 'state' is the username
                userRepository.findByUsername(state).ifPresent(user -> {
                    user.setInstagramAccessToken(accessToken);
                    user.setInstagramUserId(instagramUserId);
                    userRepository.save(user);
                });

                return new RedirectView("http://localhost:5173/profile?instagram_connected=true");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new RedirectView("http://localhost:5173/profile?error=instagram_exchange_failed");
        }
        return new RedirectView("http://localhost:5173/profile?error=unknown_error");
    }
}
