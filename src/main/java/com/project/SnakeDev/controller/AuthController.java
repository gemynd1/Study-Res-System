package com.project.SnakeDev.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.SnakeDev.config.VOMapper;
import com.project.SnakeDev.service.AuthService;
import com.project.SnakeDev.vo.AuthVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping(value = "/join")
    public ResponseEntity<String> join(@RequestBody Map<String, Object> data) {
        try {
            AuthVo authVo = VOMapper.mapToVO(data, AuthVo.class);
            System.out.println(authVo.toString());
            if(authService.InsertJoin(authVo) > 0) {
                if(authService.InsertMemberAddress(authVo) > 0) {
                    return ResponseEntity.ok("ok");
                } else {
                    return ResponseEntity.badRequest().body("no");
                }
            } else {
                return ResponseEntity.badRequest().body("no");
            }
        }
        catch (Exception e){
            e.printStackTrace(); // 오류를 콘솔에 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }

    @GetMapping("/idcheck")
    public ResponseEntity<Object> idcheck(@RequestParam("newValue") String id) {
        System.out.println(id);
        boolean result = false;
        try {
            if(authService.IdCheck(id)) {
                // 중복값 있을 때
                result = true;
                return ResponseEntity.ok(result);
            } else {
                // 중복값 없을 때
                result = false;
                return ResponseEntity.ok(result);
            }
        }
        catch (Exception e) {
            e.printStackTrace(); // 오류를 콘솔에 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }

    @GetMapping("/login")
    public ResponseEntity<Object> login(
            @RequestParam("id") String MemberId,
            @RequestParam("pw") String MemberPw) {
        System.out.println(MemberId);
        System.out.println(MemberPw);
        String MemberName = authService.login(MemberId, MemberPw);
        if(MemberName != null) {
            return ResponseEntity.ok(MemberName);
        } else {
            return ResponseEntity.ok("로그인에 실패하였습니다.");
        }
    }
}
