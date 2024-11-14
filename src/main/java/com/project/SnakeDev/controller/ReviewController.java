package com.project.SnakeDev.controller;

import com.project.SnakeDev.config.VOMapper;
import com.project.SnakeDev.service.ReviewService;
import com.project.SnakeDev.vo.ReviewImgVo;
import com.project.SnakeDev.vo.ReviewVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/review/content")
public ResponseEntity<String> reviewController(@RequestBody Map<String, Object> data1){

    try {
        ReviewVo reviewVo = VOMapper.mapToVO(data1, ReviewVo.class);
        // if (reviewService.InsertReview(reviewVo) > 0) {
        //     return ResponseEntity.ok("ok");
        // }
        // return ResponseEntity.badRequest().body("Insert Failed");
        System.out.println("received data1: " + data1);
        if (reviewService.InsertReview(reviewVo) > 0) {
            // 2. 이미지 리스트가 있을 경우, 반복문으로 insert 실행
            if (reviewVo.getReviewImgVo() != null) {
                for (ReviewImgVo imgVo : reviewVo.getReviewImgVo()) {
                    imgVo.setSrIdx(reviewVo.getSgiIdx()); // srIdx 설정
                    reviewService.insertReviewImage(imgVo);
                }
            }
            return ResponseEntity.ok("Review and Images Inserted Successfully");
        }
        return ResponseEntity.badRequest().body("Insert Failed");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
    }
}

}
