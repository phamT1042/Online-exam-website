package com.nhom16.web.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.nhom16.web.exception.AppException;
import com.nhom16.web.exception.ErrorCode;
import com.nhom16.web.model.User;
import com.nhom16.web.repository.UserRepository;
import com.nhom16.web.response.AuthResponse;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Value("${signerKey}")
    protected String SIGNER_KEY;

    public AuthResponse auth(User request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if (!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if (!user.getRoles().equals(request.getRoles())) {
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        var token = generateToken(user);

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setUsername(request.getUsername());
        return response;
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512); // đặt thuật toán SHA512 để hash

        // data trong body (payload) JWS gọi là các claim
        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issueTime(new Date()) // thời điểm tạo token, ở đây là hiện tại
                .expirationTime(new Date( // thời gian hết hạn của token, đây là 24h
                        Instant.now().plus(24, ChronoUnit.HOURS).toEpochMilli()))
                .claim("scope", buildScope(user)) // roles
                .build();
        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes())); // Kí bằng mã hoá đối xứng key 32bytes
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Cannot create token", e);
            throw new RuntimeException(e);
        }
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(user.getRoles()))
            user.getRoles().forEach(role -> stringJoiner.add(role));

        return stringJoiner.toString();
    }
}
