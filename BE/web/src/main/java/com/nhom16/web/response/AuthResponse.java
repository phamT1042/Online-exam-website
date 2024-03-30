package com.nhom16.web.response;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String username;
}
