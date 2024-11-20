package com.project.SnakeDev.controller;

import com.project.SnakeDev.config.VOMapper;
import com.project.SnakeDev.service.ReviewService;
import com.project.SnakeDev.vo.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class ReviewController {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/src/main/resources/static";

//    private static final String UPLOAD_DIR = System.getProperty("user.dir") +  "/src/main/resources/static/assets/img/review/";
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

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFiles(@RequestParam("file") MultipartFile[] files) {
        try {
            // 저장 디렉토리 확인 및 생성
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 업로드된 각 파일 저장
            for (MultipartFile file : files) {
                String originalFileName = file.getOriginalFilename();
                String decodedFileName = URLDecoder.decode(originalFileName, "UTF-8");

                // 파일 저장 경로 생성
                String filePath = UPLOAD_DIR + "/" + decodedFileName;
                System.out.println("File path: " + filePath);

                // 파일 저장
                file.transferTo(new File(filePath));
            }

            return ResponseEntity.ok("Files uploaded successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload files: " + e.getMessage());
        }
    }

    @GetMapping("/api/images/list")
    public List<String> getImageFileNames() {
        File directory = new File(UPLOAD_DIR);
        File[] files = directory.listFiles();
        List<String> fileNames = new ArrayList<>();

        if (files != null) {
            for (File file : files) {
                if (file.isFile()) {
                    fileNames.add(file.getName());
                }
            }
        }
        return fileNames;
    }

    @GetMapping("/reviews/details")
    public ReviewDetailsVo getReviewDetails(@RequestParam("sridx") Integer sridx) {
        return reviewService.getReviewDetails(sridx);
    }

    @GetMapping("/reviews/all")
    public List<ReviewDetailsVo> getReviewAll(){
        return reviewService.getReviewAll();
    }

}

