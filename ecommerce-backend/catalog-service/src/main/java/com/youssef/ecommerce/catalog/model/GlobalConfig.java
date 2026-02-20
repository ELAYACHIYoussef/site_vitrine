package com.youssef.ecommerce.catalog.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "global_config")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GlobalConfig {
    @Id
    @Column(unique = true, nullable = false)
    private String configKey; // e.g., "STORE_NAME", "CONTACT_EMAIL"

    @Column(nullable = false)
    private String configValue;
}
