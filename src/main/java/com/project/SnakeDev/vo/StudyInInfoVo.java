package com.project.SnakeDev.vo;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
public class StudyInInfoVo {
  private Integer SeatNum;
  private Integer MIdx;
  private Integer SCIdx;
  private Integer SIINum;
  private String SeatUseState;
  private String SeatStartTime;
  private String SeatEndTime;

  public StudyInInfoVo() {
  }

  public Integer getSeatNum() {
    return SeatNum;
  }

  public void setSeatNum(Integer seatNum) {
    SeatNum = seatNum;
  }

  public Integer getMIdx() {
    return MIdx;
  }

  public void setMIdx(Integer MIdx) {
    this.MIdx = MIdx;
  }

  public Integer getSCIdx() {
    return SCIdx;
  }

  public void setSCIdx(Integer SCIdx) {
    this.SCIdx = SCIdx;
  }

  public Integer getSIINum() {
    return SIINum;
  }

  public void setSIINum(Integer SIINum) {
    this.SIINum = SIINum;
  }

  public String getSeatUseState() {
    return SeatUseState;
  }

  public void setSeatUseState(String seatUseState) {
    SeatUseState = seatUseState;
  }

  public String getSeatStartTime() {
    return SeatStartTime;
  }

  public void setSeatStartTime(String seatStartTime) {
    SeatStartTime = seatStartTime;
  }

  public String getSeatEndTime() {
    return SeatEndTime;
  }

  public void setSeatEndTime(String seatEndTime) {
    SeatEndTime = seatEndTime;
  }
}
