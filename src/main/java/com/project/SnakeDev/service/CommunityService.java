package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.CommunityCategoryVo;
import com.project.SnakeDev.vo.CommunityVo;

import java.util.List;

public interface CommunityService {
    public List<CommunityVo> ViewCommunity();

    public List<CommunityCategoryVo> ViewCommunityCategory();

    public List<CommunityVo> ViewCurrentCommunity(String currentCategory);

    public List<CommunityVo> ViewPost(String comIdx);

    public List<CommunityVo> ViewComment(String comIdx);
}
