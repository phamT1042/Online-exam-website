package com.nhom16.web.service;

import java.util.List;

import com.nhom16.web.dto.response.TestStatisticUserResponse;
import com.nhom16.web.dto.response.TestInformationResponse;
import com.nhom16.web.dto.response.TestStatisticResponse;
import com.nhom16.web.model.Test;

public interface AdminTestService {
    List<TestInformationResponse> getTests(); // Dung, chỉ bao gồm thông tin

    Test createTest(Test request); // Dung

    Test getTest(String testId); // Dung, hỗ trợ cho updateTest FE

    Test updateTest(String testId, Test request); // Dung

    String deleteTest(String testId); // Dung

    List<TestStatisticResponse> getTestStatistic(); // Hien, chỉ bao gồm các dữ liệu thống kê

    List<TestStatisticUserResponse> getStatisticUsers(String testId); // Hien
}
