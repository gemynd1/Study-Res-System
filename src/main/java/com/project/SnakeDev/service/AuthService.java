package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.AuthVo;
import org.apache.ibatis.annotations.Param;

public interface AuthService {
    int InsertJoin(AuthVo authVo);
    int InsertMemberAddress(AuthVo authVo);
    boolean IdCheck(String id);
    String login(String MemberId, String MemberPw);
}
