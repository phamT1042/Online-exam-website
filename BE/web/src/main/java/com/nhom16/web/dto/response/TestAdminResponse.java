package com.nhom16.web.dto.response;

import lombok.Data;

@Data
public class TestAdminResponse {
    private String testId;
    private String exam;
    private String name;
    private int type; // 0 là tự do, 1 là có thời gian thời hạn mở đóng
    private String startDay; // ngày mở đóng
    private String endDay;
    private String startTime; // thời gian mở
    private int duration; // thời gian thi
}
