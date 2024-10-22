import React, { useState, useEffect } from "react";
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
import { Modal, Box, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// 예약 최종 확인 모델
function PaymentModal({
  open,
  onClose,
  roomTitle,
  date,
  time,
  people,
  totalPrice,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6">{roomTitle}</Typography>
        <Typography>날짜: {date}</Typography>
        <Typography>시간: {time}</Typography>
        <Typography>인원: {people}명</Typography>
        <Typography>총 가격: {totalPrice}원</Typography>
        {/* 결제 툴 추가 해야함. */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "16px",
          }}
        >
          <Button onClick={onClose} sx={{ marginRight: "8px" }}>
            취소
          </Button>
          <Button variant="contained" color="primary">
            예약
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

// 슬라이드 이동 버튼
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

// 별점 추가 - 이 부분은 리뷰 페이지에서 작성한 별점 수를 보여주면됨.
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

// 가격 선택
function RadioButtonsGroup({ selectedValue, setSelectedValue }) {
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
          value="1000"
          control={<Radio />}
          label="1000원/시간(인)"
        />
        {/* <FormControlLabel
          value="2000"
          control={<Radio />}
          label="2000원/시간(인)"
        /> */}
      </RadioGroup>
    </FormControl>
  );
}

// 시간 단위 예약하기 버튼 클릭하면 보여주는 캘릭더 컴포넌트
function BasicDateCalendar({ selectedDate, setSelectedDate }) {
  // const [selectedDate, setSelectedDate] = useState(null);

  const disablePastDates = (date) => {
    return date.isBefore(dayjs(), "day");
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate); // 선택된 날짜를 상태로 저장
  };

  // 상태가 업데이트된 후, 선택된 날짜를 콘솔에 출력
  useEffect(() => {
    if (selectedDate) {
      console.log("선택된 날짜:", selectedDate.format("YYYY-MM-DD"));
    }
  }, [selectedDate]); // selectedDate가 변경될 때마다 실행

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        shouldDisableDate={disablePastDates}
        onChange={handleDateChange} // 날짜 선택 핸들러 추가
        value={selectedDate} // 선택된 날짜를 상태로 관리
      />
    </LocalizationProvider>
  );
}

// 버튼 커마한거
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
        backgroundColor: backgroundColor || "#ffffff",
        fontWeight: "bold",
        width: width || "92px",
        height: height || "74px",
        fontSize: fontSize || "1.25rem",
        padding: padding || "12px 24px",
        margin: margin || "2px 2px",
        color: color || "#000000",
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

// 예약가능 버튼
function BasicButtons2({
  text,
  width,
  height,
  fontSize,
  padding,
  margin,
  backgroundColor,
  color,
  selectedTimes,
  totalPrice,
  count,
  selectedDate,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonReadonly, setIsButtonReadonly] = useState(true); // 읽기 전용 상태 관리
  // const formattedDate = selectedDate ? selectedDate.format("YYYY-MM-DD") : ""; // 문자열로 변환

  const formatTimeRange = (times) => {
    if (times.length === 1) {
      const start = times[0];
      return {
        timeRange: `${String(start).padStart(2, "0")}:00 ~ ${String(
          start + 1
        ).padStart(2, "0")}:00 (총 1시간)`,
      };
    } else if (times.length >= 2) {
      const start = Math.min(...times);
      const end = Math.max(...times);
      const totalHours = end - start + 1;
      return {
        timeRange: `${String(start).padStart(2, "0")}:00 ~ ${String(
          end + 1
        ).padStart(2, "0")}:00 (총 ${totalHours}시간)`,
      };
    }
    return { timeRange: "", totalHours: 0 };
  };

  const handleOpenModal = () => {
    if (!isButtonReadonly) {
      setIsModalOpen(true); // 읽기 전용 상태가 아니면 모달 열기
    }
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const roomTitle = "스터디룸 A";
  const { timeRange, totalHours } = formatTimeRange(selectedTimes);

  // selectedTimes와 selectedDate가 변경될 때마다 버튼 상태 업데이트
  useEffect(() => {
    if (selectedTimes.length > 0 && selectedDate) {
      setIsButtonReadonly(false); // 둘 다 선택되었을 때 읽기 전용 해제
    } else {
      setIsButtonReadonly(true); // 선택되지 않으면 읽기 전용 상태 유지
    }
  }, [selectedTimes, selectedDate]);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: isButtonReadonly
            ? "#d3d3d3"
            : backgroundColor || "#7EE9BB",
          fontWeight: "bold",
          width: width || "192px",
          height: height || "74px",
          fontSize: fontSize || "1.25rem",
          padding: padding || "12px 24px",
          margin: margin || "2px 2px",
          color: color || "#000000",
          cursor: isButtonReadonly ? "not-allowed" : "pointer", // 클릭 불가시 커서 모양 변경
        }}
        onClick={handleOpenModal} // 모달 열기
      >
        {text}
      </Button>

      {/* 모달 컴포넌트 */}
      <PaymentModal
        open={isModalOpen}
        onClose={handleCloseModal}
        roomTitle={roomTitle}
        date={selectedDate ? selectedDate.format("YYYY-MM-DD") : ""}
        time={timeRange}
        totalHours={totalHours}
        people={count}
        totalPrice={totalPrice}
      />
    </>
  );
}

