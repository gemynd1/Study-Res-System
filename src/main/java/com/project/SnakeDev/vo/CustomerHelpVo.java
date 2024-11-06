package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;



public class CustomerHelpVo {
    private Integer CHIdx;
    private Integer Midx;
    private String CHContent;
    private String CHTitle;
    private Date CHDate;

    private String MemberName;
    private String MemberId;

    public CustomerHelpVo() {
    }

    public CustomerHelpVo(Integer CHIdx, Integer midx, String CHContent, String CHTitle, Date CHDate, String memberName) {
        this.CHIdx = CHIdx;
        Midx = midx;
        this.CHContent = CHContent;
        this.CHTitle = CHTitle;
        this.CHDate = CHDate;
        MemberName = memberName;
    }

    public CustomerHelpVo(Integer CHIdx, Integer midx, String CHContent, String CHTitle, Date CHDate, String memberName, String memberId) {
        this.CHIdx = CHIdx;
        Midx = midx;
        this.CHContent = CHContent;
        this.CHTitle = CHTitle;
        this.CHDate = CHDate;
        MemberName = memberName;
        MemberId = memberId;
    }

    public String getMemberId() {
        return MemberId;
    }

    public void setMemberId(String memberId) {
        MemberId = memberId;
    }

    public Integer getCHIdx() {
        return CHIdx;
    }

    public void setCHIdx(Integer CHIdx) {
        this.CHIdx = CHIdx;
    }

    public Integer getMidx() {
        return Midx;
    }

    public void setMidx(Integer midx) {
        Midx = midx;
    }

    public String getCHContent() {
        return CHContent;
    }

    public void setCHContent(String CHContent) {
        this.CHContent = CHContent;
    }

    public String getCHTitle() {
        return CHTitle;
    }

    public void setCHTitle(String CHTitle) {
        this.CHTitle = CHTitle;
    }

    public Date getCHDate() {
        return CHDate;
    }

    public void setCHDate(Date CHDate) {
        this.CHDate = CHDate;
    }

    public String getMemberName() {
        return MemberName;
    }

    public void setMemberName(String memberName) {
        MemberName = memberName;
    }
}
