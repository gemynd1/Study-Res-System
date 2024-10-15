package com.project.SnakeDev.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.SnakeDev.config.VOMapper;
import com.project.SnakeDev.service.AuthService;
import com.project.SnakeDev.vo.AuthVo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;
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
            @RequestParam("pw") String MemberPw,
            HttpServletRequest request,
            HttpSession session) {

        session = request.getSession();
        String MemberName = authService.login(MemberId, MemberPw);
        Map<String, String> sessionInfo = new HashMap<>();
        if(MemberName != null) {
            session.setAttribute("id", MemberId);
            session.setAttribute("name", MemberName);

            sessionInfo.put("id", MemberId);
            sessionInfo.put("name", MemberName);

            return ResponseEntity.ok(sessionInfo);
        } else {
            return ResponseEntity.ok(false);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.invalidate();

        return ResponseEntity.ok(true);
    }


    // https://velog.io/@fever-max/Spring-Boot-React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Security-%EA%B8%B0%EB%B3%B8-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%B0%8F-%EA%B6%8C%ED%95%9C-%EA%B5%AC%ED%98%84

}
