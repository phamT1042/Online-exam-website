package com.nhom16.web.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Document(collection = "user")
@Data
public class User {
    @Id
    private String id;

    private String username;
    private String password;
    private String email;
    private String fullName;
    private String sex;
    private String phone;
    private String address;
    private String photo;
    private String date;
}
