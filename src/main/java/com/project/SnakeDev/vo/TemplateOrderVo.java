package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class TemplateOrderVo {
    private String TTOIdx;
    private String requestData;


    public TemplateOrderVo() {
    }

    public String getTTOIdx() {
        return TTOIdx;
    }

    public void setTTOIdx(String TTOIdx) {
        this.TTOIdx = TTOIdx;
    }

    public String getJsonData() {
        return requestData;
    }

    public void setJsonData(String requestData) {
        this.requestData = requestData;
    }
}
