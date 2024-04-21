package com.nhom16.web.service;

import java.util.List;

import com.nhom16.web.dto.response.TestHistoryUserResponse;
import com.nhom16.web.dto.response.TestInformationResponse;
import com.nhom16.web.dto.response.TestQuestionResponse;
import com.nhom16.web.dto.response.TestResultResponse;
import com.nhom16.web.model.Answer;

public interface StudentTestService {
    List<TestInformationResponse> getTestsForUser(); // Hien

    TestQuestionResponse getTestDetail(String testId); // Duc

    String calcScore(String testId, Answer answer); // Duc

    TestResultResponse getResult(String testId); // Duc

    List<TestHistoryUserResponse> getHistoryUser();
}
