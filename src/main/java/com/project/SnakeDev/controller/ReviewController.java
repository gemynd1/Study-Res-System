package com.project.SnakeDev.controller;

import com.project.SnakeDev.config.VOMapper;
import com.project.SnakeDev.service.ReviewService;
import com.project.SnakeDev.vo.ReviewImgVo;
import com.project.SnakeDev.vo.ReviewVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        System.out.println("received data1: " + data1);

        if (reviewService.InsertReview(reviewVo) > 0) {


            List<String> imgData = (List<String>) data1.get("sriImg");
            System.out.println("imgData: " + imgData);

            List<String> Tags = (List<String>) data1.get("TSHTlContent");
            System.out.println("Tags:" + Tags);

                for(int i=0; i<imgData.size(); i++){
                    reviewService.insertReviewImage(imgData.get(i));
                }
                for(int i=0; i<Tags.size(); i++){
                    reviewService.InsertReviewTag(Tags.get(i));
                    reviewService.InsertReviewHasTag();
                }

            return ResponseEntity.ok("그냥 성공");
        } else {
            return ResponseEntity.badRequest().body("Insert Failed");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
    }
}

}

