package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@AllArgsConstructor
public class TemplateOrderVo {
    private String TTOIdx;
    private String TTOContent;
    private String TTOState;

    private AuthVo authVo;
    private StudyOrderPayVo studyOrderPayVo;

    public TemplateOrderVo() {
    }

    public String getTTOIdx() {
        return TTOIdx;
    }

    public void setTTOIdx(String TTOIdx) {
        this.TTOIdx = TTOIdx;
    }

    public String getTTOContent() {
        return TTOContent;
    }

    public void setTTOContent(String TTOContent) {
        this.TTOContent = TTOContent;
    }

    public String getTTOState() {
        return TTOState;
    }

    public void setTTOState(String TTOState) {
        this.TTOState = TTOState;
    }

    public AuthVo getAuthVo() {
        return authVo;
    }

    public void setAuthVo(AuthVo authVo) {
        this.authVo = authVo;
    }

    public StudyOrderPayVo getStudyOrderPayVo() {
        return studyOrderPayVo;
    }

    public void setStudyOrderPayVo(StudyOrderPayVo studyOrderPayVo) {
        this.studyOrderPayVo = studyOrderPayVo;
    }
}
