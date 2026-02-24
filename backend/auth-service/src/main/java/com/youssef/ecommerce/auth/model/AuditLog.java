package com.youssef.ecommerce.auth.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String eventType; // LOGIN, REGISTER, LOGOUT
    
    private Long userId;
    
    private String username;
    
    private String details; // IP, UserAgent, etc.

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

    @CreationTimestamp
    private LocalDateTime timestamp;

    public AuditLog() {}

    public AuditLog(Long id, String eventType, Long userId, String username, String details, LocalDateTime timestamp) {
        this.id = id;
        this.eventType = eventType;
        this.userId = userId;
        this.username = username;
        this.details = details;
        this.timestamp = timestamp;
    }

    public static AuditLogBuilder builder() {
        return new AuditLogBuilder();
    }

    public static class AuditLogBuilder {
        private Long id;
        private String eventType;
        private Long userId;
        private String username;
        private String details;
        private LocalDateTime timestamp;

        public AuditLogBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public AuditLogBuilder eventType(String eventType) {
            this.eventType = eventType;
            return this;
        }

        public AuditLogBuilder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public AuditLogBuilder username(String username) {
            this.username = username;
            return this;
        }

        public AuditLogBuilder details(String details) {
            this.details = details;
            return this;
        }

        public AuditLogBuilder timestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public AuditLog build() {
            return new AuditLog(id, eventType, userId, username, details, timestamp);
        }
    }
}
