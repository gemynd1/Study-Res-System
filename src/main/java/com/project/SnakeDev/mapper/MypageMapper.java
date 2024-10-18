package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.AuthVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface MypageMapper {
    // MemberId에 해당하는 사용자 정보를 조회하는 쿼리를 정의합니다.
    AuthVo getUserInfo(@Param("memberId") String memberId);
}
