package com.nhom16.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom16.web.model.User;
import com.nhom16.web.dto.response.ApiResponse;
import com.nhom16.web.dto.response.AuthResponse;
import com.nhom16.web.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")

public class AuthController {
    @Autowired
    private AuthService authenService;

    @PostMapping("/login") 
    public ApiResponse<AuthResponse> authStudent(@RequestBody User request) {
        var result = authenService.auth(request);

        ApiResponse<AuthResponse> response = new ApiResponse<>();
        response.setResult(result);

        return response;
    }

    @PostMapping("/register") 
    public ApiResponse<User> createUser(@RequestBody User request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(authenService.createUser(request));
        return apiResponse;
    }

}

