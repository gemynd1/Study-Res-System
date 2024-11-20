package com.project.SnakeDev.config;

import com.project.SnakeDev.vo.AuthVo;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

import static java.lang.Integer.parseInt;

@Component
public class TokenProvider {

//    @Value("${SECRET_KEY}")
//    private static final String SECRET_KEY = null;

    @Value("${SECRET_KEY}")
    private String secretKeyInstance; // 비정적 변수

    private static String SECRET_KEY; // 정적 변수

    @PostConstruct
    private void init() {
        SECRET_KEY = secretKeyInstance;
    }

    public static String create(AuthVo user) {
        return Jwts.builder()
                .setSubject(user.getMemberId())
                .claim("MemberId", user.getMemberId())
                .claim("MemberName", user.getMemberName())
                .claim("MemberPw", user.getMemberPw())
                .claim("MemberPhone", user.getMemberPhone())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(SignatureAlgorithm.HS256, Base64.getEncoder().encodeToString(SECRET_KEY.getBytes()))
                .compact();
    }
//    public String create(AuthVo user) {
//        // Example JWT creation logic using secretKey
//        return Jwts.builder()
//                .setSubject(user.getMemberName())
//                .claim("nickname", user.getMemberName())
//                .signWith(SignatureAlgorithm.HS256, secretKey)
//                .compact();
//    }

//    public boolean validate(String token) {
//        try {
//            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
//            return true;
//        } catch (JwtException e) {
//            return false;
//        }
//    }
}
