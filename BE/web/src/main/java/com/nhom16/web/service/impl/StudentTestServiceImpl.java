package com.nhom16.web.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.nhom16.web.dto.response.TestDetailResponse;
import com.nhom16.web.dto.response.TestHistoryUserResponse;
import com.nhom16.web.dto.response.TestResponse;
import com.nhom16.web.dto.response.TestResultResponse;
import com.nhom16.web.model.Test;
import com.nhom16.web.model.TestUser;
import com.nhom16.web.model.User;
import com.nhom16.web.repository.TestRepository;
import com.nhom16.web.repository.TestUserRepository;
import com.nhom16.web.repository.UserRepository;
import com.nhom16.web.service.StudentTestService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class StudentTestServiceImpl implements StudentTestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private TestUserRepository testUserRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<TestResponse> getTestsForUser() {
        // get user with token
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        Optional<User> option = userRepository.findByUsername(username);
        User user = option.get();

        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTestsForUser'");
    }

    @Override
    public TestDetailResponse getTestDetail(String testId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getQuestions'");
    }

    @Override
    public TestUser calcScore(String testId, List<String> choices) {
        // get user with token
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        Optional<User> option = userRepository.findByUsername(username);
        User user = option.get();

        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'calcScore'");
    }

    @Override
    public TestResultResponse getResult(String testId) {
        // get user with token
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        Optional<User> option = userRepository.findByUsername(username);
        User user = option.get();

        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getResult'");
    }

    @Override
    public List<TestHistoryUserResponse> getHistoryUser() {
        // get user with token
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        Optional<User> option = userRepository.findByUsername(username);
        User user = option.get();
        
        List<TestUser> tests = testUserRepository.findByUserId(user.getId());
        List<TestHistoryUserResponse> responses = new ArrayList<>();

        for (TestUser test : tests) {
            TestHistoryUserResponse response = new TestHistoryUserResponse();
            log.info(test.getId());
            Test testDetail = testRepository.findById(test.getTestId()).get();
            response.setExam(testDetail.getExam());
            response.setName(testDetail.getName());
            response.setScoreRatio(test.getScoreRatio());
            response.setScore(test.getScore());
            response.setSubmitTime(test.getSubmitDay() + " " + test.getSubmitTime());
            response.setCompleted(test.isCompleted());

            responses.add(response);
        }

        return responses;
    }

}
