package com.nhom16.web.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nhom16.web.exception.AppException;
import com.nhom16.web.exception.ErrorCode;
import com.nhom16.web.model.User;
import com.nhom16.web.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User request) {
        User user = new User();

        if (userRepository.findByUsername(request.getUsername()) != null || userRepository.findByEmail(request.getEmail()) != null)
            throw new AppException(ErrorCode.USER_EXISTED);

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }

    @SuppressWarnings("null")
    public User getUser(String username) {
        User user = userRepository.findByUsername(username);

        if (user != null) return user;
        throw new AppException(ErrorCode.USER_NOT_EXISTED);
    }
}
