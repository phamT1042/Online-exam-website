package com.nhom16.web.config;

import java.util.HashSet;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.nhom16.web.model.User;
import com.nhom16.web.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class AppInitConfig {
    
    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByUsername("admin123").isEmpty()) {
                User user = new User();
                user.setUsername("admin123");

                var roles = new HashSet<String>();
                roles.add("ADMIN");
                user.setRoles(roles);

                PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
                user.setPassword(passwordEncoder.encode("admin123"));
            
                userRepository.save(user);
                log.warn("Admin user has been created with username/ password: admin123");
            }
        };
    }
}
