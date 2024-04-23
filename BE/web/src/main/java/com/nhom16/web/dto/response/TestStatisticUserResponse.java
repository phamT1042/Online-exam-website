package com.nhom16.web.dto.response;

import lombok.Data;

@Data
public class TestStatisticUserResponse {
    private String username;
    private String fullname;
    private float score;
    private String scoreRatio; // kiểu "32/40"
    private boolean completed; // true: hoàn thành
    private String submitTime; // dd/mm/yyyy hh:mm:ss

    // Từ các score, vẽ chart phân phối điểm số và tỉ lệ hoàn thành (tròn)
}
