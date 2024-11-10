package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.CommunityCategoryVo;
import com.project.SnakeDev.vo.CommunityVo;
import com.project.SnakeDev.vo.StudyGInfoVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityMapper {
    List<CommunityVo> ViewCommunity();

    List<CommunityCategoryVo> ViewCommunityCategory();

    List<CommunityVo> ViewCurrentCommunity(String currentCategory);

    List<CommunityVo> ViewMoreCommunity(String currentCategory, int int_ContentNumber);

    List<CommunityVo> ViewPost(String comIdx);

    List<CommunityVo> ViewComment(String comIdx);

    List<CommunityVo> ViewPost_forPostRewrite(String comIdx);

    List<StudyGInfoVo> ViewStudyroom();
}
