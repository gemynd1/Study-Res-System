package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CommunityVo {
    private int ComIdx, ComCateIdx, MIdx;
    private String ComTitle, ComContent, ComRegDate, ComDelDate, ComUpDate;
    private int ComintoDate, ComToCount;
    private String ComStartDate, ComEndDate, ComPlace, ComZipcode, ComAddress;
    private int ComReportCount;
    private String ComGroupName;

    private int GroupCount;
    private String MemberName;
    private String MemberNames;
    private String ComCategoryName;
    private String MemberId;
    private int maxCCGroupNum;
    private String sessionId;
    private int currentStudyRoom;

    // 기본생성자
    public CommunityVo() {

    }

    // community테이블의 기본값만을 사용할때의 vo
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

    // community테이블과 groupcount테이블과 조인했을때 사용되는 vo
    public CommunityVo(int comIdx, int comCateIdx, int MIdx, String comTitle, String comContent, String comRegDate, String comDelDate, String comUpDate, int comintoDate, int comToCount, String comStartDate, String comEndDate, String comPlace, String comZipcode, String comAddress, int comReportCount, String comGroupName, int groupCount) {
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
        GroupCount = groupCount;
    }

    // post페이지에서 사용되는 vo
    public CommunityVo(int comIdx, int comCateIdx, int MIdx, String comTitle, String comContent, String comRegDate, String comDelDate, String comUpDate, int comintoDate, int comToCount, String comStartDate, String comEndDate, String comPlace, String comZipcode, String comAddress, int comReportCount, String comGroupName, int groupCount, String memberName, String comCategoryName, String memberId) {
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
        GroupCount = groupCount;
        MemberName = memberName;
        ComCategoryName = comCategoryName;
        MemberId = memberId;
    }

    //postRewrite페이지에서 사용되는 vo
    public CommunityVo(int comIdx, int comCateIdx, int MIdx, String comTitle, String comContent, String comRegDate, String comDelDate, String comUpDate, int comintoDate, int comToCount, String comStartDate, String comEndDate, String comPlace, String comZipcode, String comAddress, int comReportCount, String comGroupName, int groupCount, String memberNames, String comCategoryName) {
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
        GroupCount = groupCount;
        MemberNames = memberNames;
        ComCategoryName = comCategoryName;
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

    public int getGroupCount() {
        return GroupCount;
    }

    public void setGroupCount(int groupCount) {
        GroupCount = groupCount;
    }

    public String getMemberNames() {
        return MemberNames;
    }

    public void setMemberNames(String memberNames) {
        MemberNames = memberNames;
    }

    public String getMemberName() {
        return MemberName;
    }

    public void setMemberName(String memberName) {
        MemberName = memberName;
    }

    public String getComCategoryName() {
        return ComCategoryName;
    }

    public void setComCategoryName(String comCategoryName) {
        ComCategoryName = comCategoryName;
    }

    public String getMemberId() {
        return MemberId;
    }

    public void setMemberId(String memberId) {
        MemberId = memberId;
    }

    public int getMaxCCGroupNum() {
        return maxCCGroupNum;
    }

    public void setMaxCCGroupNum(int maxCCGroupNum) {
        this.maxCCGroupNum = maxCCGroupNum;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public int getCurrentStudyRoom() {
        return currentStudyRoom;
    }

    public void setCurrentStudyRoom(int currentStudyRoom) {
        this.currentStudyRoom = currentStudyRoom;
    }
}
