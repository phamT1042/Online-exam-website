package com.nhom16.web.dto.response;

import java.util.List;

import com.nhom16.web.model.Question;

import lombok.Data;

@Data
public class TestResultResponse {
    private String scoreRatio; // kiểu đề 40 đúng 32 thì cái này là "32/40"
    private float score; // điểm
    private List<String> choices; // danh sách lựa chọn của student
    private List<Question> questions; //
    private byte completed; // 1 là hoàn thành (> 4d), 0 là k
}
