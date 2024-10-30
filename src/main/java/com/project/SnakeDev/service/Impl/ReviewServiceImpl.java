package com.project.SnakeDev.service.Impl;

import com.project.SnakeDev.mapper.ReviewMapper;
import com.project.SnakeDev.service.ReviewService;
import com.project.SnakeDev.vo.ReviewVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewMapper reviewMapper;

    private static final String UPLOAD_DIR = "/uploads"; // 파일이 저장될 디렉토리

    @Override
    @Transactional
    public void createReview(int studyRoom, String content, int rating, String tags, String userName, List<MultipartFile> images) {
        
        // 1. userName으로 MIDX 조회
        Integer midx = reviewMapper.findMidxByUserName(userName);
        System.out.println("MIDX: " + midx);
        if (midx == null) {
            throw new IllegalArgumentException("회원 정보를 찾을 수 없습니다.");
        }

        // 2. 리뷰 데이터 저장
        ReviewVo reviewVo = new ReviewVo();
        reviewVo.setSgiIdx(studyRoom); // 스터디룸 인덱스 설정
        reviewVo.setmIdx(midx); // MIDX 설정
        reviewVo.setSrContent(content); // 리뷰 내용
        reviewVo.setSrStar(rating); // 별점
        reviewMapper.insertReview(reviewVo);

        // 3. 리뷰 이미지 저장
        if (images != null) {
            for (MultipartFile image : images) {
                if (!image.isEmpty()) {
                    String fileName = image.getOriginalFilename();
                    File file = new File(UPLOAD_DIR, fileName);

                    try {
                        // 파일 저장
                        image.transferTo(file);
                        // 이미지 정보 DB에 저장
                        reviewMapper.insertReviewImage(reviewVo.getSrIdx(), fileName);
                    } catch (IOException e) {
                        throw new RuntimeException("이미지 업로드 중 오류가 발생했습니다: " + e.getMessage(), e);
                    }
                }
            }
        }

        // 4. 태그 저장 (태그가 ','로 구분된 문자열로 전달됨)
        if (tags != null && !tags.isEmpty()) {
            String[] tagArray = tags.split(",");
            for (String tag : tagArray) {
                String trimmedTag = tag.trim();
                
                // 중복된 태그 추가 방지
                Integer tagId = reviewMapper.findTagIdByContent(trimmedTag);
                if (tagId == null) {
                    // 태그가 존재하지 않으면 새로 추가
                    reviewMapper.insertTag(trimmedTag);
                    tagId = reviewMapper.findTagIdByContent(trimmedTag); // 새로 생성된 태그 ID 조회
                }

                // 이미 추가된 태그인지 확인 후 추가
                if (tagId != null) {
                    // 중복된 태그 추가 방지
                    Integer existingTagId = reviewMapper.findTagIdByContent(trimmedTag);
                    if (existingTagId == null) {
                        reviewMapper.insertReviewTag(reviewVo.getSrIdx(), tagId);
                    }
                }
            }
        } 
    }
    // 추가된 메서드: memberIndex를 사용하여 MIDX 조회
    @Override
    public Integer getMemberIndexByUserName(String memberIndex) {
        return reviewMapper.findMidxByUserName(memberIndex);
    }
}
