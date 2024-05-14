package com.nhom16.web.service;

import java.util.Optional;

import com.nhom16.web.dto.request.ChangePasswordRequest;
import com.nhom16.web.model.User;

public interface StudentUserService {
    Optional<User> getProfile();

    User updateProfile(User request);

    String updatePassword(ChangePasswordRequest request);
}
