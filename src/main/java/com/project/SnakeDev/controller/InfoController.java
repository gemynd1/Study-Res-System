package com.project.SnakeDev.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class InfoController {
    @RequestMapping("/info")
    public String info() {
        return "요금 정보 페이지입니다.";
    }
}
