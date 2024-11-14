package com.project.SnakeDev.vo;
import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor       // 기본 생성자 생성
// 모든 필드를 매개변수로 받는 생성자 생성
public class ReviewImgVo {
    private Integer sriImgIdx; // 스터디 리뷰사진 번호
    private Integer srIdx;       // 스터디룸 게시글 번호
    private String sriImg; //스터디룸 사진 url


    public ReviewImgVo() {
    }

//    public ReviewImgVo(Integer sriimgidx, Integer srIdx, String sriimg) {
//        this.sriimgidx = sriimgidx;
//        this.srIdx = srIdx;
//        this.sriimg = sriimg;
//    }

    public Integer getSriImageIdx() {
        return sriImgIdx;
    }

    public void setSriImageIdx(Integer sriImgIdx) {
        this.sriImgIdx = sriImgIdx;
    }

    public Integer getSrIdx() {
        return srIdx;
    }

    public void setSrIdx(Integer srIdx) {
        this.srIdx = srIdx;
    }

    public String getSriImg(){
        return sriImg;
    }
    public void setSriImg(String sriImg){
        this.sriImg = sriImg;
    }

    @Override
    public String toString() {
        return "ReviewImg{" +
                "sriimgidx=" + sriImgIdx +
                "srIdx=" + srIdx +
                ", sriimg=" + sriImg +
                '}';
    }
}


// private Integer tshtlidx; //해시태그목록
// private String tshtlcontent; //내용
// private Integer tshtidx; //해시태그id

// private String tshtlContent;
// private