package com.project.SnakeDev.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import com.project.SnakeDev.config.VOMapper;
import com.project.SnakeDev.service.AuthService;
import com.project.SnakeDev.service.Impl.AuthServiceImpl;
import com.project.SnakeDev.vo.AuthVo;
import com.project.SnakeDev.vo.dto.AuthDto;
import com.project.SnakeDev.vo.kakaoVo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.apache.catalina.connector.Response;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.lang.reflect.Member;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED_VALUE;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class AuthController {
    @Autowired
    AuthServiceImpl authService;

    @PostMapping(value = "/join")
    public ResponseEntity<String> join(@RequestBody Map<String, Object> data) {
        System.out.println(data);
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
//        session.setMaxInactiveInterval(10);
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

    @PostMapping("/kakao")
    public ResponseEntity<?> kakaoCallback(@RequestBody Map<String, String> request) {
        String code = request.get("code");
//        String clinetid = "07644519945dac6578a2e7a01835e7de";

        try {
            return ResponseEntity.ok(authService.kakaoSignUp(code));
        } catch (Exception e) {
            e.printStackTrace(); // 오류를 콘솔에 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }
    private final String secretKey = "WmZGdZkZmZmZXmZGdXJmZGVlYmRmY2RmZGZxdXVjaW1pZGdlZGVsYmRnYW1r==";
    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) {
        try {
            System.out.println(token);

            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();

            // JWT에서 사용자 정보 추출
            String email = claims.get("MemberId", String.class);
            String nickname = claims.get("MemberName", String.class);
            AuthVo authVo = new AuthVo();
            authVo.setMemberId(email);
            authVo.setMemberName(nickname);
            // 사용자 정보 응답
            return ResponseEntity.ok(authVo);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid or expired token");
        }
    }

    @GetMapping("/session-status")
    public ResponseEntity<String> getSessionStatus(HttpSession session) {
        if(session == null || session.getAttribute("id") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("session 만료");
        }
        return ResponseEntity.ok("session 있음");
    }

    @PostMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.invalidate();

        return ResponseEntity.ok(true);
    }


    // https://velog.io/@fever-max/Spring-Boot-React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Security-%EA%B8%B0%EB%B3%B8-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%B0%8F-%EA%B6%8C%ED%95%9C-%EA%B5%AC%ED%98%84

}
