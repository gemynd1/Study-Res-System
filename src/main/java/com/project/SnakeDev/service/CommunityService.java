package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.CommunityCategoryVo;
import com.project.SnakeDev.vo.CommunityVo;

import java.util.List;

import org.springframework.web.bind.annotation.RequestParam;

public interface CommunityService {
    public List<CommunityVo> ViewCommunity();

    public List<CommunityCategoryVo> ViewCommunityCategory();

    public List<CommunityVo> ViewCurrentCommunity(String currentCategory);
    
    public List<CommunityVo> ViewMoreCommunity(String currentCategory, int ViewMoreCommunity);

    public List<CommunityVo> ViewPost(String comIdx);

    public List<CommunityVo> ViewComment(String comIdx);

    public List<CommunityVo> ViewPost_forPostRewrite(String comIdx);
}
