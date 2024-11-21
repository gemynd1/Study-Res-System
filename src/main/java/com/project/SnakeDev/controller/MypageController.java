package com.project.SnakeDev.controller;

import ch.qos.logback.core.model.Model;
import ch.qos.logback.core.net.SyslogOutputStream;
import com.project.SnakeDev.config.VOMapper;
import com.project.SnakeDev.service.Impl.MypageServiceImpl;
import com.project.SnakeDev.service.MypageService;
import com.project.SnakeDev.vo.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class MypageController {
    @Autowired
    MypageServiceImpl mypageService;

    @GetMapping("/mypage/mypageAccount")
    public ResponseEntity<Object> mypageAccount(
            @RequestParam("id") String MemberId,
            @RequestParam("pw") String MemberPw,
            HttpServletRequest request) {
        AuthVo userInfo = mypageService.getUserInfo(MemberId, MemberPw);
        boolean result = true;
        if (userInfo != null && userInfo.getMemberPw().equals(MemberPw)) {
            HttpSession session = request.getSession();

            session.setAttribute("loginState", result);

            // 리스트를 ResponseEntity에 담아서 반환합니다.
            return ResponseEntity.ok(result);
        } else {
            result = false;
            // 아이디 또는 비밀번호가 일치하지 않을 경우, 401 Unauthorized 상태를 반환합니다.
            return ResponseEntity.status(401).body(result);
        }
    }

    @GetMapping("/mypage/mypageUpdate")
    public ResponseEntity<Object> mypageUpdate(
            @RequestParam("id") String MemberId,
            HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session.getAttribute("loginState") != null) {
            AuthVo userInfo = mypageService.getMemberInfo(MemberId);
            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.status(401).body(false);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<Object> updateMember(@RequestBody AuthVo authVo) {
        System.out.println(authVo);
        try {
            int updateResult = mypageService.updateMemberInfo(authVo);
            int updateReuslt1 = mypageService.updateMemberAddress(authVo);

            System.out.println("수정");
            if (updateResult > 0 && updateReuslt1 > 0) {
                System.out.println("수정성공");
                return ResponseEntity.ok("회원정보가 수정되었습니다.");
            } else {
                System.out.println("수정실패");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("수정 실패");
            }
        } catch (Exception e) {
            System.out.println("수정실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/mypage/mypageTime")
    public ResponseEntity<Object> studyinpare() {
        return ResponseEntity.ok(mypageService.ViewStudyInPare());
    }

    @GetMapping("/mypage/mypageAddTime")
    public ResponseEntity<Object> mypageAddTime(@RequestParam("memberid") String memberid) {
        return ResponseEntity.ok(mypageService.mypageAddTime(memberid));
    }

    @GetMapping("/mypage/mypageBoard")
    public ResponseEntity<Object> mypageBoard(
            @RequestParam("id") String memberId) {
        List<StudyCommunityVo> BoardInfo = mypageService.getBoardInfo(memberId);
        return ResponseEntity.ok(BoardInfo);
    }

    @GetMapping("/mypage/mypageReview")
    public ResponseEntity<Object> mypageReview(
            @RequestParam("id") String memberId) {
        List<StudyReviewVo> ReviewInfo = mypageService.getReviewInfo(memberId);
//        System.out.println(ReviewInfo);
        return ResponseEntity.ok(ReviewInfo);
    }

    @GetMapping("/mypage/mypageGroupCheck")
    public ResponseEntity<Object> mypageGroupCheck(@RequestParam("MemberId") String MemberId) {
        List<StudyGOrderVo> GOrderInfo = mypageService.mypageGroupCheck(MemberId);
        return ResponseEntity.ok(GOrderInfo);
    }

    @GetMapping("/mypage/mypageInviCheck")
    public ResponseEntity<Object> mypageInviCheck(@RequestParam("MemberId") String MemberId) {
        List<TemplateOrderVo> inviInfo = mypageService.mypageInviCheck(MemberId);
        return ResponseEntity.ok(inviInfo);
    }

    @PostMapping("/customer/customerWrite")
    public ResponseEntity<String> customerWrite(@RequestBody Map<String, Object> data) {
        try {
            CustomerHelpVo customerHelpVo = VOMapper.mapToVO(data, CustomerHelpVo.class);
            if (mypageService.InsertCustomerHelp(customerHelpVo) > 0) {
                return ResponseEntity.ok("ok");
            } else {
                return ResponseEntity.badRequest().body("no");
            }
        } catch (Exception e) {
            e.printStackTrace(); // 오류를 콘솔에 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }

    @GetMapping("/customer/customerView")
    public ResponseEntity<Object> customerView(
            @RequestParam("id") String memberId) {
        List<CustomerHelpVo> customerView = mypageService.getCustomerHelpInfo(memberId);
        return ResponseEntity.ok(customerView);
    }

    @PostMapping("/mypage/mypageExit")
    public ResponseEntity<String> mypageExit(@RequestBody Map<String, String> requestData) {
        String memberId = requestData.get("memberId");

        if (memberId == null || memberId.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Member ID cannot be empty.");
        }

        try {
            boolean isDeleted = mypageService.deleteMember(memberId);

            if (isDeleted) {
                return ResponseEntity.ok("회원 탈퇴가 완료되었습니다.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("회원 정보를 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("서버 오류가 발생했습니다.");
        }
    }

    @GetMapping("/mypage/chatRoom")
    public ResponseEntity<Object> getChatRoom(
            @RequestParam("memberId") String memberId,
            @RequestParam("memberName") String memberName){
        List<AuthVo> getChatRoom = mypageService.getChatRoom(memberId, memberName);
        return ResponseEntity.ok(getChatRoom);
    }


}
