package com.nhom16.web.dto.response;

import java.util.Set;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String username;
    private Set<String> roles;
}
