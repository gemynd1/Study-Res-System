package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.ReviewImgVo;
import com.project.SnakeDev.vo.ReviewVo;
//import com.project.SnakeDev.vo.ReviewImg;
import org.apache.ibatis.annotations.Mapper;

// import java.util.List;

@Mapper
public interface ReviewMapper {

    int InsertReview(ReviewVo reviewVo);

    int insertReviewImage(ReviewImgVo imgVo);

    // int InsertReviewImg(ReviewImgVo ReviewImgVo);
}   
