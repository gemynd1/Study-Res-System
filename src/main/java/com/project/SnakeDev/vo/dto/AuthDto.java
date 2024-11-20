package com.project.SnakeDev.vo.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Builder
@Getter
public class AuthDto {
    private String MemberId;
    private String MemberName;
//    private String loginType; // 로그인 유형
    private String token;
}
