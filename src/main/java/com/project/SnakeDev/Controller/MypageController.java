package com.project.SnakeDev.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MypageController {
    @RequestMapping("/api/mypage")
    public String mypage() {
        return "마이페이지입니다.";
    }

    @RequestMapping("/api/mypage/mypageAccount")
    public String mypageAccount() {
        return "마이페이지 비밀번호 확인 페이지입니다.";
    }

    @RequestMapping("/api/mypage/mypageUpdate")
    public String mypageUpdate() {
        return "마이페이지 개인정보 수정 페이지입니다.";
    }

    @RequestMapping("/api/mypage/mypageBoard")
    public String mypageBoard() {
        return "마이페이지 개인이 작성한 글 확인 페이지입니다.";
    }

    @RequestMapping("/api/mypage/mypageReview")
    public String mypageReview() {
        return "마이페이지 리뷰페이지입니다.";
    }

    @RequestMapping("/api/mypage/mypageAdd")
    public String mypageAdd() {
        return "마이페이지 시간충전 페이지입니다.";
    }
}
