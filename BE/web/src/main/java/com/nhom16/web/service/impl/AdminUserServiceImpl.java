package com.nhom16.web.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.nhom16.web.dto.response.SearchUserResponse;
import com.nhom16.web.model.User;
import com.nhom16.web.repository.TestRepository;
import com.nhom16.web.repository.TestUserRepository;
import com.nhom16.web.repository.UserRepository;
import com.nhom16.web.service.AdminUserService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AdminUserServiceImpl implements AdminUserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestUserRepository testUserRepository;

    @Autowired
    private TestRepository testRepository;

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getUsers() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUsers'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public User getUserById(String userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserById'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public User createUser(User request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'createUser'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public User updateUser(String userId, User request) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public boolean deleteUser(String userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public SearchUserResponse getUserByUsernameAndFullname(String username, String fullname) {
        // Optional<User> user = userRepository.findByUsername(username);

        // if (user.isPresent())
        //     return user;
        // throw new AppException(ErrorCode.USER_NOT_EXISTED);
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserByUsernameAndFullname'");
    }
    
}
