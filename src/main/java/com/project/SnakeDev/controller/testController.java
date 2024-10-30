package com.project.SnakeDev.controller;

import com.project.SnakeDev.service.BoardService;
import com.project.SnakeDev.vo.BoardVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class testController {

    @Autowired
    private BoardService boardService;

//    @RequestMapping(value = "/test")
//    public List<BoardVo> test(Model model){
//        List<BoardVo> tables = new ArrayList<>();
//        tables.addAll(boardService.viewAll());
//
//        model.addAttribute("viewAll", tables);
//        return boardService.viewAll();
//    }
}
