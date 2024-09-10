package com.project.SnakeDev.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReviewController {
    @RequestMapping("/review")
    public String review() {
        return "리뷰 페이지입니다.";
    }
}
