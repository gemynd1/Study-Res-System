package com.project.SnakeDev.mapper;

import com.project.SnakeDev.vo.AuthVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface AuthMapper {
    int InsertJoin(AuthVo authVo);
    int InsertMemberAddress(AuthVo authVo);
    boolean IdCheck(String id);
    String login(String MemberId, String MemberPw );
}
