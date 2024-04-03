package com.nhom16.web.service;

import java.util.List;

import com.nhom16.web.dto.response.StatisticUserResponse;
import com.nhom16.web.model.Test;

public interface AdminTestService {
    List<Test> getTests(); // Dung, chỉ bao gồm thông tin

    Test createTest(Test request); // Dung

    Test getTest(String testId); // Dung, hỗ trợ cho updateTest FE

    Test updateTest(String testId, Test request); // Dung

    boolean deleteTest(String testId); // Dung

    List<Test> getTestStatistic(); // Hien, chỉ bao gồm các dữ liệu thống kê

    List<StatisticUserResponse> getStatisticUsers(String testId); // Hien
}
