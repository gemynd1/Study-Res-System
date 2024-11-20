package com.project.SnakeDev.vo;

import lombok.*;

@Data
@Builder
@Getter
@Setter
public class kakaoVo {
    private Integer kakaoId; // 카카오 고유 ID
    private String email;
    private String nickname;
    private String loginType = "kakao"; // 기본 로그인 타입
}