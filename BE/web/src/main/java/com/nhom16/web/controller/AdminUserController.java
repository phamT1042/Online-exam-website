package com.nhom16.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhom16.web.dto.response.ApiResponse;
import com.nhom16.web.dto.response.SearchUserResponse;
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
    public ApiResponse<SearchUserResponse> getUserByUsernameAndFullname(@RequestParam String username, @RequestParam String fullname) {
        ApiResponse<SearchUserResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminUserService.getUserByUsernameAndFullname(username, fullname));
        return apiResponse;
    }

    // @GetMapping("/{username}")
    // public ApiResponse<Optional<User>> getUser(@PathVariable String username) {
    //     ApiResponse<Optional<User>> apiResponse = new ApiResponse<>();
    //     apiResponse.setResult(adminUserService.getUser(username));
    //     return apiResponse;
    // }
}
