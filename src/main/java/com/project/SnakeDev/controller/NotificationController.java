package com.project.SnakeDev.controller;

import com.project.SnakeDev.service.NotificationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 주소
@RequestMapping("/api")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/notification")
    public ResponseEntity<Object> notification(HttpServletRequest request, HttpSession session) {
        session = request.getSession();
        String MemberId = (String) session.getAttribute("id");
        String MemberName = (String) session.getAttribute("name");
        System.out.println(MemberId);
        System.out.println(MemberName);

        return ResponseEntity.ok(notificationService.ViewNotification(MemberId, MemberName));
    }

}