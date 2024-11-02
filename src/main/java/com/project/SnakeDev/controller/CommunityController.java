package com.project.SnakeDev.controller;

import com.project.SnakeDev.service.CommunityService;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

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

    @GetMapping("/board/post")
    public ResponseEntity<Object> post(@RequestParam("comIdx") String comIdx) {
        int int_comIdx = Integer.parseInt(comIdx);
        return ResponseEntity.ok(communityService.ViewPost(int_comIdx));
    }

}