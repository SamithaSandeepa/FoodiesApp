package com.foodies.backend.service;

import com.foodies.backend.model.Comment;
import com.foodies.backend.model.Story;
import com.foodies.backend.model.User;
import com.foodies.backend.repository.CommentRepository;
import com.foodies.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepo;


    @Override
    public List<Comment> getComments() {
        return commentRepository.findAll();
    }

    @Override
    public Comment updateComment(String id, Comment comment) {
        Comment comment_var = commentRepository.findById(id).get();
        comment_var.setCommentBody(comment.getCommentBody());

        return commentRepository.save(comment_var);
    }

    @Override
    public Comment save(Comment comment) {
        User user = userRepo.findById(comment.getUserId()).get();
        if (user != null && user.getUserName() != null) {
            comment.setUserName(user.getUserName());
        }
        return commentRepository.save(comment);
    }

    @Override
    public Comment deleteComment(String id) {
        Comment comment = commentRepository.findById(id).get();
        commentRepository.delete(comment);
        return comment;
    }
}
