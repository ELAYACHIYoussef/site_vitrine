package com.youssef.ecommerce.catalog.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class FileUploadConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir:uploads/products}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Resolve the upload directory to an absolute path
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        // Ensure the URI ends with a slash so Spring can resolve files within it
        String uploadPathStr = uploadPath.toUri().toString();
        if (!uploadPathStr.endsWith("/")) {
            uploadPathStr += "/";
        }

        // Map /uploads/products/** to the actual filesystem directory
        registry.addResourceHandler("/uploads/products/**")
                .addResourceLocations(uploadPathStr);
    }

    /*
     * @Override
     * public void addCorsMappings(CorsRegistry registry) {
     * registry.addMapping("/uploads/**")
     * .allowedOrigins("*")
     * .allowedMethods("GET");
     * }
     */
}
