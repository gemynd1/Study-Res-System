package com.project.SnakeDev.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {
    @RequestMapping("/board")
    public String board() {
        return "게시판 페이지입니다.";
    }

    @RequestMapping("/board/category/*")
    public String boardCategory() {
        return "게시판 페이지입니다.";
    }
}
