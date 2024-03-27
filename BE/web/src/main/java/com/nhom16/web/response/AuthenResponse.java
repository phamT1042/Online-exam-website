package com.nhom16.web.response;

import lombok.Data;

@Data
public class AuthenResponse {
    private String token;
    private String username;
}
