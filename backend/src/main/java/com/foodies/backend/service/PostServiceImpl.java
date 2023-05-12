package com.foodies.backend.service;

import com.foodies.backend.model.Post;
import com.foodies.backend.model.User;
import com.foodies.backend.repository.PostRepository;
import com.foodies.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService{
    @Autowired
    private PostRepository postRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<Post> getPosts() {
        return postRepo.findAll();
    }

    @Override
    public Post updatePost(String id, Post posts) {
        Post postvar = postRepo.findById(id).get();
        postvar.setCaption(posts.getCaption());
//        postvar.setLikeCount(posts.getLikeCount());
        postRepo.save(postvar);
        return postvar;
    }
    
    @Override
    public String deletePost(String id){
        Optional<Post> postData = postRepo.findById(id);
        postRepo.deleteById(id);
        return id;
//        if(postData.isPresent()){
//            postRepo.deleteById(id);
//            return  "true";
//        }else {
//            return "post not found";
//        }
//        postRepo.delete(post);
//        return "asdas";
    }

    @Override
    public Post save(Post posts) {
        User user = userRepo.findById(posts.getUserId()).get();
        if(user != null && user.getUserName() != null){
            posts.setUserName(user.getUserName());
        }
        postRepo.save(posts);
       return posts;
    }
}
