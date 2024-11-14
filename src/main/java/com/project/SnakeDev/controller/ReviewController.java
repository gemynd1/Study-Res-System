package com.project.SnakeDev.controller;

import com.project.SnakeDev.config.VOMapper;
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

//    @PostMapping("/reviews")
//    public ResponseEntity<String> createReview(
//            @RequestParam Map<String, Object> requestParams,
//            @RequestParam(value = "SRIIMG", required = false) List<MultipartFile> SRIIMG) {
//
//        int SGIIDX = Integer.parseInt((String) requestParams.get("SGIIDX"));
//        String SRCONTENT = (String) requestParams.get("SRCONTENT");
//        int SRSTAR = Integer.parseInt((String) requestParams.get("SRSTAR"));
//        String TSHTLCONTENT = (String) requestParams.getOrDefault("TSHTLCONTENT", null); // 태그가 없으면 null 처리
//        int MIDX = Integer.parseInt((String) requestParams.get("MIDX"));
//
//
//        // 파일을 포함한 요청 파라미터를 ReviewService에 전달
//        reviewService.createReview(SGIIDX, SRCONTENT, SRSTAR, TSHTLCONTENT, MIDX, SRIIMG);
//
//        return ResponseEntity.ok("리뷰가 성공적으로 저장되었습니다.");
//    }
    
//    @GetMapping("/reviews/member/{memberName}")
//    public ResponseEntity<Integer> getMidxFromMemberName(@PathVariable String memberName) {
//        // memberName을 사용하여 MIDX를 가져오는 로직 추가
//        Integer MIDX = reviewService.getMidxFromMemberName(memberName);
//
//        if (MIDX == null) {
//            // MIDX를 찾을 수 없을 경우
//            // System.out.println("MIDX를 찾을 수 없습니다: " + memberName);
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//
//        // 성공적으로 MIDX를 찾았을 때
//        // System.out.println("MIDX를 성공적으로 찾았습니다: " + MIDX);
//        return ResponseEntity.ok(MIDX);
//    }

//     @PostMapping("/reviews/img")
//     public ResponseEntity<String> uploadImage(@RequestParam("SRIIMG") List<MultipartFile> SRIIMG,
//         @RequestParam("SRIDX") Integer srIdx) {
//         reviewService.uploadImage(srIdx, SRIIMG);
//         return ResponseEntity.ok("이미지가 성공적으로 업로드되었습니다.");
//     }

//     @GetMapping("/review/img")
//     public ResponseEntity<List> getImageInfo(@PathVariable <List> imgInfo) {
//         Integer SRIIMGKDX = reviewService.getImgInfo(imgInfo)
//         return ResponseEntity.ok(imgInfo);
//     }

    @PostMapping("/review/content")
    public ResponseEntity<String> InsertReview(@RequestParam("data1") Map<String, Object> data) {
//        @RequestParams("") tags, uploadfiles 등등 얘네들은 따로 길이만큼 for문 돌려서 데이터 넣어주면 완료ㅇㅋ?
         try {
             ReviewVo reviewVo = VOMapper.mapToVO(data, ReviewVo.class);
             // 글작성하는거 // 이미지 태그
             if (reviewService.InsertReview(reviewVo) > 0){
                 return ResponseEntity.ok("ok");
             } else {
                 return ResponseEntity.status(401).body("no");
             }

         } catch (Exception e) {
             e.printStackTrace();
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("error");
         }
    }

}
