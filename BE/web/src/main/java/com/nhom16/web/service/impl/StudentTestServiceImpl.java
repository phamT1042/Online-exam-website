package com.nhom16.web.service.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.nhom16.web.dto.response.QuestionResponse;
import com.nhom16.web.dto.response.TestDetailResponse;
import com.nhom16.web.dto.response.TestHistoryUserResponse;
import com.nhom16.web.dto.response.TestResponse;
import com.nhom16.web.dto.response.TestResultResponse;
import com.nhom16.web.exception.AppException;
import com.nhom16.web.exception.ErrorCode;
import com.nhom16.web.model.Answer;
import com.nhom16.web.model.Question;
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
        Optional<Test> testFind = testRepository.findById(testId);

        if (testFind.isEmpty()) throw new AppException(ErrorCode.EXAM_NOT_EXITS);

        Test test = testFind.get();

        TestDetailResponse response = new TestDetailResponse();

        response.setName(test.getName());
        response.setDuration(test.getDuration());

        List<QuestionResponse> questionResponses = new ArrayList<>(); // lay cac cau hoi khong chua dap an
        List<Question> questions = test.getQuestions();
        for (Question question : questions) {
            QuestionResponse questionNotHaveAnswer = new QuestionResponse();
            questionNotHaveAnswer.setQuestionText(question.getQuestionText());
            questionNotHaveAnswer.setOptions(question.getOptions());
            questionResponses.add(questionNotHaveAnswer);
        }

        response.setQuestions(questionResponses);

        return response;
    }

    @Override
    public TestUser calcScore(String testId, Answer answer) {
        Optional<Test> testFind = testRepository.findById(testId);
        if (testFind.isEmpty()) throw new AppException(ErrorCode.EXAM_NOT_EXITS);

        Test test = testFind.get();
        // get user with token
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        Optional<User> option = userRepository.findByUsername(username);
        User user = option.get();

        List<Question> questions = test.getQuestions();
        int cntQuestion = questions.size();
        List<String> choices = answer.getChoices();
        int cntCorrect = 0;
        
        for (int i = 0; i < cntQuestion; ++i) 
            if (questions.get(i).getCorrectOption().equals(choices.get(i))) cntCorrect++;
        
        TestUser saveTestUser = new TestUser();
        saveTestUser.setTestId(testId);
        saveTestUser.setUserId(user.getId());

        saveTestUser.setScoreRatio(String.valueOf(cntCorrect) + "/" + String.valueOf(cntQuestion));
        
        DecimalFormat df = new DecimalFormat("#.0");
        float score = Float.valueOf(df.format(1.0f * cntCorrect / cntQuestion));
        saveTestUser.setScore(score);

        saveTestUser.setChoices(answer.getChoices());
        saveTestUser.setCompleted(score >= 4 ? true : false);

        


        return saveTestUser;
    }

    @Override
    public TestResultResponse getResult(String testId) {
        // get user with token
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        Optional<User> option = userRepository.findByUsername(username);
        User user = option.get();

        TestResultResponse response = new TestResultResponse();

        TestUser testUser = testUserRepository.findByUserIdAndTestId(user.getId(), testId);
        Test testDetail = testRepository.findById(testId).get();
        User userDetail = userRepository.findById(user.getId()).get();

        response.setUsername(userDetail.getUsername());
        response.setFullName(userDetail.getFullName());
        response.setExam(testDetail.getExam());
        response.setName(testDetail.getName());
        response.setScoreRatio(testUser.getScoreRatio());
        response.setScore(testUser.getScore());
        response.setChoices(testUser.getChoices());
        response.setCompleted(testUser.isCompleted());
        response.setQuestions(testDetail.getQuestions());

        return response;
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
            Test testDetail = testRepository.findById(test.getTestId()).get();
            response.setId(testDetail.getId());
            response.setExam(testDetail.getExam());
            response.setName(testDetail.getName());
            response.setScoreRatio(test.getScoreRatio());
            response.setScore(test.getScore());
            response.setSubmitTime(test.getSubmitTime());
            response.setCompleted(test.isCompleted());

            responses.add(response);
        }

        return responses;
    }

}
