package com.nhom16.web.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "test")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Test {
    @Id
    private String id;

    private String exam;
    private String name;
    private int type; // 0 là tự do, 1 là có thời gian thời hạn mở đóng
    private String startDay; // ngày mở đóng
    private String endDay;
    private String startTime; // thời gian mở
    private int duration; // thời gian thi, giá trị theo phút

    private List<Question> questions;

    private int cntStudent; // số học sinh đã tham gia
    private float mediumScore; // điểm trung bình tất cả hs tham gia
    private float completionRate; // tỉ lệ hoàn thành (số hs trên 4 điểm)
}
