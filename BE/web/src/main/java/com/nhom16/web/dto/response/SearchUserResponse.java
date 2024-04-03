package com.nhom16.web.dto.response;

import java.util.List;

import com.nhom16.web.model.Question;

import lombok.Data;

@Data
public class SearchUserResponse {
    // Nháp
    private String username;
    private String fullname;
    private String exam;
    private String name;
    private String scoreRatio;
    private float score;
    private String submitDay;
    private String submitTime;
    private byte completed;
    private List<Question> questions;
    private List<String> choices;
}
