package com.project.SnakeDev.service;

import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface ReviewService {
    void createReview(int SGIIDX, String SRCONTENT, int SRSTAR, String TSHTLCONTENTags, int MIDX, List<MultipartFile> SRIIMG);

    // 추가된 메서드: 회원 ID로 MIDX 조회
    public Integer getMidxFromMemberName(int srIdx,String memberName);  

    public uploadImage(int srIdx, List<MultipartFile> SRIIMG )
}

//public 사용시 다른 클래스에서 접근 가능 
//void: 메서드가 아무런 값을 반환하지 않음을 나타냅니다.