package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.AuthVo;
import org.apache.catalina.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MypageMapper {
    // MemberId에 해당하는 사용자 정보를 조회하는 쿼리를 정의합니다.
    AuthVo getUserInfo(@Param("memberId") String memberId,
                       @Param("memberPw") String memberPw);

    AuthVo getMemberInfo(@Param("memberId") String memberId);

    // 회원 정보 수정 쿼리
    int updateInfo(AuthVo authVo);


    int updateMemberInfo(AuthVo authVo);
    int updateMemberAddress(AuthVo authVo);

    // 기존 회원 정보 조회 쿼리
    AuthVo getUpdateInfo(@Param("memberId") String memberId);

}
