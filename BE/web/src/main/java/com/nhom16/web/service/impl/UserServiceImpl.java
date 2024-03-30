package com.nhom16.web.service.impl;

import java.util.HashSet;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nhom16.web.exception.AppException;
import com.nhom16.web.exception.ErrorCode;
import com.nhom16.web.model.User;
import com.nhom16.web.repository.UserRepository;
import com.nhom16.web.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()
                || userRepository.findByEmail(request.getEmail()).isPresent())
            throw new AppException(ErrorCode.USER_EXISTED);

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        HashSet<String> roles = new HashSet<>();
        roles.add("STUDENT");
        user.setRoles(roles);

        return userRepository.save(user);
    }

    @Override
    @SuppressWarnings("null")
    public Optional<User> getUser(String username) {
        Optional<User> user = userRepository.findByUsername(username);

        if (user.isPresent())
            return user;
        throw new AppException(ErrorCode.USER_NOT_EXISTED);
    }

    @Override
    public Optional<User> getProfile() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent())
            return user;
        throw new AppException(ErrorCode.USER_NOT_EXISTED);
    }
}
