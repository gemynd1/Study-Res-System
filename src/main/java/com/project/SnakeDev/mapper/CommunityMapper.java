package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.CommunityCategoryVo;
import com.project.SnakeDev.vo.CommunityVo;
import com.project.SnakeDev.vo.StudyGInfoVo;
import com.project.SnakeDev.vo.TogetherStudyVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface CommunityMapper {
    List<CommunityVo> ViewCommunity();

    List<CommunityCategoryVo> ViewCommunityCategory();

    List<CommunityVo> ViewCurrentCommunity(String currentCategory);

    int ViewCommunity_size(String currentCategory);

    List<CommunityVo> ViewMoreCommunity(String currentCategory, int int_ContentNumber);

    List<CommunityVo> ViewPost(String comIdx);

    List<CommunityVo> ViewComment(String comIdx, String currentPage, String commentSize);

    int ViewCommentSize(String comIdx);

    List<CommunityVo> ViewPost_forPostRewrite(String comIdx);

    List<TogetherStudyVo> ViewGroupMember_forPost(String comIdx);

    List<TogetherStudyVo> ViewGroupMember_forPostRewrite(String comIdx);

    List<StudyGInfoVo> ViewStudyroom();

    Boolean updateCommunity(Map<String, Object> data);

    Boolean deleteTogetherStudy(String comIdx, List<Map<String, Object>> groupMemberInfos);

    Boolean insert_comment_question(int comIdx,String comment,int maxCCGroupNum,String sessionId);

    Boolean insert_comment_reply(int comIdx, String comment,int maxCCGroupNum,String sessionId,int currentComment, int currentCommentGroupNum);

    Boolean updateComment_forSelf(String comment, int currentComment);

    Boolean deleteComment(int comment_ccidx, int comment_ccgroupnum, int comment_comidx);

    Boolean reportComment(int comment_ccidx);

    Boolean insertTogetherStudy(int comIdx, String sessionId);

    Boolean deleteTogetherStudy_forPost(int comIdx, String sessionId);

    Boolean deleteTogetherStudyAll(int comidx);

    Boolean deletePost_allPost(int comIdx);

    Boolean deleteComment_allPost(int comIdx);

    Boolean deleteTogetherStudy_allPost(int comIdx);
}
