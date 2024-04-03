package com.nhom16.web.service;

import java.util.List;

import com.nhom16.web.dto.response.TestDetailResponse;
import com.nhom16.web.dto.response.TestHistoryUserResponse;
import com.nhom16.web.dto.response.TestResponse;
import com.nhom16.web.dto.response.TestResultResponse;
import com.nhom16.web.model.TestUser;

public interface StudentTestService {
    List<TestResponse> getTestsForUser(); // Hien

    TestDetailResponse getTestDetail(String testId); // Duc

    TestUser calcScore(String testId, List<String> choices); // Duc

    TestResultResponse getResult(String testId); // Duc

    List<TestHistoryUserResponse> getHistoryUser();
}
