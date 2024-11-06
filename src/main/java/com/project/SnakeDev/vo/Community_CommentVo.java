package com.project.SnakeDev.vo;

public class Community_CommentVo {
    private int  CCIDX, MIDX, COMIDX, CCREFNUM, CCNUM, CCGROUPNUM;
    private String CCCONTENT, CCREGDATE, CCUPDATE, CCDELDATE;
    private int  CCREPORTCOUNT;

    // 기본생성자
    public Community_CommentVo() {

    }

    // community_comment테이블의 기본값만을 사용할때의 vo
    public Community_CommentVo(int CCIDX, int MIDX, int COMIDX, int CCREFNUM, int CCNUM, int CCGROUPNUM, String CCCONTENT, String CCREGDATE, String CCUPDATE, String CCDELDATE, int CCREPORTCOUNT) {
        this.CCIDX = CCIDX;
        this.MIDX = MIDX;
        this.COMIDX = COMIDX;
        this.CCREFNUM = CCREFNUM;
        this.CCNUM = CCNUM;
        this.CCGROUPNUM = CCGROUPNUM;
        this.CCCONTENT = CCCONTENT;
        this.CCREGDATE = CCREGDATE;
        this.CCUPDATE = CCUPDATE;
        this.CCDELDATE = CCDELDATE;
        this.CCREPORTCOUNT = CCREPORTCOUNT;
    }

    public int getCCIDX() {
        return CCIDX;
    }

    public void setCCIDX(int CCIDX) {
        this.CCIDX = CCIDX;
    }

    public int getMIDX() {
        return MIDX;
    }

    public void setMIDX(int MIDX) {
        this.MIDX = MIDX;
    }

    public int getCOMIDX() {
        return COMIDX;
    }

    public void setCOMIDX(int COMIDX) {
        this.COMIDX = COMIDX;
    }

    public int getCCREFNUM() {
        return CCREFNUM;
    }

    public void setCCREFNUM(int CCREFNUM) {
        this.CCREFNUM = CCREFNUM;
    }

    public int getCCNUM() {
        return CCNUM;
    }

    public void setCCNUM(int CCNUM) {
        this.CCNUM = CCNUM;
    }

    public int getCCGROUPNUM() {
        return CCGROUPNUM;
    }

    public void setCCGROUPNUM(int CCGROUPNUM) {
        this.CCGROUPNUM = CCGROUPNUM;
    }

    public String getCCCONTENT() {
        return CCCONTENT;
    }

    public void setCCCONTENT(String CCCONTENT) {
        this.CCCONTENT = CCCONTENT;
    }

    public String getCCREGDATE() {
        return CCREGDATE;
    }

    public void setCCREGDATE(String CCREGDATE) {
        this.CCREGDATE = CCREGDATE;
    }

    public String getCCUPDATE() {
        return CCUPDATE;
    }

    public void setCCUPDATE(String CCUPDATE) {
        this.CCUPDATE = CCUPDATE;
    }

    public String getCCDELDATE() {
        return CCDELDATE;
    }

    public void setCCDELDATE(String CCDELDATE) {
        this.CCDELDATE = CCDELDATE;
    }

    public int getCCREPORTCOUNT() {
        return CCREPORTCOUNT;
    }

    public void setCCREPORTCOUNT(int CCREPORTCOUNT) {
        this.CCREPORTCOUNT = CCREPORTCOUNT;
    }
}
