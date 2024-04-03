package com.nhom16.web.dto.response;

import lombok.Data;

@Data
public class TestHistoryUserResponse {
    private String exam;
    private String name;
    private String scoreRatio;
    private float score;
    private String submitDay;
    private String submitTime;
    private byte completed;
}