function TeamDetailButtons({ count, setCount }) {
  // const [count, setCount] = useState(3); // 초기값은 3

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

function TimeSelector({ selectedTimes, onTimeChange }) {
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

        onTimeChange([...newSelectedTimes, ...newSelection]);
      } else {
        onTimeChange(newSelectedTimes);
      }
    } else {
      onTimeChange([]);
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
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [count, setCount] = useState(3);
  const [selectedValue, setSelectedValue] = useState("1000");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isTimeChoiceSelected, setIsTimeChoiceSelected] = useState(false);

  const handleRadioChange = (event) => {
    setIsTimeChoiceSelected(event.target.value === "timeChoice");
  };

  const totalPrice = selectedTimes.length * count * selectedValue;

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
          {/* <h4 className="teamDetail__main-content-title-option"> */}
            <div className="teamDetail__main-content-title-option_list">
              <ul className="navarea">
                <li className="selected">
                  공간소개
                </li>
                <li>
                  시설안내
                </li>
                <li>
                  유의사항
                </li>
                <li>
                  환불정책
                </li>
                <li>
                  Q&A
                </li>
                <li className="end">
                  이용후기
                </li>
              </ul>
            </div>
            {/* 공간소개 | 시설안내 | 유의사항 | 환불정책 | Q&A | 이용후기 */}
          {/* </h4> */}
          <div className="teamDetail__main-header-line" />
          <div className="teamDetail__main-content-text">
            <h3 className="teamDetail__main-content-text-title">공간소개</h3>
            <h4 className="teamDetail__main-content-text-text">
              안양역 스터디룸입니다.! <br /> 안영역에서 인기 있는 스터디룸!{" "}
            </h4>
          </div>
        </div>

        <div className="flex fd-c ai-c p-r">
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
                안양역 스터디룸 괜찮네요.
              </h4>
              <h5>2024.09.27 00:00:00</h5>
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
                다음에 또 들려주세요!
              </h4>
              <h5>2024.09.27 00:00:00</h5>
              <div className="teamDetail__side-header-line black" />
            </div>
          </div>
          <div className="p-r b-80">
            <Stack spacing={2}>
              <Pagination count={5} />
            </Stack>
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
            <RadioButtonsGroup
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
            />
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
            <FormControlLabel
              value="timeChoice"
              control={<Radio onChange={handleRadioChange} />}
              label="시간단위 예약하기"
            />
          </div>
          {isTimeChoiceSelected && (
            <>
              <div className="teamDetail__side-calendar">
                <BasicDateCalendar
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
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
              {selectedDate && (
                <>
                  <div className="teamDetail__side-header">
                    <h3 className="teamDetail__side-content-text-text">
                      시간선택
                    </h3>
                    <div className="teamDetail__side-header-line" />
                  </div>
                  <TimeSelector
                    selectedTimes={selectedTimes}
                    onTimeChange={setSelectedTimes}
                  />
                  <div className="teamDetail__side-legend">
                    <div className="teamDetail__side-legend-wrap">
                      <div className="teamDetail__side-legend-boxColor1"></div>
                      <div className="teamDetail___side-legned-title">
                        예약가능
                      </div>
                    </div>
                    <div className="teamDetail__side-legend-wrap">
                      <div className="teamDetail__side-legend-boxColor2"></div>
                      <div className="teamDetail___side-legned-title">
                        예약불가
                      </div>
                    </div>
                    <div className="teamDetail__side-legend-wrap">
                      <div className="teamDetail__side-legend-boxColor3"></div>
                      <div className="teamDetail___side-legned-title">선택</div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <div className="teamDetail__side-header">
            <h3 className="teamDetail__side-content-text-text">총예약인원</h3>
            <div className="teamDetail__side-header-line" />
          </div>
          <TeamDetailButtons count={count} setCount={setCount} />
          <div className="teamDetail__side-header">
            <h3 className="teamDetail__side-content-text-text">공간사용료</h3>
            <div className="teamDetail__side-header-line" />
            <h2 className="teamDetail__side-price">
              총 가격: {totalPrice.toLocaleString()}원
            </h2>
          </div>
        </div>
        <div className="teamDetail__side-contact-actions-buttons">
          <div className="teamDitail__call-chating">
            <BasicButtons text="전화" />
            <BasicButtons text="채팅" />
          </div>
          <BasicButtons2
            text="예약가능"
            width="192px"
            height="74px"
            selectedTimes={selectedTimes}
            totalPrice={totalPrice}
            count={count}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;
