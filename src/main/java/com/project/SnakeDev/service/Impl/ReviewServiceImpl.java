package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.ReviewMapper;
import com.project.SnakeDev.service.ReviewService;
//import com.project.SnakeDev.vo.ReviewImg;
import com.project.SnakeDev.vo.ReviewImgVo;
import com.project.SnakeDev.vo.ReviewVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
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

}
