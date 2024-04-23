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
    // Information
    @Id
    private String id;
    private String exam;
    private String name;
    private Integer type; // 0 là tự do, 1 là có thời gian thời hạn mở đóng
    private String startTime; // ngày mở, dd/mm/yyyy hh:mm:ss
    private String endTime; // ngày đóng, dd/mm/yyyy hh:mm:ss
    private int duration; // thời gian thi, giá trị theo phút

    // Questions
    private List<Question> questions;
}
