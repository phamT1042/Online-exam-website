package com.nhom16.web.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom16.web.dto.response.ApiResponse;
import com.nhom16.web.model.User;
import com.nhom16.web.service.UserService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")

public class AdminController {
    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public ApiResponse<Optional<User>> getUser(@PathVariable String username) {
        ApiResponse<Optional<User>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(userService.getUser(username));
        return apiResponse;
    }
}
