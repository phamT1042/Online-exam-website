package com.nhom16.web.exception;

public enum ErrorCode {
    
    USER_EXISTED(1001, "User existed"),
    USER_NOT_EXISTED(1002, "User not exist"),
    UNAUTHENTICATED(1003, "Unauthenticated"),
    PASSWORD_WRONG(1004, "Password incorrect"),
    TEST_NOT_EXIST(1005, "Test is not exist"),
    TEST_CANNOT_BE_RETAKEN(1006, "Test cannot be retaken"),
    TEST_HASNOT_BEEN_TAKEN(1006, "The test has not yet been performed"); // Bài thi chưa được làm bởi user

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

