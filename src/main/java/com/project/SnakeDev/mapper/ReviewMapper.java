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

    List<ReviewVo> getAllReviews();
    List<ReviewImgVo> getImage();
    List<ReviewTagVo> getTagList();
    List<ReviewHasTagVo> getHasTag();

    // List<ReviewGetAll> getAllHasTag(@Param("srIdx") String srIdx);

    int InsertReviewImg(ReviewImgVo ReviewImgVo);


    ReviewDetailsVo getReviewDetails(@Param("sridx") Integer sridx);

    List<ReviewDetailsVo> getReviewAll();



}   
