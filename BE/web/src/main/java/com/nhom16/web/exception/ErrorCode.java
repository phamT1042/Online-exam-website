package com.nhom16.web.exception;

public enum ErrorCode {
    
    USER_EXISTED(1001, "User existed"),
    USER_NOT_EXISTED(1002, "User not exist"),
    UNAUTHENTICATED(1003, "Unauthenticated"),
    UNAUTHORIZED(1004, "Unauthorized"),
    PASSWORD_WRONG(1005, "Password incorrect"),
    TEST_NOT_EXIST(1006, "Test is not exist"),
    TEST_CANNOT_BE_RETAKEN(1007, "Test cannot be retaken");

    private int code;
    private String message;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }
    public String getMessage() {
        return message;
    }
}

