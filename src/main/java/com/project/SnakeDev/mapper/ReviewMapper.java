package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

// import java.util.List;

@Mapper
public interface ReviewMapper {

    int InsertReview(ReviewVo reviewVo);

    int insertReviewImage(String imgVo);

    int InsertReviewTag(String Tag);

    int InsertReviewHasTag();

    List<ReviewHasTagVo> getHasTag();

    ReviewDetailsVo getReviewDetails(@Param("sridx") Integer sridx);

    List<ReviewDetailsVo> getReviewAll();


    String getMIdx(String memberId);
}   
