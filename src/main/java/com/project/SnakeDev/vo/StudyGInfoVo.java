package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
public class StudyGInfoVo {
  private Integer SGIIdx;
  private Integer SCIdx;
  private Integer SGINum;
  private String SGIUseState;
  private String SGIContent1;
  private String SGIContent2;

  private StudyGImgVo studyGImgVo; // 사진 값 가져오기 위한 vo 선언
  private StudyGPareVo studyGPareVo; // 해당 룸의 가격들 가져오기 위한 vo 선언

  public StudyGInfoVo() {
  }

  // 룸 정보와 이미지 정보 vo
  public StudyGInfoVo(int SGINum, String SGIContent1, String SGIContent2, StudyGImgVo studyGImgVo) {
    this.SGINum = SGINum;
    this.SGIContent1 = SGIContent1;
    this.SGIContent2 = SGIContent2;
    this.studyGImgVo = studyGImgVo;
  }

  public Integer getSGIIdx() {
    return SGIIdx;
  }

  public void setSGIIdx(Integer SGIIdx) {
    this.SGIIdx = SGIIdx;
  }

  public Integer getSCIdx() {
    return SCIdx;
  }

  public void setSCIdx(Integer SCIdx) {
    this.SCIdx = SCIdx;
  }

  public Integer getSGINum() {
    return SGINum;
  }

  public void setSGINum(Integer SGINum) {
    this.SGINum = SGINum;
  }

  public String getSGIUseState() {
    return SGIUseState;
  }

  public void setSGIUseState(String SGIUseState) {
    this.SGIUseState = SGIUseState;
  }

  public String getSGIContent1() {
    return SGIContent1;
  }

  public void setSGIContent1(String SGIContent1) {
    this.SGIContent1 = SGIContent1;
  }

  public String getSGIContent2() {
    return SGIContent2;
  }

  public void setSGIContent2(String SGIContent2) {
    this.SGIContent2 = SGIContent2;
  }

  public StudyGImgVo getStudyGImgVo() {
    return studyGImgVo;
  }

  public void setStudyGImgVo(StudyGImgVo studyGImgVo) {
    this.studyGImgVo = studyGImgVo;
  }

  public StudyGPareVo getStudyGPareVo() {
    return studyGPareVo;
  }

  public void setStudyGPareVo(StudyGPareVo studyGPareVo) {
    this.studyGPareVo = studyGPareVo;
  }
}
