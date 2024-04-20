package com.nhom16.web.controller;

import java.util.List;

import com.nhom16.web.model.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.nhom16.web.dto.response.ApiResponse;
import com.nhom16.web.dto.response.SearchUserResponse;
import com.nhom16.web.dto.response.TestHistoryUserResponse;
import com.nhom16.web.dto.response.TestResultResponse;
import com.nhom16.web.model.User;
import com.nhom16.web.service.AdminUserService;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin("*")

public class AdminUserController {
    @Autowired
    private AdminUserService adminUserService;

    @GetMapping
    public ApiResponse<List<User>> getUsers() {
        ApiResponse<List<User>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminUserService.getUsers());
        return apiResponse;
    }

    @GetMapping("/{userId}")
    public ApiResponse<User> getUserById(@PathVariable String userId) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminUserService.getUserById(userId));
        return apiResponse;
    }

    @PostMapping
    public ApiResponse<User> createUser(@RequestBody User request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminUserService.createUser(request));
        return apiResponse;
    }

    @PutMapping("/{userId}")
    public ApiResponse<User> updateUser(@PathVariable String userId, @RequestBody User request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminUserService.updateUser(userId, request));
        return apiResponse;
    }

    @DeleteMapping("/{userId}")
    public ApiResponse<Boolean> deleteUser(@PathVariable String userId) {
        ApiResponse<Boolean> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminUserService.deleteUser(userId));
        return apiResponse;
    }

    @GetMapping("/search")
    public ApiResponse<List<SearchUserResponse>> getUserByUsernameAndFullname(@RequestParam String name) {
        ApiResponse<List<SearchUserResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminUserService.getUserForSearch(name));
        return apiResponse;
    }

    @GetMapping("/search/{userId}")
    public ApiResponse<List<TestHistoryUserResponse>> getHistoryUser(@PathVariable String userId) {
        ApiResponse<List<TestHistoryUserResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminUserService.getHistoryUser(userId));
        return apiResponse;
    }

    @GetMapping("/search/detail")
    public ApiResponse<TestResultResponse> getHistoryDetailUser(@RequestParam String userId, @RequestParam String testId) {
        ApiResponse<TestResultResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminUserService.getHistoryDetailUser(userId, testId));
        return apiResponse;
    }
}
