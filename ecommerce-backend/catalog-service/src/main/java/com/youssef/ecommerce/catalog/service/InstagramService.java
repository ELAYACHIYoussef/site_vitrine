package com.youssef.ecommerce.catalog.service;

import com.youssef.ecommerce.catalog.model.Product;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class InstagramService {

    @Value("${instagram.graph.url:https://graph.facebook.com/v19.0}")
    private String graphApiUrl;

    @Value("${instagram.access.token:}")
    private String pageAccessToken;

    @Value("${instagram.page.url:https://www.instagram.com/azyymarket/}")
    private String instagramPageUrl;

    @Value("${instagram.account.id:}")
    private String instagramAccountId;

    private final RestTemplate restTemplate = new RestTemplate();

    public void postProductToInstagram(Product product) {
        if (pageAccessToken.isEmpty() || instagramAccountId.isEmpty()) {
            log.warn("Instagram credentials not configured. Skipping post for product: {}", product.getName());
            return;
        }

        try {
            // 1. Create Media Container
            String containerUrl = String.format("%s/%s/media", graphApiUrl, instagramAccountId);
            Map<String, Object> containerRequest = Map.of(
                "image_url", product.getThumbnail(), // Needs to be a public URL
                "caption", buildCaption(product),
                "access_token", pageAccessToken
            );
            
            Map<String, Object> containerResponse = restTemplate.postForObject(containerUrl, containerRequest, Map.class);
            String containerId = (String) containerResponse.get("id");

            // 2. Publish Media
            String publishUrl = String.format("%s/%s/media_publish", graphApiUrl, instagramAccountId);
            Map<String, Object> publishRequest = Map.of(
                "creation_id", containerId,
                "access_token", pageAccessToken
            );
            
            restTemplate.postForObject(publishUrl, publishRequest, Map.class);
            log.info("Successfully published product {} to Instagram", product.getName());
            
            // In a real scenario, we would get the media ID from the response and return it
            // For now, we just log. The caller (ProductService) should handle saving the ID if we could get it.
            // return mediaId; 

        } catch (Exception e) {
            log.error("Failed to post product to Instagram: {}", e.getMessage());
        }
    }

    public void updateProductOnInstagram(Product product) {
        if (product.getInstagramMediaId() == null) {
            return;
        }
        // Instagram Graph API doesn't allow updating media caption easily for all types, 
        // but we can try the /media_id endpoint with POST to update specific fields if allowed.
        log.info("Updating Instagram post {} for product {}", product.getInstagramMediaId(), product.getName());
    }

    public void deleteProductFromInstagram(String instagramMediaId) {
         if (instagramMediaId == null) return;
         log.info("Requesting deletion of Instagram media {}", instagramMediaId);
         // DELETE /{media-id} is not always supported for organic posts via API, usually requires specific permissions.
         // We will log it for now.
         try {
             String url = String.format("%s/%s?access_token=%s", graphApiUrl, instagramMediaId, pageAccessToken);
             restTemplate.delete(url);
         } catch (Exception e) {
             log.warn("Could not delete Instagram post {}: {}", instagramMediaId, e.getMessage());
         }
    }

    public Map<String, Object> getInstagramStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("profileUrl", instagramPageUrl);
        
        if (pageAccessToken == null || pageAccessToken.isEmpty()) {
            // Return mock/default data if not connected
            stats.put("followers", 1250);
            stats.put("following", 45);
            stats.put("posts", 12);
            stats.put("connected", false);
            return stats;
        }

        try {
            String url = String.format("%s/%s?fields=followers_count,follows_count,media_count&access_token=%s", 
                graphApiUrl, instagramAccountId, pageAccessToken);
            
            Map<String, Object> response = restTemplate.getForObject(url, Map.class);
            if (response != null) {
                stats.put("followers", response.get("followers_count"));
                stats.put("following", response.get("follows_count"));
                stats.put("posts", response.get("media_count"));
                stats.put("connected", true);
            }
        } catch (Exception e) {
            log.error("Failed to fetch Instagram stats", e);
            stats.put("error", "Could not fetch stats");
        }
        return stats;
    }

    private String buildCaption(Product product) {
        return String.format("%s\n\n%s\n\nPrice: %.2f €\n\n#AzyMarket #Ecommerce #NewArrival", 
            product.getName(), product.getDescription(), product.getPrice());
    }
}
