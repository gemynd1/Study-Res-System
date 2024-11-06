package com.project.SnakeDev.controller;

import com.project.SnakeDev.service.Impl.MainServiceImpl;
import com.project.SnakeDev.service.MainService;
import com.project.SnakeDev.vo.PaymentRequest;
import com.project.SnakeDev.vo.StudyGImgVo;
import com.project.SnakeDev.vo.StudyGInfoVo;
import com.project.SnakeDev.vo.StudyInInfoVo;
import jakarta.servlet.http.HttpServletRequest;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React 개발 서버 주소
@RequestMapping("/api")
public class MainController {
    @Autowired
    private MainServiceImpl mainService;

    @GetMapping("/studygInfo")
    public ResponseEntity<Object> studygInfo() {
        return ResponseEntity.ok(mainService.ViewStudyGInfo());
    }

    @GetMapping("/studyininfo")
    public ResponseEntity<Object> studyininfo() {
        List<StudyInInfoVo> SIItables = mainService.ViewStudyInInfo();
        List<List<StudyInInfoVo>> groupSIItables = new ArrayList<>();
        for (int i = 0; i < SIItables.size(); i+= 6) {
            int end = Math.min(i + 6, SIItables.size());
            groupSIItables.add(SIItables.subList(i, end));
        }

        return ResponseEntity.ok(groupSIItables);
    }

    @GetMapping("/studygInfoDetail")
    public ResponseEntity<Map<String, Object>> studygInfoDetail(@RequestParam("sgiId") String sginum) {
        List<StudyGInfoVo> studyGInfoVoList = mainService.ViewStudyGInfoDetail(sginum);
        StudyGInfoVo studyGInfoVo = studyGInfoVoList.get(0);
        System.out.println('s');

        String[] studyGImg = studyGInfoVo.getStudyGImgVo().getSGImg().split(",");

        Map<String, Object> response = new HashMap<>();
        response.put("studyGInfoVo", studyGInfoVo);
        response.put("studyGImg", studyGImg);
        System.out.println(response);

        return ResponseEntity.ok(response);
    }

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static final String WIDGET_SECRET_KEY = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
//    private static final String API_SECRET_KEY = "test_sk_PBal2vxj81jDkAK1R7gy35RQgOAN";
    private static final String API_SECRET_KEY = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";
    @PostMapping("/approve-payment")
    public ResponseEntity<JSONObject> approvePayment(HttpServletRequest request, @RequestBody String jsonBody) throws Exception {
//        String tossSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
        String secretKey = request.getRequestURI().contains("/confirm/payment") ? API_SECRET_KEY : WIDGET_SECRET_KEY;
        JSONObject response = sendRequest(parseRequestData(jsonBody), secretKey, "https://api.tosspayments.com/v1/payments/confirm");
        int statusCode = response.containsKey("error") ? 400 : 200;
        return ResponseEntity.status(statusCode).body(response);
    }

    private JSONObject parseRequestData(String jsonBody) {
        try {
            JSONParser parser = new JSONParser();
            return (JSONObject) parser.parse(jsonBody);
        } catch (Exception e) {
            logger.error("JSON Parsing Error", e);
            return new JSONObject();
        }
    }

    private JSONObject sendRequest(JSONObject requestData, String secretKey, String urlString) throws IOException {
        HttpURLConnection connection = createConnection(secretKey, urlString);
        try (OutputStream os = connection.getOutputStream()) {
            os.write(requestData.toString().getBytes(StandardCharsets.UTF_8));
        }

        int responseCode = connection.getResponseCode();
        try (InputStream responseStream = connection.getResponseCode() == 200 ? connection.getInputStream() : connection.getErrorStream();
             Reader reader = new InputStreamReader(responseStream, StandardCharsets.UTF_8)) {
            JSONParser parser = new JSONParser();
            JSONObject response = (JSONObject) parser.parse(reader);

            // 응답 코드가 200이 아닌 경우 오류 메시지를 추가
            if (responseCode != 200) {
                response.put("error", "Failed to approve payment");
                response.put("status", responseCode);
            }
            return response;
        } catch (Exception e) {
            logger.error("Error reading response", e);
            JSONObject errorResponse = new JSONObject();
            errorResponse.put("error", "Error reading response");
            return errorResponse;
        }
    }

    private HttpURLConnection createConnection(String secretKey, String urlString) throws IOException {
        URL url = new URL(urlString);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("Authorization", "Basic " + Base64.getEncoder().encodeToString((secretKey + ":").getBytes(StandardCharsets.UTF_8)));
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        return connection;
    }

    //        try {
//            // 결제 승인 요청 데이터 생성
//            JSONObject requestBody = new JSONObject();
//            requestBody.put("paymentKey", paymentRequest.getPaymentKey());
//            requestBody.put("orderId", paymentRequest.getOrderId());
//            requestBody.put("amount", paymentRequest.getAmount());
//
//            // 요청 헤더 설정
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
//            headers.setBasicAuth(tossSecretKey, ""); // Basic 인증
//
//            HttpEntity<String> requestEntity = new HttpEntity<>(requestBody.toString(), headers);
//
//            // API 요청
//            RestTemplate restTemplate = new RestTemplate();
//            ResponseEntity<String> response = restTemplate.exchange(
//                "https://api.tosspayments.com/v1/payments/confirm",
//                HttpMethod.POST,
//                requestEntity,
//                String.class
//            );
//
//            return ResponseEntity.ok()
//                    .header(HttpHeaders.CONTENT_TYPE, "application/json; charset=UTF-8")
//                    .body(response.getBody());
//
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("결제 승인 실패: " + e.getMessage());
//        }
}