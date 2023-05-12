package com.foodies.backend.controller;

import com.foodies.backend.model.Story;
import com.foodies.backend.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/story")
public class StoryController {
    @Autowired
    private StoryService storyService;

    @GetMapping("/all")
    public List<Story> getStories(){
        return storyService.getStories();
    }

    @PostMapping("/save")
    public Story saveStory(@RequestBody Story story){
        return storyService.save(story);
    }

    @PutMapping("/update/{id}")
    public Story update(@PathVariable String id, @RequestBody Story story){
        return storyService.updateStory(id, story);
    }

    @DeleteMapping("/delete/{id}")
    public Story delete(@PathVariable String id){
        return storyService.deleteStory(id);
    }
}
