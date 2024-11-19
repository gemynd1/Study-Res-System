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
            currentCategory = "NEW!";
        } else if (currentCategory.equals("programming")) {
            currentCategory = "프로그래밍";
        } else  {
            currentCategory = null;
        }

        Map<String, Object> result = new HashMap<String, Object>();

        int Community_size = communityService.ViewCommunity_size(currentCategory);
        List<CommunityVo> communityVo = communityService.ViewCurrentCommunity(currentCategory);
        if(communityVo != null) {
            result.put("Community_size", Community_size);
            result.put("Community", communityVo);
            return ResponseEntity.ok(result);
        }else {
            return ResponseEntity.badRequest().body("에러 메시지");
        }
    }

    @GetMapping("/board/select/category/more")
    public ResponseEntity<Object> moreCommunity(@RequestParam("currentCategory") String currentCategory,
                                                @RequestParam("ContentNumber") String ContentNumber) {

        if (currentCategory.equals("deadline")) {
            currentCategory = "곧 마감!";
        } else if (currentCategory.equals("new")) {
            currentCategory = "NEW!";
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
        List<CommunityVo>rs1 = communityService.ViewPost(comIdx);
        List<TogetherStudyVo> rs2 = communityService.ViewGroupMember_forPost(comIdx);

        Map<String, Object> result = new HashMap<>();
        result.put("ViewPost", rs1);
        result.put("ViewGroupMember_forPost", rs2);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/board/post/comment")
    public ResponseEntity<Object> comment(@RequestParam("comIdx") String comIdx,
                                          @RequestParam("currentPage") String currentPage,
                                          @RequestParam("commentSize") String commentSize) {

        return ResponseEntity.ok(communityService.ViewComment(comIdx, currentPage, commentSize));
    }

    @GetMapping("/board/post/commentSize")
    public ResponseEntity<Object> commentSize(@RequestParam("comIdx") String comIdx) {
        return ResponseEntity.ok(communityService.ViewCommentSize(comIdx));
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

    @GetMapping("/board/get/postWrite")
    public ResponseEntity<Object> get_postWrite() {
        List<StudyGInfoVo> result_ViewStudyroom= communityService.ViewStudyroom();

        return ResponseEntity.ok(result_ViewStudyroom);
    }

    @PostMapping("/board/post/postRewrite")
    public ResponseEntity<Object> post_postRewrite(@RequestBody Map<String, Object> data) {
        System.out.print("data: " + data);

        Boolean updateCommunity_result = false;
        updateCommunity_result = communityService.updateCommunity(data);

        Boolean deleteTogetherStudy_result = false;

        String comidx = data.get("ComIdx").toString();
        List<Map<String, Object>> groupMemberInfos = (List<Map<String, Object>>) data.get("groupMemberInfos");
        List<Map<String, Object>> originalGroupMemberInfos = (List<Map<String, Object>>) data.get("originalGroupMemberInfos");

        if(!originalGroupMemberInfos.isEmpty() && !groupMemberInfos.isEmpty()) {
            deleteTogetherStudy_result = Boolean.TRUE;
        }else if(!originalGroupMemberInfos.isEmpty() && groupMemberInfos.isEmpty()) {
            deleteTogetherStudy_result = communityService.deleteTogetherStudyAll(Integer.parseInt(comidx));
        }else if(!originalGroupMemberInfos.isEmpty()) {
            deleteTogetherStudy_result = communityService.deleteTogetherStudy(comidx, groupMemberInfos);
        }else if(originalGroupMemberInfos.isEmpty() && groupMemberInfos.isEmpty()) {
            deleteTogetherStudy_result = Boolean.TRUE;
        }else {
            deleteTogetherStudy_result = Boolean.FALSE;
        }

        List result = new ArrayList();
        result.add(updateCommunity_result);
        result.add(deleteTogetherStudy_result);

        System.out.print("result: " + result);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/board/insert/comment")
    public ResponseEntity<Object> post_comment(@RequestBody Map<String, Object> data) {

        int comIdx = Integer.parseInt(data.get("comIdx").toString());
        int commentType = Integer.parseInt(data.get("commentType").toString());
        String comment = data.get("comment").toString();
        int maxCCGroupNum = Integer.parseInt(data.get("maxCCGroupNum").toString());
        String sessionId = data.get("sessionId").toString();
        int currentComment = Integer.parseInt(data.get("currentComment").toString());
        String add_or_edit = data.get("add_or_edit").toString();
        int currentCommentGroupNum = Integer.parseInt(data.get("currentCommentGroupNum").toString());

//        System.out.print("data:" + data);

        if (commentType == 0 && !comment.isEmpty() && add_or_edit.equals("add")) {

//            sessionId와 memberId(댓글작성자)가 다른 경우
            return ResponseEntity.ok(communityService.insert_comment_question(comIdx, comment, maxCCGroupNum, sessionId));

        }else if (commentType == 1 && !comment.isEmpty() && currentComment != 0 && add_or_edit.equals("add")) {

//            sessionId와 memberId(댓글작성자)가 같은 경우
            return ResponseEntity.ok(communityService.insert_comment_reply(comIdx, comment, maxCCGroupNum, sessionId, currentComment, currentCommentGroupNum));

        }else if ((commentType == 1 && !comment.isEmpty() && currentComment != 0 && add_or_edit.equals("edit")) || (commentType == 0 && !comment.isEmpty() && add_or_edit.equals("edit"))) {

//            sessionId와 memberId(댓글작성자)가 같거나 답글의 내용을 수정할 경우
//            or
//            sessionId와 memberId(댓글작성자)가 다르고 댓글의 내용을수정을 할 경우
            return ResponseEntity.ok(communityService.updateComment_forSelf(comment, currentComment));

        }else {
            return ResponseEntity.badRequest().body("에러 메시지");
        }
    }

    @PostMapping("/board/delete/comment")
    public ResponseEntity<Object> delete_comment(@RequestBody Map<String, Object> data) {
        int comment_ccidx = Integer.parseInt(data.get("comment_ccidx").toString());
        int comment_ccgroupnum = Integer.parseInt(data.get("comment_ccgroupnum").toString());
        int comment_comidx = Integer.parseInt(data.get("comment_comidx").toString());

        System.out.print("data:" + data);

        if(comment_ccidx != 0) {

            return ResponseEntity.ok(communityService.deleteComment(comment_ccidx, comment_ccgroupnum, comment_comidx));

        }
        return ResponseEntity.badRequest().body("에러 메시지");
    }

    @PostMapping("/board/report/comment")
    public ResponseEntity<Object> report_comment(@RequestBody Map<String, Object> data) {
        int comment_ccidx = Integer.parseInt(data.get("comment_ccidx").toString());

        if(comment_ccidx != 0) {

            return ResponseEntity.ok(communityService.reportComment(comment_ccidx));

        }
        return ResponseEntity.badRequest().body("에러 메시지");
    }

    @PostMapping("/board/insert/groupMember")
    public ResponseEntity <Object> insert_groupMember(@RequestBody Map<String, Object> data) {
        int comIdx = Integer.parseInt(data.get("comIdx").toString());
        String sessionId = data.get("sessionId").toString();

//        System.out.print("data: " + data);

        if (comIdx != 0 && !sessionId.isEmpty()) {
                return ResponseEntity.ok(communityService.insertTogetherStudy(comIdx, sessionId));
        }else {
            return ResponseEntity.badRequest().body("에러 메시지");
        }
    }

    @PostMapping("/board/delete/groupMember")
    public ResponseEntity <Object> delete_groupMember(@RequestBody Map<String, Object> data) {
        int comIdx = Integer.parseInt(data.get("comIdx").toString());
        String sessionId = data.get("sessionId").toString();

        if (comIdx != 0 && !sessionId.isEmpty()) {
            return ResponseEntity.ok(communityService.deleteTogetherStudy_forPost(comIdx, sessionId));
        }else {
            return ResponseEntity.badRequest().body("에러 메시지");
        }
    }

    @PostMapping("/board/delete/post")
    public ResponseEntity <Object> delete_post(@RequestBody Map<String, Object> data) {
        int comIdx = Integer.parseInt(data.get("comIdx").toString());

        if (comIdx != 0) {
            Boolean rs1 = communityService.deletePost_allPost(comIdx);
            Boolean rs2 = communityService.deleteComment_allPost(comIdx);
            Boolean rs3 = communityService.deleteTogetherStudy_allPost(comIdx);
            return ResponseEntity.ok("sql 성공");
        }else {
            return ResponseEntity.badRequest().body("에러 메시지");
        }
    }
}