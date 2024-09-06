package com.project.SnakeDev.Controller;

// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// @CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 주소
@RestController
public class HelloWorldController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, world! 리액트";
    }
}