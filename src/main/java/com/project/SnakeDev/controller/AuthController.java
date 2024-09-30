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
                System.out.println("ok");
                if(authService.InsertMemberAddress(authVo) > 0) {
                    System.out.println("ok");
                    return ResponseEntity.ok("ok");
                } else {
                    System.out.println("no");
                    return ResponseEntity.badRequest().body("no");
                }
            } else {
                System.out.println("no");
                return ResponseEntity.badRequest().body("no");
            }
        }
        catch (Exception e){
            e.printStackTrace(); // 오류를 콘솔에 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }

}
