package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
public class StudyGImgVo {
  private Integer SGImgIdx;
  private Integer SGIIdx;
  private String SGImg;

  public StudyGImgVo() {
  }

  // 룸 정보와 이미지 정보 조인 Vo 이미지 정보만 넘겨줌
  public StudyGImgVo(String SGImg) {
    this.SGImg = SGImg;
  }

  public StudyGImgVo(int SGImgIdx, int SGIIdx, String SGImg) {
    this.SGImgIdx = SGImgIdx;
    this.SGIIdx = SGIIdx;
    this.SGImg = SGImg;
  }

  public Integer getSGImgIdx() {
    return SGImgIdx;
  }

  public void setSGImgIdx(Integer SGImgIdx) {
    this.SGImgIdx = SGImgIdx;
  }

  public Integer getSGIIdx() {
    return SGIIdx;
  }

  public void setSGIIdx(Integer SGIIdx) {
    this.SGIIdx = SGIIdx;
  }

  public String getSGImg() {
    return SGImg;
  }

  public void setSGImg(String SGImg) {
    this.SGImg = SGImg;
  }
}
