package com.nhom16.web.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.nhom16.web.model.Test;

@Repository
public interface TestRepository extends MongoRepository<Test, String> {
    
}
