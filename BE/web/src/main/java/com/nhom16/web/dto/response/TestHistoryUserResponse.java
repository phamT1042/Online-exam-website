package com.nhom16.web.dto.response;

import lombok.Data;

@Data
public class TestHistoryUserResponse {
    private String exam;
    private String name;
    private String scoreRatio;
    private float score;
    private String submitTime; //dd/mm/yyyy hh:mm:ss
    private boolean completed;
}
