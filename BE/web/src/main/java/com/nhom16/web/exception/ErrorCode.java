package com.nhom16.web.exception;

public enum ErrorCode {
    
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error"),
    USER_EXISTED(1001, "User existed"),
    USER_NOT_EXISTED(1002, "User not exist"),
    UNAUTHENTICATED(1003, "Unauthenticated");

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

