package com.project.SnakeDev.config;

import com.project.SnakeDev.vo.AuthVo;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

@Component
public class TokenProvider {
    private final String secretKey = "your-secret-key";

    public String create(AuthVo user) {
        // Example JWT creation logic using secretKey
        return Jwts.builder()
                .setSubject(user.getMemberName())
                .claim("nickname", user.getMemberName())
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public boolean validate(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
