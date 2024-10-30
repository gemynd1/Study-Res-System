package com.project.SnakeDev.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class BoardController {

    @Autowired
    //
    
    @RequestMapping("/board")
    public String board() {

        
        return "게시판 페이지입니다.";
    }

    @RequestMapping("/board/category/*")
    public String boardCategory() {
        return "게시판 페이지입니다.";
    }
}
