package com.nhom16.web.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.nhom16.web.dto.response.StatisticUserResponse;
import com.nhom16.web.model.Test;
import com.nhom16.web.repository.TestRepository;
import com.nhom16.web.repository.TestUserRepository;
import com.nhom16.web.service.AdminTestService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AdminTestServiceImpl implements AdminTestService {

    @Autowired
    private TestRepository testRepository;

    @Autowired
    private TestUserRepository testUserRepository;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<Test> getTests() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTestDashBoard'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Test createTest(Test request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createTest'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Test getTest(String testId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTest'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Test updateTest(String testId, Test request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateTest'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteTest(String testId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteTest'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<Test> getTestStatistic() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getTestStatistic'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<StatisticUserResponse> getStatisticUsers(String testId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getStatisticUsers'");
    }
    
}
