package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
public class StudyCommunityVo {
    private Integer COMIDX;
    private Integer COMCATEIDX;
    private Integer MIDX;
    private String COMTITLE;
    private String COMCONTENT;
    private Date COMREGDATE;
    private Date COMDELDATE;
    private Date COMUPDATE;
    private Integer COMINTODATE;
    private Integer COMTOCOUNT;
    private Date COMSTARTDATE;
    private Date COMENDDATE;
    private String COMPLACE;
    private String COMZIPCODE;
    private String COMADDRESS;
    private Integer COMREPORTCOUNT;

    private String memberName;

    public StudyCommunityVo(Integer COMIDX, Integer MIDX, String COMTITLE, String COMCONTENT, Date COMREGDATE) {
        this.COMIDX = COMIDX;
        this.MIDX = MIDX;
        this.COMTITLE = COMTITLE;
        this.COMCONTENT = COMCONTENT;
        this.COMREGDATE = COMREGDATE;
    }

    public StudyCommunityVo(Integer COMIDX, Integer COMCATEIDX, Integer MIDX, String COMTITLE, String COMCONTENT, Date COMREGDATE, Integer COMINTODATE, String memberName) {
        this.COMIDX = COMIDX;
        this.COMCATEIDX = COMCATEIDX;
        this.MIDX = MIDX;
        this.COMTITLE = COMTITLE;
        this.COMCONTENT = COMCONTENT;
        this.COMREGDATE = COMREGDATE;
        this.COMINTODATE = COMINTODATE;
        this.memberName = memberName;
    }
    //    // 추가된 생성자
//    public StudyCommunityVo(BigDecimal comIdx, BigDecimal comCateIdx, String comTitle, String comContent, Timestamp comRegDate, String comPlace) {
//        this.COMIDX = comIdx.intValue(); // BigDecimal을 Integer로 변환
//        this.COMCATEIDX = comCateIdx.intValue(); // BigDecimal을 Integer로 변환
//        this.COMTITLE = comTitle;
//        this.COMCONTENT = comContent;
//        this.COMREGDATE = new Date(comRegDate.getTime()); // Timestamp를 Date로 변환
//        this.COMPLACE = comPlace;
//    }
//


    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public Integer getCOMIDX() {
        return COMIDX;
    }

    public void setCOMIDX(Integer COMIDX) {
        this.COMIDX = COMIDX;
    }

    public Integer getCOMCATEIDX() {
        return COMCATEIDX;
    }

    public void setCOMCATEIDX(Integer COMCATEIDX) {
        this.COMCATEIDX = COMCATEIDX;
    }

    public Integer getMIDX() {
        return MIDX;
    }

    public void setMIDX(Integer MIDX) {
        this.MIDX = MIDX;
    }

    public String getCOMTITLE() {
        return COMTITLE;
    }

    public void setCOMTITLE(String COMTITLE) {
        this.COMTITLE = COMTITLE;
    }

    public String getCOMCONTENT() {
        return COMCONTENT;
    }

    public void setCOMCONTENT(String COMCONTENT) {
        this.COMCONTENT = COMCONTENT;
    }

    public Date getCOMREGDATE() {
        return COMREGDATE;
    }

    public void setCOMREGDATE(Date COMREGDATE) {
        this.COMREGDATE = COMREGDATE;
    }

    public Date getCOMDELDATE() {
        return COMDELDATE;
    }

    public void setCOMDELDATE(Date COMDELDATE) {
        this.COMDELDATE = COMDELDATE;
    }

    public Date getCOMUPDATE() {
        return COMUPDATE;
    }

    public void setCOMUPDATE(Date COMUPDATE) {
        this.COMUPDATE = COMUPDATE;
    }

    public Integer getCOMINTODATE() {
        return COMINTODATE;
    }

    public void setCOMINTODATE(Integer COMINTODATE) {
        this.COMINTODATE = COMINTODATE;
    }

    public Integer getCOMTOCOUNT() {
        return COMTOCOUNT;
    }

    public void setCOMTOCOUNT(Integer COMTOCOUNT) {
        this.COMTOCOUNT = COMTOCOUNT;
    }

    public Date getCOMSTARTDATE() {
        return COMSTARTDATE;
    }

    public void setCOMSTARTDATE(Date COMSTARTDATE) {
        this.COMSTARTDATE = COMSTARTDATE;
    }

    public Date getCOMENDDATE() {
        return COMENDDATE;
    }

    public void setCOMENDDATE(Date COMENDDATE) {
        this.COMENDDATE = COMENDDATE;
    }

    public String getCOMPLACE() {
        return COMPLACE;
    }

    public void setCOMPLACE(String COMPLACE) {
        this.COMPLACE = COMPLACE;
    }

    public String getCOMZIPCODE() {
        return COMZIPCODE;
    }

    public void setCOMZIPCODE(String COMZIPCODE) {
        this.COMZIPCODE = COMZIPCODE;
    }

    public String getCOMADDRESS() {
        return COMADDRESS;
    }

    public void setCOMADDRESS(String COMADDRESS) {
        this.COMADDRESS = COMADDRESS;
    }

    public Integer getCOMREPORTCOUNT() {
        return COMREPORTCOUNT;
    }

    public void setCOMREPORTCOUNT(Integer COMREPORTCOUNT) {
        this.COMREPORTCOUNT = COMREPORTCOUNT;
    }
}
