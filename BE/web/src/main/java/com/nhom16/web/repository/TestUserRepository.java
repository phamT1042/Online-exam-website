package com.nhom16.web.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.nhom16.web.model.TestUser;
import java.util.List;


@Repository
public interface TestUserRepository extends MongoRepository<TestUser, String> {
    List<TestUser> findByUserId(String userId);
    List<TestUser> findByTestId(String testId);
    TestUser findByUserIdAndTestId(String userId, String testId);
    
    @Query(value = "{ 'userId' : ?0 }", delete = true)
    void deleteAllByUserId(String userId);

    @Query(value = "{ 'testId' : ?0 }", delete = true)
    void deleteAllByTestId(String testId);
}
