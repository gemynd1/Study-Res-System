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
    public int ViewCommunity_size(String currentCategory) {
        return communityMapper.ViewCommunity_size(currentCategory);
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
    public Boolean deleteTogetherStudyAll(int comidx) {
        return communityMapper.deleteTogetherStudyAll(comidx);
    }

    @Override
    public Boolean  insert_comment_question(int comIdx,String comment,int maxCCGroupNum,String sessionId) {
        return communityMapper.insert_comment_question(comIdx, comment, maxCCGroupNum, sessionId);
    }

    @Override
    public Boolean insert_comment_reply(int comIdx, String comment, int maxCCGroupNum, String sessionId, int currentComment, int currentCommentGroupNum) {
        return communityMapper.insert_comment_reply(comIdx, comment, maxCCGroupNum, sessionId, currentComment, currentCommentGroupNum);
    }

    @Override
    public Boolean updateComment_forSelf(String comment, int currentComment) {
        return communityMapper.updateComment_forSelf(comment, currentComment);
    }

    @Override
    public Boolean deleteComment(int comment_ccidx, int comment_ccgroupnum, int comment_comidx) {
        return communityMapper.deleteComment(comment_ccidx, comment_ccgroupnum, comment_comidx);
    }

    @Override
    public Boolean reportComment(int comment_ccidx) {
        return communityMapper.reportComment(comment_ccidx);
    }

    @Override
    public Boolean insertTogetherStudy(int comIdx, String sessionId) {
        return communityMapper.insertTogetherStudy(comIdx, sessionId);
    }

    @Override
    public Boolean deleteTogetherStudy_forPost(int comIdx, String sessionId) {
        return communityMapper.deleteTogetherStudy_forPost(comIdx, sessionId);
    }

    @Override
    @Transactional
    public Boolean deletePost_allPost(int comIdx) {
        return communityMapper.deletePost_allPost(comIdx);
    }

    @Override
    @Transactional
    public Boolean deleteComment_allPost(int comIdx) {
        return communityMapper.deleteComment_allPost(comIdx);
    }

    @Override
    @Transactional
    public Boolean deleteTogetherStudy_allPost(int comIdx) {
        return communityMapper.deleteTogetherStudy_allPost(comIdx);
    }
}
