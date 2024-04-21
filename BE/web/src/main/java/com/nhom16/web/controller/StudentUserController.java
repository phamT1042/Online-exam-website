package com.nhom16.web.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom16.web.dto.request.ChangePasswordRequest;
import com.nhom16.web.dto.response.ApiResponse;
import com.nhom16.web.model.User;
import com.nhom16.web.service.StudentUserService;

@RestController
@RequestMapping("/api/students/users")
@CrossOrigin("*")

public class StudentUserController {
    @Autowired
    private StudentUserService studentUserService;

    @GetMapping("/profile")
    public ApiResponse<Optional<User>> getProfile() {
        ApiResponse<Optional<User>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentUserService.getProfile());
        return apiResponse;
    }

    @PutMapping("/update-profile")
    public ApiResponse<String> updateProfile(@RequestBody User request) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentUserService.updateProfile(request));
        return apiResponse;
    }

    @PutMapping("/update-password")
    public ApiResponse<String> updatePassword(@RequestBody ChangePasswordRequest request) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentUserService.updatePassword(request));
        return apiResponse;
    }
}
