package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;

import java.util.Date;

@AllArgsConstructor
public class StudyOrderPayVo {
    private Integer TsopIdx;
    private Integer Midx;
    private String TsopMethod;
    private Integer TsopPirce;
    private String TsopStatus;
    private Date TsopDate;
    private String TsopDivi;



    public Integer getTsopIdx() {
        return TsopIdx;
    }

    public void setTsopIdx(Integer tsopIdx) {
        TsopIdx = tsopIdx;
    }

    public Integer getMidx() {
        return Midx;
    }

    public void setMidx(Integer midx) {
        Midx = midx;
    }

    public String getTsopMethod() {
        return TsopMethod;
    }

    public void setTsopMethod(String tsopMethod) {
        TsopMethod = tsopMethod;
    }

    public Integer getTsopPirce() {
        return TsopPirce;
    }

    public void setTsopPirce(Integer tsopPirce) {
        TsopPirce = tsopPirce;
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
}
