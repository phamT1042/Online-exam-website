package com.nhom16.web.model;

import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
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
    private String date;
    private Set<String> roles; // ADMIN - STUDENT
}
