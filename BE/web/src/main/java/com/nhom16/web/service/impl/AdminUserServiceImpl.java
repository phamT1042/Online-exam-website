package com.nhom16.web.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.nhom16.web.dto.response.SearchUserResponse;
import com.nhom16.web.dto.response.TestHistoryUserResponse;
import com.nhom16.web.dto.response.TestResultResponse;
import com.nhom16.web.exception.AppException;
import com.nhom16.web.exception.ErrorCode;
import com.nhom16.web.model.Test;
import com.nhom16.web.model.TestUser;
import com.nhom16.web.model.User;
import com.nhom16.web.repository.TestRepository;
import com.nhom16.web.repository.TestUserRepository;
import com.nhom16.web.repository.UserRepository;
import com.nhom16.web.service.AdminUserService;

@Service
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestUserRepository testUserRepository;

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getUsers() {
        Query query = new Query();
        query.addCriteria(
                new Criteria().andOperator(
                        Criteria.where("roles").nin("ADMIN")));
        List<User> users = mongoTemplate.find(query, User.class);

        return users;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public User getUserById(String userId) {
        var res = userRepository.findById(userId);
        if (res.isEmpty())
            throw new AppException(ErrorCode.USER_NOT_EXISTED);
        return res.get();
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public User createUser(User request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()
                || userRepository.findByEmail(request.getEmail()).isPresent())
            throw new AppException(ErrorCode.USER_EXISTED);

        User curUser = new User();

        curUser.setUsername(request.getUsername());
        curUser.setEmail(request.getEmail());

        if (request.getFullName() != null)
            curUser.setFullName(request.getFullName());
        if (request.getSex() != null)
            curUser.setSex(request.getSex());
        if (request.getPhone() != null)
            curUser.setPhone(request.getPhone());
        if (request.getAddress() != null)
            curUser.setAddress(request.getAddress());
        if (request.getDate() != null)
            curUser.setDate(request.getDate());

        if (request.getRoles() != null)
            curUser.setRoles(request.getRoles());
        else {
            HashSet<String> roles = new HashSet<>();
            roles.add("STUDENT");
            curUser.setRoles(roles);
        }

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        curUser.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(curUser);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public User updateUser(String userId, User request) {
        var res = userRepository.findById(userId);
        User curUser = res.get();

        if (request.getUsername() != null && request.getUsername() != curUser.getUsername()) {
            if (userRepository.findByUsername(request.getUsername()).isPresent())
                throw new AppException(ErrorCode.USER_EXISTED);
            else
                curUser.setUsername(request.getUsername());
        }
        if (request.getEmail() != null && request.getEmail() != curUser.getEmail()) {
            if (userRepository.findByEmail(request.getEmail()).isPresent())
                throw new AppException(ErrorCode.USER_EXISTED);
            else
                curUser.setEmail(request.getEmail());
        }
        if (request.getPassword() != null) {
            PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
            curUser.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if (request.getFullName() != null)
            curUser.setFullName(request.getFullName());
        if (request.getSex() != null)
            curUser.setSex(request.getSex());
        if (request.getPhone() != null)
            curUser.setPhone(request.getPhone());
        if (request.getAddress() != null)
            curUser.setAddress(request.getAddress());
        if (request.getDate() != null)
            curUser.setDate(request.getDate());
        if (request.getRoles() != null)
            curUser.setRoles(request.getRoles());

        return userRepository.save(curUser);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteUser(String userId) {
        var res = userRepository.findById(userId);
        if (res.isPresent()) {
            String username = res.get().getUsername();

            testUserRepository.deleteAllByUserId(userId);
            userRepository.deleteById(userId);

            return "Xoá user có username: " + username + " thành công";
        }
        throw new AppException(ErrorCode.USER_NOT_EXISTED);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<SearchUserResponse> getUserForSearch(String name) {
        Query query = new Query();
        query.addCriteria(
                new Criteria().andOperator(
                        Criteria.where("roles").nin("ADMIN"),
                        new Criteria().orOperator(
                                Criteria.where("fullName").regex(name, "i"),
                                Criteria.where("username").regex(name, "i"))));
        List<User> users = mongoTemplate.find(query, User.class);

        if (users.isEmpty())
            throw new AppException(ErrorCode.USER_NOT_EXISTED);

        List<SearchUserResponse> searchUsers = new ArrayList<SearchUserResponse>();

        for (User user : users) {
            SearchUserResponse searchUser = new SearchUserResponse();
            searchUser.setId(user.getId());
            searchUser.setUsername(user.getUsername());
            searchUser.setFullname(user.getFullName());

            Query countQuery = new Query();
            countQuery.addCriteria(Criteria.where("userId").is(user.getId()));
            long count = mongoTemplate.count(countQuery, TestUser.class);

            searchUser.setCntTest(count);
            searchUsers.add(searchUser);
        }

        return searchUsers;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<TestHistoryUserResponse> getHistoryUser(String userId) {
        List<TestUser> tests = testUserRepository.findByUserId(userId);
        List<TestHistoryUserResponse> responses = new ArrayList<>();

        for (TestUser test : tests) {
            TestHistoryUserResponse response = new TestHistoryUserResponse();
            Test testDetail = testRepository.findById(test.getTestId()).get();
            response.setId(testDetail.getId());
            response.setExam(testDetail.getExam());
            response.setName(testDetail.getName());
            response.setScore(test.getScore());
            response.setSubmitTime(test.getSubmitTime());
            response.setCompleted(test.isCompleted());

            responses.add(response);
        }

        return responses;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public TestResultResponse getHistoryDetailUser(String userId, String testId) {
        TestResultResponse response = new TestResultResponse();

        TestUser test = testUserRepository.findByUserIdAndTestId(userId, testId);
        Test testDetail = testRepository.findById(testId).get();
        User userDetail = userRepository.findById(userId).get();

        response.setUsername(userDetail.getUsername());
        response.setFullName(userDetail.getFullName());
        response.setExam(testDetail.getExam());
        response.setName(testDetail.getName());
        response.setScoreRatio(test.getScoreRatio());
        response.setScore(test.getScore());
        response.setChoices(test.getChoices());
        response.setCompleted(test.isCompleted());
        response.setQuestions(testDetail.getQuestions());

        return response;
    }

}
