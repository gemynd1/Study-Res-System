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
//            if (reviewVo.getReviewImgVo() != null && !reviewVo.getReviewImgVo().isEmpty()) {

                for(int i=0; i<imgData.size(); i++){
                    reviewService.insertReviewImage(imgData.get(i));
                }
//                for (ReviewImgVo imgVo : reviewVo.getReviewImgVo()) {
////                    if (reviewVo.getSrIdx() != null) {
//                        imgVo.setSrIdx(reviewVo.getSrIdx()); // srIdx 설정
//                        reviewService.insertReviewImage(imgVo);
//                        return ResponseEntity.ok("Review and Images Inserted Successfully");
////                    } else {
////
////                        return ResponseEntity.badRequest().body("sgiIdx is null");
////                    }
//                }
//            }
            return ResponseEntity.ok("그냥 성공");
        } else {
            return ResponseEntity.badRequest().body("Insert Failed");
        }
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
    }
}

}

//public ResponseEntity<String> reviewController(@RequestBody Map<String, Object> data1){
//
//    try {
//        ReviewVo reviewVo = VOMapper.mapToVO(data1, ReviewVo.class);
//        List<String> result = (List<String>) data1.get("sriImg");
//        int sgiIdx = Integer.parseInt(data1.get("sgiIdx").toString());
//
//        if (reviewService.InsertReview(reviewVo) > 0) {
//            // 2. 이미지 리스트가 있을 경우, 반복문으로 insert 실행
//            if (reviewVo.getReviewImgVo() != null) {
//                for (int i=0; i<result.size(); i++){
//                    String rs = (String) result.get(i);
//                    reviewService.insertReviewImage(sgiIdx, rs);
//                }
//            }
//            return ResponseEntity.ok("Review and Images Inserted Successfully");
//        }
//        return ResponseEntity.badRequest().body("Insert Failed");
//    } catch (Exception e) {
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
//    }
//}
//
//}
