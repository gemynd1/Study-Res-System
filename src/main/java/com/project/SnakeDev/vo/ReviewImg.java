package com.project.SnakeDev.vo;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor       // 기본 생성자 생성
@AllArgsConstructor      // 모든 필드를 매개변수로 받는 생성자 생성
public class ReviewImg {
    private Integer sriimgidx; // 스터디 리뷰사진 번호
    private Integer srIdx;       // 스터디룸 게시글 번호
    private String sriimg; //스터디룸 사진 url
    private

    public ReviewImg(Integer sriimgidx, Integer srIdx, String sriimg) {
        this.sriimgidx = sriimgidx;
        this.srIdx = srIdx;
        this.sriimg = sriimg;
    }

    public Integer getSrrImageIdx() {
        return sriimgidx;
    }

    public void setSrrImageIdx(Integer sriimgidx) {
        this.sriimgidx = sriimgidx;
    }

    public Integer getSrIdx() {
        return srIdx;
    }

    public void setSrIdx(Integer srIdx) {
        this.srIdx = srIdx;
    }

    public String getSriImg(){
        return sriimg;
    }
    public void setSriImg(String sriimg){
        this.sriimg = sriimg;
    }
    
    @Override
    public String toString() {
        return "ReviewImg{" +
                "sriimgidx=" + sriimgidx +
                "srIdx=" + srIdx + 
                ", sriimg=" + sriimg +
                '}';
    }
}


    // private Integer tshtlidx; //해시태그목록
    // private String tshtlcontent; //내용
    // private Integer tshtidx; //해시태그id

    // private String tshtlContent;
    // private 