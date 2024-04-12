package com.nhom16.web.service.impl;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
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

        if (testFind.isEmpty())
            throw new AppException(ErrorCode.TEST_NOT_EXIST);

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
        if (testFind.isEmpty())
            throw new AppException(ErrorCode.TEST_NOT_EXIST);

        Test test = testFind.get();
        // get user with token
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        Optional<User> option = userRepository.findByUsername(username);
        User user = option.get();

        // Tính điểm
        List<Question> questions = test.getQuestions();
        int cntQuestion = questions.size();
        List<String> choices = answer.getChoices();
        int cntCorrect = 0;

        // Lấy thời gian
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        String timeNow = dtf.format(LocalDateTime.now());

        // Format date
        DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.US);
        symbols.setDecimalSeparator('.');
        DecimalFormat df1 = new DecimalFormat("0.0", symbols);
        DecimalFormat df2 = new DecimalFormat("0.00", symbols);

        for (int i = 0; i < cntQuestion; ++i)
            if (questions.get(i).getCorrectOption().equals(choices.get(i)))
                cntCorrect++;

        float score = Float.valueOf(df1.format(10 * (1.0f * cntCorrect / cntQuestion)));

        TestUser saveTestUser = testUserRepository.findByUserIdAndTestId(user.getId(), testId);

        if (saveTestUser != null) {
            if (test.getType() == 1)
                throw new AppException(ErrorCode.TEST_CANNOT_BE_RETAKEN);

            saveTestUser.setScoreRatio(String.valueOf(cntCorrect) + "/" + String.valueOf(cntQuestion));

            saveTestUser.setChoices(answer.getChoices());
            saveTestUser.setSubmitTime(timeNow);

            float allScorePrev = test.getMediumScore() * test.getCntStudent();
            float cntCompletionRatePrev = test.getCompletionRate() * test.getCntStudent();

            float allScoreNew = allScorePrev - saveTestUser.getScore() + score;
            float cntCompletionRateNew = cntCompletionRatePrev - (saveTestUser.isCompleted() ? 1 : 0)
                    + (score >= 4 ? 1 : 0);

            test.setMediumScore(Float.valueOf(df1.format(allScoreNew / test.getCntStudent())));
            test.setCompletionRate(Float.valueOf(df2.format(cntCompletionRateNew / test.getCntStudent())));
            saveTestUser.setScore(score);
            saveTestUser.setCompleted(score >= 4 ? true : false);

            testRepository.save(test);
        }

        else {
            saveTestUser = new TestUser();
            saveTestUser.setTestId(testId);
            saveTestUser.setUserId(user.getId());

            saveTestUser.setScoreRatio(String.valueOf(cntCorrect) + "/" + String.valueOf(cntQuestion));

            saveTestUser.setScore(score);

            saveTestUser.setChoices(answer.getChoices());
            saveTestUser.setCompleted(score >= 4 ? true : false);

            saveTestUser.setSubmitTime(timeNow);

            if (test.getCntStudent() == 0) {
                test.setCntStudent(1);
                test.setMediumScore(score);
                if (score >= 4)
                    test.setCompletionRate(1);
                else
                    test.setCompletionRate(0);
            } else {
                int cntStudentPrev = test.getCntStudent();

                float mediumScorePrev = test.getMediumScore();
                float completionRatePrev = test.getCompletionRate();

                float mediumScoreNew = Float
                        .valueOf(df1.format((mediumScorePrev * cntStudentPrev + score) / (cntStudentPrev + 1)));
                float completionRateNew = Float.valueOf(df2
                        .format((completionRatePrev * cntStudentPrev + (score >= 4 ? 1 : 0)) / (cntStudentPrev + 1)));

                test.setMediumScore(mediumScoreNew);
                test.setCompletionRate(completionRateNew);
                test.setCntStudent(cntStudentPrev + 1);
            }

            testRepository.save(test);
        }

        return testUserRepository.save(saveTestUser);
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