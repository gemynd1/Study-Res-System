package com.project.SnakeDev.controller;

import com.project.SnakeDev.service.CommunityService;
import com.project.SnakeDev.vo.CommunityVo;
import com.project.SnakeDev.vo.StudyGInfoVo;
import com.project.SnakeDev.vo.TogetherStudyVo;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.ibatis.annotations.Param;
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
public class CommunityController {
    @Autowired
    private CommunityService communityService;

    @GetMapping("/board")
    public ResponseEntity<Object> board() {
        return ResponseEntity.ok(communityService.ViewCommunity());
    }

    @GetMapping("/board/category")
    public ResponseEntity<Object> boardCategory() {
        return ResponseEntity.ok(communityService.ViewCommunityCategory());
    }

    @GetMapping("/board/select/category")
    public ResponseEntity<Object> boardCategory1(@RequestParam("currentCategory") String currentCategory) {
        if (currentCategory.equals("deadline")) {
            currentCategory = "곧 마감!";
        } else if (currentCategory.equals("new")) {
            currentCategory = "new!";
        } else if (currentCategory.equals("programming")) {
            currentCategory = "프로그래밍";
        } else  {
            currentCategory = null;
        }

        return ResponseEntity.ok(communityService.ViewCurrentCommunity(currentCategory));
    }

    @GetMapping("/board/select/category/more")
    public ResponseEntity<Object> moreCommunity(@RequestParam("currentCategory") String currentCategory,
                                                @RequestParam("ContentNumber") String ContentNumber) {

        if (currentCategory.equals("deadline")) {
            currentCategory = "곧 마감!";
        } else if (currentCategory.equals("new")) {
            currentCategory = "new!";
        } else if (currentCategory.equals("programming")) {
            currentCategory = "프로그래밍";
        } else  {
            currentCategory = null;
        }

        int int_ContentNumber = Integer.parseInt(ContentNumber);

        return ResponseEntity.ok(communityService.ViewMoreCommunity(currentCategory, int_ContentNumber));
    }

    @GetMapping("/board/post")
    public ResponseEntity<Object> post(@RequestParam("comIdx") String comIdx) {
        return ResponseEntity.ok(communityService.ViewPost(comIdx));
    }

    @GetMapping("/board/post/comment")
    public ResponseEntity<Object> comment(@RequestParam("comIdx") String comIdx) {
        return ResponseEntity.ok(communityService.ViewComment(comIdx));
    }

    @GetMapping("/board/get/postRewrite")
    public ResponseEntity<Object> get_postRewrite(@RequestParam("comIdx") String comIdx) {
        List<CommunityVo> result_ViewPost_forPostRewrite = communityService.ViewPost_forPostRewrite(comIdx);
        List<StudyGInfoVo> result_ViewStudyroom= communityService.ViewStudyroom();
        List<TogetherStudyVo> result_ViewGroupMember_forPostRewrite = communityService.ViewGroupMember_forPostRewrite(comIdx);

        Map<String, Object> result = new HashMap<>();
        result.put("community", result_ViewPost_forPostRewrite);
        result.put("studyroom", result_ViewStudyroom);
        result.put("groupMember", result_ViewGroupMember_forPostRewrite);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/board/post/postRewrite")
    public ResponseEntity<Object> post_postRewrite(@RequestBody Map<String, Object> data) {
        System.out.print(data);

        Boolean updateCommunity_result = false;
        updateCommunity_result = communityService.updateCommunity(data);

        Boolean deleteTogetherStudy_result = false;
        String comidx = data.get("ComIdx").toString();
        List<Map<String, Object>> groupMemberInfos = (List<Map<String, Object>>) data.get("groupMemberInfos");
        deleteTogetherStudy_result = communityService.deleteTogetherStudy(comidx, groupMemberInfos);

        List result = new ArrayList();
        result.add(updateCommunity_result);
        result.add(deleteTogetherStudy_result);

        return ResponseEntity.ok(result);
    }

}