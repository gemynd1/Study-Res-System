package com.project.SnakeDev.vo;

public class CommunityCategoryVo {
    private int COMCATEIDX;
    private String COMCATENAME, COMCATEUSESTATE;

    // 기본생성자
    public CommunityCategoryVo() {

    }

    // community테이블의 기본값만을 사용할때의 vo
    public CommunityCategoryVo(int COMCATEIDX, String COMCATENAME, String COMCATEUSESTATE) {
        this.COMCATEIDX = COMCATEIDX;
        this.COMCATENAME = COMCATENAME;
        this.COMCATEUSESTATE = COMCATEUSESTATE;
    }

    public int getCOMCATEIDX() {
        return COMCATEIDX;
    }

    public void setCOMCATEIDX(int COMCATEIDX) {
        this.COMCATEIDX = COMCATEIDX;
    }

    public String getCOMCATENAME() {
        return COMCATENAME;
    }

    public void setCOMCATENAME(String COMCATENAME) {
        this.COMCATENAME = COMCATENAME;
    }

    public String getCOMCATEUSESTATE() {
        return COMCATEUSESTATE;
    }

    public void setCOMCATEUSESTATE(String COMCATEUSESTATE) {
        this.COMCATEUSESTATE = COMCATEUSESTATE;
    }
}
