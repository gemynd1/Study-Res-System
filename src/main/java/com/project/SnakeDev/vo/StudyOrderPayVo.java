package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;

import java.util.Date;

@AllArgsConstructor
public class StudyOrderPayVo {
    private String TsopIdx;
    private String TsopMethod;
    private Integer TsopPrice;
    private String TsopStatus;
    private Date TsopDate;
    private String TsopDivi;

    private AuthVo authVo;

    public StudyOrderPayVo() {
    }

    // 결제 승인 처리 후 예약 처리를 위한 Vo 처리
    public StudyOrderPayVo(String tsopIdx) {
        TsopIdx = tsopIdx;
    }

    public String getTsopIdx() {
        return TsopIdx;
    }

    public void setTsopIdx(String tsopIdx) {
        TsopIdx = tsopIdx;
    }

    public String getTsopMethod() {
        return TsopMethod;
    }

    public void setTsopMethod(String tsopMethod) {
        TsopMethod = tsopMethod;
    }

    public Integer getTsopPirce() {
        return TsopPrice;
    }

    public void setTsopPirce(Integer tsopPirce) {
        TsopPrice = tsopPirce;
    }

    public String getTsopStatus() {
        return TsopStatus;
    }

    public void setTsopStatus(String tsopStatus) {
        TsopStatus = tsopStatus;
    }

    public Date getTsopDate() {
        return TsopDate;
    }

    public void setTsopDate(Date tsopDate) {
        TsopDate = tsopDate;
    }

    public String getTsopDivi() {
        return TsopDivi;
    }

    public void setTsopDivi(String tsopDivi) {
        TsopDivi = tsopDivi;
    }

    public AuthVo getAuthVo() {
        return authVo;
    }

    public void setAuthVo(AuthVo authVo) {
        this.authVo = authVo;
    }
}
