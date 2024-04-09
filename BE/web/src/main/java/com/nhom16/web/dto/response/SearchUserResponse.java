package com.nhom16.web.dto.response;

import lombok.Data;

@Data
public class SearchUserResponse {
    private String id;
    private String username;
    private String fullname;
    private long cntTest;
}
