import React from "react";
import teamDetail from "../../../style/teamDetail.css";
const TeamDetail = () => {
  return (
    <div className="teamDetail">
      <div className="teamDetail__main">
        <div className="teamDetail__main-image"></div>
        <div className="teamDetail__main-content">
          <h1 className="teamDetail__main-content-title">h1제목</h1>
          <h4 className="teamDetail__main-content-title-option">
            h4내용|내용|내용|내용|내용
          </h4>
          <div className="teamDetail__main-header-line">라인</div>
          <div className="teamDetail__main-content-text">
            <h3 className="teamDetail__main-content-text-title">h3제목</h3>
            <h4 className="teamDetail__main-content-text-text">h4내용</h4>
          </div>
        </div>
        <div className="teamDetail__main-review">
          <div className="teamDetail__main-review-profileIcon">
            <img
              className="profile"
              src="/img/icon/profile.png"
              alt="Profile"
            />
          </div>
          <div className="teamDetail__main-review-wrap">
            <div className="teamDetail__main-review-header">
              <h2 className="teamDetail__main-review-name">h2이름</h2>
              <img
                className="teamDetail__main-review-star"
                src="/img/icon/star.png"
                alt="star"
              ></img>
            </div>
            <h4 className="teamDetail__main-content-text-title">h4내용</h4>
            <div className="teamDetail__main-review-photo">
              <img
                className="photos"
                src="/img/icon/곧마감.png"
                alt="star"
              ></img>
              <img
                className="photos"
                src="/img/icon/곧마감.png"
                alt="star"
              ></img>
              <img
                className="photos"
                src="/img/icon/곧마감.png"
                alt="star"
              ></img>
            </div>
            <h2 className="teamDetail__main-review-name">h2이름</h2>
            <h4 className="teamDetail__side-content-text-title">h4내용</h4>
          </div>
        </div>
      </div>
      <div className="teamDetail__side&buttons">
        <div className="teamDetail__side">
          <div className="teamDetail__side-header">
            <h1 className="teamDetail__side-header-title">h1제목</h1>
            <div className="teamDetail__side-header-line">라인-----------</div>
          </div>
          <div className="teamDetail__side-radio">
            <div className="teamDetail__side-radio-button">O버튼</div>
            <div className="teamDetail__side-radio-title"> 3~6인실</div>
          </div>
          <div className="teamDetail__side-image"></div>
          <div className="teamDetail__side-description">
            <h3 className="teamDetail__side-content-text-text">h3제목</h3>
            <div className="teamDetail__side-header-line">
              라인 -------------
            </div>
            <h3 className="teamDetail__side-content-text-text">h3제목</h3>
            <div className="teamDetail__side-header-line">
              라인 -------------
            </div>
            <h3 className="teamDetail__side-content-text-text">h3제목</h3>
            <div className="teamDetail__side-header-line">
              라인 -------------
            </div>
            <h3 className="teamDetail__side-content-text-text">h3제목</h3>
            <div className="teamDetail__side-header-line">
              라인 -------------
            </div>
          </div>
          <div className="teamDetail__side-radio">
            <div className="teamDetail__side-radio-button">O버튼</div>
            <div className="teamDetail__side-radio-title">
              {" "}
              시간단위 예약하기
            </div>
          </div>
          <div className="teamDetail__side-calendar">
            <div className="teamDetail__side-calendar-header">달력</div>
            <div className="teamDetail__side-calendar-content"></div>
          </div>
          <div className="teamDetail__side-legend">
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor"></div>
              <div className="teamDetail___side-legned-title">예약가능</div>
            </div>
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor"></div>
              <div className="teamDetail___side-legned-title">예약불가</div>
            </div>
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor"></div>
              <div className="teamDetail___side-legned-title">오늘</div>
            </div>
          </div>
          <div className="teamDetail__side-header">
            <h3 className="teamDetail__side-content-text-text">h3시간선택</h3>
            <div className="teamDetail__side-header-line">
              라인 -------------
            </div>
          </div>
          <div className="teamDetail__side-choiceTime">시간선택버튼</div>
          <div className="teamDetail__side-legend">
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor"></div>
              <div className="teamDetail___side-legned-title">예약가능</div>
            </div>
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor"></div>
              <div className="teamDetail___side-legned-title">예약불가</div>
            </div>
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor"></div>
              <div className="teamDetail___side-legned-title">오늘</div>
            </div>
          </div>

          <div className="teamDetail__side-header">
            <h3 className="teamDetail__side-content-text-text">h3총예약인원</h3>
            <div className="teamDetail__side-header-line">
              라인 -------------
            </div>
          </div>
          <div className="teamDetail__side-count-control">인원증감버튼</div>
        </div>
        <div className="teamDetail__buttons">
          <div className="teamDitail__call-chating">
            <div className="teamDetail__side-callButton">전화</div>
            <div className="teamDetail__side-chatingButton">채팅</div>
          </div>
          <div className="teamDetail__side-reserveButton">예약가능</div>
        </div>
      </div>
    </div>
  );
};

<style>.teamDetail{}</style>;
export default TeamDetail;
