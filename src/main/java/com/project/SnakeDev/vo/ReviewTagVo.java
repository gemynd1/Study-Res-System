package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ReviewTagVo {
    private Integer TSHTLIdx; //해시태그목록id
    private String TSHTLContent; //내용

    public ReviewTagVo(){}

    public Integer getTSHTLIdx() {
        return TSHTLIdx;
    }

    public void setTSHTLIdx(Integer TSHTLIdx) {
        this.TSHTLIdx = TSHTLIdx;
    }

    public String getTSHTLContent() {
        return TSHTLContent;
    }

    public void setTSHTLContent(String TSHTLContent) {
        this.TSHTLContent = TSHTLContent;
    }
}



