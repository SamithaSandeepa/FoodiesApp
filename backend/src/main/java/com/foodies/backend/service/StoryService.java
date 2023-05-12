package com.foodies.backend.service;


import com.foodies.backend.model.Story;

import java.util.List;

public interface StoryService {

    public Story save(Story story);

    public List<Story> getStories();

    public Story updateStory(String id, Story story);

    public Story deleteStory(String id);

}
