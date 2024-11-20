package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.ReviewMapper;
import com.project.SnakeDev.service.ReviewService;
//import com.project.SnakeDev.vo.ReviewImg;
import com.project.SnakeDev.vo.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewMapper reviewMapper;

    @Override
    @Transactional
    public int InsertReview(ReviewVo reviewVo){
        return reviewMapper.InsertReview(reviewVo);
    }

    @Override
    @Transactional
    public int insertReviewImage(String sriImg) {
        return reviewMapper.insertReviewImage(sriImg);
    }

    @Override
    @Transactional
    public int InsertReviewTag(String TSHTLContent){
        return reviewMapper.InsertReviewTag(TSHTLContent);
    }

    @Override
    @Transactional
    public  int InsertReviewHasTag(){
        return reviewMapper.InsertReviewHasTag();
    }

    @Override
    @Transactional
    public List<ReviewVo> getAllReviews() {
        return reviewMapper.getAllReviews();
    }
    @Override
    @Transactional
    public List<ReviewImgVo> getImage() {
        return reviewMapper.getImage();
    }
    @Override
    @Transactional
    public List<ReviewTagVo> getTagList() {
        return reviewMapper.getTagList();
    }
    @Override
    @Transactional
    public List<ReviewHasTagVo> getHasTag() {
        return reviewMapper.getHasTag();
    }

//    @Override
//    @Transactional
//    public List<ReviewVo> getAllReviews1(String srIdx) {
//        return reviewMapper.getAllReviews1(srIdx);
//    }

    @Override
    public ReviewDetailsVo getReviewDetails(Integer sridx) {
        return reviewMapper.getReviewDetails(sridx);
    }

    @Override
    @Transactional
    public List<ReviewDetailsVo> getReviewAll(){
        return reviewMapper.getReviewAll();
    }
}
