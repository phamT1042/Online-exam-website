package com.nhom16.web.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom16.web.model.User;
import com.nhom16.web.dto.request.ChangePasswordRequest;
import com.nhom16.web.dto.response.ApiResponse;
import com.nhom16.web.service.UserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")

public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ApiResponse<User> createUser(@RequestBody User request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.createUser(request));
        return apiResponse;
    }

    @GetMapping("/{username}")
    public ApiResponse<Optional<User>> getUser(@PathVariable String username) {
        ApiResponse<Optional<User>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getUser(username));
        return apiResponse;
    }

    @GetMapping("/profile") //get with token without username
    public ApiResponse<Optional<User>> getProfile() {
        ApiResponse<Optional<User>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getProfile());
        return apiResponse;
    }

    @PostMapping("/update-profile")
    public ApiResponse<User> updateProfile(@RequestBody User request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.updateProfile(request));
        return apiResponse;
    }

    @PostMapping("/update-password")
    public ApiResponse<Boolean> postMethodName(@RequestBody ChangePasswordRequest request) {
        ApiResponse<Boolean> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.updatePassword(request));
        return apiResponse;
    }
    

}
