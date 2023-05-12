package com.foodies.backend.service;

import com.foodies.backend.model.User;

import java.util.List;

public interface UserService {
    String save(User users);

    public List<User> getUsers();

//    public User retrieveStoryByUserId(String userId);

    public User updateUser(String id , User users);

    public User deleteUser(String id );

    public User followUser(String id, String followId);
}
