package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.CommunityMapper;
import com.project.SnakeDev.service.CommunityService;
import com.project.SnakeDev.vo.CommunityCategoryVo;
import com.project.SnakeDev.vo.CommunityVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunityServiceImpl implements CommunityService {
    @Autowired
    private CommunityMapper communityMapper;

    @Override
    public List<CommunityVo> ViewCommunity() {
        return communityMapper.ViewCommunity();
    }

    @Override
    public List<CommunityCategoryVo> ViewCommunityCategory() {
        return communityMapper.ViewCommunityCategory();
    }

    @Override
    public List<CommunityVo> ViewCurrentCommunity(String currentCategory) {
        return communityMapper.ViewCurrentCommunity(currentCategory);
    }

    @Override
    public List<CommunityVo> ViewPost(String comIdx) {
        return communityMapper.ViewPost(comIdx);
    }

}
