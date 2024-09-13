import React, { useRef, useState } from "react";
import teamDetail from "../../../style/teamDetail.css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Rating from "@mui/material/Rating";
import Radio from "@mui/material/Radio";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
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
  const [selectedValue, setSelectedValue] = useState("2~4"); // 초기 값 설정

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // 선택된 값 업데이트
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={selectedValue} // 상태에서 값을 받아옴
        name="radio-buttons-group"
        onChange={handleChange} // 변경 시 상태 업데이트
      >
        <FormControlLabel value="2~4" control={<Radio />} label="2~4" />
        <FormControlLabel value="5~7" control={<Radio />} label="5~7" />
        <FormControlLabel value="8~10" control={<Radio />} label="8~10" />
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
function BasicButtons({
  text,
  width,
  height,
  fontSize,
  padding,
  margin,
  backgroundColor,
}) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: backgroundColor || "#7EE9BB",
        "&:hover": { backgroundColor: "#5CC8A4" },
        fontWeight: "bold",
        width: width || "92px", // 기본값은 auto
        height: height || "74px", // 기본값은 auto
        fontSize: fontSize || "1.25rem", // 기본값은 1rem
        padding: padding || "12px 24px", // 기본값은 '8px 16px'
        margin: margin || "2px 2px",
      }}
    >
      {text}
    </Button>
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
          <div className="teamDetail__main-header-line" />
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
            <h2 className="teamDetail__main-review-name host">호스트</h2>
            <h4 className="teamDetail__side-content-text-title">h4내용</h4>
          </div>
        </div>
      </div>
      <div className="teamDetail__side&buttons">
        <div className="teamDetail__side">
          <div className="teamDetail__side-header">
            <h1 className="teamDetail__side-header-title">h1제목</h1>
            <div className="teamDetail__side-header-line" />
          </div>
          <div className="teamDetail__side-radio">
            <RadioButtonsGroup />
          </div>
          <div className="teamDetail__side-image"></div>
          <div className="teamDetail__side-description">
            <h3 className="teamDetail__side-content-text-text">h3제목</h3>
            <div className="teamDetail__side-header-line" />
            <h3 className="teamDetail__side-content-text-text">h3제목</h3>
            <div className="teamDetail__side-header-line" />

            <h3 className="teamDetail__side-content-text-text">h3제목</h3>
            <div className="teamDetail__side-header-line" />
            <h3 className="teamDetail__side-content-text-text">h3제목</h3>
            <div className="teamDetail__side-header-line" />
          </div>
          <div className="teamDetail__side-radio">
            <FormControlLabel control={<Radio />} label="시간단위 예약하기" />
          </div>
          <div className="teamDetail__side-calendar">
            {/* <div className="teamDetail__side-calendar-header">달력</div> */}
            <BasicDateCalendar />
          </div>
          <div className="teamDetail__side-legend">
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor1"></div>
              <div className="teamDetail___side-legned-title">예약가능</div>
            </div>
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor2"></div>
              <div className="teamDetail___side-legned-title">예약불가</div>
            </div>
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor3"></div>
              <div className="teamDetail___side-legned-title">오늘</div>
            </div>
          </div>
          <div className="teamDetail__side-header">
            <h3 className="teamDetail__side-content-text-text">h3시간선택</h3>
            <div className="teamDetail__side-header-line" />
          </div>
          <div className="teamDetail__side-choiceTime">시간선택버튼</div>
          <div className="teamDetail__side-legend">
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor1"></div>
              <div className="teamDetail___side-legned-title">예약가능</div>
            </div>
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor2"></div>
              <div className="teamDetail___side-legned-title">예약불가</div>
            </div>
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor3"></div>
              <div className="teamDetail___side-legned-title">오늘</div>
            </div>
          </div>

          <div className="teamDetail__side-header">
            <h3 className="teamDetail__side-content-text-text">h3총예약인원</h3>
            <div className="teamDetail__side-header-line" />
          </div>
          <div className="teamDetail__side-count-control">인원증감버튼</div>
        </div>
        <div className="teamDetail__buttons">
          <div className="teamDitail__call-chating">
            <BasicButtons text="전화" />
            <BasicButtons text="채팅" />
          </div>
          <BasicButtons
            text="예약가능"
            width="192px"
            height="74px"
            backgroundColor="#7FB29C"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
