package com.foodies.backend.service;

import com.foodies.backend.model.Comment;
import com.foodies.backend.model.Story;

import java.util.List;

public interface CommentService {

    public Comment save(Comment comment);
    public List<Comment> getComments();
    public Comment updateComment(String id, Comment comment);
    public Comment deleteComment(String id);
}
