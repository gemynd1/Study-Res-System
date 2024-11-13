package com.project.SnakeDev.vo;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class StudyInPareVo {
    private Integer SipIdx;
    private Integer ScIdx;
    private String SipName;
    private String SipName1;
    private Integer SipPrice;

    public StudyInPareVo(Integer sipIdx, String sipName, String sipName1, Integer sipPrice) {
        SipIdx = sipIdx;
        SipName = sipName;
        SipName1 = sipName1;
        SipPrice = sipPrice;
    }

    public StudyInPareVo(String sipName, Integer sipPrice) {
        SipName = sipName;
        SipPrice = sipPrice;
    }

    public StudyInPareVo(Integer sipIdx, Integer scIdx, String sipName, Integer sipPrice) {
        SipIdx = sipIdx;
        ScIdx = scIdx;
        SipName = sipName;
        SipPrice = sipPrice;
    }

    public Integer getSipIdx() {
        return SipIdx;
    }

    public void setSipIdx(Integer sipIdx) {
        SipIdx = sipIdx;
    }

    public Integer getScIdx() {
        return ScIdx;
    }

    public void setScIdx(Integer scIdx) {
        ScIdx = scIdx;
    }

    public String getSipName() {
        return SipName;
    }

    public void setSipName(String sipName) {
        SipName = sipName;
    }

    public String getSipName1() {
        return SipName1;
    }

    public void setSipName1(String sipName1) {
        SipName1 = sipName1;
    }

    public Integer getSipPrice() {
        return SipPrice;
    }

    public void setSipPrice(Integer sipPrice) {
        SipPrice = sipPrice;
    }
}
