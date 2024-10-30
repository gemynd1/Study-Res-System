package com.project.SnakeDev.vo;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class ReviewVo {
    private Integer srIdx;       // 스터디룸 게시글 번호
    private Integer sgiIdx;      // 스터디룸 idx
    private Integer mIdx;        // 회원키
    private Integer srStar;      // 별점
    private String srContent;    // 리뷰 내용
    private Date srRegDate;      // 생성일
    private Date srDelDate;      // 삭제일
    private Date srUpdate;       // 수정일

    private List<String> images; // 이미지 파일명 리스트
    private List<Integer> tags;  // 태그 ID 리스트

    // 필수 필드만 사용하는 생성자
    public ReviewVo(Integer srIdx, Integer sgiIdx, Integer mIdx, Integer srStar, String srContent) {
        this.srIdx = srIdx;
        this.sgiIdx = sgiIdx;
        this.mIdx = mIdx;
        this.srStar = srStar;
        this.srContent = srContent;
    }

    // Getter & Setter 메서드

    public Integer getSrIdx() {
        return srIdx;
    }

    public void setSrIdx(Integer srIdx) {
        this.srIdx = srIdx;
    }

    public Integer getSgiIdx() {
        return sgiIdx;
    }

    public void setSgiIdx(Integer sgiIdx) {
        this.sgiIdx = sgiIdx;
    }

    public Integer getmIdx() {
        return mIdx;
    }

    public void setmIdx(Integer mIdx) {
        this.mIdx = mIdx;
    }

    public Integer getSrStar() {
        return srStar;
    }

    public void setSrStar(Integer srStar) {
        this.srStar = srStar;
    }

    public String getSrContent() {
        return srContent;
    }

    public void setSrContent(String srContent) {
        this.srContent = srContent;
    }

    public Date getSrRegDate() {
        return srRegDate;
    }

    public void setSrRegDate(Date srRegDate) {
        this.srRegDate = srRegDate;
    }

    public Date getSrDelDate() {
        return srDelDate;
    }

    public void setSrDelDate(Date srDelDate) {
        this.srDelDate = srDelDate;
    }

    public Date getSrUpdate() {
        return srUpdate;
    }

    public void setSrUpdate(Date srUpdate) {
        this.srUpdate = srUpdate;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public List<Integer> getTags() {
        return tags;
    }

    public void setTags(List<Integer> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "ReviewVo{" +
                "srIdx=" + srIdx +
                ", sgiIdx=" + sgiIdx +
                ", mIdx=" + mIdx +
                ", srStar=" + srStar +
                ", srContent='" + srContent + '\'' +
                ", srRegDate=" + srRegDate +
                ", srDelDate=" + srDelDate +
                ", srUpdate=" + srUpdate +
                ", images=" + images +
                ", tags=" + tags +
                '}';
    }
}
