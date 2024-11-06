package com.project.SnakeDev.vo;

public class NotificationVo {
     private int MAIdx, MIdx;
     private String MaTitle, MaContent, MaDate;

     private String MemberId;
     private String MemberName;

    // 기본생성자
    public NotificationVo() {

    }

    // tbl_member_alarm 테이블의 데이터를 가져오기 위한 생성자


    public NotificationVo(int MAIdx, int MIdx, String maTitle, String maContent, String maDate) {
        this.MAIdx = MAIdx;
        this.MIdx = MIdx;
        MaTitle = maTitle;
        MaContent = maContent;
        MaDate = maDate;
    }

    public int getMAIdx() {
        return MAIdx;
    }

    public void setMAIdx(int MAIdx) {
        this.MAIdx = MAIdx;
    }

    public int getMIdx() {
        return MIdx;
    }

    public void setMIdx(int MIdx) {
        this.MIdx = MIdx;
    }

    public String getMaTitle() {
        return MaTitle;
    }

    public void setMaTitle(String maTitle) {
        MaTitle = maTitle;
    }

    public String getMaContent() {
        return MaContent;
    }

    public void setMaContent(String maContent) {
        MaContent = maContent;
    }

    public String getMaDate() {
        return MaDate;
    }

    public void setMaDate(String maDate) {
        MaDate = maDate;
    }

    public String getMemberId() {
        return MemberId;
    }

    public void setMemberId(String memberId) {
        MemberId = memberId;
    }

    public String getMemberName() {
        return MemberName;
    }

    public void setMemberName(String memberName) {
        MemberName = memberName;
    }
}
