import React, { useRef, useState } from "react";
import teamDetail from "../../../style/teamDetail.css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Rating from "@mui/material/Rating"; // Importing Rating
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

function MyButtons({ swiper }) {
  return (
    <div className="moveButton">
      <div onClick={() => swiper.slidePrev()}>
        <img
          className="prevButton"
          src="/img/icon/prevButton.png"
          alt="prevButton"
        />
      </div>
      <div onClick={() => swiper.slideNext()}>
        <img
          className="nextButton"
          src="/img/icon/nextButton.png"
          alt="nextButton"
        />
      </div>
    </div>
  );
}
function ControlledRating() {
  const [value, setValue] = useState(0);

  return (
    <div>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}
function RadioButtonsGroup() {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
}
function BasicDateCalendar() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
  );
}

const TeamDetail = () => {
  const [swiper, setSwiper] = useState(null);
  return (
    <div className="teamDetail">
      <div className="teamDetail__main">
        <div className="teamDetail__main-image">
          <MyButtons swiper={swiper} />
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper"
            pagenation={{ clickable: true }}
            onSwiper={setSwiper}
          >
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
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

              <ControlledRating />
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
            {/* <div className="teamDetail__side-radio-button">O버튼</div>
            <div className="teamDetail__side-radio-title"> 3~6인실</div> */}
            <RadioButtonsGroup />
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
            {/* <div className="teamDetail__side-radio-button">O버튼</div>
            <div className="teamDetail__side-radio-title">
              {" "}
              시간단위 예약하기
            </div> */}
            <FormControlLabel control={<Radio />} label="시간단위 예약하기" />
          </div>
          <div className="teamDetail__side-calendar">
            {/* <div className="teamDetail__side-calendar-header">달력</div>
            <div className="teamDetail__side-calendar-content"></div> */}
            <BasicDateCalendar />
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

export default TeamDetail;
