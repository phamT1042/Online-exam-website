package com.nhom16.web.dto.response;

import java.util.List;

import lombok.Data;

@Data
public class TestDetailResponse {
    private List<QuestionResponse> questions;
    private int duration;
}
