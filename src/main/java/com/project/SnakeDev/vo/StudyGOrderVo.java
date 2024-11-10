package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

//@AllArgsConstructor
@NoArgsConstructor
public class StudyGOrderVo {
     String SGONum;
     String SGORegDate;
     String SGOStartDate;
     String SGOEndDate;
     Integer SGOtotal;

     StudyGInfoVo studyGInfoVo;
     StudyOrderPayVo studyOrderPayVo;
     AuthVo authVo;

//    public StudyGOrderVo() {
//    }

    // 예약 최종처리
    public StudyGOrderVo(String SGONum, String SGORegDate, String SGOStartDate, String SGOEndDate, Integer SGOtotal, StudyGInfoVo studyGInfoVo, StudyOrderPayVo studyOrderPayVo) {
        this.SGONum = SGONum;
        this.SGORegDate = SGORegDate;
        this.SGOStartDate = SGOStartDate;
        this.SGOEndDate = SGOEndDate;
        this.SGOtotal = SGOtotal;
        this.studyGInfoVo = studyGInfoVo;
        this.studyOrderPayVo = studyOrderPayVo;
    }

    public String getSGONum() {
        return SGONum;
    }

    public void setSGONum(String SGONum) {
        this.SGONum = SGONum;
    }

    public String getSGORegDate() {
        return SGORegDate;
    }

    public void setSGORegDate(String SGORegDate) {
        this.SGORegDate = SGORegDate;
    }

    public String getSGOStartDate() {
        return SGOStartDate;
    }

    public void setSGOStartDate(String SGOStartDate) {
        this.SGOStartDate = SGOStartDate;
    }

    public String getSGOEndDate() {
        return SGOEndDate;
    }

    public void setSGOEndDate(String SGOEndDate) {
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


    public StudyOrderPayVo getStudyOrderPayVo() {
        return studyOrderPayVo;
    }

    public void setStudyOrderPayVo(StudyOrderPayVo studyOrderPayVo) {
        this.studyOrderPayVo = studyOrderPayVo;
    }

    public AuthVo getAuthVo() {
        return authVo;
    }

    public void setAuthVo(AuthVo authVo) {
        this.authVo = authVo;
    }


}
