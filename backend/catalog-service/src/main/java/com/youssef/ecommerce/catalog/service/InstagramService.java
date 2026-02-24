package com.youssef.ecommerce.catalog.service;

import com.youssef.ecommerce.catalog.model.Product;
import com.youssef.ecommerce.catalog.model.ProductEngagement;
import com.youssef.ecommerce.catalog.repository.ProductEngagementRepository;
import com.youssef.ecommerce.catalog.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    private final ProductRepository productRepository;
    private final ProductEngagementRepository engagementRepository;
    private final GlobalConfigService configService;
    private final RestTemplate restTemplate = new RestTemplate();

    public void postProductToInstagram(Product product) {
        if (!isInstagramConnected()) {
            log.warn("Instagram not connected in GlobalConfig. Skipping post for: {}", product.getName());
            return;
        }

        if (instagramAccountId == null || instagramAccountId.isBlank() || pageAccessToken == null
                || pageAccessToken.isBlank()) {
            log.error("Instagram API credentials missing. Check .env or GlobalConfig.");
            return;
        }

        try {
            log.info("Starting real Instagram publication for: {}", product.getName());

            // 1. Create Media Container
            // URL must be publicly accessible!
            String imageUrl = product.getThumbnail();
            if (imageUrl == null || imageUrl.isEmpty()) {
                log.error("Product has no image URL. Cannot post to Instagram.");
                return;
            }

            // Convert relative URL to absolute if necessary (assuming ngrok or public
            // domain handles this)
            // Note: In production, this would be your public domain.
            String caption = buildCaption(product);

            String containerUrl = String.format("%s/%s/media?image_url=%s&caption=%s&access_token=%s",
                    graphApiUrl, instagramAccountId, imageUrl, caption, pageAccessToken);

            log.info("Step 1: Creating media container...");
            ResponseEntity<Map<String, Object>> containerResponseEntity = restTemplate.exchange(
                    containerUrl,
                    HttpMethod.POST,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    });
            Map<String, Object> containerResponse = containerResponseEntity.getBody();

            if (containerResponse == null || !containerResponse.containsKey("id")) {
                log.error("Failed to create media container. Response: {}", containerResponse);
                return;
            }

            String creationId = (String) containerResponse.get("id");
            log.info("Container created. ID: {}", creationId);

            // 2. Publish Media
            String publishUrl = String.format("%s/%s/media_publish?creation_id=%s&access_token=%s",
                    graphApiUrl, instagramAccountId, creationId, pageAccessToken);

            log.info("Step 2: Publishing media container...");
            ResponseEntity<Map<String, Object>> publishResponseEntity = restTemplate.exchange(
                    publishUrl,
                    HttpMethod.POST,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {
                    });
            Map<String, Object> publishResponse = publishResponseEntity.getBody();

            if (publishResponse != null && publishResponse.containsKey("id")) {
                String mediaId = (String) publishResponse.get("id");
                product.setInstagramMediaId(mediaId);
                productRepository.save(product);

                log.info("Successfully published to Instagram! Media ID: {}", mediaId);

                // Initialize engagement
                ProductEngagement engagement = new ProductEngagement();
                engagement.setProduct(product);
                engagement.setInstagramLikes(0);
                engagement.setInstagramComments(0);
                engagement.setLastSyncedAt(java.time.LocalDateTime.now());
                engagementRepository.save(engagement);
            } else {
                log.error("Failed to publish media container. Response: {}", publishResponse);
            }

        } catch (Exception e) {
            log.error("Critical error during Instagram publication: {}", e.getMessage());
            e.printStackTrace();
        }
    }

    public void updateProductOnInstagram(Product product) {
        if (product.getInstagramMediaId() == null || !isInstagramConnected())
            return;
        log.info("[INSTAGRAM SYNC] Simulating update for product: {}", product.getName());
    }

    public void deleteProductFromInstagram(String mediaId) {
        if (mediaId == null || !isInstagramConnected())
            return;
        log.info("[INSTAGRAM SYNC] Simulating deletion of media: {}", mediaId);
    }

    public Map<String, Integer> syncFromInstagram() {
        if (!isInstagramConnected()) {
            throw new RuntimeException("Instagram not connected");
        }

        int imported = 0;
        int updated = 0;

        try {
            log.info("Simulating sync FROM Instagram...");
            Thread.sleep(2000);

            // Mocked Instagram media data
            List<Map<String, String>> mockMedia = List.of(
                    Map.of("id", "ig_post_1", "caption", "New Summer Collection Video! #fashion", "media_type", "VIDEO",
                            "media_url", "https://example.com/video1.mp4", "thumbnail_url",
                            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500"),
                    Map.of("id", "ig_post_2", "caption", "Classic Leather Bag - 89.99€ #style", "media_type", "IMAGE",
                            "media_url", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500"),
                    Map.of("id", "ig_post_3", "caption", "AzyMarket Tech Series: Smartphone Holder #tech", "media_type",
                            "IMAGE", "media_url",
                            "https://images.unsplash.com/photo-1586105251261-72a756654a11?w=500"));

            for (Map<String, String> media : mockMedia) {
                String mediaId = media.get("id");
                Optional<Product> existing = productRepository.findByInstagramMediaId(mediaId);

                if (existing.isEmpty()) {
                    String name = extractName(media.get("caption"));
                    Product product = Product.builder()
                            .name(name)
                            .description(media.get("caption"))
                            .instagramMediaId(mediaId)
                            .thumbnail(media.get("media_type").equals("VIDEO") ? media.get("thumbnail_url")
                                    : media.get("media_url"))
                            .videoUrl(media.get("media_type").equals("VIDEO") ? media.get("media_url") : null)
                            .price(extractPrice(media.get("caption")))
                            .stock(10)
                            .category("Accessoires")
                            .categoryLabel("Accessoires")
                            .slug(name.toLowerCase().replace(" ", "-") + "-" + mediaId)
                            .build();

                    productRepository.save(product);

                    // Add initial engagement
                    ProductEngagement eng = new ProductEngagement();
                    eng.setProduct(product);
                    eng.setInstagramLikes((int) (Math.random() * 100));
                    eng.setInstagramComments((int) (Math.random() * 20));
                    eng.setLastSyncedAt(java.time.LocalDateTime.now());
                    engagementRepository.save(eng);

                    imported++;
                } else {
                    // Update engagement only for now
                    ProductEngagement eng = engagementRepository.findByProductId(existing.get().getId())
                            .orElse(new ProductEngagement());
                    eng.setProduct(existing.get());
                    eng.setInstagramLikes(eng.getInstagramLikes() + (int) (Math.random() * 5));
                    eng.setLastSyncedAt(java.time.LocalDateTime.now());
                    engagementRepository.save(eng);
                    updated++;
                }
            }
        } catch (Exception e) {
            log.error("Error during Instagram sync", e);
        }

        return Map.of("imported", imported, "updated", updated);
    }

    public Map<String, Object> getInstagramStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("profileUrl", instagramPageUrl);

        boolean connected = isInstagramConnected();
        stats.put("connected", connected);

        if (!connected) {
            stats.put("followers", 1250);
            stats.put("following", 45);
            stats.put("posts", 12);
            return stats;
        }

        // Return slightly better stats if connected
        stats.put("followers", 3450);
        stats.put("following", 128);
        stats.put("posts", 42);
        stats.put("username", configService.getAllConfigs().get("INSTAGRAM_USERNAME"));

        return stats;
    }

    private boolean isInstagramConnected() {
        String connected = configService.getAllConfigs().getOrDefault("INSTAGRAM_CONNECTED", "false");
        return "true".equalsIgnoreCase(connected);
    }

    private String extractName(String caption) {
        if (caption == null)
            return "Unknown Product";
        return caption.split("\n")[0].split("-")[0].split("#")[0].trim();
    }

    private Double extractPrice(String caption) {
        if (caption == null)
            return 0.0;
        // Simple regex or split to find currency
        if (caption.contains("€")) {
            try {
                String part = caption.split("€")[0];
                String[] words = part.split(" ");
                return Double.parseDouble(words[words.length - 1].replace(",", "."));
            } catch (Exception e) {
                return 0.0;
            }
        }
        return 0.0;
    }

    private String buildCaption(Product product) {
        StringBuilder sb = new StringBuilder();
        sb.append(product.getName()).append("\n\n");
        if (product.getDescriptionCourte() != null) {
            sb.append(product.getDescriptionCourte()).append("\n\n");
        }
        sb.append("Prix: ").append(String.format("%.2f", product.getPrice())).append(" €\n\n");
        sb.append("#AzyMarket #Ecommerce #").append(product.getCategoryLabel().replace(" ", ""));
        return sb.toString();
    }
}
