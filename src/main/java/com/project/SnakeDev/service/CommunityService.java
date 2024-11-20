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

    public int ViewCommunity_size(String currentCategory);
    
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

    public Boolean insert_comment_question(int comIdx,String comment,int maxCCGroupNum,String sessionId);

    public Boolean insert_comment_reply(int comIdx, String comment,int maxCCGroupNum,String sessionId,int currentComment, int currentCommentGroupNum);

    public Boolean updateComment_forSelf(String comment, int currentComment);

    public Boolean deleteComment(int comment_ccidx, int comment_ccgroupnum, int comment_comidx);

    public Boolean reportComment(int comment_ccidx);

    public Boolean insertTogetherStudy(int comIdx, String sessionId);

    public Boolean deleteTogetherStudy_forPost(int comIdx, String sessionId);

    public Boolean deleteTogetherStudyAll(int comidx);

    public Boolean deletePost_allPost(int comIdx);

    public Boolean deleteComment_allPost(int comIdx);

    public Boolean deleteTogetherStudy_allPost(int comIdx);
}
