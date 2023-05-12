package com.foodies.backend.controller;

import com.foodies.backend.model.Post;
import com.foodies.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/posts")
public class PostController {
    @Autowired
    private PostService postService;

    @GetMapping("/all")
    public List<Post> getPosts() {
        return postService.getPosts();
    }

    @PostMapping("/save")
    public Post savePost(@RequestBody Post posts){
        return postService.save(posts);
    }
    @PutMapping("/update/{id}")
    public Post update(@PathVariable String id, @RequestBody Post posts ){
        return postService.updatePost(id,posts);
    }
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable String id){
        return postService.deletePost(id);
    }
    @PutMapping("/{postId}/like/{userId}")
    public Post likePost(@PathVariable String postId, @PathVariable String userId) {
        return postService.addLikeToPost(postId, userId);
    }

}
