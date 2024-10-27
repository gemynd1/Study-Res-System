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
  private String SGIContent3;
  private String SGIContent4;
  private String SGIContent5;
  private String SGIContent6;
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

  // 룸 상세 정보와 이미지 정보, 요금 정보 vo
  public StudyGInfoVo(Integer SGINum, String SGIUseState, String SGIContent1, String SGIContent2, String SGIContent3, String SGIContent4, String SGIContent5, String SGIContent6, StudyGImgVo studyGImgVo, StudyGPareVo studyGPareVo) {
    this.SGINum = SGINum;
    this.SGIUseState = SGIUseState;
    this.SGIContent1 = SGIContent1;
    this.SGIContent2 = SGIContent2;
    this.SGIContent3 = SGIContent3;
    this.SGIContent4 = SGIContent4;
    this.SGIContent5 = SGIContent5;
    this.SGIContent6 = SGIContent6;
    this.studyGImgVo = studyGImgVo;
    this.studyGPareVo = studyGPareVo;
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

  public String getSGIContent3() {
    return SGIContent3;
  }

  public void setSGIContent3(String SGIContent3) {
    this.SGIContent3 = SGIContent3;
  }

  public String getSGIContent4() {
    return SGIContent4;
  }

  public void setSGIContent4(String SGIContent4) {
    this.SGIContent4 = SGIContent4;
  }

  public String getSGIContent5() {
    return SGIContent5;
  }

  public void setSGIContent5(String SGIContent5) {
    this.SGIContent5 = SGIContent5;
  }

  public String getSGIContent6() {
    return SGIContent6;
  }

  public void setSGIContent6(String SGIContent6) {
    this.SGIContent6 = SGIContent6;
  }
}
