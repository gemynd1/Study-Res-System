package com.project.SnakeDev.controller;

import com.project.SnakeDev.service.CommunityService;
import com.project.SnakeDev.vo.CommunityVo;
import com.project.SnakeDev.vo.StudyGInfoVo;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 주소
@RequestMapping("/api")
public class CommunityController {
    @Autowired
    private CommunityService communityService;

    @GetMapping("/board")
    public ResponseEntity<Object> board() {
        return ResponseEntity.ok(communityService.ViewCommunity());
    }

    @GetMapping("/board/category")
    public ResponseEntity<Object> boardCategory() {
        return ResponseEntity.ok(communityService.ViewCommunityCategory());
    }

    @GetMapping("/board/select/category")
    public ResponseEntity<Object> boardCategory1(@RequestParam("currentCategory") String currentCategory) {
        if (currentCategory.equals("deadline")) {
            currentCategory = "곧 마감!";
        } else if (currentCategory.equals("new")) {
            currentCategory = "new!";
        } else if (currentCategory.equals("programming")) {
            currentCategory = "프로그래밍";
        } else  {
            currentCategory = null;
        }

        return ResponseEntity.ok(communityService.ViewCurrentCommunity(currentCategory));
    }

    @GetMapping("/board/select/category/more")
    public ResponseEntity<Object> moreCommunity(@RequestParam("currentCategory") String currentCategory,
                                                @RequestParam("ContentNumber") String ContentNumber) {

        if (currentCategory.equals("deadline")) {
            currentCategory = "곧 마감!";
        } else if (currentCategory.equals("new")) {
            currentCategory = "new!";
        } else if (currentCategory.equals("programming")) {
            currentCategory = "프로그래밍";
        } else  {
            currentCategory = null;
        }

        int int_ContentNumber = Integer.parseInt(ContentNumber);

        return ResponseEntity.ok(communityService.ViewMoreCommunity(currentCategory, int_ContentNumber));
    }

    @GetMapping("/board/post")
    public ResponseEntity<Object> post(@RequestParam("comIdx") String comIdx) {
        return ResponseEntity.ok(communityService.ViewPost(comIdx));
    }

    @GetMapping("/board/post/comment")
    public ResponseEntity<Object> comment(@RequestParam("comIdx") String comIdx) {
        return ResponseEntity.ok(communityService.ViewComment(comIdx));
    }

    @GetMapping("/board/postRewrite")
    public ResponseEntity<Object> postRewrite(@RequestParam("comIdx") String comIdx) {
        List<CommunityVo> result_ViewPost_forPostRewrite = communityService.ViewPost_forPostRewrite(comIdx);
        List<StudyGInfoVo> result_ViewStudyroom= communityService.ViewStudyroom();

        Map<String, Object> result = new HashMap<>();
        result.put("community", result_ViewPost_forPostRewrite);
        result.put("studyroom", result_ViewStudyroom);

        return ResponseEntity.ok(result);
    }

}