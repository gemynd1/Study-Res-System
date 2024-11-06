package com.project.SnakeDev.vo;

import java.util.Date;

public class StudyReviewVo {
    private Integer SRIdx;
    private Integer SGIIdx;
    private Integer MIdx;
    private String SRcontent;
    private Integer SRStar;
    private Date SRRegDate;
    private Date SRDelDate;
    private Date SRUpDate;
    private String memberName;



    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public Integer getSRIdx() {
        return SRIdx;
    }

    public void setSRIdx(Integer SRIdx) {
        this.SRIdx = SRIdx;
    }

    public Integer getSGIIdx() {
        return SGIIdx;
    }

    public void setSGIIdx(Integer SGIIdx) {
        this.SGIIdx = SGIIdx;
    }

    public Integer getMIdx() {
        return MIdx;
    }

    public void setMIdx(Integer MIdx) {
        this.MIdx = MIdx;
    }

    public String getSRcontent() {
        return SRcontent;
    }

    public void setSRcontent(String SRcontent) {
        this.SRcontent = SRcontent;
    }

    public Integer getSRStar() {
        return SRStar;
    }

    public void setSRStar(Integer SRStar) {
        this.SRStar = SRStar;
    }

    public Date getSRRegDate() {
        return SRRegDate;
    }

    public void setSRRegDate(Date SRRegDate) {
        this.SRRegDate = SRRegDate;
    }

    public Date getSRDelDate() {
        return SRDelDate;
    }

    public void setSRDelDate(Date SRDelDate) {
        this.SRDelDate = SRDelDate;
    }

    public Date getSRUpDate() {
        return SRUpDate;
    }

    public void setSRUpDate(Date SRUpDate) {
        this.SRUpDate = SRUpDate;
    }
}
