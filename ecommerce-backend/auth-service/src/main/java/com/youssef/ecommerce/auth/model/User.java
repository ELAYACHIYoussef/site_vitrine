package com.youssef.ecommerce.auth.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // "admin" or "client"

    @org.hibernate.annotations.CreationTimestamp
    @Column(updatable = false)
    private java.time.LocalDateTime createdAt;

    @Column(name = "instagram_user_id")
    private String instagramUserId;

    @Column(name = "instagram_access_token")
    private String instagramAccessToken;

    // Manual constructor for builder
    public User(Long id, String username, String email, String password, String role, java.time.LocalDateTime createdAt, String instagramUserId, String instagramAccessToken) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.createdAt = createdAt;
        this.instagramUserId = instagramUserId;
        this.instagramAccessToken = instagramAccessToken;
    }

    // Manual no-args constructor
    public User() {
    }

    public String getRole() {
        return role;
    }

    public java.time.LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.time.LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getInstagramUserId() {
        return instagramUserId;
    }

    public void setInstagramUserId(String instagramUserId) {
        this.instagramUserId = instagramUserId;
    }

    public String getInstagramAccessToken() {
        return instagramAccessToken;
    }

    public void setInstagramAccessToken(String instagramAccessToken) {
        this.instagramAccessToken = instagramAccessToken;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private Long id;
        private String username;
        private String email;
        private String password;
        private String role;
        private java.time.LocalDateTime createdAt;
        private String instagramUserId;
        private String instagramAccessToken;

        public UserBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public UserBuilder username(String username) {
            this.username = username;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserBuilder password(String password) {
            this.password = password;
            return this;
        }

        public UserBuilder role(String role) {
            this.role = role;
            return this;
        }

        public UserBuilder createdAt(java.time.LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public UserBuilder instagramUserId(String instagramUserId) {
            this.instagramUserId = instagramUserId;
            return this;
        }

        public UserBuilder instagramAccessToken(String instagramAccessToken) {
            this.instagramAccessToken = instagramAccessToken;
            return this;
        }

        public User build() {
            return new User(id, username, email, password, role, createdAt, instagramUserId, instagramAccessToken);
        }
    }
}
