package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.CommunityMapper;
import com.project.SnakeDev.service.CommunityService;
import com.project.SnakeDev.vo.CommunityCategoryVo;
import com.project.SnakeDev.vo.CommunityVo;
import com.project.SnakeDev.vo.StudyGInfoVo;
import com.project.SnakeDev.vo.TogetherStudyVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

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
    public List<CommunityVo> ViewMoreCommunity(String currentCategory, int int_ContentNumber) {
        return communityMapper.ViewMoreCommunity(currentCategory, int_ContentNumber);
    }

    @Override
    public List<CommunityVo> ViewPost(String comIdx) {
        return communityMapper.ViewPost(comIdx);
    }

    @Override
    public List<CommunityVo> ViewComment(String comIdx, String currentPage, String commentSize) {
        return communityMapper.ViewComment(comIdx, currentPage, commentSize);
    }

    @Override
    public int ViewCommentSize(String comIdx) {
        return communityMapper.ViewCommentSize(comIdx);
    }

    @Override
    public List<CommunityVo> ViewPost_forPostRewrite(String comIdx) {
        return communityMapper.ViewPost_forPostRewrite(comIdx);
    }

    public List<TogetherStudyVo> ViewGroupMember_forPost(String comIdx) {
        return communityMapper.ViewGroupMember_forPost(comIdx);
    }

    @Override
    public List<TogetherStudyVo> ViewGroupMember_forPostRewrite(String comIdx) {
        return communityMapper.ViewGroupMember_forPostRewrite(comIdx);
    }

    @Override
    public List<StudyGInfoVo> ViewStudyroom() {
        return communityMapper.ViewStudyroom();
    }

    @Override
    public Boolean updateCommunity(Map<String, Object> data) {
        return communityMapper.updateCommunity(data);
    }

    @Override
    public Boolean deleteTogetherStudy(String comIdx, List<Map<String, Object>> groupMemberInfos) {
        return communityMapper.deleteTogetherStudy(comIdx, groupMemberInfos);
    }

    @Override
    public Boolean  insert_comment_question(int comIdx,String comment,int maxCCGroupNum,String sessionId) {
        return communityMapper.insert_comment_question(comIdx, comment, maxCCGroupNum, sessionId);
    }
}
