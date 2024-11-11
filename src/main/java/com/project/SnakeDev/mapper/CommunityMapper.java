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

    List<CommunityVo> ViewMoreCommunity(String currentCategory, int int_ContentNumber);

    List<CommunityVo> ViewPost(String comIdx);

    List<CommunityVo> ViewComment(String comIdx, String currentPage, String commentSize);

    int ViewCommentSize(String comIdx);

    List<CommunityVo> ViewPost_forPostRewrite(String comIdx);

    List<TogetherStudyVo> ViewGroupMember_forPostRewrite(String comIdx);

    List<StudyGInfoVo> ViewStudyroom();

    Boolean updateCommunity(Map<String, Object> data);

    Boolean deleteTogetherStudy(String comIdx, List<Map<String, Object>> groupMemberInfos);
}
