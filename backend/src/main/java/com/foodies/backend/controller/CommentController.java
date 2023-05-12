package com.foodies.backend.controller;

import com.foodies.backend.model.Comment;
import com.foodies.backend.model.Story;
import com.foodies.backend.service.CommentService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/save")
    public Comment saveComment(@RequestBody Comment comment) {
        return commentService.save(comment);
    }

    @GetMapping("/all")
    public List<Comment> getAllComments() {
        return commentService.getComments();
    }

    @PutMapping("/update/{id}")
    public Comment updateComment(@PathVariable String id, @RequestBody Comment comment) {
        return commentService.updateComment(id, comment);
    }

    @DeleteMapping("/delete/{id}")
    public Comment delete(@PathVariable String id){
        return commentService.deleteComment(id);
    }

}
