package com.foodies.backend.service;

import com.foodies.backend.model.Story;
import com.foodies.backend.model.User;
import com.foodies.backend.repository.StoryRepository;
import com.foodies.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoryServiceImpl implements StoryService{

    @Autowired
    private StoryRepository storyRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public Story save(Story story) {
        User user = userRepo.findById(story.getUserId()).get();
        if (user != null && user.getUserName() != null) {
            story.setUserName(user.getUserName());
        }
        return storyRepo.save(story);
    }

    @Override
    public List<Story> getStories() {
        return storyRepo.findAll();
    }

    @Override
    public Story updateStory(String id, Story story) {
        Story storyVar = storyRepo.findById(id).get();
        storyVar.setCaption(story.getCaption());
        storyVar.setPrivacy(story.isPrivacy());
        storyRepo.save(storyVar);
        return storyVar;
    }

    @Override
    public Story deleteStory(String id) {
        Story story = storyRepo.findById(id).get();
        storyRepo.delete(story);
        return story;
    }

}
