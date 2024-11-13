package com.project.SnakeDev.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.SnakeDev.config.VOMapper;
import com.project.SnakeDev.service.Impl.MainServiceImpl;
import com.project.SnakeDev.service.Impl.NotificationServiceImpl;
import com.project.SnakeDev.vo.*;
import jakarta.servlet.http.HttpServletRequest;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.validation.ObjectError;
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
    private NotificationServiceImpl notificationService;

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
//        System.out.println('s');

        String[] studyGImg = studyGInfoVo.getStudyGImgVo().getSGImg().split(",");

        Map<String, Object> response = new HashMap<>();
        response.put("studyGInfoVo", studyGInfoVo);
        response.put("studyGImg", studyGImg);
//        System.out.println(response);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/selectTime")
    public ResponseEntity<Object> selectTime(@RequestParam("sgiId") String sginum) {
        List<StudyGOrderVo> result = mainService.selectTime(sginum);
//        result = mainService.selectTime(sginum);

        return ResponseEntity.ok(result);
    }

    // 결제 승인 전에 JSON으로 데이터 미리 저장
    @PostMapping("/templateOrder")
    public ResponseEntity<Object> templateOrder(
            @RequestParam("random") String TTOIdx,
            @RequestParam("requestData") String requestData) {
        mainService.saveTemplateOrder(TTOIdx, requestData);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/templateOrderInfo")
    public ResponseEntity<String> templateOrderInfo(@RequestParam("ordernum") String ordernum) {
        int result1 =  mainService.updateTemplateOrder(ordernum);
        if(result1 > 0) {
            String result2 = mainService.selectTemplateOrder(ordernum);
            return ResponseEntity.ok(result2);
        } else {
            return ResponseEntity.badRequest().body("no");
        }
    }

    private final ObjectMapper objectMapper = new ObjectMapper();
    // 결제 승인 내역 DB저장
    @PostMapping("/OrderPay")
    public ResponseEntity<Object> OrderPay(@RequestParam("orderPayData") String orderPayDataJson,
                                           @RequestParam("MemberId") String MemberId) {
//        System.out.println(orderPayData);
        try {
            Map<String, Object> orderPayData = objectMapper.readValue(orderPayDataJson, Map.class);
            StudyOrderPayVo studyOrderPayVo = VOMapper.mapToVO(orderPayData, StudyOrderPayVo.class);

            if(mainService.InsertOrderPay(MemberId, studyOrderPayVo) > 0) {
                return ResponseEntity.ok("ok");
            } else {
                return ResponseEntity.badRequest().body("no");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }

    // 결제 승인 후 최종 예약 내역 DB저장
    @PostMapping("/OrderWait")
    public ResponseEntity<Object> OrderWait(@RequestParam("orderWaitData") String orderWaitDataJson,
                                            @RequestParam("MemberId") String MemberId) {
        try {
            Map<String, Object> orderWaitData = objectMapper.readValue(orderWaitDataJson, Map.class);
            StudyGOrderVo studyGOrderVo = VOMapper.mapToVO(orderWaitData, StudyGOrderVo.class);

            StudyGInfoVo studyGInfoVo = new StudyGInfoVo();
            studyGInfoVo.setSGIIdx((Integer) orderWaitData.get("SGIIdx"));
            studyGOrderVo.setStudyGInfoVo(studyGInfoVo);

            StudyOrderPayVo studyOrderPayVo = new StudyOrderPayVo();
            studyOrderPayVo.setTSOPIdx((String) orderWaitData.get("TSOPIdx"));
            studyGOrderVo.setStudyOrderPayVo(studyOrderPayVo);

            if(mainService.InsertGOrderWait(MemberId, studyGOrderVo) > 0) {
                return ResponseEntity.ok("ok");
            } else {
                return ResponseEntity.badRequest().body("no");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }

    @PostMapping("/OrderNotification")
    public ResponseEntity<Object> OrderNotification(@RequestParam("orderNotificationData") String MaContent) {
        try {
            if(notificationService.OrderNotification(MaContent) > 0) {
                return ResponseEntity.ok("ok");
            } else {
                return ResponseEntity.badRequest().body("no");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
//        return ResponseEntity.ok(notificationService.OrderNotification(MaContent));
    }

    @PostMapping("/OrderWaitIn")
    public ResponseEntity<Object> OrderWaitIn(@RequestParam("orderWaitinData") String orderWaitinData,
                                              @RequestParam("MemberId") String MemberId) {
        try {
            HashMap<String, Object> params = new HashMap<>();
            params.put("MemberId", MemberId);
            params.put("SIPName", orderWaitinData);

            if(mainService.InsertInOrderWait(params) > 0) {
                return ResponseEntity.ok("ok");
            } else {
                return ResponseEntity.badRequest().body("no");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Server error");
        }
    }

    // 토스 결제 승인
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
}