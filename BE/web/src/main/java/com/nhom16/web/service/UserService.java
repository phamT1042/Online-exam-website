package com.nhom16.web.service;

import java.util.Optional;

import com.nhom16.web.model.User;

public interface UserService {
    User createUser(User request);
    Optional<User> getUser(String username);
    Optional<User> getProfile();
}
