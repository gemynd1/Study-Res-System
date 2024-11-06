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
  private String SGIDContent1;
  private String SGIDContent2;
  private String SGIDContent3;
  private String SGIDContent4;
  private String SGIDContent5;
  private String SGIDContent6;
  private String SGIDContent7;
  private String SGIDContent8;
  private String SGIDContent9;
  private String SGIDContent10;

  private StudyGImgVo studyGImgVo; // 사진 값 가져오기 위한 vo 선언
  private StudyGPareVo studyGPareVo; // 해당 룸의 가격들 가져오기 위한 vo 선언

  public StudyGInfoVo() {
  }

  // 예약 처리를 위한 Vo
  public StudyGInfoVo(Integer SGIIdx) {
    this.SGIIdx = SGIIdx;
  }

  // 룸 정보와 이미지 정보 vo
  public StudyGInfoVo(int SGINum, String SGIContent1, String SGIContent2, StudyGImgVo studyGImgVo) {
    this.SGINum = SGINum;
    this.SGIContent1 = SGIContent1;
    this.SGIContent2 = SGIContent2;
    this.studyGImgVo = studyGImgVo;
  }

  // 룸 상세 정보와 이미지 정보, 요금 정보 vo


  public StudyGInfoVo(Integer SGINum, String SGIUseState, String SGIContent1, String SGIContent2, String SGIDContent1, String SGIDContent2, String SGIDContent3, String SGIDContent4, String SGIDContent5, String SGIDContent6, String SGIDContent7, String SGIDContent8, String SGIDContent9, String SGIDContent10, StudyGImgVo studyGImgVo, StudyGPareVo studyGPareVo) {
    this.SGINum = SGINum;
    this.SGIUseState = SGIUseState;
    this.SGIContent1 = SGIContent1;
    this.SGIContent2 = SGIContent2;
    this.SGIDContent1 = SGIDContent1;
    this.SGIDContent2 = SGIDContent2;
    this.SGIDContent3 = SGIDContent3;
    this.SGIDContent4 = SGIDContent4;
    this.SGIDContent5 = SGIDContent5;
    this.SGIDContent6 = SGIDContent6;
    this.SGIDContent7 = SGIDContent7;
    this.SGIDContent8 = SGIDContent8;
    this.SGIDContent9 = SGIDContent9;
    this.SGIDContent10 = SGIDContent10;
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

  public String getSGIDContent1() {
    return SGIDContent1;
  }

  public void setSGIDContent1(String SGIDContent1) {
    this.SGIDContent1 = SGIDContent1;
  }

  public String getSGIDContent2() {
    return SGIDContent2;
  }

  public void setSGIDContent2(String SGIDContent2) {
    this.SGIDContent2 = SGIDContent2;
  }

  public String getSGIDContent3() {
    return SGIDContent3;
  }

  public void setSGIDContent3(String SGIDContent3) {
    this.SGIDContent3 = SGIDContent3;
  }

  public String getSGIDContent4() {
    return SGIDContent4;
  }

  public void setSGIDContent4(String SGIDContent4) {
    this.SGIDContent4 = SGIDContent4;
  }

  public String getSGIDContent5() {
    return SGIDContent5;
  }

  public void setSGIDContent5(String SGIDContent5) {
    this.SGIDContent5 = SGIDContent5;
  }

  public String getSGIDContent6() {
    return SGIDContent6;
  }

  public void setSGIDContent6(String SGIDContent6) {
    this.SGIDContent6 = SGIDContent6;
  }

  public String getSGIDContent7() {
    return SGIDContent7;
  }

  public void setSGIDContent7(String SGIDContent7) {
    this.SGIDContent7 = SGIDContent7;
  }

  public String getSGIDContent8() {
    return SGIDContent8;
  }

  public void setSGIDContent8(String SGIDContent8) {
    this.SGIDContent8 = SGIDContent8;
  }

  public String getSGIDContent9() {
    return SGIDContent9;
  }

  public void setSGIDContent9(String SGIDContent9) {
    this.SGIDContent9 = SGIDContent9;
  }

  public String getSGIDContent10() {
    return SGIDContent10;
  }

  public void setSGIDContent10(String SGIDContent10) {
    this.SGIDContent10 = SGIDContent10;
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
