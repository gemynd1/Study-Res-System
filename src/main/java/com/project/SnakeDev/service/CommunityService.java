package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.CommunityCategoryVo;
import com.project.SnakeDev.vo.CommunityVo;

import java.util.List;
import java.util.Map;

import com.project.SnakeDev.vo.StudyGInfoVo;
import com.project.SnakeDev.vo.TogetherStudyVo;
import org.springframework.web.bind.annotation.RequestParam;

public interface CommunityService {
    public List<CommunityVo> ViewCommunity();

    public List<CommunityCategoryVo> ViewCommunityCategory();

    public List<CommunityVo> ViewCurrentCommunity(String currentCategory);
    
    public List<CommunityVo> ViewMoreCommunity(String currentCategory, int int_ContentNumber);

    public List<CommunityVo> ViewPost(String comIdx);

    public List<CommunityVo> ViewComment(String comIdx, String currentPage, String commentSize);

    public int ViewCommentSize(String comIdx);

    public List<CommunityVo> ViewPost_forPostRewrite(String comIdx);

    public List<TogetherStudyVo> ViewGroupMember_forPost(String comIdx);

    public List<TogetherStudyVo> ViewGroupMember_forPostRewrite(String comIdx);

    public List<StudyGInfoVo> ViewStudyroom();

    public Boolean updateCommunity(Map<String, Object> data);

    public Boolean deleteTogetherStudy(String comIdx, List<Map<String, Object>> groupMemberInfos);
}
