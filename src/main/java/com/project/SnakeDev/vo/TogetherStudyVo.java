package com.project.SnakeDev.vo;

public class TogetherStudyVo {
    private int MIdx, ComIdx;

    private String MemberName;

    // 기본생성자
    public TogetherStudyVo() {

    }

    // postRewrite에서 사용할 vo (해당 post에 스터디그룹의 인원들의 데이터를 가져오기 위함)
    public TogetherStudyVo(int MIdx, int comIdx, String memberName) {
        this.MIdx = MIdx;
        ComIdx = comIdx;
        MemberName = memberName;
    }

    public int getMIdx() {
        return MIdx;
    }

    public void setMIdx(int MIdx) {
        this.MIdx = MIdx;
    }

    public int getComIdx() {
        return ComIdx;
    }

    public void setComIdx(int comIdx) {
        ComIdx = comIdx;
    }

    public String getMemberName() {
        return MemberName;
    }

    public void setMemberName(String memberName) {
        MemberName = memberName;
    }
}
