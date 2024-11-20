package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.*;

import java.util.List;

public interface MypageService {

    // MemberId에 해당하는 사용자 정보를 가져옵니다.
    AuthVo getUserInfo(String memberId, String memberPw);

    // 회원 정보 조회 메서드
    AuthVo getMemberInfo(String memberId);

    // 회원 정보 수정 메서드
    int updateMemberInfo(AuthVo authVo);
    int updateMemberAddress(AuthVo authVo);

    // 회원 정보 수정 후 조회 메서드
    AuthVo getUpdateInfo(String memberId);

    // 시간충전 조회 메서드
    public List<StudyInPareVo> ViewStudyInPare();
    public AuthVo mypageAddTime(String memberid);

    // 내가 작성한 글 확인
    List<StudyCommunityVo> getBoardInfo(String memberId);

    // 내가 작성한 리뷰 확인
    List<StudyReviewVo> getReviewInfo(String memberId);

    List<StudyGOrderVo> mypageGroupCheck(String MemberId);
    List<TemplateOrderVo> mypageInviCheck(String MemberId);

    // 회원 탈퇴
    AuthVo ExitMemberInfo (String memberId);

    boolean deleteMember(String memberId); // 회원 탈퇴

    // 고객센터 문의
    int InsertCustomerHelp(CustomerHelpVo customerHelpVo);

    // 고객센터 문의 보여주기
    List<CustomerHelpVo> getCustomerHelpInfo(String memberId);

    // 시간충전 결제 저장
//    void savePayment(StudyOrderPayVo studyOrderPayVo) throws Exception;

}
