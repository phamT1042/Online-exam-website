package com.nhom16.web.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.nhom16.web.exception.AppException;
import com.nhom16.web.exception.ErrorCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.nhom16.web.dto.response.TestStatisticUserResponse;
import com.nhom16.web.dto.response.TestInformationResponse;
import com.nhom16.web.dto.response.TestStatisticResponse;
import com.nhom16.web.model.Test;
import com.nhom16.web.model.TestUser;
import com.nhom16.web.model.User;
import com.nhom16.web.repository.TestRepository;
import com.nhom16.web.repository.TestUserRepository;
import com.nhom16.web.repository.UserRepository;
import com.nhom16.web.service.AdminTestService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AdminTestServiceImpl implements AdminTestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private TestUserRepository testUserRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<TestInformationResponse> getTests() {
        var res = testRepository.findAll();
        List<TestInformationResponse> ret = new ArrayList<>();
        for (var x : res) {
            TestInformationResponse now = new TestInformationResponse();
            now.setId(x.getId());
            now.setExam(x.getExam());
            now.setName(x.getName());
            now.setType(x.getType());
            now.setStartDay(x.getStartDay());
            now.setEndDay(x.getEndDay());
            now.setStartTime(x.getStartTime());
            now.setDuration(x.getDuration());
            ret.add(now);
        }
        return ret;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Test getTest(String testId) {
        var res = testRepository.findById(testId);
        if (res.isEmpty())
            throw new AppException(ErrorCode.TEST_NOT_EXIST);
        return res.get();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Test createTest(Test request) {
        Test curTest = new Test();
        curTest.setExam(request.getExam());
        curTest.setName(request.getName());
        curTest.setType(request.getType());
        curTest.setDuration(request.getDuration());
        curTest.setQuestions(request.getQuestions());

        if (request.getStartDay() != null)
            curTest.setStartDay(request.getStartDay());
        if (request.getEndDay() != null)
            curTest.setEndDay(request.getEndDay());
        if (request.getStartTime() != null)
            curTest.setStartTime(request.getStartTime());

        return testRepository.save(curTest);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Test updateTest(String testId, Test request) {
        var res = testRepository.findById(testId);
        Test curTest = res.get();

        if (request.getExam() != null)
            curTest.setExam(request.getExam());
        if (request.getName() != null)
            curTest.setName(request.getName());

        if (request.getType() != null) {
            curTest.setType(request.getType());
            if (request.getType() == 0) {
                curTest.setStartDay(null);
                curTest.setEndDay(null);
                curTest.setStartTime(null);
            }
        }

        if (request.getStartDay() != null)
            curTest.setStartDay(request.getStartDay());
        if (request.getEndDay() != null)
            curTest.setEndDay(request.getEndDay());
        if (request.getStartTime() != null)
            curTest.setStartTime(request.getStartTime());
        if (request.getDuration() != 0)
            curTest.setDuration(request.getDuration());
        if (request.getQuestions() != null)
            curTest.setQuestions(request.getQuestions());

        log.info("Xin chao" + String.valueOf(request.getType()));

        return testRepository.save(curTest);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteTest(String testId) {
        var res = testRepository.findById(testId);
        if (res.isPresent()) {
            String name = res.get().getName();

            testUserRepository.deleteAllByTestId(testId);
            testRepository.deleteById(testId);

            return "Xoá bài thi " + name + " thành công";
        }
        throw new AppException(ErrorCode.TEST_NOT_EXIST);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<TestStatisticResponse> getTestStatistic() {
        List<TestStatisticResponse> statisticTests = new ArrayList<>();

        List<Test> tests = testRepository.findAll();

        for (Test test : tests) {
            TestStatisticResponse statisticTest = new TestStatisticResponse();
            statisticTest.setId(test.getId());
            statisticTest.setExam(test.getExam());
            statisticTest.setName(test.getName());
            statisticTest.setMediumScore(test.getMediumScore());
            statisticTest.setCompletionRate(test.getCompletionRate());
            statisticTest.setCntStudent(test.getCntStudent());
            statisticTests.add(statisticTest);
        }

        return statisticTests;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<TestStatisticUserResponse> getStatisticUsers(String testId) {
        List<TestStatisticUserResponse> statisticUserResponses = new ArrayList<>();

        List<TestUser> testUsers = testUserRepository.findByTestId(testId);

        for (TestUser testUser : testUsers) {
            TestStatisticUserResponse statisticUserResponse = new TestStatisticUserResponse();
            Optional<User> UserOptional = userRepository.findById(testUser.getUserId());
            User curUser = UserOptional.get();
            statisticUserResponse.setUsername(curUser.getUsername());
            statisticUserResponse.setFullname(curUser.getFullName());
            statisticUserResponse.setScore(testUser.getScore());
            statisticUserResponse.setScoreRatio(testUser.getScoreRatio());
            statisticUserResponse.setCompleted(testUser.isCompleted());
            statisticUserResponse.setSubmitTime(testUser.getSubmitTime());
            statisticUserResponses.add(statisticUserResponse);
        }

        return statisticUserResponses;
    }

}
