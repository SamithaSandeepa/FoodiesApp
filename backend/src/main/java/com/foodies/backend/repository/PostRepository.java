package com.foodies.backend.repository;


import com.foodies.backend.model.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends MongoRepository<Post,String> {
//    void deleteById(String id);
}
