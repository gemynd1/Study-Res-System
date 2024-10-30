package com.project.SnakeDev.controller;

import com.project.SnakeDev.service.Impl.MainServiceImpl;
import com.project.SnakeDev.service.MainService;
import com.project.SnakeDev.vo.StudyGImgVo;
import com.project.SnakeDev.vo.StudyGInfoVo;
import com.project.SnakeDev.vo.StudyInInfoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 주소
@RequestMapping("/api")
public class MainController {
    @Autowired
    private MainServiceImpl mainService;

    @GetMapping("/studygInfo")
    public ResponseEntity<Object> studygInfo() {
        return ResponseEntity.ok(mainService.ViewStudyGInfo());
    }

    @GetMapping("/studyininfo")
    public ResponseEntity<Object> studyininfo() {
        List<StudyInInfoVo> SIItables = mainService.ViewStudyInInfo();
        List<List<StudyInInfoVo>> groupSIItables = new ArrayList<>();
        for (int i = 0; i < SIItables.size(); i+= 6) {
            int end = Math.min(i + 6, SIItables.size());
            groupSIItables.add(SIItables.subList(i, end));
        }

        return ResponseEntity.ok(groupSIItables);
    }

    @GetMapping("/studygInfoDetail")
    public ResponseEntity<Map<String, Object>> studygInfoDetail(@RequestParam("sgiId") String sginum) {
        List<StudyGInfoVo> studyGInfoVoList = mainService.ViewStudyGInfoDetail(sginum);
        StudyGInfoVo studyGInfoVo = studyGInfoVoList.get(0);

        String[] studyGImg = studyGInfoVo.getStudyGImgVo().getSGImg().split(",");

        Map<String, Object> response = new HashMap<>();
        response.put("studyGInfoVo", studyGInfoVo);
        response.put("studyGImg", studyGImg);
        System.out.println(response);

        return ResponseEntity.ok(response);
    }
}