package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.*;
import org.apache.catalina.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
public interface MypageMapper {
    // MemberId에 해당하는 사용자 정보를 조회하는 쿼리를 정의합니다.
    AuthVo getUserInfo(@Param("memberId") String memberId,
                       @Param("memberPw") String memberPw);

    AuthVo getMemberInfo(@Param("memberId") String memberId);

    // 회원 정보 수정 쿼리
    int updateMemberInfo(AuthVo authVo);
    int updateMemberAddress(AuthVo authVo);

    // 기존 회원 정보 조회 쿼리
    AuthVo getUpdateInfo(@Param("memberId") String memberId);

    // 마이페이지 시간충전 보여주기
    List<StudyInPareVo> ViewStudyInPare();
    AuthVo mypageAddTime(@Param("memberid") String memberid);

    // 내가 작성한 글 보여주기
    List<StudyCommunityVo> getBoardInfo(@Param("memberId") String memberId);

    // 내가 작성한 리뷰 보여주기
    List<StudyReviewVo> getReviewInfo(@Param("memberId") String memberId);

    List<StudyGOrderVo> mypageGroupCheck(@Param("MemberId") String MemberId);
    List<TemplateOrderVo> mypageInviCheck(@Param("MemberId") String MemberId);

    // 회원탈퇴
    AuthVo ExitMemberInfo(@Param("memberId") String memberId);

    int deleteMember(String memberId); // 회원 삭제 메서드

    // 고객센터 문의작성
    int InsertCustomerHelp(CustomerHelpVo customerHelpVo);

    // 고객센터 문의작성 보여주기
    List<CustomerHelpVo> getCustomerHelpInfo(@Param("memberId") String memberId);
    // 시간충전 저장
//    void insertPayment(StudyOrderPayVo studyOrderPayVo) throws Exception;

}
