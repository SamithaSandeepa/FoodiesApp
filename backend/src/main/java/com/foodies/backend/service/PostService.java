package com.foodies.backend.service;

import com.foodies.backend.model.Post;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PostService {
    public Post save(Post posts);

    public List<Post> getPosts();

    public Post updatePost(String id , Post posts);

    public String deletePost(String id);

    public Post addLikeToPost(String postId, String userId);
}
