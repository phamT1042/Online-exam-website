package com.nhom16.web.service;

import java.util.List;

import com.nhom16.web.dto.response.SearchUserResponse;
import com.nhom16.web.model.User;

public interface AdminUserService {
    List<User> getUsers(); // Dung

    User getUserById(String userId); // Dung

    User createUser(User request); // Dung

    User updateUser(String userId, User request); // Dung

    boolean deleteUser(String userId); // Dung

    SearchUserResponse getUserByUsernameAndFullname(String username, String fullname);
}
