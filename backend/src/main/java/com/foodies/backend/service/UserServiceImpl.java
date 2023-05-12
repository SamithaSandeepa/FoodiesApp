package com.foodies.backend.service;

import com.foodies.backend.model.User;
import com.foodies.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<User> getUsers() { return userRepo.findAll();}

    @Override
    public String save(User users){
        return  userRepo.save(users).getId();
    }

    @Override
    public User updateUser(String id, User users) {
        User userVar = userRepo.findById(id).get();
        userVar.setImagePath(users.getImagePath());
        userVar.setUserName(users.getUserName());
        userVar.setAddress(users.getAddress());
        userVar.setAboutMe(users.getAboutMe());
        userVar.setPassword(users.getPassword());
        userRepo.save(userVar);
        return userVar;
    }
//    @Override
//    public User displayUserMetaData(String userId) {
//        User user = userRepo.findByUserId(userId);
//        user.setUserName(user.getUserName());
//        return user;

    @Override
    public User deleteUser(String id){
        User user = userRepo.findById(id).get();
        userRepo.delete(user);
        return user;
    }

    @Override
    public User followUser(String id, String followerId) {
        User user = userRepo.findById(id).get();
        user.getFollowers().add(followerId);
        userRepo.save(user);
        return user;
    }

}
