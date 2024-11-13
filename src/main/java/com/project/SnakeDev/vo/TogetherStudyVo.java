package com.project.SnakeDev.vo;

public class TogetherStudyVo {
    private int MIdx, ComIdx;

    private String MemberName;
    private String MemberId;

    // 기본생성자
    public TogetherStudyVo() {
    }

    // postRewrite에서 사용할 vo (해당 post에 스터디그룹의 인원들의 데이터를 가져오기 위함)
    public TogetherStudyVo(int MIdx, int comIdx, String memberName) {
        this.MIdx = MIdx;
        ComIdx = comIdx;
        MemberName = memberName;
    }

    // post페이지에서 사용할 vo (memberId는 sessionid와 비교 후 페이지의 버튼 댓글의 더보기 버튼을 설정할때 사용)
    public TogetherStudyVo(int MIdx, int comIdx, String memberName, String memberId) {
        this.MIdx = MIdx;
        ComIdx = comIdx;
        MemberName = memberName;
        MemberId = memberId;
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

    public String getMemberId() {
        return MemberId;
    }

    public void setMemberId(String memberId) {
        MemberId = memberId;
    }
}
