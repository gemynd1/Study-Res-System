package com.project.SnakeDev.service;

import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface ReviewService {
    void createReview(int studyRoom, String content, int rating, String tags, String userName, List<MultipartFile> images);

    // 추가된 메서드: 회원 ID로 MIDX 조회
    Integer getMemberIndexByUserName(String memberIndex);

}
