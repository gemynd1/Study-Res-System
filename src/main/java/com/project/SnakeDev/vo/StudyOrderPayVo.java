package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

//@AllArgsConstructor
@NoArgsConstructor
public class StudyOrderPayVo {
     String TSOPIdx;
     String TSOPMethod;
     Integer TSOPPrice;
     String TSOPStatus;
     Date TsopDate;
     String TSOPDivi;


//    public StudyOrderPayVo() {
//    }


    // 결제 내역 처리
    public StudyOrderPayVo(String TSOPIdx, String TSOPMethod, Integer TSOPPrice, String TSOPStatus, String TSOPDivi) {
        this.TSOPIdx = TSOPIdx;
        this.TSOPMethod = TSOPMethod;
        this.TSOPPrice = TSOPPrice;
        this.TSOPStatus = TSOPStatus;
        this.TSOPDivi = TSOPDivi;
    }

    // 결제 승인 처리 후 예약 처리를 위한 Vo 처리
    public StudyOrderPayVo(String TSOPIdx) {
        this.TSOPIdx = TSOPIdx;
    }

    public String getTSOPIdx() {
        return TSOPIdx;
    }

    public void setTSOPIdx(String TSOPIdx) {
        this.TSOPIdx = TSOPIdx;
    }

    public String getTSOPMethod() {
        return TSOPMethod;
    }

    public void setTSOPMethod(String TSOPMethod) {
        this.TSOPMethod = TSOPMethod;
    }

    public Integer getTSOPPrice() {
        return TSOPPrice;
    }

    public void setTSOPPrice(Integer TSOPPrice) {
        this.TSOPPrice = TSOPPrice;
    }

    public String getTSOPStatus() {
        return TSOPStatus;
    }

    public void setTSOPStatus(String TSOPStatus) {
        this.TSOPStatus = TSOPStatus;
    }

    public Date getTsopDate() {
        return TsopDate;
    }

    public void setTsopDate(Date tsopDate) {
        TsopDate = tsopDate;
    }

    public String getTSOPDivi() {
        return TSOPDivi;
    }

    public void setTSOPDivi(String TSOPDivi) {
        this.TSOPDivi = TSOPDivi;
    }
}
