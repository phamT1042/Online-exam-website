package com.nhom16.web.service;

import java.util.Optional;

import com.nhom16.web.dto.request.ChangePasswordRequest;
import com.nhom16.web.model.User;

public interface StudentUserService {
    User createUser(User request);

    Optional<User> getProfile();

    User updateProfile(User request);

    boolean updatePassword(ChangePasswordRequest request);
}
