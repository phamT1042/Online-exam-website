package com.nhom16.web.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nhom16.web.dto.request.ChangePasswordRequest;
import com.nhom16.web.exception.AppException;
import com.nhom16.web.exception.ErrorCode;
import com.nhom16.web.model.User;
import com.nhom16.web.repository.UserRepository;
import com.nhom16.web.service.StudentUserService;

@Service
public class StudentUserServiceImpl implements StudentUserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<User> getProfile() {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent())
            return user;
        throw new AppException(ErrorCode.USER_NOT_EXISTED);
    }

    @Override
    public User updateProfile(User request) {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        Optional<User> option = userRepository.findByUsername(username);
        User user = option.get();

        if (request.getFullName() != null)
            user.setFullName(request.getFullName());
        if (request.getPhone() != null)
            user.setPhone(request.getPhone());
        if (request.getDate() != null)
            user.setDate(request.getDate());
        if (request.getSex() != null)
            user.setSex(request.getSex());
        if (request.getAddress() != null)
            user.setAddress(request.getAddress());

        if (request.getEmail() != null) {
            if (!user.getEmail().equals(request.getEmail())) {
                if (userRepository.findByEmail(request.getEmail()).isPresent())
                    throw new AppException(ErrorCode.USER_EXISTED);
                user.setEmail(request.getEmail());
            }
        }

        return userRepository.save(user);
    }

    @Override
    public String updatePassword(ChangePasswordRequest request) {
        var context = SecurityContextHolder.getContext();
        String username = context.getAuthentication().getName();

        Optional<User> option = userRepository.findByUsername(username);
        User user = option.get();

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean matched = passwordEncoder.matches(request.getOldPassword(), user.getPassword());

        if (!matched)
            throw new AppException(ErrorCode.PASSWORD_WRONG);

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        return "Cập nhật mật khẩu cho username: " + username + " thành công";
    }

}
