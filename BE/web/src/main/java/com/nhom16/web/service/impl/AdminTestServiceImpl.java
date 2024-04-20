package com.nhom16.web.service.impl;

import java.util.ArrayList;
import java.util.List;

import com.nhom16.web.dto.response.TestAdminResponse;
import com.nhom16.web.model.Question;
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
    public List<TestAdminResponse> getTests() {
        // TODO Auto-generated method stub
        var res = testRepository.findAll();
        List<TestAdminResponse> ret = new ArrayList<>();
        for(var x : res)
        {
            TestAdminResponse now = new TestAdminResponse();
            now.setTestId(x.getId());
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
//        throw new UnsupportedOperationException("Unimplemented method 'getTestDashBoard'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Test createTest(Test request) {
        // TODO Auto-generated method stub
        Test curTest = new Test();
        curTest.setExam(request.getExam());
        curTest.setName(request.getName());
        curTest.setType(request.getType());
        curTest.setStartDay(request.getStartDay());
        curTest.setEndDay(request.getEndDay());
        curTest.setStartTime(request.getStartTime());
        curTest.setDuration(request.getDuration());

        curTest.setQuestions(request.getQuestions());

        curTest.setCntStudent(request.getCntStudent());
        curTest.setMediumScore(request.getMediumScore());
        curTest.setCompletionRate(request.getCompletionRate());
        return testRepository.save(curTest);
//        throw new UnsupportedOperationException("Unimplemented method 'createTest'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Test getTest(String testId) {
        // TODO Auto-generated method stub
        var res = testRepository.findById(testId);
        Test curTest = new Test();
        if(res.isPresent()) {
            curTest = res.get();
        }
        return curTest;
//        throw new UnsupportedOperationException("Unimplemented method 'getTest'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public Test updateTest(String testId, Test request) {
        // TODO Auto-generated method stub
        var res = testRepository.findById(testId);
        Test curTest = res.get();
        curTest.setExam(request.getExam());
        curTest.setName(request.getName());
        curTest.setType(request.getType());
        curTest.setStartDay(request.getStartDay());
        curTest.setEndDay(request.getEndDay());
        curTest.setStartTime(request.getStartTime());
        curTest.setDuration(request.getDuration());

        curTest.setQuestions(request.getQuestions());

        curTest.setCntStudent(request.getCntStudent());
        curTest.setMediumScore(request.getMediumScore());
        curTest.setCompletionRate(request.getCompletionRate());
        return testRepository.save(curTest);
//        throw new UnsupportedOperationException("Unimplemented method 'updateTest'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteTest(String testId) {
        // TODO Auto-generated method stub
        var res = testRepository.findById(testId);
        if(res.isPresent())
        {
            testRepository.deleteById(testId);
            return true;
        }
        return false;
//        throw new UnsupportedOperationException("Unimplemented method 'deleteTest'");
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
