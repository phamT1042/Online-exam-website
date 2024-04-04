package com.nhom16.web.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nhom16.web.model.TestUser;
import java.util.List;


@Repository
public interface TestUserRepository extends MongoRepository<TestUser, String> {
    List<TestUser> findByUserId(String userId);
}
