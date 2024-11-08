package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.ReviewVo;
//import com.project.SnakeDev.vo.ReviewImg;
import org.apache.ibatis.annotations.Mapper;

// import java.util.List;

@Mapper
public interface ReviewMapper {

//    Integer findMidxByUserName(String memberName);

    int InsertReview(ReviewVo reviewVo);
//
//    void insertReviewImage(Integer sriimgidx, String sriimg);
//
//    Integer findTagIdByContent(String tagContent);
//
//    void insertReviewTag(Integer srIdx, Integer tagId);
//
    // 새로운 태그 삽입 메서드 추가
//    void insertTag(String tagContent);

//    ReviewVo findById(Integer id);

//    void insertReviewImg(ReviewImg reviewImg);


}   
