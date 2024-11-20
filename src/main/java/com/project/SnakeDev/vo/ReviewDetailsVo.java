package com.project.SnakeDev.vo;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
public class ReviewDetailsVo {
    private List<String> TSHTLContent; // 태그 내용 리스트
    private Integer srIdx;       // 스터디룸 게시글 번호
    private Integer sgiIdx;      // 스터디룸 idx
    private Integer mIdx;        // 회원키
    private Integer srStar;      // 별점
    private String srContent;    // 내용
    private List<String> sriImg; // 이미지 리스트
    private Date srRegDate;      // 생성일
    private String memberName;

    public ReviewDetailsVo() {}

    public String getMemberName() { return memberName; }

    public void setMemberName(String memberName) { this.memberName = memberName; }

    public List<String> getTSHTLContent() {
        return TSHTLContent;
    }

    public void setTSHTLContent(String TSHTLContent) {
        this.TSHTLContent = Arrays.asList(TSHTLContent.split(",\\s*"));
    }

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

    public List<String> getSriImg() {
        return sriImg;
    }

    public void setSriImg(String sriImg) {
        this.sriImg = Arrays.asList(sriImg.split(",\\s*"));
    }

    public Date getSrRegDate() {
        return srRegDate;
    }

    public void setSrRegDate(Date srRegDate) {
        this.srRegDate = srRegDate;
    }
}
