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
        return ResponseEntity.ok(notificationService.ViewNotification(sessionId, sessionName));
    }

    @PostMapping("/notificationdel")
    public ResponseEntity<Object> notificationdel(@RequestParam("maidx") Integer maidx) {
        return ResponseEntity.ok(notificationService.notificationdel(maidx));
    }

    @PostMapping("/notificationdelall")
    public ResponseEntity<Object> notificationdelall() {
        return ResponseEntity.ok(notificationService.notificationdelall());
    }
}