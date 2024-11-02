package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.CommunityCategoryVo;
import com.project.SnakeDev.vo.CommunityVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CommunityMapper {
    List<CommunityVo> ViewCommunity();

    List<CommunityCategoryVo> ViewCommunityCategory();

    List<CommunityVo> ViewCurrentCommunity(String currentCategory);

    List<CommunityVo> ViewPost(int int_comIdx);

}
