package com.nhom16.web.dto.response;

import java.util.List;

import lombok.Data;

@Data
public class QuestionResponse {
    private String questionText;
    private List<String> options;
}
