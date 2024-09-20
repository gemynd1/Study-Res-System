import React, { useState } from "react";
import teamDetail from "../../../style/teamDetail.css";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@mui/material/Rating";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import dayjs from "dayjs";

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
        <FormControlLabel
          value="2~4"
          control={<Radio />}
          label="1000원/시간(인)"
        />
        <FormControlLabel
          value="3~4"
          control={<Radio />}
          label="2000원/시간(인)"
        />
      </RadioGroup>
    </FormControl>
  );
}

const StyledDateCalendar = styled(DateCalendar)(({ theme }) => ({
  ".MuiPickersDay-root": {
    boxSizing: "border-box",
    color: "#000000",
    "&.Mui-disabled": {
      backgroundColor: "#A5A6B9", // 비활성화된 날짜의 배경색
      color: "#000000",
    },
    "&.Mui-selected": {
      border: "1px solid rgba(0, 0, 0, 0.6)",
      backgroundColor: "#7ee9bb", // 선택된 날짜의 배경색
      color: "#000000",
      "&:hover, &:focus": {
        backgroundColor: "#7ee9bb", // 선택된 날짜에서 hover와 focus 상태
        color: "#000000",
      },
    },
    "&:not(.Mui-selected)": {
      border: "1px solid rgba(0, 0, 0, 0.6)",
      color: "#000000",
      "&.MuiPickersDay-today": {
        backgroundColor: "#ffd600", // 오늘 날짜의 배경색
      },
    },
  },
}));

// #FFD600
function BasicDateCalendar() {
  const disablePastDates = (date) => {
    return date.isBefore(dayjs(), "day");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDateCalendar shouldDisableDate={disablePastDates} sx={{}} />
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
  color,
  onClick,
}) {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: backgroundColor || "#7EE9BB",
        // "&:hover": { backgroundColor: "#5CC8A4" },
        fontWeight: "bold",
        width: width || "92px", // 기본값은 auto
        height: height || "74px", // 기본값은 auto
        fontSize: fontSize || "1.25rem", // 기본값은 1rem
        padding: padding || "12px 24px", // 기본값은 '8px 16px'
        margin: margin || "2px 2px",
        color: color || "#000000",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

function TeamDetailButtons() {
  const [count, setCount] = useState(3); // 초기값은 3

  const handleIncrement = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="teamDetail__side-buttons-wrap">
      <BasicButtons
        text={count}
        width="364px"
        height="74px"
        backgroundColor="#ffffff"
      />
      <div className="teamDetail__side-buttons">
        <BasicButtons
          text="-"
          width="84px"
          height="74px"
          backgroundColor="#A5A6B9"
          onClick={handleDecrement}
        />
        <BasicButtons
          text="+"
          width="84px"
          height="74px"
          backgroundColor="#A5A6B9"
          onClick={handleIncrement}
        />
      </div>
    </div>
  );
}

