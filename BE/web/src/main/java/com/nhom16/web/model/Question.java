package com.nhom16.web.model;

import java.util.List;

import lombok.Data;

@Data
public class Question {
    private String questionText;
    private List<String> options;
    private String correctOption;
}
