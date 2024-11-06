package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;

import java.util.Date;

@AllArgsConstructor
public class StudyGOrderVo {
    private Integer SGONum;
    private Date SGORegDate;
    private Date SGOStartDate;
    private Date SGOEndDate;
    private Integer SGOtotal;

    private StudyGInfoVo studyGInfoVo;
    private AuthVo authVo;
    private StudyOrderPayVo studyOrderPayVo;

    public StudyGOrderVo() {
    }

    public Integer getSGONum() {
        return SGONum;
    }

    public void setSGONum(Integer SGONum) {
        this.SGONum = SGONum;
    }

    public Date getSGORegDate() {
        return SGORegDate;
    }

    public void setSGORegDate(Date SGORegDate) {
        this.SGORegDate = SGORegDate;
    }

    public Date getSGOStartDate() {
        return SGOStartDate;
    }

    public void setSGOStartDate(Date SGOStartDate) {
        this.SGOStartDate = SGOStartDate;
    }

    public Date getSGOEndDate() {
        return SGOEndDate;
    }

    public void setSGOEndDate(Date SGOEndDate) {
        this.SGOEndDate = SGOEndDate;
    }

    public Integer getSGOtotal() {
        return SGOtotal;
    }

    public void setSGOtotal(Integer SGOtotal) {
        this.SGOtotal = SGOtotal;
    }

    public StudyGInfoVo getStudyGInfoVo() {
        return studyGInfoVo;
    }

    public void setStudyGInfoVo(StudyGInfoVo studyGInfoVo) {
        this.studyGInfoVo = studyGInfoVo;
    }

    public AuthVo getAuthVo() {
        return authVo;
    }

    public void setAuthVo(AuthVo authVo) {
        this.authVo = authVo;
    }

    public StudyOrderPayVo getStudyOrderPayVo() {
        return studyOrderPayVo;
    }

    public void setStudyOrderPayVo(StudyOrderPayVo studyOrderPayVo) {
        this.studyOrderPayVo = studyOrderPayVo;
    }
}