function TimeSelector() {
  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleChange = (event, newSelectedTimes) => {
    if (newSelectedTimes.length <= 2) {
      if (newSelectedTimes.length === 2) {
        const [first, second] = newSelectedTimes;
        const start = Math.min(first, second);
        const end = Math.max(first, second);

        const newSelection = [];
        for (let i = start; i <= end; i++) {
          if (!newSelectedTimes.includes(i)) {
            newSelection.push(i);
          }
        }

        setSelectedTimes([...newSelectedTimes, ...newSelection]);
      } else {
        setSelectedTimes(newSelectedTimes);
      }
    } else {
      setSelectedTimes([]);
    }
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div>
      <ToggleButtonGroup
        value={selectedTimes}
        onChange={handleChange}
        aria-label="time-selector"
        size="small"
        className="toggleButtonGroup"
      >
        {hours.map((hour) => (
          <ToggleButton
            key={hour}
            value={hour}
            aria-label={`${hour}:00`}
            className="toggleButton"
          >
            {hour}:00
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
}

const TeamDetail = () => {
  const [swiper, setSwiper] = useState(null);
  return (
    <div className="teamDetail">
      <div className="teamDetail__main">
        <div className="teamDetail__main-header">
          <h1 className="teamDetail__main-content-title">안양역 스터디룸</h1>
          <h4 className="teamDetail__main-content-title-option">
            스터디 최적의 공간
          </h4>
        </div>
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
          <h1 className="teamDetail__main-content-title">
            세미나, 클래스, 스터디 모임 등
          </h1>
          <h4 className="teamDetail__main-content-title-option">
            공간소개 | 시설안내 | 유의사항 | 환불정책 | Q&A | 이용후기
          </h4>
          <div className="teamDetail__main-header-line" />
          <div className="teamDetail__main-content-text">
            <h3 className="teamDetail__main-content-text-title">공간소개</h3>
            <h4 className="teamDetail__main-content-text-text">
              안양역 스터디룸입니다.! <br /> 안영역에서 인기 있는 스터디룸!{" "}
            </h4>
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
              <h2 className="teamDetail__main-review-name">김지민</h2>

              <ControlledRating />
            </div>
            <h4 className="teamDetail__main-content-text-title">
              안양역 스터디룸 괜찮네요
            </h4>
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
            <h4 className="teamDetail__side-content-text-title">
              시설이 괜찮다니 다행입니다.
            </h4>
          </div>
        </div>
      </div>
      <div className="teamDetail__side&buttons">
        <div className="teamDetail__side">
          <div className="teamDetail__side-header">
            <h1 className="teamDetail__side-header-title">예약 & 결제</h1>
            <div className="teamDetail__side-header-line" />
          </div>
          <div className="teamDetail__side-radio">
            <RadioButtonsGroup />
          </div>
          <div className="teamDetail__side-image"></div>
          <div className="teamDetail__side-description">
            <div className="flex">
              <h3 className="teamDetail__side-content-text-text">공간유형</h3>
              <h4 className="teamDetail__side-content-text-text2">
                회의룸 파티룸 스터디룸 강의실
              </h4>
            </div>
            <div className="teamDetail__side-header-line" />
            <div className="flex">
              <h3 className="teamDetail__side-content-text-text">공간면적</h3>
              <h4 className="teamDetail__side-content-text-text2">22평</h4>
            </div>
            <div className="teamDetail__side-header-line" />

            <div className="flex">
              <h3 className="teamDetail__side-content-text-text">예약시간</h3>
              <h4 className="teamDetail__side-content-text-text2">
                최소 2시간부터
              </h4>
            </div>
            <div className="teamDetail__side-header-line" />
            <div className="flex">
              <h3 className="teamDetail__side-content-text-text">수용인원</h3>
              <h4 className="teamDetail__side-content-text-text2">
                최소4명 ~ 최대 10명
              </h4>
            </div>
            <div className="teamDetail__side-header-line" />
          </div>
          <div className="teamDetail__side-radio">
            <FormControlLabel control={<Radio />} label="날짜 예약하기" />
          </div>
          <div className="teamDetail__side-calendar">
            <BasicDateCalendar />
          </div>
          <div className="teamDetail__side-legend">
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor1"></div>
              <div className="teamDetail___side-legned-title">오늘</div>
            </div>
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor2"></div>
              <div className="teamDetail___side-legned-title">예약불가</div>
            </div>
            <div className="teamDetail__side-legend-wrap">
              <div className="teamDetail__side-legend-boxColor3"></div>
              <div className="teamDetail___side-legned-title">선택</div>
            </div>
          </div>
          <div className="teamDetail__side-header">
            <h3 className="teamDetail__side-content-text-text">시간선택</h3>
            <div className="teamDetail__side-header-line" />
          </div>
          <TimeSelector />
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
              <div className="teamDetail___side-legned-title">선택</div>
            </div>
          </div>

          <div className="teamDetail__side-header">
            <h3 className="teamDetail__side-content-text-text">총예약인원</h3>
            <div className="teamDetail__side-header-line" />
          </div>
          <TeamDetailButtons />
        </div>
        <div className="teamDetail__side-contact-actions-buttons">
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
