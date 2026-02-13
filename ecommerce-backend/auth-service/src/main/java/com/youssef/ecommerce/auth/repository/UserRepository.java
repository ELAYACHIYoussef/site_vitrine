package com.youssef.ecommerce.auth.repository;

import com.youssef.ecommerce.auth.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    long countByRole(String role);

    List<User> findTop5ByOrderByIdDesc();
}
