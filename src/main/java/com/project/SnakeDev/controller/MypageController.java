package com.project.SnakeDev.controller;

import ch.qos.logback.core.model.Model;
import com.project.SnakeDev.service.MypageService;
import com.project.SnakeDev.vo.AuthVo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class MypageController {
    @Autowired
    MypageService mypageService;

    @GetMapping("/mypage/mypageAccount")
    public ResponseEntity<Object> mypageAccount(
            @RequestParam("id") String MemberId,
            @RequestParam("pw") String MemberPw,
            HttpServletRequest request) {
        AuthVo userInfo = mypageService.getUserInfo(MemberId, MemberPw);
        boolean result = true;
        if (userInfo != null && userInfo.getMemberPw().equals(MemberPw)) {
            HttpSession session = request.getSession();

            session.setAttribute("loginState", result);

            // 리스트를 ResponseEntity에 담아서 반환합니다.
            return ResponseEntity.ok(result);
        } else {
            result = false;
            // 아이디 또는 비밀번호가 일치하지 않을 경우, 401 Unauthorized 상태를 반환합니다.
            return ResponseEntity.status(401).body(result);
        }
    }

    @GetMapping("/mypage/mypageUpdate")
    public ResponseEntity<Object> mypageUpdate(
            @RequestParam("id") String MemberId,
            HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("loginState") != null) {
            AuthVo userInfo = mypageService.getMemberInfo(MemberId);
            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.status(401).body(false);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<Object> updateMember(@RequestBody AuthVo authVo) {
        System.out.println(authVo);
        try {
            int updateResult = mypageService.updateMemberInfo(authVo);
            int updateReuslt1 = mypageService.updateMemberAddress(authVo);

            System.out.println("수정");
            if (updateResult > 0 && updateReuslt1 > 0) {
                System.out.println("수정성공");
                return ResponseEntity.ok("회원정보가 수정되었습니다.");
            } else {
                System.out.println("수정실패");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("수정 실패");
            }
        } catch (Exception e) {
            System.out.println("수정실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }



}
