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
//    @Value("${kakao.client-id}")
//    private String clientId;

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

    private String getAccessTokenFromKakao(String code) {
        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        String clientId = "07644519945dac6578a2e7a01835e7de";
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
//        var response = restTemplate.postForObject(tokenUrl, Map.of(
//                "grant_type", "authorization_code",
//                "client_id", clientId, // 카카오 앱 REST API 키
//                "redirect_uri","http://localhost:8099/api/kakao",
//                "code", code
//        ), Map.class);
//
//        return (String) response.get("access_token");
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

        return kakaoVo.builder()
                .kakaoId((Long) response.get("id"))
                .email((String) kakaoAccount.get("email"))
                .nickname((String) ((Map) kakaoAccount.get("profile")).get("nickname"))
                .build();
    }

//    @Override
//    public String[] getKakaoAccessToken(String code) {
//        String access_Token = "";
//        String refresh_Token = "";
//        String reqURL = "https://kauth.kakao.com/oauth/token";
//        String result = null;
//        String id_token = null;
//
//        try {
//            URL url = new URL(reqURL);
//            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//            // POST 요청을 위해 기본값이 false인 setDoOutput을 true로
//            conn.setRequestMethod("POST");
//            conn.setDoOutput(true);
//
//            // POST 요청에 필요로 요구하는 파라미터 스트림을 통해 전송
//            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
//            StringBuilder sb = new StringBuilder();
//            sb.append("grant_type=authorization_code");
//            sb.append("&client_id=REST_API_KEY"); // TODO REST_API_KEY 입력
//            sb.append("&redirect_uri=redirect_uri"); // TODO 인가코드 받은 redirect_uri 입력
//            System.out.println("code = " + code);
//            sb.append("&code=" + code);
//            bw.write(sb.toString());
//            bw.flush();
//
//            //결과 코드가 200이라면 성공
//            int responseCode = conn.getResponseCode();
//            System.out.println("responseCode : " + responseCode);
//            //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
//            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//            String line = "";
//            result = "";
//
//            while ((line = br.readLine()) != null) {
//                result += line;
//            }
//            // bearer 토큰 값만 추출(log에 찍히는 값의 이름은 id_Token)
//            System.out.println("response body : " + result);
//            String[] temp = result.split(",");
//            id_token = temp[3].substring(11);
//            System.out.println("idToken = " + id_token);
//
//
////            Gson 라이브러리에 포함된 클래스로 JSON파싱 객체 생성
//            JsonParser parser = new JsonParser();
//            JsonElement element = parser.parse(result);
//
//            access_Token = element.getAsJsonObject().get("access_token").getAsString();
//            refresh_Token = element.getAsJsonObject().get("refresh_token").getAsString();
//
//            System.out.println("access_token : " + access_Token);
//            System.out.println("refresh_token : " + refresh_Token);
//
//            br.close();
//            bw.close();
//
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        String[] arrTokens = new String[3];
//        arrTokens[0] = access_Token;
//        arrTokens[1] = refresh_Token;
//        arrTokens[2] = id_token;
//
//        return arrTokens;
//    }
//
//    @Override
//    public AuthVo createKakaoUser(String token) throws IOException {
//        //1.유저 정보를 요청할 url
//        String reqURL = "https://kapi.kakao.com/v2/user/me";
//
//        //2.access_token을 이용하여 사용자 정보 조회
//        URL url = new URL(reqURL);
//        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//
//        conn.setRequestMethod("POST");
//        conn.setDoOutput(true);
//        conn.setRequestProperty("Authorization", "Bearer " + token); //전송할 header 작성, access_token전송
//
//        //결과 코드가 200이라면 성공
//        int responseCode = conn.getResponseCode();
//        System.out.println("responseCode : " + responseCode);
//
//        //요청을 통해 얻은 JSON타입의 Response 메세지 읽어오기
//        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
//        String line = "";
//        String result = "";
//
//        while ((line = br.readLine()) != null) {
//            result += line;
//        }
//
//        System.out.println("response body : " + result);
//
//        //Gson 라이브러리로 JSON파싱
//        JsonElement element = JsonParser.parseString(result);
//
//        Long id = element.getAsJsonObject().get("id").getAsLong();
//        boolean hasEmail = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("has_email").getAsBoolean();
//        //사용자의 이름
//        String nickname = element.getAsJsonObject().get("properties").getAsJsonObject().get("nickname").getAsString();
//        //사용자의 이메일
//        String email = "";
//        if (hasEmail) {
//            email = element.getAsJsonObject().get("kakao_account").getAsJsonObject().get("email").getAsString();
//        }
//        //DB에 카카오로 로그인한 기록이 없다면
//        //카카오톡에서 전달해준 유저 정보를 토대로
//        //유저 객체 생성하고 DB에 저장
//        //이후 프론트에서 요청하는 api 스펙에 맞춰
//        //dto로 변환한 후에 return 해준다.
//
//        if(!authMapper.existsByusername(email)) { // 이메일 중복되어있는지 확인하는 mapper 작성 중복된 사용자가 없을 때
//            AuthVo user = new AuthVo();
//            user.setMemberId(email);
//            user.setMemberName(nickname);
//            user.setMemberPw("");
//            AuthVo savedUser =  authMapper.kakaosave(user); // 최종로그인 save
//
//            String find_user_token = tokenProvider.create(savedUser);
//
//            return savedUser.toDTO(find_user_token);
//        }
//
//        if (!userRepository.existsByUsername(email)) { // 이메일 중복되어있는지 확인하는 mapper작성 중복된 사용자 없음
//
//            UserEntity user = UserEntity.builder().username(email).nickname(nickname).realName(nickname).password("").build();
//            UserEntity savedUser = userRepository.save(user);
//
//            String find_user_token = tokenProvider.create(savedUser);
//
//            return savedUser.toDTo(find_user_token);
//
//        } else {
//            //DB에 카카오로 로그인된 정보가 있다면 token 생성해서 리턴
//            UserEntity byUsername = userRepository.findByUsername(email); // 중복된 사용자가 있는 경우
//            String find_user_token = tokenProvider.create(byUsername);
//            br.close();
//
//            return byUsername.toDTO(find_user_token);
//        }
//    }
}
