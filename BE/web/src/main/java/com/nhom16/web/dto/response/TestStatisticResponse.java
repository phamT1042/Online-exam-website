package com.nhom16.web.dto.response;

import lombok.Data;

@Data
public class TestStatisticResponse {
    private String id;
    private String exam;
    private String name;

    // Statistics
    private int cntStudent = 0; // số học sinh đã tham gia
    private float mediumScore = 0; // điểm trung bình tất cả hs tham gia
    private float completionRate = 0; // tỉ lệ hoàn thành (số hs >= 4 điểm)
}
