package com.project.SnakeDev.vo;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
public class AuthVo {
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
//    String nickname, id, pw, phonenumber, address, zonecode, detailedAddress, latitude, longitude;
//    Date MRegDate, MStartinDate, MEndinDate;


    public AuthVo() {
    }

    public AuthVo(String memberName, String memberId, String memberPw, String memberPhone, String MAaddress, String MZonecode, String MDetailaddress, double MAlatitude, double MAlongitude) {
        MemberName = memberName;
        MemberId = memberId;
        MemberPw = memberPw;
        MemberPhone = memberPhone;
        this.MAaddress = MAaddress;
        this.MZonecode = MZonecode;
        this.MDetailaddress = MDetailaddress;
        this.MAlatitude = MAlatitude;
        this.MAlongitude = MAlongitude;
    }

    public AuthVo(String MAaddress, String MZonecode, String MDetailaddress, double MAlatitude, double MAlongitude) {
        this.MAaddress = MAaddress;
        this.MZonecode = MZonecode;
        this.MDetailaddress = MDetailaddress;
        this.MAlatitude = MAlatitude;
        this.MAlongitude = MAlongitude;
    }

    public AuthVo(String memberName, String memberId, String memberPw, String memberPhone) {
        MemberName = memberName;
        MemberId = memberId;
        MemberPw = memberPw;
        MemberPhone = memberPhone;
    }

    public AuthVo(Integer MIdx, String memberId, String memberPw, String memberPhone, String MAaddress, String MDetailaddress) {
        this.MIdx = MIdx;
        MemberId = memberId;
        MemberPw = memberPw;
        MemberPhone = memberPhone;
        this.MAaddress = MAaddress;
        this.MDetailaddress = MDetailaddress;
    }

    public AuthVo(String memberId, String memberPw) {
        MemberId = memberId;
        MemberPw = memberPw;
    }

    public AuthVo(Integer MIdx, String memberId, String memberPw) {
        this.MIdx = MIdx;
        MemberId = memberId;
        MemberPw = memberPw;
    }

    public AuthVo(Integer MIdx, String memberName, String memberId, String memberPw, String memberPhone) {
        this.MIdx = MIdx;
        MemberName = memberName;
        MemberId = memberId;
        MemberPw = memberPw;
        MemberPhone = memberPhone;
    }

    public AuthVo(Integer MIdx, String MAaddress, String MZonecode, String MDetailaddress, double MAlatitude, double MAlongitude) {
        this.MIdx = MIdx;
        this.MAaddress = MAaddress;
        this.MZonecode = MZonecode;
        this.MDetailaddress = MDetailaddress;
        this.MAlatitude = MAlatitude;
        this.MAlongitude = MAlongitude;
    }

    public AuthVo(Integer MIdx, String memberName, String memberId, String memberPw, String memberPhone, String MAaddress, String MZonecode, String MDetailaddress, double MAlatitude, double MAlongitude) {
        this.MIdx = MIdx;
        MemberName = memberName;
        MemberId = memberId;
        MemberPw = memberPw;
        MemberPhone = memberPhone;
        this.MAaddress = MAaddress;
        this.MZonecode = MZonecode;
        this.MDetailaddress = MDetailaddress;
        this.MAlatitude = MAlatitude;
        this.MAlongitude = MAlongitude;
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
        return "AuthVo{" +
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
