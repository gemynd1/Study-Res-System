package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.ReviewImgVo;
import com.project.SnakeDev.vo.ReviewVo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;


public interface ReviewService {
    int InsertReview(ReviewVo reviewVo);

    int insertReviewImage(String sriImg);
    // int InsertReviewImg(ReviewImgVo reviewImgVo);

    int InsertReviewTag(String TSHTLContent);

    int InsertReviewHasTag();
}

//public 사용시 다른 클래스에서 접근 가능 
//void: 메서드가 아무런 값을 반환하지 않음을 나타냅니다.