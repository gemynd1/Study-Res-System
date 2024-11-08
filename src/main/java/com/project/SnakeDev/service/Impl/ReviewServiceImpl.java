package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.ReviewMapper;
import com.project.SnakeDev.service.ReviewService;
//import com.project.SnakeDev.vo.ReviewImg;
import com.project.SnakeDev.vo.ReviewImgVo;
import com.project.SnakeDev.vo.ReviewVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewMapper reviewMapper;

//    private static final String UPLOAD_DIR = "/uploads"; // 파일이 저장될 디렉토리

//    @Override
//    @Transactional
//    public void createReview(int SGIIDX, String SRCONTENT, int SRSTAR, String TSHTLCONTENT, int MIDX, List<MultipartFile> SRIIMG) {

//        // 2. 리뷰 데이터 저장
//        ReviewVo reviewVo = new ReviewVo();
//        reviewVo.setSgiIdx(SGIIDX); // 스터디룸 인덱스 설정
//        reviewVo.setMIdx(MIDX); // MIDX 설정
//        reviewVo.setSrContent(SRCONTENT); // 리뷰 내용
//        reviewVo.setSrStar(SRSTAR); // 별점
//        reviewMapper.insertReview(reviewVo);


//
//        // 4. 태그 저장 (태그가 ','로 구분된 문자열로 전달됨)
//        if (TSHTLCONTENT != null && !TSHTLCONTENT.isEmpty()) {
//            String[] tagArray = TSHTLCONTENT.split(",");
//            for (String tag : tagArray) {
//                String trimmedTag = tag.trim();
//
//                // 중복된 태그 추가 방지
//                Integer tagId = reviewMapper.findTagIdByContent(trimmedTag);
//                if (tagId == null) {
//                    // 태그가 존재하지 않으면 새로 추가
//                    reviewMapper.insertTag(trimmedTag);
//                    tagId = reviewMapper.findTagIdByContent(trimmedTag); // 새로 생성된 태그 ID 조회
//                }
//                // 이미 추가된 태그인지 확인 후 추가
//                if (tagId != null) {
//                    // 중복된 태그 추가 방지
//                    Integer existingTagId = reviewMapper.findTagIdByContent(trimmedTag);
//                    if (existingTagId == null) {
//                        reviewMapper.insertReviewTag(reviewVo.getSrIdx(), tagId);
//                    }
//                }
//            }
//        }
//    }
    // 추가된 메서드: MIDX를 사용하여 MIDX 조회
//    @Override
//    @Transactional
//    public Integer getMidxFromMemberName(String memberName) {
//        return reviewMapper.findMidxByUserName(memberName);
//    }
//
//     @Override
//     @Transactional
//     public void uploadImage(int srIdx, List<MultipartFile> SRIIMG) {
//         ReviewImg reviewImg = new ReviewImg();
//         reviewImg.setSrIdx(null);
//         reviewImg.setSriImg(SRIIMG);
//         reivewImg.setSriImg();
//
//                 // 3. 리뷰 이미지 저장
//                 if (SRIIMG != null) {
//                     for (MultipartFile image : SRIIMG) {
//                         if (!image.isEmpty()) {
//                             String fileName = image.getOriginalFilename();
//                             File file = new File(UPLOAD_DIR, fileName);
//
//                             try {
//                                 // 파일 저장
//                                 image.transferTo(file);
//                                 // 이미지 정보 DB에 저장
//                                 reviewMapper.insertReviewImage(reviewImg.get    (), reviewImg.getSriImg());
//                             } catch (IOException e) {
//                                 throw new RuntimeException("이미지 업로드 중 오류가 발생했습니다: " + e.getMessage(), e);
//                             }
//                         }
//                     }
//                 }
//     }

    @Override
    public int InsertReview(ReviewVo reviewVo){
        return reviewMapper.InsertReview(reviewVo);
    }

    // @Override
    // @Transactional
    // public void sriimgidx(
}
