package com.nhom16.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom16.web.model.User;
import com.nhom16.web.response.ApiResponse;
import com.nhom16.web.response.AuthenResponse;
import com.nhom16.web.service.AuthenService;
import com.nhom16.web.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")

public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private AuthenService authenService;

    @PostMapping("/auth/login")
    public ApiResponse<AuthenResponse> authenticate(@RequestBody User request) {
        var result = authenService.authenticate(request);

        ApiResponse<AuthenResponse> response = new ApiResponse<>();
        response.setResult(result);

        return response;
    }

    @PostMapping("/register")
    public ApiResponse<User> createUser(@RequestBody User request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }

    @GetMapping("/{username}")
    public ApiResponse<User> getUser(@PathVariable String username) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getUser(username));
        return apiResponse;
    }
}
