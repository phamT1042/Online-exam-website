package com.nhom16.web.dto.response;

import lombok.Data;

@Data
public class StatisticUserResponse {
    private String username;
    private String fullname;
    private float score;
    private String scoreRatio; // kiểu "32/40"
    private byte completed; // 0: chưa hoàn thành, 1: đã hoàn thành
    private String submitDay;
    private String submitTime;

    // Từ các score, vẽ chart phân phối điểm số
}
