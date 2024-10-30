package com.project.SnakeDev.controller;

import com.project.SnakeDev.service.ReviewService;
import com.project.SnakeDev.vo.ReviewVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/reviews")
    public ResponseEntity<String> createReview(
            @RequestParam Map<String, Object> requestParams,
            @RequestParam(value = "images", required = false) List<MultipartFile> images) {
        
        int studyRoom = Integer.parseInt((String) requestParams.get("studyRoom"));
        String content = (String) requestParams.get("content");
        int rating = Integer.parseInt((String) requestParams.get("rating"));
        String tags = (String) requestParams.getOrDefault("tags", null); // 태그가 없으면 null 처리
        String userName = (String) requestParams.get("userName");

        // 파일을 포함한 요청 파라미터를 ReviewService에 전달
        reviewService.createReview(studyRoom, content, rating, tags, userName, images);
        
        return ResponseEntity.ok("리뷰가 성공적으로 저장되었습니다.");
    }
    @GetMapping("/reviews/member/{loggedInId}")
    public ResponseEntity<Integer> getMemberIndex(@PathVariable String loggedInId) {
        // loggedInId를 사용하여 MIDX를 가져오는 로직 추가
        Integer memberIndex = reviewService.getMemberIndexByUserName(loggedInId);
        
        if (memberIndex == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // MIDX를 찾을 수 없을 경우
        }

        return ResponseEntity.ok(memberIndex);
}


}
