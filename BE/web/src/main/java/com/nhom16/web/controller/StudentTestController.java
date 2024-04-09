package com.nhom16.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom16.web.dto.response.ApiResponse;
import com.nhom16.web.dto.response.TestDetailResponse;
import com.nhom16.web.dto.response.TestHistoryUserResponse;
import com.nhom16.web.dto.response.TestResponse;
import com.nhom16.web.dto.response.TestResultResponse;
import com.nhom16.web.model.Answer;
import com.nhom16.web.model.TestUser;
import com.nhom16.web.service.StudentTestService;

@RestController
@RequestMapping("/api/students/tests")
@CrossOrigin("*")

public class StudentTestController {
    @Autowired
    private StudentTestService studentTestService;

    @GetMapping
    public ApiResponse<List<TestResponse>> getTestsForUser() {
        ApiResponse<List<TestResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentTestService.getTestsForUser());
        return apiResponse;
    }

    @GetMapping("/detail/{testId}")
    public ApiResponse<TestDetailResponse> getTestDetail(@PathVariable String testId) {
        ApiResponse<TestDetailResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentTestService.getTestDetail(testId));
        return apiResponse;
    }

    @PostMapping("/score/{testId}")
    public ApiResponse<TestUser> calcScore(@PathVariable String testId, @RequestBody Answer answer) {
        ApiResponse<TestUser> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentTestService.calcScore(testId, answer));
        return apiResponse;
    }

    @GetMapping("/result/{testId}")
    public ApiResponse<TestResultResponse> getResult(@PathVariable String testId) {
        ApiResponse<TestResultResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentTestService.getResult(testId));
        return apiResponse;
    }

    @GetMapping("/history")
    public ApiResponse<List<TestHistoryUserResponse>> getHistoryUser() {
        ApiResponse<List<TestHistoryUserResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentTestService.getHistoryUser());
        return apiResponse;
    }
}
