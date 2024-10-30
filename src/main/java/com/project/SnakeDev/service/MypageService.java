package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.AuthVo;

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
}
