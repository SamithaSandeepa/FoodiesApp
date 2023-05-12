package com.foodies.backend.repository;

import com.foodies.backend.model.Story;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepository extends MongoRepository<Story, String> {
}
