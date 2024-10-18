package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;

import java.util.Date;

@AllArgsConstructor
public class MypageVo {
    private Integer MIdx;
    private Integer MUseTime;
    private String MemberName;
    private String MemberId;
    private String MemberPw;
    private String MemberPhone;
    private String MAaddress;
    private String MZonecode;
    private String MDetailaddress;
    private double MAlatitude;
    private double MAlongitude;
    private Date MRegDate;
    private Date MStartinDate;
    private Date MEndinDate;

    public MypageVo(Integer MIdx, String memberName, String memberId, String memberPw, String memberPhone, String MAaddress, String MDetailaddress) {
        this.MIdx = MIdx;
        MemberName = memberName;
        MemberId = memberId;
        MemberPw = memberPw;
        MemberPhone = memberPhone;
        this.MAaddress = MAaddress;
        this.MDetailaddress = MDetailaddress;
    }

    public Integer getMIdx() {
        return MIdx;
    }

    public void setMIdx(Integer MIdx) {
        this.MIdx = MIdx;
    }

    public Integer getMUseTime() {
        return MUseTime;
    }

    public void setMUseTime(Integer MUseTime) {
        this.MUseTime = MUseTime;
    }

    public String getMemberName() {
        return MemberName;
    }

    public void setMemberName(String memberName) {
        MemberName = memberName;
    }

    public String getMemberId() {
        return MemberId;
    }

    public void setMemberId(String memberId) {
        MemberId = memberId;
    }

    public String getMemberPw() {
        return MemberPw;
    }

    public void setMemberPw(String memberPw) {
        MemberPw = memberPw;
    }

    public String getMemberPhone() {
        return MemberPhone;
    }

    public void setMemberPhone(String memberPhone) {
        MemberPhone = memberPhone;
    }

    public String getMAaddress() {
        return MAaddress;
    }

    public void setMAaddress(String MAaddress) {
        this.MAaddress = MAaddress;
    }

    public String getMZonecode() {
        return MZonecode;
    }

    public void setMZonecode(String MZonecode) {
        this.MZonecode = MZonecode;
    }

    public String getMDetailaddress() {
        return MDetailaddress;
    }

    public void setMDetailaddress(String MDetailaddress) {
        this.MDetailaddress = MDetailaddress;
    }

    public double getMAlatitude() {
        return MAlatitude;
    }

    public void setMAlatitude(double MAlatitude) {
        this.MAlatitude = MAlatitude;
    }

    public double getMAlongitude() {
        return MAlongitude;
    }

    public void setMAlongitude(double MAlongitude) {
        this.MAlongitude = MAlongitude;
    }

    public Date getMRegDate() {
        return MRegDate;
    }

    public void setMRegDate(Date MRegDate) {
        this.MRegDate = MRegDate;
    }

    public Date getMStartinDate() {
        return MStartinDate;
    }

    public void setMStartinDate(Date MStartinDate) {
        this.MStartinDate = MStartinDate;
    }

    public Date getMEndinDate() {
        return MEndinDate;
    }

    public void setMEndinDate(Date MEndinDate) {
        this.MEndinDate = MEndinDate;
    }

    @Override
    public String toString() {
        return "MypageVo{" +
                "MIdx=" + MIdx +
                ", MemberName='" + MemberName + '\'' +
                ", MemberId='" + MemberId + '\'' +
                ", MemberPw='" + MemberPw + '\'' +
                ", MemberPhone='" + MemberPhone + '\'' +
                ", MAaddress='" + MAaddress + '\'' +
                ", MZonecode='" + MZonecode + '\'' +
                ", MDetailaddress='" + MDetailaddress + '\'' +
                ", MAlatitude=" + MAlatitude +
                ", MAlongitude=" + MAlongitude +
                ", MRegDate=" + MRegDate +
                '}';
    }
}
