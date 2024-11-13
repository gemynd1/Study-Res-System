package com.project.SnakeDev.controller;

import com.project.SnakeDev.service.Impl.NotificationServiceImpl;
import com.project.SnakeDev.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 주소
@RequestMapping("/api")
public class NotificationController {
    @Autowired
    private NotificationServiceImpl  notificationService;

    @GetMapping("/notification")
    public ResponseEntity<Object> notification(@RequestParam("sessionId") String sessionId,
                                               @RequestParam("sessionName") String sessionName) {

//        session = request.getSession();
//
//        String MemberId = (String) session.getAttribute("id");
//        String MemberName = (String) session.getAttribute("name");
//
//        if (MemberId == null || MemberName == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("세션 정보가 없습니다.");
//        }
//
//        System.out.println(MemberId);
//        System.out.println(MemberName);

        return ResponseEntity.ok(notificationService.ViewNotification(sessionId, sessionName));
    }
}