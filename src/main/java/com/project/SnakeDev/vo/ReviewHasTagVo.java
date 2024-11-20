package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ReviewHasTagVo {

    private Integer TSHTIdx; // 해시태그id
    private Integer SRidx; // 스터디룸 게시글번호
    private Integer TSHTLIdx; //해시태그목록id

    public ReviewHasTagVo(){}

    public Integer getTSHTIdx() {
        return TSHTIdx;
    }

    public void setTSHTIdx(Integer TSHTIdx) {
        this.TSHTIdx = TSHTIdx;
    }

    public Integer getSRidx() {
        return SRidx;
    }

    public void setSRidx(Integer SRidx) {
        this.SRidx = SRidx;
    }

    public Integer getTSHTLIdx() {
        return TSHTLIdx;
    }

    public void setTSHTLIdx(Integer TSHTLIdx) {
        this.TSHTLIdx = TSHTLIdx;
    }
}
