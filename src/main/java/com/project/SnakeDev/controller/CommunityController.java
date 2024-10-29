package com.project.SnakeDev.controller;

import com.project.SnakeDev.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}