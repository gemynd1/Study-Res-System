package com.project.SnakeDev.vo;

public class CommunityVo {
    private int ComIdx, ComCateIdx, MIdx;
    private String ComTitle, ComContent, ComRegDate, ComDelDate, ComUpDate;
    private int ComintoDate, ComToCount;
    private String ComStartDate, ComEndDate, ComPlace, ComZipcode, ComAddress;
    private int ComReportCount;
    private String ComGroupName;

    public CommunityVo() {

    }

    public CommunityVo(int comIdx, int comCateIdx, int MIdx, String comTitle, String comContent, String comRegDate, String comDelDate, String comUpDate, int comintoDate, int comToCount, String comStartDate, String comEndDate, String comPlace, String comZipcode, String comAddress, int comReportCount, String comGroupName) {
        ComIdx = comIdx;
        ComCateIdx = comCateIdx;
        this.MIdx = MIdx;
        ComTitle = comTitle;
        ComContent = comContent;
        ComRegDate = comRegDate;
        ComDelDate = comDelDate;
        ComUpDate = comUpDate;
        ComintoDate = comintoDate;
        ComToCount = comToCount;
        ComStartDate = comStartDate;
        ComEndDate = comEndDate;
        ComPlace = comPlace;
        ComZipcode = comZipcode;
        ComAddress = comAddress;
        ComReportCount = comReportCount;
        ComGroupName = comGroupName;
    }

    public int getComIdx() {
        return ComIdx;
    }

    public void setComIdx(int comIdx) {
        ComIdx = comIdx;
    }

    public int getComCateIdx() {
        return ComCateIdx;
    }

    public void setComCateIdx(int comCateIdx) {
        ComCateIdx = comCateIdx;
    }

    public int getMIdx() {
        return MIdx;
    }

    public void setMIdx(int MIdx) {
        this.MIdx = MIdx;
    }

    public String getComTitle() {
        return ComTitle;
    }

    public void setComTitle(String comTitle) {
        ComTitle = comTitle;
    }

    public String getComContent() {
        return ComContent;
    }

    public void setComContent(String comContent) {
        ComContent = comContent;
    }

    public String getComRegDate() {
        return ComRegDate;
    }

    public void setComRegDate(String comRegDate) {
        ComRegDate = comRegDate;
    }

    public String getComDelDate() {
        return ComDelDate;
    }

    public void setComDelDate(String comDelDate) {
        ComDelDate = comDelDate;
    }

    public String getComUpDate() {
        return ComUpDate;
    }

    public void setComUpDate(String comUpDate) {
        ComUpDate = comUpDate;
    }

    public int getComintoDate() {
        return ComintoDate;
    }

    public void setComintoDate(int comintoDate) {
        ComintoDate = comintoDate;
    }

    public int getComToCount() {
        return ComToCount;
    }

    public void setComToCount(int comToCount) {
        ComToCount = comToCount;
    }

    public String getComStartDate() {
        return ComStartDate;
    }

    public void setComStartDate(String comStartDate) {
        ComStartDate = comStartDate;
    }

    public String getComEndDate() {
        return ComEndDate;
    }

    public void setComEndDate(String comEndDate) {
        ComEndDate = comEndDate;
    }

    public String getComPlace() {
        return ComPlace;
    }

    public void setComPlace(String comPlace) {
        ComPlace = comPlace;
    }

    public String getComZipcode() {
        return ComZipcode;
    }

    public void setComZipcode(String comZipcode) {
        ComZipcode = comZipcode;
    }

    public String getComAddress() {
        return ComAddress;
    }

    public void setComAddress(String comAddress) {
        ComAddress = comAddress;
    }

    public int getComReportCount() {
        return ComReportCount;
    }

    public void setComReportCount(int comReportCount) {
        ComReportCount = comReportCount;
    }

    public String getComGroupName() {
        return ComGroupName;
    }

    public void setComGroupName(String comGroupName) {
        ComGroupName = comGroupName;
    }
}
