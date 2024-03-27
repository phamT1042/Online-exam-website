package com.nhom16.web.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL) //Khi serialize sang JSON, 
                        // field nào null sẽ không được thêm vào JSON
public class ApiResponse <T> {
    private int code = 200; // mặc định thành công
    private String message;
    private T result;
}
