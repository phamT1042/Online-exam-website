package com.nhom16.web.controller;

import java.util.List;

import com.nhom16.web.dto.response.TestInformationResponse;
import com.nhom16.web.dto.response.TestStatisticResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom16.web.dto.response.ApiResponse;
import com.nhom16.web.dto.response.TestStatisticUserResponse;
import com.nhom16.web.model.Test;
import com.nhom16.web.service.AdminTestService;

@RestController
@RequestMapping("/api/admin/tests")
@CrossOrigin("*")

public class AdminTestController {
    @Autowired
    private AdminTestService adminTestService;

    @GetMapping
    public ApiResponse<List<TestInformationResponse>> getTests() {
        ApiResponse<List<TestInformationResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminTestService.getTests());
        return apiResponse;
    }

    @PostMapping
    public ApiResponse<Test> createTest(@RequestBody Test request) {
        ApiResponse<Test> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminTestService.createTest(request));
        return apiResponse;
    }

    @GetMapping("/{testId}")
    public ApiResponse<Test> getTest(@PathVariable String testId) {
        ApiResponse<Test> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminTestService.getTest(testId));
        return apiResponse;
    }

    @PutMapping("/{testId}")
    public ApiResponse<Test> updateTest(@PathVariable String testId, @RequestBody Test request) {
        ApiResponse<Test> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminTestService.updateTest(testId, request));
        return apiResponse;
    }

    @DeleteMapping("/{testId}")
    public ApiResponse<String> deleteTest(@PathVariable String testId) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminTestService.deleteTest(testId));
        return apiResponse;
    }

    @GetMapping("/statistics")
    public ApiResponse<List<TestStatisticResponse>> getTestStatistic() {
        ApiResponse<List<TestStatisticResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminTestService.getTestStatistic());
        return apiResponse;
    }

    @GetMapping("/statistics/{testId}")
    public ApiResponse<List<TestStatisticUserResponse>> getStatisticUsers(@PathVariable String testId) {
        ApiResponse<List<TestStatisticUserResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(adminTestService.getStatisticUsers(testId));
        return apiResponse;
    }
}
