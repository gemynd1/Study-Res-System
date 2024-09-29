package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.AuthVo;

public interface AuthService {
    int InsertJoin(AuthVo authVo);
    int InsertMemberAddress(AuthVo authVo);
}
