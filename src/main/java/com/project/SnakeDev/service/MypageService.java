package com.project.SnakeDev.service;

import com.project.SnakeDev.vo.AuthVo;

public interface MypageService {
    // MemberId에 해당하는 사용자 정보를 가져옵니다.
    AuthVo getUserInfo(String memberId);
}
