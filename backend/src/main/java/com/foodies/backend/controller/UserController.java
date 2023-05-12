package com.foodies.backend.controller;

import com.foodies.backend.model.User;
import com.foodies.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserService userService;

//    @GetMapping("/sec")
//    public ResponseEntity<String>  hellosecurity() { return ResponseEntity.ok("Bye Bye sec");}

    @GetMapping("/all")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/save")
    public String saveUser(@RequestBody User users){
        return userService.save(users);
    }

    @PutMapping("/update/{id}")
    public User update(@PathVariable String id,@RequestBody User user ){
        return userService.updateUser(id,user);
    }

    @DeleteMapping("/delete/{id}")
    public User delete(@PathVariable String id){
        return userService.deleteUser(id);
    }

    @PutMapping("/follow/{userId}")
    public User followUser(@PathVariable String userId, @RequestBody String followerId) {
        return userService.followUser(userId, followerId);
    }
}
