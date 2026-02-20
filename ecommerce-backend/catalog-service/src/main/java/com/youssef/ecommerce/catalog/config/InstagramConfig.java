package com.youssef.ecommerce.catalog.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "instagram")
@Data
public class InstagramConfig {
    private String graphApiUrl = "https://graph.facebook.com/v19.0";
    private String pageAccessToken;
    private String instagramAccountId;
    private String webhookVerifyToken;
}
