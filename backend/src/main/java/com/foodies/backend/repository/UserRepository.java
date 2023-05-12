package com.foodies.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.foodies.backend.model.User;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User,String> {
//    Optional<User> findById(String id);
}
