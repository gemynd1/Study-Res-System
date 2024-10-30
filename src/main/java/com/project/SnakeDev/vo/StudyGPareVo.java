package com.project.SnakeDev.vo;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class StudyGPareVo {
    private int SGPIdx;
    private int SGIIdx;
    private String SGPName;
    private int SGPPrice;

    // studyginfovo에서 사용하기 위한 생성자
    public StudyGPareVo(Integer SGIIdx, Integer SGPPrice) {
        this.SGIIdx = SGIIdx;
        this.SGPPrice = SGPPrice;
    }

    public StudyGPareVo(String SGPName, int SGPPrice, String SGIContent) {
        this.SGPName = SGPName;
        this.SGPPrice = SGPPrice;
    }

    public int getSGPIdx() {
        return SGPIdx;
    }

    public void setSGPIdx(int SGPIdx) {
        this.SGPIdx = SGPIdx;
    }

    public int getSGIIdx() {
        return SGIIdx;
    }

    public void setSGIIdx(int SGIIdx) {
        this.SGIIdx = SGIIdx;
    }

    public String getSGPName() {
        return SGPName;
    }

    public void setSGPName(String SGPName) {
        this.SGPName = SGPName;
    }

    public int getSGPPrice() {
        return SGPPrice;
    }

    public void setSGPPrice(int SGPPrice) {
        this.SGPPrice = SGPPrice;
    }
}
