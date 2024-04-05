package com.nhom16.web.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.nhom16.web.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);

    @Query("{'$or' : [{'username': {$regex: ?0, $options: 'i'}}, {'fullname': {$regex: ?0, $options: 'i'}}]}")
    List<User> findByUsernameOrFullname(String query); // tìm kiếm username hoặc fullname có chứa query
}
