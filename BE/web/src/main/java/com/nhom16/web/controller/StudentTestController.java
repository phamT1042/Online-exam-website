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
import com.nhom16.web.dto.response.TestHistoryUserResponse;
import com.nhom16.web.dto.response.TestInformationResponse;
import com.nhom16.web.dto.response.TestQuestionResponse;
import com.nhom16.web.dto.response.TestResultResponse;
import com.nhom16.web.model.Answer;
import com.nhom16.web.service.StudentTestService;

@RestController
@RequestMapping("/api/students/tests")
@CrossOrigin("*")

public class StudentTestController {
    @Autowired
    private StudentTestService studentTestService;

    @GetMapping
    public ApiResponse<List<TestInformationResponse>> getTestsForUser() {
        ApiResponse<List<TestInformationResponse>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentTestService.getTestsForUser());
        return apiResponse;
    }

    @GetMapping("/questions/{testId}")
    public ApiResponse<TestQuestionResponse> getTestDetail(@PathVariable String testId) {
        ApiResponse<TestQuestionResponse> apiResponse = new ApiResponse<>();
        apiResponse.setResult(studentTestService.getTestDetail(testId));
        return apiResponse;
    }

    @PostMapping("/submit/{testId}")
    public ApiResponse<String> calcScore(@PathVariable String testId, @RequestBody Answer answer) {
        ApiResponse<String> apiResponse = new ApiResponse<>();
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
