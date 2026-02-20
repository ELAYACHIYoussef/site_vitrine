package com.youssef.ecommerce.catalog.repository;

import com.youssef.ecommerce.catalog.model.GlobalConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GlobalConfigRepository extends JpaRepository<GlobalConfig, String> {
    Optional<GlobalConfig> findByConfigKey(String configKey);
}
