package com.project.SnakeDev.controller;

import com.project.SnakeDev.service.MypageService;
import com.project.SnakeDev.vo.AuthVo;
import com.project.SnakeDev.vo.MypageVo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class MypageController {
    @Autowired
    MypageService mypageService;

    @GetMapping("/mypage/mypageAccount")
    public ResponseEntity<Object> mypage(
            @RequestParam("id") String MemberId,
            @RequestParam("pw") String MemberPw,
            HttpServletRequest request) {
        AuthVo userInfo = mypageService.getUserInfo(MemberId);

        if (userInfo != null && userInfo.getMemberPw().equals(MemberPw)) {
            // 사용자 정보를 리스트에 저장합니다.
            List<Object> userInfoList = new ArrayList<>();
            userInfoList.add(userInfo.getMemberId());
            userInfoList.add(userInfo.getMemberPw());
            userInfoList.add(userInfo.getMemberName());
            userInfoList.add(userInfo.getMemberPhone());
            userInfoList.add(userInfo.getMAaddress());
            userInfoList.add(userInfo.getMDetailaddress());


            // 리스트를 ResponseEntity에 담아서 반환합니다.
            return ResponseEntity.ok(userInfoList);
        } else {
            // 아이디 또는 비밀번호가 일치하지 않을 경우, 401 Unauthorized 상태를 반환합니다.
            return ResponseEntity.status(401).body("아이디나 비밀번호 오류");
        }
    }
}
