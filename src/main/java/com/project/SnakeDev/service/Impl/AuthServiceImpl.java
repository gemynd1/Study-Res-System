package com.project.SnakeDev.service.Impl;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.project.SnakeDev.config.TokenProvider;
import com.project.SnakeDev.mapper.AuthMapper;
import com.project.SnakeDev.service.AuthService;
import com.project.SnakeDev.vo.AuthVo;
import com.project.SnakeDev.vo.dto.AuthDto;
import com.project.SnakeDev.vo.kakaoVo;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.Buffer;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AuthMapper authMapper;
    @Autowired
    private TokenProvider tokenProvider;

    @Override
    @Transactional
    public int InsertJoin(AuthVo authVo) {
        return authMapper.InsertJoin(authVo);
    }

    @Override
    @Transactional
    public int InsertMemberAddress(AuthVo authVo) {
        return authMapper.InsertMemberAddress(authVo);
    }

    @Override
    @Transactional
    public boolean IdCheck(String id) {
        return authMapper.IdCheck(id);
    }

    @Override
    @Transactional
    public String login(String MemberId, String MemberPw){
        return authMapper.login(MemberId, MemberPw);
    }

    @Override
    public String kakaoSignUp(@Param("code") String code) {
        String accessToken = getAccessTokenFromKakao(code);
        kakaoVo kakaovo = getUserInfoFromKakao(accessToken);

        // db에 사용자 정보 확인/저장
        if(authMapper.existsByKakaoId(kakaovo.getEmail()) == 0) {
            authMapper.insertKakaoUser(kakaovo);
        }
        AuthVo user = authMapper.findByKakaoId(kakaovo.getEmail());
        return tokenProvider.create(user);
    }

    @Value("${kakao.client-id}")
    private String clientId;

    private String getAccessTokenFromKakao(String code) {
        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", "http://localhost:3000/oauth");
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(params, headers);


        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, entity, Map.class);
            System.out.println("Request Parameters: " + entity);
            String accessToken = (String) response.getBody().get("access_token");
            System.out.println("Access Token: " + accessToken);
            if (response.getStatusCode() == HttpStatus.OK) {
                Map body = response.getBody();
                System.out.println("Response Status: " + response.getStatusCode());
                System.out.println("Response Body: " + response.getBody());
                return (String) body.get("access_token");
            } else {
                System.err.println("Failed to fetch access token: " + response.getStatusCode());
                return null;
            }
        } catch (Exception e) {
            System.err.println("Error fetching access token: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    private kakaoVo getUserInfoFromKakao(String accessToken) {
        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";

        RestTemplate restTemplate = new RestTemplate();
        var headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);

        var response = restTemplate.exchange(
                userInfoUrl,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                Map.class
        ).getBody();

        var kakaoAccount = (Map) response.get("kakao_account");
        int random = (int) (10000000 + Math.random() * 89999999);
        return kakaoVo.builder()
//                .kakaoId((Long) response.get("id"))
                .kakaoId(random)
                .email((String) kakaoAccount.get("email"))
                .nickname((String) ((Map) kakaoAccount.get("profile")).get("nickname"))
                .build();
    }
}
