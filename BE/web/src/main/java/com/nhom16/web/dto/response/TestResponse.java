package com.nhom16.web.dto.response;

import lombok.Data;

@Data
public class TestResponse {
    private String testId;
    private String exam;
    private String name;
    private byte type; // 0 là tự do, 1 là có thời gian thời hạn mở đóng
    private String startDay; // ngày mở đóng
    private String endDay;
    private String startTime; // thời gian mở
    private int duration; // thời gian thi

    // Bài thi có thể vào thi trong 3 TH:
    // 1. Bài thi tự do và student chưa từng làm, ở FE có thể hiện "Vào thi"
    // 2. Bài thi tự do và student đã từng làm, FE có thể hiện "Làm lại"
    // 3. Bài thi trong thời gian mở đóng và chưa có dữ liệu
    // user này trong db (kiểm tra userId testId đã tồn tại trong db TestUser)
    private boolean canEnter; // true là có thể vào
}
