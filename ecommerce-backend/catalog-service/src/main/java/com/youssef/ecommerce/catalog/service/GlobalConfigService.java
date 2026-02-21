package com.youssef.ecommerce.catalog.service;

import com.youssef.ecommerce.catalog.model.GlobalConfig;
import com.youssef.ecommerce.catalog.repository.GlobalConfigRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GlobalConfigService {

    private final GlobalConfigRepository repository;

    public Map<String, String> getAllConfigs() {
        List<GlobalConfig> configs = repository.findAll();
        Map<String, String> configMap = new HashMap<>();
        // Default values
        configMap.put("STORE_NAME", "AzyMarket");
        configMap.put("CONTACT_EMAIL", "contact@azymarket.com");
        configMap.put("STORE_DESCRIPTION", "La meilleure boutique en ligne pour vos achats quotidiens.");
        configMap.put("facebook", "");
        configMap.put("instagram", "");

        // Override with DB values
        for (GlobalConfig config : configs) {
            configMap.put(config.getConfigKey(), config.getConfigValue());
        }
        return configMap;
    }

    public void updateConfigs(Map<String, String> updates) {
        for (Map.Entry<String, String> entry : updates.entrySet()) {
            GlobalConfig config = repository.findById(entry.getKey())
                    .orElse(new GlobalConfig(entry.getKey(), entry.getValue()));
            config.setConfigValue(entry.getValue());
            repository.save(config);
        }
    }
}
