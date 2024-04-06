package com.nhom16.web.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "test-user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TestUser {
    @Id
    private String id;

    private String testId;
    private String userId;
    private String scoreRatio; // kiểu đề 40 đúng 32 thì cái này là "32/40"
    private float score; // điểm
    private List<String> choices; // danh sách lựa chọn của 1 student

    private String submitTime; // dạng dd/mm/yyyy hh:mm:ss, xử lý bên be khi tính điểm

    private boolean completed; // 1 là hoàn thành (> 4d), 0 là k
}
