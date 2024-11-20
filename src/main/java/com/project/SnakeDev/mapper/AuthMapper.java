package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.AuthVo;
import com.project.SnakeDev.vo.kakaoVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AuthMapper {
    int InsertJoin(AuthVo authVo);
    int InsertMemberAddress(AuthVo authVo);
    boolean IdCheck(String id);
    String login(String MemberId, String MemberPw );

    // 카카오 ID로 사용자 존재 여부 확인
    int existsByKakaoId(@Param("email") String email);

    // 사용자 정보 조회
    AuthVo findByKakaoId(@Param("email") String email);

    // 신규 사용자 등록
    int insertKakaoUser(kakaoVo kakavo);
}
